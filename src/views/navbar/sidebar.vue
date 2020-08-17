<template>
  <v-navigation-drawer
    v-model="primaryDrawer.model"
    :mini-variant="toogleBar"
    app
    overflow
    class="am-sidebar"
    :class="toogleBar ? 'w-70' : 'w-225'"
  >
  <v-list
    dense
    nav
    class="py-0"
  >
    <v-list-item two-line :class="miniVariant && 'px-0'">
      <div>
        <img v-if="!toogleBar" :src="getImgUrl('amara_logo_white')" height="36" width="180">
        <img v-if="toogleBar" :src="getImgUrl('amara_avatar')" height="40" width="40">
      </div>
    </v-list-item>

    <v-divider></v-divider>

    <!-- <v-list-item
      v-for="item in items"
      :key="item.title"
      link
    >
      <v-list-item-icon>
        <v-tooltip right v-if="toogleBar">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="white"
              v-bind="attrs"
              v-on="on"
            >{{ item.icon }}</v-icon>
          </template>
          <span>{{item.title}}</span>
        </v-tooltip>
        <v-icon color="white" v-else>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title style="color:white">{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item> -->
    <v-list-item link to="/?tab=overview" class="py-1">
      <v-list-item-icon class="ml-1">
        <!-- <v-icon color="white">{{ item.icon }}</v-icon> -->
        <v-tooltip right v-if="toogleBar" color="primary">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
            >
              <i class="las la-chart-line"
                style="font-size: 32px;color:#9f88f1"
              ></i>
            </span>
          </template>
          <span>Dashboard</span>
        </v-tooltip>
        <i v-else class="las la-chart-line" style="font-size: 32px;color:#9f88f1"></i>
      </v-list-item-icon>
      <v-list-item-content style="color:#9f88f1" class="pt-3">
        Dashboard
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/employees">
      <v-list-item-icon class="ml-1">
        <!-- <v-icon color="white">{{ item.icon }}</v-icon> -->
        <v-tooltip right v-if="toogleBar">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
            >
              <i class="las la-users"
                style="font-size: 32px;color:#9f88f1"
              ></i>
            </span>
          </template>
          <span>Employees</span>
        </v-tooltip>
        <i v-else class="las la-users" style="font-size: 32px;color:#9f88f1"></i>
      </v-list-item-icon>
      <v-list-item-content style="color:#9f88f1" class="pt-3">
        Employees
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/ad-hoc">
      <v-list-item-icon class="ml-1">
        <!-- <v-icon color="white">{{ item.icon }}</v-icon> -->
        <v-tooltip right v-if="toogleBar">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
            >
              <i class="las la-bezier-curve"
                style="font-size: 32px;color:#9f88f1"
              ></i>
            </span>
          </template>
          <span>Ad-Hoc</span>
        </v-tooltip>
        <i v-else class="las la-bezier-curve" style="font-size: 32px;color:#9f88f1!important"></i>
      </v-list-item-icon>
      <v-list-item-content style="color:#9f88f1" class="pt-3">
        Ad-Hoc
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/analytics">
      <v-list-item-icon class="ml-1">
        <div class="text-center">
          <v-menu open-on-hover offset-x v-if="toogleBar" style="top:200px;left:80px">
            <template v-slot:activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  v-on="on"
                >
                  <i class="las la-chart-bar"
                    style="font-size: 32px;color:#9f88f1"
                  ></i>
                </span>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <i v-else class="las la-chart-bar" style="font-size: 32px;color:#9f88f1;"></i>
          </div>
        <!-- <v-tooltip right v-if="toogleBar">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
            >
              <i class="las la-chart-bar"
                style="font-size: 32px;color:#fff"
              ></i>
            </span>
          </template>
          <span>Analytics</span>
        </v-tooltip> -->
      </v-list-item-icon>
      <v-list-item-content style="color:#bba2ff" class="pt-3">
        Analytics
      </v-list-item-content>
    </v-list-item>
    <div style="position: fixed;bottom: 15px;">
      <v-list-item link to="/settings">
        <v-list-item-icon class="ml-1">
          <!-- <v-icon color="white">{{ item.icon }}</v-icon> -->
          <v-tooltip right v-if="toogleBar">
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <i class="las la-cog"
                  style="font-size: 32px;color:#9f88f1"
                ></i>
              </span>
            </template>
            <span>Settings</span>
          </v-tooltip>
          <i v-else class="las la-cog" style="font-size: 32px;color:#9f88f1!important"></i>
        </v-list-item-icon>
        <v-list-item-content style="color:#9f88f1" class="pt-3">
          Settings
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon class="ml-0">
          <v-avatar size="30" class="profile-avatar">
            <v-img src="../../assets/male-avatar.png"></v-img>
          </v-avatar>
        </v-list-item-icon>
        <v-list-item-content style="color:#9f88f1;margin-left:-6px;" class="pt-3">
          {{user.display_name}}
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
  <!-- <ul class="nav-menu js-nav-built">
    <li class="ml-1">
      <a href="#" title="Application Intel" data-filter-tags="application intel" class=" waves-effect waves-themed" aria-expanded="false">
        <i class="las la-info-circle" style="color:#9f88f1"></i>
        <span class="nav-link-text" style="color:#9f88f1">Analytics</span>
        <b class="collapse-sign">
          <em class="las la-angle-down" style="color:#9f88f1"></em>
        </b>
      </a>
      <ul style="display: none !important;">
          <li>
              <a href="intel_analytics_dashboard.html" title="Analytics Dashboard" data-filter-tags="application intel analytics dashboard" class=" waves-effect waves-themed">
                  <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Analytics Dashboard</span>
              </a>
          </li>
          <li>
              <a href="intel_marketing_dashboard.html" title="Marketing Dashboard" data-filter-tags="application intel marketing dashboard" class=" waves-effect waves-themed">
                  <span class="nav-link-text" data-i18n="nav.application_intel_marketing_dashboard">Marketing Dashboard</span>
              </a>
          </li>
          <li>
              <a href="intel_introduction.html" title="Introduction" data-filter-tags="application intel introduction" class=" waves-effect waves-themed">
                  <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Introduction</span>
              </a>
          </li>
          <li>
              <a href="intel_privacy.html" title="Privacy" data-filter-tags="application intel privacy" class=" waves-effect waves-themed">
                  <span class="nav-link-text" data-i18n="nav.application_intel_privacy">Privacy</span>
              </a>
          </li>
      </ul>
    </li>
  </ul> -->
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'sidebar',

  props: {
    toogleBar: {
      required: true,
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      drawers: ['Default (no property)', 'Permanent', 'Temporary'],
      primaryDrawer: {
        model: true,
        type: 'default (no property)',
        clipped: false,
        floating: false,
        mini: false
      },
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'fas fa-chart-line' },
        { title: 'Employees', icon: 'fas fa-users' },
        { title: 'Ad-Hoc', icon: 'fas fa-bezier-curve' },
        { title: 'Analytics', icon: 'fas fa-chart-bar' }
      ],
      color: 'primary',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal'
      ],
      right: false,
      permanent: true,
      miniVariant: false,
      expandOnHover: false,
      background: false
    };
  },

  computed: {
    ...mapState({
      sidebarOpen: state => state.sidebarOpen,
      snackbar: state => state.snackbar,
      user: state => state.user,
      selectedRowData: state => state.selectedRowData,
      candidateUploadingStatus: state => state.candidateUploadingStatus
    })
  },

  methods: {
    getImgUrl (pet) {
      const images = require.context('@/assets/logo', false, /\.png$/);
      return images(`./${pet}.png`);
    }
  }
};
</script>

<style lang="scss" scoped>
.am-sidebar {
  // background: linear-gradient(90deg,#61245e,#42276f 90%);
  background-color: #4c3e9d;
  &.w-225 {
    width: 225px;
  }
  &.w-70 {
    width: 70px !important;
  }
  .nav-menu {
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      position: relative;
      a {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        outline: 0;
        // padding: .8125rem 2rem;
        padding: .8125rem 1rem;
        font-size: .875rem;
        color: #bdafd1;
        font-weight: 400;
        text-decoration: none;
        position: relative;
        transition: all .3s ease-out;
        &::hover {
            color: #fff;
            text-decoration: none;
            background-color: rgba(0,0,0,.1);
        }
      }
    }
    ul {
      padding-left: 0;
      list-style: none;
      display: none;
    }
    li > ul {
      background-color: rgba(0,0,0,.1);
      padding-top: 10px;
      padding-bottom: 10px;
      &::before {
        content: "";
        display: block;
        position: absolute;
        z-index: 1;
        left: 1.5625rem;
        top: 44px;
        bottom: 0;
        border-left: 1px solid #614b82;
      }
    }
    li a>[class*=la-] {
      // margin-right: .25rem;
      margin-right: 1.5rem;
      font-size: 1.125rem;
      width: 1.75rem;
      color: #876fab;
      text-align: left;
    }
    ul > li {
      a {
        color: #af9fc7;
        padding: .8125rem 2rem .8125rem 4.3rem;
        &:after {
          content: "";
          display: block;
          position: absolute;
          width: .4rem;
          height: .4rem;
          background-color: #876fab;
          left: 1.4rem;
          top: calc(50% - .3rem);
          border: 1px solid #333;
          border-radius: 50%;
          z-index: 1;
        }
      }
    }
    .nav-link-text {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      line-height: normal;
      font-size: .875rem;
      // color: #fff;
    }
    b.collapse-sign {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      color: #967bbd;
    }
    li:hover > ul {
      display: block!important;
      z-index: 1;
      // animation: animateFadeInLeft .5s;
      // -webkit-animation: animateFadeInLeft .5s;
      // -webkit-box-shadow: 0 0 40px 0 rgba(82,63,105,.15);
      box-shadow: 0 0 40px 0 rgba(82,63,105,.15);
    }
  }
  .v-list-item--active {
    .v-list-item__content {
      color: #fff !important;
    }
  }
}
</style>
