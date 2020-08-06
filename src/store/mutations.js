/* eslint-disable no-param-reassign */
export default {
  UPDATE_FILTERS (state, dashboardFilters) {
    state.dashboardFilters = dashboardFilters;
  },
  UPDATE_SETTINGS_TAB (state, activeTab) {
    state.selectedSettingsTab = activeTab;
  },
  UPDATE_COMPANY_ADMINS (state, usersData) {
    state.companyAdminsList = usersData;
  },
  UPDATE_COMPANY_USERS (state, usersData) {
    state.companyUsersList = usersData;
  },
  UPDATE_STAGES (state, stagesData) {
    state.stages = stagesData;
  },
  UPDATE_SNACKBAR (state, snackbarData) {
    state.snackbar = snackbarData;
  },
  CREATE_TEMP_SESSION (state, userData) {
    state.tempUser = userData;
  },
  CREATE_SESSION (state, userData) {
    state.user = userData;
  },
  CREATE_SETTINGS (state, settings) {
    state.companySettings = settings;
  },
  CREATE_CONSOLE_SETTINGS (state, consoleSettings) {
    state.companyConsoleSettings = consoleSettings;
  },
  UPDATE_SESSION_KEY (state, keyData) {
    state.user.access_token = keyData;
  },
  DELETE_SESSION (state) {
    state.user = null;
    window.location.reload();
  },
  TOGGLE_SIDEBAR (state) {
    state.sidebarOpen = !state.sidebarOpen;
  },
  TEAM_LIST (state, teamData) {
    state.teamData = teamData;
  },
  UPDATE_TEAM (state, empData) {
    const idx = state.teamData.findIndex(team => team.id === empData.id);
    state.teamData[idx] = empData;
  },

  // email templates
  TEMPLATE_LIST (state, list) {
    state.templatesList = list;
  },
  EMAIL_TEMPLATE (state, template) {
    state.EmailTemplate = template;
    console.log(state.EmailTemplate);
  },
  TEMPLATE_CATEGORY_OPTIONS (state, options) {
    state.templateCategoryOptions = options;
  },

  ACTIVE_TEMPLATE (state, template) {
    state.activeTemplate = template;
  },

  UPDATE_ACTIVE_TEMPLATE (state, data) {
    state.activeTemplate.default_email_template[data.type] = data.value;
  },

  UPDATE_ACTIVE_TEMPLATE_SUBJECT (state, data) {
    state.activeTemplate.default_email_template.subject = data;
  },

  UPDATE_ACTIVE_TEMPLATE_BODY (state, data) {
    state.activeTemplate.default_email_template.body[data.type] = data.value;
  },

  UPDATE_ACTIVE_TEMPLATE_ACTION_BUTTON (state, data) {
    state.activeTemplate.default_email_template.actionButton = data;
  },
  UPDATE_BULK_ACTIONS (state, data) {
    state.bulkStatus = data;
  },
  SESSION_EMPLOYEES_COUNT (state, data) {
    state.sessionEmployeesCount = data;
  },
  UPDATE_EMPLOYEE_FILTERS (state, data) {
    state.updateEmployeeFilters = data;
  },
  SINGLE_EMP_VIEW (state, data) {
    state.singleEmpView = data;
  },
  ACTIVE_EMPLOYEE (state, data) {
    state.activeEmployee = data;
  },
  EMPLOYEES_LIST (state, data) {
    state.employeesList = data;
  },
  LOADING_EMPLOYEES_LIST (state, data) {
    state.loadingEmployeesList = data;
  },
  UPDATE_DASHBOARD_FILTERS (state, data) {
    state.updateDashboardFilters = data;
  }
};
/* eslint-enable no-param-reassign */
