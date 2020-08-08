<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 px-2>
        <div class="d-inline-flex w-100 mb-0 py-2 px-3 grey--text text--darken-3">
          <p class="pt-1 mb-0 subheading"> Driver Framework Analysis </p>
          <!--<h2 class="text-xs-right" v-if="report && report.company_driver_average"> Score : {{report.company_driver_average}} / 5 </h2>
          <h2 class="text-xs-right" v-else> Score : 0 / 5 </h2>-->
        </div>

        <div class="mt-0" v-if="config.initialLoading">
          <v-layout>
            <v-flex xs6 class="pr-1">
              <v-layout class="my-2 py-0" row wrap>
                <v-flex xs12>
                  <div class="engagement-cards">
                    <ContentLoader
                      :height="100"
                      :width="100"
                      :speed="2"
                      primaryColor="#e9e7e7"
                      secondaryColor="#fff"
                      >
                      <rect x="10" y="6" rx="2" ry="2" width="80" height="5" />
                      <rect x="10" y="14" rx="2" ry="2" width="80" height="5" />
                      <rect x="10" y="22" rx="2" ry="2" width="80" height="5" />
                      <rect x="10" y="30" rx="2" ry="2" width="80" height="5" />
                      <rect x="10" y="38" rx="2" ry="2" width="80" height="5" />
                    </ContentLoader>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="pl-1">
              <v-layout class="my-2 py-0" row wrap>
                <v-flex xs12>
                  <div class="engagement-cards">
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
              </v-layout>
            </v-flex>

          </v-layout>
        </div>

        <!-- After intial loading -->
        <div class="mt-0" v-if="!config.initialLoading">
            <v-layout xs12>
              <v-flex xs12 class="pr-1 my-2">
                <!-- <p class="pa-3 text-xs-left mb-0 font-weight-bold"> DRIVER-WISE ENGAGEMENT </p> -->

                <v-layout row wrap pa-1
                  v-show="report && report.stats && report.company_drivers_breakdown"
                >
                  <v-flex xs12>
                    <swiper :options="swiperOption">
                      <swiper-slide
                        class="driver-slide"
                        v-for="(d, di) in driverBreakdown"
                        :key="di"
                      >
                        <v-card class="pa-2 elevation-0">
                          <v-layout row wrap>
                            <v-flex xs3>
                              <p class="heading-b mb-0">
                                {{d.average}}
                              </p>
                            </v-flex>
                            <!--<v-flex class="success--text text-xs-right pt-3">
                              0.6 above
                              <v-icon color="success">fas fa-long-arrow-alt-up</v-icon>
                            </v-flex>-->
                          </v-layout>
                          <p class="mb-3 mt-1 " style="height:40px;">
                            <span class="heading" v-if="d.driver"> {{d.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}} </span>
                          </p>
                          <v-divider class="mb-2"></v-divider>
                          <span class="caption  grey--text">Subdriver Analysis</span>
                          <v-list class="pa-0">
                            <v-list-tile
                              class="subdriver-tile"
                              v-for="(v, k) in d.sub_drivers"
                              :key="k"
                            >
                              <v-layout row wrap>
                                <v-flex xs9 class="overflow-wrap mr-2">
                                  <v-list-tile-title class="text-capitalize">
                                    <span class="sub-heading" style="font-size:13px !important;"  v-if="k"> {{k.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}} </span>
                                  </v-list-tile-title>
                                </v-flex>
                                <v-flex xs2 class="mr-2">
                                  <v-list-tile-action style="font-size:13px !important;align-items:flex-end;" class="text-xs-right "
                                  :style="`min-width:unset;border-bottom: 2px solid #f44336;border-color: ${getColor(v)} `">
                                    {{v}}
                                  </v-list-tile-action>
                                </v-flex>
                              </v-layout>
                            </v-list-tile>
                          </v-list>
                          <v-divider></v-divider>
                          <p class="mb-1 mt-2 heading-b">
                            {{d.disengaged_employees}}
                          </p>
                          <p class="mb-3">
                            Disengaged Employees
                          </p>
                          <v-divider></v-divider>
                          <div class="slide-actions text-xs-center">
                            <v-btn color="primary" class="text-capitalize" outline small @click="viewDriver(d.driver)">View Details</v-btn>
                          </div>
                        </v-card>
                      </swiper-slide>
                      <!-- Optional controls -->
                      <div v-if="driverBreakdown.length > 6">
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                      </div>
                    </swiper>
                  </v-flex>
                </v-layout>
                <!-- <vue-anychart id="driverFramework" v-show="report && report.stats && report.company_drivers_breakdown" /> -->

                <v-layout class="driverFramework" v-if="!report || !report.stats || !Object.keys(report.company_drivers_breakdown).length" row wrap align-center justify-center fill-height>
                  <v-flex text-xs-center>
                    <strong class="body-2 font-weight-bold grey--text">
                      Not enough data to generate analysis
                    </strong>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>

              <!-- <v-flex xs6 class="pr-1">
                <v-layout class="mt-2 py-0" row wrap>
                  <v-flex xs12 text-xs-center>
                    <div class="engagement-cards">
                      <p class="pa-3 text-xs-left mb-0 text-capitalize"> Driver-Wise Engagement </p>
                      <v-layout class="pb-0 driver-sunburst-card">
                        <v-flex xs12 class="custom-div-2">
                          <vue-anychart id="driverFramework" v-show="report && report.stats && report.company_drivers_breakdown" />

                          <v-layout class="driverFramework" v-if="!report || !report.stats || !report.company_drivers_breakdown" row wrap align-center justify-center fill-height>
                            <v-flex text-xs-center>
                              <strong class="body-2 font-weight-bold grey--text">
                                Not enough data to generate analysis
                              </strong>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                      </v-layout>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>-->

            <v-layout xs12>
              <!-- Employee Vibes -->
              <v-flex xs6 class="pl-1">
                <v-layout class="mt-2 py-0" row wrap>
                  <v-flex xs12 text-xs-center>
                    <div class="engagement-cards">
                      <p class="pa-3 text-xs-left mb-0  text-capitalize"> Employee Vibes </p>
                      <v-layout class="" v-if="report && report.stats">
                        <v-flex xs12 class="custom-div-2" v-show="report.mood_analysis && report.mood_analysis.company_mood_breakdown">
                          <div class="px-2" v-for="(mood, di) in report.mood_analysis.company_mood_breakdown" v-if="mood.mood !== '0'" :key="di">
                            <v-layout class="w-100 ">
                              <v-flex xs2 class="ml-3">
                                <v-img class="mt-2" :src="getImgUrl(mood.mood)" style="height:40px;width:40px"> </v-img>
                              </v-flex>

                              <v-flex xs6>
                                <v-layout row wrap>
                                  <v-flex xs3 class="text-xs-left d-inline-flex">
                                    <h2 style="max-width:20px"> {{ mood.value }} </h2>
                                    <small class="text-muted" style="position:relative;top:6px"> ({{mood.percent}} %) </small>
                                  </v-flex>
                                  <v-flex xs3>
                                  </v-flex>
                                  <v-flex xs6 class="mt-3 grey--text text-xs-right">
                                    {{getName(mood.mood)}}
                                  </v-flex>
                                </v-layout>
                                <v-progress-linear class="mt-0" :color="getSeriesColor(mood.mood)" :value="getMoodPercentage(mood.value)"></v-progress-linear>
                              </v-flex>

                              <v-flex xs3 class="mx-3">
                                <v-btn color="#4c3e9d" outline
                                  class="text-capitalize"
                                  style="position:relative;top:15px;height:30px"
                                  @click="listEmployees(mood.mood)">
                                    Insights
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </div>
                        </v-flex>

                        <v-layout class="custom-div-2" v-if="!report || !report.stats || !report.mood_analysis" row wrap align-center justify-center fill-height>
                          <v-flex xs12 text-xs-center>
                            <strong class="body-2 font-weight-bold grey--text">
                              Not enough data to generate analysis
                            </strong>
                          </v-flex>
                        </v-layout>
                      </v-layout>

                      <v-layout class="driver-sunburst-card" row wrap align-center justify-center fill-height v-else>
                        <v-flex text-xs-center>
                          <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                      </v-layout>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- Monthwise Engagement Trend -->
              <v-flex xs6 class="pl-1">
                <v-layout class="mt-2 py-0" row wrap v-show="report && report.stats">
                  <v-flex xs12 text-xs-center>
                    <div class="engagement-cards">
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

                      <div id="engagementChart"> </div>

                      <v-layout class="custom-div-2" v-if="false" row wrap align-center justify-center fill-height style="height:400px">
                        <v-flex xs12 text-xs-center>
                          <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                      </v-layout>
                    </div>
                  </v-flex>
                </v-layout>

                <v-layout class="mt-2 py-0 engagement-cards" v-if="!report || !report.stats" row wrap justify-center fill-height>
                  <v-flex text-xs-center>
                    <div >
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

                      <div style="height:400px">
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
              </v-flex>
            </v-layout>
        </div>
      </v-flex>
    </v-layout>

    <listEmployees ref="listEmployees" />
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import listEmployees from '../listEmployees';
// import axios from 'axios';
// import Anychart from 'anychart';
// import VueAnychart from '../../analytics/VueAnychart';
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs-ext/plugin/customParseFormat';

import 'swiper/dist/css/swiper.css';

// import {
//   VCheckbox,
//   VAvatar,
//   VTooltip,
//   VAlert,
//   VProgressLinear,
//   VProgressCircular,
//   VChip
// } from 'vuetify';
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export default {
  name: 'EmployeesList',
  components: {
    swiper,
    swiperSlide,
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
    // dayjs
  },
  data () {
    return {
      driverBreakdown: [],
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 20,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true
        },
        breakpoints: {
          1800: {
            slidesPerView: 6,
            spaceBetween: 20
          },
          1264: {
            slidesPerView: 6,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 'auto',
            spaceBetween: 10,
            centeredSlides: true
          }
        }
      },
      dateRangeOptions: {},
      open: false,
      title: '',
      stageId: null,
      activeDriver: null,
      filters: {},
      sessions: {},
      report: {
      },
      sunburstChart: null,
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
    listEmployees (mood) {
      this.$refs.listEmployees.pagination.page = 1;
      this.$refs.listEmployees.dialogs.listEmployee = true;
      this.$refs.listEmployees.filterData = {
        overall_mood: mood,
        stage_id: this.stageId
      };
      this.$refs.listEmployees.getEmployeesToMeet({
        user_session__overall_mood__in: mood,
        user_session__stage__id: this.stageId
      });
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
      setTimeout(function () {
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
            balloonText: 'Chats initiated: [[chats_initiated]]\n Chats completed: [[chats_completed]]\n Participation rate: [[participation_rate]] % \n Comapny vibe average: [[month_mood_average]]\n',
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
      }, 500);
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
          title: 'Score'
        }],
        startDuration: 0.5,
        graphs: [{
          customBulletField: 'bullet',
          bulletSize: 20,
          id: 'g1',
          balloonText: 'Chats initiated: [[chats_initiated]]\n Chats completed: [[chats_completed]]\n Participation rate: [[participation_rate]] % \n Company vibe average: [[month_mood_average]]\n',
          bullet: 'round',
          labelText: '[[stage__title]]',
          labelPosition: 'bottom',
          lineThickness: 2,
          type: 'smoothedLine',
          valueField: 'month_mood_average',
          title: 'Monthly mood average'
        }, {
          balloonText: 'Driver average: [[value]]',
          bullet: 'round',
          lineColor: '#0d2c8d',
          title: 'Monthly driver average',
          valueField: 'month_driver_average',
          fillAlphas: 0
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
    //     setTimeout(() => {
    //       if (document.getElementById("engagementChart")) {
    //         document.getElementById("engagementChart").innerHTML = '';
    //       }
    //       const that = this;

    //       let chartData = [];
    //       let drivers = [];

    //       this.$lodash.each(data, (value, key) => {
    //         let temp = [];
    //         temp.push(value.month);
    //         if (value.engagement_stats && value.engagement_stats.month_driver_average) {
    //           temp.push(value.engagement_stats.month_driver_average);
    //         } else {
    //           temp.push('0');
    //         }
    //         if (value.engagement_stats && value.engagement_stats.month_mood_average) {
    //           temp.push(value.engagement_stats.month_mood_average);
    //         } else {
    //           temp.push('0');
    //         }
    //         if (value.engagement_stats && value.engagement_stats.chats_initiated) {
    //           temp.push(value.engagement_stats.chats_initiated);
    //         } else {
    //           temp.push('0');
    //         }
    //         if (value.engagement_stats && value.engagement_stats.chats_completed) {
    //           temp.push(value.engagement_stats.chats_completed);
    //         } else {
    //           temp.push('0');
    //         }
    //         if (value.engagement_stats && value.engagement_stats.participation_rate) {
    //           temp.push(value.engagement_stats.participation_rate);
    //         } else {
    //           temp.push('0');
    //         }
    //         chartData.push(temp);
    //       });

    //       let chart = anychart.line();
    //       chart.title('');

    //       let dataSet = anychart.data.set(chartData);

    //       let engagementSeriesData = dataSet.mapAs({x: 0, value: 1, chats_initiated:3  , chats_completed: 4, participation_rate: 5});
    //       let engagementSeries = chart.line(engagementSeriesData);
    //       engagementSeries.name('Engagement Over Time');

    //       let moodSeriesData = dataSet.mapAs({x: 0, value: 2, chats_initiated:3  , chats_completed: 4, participation_rate: 5});
    //       let moodSeries = chart.line(moodSeriesData);
    //       moodSeries.name('Mood Over Time');

    //       moodSeries.stroke({ color: '#8173b9' });
    //       engagementSeries.stroke({ color: '#4c3e9d' });

    //       // set tooltip settings
    //       engagementSeries.tooltip()
    //         .position('right')
    //         .anchor('left-center')
    //         .offsetX(5)
    //         .offsetY(0)
    //         .titleFormat('{%X}')
    //         .useHtml(true)
    //         .format('Chats Initiated : {%chats_initiated} <br/> Chats Completed : {%chats_completed} <br/> Participation Rate : {%participation_rate}');

    //       moodSeries.tooltip()
    //         .enabled(false);

    //       // adjust markers of a series
    //       let markers = engagementSeries.markers();
    //       markers.enabled(true);
    //       markers.fill("#edebf5");
    //       markers.stroke("2 #4c3e9d");
    //       let hoverMarkers = engagementSeries.hovered().markers();
    //       hoverMarkers.fill("#4c3e9d");
    //       hoverMarkers.stroke("2 #4c3e9d");

    //       // set yAxis labels formatter
    //       chart.xAxis().labels().rotation(-60);
    //       chart.yAxis().labels().format('{%Value}{groupsSeparator: }');

    //       // set titles for axises
    //       chart.xAxis().title('');
    //       chart.yAxis().title('');
    //       chart.interactivity().hoverMode('by-x');
    //       chart.tooltip().positionMode('point');

    //       chart.xScale().mode('continuous');

    //       chart.yScale().maximum(5);
    //       chart.yScale().ticks().interval(1);

    //       // turn the legend on
    //       chart.legend()
    //         .enabled(true)
    //         .fontSize(13)
    //         .margin([10, 0, 10, 0])
    //         .padding([0, 10, 0, 10])
    //         .maxWidth("100%")
    //         .position("bottom")
    //         .itemsLayout("horizontal-expandable");

    //       // set container id for the chart
    //       chart.container('engagementChart');
    //       // initiate chart drawing
    //       chart.draw();
    //   }, 100);
    //   }
    // },
    generateDriverFramework (data) {
      const that = this;
      if (document.getElementById('driverFramework')) {
        document.getElementById('driverFramework').innerHTML = '';
      }
      setTimeout(() => {
        if (that.report && that.report.company_drivers_breakdown) {
          this.driverBreakdown = JSON.parse(JSON.stringify(data));
          // // create a chart and set the data
          // that.$lodash.each(data, (v, k) => {
          //   v.name = v.name;
          // });

          // var dataTree = anychart.data.tree(data, 'as-table');
          // that.sunburstChart = anychart.sunburst(dataTree);

          // // set custom palette
          // that.sunburstChart.palette(['#0288d1', '#d4e157', '#ff6e40', '#f8bbd0']);

          // // format chart labels
          // that.sunburstChart.labels().format('{%Name}\n{%Value}');

          // // format chart tooltip
          // that.sunburstChart.tooltip().format('{%Name} \n Average: {%Value}');
          // that.sunburstChart.sort("asc");

          // that.sunburstChart.fill(function() {
          //   return anychart.color.darken(this.parentColor, 0.15);
          // });

          // // set the container id
          // that.sunburstChart.container("driverFramework");

          // that.sunburstChart.listen('chartDraw', function (e) {
          //   if (that.activeDriver) {
          //     that.viewDriver(that.activeDriver);
          //   }
          //   let path = that.sunburstChart.getDrilldownPath();
          //   // that.drillUpALevel();
          //   if (path && path.length && path[1]) {
          //     that.activeDriver = path[1].get('title');
          //   } else {
          //     that.activeDriver = '';
          //   }
          // });

          // // initiate drawing the chart
          // that.sunburstChart.draw();
        }
      }, 100);
    },
    // drill up a level
    drillUpALevel () {
      this.sunburstChart.drillUp();
    },
    viewDriver (driver) {
      this.$router.push({
        path: `/driver/view/${driver}`
      });
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
    getColor (score) {
      let color = '';
      if (score <= 3) {
        color = '#f44336';
      } else if (score <= 4) {
        color = '#ff9800';
      } else if (score <= 5) {
        color = '#37b99c';
      }
      return color;
    },
    getIconColor (variation) {
      let color = '';
      if (variation < 0) {
        color = 'red';
      } else {
        color = '#5cb85c';
      }
      return color;
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
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
.engagement-cards {
  height: 400px!important;
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
#driverFramework {
  height: 600px!important;
  position: relative!important;
  top:-30px!important;
  margin: 0px!important;
}
.driverFramework {
  height: 480px!important;
  background: #fff!important;
}
.driverChartdiv {
  height: 350px!important;
  // width: 600px!important;
  margin: 0px!important;
  // top:-30px!important;
  // margin: 8px auto 8px auto!important;
}
.driver-sunburst-card {
  height: 400px!important;
  position: relative!important;
  overflow-y: hidden!important;
  top: -10px!important;
}
.driver-slide {
  width:192px !important;
  margin-right:20px !important;
  .driver-title {
    height: 40px!important;
  }
  .subdriver-tile {
    margin: 0 -16px;
  }
  .v-list {
    height: 20em;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .overflow-wrap {
    .v-list__tile__title {
      height: auto!important;
      white-space: unset!important;
      overflow: inherit!important;
      overflow-wrap: break-word!important;
      word-wrap: break-word!important;
      hyphens: auto!important;
    }
  }
}
#engagementChart {
  height: 375px!important;
}
.driver-slide {
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: 0 0 5px -5px grey;
    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #efebeb;
  }
}
</style>
