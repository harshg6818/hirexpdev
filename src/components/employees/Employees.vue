<template>
  <div class="employeeVue">
    <div v-if="!singleEmpView">
      <EmployeeList
        :employees="employees"
        :total-count="totalEmployees"
        :employees-type="getEmployeeListType"
        :assigned-to-list="assignedToList"
        @getEmployees="getTeam"
        @viewEmpDashboard="changeEmpView"
        @getEmployeesList="getEmployeesList"
      ></EmployeeList>
    </div>

    <!-- single emp view comp -->
    <v-layout v-if="singleEmpView" class="single-emp-view">
      <v-flex xs2>
        <SingleEmployeeList
          :employees="employees"
          :total-count="totalEmployees"
          @changeEmpView="changeEmpView"
          @getEmployees="getTeam"
          @getEmployeesList="getEmployeesList"
        ></SingleEmployeeList>
      </v-flex>
      <v-flex xs10>
        <SingleEmployeeDashboard ref="empDashboard"
        @getEmployees="getTeam"
        @changeEmpView="changeEmpView"
        :assigned-to-list="assignedToList"
        ></SingleEmployeeDashboard>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import {
//   VCheckbox,
//   VAvatar,
//   VTooltip,
//   VAlert,
//   VChip,
//   VProgressLinear,
//   VDialog,
//   VBottomSheet,
//   VMenu,
//   VSnackbar,
//   VSwitch,
// } from 'vuetify';
import VDateRange from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

import EmployeeList from './emp-component/employee-list';

import SingleEmployeeList from './emp-component/single-employee-list';
import SingleEmployeeDashboard from './emp-component/single-employee-dashboard';

Vue.use(VDateRange);

dayjs.extend(relativeTime);

export default {
  name: 'Employees',
  components: {
    // ContentLoader,
    // VCheckbox,
    // VAvatar,
    // VTooltip,
    // VAlert,
    // VChip,
    // VDialog,
    // VProgressLinear,
    // VBottomSheet,
    // VMenu,
    // VSnackbar,
    // VSwitch,
    EmployeeList,
    SingleEmployeeList,
    SingleEmployeeDashboard
  },
  data () {
    return {
      getEmployeeListType: 'active',
      employees: [],
      totalEmployees: 0,
      assignedToList: [],
      tabs: {
        active: 'tab-active',
        list: [
          {
            title: 'Active Employees',
            value: 'active'
          }, {
            title: 'Exited Employees',
            value: 'exit'
          }
        ]
      },
      config: {
        initialLoadingExit: true
      },
      pagination: {
        rowsPerPage: 10,
        page: 1
      },
      pageRefreshWithEmpId: false
    };
  },
  created () {
    this.getAssignedTo();
  },
  computed: {
    ...mapState({
      user: state => state.user,
      teamList: state => state.teamData,
      adminUsers (state) {
        const adminUsers = state.companyAdminsList;
        return adminUsers;
      },
      bulkStatus: state => state.bulkStatus,
      sessionEmployeesCount: state => state.sessionEmployeesCount,
      updateEmployeeFilters: state => state.updateEmployeeFilters,
      singleEmpView: state => state.singleEmpView,
      activeEmployee: state => state.activeEmployee
    })
  },
  beforeMount () {
    // this.$router
    // console.log('this.$router', this.$route.query.eId);
    if (this.$route && this.$route.query && this.$route.query.eId) {
      console.log('this.$router', this.$route.query.eId);
      this.pageRefreshWithEmpId = true;
      this.$store.dispatch('singleEmpView', true);
      this.changeEmpView(this.$route.query.eId);
    } else {
      this.getTeam();
    }
  },
  methods: {
    getDriverLabel (driver) {
      return driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    },
    checkPermission (permission) {
      let flag = false;
      this.$lodash.each(this.user.permissions, (perm) => {
        this.$lodash.each(permission, (v) => {
          if (v === perm) {
            flag = true;
          }
        });
      });
      return flag;
    },
    getAllColumns () {
      axios.get(`${process.env.VUE_APP_API_URL}reports/custom_report/source_mapping`)
        .then((response) => {
          if (response && response.data &&
            response.data.data && response.data.data.source_mapping) {
            this.allColumns = response.data.data.source_mapping;
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to get report data, Please try again later!'
            });
          }
        }, (response) => {
          // console.log(response);
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to get report data, Please try again later!'
          });
          throw new Error(response.data);
        });
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    search (string) {
      clearTimeout(this.timeout);
      // Make a new timeout set to go off in 800ms
      this.timeout = setTimeout(() => {
        this.getTeam(string);
      }, 500);
    },
    getAssignedTo () {
      const tempList = [];
      axios.get(`${process.env.VUE_APP_API_URL}users/admins`).then((response) => {
        if (response && response.data.data && response.data.data.length > 0) {
          this.$lodash.each(response.data.data, (val) => {
            const t = {};
            t.text = val.display_name;
            t.id = val.user_id;
            tempList.push(t);
          });
        } else {
          const noData = {};
          noData.title = 'No data available';
          noData.id = null;
          tempList.push(noData);
        }
      });
      this.assignedToList = []; // for reset the existing data
      this.assignedToList = tempList;
    },
    getEmployeesList (type) {
      if (type === 'active') {
        // status__in: active
        this.getEmployeeListType = 'active';
      } else if (type === 'exit') {
        this.getEmployeeListType = 'inactive';
      } else {
        this.getEmployeeListType = null;
      }
      this.getTeam();
    },
    getTeam (pageOfset, searchString) {
      // this.$store.dispatch('loadingEmployeesList', true);
      const filters = Object.assign({}, this.updateEmployeeFilters);
      if (filters && filters.filters) {
        // filters.filters have the dynamic filters value
        delete filters.filters;
      }
      const queryParams = {
        fields: 'display_name,email,id,department,last_milestone,mood,high_potential_emp,stage__title,last_triggered_stage,interactions_active,status,last_chat_action_status,last_chat_id,last_chat_session_id,last_chat_assignedTo,last_chat_assignedTo_email,last_chat_assignedTo_display_name,profilePicture,user_completed_session_count,last_chat_assignedTo_display_name,alert_raised,alert_words,engagement_score,interactions_active',
        count: 'true',
        page_limit: this.pagination.rowsPerPage,
        status__in: this.getEmployeeListType ? this.getEmployeeListType : undefined,
        page_offset: pageOfset,
        ...filters
      };
      if (searchString) {
        queryParams.raw_search_string = searchString;
      }
      if (this.updateEmployeeFilters && this.updateEmployeeFilters.filters) {
        this.$lodash.each(this.updateEmployeeFilters.filters, (v, k) => {
          if (v.length > 0) {
            queryParams[`${k}__in`] = v.join();
          }
        });
      }
      axios.get(`${process.env.VUE_APP_API_URL}users/list`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          this.$store.dispatch('employeesList', response.data);
          this.$store.dispatch('activeEmployee', response.data.data[0]);
          this.employees = response.data.data;
          this.totalEmployees = response.data.total_count;
          // this.$store.dispatch('loadingEmployeesList', false);
          if (this.singleEmpView && (searchString || searchString === '')) {
            // this.changeEmpView(this.employees[0].id);
          }
          if (this.singleEmpView && pageOfset > 0) {
            // this.changeEmpView(this.employees[0].id);
          }
        }
      });
    },
    changeEmpView (empId) {
      this.viewEmpDashboard(empId);
    },
    viewEmpDashboard (empId) {
      const queryParams = {
        fields: 'engagement_score,last_milestone,mood,high_potential_emp,latest_session_driver,latest_session_driverwise_subdrivers,last_chat_completedAt,user_session_count,user_inProgress_session_count,user_completed_session_count,user_completed_session_driverwise_subdrivers,user_latest_session_interactions,user_completed_session_mood,formatted_question_text,formatted_response_text,first_name,last_name,display_name,sub_type,email,location,phoneNumber,profilePicture,gender,designation,status,employee_id,department,user_id,last_chat_action_status,last_chat_id,last_chat_session_id,last_chat_assignedTo,last_chat_assignedTo_email,last_chat_assignedTo_display_name,interactions_active,alert_raised,alert_words,bio,alternateEmail,birthDate,skills,education,grade,experience,function,sub_department,last_login,exit_date,joining_date,manager,lastRating,hr_manager,site,cluster,cost_centre,team,teamHead,business,businessHead,hrbp'
      };
      axios.get(`${process.env.VUE_APP_API_URL}users/${empId}/details`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          if (this.pageRefreshWithEmpId) {
            const t = [];
            t.push(response.data);
            this.$store.dispatch('employeesList', { data: t, total_count: 1 });
            this.$store.dispatch('activeEmployee', response.data);
            this.$store.dispatch('singleEmpView', true);
          }
          this.$store.dispatch('activeEmployee', response.data);
          this.$store.dispatch('singleEmpView', true);
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch employee, Please try again later!'
        });
        throw new Error(response);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.employeeVue {
  // min-height: 100vh;
  overflow: hidden;
  .single-emp-view {
    background: #6f64b0;
    // background: linear-gradient(90deg, #61245e 0%, #42276f 90%);
    // min-height: 100vh;
  }
}
</style>
