<template>
  <div class="dashboard-filter-drawer-wrap">
    <v-navigation-drawer
      class="employeeFilters"
      style="position:fixed;right:0;"
      persistent
      v-model="showFilterDrawer"
      absolute
      temporary
      right
      width="300"
    >
      <v-card class="filters-card elevation-0" style="padding-top:58px;">
        <v-expansion-panels accordion>
          <!-- <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row>
                <v-col>HiPos</v-col>
                <v-col>
                  <v-checkbox
                    id="hipos"
                    style="position: absolute;right: 6px;"
                    v-model="highPotentialSwitch"
                    color="primary"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
          </v-expansion-panel> -->
          <div class="switch-filters" style="border-bottom:1px solid rgba(0, 0, 0, 0.12)">
            <div class="switch-text">HiPos</div>
            <div class="switch-btn">
              <v-checkbox id="hipos" v-model="highPotentialSwitch" color="primary"
              ></v-checkbox>
            </div>
          </div>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Chat initiation date
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-radio-group @change="updateInitDate">
                <v-radio
                  color="primary"
                  v-for="(t, ti) in chatInitDate.presets"
                  :key="ti"
                  :label="t.label"
                  :value="t.range"
                ></v-radio>
                <!-- <v-menu full-width offset-y :close-on-content-click="false" top>
                  <v-radio
                    slot="activator"
                    color="primary"
                    label="Select Range"
                  ></v-radio>
                  <v-card>
                    <v-card-text>
                      <v-daterange
                      no-presets
                      :options="chatInitDate"
                      @input="updateInitDate"
                      next-icon="fas fa-arrow-right"
                      prev-icon="fas fa-arrow-left"
                      prepend-icon="fas fa-calendar"
                      ></v-daterange>
                    </v-card-text>
                  </v-card>
                </v-menu> -->
              </v-radio-group>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel
            v-for="(v, k) in filters.default"
            :key="k"
            v-if="v.length > 0"
          >
            <v-expansion-panel-header @click="searchFilter=''; getFilterData(k)">
              <span>{{getFilterName(k)}}</span>
              <span v-if="filters.selected[k].length > 0">
                <v-chip>{{filters.selected[k].length}} Selected</v-chip>
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-0">
              <v-text-field
                @keyup="searchingfilter(k)"
                v-model="searchFilter"
                prepend-inner-icon="fas fa-search"
                label="Search..."
                single-line
                hide-details
                class="pb-3"
              ></v-text-field>
              <div v-if="searchingfilter(k) && searchingfilter(k).length > 0">
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
              </div>
              <div v-if="searchingfilter(k) && searchingfilter(k).length === 0">
                No filters available
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel class="elevation-0 employee-filters">
          <v-flex sm12>

            <!-- dynamic filters -->
            <v-expansion-panel-content style=" padding:0;" v-for="(v, k) in filters.default"
              :key="k"
              v-if="v.length > 0" class="px-0 py-0 employee-filters-list">
                <div @click="searchFilter=''; getFilterData(k)" slot="header" class="text-capitalize py-2 px-3">{{getFilterName(k)}}
                  <span v-if="filters.selected[k].length >0"><v-chip>{{filters.selected[k].length}} Selected</v-chip></span>
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
        </v-expansion-panels>
        <v-card-actions
          style="position:fixed;bottom:0;width:100%;border-top: 1px solid #ccc; box-shadow:1;"
          class="bg-white"
        >
          <v-btn
            class="error--text"
            text
            @click="showFilterDrawer = false"
            style="float:left"
          >Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="primary"
            style="float:right"
            @click="applyFilters()"
          >Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { VCheckbox, VChip } from 'vuetify';
import { mapState } from 'vuex';
import axios from 'axios';
import dayjs from 'dayjs';

export default {
  name: 'DashboardFilters',

  components: {
    VCheckbox,
    VChip
  },

  props: {
    reset: {
      required: true,
      type: Boolean
    }
  },

  data () {
    return {
      searchFilter: '',
      showFilterDrawer: false,
      highPotentialSwitch: false,
      chatInitDate: {
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
      tempFilters: null
    };
  },

  computed: {
    ...mapState({
      user: state => state.user,
      dashboardFilters: state => state.dashboardFilters
    })
  },

  created () {
    this.getFilters();
  },

  watch: {
    reset () {
      if (!this.reset) {
        this.resetFilters();
      }
    }
  },

  methods: {
    updateInitDate (date) {
      if (date) {
        this.chatInitDate.startDate = date[0];
        this.chatInitDate.endDate = date[1];
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
    getFilters () {
      axios.get(`${process.env.VUE_APP_API_URL}company/${this.user.company}/dashboard_filters_options`).then((response) => {
        if (response && response.data && response.data.queryset_filters_options) {
          // this.config.initialLoadingFilters = false;
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
      // this.expansion = !this.expansion;
      axios.get(`${process.env.VUE_APP_API_URL}company/${this.user.company}/dashboard_filters?filter_field=${k}`).then((response) => {
        if (response && response.data && response.data) {
          // this.config.initialLoadingFilters = false;
          this.filtersList.default = response.data.queryset_filters_options;
          // console.log(this.filters.default);
          const defaultFilters = {};
          this.$lodash.each(this.filters.default.data, (v, key) => {
            defaultFilters[key] = [];
          });
        }
      });
    },
    applyFilters () {
      this.isFilterApplied();
      this.triggerUpdate(this.tempFilters);
    },
    isFilterApplied () {
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (k !== 'search' && k !== 'eID') {
          if (v && v.length > 0) {
            this.filterApplied = true;
          }
        }
      });
      const filters = JSON.parse(JSON.stringify(this.filters.selected));
      if (this.chatInitDate.startDate || this.chatInitDate.endDate) {
        filters.startDate = this.chatInitDate.startDate;
        filters.endDate = this.chatInitDate.endDate;
        this.filterApplied = true;
      }
      if (this.highPotentialSwitch) {
        this.filterApplied = true;
      }
      this.tempFilters = filters;
      this.$emit('dashFiltersApplied', this.filterApplied);
    },
    triggerUpdate (filters) {
      this.$router.push({
        query: filters
      });
      const dashboardFilters = {
        user__profile__high_potential_emp: this.highPotentialSwitch ? this.highPotentialSwitch : undefined,
        initiated_date_start: this.chatInitDate.startDate ? dayjs(this.chatInitDate.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.chatInitDate.startDate ? dayjs(this.chatInitDate.endDate).format('YYYY-MM-DD') : undefined,
        // dynamic filters
        filters: this.filters.selected
      };
      this.$store.dispatch('updateDashboardFilters', dashboardFilters);
      this.$emit('getDashboardWithFilter', this.filterApplied);
    },
    resetFilters () {
      this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
      this.highPotentialSwitch = false;
      this.chatInitDate.startDate = undefined;
      this.chatInitDate.endDate = undefined;
    }
  }
};
</script>

<style lang="scss">
.dashboard-filter-drawer-wrap {
  .filters-card {
    height: 92vh;
    overflow: auto;
    border: none;
    box-shadow: none;
    .v-expansion-panel {
      &::before {
        box-shadow: none;
      }
      .v-expansion-panel-header {
        min-height: fit-content;
      }
      .v-expansion-panel-header--active {
        border-bottom: 1px solid #ccc !important;
      }
      .v-expansion-panel-content {
        max-height: 300px;
        overflow-y: auto;
      }
    }
    // .employee-filters {
    //   display: -webkit-inline-box;
    //   .employee-filters-list {
    //     width: 300px;
    //     &:last-child {
    //       padding-bottom: 44px;
    //     }
    //     .v-expansion-panel__header {
    //       background-color: #fff !important;
    //       .v-expansion-panel__header__icon {
    //         padding-right: 15px;
    //       }
    //     }
    //     .v-expansion-panel__body {
    //       max-height: 400px !important;
    //       overflow-y: auto!important;
    //       overflow-x: hidden!important;
    //       .v-card {
    //         height: 100%;
    //       }
    //     }
    //   }
    // }
    .switch-filters {
      display: grid;
      width: 300px;
      grid-template-columns: 1fr 1fr;
      height: 60px;
      align-items: center;
      padding: 0px 24px;
      .switch-text {
        text-align: left;
      }
      .switch-btn {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
