<template>
  <v-layout class="amara-requestDemo" row wrap w-100>
    <v-snackbar :timeout="6000"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :vertical="snackbar.mode === 'vertical'"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <v-layout>
      <v-container class="demo-page">
        <v-btn style = "text-transform:none; position:absolute; top:2%; right:3%;" color="#888" target="_blank" to="/support" flat > Need help&nbsp;?</v-btn>
        <v-container style="padding-bottom:0">
          <img class="logo-login" src="@/assets/logo/image.png" alt />
        </v-container>

        <v-container>
          <v-layout row wrap align-center>
            <v-container style="border-bottom:1px solid #e9ecef; padding:0 0 5px 0;">
              <span class="w-100 pb-2" style="font-size: 1.5rem; opacity:0.6; ">Request a demo</span>
              <br />
            </v-container>
            <v-flex>
               <!-- <form  class="forms_form" v-on:submit.prevent="sendRequest"> -->
              <form class="forms_form" v-on:submit.prevent="sendRequest" >
                <v-layout row wrap mt-2>
                  <v-flex sm6 xs12 pr-2>
                    <div class="forms_field">
                      <v-text-field
                        v-model="contactSales.requester_name"
                        name="name"
                        v-validate="'required'"
                        label="Name"
                        :error-messages="errors.collect('name')"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="contactSales.contact_phone"
                        v-validate="'required'"
                        name="contact phone"
                        label="Contact number"
                        type="number"
                        :error-messages="errors.collect('contact phone')"
                        required
                      ></v-text-field>
                      <v-select
                        :items="companyRole"
                        v-model="contactSales.requester_role"
                        v-validate="'required'"
                        required
                        name="requester role"
                        label="Role"
                        :error-messages="errors.collect('requester role')"
                      ></v-select>
                    </div>
                  </v-flex>
                  <v-flex class="request-demo-inputfield" sm6 xs12 pl-2>
                    <div class="forms_field">
                      <v-text-field
                        v-model="contactSales.contact_email"
                        label="Official email"
                        v-validate="'required|email'"
                        required
                        name="contact_email"
                        :error-messages="errors.collect('contact_email')"
                      ></v-text-field>

                      <v-text-field
                        v-model="contactSales.company_name"
                        label="Company name"
                        name="company name"
                        v-validate="'required|max:100'"
                        hint="Company name should be 1-100 characters"
                        :error-messages="errors.collect('company name')"
                        required
                      ></v-text-field>
                      <v-select
                        :items="companySize"
                        v-model="contactSales.company_size"
                        v-validate="'required'"
                        label="Employee Strength"
                        name="company size"
                        :error-messages="errors.collect('company size')"
                        required
                      ></v-select>
                    </div>
                  </v-flex>
                  <v-layout w-100 row wrap reverse>
                    <v-flex text-sm-right text-xs-center>
                      <v-text-field
                        v-model="contactSales.requester_message"
                        v-validate="'required'"
                        label="Message"
                        name="requester message"
                        :error-messages="errors.collect('requester message')"
                        multi-line
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap reverse>
                    <v-flex text-sm-right text-xs-center sm6 xs12>
                      <vue-recaptcha
                        ref="recaptcha"
                        @verify="onCaptchaVerified"
                        @expired="onCaptchaExpired"
                        size="invisible"
                        sitekey="6LdAPbsUAAAAAGCHcf0OhhyqtcqzB9eYkIBLpfpL"
                      ></vue-recaptcha>
                      <v-btn color="primary" class="white--text elevation-0" @click="validateDetails() ">Submit Request</v-btn>
                    </v-flex>
                    <v-flex class="showinmobile"  text-sm-left sm6 xs12>
                      <v-btn flat style="color:var(--v-primary-base) !important; font-size:14px" color="#f1f1f1" class="ma-0" to="/login">Login</v-btn>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </form>
            </v-flex>
          </v-layout>
        </v-container>
        <v-layout class="demo-bottom" pt-3  row wrap reverse>
          <v-flex class="hideinmobile" sm4  text-xs-right>
            Made with <span ><v-icon style="font-size:12px; padding-bottom:2px;" class="red--text">fas fa-heart</v-icon></span> in India
          </v-flex>
          <v-flex sm4 xs12  text-xs-center class="amaraDoc">
            <a target="_blank" href="https://www.amara.ai/"> Home</a>
            <!-- &nbsp; &#8226; &nbsp;<a href=""> Privacy Policy</a>
            &nbsp; &#8226; &nbsp;<a href="">Terms of Use</a> -->
          </v-flex>

          <v-flex sm4 xs12 text-sm-left text-xs-center>
            Powered by <a  target="_blank" href="https://www.hirexp.com/"><img height="13" src="https://hirexp.com/img/logo-dark.png" alt=""></a>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <v-layout class="login-carousel">
      <v-carousel :cycle="this.autoPlay" class="login-carousel" style="width:33%; position:absolute; right:0; height: 100% !important;">
        <v-carousel-item @mouseover="autoPlay = false" @mouseleave="autoPlay = true"  style="height:100% !important"  v-for="(item,i) in items"
          :key="i"
          :src="item.src"
        >
        <v-layout row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="carousel-heading">{{ item.heading }}</div>
          <div class="carousel-text">{{ item.text }}</div>
        </v-layout>
          <v-layout class="demo-carousel-request-button"  >
            <v-flex text-sm-right text-xs-center>
              <v-btn style="font-size:14px; color:var(--v-primary-base) !important;" color="#f1f1f1" class="ma-0" to="/login">Login</v-btn>
            </v-flex>
          </v-layout>
        </v-carousel-item>
      </v-carousel>
    </v-layout>
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
  </v-layout>
</template>

<script>
// import Vue from 'vue'
import axios from 'axios';
import { mapState } from 'vuex';
import VueRecaptcha from 'vue-recaptcha';
// import { VSnackbar, VTextField } from 'vuetify'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    // VSnackbar,
    // VTextField,
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
      contactSales: {
        requester_name: '',
        contact_email: '',
        requester_role: '',
        company_size: '',
        contact_phone: '',
        company_name: '',
        requester_message: ''
      },
      companySize: [
        { text: 'Up-to 50' },
        { text: '50-100' },
        { text: '100-150' },
        { text: '150-200' },
        { text: '200-300' },
        { text: '300-400' },
        { text: '400-500' },
        { text: '500-600' },
        { text: '600-800' },
        { text: '800-1000' },
        { text: 'More than 1000' }
      ],
      companyRole: [
        { text: 'CEO' },
        { text: 'COO' },
        { text: 'CFO' },
        { text: 'HR' },
        { text: 'Sales' },
        { text: 'Marketing' },
        { text: 'Other' }
      ],
      valid: true,
      // name: '',
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
        ticket_type: 'Demo Request',
        requester_name: this.contactSales.requester_name,
        contact_email: this.contactSales.contact_email,
        contact_phone: this.contactSales.contact_phone,
        company_size: this.contactSales.company_size,
        requester_role: this.contactSales.requester_role,
        description: this.contactSales.requester_message,
        'recaptcha-token': recaptchaToken
      }).then((response) => {
        this.disabled = false;
        this.refreshing = false;
        if (response.data) {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Successfully submitted, our sales team will get back to you in next 6-8 hours!'
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
  .layout.row.wrap.demo-bottom {
    position: fixed;
    bottom: 0;
    left: 10px;
    width: 65% !important;
  }
  @media only screen and (max-width: 1000px) {
    .layout.row.wrap.demo-bottom {
      width: 97% !important;
    }
  }
  @media only screen and (max-width: 624px) {
    .layout.row.wrap.demo-bottom {
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
