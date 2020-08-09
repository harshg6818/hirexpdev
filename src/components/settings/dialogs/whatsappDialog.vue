<template>
      <div class="text-center">
        <v-dialog
          v-if="dialog"
          v-model="dialog"
          width="500"
        >
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
            <div>
              Connect with WhatsApp
            </div>
              <div style="margin-left: 40%;margin-top: -5%;">
                <v-icon large color="darken-2" small @click="onCloseModal">fas fa-times</v-icon>
              </div>
            </v-card-title>

            <v-card-text>
              Would you allow WhatsApp to send you notifications.
            </v-card-text>

            <v-card-text>
              On giving WhatsApp the access:
            </v-card-text>
            <v-card-text>
              <v-layout>
                <v-flex xs1>
                  <img height="30" width="30" src="./whatsapp.png">
                </v-flex>
                <v-flex xs11 style="padding-top: 4px;">
                  It can send messages on your behalf
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-card-text style="display: inline-flex;">
              <span style="margin-top: -5%;">
              <v-checkbox
                v-model="agreeCheckbox"></v-checkbox>
              </span>
              <span>Give permission so that hireXP server can send notifications on your behalf to employees.</span>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="primary" flat small @click="onCloseModal">Close</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                :disabled="!agreeCheckbox"
                @click="connectToWhatsapp()"
              >
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
</template>
<script>
// import { VCheckbox } from 'vuetify';

export default {
  name: 'WhatsAppDialog',

  // components: {
  //   VCheckbox
  // },

  props: {
    dialog: {
      required: true,
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      agreeCheckbox: false
    };
  },

  methods: {
    onCloseModal () {
      this.$emit('closeWhatsappModal');
    },

    connectToWhatsapp () {
      this.$emit('connectToWhatsapp');
    }
  }
};
</script>
