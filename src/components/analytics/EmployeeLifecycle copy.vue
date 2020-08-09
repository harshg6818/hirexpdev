<template>
  <div class="lifecycle-wrap">
    <v-layout class="filter-wrap">
      <v-flex>
        <div style="font-size: 24px;padding: 6px 6px 6px 24px;">
          Employee Experience Overview
        </div>
      </v-flex>
      <v-flex style="z-index: 0;">
        <v-btn style="right: 10%;
          position: absolute;
          float: right;
          z-index: 100 !important; color:grey;"
          v-if="filterApplied"
          class="text-capitalize"
          flat
          @click="resetDashboard"
        >
          Remove Filters
        </v-btn>
        <v-btn class="filter-btn text-capitalize " style="position: absolute;right:0;"
          slot="activator"
          color="primary"
          depressed
          @click="showFilter = true"
        >
          <v-icon style="font-size:16px; padding-right:10px;">fas fa-filter</v-icon> Filter
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm12>
        <div>
          <v-layout class="report-head-wrap layout-container" style="padding-top: 20px;">
            <v-flex class="text-xs-left">
              <h1 class="report-title text-xs-left">Employee Experience Cycle</h1>
            </v-flex>
          </v-layout>
          <v-layout class="report-head-wrap layout-container">
            <v-flex class="text-xs-left">
              <h3 class="report-sub">
                Maximize engagement and reduce attrition by
                addressing the needs of employees during these phases.
              </h3>
            </v-flex>
          </v-layout>
          <v-layout class="report-head-wrap layout-container">
            <v-flex class="text-xs-left">
              <h2 class="report-sub">Average engagement</h2>
            </v-flex>
          </v-layout>
        </div>
        <div class="layout-container">
          <div v-if="initialLoading" style="margin-bottom: 120px;">
            <ContentLoader
              :height="80"
              :width="400"
              :speed="2"
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <rect x="0" y="0" rx="2" ry="2" width="394.46" height="17.93" />
              <rect x="0" y="25" rx="2" ry="2" width="394.46" height="17.93" />
              <rect x="0" y="50" rx="2" ry="2" width="394.46" height="17.93" />
            </ContentLoader>
          </div>
          <avgEngagement v-if="!initialLoading"></avgEngagement>
        </div>
      </v-flex>
    </v-layout>

    <v-layout class="layout-container">
      <v-flex xs9>
        <div id="chartdiv">
        </div>
      </v-flex>
      <v-flex></v-flex>
    </v-layout>

    <div class="details-report-head-wrap remove-chart">
      <v-layout class="layout-container">
        <v-flex class="text-xs-left">
          <h2 class="details-report-title">Phases</h2>
        </v-flex>
      </v-layout>
      <v-layout class="layout-container">
        <v-flex class="text-xs-left">
          <h3 class="details-report-sub">
            You can customize these experience
            phases using the tenure attribute.
          </h3>
        </v-flex>
      </v-layout>
    </div>
    <div class="chart-spacer"></div>
    <div class="layout-container">
      <phasesCard
        :initialLoading="initialLoading"
        :data="phases.onboarding"
        @onViewReport="onViewReport"
      ></phasesCard>
    </div>
    <div id="onboarding-details">
      <div v-if="activeReport === 'onboarding'">
        <div class="layout-container">
          <div class="action-wrap">
            <span
              class="item"
              :class="activeReportType === 'driver' ? 'active' : ''"
              @click="reportType('driver', 'onboarding')"
            >Driverwise analysis</span>
            <span
              class="item"
              :class="activeReportType === 'question' ? 'active' : ''"
              @click="reportType('question', 'onboarding')"
            >Questionwise analysis</span>
          </div>
        </div>
        <div class="layout-container">
          <driverAnalysis
            :driverBreakdown="driverBreakdown"
            v-if="activeReportType === 'driver'"
          ></driverAnalysis>
          <questionAnalysis
            :initialLoading="initialLoadingQuestion"
            :questionWiseAnalysis="questionWiseAnalysis"
            v-if="activeReportType === 'question'"
          ></questionAnalysis>
        </div>
      </div>
    </div>
    <div class="chart-spacer"></div>
    <div class="layout-container">
      <phasesCard
        :initialLoading="initialLoading"
        :data="phases.initial_development"
        @onViewReport="onViewReport"
      ></phasesCard>
    </div>
    <div id="initial-details">
      <div v-if="activeReport === 'initial'">
        <div class="layout-container">
          <div class="action-wrap">
            <span
              class="item"
              :class="activeReportType === 'driver' ? 'active' : ''"
              @click="reportType('driver', 'initial_development')"
            >Driverwise analysis</span>
            <span
              class="item"
              :class="activeReportType === 'question' ? 'active' : ''"
              @click="reportType('question', 'initial_development')"
            >Questionwise analysis</span>
          </div>
        </div>
        <div class="layout-container" id="initial-details">
          <driverAnalysis
            :driverBreakdown="driverBreakdown"
            v-if="activeReportType === 'driver'"
          ></driverAnalysis>
          <questionAnalysis
            :initialLoading="initialLoadingQuestion"
            :questionWiseAnalysis="questionWiseAnalysis"
            v-if="activeReportType === 'question'"
          ></questionAnalysis>
        </div>
      </div>
    </div>
    <div class="chart-spacer"></div>
    <div class="layout-container">
      <phasesCard
        :initialLoading="initialLoading"
        :data="phases.ongoing_development"
        @onViewReport="onViewReport"
      ></phasesCard>
    </div>
    <div id="ongoing-details">
      <div v-if="activeReport === 'ongoing'">
        <div class="layout-container">
          <div class="action-wrap">
            <span
              class="item"
              :class="activeReportType === 'driver' ? 'active' : ''"
              @click="reportType('driver', 'ongoing_development')"
            >Driverwise analysis</span>
            <span
              class="item"
              :class="activeReportType === 'question' ? 'active' : ''"
              @click="reportType('question', 'ongoing_development')"
            >Questionwise analysis</span>
          </div>
        </div>
        <div class="layout-container" id="ongoing-details">
          <driverAnalysis
            :driverBreakdown="driverBreakdown"
            v-if="activeReportType === 'driver'"
          ></driverAnalysis>
          <questionAnalysis
            :initialLoading="initialLoadingQuestion"
            :questionWiseAnalysis="questionWiseAnalysis"
            v-if="activeReportType === 'question'"
          ></questionAnalysis>
        </div>
      </div>
    </div>
    <div class="layout-container">
      <div class="separator-2tVZk">
        <div class="separatorLine-1lNyU">
        </div>
      </div>
    </div>
    <div class="chart-spacer"></div>
    <div class="layout-container">
      <phasesCard
        :initialLoading="initialLoading"
        :data="phases.separation"
        @onViewReport="onViewReport"
      ></phasesCard>
    </div>
    <div id="separation-details">
      <div v-if="activeReport === 'separation'">
          <div class="layout-container">
            <div class="action-wrap">
              <span
                class="item"
                :class="activeReportType === 'driver' ? 'active' : ''"
                @click="reportType('driver', 'sepration')"
              >Driverwise analysis</span>
              <span
                class="item"
                :class="activeReportType === 'question' ? 'active' : ''"
                @click="reportType('question', 'sepration')"
              >Questionwise analysis</span>
            </div>
          </div>
          <div class="layout-container" id="separation-details">
            <driverAnalysis
              :driverBreakdown="driverBreakdown"
              v-if="activeReportType === 'driver'"
            ></driverAnalysis>
            <questionAnalysis
              :initialLoading="initialLoadingQuestion"
              :questionWiseAnalysis="questionWiseAnalysis"
              v-if="activeReportType === 'question'"
            ></questionAnalysis>
          </div>
        </div>
      </div>
    <div class="chart-spacer"></div>
    <div class="layout-container"></div>
    <div class="chart-spacer"></div>

    <!-- filter drawer -->
    <v-navigation-drawer
      style="height:100vh; position :fixed; bottom:0; right:0"
      v-model="showFilter"
      absolute
      temporary
      hide-overlay
      right
    >
      <v-card style="height:90vh;overflow:auto;border:none;box-shadow:none;" class="filters-card">
        <v-expansion-panel
          class="elevation-0 employee-filters"
        >
          <v-flex sm12 style="min-width:100%;">
            <v-expansion-panel-content style="">
              <div slot="header" class="text-capitalize py-2 px-3">Chat initiation date
              </div>
              <v-card color="">
                <v-card-text>
                  <v-radio-group @change="updateDate" v-model="config.dateMenu">
                    <v-radio
                      color="primary"
                      v-for="(t, ti) in dateRangeOptions.presets"
                      :key="ti"
                      :label="t.label"
                      :value="t.range"
                    ></v-radio>
                    <v-menu full-width offset-y
                      :close-on-content-click="false"
                      top
                    >
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
            <!-- <v-expansion-panel-content style="" class="employee-filters-list">
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
            </v-expansion-panel-content> -->
            <v-expansion-panel-content style=" padding:0;" v-for="(v, k) in filters.default"
              :key="k"
              v-if="v.length > 0" class="px-0 py-0"
            >
              <div @click="searchFilter='';
                getFilterData(k)" slot="header"
                class="text-capitalize py-2 px-3"
              >
                {{getFilterName(k)}}
                <span v-if="filters.selected[k].length > 0">
                  <v-chip>{{filters.selected[k].length}} Selected
                  </v-chip>
                </span>
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
        <v-card-actions
          style="position:fixed;bottom:0;width:100%;right:0;border-top:1px solid #ccc;box-shadow:1;"
        >
          <v-btn style="color:grey;" flat @click="showFilter = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="applyfilter()"
            class="white--text"
            color="primary"
            style="float:right"
          >Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import "amcharts3";
import "amcharts3/amcharts/serial";
import axios from 'axios';
import { ContentLoader } from 'vue-content-loader';
import dayjs from 'dayjs';
import { mapState } from 'vuex';
import {
  VSelect,
  VChip,
  VDivider,
  VCheckbox,
} from 'vuetify';
import VDateRange from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

import avgEngagement from './life-cycle-component/avg-engagement';
import driverAnalysis from './life-cycle-component/driver-analysis';
import phasesCard from './life-cycle-component/phases-card';
import questionAnalysis from './life-cycle-component/question-analysis';

Vue.use(VDateRange);

export default {
  name: 'empLifecycle',

  components: {
    ContentLoader,
    avgEngagement,
    driverAnalysis,
    phasesCard,
    questionAnalysis,
    VDateRange,
    VSelect,
    VChip,
    VDivider,
    VCheckbox,
  },

  data() {
    return {
      activeReport: null,
      activeReportType: 'driver',
      phases: {
        onboarding: {
          id: 'onboarding',
          title: 'Onboarding',
          sub: '<span>New employees,<span class="positive-SzAX_">&nbsp;0-3&nbsp;</span>months after starting.</span>',
          desc: 'Understand your onboarding initiatives, using comparative metrics from similar businesses to truly learn what’s going well and what needs to be improved.',
          average: '7.5',
          disengaged: '25',
          participants: '50',
        },
        initial_development: {
          id: 'initial',
          title: 'Initial development',
          sub: '<span>Employees in the organization for<span class="positive-SzAX_">&nbsp;3-24&nbsp;</span>months.</span>',
          desc: 'Year one and two of employment is typically a period where engagement is higher than average. Understand the specific drivers that will help you maximize this phase.',
          average: '7.5',
          disengaged: '28',
          participants: '58',
        },
        ongoing_development: {
          id: 'ongoing',
          title: 'Ongoing development',
          sub: '<span>Employees in the organization for<span class="positive-SzAX_">&nbsp;24+&nbsp;</span>months.</span>',
          desc: 'Understand which drivers will prolong the development phase of employees. Ensure continued engagement, high performance, and commitment to the organization.',
          average: '7.5',
          disengaged: '58',
          participants: '53',
        },
        separation: {
          id: 'separation',
          title: 'Separation',
          sub: '<span>The final period of the employment.<span class="positive-SzAX_"></span></span>',
          desc: 'Learn which drivers were most influential in employees’ decisions to leave the organization. Proactively address these areas to reduce attrition going forward.',
          average: '0',
          disengaged: '0',
          participants: '0',
        },
      },
      data: null,
      chart: [],
      driverBreakdown: {},
      questionWiseAnalysis: {},
      initialLoading: null,
      initialLoadingQuestion: null,
      showFilter: false,
      config: {
        panel: [],
        dateMenu: '',
        initialLoading: true,
        activeDriver: null,
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
              undefined,
            ],
          },
          {
            label: 'This Week',
            range: [
              dayjs().subtract(7, 'day').format(),
              dayjs().format(),
            ],
          },
          {
            label: 'Last 30 Days',
            range: [
              dayjs().subtract(1, 'month').format(),
              dayjs().format(),
            ],
          },
          {
            label: 'Last 3 Months',
            range: [
              dayjs().subtract(3, 'month').format(),
              dayjs().format(),
            ],
          },
          {
            label: 'Last 6 Months',
            range: [
              dayjs().subtract(6, 'month').format(),
              dayjs().format(),
            ],
          },
        ],
        dateRange: {
          startDate: dayjs().format('DD/MM'),
          endDate: dayjs().format('DD/MM'),
        },
      },
      filters: {
        default: {},
        selected: {},
        main: {},
      },
      filtersList: {
        default: {},
        selected: {},
        main: {},
      },
      searchFilter: '',
      filterApplied: false,
    };
  },

  created() {
    this.initialLoading = true;
    this.getLifecycleReport();
    this.getFilters();
  },

  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },

  methods: {
    updateDate(date) {
      if (date) {
        // eslint-disable-next-line prefer-destructuring
        this.dateRangeOptions.startDate = date[0];
        // eslint-disable-next-line prefer-destructuring
        this.dateRangeOptions.endDate = date[1];
      }
    },
    getFilterName(name) {
      return name.replace('_', ' ');
    },
    searchingfilter(k) {
      if (this.filtersList.default[k]) {
        const filter = this.filtersList.default[k];
        if (this.searchFilter) {
          const tempData = filter.filter((r) => { 
            return r[k].toLowerCase().indexOf(this.searchFilter.toLowerCase()) >= 0;
          });
          return tempData;
        } else if (!this.searchFilter) {
          return filter;
        }
      }
      return '';
    },
    getFilters() {
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
    getFilterData(key) {
      this.expansion = !this.expansion;
      axios.get(`${process.env.VUE_APP_API_URL}company/${this.user.company}/dashboard_filters?filter_field=${key}`).then((response) => {
        if (response && response.data && response.data) {
          this.config.initialLoadingFilters = false;
          this.filtersList.default = response.data.queryset_filters_options;
          const defaultFilters = {};
          this.$lodash.each(this.filters.default.data, (v, k) => {
            defaultFilters[k] = [];
          });
        }
      });
    },
    onViewReport(id) {
      this.activeReportType = 'driver';
      if (this.activeReport === id) {
        this.activeReport = null;
      } else {
        this.activeReport = id;
      }
      if (this.activeReport) {
        this.driverBreakdown = [];
        if (this.activeReport === 'onboarding') {
          this.driverBreakdown = this.data.onboarding.driver_breakdown;
        }
        if (this.activeReport === 'initial') {
          this.driverBreakdown = this.data.initial_development.driver_breakdown;
        }
        if (this.activeReport === 'ongoing') {
          this.driverBreakdown = this.data.ongoing_development.driver_breakdown;
        }
      }
      const divId = `${id}-details`;
      const elmnt = document.getElementById(divId);
      elmnt.scrollIntoView();
    },
    createCustomChart() {
      window.AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "none",
        "autoMarginOffset": 20,
        "zoomOnDoubleClick": false,
        "dataProvider": this.chart,
        "balloon": {
          "cornerRadius": 2,
          "fillAlpha": 1,
          "fillColor": "#fff",
          "textAlign": "left",
        },
        "valueAxes": [{
          "axisAlpha": 0,
          "gridColor": "#FFFFFF",
          "labelsEnabled": true,
          "minimum": 0,
          "maximum": 5,
          "autoGridCount": false,
          "gridCount": 6,
        }],
        "graphs": [{
          "autoGridCount": false,
          "balloonText":
          "<div style='width: fit-content;padding:0!important;'><div style='padding:0 10px;font-size:12px;border-bottom: 1px dashed #e7e8e7;'>[[tempKey]] after starting</div><div style='padding: 0 10px;''><div><span style='padding-right: 10px;width:15px;'>[[driver_average]]</span><span>Driver average</span></div><div><span style='padding-right: 10px;width:15px;'>[[negative]]</span><span>Negative</span></div><div><span style='padding-right: 10px;width:15px;'>[[neutral]]</span><span>Neutral</span></div><div><span style='padding-right: 10px;width:15px;'>[[positive]]</span><span>Positive</span></div></div></div>",
          "bullet": "round",
          "bulletSize": 10,
          "connect": true,
          "lineColor": "#4c3e9d",
          "lineThickness": 2,
          "negativeLineColor": "#4c3e9d",
          "valueField": "value",
        }],
        "chartCursor": {
          "cursorAlpha": 0.1,
          "categoryBalloonAlpha": 0,
          "cursorColor": "#000",
          "fullWidth": true,
          "graphBulletSize": 1,
          "categoryBalloonEnabled": false,
          "color": "#fff",
          "zoomable": false,
        },
        "zoomControl": {
          "zoomControlEnabled": false,
          "panControlEnabled": false,
        },
        "dataDateFormat": "DD",
        "categoryField": "year",
        "categoryAxis": {
          "gridColor": "transparent",
          "axisColor": '#fff',
          "minPeriod": "DD",
          "parseDates": true,
          "minorGridEnabled": false,
          "labelsEnabled": false,
        },
      });
    },
    applyfilter() {
      this.filterApplied = true;
      this.showFilter = false;
      this.getLifecycleReport();
    },
    resetDashboard() {
      this.initialLoading = true;
      this.filterApplied = false;
      this.config.dateMenu = undefined;
      this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
      this.dateRangeOptions.startDate = undefined;
      this.dateRangeOptions.endDate = undefined;
      this.getLifecycleReport();
    },
    getLifecycleReport() {
      const queryParams = {
        fields: 'segment_points_analysis,segment_participation_stats,disengaged_employees_stats,driver_breakdown',
        initiated_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`user__profile__${k}__in`] = v.join();
        }
      });
      axios.get(`${process.env.VUE_APP_API_URL}reports/employee_lifecycle_report`, {
        params: queryParams,
      }).then((response) => {
        this.initialLoading = false;
        this.chart = [];
        this.data = response.data;
        this.createChartData('onboarding', 3);
        this.createChartData('initial_development', 8);
        this.createChartData('ongoing_development', 14);
        this.createCustomChart();
        this.setPhasesData('onboarding');
        this.setPhasesData('initial_development');
        this.setPhasesData('ongoing_development');
      });
    },

    createChartData(type, step) {
      const pointsLength = [];
      const pointsPlots = [];
      let totalPoints = [];
      let plotLength = [];
      this.$lodash.each(this.data[type].segment_points_analysis, (val, key) => {
        let tempKey = key;
        tempKey = tempKey.replace(/m/g, " months");
        tempKey = tempKey.replace(/y/g, " years");
        pointsLength.push({ ...val, tempKey });
        totalPoints = pointsLength.length;
        const t = 6 / totalPoints;
        plotLength = parseInt(t, 10);
      });
      this.$lodash.each(pointsLength, (value, index) => {
        const idx = index - 1;
        let length = '';
        if (idx === -1) {
          length = step;
        } else {
          length = pointsPlots[idx].year + plotLength;
        }
        pointsPlots.push({ ...value, year: length });
      });
      this.$lodash.each(pointsPlots, (val) => {
        const t = {
          ...val,
        };
        t.year = val.year;
        t.value = val.driver_average;
        this.chart.push(t);
      });
    },

    setPhasesData(type) {
      this.phases[type].average = this.data[type].engagement_score
        ? this.data[type].engagement_score : 0;
      // eslint-disable-next-line max-len
      this.phases[type].disengaged = this.data[type].disengaged_employees_stats.disengaged_employees_percent
        ? this.data[type].disengaged_employees_stats.disengaged_employees_percent : 0;
      this.phases[type].participants = this.data[type].chat_participation_stats.participation_rate
        ? this.data[type].chat_participation_stats.participation_rate : 0;
    },

    reportType(type, phase) {
      this.activeReportType = type;
      if (type === 'question') {
        this.initialLoadingQuestion = true;
        this.questionWiseAnalysis = [];
        this.getQuestionWiseReport(phase);
      }
    },

    getQuestionWiseReport(type) {
      axios.get(`${process.env.VUE_APP_API_URL}reports/employee_lifecycle_report`, {
        params: {
          stage_segment: type,
          fields: 'segment_questionwise_breakdown',
        },
      }).then((response) => {
        if (response) {
          this.initialLoadingQuestion = false;
          this.questionWiseAnalysis = response.data[type].segment_questionwise_breakdown;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-container {
  margin: 0 10%;
}
.remove-chart {
  margin-top: -140px;
}
.report-head-wrap {
  .report-title {
    font-weight: 400;
    padding: 10px;
    padding-left: 0;
  }
  .report-sub {
    font-weight: 400;
    padding: 10px;
    padding-left: 0;
    padding-bottom: 20px;
  }
}

.chart-spacer {
  margin: 2rem 0;
}
#chartdiv {
  height: 160px;
  position: relative;
  top: -150px;
  a {
    display: none !important;
  }
}

.details-report-head-wrap {
  padding-top: 30px;
  .details-report-title {
    font-size: 24px;
    font-weight: 400;
  }
  .details-report-sub {
    font-weight: 400;
    font-size: 14px;
  }
}

.action-wrap {
  margin: 15px 0;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  min-height: 35px;
  .item {
    border: 1px solid #e7e8e7;
    align-items: center;
    color: #909da0;
    cursor: pointer;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    padding: 8px;
    text-align: center;
  }
  .active {
    transition: 0.5s ease all;
    background-color: #4c3e9d;
    color: #fff;
  }
}
.filter-wrap {
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
    0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  height: 50px;
}
.separator-2tVZk {
    margin: 30px 0;
    position: relative;
    height: 4px;
    .separatorLine-1lNyU {
      position: absolute;
      top: 0;
      left: -5px;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(90deg,transparent 50%,#e7e8e7 0);
      background-size: 20px 100%;
      background-repeat: repeat;
  }
}
</style>

<style lang="scss">
.subdriver-tile {
  .v-list__tile {
    font-size: 12px !important;
    height: 40px !important;
    padding: 0px 10px !important;
  }
}

.lifecycle-wrap {
  overflow-y: auto;
  height: 90vh;
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
</style>
