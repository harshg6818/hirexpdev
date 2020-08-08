<template>
  <v-dialog
    max-width="600px"
    v-model="dialogs.confirmTrigger"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-text>
        <h2 class="mb-3"> Send campaign </h2>
        <v-layout class="mb-2">
          <v-flex xs12 text-xs-center>
            <v-icon large color="#4c3e9d" style="font-size:800px" class="audience-icon"> fa fa-rocket </v-icon>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 text-xs-center class="mt-4">
            <h3> We are about to take off </h3>
            <!-- <h4> {{totalAudienceCount}} recipients </h4> -->
          </v-flex>
        </v-layout>

      </v-card-text>
      <v-card-actions class="mt-3 mb-3" align-content-space->
        <v-layout row wrap>
          <v-flex xs6 text-xs-left class="pl-3">
            <v-btn color="error" flat @click.stop="dialogs.confirmTrigger=false;">Close</v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right class="pr-3">
            <v-btn color="adhoc" class="white--text"
              @click.stop="confirm()">
              Confirm
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
// import axios from 'axios';
import dayjs from 'dayjs';

export default {
  name: 'confirm',
  components: {},
  data () {
    return {
      dialogs: {
        confirmTrigger: false
      },
      schedule: null,
      triggerSchedule: false,
      triggerDate: dayjs().format(),
      triggerTime: dayjs().format('HH:MM'),
      // triggerTime: this.round(dayjs(), (30 * 60 * 1000), 'ceil').format('HH:MM'),
      minDate: new Date().toISOString().substr(0, 10),
      totalAudienceCount: null
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    allowedStep: m => m % 5 === 0,
    round (date, duration, method) {
      return dayjs(Math[method]((+date) / (+duration)) * (+duration));
    },
    confirm () {
      // console.log(this.triggerTime, dayjs(`${this.triggerTime}`).format('THH:mm'));
      if (this.$parent && this.$parent.newCampaign) {
        // this.$parent.newCampaign.trigger_time = dayjs(`${this.triggerDate}`).format('YYYY-MM-DD').concat(` ${dayjs(`${this.triggerTime}`).format('THH:mm')}`);
        this.$parent.newCampaign.trigger_time = dayjs(`${this.triggerDate}`).format('YYYY-MM-DD').concat(` ${this.triggerTime}`);
        this.$parent.triggerCampaign();
        this.dialogs.confirmTrigger = false;
      }
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
  },
  created () {
    if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent &&
        this.$parent.$parent.$parent.$parent &&
        this.$parent.$parent.$parent.$parent.newCampaign) {
      this.totalAudienceCount = this.$parent.$parent.$parent.$parent.newCampaign.totalAudienceCount;
    }
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
