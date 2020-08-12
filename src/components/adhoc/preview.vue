<template>
  <div>
    <div class="mt-2 px-4">
      <div class="d-flex flex-row flex-wrap">
        <v-flex xs1>
        </v-flex>
        <v-flex>
          <h2 class="mb-5 grey--text ml-5"> Would you like to review your campaign before launch? </h2>
        </v-flex>
      </div>

      <div class="d-flex flex-row flex-wrap b-top" style="border-color: #f3f1f1">
        <v-flex xs1>
        </v-flex>
        <v-flex xs1 text-xs-center>
          <v-icon large color="#4c3e9d" class="pt-4"> fa fa-check-circle </v-icon>
        </v-flex>
        <v-flex xs6>
          <h3 class="px-3 pt-3 mb-2"> Campaign Title </h3>
          <div class="px-3 pb-3"> {{newCampaign.title}} </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs1>
          <v-btn
            class="mt-3"
            color=""
            @click="edit('summary')"
          >
            <v-icon small> fa fa-edit </v-icon>
            &nbsp; &nbsp; Edit
          </v-btn>
        </v-flex>
        <v-flex xs1></v-flex>
      </div>

      <div class="d-flex flex-row flex-wrap b-top" style="border-color: #f3f1f1">
        <v-flex xs1>
        </v-flex>
        <v-flex xs1 text-xs-center>
          <v-icon large color="#4c3e9d" class="pt-4"> fa fa-check-circle </v-icon>
        </v-flex>
        <v-flex xs6>
          <h3 class="px-3 pt-3 mb-2"> Campaign Category </h3>
          <div class="px-3 pb-3" v-if="newCampaign.category !== 'Others'"> {{ getCategory(newCampaign.category) }} </div>
          <div class="px-3 pb-3" v-else> {{newCampaign.categoryValue}} </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs1>
          <v-btn
            class="mt-3"
            color=""
            @click="edit('summary')"
          >
            <v-icon small> fa fa-edit </v-icon>
            &nbsp; &nbsp; Edit
          </v-btn>
        </v-flex>
        <v-flex xs1></v-flex>
      </div>

      <div class="d-flex flex-row flex-wrap b-top" style="border-color: #f3f1f1">
        <v-flex xs1>
        </v-flex>
        <v-flex xs1 text-xs-center>
          <v-icon large color="#4c3e9d" class="pt-4"> fa fa-check-circle </v-icon>
        </v-flex>
        <v-flex xs6>
          <h3 class="px-3 pt-3 mb-2"> Questions </h3>
          <div class="px-3 pb-3" v-if="campaignInteractionsCount > 0"> This campaign has {{ campaignInteractionsCount }} questions. </div>
          <div class="px-3 pb-3" v-else> This campaign does not have any question. </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs1>
          <v-btn
            class="mt-3"
            color=""
            @click="edit('survey')"
          >
            <v-icon small> fa fa-edit </v-icon>
            &nbsp; &nbsp; Edit
          </v-btn>
        </v-flex>
        <v-flex xs1></v-flex>
      </div>

      <div class="d-flex flex-row flex-wrap b-top" style="border-color: #f3f1f1">
        <v-flex xs1>
        </v-flex>
        <v-flex xs1 text-xs-center>
          <v-icon large color="#4c3e9d" class="pt-4"> fa fa-check-circle </v-icon>
        </v-flex>
        <v-flex xs6>
          <h3 class="px-3 pt-3 mb-2"> Audience </h3>
          <div class="px-3 pb-3" v-if="newCampaign.totalAudienceCount"> This campaign will run on {{newCampaign.totalAudienceCount}} recipients. </div>
          <div class="px-3 pb-3" v-else> This campaign does not have any recipients. </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs1>
          <v-btn
            class="mt-3"
            color=""
            @click="edit('audience')"
          >
            <v-icon small> fa fa-edit </v-icon>
            &nbsp; &nbsp; Edit
          </v-btn>
        </v-flex>
        <v-flex xs1></v-flex>
      </div>

      <div class="d-flex flex-row flex-wrap b-top" style="border-color: #f3f1f1">
        <v-flex xs1>
        </v-flex>
        <v-flex xs1 text-xs-center>
          <!--<v-icon color="#4c3e9d" class="text--white" class="pt-4"> fa fa-check-circle </v-icon>-->
        </v-flex>
        <v-flex xs6>
          <h3 class="px-3 pt-3 mb-2"> Cutoff Date </h3>
          <v-menu
            ref="dateMenu"
            :close-on-content-click="false"
            v-model="menu.date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            style="position:relative;top:-3px;left:10px"
            max-width="290px"
            min-width="290px"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-bind="attrs"
              v-on="on"
              class="grey--text text--lighten-2"
              maxlength="30"
              :value="formattedDate"
              v-validate="'required'"
              readonly
              flat
              outline
              :error-messages="errors.collect('date')"
              name="date"
              label="Date *"
            ></v-text-field>
          </template>
            <v-date-picker v-model="newCampaign.schedule_end_at" no-title
            format="DD-MM-YYYY"
            :min="nowDate"
            @input="menu.date = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-spacer></v-spacer>
        <!--<v-flex xs1>
          <v-btn
            color=""
            :disabled="medium.disabled"
            @click="configure(medium)"
          >
            <v-icon small> fa fa-edit </v-icon>
            &nbsp; &nbsp; Edit
          </v-btn>
        </v-flex>-->
        <v-flex xs1></v-flex>
      </div>

      <div class="mt-4 d-flex flex-row flex-wrap">
        <v-flex xs2></v-flex>
        <v-flex xs2>
          <v-btn color="orange" class="elevation-0 white--text text-xs-right"
            @click="testCampaign()"
          >
            Test Campaign
          </v-btn>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs2>
          <v-btn color="primary" class="elevation-0 white--text text-xs-right"
            @click="scheduleCampaign()"
          >
            Schedule Campaign
          </v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn color="adhoc" class="elevation-0 white--text text-xs-right"
            @click="activateCampaign()"
          >
            Launch Campaign
          </v-btn>
        </v-flex>
      </div>
    </div>

    <testCampaign ref="testCampaign"> </testCampaign>
    <scheduleCampaign ref="scheduleCampaign"> </scheduleCampaign>
  </div>
</template>

<script>
// import { VAlert, VMenu, VTextarea, VSelect } from 'vuetify';
// import { Container, Draggable } from 'vue-smooth-dnd';
import { mapState } from 'vuex';
// import axios from 'axios';
// import VueContentLoading from 'vue-content-loading';
import testCampaign from './testCampaign';
import scheduleCampaign from './scheduleCampaign';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  name: 'NewQuestion',
  components: {
    // VAlert,
    // VMenu,
    // VTextarea,
    // VSelect,
    // Container,
    // VueContentLoading,
    testCampaign,
    scheduleCampaign
    // dayjs,
  },
  props: ['newSurvey'],
  data () {
    return {
      nowDate: new Date().toISOString().slice(0, 10),
      campaignCategories: [{
        text: 'Employee Engagement',
        value: 'employee_engagement',
        disabled: false
      }, {
        text: 'Candidate Engagement',
        value: 'candidate_engagement',
        disabled: true
      }, {
        text: 'Customer Engagement',
        value: 'customer_engagement',
        disabled: true,
        beta: true
      // }, {
      //   text: 'Others',
      //   value: 'others',
      }, {
        text: 'Research',
        value: 'research',
        disabled: true
      }],
      newCampaign: {
        questions: [],
        schedule_end_at: ''
      },
      menu: {
        date: false
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    formattedDate () {
      return dayjs(this.newCampaign.schedule_end_at).endOf('day').format('DD-MM-YYYY');
    },
    campaignInteractionsCount () {
      let counter = 0;
      if (this.newCampaign.questions && this.newCampaign.questions.length > 0) {
        this.$lodash.each(this.newCampaign.questions, (v, k) => {
          if (v.response_required) {
            counter++;
          }
        });
      }
      return counter;
    }
  },
  watch: {
    newSurvey () {
      if (this.newSurvey && this.newSurvey.interactions) {
        this.newCampaign.questions = this.newSurvey.interactions;
      }
    }
  },
  methods: {
    getCategory (category) {
      let name = category;
      this.$lodash.each(this.campaignCategories, (v, k) => {
        if (v.value === category) {
          name = v.text;
        }
      });
      return name;
    },
    edit (tab) {
      if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent && this.$parent.$parent.$parent.config) {
        this.$parent.$parent.$parent.config.activeTab = tab;
      }
    },
    scheduleCampaign () {
      if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent) {
        this.$parent.$parent.$parent.scheduleCampaign();
      }
    },
    activateCampaign () {
      if (this.newCampaign.schedule_end_at) {
        if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent) {
          this.$parent.$parent.$parent.newCampaign.schedule_end_at = dayjs(`${this.newCampaign.schedule_end_at}`).format('YYYY-MM-DD');
          this.$parent.$parent.$parent.activateCampaign();
        }
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Please fill campaign cutoff date!'
        });
      }
    },
    testCampaign () {
      this.$refs.testCampaign.dialogs.testCampaign = true;
      // if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent) {
      //   this.$parent.$parent.$parent.activateCampaign();
      // }
    }
  },
  created () {
    if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent && this.$parent.$parent.$parent.newCampaign) {
      this.newCampaign = this.$parent.$parent.$parent.newCampaign;
      this.newCampaign.questions = this.newSurvey.interactions;
    }
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// .hover-link:hover {
//   color:#4c3e9d !important
// }
</style>
