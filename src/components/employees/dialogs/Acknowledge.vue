<template>
  <v-dialog max-width="700px"
    v-model="open"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        Acknowledge
      </v-card-title>
      <v-card-text>
          Click on Acknowledge to send an acknowledgement email to employee for the chat.
      </v-card-text>
      <v-card-actions align-content-space->
        <v-flex>
          <v-btn color="error" flat @click.stop="open=false;">Close</v-btn>
        </v-flex>
        <v-flex text-xs-right>
          <v-btn color="primary" class="white--text elevation-0" :loading="loading"
          :disabled="loading" @click.stop="validateDetails()">
            Acknowledge
          </v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'Acknowledge',
  components: {},
  data () {
    return {
      loading: false,
      open: false,
      employee: {},
      body: {
        action: 'acknowledge_chat'
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
          this.acknowledge();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    acknowledge () {
      this.loading = true;
      axios.post(`${process.env.VUE_APP_API_URL}users/action/${this.employee.id}`, {
        action: 'acknowledge_chat'
      }).then((response) => {
        // console.log('response', response);
        if (response === 200 || response === 201) {
          this.open = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Acknowledgement sent successfully!'
          });
          this.body = {
            phone: '',
            sms_text: '',
            action: 'sms'
          };
          this.$emit('getEmployee');
          this.open = false;
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Some error occurred, Please try again later!'
          });
        }
      }).catch((err) => {
        // console.log('err', err.status);
        if (err.response.status === 400) {
          this.loading = false;
          this.open = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: err.response.data.message
          });
        } else {
          this.loading = false;
          this.open = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Some error occurred, Please try again later!'
          });
        }
        // throw new Error(err);
      });
    }
  },
  watch: {
    open () {
      this.loading = false;
      this.body.first_number = this.user.user_profile.phoneNumber;
      this.body.second_number = this.employee.phoneNumber;
    }
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
