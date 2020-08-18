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
    nav
    avatar
    class="am-list-items"
  >
    <v-list-item-group>
      <v-list-item two-line :class="miniVariant && 'px-0'">
        <img v-if="!toogleBar" :src="getImgUrl('amara_logo_white')" height="36" width="180">
        <img v-if="toogleBar" :src="getImgUrl('amara_avatar')" height="40" width="40">
      </v-list-item>
      <v-list-item to="/?tab=overview" link>
        <v-list-item-avatar>
          <v-menu open-on-hover offset-x right v-if="toogleBar" content-class="dashboard-tooltip">
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <i class="las la-home" style="color:#9f88f1"></i>
              </span>
            </template>
            <div class="tooltip-box">
              <div class="tooltip">
                <span class="tooltip-text">Dashboard</span>
              </div>
            </div>
          </v-menu>
          <v-icon v-else color="#9f88f1">las la-home</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/employees" link>
        <v-list-item-avatar>
          <v-menu open-on-hover offset-x right v-if="toogleBar" content-class="employees-tooltip">
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <i class="las la-user-friends" style="color:#9f88f1"></i>
              </span>
            </template>
            <div class="tooltip-box">
              <div class="tooltip">
                <span class="tooltip-text">Employees</span>
              </div>
            </div>
          </v-menu>
          <v-icon v-else color="#9f88f1">las la-user-friends</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Employees</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/ad-hoc" link>
        <v-list-item-avatar>
          <v-menu open-on-hover offset-x right v-if="toogleBar" content-class="adhoc-tooltip">
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <i class="las la-bezier-curve" style="color:#9f88f1"></i>
              </span>
            </template>
            <div class="tooltip-box">
              <div class="tooltip">
                <span class="tooltip-text">Ad-Hoc</span>
              </div>
            </div>
          </v-menu>
          <v-icon v-else color="#9f88f1">las la-bezier-curve</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Ad-Hoc</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/analytics" link>
        <v-list-item-avatar>
          <v-menu open-on-hover offset-x right v-if="toogleBar" content-class="analytics-tooltip">
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <i class="las la-chart-bar" style="color:#9f88f1"></i>
              </span>
            </template>
            <div class="tooltip-box">
              <div class="tooltip">
                <span class="tooltip-text">Analytics</span>
              </div>
            </div>
          </v-menu>
          <v-icon v-else color="#9f88f1">las la-chart-bar</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Analytics</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item to="/analytics" link>
        <v-list-item-avatar @mouseover="showSubMenu = true;" @mouseleave="closeSubMenu()">
          <v-menu offset-x right v-if="toogleBar" content-class="analytics-tooltip" v-model="showSubMenu">
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <i class="las la-chart-bar" style="color:#9f88f1"></i>
              </span>
            </template>
            <div class="tooltip-box">
              <div class="tooltip">
                <span class="tooltip-text">Analytics</span>
              </div>
              <div class="sub-menu">
                <ul>
                  <li>report1</li>
                  <li>report1</li>
                  <li>report1</li>
                </ul>
              </div>
            </div>
          </v-menu>
          <v-icon v-else color="#9f88f1">las la-chart-bar</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Analytics</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
    </v-list-item-group>
    <div style="position: fixed;bottom: 15px;">
      <v-list-item to="/settings" link>
        <v-list-item-avatar>
          <v-menu open-on-hover offset-x right v-if="toogleBar" content-class="settings-tooltip">
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <i class="las la-cog" style="color:#9f88f1"></i>
              </span>
            </template>
            <div class="tooltip-box">
              <div class="tooltip">
                <span class="tooltip-text">Settings</span>
              </div>
            </div>
          </v-menu>
          <v-icon v-else color="#9f88f1">las la-cog</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-avatar>
          <v-menu open-on-hover offset-x right v-if="toogleBar" content-class="profile-tooltip">
            <template v-slot:activator="{ on, attrs }">
              <!-- <span>
                <i class="las la-cog" style="color:#9f88f1"></i>
              </span> -->
              <v-avatar size="30" class="profile-avatar" v-bind="attrs" v-on="on">
                <v-img src="../../assets/male-avatar.png"></v-img>
              </v-avatar>
            </template>
            <div class="tooltip-box">
              <div class="tooltip">
                <span class="tooltip-text">Your profile</span>
              </div>
            </div>
          </v-menu>
          <v-avatar size="30" class="profile-avatar" v-else>
            <v-img src="../../assets/male-avatar.png"></v-img>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{user.display_name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item link>
        <v-list-item-icon class="ml-0">
          <v-avatar size="30" class="profile-avatar">
            <v-img src="../../assets/male-avatar.png"></v-img>
          </v-avatar>
        </v-list-item-icon>
        <v-list-item-content style="color:#9f88f1;margin-left:-6px;" class="pt-3">
          {{user.display_name}}
        </v-list-item-content>
      </v-list-item> -->
    </div>
  </v-list>
  <!-- <v-list
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
  </v-list> -->
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
      showSubMenu: false,
      primaryDrawer: {
        model: true,
        type: 'default (no property)',
        clipped: false,
        floating: false,
        mini: false
      },
      // items: [
      //   { title: 'Dashboard', icon: 'las la-home', to: '/?tab=overview' },
      //   { title: 'Employees', icon: 'las la-user-friends', to: '/employees' },
      //   { title: 'Ad-Hoc', icon: 'las la-bezier-curve', to: '/ad-hoc' },
      //   { title: 'Analytics', icon: 'las la-chart-bar', to: '/analytics' }
      // ],
      miniVariant: false,
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
    },
    closeSubMenu () {
      setTimeout(() => {
        this.showSubMenu = false;
      }, 3000);
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
.tooltip {
  width: 200px;
  background: #4c3e9d;
  color: #ffffff;
  text-align: left;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  top: 50%;
  left: calc(100% + 11px);
  transform: translate(8%, 0%);
  font-weight: 500;
  .tooltip-text {
    &::after {
      content: "";
      position: absolute;
      top: 30%;
      left: -16px;
      margin-left: 0;
      border-width: 8px;
      transform: rotate(90deg);
      border-style: solid;
      border-color: #4c3e9d transparent transparent transparent;
    }
  }
}
.tooltip-box {
  position: relative
}
.dashboard-tooltip {
  box-shadow: none !important;
  top: 84px !important;
  left: 68px !important;
}
.employees-tooltip {
  box-shadow: none !important;
  top: 148px !important;
  left: 68px !important;
}
.adhoc-tooltip {
  box-shadow: none !important;
  top: 214px !important;
  left: 68px !important;
}
.profile-tooltip {
  box-shadow: none !important;
  // top: 214px !important;
  left: 68px !important;
}
.settings-tooltip {
  box-shadow: none !important;
  // top: 214px !important;
  left: 68px !important;
}
.analytics-tooltip {
  .tooltip {
    border-radius: 10px 10px 0 0;
  }
  box-shadow: none !important;
  top: 280px !important;
  left: 68px !important;
  .sub-menu {
    background: #4c3e9d;
    width: 184px;
    margin-left: 16px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    ul {
      list-style: none;
      padding-bottom: 8px;
      padding-left: 0px !important;
      li {
        padding: 4px 0;
        padding-left: 24px !important;
        color: #9f88f1;
        &:hover {
          background: rgba(0,0,0,0.1);
          color: #ffffff;
          transition: 0.25s ease all;
        }
      }
    }
  }
}
</style>
