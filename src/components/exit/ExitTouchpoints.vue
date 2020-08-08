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
                :to="`exit/new`"
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
                    No Exit touchpoints created
                  </p>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-actions class="justify-center mt-4">

            </v-card-actions>
            <v-card-text>
              <h2>

                <span v-show="$route.path === '/exit'">
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

              <td class="px-2" style="`border-right:1px solid #f3f1f1;width:38%;font-size:13px !important;`">
                <p class="mb-0">
                    {{ props.item.stage_details.title }}
                </p>
              </td>

              <td class="px-2" :style="`border-right:1px solid #f3f1f1;width:37%;font-size:13px !important;`">
                <p class="mb-0">
                  {{ triggerTimeAuto(props.item.stage_details) }}
                </p>
              </td>

              <td class="px-2" :style="`border-right:1px solid #f3f1f1;width:20%;font-size:13px !important;`">
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
// } from 'vuetify';
import DeleteStage from './dialogs/DeleteStage';
import EmployeesList from '../analytics/EmployeesList';

dayjs.extend(relativeTime);

export default {
  name: 'ExitTouchpoints',
  components: {
    ContentLoader,
    // VCheckbox,
    // VTooltip,
    // VAlert,
    DeleteStage,
    EmployeesList
    // dayjs,
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
    editStage (s) {
      this.$router.push({
        path: `/exit/edit/${s.id}`
      });
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
        this.getExitTouchpoints(string);
      }, 500);
    },
    getExitTouchpoints (searchString) {
      this.config.initialLoading = true;
      const queryParams = {
        count: 'true',
        // page_limit: this.pagination.axiosPage,
        page_limit: 10,
        page_offset: this.pagination.page || 1,
        raw_search_string: searchString,
        stageType__in: 'postExit,preExit',
        include_all_stages: true
        // fields: 'stage_details',
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`${k}__in`] = v.join();
        }
      });
      axios.get(`${process.env.VUE_APP_BASE_API_URL}exit_bot/stage/list`, {
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
      this.getExitTouchpoints();
    },
    resetFilters () {
      this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
      this.getExitTouchpoints();
    }
  },
  watch: {
    pagination: {
      handler () {
        if (!this.config.initialLoading) {
          this.getExitTouchpoints();
        }
      },
      deep: true
    }
  },
  mounted () {
    this.config.initialLoading = true;
    this.getExitTouchpoints();
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

.exit-stages {
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
