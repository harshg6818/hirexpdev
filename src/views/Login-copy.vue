<template>
  <v-layout class="amara-login" v-show="refreshing"
    :class="{'refreshing' : disabled}">
    <v-snackbar
          :timeout="6000"
          :color="snackbar.color"
          :multi-line="snackbar.mode === 'multi-line'"
          :vertical="snackbar.mode === 'vertical'"
          v-model="snackbar.show"
        >
          {{ snackbar.text }}
        <v-btn dark flat @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <v-layout class="login-carousel">
        <v-carousel :cycle="this.autoPlay" class="login-carousel" style="width:33%; position:absolute; height:100% !important;">
          <v-carousel-item  @mouseover="autoPlay = false" @mouseleave="autoPlay = true"  style="height:100% !important"  v-for="(item,i) in items"
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
            <v-layout class="login-carousel-request-button"  >
              <v-flex text-sm-right text-xs-center>
                <v-btn style="font-size:14px; color:#3f6ad8" color="#f1f1f1" class="ma-0" to="/Request-demo">Request a demo</v-btn>
              </v-flex>
            </v-layout>
          </v-carousel-item>
        </v-carousel>
    </v-layout>
    <v-layout >
      <v-container class="login-page" style="">
        <v-container style="padding-bottom:0">
          <v-btn style = "text-transform:none; position:absolute; top:2%; right:3%;" color="#888" target="_blank" to="/support" flat > Need help&nbsp;?</v-btn>

          <v-layout sm12>
            <v-flex text-sm-center text-xs-center sm12>
                <img class="logo-login" src="@/assets/logo/image.png" alt="">
            </v-flex>
            </v-layout>
        </v-container>
        <v-container>
          <v-flex >
            <v-layout  class="elevation-0">
              <form autocomplete="off" ref="form" class="forms_form w-100" v-if="!forgotPasswordToggle" v-on:submit.prevent="login">
                <v-container text-sm-center text-xs-center style=" padding:10px 0 25px 0;" >
                  <span class=" w-100 pb-2 " style="font-size:14px; opacity:0.6; ">Welcome back! Login to access your Amara Dashboard </span><br>
                </v-container>
                  <v-container class="loginTextField" style="padding:0; width:90%;">
                    <v-layout row wrap class="login-input-field">
                      <v-flex >
                        <v-text-field
                        :autofocos="false"
                        placeholder=" "
                        prepend-icon="fas fa-user"
                        label="Email"
                        v-model="email"
                        required
                        @keyup.native.enter="login"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout text-sm-center row wrap class="login-input-field">
                      <v-flex>
                        <v-text-field
                        :autofocos="false"
                        placeholder=" "
                        prepend-icon="fas fa-key"
                        :append-icon="e1 ? 'fas fa-eye' : 'fas fa-eye-slash'"
                        @click:append="(e1 = !e1)"
                        v-model="password"
                        :type="e1 ? 'password' : 'text'"
                        @keyup.native.enter="login"
                        required
                        label="Password"
                      ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <v-layout row wrap reverse mt-2>
                    <v-flex text-sm-center text-xs-center sm12 xs12>
                      <v-btn style="font-size:14px; height:30px;  width:45%;" :loading="disabled" :disabled="disabled" color="#3f6ad8"
                      class="white--text elevation-0" @click="login" >Login</v-btn>
                    </v-flex>
                    <v-flex class="py-2" text-sm-center text-xs-center sm12 xs12>
                       <span  class=" w-100" text-xs-center text-sm-center>Did you <a style="font-weight:400; font-size:14px; color:#ce2230" :loading="disabled" :disabled="disabled"
                      flat @click="fpToggle">Forgot your password?</a></span>
                      <!-- <span  style="font-size:14px; height:50px; font-weight:bold; width:88%;" :loading="disabled" :disabled="disabled"
                       class="#f44336--text elevation-0  w-100 pb-2" @click="fpToggle "><a style="color:#f44336"> Forgot your Password?</a></span> -->
                     </v-flex>
                    <v-flex class="showinmobile"  text-sm-center sm12 xs12>
                      <v-btn flat style="color:#777777; font-size:14px" color="#f1f1f1" class="ma-0" to="/Request-demo">Request for Demo</v-btn>
                    </v-flex>
                  </v-layout>
              </form>
              <form class="w-100 mt-4" v-if="forgotPasswordToggle"
              v-on:submit.prevent="forgot">
                <v-container style="padding:0 0 10px 0;" >
                  <span class=" w-100 pb-2 " style="font-size: 1.5rem; opacity:0.6; ">Forgot your Password?</span><br>
                  <span  class=" w-100 pb-2 " style="font-size: 1.2rem;  opacity:0.9;">Use the form below to recover it.</span>
                </v-container>
                <v-text-field
                v-model="forgotEmail"
                label="Enter you email address"
                @keyup.native.enter="forgot"
                required
                ></v-text-field>
                <v-layout row wrap reverse>
                  <v-flex text-sm-right sm6 text-xs-center xs12>
                    <v-btn style="font-size:14px" text-sm-right text-xs-center :loading="disabled" :disabled="disabled" color="deep-purple"
                    class="white--text" @click="forgot" >Send password reset link</v-btn>
                  </v-flex>
                  <v-flex text-sm-left sm6 text-xs-center xs12>
                    <v-btn style="font-size:14px" text-sm-left text-xs-center color="#3f6ad8" flat @click="fpToggle">Login</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-layout>
          </v-flex>
        </v-container>
        <v-layout class="login-bottom" pt-3  row wrap reverse>
          <v-flex class="hideinmobile" sm4  text-xs-right>
            Made with <span ><v-icon style="font-size:12px; padding-bottom:2px;" class="red--text">fas fa-heart</v-icon></span> in India
          </v-flex>
          <v-flex sm4 xs12  text-xs-center class="amaraDoc">
            <a target="_blank" href="https://www.amara.ai/"> Home</a>
            &nbsp; &#8226; &nbsp;<a href=""> Privacy Policy</a>
            &nbsp; &#8226; &nbsp;<a href="">Terms of Use</a>
          </v-flex>

          <v-flex sm4 xs12 text-sm-left text-xs-center>
            Powered by <img height="13" src="https://hirexp.com/img/logo-dark.png" alt="">
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-layout>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import {
  VSnackbar,
  VTextField,
  VTooltip
} from 'vuetify';

export default {
  components: {
    VSnackbar,
    VTextField,
    VTooltip
  },
  name: 'Login',
  data () {
    return {
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
    toggle (e) {
      if (e === 'contactSales') {
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
@media only screen and (max-width: 600px) {
  .logo-login {
    width:230px;
  }
}
@media only screen and (max-width: 1000px) {
  .login-carousel {
    display: none;
  }
}
.login-page{
  width:60%;
   position:absolute;
    right:0;
    padding: 5% 15%
}
@media only screen and (max-width: 1024px) {
  .login-page {
   padding: 10% 8%

  }
}
@media only screen and (max-width: 1000px) {
  .login-page {
    position: fixed !important;
    width: 100%;
    padding-bottom:0 !important;

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
