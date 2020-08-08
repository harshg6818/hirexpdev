<template>
  <div class="">
    <v-layout column class="bg-gradient py-0 pl-1">
      <!-- <v-layout row wrap align-center style="border-bottom: 1px solid rgb(243, 241, 241);z-index:3;max-height:70px">

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
      </v-layout> -->

      <v-layout row wrap style="z-index:2"
      v-if="!config.initialLoading && !table.searchString" mt-5 pt-2
      align-content-center justify-center>
        <v-flex sm12 px-2>
          <v-card style="border:none;" class="elevation-0 text-xs-center" min-height="60vh">
            <v-card-title primary-title class="justify-center">
              <!-- Pre Exit Interactions -->
              <v-layout row wrap class="mb-5" v-if="!preExitInteractions || !preExitInteractions.length || preExitInteractions.length === 0">
                <v-flex xs12>
                  <v-btn v-if="!config.initialLoading"  color="primary"
                    :to="`exit/new?interactionType=preExit`"
                    class="elevation-0"
                  >
                    Create Pre - Exit Interaction
                  </v-btn>
                </v-flex>
              </v-layout>

              <v-layout row wrap class="mb-5" v-if="preExitInteractions && preExitInteractions.length && preExitInteractions.length > 0">
                <v-flex xs12 v-for="(interaction, index) in preExitInteractions">
                    {{ interaction.title }}
                </v-flex>
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
                </v-card>
              </v-layout>

              <!-- Post Exit Interactions -->
              <v-layout row wrap v-if="!postExitInteractions || !postExitInteractions.length || postExitInteractions.length === 0">
                <v-flex xs12>
                  <v-btn v-if="!config.initialLoading"  color="primary"
                    :to="`exit/new?interactionType=postExit`"
                    class="elevation-0"
                  >
                    Create Post - Exit Interaction
                  </v-btn>
                </v-flex>
              </v-layout>

              <v-layout row wrap v-if="postExitInteractions && postExitInteractions.length && postExitInteractions.length > 0">
                <v-flex xs12 v-for="(interaction, index) in postExitInteractions" :key="index">
                  {{ interaction.title }}
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- Before Initial Loading -->
      <div class="" v-show="config.initialLoading" style="z-index:2" mt-5 pt-2>
        <ContentLoader
          :height="160"
          :width="400"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="100" y="0" rx="2" ry="2" width="94.46" height="17.93" />
          <rect x="100" y="50" rx="2" ry="2" width="94.46" height="17.93" />
          <!-- <rect x="0" y="50" rx="2" ry="2" width="394.46" height="17.93" />
          <rect x="0" y="75" rx="2" ry="2" width="394.46" height="17.93" />
          <rect x="0" y="100" rx="2" ry="2" width="394.46" height="17.93" />
          <rect x="0" y="125" rx="2" ry="2" width="394.46" height="17.93" />
          <rect x="0" y="150" rx="2" ry="2" width="394.46" height="17.93" /> -->
        </ContentLoader>
      </div>
    </v-layout>
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
// } from 'vuetify';

dayjs.extend(relativeTime);

export default {
  name: 'stage',
  components: {
    ContentLoader
    // VCheckbox,
    // VTooltip,
    // VAlert,
    // dayjs,
  },
  data () {
    return {
      preExitInteractions: [],
      postExitInteractions: [],
      // totalItems: 0,
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
        initialLoading: false,
        initialLoadingFilters: true,
        actions: [
          {
            title: 'Edit',
            icon: 'fas fa-edit',
            dialog: 'edit',
            action: this.editStage
          }
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
    createLifecycle () {
      const order = [];
      this.$lodash.each(this.stages, (s) => {
        order.push(s.stage_details.id);
      });
      this.$store.dispatch('updateStages', order);
    },
    editStage (s) {
      this.$router.push({
        path: `/exit/edit/${s.id}`
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
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    viewStage (s) {
      this.$router.push({
        path: `/exit/view/${s.id}`
      });
    },
    getStages (searchString) {
      this.config.initialLoading = true;
      const queryParams = {
        count: 'true',
        // page_limit: this.pagination.axiosPage,
        page_limit: 10,
        page_offset: this.pagination.page || 1,
        raw_search_string: searchString,
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
          this.preExitInteractions = response.data.preExit;
          this.postExitInteractions = response.data.postExit;
        //   this.totalItems = response.data.total_count;
        //   this.$lodash.each(this.stages, (stage, index) => {
        //     stage.index = ((this.pagination.page -1) * 10) + index;
        //   });
          // this.pagination.length = Math.ceil(this.table.totalItems / this.pagination.rowsPerPage);
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch interactions, Please try again later!'
        });
        throw new Error(response);
      });
    },
    // triggerUpdate() {
    //   this.getStages();
    // },
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
    // this.config.initialLoading = true;
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
    // this.getStages();
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
