<template>
  <div>
    <div class="d-flex flex-row flex-wrap bg-white pt-4 pb-2" v-if="!list.questions.length">
      <v-flex class="text-center" style="margin-top:10%;">
        <strong class="body-2 font-weight-bold grey--text">
          No data available
        </strong>
      </v-flex>
    </div>
    <div class="d-flex flex-row flex-wrap bg-white pt-4 pb-2" v-if="list.questions.length">
      <v-flex xs3 class="text-right mt-3 pr-4">
        Show responses for :
      </v-flex>

      <v-flex xs9>
        <v-select
          elevation-0
          class="grey--text text--lighten-2 mr-0"
          :items="list.questions"
          item-text="questions[0].text"
          item-value="id"
          v-model="selectedQuestion"
          @input="updateData()"
          :error-messages="errors.collect('question')"
          label=""
          name="question"
          v-validate="'required'"
          outline
          flat
          single-line
        ></v-select>
      </v-flex>
    </div>

    <!-- <v-layout row wrap class="mb-4">-->
      <!-- No. of Responses -->
      <!-- <div class="open-ended overview-cards engagement-score" style="border-right: 1px solid rgb(243, 241, 241);">
        <p class="pa-3 score-card text-uppercase text-xs-center" style="font-weight:bold"> Total Responses </p>
        <h1 class="score-card heading w-100 mt-4 text-xs-center" v-if="report.totalResponses"> {{report.totalResponses}} </h1>

        <v-layout row wrap align-center justify-center fill-height v-else style="height:150px">
          <v-flex text-xs-center>
            <strong class="body-2 font-weight-bold grey--text">
              Not enough data to generate analysis
            </strong>
          </v-flex>
        </v-layout>
       </div> -->

       <!-- Touchpoints Covered -->
       <!-- <div class="open-ended overview-cards engagement-score" style="border-right: 1px solid rgb(243, 241, 241);">
        <p class="pa-3 score-card text-uppercase text-xs-center" style="font-weight:bold"> Touchpoints Covered </p>
        <h1 class="score-card heading w-100 mt-4 text-xs-center" v-if="report.totalResponses"> {{report.totalMilestones}} </h1>

        <v-layout row wrap align-center justify-center fill-height v-else style="height:150px">
          <v-flex text-xs-center>
            <strong class="body-2 font-weight-bold grey--text">
              Not enough data to generate analysis
            </strong>
          </v-flex>
        </v-layout>
       </div> -->

      <!-- Men VS Women -->
      <!-- <div class="open-ended overview-cards engagement-score" style="border-right: 0px">
        <p class="pa-3 score-card text-uppercase text-xs-center" style="font-weight:bold"> Diversity </p>
        <v-layout row wrap v-if="report.totalResponses">
          <div id="diversityPieChart" v-if="report.totalResponses" class="diversityPieChart"> </div>
        </v-layout>

        <v-layout row wrap align-center justify-center fill-height v-else style="height:150px">
          <v-flex text-xs-center>
            <strong class="body-2 font-weight-bold grey--text">
              Not enough data to generate analysis
            </strong>
          </v-flex>
        </v-layout>
      </div> -->
    <!-- </v-layout> -->

    <sentimentAnalysis ref="sentimentAnalysis" v-show="list.questions && list.questions.length > 0" containerId="4"> </sentimentAnalysis>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
// import Vue from 'vue';
import sentimentAnalysis from './sentimentAnalysis';
// import Anychart from 'anychart';
// import VueAnychart from '../analytics/VueAnychart.vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// import {
//   VTooltip
// } from 'vuetify';
dayjs.extend(relativeTime);

export default {
  name: 'TxtAnalysis',
  components: {
    // VTooltip,
    sentimentAnalysis
    // VueAnychart
  },
  data () {
    return {
      filtersApplied: false,
      report: {
        totalResponses: 0,
        totalMilestones: 0,
        men: 12,
        women: 7
      },
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      dateRangeOptions: {},
      list: {
        questions: []
      },
      selectedQuestion: null,
      config: {
        initialLoading: true
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      dashboardFilters: state => state.dashboardFilters
    })
  },
  methods: {
    getQuestions () {
      this.filtersApplied = false;
      this.list.questions = [];
      if (this.$refs.sentimentAnalysis) {
        if (this.$refs.sentimentAnalysis.config) {
          this.$refs.sentimentAnalysis.config.page_offset = 1;
        }
        this.$refs.sentimentAnalysis.responseData = [];
      }
      if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
        this.filters.selected = this.dashboardFilters.filters;
        this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
      }
      const queryParams = {
        initiated_date_start: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
        user__profile__high_potential_emp: this.dashboardFilters.highPotential
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          this.filtersApplied = true;
          queryParams[`user__profile__${k}__in`] = v.join();
        }
      });
      axios.get(`${process.env.VUE_APP_API_URL}interactions/list?type=textInput&fields=questions,id&merge_duplicate=true`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          this.config.initialLoading = false;
          this.list.questions = response.data;
          setTimeout(() => {
            this.$refs.sentimentAnalysis.analysisEnabled = false;
            this.$refs.sentimentAnalysis.analysisTab = false;
            this.$refs.sentimentAnalysis.sentimentTab = true;
            this.$refs.sentimentAnalysis.report = { question_analysis: {} };
            this.$refs.sentimentAnalysis.filterData = queryParams;
            this.$refs.sentimentAnalysis.queries = [];
            // this.$refs.sentimentAnalysis.dialogs.sentimentAnalysis = true;

            if (this.list && this.list.questions && this.list.questions.length > 0) {
              this.selectedQuestion = this.list.questions[0].id;
              this.$refs.sentimentAnalysis.selectedQuestionID = this.list.questions[0].id;
              // this.getStats(this.list.questions[0].id);
              this.$refs.sentimentAnalysis.generateWordCloud();
            }
            if (this.filtersApplied) {
              this.$refs.sentimentAnalysis.getResponses();
            }
          }, 100);
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch questions, Please try again later!'
        });
        throw new Error(response);
      });
    },
    updateData () {
      this.$refs.sentimentAnalysis.analysisEnabled = false;
      this.$refs.sentimentAnalysis.analysisTab = false;
      this.$refs.sentimentAnalysis.sentimentTab = true;
      this.$refs.sentimentAnalysis.report = { question_analysis: {} };
      // this.$refs.sentimentAnalysis.dialogs.sentimentAnalysis = true;
      this.$refs.sentimentAnalysis.selectedQuestionID = this.selectedQuestion;
      if (this.selectedQuestion && this.selectedQuestion.questions && this.selectedQuestion.questions[0]) {
        this.$refs.sentimentAnalysis.question = this.selectedQuestion.questions[0].text;
      }
      // this.getStats(this.selectedQuestion);
      this.$refs.sentimentAnalysis.generateWordCloud();
      this.$refs.sentimentAnalysis.config.page_offset = 1;
      this.$refs.sentimentAnalysis.responseData = [];
      // this.$refs.sentimentAnalysis.matchingResponses = 0;
      this.$refs.sentimentAnalysis.getResponses();
    },
    getStats (id) {
      this.report.totalResponses = 0;
      if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
        this.filters.selected = this.dashboardFilters.filters;
        this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
      }
      let queryParams = {
        initiated_date_start: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`user__profile__${k}__in`] = v.join();
        }
      });
      const temp = {
        fields: 'id,response_count,distinct_milestone_count'
        // irpl: 10,
        // irpo: this.config.page_offset,
      };
      queryParams = {
        ...queryParams,
        ...temp
      };
      axios.get(`${process.env.VUE_APP_API_URL}interactions/${id}/details`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          this.report.totalResponses = response.data.response_count;
          this.report.totalMilestones = response.data.distinct_milestone_count;
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch data, Please try again later!'
        });
        throw new Error(response);
      });
    }
  },
  watch: {
    // search() {
    //   this.queries = [];
    //   this.queries.push(this.search);
    // },
  },
  beforeMount () {
    // this.getQuestions();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.diversityPieChart {
  height: 200px!important;
  width: 100%!important;
  margin: 8px auto 8px auto!important;
  position: relative!important;
  top: -30px !important;
}

.overview-cards {
  width: 32.5%!important;
  margin: 0 auto!important;
  background-color: #fff;
  border: 1px solid grey!important;
  // border-top: 0px!important;
  // border-bottom: 0px!important;
  // border-left: 0px!important;
  // border-right: 1px solid rgb(243, 241, 241)!important;
  color: #000!important;
  .score-card {
    text-align: center!important;
    &.heading {
      font-weight: 200!important;
      // text-shadow: rgb(243, 241, 241) 8px 4px!important;
    }
    &.subheading {
      height: 60px !important;
    }
  }
  &.engagement-score {
    .score-card {
      color: #000!important;
    }
  }
}

.template-custom-field {
  &.no-margin {
    height:50px!important;
  }
  &.v-text-field--box {
    .v-input__slot {
      min-height: unset!important;
    }
  }
  &.v-text-field--outline {
    .v-input__slot {
      min-height: unset!important;
    }
  }
  &.v-text-field {
    &.v-text-field--solo {
      .v-input__control {
         min-height: unset!important;
      }
    }
  }
  &.v-text-field--box {
    &.v-text-field--single-line {
      input {
        margin-top: 0px!important;
      }
    }
  }
  &.v-text-field--outline {
    &.v-text-field--single-line {
      input {
        margin-top: 0px!important;
      }
    }
  }
  &.v-text-field {
    &.v-text-field--enclosed {
      .v-input__prepend-outer {
        margin-top:0px!important;
      }
      .v-input__prepend-inner {
        margin-top:0px!important;
      }
      .v-input__append-outer {
        margin-top:0px!important;
      }
      .v-input__append-inner {
        margin-top:0px!important;
      }
    }
  }
}
</style>
