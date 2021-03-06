import Vue from 'vue';
import VueRouter from 'vue-router';

import axios from 'axios';
import store from '../store';

// Shells
import Shell from '../views/Shell';
import SubShell from '../views/SubShell.vue';

// Views
const PageNotFound = () => import(/* webpackChunkName: "PageNotFound" */ '../views/PageNotFound');

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  }, {
    path: '/Request-demo',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "SignUp" */ '../views/SignUp.vue')
  }, {
    path: '/support',
    name: 'NeedHelp',
    component: () => import(/* webpackChunkName: "needhelp" */ '../views/needHelp.vue')
  }, {
    path: '/first-login',
    name: 'FirstLogin',
    component: () => import(/* webpackChunkName: "FirstLogin" */ '../views/FirstLogin.vue')
  }, {
    path: '/reset-password',
    component: SubShell,
    children: [{
      path: '',
      name: 'ResetPasswordBlank',
      component: () => import(/* webpackChunkName: "ResetPasswordBlank" */ '../views/ResetPassword.vue')
    }, {
      path: ':uid/:token',
      name: 'ResetPassword',
      component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword.vue')
    }]
  },
  {
    path: '/',
    component: Shell,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '@/components/dashboard/Dashboard')
      }, {
        path: 'lifecycle',
        component: SubShell,
        children: [{
          path: '',
          name: 'Lifecycle',
          component: () => import(/* webpackChunkName: "Stages" */ '@/components/stages/Lifecycles')
        }, {
          path: 'new',
          name: 'NewLifecycle',
          component: () => import(/* webpackChunkName: "Stages" */ '@/components/stages/NewStage')
        }, {
          path: 'edit/:stageId',
          name: 'EditLifecycle',
          component: () => import(/* webpackChunkName: "Stages" */ '@/components/stages/NewStage')
        }, {
          path: 'view/:stageId',
          name: 'ViewLifecycle',
          component: () => import(/* webpackChunkName: "Stages" */ '@/components/stages/ViewStage')
        }]
      }, {
        path: 'exit',
        component: SubShell,
        children: [{
          path: 'new',
          name: 'NewExitTouchpoint',
          component: () => import(/* webpackChunkName: "Exit" */ '@/components/exit/NewExitTouchpoint')
        }, {
          path: 'edit/:stageId',
          name: 'EditExitTouchpoint',
          component: () => import(/* webpackChunkName: "Exit" */ '@/components/exit/NewExitTouchpoint')
        }, {
          path: 'view/:stageId',
          name: 'ViewExitTouchpoint',
          component: () => import(/* webpackChunkName: "Exit" */ '@/components/exit/ViewStage')
        }]
      }, {
        path: 'driver',
        component: SubShell,
        children: [{
          path: 'view/:driver',
          name: 'Driver',
          component: () => import(/* webpackChunkName: "Stages" */ '@/components/driver/Driver')
        }]
      }, {
        path: 'ad-hoc',
        component: SubShell,
        children: [{
          path: '',
          name: 'Adhoc',
          component: () => import(/* webpackChunkName: "Stages" */ '@/components/adhoc/Adhoc')
        }, {
          path: 'new',
          name: 'NewAdhoc',
          component: () => import(/* webpackChunkName: "Stages" */ '@/components/adhoc/NewAdhoc')
        }, {
          path: 'edit/:stageId',
          name: 'EditAdhoc',
          component: () => import(/* webpackChunkName: "Stages" */ '@/components/adhoc/NewAdhoc')
        }, {
          path: 'view/:stageId',
          name: 'ViewAdhoc',
          component: () => import(/* webpackChunkName: "Stages" */ '@/components/adhoc/ViewAdhoc')
        }]
      }, {
        path: 'question-sets',
        component: SubShell,
        children: [{
          path: '',
          name: 'Surveys',
          component: () => import(/* webpackChunkName: "Surveys" */ '@/components/surveys/Surveys')
        }, {
          path: 'new',
          name: 'NewSurvey',
          component: () => import(/* webpackChunkName: "Surveys" */ '@/components/surveys/NewSurvey')
        }, {
          path: 'edit/:surveyId',
          name: 'EditSurvey',
          component: () => import(/* webpackChunkName: "Surveys" */ '@/components/surveys/NewSurvey')
        }]
      }, {
        path: 'employees',
        component: SubShell,
        children: [{
          path: '',
          name: 'Employees',
          component: () => import(/* webpackChunkName: "Employees" */ '@/components/employees/Employees')
        },
        // {
        // path: 'upload-employees',
        // component: () =>
        //  import ( /* webpackChunkName: "Employees" */ '@/components/employees/UploadEmployees'),
        // name: 'UploadEmployees',
        // },
        {
          path: 'view/:employeeId',
          name: 'ViewEmployee',
          component: () => import(/* webpackChunkName: "Employees" */ '@/components/employees/ViewEmployee')
        }]
      }, {
        path: 'drivers',
        component: SubShell,
        children: [{
          path: '',
          name: 'Driver',
          component: () => import(/* webpackChunkName: "Analytics" */ '@/components/driver-engagement/driver')
        }, {
          path: 'v/:driver',
          name: 'SubDrivers',
          component: () => import(/* webpackChunkName: "Analytics" */ '@/components/driver-engagement/sub-drivers')
        }]
      }, {
        path: 'analytics',
        component: SubShell,
        children: [{
          path: '',
          name: 'Analytics',
          component: () => import(/* webpackChunkName: "Analytics" */ '@/components/analytics/Analytics')
        }, {
          path: 'life-cycle',
          name: 'EmpLifeCycle',
          component: () => import(/* webpackChunkName: "EmployeeLifecycle" */ '@/components/analytics/EmployeeLifecycle')
        }, {
          path: 'response-rate',
          name: 'EmployeeResponseRate',
          component: () => import(/* webpackChunkName: "EmployeeResponseRate" */ '@/components/analytics/EmployeeResponseRate')
        }, {
          path: 'participation-rate',
          name: 'EmployeeChatParticipationRate',
          component: () => import(/* webpackChunkName: "EmployeeResponseRate" */ '@/components/analytics/EmployeeChatParticipationRate')
        }, {
          path: 'diversity-report',
          name: 'DiversityReport',
          component: () => import(/* webpackChunkName: "EmployeeResponseRate" */ '@/components/analytics/diversityReport')
        }]
        // }, {
        //   path: 'FAQ',
        //   component: SupportCenterFAQ,
        //   name: 'SupportCenterFAQ',
      }, {
        path: 'support-center',
        component: SubShell,
        children: [{
          path: '',
          name: 'SupportCenterTickets',
          component: () => import(/* webpackChunkName: "SupportCenter" */ '@/components/supportCenter/SupportCenterTickets')
        }, {
          path: 'new',
          name: 'NewSupportTicket',
          component: () => import(/* webpackChunkName: "SupportCenter" */ '@/components/supportCenter/NewSupportTicket')
        }, {
          path: 'view',
          name: 'ViewSupportTicket',
          component: () => import(/* webpackChunkName: "SupportCenter" */ '@/components/supportCenter/ViewSupportTicket')
        }]
      }, {
        path: 'settings',
        component: SubShell,
        children: [{
          path: '',
          name: 'Settings',
          component: () => import(/* webpackChunkName: "Settings" */ '@/components/settings/Settings')
        }]
      }
    ]
  }, {
    path: '404',
    name: 'PageNotFound',
    component: PageNotFound
  }, {
    path: '500',
    name: 'ServerError',
    component: PageNotFound
  }, {
    path: '*',
    name: 'PageNotFoundDefault',
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // console.log('store.state.user', store.state.user);
  // for main app navigation start
  const routePath = to.path.split('/');
  const currentPath = routePath[1];
  store.state.activeNavigation = currentPath;
  // for main app navigation end
  let authInterceptor;
  if (to.matched.some(record => record.meta.requiresAuth) && store.state.user) {
    if (store.state.user && store.state.user.access_token) {
      store.dispatch('inspectToken');
    }
    authInterceptor = axios.interceptors.request.use((config) => {
      const configTemp = config;
      configTemp.headers.Authorization = `JWT ${store.state.user.access_token}`;
      configTemp.headers['X-CSRFToken'] = store.state.user.csrf_token;
      return configTemp;
    }, error => Promise.reject(error));
    // if (to.matched.some(record => record.path === '/ad-hoc') && store.state.user.adhoc_active) {
    if (to.matched.some(record => record.path === '/ad-hoc')) {
      if (store.state.user.adhoc_active) {
        next();
      } else {
        axios.interceptors.request.eject(authInterceptor);
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        });
      }
    } else if (to.matched.some(record => record.path === '/support-center' || record.path === '/settings') && (store.state.user.adhoc_active || store.state.user.milestone_active)) {
      next();
    } else if (to.matched.some(record => record.path !== '/ad-hoc')) {
      if (store.state.user.milestone_active) {
        next();
      } else {
        axios.interceptors.request.eject(authInterceptor);
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        });
      }
    }
    // next();
  } else if (to.matched.some(record => record.meta.requiresAuth) && !store.state.user) {
    axios.interceptors.request.eject(authInterceptor);
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    });
  } else {
    axios.interceptors.request.eject(authInterceptor);
    next();
  }

  // 401 interceptor
  axios.interceptors.response.use(response => response, (error) => {
    let rtn = false;
    if (error.response && error.response.status === 401 &&
      error.response.data && error.response.data.detail === 'Signature has expired.') {
      setTimeout(() => {
        localStorage.removeItem('CHATBOT_USER');
        store.dispatch('deleteSession');
      }, 3000);
      store.dispatch('updateSnackbar', {
        color: 'info',
        show: true,
        text: 'Session expired, Please log-in again!'
      });
    } else {
      rtn = Promise.reject(error);
      // throw new Error(error);
    }
    return rtn;
  });
});

export default router;
