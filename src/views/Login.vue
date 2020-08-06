<template>
  <!-- <v-layout class="amara-login" v-show="refreshing" :class="{'refreshing' : disabled}"> -->
  <div class="amara-login" v-show="refreshing" :class="{'refreshing' : disabled}">
    <v-snackbar
      :timeout="6000"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :vertical="snackbar.mode === 'vertical'"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn text @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <div class="login-carousel">
      <v-carousel :cycle="autoPlay" class="login-carousel" style="width:33%; position:absolute; height:100% !important;">
        <v-carousel-item
          @mouseover="autoPlay = false"
          @mouseleave="autoPlay = true"
          style="height:100% !important"
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
        >
          <div
            align="center"
            justify="center"
          >
            <div class="carousel-heading">{{ item.heading }}</div>
            <div class="carousel-text">{{ item.text }}</div>
          </div>
          <div class="login-carousel-request-button">
            <v-flex text-sm-right text-xs-center>
              <v-btn style="font-size:14px; color:var(--v-primary-base) !important;" color="#f1f1f1" class="ma-0" to="/Request-demo">Request a demo</v-btn>
            </v-flex>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>

    <v-container class="login-page" style="">
      <v-btn style="text-transform:none; position:absolute; top:2%; right:3%;" color="#888" target="_blank" to="/support" text > Need help&nbsp;?</v-btn>
        <v-container style="padding-bottom:0">
          <img class="logo-login" src="@/assets/logo/image.png" alt="">
        </v-container>

        <v-container>
          <v-flex>
            <div class="elevation-0">
              <form autocomplete="off" ref="form" class="forms_form w-100" v-if="!forgotPasswordToggle" v-on:submit.prevent="login">
                <v-container style="border-bottom:1px solid #e9ecef; padding:0 0 10px 0;" >
                  <span class=" w-100 pb-2 " style="font-size: 1.5rem; opacity:0.6; ">Login to dashboard</span>
                </v-container>
                <v-container style="border-bottom:1px solid #e9ecef; padding-left:0; padding-right:0; min-height:auto;">
                  <div class="login-input-field d-flex flex-wrap">
                    <v-flex px-1>
                      <v-text-field
                      :autofocos="true"
                      placeholder=""
                      prepend-icon="fas fa-user"
                      label="Email"
                      v-model="email"
                      required
                      @keyup.native.enter="validateDetails"
                      ></v-text-field>
                    </v-flex>
                    <v-flex px-1>
                      <v-text-field
                        :autofocos="true"
                        placeholder=""
                        prepend-icon="fas fa-lock"
                        :append-icon="e1 ? 'fas fa-eye-slash' : 'fas fa-eye'"
                        @click:append="(e1 = !e1)"
                        v-model="password"
                        :type="e1 ? 'password' : 'text'"
                        @keyup.native.enter="validateDetails"
                        required
                        label="Password"
                      ></v-text-field>
                    </v-flex>
                  </div>
                </v-container>
                <div class="d-flex flex-wrap flex-row-reverse mt-2">
                  <v-flex text-sm-right text-xs-center sm6 xs12>
                    <vue-recaptcha
                      ref="recaptcha"
                      @verify="onCaptchaVerified"
                      @expired="onCaptchaExpired"
                      size="invisible"
                      sitekey="6LcRPbsUAAAAAOTgJ2YhwKLCNeQoWDu-7fP3xuyt"
                    ></vue-recaptcha>
                    <v-btn style="font-size:14px" color="primary" :loading="loading"
                      class="white--text elevation-0" @click="validateDetails" >Login</v-btn>
                  </v-flex>
                  <v-flex text-sm-left py-2 text-xs-center sm6 xs12>
                    <span class="w-100 forgotpass" text-xs-center text-sm-center><a style="font-weight:400; font-size:14px; color:#757575;" :loading="disabled" :disabled="disabled"
                      text @click="fpToggle">Forgot your password?</a></span>
                  </v-flex>
                  <v-flex class="showinmobile"  text-sm-center>
                    <v-btn style="color:var(--v-primary-base) !important; font-size:14px"  color="#f1f1f1" class="ma-0 primary--text elevation-0" to="/Request-demo">Request for Demo</v-btn>
                  </v-flex>
                </div>
              </form>
              <form class="w-100 mt-4" v-if="forgotPasswordToggle"
                v-on:submit.prevent="forgot">
                <v-container style="padding:0 0 10px 0;" >
                  <span class=" w-100 pb-2 " style="font-size: 1.5rem; opacity:0.6; ">Forgot your Password?</span>
                </v-container>
                <v-text-field
                  v-model="forgotEmail"
                  label="Enter you email address"
                  @keyup.native.enter="forgot"
                  required
                ></v-text-field>
                <div class="d-flex flex-wrap flex-row-reverse">
                  <v-flex class="text-sm-right text-xs-center">
                    <v-btn style="font-size:14px" :loading="disabled" :disabled="disabled" color="deep-purple"
                      class="white--text text-sm-right text-xs-center" @click="forgot" >Send password reset link</v-btn>
                  </v-flex>
                  <v-flex class="text-sm-left text-xs-center">
                    <v-btn text  style="font-size:14px" class="text-sm-left text-xs-center" color="primary" @click="fpToggle">Login</v-btn>
                  </v-flex>
                </div>
              </form>
            </div>
          </v-flex>
        </v-container>

        <div class="login-bottom d-flex flex-wrap flex-row-reverse pt-3">
          <v-flex class="hideinmobile text-right" sm4>
            Made with <span ><v-icon style="font-size:12px; padding-bottom:2px;" class="red--text">fas fa-heart</v-icon></span> in India
          </v-flex>
          <v-flex sm4 xs12 class="amaraDoc text-center">
            <a target="_blank" href="https://www.amara.ai/"> Home</a>
            <!-- &nbsp; &#8226; &nbsp;<a href=""> Privacy Policy</a>
            &nbsp; &#8226; &nbsp;<a href="">Terms of Use</a> -->
          </v-flex>
          <v-flex sm4 xs12 class="text-xs-center text-xs-left">
            Powered by <a  target="_blank" href="https://www.hirexp.com/"><img height="13" src="https://hirexp.com/img/logo-dark.png" alt=""></a>
          </v-flex>
        </div>
      </v-container>

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
import axios from 'axios';
import { mapState } from 'vuex';
import VueRecaptcha from 'vue-recaptcha';

export default {
  components: {
    VueRecaptcha
  },
  name: 'Login',
  data () {
    return {
      sucessfulServerResponse: '',
      autoPlay: true,
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
      e1: true,
      disabled: false,
      loginActive: false,
      forgotPasswordToggle: false,
      email: null,
      forgotEmail: null,
      loading: false,
      refreshing: false,
      password: null,
      contactSales: {
        requester_name: '',
        email: '',
        contact_phone: '',
        company_name: '',
        ticket_type: 'Registration'
      }
    };
  },
  computed: {
    ...mapState({
      snackbar: state => state.snackbar
    })
  },
  methods: {
    validateDetails () {
      this.loading = true;
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.sendRequest();
        } else {
          this.loading = false;
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
      axios.post(`${process.env.VUE_APP_API_URL}login`, {
        username: this.email,
        password: this.password,
        recaptcha_token: recaptchaToken
      }).then((response) => {
        // this.$Progress.finish();
        this.refreshing = true;
        if (response.data && response.data.status === 200) {
          // If first time login
          if (response.data.last_login === null || response.data.profile_status === false) {
            // this.loading = false;
            response.data.tempPassword = this.password;
            this.$store.dispatch('createTempSession', response.data);
            this.$router.push('/first-login');
          } else {
            this.$store.dispatch('createSession', response.data);
            setTimeout(() => {
              if (this.$route.query.redirect && this.$route.query.redirect !== undefined) {
                // this.loading = false;
                this.$router.push(this.$route.query.redirect);
              } else {
                // this.loading = false;
                if (response.data.milestone_active) {
                  this.$router.push('/');
                } else if (response.data.adhoc_active) {
                  this.$router.push('/ad-hoc');
                }
                this.$router.push('/');
              }
            }, 400);
          }
        } else {
          this.loading = false;
          this.disabled = false;
          this.refreshing = true;
          if (response.data && response.data.message) {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: response.data.message
            });
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Wrong username or password!'
            });
          }
        }
      }, (response) => {
        throw new Error(response);
      });
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset();
    },
    forgot () {
      if (this.forgotEmail === null) {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Please add email to send link'
        });
      } else {
        this.disabled = true;
        axios.post(`${process.env.VUE_APP_API_URL}password/reset/Amara`, {
          email: this.forgotEmail
        }).then(() => {
          this.disabled = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Reset link sent successfully, Please check your mailbox!'
          });
          this.email = JSON.parse(JSON.stringify(this.forgotEmail));
          this.forgotEmail = null;
          this.fpToggle();
        }, () => {
          this.disabled = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to generate link, Please try again later!'
          });
        });
      }
    },
    fpToggle () {
      this.forgotPasswordToggle = !this.forgotPasswordToggle;
    },
    toggle (e) {
      if (e === 'contactSales') {
        this.loginActive = true;
      } else {
        this.loginActive = !this.loginActive;
      }
    },
    getData () {
      this.loading = true;
      this.disabled = true;
      axios.post(`${process.env.VUE_APP_API_URL}login`, {
        username: this.email,
        password: this.password
      }).then((response) => {
        // this.$Progress.finish();
        this.refreshing = true;
        if (response.data && response.data.status === 200) {
          this.loading = false;
          // If first time login
          if (response.data.last_login === null || response.data.profile_status === false) {
            response.data.tempPassword = this.password;
            this.$store.dispatch('createTempSession', response.data);
            this.$router.push('/first-login');
          } else {
            this.$store.dispatch('createSession', response.data);
            setTimeout(() => {
              if (this.$route.query.redirect && this.$route.query.redirect !== undefined) {
                this.$router.push(this.$route.query.redirect);
              } else {
                if (response.data.milestone_active) {
                  this.$router.push('/');
                } else if (response.data.adhoc_active) {
                  this.$router.push('/ad-hoc');
                }
                this.$router.push('/');
              }
            }, 400);
          }
        } else {
          this.loading = false;
          this.disabled = false;
          this.refreshing = true;
          if (response.data && response.data.message) {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: response.data.message
            });
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Wrong username or password!'
            });
          }
        }
      }, (response) => {
        throw new Error(response);
      });
    },
    close (e) {
      e.stopPropogation();
      this.containerActive = !this.containerActive;
    }
  },
  beforeMount () {
    const user = localStorage.getItem('CHATBOT_USER');
    if (localStorage.getItem('CHATBOT_USER')) {
      if (user.milestone_active) {
        this.$router.push('/');
      } else if (user.adhoc_active) {
        this.$router.push('/ad-hoc');
      }
      this.$router.push('/');
    }
    if (this.$route.query.u && this.$route.query.p) {
      this.email = this.$route.query.u;
      this.password = atob(this.$route.query.p);
      this.getData();
    } else {
      this.refreshing = true;
    }
  }
};
</script>

<style lang="scss">
.amara-login{
  .login-carousel
  .login-bg {
    background: url(../assets/dashboard.png) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    &:after {
      content: '\A';
      position: absolute;
      // width: 100%; height:calc(100vh - 87px);
      left:0;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      background:rgba(0,0,0,0.6) no-repeat center center fixed;
      opacity: 0.8;
      transition: all 1s;
      -webkit-transition: all 1s;
    }
  }
  .login-div {
    z-index: 1;
  }
  .v-window__container{
    height: 100% !important;
  }
  .v-responsive{
    height:100% !important;
  }

  .fa-chevron-right, .fa-chevron-left{
    font-size: 15px !important;
    padding: 10px;
  }
  .fa-circle{
    font-size: 10px !important;
  }
  .carousel-heading{
    width:100%;
    position: absolute;
    text-align: center !important;
    top: 40%;
    font-size: 24px !important;
    padding: 0 15px;
    font-weight: 500;
    margin: 0;
    color:white;
    font-family: "Montserrat", Arial, Tahoma, sans-serif !important;
  }
  .carousel-text{
    width:100%;
    position: absolute;
    text-align: center !important;
    top: 47%;
    font-size: 16px !important;
    padding: 0 10%;
    margin: 0;
    color:rgb(235, 229, 229);
    font-family: "Montserrat", Arial, Tahoma, sans-serif !important;
  }
  .login-carousel-request-button{
    width:100%;
    position: absolute;
    top: 65%;
    right:24%;
    font-size: 16px !important;
    text-align: center;
    padding: 0 10%;
    margin: 0;
    color:rgb(235, 229, 229);
    font-family: "Montserrat", Arial, Tahoma, sans-serif !important;
  }
  @media only screen and (max-width: 1024px) {
    .login-carousel-request-button {
      right:16%;
      top: 67%;
    }
  }
  .v-carousel__controls{
    background: transparent;
  }
  .v-label{
    margin-top:-5px;
  }
  .v-input input{
    font-size: 14px;
  }
  .logo-login{
    width:80px;
  }
  @media only screen and (max-width: 1000px) {
    .login-carousel {
      display: none;
    }
  }
  .login-page{
    width:67%;
    position:absolute;
    right:0;
    padding: 9% 8%
  }
  @media only screen and (max-width: 1024px) {
    .login-page {
      padding: 10% 8%
    }
  }
  @media only screen and (max-width: 1000px) {
    .login-page {
      position: static !important;
      width: 100%;
    }
  }
  @media only screen and (max-width: 1000px) {
    .login-bottom-line {
      width: 100% !important;
    }
  }

  @media only screen and (max-width: 1000px) {
    .login-input-field {
      width: 100% !important;
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
  .loginTextField{
    min-height:auto;
  }
  @media only screen and (max-width: 600px) {
    .loginTextField{
      padding:0;
    }
  }
  .login-bottom{
    position: fixed;
    bottom: 0;
    right: 10px;
    width: 65% !important;
  }
  @media only screen and (max-width: 1000px) {
    .login-bottom {
      width:97% !important;
    }
  }
  @media only screen and (max-width: 624px) {
    .login-bottom {
      position: static;
    }
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
  .forgotpass:hover{
    a {
      text-decoration: underline;
    }
  }
}
</style>
