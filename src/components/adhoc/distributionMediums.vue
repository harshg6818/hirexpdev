<template>
  <div>
    <div class="mt-2 px-4">
      <div class="d-flex flex-row flex-wrap">
        <v-flex xs1>
        </v-flex>
        <v-flex>
          <h2 class="mb-5 ml-5 pl-5 grey--text"> Please select your preferred channel to inform the employees about the campaign </h2>
        </v-flex>
      </div>

      <div class="mb-3 b-top pt-2 d-flex flex-wrap flex-row" v-for="(medium, mi) in distributionMediums" style="border-color: #f3f1f1" :key="mi">
        <v-flex xs1></v-flex>
        <v-flex xs2 class="mr-2" text-xs-center>
          <v-icon large color="#4c3e9d" class="audience-icon"> {{medium.icon}} </v-icon>
          <!--<v-img :src="getImgUrl(medium.logo)" class="distribution-mediums">  </v-img>-->
        </v-flex>
        <v-flex xs6>
          <h3 class="pt-3"> {{medium.name}} </h3>
          <h5 class="grey--text"> {{medium.description}} </h5>
          <h4 style="color:#4c3e9d" v-if="medium.comingSoon"> Coming Soon </h4>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs1>
          <!--<v-btn
            color=""
            :disabled="medium.disabled"
            @click="configure(medium)"
          >
            <v-icon small> fa fa-cog </v-icon>
            &nbsp; &nbsp; Configure
          </v-btn>-->

          <v-switch
            color="adhoc"
            :disabled="medium.disabled"
            @change="configure(medium)"
            v-model="distribution[medium.logo]"
            :label="distribution[medium.logo] ? 'Enabled' : 'Disabled'"
            inset>
          </v-switch>
        </v-flex>
        <v-flex xs1 v-if="distribution[medium.logo]">
          <v-btn
            class="mt-2"
            color=""
            @click="configure(medium)"
          >
            <v-icon small> fa fa-edit </v-icon>
            &nbsp; &nbsp; Edit
          </v-btn>
        </v-flex>
        <v-flex xs1></v-flex>
      </div>
    </div>

    <distribution-configuration ref="distributionConfiguration" v-show="dialogs.configuration">  </distribution-configuration>
  </div>
</template>

<script>
// import { VAlert, VMenu, VSlider, VTextarea, VSelect, VChip, VPagination, VCheckbox, VSwitch } from 'vuetify';
// import { Container, Draggable } from 'vue-smooth-dnd';
import { mapState } from 'vuex';
// import axios from 'axios';
// import VueContentLoading from 'vue-content-loading';
// import PapaParse from 'papaparse';
import distributionConfiguration from './distributionConfiguration';

export default {
  name: 'distributionMediums',
  components: {
    // VAlert,
    // VMenu,
    // VTextarea,
    // VSlider,
    // VSelect,
    // Container,
    // Draggable,
    // VChip,
    // VPagination,
    // VCheckbox,
    // VSwitch,
    // VueContentLoading,
    distributionConfiguration
  },
  data () {
    return {
      dialogs: {
        configuration: false
      },
      distribution: {},
      distributionMediums: [{
        name: 'Email',
        logo: 'email',
        icon: 'flaticon-006-email',
        comingSoon: false,
        disabled: false,
        description: 'Create custom email with the campaign link to encourage participation and also track responses.'
      }, {
        name: 'SMS',
        logo: 'sms',
        icon: 'flaticon-003-chat-1',
        comingSoon: false,
        disabled: false,
        description: 'Select SMS as a mode to drive participation by sending campaign link with personalized message.'
      }, {
        name: 'Whats App',
        logo: 'whatsapp',
        icon: 'fab fa-whatsapp',
        comingSoon: true,
        disabled: true,
        description: 'Encourage your employees to take part in the campaign, send them the link on WhatsApp.'
      }, {
        name: 'Slack',
        logo: 'slack',
        icon: 'fab fa-slack-hash',
        comingSoon: true,
        disabled: true,
        description: 'Select Slack as a channel to inform employees about the campaign and they can access it directly from Slack.'
      }]
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    configure (medium) {
      if (this.distribution[medium.logo]) {
        this.dialogs.configuration = true;
        if (this.$refs.distributionConfiguration) {
          this.$refs.distributionConfiguration.dialogs.configuration = true;
        }
        this.$refs.distributionConfiguration.distMedium = medium;
        this.$refs.distributionConfiguration.getStage = medium;
      } else {
        this.$parent.$parent.$parent.newCampaign.distribution[medium.logo] = false;
      }
      // this.$refs.distributionConfiguration.configureDistributionMedium(medium);
    }
  },
  created () {
    if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent && this.$parent.$parent.$parent.newCampaign) {
      const newCampaign = this.$parent.$parent.$parent.newCampaign;
      const dist = {};
      this.$lodash.each(newCampaign.distribution, (v) => {
        dist[v.type] = true;
      });
      this.distribution = dist;
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
.distribution-mediums {
  height: 120px;
  width: 120px;
  position:relative;
  left:25%;
  top:-5%;
}
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
</style>
