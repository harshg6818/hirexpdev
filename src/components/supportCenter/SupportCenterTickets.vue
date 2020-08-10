<template>
  <div class="bg-gradient supportcenter">
    <v-layout column pa-4>
      <v-layout row wrap align-center>
        <v-flex>
          <h3 class="black--text mb-2">
            Support
            <v-btn color="primary"
              to="support-center/new"
              small class="ml-4 elevation-0 white--text"
              >
              New
              <v-icon small class="ml-2">fas fa-plus</v-icon>
            </v-btn>
          </h3>
        </v-flex>
        <!-- <v-flex sm3>
          <v-text-field
            append-icon="fas fa-search"
            dark
            v-model="table.searchString"
            @keyup="search(table.searchString)"
            color="white"
            name="search"
            single-line
            label="Search tickets"
          ></v-text-field>
        </v-flex> -->
      </v-layout>
      <v-layout row wrap>
        <v-flex>
          <!-- Before intial loading -->
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
          <!-- <v-layout class="mt-1 ml-2 mb-1">
            <v-flex class="pl-1 pr-0" cols='2' sm='1'> {{ticket.}} </v-flex>
            <v-flex class="mb-0 pl-1 cursor-pointer hover-link bold" @click="openTicket(ticket)" cols='3'> {{ticket.subject}} </v-flex>
            <v-flex class="pl-1"> {{ticket.created_at | moment("Do MMM 'YY")}} </v-flex>
            <v-flex class="pl-1 d-none d-sm-inline"> {{getPriority(ticket.priority)}} </v-flex>
            <v-flex class="pl-1">
              <span class="badge text-uppercase" :class="{ 'badge-primary': ticket.status == '2', 'badge-warning': ticket.status == '3', 'badge-success': ticket.status == '4', 'badge-danger': ticket.status == '5' }">
                {{getStatus(ticket.status)}}
              </span>
            </v-flex>
            <v-flex class="pl-1 d-none d-sm-flex">
              <button class="btn btn-grey btn-custom transparent cursor-pointer" @click='updateTicket(2, ticket);' v-if="ticket.status == 4 || ticket.status == 5"> Reopen </button>
              <button class="btn btn-blue btn-custom transparent cursor-pointer"  @click='updateTicket(5, ticket);' v-if="ticket.status === 2"> Close </button>
            </v-flex>
            <v-flex cols="2" class="d-none d-sm-flex">
              <a :href="'https://hirexp.freshdesk.com/helpdesk/tickets/' + ticket.id" target="_blank">View Ticket</a>
            </v-flex>
          </v-layout> -->
          <!-- After intial loading -->
          <v-data-table
            v-show="!config.initialLoading"
            :headers="table.headers"
            :items="table.tickets"
            :options="pagination"
            :server-items-length="table.totalItems"
            :loading="table.loading"
            class=""
          >
            <template v-slot:body="{items}">
              <tbody>
                <tr class="cursor-pointer" v-for="(item, index) in items" :key="index">
                  <td>
                    {{item.id}}
                  </td>
                  <td>
                    {{item.subject}}
                  </td>
                  <td>
                    {{dayjs(item.created_at).from()}}
                  </td>
                  <td>
                    {{getPriority(item.priority)}}
                  </td>
                  <td @click.stop>
                    <!-- View Ticket -->
                    <v-btn color="primary"
                      small
                      text
                      icon
                      @click="viewTicket(item)"
                    >
                      <v-icon small>fas fa-external-link-alt</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
            <v-alert slot="no-data" :value="true" color="primary"
            icon="fas fa-exclamation-triangle" outline>
              <span v-show="!table.searchString">
                No tickets created. Click on <strong>New</strong> to create a new customer support ticket.
              </span>
              <span v-show="table.searchString">
                Your search for "{{ table.searchString }}" found no results.
              </span>
            </v-alert>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { VAlert } from 'vuetify';
import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default {
  name: 'support-center-tickets',
  components: {
    // VAlert,
    ContentLoader
  },
  data () {
    return {
      tickets: [],
      pagination: {
        rowsPerPage: 10,
        page: 1
      },
      table: {
        searchString: '',
        loading: true,
        tickets: [],
        headers: [{
          text: 'Ticket ID',
          align: 'left',
          sortable: false
        }, {
          text: 'Subject',
          align: 'left',
          sortable: false
        }, {
          text: 'Created On',
          align: 'left',
          sortable: false
        }, {
          text: 'Priority',
          align: 'left',
          sortable: false
        }, {
          text: 'Jump to source',
          align: 'left',
          sortable: false
        }]
      },
      config: {
        panel: [true, true, true, true],
        initialLoading: true,
        initialLoadingFilters: true,
        actions: [
          {
            title: 'Delete',
            icon: 'fas fa-trash',
            dialog: 'deleteTicket',
            action: this.openDialog
          }
        ]
      }
    };
  },
  methods: {
    viewTicket (t) {
      window.open(`https://hirexp.freshdesk.com/helpdesk/tickets/${t.id}`);
    },
    search (string) {
      clearTimeout(this.timeout);
      // Make a new timeout set to go off in 800ms
      this.timeout = setTimeout(() => {
        this.getAllTickets(string);
      }, 500);
    },
    getAllTickets (searchString) {
      this.table.loading = true;
      const queryParams = {
        count: 'true',
        page_limit: this.pagination.rowsPerPage,
        page_offset: this.pagination.page || 1,
        raw_search_string: searchString
      };
      axios.get(`${process.env.VUE_APP_API_URL}support/list`, {
        params: queryParams
      }).then((response) => {
        this.table.loading = false;
        this.config.initialLoading = false;
        if (response && response.data) {
          this.table.tickets = response.data;
          this.table.totalItems = response.data.length;
        }
      }, (response) => {
        this.table.loading = false;
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch tickets, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getPriority (n) {
      switch (n) {
        case 1:
          return 'Low';

        case 2:
          return 'Medium';

        case 3:
          return 'High';

        case 4:
          return 'Urgent';

        default:
          return 'unknown';
      }
    },
    getStatus (n) {
      switch (n) {
        case 2:
          return 'Open';

        case 3:
          return 'Pending';

        case 4:
          return 'Resolved';

        case 5:
          return 'Closed';

        default:
          return 'unknown';
      }
    },
    updateTicket (name, ticket) {
      /* eslint-disable no-param-reassign */
      this.$http.post(`${process.env.VUE_APP_BASE_API_URL}support/ticket/update/${ticket.id}`, {
        status: name
      }).then((resp) => {
        if (resp.data) {
          this.$notify({
            group: 'foo',
            title: 'Ticket status updated successfully!',
            type: 'success'
          });
          ticket.status = name;
        }
      }, (resp) => {
        this.$notify({
          group: 'foo',
          title: 'There was some problem while updating the ticket!',
          type: 'warn'
        });
        throw new Error(resp.body);
      });
    },
    openTicket (ticket) {
      this.$store.dispatch('updateSelectedSupportTicketData', ticket);
      this.$router.push('support-center/view');
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  beforeMount () {
    this.getAllTickets();
  }
};
</script>

<style lang="scss" >
  .supportcenter {
     table.v-table thead th {
          font-size: 14px !important;
          color: rgba(0,0,0,0.54);
        }
  }
</style>
