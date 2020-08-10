<template>
  <div class="adhoc-app">
    <div class="flex-column d-flex w-100">

      <!-- Stepper actions -->
      <div class="b-bottom d-flex flex-row flex-wrap w-100" v-if="unlockStepper">
        <v-flex xs4 class="d-inline-flex">
          <v-tooltip bottom style="min-width:70px">
            <template v-slot:activator="{ on }">
            <v-btn color="grey" class="elevation-0 my-0 text-xs-right back-button b-right"
              @click="previous()"
              style="position:relative;top:5px;margin-left:22px;"
              slot="activator"
              text fab
              v-on="on"
              v-if="config.activeTab !== 'summary'"
              :loading="config.savingStage"
              :disabled="config.savingStage"
            >
              <v-icon> fas fa-arrow-left </v-icon>
            </v-btn>
            </template>
            Back
          </v-tooltip>

          <v-text-field
            class="campaign-title campaign-title-top"
            validate-on-blur
            @change="capitaliseCampaignTitle()"
            v-model="newCampaign.title"
            name="campaign title"
            maxlength="40"
            label=""
            color="#4c3e9d"
            single-line
            placeholder="Campaign Title (max 40 characters)"
          ></v-text-field>
        </v-flex>
        <v-flex xs8 class="text-right">
          <v-tooltip bottom class="">
            <template v-slot:activator="{ on }">
            <v-btn color="red" class="elevation-0 ml-0 text-xs-right back-button"
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

          <v-btn color="orange" class="elevation-0 white--text text-none text-xs-right"
            style="position:relative;top:5px"
            @click="saveAsDraft(true)"
            text outlined
          >
            Save as draft
          </v-btn>

          <v-btn color="adhoc" class="elevation-0 white--text text-xs-right"
            style="position:relative;top:5px"
            @click="next()"
            v-if="config.activeTab !== 'preview'"
          >
            Continue
          </v-btn>
          <v-btn color="primary" class="elevation-0 white--text text-none text-xs-right"
            style="position:relative;top:5px"
            @click="scheduleCampaign()"
            v-if="config.activeTab === 'preview'"
            :loading="config.savingStage"
            :disabled="config.savingStage"
          >
            Schedule campaign
          </v-btn>
          <v-btn color="adhoc" class="elevation-0 text-none white--text text-xs-right"
            style="position:relative;top:5px"
            @click="activateCampaign()"
            v-if="config.activeTab === 'preview'"
            :loading="config.savingStage"
            :disabled="config.savingStage"
          >
            Launch campaign
          </v-btn>
        </v-flex>
      </div>

      <!-- Stepper Tabs -->
      <div class="d-flex flex-row flex-wrap b-bottom" v-if="unlockStepper">
        <v-flex xs8>
          <v-tabs
            style=""
            v-model="config.activeTab"
            centered
            class="text-xs-center px-3 stepper-step-title create-campaign"
            :class="config.activeTab === 'preview' ? 'last-step' : '' "
            color="primary"
            slider-color="#4c3e9d"
            height="fit-content"
          >
            <v-tab
              class="stepper-step py-3"
              v-for="(t, ti) in config.tabs"
              :key="ti"
              disabled
              :href="`#${t.value}`"
            >
              <strong> {{t.title}} </strong> &nbsp; &nbsp; &nbsp;
              <v-icon small v-show="ti < (config.tabs.length - 1)">fas fa-arrow-right</v-icon>
            </v-tab>
          </v-tabs>
        </v-flex>
      </div>

      <!-- Summary view outside Stepper -->
      <div class="w-100 d-flex flex-row flex-wrap" v-if="!unlockStepper">
        <!-- <v-layout row wrap class="firstStep" style="position:absolute;top:5vh;left:4vw;width:100%; overflow-y:auto; "> -->
        <div class="firstStep d-flex flex-row flex-wrap w-100">
          <v-flex xs3></v-flex>
          <v-flex xs6 class="text-xs-left d-inline-flex">
            <div>
              <h2> Share your campaign idea</h2>
              <!--<h4 class="grey--text"> Let us know little bit more about your campaign. This information will help us personalise your campaign.</h4>-->
              <v-text-field
                class="campaign-title mt-3"
                validate-on-blur
                @change="capitaliseCampaignTitle()"
                v-model="newCampaign.title"
                name="campaign title"
                maxlength="40"
                outlined
                label="Campaign title *"
                placeholder="max 40 characters"
              ></v-text-field>

              <v-select
                style="width:100%"
                :items="campaignCategories"
                label="Category *"
                text outlined
                v-model="newCampaign.category"
                placeholder="Select from dropdown"
              >
              <template slot="item" slot-scope="data">
                <div class="d-flex flex-row flex-wrap" v-if="data.item.disabled">
                  <v-flex xs6>
                    {{ data.item.text }}
                  </v-flex>
                  <v-flex xs6 class="text-xs-right adhoc--text">
                    Not Active
                  </v-flex>
                </div>
                <span v-if="!data.item.disabled && !data.item.beta"> {{ data.item.text }} </span>
              </template>
              </v-select>

              <v-text-field
                validate-on-blur
                v-if="newCampaign.category === 'others'"
                v-model="newCampaign.categoryValue"
                name="others category"
                single-line
                text outlined
                label="Specify Category *"
                placeholder="Specify category"
              ></v-text-field>

              <v-flex xs12 class="mt-2 pt-0 adhoc-campaign-objectives">
                <h2 class=""> Objectives </h2>

                <v-textarea
                  label="Campaign Objectives"
                  placeholder="Objectives"
                  v-model="newCampaign.objectives"
                  outlined text
                  single-line
                  @click.stop
                ></v-textarea>
              </V-flex>

              <div class="text-xs-center mt-2">
                <v-btn color="#4c3e9d" class="elevation-0 white--text"
                  @click="proceed()"
                  :disabled="!newCampaign.title || !newCampaign.category"
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
      <div class="d-flex flex-row flex-wrap" v-if="unlockStepper">
        <v-flex>
          <v-tabs-items v-model="config.activeTab" height="fit-content">
            <!-- Summary Tab content -->
            <v-tab-item class="stepper-step-content" value="summary" v-if="config.activeTab === 'summary'">
              <div class="mb-3 step-content d-flex flex-row flex-wrap">
                <v-flex xs3></v-flex>
                <v-flex xs6 class="text-xs-left d-inline-flex">
                  <div>
                    <v-text-field
                      class="campaign-title mt-3"
                      validate-on-blur
                      @change="capitaliseCampaignTitle()"
                      v-model="newCampaign.title"
                      name="campaign title"
                      maxlength="40"
                      outlined
                      label="Campaign Title *"
                      placeholder="max 40 characters"
                    ></v-text-field>

                    <v-select
                      style="width:100%"
                      :items="campaignCategories"
                      label="Category *"
                      text outlined
                      v-model="newCampaign.category"
                      placeholder="Select from dropdown"
                    >
                    </v-select>

                    <v-text-field
                      validate-on-blur
                      v-if="newCampaign.category === 'others'"
                      v-model="newCampaign.categoryValue"
                      name="others category"
                      single-line
                      text outlined
                      label="Specify Category *"
                      placeholder="Specify category"
                    ></v-text-field>
                  </div>
                </v-flex>
                <v-flex xs3></v-flex>

                <v-flex xs3></v-flex>
                <v-flex xs6 class="mt-2 pt-0 adhoc-campaign-objectives">
                  <h2 class=""> Objectives </h2>

                  <v-textarea
                    label="Campaign Objectives"
                    placeholder="Objectives"
                    v-model="newCampaign.objectives"
                    outlined text
                    single-line
                    @click.stop
                  ></v-textarea>
                </V-flex>
                <v-flex xs3></v-flex>
              </div>
            </v-tab-item>

            <!-- Survey Tab content -->
            <v-tab-item class="stepper-step-content" value="survey" v-if="config.activeTab === 'survey'">
              <div class="mb-3 step-content overflow-y-hidden d-flex flex-row flex-wrap">
                <v-flex xs12 class="text-xs-left d-inline-flex maximum-step-content">
                  <div class="maximum-step-content d-flex flex-row">
                    <v-flex xs3 class="px-0 ml-3 maximum-step-content">
                      <h3 class="subheading pt-2 mb-2 pl-1"> Design the chat flow </h3>
                      <div style="border:1px solid lightgrey;overflow-y:auto;height:90%">
                        <!--<h3 class="subheading mt-3 pt-3 pl-1">Question Bank</h3>
                        <h2 class="grey--text subheading b-bottom pl-1">Choose a source for your questions</h2>-->
                        <div class="flex-row flex-wrap mt-0">
                          <div class="flex px-1 py-2 sm12 mt-2 b-bottom d-inline-flex w-100 cursor-pointer question-type"
                          @click="updateQuestionSource('campaign')">
                            <v-icon color="adhoc" small class="mt-0 mr-3" style="max-width:40px">fa fa-copy</v-icon>
                            <span class="darken-1" style="font-size:16px">
                              Select questions from existing campaigns
                            </span>
                          </div>
                        </div>

                        <h3 class="subheading mt-3 pt-3 pl-1"> <strong> Draft a new question </strong></h3>
                        <h2 class="grey--text subheading b-bottom pl-1">Select a category to add a new question</h2>
                        <!--<h3 class="subheading pt-2 mb-2 pl-1">Bot Responses/Questions</h3>-->
                        <div class="d-flex flex-row flex-wrap mt-0">
                          <div class="flex px-1 py-2 sm12 mt-2 b-bottom cursor-pointer question-type"
                          v-for="(b, bi) in welcome" :key="bi" @click="updateQuestion(b)">
                            <div class="d-inline-flex w-100">
                              <v-icon color="adhoc" small class="mt-0 mr-3" style="max-width:40px;">{{b.img}}</v-icon>
                              <span class="darken-1" style="font-size:16px">
                                {{b.title}}
                              </span>
                            </div>
                            <div class="d-inline-flex ml-4">
                              <v-icon small class="mt-0 mr-3 ml-3" style="max-width:40px;"></v-icon>
                              <span class="grey--text" style="font-size:10px;margin-left:18px">
                                {{b.description}}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="flex-row flex-wrap d-flex mt-0">
                          <div class="flex px-1 py-2 sm12 mt-2 b-bottom cursor-pointer question-type"
                          v-for="(b, bi) in multipleChoice" :key="bi" @click="updateQuestion(b)">
                            <div class="d-inline-flex w-100">
                              <v-icon color="adhoc" small class="mt-0 mr-3" style="max-width:40px;">{{b.img}}</v-icon>
                              <span class="darken-1" style="font-size:16px">
                                {{b.title}}
                              </span>
                            </div>
                            <div class="d-inline-flex ml-4">
                              <v-icon small class="mt-0 mr-3" style="max-width:40px;"></v-icon>
                              <span class="grey--text" style="font-size:10px;margin-left:18px">
                                {{b.description}}
                              </span>
                            </div>
                          </div>
                        </div>

                        <!--<h3 class="subheading pt-2 mb-2 pl-1">Emoji scale</h3>-->
                        <div class="flex-row flex-wrap d-flex mt-0">
                          <div class="flex px-1 py-2 sm12 mt-2 b-bottom cursor-pointer question-type"
                          @click="updateQuestion(config.emojiScale)">
                            <div class="d-inline-flex w-100">
                              <v-icon color="adhoc" small class="mt-0 mr-3" style="max-width:40px;">{{config.emojiScale.img}}</v-icon>
                              <span class="darken-1" style="font-size:16px">
                                {{config.emojiScale.title}}
                              </span>
                            </div>
                            <div class="d-inline-flex ml-4">
                              <v-icon small class="mt-0 mr-3" style="max-width:40px;"></v-icon>
                              <span class="grey--text " style="font-size:10px;margin-left:18px">
                                {{config.emojiScale.description}}
                              </span>
                            </div>
                          </div>
                        </div>

                        <!--<h3 class="subheading pt-2 mb-2 pl-1">Responses/Questions with Driver</h3>-->
                        <div class="d-flex flex-row flex-wrap mt-0">
                          <div class="flex px-1 py-2 sm12 mt-2 b-bottom cursor-pointer question-type"
                          v-for="(b, bi) in questionTypesD" :key="bi" @click="updateQuestion(b)">
                            <div class="d-inline-flex w-100">
                              <v-icon color="adhoc" small class="mt-0 mr-3" style="max-width:40px;">{{b.img}}</v-icon>
                              <span class="darken-1" style="font-size:16px">
                                {{b.title}}
                              </span>
                            </div>
                            <div class="d-inline-flex ml-4 ">
                              <v-icon small class="mt-0 mr-3" style="max-width:40px;"></v-icon>
                              <span class="grey--text " style="font-size:10px;margin-left:18px">
                                {{b.description}}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="d-flex flex-row flex-wrap mt-0">
                          <div class="flex px-1 py-2 sm12 mt-2 b-bottom cursor-pointer question-type"
                          v-for="(b, bi) in questionTypes" :key="bi" @click="updateQuestion(b)">
                            <div class="d-inline-flex w-100">
                              <v-icon color="adhoc" small class="mt-0 mr-3" style="max-width:40px;">{{b.img}}</v-icon>
                              <span class="darken-1" style="font-size:16px">
                                {{b.title}}
                              </span>
                            </div>
                            <div class="d-inline-flex ml-4">
                              <v-icon small class="mt-0 mr-3" style="max-width:40px;"></v-icon>
                              <span class="grey--text" style="font-size:10px;margin-left:18px">
                                {{b.description}}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="flex-row flex-wrap d-flex mt-0">
                          <div class="flex px-1 py-2 sm12 mt-2 b-bottom cursor-pointer question-type"
                          v-for="(b, bi) in statements" :key="bi" @click="updateQuestion(b)">
                            <div class="d-inline-flex w-100">
                              <v-icon color="adhoc" small class="mt-0 mr-3" style="max-width:40px;">{{b.img}}</v-icon>
                              <span class="darken-1" style="font-size:16px">
                                {{b.title}}
                              </span>
                            </div>
                            <div class="d-inline-flex ml-4 ">
                              <v-icon small class="mt-0 mr-3" style="max-width:40px;"></v-icon>
                              <span class="grey--text " style="font-size:10px;margin-left:18px">
                                {{b.description}}
                              </span>
                            </div>
                          </div>
                        </div>

                        <!--<h3 class="subheading mt-3 pt-3 pl-1"> <strong> Draft Amara's statement </strong></h3>-->
                        <!--<h2 class="grey--text subheading b-bottom pl-1">Choose a question type to add new question</h2>-->
                      </div>
                    </v-flex>

                    <v-flex xs9 class="maximum-step-content" style="overflow-y:auto">
                      <v-card height="220" class="text-xs-center pt-5 ma-5 elevation-0"
                      v-if="newSurvey.interactions.length === 0 && !drag.startDragging">
                        <v-icon large color="#4c3e9d">fas fa-hand-paper</v-icon>
                        <p class="headline font-weight-bold mt-4">No questions added</p>
                        <span>Select question type or question to create survey.</span>
                      </v-card>

                      <!-- <Container group-name="1"
                        @drop="onDrop($event)"
                        :drag-end="onDragEnd"
                        :get-child-payload="getIPayload"
                        drag-handle-selector=".handle"
                      >
                        <Draggable v-for="(q, qi) in newSurvey.interactions" :key="qi"> -->
                          <draggable v-for="(q, qi) in newSurvey.interactions" :key="qi" group="people" @start="drag=true" @end="drag=false">
                          <v-card height="220" class="draggable-item text-xs-center pt-5 ma-5 elevation-0"
                            v-if="drag.startDragging && !drag.droppingNow &&
                            newSurvey.interactions.length === 0"
                            key="blank-response"
                          >
                            <v-icon large color="success">fas fa-thumbs-up</v-icon>
                            <p class="headline font-weight-bold mt-4">You are doing great!</p>
                            <span>Now drop the action here.</span>
                          </v-card>
                          <div class="draggable-item" style="position:unset;">
                            <v-flex class="pr-2 px-5 mb-4 action-card text-xs-center"
                              sm12 style="position:relative;"
                            >
                              <v-card class="mb-1 elevation-0">
                                <div class="d-flex flex-row flex-wrap" style="min-height:48px">
                                  <v-flex xs2 class="mt-2 text-xs-left ml-5">
                                    <span>
                                      <!-- <v-layout column class="actions" :style="getDragPosition(q.type)"> -->
                                      <div class="d-flex flex-column actions">
                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on }">
                                            <v-icon color="grey" class="mb-3 handle" slot="activator" v-on="on">
                                              fas fa-arrows-alt
                                            </v-icon>
                                          </template>
                                          Move
                                        </v-tooltip>
                                      </div>
                                    </span>
                                    <span>Q{{qi+1}}</span>
                                  </v-flex>
                                  <v-spacer></v-spacer>
                                  <v-flex xs2>
                                    <div class="d-flex">
                                      <v-flex xs4>
                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on }">
                                          <v-icon v-on="on" color="grey" class="mt-3" @click="editAction(q, qi, true)" slot="activator">
                                            fas fa-edit
                                          </v-icon>
                                          </template>
                                          Edit
                                        </v-tooltip>
                                      </v-flex>
                                      <v-flex xs4>
                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on }">
                                          <v-icon v-on="on" color="grey" class="mt-3" @click="deleteAction(qi)" slot="activator">
                                            fas fa-trash
                                          </v-icon>
                                          </template>
                                          Delete
                                        </v-tooltip>
                                      </v-flex>
                                      <v-flex xs4>
                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on }">
                                          <v-icon v-on="on" color="grey" class="mt-3" @click="duplicateAction(q)" slot="activator">
                                            fas fa-copy
                                          </v-icon>
                                          </template>
                                          Copy
                                        </v-tooltip>
                                      </v-flex>
                                    </div>
                                  </v-flex>
                                  <v-flex xs12>
                                    <v-divider></v-divider>
                                  </v-flex>
                                </div>

                                <div class="pt-4 pa-3 d-flex flex-row flex-wrap align-center">

                                  <!-- Scale -->
                                  <v-flex class="" xs10 offset-xs1 v-if="q.type === 'scale'">
                                    <v-text-field
                                      v-if="q.msg"
                                      maxlength="300"
                                      v-model="q.msg[0].text"
                                      class="elevation-0 grey--text text--lighten-2"
                                      name="interactionText"
                                      :error-messages="errors.collect('interactionText')"
                                      label="Please type your question"
                                      autofocus
                                      data-vv-as="interaction text"
                                      v-validate="'required'"
                                      single-line
                                      disabled
                                      outlined
                                    >
                                    <v-fade-transition slot="prepend">
                                        <img width="30" height="30"
                                        :src="getImgUrl('amara-60')">
                                      </v-fade-transition>
                                    </v-text-field>

                                    <div class="d-flex flex-row flex-wrap justify-center"
                                    v-if="q.msg && q.msg[0].scaleType === 'emoji'">
                                      <v-flex xs2 class="text-xs-center"
                                      v-for="(r, ri) in q.msg[0].scale" :key="ri">
                                        <v-menu
                                          absolute
                                          disabled
                                          offset-y
                                          style="max-width: 600px"
                                        >
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-btn class="emoji-btn"
                                              slot="activator"
                                              fab text rounded disabled
                                              v-bind="attrs" v-on="on"
                                            >
                                              <img v-if="r.img" :src="getImgUrl(r.img)"
                                              class="emoji-container" />
                                            </v-btn>
                                          </template>
                                          <v-list class="pa-3">
                                            <v-text-field
                                              class="grey--text text--lighten-2"
                                              maxlength="50"
                                              outlined
                                              v-model="r.title"
                                              text
                                              @click.stop
                                              name="quickReply"
                                              :label="`Rating ${ri+1}`"
                                              disabled
                                            ></v-text-field>

                                            <v-text-field
                                              class="grey--text text--lighten-2"
                                              maxlength="300"
                                              outlined
                                              v-model="r.postback"
                                              text
                                              @click.stop
                                              name="postback"
                                              label="Amara's response"
                                              disabled
                                            ></v-text-field>

                                            <v-flex xs12 class="text-xs-right">
                                              <v-btn color="#4c3e9d" class="white--text" small disabled>Done</v-btn>
                                            </v-flex>
                                          </v-list>
                                        </v-menu>
                                        <p class="text-xs-center grey--text">
                                          {{r.title}}
                                        </p>
                                      </v-flex>
                                    </div>

                                    <div class="d-flex flex-row flex-wrap justify-center"
                                    v-if="q.msg && q.msg[0].scaleType === 'number'">
                                      <v-flex xs2 class="text-xs-center"
                                      v-for="(r, ri) in q.msg[0].scale" :key="ri">
                                        <v-menu
                                          absolute
                                          offset-y
                                          disabled
                                          style="max-width: 600px"
                                        >
                                        <template v-slot:activator="{ on, attrs }">
                                          <v-btn class="emoji-btn"
                                            :color="r.color"
                                            style="min-width:50px; min-height:50px;"
                                            fab
                                            outlined
                                            rounded
                                            disabled
                                            v-bind="attrs" v-on="on"
                                          >
                                            <strong class="headline grey--text">
                                              {{r.value}}
                                            </strong>
                                          </v-btn>
                                        </template>
                                          <v-list class="pa-3">
                                            <v-text-field
                                              class="grey--text text--lighten-2"
                                              maxlength="50"
                                              outlined
                                              v-model="r.title"
                                              text
                                              disabled
                                              @click.stop
                                              name="quickReply"
                                              :label="`Rating ${ri+1}`"
                                            ></v-text-field>

                                            <v-text-field
                                              class="grey--text text--lighten-2"
                                              maxlength="300"
                                              outlined
                                              v-model="r.postback"
                                              text
                                              disabled
                                              @click.stop
                                              name="postback"
                                              label="Amara's response"
                                            ></v-text-field>

                                            <v-flex xs12 class="text-xs-right">
                                              <v-btn color="#4c3e9d"  class="white--text" small disabled>Done</v-btn>
                                            </v-flex>
                                          </v-list>
                                        </v-menu>
                                        <p class="text-xs-center grey--text">
                                          {{r.title}}
                                        </p>
                                      </v-flex>
                                    </div>
                                  </v-flex>

                                  <!-- Input from user -->
                                  <v-flex class="" xs10 offset-xs1 v-if="q.type === 'textInput'">
                                    <v-text-field
                                      maxlength="300"
                                      v-model="q.msg['0'].text"
                                      class="elevation-0 grey--text text--lighten-2"
                                      :name="`interactionText_${qi}`"
                                      :error-messages="errors.collect(`interactionText_${qi}`)"
                                      label="Please type your question"
                                      autofocus
                                      disabled
                                      data-vv-as="interaction text"
                                      v-validate="'required'"
                                      single-line
                                      outlined
                                    >
                                      <v-fade-transition slot="prepend">
                                        <img width="30" height="30"
                                        :src="getImgUrl('amara-60')">
                                      </v-fade-transition>
                                    </v-text-field>
                                  </v-flex>

                                  <!-- Text -->
                                  <v-flex class="offset-1" xs10 offset-xs1 v-if="q.type === 'text'">
                                    <v-text-field
                                      maxlength="300"
                                      v-model="q.msg['0'].text"
                                      class="elevation-0 grey--text text--lighten-2"
                                      :name="`interactionText_${qi}`"
                                      :error-messages="errors.collect(`interactionText_${qi}`)"
                                      label="What should Amara say?"
                                      autofocus
                                      disabled
                                      data-vv-as="interaction text"
                                      v-validate="'required'"
                                      single-line
                                      outlined
                                    >
                                      <v-fade-transition slot="prepend">
                                        <img width="30" height="30"
                                        :src="getImgUrl('amara-60')">
                                      </v-fade-transition>
                                    </v-text-field>
                                  </v-flex>

                                  <!-- Image -->
                                  <v-flex class="" v-if="q.type === 'image'">
                                    <v-menu
                                      absolute
                                      v-if="q.msg"
                                      offset-y
                                      style="max-width: 600px"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-img
                                          height="200"
                                          width="300"
                                          slot="activator"
                                          v-bind="attrs" v-on="on"
                                          max-height="200"
                                          max-width="300"
                                          v-if="q.msg"
                                          :src="q.msg[0].imgUrl"
                                          :lazy-src="q.msg[0].imgUrl"
                                          aspect-ratio="1"
                                          class="grey lighten-2 mx-auto"
                                        >
                                          <div
                                            class="d-flex"
                                            slot="placeholder"
                                            fill-height
                                            align-center
                                            justify-center
                                            ma-0
                                          >
                                            <div class="">
                                              <v-icon class="mr-2">fas fa-plus-square</v-icon>
                                              <strong class="mb-2">
                                                Add Image
                                              </strong>
                                            </div>
                                            <v-progress-circular v-show="q.msg && q.msg[0].imgUrl"
                                            indeterminate color="grey lighten-5">
                                            </v-progress-circular>
                                          </div>
                                        </v-img>
                                      </template>
                                      <v-list class="pa-3">
                                        <v-text-field
                                          maxlength="1000"
                                          outlined
                                          v-if="q.msg"
                                          v-model="q.msg[0].imgUrl"
                                          text
                                          disabled
                                          @click.stop
                                          name="url"
                                          label="Your image URL"
                                        ></v-text-field>
                                        <v-flex xs12 class="text-xs-right">
                                          <v-btn color="#4c3e9d"  class="white--text" small disabled>Done</v-btn>
                                        </v-flex>
                                      </v-list>
                                    </v-menu>
                                  </v-flex>

                                  <!-- Card -->
                                  <v-flex class="" v-if="q.type === 'card'">
                                    <v-card class="mx-auto" width="300"
                                      v-for="(c, ci) in q.msg" :key="ci"
                                    >
                                      <v-menu
                                        absolute
                                        offset-y
                                        style="max-width: 600px"
                                      >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-img
                                          height="200"
                                          width="300"
                                          slot="activator"
                                          v-bind="attrs" v-on="on"
                                          max-height="200"
                                          max-width="300"
                                          :src="c.imgUrl"
                                          :lazy-src="c.imgUrl"
                                          aspect-ratio="1"
                                          class="grey lighten-2 mx-auto"
                                        >
                                          <div
                                            class="d-flex"
                                            slot="placeholder"
                                            fill-height
                                            align-center
                                            justify-center
                                            ma-0
                                          >
                                            <div class="">
                                              <v-icon class="mr-2">fas fa-plus-square</v-icon>
                                              <strong class="mb-2">
                                                Add Image
                                              </strong>
                                            </div>
                                            <v-progress-circular v-show="c.imgUrl"
                                            indeterminate color="grey lighten-5">
                                            </v-progress-circular>
                                          </div>
                                        </v-img>
                                        </template>
                                        <v-list class="pa-3">
                                          <v-text-field
                                            maxlength="1000"
                                            outlined
                                            v-model="c.imgUrl"
                                            text
                                            disabled
                                            @click.stop
                                            name="url"
                                            label="Your image URL"
                                          ></v-text-field>
                                          <v-flex xs12 class="text-xs-right">
                                            <v-btn color="#4c3e9d"  class="white--text" small disabled>Done</v-btn>
                                          </v-flex>
                                        </v-list>
                                      </v-menu>
                                      <h3 class="headline mb-0 font-weight-bold w-100">
                                        <v-text-field
                                          maxlength="300"
                                          solo
                                          v-model="c.text"
                                          text
                                          disabled
                                          @click.stop
                                          name="cardTitle"
                                          label="Enter your message here"
                                        ></v-text-field>
                                      </h3>
                                      <div>
                                        <v-textarea
                                          maxlength="500"
                                          text
                                          rows="2"
                                          solo
                                          disabled
                                          v-model="c.description"
                                          name="cardDescription"
                                          label="Enter card description here"
                                        ></v-textarea>
                                      </div>

                                      <v-card-actions>
                                        <div class="text-xs-left">
                                          <v-menu v-for="(r, ri) in c.quickReplies" :key="ri"
                                            absolute
                                            offset-y
                                            disabled
                                            class="mb-1"
                                            style="width: 20em;"
                                          >
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="#4c3e9d"
                                              v-bind="attrs" v-on="on"
                                              block outlined slot="activator"
                                            >
                                            {{r.title}}</v-btn>
                                            </template>
                                            <v-list class="pa-3">
                                              <v-text-field
                                                class="grey--text text--lighten-2"
                                                maxlength="50"
                                                outlined
                                                v-model="r.title"
                                                text
                                                disabled
                                                @click.stop
                                                name="quickReply"
                                                :label="`Rating ${ri+1}`"
                                              ></v-text-field>

                                              <v-text-field
                                                class="grey--text text--lighten-2"
                                                maxlength="300"
                                                outlined
                                                v-model="r.postback"
                                                text
                                                disabled
                                                @click.stop
                                                name="postback"
                                                label="Amara's response"
                                              ></v-text-field>

                                              <v-flex xs12 class="text-xs-right">
                                                <v-btn color="error" small text disabled
                                                @click="deleteReply(qi, ci, ri)">Delete</v-btn>
                                                <v-btn color="#4c3e9d"  class="white--text" small disabled>Done</v-btn>
                                              </v-flex>
                                            </v-list>
                                          </v-menu>

                                          <!-- Add new quick reply -->
                                          <p class="cursor-pointer mb-0 text-sm-center"
                                          v-if="c.quickReplies.length < 5"
                                          style="width: 20em;" @click="addReplies(qi, ci, 'Button')">
                                            <v-btn color="accent" class="mr-2" small outlined icon disabled>
                                              <v-icon small>fas fa-plus</v-icon>
                                            </v-btn>Add reply
                                          </p>
                                        </div>
                                      </v-card-actions>
                                    </v-card>
                                  </v-flex>

                                  <!-- Carousel -->
                                  <v-flex class="" v-if="q.type === 'carousel'">
                                    <div class="d-flex flex-row flex-wrap">
                                      <v-card class="mr-3" width="300"
                                        v-for="(c, ci) in q.msg" :key="ci"
                                      >
                                        <v-menu
                                          absolute
                                          disabled
                                          offset-y
                                          style="max-width: 600px"
                                        >
                                        <template v-slot:activator="{ on, attrs }">
                                          <v-img
                                            height="200"
                                            width="300"
                                            slot="activator"
                                            v-bind="attrs" v-on="on"
                                            max-height="200"
                                            max-width="300"
                                            :src="c.imgUrl"
                                            :lazy-src="c.imgUrl"
                                            aspect-ratio="1"
                                            class="grey lighten-2 mx-auto"
                                          >
                                            <div
                                              class="d-flex"
                                              slot="placeholder"
                                              fill-height
                                              align-center
                                              justify-center
                                              ma-0
                                            >
                                              <div class="">
                                                <v-icon class="mr-2">fas fa-plus-square</v-icon>
                                                <strong class="mb-2">
                                                  Add Image
                                                </strong>
                                              </div>
                                              <v-progress-circular v-show="c.imgUrl"
                                              indeterminate color="grey lighten-5">
                                              </v-progress-circular>
                                            </div>
                                          </v-img>
                                          </template>
                                          <v-list class="pa-3">
                                            <v-text-field
                                              maxlength="1000"
                                              outlined
                                              v-model="c.imgUrl"
                                              text
                                              disabled
                                              @click.stop
                                              name="url"
                                              label="Your image URL"
                                            ></v-text-field>
                                            <v-flex xs12 class="text-xs-right">
                                              <v-btn color="#4c3e9d"  class="white--text" small disabled>Done</v-btn>
                                            </v-flex>
                                          </v-list>
                                        </v-menu>
                                        <h3 class="headline mb-0 font-weight-bold w-100">
                                          <v-text-field
                                            maxlength="300"
                                            solo
                                            v-model="c.text"
                                            text
                                            disabled
                                            @click.stop
                                            name="cardTitle"
                                            label="Enter your message here"
                                          ></v-text-field>
                                        </h3>
                                        <div>
                                          <v-textarea
                                            maxlength="500"
                                            text
                                            disabled
                                            rows="2"
                                            solo
                                            v-model="c.description"
                                            name="cardDescription"
                                            label="Enter card description here"
                                          ></v-textarea>
                                        </div>

                                        <v-card-actions>
                                          <div class="text-xs-left">
                                            <v-menu v-for="(r, ri) in c.quickReplies" :key="ri"
                                              absolute
                                              offset-y
                                              class="mb-1"
                                              style="width: 20em;"
                                            >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="#4c3e9d"
                                                  block outlined slot="activator"
                                                  v-bind="attrs" v-on="on"
                                                >
                                                  {{r.title}}
                                                </v-btn>
                                              </template>
                                              <v-list class="pa-3">
                                                <v-text-field
                                                  class="grey--text text--lighten-2"
                                                  maxlength="50"
                                                  outlined
                                                  v-model="r.title"
                                                  text
                                                  disabled
                                                  @click.stop
                                                  name="quickReply"
                                                  :label="`Rating ${ri+1}`"
                                                ></v-text-field>

                                                <v-text-field
                                                  class="grey--text text--lighten-2"
                                                  maxlength="300"
                                                  outlined
                                                  v-model="r.postback"
                                                  text
                                                  disabled
                                                  @click.stop
                                                  name="postback"
                                                  label="Amara's response"
                                                ></v-text-field>

                                                <v-flex xs12 class="text-xs-right">
                                                  <v-btn color="error" small text
                                                  @click="deleteReply(qi, ci, ri)" disabled>Delete</v-btn>
                                                  <v-btn color="#4c3e9d"  class="white--text" small disabled>Done</v-btn>
                                                </v-flex>
                                              </v-list>
                                            </v-menu>

                                            <!-- Add new quick reply -->
                                            <p class="cursor-pointer mb-0 text-sm-center"
                                            v-if="c.quickReplies.length < 5"
                                            style="width: 20em;" @click="addReplies(qi, ci, 'Button')">
                                              <v-btn color="accent" class="mr-2" small disabled outlined icon>
                                                <v-icon small>fas fa-plus</v-icon>
                                              </v-btn>Add reply
                                            </p>
                                          </div>
                                        </v-card-actions>
                                      </v-card>
                                      <!-- Add new quick reply -->
                                      <v-card>
                                        <p class="cursor-pointer mb-0 text-sm-center"
                                        v-if="q.msg.length < 5"
                                        style="width: 20em;" @click="addCard(qi)">
                                          <v-btn color="accent" class="mr-2" small disabled outlined icon>
                                            <v-icon small>fas fa-plus</v-icon>
                                          </v-btn>Add card
                                        </p>
                                      </v-card>
                                    </div>
                                  </v-flex>

                                  <!-- Multiple Choice question -->
                                  <v-flex class="" xs10 offset-xs1
                                  v-if="q.type === 'multipleChoice'">
                                    <v-text-field
                                      v-if="q.msg"
                                      maxlength="300"
                                      class="elevation-0 grey--text text--lighten-2"
                                      v-model="q.msg[0].text"
                                      :name="`interactionText`"
                                      :error-messages="errors.collect('interactionText')"
                                      label="Please type your question"
                                      autofocus
                                      disabled
                                      data-vv-as="interaction text"
                                      v-validate="'required'"
                                      single-line
                                      outlined
                                    >
                                      <v-fade-transition slot="prepend">
                                        <img width="30" height="30"
                                        :src="getImgUrl('amara-60')">
                                      </v-fade-transition>
                                    </v-text-field>
                                    <div class="d-flex flex-row flex-wrap">
                                      <v-flex xs12 style="margin-left:6%" class="" v-for="(qr, q) in q.msg[0].quickReplies" :key="q">
                                        <div class="d-flex">
                                          <v-flex xs2 class="pt-3">
                                            Option {{q+1}}
                                          </v-flex>
                                          <v-flex xs10>
                                            <v-text-field
                                              maxlength="300"
                                              class="elevation-0 grey--text text--lighten-2"
                                              v-model="qr.text"
                                              disabled
                                              single-line
                                              outlined
                                                >
                                            </v-text-field>
                                          </v-flex>
                                        </div>
                                        <!-- <v-text-field
                                          maxlength="300"
                                          class="elevation-0 grey--text text--lighten-2"
                                          v-model="qr.text"
                                          disabled
                                          single-line
                                          outlined
                                            >
                                        </v-text-field> -->
                                      </v-flex>
                                    </div>
                                  </v-flex>

                                  <!-- Quick replies -->
                                  <v-flex class="" xs10 offset-xs1
                                  v-if="q.type === 'quickReplies' || q.type === 'closeEnded'">
                                    <v-text-field
                                      v-if="q.msg"
                                      maxlength="300"
                                      class="elevation-0 grey--text text--lighten-2"
                                      v-model="q.msg[0].text"
                                      :name="`interactionText`"
                                      :error-messages="errors.collect('interactionText')"
                                      label="Please type your question"
                                      autofocus
                                      disabled
                                      data-vv-as="interaction text"
                                      v-validate="'required'"
                                      single-line
                                      outlined
                                    >
                                      <v-fade-transition slot="prepend">
                                        <img width="30" height="30"
                                        :src="getImgUrl('amara-60')">
                                      </v-fade-transition>
                                    </v-text-field>

                                    <div style="margin-left:6%;" class="text-xs-left" v-if="q.msg">
                                      <v-menu v-for="(c, ci) in q.msg[0].quickReplies" :key="ci"
                                        absolute
                                        disabled
                                        offset-y
                                        style="max-width: 600px"
                                      >
                                        <template v-slot:activator="{ on, attrs }">
                                          <v-btn color="#4c3e9d" outlined
                                            disabled
                                            v-bind="attrs" v-on="on"
                                          >
                                            {{c.title}}
                                          </v-btn>
                                        </template>
                                        <v-list class="pa-3">
                                          <v-text-field
                                            class="grey--text text--lighten-2"
                                            maxlength="50"
                                            outlined
                                            v-model="c.title"
                                            text
                                            disabled
                                            @click.stop
                                            name="quickReply"
                                            :label="`Rating ${ci+1}`"
                                          ></v-text-field>

                                          <v-text-field
                                            class="grey--text text--lighten-2"
                                            maxlength="300"
                                            outlined
                                            v-model="c.postback"
                                            text
                                            disabled
                                            @click.stop
                                            name="postback"
                                            label="Amara's response"
                                          ></v-text-field>

                                          <v-flex xs12 class="text-xs-right">
                                            <v-btn color="error" small text
                                            v-if="q.type === 'quickReplies'"
                                            @click="deleteReply(qi, 0, ci)" disabled>Delete</v-btn>
                                            <v-btn color="#4c3e9d"  class="white--text" small disabled>Done</v-btn>
                                          </v-flex>
                                        </v-list>
                                      </v-menu>

                                      <!-- Add new quick reply -->
                                      <span class="cursor-pointer" @click="addReplies(qi, 0, 'Answer')"
                                      v-if="q.msg && q.msg[0].quickReplies.length < 5
                                      && q.type === 'quickReplies'">
                                        <v-btn color="accent" small disabled outlined icon>
                                          <v-icon small>fas fa-plus</v-icon>
                                        </v-btn>Add reply
                                      </span>
                                    </div>
                                  </v-flex>

                                </div>
                              </v-card>
                            </v-flex>
                          </div>
                        </draggable>
                        <!-- </Draggable>
                      </Container> -->
                    </v-flex>
                  </div>
                </v-flex>
              </div>
            </v-tab-item>

            <!-- Recipients Tab content -->
            <v-tab-item class="stepper-step-content" value="audience" v-if="config.activeTab === 'audience'">
              <div class="mb-3 step-content d-flex flex-row flex-wrap">
                <div class="d-flex w-100">
                  <audienceList ref="audienceList"> </audienceList>
                </div>
              </div>
            </v-tab-item>

            <!-- Distributions Tab -->
            <v-tab-item class="stepper-step-content" value="distribution" v-if="config.activeTab === 'distribution'">
              <div class="mb-3 step-content d-flex flex-row flex-wrap w-100">
                <v-flex>
                  <distributionMediums> </distributionMediums>
                </v-flex>
              </div>
            </v-tab-item>

            <!-- Preview Tab -->
            <v-tab-item class="stepper-step-content" value="preview" v-show="config.activeTab === 'preview'">
              <div row wrap class="mb-3 step-content d-flex flex-row flex-wrap w-100">
                <v-flex>
                  <preview ref="preview" v-if="config.activeTab === 'preview'" :newSurvey="newSurvey">  </preview>
                </v-flex>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>

        <v-dialog max-width="1000px"
          v-model="config.iconEditable"
          transition="dialog-transition"
        >
          <v-card>
            <v-card-text>
              <h2> Select icons </h2>
              <div class="d-flex flex-row flex-wrap">
                <v-card class="ma-4" v-for="(icon, key) in icons" :key="key">
                  <v-icon large color="#4c3e9d" class="pa-4 cursor-pointer" @click="newCampaign.logo = icon.icon;config.iconEditable=false;">
                    {{icon.icon}}
                  </v-icon>
                </v-card>
              </div>
            </v-card-text>

            <v-card-actions align-content-space->
              <v-flex xs2>
                <v-btn color="error" text @click.stop="config.iconEditable=false;">Close</v-btn>
              </v-flex>
              <v-flex xs8>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="startSurvey" persistent max-width="800px">
          <v-card>
            <v-card-title>
              <p class="headline w-100 mb-0 text-xs-center">Start chat-based survey</p>
              <p class="subheadline w-100 mb-0 text-xs-center">Leverage the power of engaging conversation in a chat-based survey.</p>
            </v-card-title>
            <v-card-text class="pt-0">
              <v-container grid-list-md class="py-0" >
                <v-layout style="max-width:75%; margin:auto;">
                  <img style="width:100%;" src="../../assets/template.jpg" alt="">
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1  white--text" class="text-none" @click="startBlank()">Start blank <v-icon class="px-2" style="font-size:10px;"> fas fa-check </v-icon></v-btn>
              <span class="px-3">Or</span>
              <v-btn color="primary darken-1" class=" text-none" outlined @click="BrowseTemplate()">Browse templates</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="showTemplate" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card style="boder-radius:0; border:none;">
            <v-btn style="position:fixed; top:0px; right:10px; color:grey;" icon dark @click="showTemplate = false">
              <v-icon style="font-size:12px;">fas fa-times</v-icon>
            </v-btn>
            <div class="d-flex" v-if="allTemplateList">
              <v-flex sm3 class="w-100 bg-white pa-4" style="height:100vh; position:relative; background: -webkit-linear-gradient(90deg,#61245e 0%,#42276f 90%);">
                <div>
                <p class="mb-0 white--text" style="font-size: 20px;font-weight:400;">Browse templates</p>
                <small class="white--text" style="font-size:100%;">Choose from our template library, a ready-to-use design optimize to give the best result.</small>
                </div>
                <div style="position:absolute; bottom:0; left:25%; bottom:5%;">
                  <img class="ml-3" style="" src="../../assets/bulb.png" alt="">
                  <p style="margin-left:-32%;" class="text-xs-center white--text mb-0">
                    <small style="font-size:100%;">Have your own ideas in mind?</small>
                  </p>
                  <a color="primary darken-1" class="ml-3  white--text b-bottom" text @click="showTemplate = false;">Start blank survey</a>
                </div>
              </v-flex>
              <v-flex class="background-custom-grey" sm9 style="padding:0 5%; height:100vh; overflow-y:auto; overflow-x:hidden;">
                <v-container>
                  <div class="d-flex flex-row flex-wrap">
                    <v-flex xs12>
                      <p style="font-size:20px; font-weight:400;">Templates</p>
                    </v-flex>
                  </div>
                  <div class="d-flex flex-row flex-wrap">
                    <v-flex xs4 md4 v-for="(item, key) in campaignList" :key="key" @click="openTemplate(item)"  class="px-2 py-2 adhocTemplate-card">
                      <v-card style="min-height:100%;">
                        <img
                          class="white--text"
                          style="width:35%; margin:20% 35% 0 30%"
                          :src="item.icon"
                        />
                        <v-card-title>
                          <div class="w-100">
                            <p class="w-100 text-xs-center" style="font-size:16px; font-weight:400;">{{item.title}}</p>
                            <p class="grey--text w-100 text-xs-center text-capitilized" style="font-size:12px;">{{item.times_used}} times used | <span class="text-capitalize"> {{item.category}}</span></p>
                          </div>
                        </v-card-title>
                      </v-card>
                    </v-flex>
                  </div>
                </v-container>
              </v-flex>
            </div>
            <div class="d-flex" v-if="!allTemplateList">
              <v-flex class="background-custom-grey"  sm9 style="padding: 0 3%; height:100vh; overflow-y:auto; overflow-x:hidden;">
                <v-container style="margin-top:10%;">
                  <div class="d-flex flex-row flex-wrap" row wrap>
                    <v-flex xs12 v-for="(q, l) in selectedTemplate.questions" :key="l">
                      <v-stepper v-model="e1" style="background:none; box-shadow:none;">
                        <v-stepper-header class="d-none">
                          <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

                          <v-divider></v-divider>

                          <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

                          <v-divider></v-divider>

                          <v-stepper-step step="3">Name of step 3</v-stepper-step>
                        </v-stepper-header>

                        <v-stepper-items>
                          <v-stepper-content :step="l+1">
                            <v-card class="mb-1 elevation-0 b-none" style="background:transparent; border:none;" min-height='100' v-for="(qi, i) in q.questions" :key="i">
                              <div class="d-flex flex-row flex-wrap" style="min-height:48px">
                                <v-flex xs6>
                                  <p style="font-size:15px; font-weight:500;" class="mt-2 ml-3 mb-0">Question type : {{q.title}}</p>
                                </v-flex>
                              </div>
                              <div class="d-flex flex-row flex-wrap mt-2" style="min-height:48px">
                                <v-flex class="pl-2" xs10 >
                                  <v-fade-transition slot="prepend" style="display:inline-block;">
                                      <img width="60" height="60" style="border-radius:50%;"
                                      :src="getImgUrl('amara-60')">
                                    </v-fade-transition>
                                  <p class="ml-4 mb-0" style="font-size:30px; width:85%; display:inline-block; vertical-align: top;">
                                    {{qi.text}}
                                  </p>
                                </v-flex>
                              </div>
                              <div class="d-flex flex-row flex-wrap justify-center">
                                <v-flex xs2 class="pb-2 pt-4 text-center"
                                  v-for="(r, ri) in qi.scale" :key="ri">
                                  <div v-if="q.title !== 'Rating scale' && q.title !== 'Yes/No (Close Ended)' && q.title !== 'Input From User' && q.title !== 'Text'">
                                  <img disabled v-if="r.img && q.title == 'Emoji scale'" :src="getImgUrl(r.img)"
                                  class="emoji-container" /><br>
                                  <strong v-if="q.title == 'Number Scale'" class="headline grey--text" :class="e1 !== selectedTemplate.questions.length ? 'cursor-pointer' : ''"  @click="e1 !== selectedTemplate.questions.length ? e1 = `${l+2}`  : ''" style="padding:5px 12px; border:1px solid; border-radius:50%;">
                                    {{r.value}}<br>
                                  </strong>
                                  <span class="" v-if="q.title == 'Number Scale' || q.title == 'Emoji scale'">{{r.title}}</span>
                                  </div>
                                </v-flex>
                                <v-flex xs2 class="pb-2 pt-4 text-center"
                                  v-for="(r, ri) in qi.scale" :key="ri">
                                  <div v-if="q.title == 'Rating scale'">
                                    <strong v-if="q.title == 'Rating scale'" class="headline grey--text" :class="e1 !== selectedTemplate.questions.length ? 'cursor-pointer' : ''"  @click="e1 !== selectedTemplate.questions.length ? e1 = `${l+2}`  : ''" style="padding:5px 12px; border:1px solid; border-radius:50%;">
                                      {{r.value}}<br>
                                    </strong>
                                    <span class="" v-if="q.title == 'Rating scale'">{{r.title}}</span>
                                  </div>
                                </v-flex>

                                <v-flex xs5 style="border:1px solid grey; cursor:pointer; border-radius:6px;" class="text-center pb-2 mx-2 my-2 pt-2"
                                  v-for="(r, ri) in qi.quickReplies" :key="ri" @click="e1 = `${l+2}`">
                                  <div v-if="q.title == 'Multiple choice question'">
                                    {{r.text}}
                                  </div>
                                </v-flex>
                                <v-btn color='primary' :disabled=" e1 == selectedTemplate.questions.length" @click="e1 = `${l+2}`" class="float:right" v-if="q.title == 'Yes/No (Close Ended)' || q.title == 'Yes/No'" outlined>Yes</v-btn>
                                <v-btn color='#602a5e' :disabled=" e1 == selectedTemplate.questions.length" @click="e1 = `${l+2}`" v-if="q.title == 'Yes/No (Close Ended)' || q.title == 'Yes/No'" outlined>No</v-btn>

                                <v-text-field
                                  v-if="q.title == 'Input From User' || q.title == 'Open-ended question'"
                                  maxlength="300"
                                  max-width='90%'
                                  :disabled=" e1 == selectedTemplate.questions.length"
                                  @keyup.native.enter="e1 = `${l+2}`"
                                  class="elevation-0 mx-4 mt-2 grey--text text--lighten-2"
                                  label="Type your answer ..."
                                  single-line
                                  outlined
                                >
                                </v-text-field>

                              </div>
                          </v-card>
                          <div style="margin-top:10%;">
                            <v-btn :disabled=" e1 == 1" @click="e1 = `${l}`"><v-icon class="pr-2">fas fa-chevron-left</v-icon> previous </v-btn>
                            <v-btn
                              color="primary"
                              @click="e1 = `${l+2}`"
                              style="float:right"
                              :disabled=" e1 == selectedTemplate.questions.length"
                            >
                              Next <v-icon class="pl-2">fas fa-chevron-right</v-icon>
                            </v-btn>
                          </div>

                          </v-stepper-content>

                        </v-stepper-items>
                      </v-stepper>

                    </v-flex>
                  </div>
                  <!-- <v-layout row wrap>
                  </v-layout> -->
                </v-container>
              </v-flex>
              <v-flex sm3 class="w-100 bg-white pa-4 " style="height:100vh; padding-left:10%; position:relative; background: -webkit-linear-gradient(90deg,#61245e 0%,#42276f 90%);">
                <div>
                  <a text @click="allTemplateList = true;" class="white--text"><v-icon class="mr-2 white--text" style="font-size:12px;">fas fa-arrow-left</v-icon>Back to template</a>
                <p class="mb-0 mt-4 white--text" style="font-size: 20px;font-weight:600;">{{selectedTemplate.title}}</p>
                <small style="font-size:100%;" class="mt-2 white--text">{{selectedTemplate.objectives}}</small><br>
                <v-btn color="primary"
                  small class="ml-0 elevation-0 white--text mt-4"
                  @click="GetTemplateData()"
                  >
                    Choose template <v-icon style="font-size:12px" class="ml-2">fas fa-check</v-icon>
                </v-btn>
                </div>
                <div style="position:absolute; bottom:0; left:25%; bottom:5%;">
                  <img class="ml-3" style="" src="../../assets/bulb.png" alt="">
                  <p style="margin-left:-30%;" class="text-xs-center mb-0 white--text">
                    <small style="font-size:100%;">Have your own ideas in mind?</small>
                  </p>
                  <a class="ml-3 white--text b-bottom" text @click="showTemplate = false;">Start blank survey</a>
                </div>
              </v-flex>
            </div>
          </v-card>
        </v-dialog>
      </div>

      <newQuestion ref="newQuestion" v-show="questionSource === 'new'"></newQuestion>
      <questionBank ref="question_bank" v-show="questionSource === 'question_bank'"></questionBank>
      <campaigns ref="campaign" v-show="questionSource === 'campaign'"></campaigns>
      <audienceSource ref="audienceSource" v-if="unlockStepper && config.activeTab === 'audience'"></audienceSource>

      <confirmTrigger ref="confirmTrigger"></confirmTrigger>
      <scheduleCampaign ref="scheduleCampaign"></scheduleCampaign>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import { Container, Draggable } from 'vue-smooth-dnd';
import draggable from 'vuedraggable';

// import { ContentLoader } from 'vue-content-loader';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';
import newQuestion from './newQuestion';
import questionBank from './questionBank';
import campaigns from './campaigns';
import audienceSource from './audienceSource';
import audienceList from './audienceList';
import distributionMediums from './distributionMediums';
import preview from './preview';
import confirmTrigger from './confirmTrigger';
import scheduleCampaign from './scheduleCampaign';
// import newAdhocSummary from './NewAdhocSummary';
/* eslint-disable no-unused-vars */
// import {
//   VCheckbox,
//   VAlert,
//   VAvatar,
//   VAutocomplete,
//   VTooltip,
//   VTextarea,
//   VProgressLinear,
//   VSlider
// } from 'vuetify';

dayjs.extend(relativeTime);
/* eslint-disable no-unused-vars */

export default {
  name: 'uploadEmployees',
  components: {
    // ContentLoader,
    // VCheckbox,
    // VAlert,
    // VAvatar,
    // VAutocomplete,
    // VTooltip,
    // VTextarea,
    // VProgressLinear,
    // VSlider,
    // Container,
    // Draggable,
    draggable,
    newQuestion,
    questionBank,
    audienceSource,
    audienceList,
    campaigns,
    distributionMediums,
    preview,
    confirmTrigger,
    scheduleCampaign
    // newAdhocSummary,
  },
  data () {
    return {
      e1: 0,
      allTemplateList: true,
      selectedTemplate: {},
      selectedEmail: '',
      showTemplate: false,
      startSurvey: false,
      unlockStepper: false,
      editableCampaignName: false,
      editableCampaignObjective: '',
      audienceSource: null,
      campaignCategories: [{
        text: 'Employee engagement',
        value: 'employee_engagement',
        disabled: false
        // }, {
        //   text: 'Candidate Engagement',
        //   value: 'candidate_engagement',
        //   disabled: true,
        // }, {
        //   text: 'Customer Engagement',
        //   value: 'customer_engagement',
        //   disabled: true,
        //   beta: true,
        // }, {
        //   text: 'Others',
        //   value: 'others',
        // }, {
        //   text: 'Research',
        //   value: 'research',
        //   disabled: true,
      }],
      campaignList: [],
      templateScale: [
        {
          title: 'Terrible',
          img: 'crying',
          value: '1'
        }, {
          title: 'Sad',
          img: 'sad',
          value: '2'
        }, {
          title: 'Okay',
          img: 'shocked',
          value: '3'
        }, {
          title: 'Good',
          img: 'happy',
          value: '4'
        }, {
          title: 'Great',
          img: 'in-love',
          value: '5'
        }
      ],
      selectedQuesType: null,
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
      config: {
        editable: true,
        iconEditable: false,
        picPreview: null,
        panel: [true, true, true, true],
        searchSurvey: '',
        activeStep: 1,
        initialLoading: true,
        loadingEmployees: false,
        loadingSurveys: false,
        loadingContinue: false,
        loadingDraft: false,
        savingStage: false,
        initialLoadingFilters: true,
        minDate: new Date().toISOString().substr(0, 10),
        toolbarActions: [{
          title: 'Employee Touchpoints',
          icon: 'fas fa-sync',
          link: '',
          condition: false
        }, {
          title: 'Support',
          icon: 'fas fa-life-ring',
          link: '/support-center',
          condition: true
        }, {
          title: 'Settings',
          icon: 'fas fa-cog',
          link: '/settings',
          condition: true
        }, {
          title: 'Logout',
          icon: 'fas fa-power-off',
          condition: true
        }],
        activeTab: 'summary',
        tabs: [{
          title: 'About the campaign',
          value: 'summary',
          count: 0
        }, {
          title: 'Design campaign',
          value: 'survey',
          count: 1
        }, {
          title: 'Select audience',
          value: 'audience',
          count: 2
        }, {
          title: 'Select channel',
          value: 'distribution',
          count: 3
        }, {
          title: 'Launch',
          value: 'preview',
          count: 4
        }],
        emojiScale: {
          delay: 2000,
          title: 'Emoji scale',
          description: 'Emojis bring a fun element in the chat, a respondent selects an emoji that best describes its state of mind',
          type: 'scale',
          viewPostback: false,
          role: 'mood',
          img: 'fas fa-smile',
          msg: [{
            text: '',
            scaleType: 'emoji',
            scale: [
              {
                title: 'Terrible',
                img: 'crying',
                value: 1,
                postback: 'I am really sorry to hear that'
              }, {
                title: 'Sad',
                img: 'sad',
                value: 2,
                postback: 'That\'s not good'
              }, {
                title: 'Okay',
                img: 'shocked',
                value: 3,
                postback: 'I think we can improve'
              }, {
                title: 'Good',
                img: 'happy',
                value: 4,
                postback: 'I am happy to know'
              }, {
                title: 'Great',
                img: 'in-love',
                value: 5,
                postback: 'That\'s awesome!'
              }
            ]
          }],
          response_required: true,
          response: []
        }
      },
      roleList: [{
        title: 'Strategy',
        value: 'strategy'
      }, {
        title: 'Onboarding',
        value: 'onboarding'
      }, {
        title: 'Culture',
        value: 'culture'
      }, {
        title: 'Goal-Setting',
        value: 'goalSetting'
      }, {
        title: 'Organizational Fit',
        value: 'organizationalFit'
      }, {
        title: 'Meaningful Work',
        value: 'meaningfulWork'
      }, {
        title: 'Transparency',
        value: 'transparency'
      }, {
        title: 'Training',
        value: 'training'
      }, {
        title: 'Reward',
        value: 'reward'
      }, {
        title: 'Workload',
        value: 'workload'
      }, {
        title: 'Accomplishment',
        value: 'accomplishment'
      }, {
        title: 'Management Support',
        value: 'managementSupport'
      }, {
        title: 'Growth',
        value: 'growth'
      }, {
        title: 'Recognition',
        value: 'recognition'
      }, {
        title: 'Engagement',
        value: 'engagement'
      }, {
        title: 'Peer Relationship',
        value: 'peerRelationship'
      }, {
        title: 'Environment',
        value: 'environment'
      }, {
        title: 'Autonomy',
        value: 'autonomy'
      }, {
        title: 'Freedom',
        value: 'freedom'
        // }, {
        //   title: 'Customer Focus',
        //   value: 'customerFocus',
        // }, {
        //   title: 'Job Security',
        //   value: 'jobSecurity',
        // },  {
        //   title: 'Work/Life Balance',
        //   value: 'workLifeBalance',
        // },  {
        //   title: 'Innovation',
        //   value: 'innovation',
        // }, {
        //   title: 'Recognition',
        //   value: 'recognition',
        // }, {
        //   title: 'Freedom of opinion',
        //   value: 'freedomOfOpinion',
        // }, {
        //   title: 'Engaging Leadership',
        //   value: 'engagingLeadership',
      }],
      filters: {
        default: {},
        main: {}
      },
      newCampaign: {
        time: '',
        status: 'live',
        type: 'adhoc',
        title: '',
        // logo: 'fa fa-bullhorn',
        category: 'employee_engagement',
        description: '',
        objectives: null,
        // objectives: [{
        //     done: false,
        //     text: 'Objective 1',
        //     editable: false,
        // }, {
        //     done: false,
        //     text: '',
        //     editable: false,
        // }],
        notifications: [],
        audience: [],
        survey: {
          id: null,
          title: 'No question set'
        },
        totalAudienceCount: null,
        distribution: [],
        distributionsEnabled: {},
        group_id: null,
        trigger_time: null,
        schedule_end_at: new Date().toISOString().substr(0, 10)
        // schedule_end_atTime: new Date().toISOString().substr(11, 5),
      },
      icons: [{
        //   name: 'poll',
        //   icon: 'fas fa-poll',
        // }, {
        //   name: 'poll-h',
        //   icon: 'fas fa-poll-h',
        // }, {
        name: 'horn',
        icon: 'fa fa-bullhorn'
      }, {
        name: 'donate',
        icon: 'fa fa-donate'
      }, {
        name: 'dollar',
        icon: 'fa fa-dollar-sign'
      }, {
        name: 'comments',
        icon: 'fa fa-comments'
        // }, {
        //   name: 'comments-dollar',
        //   icon: 'fas fa-comments-dollar',
      }],
      questionTypesD: [{
        delay: 2000,
        title: 'Rating scale',
        description: 'A respondent selects a number from a given set to answer the question',
        type: 'scale',
        role: '',
        img: 'fas fa-arrows-alt-h',
        msg: [{
          text: '',
          scaleType: 'number',
          scale: [
            {
              title: 'Terrible',
              color: 'red',
              value: 1,
              postback: 'I am really sorry to hear that'
            }, {
              title: 'Sad',
              color: 'deep-orange',
              value: 2,
              postback: 'That\'s not good'
            }, {
              title: 'Okay',
              color: 'orange',
              value: 3,
              postback: 'I think we can improve'
            }, {
              title: 'Good',
              color: 'light-green',
              value: 4,
              postback: 'That\'s good to know'
            }, {
              title: 'Great',
              color: 'green',
              value: 5,
              postback: 'I am happy to know'
            }
          ]
        }],
        response_required: true,
        response: []
      }, {
        delay: 2000,
        title: 'Yes/No',
        description: 'Some questions are so direct that they can be answered by selecting either yes or no',
        viewPostback: false,
        type: 'closeEnded',
        msg: [{
          text: '',
          quickReplies: [
            {
              title: 'Yes',
              value: 5,
              postback: 'Good to know!'
            }, {
              title: 'No',
              value: 1,
              postback: 'That\'s sad'
            }
          ]
        }],
        img: 'fas fa-reply-all',
        response_required: true,
        response: []
      }],
      welcome: [{
        delay: 2000,
        title: 'Welcome statement',
        type: 'text',
        img: 'fas fa-align-left',
        msg: [{
          text: ''
        }],
        response_required: false,
        response: []
      }],
      multipleChoice: [{
        delay: 2000,
        title: 'Multiple choice question',
        response_required: true,
        description: 'Multiple choice questions are effective and efficient way to assess respondent\'s thought process',
        type: 'multipleChoice',
        img: 'fas fa-list-ol',
        msg: [{
          text: '',
          viewScore: false,
          askpostback: false,
          quickReplies: [
            {
              placeholder: 'Enter Choice',
              text: '',
              followup: false,
              // value: '0',
              postback: 'Thank you for responding'
            }, {
              placeholder: 'Enter Choice',
              text: '',
              // value: '0',
              followup: false,
              postback: 'Thank you for responding'
            },
            {
              placeholder: 'Enter Choice',
              text: '',
              // value: '0',
              followup: false,
              postback: 'Thank you for responding'
            }, {
              placeholder: 'Enter Choice',
              text: '',
              // value: '0',
              followup: false,
              postback: 'Thank you for responding'
            }
          ]
        }],
        // response_required: true,
        response: []
      }],
      statements: [{
        delay: 2000,
        title: 'Filler statement by Amara',
        type: 'text',
        img: 'fas fa-align-left',
        msg: [{
          text: ''
        }],
        response_required: false,
        response: []
      }],
      questionTypes: [{
        delay: 2000,
        title: 'Open-ended question',
        description: 'Here the respondent uses the comment box to express feelings',
        type: 'textInput',
        img: 'fas fa-keyboard',
        msg: [{
          text: ''
        }],
        response_required: true,
        response: []
      }],
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
      list: {
        employees: [],
        survey: [],
        timeDuration: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24, 32],
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
        }]
      },

      // Step 2
      newSurvey: {
        title: '',
        description: '',
        interactions: [],
        type: ''
      },
      drag: {
        startDragging: false,
        droppingNow: false
      },
      questionSource: null,
      dialogs: {
        newQuestion: false,
        question_bank: false,
        campaign: false,
        confirmTrigger: false,
        scheduleCampaign: false
      }
    };
  },
  computed: {
    ...mapState({
      selectedEmailTemp: state => state.EmailTemplate,
      stagesOrder: state => state.stages,
      user: state => state.user,
      users (state) {
        const adminUsers = state.companyUsersList;
        // this.$lodash.remove((v) => {
        //
        // })
        return adminUsers;
      },
      validatePreviousSteps (activeTab) {
        let flag = true;
        this.$lodash.each(this.config.tabs, (t, ti) => {
          if (ti < activeTab) {
            if (this.validate[`step${ti + 1}`]) {
              flag = false;
            }
          }
        });
        return flag;
      }
    })
  },
  methods: {
    ...mapActions(['getCompanyUsers']),
    allowedStep: m => m % 5 === 0,
    goBack () {
      this.$router.push({
        path: '/ad-hoc'
      });
    },
    getTemplateList () {
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}stage/templates`).then((response) => {
        if (response && response.data) {
          this.campaignList = response.data;
          // this.newCampaign = stageData;
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
    },
    startBlank () {
      this.startSurvey = false;
    },
    BrowseTemplate () {
      this.startSurvey = false;
      this.showTemplate = true;
      this.getTemplateList();
    },
    openTemplate (templateData) {
      this.e1 = 1;
      this.allTemplateList = false;
      this.selectedTemplate = templateData;
    },
    discard () {
      if (this.newCampaign.stage_id) {
        // delete stage
        axios.delete(`${process.env.VUE_APP_ADHOC_API_URL}stage/delete?stage_id=${this.newCampaign.stage_id}`).then((response) => {
          if (response) {
            if (response.status === 204) {
              this.$store.dispatch('updateSnackbar', {
                color: 'success',
                show: true,
                text: 'Campaign discarded successfully!'
              });
              this.goBack();
            } else {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: 'Unable to discard campaign, Please try again later!'
              });
            }
            // this.templates = response.data.data;
          }
        }, (response) => {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to discard campaign, Please try again later!'
          });
          throw new Error(response);
        });
      } else {
        this.goBack();
      }
    },
    proceed () {
      if (this.newCampaign.title && this.newCampaign.category) {
        this.unlockStepper = true;
        // this.config.activeTab = 'survey';
        this.saveAsDraft(false, true);
      }
    },
    previous () {
      if (this.config.activeTab === 'survey') {
        this.config.activeTab = 'summary';
      } else if (this.config.activeTab === 'audience') {
        this.config.activeTab = 'survey';
      } else if (this.config.activeTab === 'distribution') {
        this.config.activeTab = 'audience';
        setTimeout(() => {
          // console.log(this.newCampaign.totalAudienceCount);
          if (!this.newCampaign.totalAudienceCount) {
            this.$refs.audienceList.getEmployees();
            this.$refs.audienceSource.open = true;
          } else {
            this.$refs.audienceList.config.initialLoading = false;
            this.$refs.audienceList.table.loading = false;
            this.$refs.audienceList.table.audience = this.newCampaign.audience;
            this.$refs.audienceList.table.totalAudienceCount = this.newCampaign.totalAudienceCount;
            this.$refs.audienceList.toggleAll(true);
            this.$refs.audienceList.showCheckboxes = false;
          }
        }, 100);
      } else if (this.config.activeTab === 'preview') {
        this.config.activeTab = 'distribution';
      } else {
        this.config.activeTab = 'summary';
      }
    },
    next () {
      this.config.loadingContinue = true;
      if (this.config.activeTab === 'summary') {
        this.saveAsDraft();
      } else if (this.config.activeTab === 'survey') {
        if (this.newSurvey.interactions && this.newSurvey.interactions.length) {
          this.saveAsDraft();
        } else {
          this.$store.dispatch('updateSnackbar', {
            show: true,
            text: 'Please design your campaign!',
            color: 'error'
          });
          this.config.loadingContinue = false;
        }
      } else if (this.config.activeTab === 'audience') {
        if (this.$refs.audienceList && this.$refs.audienceList.selectedAudience && Object.keys(this.$refs.audienceList.selectedAudience).length > 0) {
          this.saveAsDraft();
        } else {
          this.$store.dispatch('updateSnackbar', {
            show: true,
            text: 'Please select your campaign audience!',
            color: 'error'
          });
          this.config.loadingContinue = false;
        }
      } else if (this.config.activeTab === 'distribution') {
        if (this.newCampaign.distribution && Object.keys(this.newCampaign.distribution).length) {
          this.saveAsDraft();
        } else {
          this.$store.dispatch('updateSnackbar', {
            show: true,
            text: 'Please configure atleast one distribution channel before launching campaign!',
            color: 'error'
          });
          this.config.loadingContinue = false;
        }
      }
    },
    capitaliseCampaignTitle () {
      this.newCampaign.title = this.newCampaign.title.charAt(0).toUpperCase() + this.newCampaign.title.slice(1);
    },
    checkLength () {
      if (this.newCampaign.title.length > 40) {

      }
    },
    openFilePicker (type) {
      this.$refs[type].click();
    },
    removeIfBlank (index) {
      if ((!this.newCampaign.objectives[index] || this.newCampaign.objectives[index].text === '') &&
            this.newCampaign.objectives.length > 1) {
        this.newCampaign.objectives.splice(index, 1);
        this.newCampaign.objectives[index - 1].editable = true;
        this.editableCampaignObjective = this.newCampaign.objectives[index - 1].text;
      }
    },
    addNewObjective (index) {
      this.newCampaign.objectives.splice(index + 1, 0, {
        done: false,
        text: '',
        editable: false
      });
      this.newCampaign.objectives[index + 1].editable = true;
      // this.editableCampaignObjective = this.newCampaign.objectives[index+1].text;
    },
    updateQuestion (ques, index, editFlag) {
      this.$refs.newQuestion.selectedQuesType = {};
      this.$refs.newQuestion.selectedQuesType['0'] = JSON.parse(JSON.stringify(ques));
      this.$refs.newQuestion.editFlag = editFlag;
      this.$refs.newQuestion.questionIndex = index;
      this.newQuestion.questions = {};
      this.newQuestion.questions = {
        ...this.newQuestion.questions,
        ...this.$refs.newQuestion.selectedQuesType
      };
      this.questionSource = 'new';
      this.$refs.newQuestion.dialogs.newQuestion = true;
    },
    updateQuestionSource (source) {
      if (source === 'question_bank') {
        if (this.newCampaign && this.newCampaign.category) {
          this.$refs[source].getQuestionsTypes();
        }
      } else if (source === 'campaign') {
        this.$refs[source].getCampaigns();
      }
      this.$refs[source].dialogs[source] = true;
      this.questionSource = source;
      this.dialogs[source] = true;
    },
    scheduleCampaign () {
      this.validateDetails();
      let flag = false;
      this.$lodash.each(this.validate, (step) => {
        if (!step) {
          flag = true;
        }
      });
      if (!flag) {
        this.$refs.scheduleCampaign.dialogs.scheduleCampaign = true;
        // this.triggerCampaign();
      }
    },
    activateCampaign () {
      this.validateDetails();
      let flag = false;
      this.$lodash.each(this.validate, (step) => {
        if (!step) {
          flag = true;
        }
      });
      if (!flag) {
        this.$refs.confirmTrigger.dialogs.confirmTrigger = true;
        // this.triggerCampaign();
      }
    },
    triggerCampaign () {
      const campaignData = {
        stage_id: this.newCampaign.stage_id ? this.newCampaign.stage_id : undefined,
        trigger_time: this.newCampaign.trigger_time ? this.newCampaign.trigger_time : null,
        schedule_end_at: this.newCampaign.schedule_end_at.concat(' 23:59'),
        distributions: []
        // 'status': 'scheduled',
      };
      if (this.newCampaign.distribution && Object.keys(this.newCampaign.distribution).length) {
        this.$lodash.each(this.newCampaign.distribution, (dist, index) => {
          campaignData.distributions.push(dist.id);
        });
      }
      axios.post(`${process.env.VUE_APP_ADHOC_API_URL}stage/launch`, campaignData).then((response) => {
        if (response && response.data) {
          if (response.data) {
            // this.newCampaign.stage_id = response.data.stage_id;
            // this.newSurvey.interactions = response.data.interactions ? response.data.interactions : [];
            // this.newCampaign.distribution = response.data.distributions ? response.data.distributions : [];
            // this.$refs.preview.$refs.testCampaign.stage_id=  response.data.stage_id;
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Campaign activated successfully!'
            });
            this.goBack();
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to activate campaign, Please try again later!'
            });
          }
          // this.templates = response.data.data;
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to activate campaign, Please try again later!'
        });
        throw new Error(response);
      });
    },
    saveAsDraft (goBackFlag, editFlag) {
      // this.validateDetails();
      // let flag = false;
      // this.$lodash.each(this.validate, (step) => {
      //   if (!step) {
      //     flag = true;
      //     return;
      //   }
      // });
      // if (!flag) {
      // if(this.selectedEmailTemp) {
      //   this.$lodash.each(this.selectedEmailTemp, (e, index) => {
      //     console.log(e);
      //     this.selectedEmail= e.content.template_id;
      //   });
      // }

      const campaignData = {
        stage_id: this.newCampaign.stage_id ? this.newCampaign.stage_id : undefined,
        group_id: this.newCampaign.group_id ? this.newCampaign.group_id : undefined
        // 'status': 'draft',
      };
      if (this.config.activeTab === 'summary') {
        campaignData.summary = {
          title: this.newCampaign.title,
          // 'icon': this.newCampaign.logo,
          status: 'draft',
          category: this.newCampaign.category !== 'Others' ? this.newCampaign.category : this.newCampaign.categoryValue,
          objectives: this.newCampaign.objectives
        };
      }
      if (this.newSurvey.interactions && this.newSurvey.interactions.length && this.config.activeTab === 'survey') {
        this.$lodash.each(this.newSurvey.interactions, (interaction, index) => {
          // if (interaction.id) {
          //   delete interaction.id;
          // }
          interaction.questions = interaction.msg;
          delete interaction.msg;
        });
        campaignData.interactions = this.newSurvey.interactions;
      }
      if (this.$refs.audienceList && this.$refs.audienceList.selectedAudience &&
            Object.keys(this.$refs.audienceList.selectedAudience).length > 0 &&
            this.config.activeTab === 'audience') {
        const audience = [];
        const copyAudience = JSON.parse(JSON.stringify(this.$refs.audienceList.selectedAudience));
        this.$lodash.each(copyAudience, (recipient, index) => {
          if (recipient.id) {
            delete recipient.id;
          }
          audience.push(recipient);
        });
        campaignData.recipients = this.newCampaign.audience = audience;
        this.newCampaign.totalAudienceCount = this.newCampaign.audience.length;
      }
      if (this.newCampaign.distribution && Object.keys(this.newCampaign.distribution).length && this.config.activeTab === 'distribution') {
        campaignData.distributions = this.newCampaign.distribution;
      }
      axios.post(`${process.env.VUE_APP_ADHOC_API_URL}stage/create`, campaignData).then((response) => {
        if (response && response.data) {
          if (response.data.stage_id) {
            this.newCampaign.stage_id = response.data.stage_id;
            this.$lodash.each(this.newSurvey.interactions, (v, k) => {
              v.msg = v.questions;
            });
            this.newCampaign.group_id = response.data.group_id ? response.data.group_id : this.newCampaign.group_id;
            setTimeout(() => {
              if (this && this.$refs && this.$refs.preview) {
                this.$refs.preview.$refs.testCampaign.stage_id = response.data.stage_id;
                this.$refs.preview.$refs.testCampaign.group_id = this.newCampaign.group_id;
                if (response.data.group_id) {
                  this.$refs.preview.$refs.testCampaign.group_id = this.newCampaign.group_id;
                }
              }
            }, 100);
            if (this && this.$refs && this.$refs.confirmTrigger) {
              this.$refs.confirmTrigger.totalAudienceCount = this.newCampaign.totalAudienceCount;
            }
            this.newCampaign.distribution = response.data.distributions ? response.data.distributions : this.newCampaign.distribution;
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Campaign saved as draft successfully!'
            });
            this.config.loadingContinue = false;
            if (goBackFlag) {
              this.goBack();
            } else if (editFlag) {
              if (response.data.stage_id) {
                this.config.activeTab = 'survey';
                this.$router.push({
                  path: `/ad-hoc/edit/${response.data.stage_id}`
                });
                this.getStage(response.data.stage_id);
              }
            } else {
              if (this.config.activeTab === 'summary') {
                this.config.activeTab = 'survey';
              } else if (this.config.activeTab === 'survey') {
                this.config.activeTab = 'audience';
                setTimeout(() => {
                  // console.log(this.newCampaign.totalAudienceCount);
                  if (!this.newCampaign.totalAudienceCount) {
                    this.$refs.audienceList.getEmployees();
                    this.$refs.audienceSource.open = true;
                  } else {
                    this.$refs.audienceList.config.initialLoading = false;
                    this.$refs.audienceList.table.loading = false;
                    this.$refs.audienceList.table.audience = this.newCampaign.audience;
                    this.$refs.audienceList.table.totalAudienceCount = this.newCampaign.totalAudienceCount;
                    this.$refs.audienceList.toggleAll(true);
                    this.$refs.audienceList.showCheckboxes = false;
                  }
                }, 100);
              } else if (this.config.activeTab === 'audience') {
                this.config.activeTab = 'distribution';
              } else if (this.config.activeTab === 'distribution') {
                this.config.activeTab = 'preview';
              }
            }
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to draft campaign, Please try again later!'
            });
            this.config.loadingContinue = false;
          }
          // this.templates = response.data.data;
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to draft campaign, Please try again later!'
        });
        this.config.loadingContinue = false;
        throw new Error(response);
        // eslint-disable-next-line no-unreachable
        this.config.loadingContinue = false;
      });
      // }
    },
    validateDetails () {
      let error = false;
      this.validate = {
        step1: true,
        step2: true,
        step3: true,
        step4: true,
        step5: true
      };

      if (!this.newCampaign.title || !this.newCampaign.category) {
        error = true;
        this.validate.step1 = false;
        this.config.activeTab = 'summary';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Fill all the mandatory fields!'
        });
      } else if (this.newCampaign.category === 'Others' && !this.newCampaign.categoryValue) {
        error = true;
        this.validate.step1 = false;
        this.config.activeTab = 'summary';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Fill all the mandatory fields!'
        });
      } else if (!this.newSurvey.interactions || !this.newSurvey.interactions.length) {
        error = true;
        this.validate.step2 = false;
        this.config.activeTab = 'survey';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Please design your campaign!'
        });
      } else if (!this.newCampaign.audience || !this.newCampaign.totalAudienceCount) {
        error = true;
        this.validate.step3 = false;
        this.config.activeTab = 'audience';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Please select your campaign audience!'
        });
      } else if (!this.newCampaign.distribution || !Object.keys(this.newCampaign.distribution).length) {
        error = true;
        this.validate.step4 = false;
        this.config.activeTab = 'distribution';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Please configure atleast one distribution channel before launching campaign!'
        });
      }

      // this.$validator.validateAll().then((res) => {
      //     if (!res || error) {
      //         this.$store.dispatch('updateSnackbar', {
      //             color: 'error',
      //             show: true,
      //             text: 'Fill all the mandatory fields!',
      //         });
      //     } else {
      //         this.saveStage();
      //     }
      // });
    },
    getAvatar (c) {
      const avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      return avt.toUpperCase();
    },
    GetTemplateData () {
      axios.patch(`${process.env.VUE_APP_ADHOC_API_URL}stage/templates/${this.selectedTemplate.id}/usage_counter/`, {
        times_used: this.selectedTemplate.times_used + 1
      }
      ).then((response) => {

      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update count of template used, Please try again later!'
        });
        throw new Error(response);
      });
      this.showTemplate = false;
      const stageData = this.selectedTemplate;
      this.newCampaign.title = this.selectedTemplate.title;
      // eslint-disable-next-line no-self-assign
      this.newCampaign.category = this.newCampaign.category;
      this.newCampaign.group_id = stageData.group_id ? stageData.group_id : this.newCampaign.group_id;
      this.newCampaign.objectives = this.selectedTemplate.objectives;
      // this.$lodash.each(stageData.interactions, (v, k) => {
      //   v.msg = v.questions;
      // });
      this.newSurvey.interactions = this.selectedTemplate.questions;
      this.newCampaign.audience = stageData.recipients || [];
      this.newCampaign.totalAudienceCount = stageData.recipients ? stageData.recipients.length : this.newCampaign.totalAudienceCount;
      this.newCampaign.distribution = stageData.distributions ? stageData.distributions : this.newCampaign.distribution;

      this.$lodash.each(this.newCampaign.audience, (recipient, index) => {
        recipient.index = index + 1;
      });

      this.$lodash.each(this.newCampaign.distribution, (dist, index) => {
        if (this.newCampaign.distributionsEnabled) {
          this.newCampaign.distributionsEnabled[dist.type] = true;
        }
      });

      if (this && this.$refs && this.$refs.preview) {
        if (stageData.group_id) {
          this.$refs.preview.$refs.testCampaign.group_id = stageData.group_id;
        }
      }
      if (this && this.$refs && this.$refs.confirmTrigger) {
        this.$refs.confirmTrigger.totalAudienceCount = this.newCampaign.totalAudienceCount;
      }
    },
    getStage (id) {
      const queryParams = {
        sections: 'stage_id,group_id,summary,interactions,recipients,distributions,schedule_end_at'
      };
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}stage/detail?stage_id=${id}&stage_edit_mode=true`).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          const stageData = response.data.data;
          this.newCampaign.stage_id = id || null;
          this.newCampaign.title = stageData.summary && stageData.summary.title ? stageData.summary.title : this.newCampaign.title;
          this.newCampaign.category = stageData.summary && stageData.summary.category ? stageData.summary.category : this.newCampaign.category;
          this.newCampaign.group_id = stageData.group_id ? stageData.group_id : this.newCampaign.group_id;
          this.newCampaign.objectives = stageData.summary && stageData.summary.objectives ? stageData.summary.objectives : this.newCampaign.objectives;
          this.$lodash.each(stageData.interactions, (v, k) => {
            v.msg = v.questions;
          });
          this.newSurvey.interactions = stageData.interactions ? stageData.interactions : this.newSurvey.interactions;
          this.newCampaign.audience = stageData.recipients || [];
          this.newCampaign.totalAudienceCount = stageData.recipients ? stageData.recipients.length : this.newCampaign.totalAudienceCount;
          this.newCampaign.distribution = stageData.distributions ? stageData.distributions : this.newCampaign.distribution;

          this.$lodash.each(response.data.data.distributions, (dist, index) => {
            if (dist.type === 'email') {
              this.$store.dispatch('updateEmail', dist);
            }
          });
          this.$lodash.each(this.newCampaign.audience, (recipient, index) => {
            recipient.index = index + 1;
          });

          this.$lodash.each(this.newCampaign.distribution, (dist, index) => {
            if (this.newCampaign.distributionsEnabled) {
              this.newCampaign.distributionsEnabled[dist.type] = true;
            }
          });

          if (this && this.$refs && this.$refs.preview) {
            if (stageData.group_id) {
              this.$refs.preview.$refs.testCampaign.group_id = stageData.group_id;
            }
          }
          if (this && this.$refs && this.$refs.confirmTrigger) {
            this.$refs.confirmTrigger.totalAudienceCount = this.newCampaign.totalAudienceCount;
          }
          // this.newCampaign = stageData;
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
    },
    addReplies (index, qi, text) {
      this.newSurvey.interactions[index].msg[qi].quickReplies.push({
        title: `${text} #${this.newSurvey.interactions[index].msg[qi].quickReplies.length + 1}`
      });
    },
    // step 2
    applyDrag (arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result[removedIndex];
        result.splice(removedIndex, 1);
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      this.$lodash.each(result, (v, k) => {
        v.index = k;
        v.enabled = true;
        v.status = 'updated';
      });
      return result;
    },
    getIPayload (index) {
      return this.newSurvey[index];
    },
    onDrop (dropResult) {
      if (dropResult.payload) {
        dropResult.payload = JSON.parse(JSON.stringify(dropResult.payload));
      }
      this.newSurvey.interactions = this.applyDrag(this.newSurvey.interactions, dropResult);
    },
    onDragEnd () {
      this.drag.startDragging = false;
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    getLogoUrl (pet) {
      const images = require.context('@/assets/logo', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    toSeconds (millisec) {
      const sec = (millisec / 1000).toFixed(1);
      return `+${sec}s`;
    },
    takeAction (item) {
      if (item.link) {
        this.$router.push(item.link);
      } else {
        if (item.title === 'Employee Touchpoints') {
          if (window.location.host === 'localhost:8080') {
            window.open('http://localhost:8080');
          } else if (window.location.host === 'localhost:8081') {
            window.open('http://localhost:8081');
          } else if (window.location.host === 'app.dev.amara.ai') {
            window.open('https://app.dev.amara.ai');
          } else {
            window.open('https://app.amara.ai');
          }
        } else if (item.title === 'Logout') {
          this.logout();
        }
      }
    },
    logout () {
      axios.post(`${process.env.VUE_APP_API_URL}logout`).then((response) => {
        if (response && response.data.status === 200) {
          this.$store.dispatch('deleteSession');
          this.$router.push('/login');
        } else {
          this.$notify({
            group: 'foo',
            title: 'Error while logging out!',
            type: 'warn'
          });
          this.$store.dispatch('deleteSession');
          this.$router.push('/login');
        }
      }, () => {
        this.$store.dispatch('deleteSession');
        this.$router.push('/login');
      });
    },
    getDragPosition (type) {
      let style = 'position:absolute;left:7%;top:-33%;z-index:2';
      if (type === 'closeEnded') {
        style = 'position:absolute;left:7%;top:-27%;z-index:2';
      } else if (type === 'scale') {
        style = 'position:absolute;left:7%;top:-21%;z-index:2';
      } else if (type === 'multipleChoice') {
        style = 'position:absolute;left:7%;top:-7%;z-index:2';
      }
      return style;
    },
    editAction (ques, index, editFlag) {
      this.updateQuestion(ques, index, editFlag);
    },
    deleteAction (i) {
      this.newSurvey.interactions.splice(i, 1);
    },
    duplicateAction (item) {
      const temp = JSON.parse(JSON.stringify(item));
      this.newSurvey.interactions.push(temp);
    }
  },
  watch: {
  },
  mounted: {
  },
  beforeMount () {
    if (this.$route.name === 'NewAdhoc') {
      this.startSurvey = true;
    }
    if (this.$route.params && this.$route.params.stageId) {
      this.getStage(this.$route.params.stageId);
    } else {
    }
    this.getCompanyUsers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.adhoc--text {
  color: #4c3e9d!important;
}
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
.v-tabs__wrapper {
  .v-tabs__container {
    .v-tabs__slider-wrapper {
      .v-tabs__slider {
        width: 100%!important;
      }
    }
  }
}
.adhoc-app {
  .theme--light.v-input--is-disabled input {
    color:black !important;
  }
}
</style>
<style lang="css">
/* .v-tabs__item:not(.v-tabs__item--active) {
  color: #fff!important;
} */
</style>
<style lang="scss" scoped>
.action-card {
  .actions {
    margin-top: 0 !important;
  }
}
.campaign-title-top {
  position:relative;
  left:20px;
  height:30px;
  margin:0px;
  top:5px;
  .v-input__control {
    .v-input__slot {
      &:after {
        border: none!important;
      }
    }
  }
}
.hover-link:hover {
  color:#4c3e9d !important
}
.back-button {
  position:relative;
  top:0px;
  border-radius:10%;
  left: 10px;
  height: 40px;
  width: 40px;
}
.v-tabs__div {
  &.stepper-step {
    margin-left: 0!important;
    // color: #4c3e9d !important;
    color: #4c3e9d !important;
    margin-right: 0;
    font-size: small;
    max-width: unset;
  }
}

.bg-gradient {
  &.bg-adhoc-theme {
    .v-toolbar__content {
      // margin-top: 20px;
    }
  }
}
.stepper-step-content {
  padding: 20px;
  height: calc(100vh - 5em);
  .step-content {
    margin-bottom: 20px;
    height: calc(100vh - 13em);
    min-height: calc(100vh - 13em);
    // padding: 0px;
    .maximum-step-content {
      height: calc(100vh - 13em);
      max-height: calc(100vh - 13em);
      // overflow-y:hidden;
    }
  }
  .step-actions {

  }
}

.adhoc-objectives-list {
  margin-top: 10px;
  overflow-y:auto;
  overflow-x:hidden;
  border:1px solid lightgrey;
  border-radius: 10px;
  height:80%;
}
.stepper-progress-bar {
  top: 4em;
  margin: 0px;
  position: absolute;
  width: 100%;
  color: #ad0303;
  padding: 0;
  left: 0px;
}
.underline--text {
  text-decoration: underline;
}
.campaign-title {
  &.v-text-field {
    // padding-left:40px;
    width:100%;
    .v-input__control {
      .v-input__slot {
        text-transform:capitalize!important;
        .v-text-field__slot {
          text-transform:capitalize!important;
          input {
            text-transform:capitalize!important;
          }
        }
      }
    }
  }
}
.question-source {
  border-radius:8px;
}
.question-type {
  &:hover {
    background-color: #cffbfa!important;
  }
}
.adhocTemplate-card:hover{
  transform: scale(1.01);
  cursor: pointer;
}
.firstStep {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */

}

</style>
