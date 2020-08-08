<template>
  <div class="">
    <!-- Search Bar and Filters -->
    <v-layout row wrap align-center style="border-bottom: 1px solid rgb(243, 241, 241);z-index:3;max-height:70px;">
        <v-flex xs2 class="mr-2">
          <v-btn class="elevation-0 ml-0 text-xs-right back-button"
            @click="goBack()"
            slot="activator"
            flat fab
          >
            <v-icon> fas fa-arrow-left </v-icon>
          </v-btn>
        </v-flex>

        <v-flex class="black--text" xs3 pl-4 style="min-width:41%;position:absolute;left:7%">
        <h1 style="font-weight:500" v-if="stage && stage.stage_details && stage.stage_details.title">
          {{ stage.stage_details.title }}
        </h1>
      </v-flex>

      <v-spacer> </v-spacer>

      <v-flex xs2>
      </v-flex>
    </v-layout>

    <v-layout mt-1 row wrap style="z-index:2">
      <v-flex>
        <v-btn style="right: 10%;
            position: absolute;
            float: right;
            z-index: 100 !important;" color="error"
            flat
            v-show="checkForFilters"
            @click="resetStage"
            >
            Remove Filters
          </v-btn>
          <v-btn style="right: 0;
            position: absolute;
            float: right;
            z-index: 100 !important; color:white;" slot="activator" color="primary"  @click="showFilter = true">
          <v-icon style="font-size:16px; padding-right:10px;">fas fa-filter</v-icon> Filter
        </v-btn>
        <v-card class="elevation-0 mb-2 no-border">
          <v-tabs
            ref="tabs"
            class="custom-dashboard-tabs"
            :class="config.activeTab === 'tab-overview' ? 'overview-active' : ''"
            grow
            v-model="config.activeTab"
            centered
            color="transparent"
            slider-color="primary"
          >
            <v-tab
              class="mr-2 text-capitalize"
              v-for="(t, ti) in config.tabs"
              :key="ti"
              :href="`#tab-${t.value}`"
              @click="addRef(t.value)"
            >
              <span v-if="ti === 0"> </span>
              {{t.title}}
              <strong class="ml-2" v-if="t.count">
                {{t.count ? '('+t.count+')' : ''}}
              </strong>
              <v-tooltip max-width="200" bottom v-show="t.about" class="ml-2">
                <v-icon
                slot="activator"
                >fas fa-info-circle</v-icon>
                {{t.about}}
              </v-tooltip>
            </v-tab>

            <v-tabs-items v-model="config.activeTab" class="background-custom-grey" :class="{
              'b-top': config.activeTab !== 'tab-overview',
              }">
              <!-- Overview Tab-->
              <v-tab-item value="tab-overview">
                <!-- Main Stage Dashboard -->
                <v-layout column class="hide-overflow">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <ParticipationAnalysis ref="ParticipationAnalysis" class="my-2" />
                    </v-flex>
                    <!--<v-flex xs5>
                      <DailyResponse ref="DailyResponse" class="my-2" />
                    </v-flex>-->
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12 px-2>
                      <v-card class="elevation-0 ma-0" style="background-color: rgba(76, 62, 157, 0.1) !important;">
                        <DriverEngagement ref="DriverEngagement" />
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <QuestionAnalysis ref="QuestionAnalysis" class="my-2" />
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-tab-item>

              <!-- Disengaged Employees Tab-->
              <v-tab-item value="tab-need-to-meet">
                <EmployeesToMeet ref="EmployeesToMeet" v-if="config.activeTab === 'tab-need-to-meet'"  class="ma-4" />
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-card>
      </v-flex>
      <v-dialog v-model="showFilter" persistent max-width="65%" content-class="fixed-card-actions" style="overflow-y: hidden;">
      <v-card>
        <v-expansion-panel disabled expand v-model="config.panel"
          class="elevation-0 employee-filters mr-2"
        >
          <v-layout>
            <v-flex md3>
              <v-expansion-panel-content>
                <div slot="header" class="text-capitalize mr-3">Date</div>
                <v-card color="">
                  <v-card-text>
                    <v-radio-group>
                      <v-radio
                        color="primary"
                        v-for="(t, ti) in dateRangeOptions.presets"
                        :key="ti"
                        :label="t.label"
                        :value="t.range"
                      ></v-radio>
                      <v-menu full-width offset-y :close-on-content-click="false" v-model="config.dateMenu" bottom>
                        <v-radio
                          slot="activator"
                          color="primary"
                          label="Select Range"
                        ></v-radio>
                        <v-card>
                          <v-card-text>
                            <v-daterange
                            no-presets
                            :options="dateRangeOptions"
                            @input="updateDate"
                            next-icon="fas fa-arrow-right"
                            prev-icon="fas fa-arrow-left"
                            prepend-icon="fas fa-calendar"
                            ></v-daterange>
                          </v-card-text>
                        </v-card>
                      </v-menu>
                    </v-radio-group>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-flex>
            <v-flex md3
              v-for="(v, k) in filters.default"
              :key="k"
              v-if="v.length > 0"
            >
            <v-expansion-panel-content>
              <div slot="header" class="text-capitalize mr-3">{{k}}</div>
              <v-card color="">
                <v-card-text v-show="v.length > 0">
                  <v-checkbox color="primary" :ripple="false"
                  :value="chk[k]" v-model="filters.selected[k]"
                  v-for="chk in v" :key="chk[k]">
                  <div class="" slot="label">
                    <span v-if="k === 'mood'">
                      <img
                        v-if="chk[k] > 0"
                        height="30"
                        :src="getImgUrl(chk[k])"
                      >
                      <span v-if="chk[k] === 0">Not answered</span>
                    </span>
                    <span v-if="k !== 'mood'">
                      {{chk[k]}}
                    </span>
                  </div>
                </v-checkbox>
                </v-card-text>
                <v-card-text v-show="v.length === 0">
                  No filters available
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            </v-flex>
          </v-layout>
        </v-expansion-panel>
        <v-card-actions>

          <v-btn color="error" flat @click="showFilter = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="applyfilter()" class="white--text" color="primary" style="float:right">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-layout>

    <DeleteStage ref="DeleteStage" />
  </div>
</template>

<script>
// import Vue from 'vue';
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import { VChip, VMenu, VCheckbox, VTooltip } from 'vuetify';
// import VDateRange from 'vuetify-daterange-picker';
import dayjs from 'dayjs';
// import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

import ParticipationAnalysis from '../analytics/milestones/ParticipationAnalysis';
import DriverEngagement from '../analytics/milestones/MilestoneDriverEngagement';
import QuestionAnalysis from '../analytics/milestones/milestoneQuestionAnalysis';
import EmployeesToMeet from '../analytics/EmployeesToMeet';

import DeleteStage from './dialogs/DeleteStage';

// Vue.use(VDateRange);

export default {
  name: 'dashboard',
  components: {
    // ContentLoader,
    // VChip,
    // VMenu,
    ParticipationAnalysis,
    DriverEngagement,
    QuestionAnalysis,
    DeleteStage,
    // VCheckbox,
    // VTooltip,
    EmployeesToMeet
  },
  data () {
    return {
      showFilter: false,
      dateRangeOptions: {
        startDate: undefined,
        endDate: undefined,
        format: 'DD/MM/YYYY',
        minDate: dayjs('01/01/2018').format(),
        maxDate: dayjs().format(),
        presets: [
          {
            label: 'All time',
            range: [
              undefined,
              undefined
            ]
          },
          {
            label: 'This Week',
            range: [
              dayjs().subtract(7, 'day').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 30 Days',
            range: [
              dayjs().subtract(1, 'month').format(),
              dayjs().format()
            ]
          }
        ],
        dateRange: {
          startDate: dayjs().format('DD/MM'),
          endDate: dayjs().format('DD/MM')
        }
      },
      list: {
        departments: [],
        location: [],
        benchmarks: [{
          title: 'Strategy',
          value: '8.9'
        }, {
          title: 'Growth',
          value: '8'
        }, {
          title: 'Other',
          value: '10'
        }]
      },
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      config: {
        panel: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
        editable: false,
        initialLoading: true,
        initialLoadingFilters: true,
        actions: [
          {
            title: 'Delete',
            icon: 'fas fa-trash',
            dialog: 'DeleteStage',
            action: this.openDialog
          }
        ],
        activeTab: 'tab-overview',
        tabs: [
          {
            title: 'Overview',
            value: 'overview'
          // }, {
          //   title: 'Key Drivers',
          //   value: 'key-drivers',
          }, {
            title: 'Disengaged Employees',
            value: 'need-to-meet',
            count: 0
          }
        ]
      },
      stage: {}
    };
  },
  computed: {
    formattedRange () {
      let time = '';
      if (!this.dateRangeOptions.startDate && !this.dateRangeOptions.endDate) {
        time = 'All Time';
      } else {
        time = `${dayjs(this.dateRangeOptions.startDate).format('DD MMM')} - ${dayjs(this.dateRangeOptions.endDate).format('DD MMM')}`;
      }
      return time;
    },
    checkForFilters () {
      let applied = false;
      this.$lodash.each(this.filters.selected, (v) => {
        if (v.length > 0) {
          applied = true;
        }
      });
      if (this.dateRangeOptions.startDate || this.dateRangeOptions.endDate) {
        applied = true;
      }
      return applied;
    },
    ...mapState({
      user: state => state.user,
      dashboardFilters: state => state.dashboardFilters
    })
  },
  methods: {
    applyfilter () {
      this.filterApplied = true;
      this.triggerUpdate(this.$route.params.stageId);
    },
    goBack () {
      this.$router.push({
        path: '/?activeTab=stages'
      });
      // this.$router.go(-1);
    },
    addRef (val) {
      this.$router.push({ query: { activeTab: val } });

      switch (val) {
        case 'need-to-meet':
          this.getDisengagedEmployeesDashboard(this.$route.params.stageId);
          break;
        default:
      }
    },
    resetStage () {
      this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
      this.dateRangeOptions.startDate = undefined;
      this.dateRangeOptions.endDate = undefined;
      this.triggerUpdate(this.$route.params.stageId);
    },
    triggerUpdate (id) {
      // this.getStage(id);
      const dashboardFilters = {
        dateRangeOptions: this.dateRangeOptions,
        filters: this.filters.selected
      };
      this.$store.dispatch('updateFilters', dashboardFilters);
      this.showFilter = false;
      this.getDashboardReport(id);
      // this.getDisengagedEmployeesDashboard(this.$route.params.stageId);
    },
    getDisengagedEmployeesDashboard () {
      setTimeout(() => {
        if (this.$refs.EmployeesToMeet) {
          this.$refs.EmployeesToMeet.getOverview();
        }
      }, 100);
    },
    getFilters () {
      axios.get(`${process.env.VUE_APP_API_URL}company/${this.user.company}/dashboard_filters`).then((response) => {
        if (response && response.data && response.data.queryset_filters_options) {
          this.config.initialLoadingFilters = false;
          this.filters.default = response.data.queryset_filters_options;

          const defaultFilters = {};
          this.$lodash.each(this.filters.default, (v, k) => {
            defaultFilters[k] = [];
          });

          if (this.filters.selected && Object.keys(this.filters.selected).length === 0) {
            this.filters.selected = defaultFilters;
            this.filters.main = JSON.parse(JSON.stringify(defaultFilters));
          }
        }
      });
    },
    updateDate (date) {
      if (date) {
        this.dateRangeOptions.startDate = date[0];
        this.dateRangeOptions.endDate = date[1];
        this.triggerUpdate(this.$route.params.stageId);
      }
    },
    triggerTimeAuto (s) {
      const final = {
        timeIn: '',
        timeRef: s.triggerTimeReference.replace('_', ' ')
      };
      if (s.triggerTimeIn === '-') {
        final.timeIn = 'before';
      } else {
        final.timeIn = 'after';
      }

      return `${s.triggerTimeDuration} ${s.triggerTimeUnit} ${final.timeIn} ${final.timeRef}`;
    },
    openDialog (type) {
      if (type && this.$refs[type]) {
        this.$refs[type].open = true;
        this.$refs[type].candidate = this.candidate;
      }
    },
    getDashboardReport (id) {
      const that = this;
      if (this.$refs.DriverEngagement) {
        this.$refs.DriverEngagement.report = {};
      }
      let queryParams = {
        initiated_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`user__profile__${k}__in`] = v.join();
        }
      });
      const temp = {
        fields: 'stage_participation_stats,monthwise_engagement_vs_mood_trend,disengaged_employees_stats,driver_breakdown,mood_analysis,title,survey'
      };
      queryParams = {
        ...queryParams,
        ...temp
      };
      axios.get(`${process.env.VUE_APP_API_URL}stage/${id}/details`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          if (this.$refs && this.$refs.ParticipationAnalysis) {
            this.stage = response.data;
            this.$refs.ParticipationAnalysis.stage_title = response.data.stage_details.title;

            this.$refs.ParticipationAnalysis.config.initialLoading = false;
            this.$refs.ParticipationAnalysis.report.chats_completed = response.data.chat_participation_stats;
            this.$refs.ParticipationAnalysis.report.disengaged_employees = response.data.disengaged_employees_stats;
            this.$refs.ParticipationAnalysis.report.engagement_score = response.data.engagement_score ? response.data.engagement_score : null;
            this.$refs.ParticipationAnalysis.report.employee_vibe = response.data.mood_analysis ? response.data.mood_analysis.stage_mood_average : null;

            if (response.data.chat_participation_stats || response.data.disengaged_employees_stats ||
            response.data.drivers_analysis || response.data.mood_analysis) {
              this.$refs.ParticipationAnalysis.report.stats = true;
            }
            if (response.data.daily_engagement_stats) {
              this.$refs.ParticipationAnalysis.report.daily_engagement_stats = response.data.daily_engagement_stats;
            }
          }

          if (this.$refs.QuestionAnalysis) {
            if (response.data.stage_details && response.data.stage_details.survey) {
              this.$refs.QuestionAnalysis.getQuestions(response.data.stage_details.survey);
            }
          }

          if (this.$refs && this.$refs.DriverEngagement) {
            this.$refs.DriverEngagement.config.initialLoading = false;
            if (response.data.driver_breakdown && response.data.driver_breakdown.length > 0) {
              const temp = JSON.parse(JSON.stringify(response.data.driver_breakdown));
              const temp2 = [];
              let total = 0;
              this.$lodash.each(temp, (v) => {
                total += v.average;
              });
              temp2.push({
                id: 'Driver Framework',
                name: 'Driver Framework',
                title: '',
                value: (total / temp.length).toFixed(1),
                fill: '#fff',
                label: {
                  fontColor: '#2a333d',
                  fontWeight: 'bold'
                }
              });
              this.$lodash.each(temp, (v) => {
                temp2.push({
                  id: v.driver,
                  name: (v.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')).replace(/ /g, '\n'),
                  title: v.driver,
                  value: v.average.toFixed(1),
                  parent: 'Driver Framework',
                  fill: that.getRandomColor(v.driver),
                  label: {
                    fontWeight: 'bold',
                    fontSize: '15px'
                  }
                });
                this.$lodash.each(v.sub_drivers, (p, k) => {
                  temp2.push({
                    id: k,
                    name: (k.replace(/([a-z0-9])([A-Z])/g, '$1 $2')).replace(/ /g, '\n'),
                    title: '',
                    value: p.toFixed(1),
                    parent: v.driver,
                    label: {
                      fontWeight: 'bold',
                      fontSize: '15px'
                    }
                  });
                });
              });
              this.$refs.DriverEngagement.report = {
                company_drivers_breakdown: temp2
              };
              this.$refs.DriverEngagement.generateDriverFramework(response.data.driver_breakdown);

              if (response.data.driver_breakdown.length > 0) {
                this.$refs.DriverEngagement.report.stats = true;
              }
            }

            if (response.data.mood_analysis || response.data.monthwise_engagement_vs_mood_trend) {
              this.$refs.DriverEngagement.report.stats = true;
            }

            if (response.data.monthwise_engagement_vs_mood_trend) {
              this.$refs.DriverEngagement.generateLineGraph(response.data.monthwise_engagement_vs_mood_trend);
              this.$refs.DriverEngagement.report.monthwise_engagement_vs_mood_trend = response.data.monthwise_engagement_vs_mood_trend;
            }

            if (response.data.mood_analysis && response.data.mood_analysis.stage_mood_average) {
              const temp = JSON.parse(JSON.stringify(response.data.mood_analysis));
              const temp2 = [];
              let total = 1;
              this.$lodash.each(temp.stage_mood_breakdown, (v, i) => {
                total += v;
              });
              this.$lodash.each(temp.stage_mood_breakdown, (v, i) => {
                temp2.push({
                  mood: i,
                  value: v,
                  percent: ((v / total) * 100).toFixed(0)
                });
              });
              temp.company_mood_breakdown = temp2;
              delete temp.stage_mood_breakdown;
              this.$refs.DriverEngagement.report.mood_analysis = temp;
            }
          }
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch details, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getRandomColor (driver) {
      let color = 'lightgrey';
      const colors = [
        '#eadf59',
        '#ffaf6c',
        '#37b99c',
        '#ffa8a8',
        '#b56fea',
        '#0f4c1c',
        '#918ce7'
      ];
      color = colors[Math.floor(Math.random() * colors.length)];
      if (driver) {
        switch (driver) {
          case 'Culture':
            color = '#66c088';
            break;
          case 'Leadership':
            color = '#757575';
            break;
          case 'RewardsAndRecognition':
            color = '#495b69';
            break;
          case 'WorklifeIntegration':
            color = '#f06362';
            break;
          case 'CareerOpportunities':
            color = '#636363';
            break;
          case 'PerformanceManagement':
            color = '#43c5f1';
            break;
        }
      }
      return color;
    }
  },
  watch: {
    $route () {
      if (this.$route.query && this.$route.query.activeTab) {
        this.config.activeTab = `tab-${this.$route.query.activeTab}`;
      }
    }
  },
  beforeMount () {
    if (this.dashboardFilters && Object.keys(this.dashboardFilters.filters).length > 0) {
      this.filters.selected = this.dashboardFilters.filters;
      this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
    }

    if (this.$route.params && this.$route.params.stageId) {
      this.getFilters();
      this.triggerUpdate(this.$route.params.stageId);
    }
    if (this.$route.query && this.$route.query.activeTab) {
      this.config.activeTab = `tab-${this.$route.query.activeTab}`;
      this.addRef(this.$route.query.activeTab);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
