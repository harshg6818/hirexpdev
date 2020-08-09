<template>
  <nav class="top-nav">
    <ul>
      <li>
        <div class="top-menu">
          <div class="top-menu__title"> Employees </div>
        </div>
      </li>
      <li>
        <div class="top-menu"
          :class="activeEmpView === 'active' ? 'top-menu--active' : ''"
          @click="activeEmpView = 'active';getEmployeesList()"
        >
          <div class="top-menu__title"> Active </div>
        </div>
      </li>
      <li>
        <div class="top-menu"
          :class="activeEmpView === 'exit' ? 'top-menu--active' : ''"
          @click="activeEmpView = 'exit';getEmployeesList()"
        >
          <div class="top-menu__title"> Exited </div>
        </div>
      </li>
    </ul>
  </nav>
  <!-- <div class="emp-bar-wrap">
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
    </div> -->
    <!-- download report dialog -->
  <!-- </div> -->
</template>

<script>
import { mapState } from 'vuex';
// import axios from 'axios';

// import DownloadReportDialog from '../dialogs/DownloadReport';
// import UploadSingleEmployee from '../upload-single-employee';
// import UploadBulkEmployees from '../upload-bulk-employee';

export default {
  name: 'EmployeeTopBar',

  // components: {
  //   DownloadReportDialog,
  //   UploadSingleEmployee,
  //   UploadBulkEmployees
  // },

  props: {
    totalCount: {
      required: true,
      type: Number
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
    getEmployeesList () {
      this.$emit('getEmployeesList', this.activeEmpView);
    }
    // resetFilters() {
    //   this.$emit('resetFilters');
    // },
    // openBulkUploadDialog() {
    //   this.$refs.uploadBulkEmployee.open = true;
    // },
    // openUploadDialog() {
    //   this.$refs.uploadSingleEmployee.open = true;
    // },
    // openReportDialog(dataFilters) {
    //   this.getAllColumns();
    //   this.$refs.reportDialog.reportDialog = true;
    //   this.$refs.reportDialog.filterType = dataFilters;
    // },
    // toggleFilter() {
    //   this.$emit('toggleFilter');
    // },
    // getAllColumns() {
    //   axios.get(`${process.env.VUE_APP_API_URL}reports/custom_report/source_mapping`)
    //     .then((response) => {
    //       if (response && response.data && response.data.data && response.data.data.source_mapping) {
    //         this.allColumns = response.data.data.source_mapping;
    //       } else {
    //         this.$store.dispatch('updateSnackbar', {
    //           color: 'error',
    //           show: true,
    //           text: 'Unable to get report data, Please try again later!',
    //         });
    //       }
    //     }, (response) => {
    //       // console.log(response);
    //       this.$store.dispatch('updateSnackbar', {
    //         color: 'error',
    //         show: true,
    //         text: 'Unable to get report data, Please try again later!',
    //       });
    //       throw new Error(response.data);
    //     });
    // },
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

<style lang="scss" scoped>
.top-nav {
  z-index: 0;
  position: relative;
  ul {
    padding: 0px 50px !important;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      position: relative;
      .top-menu {
        height: 55px;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        display: flex;
        align-items: center;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        margin-right: 0.25rem;
        color: var(--color-text);
        font-size: var(--heading-size);
        // font-weight: var(--heading-weight);
        position: relative;
        .top-menu__title {
          display: flex;
          align-items: center;
          white-space: nowrap;
          cursor: pointer;
        }
        &.top-menu--active {
          background-color: var(--bg-panel);
          animation: 0.4s intro-active-menu-animation ease-in-out 0.33333s;
          animation-fill-mode: forwards;
          :before {
            content: "";
            width: 20px;
            height: 20px;
            margin-left: -20px;
            transform: rotate(90deg) scale(1.04);
            background-size: 100%;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='259.51' height='259.52' viewBox='0 0 259.51 259.52'%3E%3Cpath id='Path_143' data-name='Path 143' d='M8659.507,423.965c-.167-2.608.05-5.319-.19-8.211-.084-1.012-.031-2.15-.118-3.12-.113-1.25-.1-2.682-.236-4.061-.172-1.722-.179-3.757-.365-5.394-.328-2.889-.478-5.857-.854-8.61-.509-3.714-.825-7.252-1.38-10.543-.934-5.535-2.009-11.312-3.189-16.692-.855-3.9-1.772-7.416-2.752-11.2-1.1-4.256-2.394-8.149-3.687-12.381-1.1-3.615-2.366-6.893-3.623-10.493-1.3-3.739-2.917-7.26-4.284-10.7-1.708-4.295-3.674-8.078-5.485-12.023-1.145-2.493-2.5-4.932-3.727-7.387-1.318-2.646-2.9-5.214-4.152-7.518-1.716-3.16-3.517-5.946-5.274-8.873-1.692-2.818-3.589-5.645-5.355-8.334-2.326-3.542-4.637-6.581-7.039-9.848-2.064-2.809-4.017-5.255-6.088-7.828-2.394-2.974-4.937-5.936-7.292-8.589-3.027-3.411-6.049-6.744-9.055-9.763-2.4-2.412-4.776-4.822-7.108-6.975-3-2.767-5.836-5.471-8.692-7.854-3.332-2.779-6.657-5.663-9.815-8.028-2.958-2.216-5.784-4.613-8.7-6.6-3.161-2.159-6.251-4.414-9.219-6.254-3.814-2.365-7.533-4.882-11.168-6.89-4.213-2.327-8.513-4.909-12.478-6.834-4.61-2.239-9.234-4.619-13.51-6.416-4.1-1.725-8.11-3.505-11.874-4.888-4.5-1.652-8.506-3.191-12.584-4.47-6.045-1.9-12.071-3.678-17.431-5-9.228-2.284-17.608-3.757-24.951-4.9-7.123-1.112-13.437-1.64-18.271-2.035l-2.405-.2c-1.638-.136-3.508-.237-4.633-.3a115.051,115.051,0,0,0-12.526-.227h259.51Z' transform='translate(-8399.997 -164.445)' fill='%23f1f5f8'/%3E%3C/svg%3E%0A");
            position: absolute;
            bottom: 0;
            left: 0;
          }
          :after {
            content: "";
            width: 20px;
            height: 20px;
            margin-right: -20px;
            transform: rotate(180deg) scale(1.04);
            background-size: 100%;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='259.51' height='259.52' viewBox='0 0 259.51 259.52'%3E%3Cpath id='Path_143' data-name='Path 143' d='M8659.507,423.965c-.167-2.608.05-5.319-.19-8.211-.084-1.012-.031-2.15-.118-3.12-.113-1.25-.1-2.682-.236-4.061-.172-1.722-.179-3.757-.365-5.394-.328-2.889-.478-5.857-.854-8.61-.509-3.714-.825-7.252-1.38-10.543-.934-5.535-2.009-11.312-3.189-16.692-.855-3.9-1.772-7.416-2.752-11.2-1.1-4.256-2.394-8.149-3.687-12.381-1.1-3.615-2.366-6.893-3.623-10.493-1.3-3.739-2.917-7.26-4.284-10.7-1.708-4.295-3.674-8.078-5.485-12.023-1.145-2.493-2.5-4.932-3.727-7.387-1.318-2.646-2.9-5.214-4.152-7.518-1.716-3.16-3.517-5.946-5.274-8.873-1.692-2.818-3.589-5.645-5.355-8.334-2.326-3.542-4.637-6.581-7.039-9.848-2.064-2.809-4.017-5.255-6.088-7.828-2.394-2.974-4.937-5.936-7.292-8.589-3.027-3.411-6.049-6.744-9.055-9.763-2.4-2.412-4.776-4.822-7.108-6.975-3-2.767-5.836-5.471-8.692-7.854-3.332-2.779-6.657-5.663-9.815-8.028-2.958-2.216-5.784-4.613-8.7-6.6-3.161-2.159-6.251-4.414-9.219-6.254-3.814-2.365-7.533-4.882-11.168-6.89-4.213-2.327-8.513-4.909-12.478-6.834-4.61-2.239-9.234-4.619-13.51-6.416-4.1-1.725-8.11-3.505-11.874-4.888-4.5-1.652-8.506-3.191-12.584-4.47-6.045-1.9-12.071-3.678-17.431-5-9.228-2.284-17.608-3.757-24.951-4.9-7.123-1.112-13.437-1.64-18.271-2.035l-2.405-.2c-1.638-.136-3.508-.237-4.633-.3a115.051,115.051,0,0,0-12.526-.227h259.51Z' transform='translate(-8399.997 -164.445)' fill='%23f1f5f8'/%3E%3C/svg%3E%0A");
            position: absolute;
            bottom: 0;
            right: 0;
          }
          .top-menu__title {
            color: var(--color-headings);
            font-weight: var(--heading-weight);
          }
        }
        &:not(.top-menu--active) {
          opacity: 0;
          transform: translateY(50px);
          animation: 0.4s intro-menu-animation ease-in-out 0.33333s;
          animation-fill-mode: forwards;
          animation-delay: 0.2s;
        }
      }
      @keyframes intro-active-menu-animation {
        100% {
          z-index: 10;
        }
      }
      @keyframes intro-menu-animation {
        100% {
          opacity: 1;
          transform: translateX(0px);
        }
      }
    }
  }
}
</style>
