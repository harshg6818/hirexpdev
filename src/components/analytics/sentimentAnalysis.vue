<template>
    <v-card>
      <v-card-text class="pt-0">
        <div v-if="dialogs.sentimentAnalysis">
          <v-flex xs10>
            <h2 class="mt-3"> Question : {{question}} </h2>
          </v-flex>
          <v-flex xs2 text-xs-right>
            <v-btn flat icon color="primary" @click.stop="closeModal()">
              <v-icon color="grey">fas fa-times</v-icon>
            </v-btn>
          </v-flex>
        </div>
        <v-tabs
          ref="tabs"
          :class="($route.name === 'ViewLifecycle') && analysisEnabled ? 'custom-dashboard-tabs' : 'dashboard-tabs'"
          grow
          v-model="tabs.active"
          centered
          color="transparent"
          slider-color="primary"
        >
          <v-tab
            v-show="($route.name === 'ViewLifecycle') && analysisEnabled"
            class="mr-2"
            v-for="(t, ti) in tabs.list"
            v-if="t.enabled"
            :key="ti"
            :href="`#tab-${t.value}`"
            @click="addRef(t.value)"
          >
            <span v-if="ti === 0"> </span>
            {{t.title}}
            <!-- <span v-if="t.value !== 'analysis' || selectedQuestion.type !== 'text'"> {{t.title}} </span>-->
          </v-tab>

          <v-tabs-items v-model="tabs.active" class="background-custom-grey" :class="{
            'b-top': $route.name === 'ViewLifecycle',
            }">

            <v-tab-item value="tab-analysis" v-show="analysisTab && ($route.name === 'ViewLifecycle') && analysisEnabled">
              <!-- Response Breakup (Scale / Close Ended Questions) -->
              <div class="d-flex" v-if="dialogs.sentimentAnalysis && selectedQuestion && report">
                <!-- Scale Type -->
                <div class="flex-row flex-wrap" v-if="questionType === 'scale'">
                  <!-- Bar graph chart for Scale  -->
                  <div class="w-100" style="border-bottom: 1px solid rgb(243, 241, 241)!important;">
                    <div id="donutChartdiv-scale" class="donutchartdiv" v-if="report.length > 0 && tabs.active === 'tab-analysis'"></div>
                    <v-card class="pa-4 no-data elevation-0" v-else>
                      <div class="flex-row flex-wrap align-center justify-center fill-height">
                        <v-flex class="text-center">
                          <strong class="display-1 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                      </div>
                    </v-card>
                  </div>

                  <!-- Tabular report for scale  -->
                  <div class="w-100" v-if="report.length > 0">
                    <v-data-table
                      :headers="table.headers"
                      class="w-100 d-flex"
                      :items="report"
                      hide-default-footer>
                        <template slot="items" slot-scope="props">
                        <tr v-if="props.item">
                          <td>
                          {{props.item.response_text}}
                          </td>

                          <td class="text-left">
                          {{props.item.count}}
                          </td>

                          <td class="text-left">
                          {{props.item.percent}} %
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </div>
                </div>

                <!-- Yes / No (close ended) Response -->
                <div class="flex-row flex-wrap" v-if="questionType === 'closeEnded'">
                  <!-- Donut chart for Yes/ No  -->
                  <div class="w-100" style="border-bottom: 1px solid rgb(243, 241, 241)!important;">
                    <div id="donutChartdiv-closeEnded" class="donutchartdiv" v-if="report.length > 0"></div>
                    <v-card class="pa-4 no-data elevation-0" v-else>
                      <div class="flex-row flex-wrap align-center justify-center fill-height">
                        <v-flex class="text-center">
                          <strong class="display-1 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                      </div>
                    </v-card>
                  </div>

                  <!-- Tabular report for Yes/ No  -->
                  <div class="w-100" v-if="report.length > 0">
                    <v-data-table
                      class="w-100 d-flex"
                      :headers="table.headers"
                      :items="report"
                      hide-default-footer>
                        <template slot="items" slot-scope="props">
                        <tr v-if="props.item">
                          <td>
                          {{props.item.response_text}}
                          </td>

                          <td class="text-left">
                          {{props.item.count}}
                          </td>

                          <td class="text-left">
                          {{props.item.percent}} %
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </div>
                </div>
              </div>
            </v-tab-item>

            <v-tab-item value="tab-sentiment-analysis" v-show="sentimentTab">
              <!-- Sentiment Analysis -->
              <div class="my-1 d-flex flex-row flex-wrap" v-if="selectedQuestion && report">
              <!-- <v-layout row wrap class="my-1" v-if="selectedQuestion"> -->
                <v-flex xs12>
                  <div class="d-flex flex-row flex-wrap" v-show="report && wordCloudData && typeof wordCloudData === 'object' && Object.keys(wordCloudData).length > 0">
                    <v-flex xs8>
                      <div :id="`wordCloudContainer_${containerId}`" class="wordCloud mt-0" />
                    </v-flex>

                    <v-flex xs4 class="wordcloud-frequency-table v-data-table bg-white">
                      <h2 class="text-center mb-2 title"> Frequency Table </h2>
                      <table class="frequency-table v-datatable v-table w-100 px-2">
                        <tbody>
                          <tr v-if="tag" @click="updateSearchQuery(tag)" v-for="(frequency, tag) in wordCloudData" :key="tag">
                              <td class="text-capitalize">{{tag}}</td>
                              <td>{{frequency}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- <v-card class="pa-3 wordcloud-frequency-table">
                        <h2 class="text-center mb-2"> Frequency Table </h2>
                        <div class="wordcloud-tag" v-for="(frequency, tag) in wordCloudData">
                          <v-layout row wrap>
                            <v-flex xs8>
                              <h4 @click="updateSearchQuery(tag)">
                                {{ tag }}
                              </h4>
                            </v-flex>
                            <v-flex xs1> : </v-flex>
                            <v-flex xs2>
                              <h4 class="grey--text"> {{ frequency }} </h4>
                            </v-flex>
                            <v-spacer> </v-spacer>
                          </v-layout>
                        </div>
                      </v-card> -->
                    </v-flex>
                  </div>

                  <!-- Exception message from API in case of no wordcloud responses -->
                  <v-card class="my-2" v-if="report" v-show="wordCloudData && typeof wordCloudData === 'string'">
                    <div class="d-flex flex-row flex-wrap align-center justify-center fill-height" style="height:200px" >
                      <v-flex class="py-5 text-center">
                        <strong class="display-1 font-weight-bold grey--text">
                          {{wordCloudData}}
                        </strong>
                      </v-flex>
                    </div>
                  </v-card>

                  <!-- Exception message in case of no wordcloud analysis -->
                  <v-card class="my-2" v-if="!report || !wordCloudData || Object.keys(wordCloudData).length === 0">
                    <div class="d-flex flex-row flex-wrap align-center justify-center fill-height" style="height:300px" >
                      <v-flex class="py-5 text-center">
                        <strong class="display-1 font-weight-bold grey--text">
                          Not enough data to generate analysis
                        </strong>
                      </v-flex>
                    </div>
                  </v-card>

                  <!-- Sentiment Category Tabs (Positive, Neutral, and Negative) -->
                  <div class="d-flex flex-row flex-wrap d-flex" v-if="totalResponses" style="background:white;">
                    <!-- <v-flex xs6>
                      <v-tabs
                        v-model="config.activeTab"
                        class="mt-4 mb-0 pt-2"
                        style="border-top:1px solid rgb(243, 241, 241);"
                      >
                        <v-tab
                          style="border-bottom:2px solid primary"
                          v-for="(t, ti) in config.tabs"
                          :key="ti"
                          color="transparent"
                          hide-slider
                          slider-color="accent"
                        >  -->
                          <!-- {{t.title}} ( {{matchingResponses}} ) -->
                          <!-- {{t.title}}
                        </v-tab>
                      </v-tabs>
                    </v-flex> -->
                    <v-spacer> </v-spacer>
                    <v-flex xs4 class="pr-2 text-right">
                      <v-combobox multiple
                        v-model="queries"
                        style="top:15px;position:relative"
                        label="Search"
                        append-icon
                        chips
                        deletable-chips
                        class="tag-input template-custom-field"
                        @keyup.tab="updateTags"
                        @paste="updateTags"
                        flat single-line>
                      </v-combobox>
                    </v-flex>
                  </div>
                  <div class="sentimentAnalysis d-flex flex-row">
                    <v-tabs
                      v-if="totalResponses"
                      centered
                      v-model="config.activeMoodTab"
                      height="100%"
                      class="mt-0 mb-2 py-2 custom-mood-tabs sentimentAnalysis"
                      style="border-top:1px solid rgb(243, 241, 241);border-bottom:1px solid rgb(243, 241, 241);height:150px; width:100%;"
                    >
                      <v-tab
                        v-for="(t, ti) in config.moodTabs"
                        :key="ti"
                        :href="`#tab-${t.value}`"
                        @click="addMoodRef(t.value)"
                        color="transparent"
                        hide-slider
                        style="max-width: 400px;width: 25%; height:100% !important;"
                        slider-color="accent"
                      >
                        <h4 style="" class="tab-heading py-2" v-if="t.name === 'negative'">
                          <img :src="getImgUrl('negative')"
                          class="emoji-container mb-2"
                          style="height:50px;width:50px" /> <br/>
                          Negative <span v-if="responseAnalysis && responseAnalysis.negative_sentiment_count >= 0"> ( {{responseAnalysis.negative_sentiment_count}} ) </span>
                        </h4>
                        <h4 style="" class="tab-heading py-2" v-if="t.name === 'neutral'">
                          <img :src="getImgUrl('neutral')"
                          class="emoji-container mb-2"
                          style="height:50px;width:50px" /> <br/>
                          Neutral <span v-if="responseAnalysis && responseAnalysis.neutral_sentiment_count >= 0"> ( {{responseAnalysis.neutral_sentiment_count}} ) </span>
                        </h4>
                        <h4 style="" class="tab-heading py-2" v-if="t.name === 'positive'">
                          <img :src="getImgUrl('positive')"
                          class="emoji-container mb-2"
                          style="height:50px;width:50px" /> <br/>
                          Positive <span v-if="responseAnalysis && responseAnalysis.positive_sentiment_count >= 0"> ( {{responseAnalysis.positive_sentiment_count}} ) </span>
                        </h4>
                        <!--<h1 class="tab-subheading" v-if="stages_count[t.value]"> {{stages_count[t.value]}} </h1>
                        <h1 class="tab-subheading" v-else> 0 </h1>-->
                      </v-tab>

                      <v-tabs-items v-model="config.activeMoodTab"
                        v-show="config.activeMoodTab !== '' && (config.activeMoodTab === 'negative'
                        || config.activeMoodTab === 'neutral'
                        || config.activeMoodTab === 'positive')"
                        class="background-custom-grey" :class="{
                        'b-top': config.activeMoodTab !== '',
                        }">

                        <!-- Negative Responses -->
                        <v-tab-item value="tab-negative" v-show="config.activeMoodTab === 'negative'">
                          <!-- Response List -->
                          <div class="response-list">
                            <div :id="`response-${i}`" v-for="(t, i) in responseData" class="mb-0 px-3 flex-row flex-wrap" :key="i">
                              <div class="active-response w-100" style="border-bottom: 1px solid lightgrey;padding: 7px;">
                                <div class="d-flex flex-row flex-wrap">
                                    <!-- <v-checkbox> </v-checkbox> -->
                                    <!--<text-highlight :queries="queries">
                                      <p class="w-100 mb-0"> {{t.answer}} </p>
                                    </text-highlight>-->
                                    <v-flex xs10>
                                      <text-highlight :queries="queries">{{ t.formatted_response }}</text-highlight>
                                    </v-flex>

                                    <v-flex xs2>
                                      <p class="grey--text text-xs-right mb-0 cursor-pointer hover-link"
                                      style="padding-right:27px" @click="viewEmployee(t)">
                                        - {{t.user_name}}
                                      </p>
                                    </v-flex>
                                </div>
                                <!-- <div class="d-inline-flex w-100">
                                  <p class="grey--text text-left mb-0 ">
                                    <span v-if="t.user_department"> Department: {{t.user_department}} &nbsp; </span>
                                    <span v-if="t.user_location"> Location: {{t.user_location}} </span>
                                  </p>
                                  <p class="grey--text text-xs-right mb-0 cursor-pointer hover-link"
                                  style="padding-right:27px" @click="viewEmployee(t)">
                                    - {{t.user_name}}
                                  </p>
                                </div> -->
                                <div class="d-flex w-100">
                                  <p class="grey--text text-left mb-0 ">
                                    <span v-if="t.interaction_driver"> Driver: {{ t.interaction_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} &nbsp; </span>
                                    <span v-if="t.interaction_sub_driver"> Sub Driver: {{ t.interaction_sub_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
                              <span slot='no-more'>{{' '}}</span>
                              <span slot='no-results'>{{' '}}</span>
                            </infinite-loading>
                          </div>
                        </v-tab-item>

                        <!-- Neutral Responses -->
                        <v-tab-item value="tab-neutral" v-show="config.activeMoodTab === 'neutral'">
                          <!-- Response List -->
                          <div class="response-list">
                            <div :id="`response-${i}`" v-for="(t, i) in responseData" class="d-flex flex-row flex-wrap mb-0 px-3" :key="i">
                              <div class="active-response w-100" style="border-bottom: 1px solid lightgrey;padding: 7px;">
                                <div class="d-inline-flex flex-row flex-wrap">
                                    <!-- <v-checkbox> </v-checkbox> -->
                                    <!--<text-highlight :queries="queries">
                                      <p class="w-100 mb-0"> {{t.answer}} </p>
                                    </text-highlight>-->
                                    <v-flex xs10>
                                      <text-highlight :queries="queries">{{ t.formatted_response }}</text-highlight>
                                    </v-flex>

                                    <v-flex xs2>
                                      <p class="grey--text text-xs-right mb-0 cursor-pointer hover-link"
                                      style="padding-right:27px" @click="viewEmployee(t)">
                                        - {{t.user_name}}
                                      </p>
                                    </v-flex>
                                </div>
                                <!-- <div class="d-inline-flex w-100">
                                  <p class="grey--text text-left mb-0 ">
                                    <span v-if="t.user_department"> Department: {{t.user_department}} &nbsp; </span>
                                    <span v-if="t.user_location"> Location: {{t.user_location}} </span>
                                  </p>
                                  <p class="grey--text text-xs-right mb-0 cursor-pointer hover-link"
                                  style="padding-right:27px" @click="viewEmployee(t)">
                                    - {{t.user_name}}
                                  </p>
                                </div>-->
                              </div>
                              <div class="d-flex w-100">
                                <p class="grey--text text-left mb-0 ">
                                  <span v-if="t.interaction_driver"> Driver: {{ t.interaction_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} &nbsp; </span>
                                  <span v-if="t.interaction_sub_driver"> Sub Driver: {{ t.interaction_sub_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} </span>
                                </p>
                              </div>
                            </div>
                            <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
                              <span slot='no-more'>{{' '}}</span>
                              <span slot='no-results'>{{' '}}</span>
                            </infinite-loading>
                          </div>
                        </v-tab-item>

                        <!-- Positive Responses -->
                        <v-tab-item value="tab-positive" v-show="config.activeMoodTab === 'positive'">
                          <!-- Response List -->
                          <div class="response-list">
                            <div :id="`response-${i}`" v-for="(t, i) in responseData" class="d-flex flex-row flex-wrap mb-0 px-3" :key="i">
                              <div class="active-response w-100" style="border-bottom: 1px solid lightgrey;padding: 7px;">
                                <div class="d-flex flex-row flex-wrap">
                                    <!-- <v-checkbox> </v-checkbox> -->
                                    <!--<text-highlight :queries="queries">
                                      <p class="w-100 mb-0"> {{t.answer}} </p>
                                    </text-highlight>-->
                                    <v-flex xs10>
                                      <text-highlight :queries="queries">{{ t.formatted_response }}</text-highlight>
                                    </v-flex>
                                    <v-flex xs2>
                                      <p class="grey--text text-xs-right mb-0 cursor-pointer hover-link"
                                      style="padding-right:27px" @click="viewEmployee(t)">
                                        - {{t.user_name}}
                                      </p>
                                    </v-flex>
                                </div>
                                <!-- <div class="d-inline-flex w-100">
                                  <p class="grey--text text-left mb-0 ">
                                    <span v-if="t.user_department"> Department: {{t.user_department}} &nbsp; </span>
                                    <span v-if="t.user_location"> Location: {{t.user_location}} </span>
                                  </p>
                                  <p class="grey--text text-xs-right mb-0 cursor-pointer hover-link"
                                  style="padding-right:27px" @click="viewEmployee(t)">
                                    - {{t.user_name}}
                                  </p>
                                </div> -->
                              </div>
                              <div class="d-inline-flex w-100">
                                <p class="grey--text text-left mb-0 ">
                                  <span v-if="t.interaction_driver"> Driver: {{ t.interaction_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} &nbsp; </span>
                                  <span v-if="t.interaction_sub_driver"> Sub Driver: {{ t.interaction_sub_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} </span>
                                </p>
                              </div>
                            </div>
                            <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
                              <span slot='no-more'>{{' '}}</span>
                              <span slot='no-results'>{{' '}}</span>
                            </infinite-loading>
                          </div>
                        </v-tab-item>
                      </v-tabs-items>
                    </v-tabs>
                  </div>

                  <!-- All Responses -->
                  <div v-if="totalResponses && (!config.activeMoodTab ||
                  (config.activeMoodTab !== 'positive' && config.activeMoodTab !== 'negative' &&
                  config.activeMoodTab !== 'neutral'))">
                    <div class="response-list">
                      <div :id="`response-${i}`" v-for="(t, i) in responseData" row wrap class="mb-0 px-3 d-flex flex-row flex-wrap" :key="i"
                      >
                        <div class="active-response w-100" style="border-bottom: 1px solid lightgrey;padding: 7px;">
                          <div class="d-flex flex-row flex-wrap">
                              <!-- <v-checkbox> </v-checkbox> -->
                              <!--<text-highlight :queries="queries">
                                <p class="w-100 mb-0"> {{t.answer}} </p>
                              </text-highlight>-->
                              <v-flex xs10>
                                <text-highlight :queries="queries">{{ t.formatted_response }}</text-highlight>
                              </v-flex>
                              <v-flex xs2>
                                <p class="grey--text text-xs-right mb-0 cursor-pointer hover-link"
                                style="padding-right:27px" @click="viewEmployee(t)">
                                  - {{t.user_name}}
                                </p>
                              </v-flex>
                          </div>
                          <!-- <div class="d-inline-flex w-100">
                            <p class="grey--text text-left mb-0 ">
                              <span v-if="t.user_department"> Department: {{t.user_department}} &nbsp; </span>
                              <span v-if="t.user_location"> Location: {{t.user_location}} </span>
                            </p>
                            <p class="grey--text text-xs-right mb-0 cursor-pointer hover-link"
                            style="padding-right:27px" @click="viewEmployee(t)">
                              - {{t.user_name}}
                            </p>
                          </div> -->
                          <div class="d-inline-flex w-100">
                            <p class="grey--text text-left mb-0 ">
                              <span v-if="t.interaction_driver"> Driver: {{ t.interaction_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} &nbsp; </span>
                              <span v-if="t.interaction_sub_driver"> Sub Driver: {{ t.interaction_sub_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
                        <span slot='no-more'>{{' '}}</span>
                        <span slot='no-results'>{{' '}}</span>
                      </infinite-loading>
                    </div>
                  </div>

                  <v-card v-if="!report || !totalResponses || !responseData">
                    <div class="d-flex flex-row flex-wrap align-center justify-center fill-height" style="height:500px">
                      <v-flex class="py-5 text-center">
                        <strong class="display-1 font-weight-bold grey--text">
                          Not enough data to generate analysis
                        </strong>
                      </v-flex>
                    </div>
                  </v-card>

                </v-flex>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>

      <v-card-actions class="mt-3" v-if="dialogs.sentimentAnalysis" align-content-space->
        <v-flex xs2 class="ml-2">
          <v-btn color="error" flat @click.stop="closeModal()">Close</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
</template>

<script>
/* eslint-disable max-len */
import { mapState } from 'vuex';
import axios from 'axios';
import Vue from 'vue';
import TextHighlight from 'vue-text-highlight';
import InfiniteLoading from 'vue-infinite-loading';
import '../../assets/icons/materialCss.scss';
import Anychart from 'anychart';
// import VueAnychart from '../analytics/VueAnychart.vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// import {
//   VTooltip,
//   VCheckbox,
//   VCombobox,
// } from 'vuetify';
dayjs.extend(relativeTime);

Vue.component('text-highlight', TextHighlight);

export default {
  name: 'sentimentAnalysis',
  components: {
    // VTooltip,
    // VCheckbox,
    // VCombobox,
    InfiniteLoading
    // VueAnychart
    // dayjs,
  },
  data () {
    return {
      stats: false,
      filters: {},
      employeeFilters: {},
      filterData: {},
      sentimentFilters: {},
      loadingReport: false,
      analysisTab: false,
      sentimentTab: true,
      selectedQuestion: {},
      selectedQuestionID: null,
      queries: [],
      search: '',
      report: [],
      dialogs: {
        sentimentAnalysis: false
      },
      dateRangeOptions: {},
      analysisEnabled: false,
      wordCloudData: null,
      totalResponses: null,
      matchingResponses: null,
      responseData: [],
      responseAnalysis: {},
      question: null,
      questionType: null,
      config: {
        page_offset: 1,
        activeTab: 0,
        tabs: [{
          title: 'Responses',
          value: 'response'
        }],
        activeMoodTab: '',
        moodTabs: [{
          name: 'negative',
          value: 'negative'
        }, {
          name: 'neutral',
          value: 'neutral'
        }, {
          name: 'positive',
          value: 'positive'
        }]
      },
      tabs: {
        active: 'tab-sentiment-analysis',
        list: [
          {
            title: 'Response Analysis',
            value: 'analysis',
            enabled: true
          }, {
            title: 'Sentiment Analysis',
            value: 'sentiment-analysis',
            about: '',
            count: 0,
            enabled: true
          }
        ]
      },
      table: {
        headers: [{
          text: 'Choice',
          align: 'left',
          sortable: false
        }, {
          text: 'Response Count',
          align: 'left',
          sortable: false
        }, {
          text: 'Response %',
          align: 'left',
          sortable: false
        }]
      }
    };
  },
  props: ['containerId'],
  // props: ['filters'],
  computed: {
    ...mapState({
      user: state => state.user,
      dashboardFilters: state => state.dashboardFilters
    })
  },
  methods: {
    addRef (val) {
      // this.$router.push({ query: {activeTab: val}});
      switch (val) {
        case 'sentiment-analysis':
          setTimeout(() => {
            this.analysisTab = false;
            this.sentimentTab = true;
            // this.report = { question_analysis : {} };
            // this.dialogs.sentimentAnalysis = true;
            this.generateWordCloud();
            // this.getResponses();
          }, 100);
          break;
        case 'analysis':
          this.generateDonut(this.report, this.selectedQuestion.type);
          // this.getEmployeesToMeet();
        // eslint-disable-next-line no-fallthrough
        default:
      }
    },
    addMoodRef (val) {
      this.sentimentFilters = {};
      switch (val) {
        case 'negative':
          // if ((this.$route.query && this.$route.query.activeTab === 'need-to-meet')) {
          if ((this.$route.query && this.$route.query.tab === 'disengaged-sentiment-analysis')) {
            this.sentimentFilters = {
              user_response_sentiment_range: '0,0.4'
            };
          // eslint-disable-next-line brace-style
          }
          // else if ((this.$route.query && this.$route.query.activeTab === 'open-ended' && this.selectedQuestionID) || this.selectedQuestionID) {
          else if ((this.$route.query && this.$route.query.tab === 'txt-analysis' && this.selectedQuestionID) || this.selectedQuestionID) {
            this.sentimentFilters = {
              interaction_response_sentiment_range: '0,0.4'
            };
          } else if (this.$route.name !== 'ViewLifecycle') {
            this.sentimentFilters = {
              vibe_response_sentiment_range: '0,0.4'
            };
          }
          break;
        case 'positive':
          // if ((this.$route.query && this.$route.query.activeTab === 'need-to-meet')) {
          if ((this.$route.query && this.$route.query.tab === 'disengaged-sentiment-analysis')) {
            this.sentimentFilters = {
              user_response_sentiment_range: '0.6,1.0'
            };
          // eslint-disable-next-line brace-style
          }
          // else if ((this.$route.query && this.$route.query.activeTab === 'open-ended' && this.selectedQuestionID) || this.selectedQuestionID) {
          else if ((this.$route.query && this.$route.query.tab === 'txt-analysis' && this.selectedQuestionID) || this.selectedQuestionID) {
            this.sentimentFilters = {
              interaction_response_sentiment_range: '0.6,1.0'
            };
          } else if (this.$route.name !== 'ViewLifecycle') {
            this.sentimentFilters = {
              vibe_response_sentiment_range: '0.6,1.0'
            };
          }
          break;
        case 'neutral':
          // if ((this.$route.query && this.$route.query.activeTab === 'need-to-meet')) {
          if ((this.$route.query && this.$route.query.tab === 'disengaged-sentiment-analysis')) {
            this.sentimentFilters = {
              user_response_sentiment_range: '0.5,0.5'
            };
          // eslint-disable-next-line brace-style
          }
          // else if ((this.$route.query && this.$route.query.activeTab === 'open-ended' && this.selectedQuestionID) || this.selectedQuestionID) {
          else if ((this.$route.query && this.$route.query.tab === 'txt-analysis' && this.selectedQuestionID) || this.selectedQuestionID) {
            this.sentimentFilters = {
              interaction_response_sentiment_range: '0.5,0.5'
            };
          } else if (this.$route.name !== 'ViewLifecycle') {
            this.sentimentFilters = {
              vibe_response_sentiment_range: '0.5,0.5'
            };
          }
          break;
      }
      this.responseData = [];
      this.config.page_offset = 1;
      this.getResponses();
    },
    infiniteHandler ($state) {
      setTimeout(() => {
        this.getResponses($state);
        this.config.page_offset += 1;
      }, 100);
    },
    generateDonut (data, driver) {
      setTimeout(() => {
        // const that = this;
        const chartName = `donutChartdiv-${driver}`;
        if (document.getElementById(chartName)) {
          document.getElementById(chartName).innerHTML = '';
        }
        const chartData = [];

        // let totalDisengagedEmployees = data.disengaged_employees;
        // let totalEmployees = 0;
        // this.$lodash.each(data.sub_driver, (driverData, sub_driver) => {
        //   totalEmployees += driverData;
        // })

        this.$lodash.each(data, response => {
          if (response.response_text) {
            chartData.push({
              // name: sub_driver,
              name: response.response_text.charAt(0).toUpperCase() + response.response_text.substr(1).toLowerCase(),
              value: response.count,
              percentage: response.percent
            });
          }
        });

        var chart = Anychart.pie(chartData);

        chart.radius('90%');
        chart.innerRadius('70%');

        chart.labels().position('outside');
        chart.labels().useHtml(true);
        chart.labels().format("<span style='font-weight: 900;'>{%name} - {%value} </span>");
        chart.labels().enabled(false);

        chart.maxHeight('90%');
        chart.minHeight('90%');

        // // set the label as the center content
        // chart.center().content(label);

        chart.tooltip().useHtml(true);
        chart.tooltip().format("<span style='font-weight: 900;'> No. of Employees : {%value}  </span>");

        chart.legend(true);
        chart.legend().position('bottom');
        chart.legend().align('center');
        // enable html for the legend
        chart.legend().useHtml(true);

        // configure the format of legend items
        chart.legend().itemsFormat("<span style='color:#455a64;font-weight:600'>{%name} : </span> {%value}");

        // enable and configure the title separator
        // let separator = chart.legend().titleSeparator()
        // separator.enabled(true);
        // separator.height(4);
        // separator.fill('none');
        // separator.stroke('#96a6a6", 2);

        // chart.legend().titleSeparator().orientation('left');

        chart.container(chartName);

        chart.draw();
        this.$forceUpdate();
      }, 100);
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    downloadReport () {

    },
    updateTags () {
      this.$nextTick(() => {
        this.queries.push(...this.search.split(','));
        this.$nextTick(() => {
          this.search = '';
        });
      });
    },
    updateSearchQuery (tag) {
      this.queries = [];
      this.queries.push(tag);
    },
    viewEmployee (s, tab) {
      if (this.$route.name !== 'ViewAdhoc') {
        this.$router.push({
          path: '/employees',
          query: {
            search: s.user_name,
            eID: s.user_profile_id,
            activeTab: tab
          }
        });
      }
    },
    getResponses ($state) {
      let queryParams = {};
      let url = '';

      // if ((this.$route.query && this.$route.query.activeTab === 'need-to-meet')) {
      if ((this.$route.query && this.$route.query.tab === 'disengaged-sentiment-analysis')) {
        queryParams = {
          fields: 'user_responses,responses_sentiment_analysis',
          responses_count: true,
          user_responses_fields: 'formatted_response,response_sentiment,user_name,user_email,user_department,user_location,interaction_sub_driver,interaction_driver,user_profile_id',
          urpl: 10,
          urpo: this.config.page_offset,
          user_responses__contains: this.search,
          stage_id: this.$route.name === 'ViewLifecycle' && this.$route.params.stageId ? this.$route.params.stageId : undefined
        };
        queryParams = {
          ...queryParams,
          ...this.filterData,
          ...this.sentimentFilters
        };
        url = `${process.env.VUE_APP_API_URL}disengaged/responses`;
      // } else if ((this.$route.query && this.$route.query.activeTab === 'open-ended' && this.selectedQuestionID) || this.selectedQuestionID) {
      } else if ((this.$route.query && this.$route.query.tab === 'txt-analysis' && this.selectedQuestionID) || this.selectedQuestionID) {
        queryParams = {
          fields: 'id,responses_sentiment_analysis,interaction_responses,response_count',
          responses_count: true,
          interaction_responses_fields: 'formatted_response,response_sentiment,user_name,user_email,user_department,user_location,interaction_sub_driver,interaction_driver,user_profile_id',
          user_responses_fields: 'formatted_response,response_sentiment,user_name,user_email,user_department,user_location,interaction_sub_driver,interaction_driver',
          irpl: 10,
          irpo: this.config.page_offset,
          interaction_responses__contains: this.search ? this.search : null
        };
        queryParams = {
          ...queryParams,
          ...this.filterData,
          ...this.sentimentFilters
        };
        url = `${process.env.VUE_APP_API_URL}interactions/${this.selectedQuestionID}/details`;
      } else if (this.$route.name !== 'ViewLifecycle') {
        queryParams = {
          fields: 'vibe_sentiment_analysis,vibe_responses',
          responses_count: true,
          vibe_responses_fields: 'formatted_response,response_sentiment,user_name,user_email,user_department,user_location,interaction_sub_driver,interaction_driver,user_profile_id',
          vrpl: 10,
          vrpo: this.config.page_offset
        };
        queryParams = {
          ...queryParams,
          ...this.sentimentFilters
        };
        url = `${process.env.VUE_APP_API_URL}driver/vibe`;
      }

      if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
        this.filters.selected = this.dashboardFilters.filters;
        this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
      }
      const temp = {
        initiated_date_start: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          temp[`user__profile__${k}__in`] = v.join();
        }
      });
      queryParams = {
        ...queryParams,
        ...temp,
        ...this.employeeFilters
      };
      // if ((this.$route.name !== 'ViewLifecycle' && (!this.responseData.length || this.responseData.length === 0 || this.responseData.length < this.matchingResponses)) ||
      // (this.$route.name === 'ViewLifecycle' && this.sentimentFilters && Object.keys(this.sentimentFilters).length > 0 )) {
      if (!this.responseData.length || this.responseData.length === 0 || (this.responseData.length < this.matchingResponses)) {
        axios.get(url, {
          params: queryParams
        }).then((response) => {
          if (response && response.data) {
            // if ((this.$route.query && this.$route.query.activeTab === 'need-to-meet')) {
            if ((this.$route.query && this.$route.query.tab === 'disengaged-sentiment-analysis')) {
              if (response.data.user_responses) {
                this.responseData = this.responseData.concat(response.data.user_responses.response_dict);
                this.matchingResponses = response.data.user_responses.responses_count;
              }
            // } else if ((this.$route.query && this.$route.query.activeTab === 'open-ended') || this.selectedQuestionID) {
            } else if ((this.$route.query && this.$route.query.tab === 'txt-analysis' && this.selectedQuestionID) || this.selectedQuestionID) {
              this.totalResponses = response.data.response_count;
              if (response.data.interaction_responses) {
                this.responseData = this.responseData.concat(response.data.interaction_responses.response_dict);
                this.matchingResponses = response.data.interaction_responses.responses_count;
              }
            } else {
              if (response.data.interaction_responses) {
                this.responseData = this.responseData.concat(response.data.interaction_responses.response_dict);
                this.matchingResponses = response.data.interaction_responses.responses_count;
                // if (!response.data.response_count) {
                //   this.matchingResponses = 0;
                //   this.$lodash.each(response.data.responses_sentiment_analysis, (v, k) => {
                //     this.matchingResponses += v;
                //   });
                // }
              }
            }

            this.responseAnalysis = response.data.responses_sentiment_analysis;

            if ($state) {
              if (this.responseData.length < this.matchingResponses) {
                $state.loaded();
              } else {
                $state.complete();
              }
            } else {
              if (this.responseData.length < this.matchingResponses) {
                // setTimeout(() => {
                this.config.page_offset += 1;
                this.getResponses();
                // }, 100);
              } else {
              }
            }
          }
        }, (response) => {
          this.config.initialLoading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to fetch responses, Please try again later!'
          });
          throw new Error(response);
        });
      } else {
        this.config.initialLoading = false;
        if ($state) {
          if (this.responseData.length < this.matchingResponses) {
            $state.loaded();
          } else {
            $state.complete();
          }
        } else {
          if (this.responseData.length < this.matchingResponses) {
            // setTimeout(() => {
            this.config.page_offset += 1;
            this.getResponses();
            // }, 100);
          } else {
          }
        }
      }
    },
    searchResponses () {
      this.responseData = [];
      this.config.page_offset = 1;
      this.getResponses();
      const responseList = document.getElementsByClassName('response-list');
      this.$lodash.each(responseList, (list, li) => {
        list.scrollIntoView();
      });
      // responseList.scrollIntoView();
    },
    generateWordCloud () {
      const that = this;
      let queryParams = {};
      let url = '';
      // if ((this.$route.query && this.$route.query.activeTab === 'need-to-meet')) {
      if ((this.$route.query && this.$route.query.tab === 'disengaged-sentiment-analysis')) {
        queryParams = {
          fields: 'wordcloud_analysis,user_responses',
          responses_count: true,
          user_responses_fields: 'formatted_response,response_sentiment',
          stage_id: this.$route.name === 'ViewLifecycle' && this.$route.params.stageId ? this.$route.params.stageId : undefined
          // urpl: 10,
          // urpo: this.config.page_offset,
        };
        url = `${process.env.VUE_APP_API_URL}disengaged/responses`;
      // } else if (this.$route.query && this.$route.query.activeTab === 'open-ended' && this.selectedQuestionID) {
      } else if (this.$route.query && this.$route.query.tab === 'txt-analysis' && this.selectedQuestionID) {
        queryParams = {
          fields: 'id,response_wordcloud_analysis,response_count'
          // irpl: 10,
          // irpo: this.config.page_offset,
        };
        url = `${process.env.VUE_APP_API_URL}interactions/${this.selectedQuestionID}/details`;
      } else if (this.$route.name !== 'ViewLifecycle') {
        queryParams = {
          fields: 'vibe_wordcloud_analysis,vibe_sentiment_analysis'
          // irpl: 10,
          // irpo: this.config.page_offset,
        };
        queryParams = {
          ...queryParams,
          ...this.filterData
        };
        url = `${process.env.VUE_APP_API_URL}driver/vibe`;
      }

      if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
        this.filters.selected = this.dashboardFilters.filters;
        this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
      }
      const temp = {
        initiated_date_start: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          temp[`user__profile__${k}__in`] = v.join();
        }
      });
      queryParams = {
        ...queryParams,
        ...temp,
        ...this.employeeFilters
      };

      if (url) {
        if (document.getElementById(`wordCloudContainer_${this.containerId}`)) {
          document.getElementById(`wordCloudContainer_${this.containerId}`).innerHTML = '';
        }
        this.wordCloudData = null;
        axios.get(url, {
          params: queryParams
        }).then((response) => {
          if (response && response.data) {
            if (response.data.response_wordcloud || response.data.vibe_wordcloud) {
              this.wordCloudData = response.data.response_wordcloud || response.data.vibe_wordcloud;
              // if ((this.$route.query && this.$route.query.activeTab === 'need-to-meet')) {
              if ((this.$route.query && this.$route.query.tab === 'disengaged-sentiment-analysis')) {
                if (response.data.user_responses) {
                  this.responseData = this.responseData.concat(response.data.user_responses.response_dict);
                  this.totalResponses = response.data.user_responses.responses_count;
                }
              // } else if ((this.$route.query && this.$route.query.activeTab === 'open-ended' && this.selectedQuestionID) || this.selectedQuestionID) {
              } else if ((this.$route.query && this.$route.query.tab === 'txt-analysis' && this.selectedQuestionID) || this.selectedQuestionID) {
                this.totalResponses = response.data.response_count;
                if (response.data.interaction_responses) {
                  this.responseData = this.responseData.concat(response.data.interaction_responses.response_dict);
                }
              } else if (this.$route.name !== 'ViewLifecycle') {
                this.totalResponses = response.data.response_count;
                this.responseData = this.responseData.concat(response.data.interaction_responses.response_dict);
                if (!response.data.response_count) {
                  this.totalResponses = 0;
                  this.$lodash.each(response.data.responses_sentiment_analysis, (v, k) => {
                    this.totalResponses += v;
                  });
                }
              }
              // console.log('this.wordCloudData', this.wordCloudData, this.totalResponses, typeof this.wordCloudData,  Object.keys(this.wordCloudData).length);
              // console.log(this.wordCloudData && this.totalResponses && typeof this.wordCloudData === 'object' && Object.keys(this.wordCloudData).length > 0);
              if (this.wordCloudData && this.totalResponses && typeof this.wordCloudData === 'object' && Object.keys(this.wordCloudData).length > 0) {
                const data = [];
                this.$lodash.each(this.wordCloudData, (value, response) => {
                  data.push({ x: response, value: value });
                });

                setTimeout(() => {
                  var chart = Anychart.tagCloud(data);
                  chart.angles([0]);
                  // chart.data(data, {mode: "by-word"});
                  chart.container(`wordCloudContainer_${this.containerId}`);
                  chart.mode('spiral');
                  chart.draw();

                  chart.listen('pointClick', function (e) {
                    const tag = e.point.get('x');
                    that.queries.push(tag);
                  });
                  chart.listen('mouseOver', function (e) {
                    if (e.pointIndex) {
                      const el = document.querySelector(`table.frequency-table > tbody > tr:nth-child(${e.pointIndex + 1})`);
                      el.classList.add('white--text', 'primary');
                      if (el.offsetTop) {
                        document.querySelector('.wordcloud-frequency-table').scrollTop += el.offsetTop;
                      }
                    }
                  });
                  chart.listen('mouseOut', function (e) {
                    if (e.pointIndex) {
                      const el = document.querySelector(`table.frequency-table > tbody > tr:nth-child(${e.pointIndex + 1})`);
                      el.classList.remove('white--text', 'primary');
                    }
                  });
                }, 100);
              }
            }
          }
        }, (response) => {
          this.config.initialLoading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to create wordcloud, Please try again later!'
          });
          throw new Error(response);
        });
      } else {
        if (document.getElementById(`wordCloudContainer_${this.containerId}`)) {
          document.getElementById(`wordCloudContainer_${this.containerId}`).innerHTML = '';
        }
        if (this.wordCloudData && this.totalResponses && typeof this.wordCloudData === 'object' && Object.keys(this.wordCloudData).length > 0) {
          const data = [];
          this.$lodash.each(this.wordCloudData, (value, response) => {
            data.push({ x: response, value: value });
          });
          setTimeout(() => {
            var chart = Anychart.tagCloud(data);
            chart.angles([0]);
            chart.container(`wordCloudContainer_${this.containerId}`);
            chart.mode('spiral');

            chart.draw();

            chart.listen('pointClick', function (e) {
              const tag = e.point.get('x');
              that.queries.push(tag);
            });
          }, 100);
        }
      }
    },
    closeModal () {
      this.dialogs.sentimentAnalysis = false;
      if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent) {
        this.$parent.$parent.$parent.dialogs.sentimentAnalysis = false;
      }
    }
  },
  watch: {
    // search() {
    //   this.queries = [];
    //   this.queries.push(this.search);
    // },
    queries () {
      this.search = this.queries.join();
      this.searchResponses();
    }
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
  .accent {
    display: none;
  }
  }
  .custom-mood-tabs {
    .v-tabs__container--centered {
      text-align: center!important;
    }
  }
  .response-list {
    height: 500px!important;
    overflow-y: auto!important;
    overflow-x: hidden!important;
  }
  .wordCloud {
    height: 350px;
    width: 100%;
    margin: 0 auto;
  }

  .wordcloud-tag {
    width: 50%!important;
    display: inline-flex!important;
  }
  .wordcloud-frequency-table {
    border-left: 1px solid #e0e0e0;
    height: 350px!important;
    overflow-y: auto!important;
    .hover-row {
      background-color: red;
    }
  }

  .tag-input {
    span {
      &.v-chip {
        background-color: #1976d2;
        color: #fff;
        font-size: 12px;
      }
    }
  }

  .tag-input {
    span {
      &.v-chip {
        background-color: #1976d2;
        color: #fff;
        font-size: 12px;
        padding-left:7px;
      }
    }
  }

  .tag-input {
    span {
      &.v-chip {
        &::before {
          content: "label";
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 20px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
      }
    }
  }
  .donutchartdiv {
    height: 308px!important;
    width: 95%!important;
    margin: 8px auto 8px auto!important;
    // position:relative !important;
    // top:-35px !important;
    // top:-18px!important;
    // left: -5px!important;
  }
  .sentimentfirsttab {
    .v-tabs__item:not(.v-tabs__item--active) {
    color:rgba(76, 62, 157, 1) !important;
  }
    .v-tabs__bar {
    background-color: white !important;
    }
    .v-tabs__bar {
    width: 35% !important;
    text-align:center;
    margin: 0 auto !important;
    background-color: white !important;
    border-radius: 0px !important;

  }
  .v-tabs__item--active{
    background-color: #4c3e9d !important;
    color:white !important;
  }
  .v-tabs__slider {
    height:0 !important;
  }
  .v-tabs__div {
    height: 30px;
    border:1px solid rgba(76, 62, 157, 0.7) !important;;
    border-radius:2px !important;
  }
  // .v-tabs__item{
  //   background-color:white ;
  // }
  .v-tabs__item:hover{
    background-color:#4c3e9d ;
    color:white !important;
  }

  }
  .sentimentAnalysis {
    background: white;
  .v-tabs__item:not(.v-tabs__item--active) {
    color:rgba(76, 62, 157, 1) !important;
  }
  .v-tabs__bar {
    width: 100% !important;
    text-align:center;
    margin: 0 auto !important;
    background-color: white !important;
    border-radius: 0px !important;

  }
  .v-tabs__item--active{
    background-color: #4c3e9d !important;
    color:white !important;
  }
  .v-tabs__slider {
    height:0 !important;
  }
  .v-tabs__div {
    height: 100px !important;
    margin:0 2px;
    border:1px solid rgba(76, 62, 157, 0.7) !important;;
    border-radius:2px !important;
  }
  // .v-tabs__item{
  //   background-color:white ;
  // }
  .v-tabs__item:hover{
    background-color:#4c3e9d ;
    color:white !important;
  }
}

</style>
