<template>
  <div class="reminderadHoc">
    <div class="pa-2 d-flex flex-row flex-wrap">
        <v-flex class="">
            <div class="d-flex flex-row flex-wrap">
                <v-flex xs8>
                    <h2>Reminders</h2>
                    <small style="font-size:100%;">Reminders enables you reach out to the employees who haven't completed the campaign.</small>
                </v-flex>
                <v-flex xs4>
                    <v-menu style="float:right" offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="primary"
                            v-bind="attrs" v-on="on"
                            dark
                            slot="activator"
                            class="text-none"
                            >
                            Add reminder <v-icon style="font-size:12px;" small class="ml-3">fas fa-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                            class="followupList"
                            v-for="(item, index) in reminder_items"
                            :key="index"
                            @click="openDialog(item)"
                            >
                            <v-list-item-title >{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                        </v-menu>
                </v-flex>
            </div>
            <v-card v-if="reminderData.length == 0" class="elevation-0 text-center" min-height="300" style="border:1px solid #4c3e9d;">
                <v-card-title adhoc-title class="justify-center pb-0">
                    <div class="d-flex flex-row flex-wrap">
                        <v-flex xs12>
                            <img :src="getImgUrl('amara_avatar')" class="blank-avatar-small" alt="">
                            <!-- <h2 class="headline">Welcome {{user.company_name}}!</h2> -->
                            <p class="subheading grey--text mb-3">You haven’t created any reminder yet. Create your first reminder!</p>
                            <v-menu  offset-y>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  v-bind="attrs" v-on="on"
                                  color="primary"
                                  dark
                                  slot="activator"
                                  class="text-none"
                                >
                                Add reminder <v-icon style="font-size:12px;" small class="ml-3">fas fa-plus</v-icon>
                                </v-btn>
                              </template>
                          <v-list>
                            <v-list-item
                            class="followupList"
                            v-for="(item, index) in reminder_items"
                            :key="index"
                            @click="openDialog(item)"
                            >
                            <v-list-item-title >{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                        </v-menu>
                        </v-flex>
                    </div>
                </v-card-title>
                <v-card-actions class="justify-center">
                </v-card-actions>
            </v-card>
            <!-- <v-layout class="pt-5" style="padding:10px 20px">
                <v-flex xs2>
                  S.no.
                </v-flex>
                <v-flex xs2>
                    Title
                </v-flex>
                <v-flex xs2>
                    Audience Type
                </v-flex>
                <v-flex xs2>
                    Schedule
                </v-flex>
                <v-flex xs2>
                    Distribution Channel
                </v-flex>
                <v-flex xs2>
                    Actions
                </v-flex>
            </v-layout> -->
            <!-- <v-layout v-if="reminderData.length > 0" v-for="(reminder, r) in reminderData" :key="r" class="campaign-row" -->
            <div v-for="(reminder, r) in reminderData" :key="r" class="campaign-row d-flex flex-row flex-wrap"
              style="background:#fff; border-radius:6px; padding:10px 20px; margin:10px 0;">

              <v-flex xs1>
                <div :style="`background-color: ${getColor1(reminder.channel)}; display:inline-block;`" style="width:55px; height:55px; border-radius:6px;">
                    <p class="mb-0 px-1 bold" style="color:white; font-size:11px; text-transform: uppercase;
                    letter-spacing: 0.4px; text-align:center; padding:35% 0px; font-weight:700" >{{reminder.channel}}</p>
                </div>
              </v-flex>
              <v-flex xs3 class="pl-3">
                  <p class="mb-0 mr-4 cursor-pointer hover-link" style="font-size: 18px;"
                      @click="preview(reminder)">
                        {{reminder.title}}
                      </p>
              </v-flex>
              <v-flex xs2>
                  <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-if="reminder.recipient_filter_type === 'no_response'">Non responder</p>
                  <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-if="reminder.recipient_filter_type === 'partial_response'">Partial responder</p>
                  <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-if="reminder.recipient_filter_type === 'both'">Non responder & Partial responder</p>
                  <span class="grey--text caption">Audience type</span>
              </v-flex>

              <v-flex xs2>
                  <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-if="reminder.channel === 'email'">Email</p>
                  <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-if="reminder.channel === 'sms'">SMS</p>
                  <span class="grey--text caption">Distribution channel</span>
              </v-flex>

              <v-flex xs2>
                  <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-if="reminder.type === 'automated'">After {{reminder.trigger_time_duration}} days</p>
                  <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-if="reminder.type === 'onetime'">{{dayjs(reminder.trigger_date_time).format('DD MMM YYYY')}}</p>
                  <span class="grey--text caption">Schedule</span>
              </v-flex>

              <v-flex xs1>
                  <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs" v-on="on"
                          slot="activator"
                          color="#383535"
                          dark
                          outline
                        >
                          Actions <v-icon class="ml-3 grey--text">fas fa-angle-down</v-icon>
                        </v-btn>
                      </template>
                        <v-list>
                          <v-list-item

                            v-for="(item, index) in reminderActions"
                            :key="index"
                            @click="item.action(reminder);"
                            :class="item.title === 'Edit' && (reminder.status !== 'draft' && reminder.status !== 'active')
                            || item.title == 'Delete' && (reminder.status !== 'draft' && reminder.status !== 'active')
                            ? 'd-none' : '' "
                          >
                            <v-list-tile-item>
                              <!-- <v-icon class="mr-2">{{item.icon}}</v-icon> -->
                              {{ item.title }}&nbsp;<span v-if="item.title === 'Test'">{{reminder.channel}}</span>
                            </v-list-tile-item>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      </v-flex>
                      <v-flex xs12>
              <div class="my-2 px-2 d-flex" style="background:#7b9fe042; border-radius:3px; color:#9e9e9e; max-width: fit-content;">
                <span style="color:#EC6772; font-weight: bold;">Created by : &nbsp; </span> {{reminder.created_by }} |&nbsp; <span style="color:#EC6772; font-weight: bold;">Modified by : &nbsp; </span> {{reminder.last_update_by}}
              </div>
            </v-flex>
            </div>
        </v-flex>
    </div>
    <v-dialog v-model="dialog" class="" persistent max-width="800px">
      <v-card class="mediumDialog">
        <v-card-title class="pb-0">
          <div class="d-flex">
            <v-flex v-if="this.mediumSelected !== '' && (!editView || editView && testEmailData || testSmsData)" style="margin-top:-10px;">
          <v-btn flat icon @click="back();" >
            <v-icon  style="font-size:12px;" small class="">fas fa-arrow-left</v-icon>
            </v-btn>
            </v-flex>
            <v-flex :class="this.mediumSelected == '' || editView ? 'xs11' : 'xs10'">
            <span class="headline">{{this.reminder.heading}}</span>
            </v-flex>
            <v-flex xs1 style="margin-top:-10px;">
            <v-btn style="float:right" flat icon @click="closeModal()">
            <v-icon  style="font-size:12px;" small class="">fas fa-times</v-icon>
            </v-btn>
            </v-flex>
          </div>
        </v-card-title>
        <v-card-text class="pb-0">
          <div v-if="this.mediumSelected === '' && !this.testEmailData && !this.testSmsData">
            <h3>Choose distribution channel</h3>
            <div class="d-flex flex-row flex-wrap" style="border-bottom: 1px solid grey">
              <v-flex @click="selectedMedium('email')" xs6 style="border-right: 1px solid grey;  cursor: pointer;">
                <div class="d-flex w-100">
                    <v-flex sm1 class="mr-0 ml-3 mt-5 pt-2">
                        <v-radio :value='reminder.chooseRadio' v-model="reminder.chooseRadio"></v-radio>
                    </v-flex>
                  <v-flex xs3 class="py-4 pr-2">
                    <v-icon large color="#4c3e9d" class="audience-icon"> flaticon-006-email </v-icon>
                  </v-flex>
                  <v-flex class="py-4 px-2">
                    <h3>Email</h3>
                    <small v-if="this.reminder.type === 'automated'">Use email as a channel to enable system generated reminders and the frequency.</small>
                    <small v-else>Send reminder emails to the employees who have not completed the campaign.</small>
                  </v-flex>
                </div>
              </v-flex>
              <v-flex @click="selectedMedium('sms')" style=" cursor: pointer;" xs6>
                <div class="d-flex">
                    <v-flex sm1 class="mr-0 ml-3 mt-5 pt-2">
                        <v-radio v-model="reminder.chooseRadio1" value="top"></v-radio>
                    </v-flex>
                  <v-flex xs3 class="py-4 px-2">
                    <v-icon large color="#4c3e9d" class="audience-icon"> flaticon-003-chat-1 </v-icon>
                  </v-flex>
                  <v-flex class="py-4 px-2">
                    <h3>SMS</h3>
                    <small v-if="this.reminder.type === 'automated'">Use SMS as a channel to enable system generated reminders and the frequency.</small>
                    <small v-else>Use SMS to remind employees to participate in the campaign.</small>
                  </v-flex>
                </div>
              </v-flex>
            </div>
            <div class="d-flex flex-row flex-wrap">
              <v-flex xs6 style="border-right: 1px solid grey">
                <div class="d-flex">
                    <v-flex sm1 class="mr-0 ml-3 mt-5 pt-2">
                        <v-radio disabled v-model="reminder.chooseRadio" value="top"></v-radio>
                    </v-flex>
                  <v-flex xs3 class="py-4 pr-2">
                    <v-icon large color="grey" class="audience-icon"> fab fa-whatsapp </v-icon>
                  </v-flex>
                  <v-flex class="py-4 px-2">
                    <h3>Whats app</h3>
                    <small v-if="this.reminder.type === 'automated'">Set automatic reminders and frequency, employees will be intimated on Whatsapp.</small>
                    <small v-else>Remind the employees to complete the campaign using Whatsapp.</small>
                    <h5 style='color:#4c3e9d'>Cooming soon</h5>
                  </v-flex>
                </div>
              </v-flex>
              <v-flex xs6>
                <div class="d-flex">
                    <v-flex sm1 class="mr-0 ml-3 mt-5 pt-2">
                        <v-radio disabled v-model="reminder.chooseRadio" value="top"></v-radio>
                    </v-flex>
                  <v-flex xs3 class="py-4 pr-2">
                    <v-icon large color="grey" class="audience-icon"> fab fa-slack-hash </v-icon>
                  </v-flex>
                  <v-flex class="py-4 px-2">
                    <h3>Slack</h3>
                    <small v-if="this.reminder.type === 'automated'">Set automatic reminders and frequency for employees on Slack.</small>
                    <small v-else>Follow up with employees who have not responded using Slack.</small>
                    <h5 style='color:#4c3e9d'>Cooming soon</h5>
                  </v-flex>
                </div>
              </v-flex>
            </div>
          </div>
          <v-container v-if="this.mediumSelected !== '' && !this.testEmailData && !this.testSmsData" class="pt-0 reminderEditor" grid-list-md>
            <div class="d-flex flex-row flex-wrap">
              <v-flex sm6>
                <v-select
                  solo
                  :key="i"

                  :items="audienceType"
                  item-text="title"
                  item-value="value"
                  label="Select audience"
                  v-model="reminder.recipient_filter_type"
                  v-validate="'required'"
                  :error-messages="errors.collect('audience')"
                  name="audience"
                ></v-select>
              </v-flex>
              <v-flex :class="this.reminder.type === 'automated'  ? 'xs6' : 'xs3'">
                <v-select

                  v-if="this.reminder.type === 'automated'"
                  v-model="reminder.trigger_time_duration"
                  solo
                  :items="triggerDuration"
                  item-text="title"
                  item-value="value"
                  label="Schedule"
                  v-validate="'required'"
                  :error-messages="errors.collect('schedule')"
                  name="schedule"
                ></v-select>
                <v-dialog

                v-if="this.reminder.type === 'onetime'"
                  ref="dialog1"
                  v-model="model"
                  :return-value.sync="reminder.date"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field

                    solo
                    name="joining_date"
                    label="Select date"
                    v-model="reminder.date"
                    slot="activator"
                    readonly
                  ></v-text-field>
                <v-date-picker
                  v-model="reminder.date"
                  :min="nowDate"
                  v-validate="'required'"
                  :error-messages="errors.collect('date')"
                  name="date">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="model = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog1.save(reminder.date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex sm3>
                <v-dialog
                v-if="this.reminder.type === 'onetime'"
                  ref="dialog2"
                  v-model="model2"
                  :return-value.sync="reminder.time"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field

                    solo
                    name="joining_date"
                    label="Select time"
                    v-model="reminder.time"
                    slot="activator"
                    readonly
                  ></v-text-field>
                    <v-time-picker
                        v-model="reminder.time"
                        v-validate="'required'"
                        :error-messages="errors.collect('time')"
                        name="time"
                        class="mt-2"
                        :allowed-minutes="(m) => m % 15 == 0"
                        >
                        <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="model2 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog2.save(reminder.time)">OK</v-btn></v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm12 v-if="mediumSelected === 'email'">
                <label>Subject</label>
                <v-text-field

                  placeholder="Enter mail subject"
                  solo
                  v-model="subjectEmail"
                  v-validate="'required'"
                  :error-messages="errors.collect('subject')"
                  name="subject"
                ></v-text-field>
              </v-flex>
               <v-flex xs12>
                 <label>Body</label>
                <VuePellEditor
                v-if="reminder.channel === 'email'"
                class="w-100"
                v-model="bodyEmail"
                v-validate="'required'"
                :error-messages="errors.collect('body')"
                name="body"
                placeholder="Enter mail body" />
                <v-textarea
                v-if="reminder.channel === 'sms'"
                solo
                name="body"
                placeholder="Enter sms body"
                v-model="bodySMS"
                v-validate="'required'"
                :error-messages="errors.collect('body')"
                ></v-textarea>
              </v-flex>
            </div>
          </v-container>
          <v-container v-if="this.testEmailData || this.testSmsData" class="pt-0 reminderEditor" grid-list-md>
            <div class="d-flex flex-row flex-wrap">
              <v-flex sm6>
                  <v-text-field
                  placeholder="Enter first name"
                  solo
                  v-model="reminder.test_first_name"
                  v-validate="'required'"
                    :error-messages="errors.collect('first_name')"
                    name="first_name"
                ></v-text-field>
              </v-flex>
              <v-flex sm6>
                  <v-text-field
                  placeholder="Enter last name"
                  solo
                  v-model="reminder.test_last_name"
                  v-validate="'required'"
                  :error-messages="errors.collect('last_name')"
                  name="last_name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="reminder.channel === 'email'">
                  <v-text-field
                  placeholder="Enter mail id"
                  solo
                  v-model="reminder.test_emailId"
                  v-validate="'required'"
                    :error-messages="errors.collect('email')"
                    name="email"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="reminder.channel === 'sms'">
                  <v-text-field
                  placeholder="Enter mobile no"
                  solo
                  v-model="reminder.test_mobile"
                  v-validate="'required'"
                    :error-messages="errors.collect('mobile')"
                    name="mobile"
                ></v-text-field>
              </v-flex>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions class="px-4">

          <v-btn v-if="this.mediumSelected !== ''" color="grey" flat @click="closeModal()">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="testSmsData && reminder.channel === 'sms'" color="primary" @click="sendTest()">Send SMS</v-btn>
          <v-btn v-if="!testSmsData && reminder.channel === 'sms' && this.mediumSelected !== ''" color="orange" dark @click="testEmail()">Send Test SMS</v-btn>

          <v-btn v-if="testEmailData && reminder.channel === 'email'" color="primary" @click="sendTest()">Send email</v-btn>
          <v-btn v-if="!testEmailData && reminder.channel === 'email' && this.mediumSelected !== ''" color="orange" dark @click="testEmail()">Send Test email</v-btn>
          <v-btn v-if="!editView && !testEmailData && !testSmsData && this.mediumSelected !== ''"  color="primary" @click="save()">Save</v-btn>
          <v-btn v-if="editView && !testEmailData && !testSmsData && this.mediumSelected !== ''" color="primary" @click="update()">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="previewDialog" persistent max-width="400" class="abv">
        <v-card v-if="mediumSelected === 'sms'"  class="previewDialogBox" style="min-height:500px; background-color: transparent; box-shadow:none;">
        <v-card-text style="min-height:450px;">
            <div style="padding: 60px 40px;">
                <v-icon style="background:#fff;padding:10px; border-radius:50%; margin-left:45%">fas fa-user</v-icon>
                <p style="margin-left:30%;">+918757682502</p>
                <v-flex style="background:#fff; border-radius:6px; overflow-wrap: break-word; padding:5px 10px;">
                    <span v-html="this.bodySMS"></span>&nbsp;&nbsp;https://chat.dev.amara.ai/r/XXXXX
                </v-flex>

            </div>
        </v-card-text>
        <v-card-actions class="px-4">

          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click="closeSmsPreview()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <v-dialog v-model="previewDialogEmail" persistent max-width="700" class="abv">
      <v-card v-if="mediumSelected === 'email'"  class="previewDialogemail" style="min-height:375px; background-color: transparent; box-shadow:none;">
        <v-card-text style="max-height:500px; min-height:350px;">
            <div style="max-height:450px; overflow-y:auto;overflow-x:hidden;">
                <div class="d-flex">
                    <v-flex xs12>
                        <v-btn icon flat style="float:right;" @click="closeEmailPreview()">
                            <v-icon style="font-size:12px;">fas fa-times
                            </v-icon>
                        </v-btn>
                    </v-flex>
                </div>
                <div class="d-flex" style="padding: 0px 40px;">
                    <v-flex xs2>
                        <p>From : </p>
                    </v-flex>
                    <v-flex xs9>
                      <p>test@hirexp.com</p>
                    </v-flex>
                </div>
                <div class="d-flex" style="padding: 0px 40px;">
                    <v-flex xs2>
                        <p>To : </p>
                    </v-flex>
                    <v-flex xs9>
                      <p>amara@hirexp.com</p>
                    </v-flex>
                </div>
                <div class="d-flex" style="padding: 0px 40px;">
                    <v-flex xs2>
                        <p>Date : </p>
                    </v-flex>
                    <v-flex xs9>
                        <p>{{currentTime}}</p>
                    </v-flex>
                </div>
                <div class="d-flex" style="padding: 0px 40px;">
                    <v-flex xs2>
                        <p>Subject :</p>
                    </v-flex>
                    <v-flex xs9>
                        <p>{{reminder.subject}}</p>
                    </v-flex>
                </div>
                <div class="d-flex flex-row flex-wrap" style="padding: 0px 40px;">
                    <v-flex xs12>
                        <p>Body :</p>
                    </v-flex>
                    <v-flex xs12 style="text-align:center">
                        <p style="overflow-wrap: break-word; text-align:left" v-html="this.bodyEmail"></p><br>
                        <a href="#">Click here to start chat</a><br>
                    </v-flex>
                </div>
            </div>
        </v-card-text>
        <v-card-actions class="px-5 pb-4">
            <v-spacer></v-spacer>
          <v-btn color="grey" flat @click="closeEmailPreview()">Close</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import VuePellEditor from 'vue-pell-editor';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import RecipientTranscript from '@/components/elements/RecipientTranscript';
// import {
//   VCheckbox,
//   VAvatar,
//   VTooltip,
//   VAlert,
//   VBtn,
//   VTextarea,
//   VProgressLinear,
//   VChip,
//   VMenu,

// } from 'vuetify';
Vue.use(VuePellEditor);
dayjs.extend(relativeTime);

export default {
  name: 'EmployeesList',
  components: {
    // ContentLoader,
    // VCheckbox,
    // VAvatar,
    // VTooltip,
    // VAlert,
    // VTextarea,
    // VMenu,
    // VBtn,
    // dayjs,
    // VChip,
    // RecipientTranscript,
    // VProgressLinear,
  },
  data () {
    return {
      nowDate: new Date().toISOString().slice(0, 10),
      emailData: '',
      Sender: null,
      currentTime: '',
      previewData: false,
      previewDialogEmail: false,
      editView: false,
      reminderId: '',
      date_time: [],
      model: false,
      model2: false,
      dialog: false,
      previewDialog: false,
      testCampaigns: false,
      testEmailData: false,
      testSmsData: false,
      subjectEmail: 'Reminder: Tell us how you feel',
      bodySMS: 'Hi You would have received a request from Amara to participate in a campaign, this campaign has been designed to gauge your satisfaction level at work. All you have to do is chat with Amara and she will take care of the rest. A gentle reminder to complete the chat by sparing 5 minutes, remember when we know how you feel, we can help you better.',
      bodyEmail: '<div>A big hello!</div><div><br></div><div>Hope you are doing great!</div><div><br></div><div><br></div><div>I am Amara, your virtual friend at work. Looks like you missed my last mail, so I am writing to you again.</div><div><br></div><div>I would like to chat with you to know your thoughts and feelings as it is essential&nbsp;to know more about you&nbsp;and your experiences at work. All you have to do is just spare five minutes and converse with me, I promise to make this very quick. Also, there are interesting methods to respond--choose an emoji, MCQs, and more. This will be fun and also help us to improve and enhance the workplace culture as per your wishes.&nbsp;</div>',
      reminder: {
        chooseRadio: true,
        chooseRadio1: false
      },
      reminderData: [],
      mediumSelected: '',
      stageId: '',
      reminderActions: [{
        title: 'Edit',
        icon: 'fas fa-chart-bar',
        dialog: 'view',
        action: this.edit
      }, {
        title: 'Preview',
        icon: 'fas fa-play',
        dialog: 'edit',
        action: this.preview
      }, {
        title: 'Test',
        icon: 'fas fa-play',
        dialog: 'edit',
        action: this.testCampaign
      }, {
        title: 'Delete',
        icon: 'fas fa-trash',
        dialog: 'deleteStage',
        action: this.deleteReminder
      }],
      reminder_items: [{
        title: 'Automate reminder',
        value: 'automated'
      }, {
        title: 'One-off reminder',
        value: 'onetime'
      }],
      audienceType: [{
        title: 'Non responder',
        value: 'no_response'
      }, {
        title: 'Partial responder',
        value: 'partial_response'
      }, {
        title: 'Both',
        value: 'both'
      }],
      triggerDuration: [{
        title: 'After 1 day',
        value: 1
      }, {
        title: 'After 2 day',
        value: 2
      }, {
        title: 'After 3 day',
        value: 3
      }, {
        title: 'After 4 day',
        value: 4
      }, {
        title: 'After 5 day',
        value: 5
      }, {
        title: 'After 6 day',
        value: 6
      }, {
        title: 'After 7 day',
        value: 7
      }],
      acknowledgment_items: [{
        title: 'Automated thank you email',
        value: 'automated'
      }, {
        title: 'One-off thank you email',
        value: 'onetime'
      }]
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    back () {
      this.mediumSelected = '';
      if (this.testEmailData) {
        this.testEmailData = false;
        this.mediumSelected = 'email';
      }
      if (this.testSmsData) {
        this.testSmsData = false;
        this.mediumSelected = 'sms';
      }
    },

    getColor1 (channel) {
      let color = '#432d6f';
      if (channel === 'email') {
        color = '#432d6f';
      } else if (channel === 'sms') {
        color = '#8a3984';
      }
      return color;
    },
    testEmail () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          if (this.reminder.channel === 'email') {
            this.testEmailData = true;
          }
          if (this.reminder.channel === 'sms') {
            this.testSmsData = true;
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
    testCampaign (data) {
      this.testCampaigns = true;
      this.edit(data);
    },
    sendTest () {
      if (this.$route.params && this.$route.params.stageId) {
        this.stageId = this.$route.params.stageId;
      }
      this.Sender = this.user.company_name.split(' ');
      const temp = {
        channel: this.reminder.channel,
        subject: this.reminder.channel === 'email' ? this.subjectEmail : undefined,
        body: this.reminder.channel === 'email' ? this.bodyEmail : this.bodySMS,
        email: this.reminder.test_emailId,
        phone: this.reminder.test_mobile,
        first_name: this.reminder.test_first_name,
        last_name: this.reminder.test_last_name,
        sender: `${this.user.company_name} <${this.Sender[0]}@amara.ai>`
      };
      this.$validator.validateAll().then((res) => {
        if (res) {
          axios.post(`${process.env.VUE_APP_ADHOC_API_URL}stage/${this.stageId}/reminders/test/`, temp)
            .then((resp) => {
              if (resp.data) {
                this.$store.dispatch('updateSnackbar', {
                  color: 'success',
                  show: true,
                  text: 'Test reminder has been successfully sent!'
                });
                this.testEmailData = false;
                this.testSmsData = false;
                if (this.testCampaigns) {
                  this.reminder = {};
                  this.closeModal();
                }
              }
            }, (resp) => {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: 'Unable to send test reminder, Please try again later!'
              });
              throw new Error(resp.body);
            });
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    save () {
      if (this.$route.params && this.$route.params.stageId) {
        this.stageId = this.$route.params.stageId;
      }
      if (this.reminder.recipient_filter_type === 'no_response') {
        this.reminder.recipient_filter = { status__in: 'initiated' };
      }
      if (this.reminder.recipient_filter_type === 'partial_response') {
        this.reminder.recipient_filter = { status__in: 'inProgress' };
      }
      if (this.reminder.recipient_filter_type === 'both') {
        this.reminder.recipient_filter = { status__in: 'initiated, inProgress' };
      }
      const temp = {
        stage: this.stageId,
        channel: this.reminder.channel,
        subject: this.reminder.channel === 'email' ? this.subjectEmail : undefined,
        body: this.reminder.channel === 'email' ? this.bodyEmail : this.bodySMS,
        title: `Reminder ${this.reminderData.length + 1}`,
        type: this.reminder.type,
        trigger_time_duration: this.reminder.trigger_time_duration,
        trigger_time_unit: 'days',
        trigger_date_time: this.reminder.type === 'onetime' ? `${this.reminder.date}T${this.reminder.time}` : undefined,
        recipient_filter_type: this.reminder.recipient_filter_type,
        recipient_filter: this.reminder.recipient_filter,
        created_by: !this.editView ? this.user.email : undefined,
        last_update_by: this.user.email
      };
      this.$validator.validateAll().then((res) => {
        if (res) {
          axios.post(`${process.env.VUE_APP_ADHOC_API_URL}stage/${this.stageId}/reminders/`, temp)
            .then((resp) => {
              if (resp.data) {
                this.reminder = {};
                this.mediumSelected = '';
                this.dialog = false;
                this.$store.dispatch('updateSnackbar', {
                  color: 'success',
                  show: true,
                  text: 'Reminder created successfully!'
                });
                this.getReminder();
              }
            }, (resp) => {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: 'Unable to create reminder, Please try again later!'
              });
              throw new Error(resp.body);
            });
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    update () {
      if (this.$route.params && this.$route.params.stageId) {
        this.stageId = this.$route.params.stageId;
      }
      if (this.reminder.recipient_filter_type === 'no_response') {
        this.reminder.recipient_filter = { status__in: 'initiated' };
      }
      if (this.reminder.recipient_filter_type === 'partial_response') {
        this.reminder.recipient_filter = { status__in: 'inProgress' };
      }
      if (this.reminder.recipient_filter_type === 'both') {
        this.reminder.recipient_filter = { status__in: 'initiated, inProgress' };
      }

      const temp = {
        stage: this.stageId,
        channel: this.reminder.channel,
        subject: this.reminder.channel === 'email' ? this.subjectEmail : undefined,
        body: this.reminder.channel === 'email' ? this.bodyEmail : this.bodySMS,
        type: this.reminder.type,
        trigger_time_duration: this.reminder.type === 'automate' ? this.reminder.trigger_time_duration : undefined,
        trigger_time_unit: this.reminder.type === 'automate' ? 'days' : undefined,
        trigger_date_time: this.reminder.type === 'onetime' ? `${this.reminder.date}T${this.reminder.time}` : undefined,
        recipient_filter_type: this.reminder.recipient_filter_type,
        recipient_filter: this.reminder.recipient_filter,
        created_by: this.user.email,
        last_update_by: this.editView ? this.user.email : undefined
      };
      axios.patch(`${process.env.VUE_APP_ADHOC_API_URL}stage/${this.stageId}/reminders/${this.reminderId}/`, temp)
        .then((resp) => {
          if (resp.data) {
            this.reminder = {};
            this.mediumSelected = '';
            this.dialog = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Reminder updated successfully!'
            });
            this.editView = false;
            this.getReminder();
          }
        }, (resp) => {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update reminder, Please try again later!'
          });
          throw new Error(resp.body);
        });
    },
    getReminder () {
      if (this.$route.params && this.$route.params.stageId) {
        this.stageId = this.$route.params.stageId;
      }
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}stage/${this.stageId}/reminders/`).then((response) => {
        if (response && response.data) {
          this.reminderData = response.data;
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to get template, Please try again later!'
        });
        throw new Error(response.data);
      });
    },
    deleteReminder (data) {
      if (this.$route.params && this.$route.params.stageId) {
        this.stageId = this.$route.params.stageId;
      }
      axios.delete(`${process.env.VUE_APP_ADHOC_API_URL}stage/${this.stageId}/reminders/${data.id}`).then((response) => {
        if (response) {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'successfully delete!'
          });
          this.getReminder();
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to delete reminder, Please try again later!'
        });
        throw new Error(response.data);
      });
    },
    selectedMedium (medium) {
      this.subjectEmail = 'Reminder: Tell us how you feel';
      this.bodySMS = 'Hi You would have received a request from Amara to participate in a campaign, this campaign has been designed to gauge your satisfaction level at work. All you have to do is chat with Amara and she will take care of the rest. A gentle reminder to complete the chat by sparing 5 minutes, remember when we know how you feel, we can help you better.';
      this.bodyEmai = '<div>A big hello!</div><div><br></div><div>Hope you are doing great!</div><div><br></div><div><br></div><div>I am Amara, your virtual friend at work. Looks like you missed my last mail, so I am writing to you again.</div><div><br></div><div>I would like to chat with you to know your thoughts and feelings as it is essential&nbsp;to know more about you&nbsp;and your experiences at work. All you have to do is just spare five minutes and converse with me, I promise to make this very quick. Also, there are interesting methods to respond--choose an emoji, MCQs, and more. This will be fun and also help us to improve and enhance the workplace culture as per your wishes.&nbsp;</div>';
      if (medium === 'email') {
        this.reminder.chooseRadio = true;
        this.reminder.chooseRadio1 = true;
      }
      if (medium === 'sms') {
        this.reminder.chooseRadio = false;
        this.reminder.chooseRadio1 = true;
      }
      this.reminder.channel = medium;
      this.mediumSelected = medium;
      this.testEmailData = false;
      this.testSmsData = false;
    },
    openDialog (item) {
      this.reminder.type = item.value;
      this.reminder.heading = item.title;
      this.dialog = true;
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    closeModal () {
      this.mediumSelected = '';
      this.subjectEmail = 'Reminder: Tell us how you feel';
      this.bodySMS = 'Hi You would have received a request from Amara to participate in a campaign, this campaign has been designed to gauge your satisfaction level at work. All you have to do is chat with Amara and she will take care of the rest. A gentle reminder to complete the chat by sparing 5 minutes, remember when we know how you feel, we can help you better.';
      this.bodyEmai = '<div>A big hello!</div><div><br></div><div>Hope you are doing great!</div><div><br></div><div><br></div><div>I am Amara, your virtual friend at work. Looks like you missed my last mail, so I am writing to you again.</div><div><br></div><div>I would like to chat with you to know your thoughts and feelings as it is essential&nbsp;to know more about you&nbsp;and your experiences at work. All you have to do is just spare five minutes and converse with me, I promise to make this very quick. Also, there are interesting methods to respond--choose an emoji, MCQs, and more. This will be fun and also help us to improve and enhance the workplace culture as per your wishes.&nbsp;</div>';

      this.previewData = false;
      this.testEmailData = false;
      this.testSmsData = false;
      this.testCampaigns = false;
      this.reminder = {};
      this.editView = false;
      this.dialog = false;
    },
    closeEmailPreview () {
      this.mediumSelected = '';
      this.reminder = {};
      this.subjectEmail = 'Reminder: Tell us how you feel';
      this.bodySMS = 'Hi You would have received a request from Amara to participate in a campaign, this campaign has been designed to gauge your satisfaction level at work. All you have to do is chat with Amara and she will take care of the rest. A gentle reminder to complete the chat by sparing 5 minutes, remember when we know how you feel, we can help you better.';
      this.bodyEmai = '<div>A big hello!</div><div><br></div><div>Hope you are doing great!</div><div><br></div><div><br></div><div>I am Amara, your virtual friend at work. Looks like you missed my last mail, so I am writing to you again.</div><div><br></div><div>I would like to chat with you to know your thoughts and feelings as it is essential&nbsp;to know more about you&nbsp;and your experiences at work. All you have to do is just spare five minutes and converse with me, I promise to make this very quick. Also, there are interesting methods to respond--choose an emoji, MCQs, and more. This will be fun and also help us to improve and enhance the workplace culture as per your wishes.&nbsp;</div>';

      this.previewDialogEmail = false;
    },
    closeSmsPreview () {
      this.mediumSelected = '';
      this.reminder = {};
      this.previewDialog = false;
    },
    preview (data) {
      const today = new Date();
      const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      const dateTime = date + ' ' + time;
      this.currentTime = dateTime;
      this.mediumSelected = data.channel;
      this.reminder = data;
      if (data.channel === 'sms') {
        this.previewDialog = true;
        this.bodySMS = data.body;
      }
      if (data.channel === 'email') {
        this.previewDialogEmail = true;
        this.bodyEmail = data.body;
      }
    },
    edit (data) {
      this.editView = true;
      this.reminderId = data.id;

      if (data.type) {
        this.mediumSelected = data.channel;
        this.reminder = data;
        if (data.channel === 'sms') {
          this.bodySMS = data.body;
        }
        if (data.channel === 'email') {
          this.bodyEmail = data.body;
          this.subjectEmail = data.subject;
        }
        this.dialog = true;
        this.previewData = false;
        if (data.type === 'automated') {
          this.reminder.heading = 'Automated reminder email';
        }
        if (data.type === 'onetime') {
          this.reminder.heading = 'One-off reminder email';
          this.date_time = data.trigger_date_time.split('T');
          this.reminder.date = this.date_time[0];
          this.date_time = this.date_time[1].split('+');
          this.reminder.time = this.date_time[0];
        }
      }
      if (this.testCampaigns) {
        setTimeout(() => {
          this.testEmail();
          this.mediumSelected = '';
        }, 100);
      }
    },
    deletes (data, index) {
      this.reminderData[index].slice(data);
    }
  },
  watch: {
  },
  beforeMount () {
    this.getReminder();
    if (this.$route.params && this.$route.params.stageId) {
      this.stageId = this.$route.params.stageId;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.theme--light {
  &.v-table {
    tbody {
      tr {
        &:not(:last-child) {
          border-bottom: 1px solid rgb(243, 241, 241)!important;
        }
      }
    }
  }
}
.reminderEditor {
.vp-editor {
 border:1px solid grey !important;
 border-radius: 8px;
 overflow:hidden;
 max-height:250px !important;
 .pell-content {
     max-height:200px;
     overflow-y:auto;
     overflow-x: hidden;
 }
}
}
.reminderadHoc {
    .difm-menu-split {
  height: 200px;
  float: left;
  margin-left: 63px;
  border-left: 1px solid #D0D2D3;
  margin-top: 15px;
  position: relative;
  left:15%;
}
.or-circle {
  box-sizing: border-box;
  height: 42px;
  width: 42px;
  line-height: 42px;
  border-radius: 50%;
  background-clip: padding-box;
  color: #6B787F;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid #D0D2D3;
  background-color: #fff;
  margin-top: 75px;
  position: absolute;
  left: -21px;
}

}
.mediumDialog {
  .v-input__slot {
    box-shadow: none !important;
    border:1px solid grey !important;
    margin:0;
  }
  div.error--text {
    .v-input__slot {
    box-shadow: none !important;
    border:1px solid red !important;
    margin:0;
  }
  .vp-editor {
 border:1px solid grey !important;
  }
  }
  .v-input__slot:focus {
    outline: 0 !important;
    border:1px solid rgb(2, 12, 155) !important;
  }
}
.followupList {
//   .v-list__tile {
//     height: 26px !important;
//   }
}
.previewDialogBox {
    background-image: url(../../../assets/logo/mobile.png);
    background-size: cover;
    border:none;
}
.previewDialogemail {
    background-image: url(../../../assets/logo/laptop.png);
    background-size: cover;
    border:none;
    background-repeat: round;
}
.v-dialog {
    box-shadow: none !important;
}
</style>
