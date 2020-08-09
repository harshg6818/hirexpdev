<template>
<div>
  <v-dialog max-width="700px"
    ref="bulkSms"
    v-model="open"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        SMS
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="text-xs-left selected-emp">
              <v-chip color="primary" text-color="white" v-for="(item,index) in selectedEmpNumber" :key="index">
                <v-avatar>
                  <v-icon color="white">far fa-user-circle</v-icon>
                </v-avatar>
                {{item}}
              </v-chip>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              class="grey--text text--lighten-2"
              maxlength="160"
              outline
              v-model="body.sms_text"
              flat
              :error-messages="errors.collect('sms_text')"
              v-validate="'required'"
              @click.stop
              name="sms_text"
              data-vv-as="sms text"
              label="SMS text"
              counter="160"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions align-content-space->
        <v-flex>
          <v-btn color="error" flat @click.stop="open=false;">Close</v-btn>
        </v-flex>
        <v-flex text-xs-right>
          <v-btn color="primary" class="white--text elevation-0" :loading="loading"
          :disabled="loading" @click.stop="validateDetails()">
            Send SMS
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
  <socketResponse ref="socketResponse" :selectedEmp="selectedEmp" :res="socketResponseUpdate"></socketResponse>
</div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
// import {
//   VAvatar,
//   VChip,
//   VDialog,
//   VTextarea,
//   VSnackbar,
// } from 'vuetify';

import SocketResponse from './SocketResponse';

export default {
  name: 'SMSEmployee',
  components: {
    // VTextarea,
    // VAvatar,
    // VChip,
    // VDialog,
    // VSnackbar,
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
      loading: false,
      socketResponseUpdate: [],
      selectedEmpNumber: [],
      employee: {},
      open: false,
      snackbar: {
        show: false,
        color: 'info',
        timeout: 6000,
        text: '',
        showBtn: true
      },
      body: {
        sms_text: ''
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    validateDetails () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.sendSMS();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    sendSMS () {
      // const that = this;
      this.$emit('sendingSms');
      const session = JSON.parse(localStorage.getItem('CHATBOT_USER'));
      this.loading = true;
      const payload = [];
      this.$lodash.each(this.numbers, (val) => {
        const t = {};
        t.user_id = val[1].id;
        t.sms_text = this.body.sms_text;
        t.action = 'sms';
        t.phone = session.user_profile.phoneNumber;
        payload.push(t);
      });
      axios.post(`${process.env.VUE_APP_API_URL}users/action-bulk`, {
        users_data: payload
      })
        .then((response) => {
          this.loading = false;
          if (response && response.data && response.data.status === 200) {
            this.open = false;
            this.body.sms_text = '';
            this.snackbar.show = true;
            this.snackbar.text = response.data.message;
            this.snackbar.showBtn = false;
            const company = session.company.replace(/-/g, '');
            const socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}${company}/?verify=${session.access_token}`);
            socket.addEventListener('message', (res) => {
              // console.log('bulkAcknowledgeUpdate -> res', res);
              this.snackbar.show = false;
              const tempRes = JSON.parse(res.data);
              this.snackbar.show = true;
              this.snackbar.text = 'User action completed';
              this.$emit('setCountStatus', tempRes);
              this.$emit('completedSms');
              // this.snackbar.text = tempRes;
              this.snackbar.timeout = 6000;
              this.snackbar.showBtn = true;
              this.socketResponseUpdate = tempRes;
              // that.$refs.socketResponse.dialog = true;
              socket.close();
            });
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to send an sms, Please try again later!'
            });
          }
        }).catch((err) => {
          this.loading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to send an sms, Please try again later!'
          });
          throw new Error(err);
        });
    }
  },
  watch: {
    numbers () {
      this.selectedEmpNumber = [];
      this.$lodash.each(this.numbers, (val) => {
        this.selectedEmpNumber.push(val[1].display_name);
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
