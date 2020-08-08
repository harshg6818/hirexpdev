<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 px-2>
        <div class="d-inline-flex w-100 mb-0 px-5 py-3" style="color:#808080;">
          <p class="text-xs-center heading"> Subdriver Analysis </p>
          <!--<h2 class="text-xs-right" v-if="report && report.company_driver_average"> Score : {{report.company_driver_average}} / 5 </h2>
          <h2 class="text-xs-right" v-else> Score : 0 / 5 </h2>-->
        </div>

        <div class="mt-0 pt-2" v-show="config.initialLoading">
          <v-layout>
            <v-flex xs12 class="pr-1">
              <v-layout class="my-2 py-0" row wrap>
                <v-flex xs4>
                  <div class="">
                    <ContentLoader
                      :height="70"
                      :width="100"
                      :speed="2"
                      primaryColor="#e9e7e7"
                      secondaryColor="#fff"
                      >
                      <rect x="10" y="2" rx="2" ry="2"  width="60" height="20" />

                      <rect x="10" y="25"  rx="2" ry="2" width="80" height="40" />
                    </ContentLoader>
                  </div>
                </v-flex>
                
                <v-flex xs8>
                  <div class="vibes-cards">
                    <ContentLoader
                      :height="80"
                      :width="150"
                      :speed="2"
                      primaryColor="#e9e7e7"
                      secondaryColor="#fff"
                      >
                      <rect x="10" y="2" rx="2" ry="2"  width="50" height="2" />

                      <rect x="10" y="6"  rx="2" ry="2" width="130" height="10" />
                      <rect x="10" y="18" rx="2" ry="2" width="130" height="10" />
                      <rect x="10" y="30" rx="2" ry="2" width="130" height="10" />
                      <rect x="10" y="42" rx="2" ry="2" width="130" height="10" />
                      <rect x="10" y="54" rx="2" ry="2" width="130" height="10" />
                      <rect x="10" y="66" rx="2" ry="2" width="130" height="10" />
                    </ContentLoader>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
    
        <!-- After intial loading -->
        <div class="mt-0 pt-2" v-show="!config.initialLoading">
            <v-layout xs12>
              <v-flex xs12 class="pr-1">
                <v-layout class="mt-2 py-0" row wrap>
                  <v-flex xs12 text-xs-center>
                    <div class="engagement-cards">
                      <!-- <p class="pa-3 text-xs-left mb-0"> DRIVER-WISE ENGAGEMENT </p> -->
                      <v-layout class="pb-4" v-if="report.length">
                        <v-flex pa-5 mt-4 xs4 text-xs-left v-if="driver"> 
                          <v-img :src="getDriverImg(driver)" style="height:100px;width:100px;filter: grayscale(100%);"> </v-img>
                          <p class="pa-3 heading mb-0"> Key sub-drivers of {{ driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} </p>
                          <p class="px-3 grey--text sub-heading"> Discover how satisfied employees are with the sub drivers of {{ driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} at different touchpoints. </p>
                        </v-flex>

                        <v-flex pa-5 mt-4 xs4 text-xs-left v-else> 
                          <p class="pa-3 heading mb-0"> Key sub-drivers of Driver </p>
                          <p class="px-3 grey--text sub-heading"> Discover how satisfied employees are with the sub drivers of Driver at different touchpoints. </p>
                        </v-flex>

                        <v-flex xs8 class="custom-div-2">
                          <!--<vue-anychart :id="`milestone-heatmap`" class="milestone-heatmap"
                            ref="lineChart">
                          </vue-anychart>-->

                          <v-data-table
                            :headers="roles"
                            :items="report"
                            :loading="table.loading"
                            class="engagement-inbox px-2 mt-4"
                            hide-actions
                          >
                            <template slot="headers" slot-scope="headers">
                              <!--<v-card>-->
                              <tr class="card mb-2" color="primary">
                                <td style="width:15%;max-width:15%" class="b-right text-xs-left">
                                  <p class="mb-0 ">
                                    <strong style="color:white !important;">
                                      Touchpoint
                                    </strong>
                                  </p>
                                </td>

                                <td style="width:15%;max-width:15%" class="text-xs-left" v-for="subdriver in roles">
                                  <p class="mb-0 ">
                                    <strong style="color:white !important;">
                                      {{ subdriver.replace(/([a-z0-9])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + subdriver.replace(/([a-z0-9])([A-Z])/g, '$1 $2').substr(1) }}
                                    </strong>
                                  </p>
                                </td>
                              </tr>
                            </template>
                            <template slot="items" slot-scope="props">
                              <!--<v-card>-->
                                <tr class="card mb-2">
                                  <td style="width:15%;max-width:15%" class="b-right text-xs-left">
                                    <p class="mb-0">
                                        {{props.item.milestone}}
                                    </p>
                                  </td>

                                  <td style="width:15%;max-width:15%" class="text-xs-left" v-for="subdriver in roles">
                                    <p class="mb-0">
                                        {{props.item[subdriver]}}
                                    </p>
                                  </td>
                                </tr>
                              <!--</v-card>-->
                            </template>
                            <template slot="expand" slot-scope="props">
                              <div class="secondary px-4 py-2">
                                Extra details
                              </div>
                            </template>
                            <v-alert slot="no-data" :value="true" color="#fff" outline>
                              <span v-show="!table.searchString">
                                <div style="height:300px">
                                  <v-layout row wrap align-center justify-center fill-height>
                                    <v-flex text-xs-center>
                                      <strong class="body-2 font-weight-bold grey--text">
                                        Not enough data to generate analysis
                                      </strong>
                                    </v-flex>
                                  </v-layout>
                                </div>
                              </span>
                              <span v-show="table.searchString">
                                Your search for "{{ table.searchString }}" found no results.
                              </span>
                            </v-alert>
                          </v-data-table>
                        </v-flex>
                      </v-layout>

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
              </v-flex>

            </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
/* eslint-disable max-len */
import { mapState } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
import * as am4core from '@amcharts/amcharts4/core'; 
import * as am4charts from '@amcharts/amcharts4/charts'; 
import am4themes_animated from '@amcharts/amcharts4/themes/animated'; 
import am4themes_kelly from '@amcharts/amcharts4/themes/kelly'; 
import Anychart from 'anychart';
import VueAnychart from '../analytics/VueAnychart';

am4core.useTheme(am4themes_animated); 
am4core.useTheme(am4themes_kelly); 
import {
  VCheckbox,
  VAvatar,
  VTooltip,
  VAlert,
  VProgressLinear,
  VProgressCircular,
  VChip,
} from 'vuetify';

export default {
  name: 'EmployeesList',
  components: {
    ContentLoader,
    VCheckbox,
    VAvatar,
    VTooltip,
    VAlert,
    VChip,
    VProgressLinear,
    VProgressCircular,
    VueAnychart,
  },
  data() {
    return {
      dateRangeOptions: {},
      open: false,
      title: '',
      driver: null,
      filters: {},
      sessions: {},
      report: [],
      roles: [],
      pagination: {
        rowsPerPage: 10,
      },
      stats: false,
      config: {
        actionMenu: {},
        activeTab: 'high_risk_session',
        panel: [true, true, true, true],
        initialLoading: true,
        loading: false,
        initialLoadingFilters: true,
      },
      table: {
        loading: true,
        stage: [],
        totalItems: 0,
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  methods: {
    getDriverImg(pet) {
      let url = '';
      const images = require.context('@/assets/', false, /\.png$/);
      if (images && images(`./${pet}.png`)) {
        url = images(`./${pet}.png`);
      } else {
        url = images(`./driver.png`);
      }
      return url;
    },
    generateHeatMap(data) {
      const that = this;
      // create a chart and set the data
      document.getElementById('milestone-heatmap').innerHTML = '';
      let chart = anychart.heatMap(data);
      // chart.height('80%');
      chart.container('milestone-heatmap');

      // chart.xAxis.height("50%");
      // chart.yAxis().height("50%");
      var labelsX = chart.xAxis().labels();
      var labelsY = chart.yAxis().labels();

      labelsX.fontColor("#000");
      labelsX.fontSize(12);
      labelsX.fontWeight(500);
      labelsX.hAlign("center");
      labelsX.padding(20, 0, 20, 0);
      labelsY.fontColor("#000");
      labelsY.fontSize(12);
      labelsY.fontWeight(500);
      labelsY.hAlign("center");
      labelsY.padding(0, 20, 0, 20);

      // enable and configure scrollers
      chart.xScroller().enabled(true);
      chart.xZoom().setToPointsCount(6);
      chart.yScroller().enabled(true);
      chart.yZoom().setToPointsCount(6);


      // tooltip settings
      chart.tooltip().titleFormat("{%y}");
      chart.tooltip().useHtml(true);

      // chart.tooltip().title("{%y}");
      chart.tooltip().format("{%x} : {%heat}");

      // create and configure a color scale.
      var customColorScale = anychart.scales.ordinalColor();
      customColorScale.ranges([
        {from: 0, to: 0},
        {from: 0.1, to: 3},
        {from: 3.1, to: 4},
        {greater: 4}
      ]);
      customColorScale.colors(["lightgrey", "#f44336", "#ff9800", "#37b99c"]);

      // set the color scale as the color scale of the chart
      chart.colorScale(customColorScale);

      chart.listen("pointClick", function(e) {
        const tag = e.point.get("x");        
      });

      // initiate drawing the chart
      chart.draw();
      this.$forceUpdate();
    },
  },
  watch: {
  },
  beforeMount() {
    if (this.$route.params && this.$route.params.driver) {
      // this.getFilters();
      this.driver = this.$route.params.driver;
    }
  },
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
.driverChartdiv {
  height: 350px!important;
  // width: 600px!important;
  margin: 0px!important;
  // top:-30px!important;
  // margin: 8px auto 8px auto!important;
}
.milestone-heatmap {
  height: 350px!important;
  width: 50%!important;
  margin: 0px auto!important;
  // top:-2px!important;
  // margin: 8px auto 8px auto!important;
}
.engagement-cards {
    height: 500px!important;
}
</style>
<style lang="scss">
.milestone-heatmap {
  // height: 350px!important;
  // width: 50%!important;
  // margin: 0px auto!important;
  // top:-2px!important;
  // margin: 8px auto 8px auto!important;
}
.engagement-inbox {
  .v-table__overflow {
    height: 300px!important;
    overflow-y: auto!important;
    border: 1px solid #dedbdb!important;
    .theme--light {
      &.v-table {
        thead {
          background-color: rgba(76, 62, 157, 0.7) !important;
        }
      }
    }
  }
}
</style>
