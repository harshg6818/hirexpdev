import axios from 'axios';

const props = {
};

const computed = {
};

const methods = {
  getStages () {
    this.table.loading = true;
    // if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
    //   this.filters.selected = this.dashboardFilters.filters;
    //   this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
    // }
    const queryParams = {
      // initiated_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
      // initiated_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
      // user__profile__high_potential_emp: this.dashboardFilters.highPotential,
    };
    // this.$lodash.each(this.filters.selected, (v, k) => {
    //   if (v.length > 0) {
    //     queryParams[`user__profile__${k}__in`] = v.join();
    //   }
    // });
    this.npsBreakdown = [];
    axios.get(`${process.env.VUE_APP_API_URL}stage/list?fields=id,title,status,stageIndex,createdAt,drivers_analysis,mood_analysis,stage_participation_stats,stage_nps_breakdown,driver_analysis_delta`, {
      params: queryParams
    }).then((response) => {
      this.table.loading = false;
      // this.config.initialLoading = false;
      if (response && response.data) {
        const temp = response.data.data;
        this.$lodash.each(temp, (milestone, index) => {
          milestone.milestoneIndex = index;
        });
        this.table.stage = temp;
        this.table.totalItems = response.data.total_count;
        this.sortStageData();
      }
    }, (response) => {
      this.table.loading = false;
      this.config.initialLoading = false;
      this.$store.dispatch('updateSnackbar', {
        color: 'error',
        show: true,
        text: 'Unable to fetch touchpoints, Please try again later!'
      });
      throw new Error(response);
    });
  }
};

export default {
  props,
  computed,
  methods
};
