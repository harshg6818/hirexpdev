<template>
  <div class="amara-requestDemo flex-row flex-wrap w-100">
    <v-snackbar :timeout="6000"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :vertical="snackbar.mode === 'vertical'"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark text @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <div>
      <v-container class="demo-page">
        <v-container style="padding-bottom:0">
          <img class="logo-login" src="@/assets/logo/image.png" alt />
        </v-container>

        <v-container>
          <div class="flex-row row wrap align-center">
            <v-container style="border-bottom:1px solid #e9ecef; padding:0 0 5px 0;">
              <span class="w-100 pb-2" style="font-size: 1.5rem; opacity:0.6; ">Support</span>
              <br />
            </v-container>
            <v-flex>
              <!-- <form  class="forms_form" v-on:submit.prevent="sendRequest"> -->
              <form class="forms_form" v-on:submit.prevent="sendRequest" >
                <div class="d-flex flex-row flex-wrap mt-2">
                  <v-flex sm6 xs12 pr-2>
                    <div class="forms_field">
                      <v-text-field
                        v-model="requester_name"
                        name="name"
                        v-validate="'required'"
                        label="Name"
                        :error-messages="errors.collect('name')"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="contact_phone"
                        v-validate="'required'"
                        name="contact number"
                        label="Contact number"
                        type="number"
                        :error-messages="errors.collect('contact number')"
                        required
                      ></v-text-field>
                    </div>
                  </v-flex>
                  <v-flex class="request-demo-inputfield" sm6 xs12 pl-2>
                    <div class="forms_field">
                      <v-text-field
                        v-model="contact_email"
                        label="Official email"
                        v-validate="'required|email'"
                        required
                        name="official email"
                        :error-messages="errors.collect('official email')"
                      ></v-text-field>
                      <v-select
                        :items="companyRole"
                        v-model="issue_type"
                        v-validate="'required'"
                        required
                        name="ticket type"
                        label="Ticket type"
                        :error-messages="errors.collect('ticket type')"
                      ></v-select>
                    </div>
                  </v-flex>
                  <div class="w-100 flex-row-reverse flex-wrap">
                    <v-flex text-sm-right text-xs-center>
                      <v-text-field
                        v-model="description"
                        v-validate="'required'"
                        label="Description"
                        name="description"
                        :error-messages="errors.collect('description')"
                        multi-line
                      ></v-text-field>
                    </v-flex>
                  </div>
                  <div class="w-100 flex-row-reverse flex-wrap">
                    <v-flex class="text-sm-right text-center">
                      <vue-recaptcha
                        ref="recaptcha"
                        @verify="onCaptchaVerified"
                        @expired="onCaptchaExpired"
                        size="invisible"
                        sitekey="6LdAPbsUAAAAAGCHcf0OhhyqtcqzB9eYkIBLpfpL"
                      ></vue-recaptcha>
                      <v-btn color="primary" class="white--text elevation-0"   @click="validateDetails()">Submit</v-btn>
                    </v-flex>
                  </div>
                </div>
              </form>
            </v-flex>
          </div>
        </v-container>
        <div class="support-bottom d-flex flex-wrap flex-row-reverse pt-3">
          <v-flex class="hideinmobile text-right" sm4>
            Made with
              <span>
                <v-icon style="font-size:12px; padding-bottom:2px;" class="red--text">fas fa-heart</v-icon>
              </span>
            in India
          </v-flex>
          <v-flex sm4 xs12 class="amaraDoc text-center">
            <a target="_blank" href="https://www.amara.ai/"> Home</a>
          </v-flex>
          <v-flex sm4 xs12 class="text-xs-center text-xs-left">
            Powered by <a  target="_blank" href="https://www.hirexp.com/"><img height="13" src="https://hirexp.com/img/logo-dark.png" alt=""></a>
          </v-flex>
        </div>
      </v-container>
    </div>
    <div class="login-carousel">
      <v-carousel :cycle="this.autoPlay"  class="login-carousel" style="width:33%; position:absolute; right:0; height: 100% !important;">
        <v-carousel-item @mouseover="autoPlay = false" @mouseleave="autoPlay = true"  style="height:100% !important"  v-for="(item,i) in items"
          :key="i"
          :src="item.src"
        >
        <div
          class="fill-height flex-row"
          align="center"
          justify="center"
        >
          <div class="carousel-heading">{{ item.heading }}</div>
          <div class="carousel-text">{{ item.text }}</div>
        </div>
          <div class="demo-carousel-request-button"  >
            <v-flex text-sm-right text-xs-center>
              <v-btn style="font-size:14px; color:var(--v-primary-base) !important;" color="#f1f1f1" class="ma-0" to="/login">Login</v-btn>
            </v-flex>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
    <v-container>
      <V-layout>
        <div class="successful-server-response-wrapper" v-cloak>
          <div
            v-show="sucessfulServerResponse"
            class="successful-server-response"
          >{{sucessfulServerResponse}}
          </div>
        </div>
      </V-layout>
    </v-container>
  </div>
</template>

<script>
// import Vue from 'vue';
import axios from 'axios';
import { mapState } from 'vuex';
import VueRecaptcha from 'vue-recaptcha';
import { VSnackbar, VTextField } from 'vuetify';

export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    VSnackbar,
    VTextField,
    VueRecaptcha
  },
  name: 'Login',
  computed: {
    ...mapState({
      snackbar: state => state.snackbar
    })
  },
  data () {
    return {
      autoPlay: true,
      name: '',
      items: [
        {
          src: require('../assets/gradiant1.png'),
          heading: 'Customized workflow',
          text: 'Amara workflow can be easily customized to meet your employee engagement and candidate experience objectives.'
        },
        {
          src: require('../assets/gradiant2.png'),
          heading: 'Scalable model',
          text: 'Amara is designed to scale horizontally to handle thousands of users and chat sessions per day while providing the fastest response time.'
        },
        {
          src: require('../assets/gradiant3.png'),
          heading: 'Ad-hoc campaigns',
          text: 'Create ad-hoc campaigns to further deep dive into specific problem areas and gather insights at any given point of time'
        },
        {
          src: require('../assets/gradiant4.png'),
          heading: 'Seamless integrations',
          text: 'Amara can easily integrate with your existing HRIS and the chats can be deployed across multiple communication channels like Emails, SMS, WhatsApp, Slack and many more.'
        }
      ],
      disabled: false,
      refreshing: false,
      requester_name: '',
      contact_email: '',
      issue_type: '',
      contact_phone: '',
      company_name: '',
      description: '',
      companyRole: [{
        text: 'Login'
      }, {
        text: 'Accounts And Billing'
      }, {
        text: 'Technical'
      }, {
        text: 'Chat'
      }, {
        text: 'Other'
      }],
      valid: true,
      email: '',
      password: '',
      passwordConfirmation: '',
      status: '',
      sucessfulServerResponse: '',
      serverError: ''

    };
  },
  methods: {
    validateDetails () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.sendRequest();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    sendRequest () {
      this.$refs.recaptcha.execute();
    },
    onCaptchaVerified: function (recaptchaToken) {
      const self = this;
      self.status = 'submitting';
      self.$refs.recaptcha.reset();
      axios.post(`${process.env.VUE_APP_API_URL}support/website/add`, {
        ticket_type: 'Support',
        requester_name: this.requester_name,
        contact_email: this.contact_email,
        contact_phone: this.contact_phone,
        issue_type: this.issue_type,
        description: this.description,
        'recaptcha-token': recaptchaToken
      }).then((response) => {
        this.disabled = false;
        this.refreshing = false;
        if (response.data) {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Successfully submitted, our team will get back to you!'
          });
          this.$router.push('/login');
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to submit request, Please try again later.'
          });
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to submit request, Please try again later.'
        });
        this.disabled = false;
        this.refreshing = false;
        throw new Error(response);
      });
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset();
    }

  },
  beforeMount () {
    if (this.$route.query) {
      this.requester_name = this.$route.query.name !== 'undefined' ? this.$route.query.name : '';
      this.contact_email = this.$route.query.email !== 'undefined' ? this.$route.query.email : '';
      this.issue_type = this.$route.query.ticket_type !== 'undefined' ? this.$route.query.ticket_type : '';
    }
  }
};
</script>

<style lang="scss">
.amara-requestDemo {
  .login-bg {
    height: calc(100vh - 87px);
    background: url(../assets/bg-login.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  .v-responsive {
    height: 100% !important;
  }
  .fa-chevron-right,
  .fa-chevron-left {
    font-size: 15px !important;
    padding: 10px;
  }
  .fa-circle {
    font-size: 10px !important;
  }
  .carousel-heading {
    width: 100%;
    position: absolute;
    top: 40%;
    font-size: 24px !important;
    padding: 0 15px;
    font-weight: 500;
    text-align: center !important;
    margin: 0;
    color: white;
    font-family: "Montserrat", Arial, Tahoma, sans-serif !important;
  }
  .carousel-text {
    width: 100%;
    position: absolute;
    top: 47%;
    font-size: 16px !important;
    text-align: center !important;
    padding: 0 10%;
    margin: 0;
    color: rgb(235, 229, 229);
    font-family: "Montserrat", Arial, Tahoma, sans-serif !important;
  }
  .demo-carousel-request-button {
    width: 100%;
    position: absolute;
    top: 63%;
    right: 30%;
    font-size: 16px !important;
    padding: 0 10%;
    margin: 0;
    color: rgb(235, 229, 229);
    font-family: "Montserrat", Arial, Tahoma, sans-serif !important;
  }
  @media only screen and (max-width: 1024px) {
    .demo-carousel-request-button {
      right: 25%;
      top: 65%;
    }
  }
  .v-carousel__controls {
    background: transparent;
  }
  .v-label {
    margin-top: -5px;
  }
  .v-input input,
  .v-text-field__slot {
    font-size: 14px;
  }
  .logo-login {
    width: 80px;
  }
  .v-window__container {
    height: 100% !important;
  }
  @media only screen and (max-width: 1000px) {
    .login-carousel {
      display: none;
    }
  }
  .demo-page {
    width: 67%;
    position: absolute;
    left: 0;
    padding: 0% 8%;
    margin: 0px;
  }
  @media only screen and (max-width: 1024px) {
    .demo-page {
      padding: 3% 8%;
    }
  }
  @media only screen and (max-width: 1000px) {
    .demo-page {
      position: static !important;
      width: 100%;
    }
  }

  @media only screen and (max-width: 1000px) {
    .login-input-field {
      width: 100% !important;
    }
  }

  @media only screen and (max-width: 624px) {
    .request-demo-inputfield {
      padding-left: 0 !important;
    }
  }
  .support-bottom {
    position: fixed;
    bottom: 0;
    left: 10px;
    width: 65% !important;
  }
  @media only screen and (max-width: 1000px) {
    .support-bottom {
      width: 97% !important;
    }
  }
  @media only screen and (max-width: 624px) {
    .support-bottom {
      position: static;
    }
  }
  .grecaptcha-badge{
    z-index: 99 !important;
  }
  .amaraDoc, .amaraDoc *{
    color:rgb(73, 73, 73);
    font-size: 11px;
    padding: 10px auto;
}
@media only screen and (max-width: 600px) {
  .hideinmobile {
    display: none;

  }
}
.showinmobile {
    display:none;
}
@media only screen and (max-width: 1000px) {
  .showinmobile {
    display:block;

  }
}
@media only screen and (max-width: 624px) {
  .showinmobile {
    text-align: center;

  }
}
}

</style>
