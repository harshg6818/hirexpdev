<template>
  <v-dialog max-width="800px"
      v-model="dialogs.newQuestion"
      persistent
      transition="dialog-transition"
    >
      <v-card>
        <v-card-text class="pa-0">
          <!-- <h2 v-if="selectedQuesType && selectedQuesType[0].type === 'text'">  Create a statement </h2>
          <h2 v-else> Create New Question </h2> -->
          <div class="d-flex flex-row flex-wrap" :reverse="ifSmall" v-show="selectedQuesType">
            <!-- Area to add elements -->
            <v-flex class="interactions">
              <v-card style="border:none" class="elevation-0 interaction-card">
                <div class="drag-container d-flex flex-row flex-wrap grey lighten-5">
                  <v-flex xs12>
                    <div class="d-flex flex-row">
                      <v-flex xs8>
                        <h3 class="ml-4 mt-3" v-if="selectedQuesType"> {{selectedQuesType[0].title}} </h3>
                      </v-flex>
                      <v-flex xs4 >
                        <v-btn @click.stop="dialogs.newQuestion=false;" style="float:right" icon flat><v-icon style="font-size:12px;">fas fa-times</v-icon></v-btn>
                      </v-flex>
                    </div>
                    <div v-for="(q, qi) in selectedQuesType" :key="qi" v-if="qi === '0'">
                      <div class="draggable-item d-flex flex-row">
                        <v-flex class="ma-4 action-card"
                        text-xs-center sm12>
                          <!-- <v-layout column class="title text-capitalize"> -->
                          <div class="title text-capitalize d-flex flex-column">
                            {{q.title}}
                          </div>

                          <v-card class="mb-1 elevation-0">
                            <!-- <v-layout row wrap v-if="q.type !== 'text'">
                              <v-flex xs1></v-flex>
                              <v-flex xs2 class="font-weight-bold pl-2 pt-2 mt-1 text-xs-left">
                                Driver
                              </v-flex>
                              <v-flex lay class="text-xs-left" xs9>
                                <v-select
                                  class="remove-msg"
                                  :items="roleList"
                                  chips
                                  small-chips
                                  :id="`role_${qi}`"
                                  :name="`role_${qi}`"
                                  data-vv-as="driver"
                                  solo flat
                                  :error-messages="errors.collect(`role_${qi}`)"
                                  item-text="title"
                                  v-model="q.role"
                                  v-validate="'required'"
                                  label="Select from the list"
                                ></v-select>
                              </v-flex>

                              <v-flex xs12>
                                <v-divider></v-divider>
                              </v-flex>
                            </v-layout> -->

                            <div class="pt-2 px-3 d-flex flex-row flex-wrap align-center">

                              <!-- Scale -->
                              <v-flex class="" xs10 offset-xs1 v-if="q.type === 'scale'">
                                <div class="d-flex flex-row flex-wrap">
                                  <v-flex xs8 class="">
                                  </v-flex>
                                  <v-flex xs4 class="text-xs-right" >
                                    <v-tooltip max-width='250' top>
                                    <v-checkbox slot="activator" class="mt-0"
                                    style="float:right"
                                      color='primary'
                                      v-model="q.msg[0].viewPostback"
                                    label='Custom Postback'
                                  ></v-checkbox>
                                  <span>Customize Amara responses for each option</span>
                                    </v-tooltip>
                                  </v-flex>
                                </div>
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
                                  outline
                                >
                                <v-fade-transition slot="prepend">
                                  <img width="30" height="30"
                                  :src="getImgUrl('amara-60')">
                                </v-fade-transition>
                                </v-text-field>

                                <div class="d-flex flex-row flex-wrap justify-center"
                                v-if="q.msg && q.msg[0].scaleType === 'emoji'">
                                  <v-flex xs10 class="mb-3 text-center"
                                  v-for="(r, ri) in q.msg[0].scale" :key="ri">
                                    <div class="d-flex">
                                      <v-flex xs3>
                                        <v-btn class="emoji-btn"
                                          slot="activator"
                                          fab flat round
                                        >
                                          <img v-if="r.img" :src="getImgUrl(r.img)"
                                          class="emoji-container" />
                                        </v-btn>
                                        <p class="text-xs-center">
                                          {{r.title}}
                                        </p>
                                      </v-flex>

                                      <v-flex xs9 class="mt-2">
                                        <v-text-field
                                          class="grey--text text--lighten-2 template-custom-field no-margin mb-2"
                                          style="position:relative;"
                                          maxlength="50"
                                          v-model="r.title"
                                          flat
                                          outline
                                          @click.stop
                                          name="quickReply"
                                          :label="`Rating ${ri+1}`"
                                        ></v-text-field>

                                        <v-text-field
                                        v-if="q.msg[0].viewPostback"
                                          class="grey--text text--lighten-2 template-custom-field no-margin mb-2"
                                          style="position:relative;"
                                          maxlength="300"
                                          v-model="r.postback"
                                          flat
                                          outline
                                          @click.stop
                                          name="postback"
                                          label="Amara's response"
                                        ></v-text-field>
                                      </v-flex>

                                    </div>

                                  </v-flex>
                                </div>

                                <div class="d-flex flex-row flex-wrap justify-center"
                                  v-if="q.msg && q.msg[0].scaleType === 'number'"
                                >
                                  <v-flex xs10 class="mb-3 text-center"
                                  v-for="(r, ri) in q.msg[0].scale" :key="ri">
                                    <div class="d-flex">
                                      <v-flex xs3>
                                        <v-btn class="emoji-btn"
                                          style="min-width:56px;"
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

                                      <v-flex xs9 class="mt-2">
                                        <v-text-field
                                          class="grey--text text--lighten-2 template-custom-field no-margin mb-2"
                                          maxlength="50"
                                          outline
                                          v-model="r.title"
                                          flat
                                          @click.stop
                                          name="quickReply"
                                          :label="`Rating ${ri+1}`"
                                        ></v-text-field>

                                        <v-text-field
                                        v-if="q.msg[0].viewPostback"
                                          class="grey--text text--lighten-2 template-custom-field no-margin mb-2"
                                          maxlength="300"
                                          outline
                                          v-model="r.postback"
                                          flat
                                          @click.stop
                                          name="postback"
                                          label="Amara's response"
                                        ></v-text-field>
                                      </v-flex>
                                    </div>
                                  </v-flex>
                                </div>
                              </v-flex>
                              <!-- Multiple choice que -->
                              <v-flex class="MultiChoiceQue mx-4 px-3" xs12 v-if="q.type == 'multipleChoice'">
                                <div class="d-flex flex-row flex-wrap">
                                  <v-flex xs8 class="">
                                  </v-flex>
                                  <!-- <v-flex class="pr-3 xs2" >
                                    <v-tooltip bottom>
                                    <v-checkbox slot="activator" class="mt-0"
                                    style="float:right"
                                        color='primary'
                                        v-model="q.msg['0'].viewScore"
                                        label='Score'
                                      ></v-checkbox>
                                      <span>Tooltip</span>
                                    </v-tooltip>
                                  </v-flex> -->
                                  <v-flex xs4 class="text-xs-right">
                                    <v-tooltip max-width='250' top>
                                    <v-checkbox slot="activator" class="mt-0"
                                    style="float:right"
                                      color='primary'
                                      v-model="q.msg['0'].askpostback"
                                    label='Custom Postback'
                                  ></v-checkbox>
                                  <span>Customize Amara responses for each option</span>
                                    </v-tooltip>
                                  </v-flex>
                                </div>
                                <div class="d-flex flex-row flex-wrap">
                                <v-text-field
                                  maxlength="300"
                                  v-model="q.msg[0].text"
                                  class="elevation-0 grey--text text--lighten-2"
                                  :name="`interactionText_${qi}`"
                                  :error-messages="errors.collect(`interactionText_${qi}`)"
                                  label="Please type your question"
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
                                </div>
                                  <div style="padding-left:6%;" class="d-flex flex-row flex-wrap">
                                    <v-flex style="margin-left:0px;"  xs12 class="pb-2 px-1" v-for="(quickQue , QN) in q.msg[0].quickReplies"  :key="QN">
                                      <v-card style="min-height:auto" class="px-2 pt-2 optionscard">
                                        <div class="d-flex">
                                        <v-flex xs8 class="text-xs-left">
                                          <small>Option {{QN+1}}</small>
                                      <v-text-field
                                        maxlength="300"
                                        :append-icon="'fas fa-trash'"
                                        @click:append="deleteOption(QN)"
                                        v-validate="'required|max:50'"
                                        :name="`MCQ-option-${QN+1}`"
                                        :error-messages="errors.collect(`MCQ-option-${QN+1}`)"
                                        v-model="q.msg[0].quickReplies[QN].text"
                                        class="elevation-0 pt-0 mt-0 grey--text text--lighten-2"
                                        :placeholder="quickQue.placeholder"
                                      >
                                      </v-text-field>
                                        </v-flex>
                                        <v-flex xs4 class="text-xs-left pl-3">
                                          <v-tooltip max-width='250' top>
                                          <v-checkbox slot="activator" class="mt-3 pt-2"
                                          color='primary'
                                          label='Followup question'
                                        v-model="q.msg['0'].quickReplies[QN].followup"
                                      ></v-checkbox>
                                      <span>Amara will ask a followup question to understand the reason for the selection</span>
                                    </v-tooltip>
                                        </v-flex>
                                        </div>
                                      <div class="d-flex">
                                        <!-- <v-flex xs4 class="text-xs-left" v-if="q.msg[0].viewScore">
                                              <small>Score</small>
                                              <v-text-field
                                              type='number'
                                              label='Score'
                                              v-model="q.msg[0].quickReplies[QN].value"
                                              class="elevation-0 mt-0 pt-0 grey--text text--lighten-2"
                                              single-line
                                              >
                                              </v-text-field>
                                        </v-flex> -->
                                        <v-flex v-if="q.msg[0].askpostback" xs12 class="text-xs-left ">
                                          <!-- <v-layout >
                                            <v-flex xs3 class="text-xs-left mt-1"> -->
                                              <small>Post Back</small>
                                            <!-- </v-flex>
                                            <v-flex xs8> -->
                                              <v-text-field
                                          v-model="q.msg[0].quickReplies[QN].postback"
                                          placeholder='Please type your post back'
                                          class="elevation-0 mt-0 pt-0 grey--text text--lighten-2"
                                          single-line
                                          >
                                          </v-text-field>
                                            <!-- </v-flex>
                                          </v-layout> -->
                                        </v-flex>
                                      </div>

                                      </v-card>
                                    </v-flex>

                                  </div>
                                  <v-btn style="float:right" @click="addOption()">
                                    Add options
                                  </v-btn>
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
                                <template v-slot:activator="{ on, attrs }">
                                  <v-img
                                    height="200"
                                    width="300"
                                    slot="activator"
                                    v-bind="attrs" v-on="on"
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
                                  </template>
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
                                      <v-btn color="#4c3e9d" class="white--text" small>Done</v-btn>
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
                                        class="d-flex flex-row flex-wrap fill-height align-center justify-center ma-0"
                                        slot="placeholder"
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
                                        outline
                                        v-model="c.imgUrl"
                                        flat
                                        @click.stop
                                        name="url"
                                        label="Your image URL"
                                      ></v-text-field>
                                      <v-flex xs12 class="text-xs-right">
                                        <v-btn color="#4c3e9d" class="white--text" small>Done</v-btn>
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
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="#4c3e9d" block outline
                                          slot="activator"
                                          v-bind="attrs" v-on="on"
                                        >
                                          {{r.title}}
                                        </v-btn>
                                        </template>
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
                                            <v-btn color="#4c3e9d" class="white--text" small>Done</v-btn>
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
                                <div class="d-flex flex-row flex-wrap">
                                  <v-card class="mr-3" width="300"
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
                                          class="d-flex flex-row flex-wrap fill-height align-center justify-center ma-0"
                                          slot="placeholder"
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
                                          outline
                                          v-model="c.imgUrl"
                                          flat
                                          @click.stop
                                          name="url"
                                          label="Your image URL"
                                        ></v-text-field>
                                        <v-flex xs12 class="text-xs-right">
                                          <v-btn color="#4c3e9d" class="white--text" small>Done</v-btn>
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
                                        <template v-slot:activator="{ on, attrs }">
                                          <v-btn color="#4c3e9d" block outline slot="activator"
                                            v-bind="attrs" v-on="on"
                                          >
                                            {{r.title}}
                                          </v-btn>
                                        </template>
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
                                              <v-btn color="#4c3e9d" class="white--text" small>Done</v-btn>
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
                                </div>
                              </v-flex>

                              <!-- Quick replies -->
                              <v-flex class="" xs10 offset-xs1
                              v-if="q.type === 'quickReplies' || q.type === 'closeEnded'">
                              <div class="d-flex flex-row flex-wrap">
                                  <v-flex xs8 class="">
                                  </v-flex>
                                  <v-flex xs4 class="text-xs-right" >
                                    <v-tooltip max-width='250' top>
                                    <v-checkbox slot="activator" class="mt-0"
                                    style="float:right"
                                      color='primary'
                                      v-model="q.msg[0].viewPostback"
                                    label='Custom Postback'
                                  ></v-checkbox>
                                  <span>Customize Amara responses for each option</span>
                                    </v-tooltip>
                                  </v-flex>
                                </div>
                                <v-text-field
                                  v-if="q.msg"
                                  maxlength="300"
                                  class="elevation-0 grey--text text--lighten-2"
                                  v-model="q.msg[0].text"
                                  :name="`interactionText`"
                                  :error-messages="errors.collect('interactionText')"
                                  label="Please type your question"
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

                                <div
                                  class="text-xs-left d-flex flex-row flex-wrap justify-center" v-if="q.msg"
                                >
                                  <v-flex xs10 class="mb-3 text-center"
                                    v-for="(c, ci) in q.msg[0].quickReplies" :key="ci">
                                    <div class="d-flex">
                                      <v-flex xs3>
                                        <v-btn color="#4c3e9d" outline slot="activator">
                                        {{c.title}}</v-btn>
                                      </v-flex>
                                      <v-flex xs9>
                                        <v-text-field
                                          class="grey--text text--lighten-2 template-custom-field no-margin mb-2"
                                          maxlength="50"
                                          outline
                                          v-model="c.title"
                                          flat
                                          @click.stop
                                          name="quickReply"
                                          :label="`Rating ${ci+1}`"
                                        ></v-text-field>

                                        <v-text-field
                                        v-if="q.msg[0].viewPostback"
                                          class="grey--text text--lighten-2 template-custom-field no-margin mb-2"
                                          maxlength="300"
                                          outline
                                          v-model="c.postback"
                                          flat
                                          @click.stop
                                          name="postback"
                                          label="Amara's response"
                                        ></v-text-field>
                                      </v-flex>
                                    </div>
                                  </v-flex>

                                  <!-- Add new quick reply -->
                                  <span class="cursor-pointer" @click="addReplies(qi, 0, 'Answer')"
                                  v-if="q.msg && q.msg[0].quickReplies.length < 5 &&
                                  q.type === 'quickReplies'">
                                    <v-btn color="accent" small outline icon>
                                      <v-icon small>fas fa-plus</v-icon>
                                    </v-btn>Add reply
                                  </span>
                                </div>
                              </v-flex>

                            </div>
                          </v-card>
                        </v-flex>
                      </div>
                    </div>
                  </v-flex>

                  <!--<v-flex class="b-left" xs3>
                    <div class="mx-4">
                      <h3 class="mt-3"> How to create question ? </h3>
                      <h4 class="mt-2"> Driver </h4>
                      <span class="mt-2"> Select an engagement driver from the list to link with the question. </span>
                      <h4 class="mt-2"> Title </h4>
                      <span class="mt-2"> Set the title of the question. </span>
                      <h4 class="mt-2"> Response Labels and Postbacks </h4>
                      <span class="mt-2"> Set response labels and postbacks for the question. </span>
                    </div>
                  </v-flex>-->
                </div>

              </v-card>
            </v-flex>

          </div>
        </v-card-text>

        <v-card-actions align-content-space->
          <v-flex>
            <v-btn color="error" flat @click.stop="dialogs.newQuestion=false;">Close</v-btn>
          </v-flex>
          <v-spacer>
          </v-spacer>
          <v-flex text-xs-right v-if="!editFlag">
            <v-btn color="adhoc" class="white--text" @click.stop="validateDetails()" v-if="selectedQuesType && selectedQuesType[0].type === 'text'"> Add Statement </v-btn>
            <v-btn color="adhoc" class="white--text" @click.stop="validateDetails()" v-else> Add Question </v-btn>
          </v-flex>
          <v-flex text-xs-right v-else>
            <v-btn color="adhoc" class="white--text" @click.stop="validateDetails()" v-if="selectedQuesType && selectedQuesType[0].type === 'text'"> Update Statement </v-btn>
            <v-btn color="adhoc" class="white--text" @click.stop="validateDetails()" v-else> Update Question </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
// import { VAlert, VMenu, VSwitch, VTooltip, VTextarea, VCheckbox, VSelect, VChip } from 'vuetify';
// import { Container, Draggable } from 'vue-smooth-dnd';
import { mapState } from 'vuex';
// import axios from 'axios';
// import VueContentLoading from 'vue-content-loading';

export default {
  name: 'NewQuestion',
  // components: {
  //   VSwitch,
  //   VCheckbox,
  //   VAlert,
  //   VMenu,
  //   VTooltip,
  //   VTextarea,
  //   VSelect,
  //   Container,
  //   Draggable,
  //   VChip,
  //   VueContentLoading
  // },
  data () {
    return {
      dialogs: {
        newQuestion: false,
        questionBank: false,
        campaigns: false
      },
      selectedQuesType: null,
      config: {
        initialLoading: false
      },
      multipleOption: [],
      editFlag: false,
      questionIndex: null,
      showMenu: false,
      ifSmall: false,
      dataQ: this.$parent.multipleChoice[0].msg[0].quickReplies,
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
      newSurvey: {
        title: '',
        description: '',
        questions: [],
        type: ''
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    deleteReply (index, qi, oi) {
      if (this.newSurvey.questions[index].msg[qi].quickReplies &&
      this.newSurvey.questions[index].msg[qi].quickReplies.length > 1) {
        this.newSurvey.questions[index].msg[qi].quickReplies.splice(oi, 1);
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'info',
          show: true,
          text: 'At least one reply is required!'
        });
      }
    },
    addCard (index) {
      this.newSurvey.questions[index].msg.push({
        imgUrl: '',
        text: '',
        description: '',
        quickReplies: [
          {
            title: 'Yes',
            postback: 'Good to know!'
          }, {
            title: 'No',
            postback: 'That\'s sad'
          }
        ]
      });
    },
    addReplies (index, qi, text) {
      this.selectedQuesType.msg[qi].quickReplies.push({
        title: `${text} #${this.selectedQuesType.msg[qi].quickReplies.length + 1}`
      });
    },
    validateDetails () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          if (this.editFlag && (this.questionIndex || this.questionIndex === 0)) {
            this.updateQuestion();
          } else {
            this.addQuestion();
          }
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    addOption () {
      if (this.selectedQuesType[0] && this.selectedQuesType[0].msg[0].quickReplies.length < 10) {
        this.selectedQuesType[0].msg[0].quickReplies.push({
          placeholder: 'Enter Choice',
          text: '',
          // value: 0,
          followup: false,
          postback: 'Thank you for responding'
        });
      }
    },
    deleteOption (QN) {
      const temp = [];
      this.$lodash.each(this.selectedQuesType[0].msg[0].quickReplies, (t, ti) => {
        if (QN !== ti) {
          temp.push(t);
        }
      });
      this.selectedQuesType[0].msg[0].quickReplies = temp;
    },
    addQuestion () {
      delete this.selectedQuesType[0].msg[0].viewScore;
      delete this.selectedQuesType[0].msg[0].askpostback;
      delete this.selectedQuesType[0].viewPostback;
      delete this.selectedQuesType[0].msg[0].viewPostback;
      delete this.selectedQuesType[0].description;
      console.log(this.selectedQuesType[0]);
      this.$lodash.each(this.selectedQuesType[0].msg[0].quickReplies, (t) => {
        delete t.placeholder;
      });
      if (this.$parent && this.$parent.newSurvey) {
        this.$parent.newSurvey.interactions.push(this.selectedQuesType[0]);
        this.selectedQuesType = null;
        this.dialogs.newQuestion = false;
      }
    },
    updateQuestion () {
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
    update () {}
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hover-link:hover {
  color:#4c3e9d !important
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
    min-height: 130px;
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
.MultiChoiceQue {
  .v-input__slot:before {
    border:none !important;
  }
  .optionscard {
    input {
    background: #fafafa !important;
    padding-left: 5px;
  }
  }

}
</style>
