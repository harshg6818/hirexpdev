<template>
  <v-dialog max-width="700px"
    v-model="open"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        Email {{this.employee.display_name}}
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              class="grey--text text--lighten-2"
              maxlength="100"
              outline
              v-model="email.subject"
              v-validate="'required'"
              flat
              :error-messages="errors.collect('subject')"
              name="subject"
              label="Subject"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <VuePellEditor class="w-100" v-model="email.message_text" placeholder="Enter email description" />
            <!-- <v-textarea
              class="grey--text text--lighten-2"
              maxlength="200"
              outline
              v-model="email.message_text"
              flat
              :error-messages="errors.collect('description')"
              @click.stop
              name="description"
              label="Description"
            ></v-textarea> -->
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
            Send
          </v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import axios from 'axios';
// import { VTextarea } from 'vuetify';
// import dayjs from 'dayjs';
import VueAuthenticate from 'vue-authenticate-fork';
import VuePellEditor from 'vue-pell-editor';

Vue.prototype.$http = axios;

Vue.use(VuePellEditor);

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
  name: 'EmailEmployee',
  // components: {
  //   VTextarea
  // },
  data () {
    return {
      loading: false,
      open: false,
      employee: {},
      email: {
        to_address: '',
        subject: '',
        cc_recipients: [],
        message_text: '',
        message_type: 'html'
      }
    };
  },
  computed: {
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
          this.sendEmail();
        }
      });
    },
    allowedStep: m => m % 5 === 0,
    validateDetails () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.sendEmail();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    sendEmail () {
      this.loading = true;
      const newEmail = JSON.parse(JSON.stringify(this.email));
      newEmail.to_address = this.employee.email;
      const mailClient = this.user && this.user.user_profile && this.user.user_profile.default_mail_client ? this.user.user_profile.default_mail_client : 'google';
      axios.post(`${process.env.VUE_APP_BASE_API_URL}integrations/${mailClient}/send_email`, newEmail)
        .then((response) => {
          this.loading = false;
          if (response && response.data) {
            this.$store.dispatch('updateSnackbar', {
              color: 'info',
              show: true,
              text: 'Email Sent!'
            });
            this.email = {
              to_address: '',
              subject: '',
              cc_recipients: [],
              message_text: '',
              message_type: 'html'
            };
            this.open = false;
            this.updateStatus();
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to send an email, Please try again later!'
            });
          }
        }).catch((err) => {
          // console.log('email err', err);
          this.loading = false;
          if (err.response && err.response.status === 401) {
            this.connectTo('google');
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to send email. Please check if your account is connected and in active state.'
            });
            throw new Error(err);
          }
        });
    },
    updateStatus () {
      axios.patch(`${process.env.VUE_APP_API_URL}session/update/${this.employee.last_chat_id}`, {
        action_status: 'inProgress'
      }).then((response) => {
        this.refreshing = false;
        if (response && response.data) {
          this.employee.action_status = 'inProgress';
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
      });
    }
  },
  watch: {},
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
