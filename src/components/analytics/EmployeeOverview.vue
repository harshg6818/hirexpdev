<template>
  <v-layout row wrap class="mx-0 mt-0">
    <v-layout row wrap class="mb-4" v-if="config.initialLoading">
      <v-flex xs3>
        <ContentLoader
          class="bg-white mb-2"
          :height="100"
          :width="110"
          :speed="2"
          primaryColor="#e9e7e7"
          secondaryColor="#fff"
          >
          <circle cx="50" cy="15" r="15" />
          <rect x="35" y="35"  rx="1" ry="1" width="40" height="5.93" />
          <rect x="10" y="45" rx="1" ry="1" width="90" height="5.93" />
          <rect x="10" y="55" rx="1" ry="1" width="90" height="5.93" />
          <rect x="10" y="65" rx="1" ry="1" width="90" height="5.93" />
          <rect x="10" y="75" rx="1" ry="1" width="90" height="5.93" />
          <rect x="10" y="85" rx="1" ry="1" width="90" height="5.93" />
          <rect x="10" y="95" rx="1" ry="1" width="90" height="5.93" />
        </ContentLoader>
      </v-flex>

      <v-flex xs9>
        <ContentLoader
          class="bg-white mb-2"
          :height="50"
          :width="200"
          :speed="2"
          primaryColor="#e9e7e7"
          secondaryColor="#fff"
          >
        </ContentLoader>

        <ContentLoader
          class="bg-white mb-2"
          :height="50"
          :width="200"
          :speed="2"
          primaryColor="#e9e7e7"
          secondaryColor="#fff"
          >
        </ContentLoader>
      </v-flex>

      <v-flex xs12>
        <ContentLoader
          class="bg-white mb-2"
          :height="50"
          :width="200"
          :speed="2"
          primaryColor="#e9e7e7"
          secondaryColor="#fff"
          >
        </ContentLoader>
      </v-flex>

      <v-flex xs12>
        <ContentLoader
          class="bg-white mb-2"
          :height="50"
          :width="200"
          :speed="2"
          primaryColor="#e9e7e7"
          secondaryColor="#fff"
          >
        </ContentLoader>
      </v-flex>
    </v-layout>

    <!-- Profile and engagement -->
    <v-layout row wrap class="mb-0" v-if="!config.initialLoading" style="border-bottom: 1px solid #d0d0d0;">
      <v-flex xs3 style="border-right: 1px solid #d0d0d0;">
        <!-- Employee Details -->
        <div class="overview-cards employee-profile engagement-score" style="border-right: 1px solid #d0d0d0;width:100%;max-width:100%">
          <v-layout row wrap>
            <v-flex xs10>
              <v-avatar size="100px" class="mt-3 text-xs-center" :color="getColor(employee)" style="margin: 0 0 0 36%">
                <img :src="employee.profilePicture" alt="employee.display_name" v-show="employee.profilePicture">
                <span class="white--text" style="font-size:50px" v-show="!employee.profilePicture">{{getAvatar(employee)}}</span>
              </v-avatar>

            </v-flex>

            <v-flex xs2 text-sm-right>
              <v-btn icon flat color="primary"
                @click="switchTab('profile')"
              >
                <v-icon small>fas fa-edit</v-icon>
              </v-btn>
            </v-flex>
            <v-tooltip bottom class="w-100 text-xs-center">
                <v-chip color="primary" outline class="amara--text"
                style="" slot="activator"
                v-if="employee.employee_id">
                  <p class="pt-3 pb-1 amara--text text-uppercase text-xs-center"> {{ employee.employee_id }} </p>
                </v-chip>
                Employee ID
              </v-tooltip>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 class="mt-2">
              <h1 class="pt-2 px-3 pb-0 mb-0 text-uppercase text-xs-left text-overflow-ellipsis" style="font-weight:bold" :class="employee.status === 'inactive' ? 'emp-disable' : 'emp-enable'">
                <v-btn @click.stop="highpotentialTrue = true" v-show="employee.high_potential_emp" flat icon color="#fdd835">
                  <v-icon>fas fa-star</v-icon>
                </v-btn>
                <v-btn @click.stop="openhighpotential()" v-show="!employee.high_potential_emp" color="#bdbdbd" flat icon>
                  <v-icon>fas fa-star</v-icon>
                </v-btn> {{ employee.first_name }} {{ employee.last_name }}
              </h1>
              <p class="pt-2 px-3 pb-0 mb-0 text-xs-left w-100 text-overflow-ellipsis" style="font-size:16px" v-if="employee.email"> {{ employee.email }} </p>
              <p class="pt-2 px-3 pb-0 mb-0 text-xs-left w-100 text-overflow-ellipsis" style="font-size:16px" v-if="employee.phoneNumber"> {{ employee.phoneNumber }} </p>

              <p class="pt-2 px-3 pb-0 mb-0 text-xs-left text-overflow-ellipsis" style="font-size:16px" v-if="employee.designation"> {{ employee.designation }} </p>
              <div class="d-inline-flex w-100" v-if="employee.department">
                <p class="pt-2 px-3 pb-0 mb-0 text-xs-left text-overflow-ellipsis" style="font-size:16px">
                  Department : {{ employee.department }}
                </p>
              </div>

              <div class="d-inline-flex w-100" v-if="employee.location">
                <p class="pt-2 px-3 pb-0 mb-0 text-xs-left text-overflow-ellipsis" style="font-size:16px">
                  Location : {{ employee.location }}
                </p>
              </div>
              <v-layout class="d-inline-flex w-100 mt-2 text-xs-center" style="border-top: 1px solid #d0d0d0;height:200px">
                <v-flex class="w-100" v-if="employee.user_session_count >= 0" style="border-right: 1px solid #d0d0d0;">
                  <p class="pt-2 px-2 pb-0 mb-0" style="font-size:10px">
                    Total Chats <br/> Initiated
                  </p>
                  <p class="px-3 pb-0 mb-0" style="font-size:50px">
                    {{ employee.user_session_count }}
                  </p>
                </v-flex>
                <v-flex class="w-100" v-if="employee.user_inProgress_session_count >= 0" style="border-right: 1px solid #d0d0d0;">
                  <p class="pt-2 px-2 pb-0 mb-0" style="font-size:10px">
                    Chats <br/> in Progress
                  </p>
                  <p class="px-3 pb-0 mb-0" style="font-size:50px">
                    {{ employee.user_inProgress_session_count }}
                  </p>
                </v-flex>
                <v-flex class="w-100" v-if="employee.user_completed_session_count >= 0">
                  <p class="pt-2 px-2 pb-0 mb-0" style="font-size:10px">
                    Chats <br/> Completed
                  </p>
                  <p class="px-3 pb-0 mb-0" style="font-size:50px">
                    {{ employee.user_completed_session_count }}
                  </p>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>

      <v-flex xs9>
        <v-layout row wrap class="mb-0" style="border-bottom: 1px solid #d0d0d0;">
          <!-- Enagagement Score -->
          <div class="overview-cards employee-view engagement-score d-inline-flex ml-3"
          :style="`border-right: 1px solid #d0d0d0;color:#fff;width:100%;max-width:100%;margin:unset`">
            <div style="width:50%">
              <p class="pa-3 mb-0 score-card text-capitalize text-xs-center" style="font-weight:bold"> Engagement Score </p>
              <div v-if="employee && employee.engagement_score" class="d-inline-flex w-100">
                <h1 class="heading score-card score-bold text-xs-right">
                  {{employee.engagement_score}}
                </h1>
                <h1 class="subheading score-card score-bold text-xs-left"> /5 </h1>
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
              <div v-if="employee && employee.engagement_score" class="card-footer text-capitalize score-card pt-3" style="font-size:14px;position:relative;top:-75px"
              :style="{ background: `linear-gradient(0deg,${getEngagementScore(employee.engagement_score)}24 0%, #ffffff 100%)`}">
              {{ getEngagement(employee.engagement_score) }}
              </div>
            </div>

            <!-- Vibe Graph -->
            <div style="border-left: 1px solid #d0d0d0;width:50%;">
              <p :class="employee && employee.user_completed_session_mood &&
              employee.user_completed_session_mood.length > 0 ? '' : 'pb-3'"
              class="px-3 pt-3 mb-0 score-card text-capitalize text-xs-center" style="font-weight:bold">
                Employee Vibe Over Time
              </p>
              <v-layout row wrap v-if="employee && employee.user_completed_session_mood &&
              employee.user_completed_session_mood.length > 0">
                <vue-anychart id="vibeGraph" class="vibeGraph" />
              </v-layout>

              <v-layout row wrap align-center justify-center fill-height v-else style="height:150px">
                <v-flex text-xs-center>
                  <strong class="body-2 font-weight-bold grey--text">
                    Not enough data to generate analysis
                  </strong>
                </v-flex>
              </v-layout>
            </div>
          </div>
        </v-layout>

        <!-- Driver Analysis -->
        <v-layout row wrap class="mb-0">
          <!-- <div class="overview-cards engagement-score" style="border-right: 0px;width:24%;max-width:24%">
            <p class="pa-3 score-card text-uppercase text-xs-center" style="font-weight:bold"> Total Chats Initiated </p>
            <div v-if="employee && employee.engagement_score" class="d-inline-flex w-100">
              <h1 class="heading score-card score-bold text-xs-right" style="width:60%">
                {{employee.user_session_count}}
              </h1>
            </div>

            <v-layout row wrap align-center justify-center fill-height v-else style="height:150px">
              <v-flex text-xs-center>
                <strong class="body-2 font-weight-bold grey--text">
                  Not enough data to generate analysis
                </strong>
              </v-flex>
            </v-layout>
          </div> -->

          <div class="overview-cards key-drivers engagement-score ml-3" style="border-right: 0px;width:100%;max-width:100%;margin:unset">
            <p class="pt-3 px-3 pb-0 mb-2 score-card text-capitalize text-xs-center" style="font-weight:bold"> Driver Analysis </p>
            <v-layout row wrap v-if="employee && employee.latest_session_driver">
              <SmallKeyDrivers ref="SmallKeyDrivers" />
            </v-layout>

            <v-layout row wrap align-center justify-center fill-height v-else style="height:150px">
              <v-flex text-xs-center>
                <strong class="body-2 font-weight-bold grey--text">
                  Not enough data to generate analysis
                </strong>
              </v-flex>
            </v-layout>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- Drivers Trend -->
    <v-layout row wrap class="mb-0" v-if="!config.initialLoading" style="border-bottom: 1px solid #d0d0d0;">
      <div class="overview-cards heatmap-card" style="border-right: 0px;width:100%;max-width:100%">
        <p class="pa-3 score-card text-capitalize text-xs-center" style="font-weight:bold"> Drivers Trend </p>
        <v-layout row wrap v-if="employee && employee.user_completed_session_driverwise_subdrivers &&
        employee.user_completed_session_driverwise_subdrivers.length">
          <vue-anychart :id="`driver-heatmap`" class="driver-heatmap">
          </vue-anychart>
        </v-layout>

        <v-layout row wrap align-center justify-center fill-height v-else style="height:150px">
          <v-flex text-xs-center>
            <strong class="body-2 font-weight-bold grey--text">
              Not enough data to generate analysis
            </strong>
          </v-flex>
        </v-layout>
      </div>
    </v-layout>

    <!-- Sentiment Analysis -->
    <v-layout row wrap class="mb-0" v-if="!config.initialLoading">
      <div class="" style="border-right: 0px;width:100%;max-width:100%;height:unset;background-color:#fff;">
        <p class="pa-3 score-card text-capitalize text-xs-center" style="font-weight:bold"> Last Chat Transcript
          <span v-if="employee.latest_session_driverwise_subdrivers && employee.latest_session_driverwise_subdrivers.stage_title">
            ( At {{employee.latest_session_driverwise_subdrivers.stage_title}} )
          </span>
        </p>
        <div v-if="employee && employee.user_latest_session_interactions" class="w-100">
          <div class="response-list">
            <v-layout :id="`response-${i}`" v-for="(t, i) in employee.user_latest_session_interactions" row wrap class="mb-0 px-3" :key="i"
            >
              <div class="active-response w-100"
              v-if="!t.parent_interaction_id"
              style="border-bottom: 1px solid lightgrey;padding: 7px;">
                <div class="d-inline">
                  <strong> Question : &nbsp; </strong> {{ t.formatted_question_text }}
                </div> <br/>
                <div class="d-inline">
                  <strong> Answer : &nbsp; &nbsp; </strong> {{ t.formatted_response_text }}
                </div>
                <div class="" v-if="employee.user_latest_session_interactions[i+1] &&
                employee.user_latest_session_interactions[i+1].parent_interaction_id &&
                employee.user_latest_session_interactions[i+1].parent_interaction_id === t.id">
                  <!-- <div class="d-inline-flex">
                    <strong> &nbsp; &nbsp; </strong> {{ employee.user_latest_session_interactions[i+1].formatted_question_text }}
                  </div> <br/> -->
                  <div class="d-inline">
                    <strong> Reason : &nbsp; &nbsp; </strong> {{ employee.user_latest_session_interactions[i+1].formatted_response_text }}
                  </div>
                </div>
              </div>
            </v-layout>
          </div>
        </div>
        <v-layout row wrap v-else align-center justify-center fill-height style="height:500px">
          <v-flex text-xs-center class="py-5">
            <strong class="body-2 font-weight-bold grey--text">
              Not enough data to generate analysis
            </strong>
          </v-flex>
        </v-layout>
      </div>
    </v-layout>
    <v-dialog persistent
      v-model="highpotentialFalse"
      max-width="55%">
      <v-card>
        <v-card-text>
          <span style="font-size:20px;">Are you sure ? </span> <br>
          Do you want to mark this employee as high potential employee.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="error"
            flat="flat"
            @click="highpotentialFalse = false"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="updateHighpotential()"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog persistent
      v-model="highpotentialTrue"
      max-width="55%">
      <v-card>
        <v-card-text>
          <span style="font-size:20px;">Are you sure ? </span> <br>
          Do you want to unmark this employee as high Potential employee.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="error"
            flat="flat"
            @click="highpotentialTrue = false"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="updateHighpotential()"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
// import Vue from 'vue';
import { ContentLoader } from 'vue-content-loader';
// import axios from 'axios';
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import {
//   VCheckbox,
//   VTooltip,
//   VAlert,
//   VAvatar,
//   VChip
// } from 'vuetify';
// import viewEmployee from '../employees/ViewEmployee';
import Anychart from 'anychart';
import VueAnychart from '../analytics/VueAnychart';
import SmallKeyDrivers from '../analytics/SmallKeyDrivers';

dayjs.extend(relativeTime);

export default {
  name: 'stage',
  components: {
    ContentLoader,
    // VCheckbox,
    // VTooltip,
    // VAvatar,
    // VAlert,
    // VChip,
    // dayjs,
    // viewEmployee,
    SmallKeyDrivers,
    VueAnychart
  },
  data () {
    return {
      employee: {},
      highpotentialTrue: false,
      highpotentialFalse: false,
      highpotential: false,
      employeeDashboardReference: null,
      config: {
        initialLoading: true
      },
      roles: ['Work-life Integration', 'Rewards & Recognition', 'Career Opportunities', 'Culture', 'Leadership', 'Performance Management']
      // stats: {
      //   mood: 0,
      //   score: 0,
      //   list: [{
      //     text: 'Overall',
      //     value: 'user',
      //   }, {
      //     text: 'Current',
      //     value: 'user_latest_session',
      //   }],
      //   active: 'user',
      // },
      // participation: {
      //   scheduled: 0,
      //   inProgress: 0,
      //   completed: 0,
      //   initiated: 0,
      // },
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    openhighpotential () {
      this.highpotentialFalse = true;
    },
    updateHighpotential () {
      if (!this.employee.high_potential_emp) {
        this.highpotential = true;
      } else {
        this.highpotential = false;
      }
      axios.patch(`${process.env.VUE_APP_API_URL}users/update/${this.employee.id}`, {
        high_potential_emp: this.highpotential
      }).then((response) => {
        if (response && response.data) {
          this.highpotentialFalse = false;
          this.highpotentialTrue = false;

          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee updated!'
          });
          if (this.employeeDashboardReference) {
            this.employeeDashboardReference.config.activeTab = 'tab-overview';
            this.employeeDashboardReference.getTabData('overview');
            if (this.employeeDashboardReference.employeeListReference) {
              let string = null;
              if (this.$sroute && this.$route.query && this.$route.query.search) {
                string = this.$route.query.search;
                this.employeeDashboardReference.employeeListReference.getTeam(string);
              }
            }
          }
          // s = {...s, ...data};
        } else {
          this.table.loading = false;
          this.config.loading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update, Please try again later!'
          });
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update, Please try again later!'
        });
        throw new Error(response);
      });
      // this.getEmployee();
    },
    // getEmployee() {
    //   const queryParams = {
    //     fields: 'engagement_score,last_milestone,high_potential_emp,latest_session_driver,latest_session_driverwise_subdrivers,last_chat_completedAt,user_session_count,user_inProgress_session_count,user_completed_session_count,user_completed_session_driverwise_subdrivers,user_latest_session_interactions,user_completed_session_mood,formatted_question_text,formatted_response_text,first_name,last_name,display_name,sub_type,email,location,phoneNumber,profilePicture,gender,designation,status,employee_id,department,user_id',
    //   };
    //   axios.get(`${process.env.VUE_APP_API_URL}users/${this.employee.id}/details`, {
    //     params: queryParams,
    //   }).then((response) => {
    //     console.log('dfg');
    //     this.config.initialLoading = false;
    //     this.$refs.EmployeeOverview.config.initialLoading = false;
    //     if (response && response.data) {
    //       this.employee = response.data;
    //       // Overview
    //       this.$refs.EmployeeOverview.employee = response.data;
    //       this.$refs.EmployeeOverview.employeeDashboardReference = this;
    //       // this.$refs.EmployeeOverview.generateParticipation(response.data.user_engagement_session_stats);
    //       this.$refs.EmployeeOverview.updateDrivers();
    //       this.$refs.EmployeeOverview.getHeatMapData();
    //       if (response.data.user_completed_session_mood && response.data.user_completed_session_mood.length) {
    //         this.$refs.EmployeeOverview.getVibeOverTime(response.data.user_completed_session_mood);
    //       }
    //       this.employeeMain = JSON.parse(JSON.stringify(response.data));
    //     }
    //   }, (response) => {
    //     this.config.initialLoading = false;
    //     this.$refs.EmployeeOverview.config.initialLoading = false;
    //     this.$store.dispatch('updateSnackbar', {
    //       color: 'error',
    //       show: true,
    //       text: 'Unable to fetch employee, Please try again later!',
    //     });
    //     throw new Error(response);
    //   });
    // },

    switchTab (tab) {
      this.employeeDashboardReference.config.activeTab = `tab-${tab}`;
      this.employeeDashboardReference.getTabData(tab);
    },
    updateDrivers () {
      // this.stats.score = this.employee[`${this.stats.active}_driver_average`];
      setTimeout(() => {
        if (this.$refs && this.$refs.SmallKeyDrivers) {
          this.$refs.SmallKeyDrivers.sortDrivers(this.employee.latest_session_driver);
        }
      }, 100);
    },
    generateParticipation (data) {
      this.$lodash.each(data, (p) => {
        this.participation[p.status] = p.count;
      });
    },
    getHeatMapData () {
      setTimeout(() => {
        const heatMapData = [];
        if (this.employee && this.employee.user_completed_session_driverwise_subdrivers) {
          const driverTrends = this.employee.user_completed_session_driverwise_subdrivers;
          this.roles = [];
          this.$lodash.each(driverTrends, (v, k) => {
            this.$lodash.each(v.session_driverwise_subdrivers, (data, driver) => {
              let match = -1;
              match = this.$lodash.findIndex(this.roles, (d) =>
                d === driver);
              if (match === -1) {
                this.roles.push(driver);
              }
            });
          });
          this.$lodash.each(driverTrends, (milestone) => {
            if (milestone.session_driverwise_subdrivers) {
              this.$lodash.each(this.roles, (driver) => {
              // this.$lodash.each(milestone.drivers_analysis.stage_drivers_breakdown, (driverData, driver) => {
                if (milestone.session_driverwise_subdrivers[driver]) {
                  const driverData = milestone.session_driverwise_subdrivers[driver];
                  heatMapData.push({
                    x: driver,
                    y: milestone.stage_title,
                    heat: driverData.average
                  });
                } else {
                  heatMapData.push({
                    x: driver,
                    y: milestone.stage_title,
                    heat: 0
                  });
                }
              });
            }
          });
          this.generateHeatMap(heatMapData);
        }
      }, 100);
    },
    generateHeatMap (data) {
      // create a chart and set the data
      const chart = Anychart.heatMap(data);
      // chart.height('80%');
      chart.container('driver-heatmap');

      // chart.xAxis.height("50%");
      // chart.yAxis().height("50%");
      var labelsX = chart.xAxis().labels();
      var labelsY = chart.yAxis().labels();

      labelsX.fontColor('#000');
      labelsX.fontSize(12);
      labelsX.fontWeight(500);
      labelsX.hAlign('center');
      labelsX.padding(20, 0, 20, 0);
      labelsY.fontColor('#000');
      labelsY.fontSize(12);
      labelsY.fontWeight(500);
      labelsY.hAlign('center');
      labelsY.padding(0, 20, 0, 20);
      labelsX.rotation(-60);

      // tooltip settings
      chart.tooltip().titleFormat('{%y}');
      chart.tooltip().useHtml(true);

      // chart.tooltip().title("{%y}");
      chart.tooltip().format('{%x} : {%heat}');

      chart.maxPointWidth(50);
      // chart.pointWidth(50);

      // create and configure a color scale.
      var customColorScale = Anychart.scales.ordinalColor();
      customColorScale.ranges([
        { from: 0, to: 0 },
        { from: 0.1, to: 3 },
        { from: 3.1, to: 4 },
        { greater: 4 }
      ]);
      customColorScale.colors(['lightgrey', '#f44336', '#ff9800', '#37b99c']);

      // set the color scale as the color scale of the chart
      chart.colorScale(customColorScale);

      // initiate drawing the chart
      chart.draw();
      this.$forceUpdate();
    },
    // getVibeOverTime(data) {
    //   if (this.employee && this.employee.user_completed_session_mood.length > 0) {
    //     setTimeout(() => {
    //       const that = this;
    //       // /* Add data */
    //       let chartData = [];
    //       this.$lodash.each(data, (value, key) => {
    //         let temp = [];
    //         temp.push(value.stage_title);
    //         temp.push(value.overall_mood);
    //         chartData.push(temp);
    //       });

    //       // create a chart
    //       let chart = anychart.line();
    //       chart.title('');

    //       // create a line series and set the data
    //       var series = chart.line(chartData);

    //       // set tooltip settings
    //       series.tooltip()
    //         .position('right')
    //         .anchor('left-center')
    //         .offsetX(5)
    //         .offsetY(0)
    //         .titleFormat('Milestone: {%X}')
    //         .format('Employee Vibe : {%Value}');

    //       // adjust markers of a series
    //       let markers = series.markers();
    //       markers.enabled(true);
    //       markers.fill("#edebf5");
    //       markers.stroke("2 #4c3e9d");
    //       let hoverMarkers = series.hovered().markers();
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

    //       // set the container id
    //       chart.container("vibeGraph");

    //       // initiate drawing the chart
    //       chart.draw();
    //     }, 100);
    //   }
    // },
    getVibeOverTime (data) {
      this.$lodash.each(data, (v, k) => {
        v.bullet = this.getImgUrl(`${Math.round(v.overall_mood)}`);
        v.category = v.stage_title;
      });
      if (this.employee && this.employee.user_completed_session_mood.length > 0) {
        setTimeout(() => {
          window.AmCharts.makeChart('vibeGraph', {
            type: 'serial',
            pathToImages: './amcharts3/amcharts/images/',
            svgIcons: false,
            theme: 'light',
            dataProvider: data,
            valueAxes: [{
              labelsEnabled: true,
              minimum: 0,
              maximum: 5,
              autoGridCount: false,
              gridCount: 6,
              gridAlpha: 0,
              dashLength: 10,
              axisAlpha: 0,
              position: 'left'
            }],
            graphs: [{
              customBulletField: 'bullet',
              bulletSize: 30,
              id: 'g1',
              // "balloonText": "[[category]]",
              bullet: 'round',
              labelText: '[[stage__title]]',
              labelPosition: 'bottom',
              lineColor: '#0d2c8d',
              lineThickness: 2,
              type: 'smoothedLine',
              valueField: 'overall_mood'
            }],
            // "chartCursor": {
            //   "categoryBalloonDateFormat": "DD-MMM",
            //   "cursorAlpha": 0,
            //   "cursorColor": "#11998e",
            //   "valueLineEnabled": true,
            //   "valueLineBalloonEnabled": true,
            //   "valueLineAlpha": 0.5,
            //   "fullWidth": true,
            // },
            categoryField: 'createdAt',
            marginRight: 30,
            marginLeft: 70,
            marginTop: 30,
            // marginLeft: 0,
            categoryAxis: {
              parseDates: false,
              dashLength: 10,
              minorGridAlpha: 0,
              minorGridEnabled: true,
              labelFunction: function labelFunction (categoryField) {
                // eslint-disable-next-line no-undef
                return AmCharts.formatDate(new Date(categoryField), 'DD MMMM, YY');
              }
            },
            export: {
              enabled: false
            }
          });
        });
      }
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
    getEnagementColor (value) {
      let color = '';
      if (value >= 80) {
        color = '#4caf50';
      } else if (value >= 60 && value < 80) {
        color = '#ff9800';
      } else if (value < 60) {
        color = '#f44336';
      }
      return color;
    },
    getColor (e) {
      let color = 'primary';
      if (e.gender && e.gender === 'female') {
        color = 'pink';
      }
      return color;
    },
    getAvatar (c) {
      let avt = '';
      if (c.first_name && c.last_name) {
        avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      } else if (c.first_name && !c.last_name) {
        avt = `${c.first_name.charAt(0)}`;
      } else if (!c.first_name && c.last_name) {
        avt = `${c.last_name.charAt(0)}`;
      } else if (!c.first_name && !c.last_name && c.display_name) {
        c.first_name = c.display_name.split(' ')[0];
        c.last_name = c.display_name.split(' ')[1];
        avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      }
      return avt.toUpperCase();
    },
    getImgUrl (pet) {
      let image = '';
      if (pet) {
        const images = require.context('@/assets/', false, /\.png$/);
        image = images(`./${pet}.png`);
      }
      return image;
    }
  },
  mounted () {},
  beforeMount () {
    // if (this.employeeDashboardReference) {
    //   if (this.employeeDashboardReference.employeeListReference && this.employeeDashboardReference.employeeListReference.table.loading) {
    //     this.employeeDashboardReference.employeeListReference.getTeam();
    //   }
    // }
    // this.getHeatMapData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#scoreOverTime {
  height: 15em;
  width: 100%;
}

.emp-disable {
  opacity: 0.4;
  pointer-events: none;
}

.action-card {
  position: absolute;
  display: none;
  right: 0;
  bottom: 0;
  padding: 10px;
  transition: all 300ms ease;
}
.v-card:hover {
  .action-card {
    display: block;
  }
}

img.disabled {
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
}

.overview-cards {
  width: 100%!important;
  margin: 0 auto!important;
  background-color: #fff;
  border: 0px!important;
  // border: 1px dashed grey!important;
  // border-top: 0px!important;
  // border-bottom: 0px!important;
  // border-left: 0px!important;
  // border-right: 1px solid #d0d0d0!important;
  color: #000!important;
  .score-card {
    text-align: center!important;
    &.heading {
      font-weight: 200!important;
      text-shadow: #d0d0d0 8px 4px!important;
    }
    &.subheading {
      height: 60px !important;
    }
    &.score-bold {
      &.text-xs-right {
        text-align: right !important;
      }
      &.text-xs-left {
        text-align: left !important;
      }
      font-weight: unset!important;
      text-shadow: unset!important;
    }
  }
  &.engagement-score {
    // width: 32.5%!important;
    .score-card {
      color: #000!important;
    }
  }
  &.employee-view {
    height:220px !important;
  }
}
.vibeGraph {
  height: 175px!important;
  width: 100%!important;
  margin: 8px auto 8px auto!important;
  top:-18px!important;
  left: -5px!important;
}
.driver-heatmap {
  height: 300px!important;
  width: 100%!important;
  margin: 0 auto!important;
  // top:-2px!important;
  // margin: 8px auto 8px auto!important;
}
.text-overflow-ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.response-list {
  height: auto!important;
  overflow-y: hidden!important;
  overflow-x: hidden!important;
}
</style>

<style lang="scss" >
// .vibeGraph {
//   .amcharts-chart-div {
//     svg {}
//   }
// }
</style>
