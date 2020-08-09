<template>
  <div class="emp-response-wrap">
    <RateTopBar
      ref="rateTopBar"
      @toggleReportFilter="toggleReportFilter"
      @resetReportFilters="resetReportFilters"
      @reportDateFilters="reportDateFilters"
    ></RateTopBar>

    <RateSortByNav
      :sort-by-data="sortOptions"
      @onClickSortBy="onClickSortBy"
    ></RateSortByNav>

    <div class="report-container">
      <div class="sortBy-select" v-if="chartData.selected.length > 0">
        <v-menu
          class="elevation-0"
          offset-y
          max-width="auto"
          min-width="240"
          max-height="250"
          :close-on-content-click="false"
          center
        >
          <v-btn
            slot="activator"
            class="box-container zoom-in"
          >
            <span>
              {{chartData.selected.length}}
              &nbsp;of&nbsp;
              {{chartData.default.length}}
              &nbsp;{{sortByKey.replace(/_/g, ' ')}}&nbsp;selected</span>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <v-icon>fas fa-chevron-down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="(item, key) in chartData.default"
              :key="key"
            >
              <v-list-tile-action>
                <v-checkbox
                  :ripple="false"
                  :value="item"
                  v-model="chartData.selected"
                  color="primary"
                  @change="onChangeItem"
                ></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-title>{{ item.key }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
      <div class="report-wrap" v-if="chartData.selected.length > 0">
        <div class="bar-wrap">
          <div class="report-bar-graph intro-x" v-if="chartData.selected.length > 0">
            <rateBarGraph
              :bar-data="chartData.selected"
              :sort-by-key="sortByKey"
            ></rateBarGraph>
          </div>
          <div class="report-table-wrap" v-if="chartData.selected.length > 0">
            <div class="report-table">
              <thead class="table-head">
                <tr>
                  <th>{{sortByKey.replace(/_/g, ' ')}}</th>
                  <th>value</th>
                </tr>
              </thead>
              <tbody class="table-body" v-if="chartData.selected.length > 0">
                <tr
                  v-for="(t,index) in chartData.selected"
                  :key="index"
                >
                  <td>{{t.key}}</td>
                  <td>{{t.participation_rate}}</td>
                </tr>
              </tbody>
              <div v-else class="no-sort-data">
                Not enough data to generate anlaysis.
              </div>
            </div>
          </div>
        </div>
        <div class="report-trend-graph intro-x" v-if="chartData.selected.length > 0">
          <div class="trends-title">Participation trends overtime</div>
          <rateTrend :trend-data="trendsData.selected"></rateTrend>
        </div>
      </div>
      <div class="no-report-data intro-x" v-if="chartData.selected.length < 1">
        <div class="sad-amara">
          <img src="../../assets/logo/sad_amara.png" alt="sad-amara">
        </div>
        <div class="am-text">Not enough data to generate anlaysis.</div>
      </div>
    </div>

    <RateFilterDrawer
      ref="RateFilterDrawer"
      :filter-options="getFilterOption"
      @applyReportFilters="applyReportFilters"
    ></RateFilterDrawer>
  </div>
</template>

<script>
import axios from 'axios';
// import { VCheckbox } from 'vuetify';
import { format, subDays } from 'date-fns';
import RateTopBar from './response-rate-component/rate-top-bar';
import RateSortByNav from './response-rate-component/rate-sort-by-nav';
import RateBarGraph from './response-rate-component/rate-bar-graph';
import RateFilterDrawer from './response-rate-component/rate-filters';
import RateTrend from './response-rate-component/rate-trend';

export default {
  name: 'EmployeeResponseRate',

  components: {
    // VCheckbox,
    RateTopBar,
    RateSortByNav,
    RateBarGraph,
    RateFilterDrawer,
    RateTrend
  },

  data () {
    return {
      sortOptions: {},
      filterOptions: {},
      chartData: {
        default: [],
        selected: []
      },
      sortByKey: '',
      selectedfilters: [],
      reportDate: {
        start: format(subDays(new Date(), 365), 'YYYY-MM-DD'),
        end: format(new Date(), 'YYYY-MM-DD')
      },
      trendsData: {
        default: [],
        selected: {}
      }
    };
  },

  created () {
    this.getRateReportOtions();
  },

  computed: {
    getFilterOption () {
      const filters = Object.assign({}, this.filterOptions);
      if (filters && filters[this.sortByKey]) {
        delete filters[this.sortByKey];
      }
      return filters;
    }
  },

  methods: {
    applyReportFilters (filters) {
      this.selectedfilters = filters;
      this.$lodash.each(filters, (v) => {
        if (v && v.length > 0) {
          this.$refs.rateTopBar.filterApplied = true;
        }
      });
      this.onClickSortBy(this.sortByKey);
    },
    resetReportFilters () {
      this.selectedfilters = [];
      this.$refs.rateTopBar.filterApplied = false;
      this.$refs.RateFilterDrawer.resetFilters();
      this.onClickSortBy(this.sortByKey);
    },
    reportDateFilters (range) {
      this.reportDate.start = range[0];
      this.reportDate.end = range[1];
      this.onClickSortBy(this.sortByKey);
    },
    onChangeItem () {
      this.chartData.selected = this.chartData.selected.sort((a, b) =>
        parseFloat(b.total_chats) - parseFloat(a.total_chats));
    },
    toggleReportFilter () {
      this.$refs.RateFilterDrawer.showRateFilterDrawer = true;
    },
    getRateReportOtions () {
      const queryParams = {
        options: 'sort_option,filter_options'
      };
      axios.get(`${process.env.VUE_APP_API_URL}reports/get_report_options`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          this.filterOptions = response.data.queryset_filter_options;
          this.sortOptions = response.data.queryset_sort_options;
        }
      });
    },
    getGraphColor (val) {
      let color = '';
      if (val === 0 || val <= 10) {
        color = '#edebf5';
      } else if (val === 11 || val <= 20) {
        color = '#dbd8eb';
      } else if (val === 21 || val <= 30) {
        color = '#c9c5e1';
      } else if (val === 31 || val <= 40) {
        color = '#b7b1d7';
      } else if (val === 41 || val <= 50) {
        color = '#a59ece';
      } else if (val === 51 || val <= 60) {
        color = '#938bc4';
      } else if (val === 61 || val <= 70) {
        color = '#8177ba';
      } else if (val === 71 || val <= 80) {
        color = '#6f64b0';
      } else if (val === 81 || val <= 90) {
        color = '#5d51a6';
      } else if (val === 91 || val <= 100) {
        color = '#4c3e9d';
      }
      return color;
    },
    onClickSortBy (type) {
      if (type) {
        this.sortByKey = type;
        const queryParams = {
          sort_key: type,
          fields: 'user_participation_stats,user_participation_trends',
          initiated_date_start: this.reportDate.start,
          initiated_date_end: this.reportDate.end
        };
        this.$lodash.each(this.selectedfilters, (v, k) => {
          if (v.length > 0) {
            queryParams[`user__profile__${k}__in`] = v.join();
          }
        });
        axios.get(`${process.env.VUE_APP_API_URL}reports/get_participation_report`, {
          params: queryParams
        }).then((response) => {
          if (response && response.data) {
            // console.log('response.data', response.data);
            // this.trends = response.data.user_participation_trends;
            const temp = [];
            this.$lodash.each(response.data.user_participation_stats, (val) => {
              const t = {
                ...val
              };
              t.color = this.getGraphColor(val.participation_rate);
              temp.push(t);
            });
            this.chartData.default = temp;
            const selectedItems = [];
            this.$lodash.each(temp, (val, index) => {
              if (index < 10) {
                selectedItems.push(val);
              }
            });
            const selectedTrendsTemp = [];
            const selectedTrends = {};
            this.$lodash.each(response.data.user_participation_trends, (val, key) => {
              const t = {};
              t.name = key;
              t.value = val;
              selectedTrendsTemp.push(t);
            });
            this.$lodash.each(selectedTrendsTemp, (val, index) => {
              if (index < 10) {
                selectedTrends[val.name] = val.value;
              }
            });
            this.trendsData.default = response.data.user_participation_trends;
            this.trendsData.selected = selectedTrends;
            this.chartData.selected = selectedItems;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.emp-response-wrap {
  .report-container {
    background-color: var(--bg-panel);
    height: 74vh;
    // height: 90vh;
    overflow: hidden;
    border-radius: 12px;
    margin: 0 10px;
    .sortBy-select {
      display: grid;
      justify-items: end;
      margin: 10px 20px 10px 0;
    }
    .report-wrap {
      // height: 65vh;
      margin: 0 20px;
      height: 60vh;
      // height: 80vh;
      overflow-y: auto;
      .bar-wrap {
        display: grid;
        grid-template-columns: 75% 25%;
        .report-bar-graph {
          margin-right: 10px;
          height: 450px;
          background: var(--bg);
          border-radius: 0.5rem;
        }
        .report-table-wrap {
          margin-left: 10px;
          display: grid;
          .report-table {
          z-index: 0;
            height: 450px;
            border-radius: 0.5rem;
            border: 1px solid var(--color-palceholder);
            background: var(--bg);
            .table-head, .table-body {
              tr {
                display: grid;
                // grid-template-columns: repeat(2, 1fr);
                // grid-template-columns: 2fr, 1fr;
                grid-template-columns: 3fr 1fr;
                // border-bottom: 1px solid var(--color-text);
                border-top: 1px solid var(--color-palceholder);
                td,th {
                  padding: 8px 0px 8px 16px;
                  display: grid;
                  align-items: center;
                  justify-items: start;
                  &:last-child {
                    // border-left: 1px solid var(--color-text);
                  }
                }
              }
            }
            .table-head {
              display: grid;
              min-height: 50px;
              max-height: 50px;
              tr {
                th {
                  text-transform: capitalize;
                }
                &:first-child {
                  border-top: 0;
                }
              }
            }
            .table-body {
              min-height: 400px;
              max-height: 400px;
              overflow-y: auto;
              display: grid;
            }
            .no-sort-data {
              text-align: center;
              font-size: var(--heading-size);
              color: var(--color-palceholder);
              display: grid;
              align-items: center;
              justify-content: center;
              height: 350px;
              border-top: 1px solid var(--color-text);
            }
          }
        }
      }
      .report-trend-graph {
        margin-top: 20px;
        padding: 30px 30px;
        height: 600px;
        background: var(--bg);
        border-radius: 0.5rem;
        .trends-title {
          display: grid;
          place-items: center;
          padding-bottom: 16px;
          margin-top: -16px;
          color: var(--color-text);
          font-size: var(--heading-size);
          font-weight: var(--heading-weight);
        }
      }
    }
    .no-report-data {
      display: grid;
      grid-template-columns: 1fr;
      background-color: var(--bg);
      align-items: center;
      justify-items: center;
      margin: 50px;
      border-radius: 1rem;
      height: 300px;
      .sad-amara {
        text-align: center;
        img {
          width: 25%;
          border-radius: 100%;
        }
      }
      .am-text {
        font-size: var(--heading-size);
        color: var(--color-text);
      }
    }
    .intro-x {
      opacity: 0;
      position: relative;
      transform: translateX(80px);
      animation: 0.6s intro-x-animation ease-in-out 0.33333s;
      animation-fill-mode: forwards;
      animation-delay: 0.3s;
    }
    @keyframes intro-x-animation {
      100% {
        opacity: 1;
        transform: translateX(0px);
      }
    }
  }
}
</style>
