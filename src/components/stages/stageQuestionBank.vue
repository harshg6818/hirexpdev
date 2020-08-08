<template>
  <v-dialog max-width="1q00px"
      v-model="dialogs.question_bank"
      transition="dialog-transition"
    >
      <v-card class="template-card">
        <v-card-text style="height:calc(100% - 90px)">
          <v-layout row wrap>
            <v-flex xs8>
              <h2>
                Create using existing template
              </h2>
              <p class="mb-3">
                Click on a question type in the list on left hand side and
                then mark questions you want to copy from the list of questions on right hand side.
              </p>
            </v-flex>

            <v-flex xs1> </v-flex>

            <v-flex xs3 text-xs-right>
              <v-select
                class="remove-msg"
                :items="drivers"
                item-text="name"
                item-value="value"
                v-validate="'required'"
                v-model="driver"
                @change="getSubDrivers()"
                label="Select driver"
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row wrap style="height:calc(100% - 80px)">
            <v-flex class="interactions pr-3" style="height:100%" v-if="config.initialLoading">
              <v-card class="elevation-0 mt-2 interaction-card pt-3" style="height:100%">
                <v-layout class="pt-2" style="height: 20px">
                  <v-flex xs8>

                  </v-flex>

                  <v-flex xs4>
                    <ContentLoader
                      :height="5"
                      :width="30"
                      :speed="2"
                      primaryColor="#f3f3f3"
                      secondaryColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="0" ry="0" width="28.46" height="5" />
                    </ContentLoader>
                  </v-flex>
                </v-layout>

                <v-layout style="height:80%">
                  <v-flex xs4>
                    <ContentLoader
                      :height="50"
                      :width="50"
                      :speed="2"
                      primaryColor="#f3f3f3"
                      secondaryColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="0" ry="0" width="44.46" height="50" />
                    </ContentLoader>
                  </v-flex>
                  <v-flex xs8>
                    <ContentLoader
                      :height="25"
                      :width="50"
                      :speed="2"
                      primaryColor="#f3f3f3"
                      secondaryColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="0" ry="0" width="48.46" height="25" />
                    </ContentLoader>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>

            <!-- Area to add elements -->
            <v-flex class="interactions pr-2" style="height:100%" v-if="!config.initialLoading">
              <v-card class="elevation-0 mt-2 interaction-card" style="height:100%">
                <v-layout row wrap white class="drag-container" style="height: 100%">
                  <v-flex class="py-3" xs12 style="height:100%">
                    <v-layout v-if="roles && roles.length > 0" style="height:100%">

                      <!-- SubDrivers List -->
                      <v-flex xs4 class="list-sections px-3">
                        <v-card class="scroll-list">
                          <v-card-text class="pa-0" v-show="subDrivers.length > 0">
                            <div v-for="(qtype, qi) in subDrivers"
                              class="pa-3 cursor-pointer"
                              style="border-color:#f3f1f1" :key="qi"
                              :class="{ 'active-campaign' : activeCategory === qi,
                              'b-bottom': (qi < subDrivers.length - 1)
                              }"
                              @click="getQuestions(qtype.value, qi)">
                                <strong> {{ qtype.name }} </strong>
                            </div>
                          </v-card-text>
                        </v-card>

                        <!-- <v-expansion-panel expand v-model="config.panel"
                        v-show="!config.initialLoadingFilters"
                        class="elevation-0 employee-filters mr-2">
                          <v-expansion-panel-content
                            v-for="(role, roleIndex) in roles"
                            :key="roleIndex"
                          >
                            {{role}} {{roleIndex}}
                            <div slot="header"> {{role}} </div>
                            <v-card color="">
                              <v-card-text v-show="subDrivers.length > 0">
                                <div v-for="(qtype, qi) in subDrivers"
                                class="pa-3 cursor-pointer b-bottom"
                                  style="border-color:#f3f1f1" :key="qi"
                                  :class="activeCategory === qi ? 'active-campaign' : ''"
                                  @click="getQuestions(qtype, qi)">
                                    <strong> {{qtype}} </strong>
                                  </div>
                              </v-card-text>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel> -->
                      </v-flex>

                      <v-flex xs8 class="pr-3" v-if="config.initialLoadingQuestions">
                        <ContentLoader
                          :height="25"
                          :width="50"
                          :speed="2"
                          primaryColor="#f3f3f3"
                          secondaryColor="#ecebeb"
                        >
                          <rect x="0" y="0" rx="0" ry="0" width="48.46" height="25" />
                        </ContentLoader>
                      </v-flex>

                      <v-flex xs8 class="list-sections pr-3" v-if="!config.initialLoadingQuestions">
                        <v-card class="scroll-list">
                          <!-- Questions list -->
                          <div class="px-3" v-if="table.questions && table.questions.length">
                            <v-checkbox color="#0d2c8d"
                              class="mt-0 mr-3 questions-custom-field no-margin"
                              :value="allSelected ? true: false"
                              @change="toggleAll($event)"
                              label="Select all">
                            </v-checkbox>

                            <div v-for="(question, qi) in table.questions" class="py-2 px-3 d-inline-flex" :key="qi"
                            style="width:100%">
                              <v-layout>
                                <v-flex xs1>
                                  <v-checkbox color="#0d2c8d"
                                  class="mt-0 mr-3 questions-custom-field no-margin"
                                  v-model="selectedQuestions[question.id]"
                                  @change="updateQuestions(question)">
                                  </v-checkbox>
                                </v-flex>
                                <v-flex xs10>
                                  <p class="mb-0" style="margin-top:5px">
                                    {{question.questions[0].text}}
                                  </p>
                                </v-flex>
                                <v-flex xs1>
                                  <v-tooltip bottom>
                                    <v-icon class="grey--text" slot="activator"
                                    style="margin-top:5px;margin-left:10px">
                                      {{questionIcon(question.type)}}
                                    </v-icon>
                                    {{question.type}}
                                  </v-tooltip>
                                </v-flex>
                              </v-layout>
                            </div>
                          </div>

                          <!-- If no questions are selected -->
                          <div v-if="!table.questions || table.questions.length === 0">
                            <v-layout row wrap align-center justify-center fill-height style="height:160px">
                              <v-flex text-xs-center>
                                <strong class="body-2 font-weight-bold grey--text">
                                  No questions matching the selected driver and subdriver
                                </strong>
                              </v-flex>
                            </v-layout>
                          </div>
                        </v-card>
                      </v-flex>
                    </v-layout>

                    <v-layout v-else>
                      <v-flex xs12 class="">
                        <h2 class="mt-5 pt-5 px-4"> No Questions in the question bank </h2>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <!--<v-flex class="b-left" xs3>
                    <div class="mx-4">
                      <h3 class="mt-3 mb-2"> How to add questions ? </h3>
                      <p class="mb-3">
                        Click on a question type in the list on left hand side and then mark
                        questions you want to copy from the list of questions on right hand side.
                      </p>
                    </div>
                  </v-flex>-->
                </v-layout>

              </v-card>
            </v-flex>

          </v-layout>
        </v-card-text>

        <v-card-actions class="mt-3" align-content-space->
          <v-flex xs2 class="ml-2">
            <v-btn color="error" flat @click.stop="closeModal()">Close</v-btn>
          </v-flex>
          <v-flex xs8>
          </v-flex>
          <v-flex text-xs-right class="mr-3" xs2>
            <v-btn color="primary" class="white--text" @click.stop="addQuestions()">
              Import Questions
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
/* eslint-disable quotes */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-lonely-if */
/* eslint-disable object-shorthand */
// import { VAlert, VMenu, VSlider, VTextarea, VSelect, VChip, VCheckbox, VTooltip } from 'vuetify';

// import { Container, Draggable } from 'vue-smooth-dnd';
import { mapState } from 'vuex';
import axios from 'axios';
// import VueContentLoading from 'vue-content-loading';
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'NewQuestion',
  components: {
    // VAlert,
    // VMenu,
    // VTextarea,
    // VSlider,
    // VSelect,

    // Container,
    // Draggable,

    // VChip,
    // VCheckbox,
    // VTooltip,
    // VueContentLoading,
    ContentLoader
  },
  data () {
    return {
      roles: [
        'Work-life Integration',
        'Rewards & Recognition',
        'Career Opportunities',
        'Culture', 'Leadership',
        'Performance Management'
      ],
      roleList: [],
      driver: '',
      drivers: [],
      subDrivers: [],
      activeCategory: null,
      allSelected: false,
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      campaignQuestions: [],
      selectedQuestions: {},
      dialogs: {
        newQuestion: false,
        question_bank: false,
        campaign: false
      },
      table: {
        searchString: '',
        totalStage: 0,
        loading: true,
        stage: []
      },
      config: {
        filter: false,
        panel: [],
        // panel: [{
        //   'Culture': true,
        //   'Leadership': true,
        //   'Career Opportunities': false,
        //   'Rewards & Recognition': false,
        //   'Work-life Integration': false,
        //   'Performance Management': false,
        // }],
        initialLoading: true,
        initialLoadingQuestions: true,
        initialLoadingFilters: true
      },
      pagination: {
        rowsPerPage: 5,
        page: 1,
        length: 1
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
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
    toggleAll (ev) {
      if (!ev) {
        this.selectedQuestions = {};
        this.campaignQuestions = [];
        this.allSelected = false;
      } else {
        this.$nextTick(function a () {
          this.selectedQuestions = {};
          this.campaignQuestions = [];
          this.allSelected = true;
          this.$lodash.each(this.table.questions, (ques, index) => {
            this.selectedQuestions[ques.id] = true;
            const questionCopy = JSON.parse(JSON.stringify(ques));
            questionCopy.msg = questionCopy.questions;
            if (questionCopy.type === "text") {
              questionCopy.img = 'fas fa-align-left';
              questionCopy.title = 'Text';
            } else if (questionCopy.type === "textInput") {
              questionCopy.img = 'fas fa-keyboard';
              questionCopy.title = 'Input From User';
            } else if (questionCopy.type === "scale") {
              questionCopy.img = 'fas fa-arrows-alt-h';
              questionCopy.title = 'Number Scale';
            } else if (questionCopy.type === "closeEnded") {
              questionCopy.img = 'fas fa-reply-all';
              questionCopy.title = 'Yes/No (Close Ended)';
            }
            this.campaignQuestions.push(questionCopy);
          });
        });
      }
    },
    getSubDrivers () {
      this.config.initialLoadingFilters = true;
      this.config.initialLoading = true;
      this.$lodash.each(this.roleList, (subDrivers, driver) => {
        if (this.driver === driver) {
          this.subDrivers = [];
          this.$lodash.each(subDrivers, (subDriver) => {
            this.subDrivers.push({
              name: subDriver.replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
              value: subDriver
            });
          });
          if (this.subDrivers && this.subDrivers.length) {
            this.subDriver = this.subDrivers[0].value;
            this.activeCategory = 0;
            this.getQuestions(this.subDriver);
            this.config.initialLoading = false;
            this.config.initialLoadingFilters = false;
          }
        }
      });
    },
    getQuestions (sub_driver, index) {
      this.activeCategory = index;
      this.config.initialLoadingQuestions = true;
      const queryParams = {
        count: 'true',
        // category: (this.$parent.newStage && this.$parent.newStage.category) ? this.$parent.newStage.category : undefined,
        driver: this.driver,
        sub_driver: sub_driver,
        page_offset: 0
      };
      axios.get(`${process.env.VUE_APP_API_URL}question_bank/questions?driver=${this.driver}&sub_driver=${sub_driver}`, {
        // params: queryParams,
      }).then((response) => {
        this.config.initialLoadingQuestions = false;
        if (response && response.data) {
          this.$nextTick(function a () {
            this.table.questions = response.data.data;
            // this.table.totalItems = response.data.total_count;
            // this.pagination.length = Math.ceil(this.table.totalItems / this.pagination.rowsPerPage);
            this.$forceUpdate();
          });
        }
      }, (response) => {
        this.config.initialLoadingQuestions = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch questions, Please try again later!'
        });
        throw new Error(response);
      });
    },
    updateQuestions (question) {
      const match = this.$lodash.findIndex(this.campaignQuestions, (ques) =>
        ques.id === question.id);
      if (match <= -1) {
        if (this.selectedQuestions[question.id]) {
          const questionCopy = JSON.parse(JSON.stringify(question));
          questionCopy.msg = questionCopy.questions;
          if (questionCopy.type === "text") {
            questionCopy.img = 'fas fa-align-left';
            questionCopy.title = 'Text';
          } else if (questionCopy.type === "textInput") {
            questionCopy.img = 'fas fa-keyboard';
            questionCopy.title = 'Input From User';
          } else if (questionCopy.type === "scale") {
            questionCopy.img = 'fas fa-arrows-alt-h';
            questionCopy.title = 'Number Scale';
          } else if (questionCopy.type === "closeEnded") {
            questionCopy.img = 'fas fa-reply-all';
            questionCopy.title = 'Yes/No (Close Ended)';
          }
          if (this.campaignQuestions) {
            this.campaignQuestions.push(questionCopy);
          } else {
            this.campaignQuestions = [];
            this.campaignQuestions.push(questionCopy);
          }
        }
      } else {
        if (this.campaignQuestions && !this.selectedQuestions[question.id]) {
          this.campaignQuestions.splice(match, 1);
        }
      }
    },
    addQuestions () {
      if (this.$parent && this.$parent.newSurvey) {
        this.$lodash.each(this.campaignQuestions, (ques, index) => {
          if (ques.id) {
            delete ques.id;
          }
          this.$parent.newSurvey.interactions.push(ques);
        });
        this.selectedQuestions = {};
        this.campaignQuestions = [];
        this.dialogs.question_bank = false;
      }
    },
    closeModal () {
      this.selectedQuestions = {};
      this.campaignQuestions = [];
      this.dialogs.question_bank = false;
    }
  },
  // watch: {
  //   dialogs: {
  //     handler() {
  //       if (dialogs.question_bank) {

  //       }
  //     }
  //   },
  // },
  created () {
    // if (this.$parent && this.$parent.newSurvey) {
    //   this.campaignQuestions = this.$parent.newSurvey.interactions;
    // }
  },
  beforeMount () {
    // if (this.$parent && this.$parent.newStage && this.$parent.newStage.category) {
    //   this.getQuestionsTypes();
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.scroll-list {
  height: 100%;
  overflow-y: auto;
}
.hover-link:hover {
  color:#0d2c8d !important
}
.list-sections {
  overflow-y:auto;
  height: 100%;
}
.template-card {
  height: 700px;
  overflow-y:hidden;
}
.active-campaign {
  background-color: #8173b9 !important;
  // color: #fff !important;
}
.questions-custom-field {
  &.v-input--selection-controls {
    .v-input__slot {
      margin-bottom: 0px!important;
    }
    .v-input__control {
      height: 24px!important;
    }
  }
}
</style>
