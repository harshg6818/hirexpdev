<template>
  <div>

    <div class="header" style="height: 5.5rem;">
      <v-layout row wrap align-center style="border-bottom: 1px solid rgb(243, 241, 241);z-index:3;max-height:90px;">
        <v-flex class="arrow-icon black--text" xs1 pl-4 style="width:50px;max-width:50px">
          <v-btn flat icon small @click="goBack()" class="elevation-0">
            <v-icon> fas fa-arrow-left </v-icon>
          </v-btn>
        </v-flex>
        <v-flex class="emp-name black--text" xs3 pl-4>
          <p class="headline mb-0 mt-2">
            {{employee.first_name}} {{employee.last_name}}
            <!-- alert words -->
            <!-- <span>
              <v-btn @click.stop="openAlertRaised()" flat icon color="red" style="margin: 0 0 0 -6px;" v-if="employee.alert_raised">
                <v-icon small>fas fa-exclamation-triangle</v-icon>
              </v-btn>
            </span> -->
          </p>
          <!-- <p class="subheading">
            {{employee.designation}} {{employee.department}}
          </p> -->
        </v-flex>

        <v-spacer> </v-spacer>

      <v-flex xs2 text-sm-right class="status-select" v-if="employee.user_completed_session_count > 0" :class="employee.status === 'inactive' ? 'emp-disable' : 'emp-enable'">
        <p class="pb-0 mb-0" style="text-align: center;margin-left: 30px;font-size: 14px;">Resolution Status</p>
        <div class="status-chip-wrap">
          <v-tooltip bottom class="left">
            <v-chip
              :disabled="statusConfig.loading || !employee.last_chat_action_status || employee.last_chat_action_status === 'Na' "
              :class="{
                'primary primary--text': employee.last_chat_action_status === 'open',
                '#37b99c amara--text': employee.last_chat_action_status === 'scheduled',
                'info info--text': employee.last_chat_action_status === 'inProgress',
                'success success--text': employee.last_chat_action_status === 'resolved',
                'deep-orange deep-orange--text': employee.last_chat_action_status === 'acknowledged',
              }"
              slot="activator"
              class="status-chip elevation-0 mr-0 text-capitalize"
              outline
              @click="statusConfig.actionMenu[employee.id] = !statusConfig.actionMenu[employee.id]"
            >
              <span v-if="employee.last_chat_action_status">{{employee.last_chat_action_status}} </span>
              <span v-else> NA </span>
            </v-chip>
            Current Status
          </v-tooltip>
          <v-tooltip bottom class="right">
          <v-menu offset-y slot="activator">
            <v-btn
              slot="activator"
              :disabled="statusConfig.loading || !employee.last_chat_action_status || employee.last_chat_action_status === 'Na'"
              icon
              :class="{
                'primary primary--text': employee.last_chat_action_status === 'open',
                '#37b99c amara--text': employee.last_chat_action_status === 'scheduled',
                'info info--text': employee.last_chat_action_status === 'inProgress',
                'success success--text': employee.last_chat_action_status === 'resolved',
                'deep-orange deep-orange--text': employee.last_chat_action_status === 'acknowledged',
              }"
              class="dropdown-chip ml-0 b-left"
              small outline
            >
              <v-icon>fas fa-caret-down</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile
                v-for="(item, i) in getStatusConfigActions(employee.last_chat_action_status)"
                v-if="employee.last_chat_action_status !== item.status"
                :key="i"
                @click="item.action(employee, item.dialog || item.status)"
              >
                <v-list-tile-title>
                  <v-icon class="mr-2">{{item.icon}}</v-icon>
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          Update status of this employee
        </v-tooltip>
        </div>
        <!-- <v-select
          :items="statusConfig.actions"
          class="transparent status-select"
          item-text="title"
          item-value="item.dialog || item.status"
          v-model="employee.last_chat_action_status"
          placeholder="Status"
          solo
        ></v-select> -->
      </v-flex>

      <v-flex xs2 text-sm-right v-if="employee.user_completed_session_count > 0" class="assigned-select" style="margin-left: -3%;" :class="employee.status === 'inactive' ? 'emp-disable' : 'emp-enable'">
        <!-- <v-select
          :items="getAdminUsers"
          class="transparent status-select"
          @change="updateAssignee(employee, employee.last_chat_assignedTo)"
          :disabled="!checkPermission(['manage_employee']) || config.loading || employee.last_chat_action_status === 'Na'"
          item-text="display_name"
          item-value="user_id"
          v-model="employee.last_chat_assignedTo"
          placeholder="Assign To"
          solo
        ></v-select> -->
        <p class="pb-0 mb-0" style="text-align: center;margin-left: -6px;font-size: 14px;">Assigned To</p>
        <div class="assigned-to-wrap">
          <div class="left">
            <v-chip
              :disabled="!checkPermission(['manage_employee']) || config.loading || employee.last_chat_action_status === 'Na'"
              slot="activator"
              class="status-chip elevation-0 mr-0 text-capitalize assign-select"
              style="border: 1px solid #4c409d;"
              outline
            >
              <span v-if="lastChatAssignedTo">{{lastChatAssignedTo}}</span>
              <span v-else> Not assigned </span>
            </v-chip>
          </div>
          <div class="right">
            <v-menu offset-y slot="activator">
              <v-btn
                slot="activator"
                :disabled="!checkPermission(['manage_employee']) || config.loading || employee.last_chat_action_status === 'Na'"
                icon
                class="dropdown-chip ml-0 b-left"
                small outline
                style="border: 1px solid #4c409d"
              >
                <v-icon @click="getAdminUsers()">fas fa-caret-down</v-icon>
              </v-btn>
              <v-list v-if="adminUsersList && adminUsersList.length > 0">
                <v-list-tile v-for="(item, i) in adminUsersList" :key="i" @click="updateAssigneeSelect(employee, i)">
                  <v-list-tile-title>
                    <!-- <v-icon class="mr-2">{{item.icon}}</v-icon> -->
                    {{ item.display_name }}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </div>
      </v-flex>
        <!-- <v-flex xs2>
          <v-tooltip
            bottom
          >
            <v-chip
              :disabled="config.loading || !employee.last_chat_action_status || employee.last_chat_action_status === 'Na' "
              :class="{
                'primary primary--text': employee.last_chat_action_status === 'open',
                '#37b99c amara--text': employee.last_chat_action_status === 'scheduled',
                'info info--text': employee.last_chat_action_status === 'inProgress',
                'success success--text': employee.last_chat_action_status === 'resolved',
              }"
              slot="activator"
              class="status-chip elevation-0 mr-0 text-capitalize"
              outline
              @click="config.actionMenu = !config.actionMenu"
            >
              <span v-if="employee.last_chat_action_status"> {{employee.last_chat_action_status}} </span>
              <span v-else> NA </span>
            </v-chip>
            Current Status
          </v-tooltip>

          <v-tooltip
            bottom
          >
            <v-menu offset-y slot="activator" v-model="config.actionMenu">
              <v-btn
                slot="activator"
                :disabled="config.loading || !employee.last_chat_action_status || employee.last_chat_action_status === 'Na'"
                icon
                :class="{
                  'primary primary--text': employee.last_chat_action_status === 'open',
                  '#37b99c amara--text': employee.last_chat_action_status === 'scheduled',
                  'info info--text': employee.last_chat_action_status === 'inProgress',
                  'success success--text': employee.last_chat_action_status === 'resolved',
                }"
                class="dropdown-chip ml-0 b-left"
                small outline
              >
                <v-icon>fas fa-caret-down</v-icon>
              </v-btn>
              <v-list v-if="employee.last_chat_action_status">
                <v-list-tile v-for="(item, i) in config.actions" :key="i"
                v-if="employee.last_chat_action_status !== item.status"
                @click="item.action(employee, item.dialog || item.status)"
                :disabled="item.action && !checkPermission(item.permission)">
                  <v-list-tile-title>
                    <v-icon class="mr-2">{{item.icon}}</v-icon>
                    {{ item.title }}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            Update status of this employee
          </v-tooltip>
        </v-flex>-->

        <!-- Action Buttons -->
        <v-flex text-sm-right xs3 class="text-sm-right action-buttons" :class="employee.status === 'inactive' ? 'emp-disable' : 'emp-enable'" style="margin-left: -4%;">

          <v-tooltip
            bottom
          >
            <v-btn
              slot="activator"
              color="primary" icon outline
              :disabled="config.loading || !checkPermission(['manage_employee'])"
              @click="updateAmaraStatus(employee, {
                interactions_active: !employee.interactions_active
              })"
            >

            <!-- <v-switch  style="width:20px; display:inline-block; float:left; padding: 2% 0 0 15%;"
            color="primary"
            slot="activator"
            @change="updateStatus(employee, {
                interactions_active: employee.interactions_active
              })"
            v-model="employee.interactions_active"
            primary
          ></v-switch> -->
              <v-icon small v-show="employee.interactions_active">fas fa-user-times</v-icon>
              <v-icon small v-show="!employee.interactions_active">fas fa-user-check</v-icon>
            </v-btn>
            <span v-show="employee.interactions_active && checkPermission(['manage_employee'])">
              Stop Amara from interacting with this employee.
            </span>
            <span v-show="!employee.interactions_active && checkPermission(['manage_employee'])">
              Enable Amara to interact with this employee.
            </span>
            <span v-show="config.loading || !checkPermission(['manage_employee'])">You don't have permission to perform this action</span>
          </v-tooltip>

          <!--Acknowledge -->
          <v-tooltip bottom>
            <v-btn slot="activator" color="primary" icon outline
              @click="openDialog(employee, 'Acknowledge')"
              :disabled="isAcknowledge(employee.user_completed_session_count)"
              class="elevation-0">
              <v-icon small>fas fa-check-square</v-icon>
            </v-btn>
            <span v-show="checkPermission(['acknowledge_chat'])">Acknowledge</span>
            <span v-show="!checkPermission(['acknowledge_chat'])">You don't have permission to perform this action</span>
          </v-tooltip>

          <!-- Email -->
          <v-tooltip bottom>
            <v-btn slot="activator" color="primary" icon outline
              @click="openDialog(employee, 'EmailEmployee')"
              :disabled="!checkPermission(['send_email'])"
              class="elevation-0">
              <v-icon small>fas fa-envelope</v-icon>
            </v-btn>
            <span v-show="checkPermission(['send_email'])">Email</span>
            <span v-show="!checkPermission(['send_email'])">You don't have permission to perform this action</span>
          </v-tooltip>
          <!-- SMS -->
          <!-- <v-tooltip bottom> -->
            <!--<v-btn slot="activator" color="primary" icon outline
              @click="openDialog(employee, 'SMSEmployee')"
              :disabled="!checkPermission(['send_sms'])"
              class="mt-4 elevation-0">
              <v-icon small>fas fa-comment</v-icon>
            </v-btn>-->
            <!-- <v-btn slot="activator" color="primary" icon outline
              @click="openDialog(employee, 'SMSEmployee')"
              :disabled="!checkPermission(['send_sms'])"
              class="mt-3 elvation-0">
              <v-icon small>fas fa-comment</v-icon>
            </v-btn>
            <span v-show="checkPermission(['send_sms'])">SMS</span>
            <span v-show="!checkPermission(['send_sms'])">You don't have permission to perform this action</span> -->
          <!-- </v-tooltip> -->

          <!-- Call -->

          <!-- Schedule one on one -->
          <v-tooltip bottom>
            <v-btn slot="activator" color="primary" icon outline
              @click="openDialog(employee, 'oneOnOne')"
              :disabled="!checkPermission(['schedule_invite'])"
              class="elevation-0">
              <v-icon small>flaticon-012-meeting</v-icon>
            </v-btn>
            <span v-show="checkPermission(['schedule_invite'])">Schedule Meeting</span>
            <span v-show="!checkPermission(['schedule_invite'])">You don't have permission to perform this action</span>
          </v-tooltip>
        </v-flex>

        <v-flex xs1 :class="employee.status === 'inactive' ? 'emp-disable' : 'emp-enable'" text-sm-right style="margin-left: -5%;">
          <v-menu offset-y style="margin-top: 1rem;">
            <v-btn
              slot="activator"
              color="adhoc"
              dark
              small
              flat
              icon
            >
              <v-icon small>fas fa-ellipsis-v</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-list-tile-title @click="openDialog(employee, 'CallEmployee')" style="cursor:pointer;">
                  <v-icon small>fas fa-phone</v-icon>
                    Call employee
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile v-show="checkPermission(['send_sms'])">
                <v-list-tile-title @click="openDialog(employee, 'SMSEmployee')" style="cursor:pointer;">
                  <v-icon small>fas fa-comment</v-icon>
                    SMS
                </v-list-tile-title>
              </v-list-tile>
                  <!-- <v-tooltip bottom>
                    <v-btn slot="activator" color="primary" icon outline
                      @click="openDialog(employee, 'CallEmployee')"
                      :disabled="!checkPermission(['place_call'])"
                      class="mt-4 elevation-0">

                    </v-btn>
                    <span v-show="checkPermission(['place_call'])">Call</span>
                    <span v-show="!checkPermission(['place_call'])">You don't have permission to perform this action</span>
                  </v-tooltip> -->
            </v-list>
          </v-menu>
        </v-flex>
      </v-layout>

    </div>

    <div class="employee-overview-details">
    <!-- Employee View Tabs -->
    <v-layout mt-1 row wrap style="z-index:2;height:calc(100% - 70px)">
      <v-flex>
        <v-card class="elevation-0 mb-2 no-border fill-height">
          <v-tabs
            ref="tabs"
            class="custom-dashboard-tabs fill-height view-employee-header"
            :class="config.activeTab === 'tab-overview' ? 'overview-active' : ''"
            grow
            v-model="config.activeTab"
            centered
            color="transparent"
            slider-color="primary"
          >
            <v-tab
              class="mr-2 text-capitalize"
              v-for="(t, ti) in config.tabs"
              :key="ti"
              :href="`#tab-${t.value}`"
              @click="getTabData(t.value)"
            >
              <span v-if="ti === 0"> </span>
              {{t.title}}
              <strong class="ml-2" v-if="t.count">
                {{t.count ? '('+t.count+')' : ''}}
              </strong>
              <v-tooltip max-width="200" bottom v-show="t.about" class="ml-2">
                <v-icon
                slot="activator"
                >fas fa-info-circle</v-icon>
                {{t.about}}
              </v-tooltip>
            </v-tab>

            <v-tabs-items v-model="config.activeTab" class="employee-dashboard-tab-item background-custom-grey" :class="{
              'b-top': config.activeTab !== 'tab-overview',
              }">

              <v-alert :value="true" color="#4c409d" outline v-if="employee.status === 'inactive'" style="margin: 1% 1% -0.5% 1%;">
                This employee has exited
              </v-alert>
              <!-- Overview Tab-->
              <v-tab-item value="tab-overview" class="fill-height">
                <EmployeeOverview class="pt-4 px-3" ref="EmployeeOverview" v-show="config.activeTab === 'tab-overview'" />
                <!-- <EmployeeLifecycle class="mx-4 my-2" ref="EmployeeLifecycle" /> -->
              </v-tab-item>

              <!-- Timeline Tab -->
              <v-tab-item value="tab-activity" class="fill-height">
                <EmployeeTimeline ref="EmployeeTimeline" class="mx-4" @editTimeLineInvite="editInvite" />
              </v-tab-item>

              <!-- Profile -->
              <v-tab-item value="tab-profile" class="fill-height">
                <UserProfile ref="UserProfile" />
              </v-tab-item>

              <!-- Milestone Chats -->
              <v-tab-item value="tab-lifecycle" class="fill-height">
                <LifecycleTranscript ref="LifecycleTranscript" />
              </v-tab-item>

              <!-- Notes / Comments Tab -->
              <v-tab-item value="tab-comments" class="fill-height">
                <Comments ref="Comments" class="ma-4 pa-4" />
              </v-tab-item>

              <!-- Adhoc Chats -->
              <v-tab-item value="tab-adhoc-campaigns" class="fill-height">
                <AdhocTranscript ref="AdhocTranscript" />
              </v-tab-item>

              <!-- Schedule Tab -->
              <!-- <v-tab-item value="tab-schedule">
                <EmployeeSchedule class="mx-4" />
              </v-tab-item> -->
            </v-tabs-items>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
    </div>

    <DeleteEmployee ref="deleteEmployee" />
    <OneOnOne ref="oneOnOne" @getEmployee="getEmployee(employeeId)" @updateTimeLine="updateTimeLine"/>
    <Acknowledge ref="Acknowledge" @getEmployee="getEmployee(employeeId)"/>
    <EmailEmployee ref="EmailEmployee" @getEmployee="getEmployee(employeeId)"/>
    <SMSEmployee ref="SMSEmployee" @getEmployee="getEmployee(employeeId)"/>
    <CallEmployee ref="CallEmployee" @getEmployee="getEmployee(employeeId)"/>
    <alertRaisedDialog ref="alertDialog"></alertRaisedDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import { VChip, VMenu, VSubheader, VSwitch, VTooltip, VAlert } from 'vuetify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import UserProfile from '../settings/UserProfile';
import EmployeeTimeline from './EmployeeTimeline';
import DeleteEmployee from './dialogs/DeleteEmployee';
import OneOnOne from './dialogs/OneOnOne';
import Acknowledge from './dialogs/Acknowledge';
import EmailEmployee from './dialogs/EmailEmployee';
import SMSEmployee from './dialogs/SMSEmployee';
import CallEmployee from './dialogs/CallEmployee';
// import EmployeeLifecycle from '../analytics/EmployeeLifecycle';
import EmployeeOverview from '../analytics/EmployeeOverview';
import alertRaisedDialog from './dialogs/alertRaisedDialog';

const LifecycleTranscript = () => import(/* webpackChunkName: "LifecycleTranscript" */ '../elements/ChatTranscript');
const AdhocTranscript = () => import(/* webpackChunkName: "AdhocTranscript" */ '../elements/AdhocTranscript');
const Comments = () => import(/* webpackChunkName: "Comments" */ './Comments');

dayjs.extend(relativeTime);

export default {
  name: 'dashboard',
  components: {
    // ContentLoader,
    Acknowledge,
    EmailEmployee,
    // VChip,
    // VSwitch,
    EmployeeTimeline,
    EmployeeOverview,
    DeleteEmployee,
    LifecycleTranscript,
    AdhocTranscript,
    // VMenu,
    // dayjs,
    // VSubheader,
    OneOnOne,
    UserProfile,
    // EmployeeLifecycle,
    Comments,
    // VTooltip,
    SMSEmployee,
    CallEmployee,
    // VAlert,
    alertRaisedDialog
  },
  data () {
    return {
      employeeId: null,
      employeeListReference: null,
      adminUsersList: [],
      config: {
        loading: false,
        actionMenu: false,
        editable: false,
        initialLoading: true,
        initialLoadingFilters: true,
        actions: [
          {
            title: 'Delete',
            icon: 'fas fa-trash',
            dialog: 'deleteEmployee',
            action: this.openDialog
          }
        ],
        activeTab: 'tab-overview',
        tabs: [{
          title: 'Overview',
          value: 'overview'
        }, {
          title: 'Chat',
          value: 'lifecycle'
        }, {
          title: 'Activity',
          value: 'activity'
        }, {
          title: 'Comments',
          value: 'comments'
        // }, {
        //   title: 'Ad-hoc Campaigns',
        //   value: 'adhoc-campaigns',
        }, {
          title: 'Profile',
          value: 'profile'
        }]
      },
      statusConfig: {
        actionMenu: {},
        panel: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
        initialLoading: true,
        initialLoadingFilters: true,
        actions: {
          open: [
            {
              title: 'Acknowledge Chat',
              icon: 'fas fa-check-square',
              status: 'acknowledged',
              dialog: 'Acknowledge',
              action: this.openDialog,
              permission: ['acknowledge_chat']
            }, {
              title: 'Schedule meeting',
              icon: 'flaticon-012-meeting',
              status: 'scheduled',
              dialog: 'oneOnOne',
              action: this.openDialog,
              permission: ['schedule_invite']
            }, {
              title: 'Work In Progress',
              icon: 'flaticon-047-conversation',
              status: 'inProgress',
              action: this.updateStatus,
              permission: ['change_status']
            }, {
              title: 'Resolved',
              icon: 'fas fa-check',
              status: 'resolved',
              action: this.updateStatus,
              permission: ['change_status']
            }
          ],
          acknowledged: [
            {
              title: 'Schedule meeting',
              icon: 'flaticon-012-meeting',
              status: 'scheduled',
              dialog: 'oneOnOne',
              action: this.openDialog,
              permission: ['schedule_invite']
            }, {
              title: 'Resolved',
              icon: 'fas fa-check',
              status: 'resolved',
              action: this.updateStatus,
              permission: ['change_status']
            }
          ],
          scheduled: [
            {
              title: 'Acknowledge Chat',
              icon: 'fas fa-check-square',
              status: 'acknowledged',
              dialog: 'Acknowledge',
              action: this.openDialog,
              permission: ['acknowledge_chat']
            }, {
              title: 'Resolved',
              icon: 'fas fa-check',
              status: 'resolved',
              action: this.updateStatus,
              permission: ['change_status']
            }
          ],
          inProgress: [
            {
              title: 'Acknowledge Chat',
              icon: 'fas fa-check-square',
              status: 'acknowledged',
              dialog: 'Acknowledge',
              action: this.openDialog,
              permission: ['acknowledge_chat']
            }, {
              title: 'Schedule meeting',
              icon: 'flaticon-012-meeting',
              status: 'scheduled',
              dialog: 'oneOnOne',
              action: this.openDialog,
              permission: ['schedule_invite']
            }, {
              title: 'Resolved',
              icon: 'fas fa-check',
              status: 'resolved',
              action: this.updateStatus,
              permission: ['change_status']
            }
          ],
          resolved: [
            {
              title: 'Work In Progress',
              icon: 'flaticon-047-conversation',
              status: 'inProgress',
              action: this.updateStatus,
              permission: ['change_status']
            }
          ]
        }
      },
      dialogs: {
        delete: false
      },
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      employee: {},
      employeeMain: {},
      lastChatAssignedTo: null
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      adminUsers (state) {
        const adminUsers = state.companyAdminsList;
        return adminUsers;
      }
    })
  },
  methods: {
    ...mapActions(['getAdminList']),
    getStatusConfigActions (type) {
      return this.statusConfig.actions[type];
    },
    getAdminUsers () {
      const temp = {
        display_name: 'Remove Assignee',
        user_id: null
      };
      let t = [];
      t = this.adminUsers;
      if (this.employee.last_chat_assignedTo && this.employee.last_chat_assignedTo !== null) {
        if (t && t.length > 0 && t[0].display_name !== 'Remove Assignee') {
          t.unshift(temp);
          this.adminUsersList = t;
        }
      } else {
        if (t && t.length > 0 && t[0].display_name === 'Remove Assignee') {
          t.splice(0, 1);
        }
        this.adminUsersList = t;
      }
    },
    goBack () {
      this.employeeId = null;
      if (this.employeeListReference) {
        this.employeeListReference.drawer = false;
        this.employeeListReference.employeeInView = null;
      }
      this.$router.push(
        {
          path: '/employees'
        }
      );
    },
    updateAmaraStatus (emp, key) {
      axios.patch(`${process.env.VUE_APP_API_URL}users/update/${this.employee.id}`, key).then((response) => {
        // console.log('response', response);
        if (response.data.status === 200) {
          this.employee = response.data.message;
          this.getEmployee(this.employeeId);
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Employee updated successfully!'
          });
          this.config.editable = false;
        } else {
          this.config.loading = false;
          this.config.editable = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to save employee, Please try again later!'
          });
        }
      });
      // const temp = {...key, id: 'amara' };
      // this.updateStatus(emp, temp);
    },
    isAcknowledge (chatCount) {
      if (chatCount && chatCount > 0) {
        return false;
      } else {
        return true;
      }
    },
    updateStatus (s, newStatus) {
      // console.log('s, newStatus', s, newStatus);
      this.config.loading = true;
      // this.table.loading = true;
      let payloadData = '';
      if (newStatus.id === 'amara') {
        payloadData = {
          interactions_active: newStatus.interactions_active
        };
      } else {
        payloadData = {
          action_status: newStatus
        };
      }
      axios.patch(`${process.env.VUE_APP_API_URL}session/update/${s.last_chat_id}`, payloadData).then((response) => {
        this.config.loading = false;
        if (response && response.data) {
          // s.last_chat_assignedTo = assignedTo;
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee status updated!'
          });
          // this.employee = {...this.employee, ...newStatus };
          // console.log('this.employeeId', this.employeeId);
          this.getEmployee(this.employeeId);
          // this.$emit('getUpdatedTeam');
        } else {
          // this.table.loading = false;
          this.config.loading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update status, Please try again later!'
          });
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update status, Please try again later!'
        });
        throw new Error(response);
      });
    },
    updateAssigneeSelect (emp, index) {
      const adminList = this.adminUsersList;
      const id = adminList[index].user_id;
      this.updateAssignee(emp, id);
    },
    updateAssignee (s, assignedTo) {
      this.config.loading = true;
      axios.patch(`${process.env.VUE_APP_API_URL}session/update/${s.last_chat_id}`, {
        // action_status: newStatus,
        assignedTo_id: assignedTo
      }).then((response) => {
        this.config.loading = false;
        if (response && response.data) {
          // s.action_status = newStatus;
          s.assignedTo = assignedTo;
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee status updated!'
          });
          this.getEmployee(this.employeeId);
        } else {
          this.config.loading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update status, Please try again later!'
          });
        }
      }, (response) => {
        this.config.loading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update status, Please try again later!'
        });
        throw new Error(response);
      });
    },
    difference (object, base) {
      return this.$lodash.transform(object, (result, value, key) => {
        if (!this.$lodash.isEqual(value, base[key])) {
          result[key] = this.$lodash.isObject(value) &&
          this.$lodash.isObject(base[key]) ? this.difference(value, base[key]) : value;
        }
      });
    },
    // openDialog(data, type) {
    //   console.log(this.$refs);
    //   console.log(type);
    //   // this.$refs["type"] = $type;
    //   if (type === 'CallEmployee' && !this.checkPermission(['place_call'])) {
    //     return;
    //   }
    //   if (type === 'oneOnOne' && !this.checkPermission(['schedule_invite'])) {
    //     return;
    //   }
    //   if (type && this.$refs[type]) {
    //     this.$refs[type].open = true;
    //     this.$refs[type].employee = data;
    //   }
    // },
    // openDialog(data, type) {
    //   console.log(this.$refs);
    //   console.log(type);
    //   // this.$refs["type"] = $type;
    //   if (type && this.$refs[type]) {
    //     this.$refs[type].open = true;
    //     this.$refs[type].employee = data;
    //   }
    // },
    getTabData (tab) {
      switch (tab) {
        case 'overview' :
          // setTimeout(() => {
          // document.getElementById('driver-heatmap').innerHTML = '';
          this.getEmployee(this.employeeId);
          // }, 100);
          break;
        case 'activity' :
          this.$refs.EmployeeTimeline.getTimeline(this.employeeId);
          break;
        case 'profile' :
          this.$refs.UserProfile.getEmployee(this.employeeId);
          this.$refs.UserProfile.employeeReference = this;
        // eslint-disable-next-line no-fallthrough
        case 'lifecycle':
          if (this.employee.user_latest_session_interactions) {
            this.$refs.LifecycleTranscript.chat.transcript = [];
            this.$refs.LifecycleTranscript.chat.activeSessionIndex = 1;
            this.$refs.LifecycleTranscript.employee = this.employee;
            this.$refs.LifecycleTranscript.getTranscript(false, this.employee.user_latest_session_interactions);
          }
          break;
        case 'adhoc-campaigns':
          if (this.employee.user_lifecycle_session_data) {
            this.$refs.AdhocTranscript.getTranscript(this.employee.user_adhoc_session_data);
            this.$refs.AdhocTranscript.employee = this.employee;
          }
          break;
        case 'comments':
          this.$refs.Comments.employee = this.employee;
          // if (this.employee.user_lifecycle_session_data &&
          //   this.employee.user_lifecycle_session_data.length > 0) {
          //   this.$refs.Comments.newNote.session = this.employee.user_lifecycle_session_data[this.employee.user_lifecycle_session_data.length - 1].id;
          // }
          // if (this.employee.latest_session_driverwise_subdrivers &&
          //   this.employee.latest_session_driverwise_subdrivers.id) {
          //   this.$refs.Comments.newNote.session = this.employee.latest_session_driverwise_subdrivers.id;
          // }
          this.$refs.Comments.newNote.user = this.employee.user_id;
          this.$refs.Comments.getComments(this.employee.user_id);
          this.$refs.Comments.getUID(this.employee.user_id);
          break;
        default:
      }
    },
    editInvite (item) {
      // console.log('item', item);
      const tempData = { ...this.employee, invite: item };
      this.openDialog(tempData, 'oneOnOne');
    },
    openDialog (data, type) {
      if (type && this.$refs[type]) {
        if (type === 'oneOnOne' && data.invite && data.invite.type === 'delete') {
          this.$refs[type].deleteModal = true;
        } else {
          this.$refs[type].open = true;
        }
        this.$refs[type].employee = data;
      }
    },
    updateTimeLine () {
      this.$refs.EmployeeTimeline.getTimeline(this.employeeId);
      this.getEmployee(this.employeeId);
    },
    update () {},
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
    saveEmployee () {
      this.config.loading = true;
      const diff = this.difference(this.employee, this.employeeMain);
      axios.patch(`${process.env.VUE_APP_API_URL}users/update/${this.employee.id}`, diff).then((response) => {
        this.config.loading = false;
        this.config.editable = false;
        if (response && response.data && response.data.status === 200) {
          this.employee = { ...diff, ...this.employee };
          this.employeeMain = JSON.parse(JSON.stringify(this.employee));
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Employee updated successfully!'
          });
          this.config.editable = false;
        } else {
          this.config.loading = false;
          this.config.editable = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to save employee, Please try again later!'
          });
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to save employee, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getEmployee (id) {
      if (this.$refs.EmployeeOverview && this.$refs.EmployeeOverview.config) {
        this.$refs.EmployeeOverview.config.initialLoading = true;
      }
      const queryParams = {
        fields: 'engagement_score,last_milestone,high_potential_emp,latest_session_driver,latest_session_driverwise_subdrivers,last_chat_completedAt,user_session_count,user_inProgress_session_count,user_completed_session_count,user_completed_session_driverwise_subdrivers,user_latest_session_interactions,user_completed_session_mood,formatted_question_text,formatted_response_text,first_name,last_name,display_name,sub_type,email,location,phoneNumber,profilePicture,gender,designation,status,employee_id,department,user_id,last_chat_action_status,last_chat_id,last_chat_session_id,last_chat_assignedTo,last_chat_assignedTo_email,last_chat_assignedTo_display_name,interactions_active,alert_raised,alert_words'
      };
      axios.get(`${process.env.VUE_APP_API_URL}users/${id}/details`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data && this.$refs.EmployeeOverview && this.$refs.EmployeeOverview.config) {
          this.$refs.EmployeeOverview.config.initialLoading = false;
          this.employee = response.data;
          this.$store.dispatch('updateTeam', this.employee);
          this.getAdminUsers();
          // this.$emit('getUpdatedTeam');
          this.lastChatAssignedTo = this.employee.last_chat_assignedTo_display_name;
          if (this.employee.last_chat_action_status === 'Na') {
            this.employee.last_chat_action_status = '';
          }
          // Overview
          this.$refs.EmployeeOverview.employee = response.data;
          this.$refs.EmployeeOverview.employeeDashboardReference = this;
          // this.$refs.EmployeeOverview.generateParticipation(response.data.user_engagement_session_stats);
          this.$refs.EmployeeOverview.updateDrivers();
          this.$refs.EmployeeOverview.getHeatMapData();
          let string = null;
          if (this.$sroute && this.$route.query && this.$route.query.search) {
            string = this.$route.query.search;
            this.$refs.EmployeeOverview.employeeDashboardReference.employeeListReference.getTeam(string);
          }
          if (response.data.user_completed_session_mood && response.data.user_completed_session_mood.length) {
            this.$refs.EmployeeOverview.getVibeOverTime(response.data.user_completed_session_mood);
          }
          this.employeeMain = JSON.parse(JSON.stringify(response.data));

          this.config.actionMenu = false;
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$refs.EmployeeOverview.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch employee, Please try again later!'
        });
        throw new Error(response);
      });
    },
    openAlertRaised () {
      this.$refs.alertDialog.empAlert = this.employee.alert_words;
      this.$refs.alertDialog.empName = this.employee.display_name;
      this.$refs.alertDialog.showAlertRaised = true;
    }
  },
  beforeMount () {
    this.getAdminList();
    this.$nextTick(() => {
      this.getAdminUsers();
    });
    // if (this.employeeId) {
    //   this.getEmployee(this.employeeId);
    // }
    if (this.$route.query && this.$route.query.activeTab) {
      this.config.activeTab = `tab-${this.$route.query.activeTab}`;
    }
  },
  watch: {
    adminUsers () {
      this.getAdminUsers();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.action-buttons {
  .v-btn--icon {
    border-radius: 6px !important;
    height: 42px !important;
    width: 42px !important;
  }
}
.dropdown-chip {
  height: 42px;
  border-radius: 0 10px 10px 0px !important;
  margin: 4px 4px 4px 0px !important;
  width: 32px;
}
.status-chip {
  border-radius: 10px 0 0 10px !important;
  height: 42px !important;
  width:110px !important;
}
.assignee {
  position: relative !important;
  top: 24px !important;
}

// .assignee {
//   &.theme--light {
//     &.v-text-field {
//       .v-input__control {
//         .v-input__slot {
//           &:before {
//             border: 0px!important;
//           }
//           .v-select__slot {
//             border: 1px solid rgba(0,0,0,0.42)!important;
//             border-radius: 8px!important;
//             padding: 4px 4px!important;
//             label {
//               padding: 0 5px !important;
//             }
//           }
//         }
//       }
//     }
//   }
// }
.header {
  height: 5rem;
}
.emp-disable {
  opacity: 0.4;
  pointer-events: none;
}
</style>

<style lang="scss">
.employee-dashboard-tab-item {
  // height: calc(100% - 50px)!important;
  height: 90vh !important;
  overflow-y: auto!important;
  .v-window__container {
    height: 100%!important;
  }
}
.view-employee-header .v-tabs__bar {
    box-shadow: 0px 4px 6px #D4D4D4 !important;
    z-index: 99 !important;
}
.status-select.theme--light.v-text-field .v-input__control .v-input__slot {
  box-shadow: none;
  background: transparent;
  border: 1px solid #4c409d;
}
.assignee.theme--light.v-text-field .v-input__control .v-input__slot .v-select__slot {
    border: 1px solid #4c409d !important;
    border-radius: 8px !important;
    padding: 4px 4px !important;

    label {
      padding: 0 5px !important;
      margin-top: -5px !important;
    }
}
.assign-select {
  .v-chip__content {
    white-space: unset;
  }
}
.status-chip-wrap {
  display: inline-block;
  width: 150px;
  .left {
    float: left;
    .status-chip {
      width: 110px;
    }
  }
  .right {
    float: right;
  }
}
.status-select {
  p {
    padding-top: 6px;
  }
}
.assigned-select {
  p {
    padding-top: 6px;
  }
}
.assigned-to-wrap {
  display: inline-block;
  width: 150px;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
}
.layout {
  .action-buttons {
    margin-top: 22px;
  }
}
</style>

<style lang="scss">
@media (max-width: 575.98px) {}

@media (min-width: 576px) and (max-width: 767.98px) {}

@media (min-width: 768px) and (max-width: 991.98px) {
  .header {
    height: 4rem !important;
    .layout {
      .status-select {
        p {
          font-size: 6px !important;
        }
        .status-chip-wrap {
          width: 80px !important;
          .left {
            .status-chip {
              width: 58px !important;
              height: 26px !important;
              .v-chip__content {
                span {
                  font-size: 8px !important;
                }
              }
            }
          }
          .right {
            .dropdown-chip {
              width: 14px !important;
              height: 26px !important;
            }
          }
        }
      }
      .assigned-select {
        // margin-top: -90px !important;
        p {
          font-size: 6px !important;
        }
        .assigned-to-wrap {
          width: 80px !important;
          .left {
            .status-chip {
              width: 58px !important;
              height: 26px !important;
              .v-chip__content {
                span {
                  font-size: 8px !important;
                }
              }
            }
          }
          .right {
            .dropdown-chip {
              width: 14px !important;
              height: 26px !important;
            }
          }
        }
      }
      .action-buttons {
        margin-top: 12px;
        margin-left: -2% !important;
        .v-btn--icon {
          height: 22px !important;
          width: 22px !important;
          .v-btn__content {
            .v-icon {
              font-size: 8px !important;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .header {
    height: 4rem !important;
    .layout {
      .arrow-icon,
      .emp-name {
        // margin-top: -95px;
      }
      .emp-name {
        .headline {
          font-size: 20px !important;
          margin-top: 0 !important;
        }
      }
      .status-select {
        // margin-top: -90px !important;
        p {
          // margin-left: -130px !important;
          font-size: 10px !important;
        }
        .status-chip-wrap {
          width: 120px !important;
          .left {
            .status-chip {
              width: 80px !important;
              height: 32px !important;
              .v-chip__content {
                font-size: 9px !important;
              }
            }
          }
          .right {
            .dropdown-chip {
              height: 32px !important;
            }
          }
        }
      }
      .assigned-select {
        // margin-top: -90px !important;
        p {
          font-size: 10px !important;
        }
        .assigned-to-wrap {
          width: 120px !important;
          .left {
            .status-chip {
              width: 80px !important;
              height: 32px !important;
            }
          }
          .right {
            .dropdown-chip {
              height: 32px !important;
            }
          }
        }
      }
      .action-buttons {
        margin-top: 12px;
        .v-btn--icon {
          height: 30px !important;
          width: 30px !important;
          .v-btn__content {
            .v-icon {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1200px) and (max-width: 1400px){
.header {
    height: 4rem !important;
    .layout {
      .emp-name {
        .headline {
          font-size: 20px !important;
          margin-top: 0 !important;
        }
      }
      .status-select {
        p {
          font-size: 10px !important;
        }
        .status-chip-wrap {
          width: 120px !important;
          .left {
            .status-chip {
              width: 80px !important;
              height: 32px !important;
            }
          }
          .right {
            .dropdown-chip {
              height: 32px !important;
            }
          }
        }
      }
      .assigned-select {
        // margin-top: -90px !important;
        p {
          font-size: 10px !important;
        }
        .assigned-to-wrap {
          width: 120px !important;
          .left {
            .status-chip {
              width: 80px !important;
              height: 32px !important;
            }
          }
          .right {
            .dropdown-chip {
              height: 32px !important;
            }
          }
        }
      }
      .action-buttons {
        margin-top: 12px;
        .v-btn--icon {
          height: 30px !important;
          width: 30px !important;
          .v-btn__content {
            .v-icon {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}

</style>
