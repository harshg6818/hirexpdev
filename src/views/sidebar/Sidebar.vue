<template>
  <!-- <aside class="sidebar sidebar-open"> -->
  <aside class="sidebar" v-bind:class="{
    'sidebar-open' : sidebarOpen, 'sidebar-hover' : sidebarHover,
    }" @mouseover="sidebarHover = true;" @mouseleave="sidebarHover = false;"
    v-if="user !== null">
      <v-layout row class="theme--dark">
        <v-flex>

          <v-img class="mt-3" :src="getImgUrl('amara_avatar')" v-show="!sidebarHover"
          max-height="40" contain max-width="120" />

          <v-img class="mt-3 mx-auto" :src="getImgUrl('amara_logo_white')"
          v-show="sidebarHover" height="40" width="210" />

          <v-list dark class='bg-transparent mt-1'>
            <template v-for="(item, i) in listTop">
              <v-layout
                v-if="item.heading"
                :key="i"
                row
                align-center
              >
              </v-layout>
              <v-list-tile
                :key="i"
                :to="item.link"
                v-if="item.link !== '/ad-hoc' || (item.link === '/ad-hoc' && user.adhoc_active && checkPermission(['manage_adhoc']))"
              >
                <v-list-tile-action class="">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{item.text}}
                  <!-- <v-chip small color="primary" v-if="item.beta" class="beta-indicator"> Beta </v-chip> -->
                </v-list-tile-title>
              </v-list-tile>
            </template>
          </v-list>

          <v-list dark class="bg-transparent bottom" fixed>
            <template>
              <!--<v-list-tile @click="switchDashboard()" v-if="user.adhoc_active">
                <v-list-tile-action class="">
                  <v-icon>fa-sync</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  Adhoc Dashboard
                </v-list-tile-title>
              </v-list-tile>-->
            </template>
            <template v-for="(item, i) in listBottom">
              <v-layout
                v-if="item.heading"
                :key="i"
                row
                align-center
              >
              </v-layout>
              <v-list-tile
                :key="i"
                :to="item.link"
                style="position:relative;"
                :class="item.text === 'What\'s new' ? 'announcekit-widget bell-icon' : ''"
              >
                <v-list-tile-action class="">
                  <v-icon>{{ item.icon }}<div style="position:absolute;top:20px; left:25px;" v-if="item.text === 'What\'s new'" class="announcekit-widget"></div></v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{item.text}}

                </v-list-tile-title>
              </v-list-tile>
            </template>
            <template>
              <v-list-tile @click="logout">
                <v-list-tile-action class="">
                  <v-icon>fa-power-off</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  Logout
                </v-list-tile-title>
              </v-list-tile>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
      <!-- hoverable side bar -->
      <!-- <div class="custom-sidebar mySidenav" id="mySidenav">
        <a class="item" id="dashboard" @click="onClickNav('/?activeTab=overview')">
          <span>Dashboard</span>
          <span><v-icon class="item-icon">fas fa-chart-line</v-icon></span>
        </a>
        <a class="item" id="employees" @click="onClickNav('/employees')">
          <span>Employees</span>
          <span><v-icon class="item-icon">fas fa-users</v-icon></span>
        </a>
        <a class="item" id="Ad-hoc" @click="onClickNav('/ad-hoc')">
          <span>Ad-hoc</span>
          <span><v-icon class="item-icon">fas fa-bezier-curve</v-icon></span>
        </a>
        <a class="item" id="contact" @click="onClickNav('/advance-analytics')">
          <span>Employee lifecycle</span>
          <span><v-icon class="item-icon">fas fa-chart-bar</v-icon></span>
        </a>
      </div> -->
  </aside>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import {
  VNavigationDrawer,
  VDivider,
  VSubheader,
  VTooltip,
  VChip
} from 'vuetify';

export default {
  name: 'sidebar',
  components: {
    VNavigationDrawer,
    VDivider,
    VSubheader,
    VTooltip,
    VChip
  },
  data () {
    return {
      sidebarHover: false,
      drawer: null,
      listTop: [
        { icon: 'fas fa-chart-line', text: 'Dashboard', link: '/?activeTab=overview' },
        // { icon: 'fas fa-user-secret', text: 'Anonymous Messages', link: '/lifecycle' },
        // { icon: 'fas fa-bezier-curve', text: 'Employee Lifecycle', link: '/lifecycle' },
        // { icon: 'fas fa-database', text: 'Question Bank', link: '/question-bank' },
        // { icon: 'fas fa-brain', text: 'Question Sets', link: '/question-sets' },
        { icon: 'fas fa-users', text: 'Employees', link: '/employees' },
        { icon: 'fas fa-bezier-curve', text: 'Ad-hoc ', link: '/ad-hoc', beta: true },
        { icon: 'fas fa-chart-bar', text: 'Emp lifecycle', link: '/advance-analytics' }
      ],
      listBottom: [
        { icon: 'fas fa-bell', text: 'What\'s new' },
        { icon: 'fas fa-life-ring', text: 'Support', link: '/support-center' },
        { icon: 'fas fa-cog', text: 'Settings', link: '/settings' }
      ]
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      sidebarOpen: state => state.sidebarOpen
    })
  },
  methods: {
    switchDashboard () {
      if (window.location.host === 'localhost:8080') {
        window.open('http://localhost:8080/ad-hoc');
      } else if (window.location.host === 'localhost:8081') {
        window.open('http://localhost:8081/ad-hoc');
      } else if (window.location.host === 'app.dev.amara.ai') {
        window.open('https://app.dev.amara.ai/ad-hoc');
      } else {
        window.open('https://app.amara.ai/ad-hoc');
      }
    },
    logout () {
      axios.post(`${process.env.VUE_APP_API_URL}logout`).then((response) => {
        if (response && response.data.status === 200) {
          this.$store.dispatch('deleteSession');
          this.$router.push('/login');
        } else {
          this.$notify({
            group: 'foo',
            title: 'Error while logging out!',
            type: 'warn'
          });
          this.$store.dispatch('deleteSession');
          this.$router.push('/login');
        }
      }, () => {
        this.$store.dispatch('deleteSession');
        this.$router.push('/login');
      });
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/logo', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    closeSidebar () {
      if (document && document.documentElement &&
        document.documentElement.clientWidth &&
        document.documentElement.clientWidth < 992 && this.sidebarOpen) {
        this.$store.dispatch('toggleSidebar');
      }
    },
    checkPermission (permission) {
      let flag = false;
      this.$lodash.each(this.user.permissions, (perm) => {
        this.$lodash.each(permission, (v) => {
          if (v === perm) {
            flag = true;
          }
        });
      });
      return flag;
    },
    onClickNav (router) {
      this.$router.push(router);
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-sidebar {
  z-index: 99;
  position: fixed;
  left: 0;
  top: 120px;
}
.mySidenav {
  .item {
    position: relative;
    display: block;
    left: -148px;
    transition: 1s ease all;
    padding: 15px;
    width: 200px;
    text-decoration: none;
    font-size: 20px;
    color: #ffffff;
    font-weight:bold;
    border-radius: 0 5px 5px 0;
    opacity: 1;
    margin: 5px 0;
    background: linear-gradient(90deg, #61245e, #42276f 90%);
    &:hover {
      left: 0;
      transition: all 300ms ease;
      opacity:1;
      z-index: 999999;
    }
    .item-icon {
      display: block;
      position: absolute;
      right: 10px;
      top: 25%;
      font-size: 28px;
      color: #fff;
    }
  }
}
</style>

<style scoped>
/* #mySidenav a:after{
  content: '';
  display: block;
  position: absolute;
  right: 10px;
  top: 25%;
  font-size: 32px;
  font-weight: bold;
  width: 25px;
  height: 0px;
  border-left: 25px solid #fff;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}
#mySidenav a:hover:after{
  content:'';
  right:10px;
  border-left-color:transparent;
  border-right:25px solid #fff;
  border-top:15px solid transparent;
  border-bottom:15px solid transparent;
} */
</style>

<style lang="scss">
.bell-icon:hover {
  cursor: pointer;
  background: rgba(255,255,255,0.08);
}
.announcekit-widget {
  a{
    position:absolute;
    top:20px;
    left:25px;
    margin-left: -16px;
    margin-top: -32px;
  }
}
.v-list.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
}
$navW: 3.8rem;
$navColor: #fff;

.beta-indicator {
  position: relative;
  top: -6px;
  left: -2px;
}

.sidebar {
  background: -webkit-linear-gradient(90deg,#61245e 0%,#42276f 90%);
  // background: -webkit-linear-gradient(90deg,#911f42 0%,#42276f 90%);
  .v-list.bg-transparent {
    background-color: transparent;
  }
  .v-list__tile__action {
    min-width: 38px !important;
  }
  // display: none;
  display: block;
  position: absolute;
  left: -168px;
  width: $navW;
  background-color: #424242;
  height: 100%;
  // height: calc(100% - 48px);
  transition: all 300ms ease;
  overflow: hidden;
  z-index: 3;
  .v-list__tile--active {
    color: #c72355 !important;
    caret-color: #c72355 !important;
  }
  .v-image {
    left: 0px;
    transition: all 300ms ease;
  }
  &.sidebar-open {
    // display: block !important;
    left: 0;
    position: fixed;
    transition: all 300ms ease;
  }
  &.sidebar-open {
    // display: block !important;
    left: 0;
    position: fixed;
    transition: all 300ms ease;
  }
  // SIDEBAR EXPAND
  &.sidebar-hover {
    width: $navW * 4;
    box-shadow: 0px 0px 10px #c6c6c6;
  }
  * {
    user-select: none;
  }
  // SIDEBAR MENU
  > ul {
    display: table;
    width: $navW * 5;
    &.list-bottom {
      position: absolute;
      bottom: 0;
      > li:nth-child(1) {
        div {
          &:nth-child(1) {
            width: $navW * 5;
          }
        }
      }
    }
    // SIDEBAR MENU ITEM
    > li {
      display: table-row;
      background: #ffffff;
      cursor: pointer;
      &:nth-child(0) {
        height: $navW;
      }
      &:hover {
        background: darken($navColor, 10%);
      }
      &:active {
        background: lighten($navColor, 90%);
      }
      a {
        text-decoration: none;
        display: table-cell;
         div {
          height: $navW - 1;
          line-height: $navW - 1;
          display: table-cell;
          // ICON
          &:nth-child(1) {
            width: $navW;
            text-align: center;
          }
          // DESCRIPTION
          &:nth-child(2) {
            width: $navW * 3;
            text-align: left;
            padding-left: $navW / 5;
          }
        }
        &.router-link-active {
          div {
            &:nth-child(1) {
              color: #d1222f;
            }
          }
          svg:not(:root).svg-inline--fa {
            color: #d1222f;
          }
          [class^="flaticon-"]:before, [class*=" flaticon-"]:before,
          [class^="flaticon-"]:after, [class*=" flaticon-"]:after {
            color: #d1222f;
          }
        }
      }

    }
  }
}
.navigation-drawer__border {
  display: none;
}
</style>
