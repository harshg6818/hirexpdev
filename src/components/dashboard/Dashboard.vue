<template>
  <div class="dashboard-wrap">
    <div class="dash-topbar">
      <DashboardTopBar
        :dash-tab="dashboardTab"
        :is-filter-applied="isFilterApplied"
        @resetDashFilters="resetDashFilters"
        @toggleDashFilter="toggleDashFilter"
      ></DashboardTopBar>
    </div>

    <div class="filter-drawer">
      <DashboardFilters
        ref="DashboardFilters"
        :reset="isFilterApplied"
        @dashFiltersApplied="dashFiltersApplied"
        @getDashboardWithFilter="filterApplied"
      ></DashboardFilters>
    </div>

    <div class="dashboard-container">
      <div class="dash-action-bar">
        <div class="breadcrumb"
          v-if="activeTab === 'touchpoints-snapshot'"
        >
          <span>Critical Touchpoints</span>
          <span>&nbsp;/&nbsp;</span>
          <span class="active">Snapshot</span>
        </div>
        <div class="breadcrumb"
          v-if="activeTab === 'touchpoints-analysis'"
        >
          <span>Critical Touchpoints</span>
          <span>&nbsp;/&nbsp;</span>
          <span class="active">Touchpoint Anaysis</span>
        </div>
        <div class="breadcrumb"
          v-if="activeTab === 'disengaged-snapshot'"
        >
          <span>Disengaged employees</span>
          <span>&nbsp;/&nbsp;</span>
          <span class="active">Snapshot</span>
        </div>
        <div class="breadcrumb"
          v-if="activeTab === 'disengaged-emp-to-meet'"
        >
          <span>Disengaged employees</span>
          <span>&nbsp;/&nbsp;</span>
          <span class="active">Employees to meet</span>
        </div>
        <div class="breadcrumb"
          v-if="activeTab === 'disengaged-sentiment-analysis'"
        >
          <span>Disengaged employees</span>
          <span>&nbsp;/&nbsp;</span>
          <span class="active">Sentiment analysis</span>
        </div>
        <div class="breadcrumb"
          v-if="activeTab === 'anonymous-snapshot'"
        >
          <span>Anonymous</span>
          <span>&nbsp;/&nbsp;</span>
          <span class="active">Snapshot</span>
        </div>
        <div class="breadcrumb"
          v-if="activeTab === 'anonymous-message'"
        >
          <span>Anonymous</span>
          <span>&nbsp;/&nbsp;</span>
          <span class="active">Messages</span>
        </div>
        <div class="filter-bar"
          v-if="activeTab === 'touchpoints-snapshot' || activeTab === 'touchpoints-analysis'"
        >
          <v-btn
            class="box-container zoom-in mx-2"
            @click="dashboardTab = 'touchpoints-snapshot'"
          >
            Snapshot
          </v-btn>
          <v-btn
            class="box-container zoom-in mx-2"
            @click="dashboardTab = 'touchpoints-analysis'"
          >
            Touchpoints analysis
          </v-btn>
        </div>
        <div class="filter-bar"
          v-if="activeTab === 'disengaged-snapshot'
            || activeTab === 'disengaged-emp-to-meet'
            || activeTab === 'disengaged-sentiment-analysis'"
        >
          <v-btn
            class="box-container zoom-in mx-2"
            @click="dashboardTab = 'disengaged-snapshot'"
          >
            Snapshot
          </v-btn>
          <v-btn
            class="box-container zoom-in mx-2"
            @click="dashboardTab = 'disengaged-emp-to-meet'"
          >
            Employees to meet
          </v-btn>
          <v-btn
            class="box-container zoom-in mx-2"
            @click="dashboardTab = 'disengaged-sentiment-analysis'"
          >
            Sentiment analysis
          </v-btn>
        </div>
        <div class="filter-bar"
          v-if="activeTab === 'anonymous-snapshot' || activeTab === 'anonymous-message'"
        >
          <v-btn
            class="box-container zoom-in mx-2"
            @click="dashboardTab = 'anonymous-snapshot'"
          >
            Snapshot
          </v-btn>
          <v-btn
            class="box-container zoom-in mx-2"
            @click="dashboardTab = 'anonymous-message'"
          >
            Messages
          </v-btn>
        </div>
      </div>

      <div
        v-if="activeTab === 'overview'"
        class="dash-overview"
      >
        <div class="d-flex flex-row flex-wrap">
          <v-flex xs12>
            <ParticipationAnalysis
              ref="ParticipationAnalysis" class="my-2"
              @disengagedEmployeesType="disengagedEmployeesType"
            />
          </v-flex>
        </div>
        <div class="d-flex flex-row flex-wrap">
          <v-flex xs12 px-2>
            <DriverEngagement ref="DriverEngagement"  @viewDriverWithFilter="viewDriverWithFilter"/>
          </v-flex>
        </div>
        <div class="d-flex flex-row flex-wrap">
          <v-flex xs12 class="px-2">
            <EmployeeVibes ref="EmployeeVibes" @dashboardFilterUpdate="updateEmployeeWithFilter" class="my-2" />
          </v-flex>
        </div>
      </div>

      <div
        class="touchpoints-snapshot"
        v-if="activeTab === 'touchpoints-snapshot'"
      >
        <touchpoint-snapshot></touchpoint-snapshot>
      </div>

      <div
        class="touchpoints-analysis"
        v-if="activeTab === 'touchpoints-analysis'"
      >
        <touchpoint-Anaysis></touchpoint-Anaysis>
      </div>

      <div
        class="disengaged-snapshot"
        v-if="activeTab === 'disengaged-snapshot'"
      >
        <disengaged-Snapshot></disengaged-Snapshot>
      </div>

      <div
        class="disengaged-emp-to-meet"
        v-if="activeTab === 'disengaged-emp-to-meet'"
      >
        <disengaged-EmpToMeet></disengaged-EmpToMeet>
      </div>

      <div
        class="disengaged-sentiment-analysis"
        v-if="activeTab === 'disengaged-sentiment-analysis'"
      >
        <disengaged-SentimentAnalysis></disengaged-SentimentAnalysis>
      </div>

      <div
        class="txt-analysis"
        v-if="activeTab === 'txt-analysis'"
      >
        <text-Analysis></text-Analysis>
      </div>

      <div
        class="anonymous-snapshot"
        v-if="activeTab === 'anonymous-snapshot'"
      >
        <anonymous-Snapshot></anonymous-Snapshot>
      </div>

      <div
        class="anonymous-message"
        v-if="activeTab === 'anonymous-message'"
      >
        <anonymous-Message></anonymous-Message>
      </div>

    </div>
  </div>
</template>

<script>
// import {
//   VSelect,
//   VChip,
//   VMenu,
//   VDivider,
//   VTooltip,
//   VCheckbox,
// } from 'vuetify';
import axios from 'axios';
import { mapState } from 'vuex';

import DashboardTopBar from './dashboard-top-bar';
import DashboardFilters from './dashboard-filters';

import ParticipationAnalysis from '../analytics/milestones/ParticipationAnalysis';
import DriverEngagement from '../analytics/milestones/DriverEngagement';
import EmployeeVibes from '../analytics/milestones/EmployeeVibes';

import TouchpointSnapshot from './touchpoints/snapshot';
import TouchpointAnaysis from './touchpoints/analysis';

import DisengagedSnapshot from './disengaged/snapshot';
import DisengagedEmpToMeet from './disengaged/emp-to-meet';
import DisengagedSentimentAnalysis from './disengaged/sentiment-analysis';

import TextAnalysis from './txt-analysis/analysis';

import AnonymousSnapshot from './anonymous/anonymous-snapshot';
import AnonymousMessage from './anonymous/anonymous-message';

export default {
  name: 'dashboard',

  components: {
    DashboardTopBar,
    DashboardFilters,
    ParticipationAnalysis,
    DriverEngagement,
    EmployeeVibes,
    TouchpointSnapshot,
    TouchpointAnaysis,
    DisengagedSnapshot,
    DisengagedEmpToMeet,
    DisengagedSentimentAnalysis,
    TextAnalysis,
    AnonymousSnapshot,
    AnonymousMessage
  },

  data () {
    return {
      // filterApplied: false,
      activeTab: '',
      isFilterApplied: false,
      dashboardTab: ''
    };
  },

  watch: {
    $route () {
      if (this.$route.query) {
        if (this.$route.query.tab) {
          this.activeTab = this.$route.query.tab;
        }
      }
    },
    activeTab () {
      if (this.activeTab === 'overview') {
        this.getDashboardReport();
      }
    }
  },

  created () {
    // this.getDashboardReport();
  },

  beforeMount () {
    if (this.$route.query) {
      if (this.$route.query.tab) {
        this.activeTab = this.$route.query.tab;
      } else {
        this.activeTab = 'overview';
      }
    }
  },

  computed: {
    ...mapState({
      user: state => state.user,
      dashboardFilters: state => state.dashboardFilters,
      updateDashboardFilters: state => state.updateDashboardFilters
    })
  },

  methods: {
    toggleDashFilter () {
      this.$refs.DashboardFilters.showFilterDrawer = true;
    },
    getRandomColor (driver) {
      let color = 'lightgrey';
      const colors = [
        '#eadf59',
        '#ff9800',
        '#37b99c',
        '#f44336',
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
          default:
            break;
        }
      }
      return color;
    },
    disengagedEmployeesType (type) {
      if (type === 'open') {
        this.actionStatusType = 'open,scheduled,acknowledged,inProgress';
      }
      if (type === 'resolved') {
        this.actionStatusType = 'resolved';
      }
      if (!type) {
        this.actionStatusType = '';
      }
    },
    viewDriverWithFilter (driver) {
      // const t = this.updateEmployeeWithFilterSelected;
      // let tempAllFilters = {};
      // if (t.filters) {
      //   this.$lodash.each(t.filters, (value, key) => {
      //     if (value.length > 0) {
      //       const tempObj = {
      //         [key]: value.length > 1 ? value.join() : value[0],
      //       };
      //       tempAllFilters = { ...tempAllFilters, ...tempObj };
      //     }
      //   });
      // }
      // if (this.dateRangeOptions && this.dateRangeOptions.startDate && this.dateRangeOptions.endDate) {
      //   tempAllFilters.startDate = this.dateRangeOptions.startDate;
      //   tempAllFilters.endDate = this.dateRangeOptions.endDate;
      // }
      // if (this.highPotential.selected && this.highPotential.selected.length > 0) {
      //   tempAllFilters.highPotential = this.highPotential.selected;
      // }
      this.$router.push({ path: `/driver/view/${driver}` });
      // this.$router.push({
      //   path: `/driver/view/${driver}`,
      //   query: {
      //     ...tempAllFilters,
      //   },
      // });
    },
    getDashboardReport () {
      // this.config.initialLoading = true;
      if (this.$refs.ParticipationAnalysis) {
        this.$refs.ParticipationAnalysis.report.stats = false;
      }
      if (this.$refs.DriverEngagement && this.$refs.DriverEngagement.config) {
        this.$refs.DriverEngagement.config.initialLoading = true;
        this.$refs.EmployeeVibes.report.stats = false;
        if (document.getElementById('driverFramework')) {
          document.getElementById('driverFramework').innerHTML = '';
        }
        if (document.getElementById('lineGraph')) {
          document.getElementById('lineGraph').innerHTML = '';
        }
      }
      if (this.$refs.EmployeeVibes && this.$refs.EmployeeVibes.config) {
        this.$refs.EmployeeVibes.config.initialLoading = true;
        this.$refs.EmployeeVibes.report.stats = false;
      }
      const that = this;
      const filters = Object.assign({}, this.updateDashboardFilters);
      if (filters && filters.filters) {
        // filters.filters have the dynamic filters value
        delete filters.filters;
      }
      const queryParams = {
        fields: 'driver_breakdown,engagement_score,mood_analysis,company_participation_stats,company_employee_reach_stats,disengaged_employees_stats,monthwise_engagement_vs_mood_trend,last_milestone,last_milestone_completedAt',
        ...filters
      };
      if (this.updateDashboardFilters && this.updateDashboardFilters.filters) {
        this.$lodash.each(this.updateDashboardFilters.filters, (v, k) => {
          if (v.length > 0) {
            queryParams[`user__profile__${k}__in`] = v.join();
          }
        });
      }
      axios.get(`${process.env.VUE_APP_API_URL}company/dashboard`, {
        params: queryParams
      }).then((response) => {
        // this.config.initialLoading = false;
        if (response && response.data) {
          if (this.$refs && this.$refs.ParticipationAnalysis) {
            this.$refs.ParticipationAnalysis.config.initialLoading = false;
            this.$refs.ParticipationAnalysis.report.employees_reached = response.data.company_employee_reach_stats;
            this.$refs.ParticipationAnalysis.report.chats_completed = response.data.chat_participation_stats;
            this.$refs.ParticipationAnalysis.report.disengaged_employees = response.data.disengaged_employees_stats;
            this.$refs.ParticipationAnalysis.report.engagement_score = response.data.engagement_score ? response.data.engagement_score : null;
            this.$refs.ParticipationAnalysis.report.employee_vibe = response.data.mood_analysis ? response.data.mood_analysis.company_mood_average : null;
            this.$refs.ParticipationAnalysis.dashboardReference = this;

            if (response.data.company_employee_reach_stats || response.data.chat_participation_stats || response.data.disengaged_employees_stats ||
            response.data.driver_breakdown || response.data.mood_analysis || response.data.daily_engagement_stats) {
              this.$refs.ParticipationAnalysis.report.stats = true;
            }
            if (response.data.company_employee_reach_stats) {
              this.$refs.ParticipationAnalysis.generateGaugeGraph(response.data.company_employee_reach_stats);
            }
            if (response.data.daily_engagement_stats) {
              this.$refs.ParticipationAnalysis.report.daily_engagement_stats = response.data.daily_engagement_stats;
            }
          }

          if (this.$refs && this.$refs.DriverEngagement) {
            this.$refs.DriverEngagement.config.initialLoading = false;
            this.$refs.DriverEngagement.report.stats = false;
            this.$refs.DriverEngagement.report.lineGraph = false;
            if (response.data.driver_breakdown) {
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

              if (response.data.driver_breakdown) {
                this.$refs.DriverEngagement.report.stats = true;
              }
            }
          }
          if (this.$refs && this.$refs.EmployeeVibes) {
            if (response.data.mood_analysis || response.data.monthwise_engagement_vs_mood_trend) {
              this.$refs.EmployeeVibes.report.stats = true;
            }
            this.$refs.EmployeeVibes.config.initialLoading = false;
            this.$refs.EmployeeVibes.dashboardReference = this;
            if (response.data.monthwise_engagement_vs_mood_trend) {
              this.$refs.EmployeeVibes.generateLineGraph(response.data.monthwise_engagement_vs_mood_trend);
            }

            if (response.data.mood_analysis) {
              const temp = JSON.parse(JSON.stringify(response.data.mood_analysis));
              const temp2 = [];
              let total = 1;
              this.$lodash.each(temp.company_mood_breakdown, (v, i) => {
                total += v;
              });
              this.$lodash.each(temp.company_mood_breakdown, (v, i) => {
                temp2.push({
                  mood: i,
                  value: v,
                  percent: ((v / total) * 100).toFixed(0)
                });
              });
              temp.company_mood_breakdown = temp2;
              this.$refs.EmployeeVibes.report.mood_analysis = temp;
            }
          }
        }
      }, (response) => {
        // this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch details, Please try again later!'
        });
        throw new Error(response);
      });
    },
    updateEmployeeWithFilter (mood) {
      // const filters = Object.assign({}, this.filters.selected);
      const filters = Object.assign({}, this.updateDashboardFilters);
      // if (filters && filters.activeTab) {
      //   delete filters.activeTab;
      // }
      const employeeFilters = {
        // high_potential_emp: this.highPotential.selected ? this.highPotential.selected : undefined,
        mood__in: mood,
        // user_session__initiated_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        // user_session__initiated_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
        // dynamic filters
        ...filters
      };
      this.$store.dispatch('updateEmployeeFilters', employeeFilters);
      this.$router.push({
        path: '/employees'
      });
    },
    dashFiltersApplied (val) {
      this.isFilterApplied = val;
    },
    filterApplied (val) {
      this.isFilterApplied = val;
      this.getDashboardReport();
    },
    resetDashFilters () {
      this.isFilterApplied = false;
      this.$store.dispatch('updateDashboardFilters', null);
      this.$router.push({
        path: '/'
      });
      this.getDashboardReport();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dashboard-wrap {
  .dash-topbar {
    margin-top: 24px;
  }
  .dashboard-container {
    border-radius: 0.375rem;
    background: var(--bg-panel);
    margin: 0 10px;
    margin-bottom: 20px;
    .dash-action-bar {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      margin-bottom: 10px;
      .breadcrumb {
        padding-left: 12px;
        font-size: var(--heading-size);
        .active {
          color: var(--primary-dark);
        }
      }
      .filter-bar {
        margin-top: 8px;
        display: flex;
        // grid-template-columns: repeat(12, 1fr);
        // grid-gap: 20px;
        // justify-items: end;
        justify-content: flex-end;
      }
    }
  }
}
</style>

<style lang="scss">
.announcekit-widget {
  a {
    color: white !important;
    margin-left: -16px;
    margin-top: -32px;
  }
}
</style>
