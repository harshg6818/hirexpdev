<template>
  <div class="">
    <v-layout column class="hide-overflow">

      <v-layout mx-4 mt-2 row wrap :reverse="ifSmall">
        <v-flex class="pr-4 mb-4" md3>
          <h3 class="subheading pt-2 pl-1">Bot Responses/Questions</h3>
            <draggable
              v-for="(b, bi) in questionTypes"
              :key="bi" group="people"
              @start="drag=true"
              @end="drag=false"
            >
            <!-- <Container
              class="layout row wrap mt-2"
              behaviour="copy"
              group-name="1"
              :get-child-payload="getQPayload">
              <Draggable class=" flex px-1 mb-4 text-xs-center sm6"  v-for="(b, bi) in questionTypes" :key="bi"> -->
              <v-card height="70" class="draggable-item mb-1 elevation-0" align-content-center>
                <v-icon large class="mt-3">{{b.img}}</v-icon>
              </v-card>
              <strong class="grey--text darken-1">
                {{b.title}}
              </strong>
              <!-- </Draggable>
            </Container> -->
            </draggable>
            <h3 class="subheading pt-3 pl-1">Responses/Questions with Driver</h3>
            <draggable
              v-for="(b, bi) in questionTypesD"
              :key="bi" group="people"
              @start="drag=true"
              @end="drag=false"
            >
          <!-- <Container
            class="layout row wrap mt-2"
            behaviour="copy"
            group-name="1"
            :get-child-payload="getDPayload">
            <Draggable class=" flex px-1 mb-4 text-xs-center sm6" v-for="(b, bi) in questionTypesD" :key="bi"> -->
                <v-card height="70" class="draggable-item mb-1 elevation-0" align-content-center>
                  <v-icon large class="mt-3">{{b.img}}</v-icon>
                </v-card>
                <strong class="grey--text darken-1">
                  {{b.title}}
                </strong>
            <!-- </Draggable>
          </Container> -->
          </draggable>
        </v-flex>

        <!-- Area to add elements -->
        <v-flex class="interactions" md9>
          <v-card class="elevation-0 interaction-card">

            <v-layout row wrap grey lighten-5 class="drag-container">
              <v-flex>
                <!-- No response -->
                <v-card height="220" class="text-xs-center pt-5 ma-5 elevation-0"
                v-show="newSurvey.interactions.length === 0 && !drag.startDragging">
                  <v-icon large color="primary">fas fa-hand-paper</v-icon>
                  <p class="headline font-weight-bold mt-4">No response added</p>
                  <span>Drag & drop questions and bot responses here to create your survey.</span>
                </v-card>
                <draggable
                  v-for="(q, qi) in newSurvey.interactions"
                  :key="qi" group="people"
                  @start="drag=true"
                  @end="drag=false"
                >
                <!-- <Container group-name="1"
                  @drop="onDrop($event)"
                  :drag-end="onDragEnd"
                  :get-child-payload="getIPayload"
                  drag-handle-selector=".handle"
                >
                  <Draggable v-for="(q, qi) in newSurvey.interactions" :key="qi"> -->
                    <v-card height="220" class="draggable-item text-xs-center pt-5 ma-5 elevation-0"
                      v-show="drag.startDragging && !drag.droppingNow &&
                      newSurvey.interactions.length === 0"
                      key="blank-response"
                    >
                      <v-icon large color="success">fas fa-thumbs-up</v-icon>
                      <p class="headline font-weight-bold mt-4">You are doing great!</p>
                      <span>Now drop the action here.</span>
                    </v-card>

                    <div class="draggable-item">
                      <v-flex class="pt-4 px-5 mb-4 action-card"
                      text-xs-center sm12>

                        <v-layout column class="actions" v-if="q.title !== 'Emoji Scale'">
                          <v-icon color="grey" class="mb-3 handle">
                            fas fa-arrows-alt
                          </v-icon>
                          <v-icon color="grey" class="mb-3" @click="deleteAction(qi)">
                            fas fa-trash
                          </v-icon>
                          <v-icon color="grey" @click="duplicateAction(q)">
                            fas fa-copy
                          </v-icon>
                        </v-layout>

                        <v-layout column class="title text-capitalize">
                          {{q.title}}
                        </v-layout>

                        <v-layout  column class="delay pb-4">
                          <v-flex>
                            <v-menu
                              offset-y
                              style="max-width: 600px"
                            >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn color="white" slot="activator"
                                v-bind="attrs"
                                v-on="on"
                                class="elevation-2 primary--text" icon
                              >
                                <small class="font-weight-bold">
                                  {{toSeconds(q.delay)}}
                                </small>
                              </v-btn>
                            </template>
                              <v-list class="pa-3">
                                <p class="text-xs-center">
                                  Typing indicator delay
                                </p>
                                <v-layout row wrap>
                                  <v-flex xs1>
                                    +0s
                                  </v-flex>
                                  <v-flex @click.stop>
                                    <v-slider
                                      min="1"
                                      max="10000"
                                      class="mt-2"
                                      v-model="q.delay"
                                      step="500"
                                      ticks
                                    ></v-slider>
                                  </v-flex>
                                  <v-flex xs1>
                                    +10s
                                  </v-flex>
                                  <v-flex xs12 class="text-xs-right">
                                    <v-btn color="primary" small>Done</v-btn>
                                  </v-flex>
                                </v-layout>
                              </v-list>
                            </v-menu>
                          </v-flex>
                          <v-flex class="delay-title subheading grey--text darken-3">
                            Change typing delay
                          </v-flex>
                        </v-layout>

                        <v-card class="mb-1 elevation-0">
                          <!-- <v-alert small color="primary" icon="fas fa-info-circle"
                          outline :value="true">
                            Some info message for the user
                          </v-alert> -->
                          <v-layout row wrap v-if="q.type === 'closeEnded' || (q.type === 'scale' && q.msg[0].scaleType !== 'emoji')">
                            <v-flex class="font-weight-bold pl-2 pt-2 mt-1">
                              Driver
                            </v-flex>
                            <v-flex lay class="text-xs-left" xs11>
                              <v-select
                                class="remove-msg"
                                :items="roleList"
                                chips
                                small-chips
                                :id="`role_${qi}`"
                                :name="`role_${qi}`"
                                solo flat
                                :error-messages="errors.collect(`role_${qi}`)"
                                v-validate="'required'"
                                item-text="title"
                                v-model="q.role"
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
                                label="What should bot say?"
                                autofocus
                                data-vv-as="interaction text"
                                v-validate="'required'"
                                single-line
                                outline
                              >
                              </v-text-field>

                              <v-layout row wrap v-if="q.msg[0].scaleType === 'emoji'" justify-center>
                                <v-flex xs2 text-xs-center v-for="(r, ri) in q.msg[0].scale" :key="ri">
                                  <v-menu
                                    absolute
                                    offset-y
                                    style="max-width: 600px"
                                  >
                                    <v-btn class="emoji-btn"
                                      slot="activator"
                                      fab flat round
                                    >
                                      <img v-if="r.img" :src="getImgUrl(r.img)"
                                      class="emoji-container" />
                                    </v-btn>
                                    <v-list class="pa-3">
                                      <v-text-field
                                        class="grey--text text--lighten-2"
                                        maxlength="50"
                                        outline
                                        v-model="r.title"
                                        flat
                                        @click.stop
                                        name="quickReply"
                                        label="Quick reply text"
                                      ></v-text-field>

                                      <v-text-field
                                        class="grey--text text--lighten-2"
                                        maxlength="300"
                                        outline
                                        v-model="r.postback"
                                        flat
                                        @click.stop
                                        name="postback"
                                        label="Postback"
                                      ></v-text-field>

                                      <v-flex xs12 class="text-xs-right">
                                        <v-btn color="primary" small>Done</v-btn>
                                      </v-flex>
                                    </v-list>
                                  </v-menu>
                                  <p class="text-xs-left">
                                    {{r.title}}
                                  </p>
                                </v-flex>
                              </v-layout>

                              <v-layout row wrap v-if="q.msg[0].scaleType === 'number'" justify-center>
                                <v-flex xs2 text-xs-center v-for="(r, ri) in q.msg[0].scale" :key="ri">
                                  <v-menu
                                    absolute
                                    offset-y
                                    style="max-width: 600px"
                                  >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="emoji-btn"
                                      :color="r.color"
                                      fab
                                      outline
                                      round
                                      v-bind="attrs"
                                      v-on="on"
                                      slot="activator"
                                    >
                                      <strong class="headline">
                                        {{r.value}}
                                      </strong>
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
                                        label="Quick reply text"
                                      ></v-text-field>

                                      <v-text-field
                                        class="grey--text text--lighten-2"
                                        maxlength="300"
                                        outline
                                        v-model="r.postback"
                                        flat
                                        @click.stop
                                        name="postback"
                                        label="Postback"
                                      ></v-text-field>

                                      <v-flex xs12 class="text-xs-right">
                                        <v-btn color="primary" small>Done</v-btn>
                                      </v-flex>
                                    </v-list>
                                  </v-menu>
                                  <p class="text-xs-left">
                                    {{r.title}}
                                  </p>
                                </v-flex>
                              </v-layout>
                            </v-flex>

                            <!-- Input from user -->
                            <v-flex class="" xs10 offset-xs1 v-if="q.type === 'textInput'">
                              <v-text-field
                                maxlength="300"
                                v-for="(t, ti) in q.msg"
                                :key="ti"
                                v-model="t.text"
                                @click:append="deleteOption(qi, ti);"
                                append-icon="fas fa-trash"
                                class="elevation-0 grey--text text--lighten-2"
                                :name="`interactionText_${qi}_${ti}`"
                                :error-messages="errors.collect(`interactionText_${qi}_${ti}`)"
                                label="What should bot say?"
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

                              <v-text-field
                                label="What should bot say?"
                                class="grey--text text--lighten-2"
                                @focus="addOption(qi)"
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
                                v-for="(t, ti) in q.msg"
                                :key="ti"
                                v-model="t.text"
                                @click:append="deleteOption(qi, ti);"
                                append-icon="fas fa-trash"
                                class="elevation-0 grey--text text--lighten-2"
                                :name="`interactionText_${qi}_${ti}`"
                                :error-messages="errors.collect(`interactionText_${qi}_${ti}`)"
                                label="What should bot say?"
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

                              <v-text-field
                                label="What should bot say?"
                                class="grey--text text--lighten-2"
                                @focus="addOption(qi)"
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
                                  v-bind="attrs"
                                  v-on="on"
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
                                    <v-btn color="primary" small>Done</v-btn>
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
                                    v-bind="attrs"
                                    v-on="on"
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
                                      <v-btn color="primary" small>Done</v-btn>
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
                                        <v-btn color="primary" block outline slot="activator" v-bind="attrs" v-on="on">
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
                                          label="Quick reply text"
                                        ></v-text-field>

                                        <v-text-field
                                          class="grey--text text--lighten-2"
                                          maxlength="300"
                                          outline
                                          v-model="r.postback"
                                          flat
                                          @click.stop
                                          name="postback"
                                          label="Postback"
                                        ></v-text-field>

                                        <v-flex xs12 class="text-xs-right">
                                          <v-btn color="error" small flat
                                          @click="deleteReply(qi, ci, ri)">Delete</v-btn>
                                          <v-btn color="primary" small>Done</v-btn>
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
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-img
                                        height="200"
                                        width="300"
                                        v-bind="attrs"
                                        v-on="on"
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
                                        <v-btn color="primary" small>Done</v-btn>
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
                                        <v-btn color="primary" block outline slot="activator" v-bind="attrs" v-on="on">
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
                                            label="Quick reply text"
                                          ></v-text-field>

                                          <v-text-field
                                            class="grey--text text--lighten-2"
                                            maxlength="300"
                                            outline
                                            v-model="r.postback"
                                            flat
                                            @click.stop
                                            name="postback"
                                            label="Postback"
                                          ></v-text-field>

                                          <v-flex xs12 class="text-xs-right">
                                            <v-btn color="error" small flat
                                            @click="deleteReply(qi, ci, ri)">Delete</v-btn>
                                            <v-btn color="primary" small>Done</v-btn>
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
                            <v-flex class="" xs10 offset-xs1 v-if="q.type === 'quickReplies' || q.type === 'closeEnded'">
                              <v-text-field
                                v-if="q.msg"
                                maxlength="300"
                                class="elevation-0 grey--text text--lighten-2"
                                v-model="q.msg[0].text"
                                :name="`interactionText`"
                                :error-messages="errors.collect('interactionText')"
                                label="Enter your message here"
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

                              <div class="text-xs-left" v-if="q.msg">
                                <v-menu v-for="(c, ci) in q.msg[0].quickReplies" :key="ci"
                                  absolute
                                  offset-y
                                  style="max-width: 600px"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn color="primary" outline slot="activator"
                                    v-bind="attrs"
                                    v-on="on"
                                  >{{c.title}}</v-btn>
                                </template>
                                  <v-list class="pa-3">
                                    <v-text-field
                                      class="grey--text text--lighten-2"
                                      maxlength="50"
                                      outline
                                      v-model="c.title"
                                      flat
                                      @click.stop
                                      name="quickReply"
                                      label="Quick reply text"
                                    ></v-text-field>

                                    <v-text-field
                                      class="grey--text text--lighten-2"
                                      maxlength="300"
                                      outline
                                      v-model="c.postback"
                                      flat
                                      @click.stop
                                      name="postback"
                                      label="Postback"
                                    ></v-text-field>

                                    <v-flex xs12 class="text-xs-right">
                                      <v-btn color="error" small flat
                                      v-if="q.type === 'quickReplies'"
                                      @click="deleteReply(qi, 0, ci)">Delete</v-btn>
                                      <v-btn color="primary" small>Done</v-btn>
                                    </v-flex>
                                  </v-list>
                                </v-menu>

                                <!-- Add new quick reply -->
                                <span class="cursor-pointer" @click="addReplies(qi, 0, 'Answer')"
                                v-if="q.msg[0].quickReplies.length < 5 && q.type === 'quickReplies'">
                                  <v-btn color="accent" small outline icon>
                                    <v-icon small>fas fa-plus</v-icon>
                                  </v-btn>Add reply
                                </span>
                              </div>
                            </v-flex>

                          </v-layout>
                        </v-card>
                      </v-flex>
                    </div>
                  <!-- </Draggable>
                </Container> -->
                </draggable>
              </v-flex>
            </v-layout>

          </v-card>
        </v-flex>

      </v-layout>
    </v-layout>
  </div>
</template>

<script>
// import { VAlert, VMenu, VSlider, VTextarea, VSelect, VChip } from 'vuetify';
// import { Container, Draggable } from 'vue-smooth-dnd';
import draggable from 'vuedraggable';
import { mapState } from 'vuex';
import axios from 'axios';
// import VueContentLoading from 'vue-content-loading';

export default {
  name: 'newSurvey',
  components: {
    // VAlert,
    // VMenu,
    // VTextarea,
    // VSlider,
    // VSelect,
    // Container,
    // Draggable,
    // VChip,
    // VueContentLoading,
    draggable
  },
  data () {
    return {
      config: {
        initialLoading: false,
        emojiScale: {
          delay: 2000,
          title: 'Emoji Scale',
          type: 'scale',
          role: 'mood',
          img: 'fas fa-arrows-alt-h',
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
                title: 'Disappointed',
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
                title: 'Awesome',
                img: 'in-love',
                value: 5,
                postback: 'That\'s awesome!'
              }
            ]
          }],
          responseRequired: true,
          response: []
        }
      },
      showMenu: false,
      drag: {
        startDragging: false,
        droppingNow: false
      },
      ifSmall: false,
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
      }, {
        title: 'Customer Focus',
        value: 'customerFocus'
      }, {
        title: 'Job Security',
        value: 'jobSecurity'
      }, {
        title: 'Work/Life Balance',
        value: 'workLifeBalance'
      }, {
        title: 'Innovation',
        value: 'innovation'
      }, {
        title: 'Recognition',
        value: 'recognition'
      }, {
        title: 'Freedom of opinion',
        value: 'freedomOfOpinion'
      }, {
        title: 'Engaging Leadership',
        value: 'engagingLeadership'
      }],
      questionTypesD: [
        {
          delay: 2000,
          title: 'Number Scale',
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
                title: 'Disappointed',
                color: 'deep-orange',
                value: 2,
                postback: 'That\'s not good'
              }, {
                title: 'Good',
                color: 'orange',
                value: 3,
                postback: 'I think we can improve'
              }, {
                title: 'Really good',
                color: 'light-green',
                value: 4,
                postback: 'That\'s good to know'
              }, {
                title: 'Brilliant',
                color: 'green',
                value: 5,
                postback: 'I am happy to know'
              }
            ]
          }],
          responseRequired: true,
          response: []
        }, {
          delay: 2000,
          title: 'Yes/No (Close Ended)',
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
          responseRequired: true,
          response: []
        }
      ],
      questionTypes: [{
        delay: 2000,
        title: 'Text',
        type: 'text',
        img: 'fas fa-align-left',
        msg: [],
        responseRequired: false,
        response: []
      }, {
        delay: 2000,
        title: 'Input From User',
        type: 'textInput',
        img: 'fas fa-keyboard',
        msg: [],
        responseRequired: true,
        response: []
      }, {
        delay: 2000,
        title: 'Image',
        type: 'image',
        msg: [{
          imgUrl: ''
        }],
        img: 'fas fa-image',
        responseRequired: false,
        response: []
        // }, {
        //   delay: 2000,
        //   title: 'Card',
        //   type: 'card',
        //   msg: [{
        //     imgUrl: '',
        //     text: '',
        //     description: '',
        //     quickReplies: [
        //       {
        //         title: 'Yes',
        //         postback: 'Good to know!',
        //       }, {
        //         title: 'No',
        //         postback: 'That\'s sad',
        //       },
        //     ],
        //   }],
        //   img: 'fas fa-book',
        //   responseRequired: true,
        //   response: [],
        // }, {
        //   delay: 2000,
        //   title: 'Carousel',
        //   type: 'carousel',
        //   msg: [{
        //     imgUrl: '',
        //     text: '',
        //     description: '',
        //     quickReplies: [
        //       {
        //         title: 'Yes',
        //         postback: 'Good to know!',
        //       }, {
        //         title: 'No',
        //         postback: 'That\'s sad',
        //       },
        //     ],
        //   }],
        //   img: 'fas fa-images',
        //   responseRequired: true,
        //   response: [],
      }, {
        delay: 2000,
        title: 'Quick Replies',
        type: 'quickReplies',
        msg: [{
          text: '',
          quickReplies: [
            {
              title: 'Yes',
              postback: 'Good to know!'
            }, {
              title: 'No',
              postback: 'That\'s sad'
            }
          ]
        }],
        img: 'fas fa-reply-all',
        responseRequired: true,
        response: []
      }
      ],
      newSurvey: {
        title: '',
        description: '',
        interactions: [],
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
    applyDrag (arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      return result;
    },
    getQPayload (index) {
      this.drag.startDragging = true;
      return this.questionTypes[index];
    },
    getDPayload (index) {
      this.drag.startDragging = true;
      return this.questionTypesD[index];
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
    deleteReply (index, qi, oi) {
      if (this.newSurvey.interactions[index].msg[qi].quickReplies &&
      this.newSurvey.interactions[index].msg[qi].quickReplies.length > 1) {
        this.newSurvey.interactions[index].msg[qi].quickReplies.splice(oi, 1);
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'info',
          show: true,
          text: 'At least one reply is required!'
        });
      }
    },
    addCard (index) {
      this.newSurvey.interactions[index].msg.push({
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
      this.newSurvey.interactions[index].msg[qi].quickReplies.push({
        title: `${text} #${this.newSurvey.interactions[index].msg[qi].quickReplies.length + 1}`
      });
    },
    addOption (index) {
      this.newSurvey.interactions[index].msg.push({
        text: ''
      });
    },
    deleteOption (index, oi) {
      if (this.newSurvey.interactions[index].msg &&
      this.newSurvey.interactions[index].msg.length > 1) {
        this.newSurvey.interactions[index].msg.splice(oi, 1);
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'info',
          show: true,
          text: 'At least one response is required!'
        });
      }
    },
    toSeconds (millisec) {
      const sec = (millisec / 1000).toFixed(1);
      return `+${sec}s`;
    },
    deleteAction (i) {
      this.newSurvey.interactions.splice(i, 1);
    },
    duplicateAction (item) {
      this.newSurvey.interactions.push(item);
    },
    onResize (e) {
      // console.log(e);
    },
    onMove (evt) {
      if (evt && evt.draggedContext && evt.draggedContext.futureIndex > -1 &&
      this.newSurvey.interactions[evt.draggedContext.futureIndex]) {
        this.newSurvey.interactions[evt.draggedContext.futureIndex] =
        JSON.parse(JSON.stringify(this.newSurvey.interactions[evt.draggedContext.futureIndex]));
      }
      this.drag.droppingNow = true;
    },
    validateDetails () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.saveSurvey();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    saveSurvey () {
      if (this.newSurvey.id) {
        axios.patch(`${process.env.VUE_APP_API_URL}survey/update/${this.newSurvey.id}`, this.newSurvey).then((response) => {
          this.refreshing = false;
          if (response && response.data && response.data.status === 200) {
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Survey updated successfully!'
            });
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
      } else {
        this.newSurvey.type = this.$route.query.type;
        axios.post(`${process.env.VUE_APP_API_URL}survey/add`, this.newSurvey).then((response) => {
          this.refreshing = false;
          if (response && response.data && response.data.Response === 'Success') {
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Survey created successfully!'
            });
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
      }
    },
    update () {}
  },
  created () {
    window.scrollTo(0, 0);
    document.addEventListener('resize', this.onResize);
  },
  destroyed () {
    document.removeEventListener('resize', this.onResize);
  },
  beforeMount () {
    if (this.$route.params && this.$route.params.surveyId) {
      this.getSurvey(this.$route.params.surveyId);
    }
    if (this.$route.query && this.$route.query.type && this.$route.query.type === 'lifecycle') {
      this.newSurvey.interactions.push(this.config.emojiScale);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

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
  height: calc(100vh - 7em);
  .drag-container {
    height: calc(100vh - 13.1em);
    overflow-y: auto;
    overflow-x: hidden;
  }
  .smooth-dnd-container {
    min-height: 70vh;
  }
}
.smooth-dnd-draggable-wrapper {
  padding-top: 16px!important;
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
    border-left: 2px dashed #cfd7e0;
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
</style>
