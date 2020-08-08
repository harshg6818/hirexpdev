<template>
  <div class="">
    <v-layout row wrap>
      <v-flex sm12 px-1>
        <div class="d-inline-flex w-100 mb-0 px-5 py-3" style="color:#6f7e95;">
          <p class="text-xs-center main-heading"> Question Wise Analysis </p>
          <!--<h2 class="text-xs-right" v-if="report && report.company_driver_average"> Score : {{report.company_driver_average}} / 5 </h2>
          <h2 class="text-xs-right" v-else> Score : 0 / 5 </h2>-->
        </div>

        <v-layout row wrap class="mb-4">
          <!-- Initial Loading Filters -->
          <div class="w-100" v-show="config.initialLoading">
            <ContentLoader
                :height="180"
                :width="400"
                :speed="2"
                primaryColor="#f3f3f3"
                secondaryColor="#fff"
            >
                <rect x="5" y="0" rx="2" ry="2" width="390" height="17.93" />
                <rect x="5" y="25" rx="2" ry="2" width="390" height="17.93" />
                <rect x="5" y="50" rx="2" ry="2" width="390" height="17.93" />
                <rect x="5" y="75" rx="2" ry="2" width="390" height="17.93" />
                <rect x="5" y="100" rx="2" ry="2" width="390" height="17.93" />
                <rect x="5" y="125" rx="2" ry="2" width="390" height="17.93" />
                <rect x="5" y="150" rx="2" ry="2" width="390" height="17.93" />
            </ContentLoader>
          </div>

          <!-- No questions -->
          <div class="w-100 px-5" v-show="!config.initialLoading && (!questions || !questions.length)">
            <v-card class="elevation-0 text-xs-center" min-height="60vh">
              <v-card-title primary-title class="justify-center">
                <v-layout row wrap>
                  <v-flex xs12>
                    <img :src="getImgUrl('amara_avatar')" class="blank-avatar" alt="">
                    <p>
                      No questions present.
                    </p>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-card>
          </div>

          <!-- Questions List -->
          <div class="w-100 px-0" v-show="!config.initialLoading && questions && questions.length > 0">
            <v-layout v-for="(q, qi) in questions" :key="qi" class="active-response py-0" style="border-bottom:1px solid rgb(243, 241, 241);background-color:#fff">
              <!--<v-card class="w-100 mb-4 pa-3 elevation-0 d-inline-flex">
                <v-layout>-->
                  <v-flex xs1>
                    <p class="pt-0 px-3 mt-2 text-xs-center" style="border-radius:0px"> Q {{ qi+1 }} </p>
                  </v-flex>
                  <v-flex xs8>
                    <div class="w-100 d-inline-flex">
                      <p class="pa-0 mb-0 mt-2"> {{ q.msg[0].text }} </p>
                    </div>
                    <!-- <div class="w-100 grey--text">
                      Qusetion Type : <v-icon> {{questiQuestion Wise AnalysisQuestion Wise AnalysisonIcon(q.type)}} </v-icon> {{q.type}}
                    </div>-->
                  </v-flex>
                  <v-flex xs3 class="pr-3" text-xs-right>
                    <v-btn color="primary"
                      style="border-radius:5px"
                      @click="switchQuestion(q.interaction_id, q.msg[0].text, qi, q.type)"
                      small class="ml-0 elevation-0 white--text pl-0 text-capitalize"
                      >
                      <v-icon small class="ml-2">fas fa-chart-bar</v-icon>
                        &nbsp; &nbsp; View Analysis
                    </v-btn>
                  </v-flex>
                <!--</v-layout>
              </v-card>-->
            </v-layout>
          </div>
        </v-layout>

      </v-flex>
    </v-layout>

    <v-dialog v-model="dialogs.sentimentAnalysis">
      <sentimentAnalysis ref="sentimentAnalysis" containerId="3"> </sentimentAnalysis>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { mapState } from 'vuex';
import axios from 'axios';
// import { VTooltip, VDialog } from 'vuetify';
import { ContentLoader } from 'vue-content-loader';
import dayjs from 'dayjs';
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';
import sentimentAnalysis from '../sentimentAnalysis';

// am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_kelly);
export default {
  name: 'overview',
  components: {
    // VTooltip,
    // VDialog,
    ContentLoader,
    sentimentAnalysis
  },
  data () {
    return {
      stats: false,
      questions: [],
      config: {
        initialLoading: true,
        loading: false,
        initialLoadingFilters: true
      },
      dialogs: {
        sentimentAnalysis: false
      },
      dateRangeOptions: {},
      filters: {}
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      dashboardFilters: state => state.dashboardFilters
    })
  },
  methods: {
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    switchQuestion (id, text, index, type) {
      this.getQuestionsReport(id, text, index, type);
    },
    questionIcon (type) {
      let icon = '';
      if (type === 'scale') {
        icon = 'fas fa-arrows-alt-h';
      } else if (type === 'closeEnded') {
        icon = 'fas fa-reply-all';
      } else if (type === 'text') {
        icon = 'fas fa-align-left';
      } else if (type === 'textInput') {
        icon = 'fas fa-keyboard';
      }
      return icon;
    },
    getQuestionsReport (id, text, index, type) {
      if (this.$refs.sentimentAnalysis) {
        this.$refs.sentimentAnalysis.wordCloudData = null;
      }
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
        fields: 'id,questions,type,driver,sub_driver,response_count,response_breakup,response_wordcloud_analysis,interaction_responses,responses_sentiment_analysis',
        interaction_responses_fields: 'formatted_response,response_sentiment,user_name,user_email,user_department,user_location,interaction_sub_driver,interaction_driver',
        stage_id: this.$route.params && this.$route.params.stageId ? this.$route.params.stageId : undefined,
        irpo: 1,
        irpl: 10
      };
      queryParams = {
        ...queryParams,
        ...temp
      };
      axios.get(`${process.env.VUE_APP_API_URL}interactions/${id}/details`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        // console.log(response);
        if (response && response.data) {
          // dummy Response report
          this.$refs.sentimentAnalysis.selectedQuestion = response.data;
          if (response.data.type === 'scale' || response.data.type === 'closeEnded') {
            const temp = [];
            const resp = JSON.parse(JSON.stringify(response.data.response_breakup));
            let total = 0;
            this.$lodash.each(resp, (res, ri) => {
              total += res.count;
            });
            this.$lodash.each(resp, (res, ri) => {
              temp.push(res);
              temp[temp.length - 1].percent = ((res.count / total) * 100).toFixed(1);
            });
            this.$refs.sentimentAnalysis.report = temp;
            this.$refs.sentimentAnalysis.sentimentTab = false;
            this.$refs.sentimentAnalysis.analysisTab = true;
            this.$refs.sentimentAnalysis.analysisEnabled = true;
            this.$refs.sentimentAnalysis.tabs.active = 'tab-analysis';
            // this.$refs.sentimentAnalysis.tabs.list[1].enabled = false;
            if (response.data.type === 'scale') {
              this.$refs.sentimentAnalysis.generateDonut(temp, 'scale');
            } else {
              this.$refs.sentimentAnalysis.generateDonut(temp, 'closeEnded');
            }

            // Inject wordcloud and response data at same time without extra API call
            this.$refs.sentimentAnalysis.totalResponses = response.data.response_count;
            this.$refs.sentimentAnalysis.wordCloudData = response.data.response_wordcloud;
            this.$refs.sentimentAnalysis.responseAnalysis = response.data.responses_sentiment_analysis;
            if (response.data.interaction_responses) {
              this.$refs.sentimentAnalysis.responseData = response.data.interaction_responses.response_dict;
            }
          } else {
            this.$refs.sentimentAnalysis.sentimentTab = true;
            this.$refs.sentimentAnalysis.analysisTab = false;
            this.$refs.sentimentAnalysis.analysisEnabled = false;
            this.$refs.sentimentAnalysis.tabs.active = 'tab-sentiment-analysis';
            this.$refs.sentimentAnalysis.tabs.list[0].enabled = false;
            this.$refs.sentimentAnalysis.report = { question_analysis: {} };

            this.$refs.sentimentAnalysis.filterData = queryParams;

            this.$refs.sentimentAnalysis.totalResponses = response.data.response_count;
            this.$refs.sentimentAnalysis.wordCloudData = response.data.response_wordcloud;
            this.$refs.sentimentAnalysis.responseAnalysis = response.data.responses_sentiment_analysis;
            if (response.data.interaction_responses) {
              this.$refs.sentimentAnalysis.responseData = response.data.interaction_responses.response_dict;
            }

            this.$refs.sentimentAnalysis.generateWordCloud();
            // this.$refs.sentimentAnalysis.getResponses();
          }
          this.$refs.sentimentAnalysis.dialogs.sentimentAnalysis = true;
          this.$refs.sentimentAnalysis.sentimentFilters = {};
          this.dialogs.sentimentAnalysis = true;
          this.$refs.sentimentAnalysis.selectedQuestionID = id;
          this.$refs.sentimentAnalysis.question = text;
          this.$refs.sentimentAnalysis.questionType = type;
          this.$refs.sentimentAnalysis.dialogs.sentimentAnalysis = true;
        }
      }, (response) => {
        // console.log(response);
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch questions report, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getQuestions (campaignId) {
      const queryParams = {
        fields: 'title,type,description,company,createdAt,createdBy,lastUpdated,interactions'
      };
      axios.get(`${process.env.VUE_APP_API_URL}survey/${campaignId}/details`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          this.$nextTick(function a () {
            this.questions = response.data.interactions;
            // this.table.totalItems = response.data.total_count;
            // this.pagination.length = Math.ceil(this.table.totalItems / this.pagination.rowsPerPage);
            this.$forceUpdate();
          });
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
    }
  },
  created () {
    // this.$refs.Overview.generateAbsoluteMood(response.data.company_mood_stats);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#moodAbsolute, #moodAverage {
  width: 100%;
  height: 25.6em;
  &.small-height {
    height: 15.1em;
  }
}

.v-tabs__slider {
 &.accent {
    background-color: #4c3e9d !important;
    border-color: #4c3e9d !important;
 }
}
#moodAbsolute, #moodAverage {
  width: 100%;
  height: 25.6em;
  &.small-height {
    height: 15.1em;
  }
}
</style>
