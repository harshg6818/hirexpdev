<template>
  <v-dialog max-width="700px"
    v-model="open"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        SMS {{this.employee.display_name}}
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              class="grey--text text--lighten-2"
              maxlength="20"
              outline
              v-model="body.phone"
              v-validate="'required'"
              flat
              :error-messages="errors.collect('phone')"
              name="phone"
              label="Phone"
            ></v-text-field>
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
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
// import { VTextarea } from 'vuetify';

export default {
  name: 'SMSEmployee',
  // components: {
  //   VTextarea
  // },
  data () {
    return {
      loading: false,
      open: false,
      employee: {},
      body: {
        phone: '',
        sms_text: '',
        action: 'sms'
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
      this.loading = true;
      axios.post(`${process.env.VUE_APP_API_URL}users/action/${this.employee.id}`, this.body)
        .then((response) => {
          this.loading = false;
          if (response && response.data && response.data.status === 200) {
            this.$store.dispatch('updateSnackbar', {
              color: 'info',
              show: true,
              text: 'SMS Sent!'
            });
            this.body = {
              phone: '',
              sms_text: '',
              action: 'sms'
            };
            this.open = false;
            this.updateStatus();
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
  watch: {
    open () {
      this.body.phone = this.user.user_profile.phoneNumber;
    }
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
