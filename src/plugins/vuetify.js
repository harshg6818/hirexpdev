import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#4c3e9d',
        // primary: '#0d2c8d',
        secondary: '#f4f8f9',
        accent: '#8E2DE2',
        accent2: '#363840',
        error: '#F44336',
        warning: '#ffeb3b',
        info: '#2196f3',
        success: '#4caf50'
        // dark: '#767676',
      }
    }
  },
  icons: {
    iconfont: 'fa'
  }
});
