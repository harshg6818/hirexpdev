<template>
  <v-dialog
    v-model="dialogs.listEmployee"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title class="font-weight-bold" style="z-index:3">
        <v-layout row wrap>
          <v-flex xs9>
            <h3 class="mt-2 text-capitalize" v-if="sentimentEnabled"> Insights </h3>
            <h3 class="mt-2 text-capitalize" v-else> Employees </h3>
          </v-flex>
          <v-flex xs3 text-xs-right>
            <v-btn color="rgba(0,0,0,0.54)"
              slot="activator"
              small
              icon
              :disabled="config.loading"
              :loading="config.loading"
              flat
              @click="hideModal()"
              >
              <v-icon>fas fa-times </v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text class="overflow- pt-0">

        <!-- Dashboard Employee List -->
        <v-tabs
        ref="tabs"
        class="custom-dashboard-tabs"
        :class="tabs.active === 'tab-employee-list' ? 'employee-list-active' : ''"
        grow
        v-model="tabs.active"
        centered
        color="transparent"
        slider-color="primary"
        >
        <v-tab
            class="mr-2"
            v-for="(t, ti) in tabs.list"
            v-show="sentimentEnabled"
            :key="ti"
            :href="`#tab-${t.value}`"
            @click="addRef(t.value)"
        >
            <span v-if="ti === 0"> </span>
            {{t.title}}
            <strong class="ml-2" v-if="t.count">
            {{t.count ? '('+t.count+')' : ''}}
            </strong>
            <v-tooltip max-width="200" bottom v-show="t.about" class="ml-2">
            <v-icon
            slot="activator"
            >fas fa-info-circle</v-icon>
            {{t.about}}
            </v-tooltip>
        </v-tab>

        <v-tabs-items v-model="tabs.active" class="background-custom-grey" :class="{
            'b-top': tabs.active !== 'tab-employee-list',
            'hide-tabs': !sentimentEnabled,
            'show-tabs': sentimentEnabled,
            }">

          <v-tab-item value="tab-employee-list">
            <!-- Before intial loading -->
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
              v-show="!config.initialLoading && table.team.length > 0"
              style="z-index:2"
              :headers="table.headers"
              :items="table.team"
              :pagination.sync="pagination"
              :total-items="table.totalItems"
              :loading="table.loading"
              id="employee-list"
            >
                <template slot="headers" slot-scope="props">
                  <tr>
                    <th style="text-align:left"
                      v-for="header in props.headers"
                      :key="header.text"
                    >
                    <strong>
                      <span v-if="header.text === 'Last Touchpoint' && $route.name === 'ViewLifecycle'"> Touchpoint </span>
                      <span v-else> {{ header.text }} </span>
                    </strong>
                    </th>
                  </tr>
                </template>

                <template slot="items" slot-scope="props">
                  <tr v-if="props.item">
                    <td style="width:17%">
                      <v-layout row wrap align-center>
                          <!-- <v-flex class="py-2" sm3>
                          <v-avatar size="30px" :color="getColor(props.item)">
                              <img src="src" alt="alt" v-show="false">
                              <span class="white--text">{{getAvatar(props.item)}}</span>
                          </v-avatar>
                          </v-flex> -->
                          <v-flex>
                          <p class="mb-0" v-show="props.item.user_display_name || props.item.display_name">
                              <strong :class="{'hover-link cursor-pointer': $route.name !== 'ViewAdhoc'}"
                              @click="viewEmployee(props.item);">
                              {{ props.item.user_display_name || props.item.display_name }}
                              </strong>
                          </p>
                          <small class="text-truncate" style=" display: inline-block;">
                              {{props.item.email || props.item.user__email || props.item.user_email}}
                          </small>
                          </v-flex>
                      </v-layout>
                    </td>
                    <td style="width:16%">
                      <div v-if="props.item.stage_title || props.item.last_milestone">
                        <p class="mb-0">
                          {{props.item.stage_title || props.item.stage__title || props.item.last_milestone}}
                        </p>
                        <p class="mb-0" v-if="(props.item.completedAt && props.item.completedAt !== 'None') || (props.item.last_milestone_completed && props.item.last_milestone_completed !== 'None')">
                          {{ dayjs(props.item.completedAt).from() || dayjs(props.item.last_milestone_completed).from() }}
                        </p>
                      </div>
                      <p class="mb-0" v-else>
                        -
                      </p>
                    </td>
                    <td style="width:16%">
                      <p class="mb-0" v-if="props.item.user_department || props.item.department">
                          {{ props.item.user_department || props.item.department }}
                      </p>
                      <p class="mb-0" v-else>
                          -
                      </p>
                    </td>
                    <td style="width:16%">
                      <p class="mb-0" v-if="props.item.user_location || props.item.location">
                          {{ props.item.user_location || props.item.location }}
                      </p>
                      <p class="mb-0" v-else>
                          -
                      </p>
                    </td>

                    <td style="width:16%">
                      <!-- View Chat -->
                      <!-- <v-tooltip
                          v-if="!activeDriver"
                          bottom
                      >
                          <v-btn color="rgba(0,0,0,0.54)"
                          slot="activator"
                          small
                          flat
                          icon
                          @click="props.expanded = !props.expanded;setInfo(props.item, props);"
                          >
                          <v-icon small>fas fa-comments</v-icon>
                          </v-btn>
                          Chat Transcript
                      </v-tooltip>

                      <v-tooltip
                          v-if="props.item.status === 'completed'"
                          bottom
                      >
                          <v-btn color="rgba(0,0,0,0.54)"
                          slot="activator"
                          small
                          icon
                          :disabled="config.loading"
                          :loading="config.loading"
                          flat
                          @click="openDialog(props.item,'AddComment')"
                          >
                          <v-icon>fas fa-comment-alt</v-icon>
                          </v-btn>
                          Add a comment
                      </v-tooltip> -->

                      <a style="color:rgba(0,0,0,0.54)" @click.stop="viewEmployee(props.item);"> View details </a>
                    </td>
                  </tr>
                </template>
                <!-- <template slot="expand" slot-scope="props"> -->
                <template slot="expand" slot-scope>
                  <div class="secondary px-4 py-2">
                    <span v-show="!table.loadingInfo">
                    <QuickView ref="QuickView" />
                    </span>
                    <v-progress-linear v-if="table.loadingInfo"
                    :indeterminate="true"></v-progress-linear>
                  </div>
                </template>
                <!--<v-card slot="no-data" class="elevation-0 text-xs-center" min-height="60vh">
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
                </v-card>-->
                <v-alert slot="no-data" :value="true" color="#fff" outline>
                  <span>
                    <div style="height:300px">
                    <v-layout row wrap align-center justify-center fill-height>
                        <v-flex text-xs-center>
                        <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                        </strong>
                        </v-flex>
                    </v-layout>
                    </div>
                  </span>
                </v-alert>
            </v-data-table>
          </v-tab-item>

          <v-tab-item value="tab-sentiment-analysis" v-if="tabs.active === 'tab-sentiment-analysis'">
            <sentimentAnalysis ref="sentimentAnalysis" containerId="2"> </sentimentAnalysis>
          </v-tab-item>
        </v-tabs-items>
        </v-tabs>

      </v-card-text>
      <v-card-actions align-content-space->
        <v-flex>
          <v-btn color="error" flat @click="hideModal()">Close</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
    <OneOnOne ref="oneOnOne" />
    <AddComment ref="AddComment" />
  </v-dialog>
</template>

<script>
/* eslint-disable max-len */
import { mapState } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import Anychart from 'anychart';
// import VueAnychart from '../analytics/VueAnychart.vue';
// import sentimentAnalysis from './sentimentAnalysis';
// import {
//   VCheckbox,
//   VAvatar,
//   VTooltip,
//   VAlert,
//   VProgressLinear,
//   VChip,
//   VBadge
// } from 'vuetify';
import QuickView from '../elements/QuickView';
import OneOnOne from '../employees/dialogs/OneOnOne';
import AddComment from '../elements/AddComment';

dayjs.extend(relativeTime);

export default {
  name: 'team',
  components: {
    QuickView,
    AddComment,
    OneOnOne,
    ContentLoader
    // VCheckbox,
    // VAvatar,
    // VTooltip,
    // VAlert,
    // dayjs,
    // VChip,
    // VBadge,
    // VProgressLinear,
    // VueAnychart,
    // sentimentAnalysis
  },
  data () {
    return {
      activeDriver: false,
      dialogs: {
        listEmployee: false
      },
      pagination: {
        rowsPerPage: 10,
        page: 1,
        length: 1
      },
      dateRangeOptions: {},
      filters: {},
      filterData: {},
      employeeListUrl: '',
      table: {
        totalItems: 0,
        searchString: '',
        extraInfo: [],
        loadingInfo: true,
        loading: false,
        team: [],
        headers: [{
          text: 'Employee Details',
          align: 'left',
          sortable: false,
          width: '1%'
        }, {
          text: 'Last Touchpoint',
          align: 'left',
          sortable: false
        }, {
          text: 'Department',
          align: 'left',
          sortable: false
        // }, {
        //   text: 'Employee Vibe',
        //   align: 'left',
        //   sortable: false,
        }, {
          text: 'Location',
          align: 'left',
          sortable: false
        }, {
          text: 'Actions',
          align: 'left',
          sortable: false
        // },  {
        //   text: 'View more',
        //   align: 'left',
        //   sortable: false,
        }]
      },
      sentimentEnabled: true,
      tabs: {
        active: 'tab-employee-list',
        list: [
          {
            title: 'Employees',
            value: 'employee-list'
          }, {
            title: 'Sentiment Analysis',
            value: 'sentiment-analysis',
            about: '',
            count: 0
          }
        ]
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
      user: state => state.user,
      dashboardFilters: state => state.dashboardFilters
    })
  },
  methods: {
    addRef (val) {
      // this.$router.push({ query: {activeTab: val}});
      switch (val) {
        case 'sentiment-analysis':
          setTimeout(() => {
            this.$refs.sentimentAnalysis.analysisEnabled = false;
            this.$refs.sentimentAnalysis.analysisTab = false;
            this.$refs.sentimentAnalysis.sentimentTab = true;
            this.$refs.sentimentAnalysis.report = { question_analysis: {} };
            // this.$refs.sentimentAnalysis.dialogs.sentimentAnalysis = true;
            this.$refs.sentimentAnalysis.employeeFilters = this.filterData;
            this.$refs.sentimentAnalysis.generateWordCloud();
            // this.$refs.sentimentAnalysis.getResponses();
          }, 100);
          break;
        case 'employee-list':
          // this.getEmployeesToMeet(this.employeeFilters, this.employeeListUrl);
        // eslint-disable-next-line no-fallthrough
        default:
      }
    },
    hideModal () {
      this.tabs.active = 'tab-employee-list';
      this.dialogs.listEmployee = false;
      this.filters = {};
    },
    getEmployeesToMeet (employeeFilters, url) {
      // console.log('this.dashboardFilters', this.dashboardFilters);
      this.config.initialLoading = true;

      let fields = '';
      if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
        this.filters.selected = this.dashboardFilters.filters;
        this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
      }
      let queryParams = {
        initiated_date_start: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
        user__profile__high_potential_emp: this.dashboardFilters.highPotential
      };
      if (!url) {
        this.employeeListUrl = null;
        url = `${process.env.VUE_APP_API_URL}users/list`;
        fields = 'display_name,email,id,user_mood,stage__title,last_triggered_stage,interactions_active,department,location,last_milestone,last_milestone_completedAt';
        this.$lodash.each(this.filters.selected, (v, k) => {
          if (v.length > 0) {
            queryParams[`${k}__in`] = v.join();
          }
        });
      } else {
        this.employeeListUrl = url;
        url = `${process.env.VUE_APP_API_URL}${url}`;
        fields = 'user_profile_id,user_email,user_display_name,user_department,user_location,stage_title,overall_mood,completedAt';
        this.$lodash.each(this.filters.selected, (v, k) => {
          if (v.length > 0) {
            queryParams[`user__profile__${k}__in`] = v.join();
          }
        });
      }
      this.employeeFilters = employeeFilters;
      let temp = {
        count: 'true',
        page_limit: this.pagination.rowsPerPage,
        page_offset: this.pagination.page || 1,
        fields: fields
      };
      temp = {
        ...temp,
        ...employeeFilters
      };
      queryParams = {
        ...queryParams,
        ...temp
      };
      axios.get(url, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          if (response.data.data) {
            this.table.team = response.data.data;

            const actionMenu = {};
            this.$lodash.each(response.data.data, (v) => {
              actionMenu[v.id] = false;
            });
            this.config.actionMenu = actionMenu;

            this.table.totalItems = response.data.total_count;
            this.config.initialLoading = false;
          }
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch details, Please try again later!'
        });
        throw new Error(response);
      });
    },
    updateStatus (s, newStatus) {
      this.config.loading = true;
      axios.patch(`${process.env.VUE_APP_API_URL}session/update/${s.id}`, {
        action_status: newStatus
      }).then((response) => {
        this.config.loading = false;
        if (response && response.data) {
          s.action_status = newStatus;
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee status updated!'
          });
          this.getEmployeesToMeet(this.employeeFilters, this.employeeListUrl);
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
    viewEmployee (s) {
      if (this.$route.name !== 'ViewAdhoc') {
        this.$router.push({
          path: '/employees',
          query: {
            search: s.display_name || s.user_display_name,
            eID: s.user_profile_id || s.id
          }
        });
      }
    },
    getAvatar (c) {
      let name = '';
      if (c.user_display_name) {
        name = c.user_display_name.split(' ');
      } else {
        name = c.user__display_name.split(' ');
      }
      const avt = `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
      return avt.toUpperCase();
    }
  },
  watch: {
    pagination: {
      handler () {
        if (!this.config.initialLoading && this.dialogs.listEmployee) {
          this.getEmployeesToMeet(this.employeeFilters, this.employeeListUrl);
        }
      },
      deep: true
    }
  }
};

</script>

<style lang="scss" scoped>
.hide-tabs {
  position: relative!important;
  top: -50px!important;
}
.show-tabs {
  position: relative!important;
  top: 0px!important;
}
</style>
