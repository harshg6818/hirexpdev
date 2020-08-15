<template>
  <div>
    <div class="mt-3" v-if="initialLoading">
      <ContentLoader
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
    </div>
    <v-row no-gutters cols="12">
      <h3>
        Driver Analysis
      </h3>
    </v-row>
    <v-row no-gutters cols="12">
      <v-col cols="7" class="pr-2">
        <v-row>
          <v-col cols="4" v-for="(item, index) in driverBreakdown" :key="index" v-if="item.driver !== 'Mood'">
            <v-card class="mx-auto driver-card">
              <div class="px-5">
                <div class="driver-score-wrap">
                  <v-row class="px-5">
                    <v-col class="driver-score pa-0">
                      {{item.average}}
                    </v-col>
                    <v-col class="subdriver-view text-right pa-0">
                      <v-menu open-on-hover offset-y :offset-x="false" max-height="250px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            class="pt-2"
                            v-bind="attrs"
                            v-on="on"
                          >fas fa-plus</v-icon>
                        </template>

                        <v-list>
                          <v-list>
                            <v-list-item class="text-center">
                              <div class="text-center font-weight-bold" :style="`color:${getScoreColor(item.average)}`">
                                {{item.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}}
                              </div>
                            </v-list-item>
                          </v-list>
                          <v-list-item
                            v-for="(item, key) in item.sub_drivers"
                            :key="key"
                          >
                            <v-list-item-title>
                              <v-row>
                                <v-col class="text-left">{{key}}</v-col>
                                <v-col class="text-right font-weight-bold" :style="`color:${getScoreColor(item)}`">{{ item.toFixed(1) }}</v-col>
                              </v-row>
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </div>
                <div class="text--primary driver-title">{{item.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}}</div>
              </div>
              <v-card-actions>
                <v-container>
                  <v-progress-linear
                    :active="true"
                    :background-opacity="0.3"
                    :bottom="false"
                    :buffer-value="100"
                    :height="4"
                    :indeterminate="false"
                    :query="false"
                    :rounded="true"
                    :stream="false"
                    :striped="false"
                    :top="false"
                    :value="item.average*10*2"
                    :color="getScoreColor(item.average)"
                  ></v-progress-linear>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5" class="pl-2">
        <v-row>
          <v-col>
            <v-card class="ml-1 participation-chart" outlined tile>
              <v-card-title>
                <div class="text-center w-100">
                  Participation Month Wise
                </div>
              </v-card-title>
              <div id="chartdiv"></div>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="ml-1 gender-diversity" outlined tile>
              <v-card-title>
                <div class="text-center w-100">
                  Gender Diversity<br/>Engagement
                </div>
              </v-card-title>
              <v-card-text class="text-center w-100">
                <v-row>
                  <v-col>Male</v-col>
                  <v-col>3.5</v-col>
                </v-row>
                <v-row>
                  <v-col>Female</v-col>
                  <v-col>4.5</v-col>
                </v-row>
                <v-row>
                  <v-col>Others</v-col>
                  <v-col>1.5</v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'driverOverview',

  components: {
    ContentLoader
  },

  data () {
    return {
      initialLoading: false,
      driverBreakdown: []
    };
  },

  mounted () {
    this.createChart();
  },

  methods: {
    getScoreColor (score) {
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
    createChart () {
      // window.AmCharts.makeChart('chartdiv', {
      //   type: 'serial',
      //   theme: 'none',
      //   marginTop: 0,
      //   marginRight: 80,
      //   dataProvider: [{
      //     year: '01/08/2020',
      //     value: 3
      //   }, {
      //     year: '01/07/2020',
      //     value: 5
      //   }, {
      //     year: '01/06/2020',
      //     value: 2
      //   }],
      //   valueAxes: [{
      //     axisAlpha: 0,
      //     position: 'left'
      //   }],
      //   graphs: [{
      //     id: 'g1',
      //     balloonText: "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
      //     bullet: 'round',
      //     bulletSize: 8,
      //     lineColor: '#d1655d',
      //     lineThickness: 2,
      //     negativeLineColor: '#637bb6',
      //     type: 'smoothedLine',
      //     valueField: 'value'
      //   }],
      //   chartScrollbar: {
      //     enabled: false
      //   },
      //   chartCursor: {
      //     categoryBalloonDateFormat: 'YYYY',
      //     cursorAlpha: 0,
      //     valueLineEnabled: true,
      //     valueLineBalloonEnabled: true,
      //     valueLineAlpha: 0.5,
      //     fullWidth: true
      //   },
      //   dataDateFormat: 'YYYY MM',
      //   categoryField: 'year',
      //   categoryAxis: {
      //     minPeriod: 'YYYY MM',
      //     parseDates: true,
      //     minorGridAlpha: 0.1,
      //     minorGridEnabled: true
      //   },
      //   export: {
      //     enabled: false
      //   }
      // });
      window.AmCharts.makeChart('chartdiv', {
        type: 'serial',
        theme: 'none',
        legend: {
          useGraphSettings: true
        },
        dataProvider: [{
          month: '01/08/2020',
          value: 3
        }, {
          month: '01/07/2020',
          value: 5
        }, {
          month: '01/06/2020',
          value: 2
        }],
        valueAxes: [{
          integersOnly: true,
          maximum: 5,
          minimum: 1,
          reversed: false,
          axisAlpha: 0,
          dashLength: 5,
          gridCount: 5,
          position: 'left',
          title: 'Score',
          titleBold: false
        }],
        startDuration: 0.5,
        graphs: [{
          id: 'g1',
          balloonText: "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
          bullet: 'round',
          bulletSize: 8,
          lineColor: '#4c3e9d',
          lineThickness: 2,
          negativeLineColor: '#4c3e9d',
          type: 'smoothedLine',
          valueField: 'value'
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
    }
  }
};
</script>

<style lang="scss" scoped>
.driver-card {
  .driver-score-wrap {
    .driver-score {
      font-size: 28px;
    }
  }
  .driver-title {
    font-size: 18px;
  }
}
.participation-chart {
  height: 250px;
  border-radius: 8px !important;
  #chartdiv {
    height: 200px;
  }
}
.gender-diversity {
  border-radius: 8px !important;
}
</style>
