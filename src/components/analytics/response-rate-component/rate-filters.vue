<template>
  <div>
    <v-navigation-drawer
      class="employeeFilters"
      style="height:100vh;position:fixed;padding-top: 60px;"
      persistent
      v-model="showRateFilterDrawer"
      absolute
      temporary
      hide-overlay
      right
    >
      <v-card class="filters-card">
        <v-expansion-panel class="elevation-0 employee-filters">
          <v-flex sm12>
            <!-- dynamic filters -->
            <v-expansion-panel-content
              class="employee-filters-list"
              v-for="(v, k) in filterOptions"
              :key="k"
              :id="k"
            >
              <div
                @click="searchFilter='';getFilterData(k)"
                class="py-2 px-3" slot="header">{{v}}
                <span v-if="getSelectedFiltersCount(filters.selected, k) !== 0">
                  <v-chip>{{filters.selected[k].length}} Selected</v-chip>
                </span>
              </div>
              <v-card color="#fff" style="border-bottom:0px">
                <v-text-field
                  @keyup="searchingfilter(k)"
                  v-model="searchFilter"
                  prepend-inner-icon="fas fa-search"
                  label="Search..."
                  single-line
                  hide-details
                  class="filter-search-bar"
                ></v-text-field>
                <v-card-text
                  v-show="searchingfilter(k) && searchingfilter(k).length > 0"
                >
                  <v-checkbox
                    id=""
                    color="primary"
                    :ripple="false"
                    :value="chk[k]"
                    v-for="chk in searchingfilter(k)" :key="chk[k]"
                    v-model="filters.selected[k]"
                  >
                  <div class="" slot="label">
                    {{chk[k]}}
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
          style="position:fixed;bottom:0;width:100%;border-top: 1px solid #ccc; box-shadow:1;"
          class="bg-white"
        >
          <v-btn
            class="error--text"
            text
            @click="showRateFilterDrawer = false"
            style="float:left"
          >Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="primary"
            style="float:right"
            @click="applyReportFilters()"
          >Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
import { VCheckbox, VChip } from 'vuetify';
import { mapState } from 'vuex';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';

dayjs.extend(relativeTime);

export default {
  name: 'RateFilterDrawer',

  components: {
    VCheckbox,
    VChip
  },

  props: {
    // reset: {
    //   required: true,
    //   type: Boolean,
    // },
    filterOptions: {
      required: true,
      type: Object
    }
  },

  data () {
    return {
      // filterApplied: false,
      showRateFilterDrawer: false,
      searchFilter: '',
      filters: {
        default: {},
        selected: [],
        main: {}
      },
      filtersList: {
        default: {},
        selected: {},
        main: {}
      }
    };
  },

  computed: {
    ...mapState({
      user: state => state.user,
      updateEmployeeFilters: state => state.updateEmployeeFilters
    })
  },

  mounted () {
    // const defaultFilters = {};
    // this.$lodash.each(this.filterOptions, (v, k) => {
    //   defaultFilters[k] = [];
    // });
    // this.filters.selected = defaultFilters;
  },

  watch: {
    reset () {
      if (!this.reset) {
        this.resetFilters();
      }
    },
    filterOptions: {
      deep: true,
      immediate: true,
      handler () {
        const defaultFilters = {};
        this.$lodash.each(this.filterOptions, (v, k) => {
          defaultFilters[k] = [];
        });
        this.filters.selected = defaultFilters;
      }
    }
  },

  methods: {
    // triggerUpdate() {
    //   this.$lodash.each(this.filters.selected, (v, k) => {
    //     if (k !== 'search' && k !== 'eID') {
    //       if (v && v.length > 0) {
    //         this.filterApplied = true;
    //       }
    //     }
    //   });
    //   const filters = JSON.parse(JSON.stringify(this.filters.selected));
    //   this.$router.push({
    //     query: filters,
    //   });
    //   const employeeFilters = {
    //     // dynamic filters
    //     filters: this.filters.selected,
    //   };
    //   // console.log('employeeFilters', employeeFilters);
    //   this.$store.dispatch('updateEmployeeFilters', employeeFilters);
    //   // this.showFilterDrawer = false;
    //   this.$emit('getEmployeesWithFilter', this.filterApplied);
    // },
    getFilterData (type) {
      axios.get(`${process.env.VUE_APP_API_URL}reports/get_report_options?options=filters&filter_field=${type}`).then((response) => {
        if (response && response.data) {
          this.filtersList.default = response.data.queryset_filters_options;
        }
      });
    },
    getSelectedFiltersCount (filter, idx) {
      if (filter[idx]) {
        return filter[idx].length;
      }
      return 0;
    },
    searchingfilter (k) {
      if (this.filtersList.default[k]) {
        const filter = this.filtersList.default[k];
        if (this.searchFilter) {
          // eslint-disable-next-line max-len
          const tempData = filter.filter(r => r[k].toLowerCase().indexOf(this.searchFilter.toLowerCase()) >= 0);
          return tempData;
        } else if (!this.searchFilter) {
          return filter;
        }
      }
      return '';
    },
    applyReportFilters () {
      // this.$lodash.each(this.filters.selected, (v, k) => {
      //   if (v && v.length > 0) {
      //     this.filterApplied = true;
      //   }
      // });
      this.showRateFilterDrawer = false;
      this.$emit('applyReportFilters', this.filters.selected);
    },
    resetFilters () {
      // this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
      const defaultFilters = {};
      this.$lodash.each(this.filterOptions, (v, k) => {
        defaultFilters[k] = [];
      });
      this.filters.selected = defaultFilters;
    }
  }
};
</script>

<style lang="scss">
.filters-card {
  height: 92vh;
  overflow: auto;
  border: none;
  box-shadow: none;
  .employee-filters {
    display: -webkit-inline-box;
    .employee-filters-list {
      width: 300px;
      &:last-child {
        padding-bottom: 44px;
      }
      .v-expansion-panel__header {
        background-color: #fff !important;
        .v-expansion-panel__header__icon {
          padding-right: 15px;
        }
      }
      .v-expansion-panel__body {
        max-height: 400px !important;
        overflow-y: auto!important;
        overflow-x: hidden!important;
        .v-card {
          height: 100%;
        }
      }
    }
  }
}
</style>
