<template>
  <div class="">
    <div class="d-flex flex-row flex-wrap">
      <v-flex sm12 px-1>

        <div class="pb-4 white d-flex flex-row flex-wrap">
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
                <div class="d-flex flex-row flex-wrap">
                  <v-flex xs12>
                    <img :src="getImgUrl('amara_avatar')" class="blank-avatar" alt="">
                    <p>
                      No questions present.
                    </p>
                  </v-flex>
                </div>
              </v-card-title>
            </v-card>
          </div>

          <!-- Questions List -->
          <div class="w-100" v-show="!config.initialLoading && questions && questions.length > 0">
            <p class="mb-0 px-5 py-3 main-heading" style="color:#6f7e95;" > <strong> Question wise analysis </strong> </p>
            <div v-for="(q, qi) in questions" :key="qi" class="active-response py-2 d-flex" style="border-bottom:1px solid rgb(243, 241, 241);background-color:#fff">
              <!--<v-card class="w-100 mb-4 pa-3 elevation-0 d-inline-flex">
                <v-layout>-->
                  <v-flex xs1>
                    <p class="pt-0 px-3 text-center" style="border-radius:0px"> Q {{ qi+1 }} </p>
                  </v-flex>
                  <v-flex xs8>
                    <div class="w-100 d-inline-flex">
                      <p class="pa-0 mb-0"> {{ q.msg[0].text }} </p>
                    </div>
                    <div class="w-100 grey--text">
                      Qusetion type : <v-icon> {{questionIcon(q.type)}} </v-icon> {{q.type}}
                    </div>
                  </v-flex>
                  <v-flex xs3 class="pr-3 text-right">
                    <v-btn color="adhoc"
                      style="border-radius:5px"
                      @click="switchQuestion(q.interaction_id, q.msg[0].text, qi, q.type)"
                      small class="ml-0 elevation-0 text-none white--text pl-0 text-capitalize"
                      >
                      <v-icon small class="ml-2">fas fa-chart-bar</v-icon>
                        &nbsp; &nbsp; View analysis
                    </v-btn>
                  </v-flex>
                <!--</v-layout>
              </v-card>-->
            </div>
          </div>
        </div>

      </v-flex>
    </div>

    <v-dialog v-model="config.questionAnalysis">
      <questionAnalysis ref="questionAnalysis" containerId="6"> </questionAnalysis>
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
// import { VTooltip } from 'vuetify';
import { ContentLoader } from 'vue-content-loader';
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';
import questionAnalysis from './QuestionAnalysis';

// am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_kelly);
export default {
  name: 'overview',
  components: {
    // VTooltip,
    ContentLoader,
    questionAnalysis
  },
  data () {
    return {
      stats: false,
      questions: [],
      config: {
        questionAnalysis: false,
        initialLoading: true,
        loading: false,
        initialLoadingFilters: true
      }
    };
  },
  props: ['filters'],
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
      } else if (type === 'multipleChoice') {
        icon = 'fas fa-list-ol';
      }
      return icon;
    },
    getQuestionsReport (id, text, index, type) {
      //   id = '96dc7e80-78f8-433b-8ea3-d3b1b4bd84e5';
      const params = {
        stage_id: this.$route.params.stageId,
        responses_count: true,
        fields: 'id,questions,type,driver,sub_driver,response_count,response_breakup,response_wordcloud_analysis,interaction_responses,responses_sentiment_analysis',
        // fields: 'response_breakup,response_wordcloud_analysis,responses_sentiment_analysis,question_details'
        interaction_responses_fields: 'formatted_response,response_sentiment,user_name,user_email,user_department,user_location,interaction_sub_driver,interaction_driver,user_profile_id',
        user_responses_fields: 'formatted_response,response_sentiment,user_name,user_email,user_department,user_location,interaction_sub_driver,interaction_driver'
      };
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}dashboard/${id}/question_wise_report`, { params }).then((response) => {
        this.config.initialLoading = false;
        // console.log(response);
        if (response && response.data) {
          const reportData = response.data;
          // Question wise report
          this.$refs.questionAnalysis.selectedQuestion = reportData;
          if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
            this.$refs.questionAnalysis.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
          }
          if (reportData.type === 'scale' || reportData.type === 'closeEnded' || reportData.type === 'multipleChoice') {
            const temp = [];
            const resp = JSON.parse(JSON.stringify(reportData.response_breakup));
            let total = 0;
            this.$lodash.each(resp, (res, ri) => {
              total += res.count;
            });
            this.$lodash.each(resp, (res, ri) => {
              temp.push(res);
              temp[temp.length - 1].percent = ((res.count / total) * 100).toFixed(1);
            });
            this.$refs.questionAnalysis.report = temp;
            this.$refs.questionAnalysis.sentimentTab = false;
            this.$refs.questionAnalysis.analysisTab = true;
            this.$refs.questionAnalysis.analysisEnabled = true;
            this.$refs.questionAnalysis.tabs.active = 'tab-analysis';
            // this.$refs.questionAnalysis.tabs.list[1].enabled = false;
            if (reportData.type === 'scale') {
              this.$refs.questionAnalysis.generateDonut(temp, 'scale');
            } else if (reportData.type === 'closeEnded') {
              this.$refs.questionAnalysis.generateDonut(temp, 'closeEnded');
            } else if (reportData.type === 'multipleChoice') {
              this.$refs.questionAnalysis.generateDonut(temp, 'multipleChoice');
            }

            // Inject wordcloud and response data at same time without extra API call
            this.$refs.questionAnalysis.totalResponses = Object.keys(reportData.response_wordcloud).length;
            this.$refs.questionAnalysis.wordCloudData = reportData.response_wordcloud;
            this.$refs.questionAnalysis.responseAnalysis = reportData.responses_sentiment_analysis;
            if (reportData.interaction_responses) {
              this.$refs.questionAnalysis.responseData = reportData.interaction_responses.response_dict;
              this.$refs.questionAnalysis.matchingResponses = reportData.interaction_responses.responses_count;
            }
          } else {
            this.$refs.questionAnalysis.sentimentTab = true;
            this.$refs.questionAnalysis.analysisTab = false;
            this.$refs.questionAnalysis.analysisEnabled = false;
            this.$refs.questionAnalysis.tabs.active = 'tab-sentiment-analysis';
            this.$refs.questionAnalysis.tabs.list[0].enabled = false;
            this.$refs.questionAnalysis.report = { question_analysis: {} };

            // this.$refs.questionAnalysis.filterData = queryParams;

            this.$refs.questionAnalysis.totalResponses = Object.keys(reportData.response_wordcloud).length;
            this.$refs.questionAnalysis.wordCloudData = reportData.response_wordcloud;
            this.$refs.questionAnalysis.responseAnalysis = reportData.responses_sentiment_analysis;
            if (reportData.interaction_responses) {
              this.$refs.questionAnalysis.responseData = reportData.interaction_responses.response_dict;
              this.$refs.questionAnalysis.matchingResponses = reportData.interaction_responses.responses_count;
            }

            this.$refs.questionAnalysis.generateWordCloud();
            // this.$refs.questionAnalysis.getResponses();
          }
          this.$refs.questionAnalysis.dialogs.questionAnalysis = true;
          this.$refs.questionAnalysis.sentimentFilters = {};
          this.$refs.questionAnalysis.selectedQuestionID = id;
          this.$refs.questionAnalysis.question = text;
          this.$refs.questionAnalysis.questionType = type;
          this.$refs.questionAnalysis.dialogs.questionAnalysis = true;
          this.config.questionAnalysis = true;
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
    generateAbsoluteMood (data) {
      // const that = this;
      this.$lodash.each(data, (v, k) => {
        if (v) {
          this.stats.total += v;
        }
      });
      /* eslint-disable quote-props */
      /* eslint-disable quotes */
      /* eslint-disable no-param-reassign */
      window.AmCharts.makeChart("moodAbsolute", {
        "type": "serial",
        "theme": "light",
        "rotate": true,
        "listeners": [{
          "event": "clickGraphItem",
          "method": function (event) {
            // const queryParams = {};
            // that.$lodash.each(that.filters, (v, k) => {
            //   if (v.length > 0) {
            //     queryParams[`user__profile__${k}__in`] = v.join();
            //   }
            // });
            // queryParams.mood__in = event.item.dataContext.score;
            // that.openDialog(queryParams, `Employees with ${event.item.category} mood`);
          }
        }],
        showHandOnHover: true,
        "dataProvider": [{
          "name": "Great",
          "points": data[5],
          "score": 5,
          "color": "#4caf50",
          "bullet": data[5] ? this.getImgUrl('in-love') : undefined
        }, {
          "name": "Happy",
          "points": data[4],
          "score": 4,
          "color": "#8BC34A",
          "bullet": data[4] ? this.getImgUrl('happy') : undefined
        }, {
          "name": "Okay",
          "points": data[3],
          "score": 3,
          "color": "#ff9800",
          "bullet": data[3] ? this.getImgUrl('shocked') : undefined
        }, {
          "name": "Sad",
          "points": data[2],
          "score": 2,
          "color": "#FF5722",
          "bullet": data[2] ? this.getImgUrl('sad') : undefined
        }, {
          "name": "Terrible",
          "points": data[1],
          "score": 1,
          "color": "#f44336",
          "bullet": data[1] ? this.getImgUrl('crying') : undefined
        }],
        "valueAxes": [{
          "axisAlpha": 0,
          "dashLength": 10,
          "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
          "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
          "bulletOffset": 10,
          "bulletSize": 30,
          "labelText": "[[value]]",
          "labelPosition": "left",
          "colorField": "color",
          "fixedColumnWidth": 20,
          "customBulletField": "bullet",
          "fillAlphas": 0.8,
          "lineAlpha": 0,
          "type": "column",
          "valueField": "points"
        }],
        "marginTop": 0,
        "marginRight": 0,
        "marginLeft": 50,
        "marginBottom": 0,
        "autoMargins": false,
        "categoryField": "name",
        "categoryAxis": {
          "gridPosition": "start",
          "gridAlpha": 0,
          "position": "left",
          "tickLength": 0
        },
        "export": {
          "enabled": true
        }
      });
    }
  },
  created () {
    // this.$refs.Overview.generateAbsoluteMood(reportData.company_mood_stats);
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
