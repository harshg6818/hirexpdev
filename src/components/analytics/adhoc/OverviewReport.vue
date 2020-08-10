<template>
  <div>
    <div class="d-flex flex-row flex-wrap">
      <v-flex xs12 px-1>
        <div class="mt-3" v-show="config.initialLoading">
            <ContentLoader
            :height="100"
            :width="400"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#fff"
            >
            <rect x="5" y="0" rx="2" ry="2" width="190" height="96" />
            <rect x="205" y="0" rx="2" ry="2" width="190" height="96" />
            </ContentLoader>
        </div>

        <!-- After intial loading -->
        <div class="mt-3" v-show="!config.initialLoading">
            <div class="d-flex">
              <v-flex xs6 class="overview-cards">
                <div class="my-2 py-4 d-flex flex-row flex-wrap" v-if="stats && report && report.stats">
                  <v-flex xs4 class="text-center">
                    <v-progress-circular
                    :rotate="360"
                    :size="140"
                    :width="8"
                    :value="100"
                    color="primary"
                    >
                    <h1 class="black--text"> {{ report.stats.total_recipients }} </h1>
                    <p  class="black--text"> Total chats </p>
                    </v-progress-circular>
                  </v-flex>

                  <v-flex xs4 class="text-center">
                    <v-progress-circular
                    :rotate="360"
                    :size="140"
                    :width="8"
                    :value="report.perc_stats.chats_in_progress"
                    color="#4c3e9d"
                    >
                    <h1 class="black--text"> {{ report.stats.chats_in_progress }} </h1>
                    <p  class="black--text"> Chats in progress </p>
                    </v-progress-circular>
                  </v-flex>

                  <v-flex xs4 class="text-center">
                    <v-progress-circular
                    :rotate="360"
                    :size="140"
                    :width="8"
                    :value="report.perc_stats.chats_completed"
                    color="success"
                    >
                    <h1 class="black--text"> {{ report.stats.chats_completed }} </h1>
                    <p  class="black--text"> Chats completed </p>
                    </v-progress-circular>
                  </v-flex>
                </div>

                <div class="my-2 pt-3 d-flex flex-row flex-wrap" v-if="stats && report && report.stats">
                  <v-flex xs12 class="text-center">
                    <v-chip color="lightgrey" class="text-none"> <strong> Total chats : {{ report.stats.total_recipients }} </strong> </v-chip>
                  </v-flex>
                </div>

                <div class="dailyResponseGraph d-flex flex-row flex-wrap align-center justify-center fill-height" v-show="!stats || !report || !report.stats">
                  <v-flex class="text-center">
                  <strong class="display-1 font-weight-bold grey--text">
                      Not enough data to generate analysis
                  </strong>
                  </v-flex>
                </div>
              </v-flex>

              <v-flex xs6 class="overview-cards">
                <!-- <div id="chartdiv" class="dailyResponseGraph" v-show="stats && report && report.stats"> </div> -->
                <vue-anychart id="chartdiv" class="dailyResponseGraph" v-show="stats && report && report.stats"> </vue-anychart>

                <div class="my-2 d-flex flex-row flex-wrap" v-show="stats && report && report.stats">
                  <v-flex xs12 class="text-center">
                    <v-chip color="lightgrey" class="text-capitalize"> <strong> Responses / Day </strong> </v-chip>
                  </v-flex>
                </div>

                <div class="dailyResponseGraph d-flex flex-row flex-wrap align-center justify-center fill-height" v-show="!stats || !report || !report.stats">
                  <v-flex text-xs-center>
                    <strong class="display-1 font-weight-bold grey--text">
                      Not enough data to generate analysis
                    </strong>
                  </v-flex>
                </div>
              </v-flex>
            </div>
        </div>
      </v-flex>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
import Anychart from 'anychart';
import VueAnychart from '../../analytics/VueAnychart';
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
    VueAnychart
  },
  data () {
    return {
      dateRangeOptions: {},
      open: false,
      title: '',
      stageId: null,
      filters: {},
      sessions: {},
      report: {},
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
    getOverviewReport (stageId) {
      this.config.initialLoading = true;
      const queryParams = {
        stage_id: stageId
      };
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}dashboard/overview_report`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data && response.data.data) {
          this.config.initialLoading = false;
          this.report = response.data.data;
          if (document.getElementById('chartdiv')) {
            document.getElementById('chartdiv').innerHTML = '';
          }
          this.generateDailyCompletionGraph(response.data.data.daily_completion_rate);
        }
      }, (response) => {
        this.config.initialLoading = false;
        // console.log(response);
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch report data, Please try again later!'
        });
        throw new Error(response);
      });
    },
    generateDailyCompletionGraph (data) {
      // const that = this;
      if (Object.keys(data).length) {
        this.stats = true;
      }
      if (this.stats) {
        const chartData = [];
        this.$lodash.each(data, (v, k) => {
          const temp = [];
          temp.push(dayjs(k).format('DD-MM-YYYY'));
          temp.push(v);
          chartData.push(temp);
        });

        const chart = Anychart.column();
        const series = chart.column(chartData);
        series.fill('#84b761');

        // set titles for axises
        chart.xAxis().title('');
        chart.yAxis().title('');

        // chart.xScale().maximum(5);
        chart.yScale().ticks().interval(1);

        chart.tooltip()
          .useHtml(true)
          .format('Responses : {%Value}');

        chart.container('chartdiv');
        chart.draw();
      }
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
.dailyResponseGraph {
  height: 200px!important;
  width: 500px!important;
  margin: 8px auto 8px auto!important;
}
</style>
