<template>
  <div>
    <!-- <div id="pdf"></div> -->
    <div class="flex-row flex-wrap d-flex">
      <v-flex xs12 class="px-2">
        <!--<div class="d-inline-flex w-100 mb-0 px-5 py-3" style="background-color:#364953;color:#fff">
          <h2> Employee Vibes </h2>
          <h2 class="text-xs-right" v-if="report && report.company_mood_average"> Average : 4.2 / 5 </h2>
          <h2 class="text-xs-right" v-else> Average : 0 / 5 </h2>
        </div>-->
        <div class="mt-0" v-show="config.initialLoading">
          <div>
            <v-flex xs6 class="pr-1">
              <div class="my-2 py-0 d-flex flex-row flex-wrap">
                <v-flex xs12>
                  <div class="vibes-cards">
                    <ContentLoader
                      :height="50"
                      :width="100"
                      :speed="2"
                      primaryColor="#e9e7e7"
                      secondaryColor="#fff"
                      >
                      <rect x="10" y="2" rx="2" ry="2" width="54.8" height="2" />

                      <rect x="10" y="6" rx="2" ry="2" width="80" height="5" />
                      <rect x="10" y="14" rx="2" ry="2" width="80" height="5" />
                      <rect x="10" y="22" rx="2" ry="2" width="80" height="5" />
                      <rect x="10" y="30" rx="2" ry="2" width="80" height="5" />
                      <rect x="10" y="38" rx="2" ry="2" width="80" height="5" />
                      <rect x="10" y="45" rx="2" ry="2" width="80" height="5" />
                    </ContentLoader>
                  </div>
                </v-flex>
              </div>
            </v-flex>
            <v-flex xs6 class="pl-1">
              <div class="my-2 py-0 d-flex flex-row flex-wrap">
                <v-flex xs12>
                  <div class="vibes-cards">
                    <ContentLoader
                      :height="50"
                      :width="200"
                      :speed="2"
                      primaryColor="#e9e7e7"
                      secondaryColor="#fff"
                    >
                      <rect x="10" y="2" rx="2" ry="2" width="54.8" height="2" />
                      <rect x="10" y="6" rx="2" ry="2" width="180" height="44" />
                    </ContentLoader>
                  </div>
                </v-flex>
              </div>
            </v-flex>
          </div>
        </div>

        <!-- After intial loading -->
        <div class="mt-0 pb-2" v-show="!config.initialLoading">
            <div class="d-flex">
              <v-flex xs6 class="pr-1">
                <div class="mb-2 py-0 d-flex flex-row flex-wrap" v-show="report && report.stats">
                  <v-flex xs12 class="text-center">
                    <div class="vibes-cards">
                      <p class="pa-3 text-left mb-0 text-capitalize heading"> Employees’ Vibe </p>
                      <div v-if="report && report.mood_analysis && report.mood_analysis.company_mood_breakdown">
                        <v-flex xs12 class="custom-div-2">
                          <div class="px-2 mb-3" v-for="(mood, di) in report.mood_analysis.company_mood_breakdown" :key="di">
                            <div class="d-flex flex-wrap w-100" v-if="mood.mood !== '0'">
                              <v-flex xs2 class="ml-3">
                                <v-img class="mt-2" :src="getImgUrl((mood.mood))" style="height:40px;width:40px"> </v-img>
                              </v-flex>

                              <v-flex xs6>
                                <div class="d-flex flex-row flex-wrap">
                                  <v-flex xs5 class="text-xs-left d-inline-flex">
                                    <p class="heading"> {{ mood.value }}&nbsp;
                                      <span style="font-size: 12px;">({{mood.percent}}%)</span></p>
                                    <!-- <small class="text-muted" style="position:relative;top:6px"> ({{mood.percent}} %) </small> -->
                                  </v-flex>
                                  <v-flex xs1>
                                  </v-flex>
                                  <v-flex xs6 style="color:rgba(0,0,0,0.5)" class="mt-3 text-right">
                                    {{getName(mood.mood)}}
                                  </v-flex>
                                </div>
                                <v-progress-linear
                                :class="mood.mood === '5' ? 'greenBg' : '' || mood.mood === '4' ? 'lightGreenBg' : '' || mood.mood === '3' ? 'orangeBg' : '' || mood.mood === '2' ? 'lightRedBg' : '' || mood.mood === '1' ? 'redBg' : ''"
                                class="mt-0" :color="getSeriesColor(mood.mood)" :value="getMoodPercentage(mood.value)"></v-progress-linear>
                              </v-flex>

                              <v-flex data-html2canvas-ignore xs3 class="mx-3">
                                <v-btn color="#4c3e9d" outlined
                                  class="text-capitalize btn-text"
                                  style="position:relative;top:15px;height:30px"
                                  @click="listEmployees(mood.mood)">
                                    View Details
                                </v-btn>
                              </v-flex>
                            </div>
                          </div>
                        </v-flex>
                      </div>

                      <div v-else style="height:300px">
                        <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                          <v-flex class="text-center">
                            <strong class="body-2 font-weight-bold grey--text">
                              Not enough data to generate analysis
                            </strong>
                          </v-flex>
                        </div>
                      </div>
                    </div>
                  </v-flex>
                </div>

                <div class="d-flex flex-row flex-wrap justify-center fill-height vibes-cards" v-if="!report || !report.stats">
                  <v-flex class="text-center">
                    <p class="pa-3 text-xs-left mb-0 text-capitalize heading"> Employees’ Vibe </p>

                    <div style="height:300px">
                      <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                        <v-flex class="text-center">
                          <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-flex>

              <!-- Monthwise Engagement Trend -->
              <v-flex xs6 class="pl-1">
                <div class="mb-2 py-0 flex-row flex-wrap" v-show="report && report.stats">
                  <v-flex xs12 class="text-center">
                    <div class="vibes-cards">
                      <div class="d-inline-flex w-100">
                        <p class="px-3 pt-3 mb-0 text-xs-left heading text-capitalize">
                          Engagement Over Time
                          <!-- <v-tooltip max-width="200" bottom class="ml-2">
                            <v-icon
                            slot="activator"
                            >fas fa-info-circle</v-icon>
                              Employees who have an engagement score of less than or equal to 2.5 are defined as high-risk employees.
                          </v-tooltip>-->
                        </p>
                        <!-- <a class="cursor-pointer hover-link" @click="openDisengagedEmployees()"
                          v-if="report && report.high_risk_employees">
                          <p class="px-3 pt-3 mb-0 text-xs-right"> View all disengaged employees </p>
                        </a>-->
                      </div>

                      <!-- <vue-anychart id="engagementChart"> </vue-anychart> -->
                      <div id="engagementChart"> </div>

                      <div v-if="false" style="height:300px">
                        <div class="flex-row flex-wrap align-center justify-center fill-height">
                          <v-flex class="text-center">
                            <strong class="body-2 font-weight-bold grey--text">
                              Not enough data to generate analysis
                            </strong>
                          </v-flex>
                        </div>
                      </div>
                    </div>
                  </v-flex>
                </div>

                <div class="vibes-cards d-flex flex-row flex-wrap justify-center fill-height" v-if="!report || !report.stats">
                  <v-flex class="text-center">
                    <div>
                      <div class="d-inline-flex w-100">
                        <p class="px-3 pt-3 mb-0 text-xs-left heading text-capitalize">
                          Engagement Over Time
                          <!-- <v-tooltip max-width="200" bottom class="ml-2">
                            <v-icon
                            slot="activator"
                            >fas fa-info-circle</v-icon>
                              Employees who have an engagement score of less than or equal to 2.5 are defined as high-risk employees.
                          </v-tooltip>-->
                        </p>
                      </div>

                      <div style="height:300px">
                        <div class="flex-row flex-wrap align-center justify-center fill-height">
                          <v-flex class="text-center">
                            <strong class="body-2 font-weight-bold grey--text">
                              Not enough data to generate analysis
                            </strong>
                          </v-flex>
                        </div>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-flex>

              <!-- High Risk Employees -->
              <!-- <v-flex xs6 class="pl-1">
                <v-layout class="mb-2 py-0" row wrap v-show="report && report.stats">
                  <v-flex xs12 text-xs-center>
                    <div class="vibes-cards">
                      <div class="d-inline-flex w-100">
                        <p class="px-3 pt-3 mb-0 text-xs-left font-weight-bold">
                          HIGH RISK EMPLOYEES
                          <v-tooltip max-width="200" bottom class="ml-2">
                            <v-icon
                            slot="activator"
                            >fas fa-info-circle</v-icon>
                              Employees who have an engagement score of less than or equal to 2.5 are defined as high-risk employees.
                          </v-tooltip>
                        </p>
                        <a class="cursor-pointer hover-link" @click="openDisengagedEmployees()"
                          v-if="report && report.high_risk_employees">
                          <p class="px-3 pt-3 mb-0 text-xs-right"> View all disengaged employees </p>
                        </a>
                      </div>

                      <v-data-table
                        v-if="report && report.high_risk_employees && report.high_risk_employees.length"
                        v-show="!config.initialLoading"
                        :headers="table.headers"
                        :items="report.high_risk_employees"
                        :loading="table.loading"
                        class="mb-3 pt-2 px-2 audience-list"
                        :total-items="report.high_risk_employees ? report.high_risk_employees.length: 0"
                      >
                        <template slot="headers" slot-scope="props">
                          <tr style="border-color:#f3f1f1">
                            <th class="text-xs-left sub-heading"
                              :style="`max-width:${header.width}px;word-break: break-all;  color:rgba(0,0,0,0.54); font-size:14px !important;`"
                              v-for="header in props.headers"
                              :key="header.text"
                            >
                              {{ header.text }}
                            </th>
                          </tr>
                        </template>

                        <template slot="items" slot-scope="props">
                          <tr v-if="props.item" style="border-color:#f3f1f1">
                            <td class="text-xs-left"
                            style="max-width:100px;word-break: break-all;">
                              <v-layout row wrap align-center>
                                <v-flex>
                                  <p class="mb-0 text-vertical-align" :class="'hover-link cursor-pointer'" v-show="(props.item.first_name || props.item.last_name)">

                                      {{props.item.first_name}} {{props.item.last_name}}
                                  </p>
                                </v-flex>
                              </v-layout>
                            </td>

                            <td class="text-xs-left text-truncate" v-if="props.item.driver_average"
                            style="max-width:110px;word-break: break-all;">
                              {{props.item.driver_average}}
                            </td>
                            <td class="text-xs-left" v-else>
                              --
                            </td>

                            <td class="text-xs-left"
                            style="max-width:120px;word-break: break-all;">
                              <span v-if="props.item.last_milestone"> {{props.item.last_milestone}} </span>
                              <span v-else> -- </span>
                            </td>

                            <td class="text-xs-left"
                            style="max-width:120px;word-break: break-all;">
                              <span v-if="props.item.last_milestone_completed"> {{dayjs(props.item.last_milestone_completed).from() }} </span>
                              <span v-else> -- </span>
                            </td>

                            <td class="text-xs-left"
                            style="max-width:150px;word-break: break-all;">
                              <v-btn color="primary" outline
                                class="text-capitalize sub-heading"
                                style="height:30px"
                                @click="viewEmployee(props.item);">
                                  <span class="btn-text"> View details</span>
                              </v-btn>
                            </td>
                          </tr>
                        </template>

                        <v-card slot="no-data" class="elevation-0 text-xs-center" min-height="60vh">
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

                      <div v-else style="height:300px">
                        <v-layout row wrap align-center justify-center fill-height>
                          <v-flex text-xs-center>
                            <strong class="body-2 font-weight-bold grey--text">
                              Not enough data to generate analysis
                            </strong>
                          </v-flex>
                        </v-layout>
                      </div>
                    </div>
                  </v-flex>
                </v-layout>

                <v-layout class="vibes-cards" v-if="!report || !report.stats" row wrap justify-center fill-height>
                  <v-flex text-xs-center>
                    <div >
                      <div class="d-inline-flex w-100">
                        <p class="px-3 pt-3 mb-0 text-xs-left heading">
                          High Risk Employees
                          <v-tooltip max-width="200" bottom class="ml-2">
                            <v-icon
                            slot="activator"
                            >fas fa-info-circle</v-icon>
                              Employees who have an engagement score of less than or equal to 2.5 are defined as high-risk employees.
                          </v-tooltip>
                        </p>
                      </div>

                      <div style="height:300px">
                        <v-layout row wrap align-center justify-center fill-height>
                          <v-flex text-xs-center>
                            <strong class="body-2 font-weight-bold grey--text">
                              Not enough data to generate analysis
                            </strong>
                          </v-flex>
                        </v-layout>
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex> -->
            </div>
        </div>
      </v-flex>
    </div>

    <listEmployees ref="listEmployees" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import listEmployees from '../listEmployees';
// import html2canvas from 'html2canvas';
// import * as JsPDF from 'jspdf';

// import axios from 'axios';
// import Anychart from 'anychart';
// import VueAnychart from '../../analytics/VueAnychart';

import 'amcharts3';
import 'amcharts3/amcharts/serial';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs-ext/plugin/customParseFormat';
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

// import {
//   VCheckbox,
//   VAvatar,
//   VTooltip,
//   VAlert,
//   VProgressLinear,
//   VProgressCircular,
//   VChip,
// } from 'vuetify';

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
    // dayjs,
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
        stats: {
          employees_reached: '500 / 1000',
          chats_completed: '100 / 500',
          disengaged_employees: '40 / 1000'
        },
        perc_stats: {
          employees_reached: 50,
          chats_completed: 20,
          disengaged_employees: 4
        },
        drivers: []
      },
      dashboardReference: {},
      table: {
        headers: [{
          text: 'Name',
          align: 'left',
          width: 100,
          sortable: false
        }, {
          text: 'Engagement Score',
          align: 'left',
          width: 110,
          sortable: false
        }, {
          text: 'Last Touchpoint',
          align: 'left',
          width: 120,
          sortable: false
        }, {
          text: 'Last Chat',
          align: 'left',
          width: 120,
          sortable: false
        }, {
          text: 'Actions',
          align: 'left',
          width: 150,
          sortable: false
        }]
      },
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
    openDisengagedEmployees () {
      this.$router.push({
        query: { activeTab: 'need-to-meet' }
      });
      this.dashboardReference.getDisengagedEmployeesDashboard();
    },
    generateLineGraph (data) {
      const formattedData = [];
      this.$lodash.each(data, (v) => {
        formattedData.push({
          // month: v.month,
          month: dayjs(v.month, { format: 'DD MM YY' }).format('MMM \'YY'),
          bullet: this.getImgUrl(`${Math.round(v.engagement_stats.month_mood_average)}`),
          ...v.engagement_stats
        });
      });
      console.log('generateLineGraph -> formattedData', formattedData);
      window.AmCharts.makeChart('engagementChart', {
        type: 'serial',
        theme: 'none',
        legend: {
          useGraphSettings: true
        },
        dataProvider: formattedData,
        valueAxes: [{
          integersOnly: true,
          maximum: 5,
          minimum: 1,
          reversed: false,
          axisAlpha: 0,
          dashLength: 5,
          gridCount: 10,
          position: 'left',
          title: 'Score',
          titleBold: false
        }],
        startDuration: 0.5,
        graphs: [{
          balloonText: 'Driver average: [[value]]',
          bullet: 'round',
          bulletSize: 20,
          lineColor: '#0d2c8d',
          title: 'Monthly driver average',
          valueField: 'month_driver_average',
          fillAlphas: 0
        }, {
          customBulletField: 'bullet',
          bulletSize: 20,
          id: 'g1',
          balloonText: 'Chats initiated: [[chats_initiated]]\n Chats completed: [[chats_completed]]\n Participation rate: [[participation_rate]] %\n Company vibe average: [[month_mood_average]]\n',
          bullet: 'round',
          labelText: '[[stage__title]]',
          labelPosition: 'bottom',
          lineThickness: 2,
          type: 'smoothedLine',
          valueField: 'month_mood_average',
          title: 'Monthly mood average'
        }],
        chartCursor: {
          cursorAlpha: 0,
          zoomable: false
        },
        categoryField: 'month',
        dataDateFormat: 'YYYY-MM-DD',
        categoryAxis: {
          gridPosition: 'start',
          axisAlpha: 0,
          fillAlpha: 0.05,
          fillColor: '#000000',
          gridAlpha: 0
        }
      });
    },
    // generateLineGraph(data) {
    //   if (this.report && this.report.stats) {
    //     if (document.getElementById("engagementChart")) {
    //       document.getElementById("engagementChart").innerHTML = '';
    //     }
    //     const that = this;
    //
    //     let chartData = [];
    //     let drivers = [];
    //
    //     this.$lodash.each(data, (value, key) => {
    //       let temp = [];
    //       temp.push(value.month);
    //       if (value.engagement_stats && value.engagement_stats.month_driver_average) {
    //         temp.push(value.engagement_stats.month_driver_average);
    //       } else {
    //         temp.push('0');
    //       }
    //       if (value.engagement_stats && value.engagement_stats.month_mood_average) {
    //         temp.push(value.engagement_stats.month_mood_average);
    //       } else {
    //         temp.push('0');
    //       }
    //       if (value.engagement_stats && value.engagement_stats.chats_initiated) {
    //         temp.push(value.engagement_stats.chats_initiated);
    //       } else {
    //         temp.push('0');
    //       }
    //       if (value.engagement_stats && value.engagement_stats.chats_completed) {
    //         temp.push(value.engagement_stats.chats_completed);
    //       } else {
    //         temp.push('0');
    //       }
    //       if (value.engagement_stats && value.engagement_stats.participation_rate) {
    //         temp.push(value.engagement_stats.participation_rate);
    //       } else {
    //         temp.push('0');
    //       }
    //       chartData.push(temp);
    //     });
    //
    //     let chart = anychart.line();
    //     chart.title('');
    //
    //     let dataSet = anychart.data.set(chartData);
    //     let series = null;
    //
    //     let engagementSeriesData = dataSet.mapAs({x: 0, value: 1, chats_initiated:3  , chats_completed: 4, participation_rate: 5});
    //     let engagementSeries = chart.line(engagementSeriesData);
    //     engagementSeries.name('Engagement Over Time');
    //
    //     let moodSeriesData = dataSet.mapAs({x: 0, value: 2, chats_initiated:3  , chats_completed: 4, participation_rate: 5});
    //     let moodSeries = chart.line(moodSeriesData);
    //     moodSeries.name('Mood Over Time');
    //
    //     moodSeries.stroke({ color: '#8173b9' });
    //     engagementSeries.stroke({ color: '#4c3e9d' });
    //
    //     // set tooltip settings
    //     engagementSeries.tooltip()
    //       .position('right')
    //       .anchor('left-center')
    //       .offsetX(5)
    //       .offsetY(0)
    //       .titleFormat('{%X}')
    //       .useHtml(true)
    //       .format('Chats Initiated : {%chats_initiated} <br/> Chats Completed : {%chats_completed} <br/> Participation Rate : {%participation_rate}');
    //
    //     moodSeries.tooltip()
    //       .enabled(false);
    //
    //     // adjust markers of a series
    //     let markers = engagementSeries.markers();
    //     markers.enabled(true);
    //     markers.fill("#edebf5");
    //     markers.stroke("2 #4c3e9d");
    //     let hoverMarkers = engagementSeries.hovered().markers();
    //     hoverMarkers.fill("#4c3e9d");
    //     hoverMarkers.stroke("2 #4c3e9d");
    //
    //     // set yAxis labels formatter
    //     chart.xAxis().labels().rotation(-60);
    //     chart.yAxis().labels().format('{%Value}{groupsSeparator: }');
    //
    //     // set titles for axises
    //     chart.xAxis().title('');
    //     chart.yAxis().title('');
    //     chart.interactivity().hoverMode('by-x');
    //     chart.tooltip().positionMode('point');
    //
    //
    //     chart.xScale().mode('continuous');
    //
    //     chart.yScale().maximum(5);
    //     chart.yScale().ticks().interval(1);
    //
    //     // turn the legend on
    //     chart.legend()
    //       .enabled(true)
    //       .fontSize(13)
    //       .margin([10, 0, 10, 0])
    //       .padding([0, 10, 0, 10])
    //       .maxWidth("100%")
    //       .position("bottom")
    //       .itemsLayout("horizontal-expandable");
    //
    //     // set container id for the chart
    //     chart.container('engagementChart');
    //     // initiate chart drawing
    //     chart.draw();
    //   }
    // },
    listEmployees (mood) {
      // first_name,last_name,mood,engagement_score,last_milestone,last_chat_completedAt&user_session__overall_mood__in=2
      // this.$refs.listEmployees.pagination.page = 1;
      // this.$refs.listEmployees.dialogs.listEmployee = true;
      // this.$refs.listEmployees.filterData = {
      //   'overall_mood': mood,
      // };
      // this.$refs.listEmployees.getEmployeesToMeet({
      //   'user_session__overall_mood__in': mood,
      // });
      if (mood) {
        this.$emit('dashboardFilterUpdate', mood);
        // this.$router.push({
        //   path: '/employees',
        //   query: {
        //     mood,
        //   },
        // });
      }
    },
    viewEmployee (s) {
      if (this.$route.name !== 'ViewAdhoc') {
        this.$router.push({
          path: '/employees',
          query: {
            search: s.display_name || s.first_name,
            eID: s.id
          }
        });
      }
    },
    getMoodPercentage (value) {
      let moodPercentageValue = 0;
      let total = 1;
      if (this.report && this.report.mood_analysis) {
        this.$lodash.each(this.report.mood_analysis.company_mood_breakdown, (mood, mi) => {
          total += mood.value;
        });
      }
      moodPercentageValue = (value / total) * 100;
      return moodPercentageValue.toFixed(1);
    },
    getSeriesColor (pet) {
      let color = '#84b761';
      if (pet === '5') {
        color = '#62be71';
      } else if (pet === '4') {
        color = '#a1ce6a';
      } else if (pet === '3') {
        color = '#f5ab52';
      } else if (pet === '2') {
        color = '#f0724b';
      } else if (pet === '1') {
        color = '#ee5d4b';
      }
      return color;
    },
    getImgUrl (pet) {
      // let mood = '';
      // if (pet === 'Great') {
      //   mood = 'in-love';
      // } else if (pet === 'Happy') {
      //   mood = 'happy';
      // } else if (pet === 'Okay') {
      //   mood = 'shocked';
      // } else if (pet === 'Sad') {
      //   mood = 'sad';
      // } else if (pet === 'Terrible') {
      //   mood = 'crying';
      // }
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    getName (pet) {
      let mood = '';
      if (pet === '5') {
        mood = 'Awesome';
      } else if (pet === '4') {
        mood = 'Good';
      } else if (pet === '3') {
        mood = 'Okay';
      } else if (pet === '2') {
        mood = 'Disappointed';
      } else if (pet === '1') {
        mood = 'Terrible';
      }
      return mood;
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
<style lang="scss">
.greenBg {
  .v-progress-linear__background {
    background-color: rgba(98, 190, 113, 0.5) !important;
  }
}
.lightGreenBg {
  .v-progress-linear__background {
        background-color: rgba(161, 206, 106, 0.5) !important;
  }
}
.orangeBg {
  .v-progress-linear__background {
    background-color: rgba(245, 171, 82, 0.5) !important;
  }
}
.lightRedBg {
  .v-progress-linear__background {
    background-color: rgba(240, 114, 75, 0.5) !important;
  }
}
.redBg {
  .v-progress-linear__background {
    background-color: rgba(238, 93, 75, 0.5) !important;
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
.vibesChartdiv {
  height: 250px!important;
  width: 500px!important;
  margin: 0 auto!important;
  top:-30px!important;
  // margin: 8px auto 8px auto!important;
}
.audience-list {
  height: 360px!important;
  .v-table__overflow {
    overflow-x: auto !important;
    height: 100%!important;
  }
  .v-datatable {
    &.v-table {
      display: inline-table!important;
      tr {
        th, td {
          font-size:12px!important;
        }
      }
    }
  }
}
.text-vertical-align {
  position: relative!important;
  top: -3px!important;
}
#engagementChart {
  height: 375px!important;
}
</style>
