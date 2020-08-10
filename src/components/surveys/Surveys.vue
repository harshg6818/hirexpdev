<template>
  <div class="">
    <v-layout column class="bg-gradient py-0 pl-1">
      <v-layout row wrap align-center>
        <v-flex>
          <h3 class="black--text mb-2">
            Lifecycle Question Sets
            <!-- <v-menu offset-y>
              <v-btn color="white"
              slot="activator"
              small class="ml-4 elevation-0 primary--text"
              >
                New
                <v-icon small class="ml-2">fas fa-plus</v-icon>
              </v-btn>
              <v-list two-line>
                <v-list-tile to="/question-sets/new?type=lifecycle">
                  <v-list-tile-content>
                    <v-list-tile-title>Employee Lifecycle Question Sets</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile to="/question-sets/new?type=adhoc">
                  <v-list-tile-content>
                    <v-list-tile-title>Ad-hoc Question Sets</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu> -->
            <v-btn color="primary"
              :to="`${$route.path}/new?type=lifecycle`"
              small class="ml-4 elevation-0 primary--text"
              >
              New
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
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon slot="activator" flat color="white" v-bind="attrs" v-on="on">
            <v-icon>fas fa-filter</v-icon>
          </v-btn>
        </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Filters</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn color="error"
                    flat
                    v-show="checkForFilters"
                    @click="resetFilters"
                  >
                    Remove Filters
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list overflow-y>
              <v-layout row wrap>
                <v-flex>
                  <v-expansion-panel expand v-model="config.panel"
                    class="elevation-0 employee-filters mr-2"
                  >
                    <v-flex md6 px-2
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
            label="Search survey"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <!-- Before intial loading -->
      <v-layout row wrap v-if="config.initialLoading">
        <v-flex sm6 md4 xl3 v-for="i in 5" :key="i">
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
      </v-layout>

      <v-layout row wrap class="half-layout" align-content-start v-if="table.survey.length > 0">

        <!-- After intial loading -->
        <v-flex class="pr-4 mb-4" v-if="!config.initialLoading && t.type === 'lifecycle' && table.survey.length > 0"
        sm6 md4 xl3 v-for="(t, ti) in table.survey" :key="ti">
          <v-card height="207" class="elevation-0  px-3">
            <v-layout row wrap class="mt-2">
              <v-flex class="headline pt-2" xs10>
                <p class="mb-0 hover-link cursor-pointer" @click="viewSurvey(t)">{{t.title}}</p>
                <span class="caption">
                  updated {{dayjs(t.lastUpdated).from()}}
                </span>
              </v-flex>
              <!-- <v-flex text-xs-right xs2>
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
                  <>
                    <v-list-item
                      v-for="(item, index) in config.actions"
                      :key="index"
                      @click="item.action(t, item.dialog)"
                    >
                      <v-list-item-title>
                        <v-icon class="mr-2">{{item.icon}}</v-icon>
                        {{ item.title }}
                      </v-list-item-title>
                      <v-list-item-action>
                        {{item.count}}
                      </v-list-item-action>
                    </v-list-item>
                  </>
                </v-menu>
              </v-flex> -->
            </v-layout>
            <v-divider class="my-1"></v-divider>
            <v-tooltip bottom max-width="200">
              <v-layout slot="activator" row wrap align-content-start
              class="mt-2 intrct-block">
                <v-flex xs12 v-for="(intrct, index) in t.interactions" :key="index">
                  <p class="mb-0" v-for="(m, mi) in intrct.msg" :key="mi">
                    - {{m.text || m.title}}
                  </p>
                </v-flex>
              </v-layout>
              Interactions for {{t.title}} question set
            </v-tooltip>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row wrap v-show="table.totalItems > 0" v-if="table.survey.length > 0">
        <v-flex xs12 text-xs-center my-2>
          <v-pagination
            v-model="pagination.page"
            :length="pagination.length"
            :total-visible="7"
          ></v-pagination>
        </v-flex>
      </v-layout>

      <v-layout row wrap
      v-if="!config.initialLoading && table.survey.length === 0 && !table.searchString" mt-5 pt-2
      align-content-center justify-center>
        <v-flex sm12 px-2>
          <v-card class="elevation-0 text-xs-center" min-height="60vh">
            <v-card-title primary-title class="justify-center">
              <v-layout row wrap>
                <v-flex xs12>
                  <img :src="getImgUrl('amara_avatar')" class="blank-avatar" alt="">
                  <p>
                    No question set created
                  </p>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-actions class="justify-center mt-4">
              <v-btn color="primary"
                :to="`question-sets/new?type=lifecycle`"
                large
                class="elevation-0"
                >
                New Survey
                <v-icon small class="ml-2">fas fa-plus</v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-text>
              <h2>
                Create a new question set and configure how Amara will interact.
              </h2>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    </v-layout>
    <DeleteSurvey ref="deleteSurvey" />
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
// } from 'vuetify';
import DeleteSurvey from './dialogs/DeleteSurvey';

dayjs.extend(relativeTime);

export default {
  name: 'survey',
  components: {
    ContentLoader,
    // VCheckbox,
    // VTooltip,
    // VAlert,
    DeleteSurvey
    // dayjs,
    // VPagination,
  },
  data () {
    return {
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      pagination: {
        rowsPerPage: 8,
        page: 1,
        length: 1
      },
      table: {
        searchString: '',
        loading: true,
        survey: [],
        headers: [{
          text: 'Survey title',
          align: 'left',
          sortable: false
        }, {
          text: 'Total responses',
          align: 'left',
          sortable: false
        }, {
          text: 'Created',
          align: 'left',
          sortable: false
        }, {
          text: 'Actions',
          align: 'left',
          sortable: false
        }]
      },
      config: {
        panel: [true, true, true, true],
        initialLoading: true,
        initialLoadingFilters: true,
        actions: [
          // {
          //   title: 'Duplicate',
          //   icon: 'fas fa-copy',
          //   action: this.duplicate,
          // }, {
          //   title: 'Delete',
          //   icon: 'fas fa-trash',
          //   dialog: 'deleteSurvey',
          //   action: this.openDialog,
          // },
        ]
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
    }
  },
  methods: {
    openDialog (data, type) {
      if (type && this.$refs[type]) {
        this.$refs[type].open = true;
        this.$refs[type].survey = data;
      }
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    search (string) {
      clearTimeout(this.timeout);
      // Make a new timeout set to go off in 800ms
      this.timeout = setTimeout(() => {
        this.getSurveys(string);
      }, 500);
    },
    viewSurvey (s) {
      this.$router.push(`/question-sets/edit/${s.id}`);
    },
    getName (key) {
      let name;
      switch (key) {
        case 'createdBy__email':
          name = 'Created By';
          break;

        default:
          name = key.charAt(0).toUpperCase() + key.slice(1);
      }
      return name;
    },
    getSurveys (searchString) {
      this.config.initialLoading = true;
      const queryParams = {
        count: 'true',
        page_limit: this.pagination.rowsPerPage,
        page_offset: this.pagination.page || 1,
        raw_search_string: searchString,
        fields: 'title,type,description,company,createdAt,createdBy,lastUpdated,interactions,survey_stats'
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`${k}__in`] = v.join();
        }
      });
      axios.get(`${process.env.VUE_APP_API_URL}survey/list`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          this.table.survey = response.data.data;
          this.table.totalItems = response.data.total_count;
          this.pagination.length = Math.ceil(this.table.totalItems / this.pagination.rowsPerPage);
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch survey, Please try again later!'
        });
        throw new Error(response);
      });
    },
    triggerUpdate () {
      this.getSurveys();
    },
    resetFilters () {
      this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
      this.getSurveys();
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
      axios.get(`${process.env.VUE_APP_API_URL}survey/filters`).then((response) => {
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
    pagination: {
      handler () {
        if (!this.config.initialLoading) {
          this.getSurveys();
        }
      },
      deep: true
    }
  },
  beforeMount () {
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
    this.getSurveys();
    this.getFilters();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.half-layout {
  min-height: 80vh;
  overflow-y: auto;
}
.intrct-block {
  border-radius: 4px;
  height: 5.5em;
  overflow-y: auto;
}
</style>
