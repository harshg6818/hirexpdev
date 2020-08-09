<template>
  <div class="container mt-1">
    <v-layout class="b-bottom m-0 p-1">
        <v-flex cols="auto" class="p-0">
          <button class="btn btn-navy btn-custom m-0" @click="goBack()"><font-awesome-icon icon="arrow-left" /> </button>
        </v-flex>
        <v-flex class="b-left" cols="auto">
          <h4 class="card-subtitle mt-2 text-left">{{ticket.subject}}</h4>
        </v-flex>
        <v-flex cols="auto" class="ml-auto text-right" align-self="end">
          <b-button-group class="mx-1">
            <!-- <button class="btn btn-custom btn-blue colored cursor-pointer" @click="saveDefaultEmail()" v-b-popover.hover.bottom="'Click to save this email'"><font-awesome-icon icon="save" /> Save</button> -->
            <button class="btn btn-navy outline colored btn-custom cursor-pointer" @click='updateTicket(2, ticket);' v-if="ticket.status == 4 || ticket.status == 5"> Reopen </button>
            <button class="btn btn-blue btn-custom filled cursor-pointer"  @click='updateTicket(5, ticket);' v-if="ticket.status === 2"> Close ticket</button>
          </b-button-group>
        </v-flex>
    </v-layout>
    <!-- <v-layout class="my-4" align-h='between'>
      <v-flex cols="6" class="text-left align-items-center d-flex">
        <h3>{{ticket.subject}}</h3>
      </v-flex>
      <v-flex cols="5" class="text-right mb-2">
      </v-flex>
    </v-layout> -->
    <v-layout class="my-4" v-if='ticket.subject'>
      <v-flex>
        <b-card-group>
        <b-card no-body class="">
          <div class="card-header p-1 text-left bold pl-2">Ticket details.</div>
          <v-layout>
            <v-flex class="">
              <b-list-group-item class="d-flex text-left align-items-center b-bottom">
                <span>
                  <small>
                    Subject
                  </small>
                  <p class="mb-0 mt-1">
                    {{ticket.subject}}
                  </p>
                </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex text-left align-items-center b-bottom">
                <span>
                  <small>
                    Created
                  </small>
                  <p class="mb-0 mt-1">
                    {{ticket.created_at | moment("Do MMM 'YY")}}
                  </p>
                </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex text-left align-items-center b-bottom">
                <span>
                  <small>
                    Last Updated
                  </small>
                  <p class="mb-0 mt-1">
                    {{ticket.updated_at | moment("Do MMM 'YY")}}
                  </p>
                </span>
              </b-list-group-item>
            <!-- </v-flex>
            <v-flex class="pl-0"> -->
              <b-list-group-item class="d-flex text-left align-items-center b-bottom">
                <span>
                  <small>
                    Status
                  </small>
                  <p class="mb-0 mt-1">
                    <span class="badge text-uppercase" :class="{ 'badge-primary': ticket.status == '2', 'badge-warning': ticket.status == '3', 'badge-success': ticket.status == '4', 'badge-danger': ticket.status == '5' }">
                      {{getStatus(ticket.status)}}
                    </span>
                  </p>
                </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex text-left align-items-center b-bottom">
                <span>
                  <small>
                    Priority
                  </small>
                  <p class="mb-0 mt-1">
                    {{getPriority(ticket.priority)}}
                  </p>
                </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex text-left align-items-center b-bottom">
                <span>
                  <small>
                    Type
                  </small>
                  <p class="mb-0 mt-1">
                    {{ticket.type}}
                  </p>
                </span>
              </b-list-group-item>
            </v-flex>
          </v-layout>
        </b-card>
      <!-- </v-flex>
      <v-flex> -->
        <b-card no-body class="" style="min-height: 100px;">
          <div class="card-header p-1 text-left bold pl-2">Conversations.</div>
          <div class="mt-2 mx-4 m-auto" v-if='conversations && conversations.length === 0'>
            <button class="btn btn-custom btn-blue colored transparent w-100 px-4 disabled"  @click='loadConversations()'>
              No conversations
            </button>
          </div>
          <div class="mt-2 mx-4 m-auto" v-if='!conversations'>
            <button class="btn btn-custom btn-blue colored filled w-100 px-4 cursor-pointer"  @click='loadConversations()'>
              <font-awesome-icon v-if="loadingButtonText === 'Loading Conversations'" icon="spinner" class="text-light mt-2" spin/> {{loadingButtonText}}
            </button>
          </div>
          <div class="text-left">
            <div class="chat-conversation current" v-show="conversations && conversations.length > 0" style="max-height: 404px;">
              <div class="conversation-body">
                <ul>
                  <li class="img" v-for="(n, idx) in conversations" :class="{'pull-right' : (n.support_email === user.email)}" :key="idx">
                    <div class="chat-detail" :class="{'chat-right' : (n.support_email === user.email)}">
                      <span class="chat-date">{{n.created_at}}</span>
                      <div class="conversation-img m-t-5" :class="{'pull-right p-l-10' : (n.support_email === user.email)}">
                        <span>{{n.support_email === user.email ? 'Me' : 'HelpDesk'}}</span>
                      </div>
                      <div class="chat-bubble" style="width: 100%">
                        <span v-html="n.body"></span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </b-card>
      </b-card-group>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <b-card no-body class="mb-4" style="min-height: 100px;">
          <div class="card-header p-1 text-left bold pl-2">Description.</div>
          <div class="p-2 m-2 text-left">
            <p v-html='ticket.description'></p>
          </div>
        </b-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
// import Vue from 'vue';
import { mapState } from 'vuex';

export default {
  name: 'view-support-ticket',
  components: {
    // FontAwesomeIcon,
    // Vue
  },
  data () {
    return {
      search: '',
      conversations: null,
      loadingButtonText: 'Load Conversations'
    };
  },
  methods: {
    goBack () {
      this.$router.push('/support-center');
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
    loadConversations () {
      this.conversations = null;
      this.loadingButtonText = 'Loading Conversations';
      this.$http.post(`${process.env.VUE_APP_BASE_API_URL}support/ticket/conversations/${this.ticket.id}`).then((resp) => {
        if (resp.data) {
          this.conversations = JSON.parse(resp.data);
          this.loadingButtonText = 'Load Conversations';
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
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      ticket: state => state.selectedSupportTicketData
    })
  },
  beforeMount () {
    if (!this.ticket.subject) {
      this.$router.push('/support-center');
    } else {
      this.loadConversations();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.chat-conversation {
  bottom: 0;
  padding: 0;
  position: relative;
  top: 0;
  overflow-x: hidden;
  -webkit-transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  -moz-transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  -o-transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  -ms-transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.chat-conversation .conversation-header {
  padding: 0;
  position: relative;
}
.chat-conversation .conversation-header .user {
  border-bottom: 1px solid #E0E0E0;
  padding: 10px 15px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.chat-conversation .conversation-header .user-img {
  float: left;
  width: 50px;
}
.chat-conversation .conversation-header .user-img .badge {
  font-size: 11px;
  margin-left: -10px;
  padding: 2px 5px;
  position: absolute;
}
.chat-conversation .conversation-header .user-details {
  text-align: center;
  width: 100%;
}
.chat-conversation .conversation-header .user-details .user-name {
  text-align: center;
}
.chat-conversation .conversation-header .user-details .user-txt {
  color: #526a82;
  text-align: center;
}
.chat-conversation .conversation-header .user-status i {
  float: right;
  margin-right: 0;
  margin-top: 15px;
}
.chat-conversation .conversation-header .chat-back {
  color: #424242;
  cursor: pointer;
  font-size: 16px;
  left: 25px;
  position: absolute;
  top: 22px;
}
.chat-conversation .conversation-body {
  padding: 25px;
}
.chat-conversation .conversation-body li {
  clear: both;
  content: " ";
  display: table;
  margin-bottom: 15px;
}
.chat-conversation .conversation-body li:last-child {
  margin-bottom: 65px;
}
.chat-conversation .conversation-body .conversation-img {
  float: left;
  margin-right: 15px;
}
.chat-conversation .conversation-body .chat-detail {
  float: left;
}
.chat-conversation .conversation-body .chat-detail .chat-bubble {
  background: #e5e9ec;
  color: #22262e;
  float: right;
  line-height: 20px;
  min-height: 40px;
  padding: 0;
  padding: 10px;
  position: relative;
  white-space: normal;
  width: 180px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.chat-conversation .conversation-body .chat-detail .chat-bubble:after {
  border-color: rgba(0, 0, 0, 0) #e5e9ec;
  border-style: solid;
  border-width: 9px 7px 9px 0;
  content: '';
  display: block;
  left: -7px;
  position: absolute;
  top: 12px;
  width: 0;
  z-index: 1;
}
.chat-conversation .conversation-body .chat-detail .chat-date {
  color: #636F77;
  display: block;
  font-size: 12px;
  margin-bottom: 8px;
  text-align: right;
}
.chat-conversation .conversation-message {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 2;
}

.full-modal-window .modal-dialog {
  width: 100%;
}
.large-modal-window .modal-dialog {
  width:80%;
}

.chat-conversation .conversation-body .chat-detail.chat-right .chat-bubble {
  background: #2B2E33;
  color: #ffffff;
  float: left;
}
.chat-conversation .conversation-body .chat-detail.chat-right .chat-bubble:after {
  border-color: rgba(0, 0, 0, 0) #2b2e33;
  border-width: 9px 0 9px 7px;
  left: auto;
  right: -7px !important;
  top: 12px;
}
.chat-conversation .conversation-body .chat-detail.chat-right img {
  float: right!important;
  margin: 3px 0 -5px 10px !important;
}
</style>
