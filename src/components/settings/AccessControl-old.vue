<template>
  <v-layout row wrap py-4 px-2>
    <v-flex sm4 px-2>
      <v-card class="elevation-0">
        <v-list two-line>
          <template v-for="(item, index) in list.groups">
            <v-list-tile
              :key="index"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title>{{item.member}} member(s)</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex sm8 px-2>
      <v-layout row wrap>
        <v-flex>
          <p class="mb-0">
            {{list.groups[config.selectedGroup].title}}
          </p>
          <small class="grey--text">
            {{list.groups[config.selectedGroup].member}} member(s)
          </small>
        </v-flex>
        <v-flex class="text-sm-right">
          <v-btn
            color="primary"
            outline
            class="elevation-0"
          >
            Add group
          </v-btn>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-layout class="py-3" row wrap>
        <v-flex xs12>
          <strong>Settings</strong>
        </v-flex>
        <v-flex xs12>
          <v-alert color="primary" outline :value="true">
            Administrators have access to everything.
          </v-alert>
        </v-flex>
        <v-flex xs12>
          <v-expansion-panel expand v-model="config.panel"
            class="elevation-0 pr-2"
          >
            <v-expansion-panel-content v-for="(v, k) in config.tabs" :key="k">
              <div slot="header">{{v.title}}</div>
              <v-card color="">
                <v-card-text v-for="(a, ai) in v.access" :key="ai">
                  <v-switch v-model="a.enabled">
                    <template slot="label">
                      <v-layout row wrap pl-3>
                        <v-flex xs12>
                          <p class="mb-0">{{a.title}}</p>
                        </v-flex>
                        <v-flex xs12>
                          <small>{{a.desc}}</small>
                        </v-flex>
                      </v-layout>
                    </template>
                  </v-switch>

                  <!-- <v-checkbox color="primary" :label="`${chk[k]} (${chk.count})`"
                  :value="chk[k]" v-model="filters.selected[k]" @change="triggerUpdate"
                  v-for="chk in v" :key="chk[k]"></v-checkbox> -->
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-layout class="py-3" row wrap>
        <v-flex xs6>
          <strong>Members</strong>
        </v-flex>
        <v-flex xs6>
          <v-autocomplete
            v-model="config.searchMember"
            :items="list.members"
            :loading="config.loading"
            :search-input.sync="searchMemberSync"
            hide-selected
            single-line
            item-text="display_name"
            label="Search members"
            placeholder="Start typing to search for members"
            outline
            class="grey--text text--lighten-2"
            append-icon="fas fa-search"
            return-object
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12>
          <v-data-table
            hide-headers
            :items="selectedGroup.members"
            :pagination.sync="pagination"
            :total-items="selectedGroup.length"
            class=""
          >
            <template slot="items" slot-scope="props">
              <tr class="cursor-pointer">
                <td>
                  <v-layout row wrap align-center>
                    <v-flex class="py-2" sm3>
                      <v-avatar size="30px" color="primary">
                        <img src="src" alt="alt" v-show="false">
                        <span class="white--text">{{getAvatar(props.item)}}</span>
                      </v-avatar>
                    </v-flex>
                    <v-flex>
                      <p class="mb-0" v-show="props.item.display_name">
                        <strong>
                          {{props.item.display_name}}
                        </strong>
                      </p>
                      <small>
                        {{props.item.email}}
                      </small>
                    </v-flex>
                  </v-layout>
                </td>
                <td>Last logged in </td>
                <td @click.stop>
                  <!-- View Member -->
                  <v-tooltip
                    bottom
                  >
                    <v-btn color="primary"
                      slot="activator"
                      small
                      flat
                      icon
                      @click="viewMember(props.item)"
                    >
                      <v-icon small>fas fa-trash</v-icon>
                    </v-btn>
                    Remove from this group
                  </v-tooltip>
                  <!-- Schedule one on one -->
                  <!-- <v-tooltip
                    bottom
                  >
                    <v-btn color="primary"
                      slot="activator"
                      flat
                      @click="openDialog(props.item, 'oneOnOne')"
                    >
                      Schedule meeting
                    </v-btn>
                    Schedule meeting
                  </v-tooltip> -->
                </td>
              </tr>
            </template>
            <!-- <v-alert slot="no-data" :value="true" color="info"
            icon="fas fa-exclamation-triangle" outline>
              <span v-show="!table.searchString">
                No Team created. Click on <strong>New</strong> to start.
              </span>
              <span v-show="table.searchString">
                Your search for "{{ table.searchString }}" found no results.
              </span>
            </v-alert> -->
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import {
//   VChip,
//   VMenu,
//   VAlert,
//   VSwitch,
//   VAutocomplete,
//   VTooltip,
//   VAvatar,
// } from 'vuetify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  name: 'access-control',
  // components: {
  //   ContentLoader,
  //   VChip,
  //   VMenu,
  //   dayjs,
  //   VAlert,
  //   VSwitch,
  //   VAutocomplete,
  //   VTooltip,
  //   VAvatar,
  // },
  data () {
    return {
      pagination: {},
      searchMemberSync: null,
      config: {
        selectedGroup: 0,
        searchMember: '',
        tabs: [{
          title: 'Surveys',
          access: [{
            title: 'View Tab',
            desc: 'Ability to view tab',
            enabled: false
          }]
        }]
      },
      selectedGroup: {
        members: []
      },
      list: {
        groups: [{
          title: 'Administrator',
          member: 0
        }, {
          title: 'Managers',
          member: 0
        }, {
          title: 'Members',
          member: 0
        }],
        members: []
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  watch: {
    searchMemberSync (val) {
      if (val) {
        this.config.loading = true;
        this.getTeam(val);
      }
    },
    config: {
      handler () {
        if (this.config.searchMember) {
          this.selectedGroup.members.push(this.config.searchMember);
          setTimeout(() => {
            this.config.searchMember = '';
          }, 50);
        }
      },
      deep: true
    }
  },
  methods: {
    getAvatar (c) {
      const avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      return avt.toUpperCase();
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/integrations/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    openDialog (data, type) {
      if (type && this.$refs[type]) {
        this.$refs[type].open = true;
        this.$refs[type].member = data;
      }
    },
    getIntegrations (id) {
      const queryParams = {
        fields: 'bio,location,birthDate,alternateEmail,phoneNumber,profilePicture,gender,education,experience,skills,joining_date,designation,designationChanged,designationChangeDate,grade,department,sub_department,manager,managerChanged,managerChangeDate,function,functionChanged,functionChangeDate,team,teamChanged,teamChangeDate,teamHead,business,businessHead,hrbp,status,mood,createdAt,lastUpdated,first_name,last_name,email'
      };
      axios.get(`${process.env.VUE_APP_API_URL}users/details/${id}`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          this.list.members = response.data;
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch member, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getTeam (searchString) {
      this.config.loading = true;
      const queryParams = {
        count: 'true',
        page_limit: 5,
        page_offset: 1,
        raw_search_string: searchString
      };

      axios.get(`${process.env.VUE_APP_API_URL}users/list`, {
        params: queryParams
      }).then((response) => {
        this.config.loading = false;
        if (response && response.data) {
          this.list.members = response.data.data;
        }
      }, (response) => {
        this.config.loading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch team, Please try again later!'
        });
        throw new Error(response);
      });
    }
  },
  beforeMount () {
    if (this.$route.params && this.$route.params.memberId) {
      this.getIntegrations(this.$route.params.memberId);
    }
    this.getTeam();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
