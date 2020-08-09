<template>
<div>
  <v-dialog max-width="700px"
  ref="bulkEmail"
    v-model="open"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        Email
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="text-xs-left selected-emp">
              <v-chip color="primary" text-color="white" v-for="(item,index) in selectedEmpEmail" :key="index">
                <v-avatar>
                  <v-icon color="white">far fa-envelope</v-icon>
                </v-avatar>
                {{item}}
              </v-chip>
            </div>
          </v-flex>
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
  <v-snackbar
    v-model="snackbar.show"
    :bottom="true"
    :color="snackbar.color"
    :auto-height="true"
    :timeout="snackbar.timeout"
    :top="false"
    >
      {{ snackbar.text }}
      <v-btn
        v-if="snackbar.showBtn"
        color="white"
        flat
        @click="snackbar.show = false"
      >
        Close
      </v-btn>
  </v-snackbar>
    <SocketResponse ref="socketResponse" :selectedEmp="selectedEmp" :res="socketResponseUpdate"></SocketResponse>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import axios from 'axios';
// import { VTextarea, VSnackbar, VChip, VAvatar } from 'vuetify';
// import dayjs from 'dayjs';
import VueAuthenticate from 'vue-authenticate-fork';
import VuePellEditor from 'vue-pell-editor';
import SocketResponse from './SocketResponse';

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
  components: {
    // VTextarea,
    // VSnackbar,
    // VAvatar,
    // VChip,
    SocketResponse
  },
  props: {
    numbers: {
      required: true,
      type: Array
    },
    selectedEmp: {
      required: false,
      tyep: [Object, Array],
      default: () => {}
    }
  },
  data () {
    return {
      socketResponseUpdate: [],
      loading: false,
      open: false,
      employee: {},
      selectedEmpEmail: [],
      email: {
        subject: '',
        cc_recipients: [],
        message_text: '',
        message_type: 'html'
      },
      snackbar: {
        show: false,
        color: 'info',
        timeout: 6000,
        text: '',
        showBtn: true
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
      // const that = this;
      this.$emit('sendingEmail');
      this.loading = true;
      const newEmail = JSON.parse(JSON.stringify(this.email));
      const temp = [];
      this.$lodash.each(this.numbers, (val) => {
        const t = {};
        t.user_id = val[1].last_chat_id;
        t.to_address = val[1].email;
        t.display_name = val[1].display_name;
        temp.push(t);
      });
      const mailClient = this.user && this.user.user_profile && this.user.user_profile.default_mail_client ? this.user.user_profile.default_mail_client : 'google';
      axios.post(`${process.env.VUE_APP_BASE_API_URL}integrations/${mailClient}/send_email_bulk`, {
        ...newEmail,
        user_data_list: temp
      })
        .then((response) => {
          this.loading = false;
          if (response && response.data) {
            this.email = {
              subject: '',
              cc_recipients: [],
              message_text: '',
              message_type: 'html'
            };
            this.open = false;
            this.snackbar.show = true;
            this.snackbar.text = response.data.status;
            this.snackbar.showBtn = false;
            const session = JSON.parse(localStorage.getItem('CHATBOT_USER'));
            const company = session.company.replace(/-/g, '');
            const socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}${company}/?verify=${session.access_token}`);
            socket.addEventListener('message', (res) => {
              // console.log('bulkAcknowledgeUpdate -> res', res);
              this.snackbar.show = false;
              const tempRes = JSON.parse(res.data);
              this.snackbar.show = true;
              this.snackbar.text = 'User action completed';
              this.$emit('completedEmail');
              this.$emit('setCountStatus', tempRes);
              // this.snackbar.text = tempRes;
              this.snackbar.timeout = 3000;
              this.snackbar.showBtn = true;
              this.socketResponseUpdate = tempRes;
              // that.$refs.socketResponse.dialog = true;
              socket.close();
            });
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
    }
  },
  watch: {
    numbers () {
      this.selectedEmpEmail = [];
      this.$lodash.each(this.numbers, (val) => {
        this.selectedEmpEmail.push(val[1].display_name);
      });
    }
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.selected-emp {
  max-height: 130px;
  overflow-y: scroll;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 4px;
}
</style>
