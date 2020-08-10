<template>
  <div>
    <div class="d-flex flex-row flex-wrap">
      <v-flex xs12 px-1>
        <div class="mt-3" v-show="config.initialLoading">
          <ContentLoader
            :height="30"
            :width="200"
            :speed="2"
            primaryColor="#e9e7e7"
            secondaryColor="#fff"
            >
            <rect x="1" y="0" rx="1" ry="1" width="64" height="28" />
            <rect x="68" y="0" rx="1" ry="1" width="64" height="28" />
            <rect x="134" y="0" rx="1" ry="1" width="65" height="28" />
          </ContentLoader>
        </div>

        <!-- After intial loading -->
        <div class="mt-3" v-show="!config.initialLoading">
            <div class="d-flex flex-row flex-wrap">
              <!-- Engagement Score -->
              <!-- <div class="overview-cards engagement-score"
              :style="report.engagement_score ?
              `color:#fff;background-color:${getEngagementScore(report.engagement_score)}` :
              `color:#000;background-color:${getEngagementScore(report.engagement_score)}`"> -->
              <div class="overview-cards engagement-score">
                <p class="pa-3 score-card text-capitalize" style="font-size:16px !important" v-if="$route.params.driver"> {{ $route.params.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} Score </p>
                <p class="pa-3 score-card text-capitalize" style="font-size:16px !important" v-else> Driver Score </p>
                <div v-if="report && report.engagement_score" class="d-inline-flex w-100">
                  <h1 class="score-card heading text-xs-right text-capitalize" style="width:60%"
                    v-if="report && report.engagement_score">
                    {{report.engagement_score.toFixed(1)}}
                  </h1>
                  <h1 class="score-card subheading text-capitalize text-xs-left" style="width:40%"> /5 </h1>
                </div>
                <div v-else>
                  <v-layout row wrap align-center justify-center fill-height style="height:160px">
                    <v-flex text-xs-center>
                      <strong class="body-2 font-weight-bold grey--text">
                        Not enough data to generate analysis
                      </strong>
                    </v-flex>
                </v-layout>
                </div>
              </div>

              <!-- Score over time -->
              <div class="overview-cards">
                <p class="px-3 pt-3 mb-0 text-capitalize" style="font-size:16px !important"> Score Over Time </p>

                <div v-show="report && report.monthwise_driver_trend"
                id="lineGraph" class="lineGraph"> </div>

                <div class="pt-3 mt-3" v-show="!report || !report.monthwise_driver_trend">
                  <div class="d-flex flex-row flex-wrap align-center justify-center fill-height" style="height:160px">
                    <v-flex class="text-center">
                      <strong class="body-2 font-weight-bold grey--text">
                        Not enough data to generate analysis
                      </strong>
                    </v-flex>
                </div>
                </div>
              </div>

              <!-- No of people unhappy with <Driver> -->
              <div class="overview-cards">
                <p class="pa-3 score-card text-capitalize" style="font-size:16px !important"> Number of Disengaged employees </p>
                <div v-if="report && report.disengaged_employees"
                class="d-inline-flex w-100 text-xs-center"
                style="border-bottom: 1px solid rgb(243, 241, 241);">
                  <h1 class="score-card heading w-100 text-xs-center"> <span class="cursor-pointer" @click="goToEmployeeList()">{{report.disengaged_employees}} </span>
                    <v-btn color="primary" @click.stop="goToEmployeeList()" outline style="display:block; font-size:14px; margin-left:36%; padding: 0 10px;">view employees</v-btn>
                  </h1><br>

                </div>

                <div v-else->
                  <div class="d-flex flex-row flex-wrap align-center justify-center fill-height" style="height:160px;">
                    <v-flex class="text-center">
                      <strong class="body-2 font-weight-bold grey--text">
                        Not enough data to generate analysis
                      </strong>
                    </v-flex>
                  </div>
                </div>
                <!-- <div>
                  <button>abc</button>
                </div> -->
              </div>
            </div>
        </div>
      </v-flex>
    </div>

    <listEmployees ref="listEmployees" />
  </div>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable quotes */
import { mapState } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import listEmployees from '../analytics/listEmployees';
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';
// import {
//   VCheckbox,
//   VAvatar,
//   VTooltip,
//   VAlert,
//   VProgressLinear,
//   VProgressCircular,
//   VChip,
// } from 'vuetify';
import Anychart from 'anychart';
// import VueAnychart from '../../components/analytics/VueAnychart';

// am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_kelly);

export default {
  name: 'EmployeesList',
  components: {
    ContentLoader,
    // VCheckbox,
    // VAvatar,
    // VTooltip,
    // VAlert,
    // VChip,
    // VProgressLinear,
    // VProgressCircular,
    listEmployees
    // VueAnychart,
  },
  data () {
    return {
      dateRangeOptions: {},
      open: false,
      title: '',
      stageId: null,
      filters: {},
      sessions: {},
      report: {
        engagement_score: 0,
        employees_reached: 0,
        chats_completed: 0,
        disengaged_employees: 0
      },
      dashboardReference: {},
      pagination: {
        rowsPerPage: 10
      },
      stats: false,
      config: {
        actionMenu: {},
        activeTab: 'high_risk_session',
        panel: [true, true, true, true],
        initialLoading: true,
        loading: false,
        initialLoadingFilters: true
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    goToEmployeeList () {
      // console.log('data', this.$route.params.driver);
      this.$emit('updateEmpWithDriver', this.$route.params.driver);
      // this.$router.push({ path: `/employees?disengaged_from_driver=${this.$route.params.driver}` });
    },
    getEngagementScore (score) {
      let color = '#fff';
      if (score) {
        if (score <= 3) {
          color = '#f44336';
        } else if (score <= 4) {
          color = '#ff9800';
        } else if (score <= 5) {
          color = '#37b99c';
        }
      }
      return color;
    },
    openDisengagedEmployees () {
      this.$router.push({
        query: { activeTab: 'need-to-meet' }
      });
      this.dashboardReference.getDisengagedEmployeesDashboard();
    },
    generateLineGraph (data) {
      if (document.getElementById('lineGraph')) {
        document.getElementById('lineGraph').innerHTML = '';
      }

      const that = this;
      const chart = Anychart.line();
      // chart.animation(true);
      // chart.padding([10, 40, 5, 20]);
      chart.title('');

      // create bar series with passed data
      var series = chart.line(data.reverse());

      // set tooltip settings
      series.tooltip()
        .position('right')
        .anchor('left-center')
        .offsetX(5)
        .offsetY(0)
        .titleFormat('{%X}')
        .format('{%Value}');

      // adjust markers of a series
      const markers = series.markers();
      markers.enabled(true);
      markers.fill("#edebf5");
      markers.stroke("2 #4c3e9d");
      const hoverMarkers = series.hovered().markers();
      hoverMarkers.fill("#4c3e9d");
      hoverMarkers.stroke("2 #4c3e9d");

      // set yAxis labels formatter
      chart.xAxis().labels().rotation(-60);
      chart.yAxis().labels().format('{%Value}{groupsSeparator: }');

      // set titles for axises
      chart.xAxis().title('');
      chart.yAxis().title('');
      chart.interactivity().hoverMode('by-x');
      chart.tooltip().positionMode('point');

      chart.xScale().mode('continuous');

      chart.yScale().maximum(5);
      chart.yScale().ticks().interval(1);

      // set container id for the chart
      chart.container('lineGraph');
      // initiate chart drawing
      chart.draw();
    },
    listEmployees () {
      this.$refs.listEmployees.pagination.page = 1;
      this.$refs.listEmployees.dialogs.listEmployee = true;
      this.$refs.listEmployees.getEmployeesToMeet();
    }
  },
  watch: {
  },
  beforeMount () {
    if (this.$route.params && this.$route.params.stageId) {
      // this.getFilters();
      this.stageId = this.$route.params.stageId;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.overview-cards {
  width: 33%!important;
  .score-card {
    &.heading {
      font-weight: 400!important;
    }
  }
}
.theme--light {
  &.v-table {
    tbody {
      tr {
        &:not(:last-child) {
          border-bottom: 1px solid rgb(243, 241, 241)!important;
        }
      }
    }
  }
}
.v-progress-circular__info {
  text-align: center!important;
  font-size: 16px!important;
}
.dailyResponseGraph {
  height: 180px!important;
  width: 100%!important;
  margin: 8px auto 8px auto!important;
  top:-60px!important;
}
.lineGraph {
  height: 210px!important;
  width: 90%!important;
  margin: 0px auto !important;
  top:-18px!important;
  left: -5px!important;
}
.drivers-emp-list {
  &:hover {
    cursor: pointer;
    color: #4c409d;
  }
}
</style>
