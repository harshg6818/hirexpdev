<template>
  <v-dialog max-width="1000px"
      v-model="dialogs.question_bank"
      transition="dialog-transition"
    >
      <v-card class="template-card">
        <v-card-text style="height:calc(100% - 90px)">
          <h2>
            Create using existing template
            <!--<v-tooltip bottom>
              <v-icon class="ml-3" slot="activator" style="position:relative;top:-5px">  fa fa-info-circle </v-icon>
              <h3 class="mt-3 mb-2"> How to add questions ? </h3>
              <p class="mb-3"> Click on a question type in the list on left hand side and then mark questions you want to copy from the list of questions on right hand side. </p>
            </v-tooltip>-->
          </h2>
          <p class="mb-3"> Click on a question type in the list on left hand side and then mark questions you want to copy from the list of questions on right hand side. </p>
          <v-layout mx-2 mt-2 row wrap style="height:calc(100% - 50px)">
            <v-flex class="interactions pr-3" style="height:100%" v-if="config.initialLoading">
              <v-card class="elevation-0 mt-2 interaction-card" style="height:100%">
                <v-layout style="height:100%">
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

                <v-layout row wrap white class="drag-container" style="height:100%">
                  <v-flex xs12 style="height:100%">
                    <v-layout v-if="table.questionTypes && table.questionTypes.length > 0" style="height:100%">
                      <v-flex xs4 class="list-sections">
                        <div v-for="(qtype, qi) in table.questionTypes" class="pa-3 cursor-pointer b-bottom"
                        style="border-color:#f3f1f1" :key="qi"
                        :class="activeCategory === qi ? 'active-campaign' : ''"
                        @click="getQuestions(qtype, qi)">
                          <strong> {{qtype}} </strong>
                          <!--<v-divider v-if="qi < (table.questionTypes.length - 1)"></v-divider>-->
                        </div>
                      </v-flex>

                      <v-flex xs8 v-if="config.initialLoadingQuestions">
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

                      <v-flex xs8 class="b-left list-sections" v-if="!config.initialLoadingQuestions">
                        <div class="px-3">
                          <v-checkbox color="#4c3e9d" class="mt-0 mr-3 questions-custom-field no-margin" :value="allSelected ? true: false"
                            @change="toggleAll($event)"
                            label="Select all">
                            </v-checkbox>
                        </div>

                        <div v-for="(question, qi) in table.questions" class="py-2 px-3 d-inline-flex"
                        style="width:100%"
                        v-if="question.questions[0] && question.questions[0].text">
                          <v-layout>
                            <v-flex xs1>
                              <v-checkbox color="#4c3e9d" class="mt-0 mr-3 questions-custom-field no-margin" v-model="selectedQuestions[question.id]"
                              @change="updateQuestions(question)">
                              </v-checkbox>
                            </v-flex>
                            <v-flex xs10>
                              <p class="mb-0" style="margin-top:5px"> {{question.questions[0].text}} </p>
                            </v-flex>
                            <v-flex xs1>
                              <v-tooltip bottom>
                                <v-icon class="grey--text" slot="activator" style="margin-top:5px;margin-left:10px">
                                  {{questionIcon(question.type)}}
                                </v-icon>
                                {{question.type}}
                              </v-tooltip>
                            </v-flex>
                          </v-layout>
                        </div>
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
                      <p class="mb-3"> Click on a question type in the list on left hand side and then mark questions you want to copy from the list of questions on right hand side. </p>
                    </div>
                  </v-flex>-->
                </v-layout>

              </v-card>
            </v-flex>

          </v-layout>
        </v-card-text>

        <v-card-actions class="mt-4" align-content-space->
          <v-flex xs2 class="ml-2">
            <v-btn color="error" flat @click.stop="closeModal()">Close</v-btn>
          </v-flex>
          <v-flex xs8>
          </v-flex>
          <v-flex text-xs-right class="mr-3" xs2>
            <v-btn color="adhoc" class="white--text" @click.stop="addQuestions()"> Import Questions</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { VAlert, VMenu, VSlider, VTextarea, VSelect, VChip, VCheckbox, VTooltip } from 'vuetify';
import { Container, Draggable } from 'vue-smooth-dnd';
import { mapState } from 'vuex';
import axios from 'axios';
import VueContentLoading from 'vue-content-loading';
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'NewQuestion',
  components: {
    VAlert,
    VMenu,
    VTextarea,
    VSlider,
    VSelect,
    Container,
    Draggable,
    VChip,
    VCheckbox,
    VTooltip,
    VueContentLoading,
    ContentLoader,
  },
  data() {
    return {
      activeCategory: null,
      allSelected: false,
      filters: {
        default: {},
        selected: {},
        main: {},
      },
      campaignQuestions: [],
      selectedQuestions: {},
      dialogs: {
        newQuestion: false,
        question_bank: false,
        campaign: false,
      },
      table: {
        searchString: '',
        totalStage: 0,
        loading: true,
        stage: [],
      },
      config: {
        filter: false,
        panel: [true, true, true],
        initialLoading: true,
        initialLoadingQuestions: true,
        initialLoadingFilters: true,
      },
      pagination: {
        rowsPerPage: 5,
        page: 1,
        length: 1,
      },
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  methods: {
    questionIcon(type) {
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
    toggleAll(ev) {
      if (!ev) {
        this.selectedQuestions = {};
        this.campaignQuestions = [];
        this.allSelected = false;
      } else {
        this.$nextTick(function a() {
          this.selectedQuestions = {};
          this.campaignQuestions = [];
          this.allSelected = true;
          this.$lodash.each(this.table.questions, (ques, index) => {
            this.selectedQuestions[ques.id] = true;
            let questionCopy = JSON.parse(JSON.stringify(ques));
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
    getQuestionsTypes() {
      this.config.initialLoading = true;
      const queryParams = {
        count: 'true',
        page_offset: 0,
        category: (this.$parent.newCampaign && this.$parent.newCampaign.category) ? this.$parent.newCampaign.category : undefined,
      };
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}question_bank/drivers`, {
        params: queryParams,
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          this.table.questionTypes = response.data.data;
          // this.table.totalItems = response.data.total_count;
          // this.pagination.length = Math.ceil(this.table.totalItems / this.pagination.rowsPerPage);
          if (this.table.questionTypes.length) {
            this.getQuestions(this.table.questionTypes[0], 0);
          }
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch question drivers, Please try again later!',
        });
        throw new Error(response);
      });
    },
    getQuestions(driver, index) {
      this.activeCategory = index;
      this.config.initialLoadingQuestions = true;
      const queryParams = {
        count: 'true',
        category: (this.$parent.newCampaign && this.$parent.newCampaign.category) ? this.$parent.newCampaign.category : undefined,
        driver: driver,
        page_offset: 0,
      };
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}question_bank/questions`, {
        params: queryParams,
      }).then((response) => {
        this.config.initialLoadingQuestions = false;
        if (response && response.data) {
          this.$nextTick(function a() {
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
          text: 'Unable to fetch questions, Please try again later!',
        });
        throw new Error(response);
      });
    },
    updateQuestions(question) {
      const match = this.$lodash.findIndex(this.campaignQuestions, (ques) =>
        ques.id === question.id);
      if (match <= -1) {
        if (this.selectedQuestions[question.id]) {
          let questionCopy = JSON.parse(JSON.stringify(question));
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
    addQuestions() {
      if (this.$parent && this.$parent.newSurvey) {
        this.$lodash.each(this.campaignQuestions, (ques, index) => {
          if (ques.id) {
            delete ques.id;
          }
          this.$parent.newSurvey.interactions.push(ques);
        });
        this.selectedQuestions= {};
        this.campaignQuestions = [];
        this.dialogs.question_bank = false;
      }
    },
    closeModal() {
      this.selectedQuestions= {};
      this.campaignQuestions = [];
      this.dialogs.question_bank=false;
    },
  },
  // watch: {
  //   dialogs: {
  //     handler() {
  //       if (dialogs.question_bank) {

  //       }
  //     }
  //   },
  // },
  created() {
    // if (this.$parent && this.$parent.newSurvey) {
    //   this.campaignQuestions = this.$parent.newSurvey.interactions;
    // }
  },
  beforeMount() {
    // if (this.$parent && this.$parent.newCampaign && this.$parent.newCampaign.category) {
    //   this.getQuestionsTypes();
    // }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hover-link:hover {
  color:#4c3e9d !important
}
.list-sections {
  overflow-y:auto;
  height: 100%;
}
.template-card {
  height: 600px;
  overflow-y:hidden;
}
.active-campaign {
  background-color: #cffbfa !important;
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
