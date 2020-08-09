<template>
  <div class="container mt-1">
    <v-layout class="my-4">
      <v-flex xs6 class="text-left align-items-center d-flex">
        <h3>Support Center</h3>
      </v-flex>
      <v-flex xs6 class="text-right mb-2">
        <button class="btn btn-blue btn-custom transparent cursor-pointer" @click="$router.push('/support-center')"><font-awesome-icon icon="ticket-alt" class="mr-2" /> See all support tickets</button>
        <button class="btn btn-blue btn-custom filled cursor-pointer" @click="$router.push('/support-center')"><font-awesome-icon icon="life-ring" class="mr-2" /> Ask for support</button>
      </v-flex>
    </v-layout>
    <!-- <v-layout class="my-4">
      <v-flex>
        <div class="prepend-icon p-0">
          <input type="text" class="form-control" v-model="search" placeholder="Search for your issue ..." />
        </div>
      </v-flex>
    </v-layout> -->
    <v-layout>
      <!-- <v-flex>
        <b-card no-body class="mb-4" style="min-height: 300px;">
          <div class="card-header p-1 text-left bold pl-2">Frequently asked questions.</div>
          <div class="p-4 m-2">
          </div>
        </b-card>
      </v-flex> -->
      <v-flex>
        <b-card no-body class="mb-4" style="min-height: 300px;">
          <div class="card-header p-1 text-left bold pl-2">Product demo videos.</div>
          <div class="container">
            <iframe width="100%" height="600" frameborder="0"  src="https://www.youtube.com/embed/videoseries?list=PLLdyLw6OU0QwwaUkDvWhNmobgNdOi3S_I&amp;hl=en_US"> </iframe>
          </div>
        </b-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
// import Vue from 'vue';
import { mapState } from 'vuex';

export default {
  name: 'support-center-faq',
  components: {
    // FontAwesomeIcon,
    // Vue,
  },
  data () {
    return {
      search: ''
    };
  },
  methods: {
    getFAQ () {
      this.$http.get('https://hirexp.freshdesk.com/api/v2/solutions/folders/33000017168/articles', {
        headers: {
          // 'X-CSRFToken': 'as',
          Authorization: 'Basic NnlOMVNocVlkOEtaNlBVazRBM246MTIzNA=='
        }
      }).then((response) => {
        if (response && response.data) {
          throw new Error(response);
        }
      }, (response) => {
        throw new Error(response);
      });
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
