<template>
  <div class="employees-filters">
    <v-navigation-drawer
      class="employeeFilters"
      style="height:100vh;position:fixed;padding-top: 55px;"
      persistent
      v-model="showFilterDrawer"
      absolute
      temporary
      hide-overlay
      right
    >
      <v-card class="filters-card">
        <v-expansion-panel class="elevation-0 employee-filters">
          <v-flex sm12>
            <!-- hipos -->
            <v-expansion-panel-content expand-icon="" class="employee-filters-list">
              <div slot="header" class="text-capitalize px-3 py-2">
                <v-layout style="height:30px;">
                  <v-flex xs11 style="padding-top: 5px;">HiPos</v-flex>
                  <v-flex>
                    <v-checkbox
                      id="hipos"
                      style="position: absolute;right: 6px;"
                      v-model="highPotentialSwitch"
                      color="primary"
                    ></v-checkbox>
                  </v-flex>
                </v-layout>
              </div>
            </v-expansion-panel-content>

            <!-- alert raised -->
            <v-expansion-panel-content expand-icon="" class="employee-filters-list">
              <div slot="header" class="text-capitalize px-3 py-2">
                <v-layout style="height:30px;">
                  <v-flex xs11 style="padding-top: 5px;">Alert raised</v-flex>
                  <v-flex>
                    <v-checkbox
                      id="alert"
                      style="position: absolute;right: 6px;"
                      v-model="alertSwitch"
                      color="primary"
                    ></v-checkbox>
                  </v-flex>
                </v-layout>
              </div>
            </v-expansion-panel-content>

            <!-- chat init date -->
            <v-expansion-panel-content class="employee-filters-list">
              <div slot="header" class="text-capitalize py-2 px-3">Chat initiation date
              </div>
              <v-card color="">
                <v-card-text>
                  <v-radio-group @change="updateInitDate">
                    <v-radio
                      color="primary"
                      v-for="(t, ti) in chatInitDate.presets"
                      :key="ti"
                      :label="t.label"
                      :value="t.range"
                    ></v-radio>
                    <v-menu full-width offset-y :close-on-content-click="false" top>
                      <v-radio
                        slot="activator"
                        color="primary"
                        label="Select Range"
                      ></v-radio>
                      <v-card>
                        <v-card-text>
                          <v-daterange
                          no-presets
                          :options="chatInitDate"
                          @input="updateInitDate"
                          next-icon="fas fa-arrow-right"
                          prev-icon="fas fa-arrow-left"
                          prepend-icon="fas fa-calendar"
                          ></v-daterange>
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <!-- chat complete date -->
            <v-expansion-panel-content class="employee-filters-list">
              <div slot="header" class="text-capitalize px-3 py-2">Chat completion date
              </div>
              <v-card color="#fff" style="border-bottom:0px">
                <v-card-text>
                  <v-radio-group @change="updateChatCompleteDate">
                    <v-radio
                      color="primary"
                      v-for="(t, ti) in chatCompletion.presets"
                      :key="ti"
                      :label="t.label"
                      :value="t.range"
                    ></v-radio>
                    <v-menu full-width offset-y :close-on-content-click="false" top>
                      <v-radio
                        slot="activator"
                        color="primary"
                        label="Select Range"
                      ></v-radio>
                      <v-card>
                        <v-card-text>
                          <v-daterange
                          no-presets
                          :options="chatCompletion"
                          @input="updateChatCompleteDate"
                          next-icon="fas fa-arrow-right"
                          prev-icon="fas fa-arrow-left"
                          prepend-icon="fas fa-calendar"
                          ></v-daterange>
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <!-- join date -->
            <v-expansion-panel-content style="" class="employee-filters-list">
              <div slot="header" class="text-capitalize px-3 py-2">Joining Date
              </div>
              <v-card color="#fff" style="border-bottom:0px">
                <v-card-text>
                  <v-radio-group @change="updateJoinDate">
                    <v-radio
                      color="primary"
                      v-for="(t, ti) in joinDate.presets"
                      :key="ti"
                      :label="t.label"
                      :value="t.range"
                    ></v-radio>
                    <v-menu full-width offset-y :close-on-content-click="false" top>
                      <v-radio
                        slot="activator"
                        color="primary"
                        label="Select Range"
                      ></v-radio>
                      <v-card>
                        <v-card-text>
                          <v-daterange
                          no-presets
                          :options="joinDate"
                          @input="updateJoinDate"
                          next-icon="fas fa-arrow-right"
                          prev-icon="fas fa-arrow-left"
                          prepend-icon="fas fa-calendar"
                          ></v-daterange>
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <!-- chat resolution status -->
            <v-expansion-panel-content style="" class="employee-filters-list">
              <div slot="header" class="text-capitalize px-3 py-2">
                Chat Resolution Status
                <span
                  v-if="chatResolutionStatus.selected && chatResolutionStatus.selected.length > 0"
                >
                  <v-chip>{{chatResolutionStatus.selected.length}} Selected</v-chip>
                </span>
              </div>
              <v-card color="#fff" style="border-bottom:0px">
                <v-card-text>
                  <v-checkbox color="primary" :ripple="false"
                    v-for="(t, ti) in chatResolutionStatusOptions"
                    :key="ti"
                    :id="ti.toString()"
                    :label="t.label"
                    :value="t.key" v-model="chatResolutionStatus.selected"
                  >
                  </v-checkbox>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <!-- chat status -->
            <v-expansion-panel-content style="" class="employee-filters-list">
              <div slot="header" class="text-capitalize px-3 py-2">
                Chat Status
                <span
                  v-if="chatStatus.selected && chatStatus.selected.length > 0"
                >
                  <v-chip>{{chatStatus.selected.length}} Selected</v-chip>
                </span>
              </div>
              <v-card color="#fff" style="border-bottom:0px">
                <v-card-text>
                  <v-checkbox color="primary" :ripple="false"
                      v-for="(t, ti) in chatStatusOptions"
                      :key="ti"
                      :id="ti.toString()"
                      :label="t.label"
                      :value="t.key" v-model="chatStatus.selected"
                      >
                  <div class="" slot="label">
                    <span>
                      {{t.label}}
                    </span>
                  </div>
                </v-checkbox>

                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <!-- engagement -->
            <v-expansion-panel-content style="" class="employee-filters-list">
              <div slot="header" class="text-capitalize px-3 py-2">Engagement
              </div>
              <v-card color="#fff" style="border-bottom:0px">
                <v-card-text>
                  <v-radio-group @change="updateEngagement">
                    <v-radio
                      color="primary"
                      v-for="(t, ti) in engagementOptions"
                      :key="ti"
                      :label="t.label"
                      :value="t.key"
                    ></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <!-- disengaged employee with drivers -->
            <v-expansion-panel-content style="" class="employee-filters-list">
              <div slot="header" class="text-capitalize px-3 py-2" @click="getDisengagedFromDriver">
                Disengaged Employees With
                <span
                  v-if="disengagedFromDriver.selected && disengagedFromDriver.selected.length > 0"
                >
                  <v-chip>1 Selected</v-chip>
                </span>
              </div>
              <v-card color="#fff" style="border-bottom:0px">
                <v-card-text>
                </v-card-text>
                <li
                  v-for="(item,index) in disengagedFromDriversList"
                  :key="index" style="list-style: none;padding-left: 30px;"
                >
                  <v-layout>
                    <span>
                      <v-checkbox
                        v-model="disengagedFromDriver.selected"
                        :id="index.toString()"
                        color="primary"
                        :label="getDriverLabel(item)"
                        :value="item"
                        @change="updateDisengagedFromDriversList(item)"
                      >
                      </v-checkbox>
                    </span>
                  </v-layout>
                  <div
                    :ref="`child${index}`"
                    v-if="disengagedFromDriver.selected === item"
                    style="padding-left: 4%;"
                    class="childrens">
                      <v-checkbox v-model="selectedSubDriverFromDriver.selected"
                        :id="index.toString()"
                        color="primary"
                        v-for="(i,idx) in subDriverDisengagedFromDriversList"
                        :key="idx"
                        :label="getDriverLabel(i)"
                        :value="i"
                      >
                      </v-checkbox>
                  </div>
                </li>
              </v-card>
            </v-expansion-panel-content>

            <!-- Mood -->
            <v-expansion-panel-content style="" class="employee-filters-list">
              <div slot="header" class="text-capitalize px-3 py-2">Mood
                <span v-if="mood.selected && mood.selected.length > 0">
                  <v-chip>{{mood.selected.length}} Selected</v-chip>
                </span>
              </div>
              <v-card color="#fff" style="border-bottom:0px">
                <v-card-text>
                  <v-checkbox
                      color="primary"
                      :ripple="false"
                      v-for="(t, ti) in moodOptions"
                      :key="ti"
                      :id="ti.toString()"
                      :label="t.label"
                      :value="t.label" v-model="mood.selected"
                      >
                  <div class="" slot="label">
                    <span>
                      <img
                        v-if="t.label > 0"
                        height="30"
                        :src="getImgUrl(t.label)"
                      >
                    </span>
                    <span v-if="t.label == 0">N/A</span>
                  </div>
                </v-checkbox>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <!-- assigened to -->
            <v-expansion-panel-content class="employee-filters-list" v-model="showAssignedTo">
              <div slot="header" class="text-capitalize px-3 py-2"
                @click="searchFilter = '';searchingAssignedTOfilter()"
              >Assigned To
                <span v-if="assignedTo.selected && assignedTo.selected.length > 0">
                <v-chip>{{assignedTo.selected.length}} Selected</v-chip></span>
              </div>
              <v-card color="#fff" style="border-bottom:0px">
                <v-text-field
                  @keyup="searchingAssignedTOfilter()"
                  v-model="searchFilter"
                  prepend-inner-icon="fas fa-search"
                  label="Search Assigned To"
                  single-line
                  hide-details
                  class="filter-search-bar"
                ></v-text-field>
                <v-card-text>
                  <v-checkbox color="primary" :ripple="false"
                    v-for="(t, ti) in getAdminUsersList"
                    :key="ti"
                    @change="onChangeAssigned(t.email)"
                  >
                    <div class="" slot="label">
                      <span>
                        {{t.display_name}}
                      </span>
                    </div>
                  </v-checkbox>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <!-- dynamic filters -->
            <v-expansion-panel-content
              class="employee-filters-list"
              v-for="(v, k) in filters.default"
              :key="k" v-if="v && v.length > 0 && k !== 'mood'"
            >
              <div
                @click="searchFilter='';getFilterData(k);"
                class="py-2 px-3" slot="header">{{getName(v)}}
                <span v-if="getSelectedFiltersCount(filters.selected, k) !== 0">
                  <v-chip>{{filters.selected[k].length}} Selected</v-chip>
                </span>
              </div>
              <v-card color="#fff" style="border-bottom:0px">
                <v-text-field
                  @keyup="searchingfilter(k)"
                  v-model="searchFilter"
                  prepend-inner-icon="fas fa-search"
                  label="Search..."
                  single-line
                  hide-details
                  class="filter-search-bar"
                ></v-text-field>
                <v-card-text
                  v-show="searchingfilter(k) && searchingfilter(k).length > 0"
                  style="height: 300px;"
                >
                  <v-checkbox color="primary" :ripple="false"
                  :value="chk[k]" v-model="filters.selected[k]"
                  v-for="chk in searchingfilter(k)" :key="chk[k]"
                  >
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
                <v-card-text v-show="searchingfilter(k) && searchingfilter(k).length === 0">
                  No filters available
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-flex>
        </v-expansion-panel>
        <v-card-actions
          style="position:fixed;bottom:0;width:100%;border-top: 1px solid #ccc; box-shadow:1;"
          class="bg-white"
        >
          <v-btn
            class="error--text"
            text
            @click="showFilterDrawer = false"
            style="float:left"
          >Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="primary"
            style="float:right"
            @click="applyFilters()"
          >Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
// import { VCheckbox, VChip } from 'vuetify';
import { mapState } from 'vuex';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';

dayjs.extend(relativeTime);

export default {
  name: 'EmployeeFilters',

  // components: {
  //   VCheckbox,
  //   VChip
  // },

  props: {
    reset: {
      required: true,
      type: Boolean
    }
  },

  data () {
    return {
      filterApplied: false,
      showFilterDrawer: false,
      highPotentialSwitch: false,
      alertSwitch: false,
      showAssignedTo: false,
      chatInitDate: {
        startDate: undefined,
        endDate: undefined,
        format: 'DD/MM/YYYY',
        minDate: dayjs('01/01/2018').format(),
        maxDate: dayjs().format(),
        presets: [
          {
            label: 'All time',
            range: [
              undefined,
              undefined
            ]
          },
          {
            label: 'This Week',
            range: [
              dayjs().subtract(7, 'day').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 30 Days',
            range: [
              dayjs().subtract(1, 'month').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 3 Months',
            range: [
              dayjs().subtract(3, 'month').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 6 Months',
            range: [
              dayjs().subtract(6, 'month').format(),
              dayjs().format()
            ]
          }
        ],
        dateRange: {
          startDate: dayjs().format('DD/MM'),
          endDate: dayjs().format('DD/MM')
        }
      },
      chatCompletion: {
        startDate: undefined,
        endDate: undefined,
        format: 'DD/MM/YYYY',
        presets: [
          {
            label: 'All time',
            range: [
              undefined,
              undefined
            ]
          },
          {
            label: 'This Week',
            range: [
              dayjs().subtract(7, 'day').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 30 Days',
            range: [
              dayjs().subtract(1, 'month').format(),
              dayjs().format()
            ]
          }
        ],
        dateRange: {
          startDate: dayjs().format('DD/MM'),
          endDate: dayjs().format('DD/MM')
        }
      },
      joinDate: {
        startDate: undefined,
        endDate: undefined,
        format: 'DD/MM/YYYY',
        presets: [
          {
            label: 'All time',
            range: [
              undefined,
              undefined
            ]
          },
          {
            label: 'This Week',
            range: [
              dayjs().subtract(7, 'day').format(),
              dayjs().format()
            ]
          },
          {
            label: 'Last 30 Days',
            range: [
              dayjs().subtract(1, 'month').format(),
              dayjs().format()
            ]
          }
        ],
        dateRange: {
          startDate: dayjs().format('DD/MM'),
          endDate: dayjs().format('DD/MM')
        }
      },
      chatResolutionStatusOptions: [
        {
          label: 'Open',
          key: 'open'
        },
        {
          label: 'Acknowledged',
          key: 'acknowledged'
        },
        {
          label: 'Resolved',
          key: 'resolved'
        },
        {
          label: 'In Progress',
          key: 'inProgress'
        },
        {
          label: 'Scheduled',
          key: 'scheduled'
        }
      ],
      chatStatusOptions: [
        {
          label: 'Completed',
          key: 'completed'
        },
        {
          label: 'In Progress',
          key: 'inProgress'
        },
        {
          label: 'Initiated',
          key: 'initiated'
        }
      ],
      engagementOptions: [
        {
          label: 'Disengaged (<= 3.0)',
          key: 'disengaged'
        },
        {
          label: 'Passively Engaged (>3.0 to <4.0)',
          key: 'passively_enegaged'
        },
        {
          label: 'Highly Engaged (>= 4.0)',
          key: 'highly_engaged'
        }
      ],
      moodOptions: [
        {
          label: '0'
        },
        {
          label: '1'
        },
        {
          label: '2'
        },
        {
          label: '3'
        },
        {
          label: '4'
        },
        {
          label: '5'
        }
      ],
      disengagedFromDriversList: null,
      subDriverDisengagedFromDriversList: null,
      searchFilter: '',
      assignedToUserList: null,
      getAdminUsersList: null,
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      mood: {
        default: {},
        selected: [],
        main: {}
      },
      chatStatus: {
        default: {},
        selected: [],
        main: {}
      },
      highPotential: {
        default: {},
        selected: [],
        main: {}
      },
      disengagedFromDriver: {
        default: {},
        selected: null,
        main: {}
      },
      assignedTo: {
        default: {},
        selected: [],
        main: {}
      },
      chatResolutionStatus: {
        default: {},
        selected: [],
        main: {}
      },
      engagement: {
        default: {},
        selected: [],
        main: {}
      },
      filtersList: {
        default: {},
        selected: {},
        main: {}
      },
      selectedSubDriverFromDriver: {
        default: {},
        selected: [],
        main: {}
      },
      driverAverage__lte: '',
      driverAverage__gte: '',
      driverAverage__lt: '',
      driverAverage__gt: '',
      tempFilters: null
    };
  },

  computed: {
    ...mapState({
      user: state => state.user,
      updateEmployeeFilters: state => state.updateEmployeeFilters
    })
  },

  mounted () {
    this.getAssignedTOList();
    this.getFilters();
  },

  methods: {
    applyFilters () {
      this.isFilterApplied();
      this.triggerUpdate(this.tempFilters);
    },
    isFilterApplied () {
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (k !== 'search' && k !== 'eID') {
          if (v && v.length > 0) {
            this.filterApplied = true;
          }
        }
      });
      const filters = JSON.parse(JSON.stringify(this.filters.selected));
      if (this.chatInitDate.startDate || this.chatInitDate.endDate) {
        filters.startDate = this.chatInitDate.startDate;
        filters.endDate = this.chatInitDate.endDate;
        this.filterApplied = true;
      }
      if (this.chatCompletion.startDate || this.chatCompletion.endDate) {
        filters.startDate = this.chatCompletion.startDate;
        filters.endDate = this.chatCompletion.endDate;
        this.filterApplied = true;
      }
      if (this.joinDate.startDate || this.joinDate.endDate) {
        filters.user_session__completed_date_start = this.joinDate.startDate;
        filters.user_session__completed_date_end = this.joinDate.endDate;
        this.filterApplied = true;
      }
      if (this.chatStatus.selected && this.chatStatus.selected.length > 0) {
        filters.user_session__status = this.chatStatus.selected;
        this.filterApplied = true;
      }
      if (this.chatResolutionStatus.selected && this.chatResolutionStatus.selected.length > 0) {
        filters.user_session__action_status = this.chatResolutionStatus.selected;
        this.filterApplied = true;
      }
      if (this.driverAverage__lte || this.driverAverage__gte || this.driverAverage__lt) {
        this.filterApplied = true;
      }
      if (this.assignedTo.selected && this.assignedTo.selected.length > 0) {
        filters.user_session__assignedTo__email = this.assignedTo.selected;
        this.filterApplied = true;
      }
      if (this.disengagedFromDriver.selected && this.disengagedFromDriver.selected.length > 0) {
        filters.disengaged_from_driver = this.disengagedFromDriver.selected;
        this.filterApplied = true;
      }
      if (this.mood.selected && this.mood.selected.length > 0) {
        // filters.mood__in = this.mood.selected;
        this.filterApplied = true;
      }
      if (this.highPotential.selected && this.highPotential.selected.length > 0) {
        filters.high_potential_emp = this.highPotential.selected;
        this.filterApplied = true;
      }
      if (this.alertSwitch) {
        this.filterApplied = true;
      }
      if (this.highPotentialSwitch) {
        this.filterApplied = true;
      }
      this.tempFilters = filters;
      this.$emit('empFiltersApplied', this.filterApplied);
    },
    triggerUpdate (filters) {
      this.$router.push({
        query: filters
      });
      const employeeFilters = {
        alertSwitch: this.alertSwitch ? this.alertSwitch : undefined,
        disengaged_from_driver: this.disengagedFromDriver.selected ? this.disengagedFromDriver.selected : undefined,
        disengaged_from_sub_driver: this.selectedSubDriverFromDriver.selected && this.selectedSubDriverFromDriver.selected.length > 0 ? this.selectedSubDriverFromDriver.selected.join() : undefined,
        high_potential_emp: this.highPotentialSwitch ? this.highPotentialSwitch : undefined,
        mood__in: this.mood.selected && this.mood.selected.length > 0 ? this.mood.selected.join() : undefined,
        user_session__assignedTo__email__in: this.assignedTo.selected.length > 0 ? this.assignedTo.selected.join() : undefined,
        user_session__status__in: this.chatStatus.selected.length > 0 ? this.chatStatus.selected.join() : undefined,
        user_session__action_status__in: this.chatResolutionStatus.selected.length > 0 ? this.chatResolutionStatus.selected.join() : undefined,
        user_session__driverAverage__lte: this.driverAverage__lte ? this.driverAverage__lte : undefined,
        user_session__driverAverage__gte: this.driverAverage__gte ? this.driverAverage__gte : undefined,
        user_session__driverAverage__lt: this.driverAverage__lt ? this.driverAverage__lt : undefined,
        user_session__driverAverage__gt: this.driverAverage__gt ? this.driverAverage__gt : undefined,
        joining_date_start: this.joinDate.startDate ? dayjs(this.joinDate.startDate).format('YYYY-MM-DD') : undefined,
        joining_date_end: this.joinDate.startDate ? dayjs(this.joinDate.endDate).format('YYYY-MM-DD') : undefined,
        user_session__completed_date_start: this.chatCompletion.startDate ? dayjs(this.chatCompletion.startDate).format('YYYY-MM-DD') : undefined,
        user_session__completed_date_end: this.chatCompletion.startDate ? dayjs(this.chatCompletion.endDate).format('YYYY-MM-DD') : undefined,
        user_session__initiated_date_start: this.chatInitDate.startDate ? dayjs(this.chatInitDate.startDate).format('YYYY-MM-DD') : undefined,
        user_session__initiated_date_end: this.chatInitDate.startDate ? dayjs(this.chatInitDate.endDate).format('YYYY-MM-DD') : undefined,
        // dynamic filters
        filters: this.filters.selected
      };
      // console.log('employeeFilters', employeeFilters);
      this.$store.dispatch('updateEmployeeFilters', employeeFilters);
      // this.showFilterDrawer = false;
      this.$emit('getEmployeesWithFilter', this.filterApplied);
    },
    updateInitDate (date) {
      if (date) {
        this.chatInitDate.startDate = date[0];
        this.chatInitDate.endDate = date[1];
      }
    },
    updateChatCompleteDate (date) {
      if (date) {
        this.chatCompletion.startDate = date[0];
        this.chatCompletion.endDate = date[1];
      }
    },
    updateJoinDate (date) {
      if (date) {
        this.joinDate.startDate = date[0];
        this.joinDate.endDate = date[1];
      }
    },
    updateEngagement (value) {
      if (value === 'disengaged') {
        this.driverAverage__lte = '3';
        this.driverAverage__gt = '';
        this.driverAverage__lt = '';
        this.driverAverage__gte = '';
      }
      if (value === 'passively_enegaged') {
        this.driverAverage__gt = '3';
        this.driverAverage__lt = '4';
        this.driverAverage__lte = '';
        this.driverAverage__gte = '';
      }
      if (value === 'highly_engaged') {
        this.driverAverage__gt = '';
        this.driverAverage__lt = '';
        this.driverAverage__lte = '';
        this.driverAverage__gte = '4';
      }
    },
    getDriverLabel (driver) {
      return driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    },
    getDisengagedFromDriver () {
      axios.get(`${process.env.VUE_APP_API_URL}users/filters?filter_field=engagement_driver`).then((response) => {
        if (response.status === 200) {
          this.disengagedFromDriversList = response.data.queryset_filters_options.engagement_driver;
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Oops, Some error occured, Please try again later!'
          });
        }
      });
    },
    getSubDriversByDriver (driver) {
      axios.get(`${process.env.VUE_APP_API_URL}users/filters?filter_field=engagement_sub_driver&engagement_driver=${driver}`).then((response) => {
        if (response.status === 200) {
          // eslint-disable-next-line max-len
          this.subDriverDisengagedFromDriversList = response.data.queryset_filters_options.engagement_sub_driver;
          this.selectedSubDriverFromDriver.selected = this.subDriverDisengagedFromDriversList;
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Oops, Some error occured, Please try again later!'
          });
        }
      });
    },
    updateDisengagedFromDriversList (value) {
      this.getSubDriversByDriver(value);
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    searchingAssignedTOfilter () {
      if (this.searchFilter) {
        const filter = this.assignedToUserList;
        // eslint-disable-next-line max-len
        const tempData = filter.filter(r => r.display_name.toLowerCase().indexOf(this.searchFilter.toLowerCase()) >= 0);
        this.getAdminUsersList = tempData;
      } else {
        this.getAdminUsersList = this.assignedToUserList;
      }
    },
    onChangeAssigned (email) {
      const idx = this.assignedTo.selected.findIndex(a => a === email);
      if (idx === -1) {
        this.assignedTo.selected.push(email);
      } else {
        this.assignedTo.selected.splice(idx, 1);
      }
    },
    getAssignedTOList () {
      const tempList = [];
      axios.get(`${process.env.VUE_APP_API_URL}users/admins?page_offset=0`).then((response) => {
        this.$lodash.each(response.data.data, (val) => {
          const t = {};
          t.display_name = val.display_name;
          t.email = val.email;
          tempList.push(t);
        });
      });
      this.assignedToUserList = [];
      this.assignedToUserList = tempList;
    },
    getFilterData (k) {
      this.expansion = !this.expansion;
      axios.get(`${process.env.VUE_APP_API_URL}users/filters?filter_field=${k}`).then((response) => {
        if (response && response.data && response.data) {
          this.filtersList.default = response.data.queryset_filters_options;
          const defaultFilters = {};
          this.$lodash.each(this.filters.default.data, (v, key) => {
            defaultFilters[key] = [];
          });
        }
      });
    },
    getFilters () {
      axios.get(`${process.env.VUE_APP_API_URL}users/filters_options`).then((response) => {
        if (response && response.data && response.data.queryset_filters_options) {
          this.filters.default = response.data.queryset_filters_options;
          const defaultFilters = {};
          this.$lodash.each(this.filters.default, (v, k) => {
            defaultFilters[k] = [];
          });
          this.$lodash.each(this.filters.selected, (v, k) => {
            defaultFilters[k] = v;
          });
          this.filters.selected = defaultFilters;
          const mainFilters = {};
          this.$lodash.each(this.filters.default, (v, k) => {
            mainFilters[k] = [];
          });
          this.filters.main = JSON.parse(JSON.stringify(mainFilters));
        }
      });
    },
    getName (key) {
      let name;
      switch (key) {
        case 'currentPosition':
          name = 'Current Position';
          break;

        case 'hrbp':
          name = 'HR Business Partner';
          break;

        case 'sub_department':
          name = 'Sub Department';
          break;

        case 'businessHead':
          name = 'Business Head';
          break;

        case 'teamHead':
          name = 'Team Head';
          break;

        default:
          name = key.charAt(0).toUpperCase() + key.slice(1);
      }
      return name;
    },
    getSelectedFiltersCount (filter, idx) {
      if (filter[idx]) {
        return filter[idx].length;
      }
      return 0;
    },
    searchingfilter (k) {
      if (this.filtersList.default[k]) {
        const filter = this.filtersList.default[k];
        if (this.searchFilter) {
          // eslint-disable-next-line max-len
          const tempData = filter.filter(r => r[k].toLowerCase().indexOf(this.searchFilter.toLowerCase()) >= 0);
          return tempData;
        } else if (!this.searchFilter) {
          return filter;
        }
      }
      return '';
    },
    resetFilters () {
      this.filters.selected = JSON.parse(JSON.stringify(this.filters.main));
      this.alertSwitch = false;
      this.disengagedFromDriver.selected = null;
      this.selectedSubDriverFromDriver.selected = null;
      this.highPotentialSwitch = false;
      this.mood.selected = [];
      this.assignedTo.selected = [];
      this.showAssignedTo = false;
      this.getAdminUsersList = null;
      this.chatStatus.selected = [];
      this.chatResolutionStatus.selected = [];
      this.driverAverage__lte = '';
      this.driverAverage__gte = '';
      this.driverAverage__lt = '';
      this.driverAverage__gt = '';
      this.joinDate.startDate = undefined;
      this.joinDate.endDate = undefined;
      this.chatCompletion.startDate = undefined;
      this.chatCompletion.endDate = undefined;
      this.chatInitDate.startDate = undefined;
      this.chatInitDate.endDate = undefined;
    }
  },

  watch: {
    reset () {
      if (!this.reset) {
        this.resetFilters();
      }
    },
    updateEmployeeFilters: {
      deep: true,
      immediate: true,
      handler () {
        if (this.updateEmployeeFilters && this.updateEmployeeFilters.filters) {
          this.filters.selected = this.updateEmployeeFilters.filters;
          this.isFilterApplied();
        }
      }
    }
  }
};
</script>

<style lang="scss">
.filters-card {
  height: 92vh;
  overflow: auto;
  border: none;
  box-shadow: none;
  .employee-filters {
    display: -webkit-inline-box;
    .employee-filters-list {
      width: 300px;
      &:last-child {
        padding-bottom: 44px;
      }
      .v-expansion-panel__header {
        background-color: #fff !important;
        .v-expansion-panel__header__icon {
          padding-right: 15px;
        }
      }
      .v-expansion-panel__body {
        max-height: 400px !important;
        overflow-y: auto!important;
        overflow-x: hidden!important;
        .v-card {
          height: 100%;
        }
      }
    }
  }
}
</style>
