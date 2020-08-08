<template>
  <v-dialog
      :max-width="testSentFlag ? '400px' : '1000px'"
      max-height="400px"
      class="test-campaign-modal"
      style="overflow:hidden;max-height:400px"
      v-model="dialogs.testCampaign"
      transition="dialog-transition"
    >
      <v-card class="template-card">
        <v-card-text >
          <h2>
            Test Campaign
          </h2>

          <v-layout mx-0 mt-2 row wrap style="height:250px">
            <div class="pa-5" v-if="!testSentFlag" style="width:100%">
              <h3 class="mb-3">
                Send a test to
              </h3>
              <span v-if="distributionsEnabled.email && distributionsEnabled.sms">
                <v-layout>
                  <v-flex xs5>
                    <v-text-field
                    class="template-field "
                    label="First Name"
                    placeholder="First Name"
                    v-model="testRecipient.first_name"
                    v-validate="'required'"
                    :error-messages="errors.collect('first_name')"
                    name="first_name"
                    data-vv-as="First Name"
                    @click.stop
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs1></v-flex>

                  <v-flex xs5>
                    <v-text-field
                    class="template-field "
                    label="Last Name"
                    placeholder="Last Name"
                    v-model="testRecipient.last_name"
                    v-validate="'required'"
                    :error-messages="errors.collect('last_name')"
                    name="last_name"
                    data-vv-as="Last Name"
                    @click.stop
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs11>
                    <v-text-field
                    class="template-field "
                    label="Email"
                    placeholder="Email"
                    v-model="testRecipient.email"
                    v-validate="'required'"
                    :error-messages="errors.collect('email')"
                    name="email"
                    data-vv-as="email"
                    @click.stop
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs11>
                    <v-text-field
                    class="template-field "
                    label="Phone"
                    placeholder="Phone"
                    v-model="testRecipient.phone"
                    v-validate="'required'"
                    :error-messages="errors.collect('Phone')"
                    name="Phone"
                    data-vv-as="Phone"
                    @click.stop
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </span>

              <span v-if="distributionsEnabled.email && !distributionsEnabled.sms">
                  <v-layout>
                  <v-flex xs5>
                    <v-text-field
                    class="template-field "
                    label="First Name"
                    placeholder="First Name"
                    v-model="testRecipient.first_name"
                    v-validate="'required'"
                    :error-messages="errors.collect('first_name')"
                    name="first_name"
                    data-vv-as="First Name"
                    @click.stop
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs1></v-flex>

                  <v-flex xs5>
                    <v-text-field
                    class="template-field "
                    label="Last Name"
                    placeholder="Last Name"
                    v-model="testRecipient.last_name"
                    v-validate="'required'"
                    :error-messages="errors.collect('last_name')"
                    name="last_name"
                    data-vv-as="Last Name"
                    @click.stop
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs11>
                    <v-text-field
                    class="template-field "
                    label="Email"
                    placeholder="Email"
                    v-model="testRecipient.email"
                    v-validate="'required'"
                    :error-messages="errors.collect('email')"
                    name="email"
                    data-vv-as="email"
                    @click.stop
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </span>

              <span v-if="!distributionsEnabled.email && distributionsEnabled.sms">
                  <v-layout>
                  <v-flex xs5>
                    <v-text-field
                    class="template-field "
                    label="First Name"
                    placeholder="First Name"
                    v-model="testRecipient.first_name"
                    v-validate="'required'"
                    :error-messages="errors.collect('first_name')"
                    name="first_name"
                    data-vv-as="First Name"
                    @click.stop
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs1></v-flex>

                  <v-flex xs5>
                    <v-text-field
                    class="template-field "
                    label="Last Name"
                    placeholder="Last Name"
                    v-model="testRecipient.last_name"
                    v-validate="'required'"
                    :error-messages="errors.collect('last_name')"
                    name="last_name"
                    data-vv-as="Last Name"
                    @click.stop
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs11>
                    <v-text-field
                    class="template-field "
                    label="Phone"
                    placeholder="Phone"
                    v-model="testRecipient.phone"
                    v-validate="'required'"
                    :error-messages="errors.collect('Phone')"
                    name="Phone"
                    data-vv-as="Phone"
                    @click.stop
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </span>
            </div>

            <v-alert style="color:#000;display:block;border:0px" class="px-3 py-5" type="secondary" v-if="testSentFlag">
              The test campaign has been sent
              <span v-if="testRecipient.first_name || testRecipient.last_name"> to <strong> {{testRecipient.first_name}} </strong> <strong> {{testRecipient.last_name}} </strong> </span>
              <span v-if="distributionsEnabled.email && distributionsEnabled.sms && testRecipient.phone && testRecipient.email"> on <strong> {{testRecipient.email}} </strong> and <strong> {{testRecipient.phone}} </strong> </span>
              <span v-if="distributionsEnabled.email && !distributionsEnabled.sms && testRecipient.email"> on <strong> {{testRecipient.email}} </strong> </span>
              <span v-if="!distributionsEnabled.email && distributionsEnabled.sms && testRecipient.phone"> on <strong> {{testRecipient.phone}} </strong> </span>
            </v-alert>

          </v-layout>
        </v-card-text>

        <v-card-actions class="my-3 ml-2" align-content-space v-if="!testSentFlag">
          <v-flex text-xs-right xs2>
            <v-btn color="adhoc" class="white--text" @click.stop="validateCampaign()"
            style="left:-10px;position:relative;">
              Send Test
            </v-btn>
          </v-flex>

          <v-flex text-xs-left xs2 class="ml-4">
            <v-btn class="red--text" @click.stop="closeModal()"
            style="left:-10px;position:relative;">
              Close
            </v-btn>
          </v-flex>
        </v-card-actions>

        <v-card-actions class="my-3 mx-0 px-4" align-content-space v-else>
           <v-flex text-xs-right xs6 v-if="testSentFlag">
            <v-btn color="adhoc" class="white--text" @click.stop="resetTest()"
            style="left:-10px;position:relative;">
              Send another Test
            </v-btn>
          </v-flex>

          <v-flex text-xs-right xs6 class="ml-4">
            <v-btn class="red--text" @click.stop="closeModal()"
            style="left:-10px;position:relative;">
              Close
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
// import { VAlert, VMenu, VSlider, VTextarea, VSelect, VChip, VPagination, VCheckbox, VTooltip } from 'vuetify';
// import { Container, Draggable } from 'vue-smooth-dnd';
import { mapState } from 'vuex';
import axios from 'axios';
// import VueContentLoading from 'vue-content-loading';

export default {
  name: 'NewQuestion',
  // components: {
  //   VAlert,
  //   VMenu,
  //   VTextarea,
  //   VSlider,
  //   VSelect,
  //   Container,
  //   Draggable,
  //   VChip,
  //   VPagination,
  //   VCheckbox,
  //   VTooltip,
  //   VueContentLoading
  // },
  data () {
    return {
      testRecipient: {},
      distributions: {},
      distributionsEnabled: {},
      dialogs: {
        testCampaign: false
      },
      testSentFlag: false,
      group_id: null
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    resetTest () {
      this.testSentFlag = false;
      this.testRecipient = {};
    },
    closeModal () {
      this.dialogs.testCampaign = false;
      this.testSentFlag = false;
      this.testRecipient = {};
    },
    validateCampaign () {
      const temp = {
        email: this.testRecipient.email,
        phone: this.testRecipient.phone,
        first_name: this.testRecipient.first_name,
        last_name: this.testRecipient.last_name,
        stage_id: this.stage_id,
        group_id: this.group_id
      };
      this.$validator.validateAll().then((res) => {
        if (res) {
          axios.post(`${process.env.VUE_APP_ADHOC_API_URL}session/validate_test`, temp).then((response) => {
            if (response && response.data) {
              if (response.data) {
              // this.$store.dispatch('updateSnackbar', {
              //   color: 'success',
              //   show: true,
              //   text: 'Test campaign sent successfully!',
              // });
                this.testCampaign();
              // this.dialogs.testCampaign=false;
              } else {
                this.$store.dispatch('updateSnackbar', {
                  color: 'error',
                  show: true,
                  text: 'Unable to send test, Please try again later!'
                });
              }
            // this.templates = response.data.data;
            }
          }, (response) => {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to send test, Please try again later!'
            });
            throw new Error(response);
          });
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    testCampaign () {
      const temp = {
        first_name: this.testRecipient.first_name,
        last_name: this.testRecipient.last_name,
        email: this.testRecipient.email,
        phone: this.testRecipient.phone,
        stage_id: this.stage_id,
        group_id: this.group_id
      };
      axios.post(`${process.env.VUE_APP_ADHOC_API_URL}session/trigger_test`, temp).then((response) => {
        if (response && response.data) {
          if (response.data) {
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Test sent successfully!'
            });
            this.testSentFlag = true;
            // this.dialogs.testCampaign=false;
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to send test, Please try again later!'
            });
          }
          // this.templates = response.data.data;
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to send test, Please try again later!'
        });
        throw new Error(response);
      });
    }
  },
  created () {
    if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent &&
        this.$parent.$parent.$parent.$parent &&
        this.$parent.$parent.$parent.$parent.newCampaign) {
      this.distributions = this.$parent.$parent.$parent.$parent.newCampaign.distribution;
      this.distributionsEnabled = this.$parent.$parent.$parent.$parent.newCampaign.distributionsEnabled;
      this.stage_id = this.$parent.$parent.$parent.$parent.newCampaign.stage_id;
    }
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hover-link:hover {
  color:#4c3e9d !important
}
.list-sections {
  overflow-y:auto;
  height: 100%;
}
.template-card {
  height: 400px;
  overflow-y:hidden;
  overflow-x:hidden;
}
.active-campaign {
  background-color: #cffbfa !important;
  // color: #fff !important;
}
.questions-custom-field {
  &.v-input--selection-controls {
    .v-input__slot {
      margin-bottom: 0px!important;
    }
    .v-input__control {
      height: 24px!important;
    }
  }
}
.difm-menu-split {
  height: 300px;
  float: left;
  margin-left: 55px;
  border-left: 1px solid #D0D2D3;
  margin-top: 25px;
  position: relative;
  left:15%;
}
</style>
