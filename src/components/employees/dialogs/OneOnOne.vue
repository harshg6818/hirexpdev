<template>
  <div>
    <v-dialog max-width="700px" v-model="open" transition="dialog-transition">
      <v-card v-if="user && user.user_profile && user.user_profile.default_mail_client">
        <v-card-title primary-title>
          Schedule a meeting with {{this.employee.user_display_name || this.employee.display_name}}
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <!-- Date -->
            <v-flex sm4 pr-2>
              <v-menu
                ref="dateMenu"
                :close-on-content-click="false"
                v-model="menu.date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  class="grey--text text--lighten-2"
                  maxlength="30"
                  outline
                  :value="formattedDate"
                  v-validate="'required'"
                  readonly
                  flat
                  :error-messages="errors.collect('date')"
                  name="date"
                  label="Date *"
                ></v-text-field>
                <v-date-picker v-model="invite.date" no-title
                @input="menu.date = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <!-- Start time -->
            <v-flex sm4 pr-2>
              <v-menu
                ref="startTimeMenu"
                :close-on-content-click="false"
                v-model="menu.start_time"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  class="grey--text text--lighten-2"
                  maxlength="30"
                  outline
                  v-validate="'required'"
                  readonly
                  v-model="invite.start_time"
                  flat
                  :error-messages="errors.collect('start_time')"
                  name="start_time"
                  data-vv-as="start time"
                  label="Start time *"
                ></v-text-field>
                <v-time-picker
                  :allowed-minutes="allowedStep"
                  v-model="invite.start_time"
                  full-width
                ></v-time-picker>
              </v-menu>
            </v-flex>
            <!-- End time -->
            <v-flex sm4 pr-2>
              <v-menu
                ref="startTimeMenu"
                :close-on-content-click="false"
                v-model="menu.end_time"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  class="grey--text text--lighten-2"
                  maxlength="30"
                  outline
                  v-validate="'required'"
                  readonly
                  v-model="invite.end_time"
                  flat
                  :error-messages="errors.collect('end_time')"
                  name="end_time"
                  data-vv-as="start time"
                  label="End time *"
                ></v-text-field>
                <v-time-picker
                  :allowed-minutes="allowedStep"
                  v-model="invite.end_time"
                  full-width
                ></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                class="grey--text text--lighten-2"
                maxlength="100"
                outline
                v-model="invite.summary"
                flat
                :error-messages="errors.collect('summary')"
                name="summary"
                label="Summary"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                class="grey--text text--lighten-2"
                maxlength="200"
                outline
                v-model="invite.description"
                flat
                :error-messages="errors.collect('description')"
                @click.stop
                name="description"
                label="Description"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions align-content-space->
          <v-flex>
            <v-btn color="error" flat @click.stop="open=false;">Close</v-btn>
          </v-flex>
          <v-flex text-xs-right>
            <v-btn color="primary" class="elevation-0 white--text" :loading="loading"
            :disabled="loading" @click.stop="validateDetails()">
              <span v-if="employee.invite && employee.invite.type === 'edit'">Update&nbsp;</span>Schedule
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>

      <v-card v-else>
        <v-card-title class="pb-0" primary-title>
          <strong> Account not connected ! </strong>
        </v-card-title>
        <v-card-text>
          Please connect your Google or Outlook account to schedule a meeting.
        </v-card-text>
        <v-card-actions align-content-space->
          <v-flex>
            <v-btn color="error" flat @click.stop="open=false;">Close</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteModal" persistent max-width="290">
      <v-card>
        <!-- <v-card-title class="headline">Are you sure you want to cancel this event?</v-card-title> -->
        <v-card-text>Are you sure you want to delete this event?</v-card-text>
        <!-- <v-card-text><strong>Summary: </strong>{{invite.summary}}</v-card-text> -->
        <!-- <v-card-text><strong>Description: </strong>{{invite.description}}</v-card-text> -->
        <!-- <v-card-text><strong>Event Start Time: </strong>{{invite.start_time}}</v-card-text> -->
        <!-- <v-card-text><strong>Event End Time: </strong>{{invite.end_time}}</v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click="deleteModal = false">close</v-btn>
          <v-btn color="primary" flat @click.stop="validateDetails()">delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import axios from 'axios';
// import { VTextarea } from 'vuetify';
import dayjs from 'dayjs';
import VueAuthenticate from 'vue-authenticate-fork';

Vue.prototype.$http = axios;

Vue.use(VueAuthenticate, {
  baseUrl: `${process.env.VUE_APP_BASE_API_URL}/integrations`, // Your API domain

  // bindRequestInterceptor() {
  //   axios.interceptors.request.use((config, nex) => {
  //     const configTemp = config;
  //     if (this.isAuthenticated()) {
  //       configTemp.headers.Authorization = [
  //         this.options.tokenType, this.getToken(),
  //       ].join(' ');
  //     } else {
  //       configTemp.headers.Authorization = undefined;
  //     }
  //     return configTemp;
  //   }, error => Promise.reject(error));
  // },

  providers: {
    live: {
      scope: ['offline_access', 'Mail.Send', 'User.Read', 'Mail.Read', 'Mail.ReadWrite', 'Calendars.ReadWrite'],
      url: 'outlook/oauth2callback',
      clientId: 'fa4ce73b-8bf1-43df-b8e2-8231db2564ee',
      authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
    },
    google: {
      scope: [
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/calendar'
      ],
      url: 'google/oauth2callback',
      optionalUrlParams: ['prompt', 'access_type'],
      accessType: 'offline',
      prompt: 'consent',
      clientId: '101147605276-4p0fsf52907u94p7bboruka7d13komo5.apps.googleusercontent.com'
    }
  }
});

export default {
  name: 'delete',
  components: {
    // VTextarea
  },
  data () {
    return {
      loading: false,
      open: false,
      deleteModal: false,
      employee: {},
      invite: {
        date: dayjs().format(),
        summary: 'I would like to have a meeting with you',
        description: ''
      },
      menu: {
        date: false,
        start_time: false,
        end_time: false
      }
    };
  },
  computed: {
    formattedDate () {
      return dayjs(this.invite.date).format('DD MMM YY');
    },
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    connectTo (provider) {
      this.$auth.authenticate(provider).then().catch((err) => {
        if (err && err.data && err.data.message) {
          this.user.mail = (provider === 'live') ? 'outlook' : 'google';
          this.user.mail = err.data.message;
          this.$store.dispatch('createSession', this.user);
          this.sendInvite();
        }
      });
    },
    round (date, duration, method) {
      return dayjs(Math[method]((+date) / (+duration)) * (+duration));
    },
    updateDateTime () {
      this.invite.date = dayjs().format('YYYY-MM-DD');
      this.invite.start_time = this.round(dayjs(), (30 * 60 * 1000), 'ceil').format('HH:MM');
      this.invite.end_time = this.round(dayjs(), (30 * 60 * 1000), 'ceil').format('HH:MM');
    },
    allowedStep: m => m % 5 === 0,
    validateDetails () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.sendInvite();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    sendInvite () {
      this.loading = true;
      const newInvite = JSON.parse(JSON.stringify(this.invite));
      newInvite.user_id = this.employee.user || this.employee.user_id;
      newInvite.attendees = [{
        id: this.employee.user_email || this.employee.email,
        email: this.employee.user_email || this.employee.email,
        title: this.employee.user_display_name || this.employee.display_name,
        name: this.employee.user_display_name || this.employee.display_name
      }, {
        id: this.user.email,
        email: this.user.email,
        title: this.user.display_name,
        name: this.user.display_name
      }];
      let mailClient = this.user && this.user.user_profile && this.user.user_profile.default_mail_client ? this.user.user_profile.default_mail_client : 'google';
      let url = `${process.env.VUE_APP_BASE_API_URL}integrations/${mailClient}/calendar/add`;
      if (this.employee.invite) {
        newInvite.date = dayjs(this.invite.date).format('YYYY-MM-DD');
        newInvite.calendar_id = this.employee.invite.user_schedule.event_data;
        newInvite.event_id = parseInt(this.employee.invite.user_schedule.id, 10);
        mailClient = this.employee.invite.user_schedule.calendar_mail_client;
        if (this.employee.invite.type === 'edit') {
          url = `${process.env.VUE_APP_BASE_API_URL}integrations/${mailClient}/calendar/update`;
        } else if (this.employee.invite.type === 'delete') {
          url = `${process.env.VUE_APP_BASE_API_URL}integrations/${mailClient}/calendar/delete`;
        }
      }
      newInvite.start_time = `${newInvite.date}T${newInvite.start_time}:00+05:30`;
      newInvite.end_time = `${newInvite.date}T${newInvite.end_time}:00+05:30`;
      axios.post(url, newInvite)
        .then((response) => {
          this.loading = false;
          if (response && response.data && response.data.status === 'success') {
            this.$store.dispatch('updateSnackbar', {
              color: 'info',
              show: true,
              text: 'Meeting scheduled!'
            });
            this.updateStatus();
            this.$emit('updateTimeLine');
            this.open = false;
            this.deleteModal = false;
          } else if (response.status === 204) {
            this.$store.dispatch('updateSnackbar', {
              color: 'info',
              show: true,
              text: 'Invite cancelled successfully'
            });
            this.updateStatus();
            this.$emit('updateTimeLine');
            this.open = false;
            this.deleteModal = false;
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to schedule meeting, Please try again later!'
            });
          }
        }).catch((err) => {
          this.loading = false;
          if (err.response && err.response.status === 401) {
            this.connectTo('google');
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to schedule meeting, Please try again later!'
            });
            throw new Error(err);
          }
        });
    },
    updateStatus () {
      axios.patch(`${process.env.VUE_APP_API_URL}session/update/${this.employee.last_chat_id}`, {
        action_status: 'scheduled'
      }).then((response) => {
        this.refreshing = false;
        if (response && response.data) {
          this.employee.action_status = 'scheduled';
          this.newInvite = {
            date: dayjs().format(),
            summary: 'I would like to have a meeting with you',
            description: ''
          };
          this.$emit('getEmployee');
          this.open = false;
        } else {
          this.refreshing = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update employee, Please try again later!'
          });
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update employee, Please try again later!'
        });
        throw new Error(response);
      });
    },
    updateInvite () {
      // console.log('this.employee.invite', this.employee.invite);
      const date = new Date(this.employee.invite.user_schedule.event_time);
      // console.log('date', date);
      // dayjs(date).format('HH:MM');
      // console.log('im in one on one', dayjs(date).format('HH:MM'));
      this.invite.date = date;
      const startTime = new Date(this.employee.invite.user_schedule.event_time);
      // console.log('im in one on one start', dayjs(startTime).format('HH:MM'));
      const endTime = new Date(this.employee.invite.user_schedule.expiry_time);
      // console.log('im in one on one start', dayjs(endTime).format('HH:MM'));
      this.invite.start_time = dayjs(startTime).format('HH:MM');
      this.invite.end_time = dayjs(endTime).format('HH:MM');
      this.invite.summary = this.employee.invite.user_schedule.title;
      this.invite.description = this.employee.invite.user_schedule.description;
    }
  },
  watch: {
    open () {
      if (this.open) {
        this.updateDateTime();
      }
      if (this.employee.invite) {
        this.updateInvite();
      }
    },
    deleteModal () {
      if (this.employee.invite) {
        this.updateInvite();
      }
    }
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
