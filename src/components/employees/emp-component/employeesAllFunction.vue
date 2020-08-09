<template>
  <div>functions</div>
</template>
<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
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
// import QuickView from '@/components/elements/QuickView';
// import UploadEmployee from './UploadEmployee';
// import DeleteEmployee from './dialogs/DeleteEmployee';
// import OneOnOne from './dialogs/OneOnOne';
// import Acknowledge from './dialogs/Acknowledge';
// import viewEmployee from '../employees/ViewEmployee';
// import BulkSMSEmployee from './dialogs/BulkSMSEmployee';
// import BulkEmailEmployee from './dialogs/bulkEmailEmployee';
// import SocketResponse from './dialogs/SocketResponse';
// import alertRaisedDialog from './dialogs/alertRaisedDialog';
// import UploadEmployees from './uploadEmployees';

Vue.use(VDateRange);

dayjs.extend(relativeTime);

export default {
  name: 'team',
  // components: {
  //   ContentLoader,
  //   UploadEmployee,
  //   VCheckbox,
  //   VAvatar,
  //   VTooltip,
  //   VAlert,
  //   VChip,
  //   VDialog,
  //   DeleteEmployee,
  //   dayjs,
  //   OneOnOne,
  //   Acknowledge,
  //   QuickView,
  //   VProgressLinear,
  //   VBottomSheet,
  //   VMenu,
  //   viewEmployee,
  //   BulkSMSEmployee,
  //   VSnackbar,
  //   BulkEmailEmployee,
  //   SocketResponse,
  //   // VSwitch,
  //   alertRaisedDialog,
  //   UploadEmployees
  // },
  data () {
    return {
      highPotentialSwitch: false,
      alertSwitch: false,
      bulkActionPayload: {
        show: true,
        action: '',
        assignedTo: '',
        actionStatus: true,
        successCount: 0,
        errorCount: 0
      },
      bulkActionConfig: {
        type: '',
        val: ''
      },
      warnDialog: false,
      continueWithSessionEmp: false,
      getSessionEmployeesSelected: {},
      getNonSessionEmployeesSelected: {},
      isEmployeeSelected: {},
      selected: null,
      bulkAdminUsersList: [],
      socketResponseUpdate: [],
      selectedEmpNumbers: [],
      selectedEmpEmails: [],
      getSelectedEmployees: 0,
      snackbar: {
        show: false,
        color: 'info',
        timeout: 6000,
        text: '',
        showBtn: true
      },
      items: [
        {
          name: 'Acknowledge',
          val: 'acknowledge_chat'
        },
        {
          name: 'In Progress',
          val: 'inProgress'
        },
        {
          name: 'Resolved',
          val: 'resolved'
        }
      ],
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
      subDriverDisengagedFromDriversList: [],
      selectedSubDriverFromDriver: {
        default: {},
        selected: [],
        main: {}
      },
      getEmployeeListType: 'active',
      isAppliedFiltersTags: false,
      appliedFiltersTags: [],
      chatDate: false,
      joiningDate: false,
      expansion: false,
      filterinkey: [],
      keyName: '',
      searchFilter: '',
      potential_user: {},
      employeeId: '',
      selectedIndex: null,
      highpotentialTrue: false,
      highpotentialFalse: false,
      highpotential: false,
      updatepotential: false,
      filterApplied: false,
      drawer: false,
      filterdrawer: false,
      employeeInView: null,
      selectedEmployees: {},
      dialogs: {
        reportDialog: false
      },
      filterType: null,
      allColumns: [],
      selectedColumns: [],
      allColumnsSelected: false,
      downloadingFlag: false,
      initDateRangeOptions: {
        startDate: undefined,
        endDate: undefined,
        format: 'DD/MM/YYYY',
        minDate: dayjs('01/01/2018').format(),
        maxDate: dayjs().format(),
        presets: [
          {
            label: 'All time',
            range: [
              undefined,
              undefined
            ]
          },
          {
            label: 'This Week',
            range: [
              dayjs().subtract(7, 'day').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 30 Days',
            range: [
              dayjs().subtract(1, 'month').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 3 Months',
            range: [
              dayjs().subtract(3, 'month').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 6 Months',
            range: [
              dayjs().subtract(6, 'month').format(),
              dayjs().format()
            ]
          }
        ],
        dateRange: {
          startDate: dayjs().format('DD/MM'),
          endDate: dayjs().format('DD/MM')
        }
      },
      dateRangeOptions: {
        startDate: undefined,
        endDate: undefined,
        format: 'DD/MM/YYYY',
        presets: [
          {
            label: 'All time',
            range: [
              undefined,
              undefined
            ]
          },
          {
            label: 'This Week',
            range: [
              dayjs().subtract(7, 'day').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 30 Days',
            range: [
              dayjs().subtract(1, 'month').format(),
              dayjs().format()
            ]
          }
        ],
        dateRange: {
          startDate: dayjs().format('DD/MM'),
          endDate: dayjs().format('DD/MM')
        }
      },
      chatDateRangeOptions: {
        startDate: undefined,
        endDate: undefined,
        format: 'DD/MM/YYYY',
        presets: [
          {
            label: 'All time',
            range: [
              undefined,
              undefined
            ]
          },
          {
            label: 'This Week',
            range: [
              dayjs().subtract(7, 'day').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 30 Days',
            range: [
              dayjs().subtract(1, 'month').format(),
              dayjs().format()
            ]
          }
        ],
        dateRange: {
          startDate: dayjs().format('DD/MM'),
          endDate: dayjs().format('DD/MM')
        }
      },
      chatResolutionStatusOptions: [
        {
          label: 'Open',
          key: 'open'
        },
        {
          label: 'Acknowledged',
          key: 'acknowledged'
        },
        {
          label: 'Resolved',
          key: 'resolved'
        },
        {
          label: 'In Progress',
          key: 'inProgress'
        },
        {
          label: 'Scheduled',
          key: 'scheduled'
        }
      ],
      chatStatusOptions: [
        {
          label: 'Completed',
          key: 'completed'
        },
        {
          label: 'In Progress',
          key: 'inProgress'
        },
        {
          label: 'Initiated',
          key: 'initiated'
        }
      ],
      moodOptions: [
        {
          label: '0'
        },
        {
          label: '1'
        },
        {
          label: '2'
        },
        {
          label: '3'
        },
        {
          label: '4'
        },
        {
          label: '5'
        }
      ],
      engagementOptions: [
        {
          label: 'Disengaged (<= 3.0)',
          key: 'disengaged'
        },
        {
          label: 'Passively Engaged (>3.0 to <4.0)',
          key: 'passively_enegaged'
        },
        {
          label: 'Highly Engaged (>= 4.0)',
          key: 'highly_engaged'
        }
      ],
      highPotentialOptions: [
        {
          label: 'True',
          key: 'true'
        },
        {
          label: 'False',
          key: 'false'
        }
      ],
      getAdminUsersList: [],
      disengagedFromDriversList: [],
      driverAverage__lte: '',
      driverAverage__gte: '',
      driverAverage__lt: '',
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      mood: {
        default: {},
        selected: [],
        main: {}
      },
      chatStatus: {
        default: {},
        selected: [],
        main: {}
      },
      highPotential: {
        default: {},
        selected: [],
        main: {}
      },
      disengagedFromDriver: {
        default: {},
        selected: null,
        main: {}
      },
      assignedTo: {
        default: {},
        selected: [],
        main: {}
      },
      chatResolutionStatus: {
        default: {},
        selected: [],
        main: {}
      },
      engagement: {
        default: {},
        selected: [],
        main: {}
      },
      filtersList: {
        default: {},
        selected: {},
        main: {}
      },
      assignedToUserList: [],
      showAssignedTo: false,
      showFliterList: false,
      config: {
        actionMenu: {},
        panel: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
        initialLoading: true,
        initialLoadingFilters: true,
        initialLoadingExit: true,
        // actions: [
        //   {
        //     title: 'Acknowledge Chat',
        //     icon: 'fas fa-check-square',
        //     status: 'acknowledged',
        //     dialog: 'Acknowledge',
        //     action: this.openDialog,
        //     permission: ['acknowledge_chat'],
        //   }, {
        //     title: 'Schedule meeting',
        //     icon: 'flaticon-012-meeting',
        //     status: 'scheduled',
        //     dialog: 'OneOnOne',
        //     action: this.openDialog,
        //     permission: ['schedule_invite'],
        //   }, {
        //     title: 'Work In Progress',
        //     icon: 'flaticon-047-conversation',
        //     status: 'inProgress',
        //     action: this.updateStatus,
        //     permission: ['change_status'],
        //   }, {
        //     title: 'Resolved',
        //     icon: 'fas fa-check',
        //     status: 'resolved',
        //     action: this.updateStatus,
        //     permission: ['change_status'],
        //   },
        // ],
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
      pagination: {
        rowsPerPage: 10,
        page: 1
      },
      table: {
        searchString: '',
        extraInfo: [],
        loadingInfo: true,
        loading: true,
        team: [],
        headers: [{
          text: 'Employee Name',
          align: 'left',
          sortable: false
        }, {
          text: 'Employee Email',
          align: 'left',
          sortable: false
        }, {
          text: 'Department',
          align: 'left',
          sortable: false
          // }, {
          //   text: 'Engagement Score',
          //   align: 'left',
          //   sortable: false,
        }, {
          text: 'Last Touchpoint',
          align: 'left',
          sortable: false
          // }, {
          //   text: 'Current Mood',
          //   align: 'center',
          //   sortable: false,
        }, {
          text: 'Resolution Status',
          align: 'left',
          sortable: false
          // }, {
          //   text: 'Assignee',
          //   align: 'left',
          //   sortable: false,
        }, {
          text: 'Assigned To',
          align: 'left',
          sortable: false
        }, {
          text: '',
          align: 'left',
          sortable: false
        }]
      }
    };
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
      sessionEmployeesCount: state => state.sessionEmployeesCount
    }),
    checkForFilters () {
      let applied = false;
      this.$lodash.each(this.filters.selected, (v) => {
        if (v.length > 0) {
          applied = true;
        }
      });
      if (this.dateRangeOptions.startDate || this.dateRangeOptions.endDate) {
        applied = true;
      }
      if (this.chatDateRangeOptions.startDate || this.chatDateRangeOptions.endDate) {
        applied = true;
      }
      if (this.chatStatus.selected && this.chatStatus.selected.length > 0) {
        applied = true;
      }
      if (this.assignedTo.selected && this.assignedTo.selected.length > 0) {
        applied = true;
      }
      if (this.chatResolutionStatus.selected && this.chatResolutionStatus.selected.length > 0) {
        applied = true;
      }
      if (this.disengagedFromDriver.selected) {
        applied = true;
      }
      if (this.mood.selected) {
        applied = true;
      }
      if (this.highPotential.selected) {
        applied = true;
      }
      if (this.alertSwitch) {
        applied = true;
      }
      this.$lodash.each(this.driverAverage__lte, (d) => {
        if (d === '3') {
          applied = true;
        }
      });
      this.$lodash.each(this.driverAverage__gte, (d) => {
        if (d === '4') {
          applied = true;
        }
      });
      this.$lodash.each(this.driverAverage__lt, (d) => {
        if (d === '4') {
          applied = true;
        }
      });
      return applied;
    },
    formattedRange () {
      let time = '';
      if (!this.dateRangeOptions.startDate && !this.dateRangeOptions.endDate) {
        time = 'Please select a date';
      } else {
        time = `${dayjs(this.dateRangeOptions.startDate).format('DD MMM')} - ${dayjs(this.dateRangeOptions.endDate).format('DD MMM')}`;
      }
      if (!this.chatDateRangeOptions.startDate && !this.chatDateRangeOptions.endDate) {
        time = 'Please select a date';
      } else {
        time = `${dayjs(this.chatDateRangeOptions.startDate).format('DD MMM')} - ${dayjs(this.chatDateRangeOptions.endDate).format('DD MMM')}`;
      }
      return time;
    }
  },
  methods: {
    ...mapActions(['getAdminList']),
    getStatusConfigActions (type) {
      return this.config.actions[type];
    },
    updateEmpTable () {
      // console.log('im in updatetable');
    },
    bulkStatusClose () {
      this.bulkStatus.show = false;
    },
    openSocketResponse () {
      this.$refs.socketResponse.dialog = true;
    },
    resetSelectedEmployees () {
      this.selectedEmployees = {};
      this.isEmployeeSelected = {};
      this.getSessionEmployeesSelected = {};
      this.getNonSessionEmployeesSelected = {};
      this.selected = false;
      this.getSelectedEmployeesCount();
      this.getSessionEmployeesCount();
    },
    openBulkWarnDialog (bulkActionType, val) {
      this.bulkActionConfig.type = bulkActionType;
      this.bulkActionConfig.val = val;
      if (this.getNonSessionEmployeesSelectedCount() > 0) {
        this.warnDialog = true;
      } else {
        this.continueWithSessionEmployee();
      }
    },
    continueWithSessionEmployee () {
      this.warnDialog = false;
      this.continueWithSessionEmp = true;
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
    searchingfilter (k) {
      if (this.filtersList.default[k]) {
        const filter = this.filtersList.default[k];
        if (this.searchFilter) {
          const tempData = filter.filter((r) => { return r[k].toLowerCase().indexOf(this.searchFilter.toLowerCase()) >= 0; });
          return tempData;
        } else if (!this.searchFilter) {
          return filter;
        }
      }
      return '';
    },
    onChangeChatResolutionStatusOption (key) {
      const idx = this.chatResolutionStatus.selected.findIndex(a => a === key);
      if (idx === -1) {
        this.chatResolutionStatus.selected.push(key);
      } else {
        this.chatResolutionStatus.selected.splice(idx, 1);
      }
    },
    onChangeAssigned (email) {
      const idx = this.assignedTo.selected.findIndex(a => a === email);
      if (idx === -1) {
        this.assignedTo.selected.push(email);
      } else {
        this.assignedTo.selected.splice(idx, 1);
      }
    },
    searchingAssignedTOfilter () {
      if (this.searchFilter) {
        const filter = this.assignedToUserList;
        const tempData = filter.filter((r) => { return r.display_name.toLowerCase().indexOf(this.searchFilter.toLowerCase()) >= 0; });
        this.getAdminUsersList = tempData;
      } else {
        this.getAdminUsersList = this.assignedToUserList;
      }
    },
    getAssignedTOList () {
      const tempList = [];
      axios.get(`${process.env.VUE_APP_API_URL}users/admins?page_offset=0`).then((response) => {
        this.$lodash.each(response.data.data, (val) => {
          const t = {};
          t.display_name = val.display_name;
          t.email = val.email;
          tempList.push(t);
        });
      });
      this.assignedToUserList = [];
      this.assignedToUserList = tempList;
    },
    toggleFilter () {
      // if (!this.filterDrawer) {
      //   this.config.panel = [true, true, true, true, true, true];
      // }
      this.filterdrawer = !this.filterdrawer;
    },
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
    openReportDialog (dataFilters) {
      this.getAllColumns();
      this.dialogs.reportDialog = true;
      this.filterType = dataFilters;
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
    downloadReport (reportGenerationType) {
      this.downloadingFlag = true;
      let reportFilters = {};
      // let reportFilters = {
      //   [`mood__in`]: "1,2,3,4,5",
      // };

      if (this.filterType === 'selected') {
        // send employeeList in api call
        const employeeList = [];
        let newFilter = {};
        this.$lodash.each(this.selectedEmployees, (emp) => {
          employeeList.push(emp.email);
        });
        newFilter = {
          user__email__in: employeeList.join()
        };
        reportFilters = {
          ...reportFilters,
          ...newFilter
        };
      } else if (this.filterType === 'filtered') {
        // send filters in api call
        let newFilter = {};
        let dateFilter = {};
        let initDateFilter = {};
        let chatDateFilter = {};
        let chatResolutionFilter = {};
        let chatStatusFilter = {};
        let engagementFilter = {};
        let engagementFilter1 = {};
        let engagementFilter_lt = {};
        let engagementFilter_gt = {};
        let moodStatus = {};
        let highPotentialStatus = {};
        let disengagedFromDriverStatus = {};
        let assignedToStatus = {};
        this.$lodash.each(this.filters.selected, (v, k) => {
          if (v && v.length > 0) {
            newFilter = {
              [`${k}__in`]: v.join()
            };
            reportFilters = {
              ...reportFilters,
              ...newFilter
            };
          }
        });
        if (this.dateRangeOptions.startDate) {
          dateFilter = {
            joining_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
            joining_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined
          };
          reportFilters = {
            ...reportFilters,
            ...dateFilter
          };
        }
        if (this.chatDateRangeOptions.startDate) {
          chatDateFilter = {
            user_session__completed_date_start: this.chatDateRangeOptions.startDate ? dayjs(this.chatDateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
            user_session__completed_date_end: this.chatDateRangeOptions.startDate ? dayjs(this.chatDateRangeOptions.endDate).format('YYYY-MM-DD') : undefined
          };
          reportFilters = {
            ...reportFilters,
            ...chatDateFilter
          };
        }
        if (this.initDateRangeOptions.startDate) {
          initDateFilter = {
            user_session__initiated_date_start: this.initDateRangeOptions.startDate ? dayjs(this.initDateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
            user_session__initiated_date_end: this.initDateRangeOptions.startDate ? dayjs(this.initDateRangeOptions.endDate).format('YYYY-MM-DD') : undefined
          };
          reportFilters = {
            ...reportFilters,
            ...initDateFilter
          };
        }
        if (this.chatResolutionStatus.selected && this.chatResolutionStatus.selected.length > 0) {
          chatResolutionFilter = {
            user_session__action_status__in: this.chatResolutionStatus.selected.length > 0 ? this.chatResolutionStatus.selected.join() : undefined
          };
          reportFilters = {
            ...reportFilters,
            ...chatResolutionFilter
          };
        }
        if (this.chatStatus.selected && this.chatStatus.selected.length > 0) {
          chatStatusFilter = {
            user_session__status__in: this.chatStatus.selected.length > 0 ? this.chatStatus.selected.join() : undefined
          };
          reportFilters = {
            ...reportFilters,
            ...chatStatusFilter
          };
        }
        if (this.mood.selected) {
          const moodType = typeof this.mood.selected;
          if (moodType === 'string') {
            moodStatus = {
              mood__in: this.mood.selected
            };
          } else if (moodType === 'object') {
            moodStatus = {
              mood__in: this.mood.selected.length > 0 ? this.mood.selected.join() : undefined
            };
          }
          reportFilters = {
            ...reportFilters,
            ...moodStatus
          };
        }
        if (this.disengagedFromDriver.selected && this.disengagedFromDriver.selected.length > 0) {
          disengagedFromDriverStatus = {
            disengaged_from_driver: this.disengagedFromDriver.selected ? this.disengagedFromDriver.selected : undefined,
            disengaged_from_sub_driver: this.selectedSubDriverFromDriver.selected && this.selectedSubDriverFromDriver.selected.length > 0 ? this.selectedSubDriverFromDriver.selected.join() : undefined
            // disengaged_from_driver: this.disengagedFromDriver && this.disengagedFromDriver.selected,
          };
          reportFilters = {
            ...reportFilters,
            ...disengagedFromDriverStatus
          };
        }
        if (this.highPotential.selected && this.highPotential.selected.length > 0) {
          highPotentialStatus = {
            high_potential_emp: this.highPotential && this.highPotential.selected
          };
          reportFilters = {
            ...reportFilters,
            ...highPotentialStatus
          };
        }
        if (this.assignedTo.selected) {
          assignedToStatus = {
            user_session__assignedTo__email__in: this.assignedTo.selected.length > 0 ? this.assignedTo.selected.join() : undefined
          };
          reportFilters = {
            ...reportFilters,
            ...assignedToStatus
          };
        }
        if (this.driverAverage__lte) {
          engagementFilter = {
            user_session__driverAverage__lte: this.driverAverage__lte ? this.driverAverage__lte : undefined
          };
          reportFilters = {
            ...reportFilters,
            ...engagementFilter
          };
        }
        if (this.driverAverage__gte) {
          engagementFilter1 = {
            user_session__driverAverage__gte: this.driverAverage__gte ? this.driverAverage__gte : undefined
          };
          reportFilters = {
            ...reportFilters,
            ...engagementFilter1
          };
        }
        if (this.driverAverage__gt) {
          engagementFilter_gt = {
            user_session__driverAverage__gt: this.driverAverage__gt ? this.driverAverage__gt : undefined
          };
          engagementFilter_lt = {
            user_session__driverAverage__lt: this.driverAverage__lt ? this.driverAverage__lt : undefined
          };
          reportFilters = {
            ...reportFilters,
            ...engagementFilter_gt,
            ...engagementFilter_lt
          };
        }
      } else {
        reportFilters = {};
        // send blank filters in api call
      }

      this.$store.dispatch('updateSnackbar', {
        color: 'warn',
        show: true,
        text: 'Generating report, Please wait!'
      });

      reportFilters = {
        ...reportFilters,
        status__in: this.getEmployeeListType ? this.getEmployeeListType : undefined
      };

      axios.post(`${process.env.VUE_APP_API_URL}reports/custom_report/download?response_type=${reportGenerationType}`, {
        model: 'userprofile',
        columns: this.selectedColumns,
        // 'report_id': report.id,
        // 'report_title': report.title,
        filters: reportFilters
      }).then((response) => {
        if (response && response.status === 200 && response.data) {
          if (response.data.message) {
            this.downloadingFlag = false;
            if (reportGenerationType === 'sync') {
              window.open(response.data.message);
            } else if (reportGenerationType === 'email') {
              this.$store.dispatch('updateSnackbar', {
                color: 'info',
                show: true,
                text: response.data.message
              });
            }
          } else {
            this.downloadingFlag = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to generate report, Please try again later!'
            });
          }
          this.dialogs.reportDialog = false;
        } else {
          this.downloadingFlag = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to generate report, Please try again later!'
          });
          this.dialogs.reportDialog = false;
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to generate report, Please try again later!'
        });
        this.dialogs.reportDialog = false;
        throw new Error(response);
      });
    },
    updateSelectedColumns (col, ev) {
      const temp = this.selectedColumns;
      const match = this.$lodash.findIndex(this.selectedColumns, field =>
        field.key === col.key);
      if (ev && match <= -1) {
        temp.push(col);
      } else if (!ev && match > -1) {
        temp.splice(match, 1);
        this.allColumnsSelected = false;
      }
      this.selectedColumns = temp;
      // this.$store.dispatch('updateSelectedCandidatesWithData', temp);
    },
    toggleAllSelectedColumns (ev) {
      if (!ev) {
        this.selectedColumns = [];
        this.allColumnsSelected = false;
      } else {
        this.selectedColumns = JSON.parse(JSON.stringify(this.allColumns));
        this.allColumnsSelected = true;
      }
    },
    checkIfSelected (col) {
      const match = this.$lodash.findIndex(this.selectedColumns, field =>
        field.key === col.key);
      let selected = false;
      if (match > -1) {
        selected = true;
      } else {
        selected = false;
      }
      return selected;
    },
    updateSelectedEmployees (emp, ev) {
      const temp = JSON.parse(JSON.stringify(this.selectedEmployees));
      // const match = this.$lodash.findIndex(this.selectedEmployees, (employee) =>
      //   employee.id === emp.id);
      if (ev && !temp[emp.id]) {
        // if (emp && emp.user_completed_session_count > 0) {
        const newEmployee = {
          [emp.id]: emp
        };
        // temp = {
        //   ...temp,
        //   ...newEmployee,
        // };
        this.selectedEmployees = {
          ...this.selectedEmployees,
          ...newEmployee
        };
        this.isEmployeeSelected[emp.id] = true;
        // }
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
        // delete temp[emp.id];
        this.isEmployeeSelected[emp.id] = false;
        this.deleteSelectedEmployee(emp.id);
      }
      // this.selectedEmployees = temp;
      // this.$store.dispatch('updateSelectedCandidatesWithData', temp);
      this.getSelectedEmployeesCount();
      this.getSessionEmployeesCount();
    },
    toggleAll (ev) {
      if (!ev) {
        // this.selectedEmployees = {};
        this.$lodash.each(this.table.team, (emp) => {
          // const id = emp.id;
          // delete this.selectedEmployees[id];
          this.deleteSelectedEmployee(emp.id);
          this.isEmployeeSelected[emp.id] = false;
        });
      } else {
        // this.selectedEmployees = {};
        this.$lodash.each(this.table.team, (emp) => {
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
    },
    deleteSelectedEmployee (id) {
      delete this.selectedEmployees[id];
      delete this.getSessionEmployeesSelected[id];
      delete this.getNonSessionEmployeesSelected[id];
    },
    getSelectedEmployeesCount () {
      this.getSelectedEmployees = Object.keys(this.selectedEmployees).length;
    },
    getSessionEmployeesCount () {
      const count = Object.keys(this.getSessionEmployeesSelected).length;
      this.$store.dispatch('sessionEmployeesCount', count);
      return count;
    },
    getNonSessionEmployeesSelectedCount () {
      const count = Object.keys(this.getNonSessionEmployeesSelected).length;
      return count;
    },
    isEmployeeSessionCompleted (count) {
      if (count > 0) {
        return false;
      }
      return true;
    },
    updateInitDate (date) {
      if (date) {
        this.initDateRangeOptions.startDate = date[0];
        this.initDateRangeOptions.endDate = date[1];
      }
    },
    updateDate (date) {
      this.joiningDate = true;
      this.chatDate = false;
      if (date) {
        this.dateRangeOptions.startDate = date[0];
        this.dateRangeOptions.endDate = date[1];
      }
    },
    updateChatDate (date) {
      this.chatDate = true;
      this.joiningDate = false;
      if (date) {
        this.chatDateRangeOptions.startDate = date[0];
        this.chatDateRangeOptions.endDate = date[1];
        // this.triggerUpdate();
      }
    },
    updateEngagement (value) {
      if (value === 'disengaged') {
        this.driverAverage__lte = '3';
        this.driverAverage__gt = '';
        this.driverAverage__lt = '';
        this.driverAverage__gte = '';
      }
      if (value === 'passively_enegaged') {
        this.driverAverage__gt = '3';
        this.driverAverage__lt = '4';
        this.driverAverage__lte = '';
        this.driverAverage__gte = '';
      }
      if (value === 'highly_engaged') {
        this.driverAverage__gt = '';
        this.driverAverage__lt = '';
        this.driverAverage__lte = '';
        this.driverAverage__gte = '4';
      }
    },
    updateDisengagedFromDriversList (value) {
      this.getSubDriversByDriver(value);
    },
    getColor (e) {
      let color = 'primary';
      if (e.gender && e.gender === 'female') {
        color = 'pink';
      }
      return color;
    },
    getInfo (e, row) {
      if (row.expanded) {
        this.table.loadingInfo = true;
        this.table.extraInfo = [];
        axios.get(`${process.env.VUE_APP_API_URL}users/details/${e.id}`, {
          params: {
            fields: 'user_last_chat_transcript'
          }
        }).then((response) => {
          if (response && response.data && response.data.user_last_chat_transcript) {
            this.$lodash.each(response.data.user_last_chat_transcript, (t) => {
              if (t.responseRequired || t.bot_response === false) {
                this.table.extraInfo.push(t);
              }
            });
            this.table.loadingInfo = false;
            this.$refs.QuickView.transcripts = this.table.extraInfo;
          } else {
            this.table.loadingInfo = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable intialize chat, Please try again later!'
            });
          }
        }, (response) => {
          this.table.loadingInfo = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable intialize chat, Please try again later!'
          });
          throw new Error(response.data);
        });
      }
    },
    updateStatus (s, newStatus, assignedTo) {
      this.config.loading = true;
      this.table.loading = true;
      axios.patch(`${process.env.VUE_APP_API_URL}session/update/${s.last_chat_id}`, {
        action_status: newStatus,
        assignedTo_id: assignedTo
      }).then((response) => {
        this.config.loading = false;
        if (response && response.data) {
          s.last_chat_assignedTo = assignedTo;
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee status updated!'
          });
          // s = {...s, ...data};
          this.getTeam();
        } else {
          this.table.loading = false;
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
    openDialog (data, type) {
      // console.log(this.$refs);
      // console.log(type);
      // this.$refs["type"] = $type;
      if (type && this.$refs[type]) {
        this.$refs[type].open = true;
        this.$refs[type].employee = data;
      }
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
    updateEmployee (employee) {
      // console.log('this.filters.selected', this.filters.selected);
      this.selectedIndex = employee.index;
      const t = this.filters.selected;
      let tempAllFilters = {};
      if (t) {
        this.$lodash.each(t, (value, key) => {
          if (value.length > 0) {
            const tempObj = {
              [key]: value.length > 1 ? value.join() : value[0]
            };
            tempAllFilters = { ...tempAllFilters, ...tempObj };
          }
        });
      }
      // if (this.chatDateRangeOptions.startDate && this.chatDateRangeOptions.endDate) {
      //   tempAllFilters.
      // }
      // if (this.dateRangeOptions && this.dateRangeOptions.startDate && this.dateRangeOptions.endDate) {
      //   tempAllFilters.startDate = this.dateRangeOptions.startDate;
      //   tempAllFilters.endDate = this.dateRangeOptions.endDate;
      // }
      if (this.chatResolutionStatus) {
        tempAllFilters.chatResolutionStatus = this.chatResolutionStatus.selected;
      }
      if (this.chatStatus.selected) {
        tempAllFilters.chatStatus = this.chatStatus.selected;
      }
      if (this.engagement.selected) {
        tempAllFilters.engagement = this.engagement.selected;
      }
      if (this.highPotential.selected && this.highPotential.selected.length > 0) {
        tempAllFilters.highPotential = this.highPotential.selected;
      }
      if (this.disengagedFromDriver) {
        tempAllFilters.disengagedFromDriver = this.disengagedFromDriver.selected;
      }
      if (this.assignedTo) {
        tempAllFilters.assignedTo = this.assignedTo.selected;
      }
      if (this.mood) {
        tempAllFilters.mood = this.mood.selected;
      }
      this.$router.push({
        path: '/employees',
        query:
        {
          eID: employee.id,
          ...tempAllFilters
        }
      });
      this.viewEmployeeDashboard(employee.id);
    },
    openhighpotentialFalse (id) {
      this.employeeId = id;
      this.highpotentialFalse = true;
      this.$lodash.each(this.table.team, (value, key) => {
        if (value.high_potential_emp === false) {
          this.updatepotential = true;
        }
      });
    },
    openhighpotentialTrue (id) {
      this.employeeId = id;
      this.highpotentialTrue = true;
      this.$lodash.each(this.table.team, (value, key) => {
        if (value.high_potential_emp === true) {
          this.updatepotential = false;
        }
      });
    },

    updateHighpotential () {
      axios.patch(`${process.env.VUE_APP_API_URL}users/update/${this.employeeId}`, {
        high_potential_emp: this.updatepotential
      }).then((response) => {
        this.config.loading = false;
        this.table.loading = false;
        if (response && response.data) {
          this.highpotentialTrue = false;
          this.highpotentialFalse = false;
          this.getTeam();

          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee updated!'
          });
          // s = {...s, ...data};
        } else {
          this.table.loading = false;
          this.config.loading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update, Please try again later!'
          });
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update, Please try again later!'
        });
        throw new Error(response);
      });
    },
    viewEmployeeDashboard (id) {
      // this.$router.push(`/employees/view/${s.id}`);
      setTimeout(() => {
        this.drawer = true;
        this.employeeInView = id;
      }, 50);
      setTimeout(() => {
        if (this.$refs && this.$refs.viewEmployee) {
          this.$refs.viewEmployee.employeeListReference = this;
          this.$refs.viewEmployee.employeeId = id;
          this.$refs.viewEmployee.getEmployee(id);
        }
      }, 100);
    },
    sendReminder (cand) {
      this.refreshing = true;
      axios.post(`${process.env.API_URL}employee_onboarding/reminder/${cand.id}`).then((response) => {
        this.refreshing = false;
        if (response && response.data && response.data.msg === 'Successfully sent email') {
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Reminder sent!'
          });
          this.dialogs.reminder = false;
        } else {
          this.refreshing = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to send a reminder, Please try again later!'
          });
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to send a reminder, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getName (key) {
      let name;
      switch (key) {
        case 'currentPosition':
          name = 'Current Position';
          break;

        case 'hrbp':
          name = 'HR Business Partner';
          break;

        case 'sub_department':
          name = 'Sub Department';
          break;

        case 'businessHead':
          name = 'Business Head';
          break;

        case 'teamHead':
          name = 'Team Head';
          break;

        default:
          name = key.charAt(0).toUpperCase() + key.slice(1);
      }
      return name;
    },
    openUploadDialog () {
      this.$refs.uploadEmployee.open = true;
    },
    openBulkUploadDialog () {
      this.$refs.bulkUploadDialog.open = true;
    },
    getActiveEmployees (type) {
      this.config.initialLoading = true;
      this.config.initialLoadingExit = true;
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
    getTeam (searchString) {
      this.table.loading = true;
      const queryParams = {
        count: 'true',
        page_limit: this.pagination.rowsPerPage,

        // if this.engagement.length > 0:this.engagement_score
        //   if this.engagement.selected == "disengaged" then user_session__driverAverage__lte=2.5
        alert_raised: this.alertSwitch ? this.alertSwitch : undefined,
        status__in: this.getEmployeeListType ? this.getEmployeeListType : undefined,
        disengaged_from_driver: this.disengagedFromDriver.selected ? this.disengagedFromDriver.selected : undefined,
        disengaged_from_sub_driver: this.selectedSubDriverFromDriver.selected && this.selectedSubDriverFromDriver.selected.length > 0 ? this.selectedSubDriverFromDriver.selected.join() : undefined,
        // high_potential_emp: this.highPotential && this.highPotential.selected,
        high_potential_emp: this.highPotentialSwitch ? this.highPotentialSwitch : undefined,
        mood__in: this.mood.selected && this.mood.selected.length > 0 ? this.mood.selected.join() : undefined,
        user_session__assignedTo__email__in: this.assignedTo.selected.length > 0 ? this.assignedTo.selected.join() : undefined,
        user_session__status__in: this.chatStatus.selected.length > 0 ? this.chatStatus.selected.join() : undefined,
        user_session__action_status__in: this.chatResolutionStatus.selected.length > 0 ? this.chatResolutionStatus.selected.join() : undefined,
        user_session__driverAverage__lte: this.driverAverage__lte ? this.driverAverage__lte : undefined,
        user_session__driverAverage__gte: this.driverAverage__gte ? this.driverAverage__gte : undefined,
        user_session__driverAverage__lt: this.driverAverage__lt ? this.driverAverage__lt : undefined,
        user_session__driverAverage__gt: this.driverAverage__gt ? this.driverAverage__gt : undefined,
        page_offset: this.pagination.page || 1,
        raw_search_string: searchString || this.table.searchString,
        fields: 'display_name,email,id,department,last_milestone,mood,high_potential_emp,stage__title,last_triggered_stage,interactions_active,status,last_chat_action_status,last_chat_id,last_chat_session_id,last_chat_assignedTo,last_chat_assignedTo_email,last_chat_assignedTo_display_name,profilePicture,user_completed_session_count,last_chat_assignedTo_display_name,alert_raised,alert_words',
        joining_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        joining_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
        user_session__completed_date_start: this.chatDateRangeOptions.startDate ? dayjs(this.chatDateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        user_session__completed_date_end: this.chatDateRangeOptions.startDate ? dayjs(this.chatDateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
        user_session__initiated_date_start: this.initDateRangeOptions.startDate ? dayjs(this.initDateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        user_session__initiated_date_end: this.initDateRangeOptions.startDate ? dayjs(this.initDateRangeOptions.endDate).format('YYYY-MM-DD') : undefined
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`${k}__in`] = v.join();
        }
      });

      axios.get(`${process.env.VUE_APP_API_URL}users/list`, {
        params: queryParams
      }).then((response) => {
        this.table.loading = false;
        this.config.initialLoading = false;
        this.config.initialLoadingExit = false;
        if (response && response.data) {
          this.$store.dispatch('teamList', response.data.data);
          this.table.team = this.teamList;
          this.$lodash.each(this.table.team, (v, k) => {
            v.index = k;
            if (v.last_chat_action_status === 'Na') {
              v.last_chat_action_status = '';
            }
          });
          this.table.totalItems = response.data.total_count;
          const actionMenu = {};

          this.$lodash.each(response.data.data, (v) => {
            actionMenu[v.id] = false;
          });
          this.config.actionMenu = actionMenu;
        }
      }, (response) => {
        this.table.loading = false;
        this.config.initialLoading = false;
        this.config.initialLoadingExit = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch team, Please try again later!'
        });
        throw new Error(response);
      });
    },
    triggerUpdate () {
      this.pagination.page = 1;
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (k !== 'search' && k !== 'eID') {
          if (v && v.length > 0) {
            this.filterApplied = true;
          }
        }
      });
      const filters = JSON.parse(JSON.stringify(this.filters.selected));
      if (this.dateRangeOptions.startDate || this.dateRangeOptions.endDate) {
        filters.startDate = this.dateRangeOptions.startDate;
        filters.endDate = this.dateRangeOptions.endDate;
        this.filterApplied = true;
      }
      if (this.initDateRangeOptions.startDate || this.initDateRangeOptions.endDate) {
        filters.startDate = this.initDateRangeOptions.startDate;
        filters.endDate = this.initDateRangeOptions.endDate;
        this.filterApplied = true;
      }
      if (this.chatDateRangeOptions.startDate || this.chatDateRangeOptions.endDate) {
        filters.user_session__completed_date_start = this.chatDateRangeOptions.startDate;
        filters.user_session__completed_date_end = this.chatDateRangeOptions.endDate;
        this.filterApplied = true;
      }
      if (this.chatStatus.selected && this.chatStatus.selected.length > 0) {
        filters.user_session__status = this.chatStatus.selected;
        this.filterApplied = true;
      }
      if (this.chatResolutionStatus.selected && this.chatResolutionStatus.selected.length > 0) {
        filters.user_session__action_status = this.chatResolutionStatus.selected;
        this.filterApplied = true;
      }
      if (this.driverAverage__lte || this.driverAverage__gte || this.driverAverage__lt) {
        this.filterApplied = true;
      }
      if (this.assignedTo.selected && this.assignedTo.selected.length > 0) {
        filters.user_session__assignedTo__email = this.assignedTo.selected;
        this.filterApplied = true;
      }
      if (this.disengagedFromDriver.selected && this.disengagedFromDriver.selected.length > 0) {
        filters.disengaged_from_driver = this.disengagedFromDriver.selected;
        this.filterApplied = true;
      }
      if (this.mood.selected && this.mood.selected.length > 0) {
        // filters.mood__in = this.mood.selected;
        this.filterApplied = true;
      }
      if (this.highPotential.selected && this.highPotential.selected.length > 0) {
        filters.high_potential_emp = this.highPotential.selected;
        this.filterApplied = true;
      }
      if (this.alertSwitch) {
        this.filterApplied = true;
      }
      if (this.highPotentialSwitch) {
        this.filterApplied = true;
      }
      this.$router.push({
        query: filters
      });

      // creating the filter tagging
      // const filterTags = filters;
      // filterTags.chatStatus = this.chatStatus.selected;
      // filterTags.highPotential = this.highPotential.selected;
      // filterTags.disengagedFromDriver = this.disengagedFromDriver.selected;
      // filterTags.assignedTo = this.assignedTo.selected;
      // filterTags.chatResolutionStatus = this.chatResolutionStatus.selected;
      // filterTags.engagement = this.engagement.selected;
      // const ft = [];
      // this.$lodash.each(filterTags, (v,key) => {
      //   const t = {};
      //   t.key = key;
      //   t.value = v;
      //   ft.push(t);
      // });
      // this.appliedFiltersTags = ft;
      // this.isAppliedFiltersTags = true;
      this.filterdrawer = false;
      this.getTeam();
    },
    showFilters () {
      this.showFliterList = !this.showFliterList;
    },
    resetFilters () {
      this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
      this.chatStatus.selected = [];
      this.assignedTo.selected = [];
      this.showAssignedTo = false;
      this.getAdminUsersList = [];
      this.disengagedFromDriver.selected = null;
      this.mood.selected = [];
      this.highPotential.selected = [];
      this.driverAverage__lte = '';
      this.driverAverage__gte = '';
      this.driverAverage__lt = '';
      this.driverAverage__gt = '';
      this.chatResolutionStatus.selected = [];
      this.engagement.selected = [];
      this.dateRangeOptions.startDate = undefined;
      this.dateRangeOptions.endDate = undefined;
      this.chatDateRangeOptions.startDate = undefined;
      this.chatDateRangeOptions.endDate = undefined;
      this.initDateRangeOptions.startDate = undefined;
      this.initDateRangeOptions.endDate = undefined;
      this.filterApplied = false;
      this.selectedEmployees = {};
      this.getSessionEmployeesSelected = {};
      this.getNonSessionEmployeesSelected = {};
      this.getSelectedEmployeesCount();
      this.getSessionEmployeesCount();
      this.alertSwitch = false;
      this.highPotentialSwitch = false;
      this.$router.push({
        path: '/employees'
      });
      this.getTeam();
    },
    getAvatar (c) {
      let avt = '';
      if (c.first_name && c.last_name) {
        avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      } else if (c.first_name && !c.last_name) {
        avt = `${c.first_name.charAt(0)}`;
      } else if (!c.first_name && c.last_name) {
        avt = `${c.last_name.charAt(0)}`;
      } else if (!c.first_name && !c.last_name && c.display_name) {
        c.first_name = c.display_name.split(' ')[0];
        c.last_name = c.display_name.split(' ')[1] ? c.display_name.split(' ')[1] : '';
        avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      }
      return avt.toUpperCase();
    },
    getRandomColor () {
      const colors = [
        'pink',
        'purple',
        'deep-purple',
        'indigo',
        'light-blue',
        'cyan',
        'green',
        'light-green',
        'lime',
        'deep-orange',
        'brown',
        'blue'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    getFilters () {
      axios.get(`${process.env.VUE_APP_API_URL}users/filters_options`).then((response) => {
        if (response && response.data && response.data.queryset_filters_options) {
          this.config.initialLoadingFilters = false;
          this.filters.default = response.data.queryset_filters_options;
          const defaultFilters = {};
          this.$lodash.each(this.filters.default, (v, k) => {
            defaultFilters[k] = [];
          });
          this.$lodash.each(this.filters.selected, (v, k) => {
            defaultFilters[k] = v;
          });
          this.filters.selected = defaultFilters;
          const mainFilters = {};
          this.$lodash.each(this.filters.default, (v, k) => {
            mainFilters[k] = [];
          });
          this.filters.main = JSON.parse(JSON.stringify(mainFilters));
        }
      });
    },
    getFilterData (k) {
      this.expansion = !this.expansion;
      axios.get(`${process.env.VUE_APP_API_URL}users/filters?filter_field=${k}`).then((response) => {
        if (response && response.data && response.data) {
          this.config.initialLoadingFilters = false;
          this.filtersList.default = response.data.queryset_filters_options;
          // console.log(this.filters.default);
          const defaultFilters = {};
          this.$lodash.each(this.filters.default.data, (v, k) => {
            defaultFilters[k] = [];
          });
          // if (Object.keys(this.filters.selected.data).length === 0) {
          //   this.filters.selected = defaultFilters;
          //   this.filters.main = JSON.parse(JSON.stringify(defaultFilters));
          // }
        }
      });
    },
    getSelectedFiltersCount (filter, idx) {
      // if (filter.eID) {
      //   return 0;
      // }
      if (filter[idx]) {
        return filter[idx].length;
      }
      return 0;
    },
    update () {},
    getSubDriversByDriver (driver) {
      axios.get(`${process.env.VUE_APP_API_URL}users/filters?filter_field=engagement_sub_driver&engagement_driver=${driver}`).then((response) => {
        if (response.status === 200) {
          this.subDriverDisengagedFromDriversList = response.data.queryset_filters_options.engagement_sub_driver;
          this.selectedSubDriverFromDriver.selected = this.subDriverDisengagedFromDriversList;
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Oops, Some error occured, Please try again later!'
          });
        }
      });
    },
    getDisengagedFromDriver () {
      axios.get(`${process.env.VUE_APP_API_URL}users/filters?filter_field=engagement_driver`).then((response) => {
        if (response.status === 200) {
          this.disengagedFromDriversList = response.data.queryset_filters_options.engagement_driver;
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Oops, Some error occured, Please try again later!'
          });
        }
      });
    },
    getBulkAdminUsers () {
      const temp = {
        display_name: 'Remove Assignee',
        user_id: null
      };
      const t = this.bulkAdminUsersList;
      if (t && t.length > 0 && t[0].display_name !== 'Remove Assignee') {
        t.unshift(temp);
        this.bulkAdminUsersList = t;
      } else if (t && t.length > 0 && t[0].display_name === 'Remove Assignee') {
        t.splice(0, 1);
        this.bulkAdminUsersList = t;
      } else {
        this.bulkAdminUsersList = t;
      }
    },
    bulkAssignedTo (id, action, name) {
      this.bulkActionPayload.show = true;
      this.bulkActionPayload.action = action;
      this.bulkActionPayload.assignedTo = name;
      this.bulkActionPayload.actionStatus = true;
      this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
      // const that = this;
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
          this.snackbar.show = true;
          this.snackbar.text = response.data.message;
          this.snackbar.showBtn = false;
          const session = JSON.parse(localStorage.getItem('CHATBOT_USER'));
          const company = session.company.replace(/-/g, '');
          const socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}${company}/?verify=${session.access_token}`);
          socket.addEventListener('message', (res) => {
            // console.log('bulkAcknowledgeUpdate -> res', res);
            this.snackbar.show = false;
            const tempRes = JSON.parse(res.data);
            this.snackbar.show = true;
            this.snackbar.text = 'User action completed';
            this.bulkActionPayload.actionStatus = false;
            this.bulkActionPayload.successCount = tempRes.success_count;
            this.bulkActionPayload.errorCount = tempRes.error_count;
            this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            this.setCountStatus(tempRes);
            setTimeout(() => {
              this.bulkActionPayload.show = false;
              this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            }, 10000);
            // this.snackbar.text = tempRes;
            this.snackbar.timeout = 6000;
            this.snackbar.showBtn = true;
            this.getTeam();
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
      // const that = this;
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
          this.snackbar.show = true;
          this.snackbar.text = response.data.message;
          this.snackbar.showBtn = false;
          const session = JSON.parse(localStorage.getItem('CHATBOT_USER'));
          const company = session.company.replace(/-/g, '');
          const socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}${company}/?verify=${session.access_token}`);
          socket.addEventListener('message', (res) => {
            // console.log('bulkAcknowledgeUpdate -> res', res);
            this.snackbar.show = false;
            const tempRes = JSON.parse(res.data);
            this.snackbar.show = true;
            this.snackbar.text = 'User action completed';
            this.bulkActionPayload.actionStatus = false;
            this.bulkActionPayload.successCount = tempRes.success_count;
            this.bulkActionPayload.errorCount = tempRes.error_count;
            this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            this.setCountStatus(tempRes);
            setTimeout(() => {
              this.bulkActionPayload.show = false;
              this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            }, 10000);
            // this.snackbar.text = tempRes;
            this.snackbar.timeout = 6000;
            this.snackbar.showBtn = true;
            this.getTeam();
            this.socketResponseUpdate = tempRes;
            // that.$refs.socketResponse.dialog = true;
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
      // const that = this;
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
          this.snackbar.show = true;
          this.snackbar.text = response.data.message;
          this.snackbar.showBtn = false;
          const session = JSON.parse(localStorage.getItem('CHATBOT_USER'));
          const company = session.company.replace(/-/g, '');
          const socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}${company}/?verify=${session.access_token}`);
          socket.addEventListener('message', (res) => {
            // console.log('bulkAcknowledgeUpdate -> res', res);
            this.snackbar.show = false;
            const tempRes = JSON.parse(res.data);
            this.snackbar.show = true;
            this.snackbar.text = 'User action completed';
            this.bulkActionPayload.actionStatus = false;
            this.bulkActionPayload.successCount = tempRes.success_count;
            this.bulkActionPayload.errorCount = tempRes.error_count;
            this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            this.setCountStatus(tempRes);
            setTimeout(() => {
              this.bulkActionPayload.show = false;
              this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            }, 10000);
            // this.snackbar.text = tempRes;
            this.snackbar.timeout = 6000;
            this.snackbar.showBtn = true;
            this.getTeam();
            this.socketResponseUpdate = tempRes;
            // that.$refs.socketResponse.dialog = true;
            socket.close();
          });
        }
      });
    },
    bulkAcknowledgeUpdate (type, action) {
      this.bulkActionPayload.show = true;
      this.bulkActionPayload.action = action;
      this.bulkActionPayload.actionStatus = true;
      this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
      // const that = this;
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
          this.snackbar.show = true;
          this.snackbar.text = response.data.message;
          this.snackbar.showBtn = false;
          const session = JSON.parse(localStorage.getItem('CHATBOT_USER'));
          const company = session.company.replace(/-/g, '');
          const socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}${company}/?verify=${session.access_token}`);
          socket.addEventListener('message', (res) => {
            this.snackbar.show = false;
            const tempRes = JSON.parse(res.data);
            this.snackbar.show = true;
            this.snackbar.text = 'User action completed';
            this.bulkActionPayload.actionStatus = false;
            this.bulkActionPayload.successCount = tempRes.success_count;
            this.bulkActionPayload.errorCount = tempRes.error_count;
            this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            this.setCountStatus(tempRes);
            setTimeout(() => {
              this.bulkActionPayload.show = false;
              this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            }, 10000);
            // this.snackbar.text = tempRes;
            this.snackbar.timeout = 6000;
            this.snackbar.showBtn = true;
            this.getTeam();
            this.socketResponseUpdate = tempRes;
            // that.$refs.socketResponse.dialog = true;
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
      // const that = this;
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
          this.snackbar.show = true;
          this.snackbar.text = response.data.message;
          this.snackbar.showBtn = false;
          const session = JSON.parse(localStorage.getItem('CHATBOT_USER'));
          const company = session.company.replace(/-/g, '');
          const socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}${company}/?verify=${session.access_token}`);
          socket.addEventListener('message', (res) => {
            // console.log('bulkAcknowledgeUpdate -> res', res);
            this.snackbar.show = false;
            const tempRes = JSON.parse(res.data);
            this.snackbar.show = true;
            this.snackbar.text = 'User action completed';
            this.bulkActionPayload.actionStatus = false;
            this.bulkActionPayload.successCount = tempRes.success_count;
            this.bulkActionPayload.errorCount = tempRes.error_count;
            this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            this.setCountStatus(tempRes);
            setTimeout(() => {
              this.bulkActionPayload.show = false;
              this.$store.dispatch('updateBulkActions', this.bulkActionPayload);
            }, 10000);
            // this.snackbar.text = tempRes;
            this.snackbar.timeout = 6000;
            this.snackbar.showBtn = true;
            this.getTeam();
            this.socketResponseUpdate = tempRes;
            // that.$refs.socketResponse.dialog = true;
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
    openSMSDialog () {
      this.$refs.bulkSms.open = true;
      this.selectedEmpNumbers = [];
      const selectedEmp = Object.entries(this.getSessionEmployeesSelected);
      this.$lodash.each(selectedEmp, (val) => {
        this.selectedEmpNumbers.push(val);
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
    openEmailDialog () {
      this.$refs.bulkEmail.open = true;
      this.selectedEmpEmails = [];
      const selectedEmp = Object.entries(this.getSessionEmployeesSelected);
      this.$lodash.each(selectedEmp, (val) => {
        this.selectedEmpEmails.push(val);
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
    getBulkAdminList () {
      const tempList = [];
      axios.get(`${process.env.VUE_APP_API_URL}users/admins?page_offset=0`).then((response) => {
        this.$lodash.each(response.data.data, (val) => {
          tempList.push(val);
        });
      });
      this.bulkAdminUsersList = tempList;
    },
    openAlertRaised (id) {
      let temp = {};
      let name = '';
      this.$lodash.each(this.table.team, (val) => {
        if (val.id === id) {
          name = val.display_name;
          temp = val.alert_words;
        }
      });
      this.$refs.alertDialog.empAlert = temp;
      this.$refs.alertDialog.empName = name;
      this.$refs.alertDialog.showAlertRaised = true;
    }
  },
  watch: {
    pagination: {
      handler () {
        if (!this.config.initialLoading || !this.config.initialLoadingExit) {
          this.getTeam();
        }
      },
      deep: true
    },
    teamList () {
      const selectedTeam = Object.keys(this.selectedEmployees);
      const currentTeam = [];
      this.$lodash.each(this.table.team, (emp) => {
        currentTeam.push(emp.id);
      });
      let flag = '';
      currentTeam.some((val) => {
        if (selectedTeam.indexOf(val) !== -1) {
          flag = true;
        }
        if (selectedTeam.indexOf(val) === -1) {
          flag = false;
        }
      });
      if (flag) {
        this.selected = true;
      }
      if (!flag) {
        this.selected = false;
      }
    },
    group () {
      this.drawer = false;
    }
  },
  beforeMount () {
    this.getAssignedTOList();
    this.getAdminList();
    this.getBulkAdminList();
    this.config.initialLoading = true;
    this.config.initialLoadingExit = true;
    if (this.$route && this.$route.query && Object.keys(this.$route.query).length > 0) {
      let temp = {};
      this.$lodash.each(this.$route.query, (value, key) => {
        if (key !== 'startDate' && key !== 'endDate') {
          temp[key] = [];
          if (typeof value === 'object') {
            if (key === 'mood') {
              temp[key] = temp[key].concat(value.map(item => parseInt(item, 10)));
            } else {
              temp[key] = temp[key].concat(value);
            }
          } else {
            const val = value ? value.split(',') : '';
            const t = {
              [key]: val
            };
            temp = { ...temp, ...t };
          }
        }
      });
      if (this.$route.query.endDate && this.$route.query.startDate) {
        this.initDateRangeOptions.endDate = this.$route.query.endDate;
        this.initDateRangeOptions.startDate = this.$route.query.startDate;
      }
      this.filters.selected = temp;
      // if (this.filters.selected.highPotential) {
      //   this.filters.selected.highPotential = this.filters.selected.highPotential[0];
      // }
    }
    if (this.$route && this.$route.query && this.$route.query.search) {
      this.search(this.$route.query.search);
      this.table.searchString = this.$route.query.search;
      if (this.$route.query.eID) {
        this.viewEmployeeDashboard(this.$route.query.eID);
      }
    } else if (this.$route && this.$route.query && this.$route.query.eID) {
      this.viewEmployeeDashboard(this.$route.query.eID);
    }
    if (this.$route && this.$route.query && this.$route.query.mood) {
      this.mood.selected = this.filters.selected.mood;
      delete this.filters.selected.mood;
    }
    if (this.$route && this.$route.query && this.$route.query.disengaged_from_driver) {
      // delete this.filters.selected.disengaged_from_driver;
      // this.disengagedFromDriver.selected = this.$route.query.disengaged_from_driver;
      // eslint-disable-next-line prefer-destructuring
      const tempDriver = this.filters.selected.disengaged_from_driver[0];
      this.getSubDriversByDriver(tempDriver);
      this.disengagedFromDriver.selected = tempDriver;
      delete this.filters.selected.disengagedFromDriver;
      delete this.filters.selected.disengaged_from_driver;
    }
    if (this.$route && this.$route.query && this.$route.query.highPotential) {
      // eslint-disable-next-line prefer-destructuring
      this.highPotential.selected = this.filters.selected.highPotential[0];
      delete this.filters.selected.highPotential;
    }
    if (this.$route && this.$route.query && this.$route.query.chatResolutionStatus) {
      this.chatResolutionStatus.selected = this.filters.selected.chatResolutionStatus;
    }
    if (this.$route && this.$route.query && this.$route.query.chatStatus) {
      this.chatStatus.selected = this.filters.selected.chatStatus;
    }
    if (this.$route && this.$route.query && this.$route.query.engagement) {
      this.engagement.selected = this.filters.selected.engagement;
    }
    if (this.$route && this.$route.query && this.$route.query.disengagedFromDriver) {
      const tempDriver = this.filters.selected.disengagedFromDriver[0];
      this.getSubDriversByDriver(tempDriver);
      this.disengagedFromDriver.selected = tempDriver;
    }
    if (this.$route && this.$route.query && this.$route.query.assignedTo) {
      this.assignedTo.selected = this.filters.selected.assignedTo;
    }
    delete this.filters.selected.activeTab;
    this.triggerUpdate();
    // this.getTeam();
    this.getFilters();
  }
};
</script>
