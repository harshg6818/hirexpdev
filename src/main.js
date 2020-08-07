import Vue from 'vue';
import VeeValidate from 'vee-validate';
import dayjs from 'dayjs';
import VuetifyDaterangePicker from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/lodash';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;

if (localStorage.getItem('CHATBOT_USER')) {
  const parsedSession = JSON.parse(localStorage.getItem('CHATBOT_USER'));
  store.dispatch('createSession', parsedSession);
}

Object.defineProperty(Vue.prototype, 'dayjs', {
  value: dayjs
});

Vue.use(VuetifyDaterangePicker);
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
