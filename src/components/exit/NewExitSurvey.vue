<template>
  <div>
    <v-layout row wrap class="">
        <v-flex xs3 class="px-0 pl-3 maximum-step-content">
            <h3 class="subheading pt-2 mb-2 pl-1"> DESIGN THE CHAT FLOW </h3>
            <div style="border:1px solid lightgrey;overflow-y:auto;height:90%">
            <!--<h3 class="subheading mt-3 pt-3 pl-1">Question Bank</h3>
            <h2 class="grey--text subheading b-bottom pl-1">
              Choose a source for your questions
            </h2>-->
            <v-layout class="row wrap mt-0">
                <div class="flex px-1 py-2 sm12 mt-2 b-bottom
                d-inline-flex cursor-pointer question-type"
                @click="updateQuestionSource('campaign')">
                <v-icon color="primary" small class="mt-0 mr-3"
                style="max-width:40px">fa fa-copy</v-icon>
                <span class="darken-1" style="font-size:16px">
                    Copy from existing touchpoint
                </span>
                </div>
                <!-- <div class="flex b-bottom px-1 py-2 mt-2 b-bottom sm12
                d-inline-flex cursor-pointer question-type"
                @click="updateQuestionSource('question_bank')">
                <v-icon color="primary" small class="mt-0 mr-3"
                style="max-width:40px;">fa fa-clipboard-list</v-icon>
                <span class="darken-1" style="font-size:16px">
                    Create using existing template
                </span>
                </div> -->
            </v-layout>

            <h3 class="subheading mt-3 pt-3 pl-1"> <strong> Draft a new question </strong></h3>
            <h2 class="grey--text subheading b-bottom pl-1">
              Choose a question type to add new question
            </h2>
            <!--<h3 class="subheading pt-2 mb-2 pl-1">Bot Responses/Questions</h3>-->
            <v-layout  class="row wrap mt-0">
                <div class="flex px-1 py-2 sm12 mt-2 b-bottom cursor-pointer question-type"
                v-for="(b, bi) in questionTypes" :key="bi" @click="updateQuestion(b)">
                <div class="d-inline-flex">
                    <v-icon color="primary" small class="mt-0 mr-3 ml-3" style="max-width:40px;">
                      {{b.img}}
                    </v-icon>
                    <span class="darken-1" style="font-size:16px">
                    {{b.title}}
                    </span>
                </div>
                <div class="d-inline-flex">
                    <v-icon small class="mt-0 mr-3" style="max-width:40px;"></v-icon>
                    <span class="grey--text" style="font-size:10px;margin-left:35px">
                    {{b.description}}
                    </span>
                </div>
                </div>
            </v-layout>

            <!--<h3 class="subheading pt-2 mb-2 pl-1">Emoji Scale</h3>-->
            <v-layout  class="row wrap mt-0">
                <div class="flex px-1 py-2 sm12 mt-2 b-bottom cursor-pointer question-type"
                @click="updateQuestion(config.emojiScale)">
                <div class="d-inline-flex">
                    <v-icon color="primary" small class="mt-0 mr-3 ml-3" style="max-width:40px;">
                      {{config.emojiScale.img}}
                    </v-icon>
                    <span class="darken-1" style="font-size:16px">
                    {{config.emojiScale.title}}
                    </span>
                </div>
                <div class="d-inline-flex">
                    <v-icon small class="mt-0 mr-3" style="max-width:40px;"></v-icon>
                    <span class="grey--text" style="font-size:10px;margin-left:35px">
                    {{config.emojiScale.description}}
                    </span>
                </div>
                </div>
            </v-layout>

            <!--<h3 class="subheading pt-2 mb-2 pl-1">Responses/Questions with Driver</h3>-->
            <v-layout class="row wrap mt-0">
                <div class="flex px-1 py-2 sm12 mt-2 b-bottom cursor-pointer question-type"
                v-for="(b, bi) in questionTypesD" :key="bi" @click="updateQuestion(b)">
                <div class="d-inline-flex">
                    <v-icon color="primary" small class="mt-0 mr-3 ml-3" style="max-width:40px;">
                      {{b.img}}
                    </v-icon>
                    <span class="darken-1" style="font-size:16px">
                    {{b.title}}
                    </span>
                </div>
                <div class="d-inline-flex">
                    <v-icon small class="mt-0 mr-3" style="max-width:40px;"></v-icon>
                    <span class="grey--text" style="font-size:10px;margin-left:35px">
                    {{b.description}}
                    </span>
                </div>
                </div>
            </v-layout>

            <v-layout  class="row wrap mt-0">
                <div class="flex px-1 py-2 sm12 mt-2 b-bottom cursor-pointer question-type"
                v-for="(b, bi) in statements" :key="bi" @click="updateQuestion(b)">
                <div class="d-inline-flex">
                    <v-icon color="primary" small class="mt-0 mr-3 ml-3" style="max-width:40px;">
                      {{b.img}}
                    </v-icon>
                    <span class="darken-1" style="font-size:16px">
                    {{b.title}}
                    </span>
                </div>
                <div class="d-inline-flex">
                    <v-icon small class="mt-0 mr-3" style="max-width:40px;"></v-icon>
                    <span class="grey--text" style="font-size:10px;margin-left:35px">
                    {{b.description}}
                    </span>
                </div>
                </div>
            </v-layout>

            <!--<h3 class="subheading mt-3 pt-3 pl-1"> <strong>
              Draft Amara's statement
            </strong></h3>-->
            <!--<h2 class="grey--text subheading b-bottom pl-1">
              Choose a question type to add new question
            </h2>-->
            </div>
        </v-flex>

        <v-flex xs9 class="maximum-step-content interactions" style="overflow-y:auto">
          <v-card class="elevation-0 interaction-card">
            <v-layout row wrap grey lighten-5 class="drag-container">
              <v-flex>
                <v-card height="220" class="text-xs-center pt-5 ma-5 elevation-0"
                v-show="newSurvey.interactions.length === 0 && !drag.startDragging">
                <v-icon large color="#0d2c8d">fas fa-hand-paper</v-icon>
                <p class="headline font-weight-bold mt-4">No questions added</p>
                <span>Select question type or question to create survey.</span>
                </v-card>

                <!-- <Container group-name="1"
                class="pt-4"
                @drop="onDrop($event)"
                :drag-end="onDragEnd"
                :get-child-payload="getIPayload"
                drag-handle-selector=".handle"
                >
                <Draggable v-for="(q, qi) in newSurvey.interactions" :key="qi"> -->
                  <draggable v-for="(q, qi) in newSurvey.interactions" :key="qi" group="people" @start="drag=true" @end="drag=false">
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
                    <v-flex class="pr-2 px-5 mb-4 action-card"
                    text-xs-center sm12>

                        <v-layout column class="actions"
                        v-if="qi !== 0"
                        :style="getDragPosition(q.type)">
                        <v-tooltip bottom>
                            <v-icon color="grey" class="mb-3 handle" slot="activator">
                            fas fa-arrows-alt
                            </v-icon>
                            Move
                        </v-tooltip>
                        </v-layout>

                        <!--<v-layout column class="title text-capitalize">
                        {{q.title}}
                        </v-layout>-->

                        <!--<v-layout  column class="delay pb-4">
                        <v-flex>
                            <v-menu
                            offset-y
                            style="max-width: 600px"
                            >
                            <v-btn color="white" slot="activator"
                            class="elevation-2 primary--text" icon>
                                <small class="font-weight-bold">
                                {{toSeconds(q.delay)}}
                                </small>
                            </v-btn>
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
                                    color="#0d2c8d"
                                    ></v-slider>
                                </v-flex>
                                <v-flex xs1>
                                    +10s
                                </v-flex>
                                <v-flex xs12 class="text-xs-right">
                                    <v-btn color="#0d2c8d" class="white--text" small>Done</v-btn>
                                </v-flex>
                                </v-layout>
                            </v-list>
                            </v-menu>
                        </v-flex>
                        <v-flex class="delay-title subheading grey--text darken-3">
                            Change typing delay
                        </v-flex>
                        </v-layout>-->

                        <v-card class="mb-1 elevation-0">
                        <!-- <v-alert small color="#0d2c8d" icon="fas fa-info-circle"
                        outline :value="true">
                            Some info message for the user
                        </v-alert> -->
                        <v-layout row wrap style="min-height:48px">
                            <v-flex xs2 v-if="q.type !== 'text' && qi !== 0"
                            class="font-weight-bold pl-2 pt-2 mt-1">
                            Identifiers
                            </v-flex>
                            <v-flex v-if="q.type !== 'text' && qi !== 0" lay class="text-xs-left" xs3>
                              <v-select
                                class="remove-msg"
                                :items="identifiers"
                                item-text="name"
                                item-value="value"
                                chips
                                small-chips
                                :id="`role_${qi}`"
                                :name="`role_${qi}`"
                                solo flat
                                disabled
                                v-model="q.driver"
                                label="Select from the list"
                              ></v-select>
                            </v-flex>

                            <v-spacer> </v-spacer>

                            <v-flex xs2 class="text-right">
                            <v-layout>
                                <v-flex xs4>
                                <v-tooltip bottom>
                                    <v-icon color="grey" class="mt-3" @click="editAction(q, qi, true)"
                                    slot="activator">
                                    fas fa-edit
                                    </v-icon>
                                    Edit
                                </v-tooltip>
                                </v-flex>
                                <v-flex xs4 v-if="qi !== 0">
                                <v-tooltip bottom>
                                    <v-icon color="grey" class="mt-3" @click="deleteAction(qi)"
                                    slot="activator">
                                    fas fa-trash
                                    </v-icon>
                                    Delete
                                </v-tooltip>
                                </v-flex>
                                <v-flex xs4>
                                <v-tooltip bottom>
                                    <v-icon color="grey" class="mt-3" @click="duplicateAction(q)"
                                    slot="activator">
                                    fas fa-copy
                                    </v-icon>
                                    Copy
                                </v-tooltip>
                                </v-flex>
                            </v-layout>
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
                                disabled
                                outline
                            >
                            </v-text-field>

                            <v-layout row wrap
                            v-if="q.msg && q.msg[0].scaleType === 'emoji'" justify-center>
                                <v-flex xs2 text-xs-center
                                v-for="(r, ri) in q.msg[0].scale" :key="ri">
                                <v-menu
                                    absolute
                                    disabled
                                    offset-y
                                    style="max-width: 600px"
                                >
                                    <v-btn class="emoji-btn"
                                    slot="activator"
                                    fab flat round disabled
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
                                        :label="`Rating ${ri+1}`"
                                        disabled
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
                                        disabled
                                    ></v-text-field>

                                    <v-flex xs12 class="text-xs-right">
                                        <v-btn color="#0d2c8d" class="white--text" small disabled>
                                          Done
                                        </v-btn>
                                    </v-flex>
                                    </v-list>
                                </v-menu>
                                <p class="text-xs-center">
                                    {{r.title}}
                                </p>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap
                            v-if="q.msg && q.msg[0].scaleType === 'number'" justify-center>
                                <v-flex xs2 text-xs-center
                                v-for="(r, ri) in q.msg[0].scale" :key="ri">
                                <v-menu
                                    absolute
                                    offset-y
                                    disabled
                                    style="max-width: 600px"
                                >
                                    <v-btn class="emoji-btn"
                                    :color="r.color"
                                    fab
                                    outline
                                    round
                                    disabled
                                    slot="activator"
                                    >
                                    <strong class="headline">
                                        {{r.value}}
                                    </strong>
                                    </v-btn>
                                    <v-list class="pa-3">
                                    <v-text-field
                                        class="grey--text text--lighten-2"
                                        maxlength="50"
                                        outline
                                        v-model="r.title"
                                        flat
                                        disabled
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
                                        disabled
                                        @click.stop
                                        name="postback"
                                        label="Amara's response"
                                    ></v-text-field>

                                    <v-flex xs12 class="text-xs-right">
                                        <v-btn color="#0d2c8d"  class="white--text" small disabled>
                                          Done
                                        </v-btn>
                                    </v-flex>
                                    </v-list>
                                </v-menu>
                                <p class="text-xs-center">
                                    {{r.title}}
                                </p>
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
                                disabled
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
                                disabled
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
                                v-if="q.msg"
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
                                    <v-progress-circular v-show="q.msg && q.msg[0].imgUrl"
                                    indeterminate color="grey lighten-5">
                                    </v-progress-circular>
                                </v-layout>
                                </v-img>
                                <v-list class="pa-3">
                                <v-text-field
                                    maxlength="1000"
                                    outline
                                    v-if="q.msg"
                                    v-model="q.msg[0].imgUrl"
                                    flat
                                    disabled
                                    @click.stop
                                    name="url"
                                    label="Your image URL"
                                ></v-text-field>
                                <v-flex xs12 class="text-xs-right">
                                    <v-btn color="#0d2c8d"  class="white--text" small disabled>
                                      Done
                                    </v-btn>
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
                                    disabled
                                    @click.stop
                                    name="url"
                                    label="Your image URL"
                                    ></v-text-field>
                                    <v-flex xs12 class="text-xs-right">
                                    <v-btn color="#0d2c8d"  class="white--text" small disabled>
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
                                    disabled
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
                                    <v-btn color="#0d2c8d" block outline slot="activator">
                                    {{r.title}}</v-btn>
                                    <v-list class="pa-3">
                                        <v-text-field
                                        class="grey--text text--lighten-2"
                                        maxlength="50"
                                        outline
                                        v-model="r.title"
                                        flat
                                        disabled
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
                                        disabled
                                        @click.stop
                                        name="postback"
                                        label="Amara's response"
                                        ></v-text-field>

                                        <v-flex xs12 class="text-xs-right">
                                        <v-btn color="error" small flat disabled
                                        @click="deleteReply(qi, ci, ri)">Delete</v-btn>
                                        <v-btn color="#0d2c8d"  class="white--text" small disabled>
                                          Done
                                        </v-btn>
                                        </v-flex>
                                    </v-list>
                                    </v-menu>

                                    <!-- Add new quick reply -->
                                    <p class="cursor-pointer mb-0 text-sm-center"
                                    v-if="c.quickReplies.length < 5"
                                    style="width: 20em;" @click="addReplies(qi, ci, 'Button')">
                                    <v-btn color="accent" class="mr-2" small outline icon disabled>
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
                                    disabled
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
                                        disabled
                                        @click.stop
                                        name="url"
                                        label="Your image URL"
                                    ></v-text-field>
                                    <v-flex xs12 class="text-xs-right">
                                        <v-btn color="#0d2c8d"  class="white--text" small disabled>
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
                                    disabled
                                    @click.stop
                                    name="cardTitle"
                                    label="Enter your message here"
                                    ></v-text-field>
                                </h3>
                                <div>
                                    <v-textarea
                                    maxlength="500"
                                    flat
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
                                    <v-btn color="#0d2c8d" block outline slot="activator">
                                        {{r.title}}</v-btn>
                                        <v-list class="pa-3">
                                        <v-text-field
                                            class="grey--text text--lighten-2"
                                            maxlength="50"
                                            outline
                                            v-model="r.title"
                                            flat
                                            disabled
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
                                            disabled
                                            @click.stop
                                            name="postback"
                                            label="Amara's response"
                                        ></v-text-field>

                                        <v-flex xs12 class="text-xs-right">
                                            <v-btn color="error" small flat
                                            @click="deleteReply(qi, ci, ri)" disabled>Delete</v-btn>
                                            <v-btn color="#0d2c8d"  class="white--text" small disabled>
                                              Done
                                            </v-btn>
                                        </v-flex>
                                        </v-list>
                                    </v-menu>

                                    <!-- Add new quick reply -->
                                    <p class="cursor-pointer mb-0 text-sm-center"
                                    v-if="c.quickReplies.length < 5"
                                    style="width: 20em;" @click="addReplies(qi, ci, 'Button')">
                                        <v-btn color="accent" class="mr-2" small disabled outline icon>
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
                                    <v-btn color="accent" class="mr-2" small disabled outline icon>
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
                                disabled
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
                                disabled
                                offset-y
                                style="max-width: 600px"
                                >
                                <v-btn color="#0d2c8d" outline slot="activator" disabled>
                                  {{c.title}}
                                </v-btn>
                                <v-list class="pa-3">
                                    <v-text-field
                                    class="grey--text text--lighten-2"
                                    maxlength="50"
                                    outline
                                    v-model="c.title"
                                    flat
                                    disabled
                                    @click.stop
                                    name="quickReply"
                                    :label="`Rating ${ci+1}`"
                                    ></v-text-field>

                                    <v-text-field
                                    class="grey--text text--lighten-2"
                                    maxlength="300"
                                    outline
                                    v-model="c.postback"
                                    flat
                                    disabled
                                    @click.stop
                                    name="postback"
                                    label="Amara's response"
                                    ></v-text-field>

                                    <v-flex xs12 class="text-xs-right">
                                    <v-btn color="error" small flat
                                    v-if="q.type === 'quickReplies'"
                                    @click="deleteReply(qi, 0, ci)" disabled>Delete</v-btn>
                                    <v-btn color="#0d2c8d"  class="white--text" small disabled>
                                      Done
                                    </v-btn>
                                    </v-flex>
                                </v-list>
                                </v-menu>

                                <!-- Add new quick reply -->
                                <span class="cursor-pointer" @click="addReplies(qi, 0, 'Answer')"
                                v-if="q.msg && q.msg[0].quickReplies.length < 5
                                && q.type === 'quickReplies'">
                                <v-btn color="accent" small disabled outline icon>
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
  <newQuestion ref="newQuestion" v-show="questionSource === 'new'"></newQuestion>
  <questionBank ref="question_bank" v-show="questionSource === 'question_bank'"></questionBank>
  <campaigns ref="campaign" v-show="questionSource === 'campaign'"></campaigns>

  </div>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable quotes */
import { mapState, mapActions } from 'vuex';
// import { Container, Draggable } from 'vue-smooth-dnd';
import draggable from 'vuedraggable';
// import { ContentLoader } from 'vue-content-loader';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import axios from 'axios';
import newQuestion from './exitNewQuestion';
import questionBank from './exitQuestionBank';
import campaigns from './exitTemplates';
// import {
//   VCheckbox,
//   VAlert,
//   VAvatar,
//   VAutocomplete,
//   VTooltip,
//   VSlider,
// } from 'vuetify';
dayjs.extend(relativeTime);

export default {
  name: 'NewExitSurvey',
  components: {
    // ContentLoader,
    // Container,
    // Draggable,
    // VCheckbox,
    // VAlert,
    // VAvatar,
    // VAutocomplete,
    // VTooltip,
    draggable,
    newQuestion,
    questionBank,
    campaigns
    // VSlider,
  },
  data () {
    return {
      ticksLabels: [
        'Figs',
        'Pear',
        'Apple'
      ],
      unlockStepper: false,
      audienceSource: null,
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
      drag: {
        startDragging: false,
        droppingNow: false
      },
      newSurvey: {
        title: '',
        description: '',
        interactions: [],
        type: 'lifecycle'
      },
      questionSource: null,
      questionTypesD: [{
        delay: 2000,
        title: 'NPS Scale',
        description: 'This require respondents to type their answer into a comment box',
        type: 'scale',
        img: 'fas fa-sliders-h',
        msg: [{
          text: '',
          scaleType: 'nps'
        }],
        responseRequired: true,
        response: []
      }, {
        delay: 2000,
        title: 'Rating scale',
        description: 'The respondent selects the number that most accurately represents their response',
        type: 'scale',
        role: '',
        img: 'fas fa-arrows-alt-h',
        msg: [{
          text: '',
          scaleType: 'number',
          scale: [
            {
              title: 'Awful',
              color: 'red',
              value: 1,
              postback: 'I am really sorry to hear that'
            }, {
              title: 'Not very good',
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
        title: 'Yes/No',
        description: 'Used where ambiguity is the enemy',
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
      }],
      statements: [{
        delay: 2000,
        title: `Filler statement by Amara`,
        type: 'text',
        img: 'fas fa-align-left',
        msg: [{
          text: ''
        }],
        responseRequired: false,
        response: []
      }],
      questionTypes: [{
        delay: 2000,
        title: 'Open ended question',
        description: 'This require respondents to type their answer into a comment box',
        type: 'textInput',
        img: 'fas fa-keyboard',
        msg: [{
          text: ''
        }],
        responseRequired: true,
        response: []
      }, {
        delay: 2000,
        title: 'Quick Replies',
        description: 'This require respondents to select from a list of available answers',
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
      }],
      identifiers: [{
        name: 'NPS Scale',
        value: 'NPS Scale'
      }, {
        name: 'Exit Reasons',
        value: 'Exit Reasons'
      }],
      roleList: [],
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
          title: 'About the miilestone',
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
        }],
        emojiScale: {
          delay: 2000,
          title: 'Emoji Scale',
          description: 'Used to determine how someone feels about your company',
          type: 'scale',
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
                postback: `I am very sorry to hear that 😞`
              }, {
                title: 'Disappointed',
                img: 'sad',
                value: 2,
                postback: 'Ah! That\'s bad.'
              }, {
                title: 'Okay',
                img: 'shocked',
                value: 3,
                postback: 'Hmmmmm alright!'
              }, {
                title: 'Good',
                img: 'happy',
                value: 4,
                postback: 'That\'s nice!'
              }, {
                title: 'Awesome',
                img: 'in-love',
                value: 5,
                postback: 'I am so glad to know that 🙂'
              }
            ]
          }],
          responseRequired: true,
          response: []
        }
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
      list: {
        employees: [],
        survey: [],
        timeDuration: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
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
      }
    })
  },
  methods: {
    getColor (val) {
      let color = 'primary';
      if (val < 30) color = 'red';
      if (val < 50) color = 'orange';
      if (val < 70) color = 'teal';
      if (val < 100) color = 'green';
      return color;
    },
    ...mapActions(['getCompanyUsers']),
    addMoodQuestion () {
      if (!this.newSurvey.interactions || !this.newSurvey.interactions.length) {
        const temp = JSON.parse(JSON.stringify(this.config.emojiScale));
        // let interaction = [];
        if (temp.msg && temp.msg[0]) {
          temp.msg[0].text = `How do you feel about your last ${this.newStage.triggerTimeDuration} ${this.newStage.triggerTimeUnit} at ${this.user.company_name} ?`;
          temp.driver = 'Mood';
          temp.sub_driver = 'Mood';
        }
        this.newSurvey.interactions.push(temp);
        // interaction.push(temp);
        // this.newSurvey.interactions = JSON.parse(JSON.stringify(interaction));
      }
    },
    getRoleName (role) {
      role = role.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
      return role;
    },
    updateQuestion (ques, index, editFlag) {
      this.$refs.newQuestion.identifiers = this.identifiers;
      this.$refs.newQuestion.selectedQuesType = {};
      this.$refs.newQuestion.selectedQuesType['0'] = JSON.parse(JSON.stringify(ques));
      this.$refs.newQuestion.editFlag = editFlag;
      this.$refs.newQuestion.questionIndex = index;
      this.newQuestion.questions = {};
      this.newQuestion.questions = {
        ...this.newQuestion.questions,
        ...this.selectedQuesType
      };
      this.questionSource = 'new';
      this.$refs.newQuestion.dialogs.newQuestion = true;
    },
    updateQuestionSource (source) {
      if (source === 'question_bank') {
        this.$refs[source].identifiers = this.identifiers;
        this.$refs[source].roleList = this.roleList;
        if (this.identifiers && this.identifiers.length > 0) {
          this.$refs[source].identifiers = this.identifiers[0].value;
        } else {
          this.$refs[source].config.initialLoading = false;
          this.$refs[source].config.initialLoadingFilters = false;
        }
      } else if (source === 'campaign') {
        this.$refs[source].getCampaigns();
      }
      this.dialogs[source] = true;
      this.questionSource = source;
      this.$refs[source].dialogs[source] = true;
    },
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
    getDragPosition (type) {
      let style = 'position:absolute;left:7%;top:-33%;z-index:2';
      if (type === 'closeEnded') {
        style = 'position:absolute;left:7%;top:-27%;z-index:2';
      } else if (type === 'scale') {
        style = 'position:absolute;left:7%;top:-21%;z-index:2';
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
      delete temp.interaction_id;
      this.newSurvey.interactions.push(temp);
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
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
    }
  },
  created () {
    window.scrollTo(0, 0);
    document.addEventListener('resize', this.onResize);
  },
  destroyed () {
    document.removeEventListener('resize', this.onResize);
  },
  watch: {
    pagination: {
      handler () {
        if (!this.config.initialLoading) {
          this.getTeam();
        }
      },
      deep: true
    }
    // config: {
    //   handler() {
    //     if (this.config.searchMember) {
    //       this.config.searchMember.reports = true;
    //       this.config.searchMember.notifications = true;
    //       setTimeout(() => {
    //         this.config.searchMember = '';
    //         this.config.savingStageEmployees = false;
    //       }, 50);
    //     }
    //   },
    //   deep: true,
    // },
  },
  beforeMount () {
    this.getCompanyUsers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.survey-cards {
  .v-card__text {
    // height: 8em;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
.intrct-block {
  border-radius: 4px;
  // height: 5.5em;
  overflow-y: auto;
}
.maximum-step-content {
  // max-height: 640px!important;
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
.smooth-dnd-draggable-wrapper {
  padding-top: 16px!important;
}
</style>
