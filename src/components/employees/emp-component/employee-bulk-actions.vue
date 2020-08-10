<template>
  <div class="emp-bulk-action-wrap">
    <div class="d-flex flex-row" v-if="bulkStatus.show">
      <div class="bulk-status" :class="bulkStatus.actionStatus ? 'primary' : 'success'">
        <v-flex lg1>
          <v-btn v-if="bulkStatus.actionStatus" :loading="true" color="#fff" text></v-btn>
          <v-icon v-if="!bulkStatus.actionStatus" small class="bulk-status-check">
            fas fa-check
          </v-icon>
        </v-flex>
        <v-flex lg10>
          <div v-if="bulkStatus.action === 'status'">
            <div class="bulk-status-text" v-if="bulkStatus.actionStatus">
              Updating status for {{sessionEmployeesCount}} employee(s). This might take a while.
            </div>
            <div class="bulk-status-text" v-if="!bulkStatus.actionStatus">
              {{bulkStatus.successCount}} employee(s) updated successfully.&nbsp;
              <span
                v-if="bulkStatus.errorCount > 0"
                class="bulk-error-link" @click="openSocketResponse()"
              >
                {{bulkStatus.errorCount}} error occured.
              </span>
            </div>
          </div>
          <div v-if="bulkStatus.action === 'assignedTo'">
            <div class="bulk-status-text" v-if="bulkStatus.actionStatus">
              Assigning {{sessionEmployeesCount}} employee(s) to
              {{bulkStatus.assignedTo}}. This might take a while.
            </div>
            <div class="bulk-status-text" v-if="!bulkStatus.actionStatus">
              {{bulkStatus.successCount}} employee(s) assigned successfully.&nbsp;
              <span
                v-if="bulkStatus.errorCount > 0"
                class="bulk-error-link" @click="openSocketResponse()"
              >
                {{bulkStatus.errorCount}} error occured.
              </span>
            </div>
          </div>
          <div v-if="bulkStatus.action === 'acknowledge'">
            <div class="bulk-status-text" v-if="bulkStatus.actionStatus">
              Sending acknowledgement email to
              {{sessionEmployeesCount}} employee(s). This might take a while.
            </div>
            <div class="bulk-status-text" v-if="!bulkStatus.actionStatus">
              {{bulkStatus.successCount}} employee(s) acknowledged successfully.&nbsp;
              <span
                v-if="bulkStatus.errorCount > 0"
                class="bulk-error-link" @click="openSocketResponse()"
              >
                {{bulkStatus.errorCount}} error occured.
              </span>
            </div>
          </div>
          <div v-if="bulkStatus.action === 'email'">
            <div class="bulk-status-text" v-if="bulkStatus.actionStatus">
              Sending email to {{sessionEmployeesCount}} employee(s). This might take a while.
            </div>
            <div class="bulk-status-text" v-if="!bulkStatus.actionStatus">
              Email sent to {{bulkStatus.successCount}}
              employee(s) successfully.&nbsp;
              <span
                v-if="bulkStatus.errorCount > 0"
                class="bulk-error-link" @click="openSocketResponse()"
              >
                {{bulkStatus.errorCount}} error occured.
              </span>
            </div>
          </div>
          <div v-if="bulkStatus.action === 'sms'">
            <div class="bulk-status-text" v-if="bulkStatus.actionStatus">
              Sending SMS to {{sessionEmployeesCount}} employee(s). This might take a while.
            </div>
            <div class="bulk-status-text" v-if="!bulkStatus.actionStatus">
              SMS sent to {{bulkStatus.successCount}} employee(s) successfully.&nbsp;
              <span
                v-if="bulkStatus.errorCount > 0"
                class="bulk-error-link" @click="openSocketResponse()">
                {{bulkStatus.errorCount}} error occured.
              </span>
            </div>
          </div>
          <div v-if="bulkStatus.action === 'extraAction'">
            <div class="bulk-status-text" v-if="bulkStatus.actionStatus">
              Updating {{selectedEmployeesCount}} employee(s). This might take a while.
            </div>
            <div class="bulk-status-text" v-if="!bulkStatus.actionStatus">
              {{bulkStatus.successCount}} employee(s) updated successfully.&nbsp;
              <span
                v-if="bulkStatus.errorCount > 0"
                class="bulk-error-link" @click="openSocketResponse()"
              >
                {{bulkStatus.errorCount}} error occured.
              </span>
            </div>
          </div>
        </v-flex>
        <v-flex lg1>
          <v-icon small class="bulk-status-close" @click="bulkStatusClose()">
            fas fa-times
          </v-icon>
        </v-flex>
      </div>
    </div>
    <div class="bulk-actions intro-y">
      <div class="left-side">
        <div style="width: 30px;"></div>
        <div class="action check" v-if="!bulkStatus.show">
          <v-checkbox
            class="pa-0 ma-0"
            id="BulkSelect"
            hide-details
            color="primary"
            v-model="bulkCheck"
            label="Select all"
            @change="bulktoggleAll"
          ></v-checkbox>
        </div>
        <div v-if="selectedEmployeesCount > 0 && !bulkStatus.show" class="action icon">
          <span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  v-on="on"
                  color="primary"
                  @click.stop="openBulkWarnDialog('email', null)"
                >fas fa-envelope</v-icon>
              </template>
              Email
            </v-tooltip>
          </span>
        </div>
        <div v-if="selectedEmployeesCount > 0 && !bulkStatus.show" class="action icon">
          <span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  v-on="on"
                  color="primary"
                  @click.stop="openBulkWarnDialog('sms', null)"
                >fas fa-comment</v-icon>
              </template>
              Send SMS
            </v-tooltip>
          </span>
        </div>
        <div v-if="selectedEmployeesCount > 0 && !bulkStatus.show" class="action icon">
          <span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  v-on="on"
                  color="primary"
                  @click.stop="openBulkWarnDialog('acknowledge', 'acknowledge_chat')"
                >fas fa-check-square</v-icon>
              </template>
              Acknowledge
            </v-tooltip>
          </span>
        </div>
        <div v-if="selectedEmployeesCount > 0 && !bulkStatus.show" class="action icon">
          <span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  v-on="on"
                  color="primary"
                  @click.stop="bulkAmaraIntration(false)"
                >fas fa-user-times</v-icon>
              </template>
              Disable Amara's chat
            </v-tooltip>
          </span>
        </div>
        <div v-if="selectedEmployeesCount > 0 && !bulkStatus.show" class="action icon">
          <span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  v-on="on"
                  color="primary"
                  @click.stop="bulkAmaraIntration(true)"
                >fas fa-user-check</v-icon>
              </template>
              Enable Amara's chat
            </v-tooltip>
          </span>
        </div>
        <div v-if="selectedEmployeesCount > 0 && !bulkStatus.show" class="action icon">
          <span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  v-on="on"
                  color="primary"
                  @click.stop="bulkHighPotential(false)"
                >far fa-star</v-icon>
              </template>
              Unmark as high potential
            </v-tooltip>
          </span>
        </div>
        <div v-if="selectedEmployeesCount > 0 && !bulkStatus.show" class="action icon">
          <span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  v-on="on"
                  color="primary"
                  @click.stop="bulkHighPotential(true)"
                >fas fa-star</v-icon>
              </template>
                Mark as high potential
            </v-tooltip>
          </span>
        </div>
        <div class="mx-1" v-if="selectedEmployeesCount > 0 && !bulkStatus.show">
          <!-- <v-overflow-btn
            class="statusSelect"
            :items="bulkStatusOption"
            label="Update status"
            editable
            item-value="val"
            v-model="updateStatus"
            @keypress.enter="removeStatus($event)"
          ></v-overflow-btn> -->
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="box-container zoom-in"
              >
                <span>Resolution status</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <v-icon>fas fa-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in bulkStatusOption"
                :key="index"
                @click="openBulkWarnDialog('status', item.val)"
              >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="mx-1" v-if="selectedEmployeesCount > 0 && !bulkStatus.show">
          <!-- <v-overflow-btn
            class="assignSelect"
            hide-details
            :items="assignedToList"
            label="Assign To"
            editable
            item-value="id"
            v-model="assignedToUser"
            @keypress.enter="removeAssignedTo($event)"
          ></v-overflow-btn> -->
          <v-menu
            offset-y
            max-width="auto"
            min-width="auto"
            max-height="300"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="box-container zoom-in"
              >
                <span>Assigned To</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <v-icon>fas fa-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <input type="text"
                    class="assign-text-input"
                    name="searchAssignedTo"
                    placeholder="Search..."
                    id="searchAssignedTo"
                    v-model="searchAssignedToUser"
                    @keyup="searchAssignedTo()"
                  >
                </v-list-item-title>
              </v-list-item>
              <hr>
              <v-list-item
                v-for="(item, index) in searchAssignedTo()"
                :key="index"
                @click="updateBulkAssignedTo(item.id, item.text)"
              >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <div class="right-side">
        <div class="mx-1">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="box-container zoom-in"
              >
                <v-icon small>fas fa-cloud-download-alt</v-icon>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <span>Download report</span>
              </v-btn>
            </template>
            <v-list style="width: 500px;padding:0">
              <v-list-item
                @click="openReportDialog('filtered')"
                class="custom-tile"
                style="padding: 1%;"
              >
                <v-list-item-title>
                  <v-icon small class="ml-2">fas fa-eye</v-icon>
                  Currently Filtered
                </v-list-item-title>
                <v-list-item-sub-title style="line-height: 1.2;">
                  Export the list of all employees <br/>
                  that are currently shown in the <br/>
                  table on the page.
                </v-list-item-sub-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                @click="openReportDialog()"
                class="custom-tile"
                style="padding: 1%;"
              >
                <v-list-item-title>
                  <v-icon small class="ml-2">fas fa-user-friends</v-icon>
                  All Employees
                </v-list-item-title>
                <v-list-item-sub-title style="line-height: 1.2;">
                  Export the list of all employees <br/>
                  that are present in <br/>{{user.company_name}}.
                </v-list-item-sub-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="mx-1">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="box-container zoom-in"
              >
                <v-icon small>fas fa-plus</v-icon>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <span>Add employees</span>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="openBulkUploadDialog">
                <v-list-item-title>Bulk Employees</v-list-item-title>
              </v-list-item>
              <v-list-item @click="openUploadDialog">
                <v-list-item-title>Single Employee</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="mx-1">
          <v-btn
            class="box-container zoom-in"
            @click.stop="toggleFilter()"
          >
            <v-icon small>fas fa-filter</v-icon>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <span>Filters</span>
          </v-btn>
        </div>
        <div class="mx-1">
          <v-btn
            class="box-container zoom-in"
            v-if="isFilterApplied"
            @click="resetFilters"
          >
            Remove filters
          </v-btn>
        </div>
      </div>
    </div>

    <download-Report-Dialog ref="reportDialog" :all-columns="allColumns"></download-Report-Dialog>
    <upload-Single-Employee ref="uploadSingleEmployee"></upload-Single-Employee>
    <upload-Bulk-Employees ref="uploadBulkEmployee"></upload-Bulk-Employees>
  </div>
</template>

<script>
// import { VChip, VOverflowBtn, VTooltip, VCheckbox } from 'vuetify';
import { mapState } from 'vuex';
import axios from 'axios';

import DownloadReportDialog from '../dialogs/DownloadReport';
import UploadSingleEmployee from '../upload-single-employee';
import UploadBulkEmployees from '../upload-bulk-employee';

export default {
  name: 'EmployeeBulkActions',

  components: {
    // VOverflowBtn,
    // VTooltip,
    // VChip,
    // VCheckbox,
    DownloadReportDialog,
    UploadSingleEmployee,
    UploadBulkEmployees
  },

  props: {
    assignedToList: {
      required: true,
      type: [Object, Array]
    },
    selectedEmployeesCount: {
      required: true,
      type: Number
    },
    employees: {
      required: true,
      type: [Array, Object]
    },
    bulkTogglePagination: {
      required: true,
      type: Boolean
    },
    isFilterApplied: {
      required: false,
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      bulkCheck: false,
      // assignedToUser: undefined,
      // updateStatus: undefined,
      searchAssignedToUser: '',
      allColumns: [],
      bulkStatusOption: [
        {
          text: 'Acknowledge',
          val: 'acknowledge_chat'
        },
        {
          text: 'In Progress',
          val: 'inProgress'
        },
        {
          text: 'Resolved',
          val: 'resolved'
        }
      ]
    };
  },

  computed: {
    ...mapState({
      user: state => state.user,
      bulkStatus: state => state.bulkStatus,
      sessionEmployeesCount: state => state.sessionEmployeesCount
    })
  },

  methods: {
    bulkStatusClose () {
      this.bulkStatus.show = false;
    },
    getEmployeeLength () {
      if (this.employees && this.employees.length > 0) {
        return this.employees.length;
      }
      return 0;
    },
    bulktoggleAll () {
      this.$emit('bulktoggleAll', this.bulkCheck);
    },
    resetBulkEmployees () {
      this.$emit('resetBulkEmployees');
    },
    openBulkWarnDialog (bulkActionType, val) {
      const t = {
        bulkActionType,
        val
      };
      this.$emit('openBulkWarnDialog', t);
    },
    openSocketResponse () {
      this.$emit('openSocketResponse');
    },
    bulkAmaraIntration (flag) {
      this.$emit('bulkAmaraIntration', flag);
    },
    bulkHighPotential (flag) {
      this.$emit('bulkHighPotential', flag);
    },
    removeAssignedTo (ev) {
      const val = ev && ev.srcElement && ev.srcElement.value ? ev.srcElement.value : '';
      if (!val || val === '') {
        const t = {};
        t.display_name = 'Unassigned';
        t.user_id = null;
        // this.assignedToUser = undefined;
        this.openBulkWarnDialog('assign', t);
      }
    },
    removeStatus (ev) {
      const val = ev && ev.srcElement && ev.srcElement.value ? ev.srcElement.value : '';
      if (!val || val === '') {
        // this.updateStatus = undefined;
      }
    },
    updateBulkAssignedTo (id, name) {
      const t = {};
      // const idx = this.assignedToList.findIndex(val => val.id === id);
      // if (idx > -1) {
      t.display_name = name;
      t.user_id = id;
      this.openBulkWarnDialog('assign', t);
      // }
    },
    resetFilters () {
      this.$emit('resetFilters');
    },
    toggleFilter () {
      this.$emit('toggleFilter');
    },
    openReportDialog (dataFilters) {
      this.getAllColumns();
      this.$refs.reportDialog.reportDialog = true;
      this.$refs.reportDialog.filterType = dataFilters;
    },
    openBulkUploadDialog () {
      this.$refs.uploadBulkEmployee.open = true;
    },
    openUploadDialog () {
      this.$refs.uploadSingleEmployee.open = true;
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
    },
    searchAssignedTo () {
      const filter = this.assignedToList;
      if (this.searchAssignedToUser) {
        // eslint-disable-next-line max-len
        const tempData = filter.filter(r => r.text.toLowerCase().indexOf(this.searchAssignedToUser.toLowerCase()) >= 0);
        return tempData;
      }
      return filter;
    }
  },

  watch: {
    selectedEmployeesCount () {
      if (this.selectedEmployeesCount === this.getEmployeeLength()) {
        this.bulkCheck = true;
      } else {
        this.bulkCheck = false;
      }
    },
    bulkTogglePagination () {
      this.bulkCheck = this.bulkTogglePagination;
    }
    // assignedToUser() {
    //   if (this.assignedToUser) {
    //     this.updateBulkAssignedTo(this.assignedToUser);
    //   }
    // },
    // updateStatus() {
    //   if (this.updateStatus) {
    //     this.openBulkWarnDialog('status', this.updateStatus);
    //   }
    // },
  }
};
</script>

<style lang="scss" scoped>
.emp-bulk-action-wrap {
  padding: 20px 0;
  .bulk-status {
    display: flex;
    width: 100%;
    margin: 0 15px;
    height: 50px;
    border-radius: 10px;
    margin-bottom: 12px;
    &.primary {
      background-color: var(--v-primary-base);
    }
    &.success {
      background-color: #4caf50;
    }
    .bulk-status-text {
      padding: 13px 0 0 0;
      margin-left: -30px;
      color: #fff;
    }
    .bulk-status-close {
      font-size: 20px !important;
      margin-left: 70px;
      color: #fff;
      padding: 15px 0 0 0;
    }
    .bulk-status-check {
      font-size: 20px !important;
      margin-left: 30px;
      color: #fff;
      padding: 15px 0 0 0;
    }
    .bulk-error-link {
      text-decoration: underline;
      color: #004d9f;
      cursor: pointer;
    }
  }

  .bulk-actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    &.intro-y {
      // z-index: 48;
      opacity: 0;
      position: relative;
      transform: translateY(50px);
      animation: 0.4s intro-y-animation ease-in-out 0.33333s;
      animation-fill-mode: forwards;
      animation-delay: 0.2s;
    }
    .left-side {
      display: flex;
      .action {
        display: grid;
        align-items: center;
      }
      .icon {
        padding: 0 8px;
      }
    }
    .right-side {
      display: flex;
      justify-content: flex-end;
    }
    .v-btn:hover:before {
      background-color: var(--bg);
    }
    @keyframes intro-y-animation {
      100% {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }
}
</style>

<style lang="scss">
.assign-text-input {
  border: 1px solid var(--color-palceholder);
  border-radius: 0.375rem;
  height: 32px;
  outline: none;
  padding-left: 12px;
}
// .emp-bulk-action-wrap {
//   .assignSelect {
//     margin: 0 5px;
//     .v-input__control {
//       &::before {
//         content: none !important;
//         height: 0px !important;
//         border-width: 0 0 0 0;
//       }
//     }
//     .v-input__slot {
//       background: #ffffff;
//       &::before {
//         content: none !important;
//         height: 0px !important;
//         border-width: 0 0 0 0;
//       }
//       &::after {
//         content: none !important;
//         height: 0px !important;
//         border-width: 0 0 0 0;
//       }
//       .v-select__slot {
//         height: 38px !important;
//       }
//       .v-input__append-inner {
//         width: 38px !important;
//         height: 38px !important;
//         border-left: 1px solid rgba(0,0,0,0.12);
//       }
//     }
//   }
//   .statusSelect {
//     margin: 0 5px;
//     .v-input__control {
//       &::before {
//         content: none !important;
//         height: 0px !important;
//         border-width: 0 0 0 0;
//       }
//     }
//     .v-input__slot {
//       background: #ffffff;
//       &::before {
//         content: none !important;
//         height: 0px !important;
//         border-width: 0 0 0 0;
//       }
//       &::after {
//         content: none !important;
//         height: 0px !important;
//         border-width: 0 0 0 0;
//       }
//       .v-select__slot {
//         height: 38px !important;
//       }
//       .v-input__append-inner {
//         width: 38px !important;
//         height: 38px !important;
//         border-left: 1px solid rgba(0,0,0,0.12);
//       }
//     }
//   }
// }
</style>
