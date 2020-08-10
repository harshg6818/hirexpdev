<template>
  <div class="disengaged-emp-to-meet-wrap">
    <v-data-table
      :headers="table.headers"
      :items="table.team"
      :loading="table.loading"
      class="employee-list"
      id="employee-list"
      :items-per-page="10"
    >
      <!-- <template slot="body" slot-scope="props"> -->
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="(item, index) in items" class="employeeTableRow" :key="index">
          <td style="width:14%">
            <div class="flex-row flex-wrap align-center">
              <v-flex>
                <p class="mb-0" v-show="item.user_display_name || item.user__display_name">
                  <span :class="{'hover-link cursor-pointer': $route.name !== 'ViewAdhoc'}"
                  @click="viewEmployee(item);">
                    {{item.user_display_name || item.user__display_name}}
                  </span>
                </p>
              </v-flex>
            </div>
          </td>
          <td style="width:14%">
            <p class="mb-0" v-if="item.stage_title">
              {{item.stage_title || item.stage__title}}
            </p>
            <p class="mb-0" v-else>
              -
            </p>
          </td>
          <td style="width:14%">
            <p class="" v-if="(item.completedAt && item.completedAt !== 'None')">
              {{dayjs(item.completedAt).from()}}
            </p>
            <p v-if="(!item.completedAt || item.completedAt === 'None') && !activeDriver"
            class="font-weight-bold grey--text">
              -
            </p>
          </td>
          <td class="text-xs-left" style="width:14%">
            <span class="" v-if="item.driverAverage"> {{item.driverAverage.toFixed(1)}} </span>
            <span class="font-weight-bold grey--text" v-else>-</span>
          </td>
          <td class="text-xs-left px-0" style="width:15%" @click.stop v-if="!activeDriver">
            <!-- Schedule one on one -->
            <span v-if="activeDriver" class="font-weight-bold grey--text">
              -
            </span>
            <v-tooltip
              bottom
            >
              <v-chip
                :disabled="config.loading"
                :loading="config.loading"
                :class="{
                  'primary primary--text': item.action_status === 'open',
                  '#37b99c amara--text': item.action_status === 'scheduled',
                  'info info--text': item.action_status === 'inProgress',
                  'success success--text': item.action_status === 'resolved',
                  'deep-orange deep-orange--text': item.action_status === 'acknowledged',
                }"
                style="width:110px !important;height:40px !important;"
                slot="activator"
                class="status-chip elevation-0 mr-0 text-capitalize"
                outlined
                @click="config.actionMenu[item.id] = !config.actionMenu[item.id]"
              >
                {{item.action_status}}
              </v-chip>
              Current Status
            </v-tooltip>

            <v-tooltip
              bottom
            >
              <v-menu offset-y slot="activator" v-model="config.actionMenu[item.id]">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    slot="activator"
                    v-bind="attrs" v-on="on"
                    :disabled="config.loading"
                    icon
                    :class="{
                      'primary primary--text': item.action_status === 'open',
                      '#37b99c amara--text': item.action_status === 'scheduled',
                      'info info--text': item.action_status === 'inProgress',
                      'success success--text': item.action_status === 'resolved',
                      'deep-orange deep-orange--text': item.action_status === 'acknowledged',
                    }"
                    class="dropdown-chip ml-0 b-left"
                    style="height:40px !important;"
                    small outlined
                  >
                    <v-icon>fas fa-caret-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, i) in config.actions" :key="i"
                  v-if="item.action_status !== item.status"
                  @click="item.action(item, item.dialog || item.status)"
                  :disabled="!item.action || !checkPermission(item.permission)">
                    <v-list-item-title>
                      <v-icon class="mr-2">{{item.icon}}</v-icon>
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              Update status of this employee
            </v-tooltip>
          </td>
          <td class="text-xs-left px-0">
            <v-chip
              :disabled="!checkPermission(['reply_anonymous_message']) || config.loading || item.action_status === 'Na'"
              slot="activator"
              class="status-chip elevation-0 mr-0 text-capitalize assign-to-select"
              style="width:110px !important;border: 1px solid #4c409d;height:40px !important;"
              outlined
            >
              <span v-if="item.assignedTo_display_name">{{item.assignedTo_display_name}}</span>
              <span v-else> Not assigned </span>
            </v-chip>

            <v-menu offset-y slot="activator">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :disabled="!checkPermission(['reply_anonymous_message']) || config.loading || item.action_status === 'Na'"
                  icon
                  class="dropdown-chip ml-0 b-left"
                  small outlined
                  v-bind="attrs" v-on="on"
                  style="border: 1px solid #4c409d;height:40px !important;"
                >
                  <v-icon @click="getAdminUsers(item)">fas fa-caret-down</v-icon>
                </v-btn>
                </template>
                <v-list v-if="getAdminUsersList && getAdminUsersList.length > 0">
                  <v-list-item v-for="(item, i) in getAdminUsersList" :key="i" @click="updateStatus(item, null, item.user_id)">
                    <v-list-item-title>
                      {{ item.display_name }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
          </td>
          <td class="text-xs-left px-0" style="width:14%">
            <v-btn flat outlined class="text-capitalize btn-text" color="primary" style="" @click.stop="viewEmployee(item);"> View employee </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
      <!-- <template slot="expand" slot-scope="props"> -->
      <template slot="expand">
        <div class="secondary px-4 py-2">
          <span v-show="!table.loadingInfo">
            <QuickView ref="QuickView" />
          </span>
          <v-progress-linear v-if="table.loadingInfo"
          :indeterminate="true"></v-progress-linear>
        </div>
      </template>
      <v-alert slot="no-data" :value="true" color="#fff" outlined>
        <span>
          <div style="height:300px">
            <div class="flex-row flex-wrap align-center justify-center fill-height">
              <v-flex class="text-center">
                <strong class="body-2 font-weight-bold grey--text">
                  Not enough data to generate analysis
                </strong>
              </v-flex>
            </div>
          </div>
        </span>
      </v-alert>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios';
import { VAlert, VTooltip, VChip } from 'vuetify';

import DisengagedMixin from './disengaged-mixin';

export default {
  name: 'DisengagedEmpToMeet',

  components: {
    VAlert,
    VTooltip,
    VChip
  },

  mixins: [DisengagedMixin],

  data () {
    return {
      config: {
        actionMenu: {},
        activeTab: 'high_risk_session',
        panel: [true, true, true, true],
        initialLoading: true,
        loading: false,
        initialLoadingFilters: true,
        actions: [
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
            dialog: 'OneOnOne',
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
        ]
      },
      activeDriver: false,
      table: {
        totalItems: 0,
        closedItems: 0,
        searchString: '',
        extraInfo: [],
        loadingInfo: true,
        loading: false,
        team: [],
        headers: [{
          text: 'Employee Details',
          align: 'left',
          sortable: false,
          width: '1%'
        }, {
          text: 'Last Touchpoint',
          align: 'left',
          sortable: false
        }, {
          text: 'Last Chat Completed',
          align: 'left',
          sortable: false
        // }, {
        //   text: 'Employee Vibe',
        //   align: 'left',
        //   sortable: false,
        }, {
          text: 'Engagement Score',
          align: 'left',
          sortable: false
        }, {
          text: 'Chat Status',
          align: 'left',
          sortable: false
        // },  {
        //   text: 'View more',
        //   align: 'left',
        //   sortable: false,
        }, {
          text: 'Assignee',
          align: 'left',
          sortable: false
        }, {
          text: '',
          align: 'left',
          sortable: false
        }]
      },
      pagination: {
        rowsPerPage: 10,
        page: 1
      }
    };
  },
  watch: {
    pagination: {
      handler () {
        // if (!this.config.initialLoading) {
        this.getEmployeesToMeet();
        // }
      },
      deep: true
    },
    $route () {
      if (this.$route.query && this.$route.query.driver) {
        this.activeDriver = true;
      } else {
        this.activeDriver = false;
      }
    }
  },

  beforeMount () {
    this.getEmployeesToMeet();
  },

  methods: {
    getEmployeesToMeet (employeeFilters) {
      // if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
      //   this.filters.selected = this.dashboardFilters.filters;
      //   this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
      // }
      let queryParams = {
        // initiated_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        // initiated_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
        // user__profile__high_potential_emp: this.dashboardFilters.highPotential,
        // action_status__in: this.actionStatus !== '' ? this.actionStatus : undefined,
      };
      // this.$lodash.each(this.filters.selected, (v, k) => {
      //   if (v.length > 0) {
      //     queryParams[`user__profile__${k}__in`] = v.join();
      //   }
      // });
      const params = {
        count: true,
        page_limit: this.pagination.rowsPerPage,
        page_offset: this.pagination.page || 1,
        // fields: 'user_display_name,user_email,user_department,stage_title,completedAt,session_driver,overall_mood,driverAverage,transcripts,user_profile_id,status,action_status,createdAt,',
        fields: 'user_display_name,user_email,user_department,stage_title,completedAt,session_driver,overall_mood,driverAverage,transcripts,user_profile_id,status,action_status,createdAt,assignedTo,assignedTo_email,assignedTo_display_name'
      };
      queryParams = {
        ...queryParams,
        ...employeeFilters,
        ...params
      };
      if (this.$route.name === 'ViewLifecycle' && this.$route.params && this.$route.params.stageId) {
        const temp = {
          stage_id: this.$route.params.stageId
        };
        queryParams = {
          ...queryParams,
          ...temp
        };
      }
      axios.get(`${process.env.VUE_APP_API_URL}disengaged/employees`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          if (response.data.disengaged_users) {
            // this.config.initialLoading = false;
            this.table.team = response.data.disengaged_users;
            this.$lodash.each(this.table.team, (v) => {
              this.getAdminUsers(v);
            });
            this.$lodash.each(this.table.team, (v) => {
              if (v.action_status === 'Na') {
                v.action_status = '';
              }
            });
            const actionMenu = {};
            this.$lodash.each(response.data.disengaged_users, (v) => {
              actionMenu[v.id] = false;
            });
            this.config.actionMenu = actionMenu;

            this.table.totalItems = response.data.count;
          }
        } else {
          // this.config.initialLoading = false;
        }
      }, (response) => {
        // this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch details, Please try again later!'
        });
        throw new Error(response);
      });
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
    getAdminUsers (emp) {
      const temp = {
        display_name: 'Remove Assignee',
        user_id: null
      };
      let t = [];
      t = this.adminUsers;
      if (emp.assignedTo && emp.assignedTo !== null) {
        if (t && t.length > 0 && t[0].display_name !== 'Remove Assignee') {
          t.unshift(temp);
          this.getAdminUsersList = t;
        }
      } else {
        if (t && t.length > 0 && t[0].display_name === 'Remove Assignee') {
          t.splice(0, 1);
        }
        this.getAdminUsersList = t;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.disengaged-emp-to-meet-wrap {
  margin: 0 10px;
  padding-bottom: 30px;
}
</style>
