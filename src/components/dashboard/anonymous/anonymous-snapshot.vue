<template>
  <div class="anonymous-snapshot-wrap">
    <div class="top-cards-wrap">
      <div sm3 md3 class="anonymous-employees-cards engagement-score py-3">
        <v-card class="elevation-0">
          <p class="px-3 pt-3 my-0 score-card text-sm-left text-capitalize" style="">
            Total Messages
          </p>
          <div v-if="report && report.total_count >= 0" class="d-inline-flex w-100">
            <h1 class="score-card heading text-center" style="width:60%"
              v-if="report && report.total_count">
              {{ report.total_count }}
            </h1>
            <h1 class="score-card heading text-center" style="width:60%"
              v-else>
              0
            </h1>
          </div>
          <div v-else>
            <div class="d-flex flex-row flex-wrap align-center justify-center fill-height" style="height:120px">
              <v-flex class="text-center">
                <strong class="body-2 grey--text">
                  Not enough data to generate analysis
                </strong>
              </v-flex>
            </div>
          </div>
        </v-card>
      </div>

        <!-- Messages Assigned -->
        <div sm3 md3 class="anonymous-employees-cards engagement-score py-3">
          <v-card class="elevation-0">
          <p class="px-3 pt-3 my-0 score-card text-capitalize text-sm-left" style=""> Messages Assigned </p>
          <div v-if="report && report.assigned_count >= 0" class="d-inline-flex w-100">
            <h1 class="score-card count pull-right heading text-center" style="font-size: 120px;
              font-weight: 300;
              margin: 0px auto;"
              v-if="report && report.assigned_count">
                {{ report.assigned_count }}
              <p class="text-muted  percentage" style="color: #aca3d1;" v-if="report.assigned_percentage"> {{ report.assigned_percentage }}% </p>
            </h1>

            <h1 class="score-card heading text-center" style="font-size: 120px;
              font-weight: 300;
              margin: 0px auto;"
              v-else>
              0
            </h1>
          </div>
          <div v-else>
            <div class="d-flex flex-row flex-wrap align-center justify-center fill-height" style="height:120px">
              <v-flex class="text-center">
                <strong class="body-2 grey--text">
                  Not enough data to generate analysis
                </strong>
              </v-flex>
            </div>
          </div>
          </v-card>
        </div>

        <!-- Conversations Initiated -->
        <div sm3 md3 class="anonymous-employees-cards engagement-score py-3">
          <v-card class="elevation-0">
          <p class="px-3 pt-3 my-0 score-card text-capitalize text-sm-left headding" style=""> Conversations Initiated </p>
          <div v-if="report && report.initiated_count >= 0" class="d-inline-flex w-100">
            <h1 class="score-card count pull-right heading text-center" style="font-size: 120px;
              font-weight: 300;
              margin: 0px auto;"
              v-if="report && report.initiated_count">
                {{ report.initiated_count }}
              <p class="text-muted percentage" style="color: #aca3d1;" v-if="report.initiated_percentage"> {{ report.initiated_percentage }}% </p>
            </h1>
            <h1 class="score-card heading text-center" style="font-size: 120px;
              font-weight: 300;
              margin: 0px auto;"
              v-else>
              0
            </h1>
          </div>
          <div v-else>
            <div class="d-flex flex-row flex-wrap align-center justify-center fill-height" style="height:120px">
              <v-flex class="text-center">
                <strong class="body-2  grey--text">
                  Not enough data to generate analysis
                </strong>
              </v-flex>
            </div>
          </div>
          </v-card>
        </div>

        <!-- Conversations Resolved -->
        <div sm3 md3 class="anonymous-employees-cards engagement-score py-3">
          <v-card class="elevation-0">
            <p class="px-3 pt-3 my-0 score-card text-capitalize text-sm-left" style=""> Conversations Resolved </p>
            <div v-if="report && report.resolved_count >= 0" class="d-inline-flex w-100">
              <h1 class="score-card count pull-right heading text-center" style="font-size: 120px;
                font-weight: 300;
                margin: 0px auto;"
                v-if="report && report.resolved_count">
                  {{ report.resolved_count }}
                <p class="text-muted  percentage" style="color: #aca3d1;" v-if="report.resolved_percentage"> {{ report.resolved_percentage }}% </p>
              </h1>
              <h1 class="score-card heading text-center" style="font-size: 120px;
                font-weight: 300;
                margin: 0px auto;"
                v-else>
                0
              </h1>
            </div>
            <div v-else>
              <div class="d-flex flex-row flex-wrap align-center justify-center fill-height" style="height:120px">
                <v-flex class="text-center">
                  <strong class="body-2  grey--text">
                    Not enough data to generate analysis
                  </strong>
                </v-flex>
              </div>
            </div>
          </v-card>
        </div>

        <!-- Anonymity Rate -->
        <div sm3 md3 class="anonymous-employees-cards engagement-score py-3">
          <v-card class="elevation-0">
            <p class="px-3 pt-3 my-0 score-card text-capitalize text-sm-left" style=""> Anonymity Rate (%)</p>
            <div v-if="report && report.anonymity_percentage >= 0" class="d-inline-flex w-100">
              <h1 class="score-card count heading text-center" style="font-size: 120px;
                font-weight: 300;
                margin: 0px auto;"
                v-if="report && report.anonymity_percentage">
                  {{ report.anonymity_percentage }}
                <p class="text-muted lighten-2  percentage" style="color: #aca3d1;" v-if="report.anonymity_variation">
                  {{ Math.abs(report.anonymity_variation) }}%
                </p>
                <span  style="position:relative;left:5px;top:-35px"  v-if="report.anonymity_variation < 0">
                  <v-icon style="font-size:15px;color:green;"> fas fa-arrow-down </v-icon>
                </span>
                <span style="position:relative;left:5px;top:-35px"  v-if="report.anonymity_variation > 0">
                  <v-icon style="font-size:15px;color:red;"> fas fa-arrow-up </v-icon>
                </span>
              </h1>
              <h1 class="score-card heading text-center" style="font-size: 120px;
                font-weight: 300;
                margin: 0px auto;"
                v-else>
                0
              </h1>
            </div>
            <div v-else>
              <div class="d-flex flex-row flex-wrap align-center justify-center fill-height" style="height:120px">
                <v-flex class="text-center">
                  <strong class="body-2  grey--text">
                    Not enough data to generate analysis
                  </strong>
                </v-flex>
              </div>
            </div>
          </v-card>
        </div>
    </div>

    <div class="d-flex flex-row flex-wrap">
                    <v-flex xs5 class="" style="max-width:39.7%">
                      <v-card class="elevation-0">
                        <div class="anonymous-report-cards">
                          <p class="pa-3 text-left mb-0  text-capitalize"> Anonymity Rate </p>
                          <div id="anonymityRate" class="py-1"></div>
                        </div>
                      </v-card>
                    </v-flex>

                    <v-flex xs7 class="pl-2 bg-white" style="min-width:60.3%;max-width:60.3%">
                      <v-card class="elevation-0">
                        <div class="anonymous-report-cards">
                          <p class="pa-3 text-left mb-0  text-capitalize"> Anonymous Message Assignee </p>
                          <v-data-table
                            :headers="table.headers"
                            :items="table.team"
                            :loading="table.loading"
                            :sort-by.sync="table.sortBy"
                            :sort-desc.sync="table.descending"
                            class="message-inbox team-table"
                            hide-default-footer
                          >
                            <!-- <template slot="headers"> -->
                            <template slot="headers">
                              <!--<v-card>-->
                              <th class="card mb-2 px-3 sub-heading" v-for="(header, idx) in table.headers" :key="idx"
                                :style="`width:10%;max-width:10%; white-space:unset; color:rgba(0,0,0,0.54);`"
                              >
                                {{ header.text }}
                              </th>
                            </template>
                            <template v-slot:body="{ items }">
                              <!--<v-card>-->
                                <tbody>
                                  <tr class="card mb-2" v-for="(item, index) in items" :key="index">
                                    <td class="px-4" style="min-width:240px;width:24%">
                                      <div class="d-flex flex-row flex-wrap align-center">
                                        <v-flex xs3>
                                          <v-avatar size="40px" class="mr-3 text-center" :color="getColor(item)" style="max-width:40px;">
                                            <img :src="item.profilePicture" alt="employee.display_name" v-show="item.profilePicture">
                                            <span class="white--text" style="font-size:16px" v-show="!item.profilePicture">{{getAvatar(item)}}</span>
                                          </v-avatar>
                                        </v-flex>
                                        <v-flex xs9 class="pl-2">
                                          <p class="mb-0">
                                              {{item.user_name}}
                                          </p>
                                          <small class="text-muted d-inline-flex"> Department : {{ item.user_department }} </small>
                                          <small class="text-muted d-inline-flex"> Location : {{ item.user_location }} </small>
                                        </v-flex>
                                      </div>
                                    </td>

                                    <td class="text-sm-center px-3" style="min-width:100px;width:19%">
                                      <span v-if="item.total >= 0">
                                        {{item.total}}
                                      </span>
                                      <span v-else class=" grey--text"> - </span>
                                    </td>

                                    <td class="text-sm-center px-3" style="min-width:130px;width:19%">
                                      <span v-if="item.responded >= 0">
                                        {{item.responded}}
                                      </span>
                                      <span v-else class=" grey--text"> - </span>
                                    </td>

                                    <!-- <td class="text-sm-center" style="width:12%;min-width:12%">
                                      <span v-if="item.open >= 0">
                                        {{item.open}}
                                      </span>
                                      <span v-else class=" grey--text"> - </span>
                                    </td> -->

                                    <td class="text-sm-center px-3" style="min-width:130px;width:19%">
                                      <span v-if="item.resolved >= 0">
                                        {{item.resolved}}
                                      </span>
                                      <span v-else class=" grey--text"> - </span>
                                    </td>

                                    <td class="text-sm-center px-3" style="width:130px;min-width:130px">
                                      <a style="color: rgba(0, 0, 0, 0.54); padding: 5px; border: 1px solid darkgrey; border-radius: 3px;" class="employeeViewDetails" @click.stop="filterData(item.user_email)"> View details </a>
                                    </td>
                                  </tr>
                                </tbody>
                              <!--</v-card>-->
                            </template>
                            <template slot="expand">
                              <div class="secondary px-4 py-2">
                                Extra details
                              </div>
                            </template>
                            <v-alert slot="no-data" :value="true" color="#fff" outline>
                              <span v-show="!table.searchString">
                                <div style="height:300px">
                                  <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                                    <v-flex class="text-center">
                                      <strong class="body-2  grey--text">
                                        Not enough data to generate analysis
                                      </strong>
                                    </v-flex>
                                  </div>
                                </div>
                              </span>
                              <span v-show="table.searchString">
                                Your search for "{{ table.searchString }}" found no results.
                              </span>
                            </v-alert>
                          </v-data-table>
                        </div>
                      </v-card>
                    </v-flex>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import { VAlert, VAvatar } from 'vuetify';
import Anychart from 'anychart';
// import VueAnychart from '../../analytics/VueAnychart';

export default {
  name: 'anonymousSnapshot',

  // components: {
  //   VAlert,
  //   VAvatar
  // },

  data () {
    return {
      report: {},
      table: {}
    };
  },

  mounted () {
    this.getAnonymousStats();
  },

  methods: {
    getColor (e) {
      let color = 'primary';
      if (e.gender && e.gender === 'female') {
        color = 'pink';
      }
      return color;
    },
    getAvatar (c) {
      let name = '';
      if (c.anonymous_name) {
        name = c.anonymous_name.split(' ');
      } else if (c.user_name) {
        name = c.user_name.split(' ');
      }
      const avt = `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
      return avt.toUpperCase();
    },
    getAnonymousStats () {
      axios.get(`${process.env.VUE_APP_BASE_API_URL}anonymous_bot/dashboard?fields=anonymous_message_overview,userwise_assigned_messages,anonymity_trend`).then((response) => {
        if (response && response.data) {
          this.report = response.data.anonymous_message_overview;
          this.table.team = response.data.userwise_assigned_messages;
          this.generateAreaChart(response.data.anonymity_trend);
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch users list, Please try again later!'
        });
        throw new Error(response);
      });
    },
    generateAreaChart (data) {
      setTimeout(() => {
        if (document.getElementById('anonymityRate')) {
          document.getElementById('anonymityRate').innerHTML = '';
        }
        // create a chart
        const chart = Anychart.area();
        const series = chart.area(data);
        series.normal().fill('#edebf5');
        series.normal().stroke('#4c3e9d');
        // enable HTML for tooltips
        chart.tooltip().useHtml(true);
        // tooltip settings
        const tooltip = chart.tooltip();
        tooltip.positionMode('point');
        tooltip.title('Month: <b>{%x}');
        tooltip.format('Anonymity Rate: <b>{%value}</b>');
        chart.title('');
        // set the titles of the axes
        chart.xAxis().title('Month');
        chart.yAxis().title('');
        // set the container id
        chart.container('anonymityRate');
        // initiate drawing the chart
        chart.draw();
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.anonymous-snapshot-wrap {
  .top-cards-wrap {
    display: flex;
    overflow: hidden;
  }
  #anonymityRate {
  height: 470px!important;
}
}
</style>
