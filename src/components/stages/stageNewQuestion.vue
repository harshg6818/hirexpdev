<template>
  <v-dialog max-width="70% !important; max-height:450px;"
      v-model="dialogs.newQuestion"
      transition="dialog-transition"
    >
      <v-card style="max-height:100%; max-width=80%;">
        <v-card-text style="">
          <h2 v-if="selectedQuesType && selectedQuesType[0] &&
          selectedQuesType[0].type === 'text'">  Create a statement </h2>
          <h2 v-else> Create New Question </h2>
          <v-layout mx-2 mt-2 row wrap :reverse="ifSmall" v-show="selectedQuesType" style="max-height: calc( 100% - 30px);overflow-y: auto;">
            <!-- Area to add elements -->
            <v-flex class="interactions">
              <v-card class="elevation-0 mt-2 interaction-card">

                <v-layout row wrap grey lighten-5 class="drag-container" style="height:100%">
                  <v-flex xs1></v-flex>

                  <v-flex xs10>
                    <h3 class="ml-4 mt-3" v-if="selectedQuesType && selectedQuesType[0]">
                      {{selectedQuesType[0].title}}
                    </h3>
                    <div v-for="(q, qi) in selectedQuesType" :key="qi" v-if="qi === '0'">
                      <v-layout class="draggable-item" style="max-height:350px;">
                        <v-flex class="ma-4 action-card"
                        text-xs-center sm12>
                          <v-layout column class="title text-capitalize">
                            {{q.title}}
                          </v-layout>

                          <v-card class="mb-1 elevation-0 " style="">
                            <v-layout row wrap v-if="q.type !== 'text'">
                              <v-flex xs2 v-if="questionIndex !== 0" class="font-weight-bold pl-2 pt-2 pl-2 mt-1 text-xs-left">
                                Driver
                              </v-flex>
                              <v-flex lay class="text-xs-left" xs4>
                                <v-select
                                  v-if="questionIndex !== 0"
                                  class="remove-msg"
                                  :items="drivers"
                                  item-text="name"
                                  item-value="value"
                                  @change="getSubDrivers(q.driver)"
                                  chips
                                  small-chips
                                  :id="`role_${qi}`"
                                  :name="`role_${qi}`"
                                  data-vv-as="driver"
                                  solo flat
                                  :error-messages="errors.collect(`role_${qi}`)"
                                  v-model="q.driver"
                                  :v-validate="{'required': selectedQuesType && selectedQuesType[0] && selectedQuesType[0].type !== 'textInput'}"
                                  label="Select from the list"
                                ></v-select>
                              </v-flex>

                              <v-flex xs2 v-if="questionIndex !== 0" class="font-weight-bold pl-2 pt-2 mt-1 text-xs-left">
                                Sub Driver
                              </v-flex>
                              <v-flex lay class="text-xs-left pr-2" xs4>
                                <v-select
                                  v-if="questionIndex !== 0"
                                  class="remove-msg"
                                  :items="subDrivers"
                                  item-text="name"
                                  item-value="value"
                                  chips
                                  small-chips
                                  :id="`subrole_${qi}`"
                                  :name="`subrole_${qi}`"
                                  data-vv-as="subdriver"
                                  solo flat
                                  :error-messages="errors.collect(`subrole_${qi}`)"
                                  v-model="q.sub_driver"
                                  :v-validate="{'required': selectedQuesType && selectedQuesType[0] && selectedQuesType[0].type !== 'textInput'}"
                                  label="Select from the list"
                                ></v-select>
                              </v-flex>

                              <v-flex xs12>
                                <v-divider></v-divider>
                              </v-flex>
                            </v-layout>

                            <v-layout row wrap align-center class="pt-4 pa-3">

                              <!-- Scale -->
                              <v-flex class="" xs10 offset-xs1 v-if="q.type === 'scale'">
                                <v-text-field
                                  v-if="q.msg"
                                  maxlength="300"
                                  v-model="q.msg[0].text"
                                  class="elevation-0 grey--text text--lighten-2"
                                  name="interactionText"
                                  :error-messages="errors.collect('interactionText')"
                                  label="Question"
                                  autofocus
                                  data-vv-as="interaction text"
                                  v-validate="'required'"
                                  single-line
                                  outline
                                >
                                </v-text-field>

                                <v-layout row wrap
                                v-if="q.msg && q.msg[0].scaleType === 'emoji'" justify-center>
                                  <v-flex xs10 text-xs-center class="mb-3"
                                  v-for="(r, ri) in q.msg[0].scale" :key="ri">
                                    <v-layout>
                                      <v-flex xs3>
                                        <v-btn class="emoji-btn"
                                          slot="activator"
                                          fab flat round
                                        >
                                          <img v-if="r.img" :src="getImgUrl(r.img)"
                                          class="emoji-container" />
                                        </v-btn>
                                        <p class="text-xs-center mt-2">
                                          {{r.title}}
                                        </p>
                                      </v-flex>

                                      <v-flex xs9>
                                        <v-text-field class="grey--text text--lighten-2
                                          template-custom-field no-margin mb-2"
                                          style="position:relative;top:-10px"
                                          maxlength="50"
                                          v-model="r.title"
                                          flat
                                          outline
                                          @click.stop
                                          name="quickReply"
                                          :label="`Rating ${ri+1}`"
                                        ></v-text-field>

                                        <v-text-field class="grey--text text--lighten-2
                                          template-custom-field no-margin mb-2"
                                          style="position:relative;top:-10px"
                                          maxlength="300"
                                          v-model="r.postback"
                                          flat
                                          outline
                                          @click.stop
                                          name="postback"
                                          label="Amara's response"
                                        ></v-text-field>
                                      </v-flex>

                                    </v-layout>

                                  </v-flex>
                                </v-layout>

                                <v-layout row wrap
                                v-if="q.msg && q.msg[0].scaleType === 'number'" justify-center>
                                  <v-flex xs10 text-xs-center class="mb-3"
                                  v-for="(r, ri) in q.msg[0].scale" :key="ri">
                                    <v-layout>
                                      <v-flex xs3>
                                        <v-btn class="emoji-btn"
                                          :color="r.color"
                                          fab
                                          outline
                                          round
                                          slot="activator"
                                        >
                                          <strong class="headline">
                                            {{r.value}}
                                          </strong>
                                        </v-btn>

                                        <p class="text-xs-center">
                                          {{r.title}}
                                        </p>
                                      </v-flex>

                                      <v-flex xs9>
                                        <v-text-field class="grey--text text--lighten-2
                                        template-custom-field no-margin mb-2"
                                          maxlength="50"
                                          outline
                                          v-model="r.title"
                                          flat
                                          @click.stop
                                          name="quickReply"
                                          :label="`Rating ${ri+1}`"
                                        ></v-text-field>

                                        <v-text-field class="grey--text text--lighten-2
                                          template-custom-field no-margin mb-2"
                                          maxlength="300"
                                          outline
                                          v-model="r.postback"
                                          flat
                                          @click.stop
                                          name="postback"
                                          label="Amara's response"
                                        ></v-text-field>
                                      </v-flex>
                                    </v-layout>
                                  </v-flex>
                                </v-layout>
                              </v-flex>

                              <!-- Input from user -->
                              <v-flex class="" xs10 offset-xs1 v-if="q.type === 'textInput'">
                                <v-text-field
                                  maxlength="300"
                                  v-model="q.msg['0'].text"
                                  class="elevation-0 grey--text text--lighten-2"
                                  :name="`interactionText_${qi}`"
                                  :error-messages="errors.collect(`interactionText_${qi}`)"
                                  label="Question"
                                  autofocus
                                  data-vv-as="interaction text"
                                  v-validate="'required'"
                                  single-line
                                  outline
                                >
                                  <v-fade-transition slot="prepend">
                                    <img width="30" height="30"
                                    :src="getImgUrl('amara-60')">
                                  </v-fade-transition>
                                </v-text-field>
                              </v-flex>

                              <!-- Text -->
                              <v-flex class="" xs10 offset-xs1 v-if="q.type === 'text'">
                                <v-text-field
                                  maxlength="300"
                                  v-model="q.msg['0'].text"
                                  class="elevation-0 grey--text text--lighten-2"
                                  :name="`interactionText_${qi}`"
                                  :error-messages="errors.collect(`interactionText_${qi}`)"
                                  label="What should Amara say?"
                                  autofocus
                                  data-vv-as="interaction text"
                                  v-validate="'required'"
                                  single-line
                                  outline
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
                                  <v-img
                                    height="200"
                                    width="300"
                                    slot="activator"
                                    max-height="200"
                                    max-width="300"
                                    :src="q.msg[0].imgUrl"
                                    :lazy-src="q.msg[0].imgUrl"
                                    aspect-ratio="1"
                                    class="grey lighten-2 mx-auto"
                                  >
                                    <v-layout
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
                                      <v-progress-circular v-show="q.msg[0].imgUrl"
                                      indeterminate color="grey lighten-5">
                                      </v-progress-circular>
                                    </v-layout>
                                  </v-img>
                                  <v-list class="pa-3">
                                    <v-text-field
                                      maxlength="1000"
                                      outline
                                      v-model="q.msg[0].imgUrl"
                                      flat
                                      @click.stop
                                      name="url"
                                      label="Your image URL"
                                    ></v-text-field>
                                    <v-flex xs12 class="text-xs-right">
                                      <v-btn color="#0d2c8d" class="white--text" small>Done</v-btn>
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
                                    <v-img
                                      height="200"
                                      width="300"
                                      slot="activator"
                                      max-height="200"
                                      max-width="300"
                                      :src="c.imgUrl"
                                      :lazy-src="c.imgUrl"
                                      aspect-ratio="1"
                                      class="grey lighten-2 mx-auto"
                                    >
                                      <v-layout
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
                                      </v-layout>
                                    </v-img>
                                    <v-list class="pa-3">
                                      <v-text-field
                                        maxlength="1000"
                                        outline
                                        v-model="c.imgUrl"
                                        flat
                                        @click.stop
                                        name="url"
                                        label="Your image URL"
                                      ></v-text-field>
                                      <v-flex xs12 class="text-xs-right">
                                        <v-btn color="#0d2c8d" class="white--text" small>
                                          Done
                                        </v-btn>
                                      </v-flex>
                                    </v-list>
                                  </v-menu>
                                  <h3 class="headline mb-0 font-weight-bold w-100">
                                    <v-text-field
                                      maxlength="300"
                                      solo
                                      v-model="c.text"
                                      flat
                                      @click.stop
                                      name="cardTitle"
                                      label="Enter your message here"
                                    ></v-text-field>
                                  </h3>
                                  <div>
                                    <v-textarea
                                      maxlength="500"
                                      flat
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
                                      <v-btn color="#0d2c8d" block outline slot="activator">
                                        {{r.title}}</v-btn>
                                        <v-list class="pa-3">
                                          <v-text-field
                                            class="grey--text text--lighten-2"
                                            maxlength="50"
                                            outline
                                            v-model="r.title"
                                            flat
                                            @click.stop
                                            name="quickReply"
                                            :label="`Rating ${ri+1}`"
                                          ></v-text-field>

                                          <v-text-field
                                            class="grey--text text--lighten-2"
                                            maxlength="300"
                                            outline
                                            v-model="r.postback"
                                            flat
                                            @click.stop
                                            name="postback"
                                            label="Amara's response"
                                          ></v-text-field>

                                          <v-flex xs12 class="text-xs-right">
                                            <v-btn color="error" small flat
                                            @click="deleteReply(qi, ci, ri)">Delete</v-btn>
                                            <v-btn color="#0d2c8d" class="white--text" small>
                                              Done
                                            </v-btn>
                                          </v-flex>
                                        </v-list>
                                      </v-menu>

                                      <!-- Add new quick reply -->
                                      <p class="cursor-pointer mb-0 text-sm-center"
                                      v-if="c.quickReplies.length < 5"
                                      style="width: 20em;" @click="addReplies(qi, ci, 'Button')">
                                        <v-btn color="accent" class="mr-2" small outline icon>
                                          <v-icon small>fas fa-plus</v-icon>
                                        </v-btn>Add reply
                                      </p>
                                    </div>
                                  </v-card-actions>
                                </v-card>
                              </v-flex>

                              <!-- Carousel -->
                              <v-flex class="" v-if="q.type === 'carousel'">
                                <v-layout row wrap>
                                  <v-card class="mr-3" width="300"
                                    v-for="(c, ci) in q.msg" :key="ci"
                                  >
                                    <v-menu
                                      absolute
                                      offset-y
                                      style="max-width: 600px"
                                    >
                                      <v-img
                                        height="200"
                                        width="300"
                                        slot="activator"
                                        max-height="200"
                                        max-width="300"
                                        :src="c.imgUrl"
                                        :lazy-src="c.imgUrl"
                                        aspect-ratio="1"
                                        class="grey lighten-2 mx-auto"
                                      >
                                        <v-layout
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
                                        </v-layout>
                                      </v-img>
                                      <v-list class="pa-3">
                                        <v-text-field
                                          maxlength="1000"
                                          outline
                                          v-model="c.imgUrl"
                                          flat
                                          @click.stop
                                          name="url"
                                          label="Your image URL"
                                        ></v-text-field>
                                        <v-flex xs12 class="text-xs-right">
                                          <v-btn color="#0d2c8d" class="white--text" small>
                                            Done
                                          </v-btn>
                                        </v-flex>
                                      </v-list>
                                    </v-menu>
                                    <h3 class="headline mb-0 font-weight-bold w-100">
                                      <v-text-field
                                        maxlength="300"
                                        solo
                                        v-model="c.text"
                                        flat
                                        @click.stop
                                        name="cardTitle"
                                        label="Enter your message here"
                                      ></v-text-field>
                                    </h3>
                                    <div>
                                      <v-textarea
                                        maxlength="500"
                                        flat
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
                                        <v-btn color="#0d2c8d" block outline slot="activator">
                                          {{r.title}}</v-btn>
                                          <v-list class="pa-3">
                                            <v-text-field
                                              class="grey--text text--lighten-2"
                                              maxlength="50"
                                              outline
                                              v-model="r.title"
                                              flat
                                              @click.stop
                                              name="quickReply"
                                              :label="`Rating ${ri+1}`"
                                            ></v-text-field>

                                            <v-text-field
                                              class="grey--text text--lighten-2"
                                              maxlength="300"
                                              outline
                                              v-model="r.postback"
                                              flat
                                              @click.stop
                                              name="postback"
                                              label="Amara's response"
                                            ></v-text-field>

                                            <v-flex xs12 class="text-xs-right">
                                              <v-btn color="error" small flat
                                              @click="deleteReply(qi, ci, ri)">Delete</v-btn>
                                              <v-btn color="#0d2c8d" class="white--text" small>
                                                Done
                                              </v-btn>
                                            </v-flex>
                                          </v-list>
                                        </v-menu>

                                        <!-- Add new quick reply -->
                                        <p class="cursor-pointer mb-0 text-sm-center"
                                        v-if="c.quickReplies.length < 5"
                                        style="width: 20em;" @click="addReplies(qi, ci, 'Button')">
                                          <v-btn color="accent" class="mr-2" small outline icon>
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
                                      <v-btn color="accent" class="mr-2" small outline icon>
                                        <v-icon small>fas fa-plus</v-icon>
                                      </v-btn>Add card
                                    </p>
                                  </v-card>
                                </v-layout>
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
                                  label="Question"
                                  autofocus
                                  data-vv-as="interaction text"
                                  v-validate="'required'"
                                  single-line
                                  outline
                                >
                                  <v-fade-transition slot="prepend">
                                    <img width="30" height="30"
                                    :src="getImgUrl('amara-60')">
                                  </v-fade-transition>
                                </v-text-field>

                                <v-layout row wrap
                                class="text-xs-left" v-if="q.msg" justify-center>
                                  <v-flex xs10 text-xs-center class="mb-3"
                                    v-for="(c, ci) in q.msg[0].quickReplies" :key="ci">
                                    <v-layout>
                                      <v-flex xs3>
                                        <v-btn color="#0d2c8d" outline slot="activator">
                                        {{c.title}}</v-btn>
                                      </v-flex>
                                      <v-flex xs9>
                                        <v-text-field class="grey--text text--lighten-2
                                        template-custom-field no-margin mb-2"
                                          maxlength="50"
                                          outline
                                          v-model="c.title"
                                          flat
                                          @click.stop
                                          name="quickReply"
                                          :label="`Rating ${ci+1}`"
                                        ></v-text-field>

                                        <v-text-field class="grey--text text--lighten-2
                                          template-custom-field no-margin mb-2"
                                          maxlength="300"
                                          outline
                                          v-model="c.postback"
                                          flat
                                          @click.stop
                                          name="postback"
                                          label="Amara's response"
                                        ></v-text-field>
                                      </v-flex>
                                    </v-layout>
                                  </v-flex>

                                  <!-- Add new quick reply -->
                                  <span class="cursor-pointer" @click="addReplies(qi, 0, 'Answer')"
                                  v-if="q.msg && q.msg[0].quickReplies.length < 5 &&
                                  q.type === 'quickReplies'">
                                    <v-btn color="accent" small outline icon>
                                      <v-icon small>fas fa-plus</v-icon>
                                    </v-btn>Add reply
                                  </span>
                                </v-layout>
                              </v-flex>

                            </v-layout>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </div>
                  </v-flex>

                  <v-flex xs1></v-flex>

                  <!--<v-flex class="b-left" xs3>
                    <div class="mx-4">
                      <h3 class="mt-3"> How to create question ? </h3>
                      <h4 class="mt-2"> Driver </h4>
                      <span class="mt-2">
                        Select an engagement driver from the list to link with the question.
                      </span>
                      <h4 class="mt-2"> Title </h4>
                      <span class="mt-2"> Set the title of the question. </span>
                      <h4 class="mt-2"> Response Labels and Postbacks </h4>
                      <span class="mt-2">
                        Set response labels and postbacks for the question.
                      </span>
                    </div>
                  </v-flex>-->
                </v-layout>

              </v-card>
            </v-flex>

          </v-layout>
        </v-card-text>

        <v-card-actions class="mt-3" align-content-space->
          <v-flex xs2>
            <v-btn color="error" flat @click.stop="dialogs.newQuestion=false;">Close</v-btn>
          </v-flex>
          <v-flex xs8>
          </v-flex>
          <v-flex text-xs-right xs2 v-if="!editFlag">
            <v-btn color="primary" class="white--text" @click.stop="validateDetails()"
            v-if="selectedQuesType && selectedQuesType[0] &&
            selectedQuesType[0].type === 'text'"> Add Statement </v-btn>
            <v-btn color="primary" class="white--text" @click.stop="validateDetails()" v-else>
              Add Question
            </v-btn>
          </v-flex>
          <v-flex text-xs-right xs2 v-else>
            <v-btn color="primary" class="white--text" @click.stop="validateDetails()"
            v-if="selectedQuesType && selectedQuesType[0] && selectedQuesType[0].type === 'text'">
              Update Statement
            </v-btn>
            <v-btn color="primary" class="white--text" @click.stop="validateDetails()" v-else>
              Update Question
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable max-len */
/* eslint-disable max-len */
import { VAlert, VMenu, VTextarea, VSelect, VChip } from 'vuetify';
import { Container, Draggable } from 'vue-smooth-dnd';
import { mapState } from 'vuex';
import axios from 'axios';
import VueContentLoading from 'vue-content-loading';

export default {
  name: 'NewQuestion',
  components: {
    VAlert,
    VMenu,
    VTextarea,
    VSelect,
    Container,
    Draggable,
    VChip,
    VueContentLoading,
  },
  data() {
    return {
      dialogs: {
        newQuestion: false,
        questionBank: false,
        campaigns: false,
      },
      selectedQuesType: {},
      config: {
        initialLoading: false,
      },
      editFlag: false,
      questionIndex: null,
      showMenu: false,
      ifSmall: false,
      drivers: [],
      subDrivers: [],
      roleList: [],
      newSurvey: {
        title: '',
        description: '',
        questions: [],
        type: '',
      },
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  methods: {
    getRoles() {
      axios.get(`${process.env.VUE_APP_API_URL}driver/framework`).then((response) => {
        // this.config.initialLoading = false;
        if (response && response.data) {
          this.$nextTick(function a() {
            this.roleList = response.data;
            this.$lodash.each(this.roleList, (subDrivers, driver) => {
              this.drivers.push({
                name: driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
                value: driver,
              });
            });
            this.$forceUpdate();
          });
        }
      }, (response) => {
        // this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch roles, Please try again later!',
        });
        throw new Error(response);
      });
    },
    getSubDrivers(selectedDriver) {
      this.$lodash.each(this.roleList, (subDrivers, driver) => {
        if (selectedDriver === driver) {
          this.subDrivers = [];
          this.$lodash.each(subDrivers, (subDriver) => {
            this.subDrivers.push({
              name: subDriver.replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
              value: subDriver,
            });
          });
        }
      });
    },
    getRoleName(role) {
      let roleName = '';
      roleName = role.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
      return roleName;
    },
    getImgUrl(pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    deleteReply(index, qi, oi) {
      if (this.newSurvey.questions[index].msg[qi].quickReplies &&
      this.newSurvey.questions[index].msg[qi].quickReplies.length > 1) {
        this.newSurvey.questions[index].msg[qi].quickReplies.splice(oi, 1);
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'info',
          show: true,
          text: 'At least one reply is required!',
        });
      }
    },
    addCard(index) {
      this.newSurvey.questions[index].msg.push({
        imgUrl: '',
        text: '',
        description: '',
        quickReplies: [
          {
            title: 'Yes',
            postback: 'Good to know!',
          }, {
            title: 'No',
            postback: 'That\'s sad',
          },
        ],
      });
    },
    addReplies(index, qi, text) {
      this.selectedQuesType.msg[qi].quickReplies.push({
        title: `${text} #${this.selectedQuesType.msg[qi].quickReplies.length + 1}`,
      });
    },
    validateDetails() {
      this.$validator.validateAll().then((res) => {
        if (res) {
          if (this.selectedQuesType && this.selectedQuesType[0] && this.selectedQuesType[0].type !== 'textInput') {
            if (this.selectedQuesType[0].driver && this.selectedQuesType[0].sub_driver) {
              if (this.editFlag && (this.questionIndex || this.questionIndex === 0)) {
                this.updateQuestion();
              } else {
                this.addQuestion();
              }
            } else {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: 'Fill all the mandatory fields!',
              });
            }
          } else {
            if (this.editFlag && (this.questionIndex || this.questionIndex === 0)) {
              this.updateQuestion();
            } else {
              this.addQuestion();
            }
          }
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!',
          });
        }
      });
    },
    addQuestion() {
      if (this.$parent && this.$parent.newSurvey) {
        // let temp = JSON.parse(JSON.stringify(this.$parent.newSurvey.interactions));
        // temp.push(this.selectedQuesType['0']);
        // this.$parent.newSurvey.interactions = JSON.parse(JSON.stringify(temp));
        this.$parent.newSurvey.interactions.push(this.selectedQuesType['0']);
        this.selectedQuesType = null;
        this.dialogs.newQuestion = false;
      }
    },
    updateQuestion() {
      if (this.$parent && this.$parent.newSurvey) {
        this.$parent.$nextTick(() => {
          this.$parent.newSurvey.interactions[this.questionIndex] = JSON.parse(JSON.stringify(this.selectedQuesType['0']));
          this.$parent.$forceUpdate();
          this.selectedQuesType = null;
          this.dialogs.newQuestion = false;
          this.editFlag = false;
          this.questionIndex = null;
        });
      }
    },
    update() {},
  },
  beforeMount() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hover-link:hover {
  color:#0d2c8d !important
}
.sortable-ghost {
  margin-left: 48px !important;
  margin-right: 48px !important;
  max-width: 100% !important;
  border-radius: 8px;
  border: 1px dashed #4A00E0;
  background-color: white;
  .v-card, .delay, .title {
    opacity: 0;
  }
}
.interactions .interaction-card {
  // height: calc(100vh - 7em);
  .drag-container {
    // height: calc(100vh - 13.1em);
    overflow-y: auto;
    overflow-x: hidden;
  }
  .smooth-dnd-container {
    // min-height: 70vh;
  }
}

.action-card {
  position: relative;
  &:after {
    content: "";
    top: -23px;
    width: 1px;
    margin-left: -1px;
    height: 27px;
    position: absolute;
    // border-left: 2px dashed #cfd7e0;
  }
  .v-card {
    // min-height: 130px;
  }
  .actions {
    transition: all 300ms ease;
    opacity: 0;
    position: absolute;
    margin-top: 5.2em;
    left: 1em;
  }
  .title {
    margin-top: 2.2em;
    position: absolute;
  }
  .delay {
    button {
      &:after {
        content: "";
        top: 2.7em;
        width: 1px;
        height: 100%;
        position: absolute;
        left: 17px;
        border-left: 2px dashed #cfd7e0;
      }
    }
    .delay-title {
      position: absolute;
      margin-top: 0.7em;
      margin-left: 48%;
    }
  }
  &:hover {
    .actions {
      opacity: 1;
    }
  }
}

.list-complete-item {
  // transition: all 0.3s;
}

.list-complete-enter, .list-complete-leave-active {
  opacity: 0;
}

.emoji-container {
  max-height: 3em;
  max-width: 3em;
}

.emoji-btn {
  // transition:
  margin-left: 1rem !important;
  margin-right: 1rem !important;
  &:hover {
    transform: scale(1.2);
  }
}

@media screen and (max-width: 599px) {
  .emoji-btn {
    margin-left: 0.3rem !important;
    margin-right: 0.3rem !important;
  }
  .emoji-container {
    max-height: 3em;
    max-width: 3em;
  }
}
.list-complete-item {
  padding: 4px;
  margin-top: 4px;
  border: solid 1px;
  transition: all 1s;
}

.list-complete-enter, .list-complete-leave-active {
  opacity: 0;
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
