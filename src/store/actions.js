// import Vue from 'vue';
// import router from '../router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// import store from '../store';

export default {
  getCompanyUsers ({ commit, state }) {
    let request;
    if (state.companyUsersList.length === 0 && !request) {
      request = axios.get(`${process.env.VUE_APP_API_URL}users/list`).then((response) => {
        if (response.data) {
          commit('UPDATE_COMPANY_USERS', response.data.data);
        }
      }, (response) => {
        // console.log(response);
      });
    }
  },
  getAdminList ({ commit, state }) {
    let request;
    if (state.companyAdminsList.length === 0 && !request) {
      request = axios.get(`${process.env.VUE_APP_API_URL}users/admins?page_offset=0`).then((response) => {
        if (response.data) {
          commit('UPDATE_COMPANY_ADMINS', response.data.data);
        }
      }, (response) => {
        // console.log(response);
      });
    }
  },
  updateFilters ({ commit }, dashboardFilters) {
    commit('UPDATE_FILTERS', dashboardFilters);
  },
  updateSettingsTab ({ commit }, activeTab) {
    commit('UPDATE_SETTINGS_TAB', activeTab);
  },
  updateStages ({ commit }, stagesData) {
    commit('UPDATE_STAGES', stagesData);
  },
  updateSnackbar ({ commit }, snackbarData) {
    commit('UPDATE_SNACKBAR', snackbarData);
  },
  createTempSession ({ commit }, userData) {
    commit('CREATE_TEMP_SESSION', userData);
  },
  createSession ({ commit }, userData) {
    localStorage.setItem('CHATBOT_USER', JSON.stringify(userData));
    commit('CREATE_SESSION', userData);
  },
  deleteSession ({ commit }) {
    localStorage.removeItem('CHATBOT_USER');
    commit('DELETE_SESSION');
  },
  updateSessionKey ({ commit }, key, keyData) {
    commit('UPDATE_SESSION_KEY', key, keyData);
  },
  refreshToken ({ commit }) {
    const userData = this.state.user;
    axios.post(`${process.env.VUE_APP_API_URL}refreshToken`, {
      token: this.state.user.access_token
    }).then((response) => {
      if (response.data) {
        commit('UPDATE_SESSION_KEY', response.data.token);
        const token = response.data.token;
        userData.access_token = token;
        localStorage.setItem('CHATBOT_USER', JSON.stringify(userData));
        commit('CREATE_SESSION', userData);
      }
    }, () => {
      localStorage.removeItem('CHATBOT_USER');
      commit('DELETE_SESSION');
    });
  },
  inspectToken ({ commit }) {
    let token = '';
    if (this.state.user) {
      token = this.state.user.access_token;
    }
    if (token) {
      const decoded = jwtDecode(token);
      const exp = decoded.exp;
      const origIat = decoded.orig_iat;
      const timeBeforeRefresh = 7200; // This is 2 hours;
      const maxLifespan = 604800 - timeBeforeRefresh;
      if (exp - (Date.now() / 1000) < timeBeforeRefresh && (Date.now() / 1000) - origIat < maxLifespan) {
        this.dispatch('refreshToken');
      } else if (exp - (Date.now() / 1000) < timeBeforeRefresh) {
        // this.dispatch('refreshToken');
        // DO NOTHING, DO NOT REFRESH
      } else {
        // setTimeout(() => {
        //     localStorage.removeItem('CHATBOT_USER');
        //     commit('DELETE_SESSION');
        // }, 3000);
        // this.dispatch('updateSnackbar', {
        //     color: 'info',
        //     show: true,
        //     text: 'Session expired, Please log-in again!',
        // });
      }
    }
  },
  toggleSidebar ({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  teamList ({ commit }, teamData) {
    commit('TEAM_LIST', teamData);
  },
  updateTeam ({ commit }, teamData) {
    commit('UPDATE_TEAM', teamData);
  },

  // email templates

  templatesList ({ commit }, list) {
    commit('TEMPLATE_LIST', list);
  },

  templateCategoryOptions ({ commit }, options) {
    commit('TEMPLATE_CATEGORY_OPTIONS', options);
  },

  activeTemplate ({ commit }, template) {
    commit('ACTIVE_TEMPLATE', template);
  },
  updateEmail ({ commit }, template) {
    commit('EMAIL_TEMPLATE', template);
  },

  // updateActiveTemplate({ commit }, data) {
  //     commit('UPDATE_ACTIVE_TEMPLATE', data);
  // },

  updateActiveTemplateSubject ({ commit }, data) {
    commit('UPDATE_ACTIVE_TEMPLATE_SUBJECT', data);
  },

  updateActiveTemplateBody ({ commit }, data) {
    commit('UPDATE_ACTIVE_TEMPLATE_BODY', data);
  },

  updateActiveTemplateActionButton ({ commit }, data) {
    commit('UPDATE_ACTIVE_TEMPLATE_ACTION_BUTTON', data);
  },
  updateBulkActions ({ commit }, data) {
    commit('UPDATE_BULK_ACTIONS', data);
  },
  sessionEmployeesCount ({ commit }, data) {
    commit('SESSION_EMPLOYEES_COUNT', data);
  },
  updateEmployeeFilters ({ commit }, data) {
    commit('UPDATE_EMPLOYEE_FILTERS', data);
  },
  singleEmpView ({ commit }, data) {
    commit('SINGLE_EMP_VIEW', data);
  },
  activeEmployee ({ commit }, data) {
    commit('ACTIVE_EMPLOYEE', data);
  },
  employeesList ({ commit }, data) {
    commit('EMPLOYEES_LIST', data);
  },
  loadingEmployeesList ({ commit }, data) {
    commit('LOADING_EMPLOYEES_LIST', data);
  },
  updateDashboardFilters ({ commit }, data) {
    commit('UPDATE_DASHBOARD_FILTERS', data);
  }
};
