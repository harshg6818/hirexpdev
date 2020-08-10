<template>
    <v-card>
      <v-card-text class="pt-0">
        <div class="d-flex" v-if="dialogs.questionAnalysis">
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
          :class="analysisEnabled ? 'custom-dashboard-tabs' : 'dashboard-tabs'"
          grow
          v-model="tabs.active"
          centered
          color="primary"
          slider-color="primary"
          height="fill-height"
        >
          <v-tab
            class="mr-2 text-none"
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

          <v-tabs-items v-model="tabs.active" class="background-custom-grey">

            <v-tab-item value="tab-analysis" v-show="analysisTab && analysisEnabled">
              <!-- Response Breakup (Scale / Close Ended Questions) -->
              <div class="d-flex" v-if="dialogs.questionAnalysis && selectedQuestion && report">
                <!-- Scale Type -->
                <div class="d-flex flex-row flex-wrap" v-if="questionType === 'scale'">
                  <!-- Bar graph chart for Scale  -->
                  <div class="w-100" style="border-bottom: 1px solid rgb(243, 241, 241)!important;">
                    <div id="donutChartdiv-scale" class="donutchartdiv" v-if="report.length > 0 && tabs.active === 'tab-analysis'"></div>
                    <v-card class="pa-4 no-data elevation-0" v-else>
                      <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
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
                      class="w-100"
                      :items="report"
                      hide-actions>
                      <template v-slot:body="{ items }">
                        <tr v-for="(item, index) in items" :key="index">
                          <td>
                          {{item.response_text}}
                          </td>

                          <td class="text-xs-left">
                          {{item.count}}
                          </td>

                          <td class="text-xs-left">
                          {{item.percent}} %
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </div>
                </div>

                <!-- multiple Type -->
                <div class="d-flex flex-row flex-wrap" v-if="questionType === 'multipleChoice'">
                  <!-- Bar graph chart for Scale  -->
                  <div class="w-100" style="border-bottom: 1px solid rgb(243, 241, 241)!important;">
                    <div id="donutChartdiv-multipleChoice" class="donutchartdiv" v-if="tabs.active === 'tab-analysis'"></div>
                    <v-card class="pa-4 no-data elevation-0" v-else>
                      <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
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
                      class="w-100"
                      :items="report"
                      hide-actions>
                        <template v-slot:body="{ items }">
                        <tr v-for="(item, index) in items" :key="index">
                          <td>
                          {{item.response_text}}
                          </td>

                          <td class="text-xs-left">
                          {{item.count}}
                          </td>

                          <td class="text-xs-left">
                          {{item.percent}} %
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </div>
                </div>

                <!-- Yes / No (close ended) Response -->
                <div class="d-flex flex-row flex-wrap" v-if="questionType === 'closeEnded'">
                  <!-- Donut chart for Yes/ No  -->
                  <div class="w-100" style="border-bottom: 1px solid rgb(243, 241, 241)!important;">
                    <div id="donutChartdiv-closeEnded" class="donutchartdiv" v-if="report.length > 0"></div>
                    <v-card class="pa-4 no-data elevation-0" v-else>
                      <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
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
                      class="w-100"
                      :headers="table.headers"
                      :items="report"
                      hide-actions>
                        <template v-slot:body="{items}" >
                        <tr v-for="(item, index) in items" :key="index">
                          <td>
                          {{item.response_text}}
                          </td>

                          <td class="text-xs-left">
                          {{item.count}}
                          </td>

                          <td class="text-xs-left">
                          {{item.percent}} %
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
              <div class="d-flex flex-row flex-wrap my-1" v-if="selectedQuestion && report">
              <!-- <v-layout row wrap class="my-1" v-if="selectedQuestion"> -->
                <v-flex xs12>
                  <div class="d-flex flex-row flex-wrap" v-show="report && wordCloudData && typeof wordCloudData === 'object' && Object.keys(wordCloudData).length > 0">
                    <v-flex xs8>
                      <div :id="`wordCloudContainer_${containerId}`" class="wordCloud mt-0" />
                    </v-flex>

                    <v-flex xs4 class="wordcloud-frequency-table v-data-table bg-white">
                      <h2 class="text-xs-center mb-2 title"> Frequency Table </h2>
                      <table class="frequency-table v-datatable v-table">
                        <tbody>
                          <tr v-if="tag" @click="updateSearchQuery(tag)" v-for="(frequency, tag) in wordCloudData" :key="tag">
                              <td class="text-capitalize">{{tag}}</td>
                              <td>{{frequency}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- <v-card class="pa-3 wordcloud-frequency-table">
                        <h2 class="text-xs-center mb-2"> Frequency Table </h2>
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
                      <v-flex text-xs-center class="py-5">
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
                  <div class="d-flex flex-row flex-wrap" v-if="totalResponses" style="background:white;">
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

                    <v-flex xs4 text-xs-right class="pr-2">
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
                  <div class="questionAnalysis d-flex">
                    <v-tabs
                      v-if="totalResponses"
                      centered
                      v-model="config.activeMoodTab"
                      class="mt-0 mb-2 py-2 custom-mood-tabs questionAnalysis"
                      style="border-top:1px solid rgb(243, 241, 241);border-bottom:1px solid rgb(243, 241, 241);height:150px; width:100%;"
                    >
                      <v-tab

                        v-for="(t, ti) in config.moodTabs"
                        :key="ti"
                        :href="`#tab-${t.value}`"
                        @click="addMoodRef(t.value)"
                        color="primary"
                        height="fill-height"
                        hide-slider
                        style="max-width: 400px;width: 25%; height:100% !important;"
                        slider-color="accent"
                      >
                        <h4 style="" class="tab-heading" v-if="t.name === 'negative'">
                          <img :src="getImgUrl('negative')"
                          class="emoji-container mb-2"
                          style="height:50px;width:50px" /> <br/>
                          Negative <span v-if="responseAnalysis && responseAnalysis.negative_sentiment_count >= 0"> ( {{responseAnalysis.negative_sentiment_count}} ) </span>
                        </h4>
                        <h4 style="" class="tab-heading" v-if="t.name === 'neutral'">
                          <img :src="getImgUrl('neutral')"
                          class="emoji-container mb-2"
                          style="height:50px;width:50px" /> <br/>
                          Neutral <span v-if="responseAnalysis && responseAnalysis.neutral_sentiment_count >= 0"> ( {{responseAnalysis.neutral_sentiment_count}} ) </span>
                        </h4>
                        <h4 style="" class="tab-heading" v-if="t.name === 'positive'">
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
                            <div :id="`response-${i}`" v-for="(t, i) in responseData" class="mb-0 px-3 d-flex flex-row flex-wrap" :key="i">
                              <div class="active-response w-100" style="border-bottom: 1px solid lightgrey;padding: 7px;">
                                <div class="d-inline-flex d-flex flex-row flex-wrap">
                                    <!-- <v-checkbox> </v-checkbox> -->
                                    <!--<text-highlight :queries="queries">
                                      <p class="w-100 mb-0"> {{t.answer}} </p>
                                    </text-highlight>-->
                                    <v-flex xs10>
                                      <text-highlight :queries="queries">{{ t.formatted_response }}</text-highlight>
                                    </v-flex>

                                    <v-flex xs2>
                                      <p class="grey--text text-xs-right mb-0"
                                      style="padding-right:27px">
                                        - {{t.user_name}}
                                      </p>
                                    </v-flex>
                                </div>
                                <!-- <div class="d-inline-flex w-100">
                                  <p class="grey--text text-xs-left mb-0 ">
                                    <span v-if="t.user_department"> Department: {{t.user_department}} &nbsp; </span>
                                    <span v-if="t.user_location"> Location: {{t.user_location}} </span>
                                  </p>
                                  <p class="grey--text text-xs-right mb-0"
                                  style="padding-right:27px">
                                    - {{t.user_name}}
                                  </p>
                                </div> -->
                                <div class="d-inline-flex w-100">
                                  <p class="grey--text text-xs-left mb-0 ">
                                    <span v-if="t.interaction_driver"> Driver: {{ t.interaction_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} &nbsp; </span>
                                    <span v-if="t.interaction_sub_driver"> Sub driver: {{ t.interaction_sub_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} </span>
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
                            <div :id="`response-${i}`" v-for="(t, i) in responseData" class="mb-0 px-3 d-flex flex-row flex-wrap" :key="i">
                              <div class="active-response w-100" style="border-bottom: 1px solid lightgrey;padding: 7px;">
                                <div class="d-inline-flex d-flex flex-row flex-wrap">
                                    <!-- <v-checkbox> </v-checkbox> -->
                                    <!--<text-highlight :queries="queries">
                                      <p class="w-100 mb-0"> {{t.answer}} </p>
                                    </text-highlight>-->
                                    <v-flex xs10>
                                      <text-highlight :queries="queries">{{ t.formatted_response }}</text-highlight>
                                    </v-flex>

                                    <v-flex xs2>
                                      <p class="grey--text text-xs-right mb-0"
                                      style="padding-right:27px">
                                        - {{t.user_name}}
                                      </p>
                                    </v-flex>
                                </div>
                                <!-- <div class="d-inline-flex w-100">
                                  <p class="grey--text text-xs-left mb-0 ">
                                    <span v-if="t.user_department"> Department: {{t.user_department}} &nbsp; </span>
                                    <span v-if="t.user_location"> Location: {{t.user_location}} </span>
                                  </p>
                                  <p class="grey--text text-xs-right mb-0 "
                                  style="padding-right:27px">
                                    - {{t.user_name}}
                                  </p>
                                </div>-->
                              </div>
                              <div class="d-inline-flex w-100">
                                <p class="grey--text text-xs-left mb-0 ">
                                  <span v-if="t.interaction_driver"> Driver: {{ t.interaction_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} &nbsp; </span>
                                  <span v-if="t.interaction_sub_driver"> Sub driver: {{ t.interaction_sub_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} </span>
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
                            <div :id="`response-${i}`" v-for="(t, i) in responseData" class="mb-0 px-3 d-flex flex-row flex-wrap" :key="i">
                              <div class="active-response w-100" style="border-bottom: 1px solid lightgrey;padding: 7px;">
                                <div class="d-inline-flex d-flex flex-row flex-wrap">
                                    <!-- <v-checkbox> </v-checkbox> -->
                                    <!--<text-highlight :queries="queries">
                                      <p class="w-100 mb-0"> {{t.answer}} </p>
                                    </text-highlight>-->
                                    <v-flex xs10>
                                      <text-highlight :queries="queries">{{ t.formatted_response }}</text-highlight>
                                    </v-flex>
                                    <v-flex xs2>
                                      <p class="grey--text text-xs-right mb-0"
                                      style="padding-right:27px">
                                        - {{t.user_name}}
                                      </p>
                                    </v-flex>
                                </div>
                                <!-- <div class="d-inline-flex w-100">
                                  <p class="grey--text text-xs-left mb-0 ">
                                    <span v-if="t.user_department"> Department: {{t.user_department}} &nbsp; </span>
                                    <span v-if="t.user_location"> Location: {{t.user_location}} </span>
                                  </p>
                                  <p class="grey--text text-xs-right mb-0"
                                  style="padding-right:27px">
                                    - {{t.user_name}}
                                  </p>
                                </div> -->
                              </div>
                              <div class="d-inline-flex w-100">
                                <p class="grey--text text-xs-left mb-0 ">
                                  <span v-if="t.interaction_driver"> Driver: {{ t.interaction_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} &nbsp; </span>
                                  <span v-if="t.interaction_sub_driver"> Sub driver: {{ t.interaction_sub_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} </span>
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
                      <div :id="`response-${i}`" v-for="(t, i) in responseData" class="mb-0 px-3 d-flex flex-row flex-wrap" :key="i"
                      >
                        <div class="active-response w-100" style="border-bottom: 1px solid lightgrey;padding: 7px;">
                          <div class="d-inline-flex d-flex flex-row flex-wrap">
                              <!-- <v-checkbox> </v-checkbox> -->
                              <!--<text-highlight :queries="queries">
                                <p class="w-100 mb-0"> {{t.answer}} </p>
                              </text-highlight>-->
                              <v-flex xs10>
                                <text-highlight :queries="queries">{{ t.formatted_response }}</text-highlight>
                              </v-flex>
                              <v-flex xs2>
                                <p class="grey--text text-xs-right mb-0"
                                style="padding-right:27px">
                                  - {{t.user_name}}
                                </p>
                              </v-flex>
                          </div>
                          <!-- <div class="d-inline-flex w-100">
                            <p class="grey--text text-xs-left mb-0 ">
                              <span v-if="t.user_department"> Department: {{t.user_department}} &nbsp; </span>
                              <span v-if="t.user_location"> Location: {{t.user_location}} </span>
                            </p>
                            <p class="grey--text text-xs-right mb-0"
                            style="padding-right:27px">
                              - {{t.user_name}}
                            </p>
                          </div> -->
                          <div class="d-inline-flex w-100">
                            <p class="grey--text text-xs-left mb-0 ">
                              <span v-if="t.interaction_driver"> Driver: {{ t.interaction_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} &nbsp; </span>
                              <span v-if="t.interaction_sub_driver"> Sub driver: {{ t.interaction_sub_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} </span>
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

      <v-card-actions class="mt-3" v-if="dialogs.questionAnalysis" align-content-space->
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
import '../../../assets/icons/materialCss.scss';
import Anychart from 'anychart';
// import VueAnychart from '../../analytics/VueAnychart.vue';
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
  name: 'questionAnalysis',
  components: {
    // VTooltip,
    // VCheckbox,
    // VCombobox,
    InfiniteLoading
    // VueAnychart,
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
        questionAnalysis: true
      },
      dateRangeOptions: {
        startDate: '',
        endDate: ''
      },
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
            title: 'Response analysis',
            value: 'analysis',
            enabled: true
          }, {
            title: 'Sentiment analysis',
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
            // this.dialogs.questionAnalysis = true;
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
          if ((this.$route.query && this.$route.query.activeTab === 'need-to-meet')) {
            this.sentimentFilters = {
              user_response_sentiment_range: '0,0.4'
            };
          } else if ((this.$route.query && this.$route.query.activeTab === 'open-ended' && this.selectedQuestionID) || this.selectedQuestionID) {
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
          if ((this.$route.query && this.$route.query.activeTab === 'need-to-meet')) {
            this.sentimentFilters = {
              user_response_sentiment_range: '0.6,1.0'
            };
          } else if ((this.$route.query && this.$route.query.activeTab === 'open-ended' && this.selectedQuestionID) || this.selectedQuestionID) {
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
          if ((this.$route.query && this.$route.query.activeTab === 'need-to-meet')) {
            this.sentimentFilters = {
              user_response_sentiment_range: '0.5,0.5'
            };
          } else if ((this.$route.query && this.$route.query.activeTab === 'open-ended' && this.selectedQuestionID) || this.selectedQuestionID) {
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
      this.getResponses($state);
      this.config.page_offset += 1;
    },
    generateDonut (data, driver) {
      setTimeout(() => {
        // eslint-disable-next-line no-unused-vars
        const that = this;
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
      let queryParams = {
        stage_id: this.$route.params.stageId,
        fields: 'id,questions,type,driver,sub_driver,response_count,response_breakup,response_wordcloud_analysis,interaction_responses,responses_sentiment_analysis',
        interaction_responses_fields: 'formatted_response,response_sentiment,user_name,user_email,user_department,user_location,interaction_sub_driver,interaction_driver,user_profile_id',
        interaction_responses__contains: this.search ? this.search : null,
        irpo: this.config.page_offset
      };
      const url = `${process.env.VUE_APP_ADHOC_API_URL}dashboard/${this.selectedQuestionID}/question_wise_report`;

      const temp = {};
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
      queryParams = {
        ...queryParams,
        ...this.sentimentFilters
      };
      // if ((this.$route.name !== 'ViewLifecycle' && (!this.responseData.length || this.responseData.length === 0 || this.responseData.length < this.matchingResponses)) ||
      // (this.$route.name === 'ViewLifecycle' && this.sentimentFilters && Object.keys(this.sentimentFilters).length > 0 )) {
      if (!this.responseData.length || this.responseData.length === 0 || (this.responseData.length < this.matchingResponses && this.config.page_offset !== 1)) {
        axios.get(url, {
          params: queryParams
        }).then((response) => {
          if (response && response.data) {
            this.responseData = this.responseData.concat(response.data.interaction_responses.response_dict);
            let type = '';
            if (this.config.activeMoodTab === 'tab-negative') {
              type = 'negative_sentiment_count';
            }
            if (this.config.activeMoodTab === 'tab-neutral') {
              type = 'neutral_sentiment_count';
            }
            if (this.config.activeMoodTab === 'tab-positive') {
              type = 'positive_sentiment_count';
            }
            this.matchingResponses = response.data.responses_sentiment_analysis[type];
            this.responseAnalysis = response.data.responses_sentiment_analysis;

            if ($state) {
              if (this.responseData.length < this.matchingResponses) {
                $state.loaded();
              } else {
                $state.complete();
              }
            } else if (this.responseData.length < this.matchingResponses) {
              this.config.page_offset += 1;
              this.getResponses();
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
    },
    closeModal () {
      this.dialogs.questionAnalysis = false;
      if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent) {
        this.$parent.$parent.$parent.config.questionAnalysis = false;
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
  .questionAnalysis {
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
