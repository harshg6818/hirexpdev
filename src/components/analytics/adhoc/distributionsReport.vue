<template>
  <div>
    <v-layout row wrap>
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
          <v-layout class="mb-3 pb-3">
            <v-flex xs6 style="border-right:1px solid rgb(206, 203, 203)">

              <!-- Email Distribution Donut Chart -->
              <div id="emailChartdiv" class="distributionGraph" v-show="Emailstats"> </div>

              <div class="distributionLegends" v-if="Emailstats && report && report.overview && report.overview.email">
                <!--<div class="d-inline-flex"> <div class="adhoc--text"> <v-icon> fas fa-circle </v-icon> </div> &nbsp; Total ( {{report.overview.email.total }} %) </div>-->
                <div class="d-inline-flex mb-1"> <div class="primary--text"> <v-icon color="primary"> fas fa-circle </v-icon> </div> &nbsp; Delivered ( {{(report.overview.email.delivered / report.overview.email.total) * 100 }} %) </div>
                <div class="d-inline-flex mb-1"> <div style="color:#d1ecf1"> <v-icon color="#d1ecf1"> fas fa-circle </v-icon> </div> &nbsp; Seen ( {{(report.overview.email.seen / report.overview.email.total) * 100 }} %) </div>
                <div class="d-inline-flex mb-1"> <div style="color:red--text"> <v-icon color="red"> fas fa-circle </v-icon> </div> &nbsp; Bounced ( {{(report.overview.email.bounced / report.overview.email.total) * 100 }} %) </div>
                <div class="d-inline-flex mb-1"> <div class="purple--text"> <v-icon color="purple"> fas fa-circle </v-icon> </div> &nbsp; Unsubscribed ( {{(report.overview.email.unsubscribed / report.overview.email.total) * 100 }} %) </div>
              </div>

              <!-- No data for Email Distribution -->
              <v-layout class="distributionGraph" row wrap align-center justify-center fill-height v-show="!Emailstats">
                <v-flex text-xs-center>
                <strong class="display-1 font-weight-bold grey--text">
                    Not enough data to generate analysis
                </strong>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs6 >
              <!-- SMS Distribution Donut Chart -->
              <div id="smsChartdiv" class="distributionGraph" v-show="SMSstats"> </div>

              <div class="distributionLegends" v-if="SMSstats && report && report.overview && report.overview.sms">
                <!--<div class="d-inline-flex"> <div class="adhoc--text"> <v-icon> fas fa-circle </v-icon> </div> &nbsp; Total ( {{report.overview.sms.total }} %) </div>-->
                <div class="d-inline-flex mb-1"> <div class="red--text"> <v-icon color="red"> fas fa-circle </v-icon> </div> &nbsp; Delivered ( {{(report.overview.sms.invalid / report.overview.sms.total) * 100 }} %) </div>
              </div>

              <!-- No data for SMS Distribution -->
              <v-layout class="distributionGraph" row wrap align-center justify-center fill-height v-show="!SMSstats">
                <v-flex text-xs-center>
                  <strong class="display-1 font-weight-bold grey--text">
                    Not enough data to generate analysis
                  </strong>
                </v-flex>
              </v-layout>
            </v-flex>

          </v-layout>

          <!-- Distribution Analysis -->
          <div class="w-100 px-5">
            <h2 class="mb-0 px-5 py-3" style="background-color:#6f7e95;color:#fff" > Campaign Distribution Analysis </h2>
            <v-card class="mb-3" v-for="(group, gid) in groupWiseReport" :key="gid">
              <h3 class="px-5 py-3" style="font-size:20px"> Group : {{gid}}  </h3>
              <v-card class="mb-3 mx-5" v-for="(distribution, medium) in group" :key="medium">
                <!-- <h3 class="text-capitalize px-3 py-3"> Distribution Medium : {{medium}} </h3> -->

                <div v-for="(dist, index) in distribution" class="px-5" :key="index">
                  <div v-if="!dist.is_reminder" class="mt-2">
                    <p style="font-size:20px;font-weight:600" class="mb-0"> {{formattedDate(dist.date)}}
                      <v-icon large color="#4c3e9d" class="distribution-report-medium ml-2"> {{getMediumIcon(medium)}} </v-icon>
                    </p>
                    <p style="font-size:20px" class="mb-0">
                      <a @click="openRecipientsList(dist, gid, medium)" class="cursor-pointer hover-link ml-2"> {{dist.count}} invites sent </a>
                    </p>
                  </div>

                  <div v-if="dist.is_reminder" class="reminders-list mt-2">
                    <p class="reminders-list-item ml-4 mb-0"> </p>
                    <p style="font-size:18px" class="my-1 pt-1 ml-4"> {{formattedDate(dist.date)}} <a @click="openRecipientsList(dist, gid, medium)" class="cursor-pointer hover-link ml-2"> Sent {{dist.count}} reminders </a> </p>
                  </div>
                </div>
              </v-card>
            </v-card>
          </div>

        </div>
      </v-flex>
    </v-layout>

    <RecipientsReport ref="RecipientsReport"> </RecipientsReport>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import RecipientsReport from './RecipientsReport';
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
    // dayjs,
    RecipientsReport
  },
  data () {
    return {
      dateRangeOptions: {},
      open: false,
      title: '',
      stageId: null,
      report: {},
      Emailstats: false,
      SMSstats: false,
      groupWiseReport: {},
      config: {
        initialLoading: true
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    getDistributionsReport (stageId) {
      this.config.initialLoading = true;
      const queryParams = {
        stage_id: stageId
      };
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}dashboard/distribution_report`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data && response.data.data) {
          this.config.initialLoading = false;
          this.report = response.data.data;
          if (response.data.data.overview && (response.data.data.overview.email || response.data.data.overview.sms)) {
            this.generateEmailGraph(response.data.data.overview.email);
            this.generateSMSGraph(response.data.data.overview.sms);
          }
          if (response.data.data.group_wise) {
            this.generateGroupWiseData(response.data.data.group_wise);
          }
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
    generateEmailGraph (data) {
      // const that = this;
      if (Object.keys(data).length) {
        this.$lodash.each(data, (v, k) => {
          if (v > 0) {
            this.Emailstats = true;
          }
        });
      }
      if (this.Emailstats) {
        // const chart = am4core.create('emailChartdiv', am4charts.PieChart);
        // chart.data = [];
        // // Add data
        // const total = data.total;
        // this.$lodash.each(data, (v, k) => {
        //   if (k !== 'total') {
        //     chart.data.push({
        //       status: k,
        //       value: (v / total) * 100
        //     });
        //   }
        // });
        // // Add and configure Series
        // const pieSeries = chart.series.push(new am4charts.PieSeries());
        // pieSeries.dataFields.value = 'value';
        // pieSeries.dataFields.category = 'status';

        // chart.innerRadius = am4core.percent(60);

        // pieSeries.colors.list = [
        //   am4core.color('#4c3e9d'),
        //   am4core.color('#f5ab52'),
        //   am4core.color('#28a745'),
        //   am4core.color('#dc354'),
        //   am4core.color('#007bff')
        // ];
        // // Disable ticks and labels
        // pieSeries.labels.template.disabled = true;
        // pieSeries.ticks.template.disabled = true;
      }
    },
    generateSMSGraph (data) {
      // const that = this;
      if (Object.keys(data).length) {
        this.$lodash.each(data, (v, k) => {
          if (v > 0) {
            this.SMSstats = true;
          }
        });
      }
      if (this.SMSstats) {
        // Create chart instance
        // const chart = am4core.create('smsChartdiv', am4charts.PieChart);

        // Add data
        // chart.data = [];
        // const total = data.total;
        // this.$lodash.each(data, (v, k) => {
        //   if (k !== 'total') {
        //     chart.data.push({
        //       status: k,
        //       // eslint-disable-next-line no-undef
        //       value: (v / value) * 100
        //     });
        //   }
        // });
        // chart.data.unseen = chart.data.delivered - chart.data.seen;

        // Add and configure Series
        // const pieSeries = chart.series.push(new am4charts.PieSeries());
        // pieSeries.dataFields.value = 'value';
        // pieSeries.dataFields.category = 'status';

        // chart.innerRadius = am4core.percent(60);

        // // Disable ticks and labels
        // pieSeries.labels.template.disabled = true;
        // pieSeries.ticks.template.disabled = true;

        // pieSeries.colors.list = [
        //   am4core.color('#4c3e9d'),
        //   am4core.color('#f5ab52'),
        //   am4core.color('#28a745'),
        //   am4core.color('#dc354'),
        //   am4core.color('#007bff')
        // ];
      }
    },
    generateGroupWiseData (data) {
      this.groupWiseReport = data;
    },
    formattedDate (date) {
      return dayjs(date).format('MMM DD, YYYY');
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
    getMediumIcon (medium) {
      let icon = 'flaticon-006-email';
      if (medium === 'email') {
        icon = 'flaticon-006-email';
      } else if (medium === 'sms') {
        icon = 'flaticon-003-chat-1';
      } else if (medium === 'whatsapp') {
        icon = 'fab fa-whatsapp';
      } else if (medium === 'slack') {
        icon = 'fab fa-slack-hash';
      }
      return icon;
    },
    openRecipientsList (dist, group_id, medium) {
      this.$refs.RecipientsReport.distribution_data = {
        distribution_id: dist.dist_id,
        group: group_id,
        date: this.formattedDate(dist.date),
        icon: this.getMediumIcon(medium)
      };
      this.$refs.RecipientsReport.getRecipientsReport();
      this.$refs.RecipientsReport.dialogs.RecipientsReport = true;
    }
  },
  watch: {
  },
  beforeMount () {
    if (this.$route.params && this.$route.params.stageId) {
      this.stageId = this.$route.params.stageId;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
.distributionGraph {
  height: 350px!important;
  width: 500px!important;
  margin: auto!important;
}
.reminders-list {
  display: inline-flex!important;
  .reminders-list-item {
    display: block!important;
    border-left: 2px solid #4c3e9d!important;
    border-bottom: 2px solid #4c3e9d!important;
    height: 24px!important;
    width: 30px!important;
    .hover-link {
      &a {
        color: #d1ecf1!important;
      }
    }
  }
}
.distribution-report-medium {
  height: 30px!important;
  width: 30px!important;
  font-size: 36px!important;
  position: relative!important;
  top: 3px;
  &:before {
    height: 30px!important;
    width: 30px!important;
    font-size: 30px!important;
  }
}
.distributionLegends {
  // display: grid!important;
  width: 25%!important;
  margin: 0 auto!important;
}
</style>
