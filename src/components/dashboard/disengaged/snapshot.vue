<template>
  <div class="disengaged-snapshot-wrap">
    <div v-show="stackedGraphs">
      <div class="d-flex flex-row flex-wrap mb-2">
        <v-flex sm6 md3 class="disengaged-employees-cards">
          <v-card class="elevation-0">
            <p class="py-3 score-card text-center mb-0 text-capitalize heading">
              Employee cases identified
              <v-tooltip max-width="200" bottom class="ml-2">
                <!-- <v-icon
                slot="activator"
                >fas fa-info-circle</v-icon> -->
                  Employees whose engagement score is less than or equal to 2.5 are High-risk employees.
                  Employees whose engagement score is  greater than 2.5 and less than or equal to 3 are Medium risk employees.
              </v-tooltip>
            </p>

            <div v-show="overall_disengaged_stats && overall_disengaged_stats.disengaged_employees">
              <p class="text-center" style="font-weight:300;font-size:36px" v-if="overall_disengaged_stats && overall_disengaged_stats.disengaged_employees > 0">
                {{overall_disengaged_stats.disengaged_employees}}
              </p>
              <div class="flex-row flex-wrap d-flex align-center justify-center fill-height">
                    <v-flex class="text-center">
                      <strong v-show="overall_disengaged_stats && overall_disengaged_stats.disengaged_employees == 0" class="body-2 font-weight-bold grey--text">
                        <p style="text-align:center; margin:0; font-size:20px;"> Yay! </p>
                        <p style="text-align:center; margin:0;"> You don’t have any disengaged employee </p>
                      </strong>
                    </v-flex>
                </div>

              <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-center" v-if="overall_disengaged_stats && overall_disengaged_stats.employees_reached">
                {{overall_disengaged_stats.disengaged_percentage}}% of {{overall_disengaged_stats.employees_reached}} employees spoken to are disengaged
              </p>
              <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-center" v-else>
                0% 0 employees spoken to are disengaged
              </p>

              <vue-anychart :id="'stackedBarChart-total'" class="stackedBarChart px-1"
                ref="lineChart">
              </vue-anychart>
            </div>

            <div style="height:170px" v-show="!overall_disengaged_stats || !overall_disengaged_stats.disengaged_employees">
              <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                  <v-flex class="text-center">
                    <strong class="body-2 font-weight-bold grey--text">
                      Not enough data to generate analysis
                    </strong>
                  </v-flex>
                </div>
            </div>
          </v-card>
        </v-flex>

        <!-- Issues Resolved -->
        <v-flex sm6 md3 class="disengaged-employees-cards">
          <v-card class="elevation-0">
            <p class="py-3 score-card text-center mb-0 text-capitalize heading" >
              Employee cases resolved
              <!--<v-tooltip max-width="200" bottom class="ml-2">
                <v-icon
                slot="activator"
                >fas fa-info-circle</v-icon>
                  Employees whose engagement score is less than or equal to 2.5 are High-risk employees.
                  Employees whose engagement score is  greater than 2.5 and less than or equal to 3 are Medium risk employees.
              </v-tooltip>-->
            </p>

            <div v-show="resolved_disengaged_stats && resolved_disengaged_stats.total_disengaged_employees">
              <p class="text-center" style="font-weight:300;font-size:36px" v-if="resolved_disengaged_stats && resolved_disengaged_stats.resolved_disengaged">
                {{resolved_disengaged_stats.resolved_disengaged}}
              </p>
              <p class="text-center" style="font-weight:300;font-size:36px" v-else> 0 </p>

              <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-center" v-if="resolved_disengaged_stats && resolved_disengaged_stats.total_disengaged_employees">
                {{resolved_disengaged_stats.resolved_disengaged_percentage}}% of {{resolved_disengaged_stats.total_disengaged_employees}} disengaged employees
              </p>
              <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-center" v-else>
                0% 0 disengaged employees
              </p>

              <p class="px-1 pt-3 mb-0 text-center mt-4 sub-heading" v-if="resolved_disengaged_stats && resolved_disengaged_stats.average_resolution_time"> Average Resolution Time </p>
              <p class="px-1 score-card text-capitalize text-center" style="font-weight:500" v-if="resolved_disengaged_stats && resolved_disengaged_stats.average_resolution_time">
                {{ Math.round(resolved_disengaged_stats.average_resolution_time) }} days
              </p>

              <!--<vue-anychart :id="'stackedBarChart-resolved'" class="stackedBarChart"
                ref="lineChart">
              </vue-anychart>-->
            </div>

            <div style="height:170px" v-show="!resolved_disengaged_stats || !resolved_disengaged_stats.total_disengaged_employees">
              <div class="flex-row flex-wrap d-flex align-center justify-center fill-height">
                  <v-flex class="text-center">
                    <strong class="body-2 font-weight-bold grey--text">
                      Not enough data to generate analysis
                    </strong>
                  </v-flex>
                </div>
            </div>
          </v-card>
        </v-flex>

        <!-- Employees to meet -->
        <v-flex sm6 md3 class="disengaged-employees-cards">
          <v-card class="elevation-0">
            <p class="py-3 score-card text-center mb-0 text-capitalize heading">
              Employee cases open
              <!--<v-tooltip max-width="200" bottom class="ml-2">
                <v-icon
                slot="activator"
                >fas fa-info-circle</v-icon>
                  Employees whose engagement score is less than or equal to 2.5 are High-risk employees.
                  Employees whose engagement score is  greater than 2.5 and less than or equal to 3 are Medium risk employees.
              </v-tooltip>-->
            </p>

            <div v-show="employee_to_meet_stats && employee_to_meet_stats.total_employees_to_meet">
              <p class="text-center" style="font-weight:300;font-size:36px" v-if="employee_to_meet_stats && employee_to_meet_stats.total_employees_to_meet">
                {{employee_to_meet_stats.total_employees_to_meet}}
              </p>
              <p class="text-center" style="font-weight:300;font-size:36px" v-else> 0 </p>

              <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-center" v-if="employee_to_meet_stats && employee_to_meet_stats.total_disengaged_employees">
                {{employee_to_meet_stats.total_employees_to_meet_percentage}}% of {{employee_to_meet_stats.total_disengaged_employees}} disengaged employees
              </p>
              <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-center" v-else>
                0% 0 disengaged employees
              </p>

              <vue-anychart :id="'stackedBarChart-tomeet'" class="stackedBarChart px-1"
                ref="lineChart">
              </vue-anychart>
            </div>

            <div style="height:170px" v-show="!employee_to_meet_stats || !employee_to_meet_stats.total_employees_to_meet">
              <div class="d-flex flex-wrap flex-row align-center justify-center fill-height">
                  <v-flex class="text-center">
                    <strong class="body-2 font-weight-bold grey--text">
                      Not enough data to generate analysis
                    </strong>
                  </v-flex>
                </div>
            </div>
          </v-card>
        </v-flex>

        <!-- Exited employees -->
        <v-flex sm6 md3 class="disengaged-employees-cards">
          <v-card class="elevation-0">
            <p class="py-3 score-card text-center mb-0 text-capitalize heading" >
              Disengaged employees who exited
              <!--<v-tooltip max-width="200" bottom class="ml-2">
                <v-icon
                slot="activator"
                >fas fa-info-circle</v-icon>

              </v-tooltip>-->
            </p>

            <div v-show="disengaged_exited_employee_stats && disengaged_exited_employee_stats.total_exited_employee">
              <p class="text-center" style="font-weight:300;font-size:36px" v-if="disengaged_exited_employee_stats && disengaged_exited_employee_stats.total_exited_employee">
                {{disengaged_exited_employee_stats.total_exited_employee}}
              </p>
              <p class="text-center" style="font-weight:300;font-size:36px" v-else> 0 </p>

              <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-center" v-if="disengaged_exited_employee_stats && overall_disengaged_stats && overall_disengaged_stats.disengaged_employees">
                {{disengaged_exited_employee_stats.total_exited_employees_percentage}}% of {{overall_disengaged_stats.disengaged_employees}} disengaged employees
              </p>
              <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-center" v-else>
                0% 0 disengaged employees
              </p>

              <vue-anychart :id="'stackedBarChart-exited'" class="stackedBarChart px-1"
                ref="lineChart">
              </vue-anychart>
            </div>

            <div style="height:170px" v-show="!disengaged_exited_employee_stats || !disengaged_exited_employee_stats.total_exited_employee">
              <div class="flex-row flex-wrap align-center justify-center fill-height d-flex">
                  <v-flex class="text-center">
                    <strong class="body-2 font-weight-bold grey--text">
                      Not enough data to generate analysis
                    </strong>
                  </v-flex>
              </div>
            </div>
          </v-card>
        </v-flex>
      </div>
    </div>

    <div class="flex-row flex-wrap d-flex mb-2" v-if="!stackedGraphs">
      <v-flex sm6 md3 class="disengaged-employees-cards">
        <v-card class="elevation-0">
          <p class="py-3 score-card text-center mb-0 text-capitalize heading">
            Employee cases identified
            <v-tooltip max-width="200" bottom class="ml-2">
                Employees whose engagement score is less than or equal to 2.5 are High-risk employees.
                Employees whose engagement score is  greater than 2.5 and less than or equal to 3 are Medium risk employees.
            </v-tooltip>
          </p>

          <div style="height:170px">
            <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                <v-flex class="text-center">
                  <strong class="body-2 font-weight-bold grey--text">
                    Not enough data to generate analysis
                  </strong>
                </v-flex>
              </div>
          </div>
        </v-card>
      </v-flex>

      <!-- Issues Resolved -->
      <v-flex sm6 md3 class="disengaged-employees-cards">
        <v-card class="elevation-0">
          <p class="py-3 score-card text-center mb-0 text-capitalize heading" >
            Employee cases resolved
          </p>

          <div style="height:170px">
            <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                <v-flex class="text-center">
                  <strong class="body-2 font-weight-bold grey--text">
                    Not enough data to generate analysis
                  </strong>
                </v-flex>
              </div>
          </div>
        </v-card>
      </v-flex>

      <!-- Employees to meet -->
      <v-flex sm6 md3 class="disengaged-employees-cards">
        <v-card class="elevation-0">
          <p class="py-3 score-card text-center mb-0 text-capitalize heading">
            Employee cases open
          </p>

          <div style="height:170px">
            <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                <v-flex class="text-center">
                  <strong class="body-2 font-weight-bold grey--text">
                    Not enough data to generate analysis
                  </strong>
                </v-flex>
              </div>
          </div>
        </v-card>
      </v-flex>

      <!-- Exited employees -->
      <v-flex sm6 md3 class="disengaged-employees-cards">
        <v-card class="elevation-0">
          <p class="py-3 score-card text-center mb-0 text-capitalize heading" >
            Disengaged employees who exited
          </p>

          <div style="height:170px">
            <v-layout class="flex-row flex-wrap d-flex align-center justify-center fill-height">
                <v-flex class="text-center">
                  <strong class="body-2 font-weight-bold grey--text">
                    Not enough data to generate analysis
                  </strong>
                </v-flex>
              </v-layout>
          </div>
        </v-card>
      </v-flex>
    </div>

    <div class="my-2 flex-row flex-wrap d-flex">
      <v-flex sm6>
        <div class="disengaged-employees-cards drivers-breakdown">
          <v-card>
          <div v-if="disengagedDrivers && disengagedDrivers.length > 0">
            <p class="py-3 score-card text-center mb-0 heading" >
              Top 3 drivers leading to disengagement at {{user.company_name}}
            </p>

            <swiper :options="swiperOption" class="pa-3">
              <swiper-slide
                class="driver-slide"
                v-for="(d, di) in disengagedDrivers"
                v-if="di < 3"
                :key="di"
              >
                <v-card class="pa-2 elevation-0">
                  <div class="slide-content">
                    <div class="d-flex flex-row flex-wrap">
                      <v-flex xs3>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <p class="heading-b mb-0" v-bind="attrs" v-on="on">
                              {{d.average}}
                            </p>
                          </template>
                          <span> Driver average </span>
                        </v-tooltip>
                      </v-flex>
                      <!--<v-flex class="success--text text-xs-right pt-3">
                        0.6 above
                        <v-icon color="success">fas fa-long-arrow-alt-up</v-icon>
                      </v-flex>-->
                    </div>
                    <p class="mb-3 mt-1  driver-title heading" style="min-height:50px;">
                      <span class="heading" v-if="d.driver"> {{d.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}} </span>
                    </p>
                    <v-divider class="mb-2"></v-divider>
                    <span class="caption" style="color:rgba(0,0,0,0.5) !important;">Subdriver Score</span>
                    <v-list class="pa-0 subdrivers-list">
                      <v-list-item
                        class="subdriver-tile"
                        v-for="(v, k) in d.sub_drivers"
                        :key="k"
                      >
                        <div class="d-flex flex-row flex-wrap">
                          <v-flex xs9 class="overflow-wrap mr-2">
                            <v-list-item-title class="text-capitalize">
                              <span style="font-size:13px !important;" v-if="k"> {{k.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}} </span>
                            </v-list-item-title>
                          </v-flex>
                          <v-flex xs2 class="mr-2">
                            <v-list-item-action style="font-size:13px !important;align-items:flex-end;" class="text-right"
                            :style="`min-width:unset;border-bottom: 2px solid #f44336;border-color: ${getEngagementColor(v)}`">
                              {{v}}
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
                  </div>
                  <v-divider></v-divider>
                  <div class="slide-actions text-center">
                    <v-btn color="primary" class="text-capitalize" outlined small @click="viewDriver(d.driver)">View Details</v-btn>
                  </div>
                </v-card>
              </swiper-slide>
              <!-- Optional controls -->
              <div v-if="false">
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </div>
            </swiper>
          </div>

          <div class="justify-center fill-height" v-if="!disengagedDrivers || !disengagedDrivers.length" style="height:450px">
            <p class="py-3 score-card text-center mb-0 heading" >
              Top 3 drivers leading to disengagement at {{user.company_name}}
            </p>
            <div class="d-flex flex-wrap flex-row" style="height:390px">
              <v-flex text-center align-self-center>
                <strong class="body-2 font-weight-bold grey--text">
                  Not enough data to generate analysis
                </strong>
              </v-flex>
            </div>
          </div>
        </v-card>
      </div>
      </v-flex>
      <v-flex sm6 class="disengaged-employees-cards mb-0">
        <v-card class="monthwise_art" style="height:350px">
          <p class="py-3 score-card text-center mb-0 text-capitalize heading" >
            Average Resolution Time (Days)
          </p>
          <div id="monthwise_art" v-if="monthwise_art && monthwise_art.length > 0"></div>
          <div class="d-flex flex-row flex-wrap" v-else style="height:390px">
            <v-flex class="text-center align-self-center">
              <strong class="body-2 font-weight-bold grey--text">
                Not enough data to generate analysis
              </strong>
            </v-flex>
          </div>
        </v-card>
      </v-flex>
    </div>

    <div class="bg-white mb-0 d-flex flex-row">
      <p class="text-center w-100 py-3 text-capitalize heading mb-0">
        Cases Resolution Insights
      </p>
    </div>
    <div class="caseResolution d-flex flex-wrap">
      <!-- <v-simple-table class="w-100">
        <template v-slot:default>
          <thead>
            <th v-for="(h, idx) in headers" :key="idx">
              {{h.text}}
            </th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in casesResolutions" :key="index">
              <td class="text-left">
                <p class="mb-0"> {{ item.user_name }} </p>
                <small class="text-muted grey--text"> {{ item.user_email }} </small>
              </td>
              <td class="text-center">{{ item.total }}</td>
              <td class="text-center">{{ item.resolved }}</td>
              <td class="text-center">{{ item.open }}</td>
              <td class="text-center">{{ Math.round(item.average_resolution_time * 100) / 100 }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table> -->
      <v-data-table
        :headers="headers"
        :items="casesResolutions"
        item-key="name"
        class="elevation-1 w-100"
        footer-props.items-per-page-options="[10, 15, 20]"
      >
        <template v-slot:body="{items}">
          <tbody>
            <tr v-for="(item, index) in items" :key="index" class="py-2">
              <td class="text-left">
                <p class="mb-0">{{ item.user_name }}</p>
                <small class="text-muted grey--text"> {{ item.user_email }} </small>
              </td>
              <td class="text-center">{{ item.total }}</td>
              <td class="text-center">{{ item.resolved }}</td>
              <td class="text-center">{{ item.open }}</td>
              <td class="text-center">{{ Math.round(item.average_resolution_time * 100) / 100 }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
// import {
//   VCheckbox,
//   VAvatar,
//   VTooltip,
//   VAlert,
//   VProgressLinear,
//   VChip,
//   VBadge,
// } from 'vuetify';
import Anychart from 'anychart';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState } from 'vuex';

import DisengagedMixin from './disengaged-mixin';
import VueAnychart from '../../analytics/VueAnychart';

export default {
  name: 'DisengagedSnapshot',

  components: {
    // VCheckbox,
    // VAvatar,
    // VTooltip,
    // VAlert,
    // VProgressLinear,
    // VChip,
    // VBadge,
    swiper,
    swiperSlide,
    VueAnychart
  },

  mixins: [DisengagedMixin],

  data () {
    return {
      monthwise_art: [],
      disengagedDrivers: [],
      stackedGraphs: false,
      overall_disengaged_stats: {},
      resolved_disengaged_stats: {},
      employee_to_meet_stats: {},
      disengaged_exited_employee_stats: {},
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 10,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true
        },
        breakpoints: {
          1800: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          1264: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 'auto',
            spaceBetween: 10,
            centeredSlides: true
          }
        }
      },
      casesResolutions: [],
      headers: [{
        text: 'HR Name',
        align: 'center',
        sortable: false,
        value: 'name'
      }, {
        text: 'Total Cases Assigned',
        sortable: false,
        align: 'center',
        value: 'fat'
      }, {
        text: 'Cases Resolved',
        sortable: false,
        align: 'center',
        value: 'carbs'
      }, {
        text: 'Cases Open',
        value: 'protein',
        sortable: false,
        align: 'center'
      }, {
        text: 'Average Resolution Time \n (Days)',
        value: 'iron',
        sortable: false,
        align: 'center'
        // },{
        // text: 'Action',
        // value: 'iron',
        // sortable: false,
        // align: 'center',
      }]
    };
  },

  mounted () {
    this.getOverview();
  },

  computed: {
    ...mapState({
      user: state => state.user,
      dashboardFilters: state => state.dashboardFilters,
      adminUsers (state) {
        const adminUsers = state.companyAdminsList;
        return adminUsers;
      }
    }),
    checkForFilters () {
      let applied = false;
      this.$lodash.each(this.filters.selected, (v) => {
        if (v.length > 0) {
          applied = true;
        }
      });
      return applied;
    }
  },

  watch: {
    stackedGraphs: {
      deep: true,
      handler () {
        this.$forceUpdate();
      }
    }
  },

  methods: {
    generateStacked (data, type) {
      const that = this;

      this.stackedGraphs = true;
      const highRisk = [];
      const mediumRisk = [];
      let total = 0;
      this.$lodash.each(data, (value, key) => {
        if (key === 'high_risk' || key === 'high_risk_employees_to_meet' || key === 'high_risk_exited_employee') {
          total += value;
        } else if (key === 'medium_risk' || key === 'medium_risk_employees_to_meet' || key === 'medium_risk_exited_employee') {
          // eslint-disable-next-line no-unused-vars
          total += value;
        }
      });
      this.$lodash.each(data, (value, key) => {
        if (key === 'high_risk' || key === 'high_risk_employees_to_meet' || key === 'high_risk_exited_employee') {
          // highRisk.push(((value / total) * 100).toFixed(0));
          highRisk.push(value);
        } else if (key === 'medium_risk' || key === 'medium_risk_employees_to_meet' || key === 'medium_risk_exited_employee') {
          // mediumRisk.push(((value / total) * 100).toFixed(0));
          mediumRisk.push(value);
        }
      });

      if (highRisk.length || mediumRisk.length) {
        const chartName = `stackedBarChart-${type}`;

        if (document.getElementById(chartName)) {
          document.getElementById(chartName).innerHTML = '';
        }

        const chart = Anychart.bar();
        chart.yScale().stackMode('percent');

        var labelsX = chart.xAxis().labels();
        var labelsY = chart.yAxis().labels();
        labelsX.enabled(false);
        labelsY.enabled(false);

        chart.xAxis().enabled(false);
        chart.yAxis().enabled(false);
        // chart.xScale().enabled(false);
        // chart.yScale().enabled(false);

        // set the container id
        chart.container(chartName);
        chart.legend(true);
        chart.legend().position('bottom');
        chart.legend().fontSize(8);
        // chart.legend().fontStyle('bold');

        var series1 = chart.bar(highRisk);
        var series2 = chart.bar(mediumRisk);
        series1.normal().fill('#f44336');
        series1.hovered().fill('#f44336');
        series1.selected().fill('#f44336');
        series1.normal().stroke('#f44336');
        series2.normal().fill('#ff9800');
        series2.hovered().fill('#ff9800');
        series2.selected().fill('#ff9800');
        series2.normal().stroke('#ff9800');
        series1.name('High Risk Employees');
        series2.name('Medium Risk Employees');

        // set the value as label in stacks
        series1.labels(true);
        series2.labels(true);
        series1.labels().position('center');
        series2.labels().position('center');
        series1.labels().offsetY(20);
        series2.labels().offsetY(20);
        series1.labels().format('{%value}');
        series2.labels().format('{%value}');
        series1.labels().fontColor('#fff');
        series2.labels().fontColor('#fff');
        series1.labels().fontSize(12);
        series2.labels().fontSize(12);
        series1.labels().fontStyle('bold');
        series2.labels().fontStyle('bold');

        chart.tooltip().titleFormat('');
        chart.tooltip().useHtml(true);

        // tooltip settings
        var tooltip1 = series1.tooltip();
        tooltip1.positionMode('point');
        tooltip1.format('<b>High Risk Employees: </b> : <b> {%value} </b>');

        var tooltip2 = series2.tooltip();
        tooltip2.positionMode('point');
        tooltip2.format('<b> Medium Risk Employees: </b> : <b> {%value} </b>');

        chart.listen('click', function (event) {
          let employeeFilters = {};
          if (type === 'total') {
            employeeFilters = {};
          } else if (type === 'resolved') {
            employeeFilters = {
              action_status__in: 'resolved'
            };
          } else if (type === 'tomeet') {
            employeeFilters = {
              user__profile__status__in: 'active',
              action_status__in: 'open,scheduled,acknowledged,inProgress'
            };
          } else if (type === 'exited') {
            employeeFilters = {
              user__profile__status__in: 'inactive'
            };
          }
          if (event && event.target) {
            if (event.target.er === 'High Risk Employees') {
              employeeFilters = {
                ...employeeFilters,
                driverAverage__lte: '2.5'
              };
            } else if (event.target.er === 'Medium Risk Employees') {
              employeeFilters = {
                ...employeeFilters,
                driverAverage__gt: '2.5'
              };
            }
          }
          that.tabs.active = 'tab-disengaged-list';
          that.getEmployeesToMeet(employeeFilters);

          // const responseList = document.getElementsByClassName("employee-list");
          // that.$lodash.each(responseList, (list, li) => {
          //   list.scrollIntoView();
          // });
          // const employeeList = document.getElementById('employee-list-tab');
          // window.scrollTo(0, employeeList.offsetTop);
        });

        // initiate drawing the chart
        chart.draw();
        this.$forceUpdate();
      }
    },
    generateDisengagedArt (data) {
      const temp = [];
      setTimeout(() => {
        if (document.getElementById('monthwise_art')) {
          document.getElementById('monthwise_art').innerHTML = '';
        }

        if (data.length > 0) {
          this.$lodash.each(data, (value, key) => {
            const temp2 = [];
            temp2.push(value.month);
            temp2.push(value.engagement_stats);
            temp.push(temp2);
          });

          const chart = Anychart.area();
          const series = chart.area(temp);
          series.normal().fill('#edebf5');
          series.normal().stroke('#4c3e9d');

          // enable HTML for tooltips
          chart.tooltip().useHtml(true);

          // tooltip settings
          var tooltip = chart.tooltip();
          tooltip.positionMode('point');
          tooltip.title('Month: <b>{%x}');
          tooltip.format('Average Resolution Time: <b>{%value} days</b>');

          chart.title('');

          // set the titles of the axes
          chart.xAxis().title('Month');
          chart.yAxis().title('');

          // set the container id
          chart.container('monthwise_art');

          // initiate drawing the chart
          chart.draw();
        }
      }, 100);
    },
    viewDriver (driver) {
      const t = this.dashboardFilters;
      let tempAllFilters = {};
      if (t.filters) {
        this.$lodash.each(t.filters, (value, key) => {
          if (value.length > 0) {
            const tempObj = {
              [key]: value.length > 1 ? value.join() : value[0]
            };
            tempAllFilters = { ...tempAllFilters, ...tempObj };
          }
        });
      }
      if (this.dashboardFilters.dateRangeOptions && this.dashboardFilters.dateRangeOptions.startDate && this.dashboardFilters.dateRangeOptions.endDate) {
        tempAllFilters.startDate = this.dashboardFilters.dateRangeOptions.startDate;
        tempAllFilters.endDate = this.dashboardFilters.dateRangeOptions.endDate;
      }
      if (this.dashboardFilters.highPotential && this.dashboardFilters.highPotential.length > 0) {
        tempAllFilters.highPotential = this.dashboardFilters.highPotential;
      }
      this.$router.push({
        path: `/driver/view/${driver}`,
        query: {
          ...tempAllFilters
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.disengaged-snapshot-wrap {
  margin: 0 10px;
  padding-bottom: 30px;
  .stackedBarChart {
    height: 80px!important;
    width: 100%!important;
    margin: 8px auto 8px auto!important;
  }
  #monthwise_art {
    height: 360px!important;
    width: 95%!important;
  }
  .monthwise_art {
    &.v-card {
      height: 450px!important;
    }
  }
  .dropdown-chip {
  border-radius: 0 10px 10px 0px !important;
}
.status-chip {
  border-radius: 10px 0 0 10px !important;
}
.employeeToMeet {
  .assignee {
    width: 180px!important;
  }
}
.dropdown-btn, .status-btn {
  &.v-btn--icon:before {
    border-radius: 0;
  }
  border-radius: 0;
}
.status-btn {
  min-width: 9em !important;
}
.donutChart {
  height: 308px!important;
  width: 99%!important;
  margin: 0px!important;
  // position:relative !important;
  // top:-35px !important;
  // top:-18px!important;
  // left: -5px!important;
}
.stackedBarChart {
  height: 80px!important;
  width: 100%!important;
  margin: 8px auto 8px auto!important;
  // top:-18px!important;
  // left: -5px!important;
}
.disengaged-employees-cards {
  &.drivers-breakdown {
    .v-card {
      height: 450px!important;
    }
    .swiper-container {
      height: 450px!important;
      overflow: hidden!important;
      .driver-slide {
        max-height: 400px!important;
        overflow: hidden!important;
        .slide-content {
          height: 88%!important;
          overflow-y: hidden!important;
          .subdrivers-list {
            height: 100px!important;
            overflow-y: hidden!important;
            overflow-x: hidden!important;
          }
        }
        .slide-actions {
          height: 12%!important;
        }
      }
      .v-card {
        height: 350px!important;
      }
    }
  }
}

.caseResolution {
   thead {
      th {
        color:rgba(0,0,0,0.9) !important;
        font-size:14px !important;
      }
   }
}
#monthwise_art {
  height: 360px!important;
  width: 95%!important;
}
.monthwise_art {
  &.v-card {
    height: 450px!important;
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
}
</style>
