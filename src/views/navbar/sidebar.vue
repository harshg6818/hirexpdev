<template>
  <v-navigation-drawer
    v-model="primaryDrawer.model"
    :mini-variant="toogleBar"
    app
    overflow
    class="am-sidebar"
    :class="toogleBar ? 'w-70' : 'w-225'"
  >
  <!-- <v-list
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
    <v-list-item link to="/?tab=overview" class="py-1">
      <v-list-item-icon class="ml-1">
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
    </v-list-item> -->
        <!-- <ul class="nav-menu js-nav-built">
          <v-list>
            <v-list-item to="/analytics">
              <a class=" waves-effect waves-themed" @click="showAnalyticsSubMenu = !showAnalyticsSubMenu">
                <i class="las la-chart-bar" style="color:#9f88f1"></i>
                <span class="nav-link-text" style="color:#9f88f1">Analytics</span>
                <b class="collapse-sign">
                  <em class="las la-angle-down" style="color:#9f88f1" v-if="!showAnalyticsSubMenu"></em>
                  <em class="las la-angle-up" style="color:#9f88f1" v-if="showAnalyticsSubMenu"></em>
                </b>
              </a>
              <ul :class="showAnalyticsSubMenu && !toogleBar ? 'd-block' : 'd-none'">
                <li>
                  <a href="/analytics/life-cycle" class="waves-effect waves-themed">
                    <span class="nav-link-text">Employee Lifecycle</span>
                  </a>
                </li>
                <li>
                  <a href="/analytics/participation-rate" class="waves-effect waves-themed">
                    <span class="nav-link-text">Chat Participation</span>
                  </a>
                </li>
                <li>
                  <a href="/analytics/response-rate" class="waves-effect waves-themed">
                    <span class="nav-link-text">Employee Participation</span>
                  </a>
                </li>
                <li>
                  <a href="/analytics/diversity-report" class="waves-effect waves-themed">
                    <span class="nav-link-text">Gender diversity</span>
                  </a>
                </li>
              </ul>
            </v-list-item>
          </v-list>
      </ul>
  </v-list> -->
  <v-list
    nav
    avatar
    class="am-list-items"
  >
    <v-list-item-group>
      <v-list-item two-line :class="miniVariant && 'px-0'">
        <!-- <div> -->
          <img v-if="!toogleBar" :src="getImgUrl('amara_logo_white')" height="36" width="180">
          <img v-if="toogleBar" :src="getImgUrl('amara_avatar')" height="40" width="40">
        <!-- </div> -->
      </v-list-item>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        link
        :class="item.title === 'Analytics' && !toogleBar ? 'd-none' : ''"
      >
        <v-list-item-avatar>
          <v-tooltip right v-if="toogleBar" color="#4c3e9d">
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <!-- <v-icon v-text="item.icon" color="#9f88f1"></v-icon> -->
                <i :class="item.icon" style="color:#9f88f1"></i>
              </span>
            </template>
            <span style="color: #fff">{{item.title}}</span>
          </v-tooltip>
          <!-- <i v-else class="las la-bezier-curve" style="font-size: 32px;color:#9f88f1!important"></i> -->
          <v-icon v-else v-text="item.icon" color="#9f88f1"></v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
    <div style="position: fixed;bottom: 15px;">
      <v-list-item link to="/settings">
        <v-list-item-icon class="ml-1">
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
  <v-list
    v-if="!toogleBar"
    nav
    avatar
    class="am-list-items"
  >
    <v-list-group
      v-for="item in items1"
      :key="item.title"
      v-model="item.active"
      :prepend-icon="item.action"
      no-action
      class="am-list-group"
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item
        v-for="subItem in item.items"
        :key="subItem.title"
        :to="subItem.to"
      >
        <v-list-item-content>
          <v-list-item-title v-text="subItem.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
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
      showAnalyticsSubMenu: false,
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
        { title: 'Dashboard', icon: 'las la-home', to: '/?tab=overview' },
        { title: 'Employees', icon: 'las la-user-friends', to: '/employees' },
        { title: 'Ad-Hoc', icon: 'las la-bezier-curve', to: '/ad-hoc' },
        { title: 'Analytics', icon: 'las la-chart-bar', to: '/analytics' }
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
      background: false,
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      items1: [
        {
          action: 'fas fa-chart-bar',
          title: 'Analytics',
          active: false,
          items: [
            { title: 'Employee lifecycle', to: '/analytics/life-cycle' },
            { title: 'Employee participation', to: '/analytics/response-rate' },
            { title: 'Chat participation', to: '/analytics/participation-rate' },
            { title: 'Gender diversity', to: '/analytics/diversity-report' }
          ]
        }
      ]
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
  // background: linear-gradient(120deg,#42276f, #61245e 90%);
  // background-color: #4c3e9d;
  background: rgb(52,43,126);
  background: linear-gradient(150deg, rgba(52,43,126,1) 0%, rgba(84,72,189,1) 70%, rgba(143,72,189,1) 100%, rgba(197,36,55,1) 100%);
  &.w-225 {
    width: 225px;
  }
  &.w-70 {
    width: 70px !important;
  }
  .am-list-items {
    .v-list-item__title {
      color: #9f88f1 !important;
    }
    .v-list-item--active {
      i {
        color: #ffffff !important;
        // color: #d8bdff !important;
        caret-color: #ffffff !important;
        // caret-color: #d8bdff !important;
      }
      .v-list-item__title {
        color: #ffffff !important;
      }
    }
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
        // padding: .8125rem 1rem;
        padding: 0.8125rem 1rem 0.8125rem 0.5rem;
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
      // background-color: rgba(0,0,0,.1);
      padding-top: 10px;
      padding-bottom: 10px;
      &::before {
        content: "";
        display: block;
        position: absolute;
        z-index: 1;
        // left: 1.5625rem;
        left: 1.2rem;
        // top: 44px;
        top: 50px;
        bottom: 0;
        border-left: 1px solid #9f88f1;
      }
    }
    li a>[class*=la-] {
      // margin-right: .25rem;
      margin-right: 1.5rem;
      font-size: 1.125rem;
      width: 1.75rem;
      color: #9f88f1;
      text-align: left;
    }
    ul > li {
      a {
        color: #9f88f1;
        // padding: .8125rem 2rem .8125rem 4.3rem;
        padding: .8125rem 2rem .8125rem 3.7rem;
        &:after {
          content: "";
          display: block;
          position: absolute;
          width: .4rem;
          height: .4rem;
          background-color: #9f88f1;
          // left: 1.4rem;
          left: 1rem;
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
      // font-size: .875rem;
      font-size: 16px;
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
      margin-left: 4.5rem;
    }
    li:hover > ul {
      // display: block!important;
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

<style lang="scss">
.am-list-group {
  position: relative;
  .v-list-group__header {
    padding-left: 18px !important;
    .v-list-item__icon {
      i {
        color: #9f88f1;
      }
      &::first-child {
        margin-right: 20px !important;
      }
    }
    .v-list-group__header__prepend-icon {
      margin-right: 20px !important;
    }
    &.v-list-item--active {
      .v-list-item__icon {
        i {
          color: #ffffff;
        }
      }
    }
    .v-list-group__items > .v-list-item {
      padding-left: 54px !important;
    }
  }
  .v-list-group__items {
    .v-list-item {
      padding-left: 54px !important;
    }
    // background: red;
    &::before {
      content: "";
      display: block;
      position: absolute;
      z-index: 1;
      // left: 1.5625rem;
      left: 1.2rem;
      // top: 44px;
      top: 50px;
      bottom: 0;
      border-left: 1px solid #9f88f1;
    }
    a {
      &::after {
        min-height: unset;
        content: "";
        display: block;
        position: absolute;
        width: .4rem;
        height: .4rem;
        background-color: #9f88f1;
        left: 1rem;
        top: calc(50% - .3rem);
        border: 1px solid #333;
        border-radius: 50%;
        z-index: 1;
      }
    }
  }
}
</style>
