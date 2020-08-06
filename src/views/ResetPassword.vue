<template>
  <div class="amara-resetPassword">
    <v-snackbar
      :timeout="6000"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :vertical="snackbar.mode === 'vertical'"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark text @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <v-layout class="login-carousel">
        <v-carousel :cycle="this.autoPlay" class="login-carousel" style="width:33%; position:absolute; height:100% !important;">
          <v-carousel-item @mouseover="autoPlay = false" @mouseleave="autoPlay = true"  style="height:100% !important"  v-for="(item,i) in items"
            :key="i"
            :src="item.src"
          >
            <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="carousel-heading">{{ item.heading }}</div>
                <div class="carousel-text">{{ item.text }}</div>
              </v-row>
              <v-layout class="login-carousel-request-button"  >
                <v-flex text-sm-right text-xs-center>
                  <v-btn style="color:#777777; font-size:14px;" color="#f1f1f1" class="ma-0" to="/sign-up">Request a demo</v-btn>
                </v-flex>
              </v-layout>
          </v-carousel-item>
        </v-carousel>
    </v-layout>
      <v-layout >
      <v-container class="login-page" style="">
        <v-container style="padding-bottom:0">
                <img class="logo-login" src="@/assets/logo/image.png" alt="">
        </v-container>
        <v-container>
          <v-flex >
            <v-layout  class="elevation-0">
              <v-form autocomplete="off" ref="form" class="forms_form w-100" v-if="!forgotPasswordToggle" v-on:submit.prevent="login">
                <v-container style="border-bottom:1px solid #e9ecef; padding:0 0 10px 0;" >
                  <span class=" w-100 pb-2 " style="font-size: 1.5rem; opacity:0.6; ">Reset Password</span>
                </v-container>
                <v-alert
          :value="true"
          color="primary"
            type="info"
          >
          <small class="text-muted text-left">
            <p class="mb-0">Your password must contain at least 8 characters. </p>
            <p class="mb-0">Your password can't be too similar to your other personal information. </p>
            <p class="mb-0">Your password can't be a commonly used password. </p>
            <p class="mb-0">Your password can't be entirely numeric. </p>
          </small>
        </v-alert>

            <v-container style="border-bottom:1px solid #e9ecef; padding-left:0; padding-right:0; min-height:auto;">
              <v-layout row wrap class="login-input-field">
                <v-flex style="padding-right:5px">
                  <v-text-field
                  placeholder=" "
                  v-model="new_password1"
                  :append-icon="e1 ? 'fas fa-eye-slash': 'fas fa-eye' "
                  :type="e1 ? 'password' : 'text'" @click:append="(e1 = !e1)"
                  label="New password"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex  style="padding-left:5px">
                <v-text-field
                placeholder=" "
                v-model="new_password2"
                :append-icon="e2 ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  :type="e2 ? 'password' : 'text'" @click:append="(e2 = !e2)"
                label="Confirm password"
                @keyup.native.enter="ResetPassword"
                required
                ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <v-layout row wrap reverse mt-2>
                    <v-flex text-sm-right text-xs-center>
                      <v-btn style="font-size:14px" :loading="disabled" :disabled="disabled" color="primary"
                      class="white--text elevation-0" @click="ResetPassword" >Reset password</v-btn>
                    </v-flex>
                    <v-flex text-sm-left text-xs-center>
                      <v-btn style="font-size:14px; color:var(--v-primary-base) !important;" text class="ma-0" to="/login">Login</v-btn>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex class="RequestDemoButton"  text-sm-center>
                      <v-btn style="color:var(--v-primary-base) !important;; font-size:14px" color="#f1f1f1" class="ma-0" to="/sign-up">Request for Demo</v-btn>
                    </v-flex>
                  </v-layout>
              </v-form>

            </v-layout>
          </v-flex>
        </v-container>
        <v-layout class="login-bottom" pt-3  row wrap reverse>
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

  </div>
</template>

<script>
import { mapState } from 'vuex';
// import {
//   VSnackbar,
//   VTextField,
//   VAlert
// } from 'vuetify'
import axios from 'axios';

export default {
  // components: {
  //   VSnackbar,
  //   VTextField,
  //   VAlert
  // },
  computed: {
    ...mapState({
      snackbar: state => state.snackbar
    })
  },
  name: 'ResetPassword',
  data () {
    return {
      autoPlay: true,
      e1: false,
      e2: true,
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
      // e1: true,
      disabled: false,
      loginActive: false,
      forgotPasswordToggle: false,
      email: null,
      forgotEmail: null,
      password: null,
      new_password1: null,
      new_password2: null
    };
  },
  methods: {
    login () {
      if (this.email && this.password) {
        this.getData();
      }
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
    ResetPassword () {
      if (!this.new_password1 || !this.new_password2) {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Please fill all feilds!'
        });
        return;
      }
      if (this.new_password1.length < 8 || this.new_password2.length < 8) {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Your password must contain at least 8 characters.!',
          type: 'warn'
        });
        return;
      }
      if (this.new_password1 !== this.new_password2) {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Your new password feilds do not match!'
        });
        return;
      }
      this.disabled = true;
      axios.post(`${process.env.VUE_APP_API_URL}password/reset/confirm/`, {
        new_password1: this.new_password1,
        new_password2: this.new_password2,
        uid: this.$route.params.uid,
        token: this.$route.params.token
      }).then(() => {
        this.disabled = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'success',
          show: true,
          text: 'Password was changed successfully!'
        });
        this.toggle('login');
      }, (resp) => {
        this.disabled = false;
        if (resp.body.new_password2) {
          if (resp.body.new_password2[0]) {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: `${resp.body.new_password2[0]}`
            });
          }
        }
        if (resp.body && resp.body.token && resp.body.token[0] === 'Invalid value') {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Your token has been expired, please try sending password reset link again.'
          });
          return;
        }
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Oops! This is embarrasing, Please try again later!'
        });
      });
    },
    toggle (e) {
      if (e === 'login') {
        this.loginActive = true;
      } else {
        this.loginActive = !this.loginActive;
      }
    },
    getData () {
      this.disabled = true;
      axios.post(`${process.env.VUE_APP_API_URL}login`, {
        username: this.email,
        password: this.password
      }).then((response) => {
        // this.$Progress.finish();
        this.refreshing = true;
        if (response.data && response.data.status === 200) {
          // If first time login
          if (response.data.last_login === null || response.data.profile_status === false) {
            this.$store.dispatch('createTempSession', response.data);
            this.$router.push('/first-login');
          } else {
            this.$store.dispatch('createSession', response.data);
            setTimeout(() => {
              if (this.$route.query.redirect && this.$route.query.redirect !== undefined) {
                this.$router.push(this.$route.query.redirect);
              } else {
                if (this.user.milestone_active) {
                  this.$router.push('/');
                } else if (this.user.adhoc_active) {
                  this.$router.push('/ad-hoc');
                }
              }
            }, 400);
          }
        } else {
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
    if (!this.$route.params.uid || !this.$route.params.token) {
      this.$router.push('/');
    }
  }
};

</script>

<style lang="scss" >
/* General variables */
/* General configurations */
* {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1em;
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}
input[type="submit"] {
  cursor: pointer;
}
input::-webkit-input-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input:-ms-input-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input::-ms-input-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input::placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}

/* Animations */
@-webkit-keyframes bounceLeft {
  0% {
    -webkit-transform: translate3d(100%, -50%, 0);
            transform: translate3d(100%, -50%, 0);
  }
  50% {
    -webkit-transform: translate3d(-30px, -50%, 0);
            transform: translate3d(-30px, -50%, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -50%, 0);
            transform: translate3d(0, -50%, 0);
  }
}
@keyframes bounceLeft {
  0% {
    -webkit-transform: translate3d(100%, -50%, 0);
            transform: translate3d(100%, -50%, 0);
  }
  50% {
    -webkit-transform: translate3d(-30px, -50%, 0);
            transform: translate3d(-30px, -50%, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -50%, 0);
            transform: translate3d(0, -50%, 0);
  }
}
@-webkit-keyframes bounceRight {
  0% {
    -webkit-transform: translate3d(0, -50%, 0);
            transform: translate3d(0, -50%, 0);
  }
  50% {
    -webkit-transform: translate3d(calc(100% + 30px), -50%, 0);
            transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    -webkit-transform: translate3d(100%, -50%, 0);
            transform: translate3d(100%, -50%, 0);
  }
}
@keyframes bounceRight {
  0% {
    -webkit-transform: translate3d(0, -50%, 0);
            transform: translate3d(0, -50%, 0);
  }
  50% {
    -webkit-transform: translate3d(calc(100% + 30px), -50%, 0);
            transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    -webkit-transform: translate3d(100%, -50%, 0);
            transform: translate3d(100%, -50%, 0);
  }
}
/* Page background */
.user {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  width: 100%;
  height: 100vh;
  background: url("https://s3.ap-south-1.amazonaws.com/hirexp/static/bacground-login.jpeg") no-repeat center;
  background-size: cover;
}
.user_options-container {
  position: relative;
  width: 80%;
}
.user_options-text {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.85);
  border-radius: 3px;
}

/* Registered and Unregistered user box and text */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #fff;
  font-weight: 300;
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 1.66rem;
  line-height: 1em;
}

.user_unregistered-text,
.user_registered-text {
  font-size: 0.83rem;
  line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.2rem;
  -webkit-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
.user_registered-login:hover,
.user_unregistered-signup:hover {
  color: rgba(34, 34, 34, 0.85);
  background-color: #ccc;
}

/* Login and signup forms */
.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 470px;
  background-color: #fff;
  border-radius: 3px;
  -webkit-box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
          box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  -webkit-transition: -webkit-transform 0.4s ease-in-out;
  transition: -webkit-transform 0.4s ease-in-out;
  transition: transform 0.4s ease-in-out;
  transition: transform 0.4s ease-in-out, -webkit-transform 0.4s ease-in-out;
  -webkit-transform: translate3d(100%, -50%, 0);
          transform: translate3d(100%, -50%, 0);
}
.user_options-forms .user_forms-login {
  -webkit-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}
.user_options-forms .forms_title {
  margin-bottom: 45px;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1em;
  text-transform: uppercase;
  color: #e8716d;
  letter-spacing: 0.1rem;
}
.user_options-forms .forms_field:not(:last-of-type) {
  margin-bottom: 20px;
}
.user_options-forms .forms_field-input {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 0;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: gray;
  letter-spacing: 0.1rem;
  -webkit-transition: border-color 0.2s ease-in-out;
  transition: border-color 0.2s ease-in-out;
}
.user_options-forms .forms_field-input:focus {
  border-color: gray;
}
.user_options-forms .forms_buttons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  margin-top: 35px;
}
.user_options-forms .forms_buttons-forgot {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.1rem;
  color: #ccc;
  text-decoration: underline;
  -webkit-transition: color 0.2s ease-in-out;
  transition: color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-forgot:hover {
  color: #b3b3b3;
}
.user_options-forms .forms_buttons-action {
  background-color: #e8716d;
  border-radius: 3px;
  padding: 10px 35px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  -webkit-transition: background-color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-action:hover {
  background-color: #e14641;
}
.user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
  position: absolute;
  top: 70px;
  left: 40px;
  width: calc(100% - 80px);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, -webkit-transform 0.5s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, -webkit-transform 0.5s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.5s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.5s ease-in-out, -webkit-transform 0.5s ease-in-out;
}
.user_options-forms .user_forms-signup {
  -webkit-transform: translate3d(120px, 0, 0);
          transform: translate3d(120px, 0, 0);
}
.user_options-forms .user_forms-signup .forms_buttons {
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
}
.user_options-forms .user_forms-login {
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

/* Triggers */
.user_options-forms.signup-click {
  -webkit-animation: bounceLeft 1s forwards;
          animation: bounceLeft 1s forwards;
}
.user_options-forms.signup-click .user_forms-signup {
  opacity: 1;
  visibility: visible;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.user_options-forms.signup-click .user_forms-login {
  opacity: 0;
  visibility: hidden;
  -webkit-transform: translate3d(-120px, 0, 0);
          transform: translate3d(-120px, 0, 0);
}
.user_options-forms.login-click {
  -webkit-animation: bounceRight 1s forwards;
          animation: bounceRight 1s forwards;
}
.user_options-forms.login-click .user_forms-signup {
  opacity: 0;
  visibility: hidden;
}
.user_options-forms.login-click .user_forms-login {
  opacity: 1;
  visibility: visible;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}

/* Responsive */
@media screen and (max-width: 620px) {
  .user_options-unregistered, .user_options-registered {
    display: none;
  }
  .user_options-forms {
    left: 0;
    width: 100%;
  }
}
@media screen and (max-width: 990px) {
  .user_options-forms {
    min-height: 510px;
  }
  .user_options-forms .forms_buttons {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  .user_options-forms .user_forms-login .forms_buttons-action {
    margin-top: 30px;
  }
  .user_options-forms .user_forms-signup,
  .user_options-forms .user_forms-login {
    top: 50px;
  }

  .user_options-registered,
  .user_options-unregistered {
    padding: 50px 45px;
  }
}

 .amara-resetPassword{
.login-bg {
  // height: calc(100vh - 87px);
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
    padding: 4% 8%
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
.RequestDemoButton {
    display:none;
}
@media only screen and (max-width: 1000px) {
  .RequestDemoButton {
    display:block;

  }
}
@media only screen and (max-width: 624px) {
  .RequestDemoButton {
    text-align: center;

  }
}
.layout.row.wrap.login-bottom{
    position: fixed;
    bottom: 0;
    right: 10px;
    width: 65% !important;
}
@media only screen and (max-width: 1000px) {
  .layout.row.wrap.login-bottom {
    width:97% !important;

  }
}
@media only screen and (max-width: 624px) {
  .layout.row.wrap.login-bottom {
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
}

</style>
