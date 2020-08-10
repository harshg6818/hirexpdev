<template>
  <div class="dashboardView">
    <v-layout column class="bg-gradient">
      <!-- Search Bar and Filters -->
      <v-layout row wrap align-center style="border-bottom: 1px solid rgb(243, 241, 241);z-index:3;max-height:70px;">
        <v-flex class="white--text" xs5 pl-4 style="min-width:41%;position:absolute">
        </v-flex>

        <v-flex xs2>
        </v-flex>

        <v-flex class="black--text" xs5 pr-4 style="left:41%;position:relative">
        </v-flex>
      </v-layout>

      <!-- Dashboard Tabs -->
      <v-layout row wrap v-if="config.activeDriver === null" style="z-index:2">
        <v-flex>
          <!-- <v-btn> -->
            <!-- <router-link to="advance-analytics">analytics</router-link> -->
          <!-- </v-btn> -->
          <!-- <v-btn class="filter-btn text-capitalize"
            :style="!filterApplied ? 'right:20%' : 'right:30%'"
            style="position: absolute;"
            slot="activator"
            color="grey"
            flat
            depressed
            v-if="tabs.active === 'tab-overview'"
          >
            <router-link to="advance-analytics" style="text-decoration:none;">
              <v-icon style="font-size:16px; padding-right:10px;"></v-icon>analytics
            </router-link>
          </v-btn> -->

          <v-btn :style="!filterApplied ? 'right:10%' : 'right:20%'" style="
            position: absolute;
            float: right;
            z-index: 100 !important; color:grey;"
            class="text-capitalize"
            flat
            :disabled='this.downloadDashboardBtn'
            data-html2canvas-ignore
            v-show="tabs.active === 'tab-overview'"
            @click="download"
          >
          <v-btn color='grey' style="margin:0;" :loading='this.downloadDashboardBtn' icon flat>
            <v-icon :loading='this.downloadDashboardBtn' small>fas fa-cloud-download-alt</v-icon></v-btn>
              &nbsp; Download
          </v-btn>
          <div id="pdf"></div>
          <v-btn style="right: 10%;
            position: absolute;
            float: right;
            z-index: 100 !important; color:grey;"
            class="text-capitalize"
            flat
            v-show="checkForFilters && filterApplied && tabs.active !== 'tab-anonymous'"
            @click="resetDashboard"
          >
            Remove Filters
          </v-btn>
          <v-btn class="filter-btn text-capitalize " style="position: absolute;" @click="showFilter = true"
            slot="activator"
            color="primary"
            depressed
          >
            <v-icon style="font-size:16px; padding-right:10px;">fas fa-filter</v-icon> Filter
          </v-btn>
          <v-card class="elevation-0 mb-2 no-border">
            <v-tabs
              ref="tabs"
              class="custom-dashboard-tabs"
              :class="tabs.active === 'tab-overview' ? 'overview-active' : ''"
              grow
              v-model="tabs.active"
              centered
              slider-color="primary"
            >
              <v-tab
                class="mr-2 text-capitalize"
                style="font-size: 16px;"
                v-for="(t, ti) in tabs.list"
                :key="ti"
                :href="`#tab-${t.value}`"
                @click="addRef(t.value)"
              >
                <span v-if="ti === 0"> </span>
                {{t.title}}
                <!-- <v-tooltip max-width="200" bottom v-show="t.about" class="ml-2">
                  <v-icon
                  slot="activator"
                  >fas fa-info-circle</v-icon>
                  {{t.about}}
                </v-tooltip> -->
              </v-tab>
              <v-tabs-items v-model="tabs.active" class="background-custom-grey" :class="{
                'b-top': tabs.active !== 'tab-overview',
                }">
                <!-- Overview Tab-->
                <v-tab-item value="tab-overview">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <ParticipationAnalysis ref="ParticipationAnalysis" class="my-2" @disengagedEmployeesType="disengagedEmployeesType"/>
                    </v-flex>
                    <!--<v-flex xs5>
                      <DailyResponse ref="DailyResponse" class="my-2" />
                    </v-flex>-->
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12 px-2>
                      <v-card class="elevation-0 ma-0" style="background-color: rgba(76, 62, 157, 0.1) !important;">
                        <DriverEngagement ref="DriverEngagement"  @viewDriverWithFilter="viewDriverWithFilter"/>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <EmployeeVibes ref="EmployeeVibes" @dashboardFilterUpdate="updateEmployeeWithFilter" class="my-2" />
                    </v-flex>
                  </v-layout>
                  <!--<v-layout row wrap style="height:350px">
                    <v-flex xs12>
                      <DriverAnalysis ref="DriverAnalysis" class="my-2" />
                    </v-flex>
                  </v-layout>-->
                </v-tab-item>

                <!-- Critical touchpoints Tab-->
                <v-tab-item value="tab-stages">
                  <StagesAnalyzed ref="StagesAnalyzed" v-show="tabs.active === 'tab-stages'" class="my-4 mx-2" />
                </v-tab-item>

                <!-- Drivers Tab-->
                <!--<v-tab-item value="tab-key-drivers">
                  <EngagementStats ref="EngagementStats" />
                  <KeyDrivers ref="KeyDrivers" class="my-4" />
                </v-tab-item>-->

                <!-- Disengaged Employees Tab-->
                <v-tab-item value="tab-need-to-meet">
                  <EmployeesToMeet ref="EmployeesToMeet" v-show="tabs.active === 'tab-need-to-meet'" :actionStatus="actionStatusType" class="my-4 mx-2" />
                </v-tab-item>

                <!-- Open Ended Questions Tab-->
                <v-tab-item value="tab-open-ended">
                  <OpenEnded ref="OpenEnded" v-show="tabs.active === 'tab-open-ended'"  class="my-4 mx-2" />
                </v-tab-item>

                <!-- Anonymous Messages Tab-->
                <v-tab-item value="tab-anonymous">
                  <Anonymous ref="Anonymous" v-show="tabs.active === 'tab-anonymous'" />
                </v-tab-item>

                <!-- Exit Tab-->
                <v-tab-item value="tab-exit">
                  <ExitTouchpointsStats ref="ExitTouchpointsStats" v-show="tabs.active === 'tab-exit'" />
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>

    <v-navigation-drawer
    style="height:100vh; position :fixed; bottom:0; right:0"
      v-model="showFilter"

      absolute
      temporary
      hide-overlay
      right
    >
      <v-card v-if="tabs.active !== 'tab-anonymous'" style="height:90vh; overflow:auto; border:none; box-shadow:none;" class="filters-card">
        <v-expansion-panel v-model="config.panel"
          class="elevation-0 employee-filters"
        >
            <v-flex sm12 style="min-width:100%;">
              <v-expansion-panel-content style="">
                <div slot="header" class="text-capitalize py-2 px-3">Chat initiation date
                  <!-- <v-icon v-if="!expansion" style="font-size:16px; padding-bottom:2px;float: right;" class="">fas fa-sort-down</v-icon>
                  <v-icon v-if="expansion" style="font-size:16px; padding-bottom:2px;float: right;" class="">fas fa-sort-up</v-icon> -->
                </div>
                <v-card color="">
                  <v-card-text>
                    <v-radio-group @change="updateDate">
                      <v-radio
                        color="primary"
                        v-for="(t, ti) in dateRangeOptions.presets"
                        :key="ti"
                        :label="t.label"
                        :value="t.range"
                      ></v-radio>
                      <v-menu full-width offset-y :close-on-content-click="false" v-model="config.dateMenu" top>
                        <v-radio
                          slot="activator"
                          color="primary"
                          label="Select Range"
                        ></v-radio>
                        <v-card>
                          <v-card-text>
                            <v-daterange
                            no-presets
                            :options="dateRangeOptions"
                            @input="updateDate"
                            next-icon="fas fa-arrow-right"
                            prev-icon="fas fa-arrow-left"
                            prepend-icon="fas fa-calendar"
                            ></v-daterange>
                          </v-card-text>
                        </v-card>
                      </v-menu>
                    </v-radio-group>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>

              <v-expansion-panel-content style="" class="employee-filters-list">
                <div slot="header" class="text-capitalize px-3 py-2">HiPos
                  <span v-if="highPotential.selected && highPotential.selected.length > 0">
                  <v-chip>1 Selected</v-chip></span>
                </div>
                <v-card color="#fff" style="border-bottom:0px">
                  <v-card-text>
                  <v-radio-group v-model="highPotential.selected">
                      <v-radio
                        color="primary"
                        v-for="(t, ti) in highPotentialOptions"
                        :key="ti"
                        :label="t.label"
                        :value="t.key"
                      ></v-radio>
                    </v-radio-group>

                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>

              <v-expansion-panel-content style=" padding:0;" v-for="(v, k) in filters.default"
              :key="k"
              v-if="v.length > 0" class="px-0 py-0">
                <div @click="searchFilter=''; getFilterData(k)" slot="header" class="text-capitalize py-2 px-3">{{getFilterName(k)}}
                  <span v-if="filters.selected[k].length >0"><v-chip>{{filters.selected[k].length}} Selected</v-chip></span>
                  <!-- <v-icon v-if="!expansion" style="font-size:16px; padding-bottom:2px;float: right;" class="">fas fa-sort-down</v-icon>
                  <v-icon v-if="expansion" style="font-size:16px; padding-bottom:2px;float: right;" class="">fas fa-sort-up</v-icon> -->
                  </div>
                <v-card color="">
                  <v-text-field
                      @keyup="searchingfilter(k)"
                      v-model="searchFilter"
                      prepend-inner-icon="fas fa-search"
                      label="Search..."
                      single-line
                      hide-details
                      class="filter-search-bar"
                    ></v-text-field>
                  <v-card-text v-show="searchingfilter(k) && searchingfilter(k).length > 0">
                    <v-checkbox color="primary" :ripple="false"
                    :value="chk[k]" v-model="filters.selected[k]"
                    v-for="chk in searchingfilter(k)" :key="chk[k]"
                    >
                    <div class="" slot="label">
                      <span v-if="k === 'mood'">
                        <img
                          v-if="chk[k] > 0"
                          height="30"
                          :src="getImgUrl(chk[k])"
                        >
                        <span v-if="chk[k] === 0">Not answered</span>
                      </span>
                      <span v-if="k !== 'mood'">
                        {{chk[k]}}
                      </span>
                    </div>
                  </v-checkbox>
                  </v-card-text>
                  <v-card-text v-show="searchingfilter(k) && searchingfilter(k).length === 0">
                    No filters available
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-flex>
        </v-expansion-panel>

        <v-card-actions style="position:fixed; bottom :0; width:100%; right:0; border-top: 1px solid #ccc; box-shadow:1;">
          <v-btn style="color:grey;" flat @click="showFilter = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="applyfilter()" class="white--text" color="primary" style="float:right">Apply</v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-else height="100vh">
        <v-card-text>
          <v-layout row wrap align-center justify-center fill-height style="height:150px;border:2px dotted lightgrey">
            <v-flex text-xs-center>
              <h2>
                <strong class="font-weight-bold grey--text">
                  Company dashboard filters can't be applied on anonymous messages.
                </strong>
              </h2>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions style="position:fixed; bottom:0;" class="pt-0">
          <v-btn style="color:grey;" class="pl-0" flat @click="showFilter = false">Close</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>

  </div>
</template>
<script>
import Vue from 'vue';
import {
  VSelect,
  VChip,
  VMenu,
  VDivider,
  VTooltip,
  VCheckbox
} from 'vuetify';
import { mapState } from 'vuex';
import axios from 'axios';
import VDateRange from 'vuetify-daterange-picker';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import VueHtml2Canvas from 'vue-html2canvas';
import dayjs from 'dayjs';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

// import StagesAnalyzed from '../analytics/StagesAnalyzed';
// import Overview from '../analytics/Overview';
import KeyDrivers from '../analytics/KeyDrivers';
import EmployeesToMeet from '../analytics/EmployeesToMeet';
import OpenEnded from '../analytics/openEndedQuestions';
import Anonymous from '../analytics/Anonymous';
// import MoodStats from '../analytics/MoodStats';
import EngagementStats from '../analytics/EngagementStats';
import ParticipationAnalysis from '../analytics/milestones/ParticipationAnalysis';
// import DailyResponse from '../analytics/milestones/DailyResponse';
import DriverEngagement from '../analytics/milestones/DriverEngagement';
import EmployeeVibes from '../analytics/milestones/EmployeeVibes';
import ExitTouchpointsStats from '../analytics/ExitTouchpointsStats';

const StagesAnalyzed = () => import(/* webpackChunkName: "StagesAnalyzed" */ '../analytics/StagesAnalyzed');
const DriverEmployeesList = () => import(/* webpackChunkName: "DriverEmployeesList" */ '../analytics/DriverEmployeesList');
// import DriverAnalysis from '../analytics/milestones/DriverAnalysis';

Vue.use(VDateRange);

export default {
  name: 'dashboard',
  components: {
    VSelect,
    VChip,
    VMenu,
    VDivider,
    StagesAnalyzed,
    DriverEmployeesList,
    // Overview,
    KeyDrivers,
    VueHtml2Canvas,
    html2canvas,
    JsPDF,
    Anonymous,
    ExitTouchpointsStats,
    EmployeesToMeet,
    OpenEnded,
    // MoodStats,
    VCheckbox,
    VTooltip,
    EngagementStats,
    ParticipationAnalysis,
    // DailyResponse,
    DriverEngagement,
    EmployeeVibes
    // DriverAnalysis,
  },
  data () {
    return {
      height: 300,
      output: null,
      downloadDashboardBtn: false,
      updateEmployeeWithFilterSelected: null,
      expansion: false,
      disengagedActiveTab: 'tab-snapshot-list',
      showFilter: false,
      filterApplied: false,
      searchFilter: '',
      config: {
        panel: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
        initialLoading: true,
        activeDriver: null
      },
      search: '',
      highPotentialOptions: [
        {
          label: 'True',
          key: 'true'
        },
        {
          label: 'False',
          key: 'false'
        }
      ],
      highPotential: {
        default: {},
        selected: [],
        main: {}
      },
      dateRangeOptions: {
        startDate: undefined,
        endDate: undefined,
        format: 'DD/MM/YYYY',
        minDate: dayjs('01/01/2018').format(),
        maxDate: dayjs().format(),
        presets: [
          {
            label: 'All time',
            range: [
              undefined,
              undefined
            ]
          },
          {
            label: 'This Week',
            range: [
              dayjs().subtract(7, 'day').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 30 Days',
            range: [
              dayjs().subtract(1, 'month').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 3 Months',
            range: [
              dayjs().subtract(3, 'month').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 6 Months',
            range: [
              dayjs().subtract(6, 'month').format(),
              dayjs().format()
            ]
          }
        ],
        dateRange: {
          startDate: dayjs().format('DD/MM'),
          endDate: dayjs().format('DD/MM')
        }
      },
      list: {
        departments: [],
        location: []
      },
      filters: {
        default: {},
        selected: {},
        main: {}
      },

      filtersList: {
        default: {},
        selected: {},
        main: {}
      },
      // disengagedDrivers: {
      //   'Culture': {
      //     'Employer Brand': 4,
      //     'Customer Focus': 6,
      //     'Relationships': 10,
      //   },
      //   'Career Opportunities': {
      //     'Training': 6,
      //     'Onboarding': 21,
      //     'Accomplishment': 3,
      //   },
      //   'Rewards & Recognition': {
      //     'Rewards': 10,
      //     'Recognition': 40,
      //   }
      // },
      tabs: {
        active: 'tab-overview',
        list: [
          {
            title: 'Overview',
            value: 'overview'
          }, {
            title: 'Critical touchpoints',
            value: 'stages',
            about: 'Different stages in an employee lifecycle in an organization.'
          // }, {
          //   title: 'Key Engagement Drivers',
          //   value: 'key-drivers',
          //   about: 'These topics are the most important insights you should focus on, to see the greatest increase in the engagement of your employees ',
          }, {
            title: 'Disengaged Employees',
            value: 'need-to-meet',
            about: ''
          }, {
            title: 'Txt analysis',
            value: 'open-ended',
            about: ''
          }, {
            title: 'Anonymous',
            value: 'anonymous',
            about: ''
          // }, {
          //   title: 'Exit Touchpoints',
          //   value: 'exit',
          //   about: '',
          }
        ]
      },
      dashboardList: [{
        title: 'Tasks',
        subtitle: ''
      }, { divider: true, inset: true }, {
        title: 'All updates'
      }],
      sortList: [0, 1],
      data: {
        tasks: {},
        total: 0
      },
      activeList: 'Tasks',
      text: '',
      actionStatusType: ''
    };
  },
  computed: {
    checkForFilters () {
      let applied = false;
      this.$lodash.each(this.filters.selected, (v) => {
        if (v.length > 0) {
          applied = true;
        }
      });
      if (this.dateRangeOptions.startDate || this.dateRangeOptions.endDate) {
        applied = true;
      }
      if (this.highPotential.selected) {
        applied = true;
      }
      return applied;
    },
    formattedRange () {
      let time = '';
      if (!this.dateRangeOptions.startDate && !this.dateRangeOptions.endDate) {
        time = 'All Time';
      } else {
        time = `${dayjs(this.dateRangeOptions.startDate).format('DD MMM')} - ${dayjs(this.dateRangeOptions.endDate).format('DD MMM')}`;
      }
      return time;
    },
    ...mapState({
      user: state => state.user,
      dashboardFilters: state => state.dashboardFilters
    })
  },

  methods: {
    download () {
      this.downloadDashboardBtn = true;
      html2canvas(document.querySelector('#app'), {
        imageTimeout: 5000,
        x: 55,
        y: 50,
        logging: true,
        allowTaint: true,
        useCORS: true
      }).then(canvas => {
        document.getElementById('pdf').appendChild(canvas);
        let pdf = new JsPDF('portrait', 'mm', 'a3');
        // pdf.text(20, 10,`Amara Dashboard for ${this.user.company_name}`);
        // pdf.text(20, 20,`Created By: ${this.user.display_name} which has requested the download.`);
        // let today = new Date();
        // let day = today.getDate();
        // let month = today.getMonth() + 1;
        // let year = today.getFullYear();
        // pdf.text(20, 30,`Date Created : ${day} / ${month} / ${year}`);
        // pdf.text(130, 410, "Powered by Amara");
        // pdf.text(20, 40,`Report generated for the following segment:`);
        // this.$lodash.each(this.dashboardFilters.filters, (v, k) => {
        //   // if (v.length > 0 && this.height == '50' && k !== 'activeTab') {
        //   //   pdf.text(`Powered by Amara ${k} : ${v}`,20 , `${this.height}`);
        //   // }
        //   if (v.length > 0 && this.height !== '40' && k !== 'activeTab') {
        //     pdf.setFontSize(10);
        //     pdf.text(`${k} : ${v}`, 30 , `${this.height + 10}`);
        //     this.height = this.height+10;
        //   console.log(this.height);
        //   }

        // });
        var backgroundImage = new Image();
        backgroundImage.src = 'https://amara-internal.s3.ap-south-1.amazonaws.com/reports/images/pdf_download_main_banner_image.jpeg';
        pdf.addImage(backgroundImage, 'png', 0, 0, 297, 420);
        pdf.setFontSize(20);
        pdf.setTextColor('Black');
        pdf.text(20, 30, 'DASHBOARD');
        pdf.text(20, 40, 'REPORT');
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        pdf.text(260, 30, `${year}`);
        pdf.text(80, 280, `Prepared By : ${this.user.display_name} On ${day} / ${month} / ${year}`);
        console.log(this.dashboardFilters.filters);
        pdf.setFontSize(15);
        pdf.setTextColor('Black');
        this.$lodash.each(this.dashboardFilters.filters, (v, k) => {
          if (v.length > 0 && k !== 'activeTab') {
            pdf.text(`${k.charAt(0).toUpperCase() + k.slice(1)} : ${v}`, 30, `${this.height + 7}`);
            this.height = this.height + 7;
          }
        });
        pdf.setFontSize(20);
        if (this.height > 300) {
          pdf.text(100, 290, 'Filters Applied Are As Follow');
        }
        pdf.setFontSize(15);
        if (this.dateRangeOptions.startDate && this.dateRangeOptions.endDate) {
          this.dateRangeOptions.start = this.dateRangeOptions.startDate.split('T');
          this.dateRangeOptions.end = this.dateRangeOptions.endDate.split('T');

          pdf.text(`Chat start date : ${this.dateRangeOptions.start[0]}`, 30, `${this.height + 7}`);
          pdf.text(`Chat end date : ${this.dateRangeOptions.end[0]}`, 30, `${this.height + 14}`);
        }
        if (!this.dateRangeOptions.startDate && this.highPotential.selected) {
          this.height = this.height - 14;
        }
        if (this.highPotential.selected && this.highPotential.selected.length > 0) {
        // pdf.text(30, `${this.height + 7}`, `${dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD')}`);
          pdf.text(`HiPOS : ${this.highPotential.selected}`, 30, `${this.height + 21}`);
        }
        pdf.setFontSize(10);
        pdf.text(130, 415, 'Powered by Amara');
        pdf.addPage();
        const img = canvas.toDataURL('image/png');
        pdf.addImage(img, 'png', 5, 5, 295, 330);
        pdf.setFontSize(10);
        pdf.text(130, 415, 'Powered by Amara');
        pdf.save('Amara-dashboard.pdf');
        this.height = 290;
        document.getElementById('pdf').innerHTML = '';
        pdf = null;
      });
      setTimeout(() => {
        this.downloadDashboardBtn = false;
      }, 5000);
    },
    disengagedEmployeesType (type) {
      if (type === 'open') {
        this.actionStatusType = 'open,scheduled,acknowledged,inProgress';
      }
      if (type === 'resolved') {
        this.actionStatusType = 'resolved';
      }
      if (!type) {
        this.actionStatusType = '';
      }
    },
    getFilterName (name) {
      return name.replace('_', ' ');
    },
    searchingfilter (k) {
      if (this.filtersList.default[k]) {
        const filter = this.filtersList.default[k];
        if (this.searchFilter) {
          const tempData = filter.filter((r) => { return r[k].toLowerCase().indexOf(this.searchFilter.toLowerCase()) >= 0; });
          return tempData;
        } else if (!this.searchFilter) {
          return filter;
        }
      }
      return '';
    },
    viewDriverWithFilter (driver) {
      const t = this.updateEmployeeWithFilterSelected;
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
      if (this.dateRangeOptions && this.dateRangeOptions.startDate && this.dateRangeOptions.endDate) {
        tempAllFilters.startDate = this.dateRangeOptions.startDate;
        tempAllFilters.endDate = this.dateRangeOptions.endDate;
      }
      if (this.highPotential.selected && this.highPotential.selected.length > 0) {
        tempAllFilters.highPotential = this.highPotential.selected;
      }
      this.$router.push({
        path: `/driver/view/${driver}`,
        query: {
          ...tempAllFilters
        }
      });
    },
    updateEmployeeWithFilter (mood) {
      const filters = Object.assign({}, this.filters.selected);
      if (filters && filters.activeTab) {
        delete filters.activeTab;
      }
      // const t = this.updateEmployeeWithFilterSelected;
      // let tempAllFilters = {};
      // if (t.filters) {
      //   this.$lodash.each(t.filters, (value, key) => {
      //     if (value.length > 0) {
      //       const tempObj = {
      //         [key]: value.length > 1 ? value.join() : value[0],
      //       };
      //       tempAllFilters = { ...tempAllFilters, ...tempObj };
      //     }
      //   });
      // }
      // if (mood) {
      //   tempAllFilters.mood = mood;
      // }
      // if (this.dateRangeOptions && this.dateRangeOptions.startDate && this.dateRangeOptions.endDate) {
      //   tempAllFilters.startDate = this.dateRangeOptions.startDate;
      //   tempAllFilters.endDate = this.dateRangeOptions.endDate;
      // }
      // if (this.highPotential.selected && this.highPotential.selected.length > 0) {
      //   tempAllFilters.highPotential = this.highPotential.selected;
      // }
      const employeeFilters = {
        high_potential_emp: this.highPotential.selected ? this.highPotential.selected : undefined,
        mood__in: mood,
        user_session__initiated_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        user_session__initiated_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
        // dynamic filters
        filters
      };
      // console.log('employeeFilters', employeeFilters);
      this.$store.dispatch('updateEmployeeFilters', employeeFilters);
      this.$router.push({
        path: '/employees'
        // query:
        // { ...tempAllFilters },
      });
    },
    addRef (val) {
      this.$router.push({ query: { activeTab: val } });
      switch (val) {
        case 'need-to-meet':
          this.getDisengagedEmployeesDashboard(this.disengagedActiveTab);
          break;
        default:
      }
    },
    resetDashboard () {
      this.filterApplied = false;
      if (this.config.activeDriver) {
        this.$router.push('/');
        this.getDashboardReport();
      } else {
        this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
        this.dateRangeOptions.startDate = undefined;
        this.dateRangeOptions.endDate = undefined;
        this.highPotential.selected = [];
        this.triggerUpdate();
      }
    },
    applyfilter () {
      this.filterApplied = true;
      this.triggerUpdate();
    },
    triggerUpdate () {
      const dashboardFilters = {
        dateRangeOptions: this.dateRangeOptions,
        filters: this.filters.selected,
        highPotential: this.highPotential.selected
      };
      this.$store.dispatch('updateFilters', dashboardFilters);
      this.updateEmployeeWithFilterSelected = dashboardFilters;
      this.showFilter = false;
      this.config.activeDriver = null;
      if (this.tabs.active === 'tab-overview') {
        this.getDashboardReport();
      } else if (this.tabs.active === 'tab-stages') {
        this.$refs.StagesAnalyzed.getStages();
      } else if (this.tabs.active === 'tab-need-to-meet') {
        this.getDisengagedEmployeesDashboard(this.disengagedActiveTab);
      } else if (this.tabs.active === 'tab-open-ended') {
        setTimeout(() => {
          this.$refs.OpenEnded.getQuestions();
          if (this.$refs.OpenEnded.$refs && this.$refs.OpenEnded.$refs.sentimentAnalysis &&
          this.$refs.OpenEnded.$refs.sentimentAnalysis.config) {
            this.$refs.OpenEnded.$refs.sentimentAnalysis.config.page_offset = 1;
          }
        }, 100);
      } else if (this.tabs.active === 'tab-anonymous') {
        this.$refs.Anonymous.getAnonymousStats();
      }
      // this.getDisengagedEmployeesDashboard();
    },
    updateDate (date) {
      if (date) {
        this.dateRangeOptions.startDate = date[0];
        this.dateRangeOptions.endDate = date[1];
        // this.triggerUpdate();
      }
    },
    getFilters () {
      axios.get(`${process.env.VUE_APP_API_URL}company/${this.user.company}/dashboard_filters_options`).then((response) => {
        if (response && response.data && response.data.queryset_filters_options) {
          this.config.initialLoadingFilters = false;
          this.filters.default = response.data.queryset_filters_options;

          const defaultFilters = {};
          this.$lodash.each(this.filters.default, (v, k) => {
            defaultFilters[k] = [];
          });
          this.$lodash.each(this.filters.selected, (v, k) => {
            defaultFilters[k] = v;
          });
          this.filters.selected = defaultFilters;
          const mainFilters = {};
          this.$lodash.each(this.filters.default, (v, k) => {
            mainFilters[k] = [];
          });
          this.filters.main = JSON.parse(JSON.stringify(mainFilters));
        }
      });
    },
    getFilterData (k) {
      this.expansion = !this.expansion;
      axios.get(`${process.env.VUE_APP_API_URL}company/${this.user.company}/dashboard_filters?filter_field=${k}`).then((response) => {
        if (response && response.data && response.data) {
          this.config.initialLoadingFilters = false;
          this.filtersList.default = response.data.queryset_filters_options;
          // console.log(this.filters.default);
          const defaultFilters = {};
          this.$lodash.each(this.filters.default.data, (v, k) => {
            defaultFilters[k] = [];
          });
          // if (Object.keys(this.filters.selected.data).length === 0) {
          //   this.filters.selected = defaultFilters;
          //   this.filters.main = JSON.parse(JSON.stringify(defaultFilters));
          // }
        }
      });
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    getRandomColor (driver) {
      let color = 'lightgrey';
      const colors = [
        '#eadf59',
        '#ff9800',
        '#37b99c',
        '#f44336',
        '#b56fea',
        '#0f4c1c',
        '#918ce7',,
      ];
      color = colors[Math.floor(Math.random() * colors.length)];
      if (driver) {
        switch (driver) {
          case 'Culture':
            color = '#66c088';
            break;
          case 'Leadership':
            color = '#757575';
            break;
          case 'RewardsAndRecognition':
            color = '#495b69';
            break;
          case 'WorklifeIntegration':
            color = '#f06362';
            break;
          case 'CareerOpportunities':
            color = '#636363';
            break;
          case 'PerformanceManagement':
            color = '#43c5f1';
            break;
        }
      }
      return color;
    },
    getDisengagedEmployeesDashboard (tab) {
      setTimeout(() => {
        if (this.$refs.EmployeesToMeet) {
          if (tab) {
            if (this.$refs.EmployeesToMeet.tabs) {
              this.$refs.EmployeesToMeet.tabs.active = tab;
            }
            if (tab === 'tab-disengaged-list') {
              this.$refs.EmployeesToMeet.addRef('disengaged-list');
              // this.$refs.EmployeesToMeet.$refs.tab.click();
            } else if (tab === 'tab-snapshot-list') {
              this.$refs.EmployeesToMeet.addRef('snapshot-list');
              // this.$refs.EmployeesToMeet.getOverview();
            }
          } else {
            this.$refs.EmployeesToMeet.addRef('snapshot-list');
            this.$refs.EmployeesToMeet.tabs.active = 'tab-snapshot-list';
            // this.$refs.EmployeesToMeet.getOverview();
          }
        }
      }, 100);
    },
    getDashboardReport () {
      this.config.initialLoading = true;
      if (this.$refs.ParticipationAnalysis) {
        this.$refs.ParticipationAnalysis.report.stats = false;
      }
      if (this.$refs.DriverEngagement && this.$refs.DriverEngagement.config) {
        this.$refs.DriverEngagement.config.initialLoading = true;
        this.$refs.EmployeeVibes.report.stats = false;
        if (document.getElementById('driverFramework')) {
          document.getElementById('driverFramework').innerHTML = '';
        }
        if (document.getElementById('lineGraph')) {
          document.getElementById('lineGraph').innerHTML = '';
        }
      }
      if (this.$refs.EmployeeVibes && this.$refs.EmployeeVibes.config) {
        this.$refs.EmployeeVibes.config.initialLoading = true;
        this.$refs.EmployeeVibes.report.stats = false;
      }
      if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
        this.filters.selected = this.dashboardFilters.filters;
        this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
      }
      const that = this;
      const queryParams = {
        fields: 'driver_breakdown,engagement_score,mood_analysis,company_participation_stats,company_employee_reach_stats,disengaged_employees_stats,monthwise_engagement_vs_mood_trend,last_milestone,last_milestone_completedAt',
        initiated_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
        user__profile__high_potential_emp: this.highPotential.selected
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`user__profile__${k}__in`] = v.join();
        }
      });
      axios.get(`${process.env.VUE_APP_API_URL}company/dashboard`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          if (this.$refs && this.$refs.ParticipationAnalysis) {
            this.$refs.ParticipationAnalysis.config.initialLoading = false;
            this.$refs.ParticipationAnalysis.report.employees_reached = response.data.company_employee_reach_stats;
            this.$refs.ParticipationAnalysis.report.chats_completed = response.data.chat_participation_stats;
            this.$refs.ParticipationAnalysis.report.disengaged_employees = response.data.disengaged_employees_stats;
            this.$refs.ParticipationAnalysis.report.engagement_score = response.data.engagement_score ? response.data.engagement_score : null;
            this.$refs.ParticipationAnalysis.report.employee_vibe = response.data.mood_analysis ? response.data.mood_analysis.company_mood_average : null;
            this.$refs.ParticipationAnalysis.dashboardReference = this;

            if (response.data.company_employee_reach_stats || response.data.chat_participation_stats || response.data.disengaged_employees_stats ||
            response.data.driver_breakdown || response.data.mood_analysis || response.data.daily_engagement_stats) {
              this.$refs.ParticipationAnalysis.report.stats = true;
            }
            if (response.data.company_employee_reach_stats) {
              this.$refs.ParticipationAnalysis.generateGaugeGraph(response.data.company_employee_reach_stats);
            }
            if (response.data.daily_engagement_stats) {
              this.$refs.ParticipationAnalysis.report.daily_engagement_stats = response.data.daily_engagement_stats;
            }
          }

          if (this.$refs && this.$refs.DriverEngagement) {
            this.$refs.DriverEngagement.config.initialLoading = false;
            this.$refs.DriverEngagement.report.stats = false;
            this.$refs.DriverEngagement.report.lineGraph = false;
            if (response.data.driver_breakdown) {
              const temp = JSON.parse(JSON.stringify(response.data.driver_breakdown));
              const temp2 = [];
              let total = 0;
              this.$lodash.each(temp, (v) => {
                total += v.average;
              });
              temp2.push({
                id: 'Driver Framework',
                name: 'Driver Framework',
                title: '',
                value: (total / temp.length).toFixed(1),
                fill: '#fff',
                label: {
                  fontColor: '#2a333d',
                  fontWeight: 'bold'
                }
              });
              this.$lodash.each(temp, (v) => {
                temp2.push({
                  id: v.driver,
                  name: (v.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')).replace(/ /g, '\n'),
                  title: v.driver,
                  value: v.average.toFixed(1),
                  parent: 'Driver Framework',
                  fill: that.getRandomColor(v.driver),
                  label: {
                    fontWeight: 'bold',
                    fontSize: '15px'
                  }
                });
                this.$lodash.each(v.sub_drivers, (p, k) => {
                  temp2.push({
                    id: k,
                    name: (k.replace(/([a-z0-9])([A-Z])/g, '$1 $2')).replace(/ /g, '\n'),
                    title: '',
                    value: p.toFixed(1),
                    parent: v.driver,
                    label: {
                      fontWeight: 'bold',
                      fontSize: '15px'
                    }
                  });
                });
              });
              this.$refs.DriverEngagement.report = {
                company_drivers_breakdown: temp2
              };
              this.$refs.DriverEngagement.generateDriverFramework(response.data.driver_breakdown);

              if (response.data.driver_breakdown) {
                this.$refs.DriverEngagement.report.stats = true;
              }
            }
          }
          if (this.$refs && this.$refs.EmployeeVibes) {
            if (response.data.mood_analysis || response.data.monthwise_engagement_vs_mood_trend) {
              this.$refs.EmployeeVibes.report.stats = true;
            }
            this.$refs.EmployeeVibes.config.initialLoading = false;
            this.$refs.EmployeeVibes.dashboardReference = this;
            if (response.data.monthwise_engagement_vs_mood_trend) {
              this.$refs.EmployeeVibes.generateLineGraph(response.data.monthwise_engagement_vs_mood_trend);
            }

            if (response.data.mood_analysis) {
              const temp = JSON.parse(JSON.stringify(response.data.mood_analysis));
              const temp2 = [];
              let total = 1;
              this.$lodash.each(temp.company_mood_breakdown, (v, i) => {
                total += v;
              });
              this.$lodash.each(temp.company_mood_breakdown, (v, i) => {
                temp2.push({
                  mood: i,
                  value: v,
                  percent: ((v / total) * 100).toFixed(0)
                });
              });
              temp.company_mood_breakdown = temp2;
              this.$refs.EmployeeVibes.report.mood_analysis = temp;

              // let employeesData = JSON.parse(JSON.stringify(response.data.high_risk_employees));
              // let highRiskEmployees = [];
              // let drivers = [];
              // this.$lodash.each(employeesData, (v, i) => {
              //   highRiskEmployees.push(v);
              //   this.$lodash.each(v.driver_breakdown, (value, driver) => {
              //     let match = -1;
              //     match = this.$lodash.findIndex(drivers, k =>
              //       k === driver);
              //     if (match === -1) {
              //       drivers.push(driver);
              //     }
              //     // highRiskEmployees[highRiskEmployees.length - 1].driver_breakdown[driver] = value;
              //     // delete highRiskEmployees[highRiskEmployees.length - 1].driver_breakdown[driver];
              //   });
              // });
              // this.$refs.EmployeeVibes.report.drivers = drivers;
              // this.$refs.EmployeeVibes.report.high_risk_employees = highRiskEmployees;
            }
          }
          // if (this.$refs && this.$refs.DriverAnalysis) {
          //   this.$refs.DriverAnalysis.config.initialLoading = false;
          //   if (response.data.company_positive_driver_nps || response.data.company_negative_driver_nps) {
          //     this.$refs.DriverAnalysis.report.company_positive_driver_nps = response.data.company_positive_driver_nps;
          //     this.$refs.DriverAnalysis.report.company_negative_driver_nps = response.data.company_negative_driver_nps;
          //     this.$refs.DriverAnalysis.report.stats = true;
          //     this.$refs.DriverAnalysis.generatePositiveGraph(response.data.company_positive_driver_nps);
          //     this.$refs.DriverAnalysis.generateNegativeGraph(response.data.company_negative_driver_nps);
          //   }
          // }
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch details, Please try again later!'
        });
        throw new Error(response);
      });
    },
    isFilterAplied () {
      this.$lodash.each(this.filters.selected, (v, key) => {
        if (v.length > 0 && key !== 'activeTab') {
          this.filterApplied = true;
        }
      });
    },
    handleClickOnFunnel (e) {
      this.$router.push({
        path: '/candidates',
        query: {
          onboarding_plan_status: e.dataItem.dataContext.status.toLowerCase()
        }
      });
    }
  },
  watch: {
    $route () {
      if (this.$route.query) {
        if (this.$route.query.activeTab) {
          this.tabs.active = `tab-${this.$route.query.activeTab}`;
          // this.$nextTick(() => this.$refs.tabs.scrollIntoView());
          this.triggerUpdate();
        } else {
          this.config.activeDriver = null;
          this.getFilters();
          this.triggerUpdate();
        }
      }
    }
  },
  mounted () {
    const userData = {
      user_id: this.user.user_profile.user_id,
      user_email: this.user.user_profile.email,
      user_name: this.user.user_profile.display_name,
      CompanyId: this.user.company,
      CompanyName: this.user.company_name,
      LicenseType: this.user.type,
      LicenseSubType: this.user.sub_type
    };
    this.announcekitUserData = userData;
    // console.log('this.$route.query', this.$route.query);
    // if (this.dashboardFilters && Object.keys(this.dashboardFilters.filters).length > 0) {
    //   this.filterApplied = true;
    //   this.filters.selected = this.dashboardFilters.filters;
    //   this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
    // }
    this.getFilters();
    this.isFilterAplied();
    this.triggerUpdate();
  },
  beforeMount () {
    // this.resetDashboard();
    if (this.$route && this.$route.query && Object.keys(this.$route.query).length > 0) {
      let temp = {};
      this.$lodash.each(this.$route.query, (value, key) => {
        if (key !== 'startDate' && key !== 'endDate') {
          temp[key] = [];
          if (typeof value === 'object') {
            if (key === 'mood') {
              temp[key] = temp[key].concat(value.map(item => parseInt(item, 10)));
            } else {
              temp[key] = temp[key].concat(value);
            }
          } else if (key === 'mood') {
            temp[key].push(parseInt(value, 10));
          } else {
            const val = value ? value.split(',') : '';
            const t = {
              [key]: val
            };
            temp = { ...temp, ...t };
          }
        }
      });
      if (this.$route.query.endDate && this.$route.query.startDate) {
        this.chatDateRangeOptions.endDate = this.$route.query.endDate;
        this.chatDateRangeOptions.startDate = this.$route.query.startDate;
      }
      this.filters.selected = temp;
      if (this.filters.selected.highPotential) {
        this.filters.selected.highPotential = this.filters.selected.highPotential[0];
      }
      if (this.$route && this.$route.query) {
        this.highPotential.selected = this.$route.query.high_potential_emp || this.$route.query.highPotential;
      }
      delete this.filters.selected.highPotential;
    }
    // if (this.$route.query && this.$route.query.activeTab) {
    //   this.tabs.active = `tab-${this.$route.query.activeTab}`;
    //   this.addRef(this.$route.query.activeTab);
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.announcekit-widget {
  a {
    color: white !important;
    margin-left: -16px;
    margin-top: -32px;
  }
}
.dashboardView {
  .emoji-container {
    max-height: 4em;
    max-width: 4em;
  }
  .v-expansion-panel__header {
    background-color: #fff !important
  }
// .after-bg {
//   margin-top: 8em;
// }
.filter-btn {
  right: 0;
  position: absolute;
  float: right;
  z-index: 100 !important;
  color:white;
}
.filter-drawer {
  height: 0px!important;
  overflow-y:hidden!important;
  .filters-card {
    height: 500px!important;
  }
  &.anonymous {
    height: 200px!important;
    .v-card {
      height: 200px!important;
    }
  }
  .v-expansion-panel {
    height: 85%!important;
    &.employee-filters {
      .v-expansion-panel__container {
        height: 100%!important;
      }
      .v-expansion-panel__header__icon {
        display: none;
        .v-icon {
          color: rgba(0,0,0,0.10) !important;
          font-size:16px !important;
        }
      }
    }
  }
}
}
.abc {
  background-color: red;
}
</style>
