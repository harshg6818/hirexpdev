<template>
  <header class="amara-header">
    <v-toolbar color="primary">
      <v-toolbar-title>
        <v-img
          class="amara-logo"
          src="@/assets/logo/amara_logo_white.png"
          alt="amara-logo"
        ></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-bottom-navigation
          color="transparent"
          class="elevation-0 amara-nav-bar"
          background-color="transparent"
          height="58"
        >
          <v-btn
            class="amara-nav-btn"
            value="dashboard"
            @click="pushRouter('/?tab=overview')"
          >
            <span>Dashboard</span>
            <v-icon>fas fa-chart-line</v-icon>
          </v-btn>
          <v-btn
            class="amara-nav-btn"
            value="employees"
            @click="resetEmpView();pushRouter('/employees')"
          >
            <span>Employees</span>
            <v-icon>fas fa-users</v-icon>
          </v-btn>
          <v-btn
            class="amara-nav-btn"
            value="ad-hoc"
            @click="pushRouter('/ad-hoc')"
          >
            <span>Ad-hoc</span>
            <v-icon>fas fa-bezier-curve</v-icon>
          </v-btn>
          <v-btn
            class="amara-nav-btn"
            value="analytics"
            @click="pushRouter('/analytics')"
          >
            <span>Analytics</span>
            <v-icon>fas fa-chart-bar</v-icon>
          </v-btn>
          <v-btn
            class="amara-nav-btn"
            @click="searchEmployees"
          >
            <span>Search</span>
            <v-icon>fas fa-search</v-icon>
          </v-btn>
          <v-btn
            value="new"
            class="amara-nav-btn announcekit-widget bell-icon px-2" style="position:relative;"
          >
            <span>What's new</span>
            <div style="position:absolute;top:20px; left:25px;" class="announcekit-widget"></div>
            <v-icon>fas fa-bell</v-icon>
          </v-btn>
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                class="amara-nav-btn"
                slot="activator"
                v-on="on"
              >
                <div class="d-flex">
                  <span>Me</span>
                  <v-icon>fas fa-caret-down</v-icon>
                </div>
                <v-avatar size="20" class="profile-avatar">
                  <v-img :src="getImgUrl('male-avatar')"></v-img>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list>
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
                        color="primary"
                        small
                        outlined
                        @click="goToSettings('/settings?tab=profile')"
                      >View Profile
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
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
              </v-list>
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
        </v-bottom-navigation>
      </v-toolbar-items>
    </v-toolbar>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'navbar',
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
    logout () {
      axios.post(`${process.env.API_URL}logout`).then((response) => {
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
    },
    goToSettings (path) {
      this.$router.push({
        path
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
    height: 100%;
    width: 20%;
  }
  .amara-nav-bar {
    .amara-nav-btn {
      &.v-btn:not(.v-btn--active) {
        color: rgba(255,255,255, 1) !important;
        height: 60px;
      }
      &.v-btn--active {
        color: rgba(255,255,255, 1) !important;
        height: 60px !important;
      }
    }
  }
}
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
