<template>
  <div class="emp-bar-wrap">
    <div class="emp-bar">
      <div class="left-side">
        <div class="emp-title">
          Employees
        </div>
        <div
          class="emp-active cursor-pointer hover-link"
          :class="activeEmpView === 'active' ? 'active' : ''"
          @click="activeEmpView = 'active';getEmployeesList()"
        >
          <span>
            Active
          </span>
        </div>
        <div
          class="emp-exit cursor-pointer hover-link"
          :class="activeEmpView === 'exit' ? 'active' : ''"
          @click="activeEmpView = 'exit';getEmployeesList()"
        >
          <span>
            Exited
          </span>
        </div>
      </div>
      <div class="right-side">
        <div class="pt-1">
          <v-btn
            style="color:grey;"
            flat
            small
            v-if="isFilterApplied"
            @click="resetFilters"
          >
            Remove Filters
          </v-btn>
          <v-btn
            slot="activator"
            color="primary"
            small
            outline
            @click.stop="toggleFilter"
          >
            <v-icon small>fas fa-filter</v-icon>
            &nbsp;&nbsp;Filter
          </v-btn>
        </div>
        <div class="pt-1">
          <v-menu offset-y>
            <v-btn
              color="primary"
              slot="activator"
              outline
              small
              class="elevation-0 white--text"
            >
              <v-icon small class="ml-2">fas fa-cloud-download-alt</v-icon>
              &nbsp;&nbsp;Download Report
            </v-btn>
            <v-list style="width: 500px;padding:0">
              <v-list-tile
                @click="openReportDialog('filtered')"
                class="custom-tile"
                style="padding: 1%;"
              >
                <v-list-tile-title>
                  <v-icon small class="ml-2">fas fa-eye</v-icon>
                  Currently Filtered
                </v-list-tile-title>
                <v-list-tile-sub-title style="line-height: 1.2;">
                  Export the list of all employees <br/>
                  that are currently shown in the <br/>
                  table on the page.
                </v-list-tile-sub-title>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile
                @click="openReportDialog()"
                class="custom-tile"
                style="padding: 1%;"
              >
                <v-list-tile-title>
                  <v-icon small class="ml-2">fas fa-user-friends</v-icon>
                  All Employees
                </v-list-tile-title>
                <v-list-tile-sub-title style="line-height: 1.2;">
                  Export the list of all employees <br/>
                  that are present in <br/>{{user.company_name}}.
                </v-list-tile-sub-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
        <div class="pt-1">
          <v-menu offset-y>
            <v-btn
              color="primary"
              slot="activator"
              small
              outline
              class="elevation-0 white--text"
            >
              <v-icon>fas fa-plus</v-icon>
              &nbsp;&nbsp;Add Employees
            </v-btn>
            <v-list>
              <v-list-tile @click="openBulkUploadDialog">
                <v-list-tile-title>Bulk Employees</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="openUploadDialog">
                <v-list-tile-title>Single Employee</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
    <!-- <v-btn
      style="color:grey;"
      flat
      v-if="checkForFilters && filterApplied"
      @click="resetFilters"
    > -->

    <!-- download report dialog -->
    <!-- <DownloadReportDialog ref="reportDialog" :all-columns="allColumns"></DownloadReportDialog>
    <UploadSingleEmployee ref="uploadSingleEmployee"></UploadSingleEmployee>
    <UploadBulkEmployees ref="uploadBulkEmployee"></UploadBulkEmployees> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

// import DownloadReportDialog from '../dialogs/DownloadReport';
// import UploadSingleEmployee from '../upload-single-employee';
// import UploadBulkEmployees from '../upload-bulk-employee';

export default {
  name: 'EmployeeTopBar',

  // components: {
  //   DownloadReportDialog,
  //   UploadSingleEmployee,
  //   UploadBulkEmployees,
  // },

  props: {
    totalCount: {
      required: true,
      type: Number
    },
    isFilterApplied: {
      required: false,
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      searchString: '',
      allColumns: [],
      activeEmpView: 'active'
    };
  },

  computed: {
    ...mapState({
      user: state => state.user
    })
  },

  methods: {
    // searchEmployee() {
    //   setTimeout(() => {
    //     this.$emit('searchEmployee', this.searchString);
    //   }, 1000);
    // },
    getEmployeesList () {
      this.$emit('getEmployeesList', this.activeEmpView);
    },
    resetFilters () {
      this.$emit('resetFilters');
    },
    openBulkUploadDialog () {
      this.$refs.uploadBulkEmployee.open = true;
    },
    openUploadDialog () {
      this.$refs.uploadSingleEmployee.open = true;
    },
    openReportDialog (dataFilters) {
      this.getAllColumns();
      this.$refs.reportDialog.reportDialog = true;
      this.$refs.reportDialog.filterType = dataFilters;
    },
    toggleFilter () {
      this.$emit('toggleFilter');
    },
    getAllColumns () {
      axios.get(`${process.env.VUE_APP_API_URL}reports/custom_report/source_mapping`)
        .then((response) => {
          if (response && response.data && response.data.data && response.data.data.source_mapping) {
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
    }
  }
};
</script>

<style lang="scss">
.emp-bar-wrap {
  // background-color: rgba(0, 0, 0, 0.04);
  padding: 20px 0px;
  .emp-bar {
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
    transition: box-shadow 83ms;
    .left-side {
      display: flex;
      .emp-title {
        padding: 10px;
        font-size: 18px;
        border-right: 1px solid rgba(0,0,0,0.1);
        font-weight: 500;
        margin-right: 16px;
      }
      .emp-active {
        padding: 10px;
        font-size: 18px;
        font-weight: 400;
        &.active {
          border-bottom: 4px solid #4c3e9d;
          transition: .5s ease all;
        }
      }
      .emp-exit {
        padding: 10px;
        font-size: 18px;
        font-weight: 400;
        &.active {
          border-bottom: 4px solid #4c3e9d;
          transition: .5s ease all;
        }
      }
    }
    .right-side {
      display: flex;
    }
  }
}
</style>
