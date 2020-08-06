<template>
  <v-app none class="white">
    <router-view/>
  </v-app>
</template>

<script>
// import { VSnackbar } from 'vuetify';
import { mapState } from 'vuex';

export default {
  name: 'App',

  components: {
    // VSnackbar,
  },

  methods: {
    start () {
      this.$Progress.start();
    },
    backOnline () {
      // 🦄🎊🔥 we're back online!
      this.$store.dispatch('updateSnackbar', {
      });
      setTimeout(() => {
        this.$store.dispatch('updateSnackbar', {
          color: 'info',
          show: true,
          text: 'You are now connected to internet.'
        });
      }, 400);
    },
    offlineNow () {
      this.$store.dispatch('updateSnackbar', {
        color: 'error',
        show: true,
        text: 'You are not connected to internet. Please check your internet connection.'
      });
    }
  },
  computed: {
    ...mapState({
      snackbar: state => state.snackbar
    })
  },
  beforeMount () {
    window.addEventListener('online', this.backOnline);
    window.addEventListener('offline', this.offlineNow);
  },
  beforeDestroy () {
    window.removeEventListener('online', this.backOnline);
    window.removeEventListener('offline', this.offlineNow);
  }

};
</script>

<style lang="scss">
@import './assets/css/app.scss';
</style>
