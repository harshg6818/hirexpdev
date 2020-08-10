<template>
  <v-dialog
    v-model="open"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title class="font-weight-bold">
        {{title}}
      </v-card-title>
      <v-card-text class="overflow-">
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
                <div class="d-flex flex-row flex-wrap align-center">
                  <v-flex class="py-2" sm3>
                    <v-avatar size="30px" :color="getColor(props.item)">
                      <img src="src" alt="alt" v-show="false">
                      <span class="white--text">{{getAvatar(props.item)}}</span>
                    </v-avatar>
                  </v-flex>
                  <v-flex>
                    <p class="mb-0" v-show="props.item.user_display_name || props.item.display_name">
                      <strong :class="{'hover-link cursor-pointer': $route.name !== 'ViewAdhoc'}" @click="viewEmployee(props.item);">
                        {{props.item.user_display_name || props.item.display_name}}
                      </strong>
                    </p>
                    <small>
                      {{props.item.email || props.item.user_email}}
                    </small>
                  </v-flex>
                </div>
              </td>
              <td>
                {{props.item.last_triggered_stage || props.item.stage_title}}
              </td>
              <td>
                <v-chip :class="{
                  'success success--text': props.item.driverAverage > 3,
                  'error error--text': props.item.driverAverage <= 3
                }" class="ma-0" outline small v-if="props.item.driverAverage">{{props.item.driverAverage}}</v-chip>
                <v-chip :class="{
                  'success success--text': props.item.driver_rating > 3,
                  'error error--text': props.item.driver_rating <= 3
                }" class="ma-0" outline small v-if="props.item.driver_rating">{{props.item.driver_rating}}</v-chip>
                <v-chip :class="{
                  'success success--text': props.item.user_driver_average > 3,
                  'error error--text': props.item.user_driver_average <= 3
                }" class="ma-0" outline small v-if="props.item.user_driver_average">{{props.item.user_driver_average}}</v-chip>
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
              <div class="d-flex flex-row flex-wrap">
                <v-flex xs12>
                  <img :src="getImgUrl('amara_avatar')" class="blank-avatar" alt="">
                  <p>
                    No employees present.
                  </p>
                </v-flex>
              </div>
            </v-card-title>
          </v-card>
        </v-data-table>
      </v-card-text>
      <v-card-actions align-content-space->
        <v-flex>
          <v-btn color="error" flat @click.stop="open=false;">Close</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
    <OneOnOne ref="oneOnOne" />
    <AddComment ref="AddComment" />
  </v-dialog>
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
import QuickView from '../elements/QuickView';
import OneOnOne from '../employees/dialogs/OneOnOne';
import AddComment from '../elements/AddComment';

dayjs.extend(relativeTime);

export default {
  name: 'EmployeesList',
  components: {
    QuickView,
    ContentLoader,
    // VCheckbox,
    // VAvatar,
    // VTooltip,
    // VAlert,
    // dayjs,
    OneOnOne,
    AddComment
    // VChip,
    // VProgressLinear,
  },
  data () {
    return {
      dateRangeOptions: {},
      open: false,
      title: '',
      activeDriver: false,
      filters: {},
      sessions: {},
      pagination: {
        rowsPerPage: 10
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
    getEmployees () {
      let stageId;
      if (this.$route.params && this.$route.params.stageId) {
        stageId = this.$route.params.stageId;
      }
      // if (this.$route.query && this.$route.query.driver) {
      //   activeDriver = this.$route.query.driver;
      // }
      const dataFor = {
        title: this.sessions ? 'session' : 'users'
      };
      const queryParams = {
        count: 'true',
        page_limit: this.pagination.rowsPerPage,
        page_offset: this.pagination.page || 1,
        fields: !this.sessions ? 'display_name,email,id,user_mood,stage_title,last_triggered_stage,user_driver_average'
          : 'user,action_status,tage_title,overall_mood,driverAverage,stage_title,user_display_name,user_email,user_profilePicture,user_department,user_location,transcripts,user_profile_id,status,createdAt,completedAt',
        stage_id: !this.sessions ? stageId : undefined,
        stage__id__in: this.sessions ? stageId : undefined,
        initiated_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined
      };

      this.$lodash.each(this.filters, (v, k) => {
        queryParams[k] = v;
      });
      this.table.loading = true;
      axios.get(`${process.env.VUE_APP_API_URL}${dataFor.title}/list`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          if (response.data.data) {
            this.table.loading = false;
            this.config.initialLoading = false;
            this.table.team = response.data.data;
            const actionMenu = {};
            this.$lodash.each(response.data.data, (v) => {
              actionMenu[v.id] = false;
            });
            this.config.actionMenu = actionMenu;
            this.stats = {
              completed: response.data.high_risk_session_count,
              resolved: response.data.closed_session_count,
              all: response.data.total_session_count
            };
            this.table.totalItems = response.data.total_count;
          }
        }
      }, (response) => {
        this.table.loading = false;
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch details, Please try again later!'
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
      if (c.user_display_name) {
        name = c.user_display_name.split(' ');
      } else {
        name = c.display_name.split(' ');
      }
      const avt = `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
      return avt.toUpperCase();
    }
  },
  watch: {
    pagination: {
      handler () {
        if (!this.config.initialLoading) {
          this.getEmployees();
        }
      },
      deep: true
    },
    $route () {
      if (this.$route.query && this.$route.query.driver) {
        this.activeDriver = true;
      } else {
        this.activeDriver = false;
      }
    }
  },
  beforeMount () {
    if (this.$route.query && this.$route.query.driver) {
      this.activeDriver = true;
    } else {
      this.activeDriver = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
