<template>
  <div>
    <v-card>
      <v-card-text class="overflow-">
        <!-- <h2> Recipients (Group: {{distribution_data.group}} Date: {{distribution_data.date}} ) -->
          <!--<v-icon large color="#4c3e9d" class="distribution-report-medium ml-2"> {{distribution_data.icon}} </v-icon>-->
        <!-- </h2> -->
        <div class="" v-show="config.initialLoading">
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

        <!-- After intial loading -->
        <v-data-table
          v-show="!config.initialLoading"
          :headers="table.headers"
          :items="table.team"
          :pagination.sync="pagination"
          :total-items="table.totalItems"
          :loading="table.loading"
          class=""
        >
          <template slot="items" slot-scope="props">
            <tr v-if="props.item">
              <td>
                <v-layout row wrap align-center>
                  {{props.item.recipient_first_name}} {{props.item.recipient_last_name}}
                </v-layout>
              </td>
              <td>
                {{ props.item.recipient_email }}
              </td>
              <td>
                {{ props.item.recipient_phone }}
              </td>
              <td class="text-sm-left">
                {{ props.item.status }}
              </td>
              <td class="text-sm-left">
                <v-btn color="adhoc"
                  :disabled="props.item.status !== 'completed'"
                  style="border-radius:5px"
                  @click="viewResponse(props.item.id)"
                  small class="ml-0 elevation-0 text-none white--text pl-0"
                  >
                  <v-icon small class="ml-2">fas fa-comments</v-icon>
                    &nbsp; &nbsp; View response
                </v-btn>
              </td>
            </tr>
          </template>
          <template slot="expand">
            <div class="secondary px-4 py-2">
              <span v-show="!table.loadingInfo">
              </span>
              <v-progress-linear v-if="table.loadingInfo"
              :indeterminate="true"></v-progress-linear>
            </div>
          </template>
          <v-card slot="no-data" class="elevation-0 text-xs-center" min-height="60vh">
            <v-card-title primary-title class="justify-center">
              <v-layout row wrap>
                <v-flex xs12>
                  <img :src="getImgUrl('amara_avatar')" class="blank-avatar" alt="">
                  <p>
                    No recipients present.
                  </p>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-data-table>
      </v-card-text>

      <!-- <v-card-actions class="mt-3" align-content-space->
        <v-flex xs2 class="ml-2">
          <v-btn color="error" flat @click.stop="closeModal()">Close</v-btn>
        </v-flex>
      </v-card-actions> -->
    </v-card>

    <RecipientTranscript ref="RecipientTranscript" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import RecipientTranscript from '@/components/elements/RecipientTranscript';

// import {
//   VCheckbox,
//   VAvatar,
//   VTooltip,
//   VAlert,
//   VProgressLinear,
//   VChip,
// } from 'vuetify';

dayjs.extend(relativeTime);

export default {
  name: 'EmployeesList',
  components: {
    ContentLoader,
    // VCheckbox,
    // VAvatar,
    // VTooltip,
    // VAlert,
    // dayjs,
    // VChip,
    RecipientTranscript
    // VProgressLinear,
  },
  data () {
    return {
      dateRangeOptions: {},
      open: false,
      title: '',
      stageId: null,
      filters: {},
      sessions: {},
      dialogs: {
        RecipientsReport: false
      },
      distribution_data: {
        distribution_id: null,
        group: null,
        date: null,
        icon: null
      },
      pagination: {
        rowsPerPage: 10,
        page: 1
      },
      stats: {
        resolved: 0,
        completed: 0,
        all: 0
      },
      table: {
        totalItems: 0,
        closedItems: 0,
        searchString: '',
        extraInfo: [],
        loadingInfo: true,
        loading: false,
        team: [],
        headers: [{
          text: 'Employee details',
          align: 'left',
          sortable: false
        }, {
          text: 'Email',
          align: 'left',
          sortable: false
        }, {
          text: 'Phone',
          align: 'left',
          sortable: false
        }, {
          text: 'Status',
          align: 'left',
          sortable: false
        }, {
          text: 'Actions',
          align: 'left',
          sortable: false
        // }, {
        //   text: 'Stage',
        //   align: 'left',
        //   sortable: false,
        }]
      },
      config: {
        actionMenu: {},
        activeTab: 'high_risk_session',
        panel: [true, true, true, true],
        initialLoading: true,
        loading: false,
        initialLoadingFilters: true
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    getRecipientsReport () {
      const queryParams = {
        count: 'true',
        dist_id: this.distribution_data.distribution_id ? this.distribution_data.distribution_id : null,
        // 'id', 'first_name', 'last_name', 'display_name', 'email', 'phone', 'stage', 'stage_title', 'created_at', 'created_by_name', 'created_by_email', 'gender', 'enabled', 'group_id', 'invalid_email', 'unsubscribed'
        stage_id: this.$route && this.$route.params && this.$route.params.stageId ? this.$route.params.stageId : undefined,
        page_limit: this.pagination.rowsPerPage,
        page_offset: this.pagination.page || 1,
        fields: 'status,recipient_first_name,recipient_last_name,recipient_email,id,recipient_phone'
        // fields: 'display_name,email,id,user_mood,stage_title,last_triggered_stage,user_driver_average' :
        // 'user,action_status,tage_title,overall_mood,driverAverage,stage_title,user_display_name,user_email,user_profilePicture,user_department,user_location,transcripts,user_profile_id,status,createdAt,completedAt',
      };
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}dashboard/${this.$route.params.stageId}/stage_recipient_report`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        // console.log(response);
        if (response && response.data) {
          this.table.loading = false;
          this.config.initialLoading = false;
          this.table.team = response.data.data;
          this.table.totalItems = response.data.total_count;
          //   const actionMenu = {};
          //   this.$lodash.each(response.data.data, (v) => {
          //     actionMenu[v.id] = false;
          //   });
          //   this.config.actionMenu = actionMenu;
          //   this.stats = {
          //     completed: response.data.high_risk_session_count,
          //     resolved: response.data.closed_session_count,
          //     all: response.data.total_session_count,
          //   };
          //   this.table.totalItems = response.data.total_count;
        }
      }, (response) => {
        // console.log(response);
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch campaign recipients, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getColor (e) {
      let color = 'primary';
      if (e.gender && e.gender === 'female') {
        color = 'pink';
      }
      return color;
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    viewResponse (sessionId) {
      this.table.extraInfo = [];
      const queryParams = {
        fields: 'id,is_archived,status,email_opened,chat_seen,archived_datetime,completed_at,created_at,last_updated,trigger_time,recipient_email,recipient_phone,recipient_first_name,recipient_last_name,transcript'
      };
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}dashboard/${sessionId}/session_details`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data && response.data.data && response.data.data.transcript) {
          this.$lodash.each(response.data.data.transcript, (t) => {
            if (t.responseRequired || t.bot_response === false) {
              this.table.extraInfo.push(t);
            }
          });
          this.table.loadingInfo = false;
          this.$refs.RecipientTranscript.recipient.name = response.data.data.recipient_first_name.concat(` ${response.data.data.recipient_last_name}`);
          this.$refs.RecipientTranscript.recipient.email = response.data.data.recipient_email;
          this.$refs.RecipientTranscript.transcripts = this.table.extraInfo;
          this.$refs.RecipientTranscript.dialogs.recipient = true;
        }
      }, (response) => {
        this.table.loadingInfo = false;
        // console.log(response);
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch response, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getAvatar (c) {
      let name = '';
      if (c.user_display_name) {
        name = c.user_display_name.split(' ');
      } else {
        name = c.display_name.split(' ');
      }
      const avt = `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
      return avt.toUpperCase();
    },
    closeModal () {
      this.dialogs.RecipientsReport = false;
    }
  },
  watch: {
    pagination: {
      handler () {
        if (!this.config.initialLoading) {
          this.getRecipientsReport();
        }
      },
      deep: true
    }
  },
  beforeMount () {
    if (this.$route.params && this.$route.params.stageId) {
      // this.getFilters();
      this.stageId = this.$route.params.stageId;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.theme--light {
  &.v-table {
    tbody {
      tr {
        &:not(:last-child) {
          border-bottom: 1px solid rgb(243, 241, 241)!important;
        }
      }
    }
  }
}
</style>
