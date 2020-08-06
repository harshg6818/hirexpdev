export default {
  user: null,
  snackbar: {
    show: false,
    color: '',
    mode: '',
    text: ''
  },
  companyUsersList: [],
  companyAdminsList: [],
  sidebarOpen: true,
  stages: [],
  dashboardFilters: {
    filters: {}
  },
  teamData: [],

  // email templates

  templatesList: null,
  EmailTemplate: null,
  templateCategoryOptions: null,
  activeTemplate: null,

  // employees bulk action status bar configs
  sessionEmployeesCount: '',
  bulkStatus: {
    show: false, // display the action status bar
    action: '', // type of action
    actionStatus: true, // show loader or check icon
    successCount: 0,
    errorCount: 0,
    assignedTo: ''
  },
  updateEmployeeFilters: null,
  singleEmpView: false,
  activeEmployee: {},
  employeesList: [],
  activeNavigation: 'dashboard',
  loadingEmployeesList: true,
  updateDashboardFilters: null
};
