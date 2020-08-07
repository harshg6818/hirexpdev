import axios from 'axios';
import { mapState } from 'vuex';

const props = {};

const computed = {
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
};

const methods = {
  getOverview (stageId) {
    this.overall_disengaged_stats = null;
    this.resolved_disengaged_stats = null;
    this.employee_to_meet_stats = null;
    this.disengaged_exited_employee_stats = null;
    this.disengagedDrivers = [];
    this.monthwise_art = null;
    if (document.getElementById('monthwise_art')) {
      document.getElementById('monthwise_art').innerHTML = '';
    }
    this.casesResolutions = [];

    const fields = 'overall_disengaged_stats,resolved_disengaged_stats,employee_to_meet_stats,disengaged_exited_employee_stats,disengaged_driver_analysis,monthwise_art,chat_resolution_insights';
    let url = `${process.env.VUE_APP_API_URL}disengaged/overview?fields=${fields}`;
    if (this.$route.name === 'ViewLifecycle' && this.$route.params && this.$route.params.stageId) {
      url = `${process.env.VUE_APP_API_URL}disengaged/overview?fields=${fields}&stage_id=${this.$route.params.stageId}`;
    }
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
    axios.get(url, {
      params: queryParams
    })
      .then((response) => {
        if (response && response.data) {
          // this.config.initialLoading = false;

          this.overall_disengaged_stats = response.data.overall_disengaged_stats;
          this.resolved_disengaged_stats = response.data.resolved_disengaged_stats;
          this.employee_to_meet_stats = response.data.employee_to_meet_stats;
          this.disengaged_exited_employee_stats = response.data.disengaged_exited_employee_stats;

          if (this.overall_disengaged_stats && this.overall_disengaged_stats.disengaged_employees) {
            this.generateStacked(this.overall_disengaged_stats, 'total');
          }
          if (this.employee_to_meet_stats && this.employee_to_meet_stats.total_employees_to_meet) {
            this.generateStacked(this.employee_to_meet_stats, 'tomeet');
          }
          if (this.disengaged_exited_employee_stats && this.disengaged_exited_employee_stats.total_exited_employee) {
            this.generateStacked(this.disengaged_exited_employee_stats, 'exited');
          }

          if (response.data.chat_resolution_insights) {
            this.casesResolutions = response.data.chat_resolution_insights;
          }

          if (response.data.driver_breakdown) {
            const temp = response.data.driver_breakdown;
            this.$lodash.each(temp, (data, driver) => {
              this.disengagedDrivers.push({
                driver: data.driver,
                average: data.average,
                disengaged_employees: data.disengaged_employees,
                sub_drivers: data.sub_drivers
              });
            });
          }
          setTimeout(() => {
            this.$lodash.each(this.disengagedDrivers, (driverData, driver) => {
              // this.generateDonut(driverData, driver);
            });
          }, 100);

          if (response.data.monthwise_art) {
            this.monthwise_art = response.data.monthwise_art;
            this.generateDisengagedArt(response.data.monthwise_art.reverse());
          }
          // this.getEmployeesToMeet();
        } else {
          this.config.initialLoading = false;
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch data, Please try again later!'
        });
        throw new Error(response);
      });
  },
  getEngagementColor (score) {
    let color = '';
    if (score <= 3) {
      color = '#f44336';
    } else if (score <= 4) {
      color = '#ff9800';
    } else if (score <= 5) {
      color = '#37b99c';
    }
    return color;
  },
  getColor (e) {
    let color = 'primary';
    if (e.gender && e.gender === 'female') {
      color = 'pink';
    }
    return color;
  }
};

export default {
  props,
  computed,
  methods
};
