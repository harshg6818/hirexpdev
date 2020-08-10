<template>
  <div>
    <div class="d-flex flex-row flex-wrap">
      <v-flex xs12 class="px-2">
        <div class="d-inline-flex w-100 mb-0 py-2 grey--text text--darken-3">
          <p class="pt-1 mb-0 subheading" style=""> Driver Analysis </p>
          <!--<h2 class="text-xs-right" v-if="report && report.company_driver_average"> Score : {{report.company_driver_average}} / 5 </h2>
          <h2 class="text-xs-right" v-else> Score : 0 / 5 </h2>-->
        </div>

        <div class="mt-0" v-show="config.initialLoading">
          <div>
            <v-flex xs12 class="pr-1">
              <div class="my-2 py-0 d-flex flex-row flex-wrap">
                <v-flex xs12>
                  <div class="engagement-cards">
                    <ContentLoader
                      :height="100"
                      :width="100"
                      :speed="2"
                      primaryColor="#e9e7e7"
                      secondaryColor="#fff"
                    >
                      <rect x="2"  y="3" rx="2" ry="2" width="15" height="37" />
                      <rect x="18" y="3" rx="2" ry="2" width="15" height="37" />
                      <rect x="34" y="3" rx="2" ry="2" width="15" height="37" />
                      <rect x="50" y="3" rx="2" ry="2" width="15" height="37" />
                      <rect x="66" y="3" rx="2" ry="2" width="15" height="37" />
                      <rect x="82" y="3" rx="2" ry="2" width="15" height="37" />

                      <!-- <rect x="2"  y="3" rx="2" ry="2" width="30" height="37" />
                      <rect x="34" y="3" rx="2" ry="2" width="30" height="37" />
                      <rect x="66" y="3" rx="2" ry="2" width="30" height="37" /> -->
                    </ContentLoader>
                  </div>
                </v-flex>
              </div>
            </v-flex>
            <!-- <v-flex xs6 class="pl-1">
              <v-layout class="my-2 py-0" row wrap>
                <v-flex xs12>
                  <div class="engagement-cards">
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
              </v-layout>
            </v-flex> -->
          </div>
        </div>

        <!-- After intial loading -->
        <div class="mt-0 pt-2" v-show="!config.initialLoading">
            <div>
              <v-flex xs12 class="pr-1 my-2">
                <!-- <p class="pa-3 text-xs-left mb-0 font-weight-bold"> DRIVER-WISE ENGAGEMENT </p> -->

                <div class="pb-3 d-flex flex-row flex-wrap"
                  v-show="report && report.stats && report.company_drivers_breakdown"
                >
                  <v-flex xs12>
                    <swiper :options="swiperOption">
                      <swiper-slide
                        class="driver-slide"
                        v-for="(d, di) in driverBreakdown"
                        :key="di"
                      >
                        <div style="background:white; border-radius:8px;" class="pa-2">
                          <div class="d-flex flex-row flex-wrap">
                            <v-flex xs3>
                              <p class="heading-b mb-0">
                                {{d.average}}
                              </p>
                            </v-flex>
                            <!--<v-flex class="success--text text-xs-right pt-3">
                              0.6 above
                              <v-icon color="success">fas fa-long-arrow-alt-up</v-icon>
                            </v-flex>-->
                          </div>
                          <p class="mb-3 mt-1 driver-title heading">
                            <span class="heading" v-if="d.driver"> {{d.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}} </span>
                          </p>
                          <v-divider class="mb-2"></v-divider>
                          <span class="caption" style="color:rgba(0,0,0,0.5) !important;">Subdriver Score</span>
                          <v-list class="pa-0">
                            <v-list-item
                              class="subdriver-tile"
                              v-for="(v, k) in d.sub_drivers"
                              :key="k"
                            >
                              <div class="d-flex flex-row flex-wrap w-100">
                                <v-flex xs9 class="overflow-wrap mr-2 mt-2 d-flex">
                                  <v-list-item-title class="text-capitalize">
                                    <span style="font-size:13px !important;" v-if="k"> {{k.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}} </span>
                                  </v-list-item-title>
                                </v-flex>

                                <v-flex xs2 class="overflow-wrap driver-score mr-2 mt-2">
                                  <v-list-item-action style="align-items:flex-end;min-width:unset;font-size:13px !important;" class="text-right "
                                  :style="`border-bottom: 2px solid #f44336;border-color: ${getColor(v)} `">
                                    {{v.toFixed(1)}}
                                  </v-list-item-action>
                                </v-flex>
                              </div>
                            </v-list-item>
                          </v-list>
                          <v-divider></v-divider>
                          <p class="mb-1 mt-2 heading-b">
                            {{d.disengaged_employees}}
                          </p>
                          <p class="mb-3 sub-heading">
                            Disengaged Employees
                          </p>
                          <v-divider></v-divider>
                          <p data-html2canvas-ignore class="
                            mb-0 mt-1 text-center body-1"
                          >
                            <v-btn color="primary" class="text-capitalize" outlined small @click="viewDriver(d.driver)">View Details</v-btn>
                          </p>
                        </div>
                      </swiper-slide>
                      <!-- Optional controls -->
                      <div class="swiper-pagination" slot="pagination"></div>
                      <div class="swiper-button-prev" slot="button-prev"></div>
                      <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                  </v-flex>
                </div>
                <!-- <vue-anychart id="driverFramework" v-show="report && report.stats && report.company_drivers_breakdown" /> -->

                <div style="min-height:400px;" class="driverFramework d-flex flex-row flex-wrap align-center justify-center fill-height" v-if="!report || !report.stats || !Object.keys(report.company_drivers_breakdown).length">
                  <v-flex class="text-center">
                    <strong class="body-2 font-weight-bold grey--text">
                      Not enough data to generate analysis
                    </strong>
                  </v-flex>
                </div>
              </v-flex>

              <!-- <v-flex xs6 class="pl-1">
                <v-layout class="my-2 py-0" row wrap>
                  <v-flex xs12 text-xs-center>
                    <div class="engagement-cards">
                      <p class="pa-3 text-xs-left mb-0 heading"> Engagement Over Time </p>
                      <vue-anychart id="lineGraph" class="driverChartdiv" v-if="report && report.lineGraph">
                      </vue-anychart>

                      <div v-show="!report || !report.lineGraph" style="height:550px">
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
              </v-flex>-->
            </div>
        </div>
      </v-flex>
    </div>
  </div>
</template>

<script>
/* eslint-disable max-len */
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
// import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';
import Anychart from 'anychart';

// require styles
import 'swiper/dist/css/swiper.css';

// import VueAnychart from '../../analytics/VueAnychart';
// am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_kelly);

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

export default {
  name: 'EmployeesList',
  components: {
    swiper,
    swiperSlide,
    ContentLoader
    // VCheckbox,
    // VAvatar,
    // VTooltip,
    // VAlert,
    // VChip,
    // VProgressLinear,
    // VProgressCircular,
    // VueAnychart
  },
  data () {
    return {
      driverBreakdown: [],
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 300000,
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
    viewDriver (driver) {
      // this.$router.push({
      //   path: `/driver/view/${driver}`,
      // });
      this.$emit('viewDriverWithFilter', driver);
    },
    generateDriverFramework (data) {
      const that = this;
      if (that.report && that.report.company_drivers_breakdown) {
        // document.getElementById("driverFramework").innerHTML = '';
        // create a chart and set the data
        this.driverBreakdown = JSON.parse(JSON.stringify(data));
        // that.$lodash.each(data, (v, k) => {
        //   v.name = v.name;
        // });

        // var dataTree = anychart.data.tree(data, 'as-table');
        // that.sunburstChart = anychart.sunburst(dataTree);
        //
        // // set calculation mode
        // // chart.calculationMode('parent-independent');
        //
        // // set chart title
        // // chart.title('Europe Population');
        //
        // // set custom palette
        // that.sunburstChart.palette(['#0288d1', '#d4e157', '#ff6e40', '#f8bbd0']);
        //
        // // format chart labels
        // that.sunburstChart.labels().format('{%Name}\n{%Value}');
        //
        // // format chart tooltip
        // that.sunburstChart.tooltip().format('{%Name} \n Average: {%Value}');
        // that.sunburstChart.sort("asc");
        //
        // that.sunburstChart.fill(function() {
        //   return anychart.color.darken(this.parentColor, 0.15);
        // });
        //
        // // set the container id
        // that.sunburstChart.container("driverFramework");
        //
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
        //
        // // initiate drawing the chart
        // that.sunburstChart.draw();
      }
    },
    // drill up a level
    drillUpALevel () {
      this.sunburstChart.drillUp();
    },
    generateLineGraph (data) {
      if (this.report && this.report.lineGraph) {
        if (document.getElementById('lineGraph')) {
          document.getElementById('lineGraph').innerHTML = '';
        }
        // const that = this;

        const temp = [];
        const chartData = [];
        const drivers = [];

        this.$lodash.each(data, (value, key) => {
          temp.push({
            month: dayjs(value.month).format('MMM, YY'),
            engagement_stats: value.engagement_stats
          });
          const date = [];
          date.push(dayjs(value.month).format('MMM, YY'));
          // date.push(value.engagement_stats);
          chartData.push(date);
        });

        this.$lodash.each(chartData, (v, index) => {
          if (temp[index] && temp[index].engagement_stats && temp[index].engagement_stats.month_drivers_breakdown) {
            this.$lodash.each(temp[index].engagement_stats.month_drivers_breakdown, (score, driver) => {
              let newDriver = '';
              // eslint-disable-next-line no-unused-vars
              newDriver = driver;
              let match = -1;
              match = this.$lodash.findIndex(drivers, k =>
                k === driver);
              if (match === -1) {
                drivers.push(driver);
              }
              chartData[index].push(score);
            });
          }
        });

        const chart = Anychart.line();
        chart.title('');

        const dataSet = Anychart.data.set(chartData);
        let series = null;

        this.$lodash.each(drivers, (driver, index) => {
          const driverName = driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
          const seriesData = dataSet.mapAs({ x: 0, value: index + 1 });
          series = chart.line(seriesData);
          series.name(driverName);

          // set tooltip settings
          series.tooltip()
            .position('right')
            .anchor('left-center')
            .offsetX(5)
            .offsetY(0)
            .titleFormat('{%X}')
            .format('{%Value}');
        });

        // adjust markers of a series
        const markers = series.markers();
        markers.enabled(true);
        markers.fill('#edebf5');
        markers.stroke('2 #4c3e9d');
        const hoverMarkers = series.hovered().markers();
        hoverMarkers.fill('#4c3e9d');
        hoverMarkers.stroke('2 #4c3e9d');

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

        // turn the legend on
        chart.legend()
          .enabled(true)
          .fontSize(13)
          .margin([10, 0, 10, 0])
          .padding([0, 10, 0, 10])
          .maxWidth('100%')
          .position('bottom')
          .itemsLayout('horizontal-expandable');

        // set container id for the chart
        chart.container('lineGraph');
        // initiate chart drawing
        chart.draw();
      }
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
.engagement-cards {
  height: 600px!important;
}
.driverChartdiv {
  height: 400px!important;
  // width: 600px!important;
  margin: 0px!important;
  // top:-30px!important;
  // margin: 8px auto 8px auto!important;
}
#driverFramework {
  height: 600px!important;
  position: relative!important;
  top:-30px!important;
  margin: 0px!important;
}
#lineGraph {
  position:relative!important;
  top: 10%!important;
}
.driver-sunburst-card {
  height: 550px!important;
  position: relative!important;
  overflow-y: hidden!important;
  top: -10px!important;
}
.driver-slide {
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

@media only screen and (max-width: 1800px) {
  .driver-score {
    max-width: 10%;
  }
}
@media only screen and (max-width: 1500px) {
  .driver-score {
    max-width: 14%;
  }
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
