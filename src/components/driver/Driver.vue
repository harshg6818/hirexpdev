<template>
  <div class="">
    <v-layout column class="bg-gradient py-0 pl-1">
      <!-- Search Bar and Filters -->
      <v-layout row wrap align-center style="border-bottom: 1px solid rgb(243, 241, 241);z-index:3;max-height:70px;">
        <v-flex xs2 class="mr-2">
          <v-btn class="elevation-0 ml-0 text-xs-right back-button"
            @click="goBack()"
            slot="activator"
            flat fab
          >
            <v-icon> fas fa-arrow-left </v-icon>
          </v-btn>
        </v-flex>
        <v-flex class="text-capitalize" xs3 pl-4 style="min-width:41%;position:absolute;left:7%">
          <h1 style="font-weight:500" v-if="$route.params && $route.params.driver">
            {{$route.params.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }}
          </h1>
        </v-flex>

        <v-spacer> </v-spacer>

        <v-flex xs2>
          <v-btn style="right: 10%; top:10px;
            position: absolute;
            float: right;
            z-index: 100 !important;" color="grey"
            class="text-capitalize"
            flat
            v-if="checkForFilters()"
            @click="resetDashboard"
          >
            Remove Filters
          </v-btn>
          <v-btn class="text-capitalize" style="right: 0; top:10px;
            position: absolute;
            float: right;
            z-index: 100 !important; color:white;" slot="activator" color="primary"  @click="showFilter = true">
          <v-icon style="font-size:16px; padding-right:10px;">fas fa-filter</v-icon> Filter
        </v-btn>
        </v-flex>
      </v-layout>

      <!-- Dashboard -->
      <v-layout row wrap>
        <v-flex xs12>
          <DriverOverview ref="DriverOverview" class="my-2" @updateEmpWithDriver="updateEmployeeWithDriverFilter"/>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <DriverEngagement ref="DriverEngagement" class="my-2" />
        </v-flex>
      </v-layout>
    </v-layout>

    <!-- <v-dialog v-model="showFilter" persistent max-width="65%" style="overflow-y: hidden;"> -->
    <v-navigation-drawer
      style="height:100vh; position :fixed; bottom:0; right:0"
      v-model="showFilter"
      absolute
      temporary
      hide-overlay
      right
    >
      <v-card style="height:90vh; overflow:auto; border:none; box-shadow:none;" class="filter-drawer">
        <v-expansion-panel v-model="config.panel"
            class="elevation-0 employee-filters mr-2"
          >
            <v-flex sm12 style="min-width:100%;">
              <v-expansion-panel-content class="employee-filters-list">
                <div slot="header" class="text-capitalize mr-3 py-2 px-3">Chat Date</div>
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
                      <v-menu full-width offset-y :close-on-content-click="false" v-model="config.dateMenu" bottom>
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
            <!-- </v-flex>
            <v-flex sm12 style="min-width:100%"

            > -->
            <v-expansion-panel-content v-for="(v, k) in filters.default"
              :key="k"
              v-if="v.length > 0" class="employee-filters-list">
              <div slot="header" class="text-capitalize mr-3  py-2 px-3" @click="searchFilter = ''; getFilterData(k)">
                {{getFilterName(k)}}
                <span v-if="getSelectedFiltersCount(filters.selected, k) !== 0">
                  <v-chip>
                    {{filters.selected[k].length}} Selected
                  </v-chip>
                </span>
                </div>
              <v-card color="">
                <v-text-field
                  @input="searchingfilter(k)"
                  v-model="searchFilter"
                  prepend-inner-icon="fas fa-search"
                  label="Search..."
                  single-line
                  hide-details
                  class="filter-search-bar"
                ></v-text-field>
                <v-card-text v-show="searchingfilter(k) && searchingfilter(k).length > 0" style="height: 300px;">
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

          <v-btn color="error" flat @click="showFilter = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="applyfilter()" class="white--text" color="primary" style="float:right">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
    <!-- </v-dialog> -->
  </div>
</template>

<script>
import Vue from 'vue';
// import {
//   VSelect,
//   VChip,
//   VMenu,
//   VDivider,
//   VTooltip,
//   VCheckbox
// } from 'vuetify';
import { mapState } from 'vuex';
import axios from 'axios';
import VDateRange from 'vuetify-daterange-picker';
import dayjs from 'dayjs';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

// import DriverEmployeesList from '../analytics/DriverEmployeesList';
import DriverOverview from '../driver/DriverOverview';
import DriverEngagement from '../driver/SubDriverEngagement';

let previousRoutePath = '';

Vue.use(VDateRange);

export default {
  name: 'ViewDriver',
  components: {
    // VSelect,
    // VChip,
    // VMenu,
    // VDivider,
    // DriverEmployeesList,
    // VCheckbox,
    // VTooltip,
    DriverOverview,
    DriverEngagement
  },
  data () {
    return {
      showFilter: false,
      config: {
        panel: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
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
      searchFilter: ''
      // previousRoutePath: '/',
    };
  },
  beforeRouteEnter (to, from, next) {
    // console.log('from.fullPath', from);
    const r = from.fullPath;
    next((vm) => {
      vm.from = from;
    });
    // console.log('r', r);
    previousRoutePath = r;
  },
  computed: {
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
      if (this.highPotential.selected && this.highPotential.selected.length > 0) {
        applied = true;
      }
      return applied;
    },
    // searchingfilter(k) {
    // // setTimeout(() => {
    // this.getFilterData(k);
    // // }, 500);
    // setTimeout(() => {
    //   this.getSearchedFiltered(k);
    // }, 1000);
    // },
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
    // getSearchedFiltered(k) {
    //   const filter = this.filtersList.default[k];
    //   // this.$nextTick(() => {
    //   //   const tempData = filter.filter(function (f) {
    //   //     return f[k].toLowerCase().indexOf(this.searchFilter.toLowerCase()) !== -1;
    //   //   }.bind(this));
    //   //   this.filtersList.default[k] = tempData;
    //   // });
    //   const tempData = filter.filter((r) => { return r[k].toLowerCase().indexOf(this.searchFilter.toLowerCase()) >= 0; });
    //   this.filtersList.default[k] = tempData;
    // },
    getFilterName (name) {
      return name.replace('_', ' ');
    },
    getSelectedFiltersCount (filter, idx) {
      if (filter[idx]) {
        return filter[idx].length;
      }
      return 0;
    },
    applyfilter () {
      this.filterApplied = true;
      this.triggerUpdate(this.$route.params.stageId);
    },
    goBack () {
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
      // this.$router.go(-1);
      const prevPath = previousRoutePath.split('?');
      this.$router.push({
        path: prevPath[0],
        query:
         {
           ...tempAllFilters
         }
      });
    },
    getDriverDetails (driver) {
      if (document.getElementById('lineGraph')) {
        document.getElementById('lineGraph').innerHTML = '';
      }
      if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
        this.filters.selected = this.dashboardFilters.filters;
        this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
        this.highPotential.selected = this.dashboardFilters.highPotential;
      }
      let queryParams = {
        initiated_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
        user__profile__high_potential_emp: this.highPotential.selected
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`user__profile__${k}__in`] = v.join();
        }
      });
      const temp = {
        fields: 'driver_user_count,driver_disengaged_user,monthwise_driver_trend,milestone_wise_analysis,driver_average'
      };
      queryParams = {
        ...queryParams,
        ...temp
      };
      axios.get(`${process.env.VUE_APP_API_URL}driver/${driver}/details`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          // EngagementStats
          if (this.$refs && this.$refs.DriverOverview) {
            this.$refs.DriverOverview.config.initialLoading = false;
            // this.$refs.DriverOverview.report.chats_completed = response.data.driver_user_count;
            this.$refs.DriverOverview.report.engagement_score = response.data.driver_average;
            this.$refs.DriverOverview.report.monthwise_driver_trend = response.data.monthwise_driver_trend;
            this.$refs.DriverOverview.report.disengaged_employees = response.data.driver_disengaged_user_count;
            const temp = response.data.monthwise_driver_trend;
            const data = [];
            this.$lodash.each(temp, (score, date) => {
              const temp2 = [];
              temp2.push(date);
              temp2.push(score);
              data.push(temp2);
            });
            this.$refs.DriverOverview.generateLineGraph(data);
            this.$refs.DriverOverview.dashboardReference = this;
          }
          if (this.$refs && this.$refs.DriverEngagement) {
            this.$refs.DriverEngagement.config.initialLoading = false;
            const heatMapData = [];
            const roles = [];
            this.$lodash.each(response.data.milestone_wise_analysis, (data, milestone) => {
              this.$lodash.each(data, (average, subdriver) => {
                let match = -1;
                match = this.$lodash.findIndex(roles, (role) =>
                  role === subdriver);
                if (match === -1) {
                  roles.push(subdriver);
                }
              });
            });

            this.$lodash.each(response.data.milestone_wise_analysis, (data, milestone) => {
              let rowData = {};
              const temp = {
                milestone: milestone
              };
              rowData = {
                ...rowData,
                ...temp
              };
              this.$lodash.each(roles, (v) => {
                if (data[v]) {
                  const temp = {
                    [v]: data[v]
                  };
                  rowData = {
                    ...rowData,
                    ...temp
                  };
                } else {
                  const temp = {
                    [v]: 0
                  };
                  rowData = {
                    ...rowData,
                    ...temp
                  };
                }
              });
              heatMapData.push(rowData);
            });
            this.$refs.DriverEngagement.table.loading = false;
            this.$refs.DriverEngagement.roles = roles;
            this.$refs.DriverEngagement.report = heatMapData;
          }
        } else {
          if (this.$refs && this.$refs.DriverOverview) {
            this.$refs.DriverOverview.config.initialLoading = false;
          }
          if (this.$refs && this.$refs.DriverEngagement) {
            this.$refs.DriverEngagement.config.initialLoading = false;
          }
        }
      }, (response) => {
        if (this.$refs && this.$refs.DriverOverview) {
          this.$refs.DriverOverview.config.initialLoading = false;
        }
        if (this.$refs && this.$refs.DriverEngagement) {
          this.$refs.DriverEngagement.config.initialLoading = false;
        }
      });
    },
    resetDashboard () {
      if (this.config.activeDriver) {
        this.$router.push('/');
      } else {
        this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
        this.dateRangeOptions.startDate = undefined;
        this.dateRangeOptions.endDate = undefined;
        this.highPotential.selected = [];
        this.checkForFilters();
        this.triggerUpdate();
      }
    },
    updateEmployeeWithDriverFilter (driver) {
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
      if (driver) {
        tempAllFilters.disengaged_from_driver = driver;
      }
      if (this.highPotential.selected && this.highPotential.selected.length > 0) {
        tempAllFilters.highPotential = this.highPotential.selected;
      }
      this.$router.push({
        path: '/employees',
        query:
         { ...tempAllFilters }
      });
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
      if (this.$route.params && this.$route.params.driver) {
        this.getDriverDetails(this.$route.params.driver);
      }
    },
    updateDate (date) {
      if (date) {
        this.dateRangeOptions.startDate = date[0];
        this.dateRangeOptions.endDate = date[1];
        this.triggerUpdate();
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
          const defaultFilters = {};
          this.$lodash.each(this.filters.default.data, (v, k) => {
            defaultFilters[k] = [];
          });
        }
      });
    },
    // getFilters() {
    //   axios.get(`${process.env.VUE_APP_API_URL}company/${this.user.company}/dashboard_filters`).then((response) => {
    //     if (response && response.data && response.data.queryset_filters_options) {
    //       this.config.initialLoadingFilters = false;
    //       this.filters.default = response.data.queryset_filters_options;

    //       const defaultFilters = {};
    //       this.$lodash.each(this.filters.default, (v, k) => {
    //         defaultFilters[k] = [];
    //       });
    //       this.$lodash.each(this.filters.selected, (v, k) => {
    //         defaultFilters[k] = v;
    //       });
    //       this.filters.selected = defaultFilters;
    //       const mainFilters = {};
    //       this.$lodash.each(this.filters.default, (v, k) => {
    //         mainFilters[k] = [];
    //       });
    //       this.filters.main = JSON.parse(JSON.stringify(mainFilters));
    //     }
    //   });
    // },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    }
  },
  watch: {
    $route () {
      if (this.$route.params) {
        if (this.$route.params.driver) {
          this.getDriverDetails(this.$route.params.driver);
          this.getFilters();
        }
      }
    }
  },
  beforeMount () {
    if (this.$route && this.$route.query && Object.keys(this.$route.query).length > 0) {
      let temp = {};
      this.$lodash.each(this.$route.query, (value, key) => {
        if (key !== 'startDate' && key !== 'endDate') {
          temp[key] = [];
          if (typeof value === 'object') {
            temp[key] = temp[key].concat(value);
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
        this.dateRangeOptions.endDate = this.$route.query.endDate;
        this.dateRangeOptions.startDate = this.$route.query.startDate;
      }
      this.filters.selected = temp;
      if (this.filters.selected.highPotential) {
        this.filters.selected.highPotential = this.filters.selected.highPotential[0];
      }
      if (this.$route && this.$route.query && this.$route.query.disengaged_from_driver) {
        delete this.filters.selected.disengaged_from_driver;
        this.disengagedFromDriver.selected = this.$route.query.disengaged_from_driver;
        // this.triggerUpdate();
      }
      if (this.$route && this.$route.query) {
        this.highPotential.selected = this.$route.query.high_potential_emp || this.$route.query.highPotential;
      }
      delete this.filters.selected.highPotential;
    }
    this.getFilters();
    this.triggerUpdate();
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.emoji-container {
  max-height: 4em;
  max-width: 4em;
}
.employee-filters {
  overflow-y: auto;
  display: -webkit-inline-box;
  .employee-filters-list {
    width: 300px;
    .v-expansion-panel__header {
      background-color: #fff !important
    }
    .v-expansion-panel__body {
      // min-height: 200px;
      max-height: 400px !important;
      // height: 200px;
      overflow-y: auto!important;
      overflow-x:hidden!important;
      .v-card {
        height: 100%;
      }
    }
  }
}

.filter-drawer {
  height: 0px!important;
  overflow-y:hidden!important;
  overflow-x:hidden!important;
  &.v-card {
    height: 100% !important;
    overflow-y: auto!important;
  }
  .v-expansion-panel {
    height: 85%!important;
    &.employee-filters {
      .v-expansion-panel__container {
        // height: 380px!important;
        max-height: 380px!important;
        .v-expansion-panel__body {
          // height: 330px!important;
          max-height: 380px!important;
        }
      }
    }
  }
}
</style>
<style lang="scss">
  .employee-filters {
  overflow-y: auto;
  display: -webkit-inline-box;
  .employee-filters-list {
    width: 300px;
    .v-expansion-panel__header {
      background-color: #fff !important
    }
    .v-expansion-panel__body {
      // min-height: 200px;
      max-height: 400px !important;
      // height: 200px;
      overflow-y: auto!important;
      overflow-x:hidden!important;
      .v-card {
        height: 100%;
      }
    }
  }
}
</style>
