<template>
  <div>
    <div class="mt-2 px-4">
      <v-layout row wrap>
        <v-flex xs1>
        </v-flex>
        <v-flex>
          <h2 class="mb-5 grey--text ml-5"> Would you like to review your campaign before launch? </h2>
        </v-flex>
      </v-layout>

      <v-layout row wrap class="b-top" style="border-color: #f3f1f1">
        <v-flex xs1>
        </v-flex>
        <v-flex xs1 text-xs-center>
          <v-icon large color="#4c3e9d" class="pt-4"> fa fa-check-circle </v-icon>
        </v-flex>
        <v-flex xs6>
          <h3 class="px-3 pt-3 mb-2"> Campaign Title </h3>
          <div class="px-3 pb-3"> {{newStage.title}} </div>
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
      </v-layout>

      <v-layout row wrap class="b-top" style="border-color: #f3f1f1">
        <v-flex xs1>
        </v-flex>
        <v-flex xs1 text-xs-center>
          <v-icon large color="#4c3e9d" class="pt-4"> fa fa-check-circle </v-icon>
        </v-flex>
        <v-flex xs6>
          <h3 class="px-3 pt-3 mb-2"> Campaign Category </h3>
          <div class="px-3 pb-3" v-if="newStage.category !== 'Others'"> {{newStage.category}} </div>
          <div class="px-3 pb-3" v-else> {{newStage.categoryValue}} </div>
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
      </v-layout>

      <v-layout row wrap class="b-top" style="border-color: #f3f1f1">
        <v-flex xs1>
        </v-flex>
        <v-flex xs1 text-xs-center>
          <v-icon large color="#4c3e9d" class="pt-4"> fa fa-check-circle </v-icon>
        </v-flex>
        <v-flex xs6>
          <h3 class="px-3 pt-3 mb-2"> Questions </h3>
          <div class="px-3 pb-3" v-if="newStage.questions && newStage.questions.length"> This campaign has {{newStage.questions.length}} questions. </div>
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
      </v-layout>

      <v-layout row wrap class="b-top" style="border-color: #f3f1f1">
        <v-flex xs1>
        </v-flex>
        <v-flex xs1 text-xs-center>
          <v-icon large color="#4c3e9d" class="pt-4"> fa fa-check-circle </v-icon>
        </v-flex>
        <v-flex xs6>
          <h3 class="px-3 pt-3 mb-2"> Audience </h3>
          <div class="px-3 pb-3" v-if="newStage.totalAudienceCount"> This campaign will run on {{newStage.totalAudienceCount}} recipients. </div>
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
      </v-layout>

      <v-layout class="b-top" style="border-color: #f3f1f1">
        <v-flex xs1>
        </v-flex>
        <v-flex xs1 text-xs-center>
          <!--<v-icon color="#4c3e9d" class="text--white" class="pt-4"> fa fa-check-circle </v-icon>-->
        </v-flex>
        <v-flex xs6>
          <h3 class="px-3 pt-3 mb-2"> Completion Time </h3>
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
            <v-text-field
              slot="activator"
              class="grey--text text--lighten-2"
              maxlength="30"
              :value="newStage.schedule_end_at"
              v-validate="'required'"
              readonly
              flat
              outline
              :error-messages="errors.collect('date')"
              name="date"
              label="Date *"
            ></v-text-field>
            <v-date-picker v-model="newStage.schedule_end_at" no-title
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
      </v-layout>

      <v-layout class="mt-4">
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
      </v-layout>
    </div>

  </div>
</template>

<script>
// import { VAlert, VMenu, VTextarea, VSelect } from 'vuetify';
// import { Container, Draggable } from 'vue-smooth-dnd';
import { mapState } from 'vuex';
// import axios from 'axios';
// import VueContentLoading from 'vue-content-loading';
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
    // dayjs,
  },
  data () {
    return {
      newStage: {},
      menu: {
        date: false
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    edit (tab) {
      if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent && this.$parent.$parent.$parent.config) {
        this.$parent.$parent.$parent.config.activeTab = tab;
      }
    },
    formattedDate () {
      return dayjs(this.newStage.schedule_end_at).endOf('day').format('YYYY-MM-DD');
    },
    scheduleCampaign () {
      if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent) {
        this.$parent.$parent.$parent.scheduleCampaign();
      }
    },
    activateCampaign () {
      if (this.newStage.schedule_end_at) {
        if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent) {
          this.$parent.$parent.$parent.newStage.schedule_end_at = dayjs(`${this.newStage.schedule_end_at}`).format('YYYY-MM-DD');
          this.$parent.$parent.$parent.activateCampaign();
        }
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Please fill campaign completion time!'
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
    if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent && this.$parent.$parent.$parent.newStage) {
      this.newStage = this.$parent.$parent.$parent.newStage;
      if (this.$parent.$parent.$parent.$refs.survey && this.$parent.$parent.$parent.$refs.survey.newSurvey &&
      this.$parent.$parent.$parent.$refs.survey.newSurvey.interactions) {
        this.newStage.questions = this.$parent.$parent.$parent.$refs.survey.newSurvey.interactions;
        this.newStage.schedule_end_at = this.$parent.$parent.$parent.newStage.schedule_end_at;
      }
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
