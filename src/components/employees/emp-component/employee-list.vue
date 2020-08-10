<template>
  <div class="employee-list-wrap">
    <!-- employee top bar-->
    <EmployeeTopBar
      :total-count="totalCount"
      @getEmployeesList="getEmployeesList"
    ></EmployeeTopBar>
    <div class="employee-lists" v-if="!loadingEmployeesList">
      <!-- employee bulk action bar -->
      <EmployeeBulkActions
        :assigned-to-list="assignedToList"
        :employees="employees"
        :selected-employees-count="selectedEmployeesCount"
        :bulk-toggle-pagination="bulkTogglePagination"
        :is-filter-applied="isFilterApplied"
        @bulktoggleAll="bulktoggleAll"
        @resetBulkEmployees="resetBulkEmployees"
        @openBulkWarnDialog="openBulkWarnDialog"
        @bulkAmaraIntration="bulkAmaraIntration"
        @bulkHighPotential="bulkHighPotential"
        @openSocketResponse="openSocketResponse"
        @toggleFilter="toggleFilter()"
        @resetFilters="resetFilters()"
      ></EmployeeBulkActions>

      <!-- employee filters drawer -->
      <EmployeeFilters
        ref="employeeFilters"
        :reset="isFilterApplied"
        @getEmployeesWithFilter="filterApplied"
        @empFiltersApplied="empFiltersApplied"
      ></EmployeeFilters>

      <!-- employee cards -->
      <div class="employees-container">
        <div
          class="emp-card my-2 py-2 box-container intro-x"
          :id="index"
          v-for="(e, index) in employees" :key="index"
        >
            <div class="pt-2 text-xs-center">
              <v-layout>
                <v-flex xs6 class="text-xs-center">
                  <div class="emp-checkbox">
                    <v-checkbox
                      :id="index.toString()"
                      hide-details
                      color="primary"
                      class="ma-0 pa-0"
                      v-model="isEmployeeSelected[e.id]"
                      @change="updateSelectEmployees(e, $event)"
                      >
                    </v-checkbox>
                  </div>
                </v-flex>
                <v-flex xs6 class="text-xs-center emp-profile">
                  <div class="star-icon">
                    <v-icon v-if="e.high_potential_emp">fas fa-star</v-icon>
                  </div>
                  <div class="emp-profile-image">
                    <img :src="getImgUrl('male-avatar')" :alt="e.display_name">
                  </div>
                </v-flex>
              </v-layout>
            </div>
            <div xs12 sm3 md3 lg3 class="pt-2 pl-2 text-xs-left" @click="viewEmpDashboard(e.id)">
                <v-layout>
                  <v-flex xs12 class="cursor-pointer hover-link">
                    <div class="emp-name">
                      <b>{{e.display_name}}</b>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12>
                    <div class="emp-department caption">
                      <span>Department</span><span>&nbsp;:&nbsp;{{e.department}}</span>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12>
                    <div class="emp-email caption">
                      <span>Email</span><span>&nbsp;:&nbsp;{{e.email}}</span>
                    </div>
                  </v-flex>
                </v-layout>
            </div>
            <div xs12 sm1 md1 lg1 class="text-xs-center pt-2">
              <div class="mb-0 emp-mood" v-if="e.mood">
                <div
                  :style="`background-image: url(${getImgUrl(e.mood)})`"
                  class="emp-mood-image">
                </div>
              </div>
              <div class="mb-0" v-else>
                <div> -- </div>
                <div class="grey--text caption">
                  Mood
                </div>
              </div>
            </div>
            <div xs12 sm1 md1 lg1 class="pt-2 text-xs-center">
              <div class="mb-0" v-if="e.last_milestone">{{e.last_milestone}}</div>
              <div class="mb-0" v-else> -- </div>
              <span class="grey--text caption">
                Last Touchpoint
              </span>
            </div>
            <div xs12 sm1 md1 lg1 class="pt-2 text-xs-center">
              <div class="mb-0" v-if="e.last_milestone">{{e.engagement_score}}</div>
              <div class="mb-0" v-else> -- </div>
              <span class="grey--text caption">
                Engagement score
              </span>
            </div>
            <div xs12 sm2 md2 lg2 class="pt-2 text-xs-center">
              <v-menu
                offset-y
                :disabled="!checkPermission(['manage_employee'])
                  || employeesType !== 'active'
                  || e.last_chat_action_status === 'Na'"
                :class="!checkPermission(['manage_employee'])
                  || employeesType !== 'active'
                  || e.last_chat_action_status === 'Na' ? 'disable-action' : ''"
              >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  slot="activator"
                  v-bind="attrs" v-on="on"
                  class="box-container emp-status-btn"
                >
                  <span v-if="getEmpStatusLabel(e.last_chat_action_status)">
                    {{getEmpStatusLabel(e.last_chat_action_status)}}
                  </span>
                  <span v-else>Resolution status</span>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <v-icon>fas fa-chevron-down</v-icon>
                </v-btn>
              </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in actionStatus[e.last_chat_action_status]"
                    :key="index"
                    v-if="e.last_chat_action_status !== item.status"
                    @click="item.action(e, item.dialog, item.permission)"
                  >
                    <v-list-item-title>
                      <v-icon small>{{item.icon}}</v-icon>
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <span>{{ item.text }}</span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div xs12 sm2 md2 lg2 class="text-xs-center pt-2">
              <!-- <v-overflow-btn
                :id="e.last_chat_id"
                :ref="e.last_chat_id"
                :disabled="!checkPermission(['manage_employee'])
                  || employeesType !== 'active'
                  || e.last_chat_action_status === 'Na'"
                class="empAssignSelect"
                hide-details
                :items="assignedToList"
                editable
                item-value="id"
                v-model="updateEmpAssignedTo[e.id]"
                @keypress.enter="removeAssignedTo($event)"
              ></v-overflow-btn> -->
              <v-menu
                offset-y
                max-width="auto"
                min-width="auto"
                max-height="300"
                :close-on-content-click="false"
                :disabled="!checkPermission(['manage_employee'])
                  || employeesType !== 'active'
                  || e.last_chat_action_status === 'Na'"
                :class="!checkPermission(['manage_employee'])
                  || employeesType !== 'active'
                  || e.last_chat_action_status === 'Na' ? 'disable-action' : ''"
              >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  slot="activator"
                  v-bind="attrs"
                  v-on="on"
                  class="box-container zoom-in emp-assign-btn"
                >
                  <span v-if="e.last_chat_assignedTo_display_name">
                    {{e.last_chat_assignedTo_display_name}}
                  </span>
                  <span v-else>Assigned To</span>
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
                        :id="e.id"
                        v-model="searchAssignedToUser"
                        @keyup="searchAssignedTo()"
                      >
                    </v-list-item-title>
                  </v-list-item>
                  <hr>
                  <v-list-item @click="updateAssignedTo(e.last_chat_id, null)" style="border-bottom: 1px solid">
                    <v-list-item-title>
                      Choose
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-for="(item, index) in searchAssignedTo()"
                    :key="index"
                    @click="updateAssignedTo(e.last_chat_id, item.id)"
                  >
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div class="text-xs-center pt-2">
              <v-menu offset-y max-height="200" left>
                <!-- <v-flex xs12 slot="activator">
                  <v-layout style="border: 1px dashed rgba(0, 0, 0, 0.12);border-radius: 6px;">
                    <v-flex xs8 style="height:32px" class="pt-1">Actions</v-flex>
                    <v-flex xs4 style="height:32px;border-left: 1px solid rgba(0,0,0,0.12);">
                      <v-icon class="grey--text">fas fa-sort-down</v-icon>
                    </v-flex>
                  </v-layout>
                </v-flex> -->
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    slot="activator"
                    class="box-container zoom-in emp-action-btn"
                  >
                    <span>Actions</span>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <v-icon>fas fa-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in getEmpActions(e)"
                    :key="index"
                    @click="item.action(e, item.dialog, item.permission)"
                  >
                    <v-list-item-title>
                      <v-icon small>{{item.icon}}</v-icon>
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <span>{{ item.title }}</span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
        </div>

        <!-- Pagination -->
        <v-layout v-if="totalCount > 10" class="pb-5 mt-4">
          <v-flex xs1></v-flex>
          <v-flex class="text-xs-center">
            <v-pagination
              class="emp-pagination"
              color="primary"
              v-model="pagination"
              :length="totalCount"
              :total-visible="10"
              @input="togglePagination()"
            ></v-pagination>
          </v-flex>
          <v-flex xs1></v-flex>
        </v-layout>
      </div>

    </div>
    <div v-else class="amara-loader">
      <amaraLoader></amaraLoader>
    </div>
    <!-- action popups start -->
    <OneOnOne ref="OneOnOne" @getEmployee="onGetEmployees" />
    <Acknowledge ref="Acknowledge" @getEmployee="onGetEmployees" />
    <EmailEmployee ref="EmailEmployee" @getEmployee="onGetEmployees" />
    <SMSEmployee ref="SMSEmployee" @getEmployee="onGetEmployees" />
    <hipoEmployee ref="HipoEmployee" @getEmployee="onGetEmployees"></hipoEmployee>
    <!-- action popups end -->
    <!-- bulk action popup -->
    <bulkactionPrompt ref="BulkactionPrompt"></bulkactionPrompt>
    <v-snackbar
        v-model="bulkSnackbar.show"
        :bottom="true"
        :color="bulkSnackbar.color"
        :auto-height="true"
        :timeout="bulkSnackbar.timeout"
        :top="false"
      >
        {{ bulkSnackbar.text }}
        <v-btn
          v-if="bulkSnackbar.showBtn"
          color="white"
          flat
          @click="bulkSnackbar.show = false"
        >
          Close
        </v-btn>
    </v-snackbar>
    <BulkEmailEmployee
      ref="bulkEmail"
      :selectedEmp="selectedEmployees"
      :numbers="selectedBulkEmpEmails"
      @sendingEmail="sendingEmail"
      @completedEmail="completedEmail"
      @setCountStatus="setCountStatus"
    >
    </BulkEmailEmployee>
    <BulkSMSEmployee
      ref="bulkSms"
      :selectedEmp="selectedEmployees"
      :numbers="selectedBulkEmpNumbers"
      @sendingSms="sendingSms"
      @completedSms="completedSms"
      @setCountStatus="setCountStatus"
    >
    </BulkSMSEmployee>
    <SocketResponse
      ref="socketResponse"
      :selectedEmp="selectedEmployees"
      :res="socketResponseUpdate"
    >
    </SocketResponse>
  </div>
</template>

<script>
// import { VCheckbox, VPagination, VOverflowBtn, VSnackbar, VTooltip } from 'vuetify';
import axios from 'axios';
import { mapState } from 'vuex';

import OneOnOne from '../dialogs/OneOnOne';
import Acknowledge from '../dialogs/Acknowledge';
import EmailEmployee from '../dialogs/EmailEmployee';
import SMSEmployee from '../dialogs/SMSEmployee';
import EmployeeTopBar from './employee-list-topbar';
import EmployeeFilters from './employee-filters';
import EmployeeBulkActions from './employee-bulk-actions';

import BulkEmailEmployee from '../dialogs/bulkEmailEmployee';
import BulkSMSEmployee from '../dialogs/BulkSMSEmployee';
import BulkactionPrompt from '../dialogs/bulkaction-promt';
import SocketResponse from '../dialogs/SocketResponse';
import HipoEmployee from '../dialogs/hipo-employee';

import AmaraLoader from '../../elements/amara-loader';

export default {
  name: 'EmployeeList',

  components: {
    // VCheckbox,
    // VPagination,
    // VOverflowBtn,
    // VTooltip,
    // VSnackbar,
    OneOnOne,
    Acknowledge,
    EmailEmployee,
    SMSEmployee,
    EmployeeTopBar,
    EmployeeFilters,
    EmployeeBulkActions,
    BulkEmailEmployee,
    BulkactionPrompt,
    BulkSMSEmployee,
    SocketResponse,
    HipoEmployee,
    AmaraLoader
  },

  data () {
    return {
      isFilterApplied: false,
      pagination: 1,
      actionStatus: {
        open: [
          {
            text: 'Acknowledge Chat',
            icon: 'fas fa-check-square',
            status: 'acknowledged',
            dialog: 'Acknowledge',
            action: this.openDialog,
            permission: ['acknowledge_chat']
          }, {
            text: 'Schedule meeting',
            icon: 'flaticon-012-meeting',
            status: 'scheduled',
            dialog: 'OneOnOne',
            action: this.openDialog,
            permission: ['schedule_invite']
          }, {
            text: 'Work In Progress',
            icon: 'flaticon-047-conversation',
            status: 'inProgress',
            dialog: 'inProgress',
            action: this.updateStatus,
            permission: ['change_status']
          }, {
            text: 'Resolved',
            icon: 'fas fa-check',
            status: 'resolved',
            dialog: 'resolved',
            action: this.updateStatus,
            permission: ['change_status']
          }
        ],
        acknowledged: [
          {
            text: 'Schedule meeting',
            icon: 'flaticon-012-meeting',
            status: 'scheduled',
            dialog: 'OneOnOne',
            action: this.openDialog,
            permission: ['schedule_invite']
          }, {
            text: 'Resolved',
            icon: 'fas fa-check',
            status: 'resolved',
            dialog: 'resolved',
            action: this.updateStatus,
            permission: ['change_status']
          }
        ],
        scheduled: [
          {
            text: 'Acknowledge Chat',
            icon: 'fas fa-check-square',
            status: 'acknowledged',
            dialog: 'Acknowledge',
            action: this.openDialog,
            permission: ['acknowledge_chat']
          }, {
            text: 'Resolved',
            icon: 'fas fa-check',
            status: 'resolved',
            dialog: 'resolved',
            action: this.updateStatus,
            permission: ['change_status']
          }
        ],
        inProgress: [
          {
            text: 'Acknowledge Chat',
            icon: 'fas fa-check-square',
            status: 'acknowledged',
            dialog: 'Acknowledge',
            action: this.openDialog,
            permission: ['acknowledge_chat']
          }, {
            text: 'Schedule meeting',
            icon: 'flaticon-012-meeting',
            status: 'scheduled',
            dialog: 'OneOnOne',
            action: this.openDialog,
            permission: ['schedule_invite']
          }, {
            text: 'Resolved',
            icon: 'fas fa-check',
            status: 'resolved',
            dialog: 'resolved',
            action: this.updateStatus,
            permission: ['change_status']
          }
        ],
        resolved: [
          {
            text: 'Work In Progress',
            icon: 'flaticon-047-conversation',
            status: 'inProgress',
            dialog: 'inProgress',
            action: this.updateStatus,
            permission: ['change_status']
          }
        ]
      },
      empActions: [
        {
          title: 'Enable Amara chat',
          icon: 'fas fa-user-check',
          status: 'enableAmara',
          dialog: 'enableAmara',
          action: this.updateAmaraInteration,
          permission: ['manage_employee']
        },
        {
          title: 'Disable Amara chat',
          icon: 'fas fa-user-times',
          status: 'disableAmara',
          dialog: 'disableAmara',
          action: this.updateAmaraInteration,
          permission: ['manage_employee']
        },
        {
          title: 'Mark High potential',
          icon: 'fas fa-star',
          status: 'markHipo',
          dialog: 'HipoEmployee',
          action: this.openDialog,
          permission: ['manage_employee']
        },
        {
          title: 'Unmark High potential',
          icon: 'far fa-star',
          status: 'unMarkHipo',
          dialog: 'HipoEmployee',
          action: this.openDialog,
          permission: ['manage_employee']
        },
        {
          title: 'Acknowledge',
          icon: 'fas fa-check-square',
          status: 'acknowledged',
          dialog: 'Acknowledge',
          action: this.openDialog,
          permission: ['acknowledge_chat']
        },
        {
          title: 'Email',
          icon: 'fas fa-envelope',
          status: 'email',
          dialog: 'EmailEmployee',
          action: this.openDialog,
          permission: ['send_email']
        }, {
          title: 'Shedule meeting',
          icon: 'flaticon-012-meeting',
          status: 'scheduled',
          dialog: 'OneOnOne',
          action: this.openDialog,
          permission: ['schedule_invite']
        }, {
          title: 'Sms',
          icon: 'fas fa-comment',
          status: 'sms',
          dialog: 'SMSEmployee',
          action: this.openDialog,
          permission: ['send_sms']
        }
      ],
      selectedEmployees: {},
      isEmployeeSelected: {},
      getSessionEmployeesSelected: {},
      getNonSessionEmployeesSelected: {},
      selectedEmployeesCount: 0,
      bulkTogglePagination: false,
      bulkActionConfig: {
        type: '',
        val: ''
      },
      bulkActionPayload: {
        show: true,
        action: '',
        assignedTo: '',
        actionStatus: true,
        successCount: 0,
        errorCount: 0
      },
      bulkSnackbar: {
        show: false,
        color: 'info',
        timeout: 6000,
        text: '',
        showBtn: true
      },
      selectedBulkEmpEmails: [],
      selectedBulkEmpNumbers: [],
      socketResponseUpdate: [],
      updateEmpStatus: {},
      updateEmpAssignedTo: {},
      searchAssignedToUser: '',
      assignedToMenu: false
    };
  },

  props: {
    employees: {
      required: true,
      type: [Array, Object]
    },
    employeesType: {
      required: true,
      type: String
    },
    totalCount: {
      required: true,
      type: Number
    },
    assignedToList: {
      required: true,
      type: Array
    }
  },

  computed: {
    ...mapState({
      user: state => state.user,
      loadingEmployeesList: state => state.loadingEmployeesList
    })
  },

  mounted () {
    setTimeout(() => {
      // this.updateEmpSelects();
    }, 2000);
    // https://iqonic.design/themes/xray/vue/dist/home-3
    // this.updateEmpAssignedTo[empLastChatId] = newId;
  },

  methods: {
    getEmployeesList (empType) {
      this.$emit('getEmployeesList', empType);
    },
    updateEmpSelects () {
      this.$lodash.each(this.employees, (val) => {
        // console.log('val.last_chat_assignedTo', val.last_chat_assignedTo);
        if (val.last_chat_assignedTo) {
          const id = val.last_chat_id;
          this.$refs[id][0].setValue(val.last_chat_assignedTo);
          // console.log('in update', this.$refs[id][0].value);
        }
      });
      this.$forceUpdate();
    },
    getEmpActions (emp) {
      const temp = [...this.empActions];
      if (emp.interactions_active) {
        const idx = temp.findIndex(val => val.status === 'enableAmara');
        temp.splice(idx, 1);
      }
      if (!emp.interactions_active) {
        const idx = temp.findIndex(val => val.status === 'disableAmara');
        temp.splice(idx, 1);
      }
      if (emp.high_potential_emp) {
        const idx = temp.findIndex(val => val.status === 'markHipo');
        temp.splice(idx, 1);
      }
      if (!emp.high_potential_emp) {
        const idx = temp.findIndex(val => val.status === 'unMarkHipo');
        temp.splice(idx, 1);
      }
      return temp;
    },
    getEmpStatusLabel (val) {
      let name = val;
      if (val === 'Na') {
        name = 'Resolution Status';
      }
      if (val === 'inProgress') {
        name = 'In progress';
      }
      if (val === 'acknowledged') {
        name = 'Acknowledged';
      }
      if (val === 'scheduled') {
        name = 'Scheduled';
      }
      return name;
    },
    togglePagination () {
      this.onGetEmployees();
      // this methods need to call after api response of emp list
      // TODO: try to handle this with something better
      setTimeout(() => {
        this.checkBulkToggle();
      }, 1500);
    },
    searchAssignedTo () {
      const filter = this.assignedToList;
      if (this.searchAssignedToUser) {
        // eslint-disable-next-line max-len
        const tempData = filter.filter(r => r.text.toLowerCase().indexOf(this.searchAssignedToUser.toLowerCase()) >= 0);
        return tempData;
      }
      return filter;
    },
    filterApplied (val) {
      this.isFilterApplied = val;
      this.onGetEmployees();
    },
    empFiltersApplied (val) {
      this.isFilterApplied = val;
    },
    searchEmployee (string) {
      this.$emit('getEmployees', this.pagination, string);
    },
    onGetEmployees () {
      this.$emit('getEmployees', this.pagination);
    },
    viewEmpDashboard (empId) {
      this.$emit('viewEmpDashboard', empId);
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    toggleFilter () {
      this.$refs.employeeFilters.showFilterDrawer = !this.$refs.employeeFilters.showFilterDrawer;
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
    updateAssignedTo (id, val) {
      this.updateEmployeeSession(id, val, 'assign');
    },
    updateEmployeeSession (id, val, type) {
      const queryParams = {};
      if (type === 'status') {
        queryParams.action_status = val; // for resolution status
      }
      if (type === 'assign') {
        queryParams.assignedTo_id = val; // for assigned to
      }
      axios.patch(`${process.env.VUE_APP_API_URL}session/update/${id}`, {
        ...queryParams
      }).then((response) => {
        if (response && response.data.status === 200) {
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee updated sucessfully!'
          });
          this.onGetEmployees();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update status, Please try again later!'
          });
        }
      });
    },
    openDialog (data, type, permission) {
      // for update resolution status
      if (this.checkPermission(permission)) {
        if (type && this.$refs[type]) {
          this.$refs[type].open = true;
          this.$refs[type].employee = data;
        }
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update status, You don\'t have permission!'
        });
      }
    },
    updateAmaraInteration (emp, type, permission) {
      if (this.checkPermission(permission)) {
        if (type === 'enableAmara') {
          this.updateAmaraStatus(emp.id, true);
        } else {
          this.updateAmaraStatus(emp.id, false);
        }
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update status, You don\'t have permission!'
        });
      }
    },
    updateAmaraStatus (empId, val) {
      axios.patch(`${process.env.VUE_APP_API_URL}users/update/${empId}`, {
        interactions_active: val
      }).then((response) => {
        if (response.data.status === 200) {
          this.onGetEmployees();
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Employee updated successfully!'
          });
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to save employee, Please try again later!'
          });
        }
      });
    },
    updateStatus (data, value, permission) {
      // for update resolution status
      if (this.checkPermission(permission)) {
        this.updateEmployeeSession(data.last_chat_id, value, 'status');
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update status, You don\'t have permission!'
        });
      }
    },
    resetFilters () {
      this.isFilterApplied = false;
      this.$store.dispatch('updateEmployeeFilters', null);
      this.$router.push({
        path: '/employees'
      });
      this.onGetEmployees();
    },
    bulktoggleAll (type) {
      if (!type) {
        this.$lodash.each(this.employees, (emp) => {
          this.deleteBulkSelectedEmployee(emp.id);
          this.isEmployeeSelected[emp.id] = false;
        });
      } else {
        this.$lodash.each(this.employees, (emp) => {
          const newEmployee = {
            [emp.id]: emp
          };
          this.selectedEmployees = {
            ...this.selectedEmployees,
            ...newEmployee
          };
          this.isEmployeeSelected[emp.id] = true;
          if (emp && emp.user_completed_session_count > 0) {
            const newEmp = {
              [emp.id]: emp
            };
            this.getSessionEmployeesSelected = {
              ...this.getSessionEmployeesSelected,
              ...newEmp
            };
          }
          if (emp && emp.user_completed_session_count < 1) {
            const t = {
              [emp.id]: emp
            };
            this.getNonSessionEmployeesSelected = {
              ...this.getNonSessionEmployeesSelected,
              ...t
            };
          }
        });
      }
      this.getSelectedEmployeesCount();
      this.getSessionEmployeesCount();
      this.$forceUpdate();
    },
    deleteBulkSelectedEmployee (id) {
      delete this.selectedEmployees[id];
      delete this.getSessionEmployeesSelected[id];
      delete this.getNonSessionEmployeesSelected[id];
    },
    getSessionEmployeesCount () {
      const count = Object.keys(this.getSessionEmployeesSelected).length;
      this.$store.dispatch('sessionEmployeesCount', count);
      return count;
    },
    getSelectedEmployeesCount () {
      this.selectedEmployeesCount = Object.keys(this.selectedEmployees).length;
    },
    updateSelectEmployees (emp, ev) {
      const temp = JSON.parse(JSON.stringify(this.selectedEmployees));
      if (ev && !temp[emp.id]) {
        const newEmployee = {
          [emp.id]: emp
        };
        this.selectedEmployees = {
          ...this.selectedEmployees,
          ...newEmployee
        };
        this.isEmployeeSelected[emp.id] = true;
        if (emp && emp.user_completed_session_count > 0) {
          const newEmp = {
            [emp.id]: emp
          };
          this.getSessionEmployeesSelected = {
            ...this.getSessionEmployeesSelected,
            ...newEmp
          };
        }
        if (emp && emp.user_completed_session_count < 1) {
          const t = {
            [emp.id]: emp
          };
          this.getNonSessionEmployeesSelected = {
            ...this.getNonSessionEmployeesSelected,
            ...t
          };
        }
      } else if (!ev && this.selectedEmployees[emp.id]) {
        this.isEmployeeSelected[emp.id] = false;
        this.deleteBulkSelectedEmployee(emp.id);
      }
      this.getSelectedEmployeesCount();
      this.getSessionEmployeesCount();
    },
    checkBulkToggle () {
      const selectedTeam = Object.keys(this.selectedEmployees);
      const currentTeam = [];
      this.$lodash.each(this.employees, (emp) => {
        currentTeam.push(emp.id);
      });
      this.$nextTick(() => {
        this.bulkTogglePagination = currentTeam.every(i => selectedTeam.includes(i));
      });
    },
    resetBulkEmployees () {
      this.selectedEmployees = {};
      this.isEmployeeSelected = {};
      this.getSessionEmployeesSelected = {};
      this.getNonSessionEmployeesSelected = {};
      this.bulkTogglePagination = false;
      this.getSelectedEmployeesCount();
      this.getSessionEmployeesCount();
    },
    openBulkWarnDialog (data) {
      this.bulkActionConfig.type = data.bulkActionType;
      this.bulkActionConfig.val = data.val;
      const len = this.getNonSessionEmployeesSelectedCount();
      if (len > 0) {
        this.$refs.BulkactionPrompt.bulkWarnDialog = true;
      } else {
        this.continueWithSessionEmployee();
      }
    },
    getNonSessionEmployeesSelectedCount () {
      const count = Object.entries(this.getNonSessionEmployeesSelected).length;
      return count;
    },
    continueWithSessionEmployee () {
      this.$refs.BulkactionPrompt.bulkWarnDialog = false;
      // this.continueWithSessionEmp = true;
      if (this.bulkActionConfig.type === 'status') {
        this.bulkActionUpdate(this.bulkActionConfig.val, 'status');
      }
      if (this.bulkActionConfig.type === 'assign') {
        this.bulkAssignedTo(this.bulkActionConfig.val.user_id, 'assignedTo', this.bulkActionConfig.val.display_name);
      }
      if (this.bulkActionConfig.type === 'acknowledge') {
        this.bulkAcknowledgeUpdate(this.bulkActionConfig.val, 'acknowledge');
      }
      if (this.bulkActionConfig.type === 'email') {
        this.openEmailDialog();
      }
      if (this.bulkActionConfig.type === 'sms') {
        this.openSMSDialog();
      }
    },
    openEmailDialog () {
      this.$refs.bulkEmail.open = true;
      this.selectedBulkEmpEmails = [];
      const selectedEmp = Object.entries(this.getSessionEmployeesSelected);
      this.$lodash.each(selectedEmp, (val) => {
        this.selectedBulkEmpEmails.push(val);
      });
    },
    sendingEmail () {
      this.bulkActionPayload.show = true;
      this.bulkActionPayload.action = 'email';
      this.bulkActionPayload.actionStatus = true;
      this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
    },
    completedEmail () {
      this.bulkActionPayload.actionStatus = false;
      this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
      this.bulkActionUpdate('inProgress', 'status');
      setTimeout(() => {
        this.bulkActionPayload.show = false;
        this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
      }, 10000);
    },
    openSMSDialog () {
      this.$refs.bulkSms.open = true;
      this.selectedBulkEmpNumbers = [];
      const selectedEmp = Object.entries(this.getSessionEmployeesSelected);
      this.$lodash.each(selectedEmp, (val) => {
        this.selectedBulkEmpNumbers.push(val);
      });
    },
    sendingSms () {
      this.bulkActionPayload.show = true;
      this.bulkActionPayload.action = 'sms';
      this.bulkActionPayload.actionStatus = true;
      this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
    },
    completedSms () {
      this.bulkActionPayload.actionStatus = false;
      this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
      this.bulkActionUpdate('inProgress', 'status');
      setTimeout(() => {
        this.bulkActionPayload.show = false;
        this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
      }, 10000);
    },
    bulkAcknowledgeUpdate (type, action) {
      this.bulkActionPayload.show = true;
      this.bulkActionPayload.action = action;
      this.bulkActionPayload.actionStatus = true;
      this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
      const temp = [];
      const selectedEmp = Object.entries(this.getSessionEmployeesSelected);
      this.$lodash.each(selectedEmp, (val) => {
        const t = {};
        t.user_id = val[1].id;
        t.action = type;
        temp.push(t);
      });
      axios.post(`${process.env.VUE_APP_API_URL}users/action-bulk`, {
        users_data: temp
      }).then((response) => {
        if (response && response.data && response.data.status === 200) {
          this.bulkSnackbar.show = true;
          this.bulkSnackbar.text = response.data.message;
          this.bulkSnackbar.showBtn = false;
          const session = JSON.parse(localStorage.getItem('CHATBOT_USER'));
          const company = session.company.replace(/-/g, '');
          const socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}${company}/?verify=${session.access_token}`);
          socket.addEventListener('message', (res) => {
            this.bulkSnackbar.show = false;
            const tempRes = JSON.parse(res.data);
            this.bulkSnackbar.show = true;
            this.bulkSnackbar.text = 'User action completed';
            this.bulkActionPayload.actionStatus = false;
            this.bulkActionPayload.successCount = tempRes.success_count;
            this.bulkActionPayload.errorCount = tempRes.error_count;
            this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            this.setCountStatus(tempRes);
            setTimeout(() => {
              this.bulkActionPayload.show = false;
              this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            }, 10000);
            this.bulkSnackbar.timeout = 6000;
            this.bulkSnackbar.showBtn = true;
            this.onGetEmployees();
            this.socketResponseUpdate = tempRes;
            socket.close();
          });
        }
      });
    },
    bulkAmaraIntration (flag) {
      this.bulkActionPayload.show = true;
      this.bulkActionPayload.action = 'extraAction';
      this.bulkActionPayload.actionStatus = true;
      this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
      const temp = [];
      const selectedEmp = Object.entries(this.selectedEmployees);
      this.$lodash.each(selectedEmp, (val) => {
        const t = {};
        t.user_id = val[1].id;
        t.interactions_active = flag;
        temp.push(t);
      });
      axios.patch(`${process.env.VUE_APP_API_URL}users/update-bulk`, {
        users_data: temp
      }).then((response) => {
        if (response && response.data && response.data.status === 200) {
          this.bulkSnackbar.show = true;
          this.bulkSnackbar.text = response.data.message;
          this.bulkSnackbar.showBtn = false;
          const session = JSON.parse(localStorage.getItem('CHATBOT_USER'));
          const company = session.company.replace(/-/g, '');
          const socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}${company}/?verify=${session.access_token}`);
          socket.addEventListener('message', (res) => {
            this.bulkSnackbar.show = false;
            const tempRes = JSON.parse(res.data);
            this.bulkSnackbar.show = true;
            this.bulkSnackbar.text = 'User action completed';
            this.bulkActionPayload.actionStatus = false;
            this.bulkActionPayload.successCount = tempRes.success_count;
            this.bulkActionPayload.errorCount = tempRes.error_count;
            this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            this.setCountStatus(tempRes);
            setTimeout(() => {
              this.bulkActionPayload.show = false;
              this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            }, 10000);
            // this.bulkSnackbar.text = tempRes;
            this.bulkSnackbar.timeout = 6000;
            this.bulkSnackbar.showBtn = true;
            this.onGetEmployees();
            this.socketResponseUpdate = tempRes;
            // that.$refs.socketResponse.dialog = true;
            socket.close();
          });
        }
      });
    },
    bulkHighPotential (flag) {
      this.bulkActionPayload.show = true;
      this.bulkActionPayload.action = 'extraAction';
      this.bulkActionPayload.actionStatus = true;
      this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
      const temp = [];
      const selectedEmp = Object.entries(this.selectedEmployees);
      this.$lodash.each(selectedEmp, (val) => {
        const t = {};
        t.user_id = val[1].id;
        t.high_potential_emp = flag;
        temp.push(t);
      });
      axios.patch(`${process.env.VUE_APP_API_URL}users/update-bulk`, {
        users_data: temp
      }).then((response) => {
        if (response && response.data && response.data.status === 200) {
          this.bulkSnackbar.show = true;
          this.bulkSnackbar.text = response.data.message;
          this.bulkSnackbar.showBtn = false;
          const session = JSON.parse(localStorage.getItem('CHATBOT_USER'));
          const company = session.company.replace(/-/g, '');
          const socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}${company}/?verify=${session.access_token}`);
          socket.addEventListener('message', (res) => {
            this.bulkSnackbar.show = false;
            const tempRes = JSON.parse(res.data);
            this.bulkSnackbar.show = true;
            this.bulkSnackbar.text = 'User action completed';
            this.bulkActionPayload.actionStatus = false;
            this.bulkActionPayload.successCount = tempRes.success_count;
            this.bulkActionPayload.errorCount = tempRes.error_count;
            this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            this.setCountStatus(tempRes);
            setTimeout(() => {
              this.bulkActionPayload.show = false;
              this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            }, 10000);
            this.bulkSnackbar.timeout = 6000;
            this.bulkSnackbar.showBtn = true;
            this.onGetEmployees();
            this.socketResponseUpdate = tempRes;
            socket.close();
          });
        }
      });
    },
    bulkAssignedTo (id, action, name) {
      this.bulkActionPayload.show = true;
      this.bulkActionPayload.action = action;
      this.bulkActionPayload.assignedTo = name;
      this.bulkActionPayload.actionStatus = true;
      this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
      const temp = [];
      const selectedEmp = Object.entries(this.getSessionEmployeesSelected);
      this.$lodash.each(selectedEmp, (val) => {
        const t = {};
        t.session_id = val[1].last_chat_id;
        t.assignedTo_id = id;
        temp.push(t);
      });
      axios.patch(`${process.env.VUE_APP_API_URL}session/update-bulk`, {
        session_data: temp
      }).then((response) => {
        if (response && response.data && response.data.status === 200) {
          this.bulkSnackbar.show = true;
          this.bulkSnackbar.text = response.data.message;
          this.bulkSnackbar.showBtn = false;
          const session = JSON.parse(localStorage.getItem('CHATBOT_USER'));
          const company = session.company.replace(/-/g, '');
          const socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}${company}/?verify=${session.access_token}`);
          socket.addEventListener('message', (res) => {
            this.bulkSnackbar.show = false;
            const tempRes = JSON.parse(res.data);
            this.bulkSnackbar.show = true;
            this.bulkSnackbar.text = 'User action completed';
            this.bulkActionPayload.actionStatus = false;
            this.bulkActionPayload.successCount = tempRes.success_count;
            this.bulkActionPayload.errorCount = tempRes.error_count;
            this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            this.setCountStatus(tempRes);
            setTimeout(() => {
              this.bulkActionPayload.show = false;
              this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            }, 10000);
            this.bulkSnackbar.timeout = 6000;
            this.bulkSnackbar.showBtn = true;
            this.onGetEmployees();
            this.socketResponseUpdate = tempRes;
            socket.close();
          });
        }
      });
    },
    bulkActionUpdate (type, action) {
      this.bulkActionPayload.show = true;
      this.bulkActionPayload.action = action;
      this.bulkActionPayload.actionStatus = true;
      this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
      if (type === 'acknowledge_chat') {
        this.bulkAcknowledgeUpdate(type, 'status');
        return;
      }
      const temp = [];
      const selectedEmp = Object.entries(this.getSessionEmployeesSelected);
      this.$lodash.each(selectedEmp, (val) => {
        const t = {};
        t.session_id = val[1].last_chat_id;
        t.action_status = type;
        temp.push(t);
      });
      axios.patch(`${process.env.VUE_APP_API_URL}session/update-bulk`, {
        session_data: temp
      }).then((response) => {
        if (response && response.data && response.data.status === 200) {
          this.bulkSnackbar.show = true;
          this.bulkSnackbar.text = response.data.message;
          this.bulkSnackbar.showBtn = false;
          const session = JSON.parse(localStorage.getItem('CHATBOT_USER'));
          const company = session.company.replace(/-/g, '');
          const socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}${company}/?verify=${session.access_token}`);
          socket.addEventListener('message', (res) => {
            this.bulkSnackbar.show = false;
            const tempRes = JSON.parse(res.data);
            this.bulkSnackbar.show = true;
            this.bulkSnackbar.text = 'User action completed';
            this.bulkActionPayload.actionStatus = false;
            this.bulkActionPayload.successCount = tempRes.success_count;
            this.bulkActionPayload.errorCount = tempRes.error_count;
            this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            this.setCountStatus(tempRes);
            setTimeout(() => {
              this.bulkActionPayload.show = false;
              this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            }, 10000);
            this.bulkSnackbar.timeout = 6000;
            this.bulkSnackbar.showBtn = true;
            this.onGetEmployees();
            this.socketResponseUpdate = tempRes;
            socket.close();
          });
        }
      });
    },
    setCountStatus (res) {
      this.bulkActionPayload.successCount = res.success_count;
      this.bulkActionPayload.errorCount = res.error_count;
      this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
    },
    openSocketResponse () {
      this.$refs.socketResponse.dialog = true;
    }
    // updateActiveEmpStatus(emp, value) {
    //   // console.log('empId', emp, value);
    //   const empActions = this.actionStatus[emp.last_chat_action_status];
    //   const idx = empActions.findIndex(val => val.status === value);
    //   if (idx > -1) {
    //     const empSelectedAction = empActions[idx];
    //     // console.log('empSelectedAction', empSelectedAction.action);
    //     const fun = empSelectedAction.action;
    //     // console.log('fun', fun);
    //     fun(emp, empSelectedAction.dialog, empSelectedAction.permission);
    //   }
    // },
    // removeEmpStatus(ev) {
    //   const val = ev && ev.srcElement && ev.srcElement.value ? ev.srcElement.value : '';
    //   if (!val || val === '') {
    //     this.updateEmpStatus[ev.srcElement.id] = '';
    //     this.updateEmpStatus = {};
    //   }
    // },
    // updateActiveEmpAssignedTo(empLastChatId, newId) {
    //   this.updateEmpAssignedTo[empLastChatId] = newId;
    //   this.updateAssignedTo(empLastChatId, newId);
    // },
    // removeAssignedTo(ev) {
    //   const val = ev && ev.srcElement && ev.srcElement.value ? ev.srcElement.value : '';
    //   if (!val || val === '') {
    //     this.updateEmpAssignedTo[ev.srcElement.id] = '';
    //     this.updateEmpAssignedTo = {};
    //     this.updateActiveEmpAssignedTo(ev.srcElement.id, null);
    //   }
    // },
  },
  watch: {
    // updateEmpStatus: {
    //   deep: true,
    //   immediate: false,
    //   handler() {
    //     const updatingEmpList = Object.entries(this.updateEmpStatus);
    //     let updatingEmp = '';
    //     let newValue = '';
    //     this.employees.forEach((val) => {
    //       updatingEmpList.forEach((v) => {
    //         if (val.id === v[0]) {
    //           if (val.last_chat_action_status !== v[1]) {
    //             updatingEmp = val;
    //             newValue = v[1];
    //           }
    //         }
    //       });
    //     });
    //     if (updatingEmp && newValue) {
    //       this.updateActiveEmpStatus(updatingEmp, newValue);
    //     }
    //   },
    // },
    // updateEmpAssignedTo: {
    //   deep: true,
    //   immediate: true,
    //   handler() {
    //     console.log('updateEmpStatus', this.updateEmpStatus, Object.entries(this.updateEmpStatus));
    //     const updatingEmpList = Object.entries(this.updateEmpAssignedTo);
    //     let updatingEmp = '';
    //     let newValue = '';
    //     this.employees.forEach((val) => {
    //       updatingEmpList.forEach((v) => {
    //         if (val.id === v[0]) {
    //           if (val.last_chat_id !== v[1]) {
    //             updatingEmp = val.last_chat_id;
    //             newValue = v[1];
    //           }
    //         }
    //       });
    //     });
    //     if (updatingEmp && newValue) {
    //       this.updateActiveEmpAssignedTo(updatingEmp, newValue);
    //     }
    //     // this.updateEmpSelects();
    //   },
    // },
  }
};
</script>

<style lang="scss" scoped>
.employee-list-wrap {
  margin: 20px 0;
  // overflow: hidden;
  // height: calc(100vh - 100px);
  .employee-lists {
    background-color: var(--bg-panel);
    margin: 0 20px;
    border-radius: 12px;
    padding: 0 20px;
    min-height: 80vh;
    max-height: 80vh;
    overflow: hidden;
    // overflow-y: auto;
    .employees-container {
      padding-bottom: 2rem;
      min-height: 70vh;
      max-height: 70vh;
      overflow-y: auto;
      .intro-x:nth-child(1) {
        opacity: 0;
        position: relative;
        transform: translateX(50px);
        animation: 0.4s intro-x-animation ease-in-out 0.33333s;
        animation-fill-mode: forwards;
        animation-delay: 0.1s;
      }
      .intro-x:nth-child(2) {
        opacity: 0;
        position: relative;
        transform: translateX(50px);
        animation: 0.4s intro-x-animation ease-in-out 0.33333s;
        animation-fill-mode: forwards;
        animation-delay: 0.2s;
      }
      .intro-x:nth-child(3) {
        opacity: 0;
        position: relative;
        transform: translateX(50px);
        animation: 0.4s intro-x-animation ease-in-out 0.33333s;
        animation-fill-mode: forwards;
        animation-delay: 0.3s;
      }
      .intro-x:nth-child(4) {
        opacity: 0;
        position: relative;
        transform: translateX(50px);
        animation: 0.4s intro-x-animation ease-in-out 0.33333s;
        animation-fill-mode: forwards;
        animation-delay: 0.4s;
      }
      .intro-x:nth-child(5) {
        opacity: 0;
        position: relative;
        transform: translateX(50px);
        animation: 0.4s intro-x-animation ease-in-out 0.33333s;
        animation-fill-mode: forwards;
        animation-delay: 0.5s;
      }
      .intro-x:nth-child(6) {
        opacity: 0;
        position: relative;
        transform: translateX(50px);
        animation: 0.4s intro-x-animation ease-in-out 0.33333s;
        animation-fill-mode: forwards;
        animation-delay: 0.6s;
      }
      .intro-x:nth-child(7) {
        opacity: 0;
        position: relative;
        transform: translateX(50px);
        animation: 0.4s intro-x-animation ease-in-out 0.33333s;
        animation-fill-mode: forwards;
        animation-delay: 0.7s;
      }
      .intro-x:nth-child(8) {
        opacity: 0;
        position: relative;
        transform: translateX(50px);
        animation: 0.4s intro-x-animation ease-in-out 0.33333s;
        animation-fill-mode: forwards;
        animation-delay: 0.8s;
      }
      .intro-x:nth-child(9) {
        opacity: 0;
        position: relative;
        transform: translateX(50px);
        animation: 0.4s intro-x-animation ease-in-out 0.33333s;
        animation-fill-mode: forwards;
        animation-delay: 0.9s;
      }
      .intro-x:nth-child(10) {
        opacity: 0;
        position: relative;
        transform: translateX(50px);
        animation: 0.4s intro-x-animation ease-in-out 0.33333s;
        animation-fill-mode: forwards;
        animation-delay: 0.10s;
      }
      @keyframes intro-x-animation {
        100% {
          opacity: 1;
          transform: translateX(0px);
        }
      }
    }
    .emp-card {
      display: grid;
      grid-template-columns: 8% 20% 6% 10% 10% 18% 18% 10%;
      .emp-status-btn, .emp-assign-btn {
        box-shadow: none !important;
        width: 180px !important;
        border: 1px solid var(--color-palceholder);
      }
      .emp-action-btn {
        box-shadow: none !important;
        border: 1px solid var(--color-palceholder);
      }
      &:hover {
        box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
        transition: box-shadow 83ms;
      }
      .disable-action {
        pointer-events: none;
        opacity: .6;
      }
    }
    .emp-checkbox {
      padding: 15px 30px;
    }
    .emp-name {
      word-break: break-all;
    }
    .emp-department {}
    .emp-email {
      word-break: break-all;
    }
    .emp-mood {
      text-align: center;
      display: inline-block;
      .emp-mood-image {
        height: 40px;
        width: 40px;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    .emp-profile {
      position: relative;
      .star-icon {
        position: absolute;
        i {
          color: #fdd835 !important;
          font-size: 20px !important;
        }
      }
      .emp-profile-image {
        img {
          vertical-align: middle;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
  }
  .amara-loader {
    background-color: var(--bg-panel);
    margin: 0 20px;
    border-radius: 12px;
    padding: 0 20px;
    min-height: 80vh;
    max-height: 80vh;
    overflow: hidden;
    display: grid;
    justify-items: center;
    backdrop-filter: blur(25px);
  }
}
</style>

<style lang="scss">
.employee-list-wrap {
  .emp-pagination {
    .v-pagination__navigation {
      background:none !important;
      box-shadow: none !important;
      .v-icon {
        font-size: 1rem !important;
      }
    }
  }
  // .empStatusSelect, .empAssignSelect {
  //   border: 1px dashed rgba(0,0,0,0.12);
  //   border-radius: 6px;
  //   margin: 0 26px;
  //   .v-input__control {
  //     &::before {
  //       content: none !important;
  //       height: 0px !important;
  //       border-width: 0 0 0 0;
  //     }
  //   }
  //   .v-input__slot {
  //     background: #ffffff;
  //     &::before {
  //       content: none !important;
  //       height: 0px !important;
  //       border-width: 0 0 0 0;
  //     }
  //     &::after {
  //       content: none !important;
  //       height: 0px !important;
  //       border-width: 0 0 0 0;
  //     }
  //     .v-select__slot {
  //       height: 32px !important;
  //       .v-label {
  //         font-size: 14px !important;
  //         text-transform: capitalize;
  //         color: rgba(0,0,0,0.87) !important;
  //       }
  //       .v-label--is-disabled {
  //         color: rgba(0,0,0,0.38) !important;
  //       }
  //       input {
  //         font-size: 14px !important;
  //       }
  //     }
  //     .v-input__append-inner {
  //       width: 32px !important;
  //       height: 32px !important;
  //       border-left: 1px solid rgba(0,0,0,0.12);
  //     }
  //   }
  // }
}
</style>
