<template>
  <div>
    <!-- <div id="pdf"></div> -->
    <div class="flex-row flex-wrap d-flex">
      <v-flex xs12 px-1>
        <div class="mt-3" v-show="config.initialLoading">
          <ContentLoader
            v-if="$route.name !== 'ViewLifecycle'"
            :height="30"
            :width="200"
            :speed="2"
            primaryColor="#e9e7e7"
            secondaryColor="#fff"
          >
            <rect x="0" y="0" rx="1" ry="1" width="36" height="28" />
            <rect x="41" y="0" rx="1" ry="1" width="36" height="28" />
            <rect x="82" y="0" rx="1" ry="1" width="36" height="28" />
            <rect x="123" y="0" rx="1" ry="1" width="36" height="28" />
            <rect x="164" y="0" rx="1" ry="1" width="36" height="28" />
          </ContentLoader>

          <ContentLoader
            v-else
            :height="30"
            :width="200"
            :speed="2"
            primaryColor="#e9e7e7"
            secondaryColor="#fff"
            >
            <rect x="0" y="0" rx="1" ry="1" width="45" height="28" />
            <rect x="50" y="0" rx="1" ry="1" width="45" height="28" />
            <rect x="100" y="0" rx="1" ry="1" width="45" height="28" />
            <rect x="150" y="0" rx="1" ry="1" width="45" height="28" />
          </ContentLoader>
        </div>

        <!-- After intial loading -->
        <div class="mt-3" v-show="!config.initialLoading">
            <!-- <v-layout row wrap> -->
            <div class="flex-row flex-wrap d-flex">
              <!-- Engagement Score -->
              <div class="overview-cards engagement-score"
              :class="$route.name === 'ViewLifecycle' ? 'milestone-dashboard' : ''"
              style="background-color:#fff !important;">
                <p class="pa-3 score-card text-capitalize" style="font-size:16px;">
                  Engagement Score
                  <v-tooltip max-width="200" bottom class="ml-2">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        data-html2canvas-ignore
                        slot="activator"
                        >fas fa-info-circle
                      </v-icon>
                    </template>
                      <span v-if="$route.name === 'ViewLifecycle'"> This is the average engagement score of the company calculated based on the latest conversations with each employee at {{ stage_title }} touchpoint. </span>
                      <span v-else> This is the average engagement score of the company calculated based on the latest conversations with each employee. </span>
                  </v-tooltip>
                </p>
                <div v-if="report && report.engagement_score" class="d-inline-flex w-100">
                  <h1 class="score-card heading text-right pl-2 pr-3"
                    v-if="report && report.engagement_score">
                    {{report.engagement_score.toFixed(1)}}
                  </h1>
                  <h1 class="display-1 text-left pl-0" style="position: relative;left: -5%;"> /5 </h1>
                </div>
                <div v-else>
                  <div class="flex-row flex-wrap d-flex align-center justify-center fill-height" style="height:160px">
                    <v-flex text-center>
                      <strong class="body-2 font-weight-bold grey--text">
                        Not enough data to generate analysis
                      </strong>
                    </v-flex>
                </div>
                </div>
                <div v-if="report.engagement_score" class="card-footer text-capitalize score-card pt-3" style="font-size:14px"
                :style="{
                  background: `linear-gradient(0deg,
                    ${getEngagementScore(report.engagement_score)}24 0%,
                    #ffffff 100%)`
                }">
                {{ getEngagement(report.engagement_score) }}
                </div>
              </div>

              <!-- Employee Vibe -->
              <div class="overview-cards employee-vibe" :class="$route.name === 'ViewLifecycle' ? 'milestone-dashboard' : ''">
                <p class="pa-3 text-capitalize" style="font-size:16px;">
                  Employees’ Vibe
                  <v-tooltip max-width="200" bottom class="ml-2">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        data-html2canvas-ignore
                        slot="activator"
                        >fas fa-info-circle
                      </v-icon>
                    </template>
                      <span v-if="$route.name === 'ViewLifecycle'">   This is the average of employees’ overall feelings at {{ stage_title }} touchpoint. </span>
                      <span v-else> This is the average of employees’ overall feelings about the tenure that they have spent in the organization. </span>
                  </v-tooltip>
                </p>
                <h1 v-if="report && report.employee_vibe"
                  class="score-card score-card-img heading" style="">
                  <v-img class="mb-1" :src="getImgUrl(`${Math.round(report.employee_vibe)}`)">
                  </v-img>
                </h1>
                <div v-if="report && report.employee_vibe" class="card-footer">
                  <!-- <p class="px-1 pt-2 mb-0 text-center"> OVERALL EMPLOYEE VIBE </p> -->
                  <!-- <p class="px-1 mt-1 score-card text-capitalize text-center"
                  style="font-size:20px;font-weight:500">

                  </p> -->
                  <div class="card-footer text-capitalize score-card pt-3" style="font-size:14px">
                {{getMood(`${Math.round(report.employee_vibe)}`)}}
                </div>
                </div>
                <div v-else>
                  <div class="flex-row flex-wrap d-flex align-center justify-center fill-height" style="height:160px">
                    <v-flex text-center>
                      <strong class="body-2 font-weight-bold grey--text">
                        Not enough data to generate analysis
                      </strong>
                    </v-flex>
                </div>
                </div>
              </div>

              <!-- Disengaged Employees -->
              <div class="overview-cards" :class="$route.name === 'ViewLifecycle' ? 'milestone-dashboard' : ''">
                <div class="">
                  <p class="px-3 pt-3 mb-0" style="font-size:16px;">
                    Disengaged Employees
                    <v-tooltip max-width="200" bottom class="ml-2">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          data-html2canvas-ignore
                          slot="activator"
                          >fas fa-info-circle
                        </v-icon>
                      </template>
                        Employees’ whose engagement score is less than or equal to 3 are disengaged.
                    </v-tooltip>
                  </p>
                </div>

                <!-- <h1 class="score-card text-center"
                  v-if="report && report.disengaged_employees && report.disengaged_employees.disengaged_employees > 0"
                  style="font-size: 120px;font-weight:300;margin: 0 auto;top:-13%;
                  position:relative;">
                  {{report.disengaged_employees.disengaged_employees}}
                </h1> -->

                <div v-if="report && report.disengaged_employees && report.disengaged_employees.disengaged_employees > 0"
                class="d-flex w-100 text-center justify-center"
                style="border-bottom: 1px solid rgb(243, 241, 241);">
                  <p class="score-card pa-2 my-2">
                    <!-- <br/> -->
                    <span style="font-size:50px;" class="text-center">
                      {{report.disengaged_employees.disengaged_employees}}
                    </span>
                  </p>
                </div>

                <div class="text-center" v-if="report && report.disengaged_employees && report.disengaged_employees.disengaged_employees > 0">
                    <div class="flex-row flex-wrap d-flex">
                      <v-flex xs6 class="text-center" style="border-right: 1px solid rgb(243, 241, 241);">
                        <p class="mb-0 mt-1">
                          Cases Open
                        </p>
                        <a class="cursor-pointer hover-link" @click="openDisengagedEmployees('open')">
                          <strong> {{report.disengaged_employees.disengaged_cases_open}} </strong>
                        </a>
                      </v-flex>
                      <v-flex xs6 class="text-center">
                        <p class="mb-0 mt-1">
                          Cases Resolved
                        </p>
                        <a class="cursor-pointer hover-link" @click="openDisengagedEmployees('resolved')">
                          <strong> {{report.disengaged_employees.disengaged_cases_resolved}} </strong>
                        </a>
                      </v-flex>
                    </div>
                </div>

                <div v-if="report && report.disengaged_employees && report.disengaged_employees.disengaged_employees === 0"  class="flex-row flex-wrap d-flex align-center justify-center fill-height" style="height:160px">
                    <v-flex class="text-center">
                      <strong class="body-2 font-weight-bold grey--text">
                        <p style="text-align:center; margin:0; font-size:20px;"> Yay! </p>
                        <p style="text-align:center; margin:0;"> You don’t have any disengaged employee </p>
                      </strong>
                    </v-flex>
                </div>
                <div v-if="report && report.disengaged_employees && report.disengaged_employees.disengaged_employees > 0"
                class="card-footer">
                  <p class="px-0 pt-2 mb-0 text-center" style="font-size:12px">
                    {{report.disengaged_employees.disengaged_employees}}
                    out of {{report.disengaged_employees.employees_reached}}
                    employees interacted</p>
                  <p data-html2canvas-ignore class="cursor-pointer hover-link primary--text mb-0 text-center" v-show="$route.name !== 'ViewLifecycle'"
                    @click="openDisengagedEmployees()">
                    View details
                  </p>
                </div>
                <div v-if="!report || !report.disengaged_employees || !report.disengaged_employees.disengaged_employees === 0">
                  <div class="d-flex flex-row flex-wrap align-center justify-center fill-height" style="height:160px">
                    <v-flex class="mt-5 pt-4 text-center">
                      <strong class="body-2 font-weight-bold grey--text">
                        Not enough data to generate analysis
                      </strong>
                    </v-flex>
                </div>
                </div>
              </div>

              <div class="overview-cards" v-if="$route.name !== 'ViewLifecycle'">
                <p class="pa-3 text-capitalize" style="font-size:16px;">
                  Employees reached
                  <v-tooltip max-width="200" bottom class="ml-2">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        data-html2canvas-ignore
                        slot="activator"
                        >fas fa-info-circle
                      </v-icon>
                    </template>
                      Percent of employees to whom Amara has reached out at least once.
                  </v-tooltip>
                </p>

                <div v-show="report && report.employees_reached
                && report.employees_reached.employee_reach"
                id="gaugeChartdiv" class="EmployeeReach"> </div>

                <div v-if="report && report.employees_reached &&
                report.employees_reached.employee_reach" class="card-footer">
                  <p class="px-1 pt-2 mb-0">
                    <a class="cursor-pointer hover-link" @click="listEmployees({user_has_interaction:true})">
                      <strong> {{report.employees_reached.employee_reach}} </strong>
                    </a>
                    out of
                    <a class="cursor-pointer hover-link" @click="listEmployees()">
                      <strong> {{report.employees_reached.total_employees}} </strong>
                    </a>
                  employees have been reached out </p>
                </div>

                <div v-else>
                  <div class="flex-row d-flex flex-wrap align-center justify-center fill-height" style="height:160px">
                    <v-flex class="text-center">
                      <strong class="body-2 font-weight-bold grey--text">
                        Not enough data to generate analysis
                      </strong>
                    </v-flex>
                </div>
                </div>
              </div>

              <!-- Participation Rate -->
              <div class="overview-cards"
                :class="$route.name === 'ViewLifecycle' ? 'milestone-dashboard' : ''">
                <p class="px-3 pt-3 mb-0" style="font-size:16px;">
                  Participation Rate
                  <v-tooltip max-width="200" bottom class="ml-2">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        data-html2canvas-ignore
                        slot="activator"
                        >fas fa-info-circle
                      </v-icon>
                    </template>
                      Percent of chats completed of total chats initiated.
                  </v-tooltip>
                </p>
                <div v-if="report && report.chats_completed &&
                report.chats_completed.chats_initiated"
                class="d-inline-flex w-100 text-center justify-center"
                style="border-bottom: 1px solid rgb(243, 241, 241);">
                  <p class="score-card pa-2 my-2">
                    Aggregated participation rate <br/>
                    <span :style="`font-size:14px;
                    color:${getColor(report.chats_completed.participation_rate)}`">
                      {{report.chats_completed.participation_rate}} %
                    </span>
                  </p>
                </div>

                <div v-if="report && report.chats_completed &&
                  report.chats_completed.chats_initiated"
                  class="text-center">
                  <p class="mb-0 mt-1">
                    Chats
                  </p>
                  <!--<p class="px-2 pt-2 mb-0"> ENGAGEMENT PARTICIPATION
                    <v-tooltip bottom>
                      <v-icon slot="activator"> fas fa-info-circle </v-icon>
                      Enagagement Participation
                    </v-tooltip>
                  </p>-->
                  <!-- <p class="px-2 pt-0 mt-1 mb-2" style="font-size:14px">
                    <a class="cursor-pointer hover-link"
                    @click="listEmployees({status:'completed', stage__id: stageId}, 'session/list') ">
                      <strong>{{report.chats_completed.chats_completed}}</strong>
                    </a>
                    out of {{report.chats_completed.chats_initiated}}
                  </!-->
                  <div class="px-2 pt-0 mt-1 mb-2 w-100" style="font-size:14px">
                    <div class="flex-row d-flex flex-wrap">
                      <v-flex xs3 class="text-center" style="border-right: 1px solid rgb(243, 241, 241);">
                        <p class="mb-0 mt-1">
                          Total
                        </p>
                        <a class="cursor-pointer hover-link"
                        @click="listEmployees({status:'', stage__id: stageId}, 'session/list') ">
                          <strong>{{report.chats_completed.chats_initiated}}</strong>
                        </a>
                      </v-flex>
                      <v-flex xs5 class="text-center" style="border-right: 1px solid rgb(243, 241, 241);">
                        <p class="mb-0 mt-1">
                          In Progress
                        </p>
                        <a class="cursor-pointer hover-link"
                        @click="listEmployees({status:'inProgress', stage__id: stageId}, 'session/list') ">
                          <strong>{{report.chats_completed.chats_inProgress}}</strong>
                        </a>
                      </v-flex>
                      <v-flex xs4 class="text-center">
                        <p class="mb-0 mt-1">
                          Completed
                        </p>
                        <a class="cursor-pointer hover-link"
                        @click="listEmployees({status:'completed', stage__id: stageId}, 'session/list') ">
                          <strong>{{report.chats_completed.chats_completed}}</strong>
                        </a>
                      </v-flex>
                    </div>
                  </div>
                  <div
                    :style="{
                      background: `linear-gradient(0deg,
                        ${getColor(report.chats_completed.participation_rate)}24 0%,
                        #ffffff 100%)`
                    }"
                    class="text-center card-footer">
                    <p class="px-2 pt-2 mb-0"> Average score accuracy </p>
                    <p class="px-2 text-capitalize mb-0"
                      :style="`font-size:14px;
                      color:${getColor(report.chats_completed.participation_rate)}`">
                      {{scoreAccuracy(report.chats_completed.participation_rate)}}
                    </p>
                  </div>
                </div>
                <!--<div id="chartdiv" class="dailyResponseGraph"> </div>-->
                <div v-else style="position:relative;top:14%;">
                  <div class="flex-row flex-wrap align-center justify-center fill-height" style="height:160px;">
                    <v-flex class="text-center">
                      <strong class="body-2 font-weight-bold grey--text">
                        Not enough data to generate analysis
                      </strong>
                    </v-flex>
                </div>
                </div>
              </div>
              <!-- Employee Reach -->
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
import listEmployees from '../listEmployees';

// import html2canvas from 'html2canvas';
// import * as JsPDF from 'jspdf';
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';

import Anychart from 'anychart';
import VueAnychart from '../../analytics/VueAnychart';

// import {
//   VCheckbox,
//   VAvatar,
//   VTooltip,
//   VAlert,
//   VProgressLinear,
//   VProgressCircular,
//   VChip
// } from 'vuetify';

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
    // VueAnychart
  },
  data () {
    return {
      dateRangeOptions: {},
      open: false,
      title: '',
      stageId: null,
      stage_title: null,
      filters: {},
      sessions: {},
      report: {
        employees_reached: {},
        chats_completed: {},
        disengaged_employees: {}
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
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    getMood (value) {
      let mood = '';
      if (value === '1') {
        mood = 'Terrible';
      } else if (value === '2') {
        mood = 'Disappointed';
      } else if (value === '3') {
        mood = 'Okay';
      } else if (value === '4') {
        mood = 'Good';
      } else if (value === '5') {
        mood = 'Awesome';
      }
      return mood;
    },
    getEngagementScore (score) {
      let color = '#fff';
      if (score) {
        if (score <= 3) {
          color = '#f44336';
        } else if (score <= 4) {
          color = '#ff9800';
        } else if (score <= 5) {
          color = '#4caf50';
        }
      }
      return color;
    },
    getEngagement (score) {
      let engagement = '';
      if (score) {
        if (score <= 3) {
          engagement = 'Disengaged';
        } else if (score <= 4) {
          engagement = 'Passively engaged';
        } else if (score <= 5) {
          engagement = 'Highly engaged';
        }
      }
      return engagement;
    },
    scoreAccuracy (value) {
      let accuracy = '';
      if (value >= 60) {
        accuracy = 'high';
      } else if (value >= 45 && value < 60) {
        accuracy = 'medium';
      } else if (value < 45) {
        accuracy = 'low';
      }
      return accuracy;
    },
    getColor (value) {
      let color = '';
      if (value >= 60) {
        color = '#4caf50';
      } else if (value >= 45 && value < 60) {
        color = '#ff9800';
      } else if (value < 45) {
        color = '#f44336';
      }
      return color;
    },
    openDisengagedEmployees (type) {
      this.$router.push({
        path: '/',
        query: { tab: 'disengaged-emp-to-meet' }
      });
      // this.$store.dispatch('updateFilters', tempFilters);
      this.$emit('disengagedEmployeesType', type);
      setTimeout(() => {
        this.dashboardReference.disengagedActiveTab = 'tab-disengaged-list';
        // this.dashboardReference.addRef('need-to-meet');
      }, 100);
    },
    // generateDailyCompletionGraph(data), {
    //   const that = this;
    //   if (Object.keys(data).length) {
    //     this.stats = true;
    //   }
    //   if (this.report && this.report.stats && this.stats) {
    //     // Create chart instance
    //     const chart = am4core.create('chartdiv', am4charts.XYChart);

    //     chart.marginRight = 400;
    //     const chartData = [];
    //     this.$lodash.each(data, (v, k) => {
    //       if (chartData.length <= 10) {
    //         chartData.push({
    //           date: v.chat_date,
    //           count: v.count,
    //           total: 100 - v.count,
    //         });
    //       }
    //     });

    //     // Add data
    //     chart.data = chartData;

    //     const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    //     categoryAxis.dataFields.category = "date";
    //     categoryAxis.title.text = '';
    //     categoryAxis.renderer.grid.template.disabled = true;
    //     categoryAxis.renderer.labels.template.disabled = true;
    //     categoryAxis.renderer.minGridDistance = 1;
    //     // categoryAxis.renderer.labels.template.rotation = 270;
    //     // categoryAxis.renderer.grid.template.location = 0;
    //     // categoryAxis.renderer.minGridDistance = 20;

    //     const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //     valueAxis.title.text = "";
    //     valueAxis.renderer.grid.template.disabled = true;
    //     valueAxis.renderer.labels.template.disabled = true;
    //     // valueAxis.renderer.minGridDistance = 1;

    //     // Create series
    //     const series = chart.series.push(new am4charts.ColumnSeries());
    //     series.dataFields.valueY = "count";
    //     series.dataFields.categoryX = "date";
    //     series.name = "Responses";
    //     series.columns.template.tooltipHTML = `Date: <b> {date} <br>
    //     Number of Responses: {count}`;
    //     series.fill = am4core.color("#37b99c");

    //     // series.colors.list = [
    //     //   am4core.color("#37b99c"),
    //     //   am4core.color("grey"),
    //     // ];

    //     series.stacked = true;

    //     // chart.exporting.menu = new am4core.ExportMenu();
    //     // Add cursor
    //     // chart.cursor = new am4charts.XYCursor();
    //   }
    // },
    // generateGaugeGraph(data) {
    //   const that = this;
    //   if (Object.keys(data).length) {
    //     this.stats = true;
    //   }
    //   if (this.report && this.report.stats && this.stats && this.$route.name !== 'ViewLifecycle' &&
    //   this.report.employees_reached && this.report.employees_reached.employee_reach) {
    //     // Create chart instance
    //     const chart = am4core.create("gaugeChartdiv", am4charts.GaugeChart);
    //     chart.innerRadius = -20;

    //     const axis = chart.xAxes.push(new am4charts.ValueAxis());
    //     axis.min = 0;
    //     axis.max = 100;
    //     axis.strictMinMax = true;

    //     const label = chart.radarContainer.createChild(am4core.Label);
    //     label.fontSize = 30;
    //     label.x = am4core.percent(50);
    //     label.y = am4core.percent(100);
    //     label.horizontalCenter = "middle";
    //     label.verticalCenter = "bottom";
    //     label.text = `${data.employee_reach_percent} %`;

    //     const totalRange = axis.axisRanges.create();
    //     totalRange.value = (data.employee_reach / data.total_employees) * 100;
    //     totalRange.endValue = (data.total_employees / data.total_employees) * 100;
    //     totalRange.axisFill.fillOpacity = 1;
    //     totalRange.axisFill.fill = am4core.color("#808080");
    //     totalRange.axisFill.zIndex = -1;

    //     const range = axis.axisRanges.create();
    //     range.value = 0;
    //     range.endValue = (data.employee_reach / data.total_employees) * 100;
    //     range.axisFill.fillOpacity = 1;
    //     range.axisFill.fill = am4core.color("#4c3e9d");
    //     range.axisFill.zIndex = 0;

    //     const hand = chart.hands.push(new am4charts.ClockHand());
    //     hand.value = (data.employee_reach / data.total_employees) * 100;
    //     hand.innerRadius = am4core.percent(50);
    //     hand.radius = am4core.percent(80);
    //     hand.startWidth = 15;
    //     hand.pin.disabled = true;
    //   }
    // },
    generateGaugeGraph (data) {
      const that = this;
      if (document.getElementById('gaugeChartdiv')) {
        document.getElementById('gaugeChartdiv').innerHTML = '';
      }
      if (Object.keys(data).length) {
        this.stats = true;
      }
      if (this.report && this.report.stats && this.stats && this.$route.name !== 'ViewLifecycle' &&
      this.report.employees_reached && this.report.employees_reached.employee_reach) {
        const gaugeData = [];
        gaugeData.push(data.employee_reach_percent);
        // Create chart instance

        var gauge = Anychart.gauges.circular();
        gauge.fill('#fff')
          .stroke(null)
          .padding(0)
          .margin(0)
          .startAngle(270)
          .sweepAngle(180);

        gauge.axis()
          .labels()
          .padding(0)
          .fontSize(8)
          .fontColor('black')
          .fontWeight(600)
          .position('outside')
          .format('{%Value}%');

        gauge.data(gaugeData);
        gauge.axis().scale()
          .minimum(0)
          .maximum(100)
          .ticks({ interval: 10 })
          .minorTicks({ interval: 5 });

        gauge.axis()
          .fill('grey')
          .radius(85)
          .width(0)
          .ticks({ type: 'line', fill: 'white', length: 2 });

        gauge.title('');

        gauge.needle(0)
          .enabled(true)
          .startRadius("-5%")
          .endRadius("80%")
          .middleRadius(0)
          .startWidth("0.1%")
          .endWidth("0.1%")
          .middleWidth("5%");

        gauge.cap()
          .radius('10%')
          .enabled(false)
          .fill('#545f69');

        gauge.range(0, {
          from: 0,
          to: `${data.employee_reach_percent}`,
          position: 'inside',
          fill: '#4c3e9d',
          startSize: 30,
          endSize: 30,
          radius: 80
        });

        gauge.range(1, {
          from: `${data.employee_reach_percent}`,
          to: 100,
          position: 'inside',
          fill: 'grey',
          startSize: 30,
          endSize: 30,
          radius: 80
        });

        gauge.container('gaugeChartdiv');
        gauge.draw();
      }
    },
    listEmployees (filters, url) {
      this.$refs.listEmployees.pagination.page = 1;
      this.$refs.listEmployees.sentimentEnabled = false;
      this.$refs.listEmployees.dialogs.listEmployee = true;
      this.$refs.listEmployees.getEmployeesToMeet(filters, url);
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
  &.engagement-score {
    .score-card {
      &.heading {
        font-weight: 400!important;
        width: 80%!important;
        max-width: 80%!important;
      }
      &.subheading {
        width: 20%!important;
        max-width: 20%!important;
      }
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
.EmployeeReach {
  height: 140px!important;
  width: 98%!important;
  margin: 8px auto 8px auto!important;
  position: relative!important;
  top:-25px!important;
}
</style>
