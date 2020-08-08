<template>
  <div class="">
    <v-layout column class="hide-overflow">
      <v-toolbar
        color="bg-gradient bg-adhoc-theme"
        dark
      >
        <v-flex xs1>
          <v-btn color="white" flat icon small @click="$router.push('/ad-hoc')" class="elevation-0">
            <v-icon small>fas fa-arrow-left</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3>
          <p class="headline mb-0">
            {{stage.title}}
          </p>
        </v-flex>

        <v-flex xs4>
          <v-tabs
            v-model="config.activeTab"
            centered
            color="transparent"
            slider-color="white"
          >
            <v-tab
              v-for="(t, ti) in config.tabs"
              :key="ti"
              :href="`#tab-${t.value}`"
              @click="addRef(t.value)"
            >
              {{t.title}}
            </v-tab>
          </v-tabs>
        </v-flex>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-layout row wrap mt-4 pt-3>
        <v-flex>
          <v-tabs-items v-model="config.activeTab">
            <v-tab-item value="tab-overview" v-if="config.activeTab === 'tab-overview'">
              <v-layout row wrap>
                <v-flex sm8 class="mx-4">
                  <CampaignAnalysis ref="CampaignAnalysis" class="mb-3" /> <br>
                  <DailyResponseReport ref="DailyResponseReport" class="mb-3" />
                </v-flex>
                <v-flex sm3 class="mr-4">
                  <ResponseBreakdown ref="ResponseBreakdown" class="mb-3" /> <br>
                  <CampaignOverview ref="CampaignOverview" class="mb-3" />
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex sm12 class="mx-4">
                  <QuestionAnalysis ref="QuestionAnalysis" class="mb-3" />
                </v-flex>
              </v-layout>
            </v-tab-item>
            <v-tab-item value="tab-employees" v-show="config.activeTab === 'tab-employees'">
              <v-data-table
                :headers="table.headers"
                :items="table.team"
                :pagination.sync="pagination"
                :total-items="table.totalItems"
                :loading="table.loading"
                class=""
              >
                <template slot="items" slot-scope="props">
                  <tr v-if="props.item">
                    <td>
                      <v-layout row wrap align-center>
                        <v-flex class="py-2" sm3>
                          <v-avatar size="30px" :color="getColor(props.item)">
                            <img src="src" alt="alt" v-show="false">
                            <span class="white--text">{{getAvatar(props.item)}}</span>
                          </v-avatar>
                        </v-flex>
                        <v-flex>
                          <p class="mb-0" v-show="props.item.user_display_name">
                            <strong class="hover-link cursor-pointer" @click="viewEmployee(props.item.id);">
                              {{props.item.user_display_name}}
                            </strong>
                          </p>
                          <p class="mb-0" v-show="props.item.display_name">
                            <strong class="hover-link cursor-pointer" @click="viewEmployee(props.item.id);">
                              {{props.item.display_name}}
                            </strong>
                          </p>
                          <small>
                            {{props.item.email}}
                          </small>
                        </v-flex>
                      </v-layout>
                    </td>
                    <td>
                      {{props.item.department}}
                    </td>
                    <!--<td class="text-sm-left">
                      {{props.item.msg[0].text}}
                    </td>-->
                  </tr>
                </template>

                <v-card slot="no-data" class="elevation-0 text-xs-center" min-height="60vh"
                v-show="!table.team || !table.team.length">
                  <v-card-title primary-title class="justify-center">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <img :src="getImgUrl('amara_avatar')" class="blank-avatar" alt="">
                        <p>
                          No employees present.
                        </p>
                      </v-flex>
                    </v-layout>
                  </v-card-title>
                </v-card>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-layout>
    <DeleteAdhoc ref="DeleteAdhoc" />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import { VChip, VMenu, VCheckbox, VAvatar } from 'vuetify';
import VDateRange from 'vuetify-daterange-picker';
import dayjs from 'dayjs';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

import DeleteAdhoc from './dialogs/DeleteAdhoc';
// import KeyDrivers from '../analytics/KeyDrivers';
import CampaignOverview from '../analytics/adhoc/CampaignOverview';
import CampaignAnalysis from '../analytics/adhoc/CampaignAnalysis';
import DailyResponseReport from '../analytics/adhoc/DailyResponseReport';
import ResponseBreakdown from '../analytics/adhoc/ResponseBreakdown';
import QuestionAnalysis from '../analytics/adhoc/QuestionAnalysis';
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

Vue.use(VDateRange);

export default {
  name: 'dashboard',
  components: {
    // ContentLoader,
    // VChip,
    // VMenu,
    // VAvatar,
    DeleteAdhoc,
    // KeyDrivers,
    QuestionAnalysis,
    CampaignOverview,
    // VCheckbox,
    CampaignAnalysis,
    DailyResponseReport,
    ResponseBreakdown
  },
  data () {
    return {
      stageReports: {},
      pagination: {
        rowsPerPage: 10
      },
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
      table: {
        headers: [{
          text: 'Employee Details',
          align: 'left',
          sortable: false
        }, {
          text: 'Department',
          align: 'left',
          sortable: false
        // }, {
        //   text: 'Response',
        //   align: 'left',
        //   sortable: false,
        }]
      },
      config: {
        panel: [true, true, true, true],
        editable: false,
        initialLoading: true,
        initialLoadingFilters: true,
        actions: [
          {
            title: 'Delete',
            icon: 'fas fa-trash',
            dialog: 'DeleteAdhoc',
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
            title: 'Employees',
            value: 'employees'
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
      user: state => state.user
    })
  },
  methods: {
    getAvatar (c) {
      let name = '';
      if (c.user_display_name) {
        name = c.user_display_name.split(' ');
      } else {
        name = c.display_name.split(' ');
      }
      const avt = `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
      return avt.toUpperCase();
    },
    getColor (e) {
      let color = 'primary';
      if (e.gender && e.gender === 'female') {
        color = 'pink';
      }
      return color;
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    addRef (val) {
      this.$router.push({ query: { activeTab: val } });
      switch (val) {
        case 'employees':
          this.getEmployees(this.$route.params.stageId);
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
      this.getStage(id);
      this.getStageReport(id);
      // this.getEmployees(id);
    },
    getFilters () {
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}company/${this.user.company}/dashboard_filters`).then((response) => {
        if (response && response.data && response.data.queryset_filters_options) {
          this.config.initialLoadingFilters = false;
          this.filters.default = response.data.queryset_filters_options;

          const defaultFilters = {};
          this.$lodash.each(this.filters.default, (v, k) => {
            defaultFilters[k] = [];
          });
          if (Object.keys(this.filters.selected).length === 0) {
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
    viewSurvey (s) {
      this.$router.push(`/question-sets/edit/${s.id}`);
    },
    getEmployees (id) {
      this.table.loading = true;
      this.config.initialLoading = true;
      const queryParams = {
        count: 'true',
        page_limit: this.pagination.rowsPerPage,
        page_offset: this.pagination.page || 1

      };
      this.$lodash.each(this.stage.audience, (v, k) => {
        if (v.length > 0) {
          queryParams[`${k}`] = v;
        }
      });
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}users/list`, {
        params: queryParams
      }).then((response) => {
        this.table.loading = false;
        this.config.initialLoading = false;
        if (response && response.data) {
          this.table.team = response.data.data;
          this.table.totalItems = response.data.total_count;
          this.$forceUpdate();
          // if (this.table.totalItems > 0) {
          //   this.validate.step1 = true;
          // }
        }
      }, (response) => {
        this.table.loading = false;
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch employees, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getStage (id) {
      const queryParams = {
        fields: 'title,type,status,survey_id,notifications,stage_details,audience,triggerDateTime',
        completed_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        completed_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`user__profile__${k}__in`] = v.join();
        }
      });
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}stage/details/${id}`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          this.stage = response.data;
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
    getStageReport (id) {
      const queryParams = {
        reports: 'overview,adhoc_details,daily_response_report,overall_nps_report,questions_nps_report',
        completed_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        completed_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`user__profile__${k}__in`] = v.join();
        }
      });
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}stage/adhocDetails/${id}`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        // console.log(response);
        if (response && response.data) {
          this.stageReports = response.data;
          if (response.data.overview) {
            this.$refs.CampaignAnalysis.report = response.data.overview;
          }
          if (response.data.adhoc_details) {
            this.$refs.CampaignOverview.report = response.data.adhoc_details;
            if (response.data.questions_nps_report) {
              this.$refs.CampaignOverview.report.total_questions = Object.keys(response.data.questions_nps_report).length;
            }
          }
          if (response.data.daily_response_report) {
            this.$refs.DailyResponseReport.report = response.data.daily_response_report;
            // this.$refs.DailyResponseReport.getDiversity();
            this.$refs.DailyResponseReport.generatePulse(response.data.daily_response_report);
          }
          if (response.data.overall_nps_report) {
            this.$refs.ResponseBreakdown.report = response.data.overall_nps_report;
          }
          if (response.data.questions_nps_report) {
            this.$refs.QuestionAnalysis.report = response.data.questions_nps_report;
            this.$refs.QuestionAnalysis.generateAbsoluteMood(response.data.questions_nps_report);
          }
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch campaign analysis, Please try again later!'
        });
        throw new Error(response);
      });
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getEmployees();
      }
    },
    $route () {
      if (this.$route.query && this.$route.query.activeTab) {
        this.config.activeTab = `tab-${this.$route.query.activeTab}`;
        if (this.$route.params && this.$route.params.stageId && this.config.activeTab !== 'tab-employees') {
          this.getFilters();
          this.triggerUpdate(this.$route.params.stageId);
        } else if (this.$route.params && this.$route.params.stageId && this.config.activeTab === 'tab-employees') {
          this.getEmployees();
        }
      } else {
        if (this.$route.params && this.$route.params.stageId) {
          this.getFilters();
          this.triggerUpdate(this.$route.params.stageId);
        }
      }
    }
  },
  beforeMount () {
    if (this.$route.query && this.$route.query.activeTab) {
      this.config.activeTab = `tab-${this.$route.query.activeTab}`;
      this.addRef(this.$route.query.activeTab);
      if (this.$route.params && this.$route.params.stageId && this.config.activeTab !== 'tab-employees') {
        this.getFilters();
        this.triggerUpdate(this.$route.params.stageId);
      }
    } else {
      if (this.$route.params && this.$route.params.stageId) {
        this.getFilters();
        this.triggerUpdate(this.$route.params.stageId);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.bg-gradient {
  &.bg-adhoc-theme {
    .v-toolbar__content {
      // margin-top: 20px;
    }
  }
}
</style>
