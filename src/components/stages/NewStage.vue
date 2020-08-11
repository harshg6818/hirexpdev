<template>
  <div class="">
    <div class="hide-overflow d-flex flex-column">
      <!-- Stepper actions -->
      <!-- <div class="new-lifecycle"> -->
      <div class="new-lifecycle-wrap">
        <div class="b-bottom d-flex flex-row flex-wrap" v-if="unlockStepper" style="max-height:52px">
          <v-flex xs4 class="d-inline-flex">
            <v-tooltip bottom style="max-width:70px">
              <template v-slot:activator="{ on }">
                <v-btn color="grey" class="elevation-0 my-0 text-right back-button b-right"
                  @click="previous()"
                  style="position:relative;top:5px;margin-left:22px;"
                  slot="activator"
                  v-on="on"
                  text fab
                  v-show="config.activeTab !== 'summary'"
                  :loading="config.savingStage"
                  :disabled="config.savingStage"
                >
                  <v-icon> fas fa-arrow-left </v-icon>
                </v-btn>
              </template>
              Back
            </v-tooltip>

            <v-text-field
              class="campaign-title campaign-title-top template-custom-field"
              validate-on-blur
              @change="capitaliseCampaignTitle()"
              v-model="newStage.title"
              name="Touchpoint title"
              maxlength="40"
              label=""
              color="primary"
              single-line
              placeholder="Touchpoint Title (max 40 characters)"
            ></v-text-field>
          </v-flex>
          <!-- <v-flex xs8 class="text-right pr-3" style="position:relative;top:-10px;"> -->
          <v-flex xs8 class="text-right pr-3">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn color="red" class="elevation-0 ml-0 text-right back-button"
                  @click="discard()"
                  style="top:2px"
                  slot="activator"
                  text fab
                  v-on="on"
                >
                  <v-icon> fas fa-trash-alt </v-icon>
                </v-btn>
              </template>
              Discard
            </v-tooltip>

            <v-btn color="primary" class="elevation-0 white--text text-right mx-1"
              text outlined
              style="position:relative;top:5px"
              @click="next(false)"
              v-if="config.activeTab !== 'configure'"
              :loading="config.savingStage"
              :disabled="config.savingStage"
            >
              Save & Close
            </v-btn>

            <v-btn color="primary" class="elevation-0 white--text text-right mx-1"
              style="position:relative;top:5px"
              @click="next(true)"
              v-if="config.activeTab !== 'configure'"
              :loading="config.savingStage"
              :disabled="config.savingStage"
            >
              Continue
            </v-btn>

            <v-btn color="primary" class="elevation-0 white--text text-right mx-1"
              style="position:relative;top:5px"
              @click="next(true)"
              v-if="config.activeTab === 'configure'"
              :loading="config.savingStage"
              :disabled="config.savingStage"
            >
              Activate Touchpoint
            </v-btn>
          </v-flex>
        </div>
      </div>

      <!-- Stepper Tabs -->
      <!-- <div class="b-bottom custom-row d-flex flex-wrap" v-if="unlockStepper" style="position:absolute;top:4em;"> -->
      <div class="b-bottom d-flex w-100 flex-wrap" v-if="unlockStepper">
        <v-flex xs8>
          <!-- <v-tabs
            style=""
            v-model="config.activeTab"
            centered
            class="text-center px-3 stepper-step-title"
            color="transparent"
            slider-color="primary"
          > -->
          <v-tabs
            v-model="config.activeTab"
            centered
            hide-slider
            class="text-center px-3 stepper-step-title"
            slider-color="primary"
          >
            <v-tab
              class="stepper-step mx-0"
              v-for="(t, ti) in config.tabs"
              :key="ti"
              disabled
              color="black"
              :href="`#${t.value}`"
            >
              <strong class="black--text"> {{t.title}} </strong> &nbsp; &nbsp; &nbsp;
              <v-icon small v-if="ti < (config.tabs.length - 1)">fas fa-arrow-right</v-icon>
            </v-tab>
          </v-tabs>
        </v-flex>
      </div>

      <!-- Summary view outside Stepper -->
      <!-- <div class="d-flex flex-wrap flex-row" v-if="!unlockStepper"> -->
      <div class="custom-row-wrap d-flex flex-wrap flex-row" v-if="!unlockStepper">
        <!-- <div class="mt-5 d-flex flex-row flex-wrap" style="position:absolute;top:14em;left:4vw;width:calc(100% - 3.8rem) !important"> -->
        <div class="mt-5 w-100 d-flex flex-row flex-wrap">
          <v-flex xs3></v-flex>
          <v-flex xs6 class="text-left d-inline-flex">
            <div>
              <h2> Tell us about your touchpoint </h2>
              <!--<h4 class="grey--text"> Let us know little bit more about your touchpoint. This information will help us personalise your touchpoint.</h4>-->
              <v-text-field
                class="campaign-title mt-3"
                validate-on-blur
                @change="capitaliseCampaignTitle()"
                v-model="newStage.title"
                name="touchpoint title"
                maxlength="40"
                outline
                label="Touchpoint Title *"
                placeholder="max 40 characters"
              ></v-text-field>

              <div class="d-flex flex-row flex-wrap">
                <v-flex xs4>
                  <v-select
                    elevation-0
                    @input="updateTimeUnitList()"
                    @change="updateTimeUnitList()"
                    class="grey--text text--lighten-2 mr-4"
                    :items="list.timeDuration"
                    v-model="newStage.triggerTimeDuration"
                    :error-messages="errors.collect('timeDuration')"
                    label="Select time"
                    name="timeDuration"
                    v-validate="'required'"
                    outline
                    flat
                  ></v-select>
                </v-flex>

                <v-flex xs4>
                  <v-select
                    elevation-0
                    class="grey--text text--lighten-2 mx-4"
                    :items="timeUnits"
                    v-model="newStage.triggerTimeUnit"
                    :error-messages="errors.collect('timeUnit')"
                    label="Select unit"
                    name="timeUnit"
                    v-validate="'required'"
                    outline
                    flat
                  ></v-select>
                </v-flex>

                <v-flex xs4>
                  <v-select
                    elevation-0
                    class="grey--text text--lighten-2 ml-4"
                    :items="list.timeReferences"
                    v-model="newStage.triggerTimeReference"
                    @input="updateTriggerTimeIn"
                    :error-messages="errors.collect('triggerTimeReference')"
                    label="Select reference"
                    name="tTimeReference"
                    v-validate="'required'"
                    outline
                    flat
                  ></v-select>
                </v-flex>
              </div>

              <div class="text-center mt-2">
                <v-btn color="primary" class="elevation-0 white--text"
                  @click="proceed()"
                  :disabled="!newStage.title || !newStage.triggerTimeUnit || !newStage.triggerTimeDuration || !newStage.triggerTimeReference"
                >
                  Proceed
                </v-btn>
              </div>
            </div>
          </v-flex>
          <v-flex xs3></v-flex>
        </div>
      </div>

      <!-- Stepper Tabs content -->
      <!-- <div class="custom-row d-flex flex-row" v-if="unlockStepper" style="position:absolute;top:8em;left:4vw;"> -->
      <div class="w-100 d-flex flex-row" v-if="unlockStepper">
        <!-- <v-flex> -->
          <v-tabs-items v-model="config.activeTab" class="w-100">
            <!-- Summary Tab content -->
            <v-tab-item class="stepper-step-content" value="summary" v-if="config.activeTab === 'summary'">
              <div class="mb-3 step-content d-flex flex-wrap flex-row">
                <v-flex xs3></v-flex>
                <v-flex xs6 class="text-left">
                  <div>
                    <v-text-field
                      class="campaign-title mt-3"
                      validate-on-blur
                      @change="capitaliseCampaignTitle()"
                      v-model="newStage.title"
                      name="touchpoint title"
                      maxlength="40"
                      outline
                      label="Touchpoint Title *"
                      placeholder="max 40 characters"
                    ></v-text-field>
                  </div>

                  <div class="d-flex flex-wrap flex-row">
                    <v-flex xs4>
                      <v-select
                        elevation-0
                        class="grey--text text--lighten-2 mr-4"
                        :items="list.timeDuration"
                        @input="updateTimeUnitList()"
                        @change="updateTimeUnitList()"
                        v-model="newStage.triggerTimeDuration"
                        :error-messages="errors.collect('timeDuration')"
                        label="Select time"
                        name="timeDuration"
                        v-validate="'required'"
                        outline
                        flat
                      ></v-select>
                    </v-flex>

                    <v-flex xs4>
                      <v-select
                        elevation-0
                        class="grey--text text--lighten-2 mx-4"
                        :items="timeUnits"
                        v-model="newStage.triggerTimeUnit"
                        :error-messages="errors.collect('timeUnit')"
                        label="Select unit"
                        name="timeUnit"
                        v-validate="'required'"
                        outline
                        flat
                      ></v-select>
                    </v-flex>

                    <v-flex xs4>
                      <v-select
                        elevation-0
                        class="grey--text text--lighten-2 ml-4"
                        :items="list.timeReferences"
                        v-model="newStage.triggerTimeReference"
                        @input="updateTriggerTimeIn"
                        :error-messages="errors.collect('triggerTimeReference')"
                        label="Select reference"
                        name="tTimeReference"
                        v-validate="'required'"
                        outline
                        flat
                      ></v-select>
                    </v-flex>
                  </div>
                </v-flex>
                <v-flex xs3></v-flex>
              </div>

            </v-tab-item>

            <!-- Survey Tab content -->
            <v-tab-item class="stepper-step-content w-100" value="survey" v-if="config.activeTab === 'survey'">
              <div class="mb-3 step-content overflow-y-hidden d-flex flex-wrap flex-row">
                <v-flex xs12 class="text-left d-inline-flex">
                  <newSurvey ref="survey"> </newSurvey>
                </v-flex>
              </div>
            </v-tab-item>

            <!-- Recipients Tab content -->
            <v-tab-item class="stepper-step-content" value="audience" v-if="config.activeTab === 'audience'">
              <div class="mb-3 step-content d-flex flex-row flex-wrap">
                <div class="d-flex flex-row flex-wrap w-100">
                  <audienceList ref="audienceList"> </audienceList>
                </div>
              </div>
            </v-tab-item>

            <!-- Configure Tab -->
            <v-tab-item class="stepper-step-content" value="configure" v-show="config.activeTab === 'configure'">
              <div class="mb-3 pa-5 step-content d-flex flex-row flex-wrap">
                <v-flex>
                  <!--<preview ref="preview">  </preview>-->
                  <v-select
                    outline
                    :items="adminUsers"
                    class="pt-0 mt-0 elevation-0 grey--text text--lighten-2"
                    v-validate="'required'" name="chatFromUser"
                    :error-messages="errors.collect('chatFromUser')"
                    item-text="display_name"
                    item-value="user_id"
                    v-model="newStage.chatFromUser"
                    label="Chat on behalf of"
                  ></v-select>

                  <v-select
                    :items="adminUsers"
                    chips
                    small-chips
                    flat outline single-line
                    multiple
                    class="pt-0 mt-0 elevation-0 grey--text text--lighten-2"
                    name="notifications"
                    :error-messages="errors.collect('notifications')"
                    item-text="display_name"
                    item-value="user_id"
                    v-model="newStage.notifications"
                    label="Notifications"
                  ></v-select>
                </v-flex>
              </div>
            </v-tab-item>
          </v-tabs-items>
        <!-- </v-flex> -->
      </div>

    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable vue/return-in-computed-property */

import { mapState, mapActions } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';
import newSurvey from './NewSurvey';
import audienceList from './stageAudience';
// import preview from './stagePreview';

// import {
//   VCheckbox,
//   VAlert,
//   VAvatar,
//   VAutocomplete,
//   VTooltip,
// } from 'vuetify';

dayjs.extend(relativeTime);

export default {
  name: 'uploadEmployees',
  components: {
    // ContentLoader,
    // VCheckbox,
    // VAlert,
    // VAvatar,
    // VAutocomplete,
    // VTooltip,
    newSurvey,
    audienceList
    // preview
  },
  data () {
    return {
      unlockStepper: false,
      audienceSource: null,
      newQuestion: {
        title: '',
        description: '',
        questions: [],
        type: ''
      },
      validate: {
        step1: true,
        step2: true,
        step3: true,
        step4: true,
        step5: true
      },
      newStage: {
        time: '',
        status: 'live',
        type: 'lifecycle',
        title: '',
        notifications: [],
        audience: {},
        survey: {
          id: null,
          title: 'No question set'
        },
        triggerTimeDuration: 3,
        triggerTimeUnit: 'weeks',
        triggerTimeReference: 'joining_date',
        triggerTimeIn: '+',
        triggerDate: new Date().toISOString().substr(0, 10),
        triggerTime: new Date().toISOString().substr(11, 5)
      },
      searchMemberSync: null,
      // validate: {
      //   step1: true,
      //   step2: true
      // },
      config: {
        panel: [true, true, true, true],
        searchMember: '',
        searchSurvey: '',
        stageType: 'lifecycle',
        activeStep: 1,
        initialLoading: true,
        loadingEmployees: false,
        loadingSurveys: false,
        savingStage: false,
        initialLoadingFilters: true,
        minDate: new Date().toISOString().substr(0, 10),
        activeTab: 'summary',
        tabs: [{
          title: 'About the touchpoint',
          value: 'summary',
          count: 0
        }, {
          title: 'Design touchpoint',
          value: 'survey',
          count: 1
        }, {
          title: 'Select audience',
          value: 'audience',
          count: 2
        }, {
          title: 'Configuration',
          value: 'configure',
          count: 3
        }]
      },
      filters: {
        default: {},
        main: {}
      },
      pagination: {
        rowsPerPage: 10
      },
      table: {
        loading: true,
        team: [],
        headers: [{
          text: 'Member Details',
          align: 'left',
          sortable: false
        }, {
          text: 'Mood',
          align: 'left',
          sortable: false
        }],
        notificationsHeaders: [{
          text: 'Member Details',
          align: 'left',
          sortable: false
        }, {
          text: 'Notifications',
          align: 'left',
          sortable: false
        }, {
          text: 'Reports',
          align: 'left',
          sortable: false
        }, {
          text: 'Actions',
          align: 'left',
          sortable: false
        }]
      },
      timeUnits: [{
        text: 'Days',
        value: 'days'
      }, {
        text: 'Weeks',
        value: 'weeks'
      }, {
        text: 'Months',
        value: 'months'
      }, {
        text: 'Years',
        value: 'years'
      }],
      list: {
        employees: [],
        survey: [],
        timeDuration: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        timeIn: [{
          text: 'Before',
          value: '-'
        }, {
          text: 'After',
          value: '+'
        }],
        timeRef: [{
          text: 'Joining date',
          value: 'joining_date'
        }, {
          text: 'Offer date',
          value: 'offer_date'
        }],
        timeUnit: [{
          text: 'Days',
          value: 'days'
        }, {
          text: 'Weeks',
          value: 'weeks'
        }, {
          text: 'Months',
          value: 'months'
        }, {
          text: 'Years',
          value: 'years'
        }],
        timeReferences: [{
          text: 'After Joining Date',
          value: 'joining_date'
        }]
      },
      dialogs: {
        newQuestion: false,
        question_bank: false,
        campaign: false
      }
    };
  },
  computed: {
    ...mapState({
      stagesOrder: state => state.stages,
      user: state => state.user,
      users (state) {
        const adminUsers = state.companyUsersList;
        // this.$lodash.remove((v) => {
        //
        // })
        return adminUsers;
      },
      adminUsers (state) {
        const adminUsers = state.companyAdminsList;
        return adminUsers;
      }
    }),
    triggerTimeAuto () {
      const final = {
        timeIn: '',
        timeRef: this.newStage.triggerTimeReference.replace('_', ' ')
      };
      if (this.newStage.triggerTimeIn === '-') {
        final.timeIn = 'before';
      } else {
        final.timeIn = 'after';
      }

      return `${this.newStage.triggerTimeDuration} ${this.newStage.triggerTimeUnit} ${final.timeIn} ${final.timeRef}`;
    },
    updateTriggerTimeIn () {
      if (this.newStage.triggerTimeReference === 'joining_date') {
        this.newStage.triggerTimeIn = '+';
      } else if (this.newStage.triggerTimeReference === 'before_exitDate') {
        this.newStage.triggerTimeIn = '-';
      } else if (this.newStage.triggerTimeReference === 'after_exitDate') {
        this.newStage.triggerTimeIn = '+';
      }
    }
  },
  methods: {
    ...mapActions(['getCompanyUsers', 'getAdminList']),
    allowedStep: m => m % 5 === 0,
    goBack () {
      this.$router.push({
        path: '/settings?activeTab=milestones'
      });
    },
    discard () {
      if (this.newStage.id) {
        // delete stage
        axios.delete(`${process.env.VUE_APP_API_URL}stage/delete?stage_id=${this.newStage.id}`).then((response) => {
          if (response) {
            if (response.status === 204) {
              this.$store.dispatch('updateSnackbar', {
                color: 'success',
                show: true,
                text: 'Touchpoint discarded successfully!'
              });
              this.goBack();
            } else {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: 'Unable to discard touchpoint, Please try again later!'
              });
            }
            // this.templates = response.data.data;
          }
        }, (response) => {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to discard touchpoint, Please try again later!'
          });
          throw new Error(response);
        });
      } else {
        this.goBack();
      }
    },
    updateTimeUnitList () {
      if (this.newStage.triggerTimeDuration === 1) {
        this.timeUnits = JSON.parse(JSON.stringify(this.list.timeUnit));
        this.$lodash.each(this.timeUnits, (unit) => {
          unit.text = unit.text.slice(0, -1);
        });
      } else {
        this.timeUnits = this.list.timeUnit;
      }
    },
    proceed () {
      if (this.newStage.title && this.newStage.triggerTimeDuration && this.newStage.triggerTimeUnit) {
        this.unlockStepper = true;
        this.saveStage(true, true);
      }
    },
    previous () {
      if (this.$route.params && this.$route.params.stageId) {
        this.getStage(this.$route.params.stageId);
      }
      if (this.config.activeTab === 'survey') {
        this.config.activeTab = 'summary';
      } else if (this.config.activeTab === 'audience') {
        this.config.activeTab = 'survey';
        setTimeout(() => {
          if (this.$refs.survey) {
            this.$refs.survey.newStage = this.newStage;
            this.$refs.survey.addMoodQuestion();
            if (this.newStage.survey) {
              this.getSurvey(this.newStage.survey);
            }
          }
        });
      } else if (this.config.activeTab === 'configure') {
        this.config.activeTab = 'audience';
        setTimeout(() => {
          this.$lodash.each(this.newStage.audience, (v, k) => {
            if (v) {
              this.newStage.audience[`${k.split('__in')[0]}`] = v.split(',');
            }
            delete this.newStage.audience[k];
          });
          this.$refs.audienceList.newStage.audience = this.newStage.audience;
          this.$refs.audienceList.getFilters();
          this.$refs.audienceList.getTeam();
        }, 100);
      } else {
        this.config.activeTab = 'summary';
      }
    },
    next (continueFlag) {
      if (this.config.activeTab === 'summary') {
        this.saveStage(false, continueFlag);
      } else if (this.config.activeTab === 'survey') {
        if (this.$refs.survey.newSurvey.interactions && this.$refs.survey.newSurvey.interactions.length) {
          this.saveStage(false, continueFlag);
        } else {
          this.$store.dispatch('updateSnackbar', {
            show: true,
            text: 'Please design your touchpoint!',
            color: 'error'
          });
        }
      } else if (this.config.activeTab === 'audience') {
        if (this.$refs.audienceList && this.$refs.audienceList.newStage &&
        this.$refs.audienceList.newStage.audience && this.$refs.audienceList.newStage.totalAudienceCount) {
          this.saveStage(false, continueFlag);
        } else {
          this.$store.dispatch('updateSnackbar', {
            show: true,
            text: 'Please select audience for your touchpoint!',
            color: 'error'
          });
        }
      } else if (this.config.activeTab === 'configure') {
        this.$validator.validateAll().then((res) => {
          if (res) {
            this.saveStage(false, continueFlag);
          } else {
            this.$store.dispatch('updateSnackbar', {
              show: true,
              text: 'Please fill the mandatory details!',
              color: 'error'
            });
          }
        });
      }
    },
    capitaliseCampaignTitle () {
      this.newStage.title = this.newStage.title.charAt(0).toUpperCase() + this.newStage.title.slice(1);
    },
    checkLength () {
      if (this.newStage.title.length > 40) {

      }
    },
    openFilePicker (type) {
      this.$refs[type].click();
    },
    triggerUpdate () {
      this.$refs.audienceList.getTeam();
    },
    removeMember (index) {
      this.newStage.notifications.splice(index, 1);
    },
    // validateDetails() {
    //   let error = false;
    //   this.validate = {
    //     step1: true,
    //     step2: true,
    //   };

    //   if (!this.table.totalItems) {
    //     error = true;
    //     this.validate.step1 = false;
    //   }
    //   if (this.newStage.survey.id === null) {
    //     error = true;
    //     this.validate.step2 = false;
    //   }
    //   this.$validator.validateAll().then((res) => {
    //     if (!res || error) {
    //       this.$store.dispatch('updateSnackbar', {
    //         color: 'error',
    //         show: true,
    //         text: 'Fill all the mandatory fields!',
    //       });
    //     } else {
    //       this.saveStage(false, continueFlag);
    //     }
    //   });
    // },
    saveStage (editFlag, continueFlag) {
      if (this.config.activeTab === 'summary') {
        if (!this.newStage.id) {
          this.createStage();
        } else {
          this.updateStage(continueFlag);
        }
      } else if (this.config.activeTab === 'survey') {
        if (!this.$refs.survey || !this.$refs.survey.newSurvey || !this.$refs.survey.newSurvey.id) {
          this.createSurvey(continueFlag);
        } else {
          this.updateSurvey(continueFlag);
        }
      } else {
        this.updateStage(continueFlag);
      }
    },
    createStage () {
      this.config.savingStage = true;
      const newStageData = {
        title: this.newStage.title,
        status: 'draft',
        stageType: this.newStage.stageType,
        triggerTimeUnit: this.newStage.triggerTimeUnit,
        triggerTimeDuration: this.newStage.triggerTimeIn ? `${this.newStage.triggerTimeIn}${this.newStage.triggerTimeDuration}` : this.newStage.triggerTimeDuration,
        // triggerTimeIn: this.newStage.triggerTimeIn,
        triggerTimeReference: this.newStage.triggerTimeReference
      };
      axios.post(`${process.env.VUE_APP_API_URL}stage/add`, newStageData).then((response) => {
        this.config.savingStage = false;
        if (response && response.data && response.data.Response === 'Success') {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Stage created successfully!'
          });
          if (this.newStage.addAt) {
            // Add add the specified index
            this.stagesOrder.splice(this.newStage.addAt, 0, response.data.message);
            this.newStage.id = response.data.message;
            this.saveOrder(this.stagesOrder);
          } else {
            if (response.data.message) {
              this.config.activeTab = 'survey';
              this.$router.push({
                path: `/lifecycle/edit/${response.data.message}`
              });
              this.getStage(response.data.message);
              setTimeout(() => {
                if (this.$refs.survey) {
                  this.$refs.survey.newStage = this.newStage;
                  this.$refs.survey.addMoodQuestion();
                }
              }, 100);
            }
          }
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to create stage, Please try again later!'
          });
        }
      }, (response) => {
        this.config.savingStage = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to create stage, Please try again later!'
        });
        throw new Error(response);
      });
    },
    updateStage (continueFlag) {
      this.config.savingStage = true;
      let newStageData = {};
      if (this.config.activeTab === 'summary') {
        newStageData = {
          title: this.newStage.title,
          status: this.newStage.status || 'draft',
          stageType: this.newStage.stageType,
          triggerTimeUnit: this.newStage.triggerTimeUnit,
          triggerTimeDuration: this.newStage.triggerTimeIn ? `${this.newStage.triggerTimeIn}${this.newStage.triggerTimeDuration}` : this.newStage.triggerTimeDuration,
          // triggerTimeIn: this.newStage.triggerTimeIn,
          triggerTimeReference: this.newStage.triggerTimeReference
        };
      } else if (this.config.activeTab === 'survey') {
        newStageData = {
          survey_id: this.$refs.survey.newSurvey.id
        };
      } else if (this.config.activeTab === 'audience') {
        newStageData = {
          audience: JSON.parse(JSON.stringify(this.$refs.audienceList.newStage.audience))
        };
        this.$lodash.each(newStageData.audience, (v, k) => {
          if (v.length) {
            newStageData.audience[`${k}__in`] = v.join();
          }
          delete newStageData.audience[k];
        });
      } else {
        newStageData = {
          status: 'live',
          chatFromUser_id: this.newStage.chatFromUser,
          notifications: this.newStage.notifications
        };
      }
      axios.patch(`${process.env.VUE_APP_API_URL}stage/update/${this.newStage.id}`, newStageData).then((response) => {
        this.config.savingStage = false;
        if (response && response.data && response.data.status === 200) {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Stage updated successfully!'
          });
          this.unlockStepper = true;
          if (continueFlag) {
            this.getStage(this.newStage.id);
            if (this.config.activeTab === 'summary') {
              this.config.activeTab = 'survey';
              setTimeout(() => {
                if (this.$refs.survey) {
                  this.$refs.survey.newStage = this.newStage;
                  this.$refs.survey.addMoodQuestion();
                  if (this.newStage.survey) {
                    this.getSurvey(this.newStage.survey);
                  }
                }
              }, 100);
            } else if (this.config.activeTab === 'survey') {
              this.config.activeTab = 'audience';
              setTimeout(() => {
                this.$lodash.each(this.newStage.audience, (v, k) => {
                  if (v) {
                    this.newStage.audience[`${k.split('__in')[0]}`] = v.split(',');
                  }
                  delete this.newStage.audience[k];
                });
                this.$refs.audienceList.newStage.audience = this.newStage.audience;
                this.$refs.audienceList.getFilters();
                this.$refs.audienceList.getTeam();
              }, 100);
            } else if (this.config.activeTab === 'audience') {
              this.config.activeTab = 'configure';
            } else if (this.config.activeTab === 'configure') {
              this.goBack();
            } else {
              this.config.activeTab = 'summary';
            }
          } else {
            this.goBack();
          }
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update stage, Please try again later!'
          });
        }
      }, (response) => {
        this.config.savingStage = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update stage, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getSurvey (id) {
      const queryParams = {
        fields: 'title,type,description,company,createdAt,createdBy,lastUpdated,interactions'
      };
      axios.get(`${process.env.VUE_APP_API_URL}survey/${id}/details`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          this.$refs.survey.newSurvey = response.data;
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch survey, Please try again later!'
        });
        throw new Error(response);
      });
    },
    updateSurvey (continueFlag) {
      this.$refs.survey.newSurvey.title = this.newStage.title;
      if (this.$refs.survey.newSurvey.id) {
        axios.patch(`${process.env.VUE_APP_API_URL}survey/update/${this.$refs.survey.newSurvey.id}`, this.$refs.survey.newSurvey).then((response) => {
          this.refreshing = false;
          if (response && response.data && response.data.status === 200) {
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Survey updated successfully!'
            });
            // this.getStage(this.newStage.id);
            this.config.activeTab = 'audience';
            setTimeout(() => {
              this.$lodash.each(this.newStage.audience, (v, k) => {
                if (v) {
                  this.newStage.audience[`${k.split('__in')[0]}`] = v.split(',');
                }
                delete this.newStage.audience[k];
              });
              this.$refs.audienceList.newStage.audience = this.newStage.audience;
              this.$refs.audienceList.getFilters();
              this.$refs.audienceList.getTeam();
            }, 100);
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to update survey, Please try again later!'
            });
          }
        }, (response) => {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update survey, Please try again later!'
          });
          throw new Error(response);
        });
      }
    },
    createSurvey (continueFlag) {
      this.$refs.survey.newSurvey.title = this.newStage.title;
      axios.post(`${process.env.VUE_APP_API_URL}survey/add`, this.$refs.survey.newSurvey).then((response) => {
        this.refreshing = false;
        if (response && response.data && response.data.Response === 'Success') {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Survey created successfully!'
          });
          this.$refs.survey.newSurvey.id = response.data.survey_id;
          this.updateStage(continueFlag);
          // this.config.activeTab = 'audience';
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to create survey, Please try again later!'
          });
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to create survey, Please try again later!'
        });
        throw new Error(response);
      });
    },
    // saveStage() {
    //   this.config.savingStage = true;
    //   const newStageData = JSON.parse(JSON.stringify(this.newStage));
    //   this.$lodash.each(newStageData.audience, (v, k) => {
    //     newStageData.audience[`${k}__in`] = v.join();
    //     delete newStageData.audience[k];
    //   });
    //   newStageData.triggerDateTime = dayjs(`${newStageData.triggerDate} ${newStageData.triggerTime}`).format();
    //   axios.post(`${process.env.VUE_APP_API_URL}stage/add`, newStageData).then((response) => {
    //     this.config.savingStage = false;
    //     if (response && response.data && response.data.Response === 'Success') {
    //       this.$store.dispatch('updateSnackbar', {
    //         color: 'success',
    //         show: true,
    //         text: 'Stage created successfully!',
    //       });
    //       if (this.newStage.addAt) {
    //         // Add add the specified index
    //         this.stagesOrder.splice(this.newStage.addAt, 0, response.data.message);
    //         this.saveOrder(this.stagesOrder);
    //       } else {
    //         this.$router.push(this.$route.path.replace('/new', ''));
    //       }
    //     } else {
    //       this.$store.dispatch('updateSnackbar', {
    //         color: 'error',
    //         show: true,
    //         text: 'Unable to create stage, Please try again later!',
    //       });
    //     }
    //   }, (response) => {
    //     this.config.savingStage = false;
    //     this.$store.dispatch('updateSnackbar', {
    //       color: 'error',
    //       show: true,
    //       text: 'Unable to create stage, Please try again later!',
    //     });
    //     throw new Error(response);
    //   });
    // },
    saveOrder (order) {
      axios.patch(`${process.env.VUE_APP_API_URL}stage/update_stage_timeline`, { stage_timeline: order })
        .then((response) => {
          this.config.activeTab = 'survey';
          this.$router.push({
            path: `/lifecycle/edit/${this.newStage.id}`
          });
        }, (response) => {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to create stage, Please try again later!'
          });
          throw new Error(response);
        });
    },
    getAvatar (c) {
      const avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      return avt.toUpperCase();
    },
    getName (key) {
      let name;
      switch (key) {
        case 'currentPosition':
          name = 'Current Position';
          break;

        default:
          name = key.charAt(0).toUpperCase() + key.slice(1);
      }
      return name;
    },
    getStage (id) {
      const queryParams = {
        fields: 'title,type,status,survey,survey_title,chatFromUser,notifications,stage_details,audience,triggerTimeDuration,triggerTimeUnit,triggerTimeReference,triggerDateTime,stageType'
      };
      axios.get(`${process.env.VUE_APP_API_URL}stage/${id}/details`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          const stageData = response.data.stage_details;
          // stageData.survey = {
          //   id: stageData.survey,
          //   title: stageData.survey_title,
          // };
          this.newStage = stageData;
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch stage, Please try again later!'
        });
        throw new Error(response);
      });
    }
  },
  watch: {
    pagination: {
      handler () {
        if (!this.config.initialLoading) {
          this.$refs.audienceList.getTeam();
        }
      },
      deep: true
    },
    config: {
      handler () {
        if (this.config.searchMember) {
          this.config.searchMember.reports = true;
          this.config.searchMember.notifications = true;
          this.newStage.notifications.push(this.config.searchMember);
          setTimeout(() => {
            this.config.searchMember = '';
            this.config.savingStageEmployees = false;
          }, 50);
        }
      },
      deep: true
    }
  },
  beforeMount () {
    // switch (this.$route.path) {
    //   case '/lifecycle/new':
    //     this.config.stageType = 'lifecycle';
    //     this.newStage.stageType = 'lifecycle';
    //     if (this.$route.query && this.$route.query.addAt) {
    //       this.newStage.addAt = parseInt(this.$route.query.addAt, 10);
    //     }
    //     break;
    //   default:
    // }
    this.config.stageType = 'lifecycle';
    this.newStage.stageType = 'lifecycle';
    if (this.$route.query && this.$route.query.addAt) {
      this.newStage.addAt = parseInt(this.$route.query.addAt, 10);
    }
    if (this.$route.params && this.$route.params.stageId) {
      this.getStage(this.$route.params.stageId);
    }
    this.getAdminList();
    this.getCompanyUsers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.survey-cards {
  .v-card__text {
    height: 8em;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
.intrct-block {
  border-radius: 4px;
  height: 5.5em;
  overflow-y: auto;
}
</style>
