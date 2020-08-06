<template>
  <header class="amara-header">
    <v-toolbar color="primary">
      <div class="amara-logo">
        <img src="@/assets/logo/amara_logo_white.png" alt="amara-logo">
      </div>
      <!-- <div> -->
      <!-- <v-toolbar-title> -->
        <!-- <v-text-field
          class="employeeSearch"
          solo
          append-icon="fas fa-search"
          v-model="searchString"
          @keyup="globalSearchEmployee"
          name="search"
          hide-details
          label="Search employee"
        ></v-text-field> -->

        <!-- <v-menu
          offset-y
          v-model="showSearchMenu"
          :nudge-width="100"
          max-height="500"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="employeeSearch"
              solo
              clearable
              clear-icon="fas fa-times"
              append-icon="fas fa-search"
              v-model="searchString"
              @keyup="globalSearchEmployee"
              name="search"
              autocomplete="off"
              v-on="on"
              hide-details
              label="Search employee"
            ></v-text-field>
          </template>
          <v-list>
            <v-list-tile v-if="items && items.length === 0">
              <v-list-tile-title v-if="searchString">No Employees Found</v-list-tile-title>
              <v-list-tile-title v-else>Type to search employee by name or email.</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              style="border-bottom: 1px solid rgba(0,0,0,.1);"
              v-for="(item, index) in items"
              :key="index"
              @click="viewEmployee(item.id)"
            >
              <v-list-tile-title>
                <div class="d-inline-flex">
                  <div class="pt-1 mr-3">
                    <v-avatar size="35">
                      <img :src="getImgUrl('male-avatar')">
                    </v-avatar>
                  </div>
                  <div>
                    {{ item.display_name }}
                    <div class="caption">
                      {{ item.email }}
                    </div>
                  </div>
                </div>
              </v-list-tile-title>
              <v-divider></v-divider>
            </v-list-tile>
          </v-list>
        </v-menu> -->
      <!-- </div> -->
      <!-- </v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-bottom-nav
            :active.sync="amaraTopNav"
            :value="true"
            color="transparent"
            class="elevation-0 amara-nav-bar"
        >
          <!-- <v-btn
            color="#fff"
            flat
            value="dashboard"
            :class="amaraTopNav === 'dashboard' ? 'activeNav' : ''"
            @click="pushRouter('/')"
          > -->
          <v-btn
            color="#fff"
            flat
            value="dashboard"
            @click="pushRouter('/')"
          >
            <span>Dashboard</span>
            <v-icon>fas fa-chart-line</v-icon>
          </v-btn>
          <!-- <v-btn
            color="#fff"
            flat
            value="employees"
            :class="amaraTopNav === 'employees' ? 'activeNav' : ''"
            @click="resetEmpView();pushRouter('/employees')"
          > -->
          <v-btn
            color="#fff"
            flat
            value="employees"
            @click="resetEmpView();pushRouter('/employees')"
          >
            <span>Employees</span>
            <v-icon>fas fa-users</v-icon>
          </v-btn>
          <v-btn
            color="#fff"
            flat
            value="ad-hoc"
            @click="pushRouter('/ad-hoc')"
          >
          <!-- <v-btn
            color="#fff"
            flat
            value="ad-hoc"
            :class="amaraTopNav === 'ad-hoc' ? 'activeNav' : ''"
            @click="pushRouter('/ad-hoc')"
          > -->
            <span>Ad-hoc</span>
            <v-icon>fas fa-bezier-curve</v-icon>
          </v-btn>
          <!-- <v-btn
            color="#fff"
            flat
            value="analytics"
            :class="amaraTopNav === 'analytics' ? 'activeNav' : ''"
            @click="pushRouter('/advance-analytics')"
          > -->
          <!-- <v-btn
            color="#fff"
            flat
            value="analytics"
            :class="amaraTopNav === 'analytics' ? 'activeNav' : ''"
            @click="pushRouter('/analytics')"
          > -->
          <v-btn
            color="#fff"
            flat
            value="analytics"
            @click="pushRouter('/analytics')"
          >
            <span>Analytics</span>
            <v-icon>fas fa-chart-bar</v-icon>
          </v-btn>

          <!-- <v-btn
            color="#fff"
            flat
            value="new"
            :class="amaraTopNav === 'new' ? 'activeNav' : ''"
            class="announcekit-widget bell-icon px-2" style="position:relative;"
          > -->
          <v-btn color="#fff" flat
            @click="searchEmployees"
          >
            <span>Search</span>
            <v-icon>fas fa-search</v-icon>
          </v-btn>
          <v-btn
            color="#fff"
            flat
            value="new"
            class="announcekit-widget bell-icon px-2" style="position:relative;"
          >
            <span>What's new</span>
            <div style="position:absolute;top:20px; left:25px;" class="announcekit-widget"></div>
            <v-icon>fas fa-bell</v-icon>
          </v-btn>
          <v-menu
            v-model="userProfileMenu"
            :close-on-content-click="true"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                slot="activator"
                color="#fff"
                flat
                v-on="on"
                value="me"
              >
              <!-- <v-btn
                slot="activator"
                color="#fff"
                flat
                v-on="on"
                :class="amaraTopNav === 'me' ? 'activeNav' : ''"
                value="me"
              > -->
                <div class="d-flex">
                  <span>Me</span>
                  <v-icon>fas fa-caret-down</v-icon>
                </div>
                <v-avatar size="20" class="profile-avatar">
                  <img :src="getImgUrl('male-avatar')">
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img :src="getImgUrl('male-avatar')">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{user.display_name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <v-btn
                        color="primary"
                        flat
                        small
                        outline
                      >View Profile
                      </v-btn>
                    </v-list-tile-title>
                    <!-- <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title> -->
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <div class="menu-title">
                Account
              </div>
              <v-divider></v-divider>
              <v-list class="menu-account">
                <v-list-tile to="/support-center">
                  <v-list-tile-title>
                    Create support ticket
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile target="_blank" href="https://support.amara.ai/">
                  <v-list-tile-title>
                    knowledge base
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <div class="menu-title">
                Manage
              </div>
              <v-divider></v-divider>
              <v-list class="menu-manage">
                <v-list-tile to="/settings?tab=company">
                  <v-list-tile-title>
                    Company settings
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile to="/settings?tab=integrations">
                  <v-list-tile-title>
                    Integrations
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile to="/settings?tab=milestones">
                  <v-list-tile-title>
                    Critical Touchpoints
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile to="/settings?tab=users">
                  <v-list-tile-title>
                    Manage Users
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile to="/settings?tab=alertWord">
                  <v-list-tile-title>
                    Alert Words
                  </v-list-tile-title>
                </v-list-tile>
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
        </v-bottom-nav>
      </v-toolbar-items>
    </v-toolbar>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import { VMenu, VAvatar, VBottomNav, VAutocomplete, VSwitch } from 'vuetify';
// import Search from './Search';

export default {
  name: 'navbar',
  components: {
    VMenu,
    VAvatar,
    VSwitch,
    // Search,
    VBottomNav,
    VAutocomplete
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      searchString: '',
      amaraTopNav: 'dashboard',
      loading: false,
      items: [],
      search: null,
      showSearchMenu: false,
      userProfileMenu: false
    };
  },
  // mounted() {
  //   if (this.$router && this.$router.currentRoute && this.$router.currentRoute.path) {
  //     const routePath = this.$router.currentRoute.path.split('/');
  //     const currentPath = routePath[1];
  //     if (currentPath) {
  //       this.amaraTopNav = currentPath;
  //     }
  //   }
  // },
  computed: {
    ...mapState({
      user: state => state.user,
      sidebarOpen: state => state.sidebarOpen,
      activeNavigation: state => state.activeNavigation
    })
  },
  watch: {
    search (val) {
      // eslint-disable-next-line no-unused-expressions
      val && this.querySelections(val);
    },
    activeNavigation: {
      deep: true,
      immediate: true,
      handler () {
        if (this.activeNavigation) {
          this.amaraTopNav = this.activeNavigation;
        } else {
          this.amaraTopNav = 'dashboard';
        }
      }
    }
  },
  methods: {
    // openSidebar() {
    //   this.$store.dispatch('toggleSidebar');
    // },
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
    },
    handleResize () {
      if (document && document.documentElement &&
        document.documentElement.clientWidth &&
        document.documentElement.clientWidth < 992) {
        this.mobile = true;
        if (this.sidebarOpen) {
          this.$store.dispatch('toggleSidebar');
        }
      } else if (document && document.documentElement &&
        document.documentElement.clientWidth &&
        document.documentElement.clientWidth > 992 && !this.sidebarOpen) {
        this.mobile = false;
        if (!this.sidebarOpen) {
          this.$store.dispatch('toggleSidebar');
        }
      }
    },
    getImgUrl (pet) {
      const images = require.context('@/assets', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    resetEmpView () {
      this.$store.dispatch('singleEmpView', false);
    },
    viewEmployee (id) {
      // this
      // console.log("viewEmployee -> this", this);
      const queryParams = {
        fields: 'engagement_score,last_milestone,mood,high_potential_emp,latest_session_driver,latest_session_driverwise_subdrivers,last_chat_completedAt,user_session_count,user_inProgress_session_count,user_completed_session_count,user_completed_session_driverwise_subdrivers,user_latest_session_interactions,user_completed_session_mood,formatted_question_text,formatted_response_text,first_name,last_name,display_name,sub_type,email,location,phoneNumber,profilePicture,gender,designation,status,employee_id,department,user_id,last_chat_action_status,last_chat_id,last_chat_session_id,last_chat_assignedTo,last_chat_assignedTo_email,last_chat_assignedTo_display_name,interactions_active,alert_raised,alert_words'
      };
      axios.get(`${process.env.VUE_APP_API_URL}users/${id}/details`, {
        params: queryParams
      }).then((response) => {
        // this.config.initialLoading = false;
        if (response && response.data) {
          const t = [];
          t.push(response.data);
          this.$store.dispatch('employeesList', { data: t, total_count: 1 });
          this.$store.dispatch('activeEmployee', response.data);
          this.$store.dispatch('singleEmpView', true);
          if (this.$router && this.$router.currentRoute && this.$router.currentRoute.name) {
            if (this.$router.currentRoute.name !== 'Employees') {
              this.amaraTopNav = 'employees';
              this.$router.push({
                query: { eId: id },
                path: '/employees'
              });
            }
          }
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch employee, Please try again later!'
        });
        throw new Error(response);
      });
    },
    searchEmployees () {
      this.$emit('searchEmployees');
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
    pushRouter (val) {
      this.$router.push({
        path: val
      });
    }
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     window.addEventListener('resize', this.handleResize);
  //   });
  // },
  // beforeDestroy() {
  //   window.removeEventListener('resize', this.handleResize);
  // },
  beforeMount () {
    // this.handleResize();
  }
};
</script>

<style lang="scss">
// .white-nav-div {
//   background-color: white;
// }
// .small-navbar {
//   height: 50px;
//   border-bottom: 1px solid #bbbbbb;
// }
// .logo {
//   max-height: 40px;
//   max-width: 150px;
// }

.amara-header {
  z-index: 9;
  position: fixed;
  width: 100%;
  .v-toolbar {
    .v-toolbar__content {
      height: 58px !important;
      .v-toolbar__title:not(:first-child) {
        margin-left: 30px;
      }
    }
  }
  .amara-logo {
    height: 38px;
    width: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .employeeSearch {
    width: 350px;
    .v-input__control {
      min-height: 40px !important;
      .v-input__slot {
        box-shadow: none !important;
        border-radius: 2px !important;
      }
    }
  }
  .profile-avatar {
    margin: 6px 0 4px 0 !important;
  }
  .amara-nav-bar {
    .v-btn:not(.v-btn--active) {
      color: rgba(255,255,255, 1) !important;
    }
    .activeNav {
      border-bottom: 3px solid #ffffff;
      transition: all 0.3 ease;
    }
  }
}

// .logout {
//   height : 36px !important;
//   width: 36px !important;
//   margin-left: 15px !important;
//   margin-right: 0;
// }

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
</style>
