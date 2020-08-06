<template>
  <v-layout class="amara-requestDemo" row wrap w-100 :class="{'refreshing' : disabled}">
    <v-snackbar
      :timeout="6000"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :vertical="snackbar.mode === 'vertical'"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <v-layout >
      <v-container class="demo-page" >
        <v-container style="padding-bottom:0">
          <img class="logo-login" src="@/assets/logo/image.png" alt="">
        </v-container>

        <v-container>
          <v-layout row wrap align-center >
            <v-container style="border-bottom:1px solid #e9ecef; padding:0 0 5px 0;" >
              <span class=" w-100 pb-2 " style="font-size: 1.5rem; opacity:0.6; ">Request a demo</span><br>
            </v-container>
            <v-flex>
            <form :lazy-validation="lazy" class="forms_form" v-on:submit.prevent="sendRequest">
              <v-layout row wrap mt-2>
                <v-flex sm6 xs12 pr-2>
                  <div class="forms_field">
                    <v-text-field
                      v-model="contactSales.requester_name"
                      name="name"
                      :rules="nameRules"
                      label="Name"
                      required
                      autofocus
                    ></v-text-field>
                    <v-text-field
                    :class="{'is-invalid': errors.has('contact_phone') }"
                    v-validate="'required|min_length:8'"
                      v-model="contactSales.contact_phone"
                      :rules="phoneRules"
                      name="contact_phone"
                      label="Contact number"
                      required
                    ></v-text-field>
                    <small v-show="errors.has('contact_phone')" class="invalid-feedback cj-error">{{errors.first('contact_phone')}}</small>
                    <v-text-field
                      v-model="contactSales.requester_role"
                      label="Role"
                      required
                    ></v-text-field>
                  </div>
                </v-flex>
                <v-flex class="request-demo-inputfield" sm6 xs12 pl-2>
                  <div class="forms_field">
                    <v-text-field
                      v-model="contactSales.contact_email"
                      label="Official email"
                      :rules="emailRules"
                      required
                      name='contact_email'
                    ></v-text-field>
                    <small v-show="errors.has('contact_email')" class="invalid-feedback cj-error">{{errors.first('contact_email')}}</small>

                    <v-text-field
                      v-model="contactSales.company_name"
                      label="Company name"
                      :rules="company_nameRules"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="contactSales.company_size"
                      name="input-7-1"
                      label="Employee Strength"
                    ></v-text-field>

                  </div>
                </v-flex>
                <v-layout w-100 row wrap reverse>
                  <v-flex text-sm-right text-xs-center>
                    <v-text-field
                      v-model="contactSales.requester_message"
                      name="input-7-1"
                      label="Message"
                      multi-line>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap reverse>
                  <v-flex text-sm-right text-xs-center>
                    <v-btn :loading="disabled" :disabled="disabled" color="#3f6ad8"
                    class="white--text elevation-0" @click="sendRequest" >Request</v-btn>
                  </v-flex>
                </v-layout>
              </v-layout>
             </form>
            </v-flex>
          </v-layout>
          </v-container>
          <v-layout class="demo-bottom" pt-3 >
              <v-flex sm6>
                Powered by <img height="13" src="https://hirexp.com/img/logo-dark.png" alt="">
              </v-flex>
              <v-flex sm6 text-xs-right>
                Made with <span class="red--text">&#10084;</span> in India
              </v-flex>
            </v-layout>
      </v-container>

    </v-layout>
    <v-layout class="login-carousel">
      <v-carousel class="login-carousel" style="width:33%; position:absolute; right:0; height: 100% !important;">
          <v-carousel-item  style="height:100% !important"  v-for="(item,i) in items"
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
              <v-layout class="demo-carousel-request-button"  >
                <v-flex text-sm-right text-xs-center>
                      <v-btn style="font-size:14px; color:#3f6ad8" color="#f1f1f1" class="ma-0" to="/login">Login</v-btn>
                    </v-flex>
                  </v-layout>
        </v-carousel-item>
      </v-carousel>
    </v-layout>
  </v-layout>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import {
  VSnackbar,
  VTextField
} from 'vuetify';

export default {
  components: {
    VSnackbar,
    VTextField

  },
  name: 'Login',
  data () {
    return {
      name: '',
      items: [
        {
          src: 'https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-purple-love.png',
          heading: 'Customized workflow',
          text: 'Amara workflow can be easily customized to meet your employee engagement and candidate experience objectives.'
        },
        {
          src: 'https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-mauve.png',
          heading: 'Scalable model',
          text: 'Amara is designed to scale horizontally to handle thousands of users and chat sessions per day while providing the fastest response time.'
        },
        {
          src: 'https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-50-shades-of-grey.png',
          heading: 'Ad-hoc campaigns',
          text: 'Create ad-hoc campaigns to further deep dive into specific problem areas and gather insights at any given point of time'
        },
        {
          src: 'https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png',
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
        requester_message: '',
        ticket_type: 'Demo Request'
      },
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'Contact number is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      company_name: '',
      company_nameRules: [
        v => !!v || 'Company name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ]
    };
  },
  computed: {
    ...mapState({
      snackbar: state => state.snackbar
    })
  },
  methods: {

    sendRequest () {
      this.disabled = true;
      this.refreshing = true;
      axios.post(`${process.env.VUE_APP_API_URL}support/website/add`, this.contactSales).then((response) => {
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
    }
  },
  beforeMount () {}
};

</script>

<style lang="scss">
.amara-requestDemo{
.login-bg {
  height: calc(100vh - 87px);
  background: url(../assets/bg-login.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
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
    text-align: center;
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
.demo-carousel-request-button{
  width:100%;
    position: absolute;
    top: 63%;
    right:30%;
    font-size: 16px !important;
    padding: 0 10%;
    margin: 0;
    color:rgb(235, 229, 229);
    font-family: "Montserrat", Arial, Tahoma, sans-serif !important;
}
@media only screen and (max-width: 1024px) {
  .demo-carousel-request-button {
    right:25%;
    top: 65%;
  }
}
.v-carousel__controls{
  background: transparent;
}
.v-label{
  margin-top:-5px;
}
.v-input input, .v-text-field__slot {
  font-size: 14px;
}
.logo-login{
  width:80px;
}
.v-window__container{
  height: 100% !important;
}
@media only screen and (max-width: 1000px) {
  .login-carousel {
    display: none;
  }
}
.demo-page{
  width:67%;
   position:absolute;
  left: 0;
  padding: 0% 8%;
  margin: 0px;
}
@media only screen and (max-width: 1024px) {
  .demo-page {
   padding: 3% 8%

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
    padding-left:0 !important;

  }
}
.demo-bottom{
    position: fixed;
    bottom: 0;
    left: 10px;
    width: 65%;
}
@media only screen and (max-width: 1000px) {
  .demo-bottom {
    width:97%;

  }
}
@media only screen and (max-width: 624px) {
  .demo-bottom {
    width:97%;
    position: static;

  }
}
}
</style>
