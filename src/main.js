import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;

if (localStorage.getItem('CHATBOT_USER')) {
  const parsedSession = JSON.parse(localStorage.getItem('CHATBOT_USER'));
  store.dispatch('createSession', parsedSession);
}

Vue.use(VeeValidate);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
