<template>
  <div class="amara-settings-tab">
    <v-layout column class="hide-overflow">
    <v-spacer></v-spacer>
      <v-menu offset-y v-show="false">
        <v-btn
          slot="activator"
          small
          dark
          flat
          icon
        >
          <v-icon small>fas fa-ellipsis-v</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="(item, index) in config.actions"
            @click="item.action(item.dialog)"
            :key="index"
          >
            <v-list-tile-title>
              <v-icon class="mr-2">{{item.icon}}</v-icon>
              {{ item.title }}
            </v-list-tile-title>
            <v-list-tile-action>
              {{item.count}}
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-layout class="pb-4" row wrap >
        <v-flex xs1>
          <v-btn color="black" flat icon small to="/" class="mt-4 elevation-0">
            <v-icon small>fas fa-arrow-left</v-icon>
          </v-btn>
        </v-flex>
        <v-flex style="margin-left:-50px" xs10>
            <p class="headline mt-4 mb-0">
              Settings
            </p>
        </v-flex>
      </v-layout>
      <aside  style="background:#f1f1f1; min-height:100%; padding:10px " >
        <v-layout style=" padding-left:10px;" row class="">
          <v-flex style="background:white; position: -webkit-sticky; position: sticky; top: 0;" xs3>
            <v-list style="background:#fff;"  class=''>
              <template v-for="(item, index) in items" ref="items">
                <v-subheader v-if="item.header" :key="index">{{ item.header }}</v-subheader>
                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset" ></v-divider>
                <v-list-tile @click="updateTab(item.value)" class="settings-list"
                    style="border-bottom:1px solid rgba(0,0,0,0.12);" v-else
                    :key="index"
                    avatar :class="{'tab' : tab == `tab-${item.value}`}"
                    :disabled="(item.value === 'users' && !checkPermission(['create_group','update_group','add_user_to_group','remove_user_from_group','change_user_group','delete_access_group']))
                    || (item.value === 'integrations' && !checkPermission(['manage_integrations']))
                    || (item.value === 'milestones' && !checkPermission(['manage_milestone']))"
                >
                  <v-list-tile-action class="">
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    <span style="color: rgba(0,0,0,0.54); font-size: 14px;" class="theme--light.v-list .v-list__tile__sub-title">{{item.subtitle}} </span>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-flex>
          <v-flex class="settings-left-flex px-2" style="background:#fff; min-height:100vh-200px;  margin-left:10px; margin-right:10px" xs9>
            <UserProfile ref="UserProfile" v-if="tab == 'tab-profile' || !tab " />
            <CompanyProfile ref="CompanyProfile" v-if="tab == 'tab-company' "/>
            <Integrations ref="Integrations" v-show="tab == 'tab-integrations' "/>
            <stage ref="stage" v-show="tab == 'tab-milestones' "/>
            <emailTemplate ref="templates" v-if="tab == 'tab-templates'" />
            <ExitTouchpoints ref="ExitTouchpoints" v-show="tab == 'tab-exit' "/>
            <segment ref="segment" v-show="tab == 'tab-users'" v-if="checkPermission(['create_group','update_group','add_user_to_group','remove_user_from_group','change_user_group','delete_access_group']) "/>
            <alertWord ref="alertWord" v-show="tab == 'tab-alertWord'" />
          </v-flex>
        </v-layout>
        <v-layout>
        </v-layout>
      </aside>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
// import axios from 'axios';
// import { VChip, VMenu, VSubheader } from 'vuetify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Integrations from './Integrations';
import UserProfile from './UserProfile';
import CompanyProfile from './CompanyProfile';
import stage from '../stages/Lifecycles';
import ExitTouchpoints from '../exit/ExitTouchpoints';
import segment from './Segment';
import emailTemplate from './manageTemplates/emailTemplates';
import alertWord from './alertWord';

dayjs.extend(relativeTime);

export default {
  name: 'settings',
  components: {
    Integrations,
    // ContentLoader,
    UserProfile,
    CompanyProfile,
    // VChip,
    // VMenu,
    // dayjs,
    ExitTouchpoints,
    // VSubheader,
    stage,
    segment,
    emailTemplate,
    alertWord
  },
  data () {
    return {
      items: [{
        icon: 'fas fa-user',
        title: 'Your Profile',
        value: 'profile',
        subtitle: 'Edit your profile/Change password'
      }, {
        icon: 'fas fa-building',
        title: 'Your Company',
        value: 'company',
        subtitle: 'Edit company information'
      }, {
        icon: 'fas fa-cogs',
        title: 'Manage Integrations',
        value: 'integrations',
        subtitle: 'Integrate Amara with third party applications'
      }, {
        icon: 'fas fa-bezier-curve',
        title: 'Manage Critical Touchpoints',
        value: 'milestones',
        subtitle: 'Set up critical touchpoints at which Amara will chat with employees'
        // },{
        //   icon: 'fas fa-door-open',
        //   title: 'Manage Exit Touchpoints',
        //   value: 'exit',
        //   subtitle: 'Set up exit touchpoints at which Amara will chat with employees',
      }, {
        icon: 'fas fa-address-card',
        title: 'Manage Users',
        value: 'users',
        subtitle: 'Create groups, set up admins and give access rights to dashboard'
      },
      // {
      // icon: 'fas fa-envelope',
      // title: 'Manage Email Templates',
      // value: 'templates',
      // subtitle: 'Create your templates',
      // },
      {
        icon: 'far fa-bell',
        title: 'Alert words',
        value: 'alertWord',
        subtitle: 'Manage alert words'
      }
      ],
      config: {
        editable: false,
        initialLoading: true,
        initialLoadingFilters: true,
        actions: [
          {
            title: 'Delete',
            icon: 'fas fa-trash',
            dialog: 'deleteMember',
            action: this.openDialog
          }
        ]

      },
      tab: 'tab-profile'
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    updateTab (val) {
      this.tab = `tab-${val}`;
      this.$router.push(
        {
          path: '/settings',
          query: { tab: val }
        }
      );
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
    }
  },
  watch: {
    $route () {
      if (this.$route.query) {
        if (this.$route.query.tab) {
          this.tab = `tab-${this.$route.query.tab}`;
          // this.$nextTick(() => this.$refs.items.scrollIntoView());
        }
      }
    }
  },
  beforeMount () {
    if (this.$route.query && this.$route.query.tab) {
      this.updateTab(this.$route.query.tab);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.amara-settings-tab{
  .tab{
    color: var(--v-primary-base);
    border-right: 2px solid var(--v-primary-base);
    .theme--light.v-icon{
      color: var(--v-primary-base);
    }
  }
  .settings-list{

    .v-list__tile--avatar{
      height: 85px;
    }
  }
  .settings-list:hover{
    color: var(--v-primary-base);
    border-right: 2px solid var(--v-primary-base);
    .theme--light.v-icon{
      color: var(--v-primary-base);
    }
  }
  .settings-left-flex{
    background:#fff; min-height: calc(100vh - 93px); margin-left:10px; margin-right:10px
  }
  .v-list{
    -webkit-transition: 0s cubic-bezier(0.25, 0.8, 0.5, 1)  !important;
    transition: 0s cubic-bezier(0.25, 0.8, 0.5) !important,
  }
  .v-list__tile__title, .v-list__tile__sub-title{

  -webkit-transition: 0s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
    transition: 0s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
    }
}
.segment_expansion {
  .v-expansion-panel__header {
    background: white !important;
    padding: 4% 8%;
    border-radius: 0 !important;
    border-right: 2px solid #fff !important;
    border-bottom:1px solid rgba(0,0,0,0.12);
  }
  .v-expansion-panel__header:hover {
    background: rgba(0,0,0,0.04) !important;
    color: var(--v-primary-base);
      border-right: 2px solid var(--v-primary-base) !important;
      .theme--light.v-icon{
        color: var(--v-primary-base);
      }
  }
}
</style>
