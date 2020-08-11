<template>
  <div class="d-flex flex-row w-100">
    <v-flex xs12>
      <div class="pa-3 d-flex flex-row" v-if="!config.initialLoading">
        <v-flex xs4 class="px-3">
          <div class="d-flex flex-row flex-wrap align-center">
            <v-flex>
              <h3 class="my-2">
                Filters
              </h3>
            </v-flex>
            <v-flex class="text-sm-right">
              <v-btn v-if="filtersApplied" @click="resetFilters"
                color="error" class="mt-0" outlined small>
                Remove filters
              </v-btn>
            </v-flex>
          </div>
          <!-- <v-expansion-panel expand v-model="config.panel"
          v-if="!config.initialLoadingFilters"
          class="elevation-0 pr-2"> -->
            <!-- <v-expansion-panel-content v-for="(v, k) in filters.default" :key="k">
              <div slot="header">{{getName(k)}}</div>
              <v-card color="">
                <v-card-text v-show="v.length > 0">
                  <v-checkbox color="primary" :label="`${chk[k]} (${chk.count})`"
                  :value="chk[k]" v-model="newStage.audience[k]"
                  @change="triggerUpdate"
                  v-for="chk in v" :key="chk[k]"></v-checkbox>
                </v-card-text>
                <v-card-text v-show="v.length === 0">
                  No filters available
                </v-card-text>
              </v-card>
            </v-expansion-panel-content> -->
          <!-- </v-expansion-panel> -->

          <v-expansion-panels>
            <v-expansion-panel
              v-for="(v, k) in filters.default"
              :key="k"
            >
              <v-expansion-panel-header>{{getName(k)}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                  <div v-if="v.length > 0">
                    <v-checkbox color="primary" :label="`${chk[k]} (${chk.count})`"
                      :value="chk[k]" v-model="newStage.audience[k]"
                      @change="triggerUpdate"
                      v-for="chk in v" :key="chk[k]"
                    ></v-checkbox>
                  </div>
                  <div v-else-if="v.length === 0">
                    No filters available
                  </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-flex>

        <v-flex xs8>
          <v-data-table
            v-show="!config.initialLoading"
            :headers="table.headers"
            :items="table.team"
            footer-props.items-per-page-options="[10, 20]"
            :loading="table.loading"
            class="mb-3 b-top pt-2 audience-list"
            :options="pagination"
            :server-items-length="table.totalItems"
          >
            <template v-slot:header="{headers}">
              <tr style="border-color:#f3f1f1">
                <th class="text-left"
                  v-for="header in headers"
                  :key="header.text"
                >
                  {{ header.text }}
                </th>
              </tr>
            </template>

            <template v-slot:body="{items}">
              <tbody>
                <tr style="border-color:#f3f1f1" v-for="(item, index) in items" :key="index">
                  <!--<td class="text-left" v-if="showCheckBoxes">
                    <v-checkbox color="primary"
                      @change="updateSelectedAudience(props.item, $event)"
                      :value="selectedAudience[props.item.id] || allSelected ? true : false"
                      primary
                      hide-details
                      :unchecked-value="false">
                    </v-checkbox>
                  </td>-->
                  <td class="text-left">
                    <div class="d-flex flex-row flex-wrap align-center">
                      <!--<v-flex class="py-2" sm3>
                        <v-avatar size="30px" :color="getColor(props.item)">
                          <img src="src" alt="alt" v-show="false">
                          <span class="white--text">{{getAvatar(props.item)}}</span>
                        </v-avatar>
                      </v-flex>-->
                      <v-flex>
                        <p class="mb-0" v-show="item.user_display_name || item.display_name">
                          <strong :class="'hover-link cursor-pointer'">
                            {{item.user_display_name || item.display_name}}
                          </strong>
                        </p>
                        <p class="mb-0" v-show="!item.user_display_name && !item.display_name && (item.first_name || item.last_name)">
                          <strong :class="'hover-link cursor-pointer'">
                            {{item.first_name}} {{item.last_name}}
                          </strong>
                        </p>
                        <!--<small>
                          {{props.item.email || props.item.user_email}}
                        </small>-->
                      </v-flex>
                    </div>
                  </td>

                  <td class="text-left" v-show="item.email">
                    {{item.email}}
                  </td>
                  <td class="text-left" v-show="!item.email">
                    --
                  </td>

                  <td class="text-left" v-show="item.phone || item.phoneNumber">
                    {{item.phone || item.phoneNumber}}
                  </td>
                  <td class="text-left" v-show="!item.phone && !item.phoneNumber">
                    --
                  </td>

                  <td class="text-left">
                    {{item.gender}}
                  </td>
                </tr>
              </tbody>
            </template>

            <v-card slot="no-data" class="elevation-0 text-center" min-height="60vh">
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
        </v-flex>
      </div>
    </v-flex>
  </div>
</template>

<script>
// import { VAlert, VMenu, VSlider, VTextarea, VSelect, VChip, VPagination, VCheckbox, VAvatar } from 'vuetify';

// import { Container, Draggable } from 'vue-smooth-dnd';

// import { ContentLoader } from 'vue-content-loader';
import { mapState } from 'vuex';
import axios from 'axios';
// import VueContentLoading from 'vue-content-loading';

export default {
  name: 'NewQuestion',
  components: {
    // VAlert,
    // VMenu,
    // VTextarea,
    // VSlider,
    // VSelect,
    // Container,
    // Draggable,
    // VChip,
    // VPagination,
    // VCheckbox,
    // VueContentLoading,
    // VAvatar,
    // ContentLoader
  },
  data () {
    return {
      showCheckBoxes: true,
      allSelected: false,
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      selectedAudience: {},
      newStage: {
        audience: {},
        totalAudienceCount: null
      },
      table: {
        searchString: '',
        totalAudienceCount: 0,
        loading: true,
        audience: [],
        // headers: [],
        headers: [{
          text: 'Name',
          align: 'left',
          sortable: false
        }, {
          text: 'Email',
          align: 'left',
          sortable: false
        }, {
          text: 'Phone Number',
          align: 'left',
          sortable: false
        }, {
          text: 'Gender',
          align: 'left',
          sortable: false
        }]
      },
      config: {
        filter: false,
        panel: [true, true, true, true],
        initialLoading: false,
        initialLoadingFilters: true
      },
      pagination: {
        rowsPerPage: 10,
        page: 1
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    filtersApplied () {
      let applied = false;
      this.$lodash.each(this.newStage.audience, (v) => {
        if (v.length > 0) {
          applied = true;
        }
      });
      return applied;
    }
  },
  methods: {
    getFilters () {
      axios.get(`${process.env.VUE_APP_API_URL}users/filters`).then((response) => {
        if (response && response.data && response.data.queryset_filters_options) {
          this.config.initialLoadingFilters = false;
          this.filters.default = response.data.queryset_filters_options;

          const defaultFilters = {};
          this.$lodash.each(this.filters.default, (v, k) => {
            defaultFilters[k] = [];
          });

          if (Object.keys(this.newStage.audience).length === 0) {
            this.newStage.audience = defaultFilters;
            this.filters.main = JSON.parse(JSON.stringify(defaultFilters));
          }
        }
      });
    },
    triggerUpdate () {
      this.getTeam();
    },
    resetFilters () {
      this.newStage.audience = JSON.parse(JSON.stringify(this.filters.main));
      this.getTeam();
    },
    getTeam (searchString) {
      this.config.initialLoading = true;
      const queryParams = {
        count: 'true',
        page_limit: this.pagination.rowsPerPage,
        page_offset: this.pagination.page || 1,
        raw_search_string: searchString
      };
      this.$lodash.each(this.newStage.audience, (v, k) => {
        if (v.length > 0) {
          queryParams[`${k}__in`] = v.join();
        }
      });
      axios.get(`${process.env.VUE_APP_API_URL}users/list`, {
        params: queryParams
      }).then((response) => {
        this.table.loading = false;
        this.config.initialLoading = false;
        if (response && response.data) {
          this.table.team = response.data.data;
          this.table.totalItems = response.data.total_count;
          this.newStage.totalAudienceCount = response.data.total_count;
        }
      }, (response) => {
        this.table.loading = false;
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch team, Please try again later!'
        });
        throw new Error(response);
      });
    },
    updateSelectedAudience (emp, ev) {
      let temp = JSON.parse(JSON.stringify(this.selectedAudience));
      // const match = this.$lodash.findIndex(this.selectedAudience, (employee) =>
      //   employee.id === emp.id);
      if (ev && !temp[emp.id]) {
        const newAudience = {
          [emp.id]: emp
        };
        temp = {
          ...temp,
          ...newAudience
        };
      } else if (!ev && this.selectedAudience[emp.id]) {
        delete temp[emp.id];
      }
      this.selectedAudience = temp;
      if (Object.keys(this.selectedAudience).length === this.table.totalAudienceCount) {
        this.allSelected = true;
      } else {
        this.allSelected = false;
      }
      // this.$store.dispatch('updateSelectedCandidatesWithData', temp);
    },
    update () {
      if (this.allSelected) {
        this.toggleAll(false);
        this.toggleAll(true);
      }
    },
    toggleAll (ev) {
      if (!ev) {
        this.selectedAudience = {};
        this.allSelected = false;
      } else {
        this.$nextTick(function a () {
          this.selectedAudience = {};
          this.allSelected = true;
          this.$lodash.each(this.table.audience, emp => {
            const newAudience = {
              [emp.id]: emp
            };
            this.selectedAudience = {
              ...this.selectedAudience,
              ...newAudience
            };
          });
        });
      }
    },
    getName (key) {
      let name;
      switch (key) {
        case 'currentPosition':
          name = 'Current Position';
          break;

        default:
          name = key.charAt(0).toUpperCase() + key.slice(1);
      }
      return name;
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    getColor (e) {
      let color = '#0d2c8d';
      if (e.gender && e.gender === 'female') {
        color = 'pink';
      }
      return color;
    },
    getAvatar (c) {
      let name = '';
      let avt = '';
      if (c.user_display_name) {
        name = c.user_display_name.split(' ');
        avt = `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
      } else if (c.display_name) {
        name = c.display_name.split(' ');
        avt = `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
      } else if (c.first_name) {
        avt = `${c.first_name.charAt(0)}${c.last_name ? c.last_name.charAt(0) : ''}`;
      } else if (c.last_name) {
        avt = `${c.first_name ? c.first_name.charAt(0) : ''}${c.last_name.charAt(0)}`;
      }
      return avt.toUpperCase();
    }
  },
  watch: {
    pagination: {
      handler () {
        if (!this.config.initialLoading) {
          this.getTeam();
        }
      },
      deep: true
    }
  },
  created () {
    // if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent && this.$parent.$parent.$parent.newStage) {
    //   this.table.audience = this.$parent.$parent.$parent.newStage.audience;
    //   this.table.totalAudienceCount = this.$parent.$parent.$parent.newStage.totalAudienceCount;
    //   if (this.$parent.$parent.$parent.newStage.totalAudienceCount) {
    //     this.table.loading = false;
    //     this.config.initialLoading = false;
    //   }
    // }
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hover-link:hover {
  color:#0d2c8d !important
}
.audience-list {
  &.b-top {
    border-color: #f3f1f1!important;
  }
  .theme--light {
    &.v-datatable {
      .v-datatable__actions {
        border-color: #f3f1f1!important;
      }
    }
  }
}
</style>
