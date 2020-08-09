<template>
  <div class="bg-gradient py-0 pl-1">
    <v-layout row wrap align-center>
      <v-flex>
        <h3 class="black--text mb-2">
          <v-btn color="" flat icon small @click="$router.go(-1)" class="elevation-0">
            <v-icon small>fas fa-arrow-left</v-icon>
          </v-btn>
          New Support Ticket
        </h3>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <v-card class="py-4 px-3">
          <v-layout row wrap>
            <v-flex sm4 px-1>
              <v-text-field
                class="grey--text text--lighten-2"
                maxlength="100"
                readonly
                outline
                v-model="newTicket.name"
                flat
                :error-messages="errors.collect('name')"
                name="name"
                label="Name *"
              ></v-text-field>
            </v-flex>
            <v-flex sm4 px-1>
              <v-text-field
                class="grey--text text--lighten-2"
                maxlength="100"
                readonly
                outline
                v-model="newTicket.email"
                flat
                :error-messages="errors.collect('email')"
                name="email"
                label="Email *"
              ></v-text-field>
            </v-flex>
            <v-flex sm4 px-1>
              <v-text-field
                class="grey--text text--lighten-2"
                maxlength="100"
                outline
                v-model="newTicket.contact_phone"
                flat
                v-validate="'required'"
                :error-messages="errors.collect('phone')"
                name="phone"
                label="Phone Number *"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex px-1>
              <v-text-field
                class="grey--text text--lighten-2"
                maxlength="100"
                outline
                v-model="newTicket.subject"
                flat
                v-validate="'required'"
                :error-messages="errors.collect('subject')"
                name="subject"
                label="Subject *"
              ></v-text-field>
            </v-flex>
            <v-flex px-1>
              <v-select
                :items="list.types"
                v-model="newTicket.type"
                name="ticketType"
                :error-messages="errors.collect('ticketType')"
                label="Ticket type *"
                item-text="title"
                data-vv-as="ticket type"
                v-validate="'required'"
                class="elevation-0 grey--text text--lighten-2"
                outline
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex>
              <VuePellEditor
              class="w-100"
              v-model="newTicket.description"
              placeholder="Enter description" />
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex>
              <v-flex class="text-xs-center">
                <v-btn color="primary"
                  :loading="config.loading"
                  :disabled="config.loading"
                  @click="validateDetails"
                  class="ml-4 elevation-0 white--text"
                  >
                  Create Ticket
                  <v-icon small class="ml-2">fas fa-plus</v-icon>
                </v-btn>
              </v-flex>
            </v-flex>
          </v-layout>

        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import VuePellEditor from 'vue-pell-editor';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';

Vue.use(VuePellEditor);

export default {
  name: 'support-center-tickets',
  // components: {
  //   ContentLoader
  // },
  data () {
    return {
      config: {
        loading: false
      },
      list: {
        types: [{
          title: 'Account & Billing Support',
          value: 'account'
        }, {
          title: 'Technical Support',
          value: 'technical'
        }]
      },
      newTicket: {
        ticket_source: 'Amara',
        contact_phone: '',
        description: ''
      }
    };
  },
  methods: {
    validateDetails () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.createTicket();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    createTicket () {
      this.config.loading = true;
      axios.post(`${process.env.VUE_APP_API_URL}support/add`, this.newTicket)
        .then((resp) => {
          this.config.loading = false;
          if (resp.data) {
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Ticket created successfully!'
            });
            this.$router.push('/support-center');
          }
        }, (resp) => {
          this.config.loading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to create ticket, Please try again later!'
          });
          throw new Error(resp.body);
        });
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  beforeMount () {
    this.newTicket.name = this.user.display_name;
    this.newTicket.email = this.user.email;
  }
};
</script>

<style lang="scss" scoped>
</style>
