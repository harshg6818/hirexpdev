<template>
  <v-app>
    <!-- <navbar
      @toggleSideBar="toggleSideBar"
      @searchEmployees="searchEmployees = true;"
    ></navbar> -->
    <v-app-bar
      :clipped-left="false"
      app
      color="white"
      class="am-app-bar"
      :class="toggleSideBarState ? 'l-70': ''"
    >
      <v-app-bar-nav-icon
        @click.stop="toggleSideBarState = !toggleSideBarState"
      ></v-app-bar-nav-icon>
      <!-- <v-toolbar-title>Vuetify</v-toolbar-title> -->
      <search></search>
      <v-spacer></v-spacer>
      <div class="text-right d-flex">
        <div>
          <!-- <v-divider></v-divider>
            <div class="menu-title">
              Account
            </div>
            <v-divider></v-divider> -->
          <v-menu offset-y left bottom rounded="0">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon
                v-bind="attrs"
                v-on="on"
              >
                <i class="las la-question"></i>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="goToSettings('/support-center')">
                <v-list-item-title>
                  Create support ticket
                </v-list-item-title>
              </v-list-item>
              <v-list-item target="_blank" href="https://support.amara.ai/">
                <v-list-item-title>
                  knowledge base
                </v-list-item-title>
              </v-list-item>
              <v-list-item target="_blank" href="https://support.amara.ai/">
                <v-list-item-title>
                  Documentation
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div>
          <v-btn icon
            class="amara-nav-btn announcekit-widget bell-icon px-2" style="position:relative;"
          >
            <div style="position:absolute;top:20px; left:25px;" class="announcekit-widget"></div>
            <i class="lar la-bell"></i>
            <!-- <v-icon>fas fa-bell</v-icon> -->
          </v-btn>
        </div>
      </div>
      <div class="divider" style="border-left: 1px solid rgba(0,0,0,0.2);width: 15px;height: 100%;">&nbsp;</div>
      <div class="me-profile">
        <v-menu offset-y max-width="310" rounded="0">
          <template v-slot:activator="{ on, attrs }">
            <v-row>
              <v-col cols="2"
                v-bind="attrs"
                v-on="on"
              >
                <div class="d-flex mt-2">
                  <v-avatar size="32" class="profile-avatar">
                    <v-img :src="getImgUrl('male-avatar')"></v-img>
                  </v-avatar>
                  <v-icon
                  >fas fa-caret-down</v-icon>
                  <!-- <i class="las la-caret-down"></i> -->
                </div>
              </v-col>
              <v-col class="text-left" cols="10">
                <div>{{user.display_name}}</div>
                <div>{{user.email}}</div>
              </v-col>
            </v-row>
          </template>
          <v-card>
            <v-list class="profile-section">
              <v-list-item>
                <v-list-item-avatar>
                  <img :src="getImgUrl('male-avatar')">
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{user.display_name}}</v-list-item-title>
                  <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                      color="white"
                      small
                      outlined
                      @click="goToSettings('/settings?tab=profile')"
                    >View Profile
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <!-- <v-divider></v-divider>
            <div class="menu-title">
              Account
            </div>
            <v-divider></v-divider>
            <v-list class="menu-account">
              <v-list-item @click="goToSettings('/support-center')">
                <v-list-item-title>
                  Create support ticket
                </v-list-item-title>
              </v-list-item>
              <v-list-item target="_blank" href="https://support.amara.ai/">
                <v-list-item-title>
                  knowledge base
                </v-list-item-title>
              </v-list-item>
            </v-list> -->
            <v-divider></v-divider>
            <div class="menu-title">
              Manage
            </div>
            <v-divider></v-divider>
            <v-list class="menu-manage">
              <v-list-item @click="goToSettings('/settings?tab=company')">
                <v-list-item-title>
                  Company settings
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="goToSettings('/settings?tab=integrations')">
                <v-list-item-title>
                  Integrations
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="goToSettings('/settings?tab=milestones')">
                <v-list-item-title>
                  Critical Touchpoints
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="goToSettings('/settings?tab=users')">
                <v-list-item-title>
                  Manage Users
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="goToSettings('/settings?tab=alertWord')">
                <v-list-item-title>
                  Alert Words
                </v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <div class="menu-title">
              <a href="https://www.canxp.com/b/#/" target="_blank" style="text-decoration:none;">
                Amara voice studio(beta)
              </a>
            </div>
            <v-divider></v-divider>
            <div class="cursor-pointer">
              <div class="menu-logout" @click="logout()">Logout</div>
            </div>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <sidebar
      :toogle-bar="toggleSideBarState"
    ></sidebar>
    <v-main class="am-main" :class="toggleSideBarState ? 'pl-70': ''">
      <v-container
        fluid
        :class="searchEmployees ? 'freeze-main' : ''"
        class="pa-0"
      >
        <v-snackbar
          :timeout="6000"
          :color="snackbar.color"
          :multi-line="snackbar.mode === 'multi-line'"
          :vertical="snackbar.mode === 'vertical'"
          v-model="snackbar.show"
        >
          {{ snackbar.text }}
          <v-btn text @click.native="snackbar.show = false">Close</v-btn>
        </v-snackbar>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
// import Navbar from './navbar/Navbar';
import Sidebar from './navbar/sidebar';
import Search from './navbar/Search-old';
// import Sidebar from './sidebar/Sidebar';
// import SearchEmployees from './navbar/search-employees';

export default {
  name: 'shell',
  components: {
    // Navbar,
    Search,
    Sidebar
    // SearchEmployees
  },
  data () {
    return {
      searchString: '',
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
      searchEmployees: false,
      toggleSideBarState: true
      // primaryDrawer: {
      //   model: null,
      //   type: 'default (no property)',
      //   clipped: false,
      //   floating: false,
      //   mini: false
      // },
      // footer: {
      //   inset: false
      // },
      // drawers: ['Default (no property)', 'Permanent', 'Temporary']
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
      const images = require.context('@/assets', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    toggleSideBar (val) {
      this.toggleSideBarState = val;
    },
    getAllSettings () {
      this.$http.get(`${process.env.VUE_APP_BASE_API_URL}manage-company/company_console_settings/${this.user.company}`).then((response) => {
        if (response && response.data) {
          this.user.company_console_settings = response.data;
          this.$store.dispatch('createSession', this.user);
        }
      }, (response) => {
        throw new Error(response);
      });
    },
    loadAnnounceKitSnippet () {
      /* eslint-disable */
      window.announcekit = (window.announcekit || { queue: [], on: function(n, x) { window.announcekit.queue.push([n, x]); }, push: function(x) { window.announcekit.queue.push(x); } });
      this.bootAnnounceKit();
    },
    globalSearchEmployee () {
      if (this.searchString && this.searchString.length > 2) {
        const queryParams = {
          fields: 'display_name,email,id',
          raw_search_string: this.searchString
        };
        axios.get(`${process.env.VUE_APP_API_URL}users/list`, {
          params: queryParams
        }).then((response) => {
          if (response && response.data) {
            this.showSearchMenu = true;
            this.items = response.data.data;
          }
        });
      } else {
        this.showSearchMenu = true;
        this.items = [];
      }
    },
    bootAnnounceKit() {
      /* eslint-disable */
      announcekit.push({
          // The widget URL, this is provided by our widget code and should not be changed
          widget: "https://announcekit.app/widget/5HTWw",
          // Target element selector for the widget interactive part.
          // For badge based widgets this is where the badge is placed.
          // For line and embed based widgets this is where the widget content gets injected.
          // Not needed when you want to control the widget yourself
          selector: ".announcekit-widget",
          // Optional: If you wish to access the widget object yourself, you can provide a name for the widget
          name: "announcekit",
          // Optional: In case of a project with multiple languages, choose the language automatically
          // See the following section for further details
          lang: "auto",
          // Optional: User and Segment data
          data: {
            user_id: this.user.user_profile.user_id,
            user_name: this.user.user_profile.display_name, // Full name
            user_email: this.user.user_profile.email, // Email address
            Phone: this.user.user_profile.phoneNumber,
            // 'Last seen': this.$moment(this.user.last_login).format('MMMM Do YYYY, h:mm:ss a'),
            User_department: this.user.user_profiledepartment_name,
            user_company: this.user.company_name, // Email address
            // created_at: (this.user.user_preferences && this.user.user_preferences.user && this.user.user_preferences.user.date_joined) ? this.$moment(this.user.user_preferences.user.date_joined).format('X') : '', // Signup date as a Unix timestamp date_joined
          }
        })
    }
  },
  beforeMount() {
    // this.getAllSettings();
  },
  mounted() {
    this.loadAnnounceKitSnippet();
  },
  beforeDestroy() {},
};

</script>

<style lang="css">
.audience-icon[class^="flaticon-"]:before, .audience-icon[class*=" flaticon-"]:before, .audience-icon[class^="flaticon-"]:after, .audience-icon[class*=" flaticon-"]:after {
  font-size: 70px!important;
}
</style>

<style lang="scss" scoped>
// .me-profile {
  .menu-title {
    padding: 8px 12px;
    text-transform: uppercase;
    border-top: 1px solid rgba(0,0,0,.15);
    border-bottom: 1px solid rgba(0,0,0,.15);
    background: #f3f6f8;
  }
  .menu-account {
    a {
      color: #000 !important;
    }
  }
  .menu-manage {
    a {
      color: #000 !important;
    }
  }
  .menu-logout {
    padding: 12px 20px;
    text-transform: uppercase;
    border-top: 1px solid rgba(0,0,0,.15);
    border-bottom: 1px solid rgba(0,0,0,.15);
    &:hover {
      background: #f3f6f8;
    }
  }
  .username {
    padding: 0 14px;
    font-size: 16px;
  }
  .profile-section {
    // background: linear-gradient(90deg,#61245e,#42276f 90%);
    background: #4c3e9d;
    border-radius: 0 !important;
    .v-list-item__content {
      .v-list-item__title, .v-list-item__subtitle {
        color: #ffffff;
      }
    }
  }
// }
</style>

<style lang="scss">
.am-main {
  &.pl-70 {
    padding-left: 70px !important;
  }
}
.am-app-bar {
  &.l-70 {
    left: 70px !important;
  }
}
.las, .lar {
  font-size:24px !important;
}
// @import url('https://fonts.googleapis.com/css?family=Work+Sans:100,300,400,500,700,900&display=swap');
.anychart-credits-text {
  display:none!important;
}
.anychart-credits-logo {
  display:none!important;
}
.v-tabs__wrapper .v-tabs__container .v-tabs__slider-wrapper .v-tabs__slider {
  width:100% !important;
}
.custom-row {
  width:calc(100% - 3.8rem)!important;
}
.adhoc-app {
  // font-family: 'Work Sans', sans-serif !important;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  // font-size: 13px;
  .headline {
    // font-family: 'Work Sans', sans-serif !important;
    // -webkit-font-smoothing: antialiased;
    // -moz-osx-font-smoothing: grayscale;
    // color: #2c3e50;
  }

  .stepper-step-title {
    &.create-campaign {
      .v-tabs__wrapper {
        .v-tabs__container {
          .v-tabs__slider-wrapper {
              padding: 0 42px 0 10px;
          }
        }
      }
      &.last-step {
        .v-tabs__wrapper {
          .v-tabs__container {
            .v-tabs__slider-wrapper {
                padding: 0 30px 0 10px!important;
            }
          }
        }
      }
    }
  }
}
.milestone-datatable {
  .v-table__overflow {
    overflow-x: auto!important;
    overflow-y: hidden!important;
  }
  .v-datatable {
    &.v-table {
      // display: block!important;
      // thead, tbody {
      //   display: block!important;
      // }
      // tr {
      //   display: block!important;
      // }
    }
  }
  .theme--light {
    &.v-table {
      background-color:unset!important;
    }
  }
  thead {
    tr {
      background:#fff!important;
      // th {
      //   display: initial!important;
      // }
    }
  }
  tbody {
    tr {
      background:#fff!important;
      // td {
      //   display: initial!important;
      // }
    }
  }
}
.active-response {
  &:hover {
    background-color: lightgrey !important;
  }
  .v-input--selection-controls {
    margin-top:0px!important;
    margin-right :5px!important;
    padding-top:0px!important;
  }
  .v-input__slot {
    margin-bottom: 0px!important;
  }
}
.custom-mood-tabs {
  .v-tabs__container--centered {
    height: 100px;
  }
  .v-tabs__slider {
    &.accent {
      background-color: #fff!important;
      border-color: #fff!important;
    }
  }
}
.v-btn {
  &.adhoc {
    background-color:#4c3e9d!important;
  }
}
.adhoc--text {
  color: #4c3e9d!important;
  .adhoc {
    background-color: #4c3e9d!important;
    color: #fff!important;
  }
}
.adhoc-campaign-objectives {
  min-height:300px;
  height:300px;
  overflow-y:auto;
  position:relative;
  top:-5px;
  .v-textarea {
    max-height: 250px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 250px;
    &.v-text-field--box {
      &.v-text-field--single-line {
        &.v-text-field--outline {
          .v-input__control {
            height:100%!important;
            .v-input__slot {
              height: 100%!important;
            }
          }
        }
      }
    }
    &.v-text-field--enclosed {
      &.v-text-field--single-line {
        &.v-text-field--outline {
          .v-input__control {
            height:100%!important;
            .v-input__slot {
              height: 100%!important;
            }
          }
        }
      }
    }
  }
}
.template-custom-datefield {
  &.v-text-field--single-line {
    height: 32px!important;
    padding-top: 0px!important;
    .v-input__control {
      height: 32px!important;
      .v-input__slot {
        height: 32px!important;
        min-height:32px !important;
        .v-text-field__slot {
          height: 32px!important;
          input {
            margin: 0px!important;
          }
        }
      }
    }
  }
}
.adhoc-dashboard {
  .v-input__slot {
    box-shadow:none !important;
    background: none !important;
  }
  .v-pagination__navigation {
    background:none !important;
    box-shadow: none !important;
    .v-icon {
      font-size: 1rem !important;
    }
  }
}
.custom-tabs {
  width: 100%!important;
  &.v-tabs {
    .v-tabs__bar {
      .v-tabs__wrapper {
        .v-tabs__container {
          height:100px!important;
        }
      }
    }
    .v-tabs__container {
      background-color: #f3f6fa !important;
      &.v-tabs__container--centered {
        // padding: 0 10% !important;
        // height:200px!important;
        .v-tabs__slider-wrapper {
          // margin-left: 5%!important;
          display: none!important;
          .v-tabs__slider {
            &.accent {
              background-color: #fff !important;
              border-color: 2px solid #fff !important;
            }
          }
        }
        .v-tabs__div {
          margin-left: 5px!important;
          text-transform: capitalize!important;
          &.reports-tab {
            // height: 150px!important;
            width: 19.5%!important;
            &#tab0 {
              margin-left: 0!important;
            }
            // display:inline!important;
            // margin-right:7% !important;
            .v-tabs__item {
              opacity: 0.9 !important;
              background: #fff !important;
              border: 1px solid #f1f1f1 !important;
              border-radius: 5px!important;
              // height: 120px!important;
              // display: inline!important;
              &.v-tabs__item--active {
                border: 2px solid #4c3e9d!important;
                // background-color: #4c3e9d!important;
                .tab-content {
                  position: relative!important;
                  left: -10px!important;
                  // .v-icon {
                  //   color: #fff!important;
                  // }
                }
                // &:before {
                //   content: '';
                //   width: 5px !important;
                //   margin: auto !important;
                //   top:65% !important;
                //   left: 45% !important;
                //   position: relative !important;
                //   border-top: 10px solid #4c3e9d!important;
                //   border-right: 10px solid transparent!important;
                //   border-left: 10px solid transparent!important;
                //   border-bottom: 10px solid transparent!important;
                // }
              }
            }
            &.reports-tab-draft {
              .v-tabs__item {
                // border: 2px solid grey!important;
                &.v-tabs__item--active {
                  // box-shadow:2px 2px 1px 2px rgba(0,0,0,0.2), 2px 2px 2px 2px rgba(0,0,0,0.2), 2px 2px 2px 2px rgba(0,0,0,0.2) !important;
                  border: 2px solid grey!important;
                  // &:before {
                  //   border-top: 10px solid grey!important;
                  // }
                }
              }
            }
            &.reports-tab-active {
              .v-tabs__item {
                // border: 2px solid #4caf50!important;
                &.v-tabs__item--active {
                  // box-shadow:2px 2px 1px 2px rgba(0,0,0,0.2), 2px 2px 2px 2px rgba(0,0,0,0.2), 2px 2px 2px 2px rgba(0,0,0,0.2) !important;
                  border: 2px solid #432d6f!important;
                  // &:before {
                  //   border-top: 10px solid #4caf50!important;
                  // }
                }
              }
            }
            &.reports-tab-completed {
              .v-tabs__item {
                // border: 2px solid #4caf50!important;
                &.v-tabs__item--active {
                  // box-shadow:2px 2px 1px 2px rgba(0,0,0,0.2), 2px 2px 2px 2px rgba(0,0,0,0.2), 2px 2px 2px 2px rgba(0,0,0,0.2) !important;
                  border: 2px solid #512b66!important;
                  // &:before {
                  //   border-top: 10px solid #4caf50!important;
                  // }
                }
              }
            }
            &.reports-tab-archived {
              .v-tabs__item {
                // border: 2px solid red!important;
                &.v-tabs__item--active {
                  // box-shadow:2px 2px 1px 2px rgba(0,0,0,0.2), 2px 2px 2px 2px rgba(0,0,0,0.2), 2px 2px 2px 2px rgba(0,0,0,0.2) !important;
                  border: 2px solid #8a3984!important;
                  // &:before {
                  //   border-top: 10px solid red!important;
                  // }
                }
              }
            }
            // &.stages-tab {
            //   &:first-child {
            //     margin-left: 0!important;
            //   }
            // }
          }
        }
      }
    }
  }
}
.dashboard_search_bar {
  &.v-text-field {
    .v-input__control {
      .v-input__slot {
        &:before {
          border:none!important;
        }
        input {
          &:focus {
            border-bottom: none!important;
          }
          caret-color: black!important;
        }
      }
    }
  }
  &.v-input--is-focused {
    color:#fff!important;
    caret-color:#fff!important;
  }
}
.campaign-row {
  border: thin solid #fff !important;
  &:hover {
    box-shadow: 0px 2px 5px rgba(0,0,0,0.15) !important;
    border: thin solid #bdbdbd !important;
    transition: all 0.3s !important;
  }
}
.vc-chrome {
    position: relative;
    top: 35px;
    right: 0;
    z-index: 9;
}
.current-color {
    display: inline-block;
  position: relative;
  top: 6px;
  width:22px;
  height: 22px;
    background-color: #000;
    cursor: pointer;
}
.color-picker-container {
  border: 1px solid;
  border-radius: 5px;
  padding: 2px 0;
}
.adhoc-color-picker {
  padding-left: 5%;
  padding-right: 5%;
  .color-picker-input {
    border:1px solid;
    border-radius: 5px;
  }
}
.audience-icon {
  height: 90px;
  width: 90px;
  &.flaticon {
    :before {
      font-size: 70px!important;
    }
  }
  &.v-icon {
    font-size: 70px!important;
    :before {
      font-size: 70px!important;
    }
    &.flaticon {
      :before {
        font-size: 70px!important;
      }
    }
  }
}



.layout {
  &.row {
    &.wrap {
      width: 100%!important;
    }
  }
}
.v-tabs__container {
  .v-tabs__div {
    &.stepper-step {
      .v-tabs__item {
        &a {
          &:link {
            color: unset!important;
            text-decoration: underline!important;
          }
        }
      }
    }
  }
}


.dashboard-tabs {
  .v-tabs__bar {
    background-color: #fff !important;
  }
}

.custom-dashboard-tabs {
  .v-tabs__bar {
    // background-color: #e2ebf8 !important;
    // opacity: 1 !important;
  }
  .dashboard-tabs {
    .v-tabs__bar {
      background-color: #fff !important;
    }
  }
  .v-tabs__slider {
      height: 4px;
      // background-color: #4c3e9d !important;
      background-color: var(--v-primary-base) !important;
    }
  .sentimentTabBar{
    .v-tabs__item {
    color:rgb(32, 32, 32) !important;
    opacity: 1;
  }
  }
  // .v-tabs__item:not(.v-tabs__item--active) {
  // }
  .v-tabs__item {
    font-weight: 600;
    // color:#fff !important;
    // opacity: 1;
  }
  .v-tabs__item--active {
    color: #4c3e9d !important;
  }
  .v-tabs__container {
    display:block!important;
    // background-color: aliceblue!important;
    .v-tabs__div {
      max-width: unset!important;
    }
  }
  &.bg-white {
    .v-tabs__container {
      background-color: #fff!important;
    }
  }
}
.background-custom-grey {
  background-color: #f3f6fa !important;
}
.stepper-step-title {
  a {
    color: unset!important;
    text-decoration: unset!important;
  }
}

.bg-red {
  background-color: #f44336;
}
.bg-amber {
  background-color: #ff9800;
}

.status-chip {
  border-radius: 18px 0 0 18px!important;
  height: 32px!important;
  width: 100px!important;
}
.dropdown-chip {
  border-radius:0 50% 50% 0!important;
}
.disengaged-employees-cards {
  // width: 24%!important;
  // margin-bottom: 10px;
  padding: 0 4px;
  margin-bottom: 8px;
  .v-card {
    height: 250px!important;
  }
  &.donut-charts {
    .v-card {
      height: 100%!important;
    }
  }
  // background-color: #fff;
  // border-radius: 4px;
  // border: 1px solid #f1f1f1!important;
  &.donut-charts {
    height: 100%!important;
    display: inline-block;
    width: 33%!important;
    margin: 0px!important;
  }
}

.anonymous-report-cards {
  .anonymous-chat {
    height: 600px!important;
  }
}

.anonymous-employees-cards {
  width: 19.5%!important;
  margin: 0 auto!important;
  .v-card {
    height: 150px!important;
  }
  &.donut-charts {
    height: 350px!important;
    width: 32.5%!important;
  }
  &.engagement-score {
    text-align: center!important;
    .score-card {
      // color:white!important;
      &.heading {
        font-size: 80px!important;
        position: relative!important;
        // top: -13%!important;
        left: 0%!important;
        font-weight:300!important;
        margin: 0 auto!important;
        // text-shadow:8px 4px rgb(243, 241, 241)!important;
      }
    }
  }
}


.overview-cards {
  width: 19.6%!important;
  margin: 0 auto !important;
  height: 260px!important;
  background-color: #fff;
  border-radius: 4px;
  position: relative;
  border: 1px solid #f1f1f1!important;
  .card-footer {
    text-align: center;
    border-top: 1px solid #f1f1f1;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
  }
  &.milestone-dashboard {
    width: 24%!important;
  }
  &.heatmap-card {
    height: 500px!important;
  }
  &.employee-profile {
    height: 500px!important;
  }
  &.key-drivers {
    height: 280px!important;
  }
  .score-card {
    // color: #000!important;
    &.heading {
      font-size: 120px!important;
      position: relative!important;
      // top: -13%!important;
      bottom: 40px;
      left: 3%!important;
      &.score-card-img {
        position: unset!important;
        margin: auto!important;
        height: 150px!important;
        width: 150px!important;
        // margin-top: 10%!important;
      }
    }
    &.subheading {
      font-size: 50px!important;
      // position: relative!important;
      // top: -72%!important;
      // left: 70%!important;
    }
  }
  &.employee-vibe {
    .score-card {
      &.score-card-img {
        position: unset!important;
        margin: auto!important;
        height: 110px!important;
        width: 110px!important;
        // margin-top: 10%!important;
      }
    }
  }
  &.engagement-score {
    .score-card {
      // color:white!important;
      &.heading {
        font-size: 120px!important;
        position: relative!important;
        // top: -13%!important;
        left: 0%!important;
      }
      &.subheading {
        font-size: 50px!important;
        // position: relative!important;
        // top: -72%!important;
        // left: 70%!important;
      }
    }
    &.open-ended {
      .score-card {
        // color:white!important;
        &.heading {
          max-width: 100%!important;
        }
      }
    }
  }
}

@media (max-width:1550px) {
  .overview-cards {
    &.engagement-score {
      .score-card {
        &.subheading {
          position: relative!important;
          left: 5%!important;
        }
      }
    }
  }
}

@media (max-width:1350px) {
  .overview-cards {
    &.engagement-score {
      .score-card {
        &.subheading {
          position: relative!important;
          // left: 14%!important;
        }
      }
    }
  }
}

@media (max-width:1250px) {
  .overview-cards {
    width: 48% !important;
    margin-bottom: 14px !important;
    &.engagement-score {
      .score-card {
        &.heading {
          font-size: 100px!important;
        }
        &.subheading {
          font-size: 45px!important;
          position: relative!important;
          // left: 14%!important;
        }
      }
    }
  }
}

.engagement-cards {
  // width: 48%!important;
  margin: 0 auto !important;
  height: 420px!important;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #f1f1f1!important;
  .custom-div-2 {
    min-width: 50%!important;
  }
  .custom-cards {
    margin: 0 auto !important;
    height: 50px!important;
    border: 1px dotted grey!important;
  }
}

.vibes-cards {
  // width: 48%!important;
  margin: 0 auto !important;
  height: 420px!important;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #f1f1f1!important;
  .audience-list {
    height: 360px!important;
    overflow-y: hidden!important;
    overflow-x:hidden !important;
    .v-table__overflow {
      height: 100%!important;
    }
    .v-datatable {
      tr,th,td {
        padding: 0 8px!important;
      }
    }
  }
}

.template-custom-field {
  &.no-margin {
    height:50px!important;
  }
  &.v-text-field--box {
    .v-input__slot {
      min-height: unset!important;
    }
  }
  &.v-text-field--outline {
    .v-input__slot {
      min-height: unset!important;
    }
  }
  &.v-text-field {
    &.v-text-field--solo {
      .v-input__control {
         min-height: unset!important;
      }
    }
  }
  &.v-text-field--box {
    &.v-text-field--single-line {
      input {
        margin-top: 0px!important;
      }
    }
  }
  &.v-text-field--outline {
    &.v-text-field--single-line {
      input {
        margin-top: 0px!important;
      }
    }
  }
  &.v-text-field {
    &.v-text-field--enclosed {
      .v-input__prepend-outer {
        margin-top:0px!important;
      }
      .v-input__prepend-inner {
        margin-top:0px!important;
      }
      .v-input__append-outer {
        margin-top:0px!important;
      }
      .v-input__append-inner {
        margin-top:0px!important;
      }
    }
  }
}

@media (min-width: 600px) {
  .flex.sm2-5 {
    -ms-flex-preferred-size: 20%;
    flex-basis: 20%;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    max-width: 20%;
  }
}
.no-data {
  min-height: calc(50vh);
  border: 2px dashed !important;
  .layout {
    height: 60vh;
  }
}

.score-width {
  max-width: 85px !important;
}

.big-score-width {
  max-width: 10em !important;
}

.mood-width {
  max-width: 6em !important;
}

.success--text {
  color: #4caf50!important;
}

.primary--text {
  color: #0a1a56!important;
}

.amara--text {
  color: #37b99c!important;
}

[class^="flaticon-"]:before, [class*=" flaticon-"]:before,
[class^="flaticon-"]:after, [class*=" flaticon-"]:after {
  margin-left: 0 !important;
}

.theme--dark.v-text-field.transparent .v-input__slot:before {
  border-color: transparent;
}

.v-datatable__expand-content {
  max-height: 20em;
  overflow-y: auto;
}

.fill-layout {
  min-height: calc(100vh - 10em);
}

@media screen and (max-width: 1055px) {
  .fill-layout {
    min-height: max-content;
  }
}

.doing-great-list, .doing-great-list-emp {
  // height: 15em;
  // overflow-y: auto;
  .layout {
    min-height: 0 !important;
  }
  > div:not(:last-child) {
    .v-list__tile__content, .v-list__tile__action {
      border-bottom: 1px solid #dadce0;
    }
  }
}

.small-chart {
  height: 250px;
}

.doing-great-list-emp {
  .v-list__tile {
    padding: 0;
  }
  height: 17em;
  overflow-y: auto;
  &.small {
    height: 13em;
  }
}
.v-tabs__bar {
  border-radius: 8px 8px 0 0 !important;
  overflow: hidden;
}
.v-list, .v-select-list, .v-menu__content, .v-input__slot,
.v-expansion-panel__container {
  border-radius: 8px !important;
}

.theme--light {
  &.v-icon {
    font-size: 16px;
  }
  &.v-card {
    border-color: #dadce0 !important;
  }
}

.v-input--selection-controls__input {
  margin-right: 0 !important;
}

.w-100 {
  width: 100%;
}

.v-select {
  .v-input__slot {
    box-shadow: none;
  }
  .v-select__selection.v-select__selection--comma {

  }
}

.remove-msg {
  .v-input__slot {
    margin-bottom: 0;
  }
  .v-text-field__details {
    display: none;
  }
}

.stages-analysis-block:hover, .stages-analysis-block.active {
  color: white !important;
  span {
    color: white !important;
  }
  &.c-info {
    background-color: #2196F3;
  }
  &.c-error {
    background-color: #f44336;
  }
  &.c-primary {
    background-color: #0d2c8d;
  }
  &.c-success {
    background-color: #4caf50;
  }
}
.stages-analysis-block {
  // cursor: pointer;
  border-radius: 4px;
  border-color: #f3f3f3;
  &.c-info {
    color: #2196F3;
  }
  &.c-error {
    color: #f44336;
  }
  &.c-primary {
    color: #0d2c8d;
  }
  &.c-success {
    color: #4caf50;
  }
}

.stages-analysis:hover, .stages-analysis.active {
  // color: white !important;
  // span {
  //   color: white !important;
  // }
  &.c-info {
    background-color: #2196F3;
  }
  &.c-error {
    background-color: #f44336;
  }
  &.c-primary {
    background-color: #0d2c8d;
  }
  &.c-success {
    background-color: #4caf50;
  }
}
.stages-analysis {
  // cursor: pointer;
  border-radius: 4px;
  border-color: #f3f3f3;
  text-align: center;
  &.c-info {
    color: #2196F3;
  }
  &.c-error {
    color: #f44336;
  }
  &.c-primary {
    color: #0d2c8d;
  }
  &.c-success {
    color: #4caf50;
  }
  &.analysis {
    h1 {
      font-size: 28px!important;
    }
  }
}

.bg-gradient {
  &:before {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 9em;
    // background: #8E2DE2;  /* fallback for old browsers */
    // background: -webkit-linear-gradient(to bottom, #911f42, #42276f);
    // background: linear-gradient(to bottom, #911f42, #42276f);
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }
  &.custom-toolbar {
    height: 9em!important;
    &:before {
      height: 9em!important;
    }
  }

  &.bg-adhoc-theme {
    &:before {
      content: '';
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      height: 4em;
      background: #4c3e9d!important;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to bottom, #911f42, #42276f);
      background: linear-gradient(to bottom, #911f42, #42276f);
      -webkit-box-shadow: none !important;
      box-shadow: none !important;
    }
    &.toolbar {
      height: 4em!important;
    }
    .v-toolbar__content {
      margin-top: 0px;
    }
  }

  .layout {
    z-index: 1;
  }

  &.toolbar {
    height: 9.4em;
  }
}

.new-lifecycle {
  // position:absolute!important;
  // top: 9em!important;
  width: calc(100% - 3.8rem)!important;
}

.v-stepper__step__step .v-icon {
  font-size: 14px !important;
}
.bg-white {
  background-color: white!important;
}

.employee-filters {
  .v-expansion-panel__container {
    .v-expansion-panel__header {
      padding: 0px!important;
      min-height: 40px;
      border-bottom:1px solid #ccc !important;
    }
    .v-expansion-panel__body {
      // height: calc(100% - 100px)!important;
      // max-height: calc(100% - 100px)!important;
      // overflow-y: scroll!important;
      // overflow-x: hidden!important;
    }
  }
  .v-expansion-panel__header__icon {
    // display: none !important;
  }
}

.fixed-card-actions {
  .v-card {
    height: 90vh;
  }
  .v-expansion-panel {
    height: calc(100% - 52px);
    overflow-y: hidden;
  }
  .v-expansion-panel__container .v-expansion-panel__body {
    height: calc(100% - 168px) !important;
    max-height: calc(100% - 168px) !important;
  }
}

@media only screen and (max-width: 959px) {
  .bg-gradient {
    &.toolbar {
      height: 7.7em;
    }
    .bg-adhoc-theme {
      &.toolbar {
        height: 7.7em;;
      }
    }
  }
}

.v-card {
  border: 1px solid #dadce0;
  border-radius: 8px !important;
  &.primary--outline {
    border-color: #4a00e0 !important;
  }
}
@media only screen and (min-width: 960px){
  .container {
    max-width: 1110px;
  }
}

.v-list__tile__title {
  min-height: 24px;
  height: auto;
}
.shell-container {
  min-height: 100vh;
}
body, .application {
  // font-family: 'Work Sans', sans-serif !important;
}
.hover-link:hover {
  color: #0d2c8d !important;
}

.datatable {
  th {
    border-radius: 4px;
  }
}

.v-text-field--outline.v-input--is-focused .v-input__slot {
  border: 1px solid currentColor !important;
}

.theme--light.v-text-field--outline .v-input__slot {
  border: 1px solid currentColor !important;
}

.theme--light .v-expansion-panel .v-expansion-panel__container,
.application .theme--light.v-expansion-panel .v-expansion-panel__container {
  border-top: none;
}

.v-expansion-panel__header {
  background-color: rgba(76, 62, 157, 0.1) !important;
  border-color: #f4f8f9 !important;
  border-radius: 0px;
}
.v-expansion-panel {
  .v-input__slot {
    margin-bottom: 0px;
  }
  .v-input {
    margin-top: 0px;
  }
  .v-card {
    border: 1px solid #f4f8f9 !important;
    label {
      font-size: 13px;
      text-transform: capitalize;
    }
  }
}

// .v-btn {
//   border-radius: 4px;
// }

.chip--small {
  height: 17px;
  font-size: 8px;
  .chip__content {
    padding: 0 8px;
  }
}

.vp-editor {
  width: 100%;
}

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: #dfe3ea;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;

  &.full-height {
    min-height: 75vh;
    p {
      padding: 30vh 0;

    }
  }
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  color: #4d7cff;
  outline: 2px dashed #4d7cff; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 55px 0;
}

.content-sidebarOpen {
  // padding: 0 0 0 53px !important;
  // padding: 50px 0 0 50px !important;
  padding: 58px 0 0 0px !important;
}
.app-main-wrap {
  // padding: 0 0 0 53px !important;
  // padding: 50px 0 0 50px !important;
  padding: 58px 0 0 0px !important;
}

.cursor-pointer {
  cursor: pointer;
}

.chart-div {
  height: 350px;
}

.amcharts-chart-div {
  a {
    display: none !important;
  }
}

.display-none {
  display: none;
}

.cand-stepper {
  .stepper__step__step.primary {
    .icon {
      display: none;
    }
  }
}

.white-dash-div {
  min-height: 90vh;
  background-color: white;
}

.b-left {
  border-left: 1px solid #d0d0d0;
}

.b-right {
  border-right: 1px solid #d0d0d0;
}

.b-top {
  border-top: 1px solid #d0d0d0;
}

.b-bottom {
  border-bottom: 1px solid #d0d0d0 !important;
}
.cand-actions {
  .icon {
    font-size: 18px;
  }
}

.no-border {
  border: none;
}
.svg-icon {
  height: 15px;
  color: rgba(0,0,0,0.54);
  margin-right: 2px !important;
}


.fas, .mdi {
  font-size: 18px !important;
}

@media only screen and (min-width: 1264px) {
  .container {
  max-width: 1500px;
  }
}
.blank-avatar {
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
  height: 12em;
}
.blank-avatar-small {
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
  height: 7em;
}

.theme--light .input-group.input-group--textarea:not(.input-group--full-width)
.input-group__input, .application .theme--light.input-group.input-group--textarea
:not(.input-group--full-width) .input-group__input {
  border: 2px solid rgba(0, 0, 0, 0.3);
}
.heading {
  font-size: 16px !important;
}
.heading-b {
  font-size: 16px !important;
  font-weight: bold !important;
}
.sub-heading{
  font-size: 14px !important;
}
// .btn-text {
//   font-size: 13px !important;
// }
.main-heading {
  font-size:20px !important;
}
// .v-btn {
//   text-transform: capitalize !important;
// }
.grecaptcha-badge {
  display: none !important;
}
.filter-search-bar {
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 0px !important;
  .v-input__prepend-inner {
    .v-icon {
      font-size: 16px !important;
    }
  }
}

.freeze-main {
  overflow: hidden;
}

/* For the "inset" look only */
html {
  overflow-y: auto !important;
  scroll-behavior: smooth;
}

/* total width */
::-webkit-scrollbar {
  height: 5px;
  width: 7px;
}
::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
}
::-webkit-scrollbar-track:hover {
  background-color:rgba(0, 0, 0, 0.1);
}
/* scrollbar itself */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #b7b1d7;
    border-radius:1px;
}
::-webkit-scrollbar-thumb:hover {
    background-color:#6f64b0;
    border:4px solid #6f64b0;
}
/* set button(top and bottom of the scrollbar) */
::-webkit-scrollbar-button {
  display:none
}
</style>
