<template>
<div>
  <div class="d-flex flex-row flex-wrap px-2">
    <v-flex sm12>
      <v-subheader class="py-0 px-0">
        <div class="d-flex flex-row flex-wrap">
          <strong class="py-2 px-2" style=" font-size:18px; color:grey;">
            Integration
          </strong>
          <div class="py-2 px-2 mt-1 text-muted"> Third party integrations are not applicable on this account. </div>
        </div>
      </v-subheader>
    </v-flex>

    <v-flex class="px-3 py-1 mb-3" sm6 md4 xl4 v-for="(intgrt, i) in presentIntegrations" :key="i">
      <v-card class="elevation-0 integrations-card" height="320">
        <v-card-title primary-title class="justify-center">
          <v-img :src="getImgUrl(intgrt.logo)" contain height="100" /> <br/>
        </v-card-title>
        <!-- <p class="mb-0 text-xs-center" style="color:#3a811d" v-if="intgrt.integrated"> Connected </p> -->
        <v-card-text class="text-center pt-0">
          <div>
            <p class="mb-0 font-weight-bold">
              {{intgrt.title}}
            </p>
            <p class="mb-0" style="color:grey;height: 84px;">
              {{intgrt.sub_title}}
            </p>
          </div>
        </v-card-text>
        <v-card-text style="margin-top: -5%;" class="justify-center align-center text-center">
          <v-btn color="primary" small depressed
            v-if="!intgrt.integrated"
            :disabled="!intgrt.integrationPresent"
            @click="connectTo(intgrt)"
          >Connect</v-btn>
          <v-btn color="primary" :disabled="!intgrt.integrationPresent" small depressed v-if="intgrt.integrated"
            @click="disconnectToWhatsapp(intgrt)"
          >Disconnect</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </div>
  <whatsappDialog :dialog="whatsAppModal" @closeWhatsappModal="closeWhatsappModal" @connectToWhatsapp="connectToWhatsapp" />
  <v-dialog
    v-if="whatsappErrorDialog"
    v-model="whatsappErrorDialog"
    width="500"
  >
    <v-card>
        <v-card-text>
          <div style="margin-left: 37%">
            <v-icon v-if="whatsAppConnected" size="140" color="green">far fa-check-circle</v-icon>
            <v-icon v-if="!whatsAppConnected" size="140" color="red">far fa-times-circle</v-icon>
          </div>
        </v-card-text>
        <v-card-text>
          <v-layout v-if="!whatsAppConnected">
            <v-flex style="text-align:center;color:red">
              Something went wrong please try again later!
            </v-flex>
          </v-layout>
          <v-layout v-if="whatsAppConnected">
            <v-flex v-if="!whatsAppDisConnected" style="text-align:center;color:green">
              Successfully connected to WhatsApp
            </v-flex>
            <v-flex v-if="whatsAppDisConnected" style="text-align:center;color:green">
              Successfully disconnected to WhatsApp
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="whatsappErrorDialog = false">Ok</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="whatsappDisconnectDialog"
      width="500"
    >
      <v-card>
        <v-card-text>
          <div style="margin-left: 40%">
            <v-icon size="100" color="#ffcc00">fas fa-exclamation-triangle</v-icon>
          </div>
        </v-card-text>
        <v-card-text>
          <v-layout>
            <v-flex style="text-align:center;color:red">
              Are you sure you want to disconnect the WhatsApp.
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat small @click="whatsappDisconnectDialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="disconnectTo()">Disconnect</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import { VChip, VMenu, VSubheader } from 'vuetify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import VueAuthenticate from 'vue-authenticate-fork';
import whatsappDialog from './dialogs/whatsappDialog';

dayjs.extend(relativeTime);

Vue.prototype.$http = axios;

Vue.use(VueAuthenticate, {
  baseUrl: `${process.env.VUE_APP_BASE_API_URL}/integrations`, // Your API domain

  providers: {
    slack: {
      scope: ['chat:write:bot', 'im:read', 'bot', 'users:read', 'users:read.email'],
      url: 'integrations/slack/token',
      optionalUrlParams: ['prompt', 'access_type'],
      accessType: 'offline',
      prompt: 'consent',
      clientId: '208579404768.476958196162'
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
    },
    live: {
      scope: ['offline_access', 'Mail.Send', 'User.Read', 'Mail.Read', 'Mail.ReadWrite', 'Calendars.ReadWrite'],
      url: 'outlook/oauth2callback',
      clientId: 'fa4ce73b-8bf1-43df-b8e2-8231db2564ee',
      authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
    }
  }
});

export default {
  name: 'integrations',
  components: {
    // ContentLoader,
    // VChip,
    // VMenu,
    // dayjs,
    // VSubheader,
    whatsappDialog
  },
  data () {
    return {
      company: {},
      whatsappDisconnectDialog: false,
      whatsAppModal: false,
      whatsAppConnected: false,
      whatsAppDisConnected: false,
      whatsappErrorDialog: false,
      presentIntegrations: [{
        title: 'WhatsApp',
        logo: 'whatsapp',
        sub_title: 'Connect with employees all over the world in a simple, secure and reliable way',
        comingsoon: false,
        integrationPresent: false,
        integrated: false
      }, {
      //   title: 'Gmail',
      //   key: 'google',
      //   logo: 'gmail',
      //   sub_title: 'Get powerfull notifications on any of your Slack channels',
      //   comingsoon: false,
      //   integrationPresent: true,
      //   integrated: false,
      // }, {
      //   title: 'Outlook',
      //   key: 'live',
      //   logo: 'outlook',
      //   sub_title: 'Get powerfull notifications on any of your Slack channels',
      //   comingsoon: false,
      //   integrationPresent: true,
      //   integrated: false,
      // }, {
        title: 'Slack',
        key: 'slack',
        logo: 'slack',
        sub_title: 'The best way to keep your team in the loop is to bring updates where they spend most time.',
        comingsoon: false,
        integrationPresent: false,
        integrated: false

      }, {

        title: 'Calendar',
        logo: 'calendar',
        sub_title: 'Get a clear overview of your tasks for the day, week, month, neatly organized inside your calendar.',
        comingsoon: false,
        integrated: false
      }, {
        title: 'Workplace by Facebook',
        logo: 'workplace',
        sub_title: 'Workplace is a collaboration tool that connects everyone in an organization.',
        comingsoon: true,
        integrated: false
      }, {
        title: 'SMS',
        logo: 'sms',
        sub_title: 'CRM and text messaging platform allows employees to be more productive and responsive.',
        comingsoon: false,
        integrationPresent: false,
        integrated: false
      }, {
        title: 'Telegram',
        logo: 'telegram',
        sub_title: 'Telegram is a messaging app with a focus on speed and security, it is super-fast, simple and free.',
        comingsoon: true,
        integrated: false
      }, {
        title: 'Meet',
        logo: 'meet',
        sub_title: 'You can easily extend the reach of classic Hangout video calls to other video conferencing systems.',
        comingsoon: false,
        integrated: false
      }, {
        title: 'Viber',
        logo: 'viber',
        sub_title: 'Viber Service Messages Account allows you to send targeted messages to your users',
        comingsoon: true,
        integrated: false
      // }, {
      //   title: 'Facebook Messenger',
      //   logo: 'messenger',
      //   comingsoon: true,
      //   sub_title: 'Get powerfull notifications on any of your Slack channels',
      //   integrated: false,
      }]
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    connectTo (provider) {
      if (provider.title === 'WhatsApp') {
        this.openWhatsappModal();
      }
      this.$auth.authenticate(provider.key).then().catch((err) => {
        if (err && err.data && err.data.message) {
          if (!this.user.integrations) {
            this.user.integrations = {};
          }
          this.$lodash.each(this.presentIntegrations, (integration, index) => {
            integration.integrated = false;
          });
          provider.integrated = true;
          this.user.integrations[provider.key] = err.data.message;
          if (this.user && this.user.user_profile) {
            this.user.user_profile.default_mail_client = provider.key === 'live' ? 'outlook' : 'google';
          }
          this.$store.dispatch('createSession', this.user);
          this.sendInvite();
        }
      });
      // integrated = true;
    },

    disconnectToWhatsapp () {
      this.whatsappDisconnectDialog = true;
    },

    disconnectTo () {
      this.connectToWhatsapp();
    },

    openWhatsappModal () {
      this.whatsAppModal = true;
      // this.whatsappErrorDialog = true;
    },

    connectToWhatsapp () {
      axios.patch(`${process.env.VUE_APP_API_URL}company/update/${this.user.company}`, {
        notification_enabled: !this.company.notification_enabled
      }).then((res) => {
        if (res.status === 200) {
          this.whatsAppConnected = true;
          this.whatsAppModal = false;
          this.whatsappErrorDialog = true;
          this.whatsappDisconnectDialog = false;
          this.getCompanyDetails();
        } else {
          this.whatsAppConnected = false;
          this.whatsappErrorDialog = true;
        }
      });
    },

    closeWhatsappModal () {
      this.whatsAppModal = false;
    },

    getCompanyDetails () {
      axios.get(`${process.env.VUE_APP_API_URL}company/profile`).then((response) => {
        if (response && response.data) {
          this.company = response.data;
        }
      });
    },

    updateIntegrations () {
      if (this.company && 'notification_enabled' in this.company) {
        const match = this.$lodash.findIndex(this.presentIntegrations, integration => integration.title === 'WhatsApp');
        if (match >= 0) {
          this.presentIntegrations[match].integrated = this.company.notification_enabled;
          this.whatsAppDisConnected = !this.company.notification_enabled;
        }
      }
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
          this.member = response.data;
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
    }
  },

  watch: {
    company () {
      this.updateIntegrations();
    }
  },
  beforeMount () {
    this.getCompanyDetails();
    if (this.$route.params && this.$route.params.memberId) {
      this.getIntegrations(this.$route.params.memberId);
    }
    this.$lodash.each(this.presentIntegrations, (integration, index) => {
      integration.integrated = false;
    });
    let match = -1;
    if (this.user && this.user.user_profile && this.user.user_profile.default_mail_client === 'google') {
      match = this.$lodash.findIndex(this.presentIntegrations, integration =>
        integration.key === 'google');
    } else if (this.user && this.user.user_profile && this.user.user_profile.default_mail_client === 'outlook') {
      match = this.$lodash.findIndex(this.presentIntegrations, integration =>
        integration.key === 'live');
    }
    if (match >= 0) {
      this.presentIntegrations[match].integrated = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.integrations-card:hover{
  transform: scale(1.05);
  transition: 0.4s ease all;
}
</style>
