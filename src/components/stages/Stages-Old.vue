<template>
  <div class="">
    <v-layout column class="bg-gradient py-0 pl-1">
      <v-layout row wrap align-center>
        <v-flex sm6 xs12>
          <h3 class="black--text mb-2">
            Ad-hoc Campaigns
            <v-btn color="primary"
              :to="`${$route.path}/new??addAt=0`"
              small class="ml-4 elevation-0 primary--text"
              >
              Add Campaign
              <v-icon small class="ml-2">fas fa-plus</v-icon>
            </v-btn>
          </h3>
        </v-flex>
        <v-spacer></v-spacer>
        <v-menu
          v-model="config.filter"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
          <v-btn icon slot="activator" flat color="white">
            <v-icon>fas fa-filter</v-icon>
          </v-btn>
          <v-card>
            <v-list overflow-y>
              <v-layout row wrap>
                <v-flex>
                  <v-expansion-panel expand v-model="config.panel"
                    class="elevation-0 employee-filters mr-2"
                  >
                    <v-flex md4 px-2
                      v-for="(v, k) in filters.default"
                      :key="k"
                      v-if="v.length > 0"
                    >
                    <v-expansion-panel-content>
                      <div slot="header" class="text-capitalize">{{getName(k)}}</div>
                      <v-card color="">
                        <v-card-text v-show="v.length > 0">
                          <v-checkbox color="primary"
                          :value="chk[k]" v-model="filters.selected[k]" @change="triggerUpdate"
                          v-for="chk in v" :key="chk[k]">
                          <div class="" slot="label">
                            <span v-if="k === 'mood'">
                              <img
                                v-if="chk[k] > 0"
                                height="30"
                                :src="getImgUrl(chk[k])"
                              >
                              <span v-if="chk[k] === 0">Not answered</span>
                              ({{chk.count}})
                            </span>
                            <span v-if="k !== 'mood'">
                              {{chk[k]}} ({{chk.count}})
                            </span>
                          </div>
                        </v-checkbox>
                        </v-card-text>
                        <v-card-text v-show="v.length === 0">
                          No filters available
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                    </v-flex>
                  </v-expansion-panel>
                </v-flex>
              </v-layout>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn flat @click="config.filter = false">Cancel</v-btn>
              <v-btn color="primary" flat @click="config.filter = false">Apply</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-flex sm3>
          <v-text-field
            append-icon="fas fa-search"
            dark
            v-model="table.searchString"
            @keyup="search(table.searchString)"
            color="white"
            name="search"
            single-line
            label="Search"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap
      v-if="!config.initialLoading && table.stage.length === 0 && !table.searchString" mt-5 pt-2
      align-content-center justify-center>
        <v-flex sm12 px-2>
          <v-card class="elevation-0 text-xs-center" min-height="60vh">
            <v-card-title primary-title class="justify-center">
              <v-layout row wrap>
                <v-flex xs12>
                  <img :src="getImgUrl('amara_avatar')" class="blank-avatar" alt="">
                  <p>
                    No <span v-show="$route.path === '/lifecycle'">
                      touchpoints
                    </span>
                    <span v-show="$route.path === '/ad-hoc'">
                      Campaigns
                    </span>
                    created
                  </p>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-actions class="justify-center mt-4">
              <v-btn color="primary"
                :to="`${$route.path}/new`"
                large
                class="elevation-0"
                >
                <span v-show="$route.path === '/lifecycle'">
                  Add Touchpoint
                </span>
                <span v-show="$route.path === '/ad-hoc'">
                  Add Campaign
                </span>
                <v-icon small class="ml-2">fas fa-plus</v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-text>
              <h2>
                Start by creating a
                <span v-show="$route.path === '/lifecycle'">
                  touchpoint
                </span>
                <span v-show="$route.path === '/ad-hoc'">
                  Campaign
                </span>
              </h2>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="fill-layout" align-content-start v-if="$route.path === '/ad-hoc'">
        <!-- Before intial loading -->
        <v-flex sm6 md4 xl3 v-if="config.initialLoading" v-for="i in 5" :key="i">
          <div class="">
            <ContentLoader
              :height="160"
              :width="87"
              :speed="1"
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <rect x="0" y="0" rx="2" ry="2" width="80" height="42.5" />
            </ContentLoader>
          </div>
        </v-flex>

        <!-- After intial loading -->
        <v-flex class="pr-4 mb-4" v-if="!config.initialLoading"
        sm6 md4 xl3 v-for="(t, ti) in table.stage" :key="ti">
          <v-card min-height="156" class="elevation-0 px-3">
            <v-layout row wrap class="mt-2">
              <v-flex class="headline pt-2" xs10>
                <p class="mb-0 hover-link cursor-pointer" @click="viewStage(t)">{{t.title}}</p>
                <span class="caption" v-if="t.stageType === 'lifecycle'">
                  scheduled {{triggerTimeAuto(t)}}
                </span>
                <span class="caption" v-if="t.stageType === 'adhoc'">
                  scheduled for {{dayjs(t.triggerDateTime).from()}}
                </span>
              </v-flex>
              <v-flex text-xs-right xs2>
                <v-menu offset-y>
                  <v-btn
                    slot="activator"
                    color="primary"
                    dark
                    small
                    flat
                    icon
                  >
                    <v-icon small>fas fa-ellipsis-v</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile
                      v-for="(item, index) in config.actions"
                      :key="index"
                      @click="item.action(t, item.dialog)"
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
              </v-flex>
            </v-layout>
            <v-layout row wrap align-content-end class="mt-3 b-top text-xs-center">
              <v-flex xs4 class="stages-analysis-block c-primary" @click="openDialog({
                stage__stageType__in: 'lifecycle',
                stage__id: t.id,
              }, 'Total chats', true)">
                <p class="mb-0 font-weight-bold mt-1">{{t.total_sessions}}</p>
                <span class="grey--text">
                  Total Chats
                </span>
              </v-flex>
              <v-flex xs4 class="stages-analysis-block c-info" @click="openDialog({
                status__in: 'inProgress',
                stage__stageType__in: 'lifecycle',
                stage__id: t.id,
              }, 'Completed chats', true)">
                <p class="mb-0 font-weight-bold mt-1">{{t.pending_sessions}}</p>
                <span class="grey--text">
                  In Progress Chats
                </span>
              </v-flex>
              <v-flex xs4 class="stages-analysis-block c-success" @click="openDialog({
                status__in: 'completed,closed',
                stage__stageType__in: 'lifecycle',
                stage__id: t.id,
              }, 'Completed chats', true)">
                <p class="mb-0 font-weight-bold mt-1">{{t.completed_sessions}}</p>
                <span class="grey--text">
                  Completed Chats
                </span>
              </v-flex>
            </v-layout>
            <!-- <v-layout row wrap align-content-end class="mt-3 text-xs-center b-top pt-2">
              <v-flex xs4 class="stages-analysis-block c-primary">
                <p class="mb-0 font-weight-bold">{{t.total_sessions}}</p>
                <span class="grey--text">
                  Sent
                </span>
              </v-flex>
              <v-flex xs4 class="stages-analysis-block c-info">
                <p class="mb-0 font-weight-bold">{{t.pending_sessions}}</p>
                <span class="grey--text">
                  In Progress
                </span>
              </v-flex>
              <v-flex xs4 class="stages-analysis-block c-success">
                <p class="mb-0 font-weight-bold">{{t.completed_sessions}}</p>
                <span class="grey--text">
                  Completed
                </span>
              </v-flex>
            </v-layout> -->
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-show="table.totalItems > 0" v-if="$route.path === '/ad-hoc'">
        <v-flex xs12 text-xs-center my-2>
          <v-pagination
            v-model="pagination.page"
            :length="pagination.length"
            :total-visible="7"
          ></v-pagination>
        </v-flex>
      </v-layout>
    </v-layout>
    <DeleteStage ref="deleteStage" />
    <EmployeesList ref="EmployeesList" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  VCheckbox,
  VTooltip,
  VAlert,
  VPagination,
} from 'vuetify';
import DeleteStage from './dialogs/DeleteStage';
import EmployeesList from '../analytics/EmployeesList';

dayjs.extend(relativeTime);

export default {
  name: 'stage',
  components: {
    ContentLoader,
    VCheckbox,
    VTooltip,
    VAlert,
    DeleteStage,
    VPagination,
    dayjs,
    EmployeesList,
  },
  data() {
    return {
      filters: {
        default: {},
        selected: {},
        main: {},
      },
      pagination: {
        rowsPerPage: 8,
        page: 1,
        length: 1,
      },
      table: {
        searchString: '',
        totalStage: 0,
        loading: true,
        stage: [],
        headers: [{
          text: 'touchpoint Name',
          align: 'left',
          sortable: false,
        }, {
          text: 'Average Mood',
          align: 'left',
          sortable: false,
        }, {
          text: 'Last Triggered',
          align: 'left',
          sortable: false,
        }, {
          text: 'Sent',
          align: 'left',
          sortable: false,
        }, {
          text: 'Opened',
          align: 'left',
          sortable: false,
        }, {
          text: 'Not Opened',
          align: 'left',
          sortable: false,
        }, {
          text: 'Replied',
          align: 'left',
          sortable: false,
        }, {
          text: 'Actions',
          align: 'left',
          sortable: false,
        }],
      },
      config: {
        filter: false,
        activeTab: 'tab-automated',
        panel: [true, true, true],
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
            action: this.editStage,
          // }, {
          //   title: 'Delete',
          //   icon: 'fas fa-trash',
          //   dialog: 'deleteStage',
          //   action: this.openDialog,
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    checkForFilters() {
      let applied = false;
      this.$lodash.each(this.filters.selected, (v) => {
        if (v.length > 0) {
          applied = true;
        }
      });
      return applied;
    },
  },
  methods: {
    editStage(s) {
      this.$router.push(`${this.$route.path}/edit/${s.id}`);
    },
    triggerTimeAuto(s) {
      const final = {
        timeIn: '',
        timeRef: s.triggerTimeReference.replace('_', ' '),
      };
      if (s.triggerTimeIn === '-') {
        final.timeIn = 'before';
      } else {
        final.timeIn = 'after';
      }

      return `${s.triggerTimeDuration} ${s.triggerTimeUnit} ${final.timeIn} ${final.timeRef}`;
    },
    openDialog(filters, title, sessions) {
      if (!this.activeDriver) {
        this.$refs.EmployeesList.config.initialLoading = true;
        this.$refs.EmployeesList.open = true;
        this.$refs.EmployeesList.filters = filters;
        this.$refs.EmployeesList.sessions = sessions || false;
        this.$refs.EmployeesList.getEmployees();
        this.$refs.EmployeesList.title = title;
      }
    },
    // openDialog(data, type) {
    //   if (type && this.$refs[type]) {
    //     this.$refs[type].open = true;
    //     this.$refs[type].stage = data;
    //   }
    // },
    getImgUrl(pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    search(string) {
      clearTimeout(this.timeout);
      // Make a new timeout set to go off in 800ms
      this.timeout = setTimeout(() => {
        this.getStages(string);
      }, 500);
    },
    viewStage(s) {
      this.$router.push(`${this.$route.path}/view/${s.id}`);
    },
    getName(key) {
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
    getStages(searchString) {
      this.config.initialLoading = true;
      const queryParams = {
        count: 'true',
        // page_limit: this.pagination.rowsPerPage,
        page_limit: 30,
        page_offset: this.pagination.page || 1,
        raw_search_string: searchString,
        stageType__in: this.$route.path === '/lifecycle' ? 'lifecycle' : 'adhoc',
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`${k}__in`] = v.join();
        }
      });
      axios.get(`${process.env.VUE_APP_API_URL}stage/list`, {
        params: queryParams,
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          this.table.stage = response.data.data;
          this.table.totalItems = response.data.total_count;
          this.pagination.length = Math.ceil(this.table.totalItems / this.pagination.rowsPerPage);
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch stage, Please try again later!',
        });
        throw new Error(response);
      });
    },
    triggerUpdate() {
      this.getStages();
    },
    resetFilters() {
      this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
      this.getStages();
    },
    getAvatar(c) {
      const avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      return avt.toUpperCase();
    },
    getRandomColor() {
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
        'blue',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    getFilters() {
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
    update() {},
  },
  watch: {
    pagination: {
      handler() {
        if (!this.config.initialLoading) {
          this.getStages();
        }
      },
      deep: true,
    },
  },
  mounted() {
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
