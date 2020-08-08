<template>
  <div class="">
    <v-layout column class="bg-gradient py-0 pl-1">
      <v-layout row wrap align-center style="border-bottom: 1px solid rgb(243, 241, 241);z-index:3;max-height:70px">

        <v-flex sm6 class="white--text" xs4 pl-4 style="">
          <v-text-field
            append-icon="fas fa-search"
            v-model="table.searchString"
            @keyup="search(table.searchString)"
            name="search"
            single-line
            label="Search"
          ></v-text-field>
        </v-flex>

        <v-flex xs6 style="position:relative;" class="black--text" text-xs-right>
          <v-btn v-if="!config.initialLoading"  color="primary"
                :to="`lifecycle/new`"
                class="elevation-0"
                >
                <span v-show="$route.name === 'settings'">
                  Add touchpoint
                </span>
                <v-icon small class="ml-2 mr-2">fas fa-plus</v-icon> Add touchpoint
              </v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap style="z-index:2"
      v-if="!config.initialLoading && stages.length === 0 && !table.searchString" mt-5 pt-2
      align-content-center justify-center>
        <v-flex sm12 px-2>
          <v-card style="border:none;" class="elevation-0 text-xs-center" min-height="60vh">
            <v-card-title primary-title class="justify-center">
              <v-layout row wrap>
                <v-flex xs12>
                  <img :src="getImgUrl('amara_avatar')" class="blank-avatar" alt="">
                  <p>
                    No Critical touchpoints created
                  </p>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-actions class="justify-center mt-4">

            </v-card-actions>
            <v-card-text>
              <h2>

                <span v-show="$route.path === '/lifecycle'">
                  Touchpoint
                </span>
              </h2>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- Before Initial Loading -->
      <div class="" v-show="config.initialLoading" style="z-index:2">
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

      <!--<v-timeline class="mt-2 stage-list" v-show="!config.initialLoading && stages.length > 0" style="z-index:2">
        <v-slide-y-transition group mode="out-in">
          <v-timeline-item
            class="lifecycle-stages"
            v-for="(item, i) in stages"
            :color="item.stage_details.color"
            :key="`timeline-element-${i}`"
            small
            :dot="1"
          >
            <span
              slot="opposite"
              :class="`headline font-weight-bold red--text`"
            >
              <v-tooltip bottom max-width="200">
                <v-btn
                  v-if="i !== 0"
                  slot="activator"
                  color="primary"
                  outline
                  @click="switchElement(i, 'up')"
                  icon
                  class="elevation-0"
                >
                  <v-icon>fas fa-angle-up</v-icon>
                </v-btn>
                Move this touchpoint up
              </v-tooltip>
              <v-tooltip bottom max-width="200">
                <v-btn
                  v-if="i !== (stages.length - 1)"
                  slot="activator"
                  color="primary"
                  outline
                  @click="switchElement(i, 'down')"
                  icon
                  class="elevation-0"
                >
                  <v-icon>fas fa-angle-down</v-icon>
                </v-btn>
                Move this touchpoint down
              </v-tooltip>
              <v-tooltip bottom max-width="200">
                <v-btn
                  slot="activator"
                  color="primary"
                  @click="createLifecycle()"
                  :to="`/lifecycle/new?addAt=${i+1}`"
                  outline
                  class="elevation-0"
                >
                  Add touchpoint <v-icon small class="ml-2">fas fa-plus</v-icon>
                </v-btn>
                Add touchpoint below
              </v-tooltip>
            </span>

            <v-card
              :color="item.stage_details.color"
            >
              <v-card-title class="grey lighten-2">
                <v-layout row wrap>
                  <v-flex class="hover-link cursor-pointer" @click="viewStage(item.stage_details)">
                    <p class="mb-0 w-100 title grey lighten-2">
                      {{item.stage_details.title}}
                    </p>
                    {{triggerTimeAuto(item.stage_details)}}
                  </v-flex>
                  <v-flex class="text-sm-right" @click="editStage(item.stage_details)">
                    <v-btn color="primary" class="ma-0" flat icon>
                      <v-icon color="primary">fas fa-edit</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text class="white text--primary">
                <v-layout row wrap>
                  <v-flex xs3 class="b-right">
                    <p class="mb-0 font-weight-bold">Average mood</p>
                    <v-tooltip bottom v-if="item.stage_details.average_mood">
                      <v-layout slot="activator" row wrap align-center justify-center>
                        <v-flex class="mood-width" xs4>
                          <p class="font-weight-bold mb-0">
                            <img
                            height="30"
                            :src="getImgUrl(`${item.stage_details.average_mood}`)">
                          </p>
                        </v-flex>
                        <v-flex>
                          <span class="headline grey--text">{{getCurrentMood(item.stage_details.average_mood)}}</span>
                        </v-flex>
                      </v-layout>
                      Average vibe for this stage
                    </v-tooltip>
                    <span v-if="!item.stage_details.average_mood" class="font-weight-bold grey--text mt-2">
                      Not enough data to analyse vibe
                    </span>
                  </v-flex>
                  <v-flex xs9>
                    <p class="mb-0 font-weight-bold pl-3">Participation</p>
                    <v-layout row wrap align-content-end class="text-xs-center">
                      <v-flex xs4 class="stages-analysis-block c-primary" @click="openDialog({
                        stage__stageType__in: 'lifecycle',
                        stage__id: item.stage_details.id,
                      }, 'Total chats', true)">
                        <p class="mb-0 font-weight-bold mt-1" v-if="item.stage_details.total_sessions">{{item.stage_details.total_sessions}}</p>
                        <p class="mb-0 font-weight-bold mt-1" v-else> 0 </p>
                        <span class="grey--text">
                          Total Chats
                        </span>
                      </v-flex>
                      <v-flex xs4 class="stages-analysis-block c-info" @click="openDialog({
                        status__in: 'inProgress',
                        stage__stageType__in: 'lifecycle',
                        stage__id: item.stage_details.id,
                      }, 'Completed chats', true)">
                        <p class="mb-0 font-weight-bold mt-1" v-if="item.stage_details.pending_sessions">{{item.stage_details.pending_sessions}}</p>
                        <p class="mb-0 font-weight-bold mt-1" v-else> 0 </p>
                        <span class="grey--text">
                          In Progress Chats
                        </span>
                      </v-flex>
                      <v-flex xs4 class="stages-analysis-block c-success" @click="openDialog({
                        status__in: 'completed,closed',
                        stage__stageType__in: 'lifecycle',
                        stage__id: item.stage_details.id,
                      }, 'Completed chats', true)">
                        <p class="mb-0 font-weight-bold mt-1" v-if="item.stage_details.completed_sessions">{{item.stage_details.completed_sessions}}</p>
                        <p class="mb-0 font-weight-bold mt-1" v-else> 0 </p>
                        <span class="grey--text">
                          Completed Chats
                        </span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-slide-y-transition>
      </v-timeline>-->

      <v-data-table
        v-show="!config.initialLoading && stages.length > 0" style="z-index:2"
        :headers="headers"
        :items="stages"
        :total-items="totalItems"
        :loading="table.loading"
        :pagination.sync="pagination"
        class=""
      >
        <template slot="headers" slot-scope="props">
          <tr style="border-color:#f3f1f1">
            <th class="px-2 text-xs-left sub-heading"
              :style="`border-right:1px solid #f3f1f1;word-break: break-all; color:rgba(0,0,0,0.54);`"
              v-for="header in props.headers"
              :key="header.text"
            >
              {{ header.text }}
            </th>
          </tr>
        </template>

        <template slot="items" slot-scope="props">
          <!--<v-card>-->
            <tr class="card mb-2" style="border-top:1px solid #f3f1f1;">
              <td class="px-2" style="`border-right:1px solid #f3f1f1;width:5%;font-size:13px !important;`">
                <p class="mb-0">
                    {{ props.item.index + 1 }}
                </p>
              </td>

              <td class="px-2" style="`border-right:1px solid #f3f1f1;width:30%;font-size:13px !important;`">
                <p class="mb-0">
                    {{ props.item.stage_details.title }}
                </p>
              </td>

              <td class="px-2" :style="`border-right:1px solid #f3f1f1;width:20%;font-size:13px !important;`">
                <p class="mb-0">
                  {{ triggerTimeAuto(props.item.stage_details) }}
                </p>
              </td>

              <td class="px-2" style="`border-right:1px solid #f3f1f1;width:15%;font-size:13px !important;`">
                <v-chip class="mb-0 text-capitalize">
                    {{ props.item.stage_details.status }}
                </v-chip>
              </td>

              <td class="px-2" style="`border-right:1px solid #f3f1f1;width:15%;font-size:13px !important;`">
                <p class="mb-0" v-if="props.item.stage_details.chatFromUser">
                    {{ getUserName(props.item.stage_details.chatFromUser) }}
                </p>
                <p class="mb-0" v-else>
                  -
                </p>
              </td>

              <td class="px-2" :style="`border-right:1px solid #f3f1f1;width:15%;font-size:13px !important;`">
                <v-btn color="primary" class="ma-0" flat icon @click="editStage(props.item.stage_details)">
                  <v-icon color="primary">fas fa-edit</v-icon>
                </v-btn>
              </td>
            </tr>
        </template>
      </v-data-table>
    </v-layout>
    <DeleteStage ref="deleteStage" />
    <EmployeesList ref="EmployeesList" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import dayjs from 'dayjs';
import { ContentLoader } from 'vue-content-loader';
import relativeTime from 'dayjs/plugin/relativeTime';
// import {
//   VCheckbox,
//   VTooltip,
//   VAlert,
//   VChip,
// } from 'vuetify';
import DeleteStage from './dialogs/DeleteStage';
import EmployeesList from '../analytics/EmployeesList';

dayjs.extend(relativeTime);

export default {
  name: 'stage',
  components: {
    ContentLoader,
    // VCheckbox,
    // VTooltip,
    // VAlert,
    // VChip,
    DeleteStage,
    EmployeesList
    // dayjs
  },
  data () {
    return {
      totalItems: 0,
      table: {
        searchString: ''
      },
      headers: [{
        text: 'S. No.'
      }, {
        text: 'Milestone'
      }, {
        text: 'Trigger Time'
      }, {
        text: 'Status'
      }, {
        text: 'Chat from User'
      }, {
        text: 'Actions'
      }],
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
      stages: [],
      config: {
        filter: false,
        activeTab: 'tab-automated',
        panel: [false, false, false],
        initialLoading: true,
        initialLoadingFilters: true,
        actions: [
          {
          //   title: 'Duplicate',
          //   icon: 'fas fa-copy',
          //   action: this.duplicateStage,
          // }, {
            title: 'Edit',
            icon: 'fas fa-edit',
            dialog: 'edit',
            action: this.editStage
          // }, {
          //   title: 'Delete',
          //   icon: 'fas fa-trash',
          //   dialog: 'deleteStage',
          //   action: this.openDialog,
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      adminUsers (state) {
        const adminUsers = state.companyAdminsList;
        return adminUsers;
      }
    }),
    checkForFilters () {
      let applied = false;
      this.$lodash.each(this.filters.selected, (v) => {
        if (v.length > 0) {
          applied = true;
        }
      });
      return applied;
    }
  },
  methods: {
    openDialog (filters, title, sessions) {
      if (!this.activeDriver) {
        this.$refs.EmployeesList.config.initialLoading = true;
        this.$refs.EmployeesList.open = true;
        this.$refs.EmployeesList.filters = filters;
        this.$refs.EmployeesList.sessions = sessions || false;
        this.$refs.EmployeesList.getEmployees();
        this.$refs.EmployeesList.title = title;
      }
    },
    getUserName (chatFromUser) {
      let admin = '';
      this.$lodash.each(this.adminUsers, (v, k) => {
        if (v.user_id === chatFromUser) {
          admin = v.display_name;
        }
      });
      return admin;
    },
    createLifecycle () {
      const order = [];
      this.$lodash.each(this.stages, (s) => {
        order.push(s.stage_details.id);
      });
      this.$store.dispatch('updateStages', order);
    },
    switchElement (index, state) {
      const stages = JSON.parse(JSON.stringify(this.stages));
      const temp = stages[index];
      let index2 = 0;
      if (state === 'up') {
        index2 = index - 1;
      } else {
        index2 = index + 1;
      }
      stages[index] = stages[index2];
      stages[index2] = temp;
      this.stages = stages;
      this.saveOrder();
    },
    saveOrder () {
      const order = [];
      this.$lodash.each(this.stages, (s) => {
        order.push(s.stage_details.id);
      });
      axios.patch(`${process.env.VUE_APP_API_URL}stage/update_stage_timeline`, { stage_timeline: order })
        .then((response) => {
          // this.config.savingStage = false;
          // if (response && response.data && response.data.Response === 'Success') {
          //   this.$store.dispatch('updateSnackbar', {
          //     color: 'success',
          //     show: true,
          //     text: 'Stage created successfully!',
          //   });
          //   this.$router.push(this.$route.path.replace('/new', ''));
          // } else {
          //   this.$store.dispatch('updateSnackbar', {
          //     color: 'error',
          //     show: true,
          //     text: 'Unable to create stage, Please try again later!',
          //   });
          // }
        }, (response) => {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to create stage, Please try again later!'
          });
          throw new Error(response);
        });
    },
    editStage (s) {
      this.$router.push({
        path: `/lifecycle/edit/${s.id}`
      });
    },
    getCurrentMood (score) {
      let mood = '';
      switch (score) {
        case 1:
          mood = 'Terrible';
          break;
        case 2:
          mood = 'Disappointed';
          break;
        case 3:
          mood = 'Okay';
          break;
        case 4:
          mood = 'Good';
          break;
        case 5:
          mood = 'Awesome';
          break;
        default:
      }
      return mood;
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
    search (string) {
      clearTimeout(this.timeout);
      // Make a new timeout set to go off in 800ms
      this.timeout = setTimeout(() => {
        this.getStages();
      }, 500);
    },
    viewStage (s) {
      this.$router.push({
        path: `/lifecycle/view/${s.id}`
      });
    },
    getFilters () {
      axios.get(`${process.env.VUE_APP_API_URL}stage/filters`).then((response) => {
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
    getStages () {
      this.config.initialLoading = true;
      const queryParams = {
        count: 'true',
        // page_limit: this.pagination.axiosPage,
        page_limit: 10,
        page_offset: this.pagination.page || 1,
        raw_search_string: this.table.searchString,
        stageType__in: 'lifecycle',
        include_all_stages: true
        // fields: 'stage_details',
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`${k}__in`] = v.join();
        }
      });
      axios.get(`${process.env.VUE_APP_API_URL}stage/list`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          this.stages = response.data.data;
          this.totalItems = response.data.total_count;
          this.$lodash.each(this.stages, (stage, index) => {
            stage.index = ((this.pagination.page - 1) * 10) + index;
          });
          // this.pagination.length = Math.ceil(this.table.totalItems / this.pagination.rowsPerPage);
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch stage, Please try again later!'
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
    getAvatar (c) {
      const avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      return avt.toUpperCase();
    },
    update () {}
  },
  watch: {
    pagination: {
      handler () {
        if (!this.config.initialLoading) {
          this.getStages();
        }
      },
      deep: true
    }
  },
  mounted () {
    this.config.initialLoading = true;
    // if (this.$route && this.$route.query && Object.keys(this.$route.query).length > 0) {
    //   const temp = {};
    //   this.$lodash.each(this.$route.query, (value, key) => {
    //     temp[key] = [];
    //     if (typeof value === 'object') {
    //       temp[key] = temp[key].concat(value);
    //     } else {
    //       temp[key].push(value);
    //     }
    //   });
    //   this.filters.selected = temp;
    // }
    this.getFilters();
    this.getStages();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.stage-list {
  max-height: 550px!important;
  overflow-y: auto!important;
}
.slide-y-enter-active,
.slide-y-leave-active,
.slide-y-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.slide-y-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.slide-y-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.slide-y-leave-active {
  position: absolute;
}

.slide-y-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}

.lifecycle-stages {
  .v-timeline-item__opposite {
    display: none;
    transition: all 300ms ease;
  }
  &:hover {
    .v-timeline-item__opposite {
      display: block;
    }
  }
}
</style>
