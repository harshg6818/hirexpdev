<template>
  <div class="container mt-1">
    <div role='tablist' class="my-4" id='dtable'>
      <v-flexlapse id="userF" v-model='createTicketSupport' accordion="my-accordion" class="mt-1" role="tabpanel">
        <b-form v-on:submit.prevent>
          <b-card class="text-left">
            <h5 class="card-title mb-0 text-center text-mute mb-3">
              Create New Suppot Ticket
            </h5>
            <v-layout>
              <v-flex>
                <b-form-group description="Enter your name" label="Name" label-for="name">
                  <b-form-input v-model='user.display_name' id="name" name="name" ref="name" size="sm" placeholder="Enter name" maxlength="100" disabled></b-form-input>
                </b-form-group>
              </v-flex>
              <v-flex>
                <b-form-group description="Enter your email address" label="Email" label-for="email">
                  <b-form-input v-model='user.email' type='email' id="email" name="email" ref="email" size="sm" placeholder="Enter email address" maxlength="50" disabled></b-form-input>
                </b-form-group>
              </v-flex>
              <v-flex>
                <b-form-group label="Issue type" description="Select what this ticket is regarding.">
                  <multiselect v-model='newTicket.category' selectLabel='' deselectLabel='' :options='options.regarding' placeholder="Select type" size="sm"></multiselect>
                </b-form-group>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <b-form-group description="Enter subject for this support ticket" label="Subject" label-for="subject">
                  <b-form-input v-model='newTicket.subject' id="subject" name="subject" ref="subject" size="sm" placeholder="Enter subject line" maxlength="50"></b-form-input>
                </b-form-group>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <b-form-group description="Please write the description of the issue or attach the image" label="Description">
                  <VuePellEditor class="w-100" v-model="newTicket.description" placeholder="Enter description" />
                </b-form-group>
              </v-flex>
            </v-layout>
            <v-layout align-h='between'>
              <v-flex align-self='start' cols='2'>
                <b-form-group label="Contact Method">
                  <b-form-radio-group v-model="newTicket.contactMethod"
                  :options="options.contactMethod"
                  name="radioInline">
                </b-form-radio-group>
              </b-form-group>
              <b-form-input v-if="newTicket.contactMethod === 'Phone'" v-model='newTicket.phoneNumber' id="phoneNumber" name="phoneNumber" ref="phoneNumber" size="sm" placeholder="Enter contact number.." maxlength="15" required></b-form-input>
            </v-flex>
            <v-flex cols='4'>
              <b-card no-body class="ml-1">
                <div class="card-body" id='upload-job-doc'>
                  <h6 class="text-muted text-left mb-3">Add attachments</h6>
                  <b-form-file v-model="newTicket.attachments" placeholder="Choose files..."></b-form-file>
                </div>
              </b-card>
            </v-flex>
            </v-layout>
            <v-layout class="text-center">
              <v-flex>
                <button class="btn btn-red btn-custom transparent" @click="createTicketSupport = !createTicketSupport" ><font-awesome-icon icon="times" class="" /></button>
                <button type='submit' class="btn btn-blue btn-custom filled" @click='createTicket()'><font-awesome-icon icon="save" class="" /> Create Ticket</button>
              </v-flex>
            </v-layout>
          </b-card>
        </b-form>
        <hr>
      </v-flexlapse>
    </div>
    <div>
      <v-layout class="my-4">
        <v-flex cols="6" class="text-left align-items-center d-flex" v-if='tickets.length > 0'>
          <h4>Support Center</h4>
        </v-flex>
        <v-flex cols="6" class="text-left align-items-center d-flex" v-if='tickets.length === 0'>
        </v-flex>
        <v-flex cols="6" class="text-right mb-2">
          <button class="btn btn-blue btn-custom filled" @click="createTicketSupport = !createTicketSupport;"><font-awesome-icon icon="plus" class="mr-2" /> Create Support Ticket</button>
        </v-flex>
      </v-layout>

      <v-alert v-if='tickets.length === 0' type="primary" :value="true">
        <p>You can create customer suppport ticket by clicking on 'Create Support Ticket'. </p>
      </v-alert>
      <v-layout v-if='tickets.length > 0'>
        <v-flex class="text-left" cols='2' sm="1"> <small> Ticket ID </small> </v-flex>
        <v-flex class="text-left" cols='3'> <small> Subject </small> </v-flex>
        <v-flex class="text-left"> <small> Created on </small> </v-flex>
        <v-flex class="text-left d-none d-sm-flex"> <small> Priority </small> </v-flex>
        <v-flex class="text-left"> <small> Status </small> </v-flex>
        <v-flex class="text-left d-none d-sm-flex"> <small> Action(s) </small> </v-flex>
        <v-flex class="text-left d-none d-sm-flex" cols="2"> <small> Jump to source </small> </v-flex>
      </v-layout>

      <v-layout v-if='tickets.length > 0'>
        <div v-for="(ticket, idx) in tickets.slice((currentPage-1)*perPage,perPage*currentPage)" class="w-100 mb-0 px-2" :key="idx">
          <b-card class="text-left p-2" no-body>
            <v-layout class="mt-1 ml-2 mb-1">
              <v-flex class="pl-1 pr-0" cols='2' sm='1'> {{ticket.id}} </v-flex>
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
            </v-layout>
          </b-card>
        </div>
      </v-layout>

      <v-layout v-if='tickets.length > 0' align-h="center">
        <v-flex cols="12" sm="6" class="my-3">
          <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
// import VueContentLoading from 'vue-content-loading';
import { mapState } from 'vuex';
// import VuePellEditor from 'vue-pell-editor';
// import { VAlert, VMenu } from 'vuetify';

export default {
  name: 'support-center-tickets',
  components: {
    // VAlert
    // FontAwesomeIcon,
    // Multiselect,
    // VuePellEditor,
  },
  data () {
    return {
      newTicket: {
        name: '',
        email: '',
        category: '',
        subject: '',
        description: '',
        contactMethod: 'Mail',
        attachments: '',
        phoneNumber: ''
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            // [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        }
      },
      tickets: [],
      options: {
        regarding: ['Account and Billing Support', 'Technical Support'],
        contactMethod: ['Mail', 'Phone']
      },
      createTicketSupport: false,
      currentPage: 1,
      perPage: 10,
      totalRows: 10,
      pageOptions: [5, 10, 15]
    };
  },
  methods: {
    getAllTickets () {
      this.$http.post(`${process.env.VUE_APP_BASE_API_URL}support/ticket/list`).then((resp) => {
        if (resp.data) {
          if (resp.data.description && resp.data.description === 'Validation failed') {
            this.tickets = [];
          } else {
            this.tickets = JSON.parse(resp.data);
            this.totalRows = JSON.parse(resp.data).length;
          }
        }
      }, (resp) => {
        throw new Error(resp.body);
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
    createTicket () {
      if (!this.newTicket.category) {
        this.$notify({
          group: 'foo',
          title: 'please select an Issue Type!',
          type: 'warn'
        });
        return;
      }
      if (!this.newTicket.subject) {
        this.$notify({
          group: 'foo',
          title: 'please enter a subject!',
          type: 'warn'
        });
        return;
      }
      if (this.newTicket.description.length < 50) {
        this.$notify({
          group: 'foo',
          title: 'Ticket description cannot be less then 50 characters!',
          type: 'warn'
        });
        return;
      }
      if (this.newTicket.contactMethod === 'Phone' && !this.newTicket.phoneNumber) {
        this.$notify({
          group: 'foo',
          title: 'please enter contact number!',
          type: 'warn'
        });
        return;
      }
      const formData = new FormData();
      formData.append('attachments', this.newTicket.attachments);
      const temp = {
        createdBy: this.user.email,
        company: this.user.company,
        ticket_number: null,
        category: this.newTicket.category,
        subject: this.newTicket.subject,
        description: this.newTicket.description,
        contact_method: this.newTicket.contactMethod,
        contact_phone: this.newTicket.phoneNumber,
        status: 'open',
        // attachments: this.newTicket.attachments,
        dateCreated: null
      };

      this.$lodash.each(temp, (value, key) => {
        formData.append(key, value);
      });

      this.$http.post(`${process.env.VUE_APP_BASE_API_URL}support/ticket_attachments`, formData, {
        headers: {
          'Content-Type': undefined
        }
      }).then((response) => {
        if (response) {
          this.$notify({
            group: 'foo',
            title: 'Support ticket created successfully!',
            type: 'success'
          });
          this.newTicket = {
            name: '',
            email: '',
            category: '',
            subject: '',
            description: '',
            contactMethod: 'Mail',
            attachments: '',
            phoneNumber: ''
          };
          this.createTicketSupport = false;
          this.getAllTickets();
        }
      }, (response) => {
        this.$notify({
          group: 'foo',
          title: 'Oops! There was some error while creating the ticket. Sent a mail to help@hirexp.com',
          type: 'warn'
        });
        this.createTicketSupport = false;
        throw new Error(response);
      });
    },
    deleteAttachment (index) {
      this.newTicket.attachments.splice(index, 1);
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
      user: state => state.user,
      activeTab: state => state.selectedSettingsTab
    })
  },
  beforeMount () {
    this.getAllTickets();
  }
};
</script>

<style lang="scss" scoped>
</style>
