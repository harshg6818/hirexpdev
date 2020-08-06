import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue'

//
// import axios from 'axios'
// import store from './store'

// Shells
// import Shell from './views/Shell'
// import SubShell from '../views/SubShell.vue'

// Views
// const PageNotFound = () => import(/* webpackChunkName: "PageNotFound" */ './views/PageNotFound')

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  }
  // {
  //   path: '/Request-demo',
  //   name: 'SignUp',
  //   component: () => import(/* webpackChunkName: "SignUp" */ '../views/SignUp.vue')
  // }, {
  //   path: '/support',
  //   name: 'NeedHelp',
  //   component: () => import(/* webpackChunkName: "needhelp" */ '../views/needHelp.vue')
  // }, {
  //   path: '/first-login',
  //   name: 'FirstLogin',
  //   component: () => import(/* webpackChunkName: "FirstLogin" */ '../views/FirstLogin.vue')
  // }, {
  //   path: '/reset-password',
  //   component: SubShell,
  //   children: [{
  //     path: '',
  //     name: 'ResetPasswordBlank',
  //     component: () => import(/* webpackChunkName: "ResetPasswordBlank" */ '../views/ResetPassword.vue')
  //   }, {
  //     path: ':uid/:token',
  //     name: 'ResetPassword',
  //     component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword.vue')
  //   }]
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
