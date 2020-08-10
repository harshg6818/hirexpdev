<template>
  <v-dialog
    max-width="800px"
    v-model="dialogs.scheduleCampaign"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-text>
        <h2> Schedule campaign </h2>
        <div class="d-flex">
          <div class="pa-5" style="width:100%">
              <h3 class="mb-3">
                Set up your schedule
              </h3>
              <span>
                <div class="d-flex">
                  <v-flex xs12>
                  <v-menu
                    ref="dateMenu"
                    :close-on-content-click="false"
                    v-model="menu.date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      class="grey--text text--lighten-2"
                      maxlength="30"
                      outline
                      :value="formattedDate"
                      v-validate="'required'"
                      readonly
                      flat
                      :error-messages="errors.collect('date')"
                      name="date"
                      label="Date *"
                    ></v-text-field>
                    <v-date-picker v-model="triggerDate" no-title
                    format="DD-MM-YYYY"
                    :min="minDate"
                    @input="menu.date = false"></v-date-picker>
                  </v-menu>
                  </v-flex>
                </div>
              </span>

              <h3 class="mb-3">
                Delivery Time
              </h3>
              <span>
                <div class="d-flex">
                  <v-flex xs12>
                    <v-menu
                      ref="startTimeMenu"
                      :close-on-content-click="false"
                      v-model="menu.start_time"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        class="grey--text text--lighten-2"
                        maxlength="30"
                        outline
                        v-validate="'required'"
                        readonly
                        v-model="triggerTime"
                        flat
                        :error-messages="errors.collect('start_time')"
                        name="start_time"
                        data-vv-as="start time"
                        label="Start time *"
                      ></v-text-field>
                      <v-time-picker
                        :allowed-minutes="allowedStep"
                        v-model="triggerTime"
                        full-width
                      ></v-time-picker>
                    </v-menu>
                  </v-flex>
                </div>
              </span>
          </div>
        </div>

      </v-card-text>
      <v-card-actions align-content-space->
        <div class="d-flex flex-row flex-wrap">
          <v-flex text-xs-left class="pl-4 ml-2">
            <v-btn color="error" flat @click="dialogs.scheduleCampaign=false;">Close</v-btn>
          </v-flex>
          <v-flex class="mr-5 text-xs-right">
            <v-btn color="adhoc" class="white--text"
              @click="confirm()">
              Confirm
            </v-btn>
          </v-flex>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
// import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  name: 'confirm',
  // components: {
  //   dayjs,
  // },
  data () {
    return {
      dialogs: {
        scheduleCampaign: false
      },
      schedule: null,
      triggerSchedule: false,
      triggerDate: dayjs().format('YYYY-MM-DD'),
      triggerTime: dayjs().format('HH:MM'),
      // triggerTime: this.round(dayjs(), (30 * 60 * 1000), 'ceil').format('HH:MM'),
      minDate: new Date().toISOString().substr(0, 10),
      menu: {
        date: false,
        start_time: false,
        end_time: false
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    formattedDate () {
      return dayjs(this.triggerDate).format('DD MMM YYYY');
    }
  },
  methods: {
    allowedStep: m => m % 5 === 0,
    round (date, duration, method) {
      return dayjs(Math[method]((+date) / (+duration)) * (+duration));
    },
    confirm () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          // if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent &&
          // this.$parent.$parent.$parent.$parent &&
          // this.$parent.$parent.$parent.$parent.newCampaign) {
          //   this.$parent.$parent.$parent.$parent.newCampaign.trigger_time = dayjs(`${this.triggerDate}`).format('YYYY-MM-DD').concat(dayjs(`${this.triggerTime}`).format('HH:mm'));
          //   this.$parent.$parent.$parent.$parent.triggerCampaign();
          //   this.dialogs.scheduleCampaign = false;
          // }
          if (this.$parent && this.$parent.newCampaign) {
            this.$parent.newCampaign.trigger_time = dayjs(`${this.triggerDate}`).format('YYYY-MM-DD').concat(` ${this.triggerTime}`);
            this.$parent.triggerCampaign();
            this.dialogs.scheduleCampaign = false;
          }
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Please fill schedule date and time!'
          });
        }
      });
    },
    updateSchedule (time) {
      this.schedule = time;
    },
    proceed () {
      if (this.triggerDate && this.triggerTime) {
        this.triggerSchedule = true;
      }
    }
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.audience-icon {
  height: 90px;
  width: 90px;
  &.flaticon {
    :before {
      font-size: 70px!important;
    }
  }
  &.v-icon {
    font-size: 70px!important;
    :before {
      font-size: 70px!important;
    }
    &.flaticon {
      :before {
        font-size: 70px!important;
      }
    }
  }
}
.difm-menu-split {
  height: 300px;
  float: left;
  margin-left: 63px;
  border-left: 1px solid #D0D2D3;
  margin-top: -15px;
  position: relative;
  left:15%;
}
</style>
