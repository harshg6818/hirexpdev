<template>
  <header v-if="user !== null" class="">
    <v-card class="elevation-5">
      <v-container grid-list-xs>
        <v-layout row justify-space-between class="px-5">
          <v-flex sm4>
            <search class="mt-4" />
              <!-- <v-text-field
                name="search"
                prepend-icon="search"
                :loading="false"
                label="Search"
              ></v-text-field> -->
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex text-xs-right>
            <span class="pt-5">{{user.user_first_name}}</span>
            <v-menu bottom left offset-y class="mt-2">
              <!-- <span>{{user.name}}</span> -->
              <v-btn slot="activator" fab flat>
                <v-avatar class="cursor-pointer"
                  size="45"
                  color="grey lighten-4" >
                  <img src="https://www.hirexp.com/img/hirexp-avatar.jpg" alt="avatar">
                  <!-- <img :src="user.profile_picture" alt="avatar"> -->
                </v-avatar>
              </v-btn>
              <v-list>
                <!-- <v-list-tile>
                  <v-list-tile-title>Settings</v-list-tile-title>
                </v-list-tile> -->
                <v-list-tile>
                  <v-list-tile-title @click="logout()">Logout</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import {
  VIcon,
  VToolbar,
  VAvatar,
  VMenu
} from 'vuetify';
import Search from './Search';

export default {
  name: 'navbar',
  components: {
    VIcon,
    VToolbar,
    VAvatar,
    VMenu,
    Search
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      sidebarOpen: state => state.sidebarOpen
    })
  },
  methods: {
    openSidebar () {
      this.$store.dispatch('toggleSidebar');
    },
    logout () {
      this.$http.post(`${process.env.API_URL}logout`).then((response) => {
        if (response && response.data.status === 200) {
          this.$store.dispatch('deleteSession');
          this.$router.push('/');
        } else {
          this.$notify({
            group: 'foo',
            title: 'Error while logging out!',
            type: 'warn'
          });
          this.$store.dispatch('deleteSession');
          this.$router.push('/');
        }
      }, () => {
        this.$store.dispatch('deleteSession');
        this.$router.push('/');
      });
    }
  }
};
</script>

<style lang="scss">
header {
  margin-left: 100px;
}
.white-nav-div {
  background-color: white;
}
.small-navbar {
  height: 80px;
  border-bottom: 1px solid #bbbbbb;
}
.logo {
  max-height: 40px;
  max-width: 150px;
}
</style>
