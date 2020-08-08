<template>
  <div class="w-100">
    <v-layout>
      <v-flex xs12>

        <!-- Recipients list header -->
        <v-layout>
          <v-flex xs9 d-inline-flex>
            <h2 class="mt-2 mb-4 px-0" d-inline-flex> Recipients List &nbsp; &nbsp;
              <div class="grey--text" v-if="Object.keys(selectedAudience).length && showCheckBoxes">
              ( {{Object.keys(selectedAudience).length}} / {{table.totalAudienceCount}} ) selected
              </div>
            </h2>
          </v-flex>
          <v-flex xs3 text-xs-right>
            <v-btn color="#4c3e9d" outline @click="updateAudienceSource()" >
              Update Recipients
            </v-btn>
          </v-flex>
        </v-layout>

        <!-- Before content loading -->
        <v-layout row wrap class="" v-show="config.initialLoading">
          <v-flex xs12>
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
          </v-flex>
        </v-layout>

        <!-- Recipients list -->
        <v-layout row wrap v-show="!config.initialLoading">
          <v-flex xs12>
            <v-data-table
              :headers="table.headers"
              :items="table.audience"
              :items-per-page="10"
              :loading="table.loading"
              class="mb-3 b-top pt-2 audience-list"
              :pagination.sync="pagination"
              :rows-per-page-items="[10, 15, 20]"
              @update:pagination="update()"
            >
              <template slot="headers" slot-scope="props">
                <tr style="border-color:#f3f1f1">
                  <!-- <th class="text-xs-left" v-if="showCheckBoxes">
                    <v-checkbox
                      :input-value="props.all"
                      :indeterminate="props.indeterminate"
                      primary
                      hide-details
                      :value="allSelected ? true : false"
                      @change="toggleAll($event)"
                    ></v-checkbox>
                  </th>-->
                  <th class="text-xs-left"
                    v-for="header in props.headers"
                    :key="header.text"
                  >
                    {{ header.text }}
                  </th>
                </tr>
              </template>

              <template slot="items" slot-scope="props">
                <tr v-if="props.item" style="border-color:#f3f1f1">
                  <!-- <td class="text-xs-left" v-if="showCheckBoxes">
                    <v-checkbox color="primary"
                      @change="updateSelectedAudience(props.item, $event)"
                      :value="selectedAudience[props.index] || allSelected ? true : false"
                      primary
                      hide-details
                      :checked-value="true"
                      :unchecked-value="false">
                    </v-checkbox>
                  </td>-->
                  <td class="text-xs-left">
                    <v-layout row wrap align-center>
                      <!--<v-flex class="py-2" sm3>
                        <v-avatar size="30px" :color="getColor(props.item)">
                          <img src="src" alt="alt" v-show="false">
                          <span class="white--text">{{getAvatar(props.item)}}</span>
                        </v-avatar>
                      </v-flex>-->
                      <v-flex>
                        <p class="mb-0" v-show="props.item.user_display_name || props.item.display_name">
                          <strong :class="'hover-link cursor-pointer'">
                            {{props.item.user_display_name || props.item.display_name}}
                          </strong>
                        </p>
                        <p class="mb-0" v-show="!props.item.user_display_name && !props.item.display_name && (props.item.first_name || props.item.last_name)">
                          <strong :class="'hover-link cursor-pointer'">
                            {{props.item.first_name}} {{props.item.last_name}}
                          </strong>
                        </p>
                        <!--<small>
                          {{props.item.email || props.item.user_email}}
                        </small>-->
                      </v-flex>
                    </v-layout>
                  </td>

                  <td class="text-xs-left" v-show="props.item.email">
                    {{props.item.email}}
                  </td>
                  <td class="text-xs-left" v-show="!props.item.email">
                    --
                  </td>

                  <td class="text-xs-left" v-show="props.item.phone || props.item.phoneNumber">
                    {{props.item.phone || props.item.phoneNumber}}
                  </td>
                  <td class="text-xs-left" v-show="!props.item.phone && !props.item.phoneNumber">
                    --
                  </td>

                  <td class="text-xs-left">
                    {{props.item.gender}}
                  </td>
                </tr>
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
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-dialog v-model="showFilter"
      v-show="showFilter" content-class="fixed-card-actions"
      class="filter-drawer"
      persistent
      max-width="90%"
    >
      <v-card class="filters-card pa-3">
        <v-expansion-panel disabled expand v-model="config.panel"
          class="elevation-0 employee-filters"
        >

          <v-layout row wrap>
            <v-flex>
              <h3 class="my-2">
                Filters
              </h3>
            </v-flex>
            <v-flex class="text-sm-right">
              <v-btn v-show="filtersApplied" @click="resetFilters"
              color="error" class="mt-0" flat small>
                Remove filters
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap style="height: 100%;">
            <v-expansion-panel expand v-model="config.panel"
            v-show="!config.initialLoadingFilters"
            class="elevation-0 pr-2">
              <v-layout>
                <v-flex sm3
                  v-for="(v, k) in filters.default"
                  :key="k"
                  v-if="v.length > 0"
                >
                  <v-expansion-panel-content>
                    <div slot="header" class="text-capitalize mr-3">{{k}}</div>
                    <v-card color="">
                      <v-card-text v-show="v.length > 0" style="height: 100%; overflow: scroll">
                        <v-checkbox color="primary" :ripple="false"
                        :value="chk[k]" v-model="filters.selected[k]"
                        v-for="chk in v" :key="chk[k]">
                        <div class="" slot="label">
                          <span v-if="k === 'mood'">
                            <img
                              v-if="chk[k] > 0"
                              height="30"
                              :src="getImgUrl(chk[k])"
                            >
                            <span v-if="chk[k] === 0">Not answered</span>
                          </span>
                          <span v-if="k !== 'mood'">
                            {{chk[k]}}
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
              </v-layout>
            </v-expansion-panel>
          </v-layout>
        </v-expansion-panel>

        <v-card-actions>
          <v-btn color="error" flat @click="showFilter = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="applyfilter()" class="white--text" color="primary" style="float:right">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { VAlert, VMenu, VSlider, VTextarea, VSelect, VChip, VPagination, VCheckbox, VAvatar } from 'vuetify';
// import { Container, Draggable } from 'vue-smooth-dnd';
import { ContentLoader } from 'vue-content-loader';
import { mapState } from 'vuex';
import axios from 'axios';
// import VueContentLoading from 'vue-content-loading';

export default {
  name: 'audienceList',
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
    ContentLoader
  },
  data () {
    return {
      showFilter: false,
      showCheckBoxes: false,
      allSelected: false,
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      selectedAudience: {},
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
        panel: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
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
      this.$lodash.each(this.filters.selected, (v) => {
        if (v.length > 0) {
          applied = true;
        }
      });
      return applied;
    }
  },
  watch: {
    // pagination: {
    //   handler() {
    //     if (!this.config.initialLoading) {
    //       this.getEmployees();
    //     }
    //   },
    //   deep: true,
    // },
  },
  methods: {
    updateAudienceSource () {
      if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent) {
        // this.$parent.$parent.$parent.$refs.audienceSource.audienceSource = this.$parent.$parent.$parent.audienceSource;
        this.$parent.$parent.$parent.audienceSource = null;
        if (this.$parent.$parent.$parent.$refs && this.$parent.$parent.$parent.$refs.audienceSource) {
          this.$parent.$parent.$parent.$refs.audienceSource.open = true;
        }
      }
    },
    getFilters () {
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}user/filters`).then((response) => {
        if (response && response.data && response.data) {
          this.config.initialLoadingFilters = false;
          this.filters.default = response.data.data;

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
    resetFilters () {
      this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
      this.getEmployees();
    },
    triggerUpdate () {
      this.getEmployees();
    },
    applyfilter () {
      this.showFilter = false;
      this.triggerUpdate();
    },
    getName (key) {
      let name;
      switch (key) {
        case 'currentPosition':
          name = 'Current Position';
          break;
        case 'created_by__email':
          name = 'Created By';
          break;
        default:
          name = key.charAt(0).toUpperCase() + key.slice(1);
      }
      return name;
    },
    getEmployees () {
      this.config.initialLoading = true;
      let stageId;
      if (this.$route.params && this.$route.params.stageId) {
        // eslint-disable-next-line no-unused-vars
        stageId = this.$route.params.stageId;
      }
      const queryParams = {
        count: 'true',
        page_limit: this.pagination.rowsPerPage,
        // page_offset: this.pagination.page || 1,
        page_offset: 0
        // completed_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        // completed_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
      };

      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`${k}__in`] = v.join();
        }
      });
      this.table.loading = true;
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}user/list`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          if (response.data.data) {
            this.config.initialLoading = false;
            this.table.loading = false;
            this.table.audience = response.data.data.users;
            this.table.totalAudienceCount = response.data.data.count;

            this.$lodash.each(this.table.audience, (v, k) => {
              v.index = k + 1;
            });

            this.toggleAll(true);
            // Below code is not needed, we need to show audience by the selected checkboxes
            // if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent && this.$parent.$parent.$parent.newCampaign) {
            //   const that = this;
            //   const selectedAudience = {};
            //   that.$lodash.each(that.$parent.$parent.$parent.newCampaign.audience, (v) => {
            //     selectedAudience[v.user_id] = v;
            //   });
            //   that.selectedAudience = selectedAudience;
            // }
          }
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.table.loading = false;
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch employees list, Please try again later!'
        });
        throw new Error(response);
      });
    },
    updateSelectedAudience (emp, ev) {
      let temp = JSON.parse(JSON.stringify(this.selectedAudience));
      // const match = this.$lodash.findIndex(this.selectedAudience, (employee) =>
      //   employee.index === emp.index);
      if (ev && !temp[emp.index]) {
        const newAudience = {
          [emp.index]: emp
        };
        temp = {
          ...temp,
          ...newAudience
        };
      } else if (!ev && this.selectedAudience[emp.index]) {
        delete temp[emp.index];
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
            let newAudience = {};
            if (emp.index) {
              newAudience = {
                [emp.index]: emp
              };
            // } else if (emp.id) {  // this block is used in case of audience added via CSV
            //   newAudience = {
            //     [emp.id]: emp,
            //   };
            }
            this.selectedAudience = {
              ...this.selectedAudience,
              ...newAudience
            };
          });
        });
      }
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    getColor (e) {
      let color = '#4c3e9d';
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
  created () {
    this.getFilters();
    // this.getEmployees();
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hover-link:hover {
  color:#4c3e9d !important
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
