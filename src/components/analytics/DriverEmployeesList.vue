<template>
  <div class="">
    <div class="" v-show="config.initialLoading">
      <ContentLoader
        :height="160"
        :width="400"
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="0" y="0" rx="2" ry="2" width="394.46" height="17.93" />
        <rect x="0" y="25" rx="2" ry="2" width="394.46" height="17.93" />
        <rect x="0" y="50" rx="2" ry="2" width="394.46" height="17.93" />
        <rect x="0" y="75" rx="2" ry="2" width="394.46" height="17.93" />
        <rect x="0" y="100" rx="2" ry="2" width="394.46" height="17.93" />
        <rect x="0" y="125" rx="2" ry="2" width="394.46" height="17.93" />
        <rect x="0" y="150" rx="2" ry="2" width="394.46" height="17.93" />
      </ContentLoader>
    </div>

    <!-- After intial loading -->
    <v-data-table
      v-show="!config.initialLoading"
      :headers="table.headers"
      :items="table.team"
      :pagination.sync="pagination"
      :total-items="table.totalItems"
      :loading="table.loading"
      class=""
    >
      <template slot="items" slot-scope="props">
        <tr v-if="props.item">
          <td>
            <v-layout row wrap align-center>
              <v-flex class="py-2" sm3>
                <v-avatar size="30px" :color="getColor(props.item)">
                  <img src="src" alt="alt" v-show="false">
                  <span class="white--text">{{getAvatar(props.item)}}</span>
                </v-avatar>
              </v-flex>
              <v-flex>
                <p class="mb-0" v-show="props.item.user__display_name">
                  <strong :class="{'hover-link cursor-pointer': $route.name !== 'ViewAdhoc'}" @click="viewEmployee(props.item);">
                    {{props.item.user__display_name}}
                  </strong>
                </p>
                <small>
                  {{props.item.user__email}}
                </small>
              </v-flex>
            </v-layout>
          </td>
          <td>
            {{props.item.stage__title}}
          </td>
          <td>
            <v-chip :class="{
              'success success--text': props.item.driver_rating > 3,
              'error error--text': props.item.driver_rating <= 3
            }" class="ma-0" outline small v-if="props.item.driver_rating">{{props.item.driver_rating}}</v-chip>
          </td>
          <td class="text-sm-left">
            <span v-if="!props.item.user_mood && !props.item.overall_mood" class="font-weight-bold grey--text">-</span>
            <v-tooltip bottom v-if="props.item.user_mood">
              <img
                slot="activator"
                height="30"
                :src="getImgUrl(`${props.item.user_mood}`)"
              >
              Current Vibe
            </v-tooltip>
            <v-tooltip bottom v-if="props.item.overall_mood">
              <img
                slot="activator"
                height="30"
                :src="getImgUrl(`${props.item.overall_mood}`)"
              >
              Current Vibe
            </v-tooltip>
          </td>
        </tr>
      </template>
      <template slot="expand">
        <div class="secondary px-4 py-2">
          <span v-show="!table.loadingInfo">
            <QuickView ref="QuickView" />
          </span>
          <v-progress-linear v-if="table.loadingInfo"
          :indeterminate="true"></v-progress-linear>
        </div>
      </template>
      <v-card slot="no-data" class="elevation-0 text-xs-center" min-height="60vh">
        <v-card-title primary-title class="justify-center">
          <v-layout row wrap>
            <v-flex xs12>
              <img :src="getImgUrl('amara_avatar')" class="blank-avatar" alt="">
              <p>
                No employees present.
              </p>
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import {
//   VCheckbox,
//   VAvatar,
//   VTooltip,
//   VAlert,
//   VProgressLinear,
//   VChip,
// } from 'vuetify';
import QuickView from '@/components/elements/QuickView';
// import OneOnOne from '../employees/dialogs/OneOnOne';
// import AddComment from '../elements/AddComment';

dayjs.extend(relativeTime);

export default {
  name: 'EmployeesList',
  components: {
    QuickView,
    ContentLoader
    // VCheckbox,
    // VAvatar,
    // VTooltip,
    // VAlert,
    // dayjs,
    // OneOnOne,
    // AddComment,
    // VChip,
    // VProgressLinear,
  },
  data () {
    return {
      open: false,
      title: '',
      activeDriver: false,
      filters: {},
      sessions: {},
      pagination: {
        rowsPerPage: 10,
        page: 1
      },
      stats: {
        resolved: 0,
        completed: 0,
        all: 0
      },
      table: {
        totalItems: 0,
        closedItems: 0,
        searchString: '',
        extraInfo: [],
        loadingInfo: true,
        loading: false,
        team: [],
        headers: [{
          text: 'Employee Details',
          align: 'left',
          sortable: false
        }, {
          text: 'Last Touchpoint',
          align: 'left',
          sortable: false
        }, {
          text: 'Engagement Score',
          align: 'left',
          sortable: false
        }, {
          text: 'Current Vibe',
          align: 'left',
          sortable: false
        // }, {
        //   text: 'Stage',
        //   align: 'left',
        //   sortable: false,
        }]
      },
      config: {
        actionMenu: {},
        activeTab: 'high_risk_session',
        panel: [true, true, true, true],
        initialLoading: true,
        loading: false,
        initialLoadingFilters: true,
        actions: [
          {
            title: 'Schedule meeting',
            icon: 'flaticon-012-meeting',
            status: 'scheduled',
            dialog: 'OneOnOne',
            action: this.openDialog
          }, {
            title: 'Work In Progress',
            icon: 'flaticon-047-conversation',
            status: 'inProgress',
            action: this.updateStatus
          }, {
            title: 'Resolved',
            icon: 'fas fa-check',
            status: 'resolved',
            action: this.updateStatus
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    updateStatus (s, newStatus) {
      this.config.loading = true;
      axios.patch(`${process.env.VUE_APP_API_URL}session/update/${s.id}`, {
        status: newStatus
      }).then((response) => {
        this.config.loading = false;
        if (response && response.data) {
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee status updated!'
          });
          this.getEmployees(this.config.activeTab);
        } else {
          this.config.loading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update status, Please try again later!'
          });
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update status, Please try again later!'
        });
        throw new Error(response);
      });
    },
    openDialog (data, type) {
      if (type && this.$refs[type]) {
        this.$refs[type].open = true;
        this.$refs[type].employee = data;
      }
    },
    setInfo (e, row) {
      if (row.expanded) {
        this.table.loadingInfo = true;
        this.table.extraInfo = [];
        this.$lodash.each(e.transcripts, (t) => {
          if (t.responseRequired || t.bot_response === false) {
            this.table.extraInfo.push(t);
          }
        });
        setTimeout(() => {
          this.table.loadingInfo = false;
          this.$refs.QuickView.transcripts = this.table.extraInfo;
        }, 100);
      }
    },
    getColor (e) {
      let color = 'primary';
      if (e.gender && e.gender === 'female') {
        color = 'pink';
      }
      return color;
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    viewEmployee (s, tab) {
      if (this.$route.name !== 'ViewAdhoc') {
        this.$router.push({
          path: '/employees',
          query: {
            search: s.display_name,
            eID: s.user_profile_id || s.id,
            activeTab: tab
          }
        });
      }
    },
    getAvatar (c) {
      let name = '';
      if (c.user__display_name) {
        name = c.user__display_name.split(' ');
      } else {
        name = c.display_name.split(' ');
      }
      const avt = `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
      return avt.toUpperCase();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
