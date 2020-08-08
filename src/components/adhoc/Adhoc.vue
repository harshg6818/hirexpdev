<template>
  <div class="background-custom-grey adhoc-dashboard">
    <v-layout row wrap align-center>
      <v-flex sm3 pl-4 pt-3>
        <v-text-field
          class="searchField"
          solo
          prepend-icon="fas fa-search"
          v-model="table.searchString"
          @keyup="search(table.searchString)"
          name="search"
          single-line
          :label="`Search campaigns`"
        ></v-text-field>
      </v-flex>

      <v-flex sm9 class="text-xs-right pr-4">
        <v-btn color="primary"
          :to="`${$route.path}/new`"
          small class="ml-0 text-none elevation-0 white--text pa-3"
          >
            <v-icon small class="mr-2">fas fa-plus</v-icon>
            Create campaign
        </v-btn>
      </v-flex>
    </v-layout>

    <!-- Main Dashboard -->
    <v-layout column class="px-4 pb-4" style="min-height:85vh;">
      <!-- Campaigns Tabs -->
      <v-layout row wrap class="mb-0" align-content-start
      v-if="!config.initialLoading && table.totalCount > 0">

        <v-flex xs12 class="mb-3 ml-0">
          <v-layout>

            <v-tabs
              v-model="config.activeTab"
              centered
              grow
              class="custom-tabs background-custom-grey"
            >
              <v-tab
                v-for="(t, ti) in config.tabs"
                :key="ti"
                :href="`#tab-${t.value}`"
                @click="getStages(null, t.value)"
                :class="`reports-tab reports-tab-${t.value}`"
                :id="`tab${ti}`"
                color="transparent"
                hide-slider
              >
                <v-layout row wrap style="background:#fff;">
                  <v-flex xs12>
                    <p class="text-capitalize mb-2" style="font-size:16px;">
                      {{ t.title }}
                    </p>
                  </v-flex>
                  <v-flex xs12>
                    <h1 class="score-card"
                      style="font-size: 40px;font-weight:300;margin: 0 auto;top:-13%;
                      position:relative;"
                    >
                      {{ stages_count[t.value] || 0}}
                    </h1>
                  </v-flex>
                </v-layout>
              </v-tab>
            </v-tabs>
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- No campaigns present -->
      <v-layout row wrap
        v-if="!config.initialLoading && !table.totalItems && !table.searchString" mt-5 pt-2
        align-content-center justify-center>

        <v-flex sm12 px-2>
          <v-card class="elevation-0 text-xs-center" min-height="60vh" style="border:1px solid #4c3e9d;">

            <v-card-title adhoc-title class="justify-center">
              <v-layout row wrap>
                <v-flex xs12>
                  <img :src="getImgUrl('amara_avatar')" class="blank-avatar" alt="">
                  <h2 class="headline">Welcome {{user.company_name}}!</h2>
                  <p class="subheading grey--text">You haven’t created any surveys yet. Create your first survey!</p>
                </v-flex>
              </v-layout>
            </v-card-title>

            <v-card-actions class="justify-center mt-2">
              <v-btn color="primary"
                :to="`${$route.path}/new`"
                large
                class="ml-0 elevation-0 text-none white--text pa-3"
              >
                Create campaign
                <v-icon style="font-size:12px;" small class="ml-3">fas fa-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

      </v-layout>

      <!-- No campaigns present for search query -->
      <v-layout row wrap
        v-if="!config.initialLoading && !table.totalItems && table.searchString" mt-5 pt-2
        align-content-center justify-center>

        <v-flex sm12 px-2>
          <v-card class="elevation-0 text-xs-center" min-height="60vh" style="border:1px solid #4c3e9d;">
            <v-card-title adhoc-title class="justify-center">
              <v-layout row wrap>
                <v-flex xs12>
                  <img :src="getImgUrl('amara_avatar')" class="blank-avatar" alt="">
                  <p>
                    No Campaigns matching the search query
                  </p>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>

      </v-layout>

      <!-- Content Loading Placeholders -->
      <v-layout row wrap class="fill-layout" align-content-start v-if="config.initialLoading">

        <v-flex xs12 class="mb-3">
          <div class="">
            <ContentLoader
              :height="25"
              :width="240"
              :speed="1"
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <rect x="0" y="0" rx="2" ry="2" width="44.8" height="25" />
              <rect x="48" y="0" rx="2" ry="2" width="44.8" height="25" />
              <rect x="96" y="0" rx="2" ry="2" width="44.8" height="25" />
              <rect x="144" y="0" rx="2" ry="2" width="44.8" height="25" />
              <rect x="192" y="0" rx="2" ry="2" width="44.8" height="25" />
            </ContentLoader>
          </div>
        </v-flex>

        <v-flex xs12 class="mb-3">
          <div class="" v-for="i in 5" :key="i">
            <ContentLoader
              :height="32"
              :width="160"
              :speed="1"
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <rect x="0" y="0" rx="2" ry="2" width="160" height="30" />
            </ContentLoader>
          </div>
        </v-flex>
      </v-layout>

      <!-- Campaigns List -->
      <v-layout row wrap class="my-2" align-content-start
      v-if="!config.initialLoading && table.totalItems > 0" >
        <v-flex xs12>
          <v-layout row wrap>
            <!-- <v-flex xs1 class="pl-3 d-inline-flex">
              <v-checkbox color="adhoc" v-model="allSelected" @change="toggleAll($event)"> </v-checkbox> -->

              <!--<v-select
                style="width:100%;margin-left:20px"
                :items="config.bulkActions"
                item-text="title"
                item-value="action"
                label="Apply to selected"
                flat
              >
              </v-select>-->
            <!-- </v-flex> -->

            <!-- <v-flex xs3 class="mt-4 ml-2 adhoc--text d-inline-flex" style="position:relative;left:-30px">
              <v-icon color="adhoc" style="position:relative;top:0px"> fas fa-bullhorn </v-icon>
              <div style="position:relative;left:-5px"> Campaigns ({{this.table.totalItems}}) </div>
              <div class="black--text" style="position:relative;left:-25px">
                <span v-if="this.selectedCampaignsCount > 0"> &nbsp; | &nbsp; ( {{this.selectedCampaignsCount}} selected ) </span>
              </div>
            </v-flex> -->

            <!-- Bulk Actions -->
            <v-flex xs2 v-if="this.selectedCampaignsCount > 0" style="position:relative;top:5px">
              <v-tooltip bottom style="">
                <v-btn color="orange"
                  style="width:40px;border-radius:10%"
                  slot="activator"
                  @click="closeStages()"
                  flat fab
                  small class="ml-0 elevation-0 white--text"
                  >
                  <v-icon small class="ml-2">fas fa-window-close</v-icon>
                </v-btn>
                Close
              </v-tooltip>

              <v-tooltip bottom class="ml-2 mr-2">
                <v-btn color="red"
                  style="width:40px;border-radius:10%"
                  slot="activator"
                  @click="deleteStages()"
                  flat fab
                  small class="ml-0 elevation-0 white--text"
                  >
                  <v-icon small class="ml-0">fas fa-trash-alt</v-icon>
                </v-btn>
                Delete
              </v-tooltip>
            </v-flex>

            <v-spacer> </v-spacer>

          </v-layout>
        </v-flex>

        <v-flex xs12 class=" mb-0 ml-0">
          <div class="px-0 stage-list">
            <div min-height="156" class="elevation-0 px-3 my-2 bg-white campaign-row"
            style="border:1px solid rgb(243, 241, 241); border-radius:6px;"
            v-for="(t, ti) in table.stage" :key="ti">
              <v-layout row wrap class="">
                <v-flex xs1 class="px-2 py-2">
                  <!-- <v-checkbox color="adhoc" v-model="selectedCampaigns[t.id]" @change="updateSelected(t, $event)"> </v-checkbox> -->
                  <div :style="`background-color: ${getColor1(t.status)}`" style="width:65px; border-radius:6px;">
                      <p class="mb-0 bold" style="color:white; font-size:11px; text-transform: uppercase;
                        letter-spacing: 0.4px; text-align:center; padding:20% 0; font-weight:700" >Chat survey</p>
                  </div>
                </v-flex>

                <v-flex class="headline pt-2" xs3>
                  <v-layout class="w-100">
                    <!--<v-flex xs12 style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">-->
                      <p class="mb-0 mr-4 cursor-pointer hover-link" style="font-size: 18px;"
                      @click="viewStage(t)">
                        {{t.title}}
                      </p>

                    <!--</v-flex>-->

                  </v-layout>
                  <span class="caption grey--text">
                    Created on : {{dayjs(t.created_at).format('DD-MM-YYYY')}} |
                    Modified on : {{dayjs(t.last_updated).format('DD-MM-YYYY')}}
                  </span>
                </v-flex>
                <v-flex xs1 class="stages-analysis analysis" style="text-align:center;">
                    <!-- <v-icon small :color="getColor(t.status)" style="font-size:12px">
                        fas fa-circle
                      </v-icon> -->
                      <!-- &nbsp;
                      <div class="stage-status text-muted" :style="`color: ${getColor(t.status)}`">
                        <span v-if="t.status === 'draft'" > Draft </span>
                        <span v-if="t.status === 'active'" > Active </span>
                        <span v-if="t.status === 'completed'" > Completed </span>
                        <span v-if="t.status === 'closed'" > Closed </span>
                      </div> -->
                      <v-chip style="margin-top:23%; height:24px; margin-right:30px;" :color="`${getColor1(t.status)}`" text-color="white">
                        <span v-if="t.status === 'draft'" > Draft </span>
                        <span v-if="t.status === 'active'" > Active </span>
                        <span v-if="t.status === 'completed'" > Completed </span>
                        <span v-if="t.status === 'archived'" > Archived </span>
                      </v-chip>

                    </v-flex>

                <v-flex xs7 class="pl-2">
                  <v-layout row wrap align-center class="pt-3">
                    <v-flex xs3 class="stages-analysis analysis" style="text-align:left; flex-basis:20%;">
                      <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" >{{t.question_count}}</p>
                      <span  class="grey--text caption">Total questions</span>
                    </v-flex>

                    <v-flex xs2 class="stages-analysis analysis" style="text-align:left;">
                      <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-if="t.total_sessions || t.total_sessions === 0">{{t.total_sessions}}</p>
                      <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-else> -- </p>
                      <span class="grey--text caption">
                        Total chats
                      </span>
                    </v-flex>

                    <v-flex xs3 class="stages-analysis analysis" style="text-align:left; flex-basis:22%;">
                      <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-if="t.completed_sessions || t.completed_sessions === 0">{{t.completed_sessions}}</p>
                      <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-else> -- </p>
                      <span class="grey--text caption">
                        Completed chats
                      </span>
                    </v-flex>

                    <v-flex xs3 class="stages-analysis analysis" style="text-align:left; flex-basis:22%;">
                      <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-if="t.participation_rate" > {{Math.ceil(t.participation_rate)}} % </p>
                      <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-else > -- </p>
                      <span class="grey--text caption">
                        Participation rate
                      </span>
                    </v-flex>

                    <!-- <v-flex xs4 text-xs-right>
                      <v-btn color="primary"
                        style="border-radius: 5px"
                        @click="viewStage(t)"
                        small class="ml-0 elevation-0 pl-0 text-capitalize"
                        >
                        <v-icon small class="ml-2">fas fa-chart-bar</v-icon>
                          &nbsp; &nbsp; View Analysis
                      </v-btn>
                    </v-flex> -->

                    <v-flex text-xs-right xs2>
                      <v-menu offset-y>
                        <v-btn
                          slot="activator"
                          color="#383535"
                          dark
                          outline
                        >
                          Actions <v-icon v-if="!dropDown" class="ml-3 grey--text">fas fa-angle-down</v-icon>
                                  <v-icon v-if="dropDown" class="ml-3 grey--text">fas fa-angle-up</v-icon>
                        </v-btn>
                        <v-list>
                          <v-list-tile
                            v-for="(item, index) in config.actions"
                            v-if="item.title !== 'Archived' || (item.title === 'Archived' && (t.status === 'active' || t.status === 'completed'))"
                            :key="index"
                            @click="item.action(t)"
                            :class="item.dialog === 'edit' && t.status !== 'draft'
                            || item.dialog === 'completed' && (t.status == 'draft' || t.status == 'archived' || t.status == 'completed')
                            || item.dialog === 'view' && (t.status == 'draft' || t.status == 'archived')
                            || item.dialog == 'archive' && t.status == 'archived'
                            || item.dialog == 'restore' && t.status !== 'archived'
                            ? 'd-none' : '' "
                          >
                            <v-list-tile-title>
                              <!-- <v-icon class="mr-2">{{item.icon}}</v-icon> -->
                              {{ item.title }}
                            </v-list-tile-title>
                          </v-list-tile>
                        </v-list>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout class="px-1 mb-1 ml-2" style="background:#7b9fe042; border-radius:3px; color:#9e9e9e; max-width: fit-content;">

              <span style="color:#EC6772; font-weight: bold;">Created by : &nbsp; </span> {{t.created_by_name }}  {{t.created_by_email}}
              </v-layout>
            </div>
          </div>
        </v-flex>

        <v-flex xs1> </v-flex>
      </v-layout>

      <!-- Pagination -->
      <v-layout v-if="table.totalItems > 0">
        <v-flex xs1></v-flex>
        <v-flex class="pr-4 mb-0 ml-3" xs10 style="text-align:center">
          <v-pagination
            class="adhoc--text"
            color="adhoc"
            v-model="pagination.page"
            :length="pagination.length"
            :total-visible="7"
            @input="getStages()"
            circle
          ></v-pagination>
        </v-flex>

        <v-flex xs1></v-flex>
      </v-layout>
      <!--<v-layout row wrap v-show="table.totalItems > 0" v-if="$route.path === '/ad-hoc'">-->
    </v-layout>

    <!--<EmployeesList ref="EmployeesList" />-->
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
//   VTooltip,
//   VAlert,
//   VPagination,
//   VChip
// } from 'vuetify';
// import EmployeesList from '../analytics/EmployeesList';
// import $ from 'jquery';

dayjs.extend(relativeTime);

export default {
  name: 'stage',
  components: {
    ContentLoader
    // VCheckbox,
    // VTooltip,
    // VAlert,
    // VPagination,
    // VChip,
    // dayjs
    // EmployeesList,
  },
  data () {
    return {
      dropDown: false,
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      pagination: {
        rowsPerPage: 10,
        page: 1,
        length: 1
      },
      activeStatus: null,
      stages_count: {
        active: 0,
        draft: 0,
        completed: 0,
        closed: 0,
        all: 0
      },
      allSelected: false,
      selectedCampaigns: {},
      table: {
        searchString: '',
        totalCount: 0,
        totalItems: 0,
        loading: true,
        stage: []
      },
      config: {
        filter: false,
        activeTab: 'tab-all',
        panel: [true, true, true],
        initialLoading: true,
        initialLoadingFilters: true,
        tabs: [
          {
            title: 'All',
            value: 'all',
            count: 0
          }, {
            title: 'Active',
            value: 'active',
            count: 0
          }, {
            title: 'Draft',
            value: 'draft',
            count: 0
          }, {
            title: 'Completed',
            value: 'completed',
            count: 0
          }, {
            title: 'Archived',
            value: 'archived',
            count: 0
          }
        ],
        actions: [
          {
            title: 'View Analysis ',
            icon: 'fas fa-chart-bar',
            dialog: 'view',
            action: this.viewStage
          }, {
            title: 'Completed',
            icon: 'fas fa-play',
            dialog: 'completed',
            action: this.completeStage
          }, {
            title: 'Resume',
            icon: 'fas fa-play',
            dialog: 'edit',
            action: this.editStage
          }, {
            title: 'Delete',
            icon: 'fas fa-trash',
            dialog: 'deleteStage',
            action: this.deleteStage
          // }, {
          //   title: 'Duplicate',
          //   icon: 'fas fa-copy',
          //   action: this.duplicateStage,
          // }, {
          //   title: 'Activate',
          //   icon: 'fas fa-check',
          //   dialog: 'edit',
          //   action: this.activateStage,
          }, {
            title: 'Archive',
            icon: 'fas fa-window-close',
            dialog: 'archive',
            action: this.closeStage
          }, {
            title: 'Restore',
            icon: 'fas fa-window-close',
            dialog: 'restore',
            action: this.restoreStage
          }
        ],
        bulkActions: [
          {
            title: 'Delete',
            icon: 'fas fa-trash',
            action: this.deleteStages
          }, {
            title: 'Close',
            icon: 'fas fa-window-close',
            action: this.closeStages
          }
        ],
        toolbarActions: [{
          title: 'Employee Touchpoints',
          icon: 'fas fa-sync',
          link: '',
          condition: false
        }, {
          title: 'Support',
          icon: 'fas fa-life-ring',
          link: '/support-center',
          condition: true
        }, {
          title: 'Settings',
          icon: 'fas fa-cog',
          link: '/settings',
          condition: true
        }, {
          title: 'Logout',
          icon: 'fas fa-power-off',
          condition: true
        }]
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    checkForFilters () {
      let applied = false;
      this.$lodash.each(this.filters.selected, (v) => {
        if (v.length > 0) {
          applied = true;
        }
      });
      return applied;
    },
    selectedCampaignsCount () {
      let count = 0;
      this.$lodash.each(this.selectedCampaigns, (c, i) => {
        if (c) {
          count++;
        }
      });
      return count;
    }
  },
  methods: {
    getColor (status) {
      let color = 'grey';
      if (status === 'draft') {
        color = 'grey';
      } else if (status === 'active') {
        color = '#4caf50';
      } else if (status === 'completed') {
        color = '#4caf50';
      } else if (status === 'archived') {
        color = 'red';
      }
      return color;
    },
    getColor1 (status) {
      let color = 'grey';
      if (status === 'draft') {
        color = 'grey';
      } else if (status === 'active') {
        color = '#432d6f';
      } else if (status === 'completed') {
        color = '#512b66';
      } else if (status === 'archived') {
        color = '#8a3984';
      }
      return color;
    },
    getTabStyle () {
      let style = 'border:2px solid;border-radius:.25rem;border-color:rgb(243, 241, 241)';
      if (status === 'draft') {
        style = 'border:2px solid;border-radius:.25rem;border-color:grey';
        // color = 'grey';
      } else if (status === 'active') {
        style = 'border:2px solid;border-radius:.25rem;border-color:#4caf50';
      } else if (status === 'completed') {
        style = 'border:2px solid;border-radius:.25rem;border-color:#4caf50';
      } else if (status === 'archived') {
        style = 'border:2px solid;border-radius:.25rem;border-color:red';
      }
      return style;
    },
    toggleAll (ev) {
      if (!ev) {
        this.selectedCampaigns = {};
        this.allSelected = false;
      } else {
        this.selectedCampaigns = {};
        this.$lodash.each(this.table.stage, stage => {
          const newCampaign = {
            [stage.id]: stage
          };
          this.selectedCampaigns = {
            ...this.selectedCampaigns,
            ...newCampaign
          };
        });
        this.allSelected = true;
      }
    },
    updateSelected (stage, ev) {
      let temp = JSON.parse(JSON.stringify(this.selectedCampaigns));
      if (ev && !temp[stage.id]) {
        const newStage = {
          [stage.id]: stage
        };
        temp = {
          ...temp,
          ...newStage
        };
      } else if (!ev && this.selectedCampaigns[stage.id]) {
        delete temp[stage.id];
        this.allSelected = false;
      }
      this.selectedCampaigns = temp;
      // this.$store.dispatch('updateSelectedCandidatesWithData', temp);
    },
    getFilterCount (status) {
      let statusCount = 0;
      if (status) {
        this.$lodash.each(this.filters.default.status, v => {
          if (v.status === status) {
            statusCount = v.count;
          }
        });
      } else {
        this.$lodash.each(this.filters.default.status, v => {
          statusCount += v.count;
        });
      }
      return statusCount;
    },
    takeAction (item) {
      if (item.link) {
        this.$router.push(item.link);
      } else {
        if (item.title === 'Employee Touchpoints') {
          if (window.location.host === 'localhost:8080') {
            window.open('http://localhost:8080');
          } else if (window.location.host === 'localhost:8081') {
            window.open('http://localhost:8081');
          } else if (window.location.host === 'app.dev.amara.ai') {
            window.open('https://app.dev.amara.ai');
          } else {
            window.open('https://app.amara.ai');
          }
        } else if (item.title === 'Logout') {
          this.logout();
        }
      }
    },
    logout () {
      axios.post(`${process.env.VUE_APP_ADHOC_API_URL}logout`).then((response) => {
        if (response && response.data.status === 200) {
          this.$store.dispatch('deleteSession');
          this.$router.push('/login');
        } else {
          this.$notify({
            group: 'foo',
            title: 'Error while logging out!',
            type: 'warn'
          });
          this.$store.dispatch('deleteSession');
          this.$router.push('/login');
        }
      }, () => {
        this.$store.dispatch('deleteSession');
        this.$router.push('/login');
      });
    },
    editStage (s) {
      this.$router.push(`${this.$route.path}/edit/${s.id}`);
    },
    deleteStage (s) {
      axios.delete(`${process.env.VUE_APP_ADHOC_API_URL}stage/delete?stage_id=${s.id}`).then((response) => {
        if (response) {
          if (response.status === 204) {
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Campaign deleted successfully!'
            });
            this.getStages();
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to delete campaign, Please try again later!'
            });
          }
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to delete campaign, Please try again later!'
        });
        throw new Error(response);
      });
    },
    duplicateStage (s) {
      const newStageData = JSON.parse(JSON.stringify(s));
      newStageData.status = 'draft';
      delete newStageData.id;
      newStageData.survey_id = newStageData.survey;
      newStageData.triggerDate = dayjs(`${newStageData.triggerDateTime}`).format('YYYY-MM-DD');
      newStageData.triggerTime = dayjs(`${newStageData.triggerDateTime}`).format('HH:mm');
      axios.post(`${process.env.VUE_APP_ADHOC_API_URL}stage/add`, newStageData).then((response) => {
        this.config.savingStage = false;
        if (response && response.data && response.data.Response === 'Success') {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Campaign duplicated successfully!'
          });
          this.getStages();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to duplicate campaign, Please try again later!'
          });
        }
      }, (response) => {
        // this.config.savingStage = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to duplicate campaign, Please try again later!'
        });
        throw new Error(response);
      });
    },
    closeStage (s) {
      axios.post(`${process.env.VUE_APP_ADHOC_API_URL}stage/create`, {
        stage_id: s.id ? s.id : undefined,
        summary: {
          status: 'archived'
        }
      }).then((response) => {
        // this.config.savingStage = false;
        if (response && response.data && response.status === 200) {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Campaign closed successfully!'
          });
          this.getStages();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to close campaign, Please try again later!'
          });
        }
      }, (response) => {
        // this.config.savingStage = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to close campaign, Please try again later!'
        });
        throw new Error(response);
      });
    },
    completeStage (s) {
      axios.post(`${process.env.VUE_APP_ADHOC_API_URL}stage/create`, {
        stage_id: s.id ? s.id : undefined,
        summary: {
          status: 'completed'
        }
      }).then((response) => {
        // this.config.savingStage = false;
        if (response && response.data && response.status === 200) {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Campaign completed successfully!'
          });
          this.getStages();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to complete campaign, Please try again later!'
          });
        }
      }, (response) => {
        // this.config.savingStage = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to complete campaign, Please try again later!'
        });
        throw new Error(response);
      });
    },
    restoreStage (s) {
      axios.post(`${process.env.VUE_APP_ADHOC_API_URL}stage/create`, {
        stage_id: s.id ? s.id : undefined,
        summary: {
          status: 'active'
        }
      }).then((response) => {
        // this.config.savingStage = false;
        if (response && response.data && response.status === 200) {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Campaign active successfully!'
          });
          this.getStages();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to active campaign, Please try again later!'
          });
        }
      }, (response) => {
        // this.config.savingStage = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to active campaign, Please try again later!'
        });
        throw new Error(response);
      });
    },
    closeStages () {
      // axios.post(`${process.env.VUE_APP_ADHOC_API_URL}stage/create`, {
      //   'stage_id': s.id ? s.id : undefined,
      //   'summary' : {
      //     'status': 'closed',
      //   }
      // }).then((response) => {
      //   // this.config.savingStage = false;
      //   if (response && response.data && response.status === 200) {
      //     this.$store.dispatch('updateSnackbar', {
      //       color: 'success',
      //       show: true,
      //       text: 'Campaign closed successfully!',
      //     });
      //     this.getStages();
      //   } else {
      //     this.$store.dispatch('updateSnackbar', {
      //       color: 'error',
      //       show: true,
      //       text: 'Unable to close campaign, Please try again later!',
      //     });
      //   }
      // }, (response) => {
      //   // this.config.savingStage = false;
      //   this.$store.dispatch('updateSnackbar', {
      //     color: 'error',
      //     show: true,
      //     text: 'Unable to close campaign, Please try again later!',
      //   });
      //   throw new Error(response);
      // });
    },
    deleteStages () {
      // axios.delete(`${process.env.VUE_APP_ADHOC_API_URL}stage/delete?stage_id=${s.id}`).then((response) => {
      //   if (response) {
      //     if (response.status === 204) {
      //       this.$store.dispatch('updateSnackbar', {
      //         color: 'success',
      //         show: true,
      //         text: 'Campaign deleted successfully!',
      //       });
      //       this.getStages();
      //     } else {
      //       this.$store.dispatch('updateSnackbar', {
      //         color: 'error',
      //         show: true,
      //         text: 'Unable to delete campaign, Please try again later!',
      //       });
      //     }
      //   }
      // }, (response) => {
      //   this.$store.dispatch('updateSnackbar', {
      //     color: 'error',
      //     show: true,
      //     text: 'Unable to delete campaign, Please try again later!',
      //   });
      //   throw new Error(response);
      // });
    },
    triggerTimeAuto (s) {
      const final = {
        timeIn: '',
        timeRef: s.triggerTimeReference.replace('_', ' ')
      };
      if (s.triggerTimeIn === '-') {
        final.timeIn = 'before';
      } else {
        final.timeIn = 'after';
      }

      return `${s.triggerTimeDuration} ${s.triggerTimeUnit} ${final.timeIn} ${final.timeRef}`;
    },
    // openDialog(filters, title, sessions) {
    //   if (!this.activeDriver) {
    //     this.$refs.EmployeesList.config.initialLoading = true;
    //     this.$refs.EmployeesList.open = true;
    //     this.$refs.EmployeesList.filters = filters;
    //     this.$refs.EmployeesList.sessions = sessions || false;
    //     this.$refs.EmployeesList.getEmployees();
    //     this.$refs.EmployeesList.title = title;
    //   }
    // },
    // openDialog(data, type) {
    //   if (type && this.$refs[type]) {
    //     this.$refs[type].open = true;
    //     this.$refs[type].stage = data;
    //   }
    // },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    getLogoUrl (pet) {
      const images = require.context('@/assets/logo', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    search (string) {
      clearTimeout(this.timeout);
      // Make a new timeout set to go off in 800ms
      this.timeout = setTimeout(() => {
        // console.log(string);
        this.getStages(string);
      }, 500);
    },
    viewStage (s) {
      this.$router.push(`${this.$route.path}/view/${s.id}`);
    },
    getName (key) {
      let name;
      switch (key) {
        case 'createdBy__email':
          name = 'Created By';
          break;

        case 'stageType':
          name = 'Type of Stage';
          break;

        case 'survey__title':
          name = 'Survey Title';
          break;

        default:
          name = key.charAt(0).toUpperCase() + key.slice(1);
      }
      return name;
    },
    getStages (searchString, status) {
      if (status && status !== 'all') {
        this.activeStatus = status;
      } else if (status === 'all') {
        this.activeStatus = undefined;
      }
      this.config.initialLoading = true;
      const queryParams = {
        count: 'true',
        page_limit: this.pagination.rowsPerPage,
        page_offset: this.pagination.page || 1,
        raw_search_string: searchString,
        // stageType__in: this.$route.path === '/lifecycle' ? 'lifecycle' : 'adhoc',
        // stageType__in: 'adhoc',
        status__in: this.activeStatus ? this.activeStatus : undefined
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`${k}__in`] = v.join();
        }
      });
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}stage/list`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data && response.data.data) {
          this.stages_count = response.data.data.count;
          this.stages_count.all = response.data.data.count && response.data.data.count.total ? response.data.data.count.total : 0;
          this.table.stage = response.data.data.stages;
          this.table.totalCount = response.data.data.count && response.data.data.count.total ? response.data.data.count.total : 0;
          this.table.totalItems = response.data.data.total;
          this.pagination.length = Math.ceil(this.table.totalItems / this.pagination.rowsPerPage);
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to fetch campaigns, Please try again later!'
          });
          throw new Error(response);
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch campaigns, Please try again later!'
        });
        throw new Error(response);
      });
    },
    triggerUpdate () {
      this.getStages();
    },
    resetFilters () {
      this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
      this.getStages();
    },
    getAvatar (c) {
      const avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      return avt.toUpperCase();
    },
    getRandomColor () {
      const colors = [
        'pink',
        'purple',
        'deep-purple',
        'indigo',
        'light-blue',
        'cyan',
        'green',
        'light-green',
        'lime',
        'deep-orange',
        'brown',
        'blue'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    getFilters () {
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}stage/filters`).then((response) => {
        if (response && response.data && response.data.queryset_filters_options) {
          this.config.initialLoadingFilters = false;
          this.filters.default = response.data.queryset_filters_options;

          const defaultFilters = {};
          this.$lodash.each(this.filters.default, (v, k) => {
            defaultFilters[k] = [];
          });

          if (Object.keys(this.filters.selected).length === 0) {
            this.filters.selected = defaultFilters;
            this.filters.main = JSON.parse(JSON.stringify(defaultFilters));
          }
        }
      });
    },
    update () {}
  },
  watch: {
    // pagination: {
    //   handler() {
    //     if (!this.config.initialLoading) {
    //       this.getStages();
    //     }
    //   },
    //   deep: true,
    // },
  },
  mounted () {
    this.config.initialLoading = true;
    if (this.$route && this.$route.query && Object.keys(this.$route.query).length > 0) {
      const temp = {};
      this.$lodash.each(this.$route.query, (value, key) => {
        temp[key] = [];
        if (typeof value === 'object') {
          temp[key] = temp[key].concat(value);
        } else {
          temp[key].push(value);
        }
      });
      this.filters.selected = temp;
    }
    this.getFilters();
    this.getStages();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hover-link:hover {
  color:#4c3e9d !important
}
</style>

<style lang="scss">
.actions-card {
  border: 1px solid lightgrey;
  text-align: center;
}
.adhoc-headline {
  font-size: 80px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 0px;
}
.adhoc-headline-title {
  font-size: 30px;
  text-align: center;
  font-weight: 400;
  margin-top: 0px;
  margin-bottom: 10px;
}
.adhoc-sub-headline {
  font-size: 18px;
  // text-align: center;
  display: inline-flex;
  padding: 0 20%;
  width: 100%;
  font-weight: 400;
  padding-top: 5px;
  &:hover {
    background-color:#e8e7e7!important;
  }
}
.adhoc-overview {
  height:645px;
  // position:relative;
  // top:10%;
  padding:0 40px;
  border-radius: 8px;
  border: 1px solid lightgrey;
}
.stage-list {
  max-height:unset!important;
  overflow-y:auto!important;
}
.stage-status {
  font-size: 12px;
}
.card-overview-status {
  font-weight: 400!important;
}
.tab-heading {
  width: 100% !important;
  margin-top:8px !important;
  margin-bottom: 20px!important;
  text-align: center!important;
  font-weight: 500!important;
}
.tab-subheading {
  width: 100% !important;
  color: grey !important;
  text-align: center!important;
  font-weight: 500!important;
  font-size: 40px!important;
}
.card-overview {
  margin: 0 20px;
  width: 18%;
  &.first {
    margin-left: 0px;
  }
  &.last {
    margin-right: 0px;
  }
  &.active {
    border-color:#4c3e9d;
  }
}
</style>
