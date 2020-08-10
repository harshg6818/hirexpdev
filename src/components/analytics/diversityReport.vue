<template>
  <div class="diversity-report-wrap">
    <DiversityTopBar
      ref="rateTopBar"
      @toggleReportFilter="toggleReportFilter"
      @resetReportFilters="resetReportFilters"
      @reportDateFilters="reportDateFilters"
    ></DiversityTopBar>

    <DiversitySortByNav
      :sort-by-data="sortOptions"
      @onClickSortBy="onClickSortBy"
    ></DiversitySortByNav>
    <div class="report-container">
      <div class="report-wrap">
        <div class="bar-wrap">
          <div class="report-bar-graph intro-x">
            <DiversityOvertimeStats
            ></DiversityOvertimeStats>
            <DiversityOvertimeBar
              :bar-data="overtimeBarData"
              :sort-by-key="sortByKey"
            ></DiversityOvertimeBar>
          </div>
          <div class="overtime-table">
            <DiversityOvertimeTable
            :overtime-table-data="overtimeTableData"
            ></DiversityOvertimeTable>
          </div>
          <div class="driver-reports">
            <div class="driver-bar-graph">
              <DiversityDriverBar
              :bar-data="driverBarData"
              ></DiversityDriverBar>
              <!-- <DiversityDriverDonught
              ></DiversityDriverDonught> -->
            </div>
            <div class="driver-table">
              <DiversityDriverTable
                :table-data="driverTableData"
              ></DiversityDriverTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { format, subDays } from 'date-fns';
import DiversityTopBar from './diversity-component/diversity-top-bar';
import DiversityOvertimeStats from './diversity-component/diversity-overtime-stats';
import DiversitySortByNav from './diversity-component/diversity-sort-by-nav';
import DiversityOvertimeBar from './diversity-component/diversity-overtime-bar';
import DiversityOvertimeTable from './diversity-component/diversity-overtime-table';
import DiversityDriverBar from './diversity-component/diversity-driver-bar';
// import DiversityDriverDonught from './diversity-component/diversity-driver-donught';
import DiversityDriverTable from './diversity-component/diversity-driver-table';

export default {
  name: 'DiversityReport',

  components: {
    DiversityTopBar,
    DiversityOvertimeStats,
    DiversitySortByNav,
    DiversityOvertimeBar,
    DiversityOvertimeTable,
    DiversityDriverBar,
    // DiversityDriverDonught,
    DiversityDriverTable
  },

  data () {
    return {
      sortOptions: {},
      // sortOptions: {
      //   location: 'Location',
      //   site: 'Site',
      //   department: 'Department',
      //   gender: 'Gender',
      //   business: 'Business',
      //   grade: 'Grade',
      //   hrbp: 'HR Business Partner',
      //   hr_manager: 'HR Manager',
      //   cluster: 'Cluster',
      // },
      filterOptions: {},
      chartData: {
        default: [],
        selected: []
      },
      sortByKey: '',
      selectedfilters: [],
      reportDate: {
        start: format(subDays(new Date(), 365), 'yyyy-MM-dd'),
        end: format(new Date(), 'yyyy-MM-dd')
      },
      trendsData: {
        default: [],
        selected: {}
      },
      overtimeBarData: {},
      overtimeTableData: [],
      driverBarData: {},
      driverTableData: {}
    };
  },

  created () {
    this.getSortOptions();
    this.getDiversityReport();
  },

  methods: {
    toggleReportFilter () {},
    resetReportFilters () {},
    reportDateFilters () {},
    onClickSortBy () {},

    getSortOptions () {
      const queryParams = {
        options: 'sort_option,filter_options'
      };
      axios.get(`${process.env.VUE_APP_API_URL}reports/get_report_options`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          this.filterOptions = response.data.queryset_filter_options;
          this.sortOptions = response.data.queryset_sort_options;
          if (this.sortOptions) {
            delete this.sortOptions.gender;
          }
        }
      });
    },
    getDiversityReport () {
      // https://api-dev.amara.ai/feedback_bot/reports/get_diversity_report?
      const queryParams = {
        // options: 'sort_option,filter_options',
        fields: 'datewise_sorted_report,driverwise_sorted_report'
      };
      axios.get(`${process.env.VUE_APP_API_URL}reports/get_diversity_report`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          // console.log('response.data', response.data);
          this.overtimeBarData = response.data.datewise_gender_enagagement_report;
          this.overtimeTableData = response.data.datewise_sorted_gender_enagagement_report;
          this.driverBarData = response.data.driverwise_gender_enagagement_report;
          this.driverTableData = response.data.driverwise_sorted_gender_enagagement_report;
          // this.filterOptions = response.data.queryset_filter_options;
          // this.sortOptions = response.data.queryset_sort_options;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.diversity-report-wrap {
  .report-container {
    background-color: var(--bg-panel);
    height: 74vh;
    overflow: hidden;
    border-radius: 12px;
    margin: 0 10px;
    .report-wrap {
      // margin: 0 20px;
      padding: 0 20px;
      height: 70vh;
      overflow-y: auto;
      // overflow-x: hidden;
      .bar-wrap {
        // display: grid;
        // grid-template-columns: 1fr;
        margin-top: 20px;
        .report-title {
          padding-bottom: 14px;
          color: var(--color-text);
          font-size: var(--heading-size);
          font-weight: var(--heading-weight);
        }
        .report-bar-graph {
          // margin-right: 10px;
          display: grid;
          grid-template-columns: 2fr 5fr;
          height: 450px;
          background: var(--bg);
          border-radius: 0.5rem;
        }
        .overtime-table {
          margin: 20px 0;
          display: grid;
          grid-template-columns: 1fr;
          background: var(--bg);
          // border-radius: 0.5rem;
          overflow: hidden;
        }
        .driver-reports {
          .report-title {
            padding: 16px 0 6px 0;
            color: var(--color-text);
            font-size: var(--heading-size);
            font-weight: var(--heading-weight);
          }
          .driver-bar-graph {
            margin: 20px 0;
            display: grid;
            grid-template-columns: 5fr 4fr;
            // height: 600px;
            background: var(--bg);
            border-radius: 0.5rem;
          }
          .driver-table {
            margin: 20px 0;
            display: grid;
            grid-template-columns: 1fr;
            background: var(--bg);
            // border-radius: 0.5rem;
            overflow: hidden;
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
