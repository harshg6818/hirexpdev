<template>
  <div class="reminderadHoc">
    <div class="pa-2 d-flex">
        <v-flex class="">
            <div class="d-flex">
                <v-flex xs8>
                    <h2>Acknowledge the respondents</h2>
                    <small style="font-size:100%;">This feature enables you to send a thank-you note to all those who have completed the chat</small>
                </v-flex>
                <v-flex xs4>
                            <v-btn
                            @click="openDialog()"
                            color="primary"
                            dark
                            slot="activator"
                            class="text-none"
                            style="float:right; text-align:right"
                            >
                            Add thank you note <v-icon style="font-size:12px;" small class="ml-3">fas fa-plus</v-icon>
                            </v-btn>
                </v-flex>
            </div>
            <v-card v-if="thankyouData.length == 0" class="elevation-0 text-xs-center" min-height="300" style="border:1px solid #4c3e9d;">
                <v-card-title adhoc-title class="justify-center pb-0">
                    <div class="d-flex flex-row flex-wrap">
                        <v-flex xs12>
                            <img :src="getImgUrl('amara_avatar')" class="blank-avatar-small" alt="">
                            <!-- <h2 class="headline">Welcome {{user.company_name}}!</h2> -->
                            <p class="subheading grey--text mb-3">You haven’t created any thank you note yet. Create your first thank you note!</p>

                            <v-btn
                            @click="openDialog()"
                            color="primary"
                            dark
                            slot="activator"
                            class="text-none"
                            >
                            Add thank you note <v-icon style="font-size:12px;" small class="ml-3">fas fa-plus</v-icon>
                            </v-btn>
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
            <!-- <v-layout v-if="thankyouData.length > 0" v-for="(thankyou, r) in thankyouData" :key="r" class="campaign-row" -->
            <div v-for="(thankyou, r) in thankyouData" :key="r" class="campaign-row d-flex flex-row flex-wrap"
              style="background:#fff; border-radius:6px; padding:10px 20px; margin:10px 0;">

              <v-flex xs1>
                <div :style="`background-color: ${getColor1(thankyou.channel)}; display:inline-block;`" style="width:55px; height:55px; border-radius:6px;">
                    <p class="mb-0 px-1 bold" style="color:white; font-size:11px; text-transform: uppercase;
                    letter-spacing: 0.4px; text-align:center; padding:35% 0px; font-weight:700" >{{thankyou.channel}}</p>
                </div>
              </v-flex>
              <v-flex xs4 class="pl-3">
                  <p class="mb-0 mr-4" style=" font-size: 18px;"
                      @click="preview(reminder)">
                        {{thankyou.title}}
                  </p>
              </v-flex>
              <v-flex xs3 class="pl-3">
                  <p class="mb-0 mr-4 cursor-pointer hover-link" style="font-size: 18px;"
                  >
                  </p>
              </v-flex>

              <v-flex xs2>
                  <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-if="thankyou.channel === 'email'">Email</p>
                  <p style="font-size:16px; font-weight:500; color:#383535;" class="mb-0 mt-1" v-if="thankyou.channel === 'sms'">SMS</p>
                  <span class="grey--text caption">Distribution channel</span>
              </v-flex>

              <v-flex xs1>
                  <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs" v-on="on"
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
                            @click="item.action(thankyou);"
                            :class="item.title === 'Edit' && (thankyou.status !== 'draft' && thankyou.status !== 'active')
                            || item.title == 'Delete' && (thankyou.status !== 'draft' && thankyou.status !== 'active')
                            ? 'd-none' : '' "
                          >
                            <v-list-item-title>
                              <!-- <v-icon class="mr-2">{{item.icon}}</v-icon> -->
                              {{ item.title }}&nbsp;<span v-if="item.title === 'Test'">{{thankyou.channel}}</span>
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      </v-flex>
                      <v-flex xs12>
              <div class="d-flex my-2 px-2 " style="background:#7b9fe042; border-radius:3px; color:#9e9e9e; max-width: fit-content;">
              <span style="color:#EC6772; font-weight: bold;">Created by : &nbsp; </span> {{thankyou.created_by }} |&nbsp; <span style="color:#EC6772; font-weight: bold;">Modified by : &nbsp; </span> {{thankyou.last_update_by}}
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
            <span v-if="this.mediumSelected === '' && !testCampaigns" class="headline">Acknowledge those who have completed the chat, select a channel to send thank-you notes. </span>
            </v-flex>
            <v-flex xs1 style="margin-top:-10px;">
            <v-btn style="float:right" flat icon @click="closeModal()">
            <v-icon  style="font-size:12px;" small class="">fas fa-times</v-icon>
            </v-btn>
            </v-flex>
          </div>
        </v-card-title>
        <v-card-text class="pb-0">
          <div v-if="this.mediumSelected === '' && !testCampaigns">
            <div class="d-flex flex-row flex-wrap" style="border-bottom: 1px solid grey;">
              <v-flex :class="this.emailUsed ? 'tooltip' : ''"  @click="selectedMedium('email')" xs6 :style="this.emailUsed ? '' : ' cursor: pointer'" style="border-right: 1px solid grey;">

                <div class="d-flex">
                    <v-flex sm1 class="mr-0 ml-3 mt-5 pt-2">
                        <v-radio :value='thankyou.chooseRadio' v-model="thankyou.chooseRadio"></v-radio>
                    </v-flex>
                  <v-flex xs3 class="py-4 pr-2">

                    <v-icon large :color="this.emailUsed ? 'grey' : '#4c3e9d'" class="audience-icon"> flaticon-006-email </v-icon>
                  </v-flex>
                  <v-flex class="py-4 mt-3 px-2">
                    <h3>Email</h3>
                    <small>Send them a thank you note via email</small>
                  </v-flex>
                </div>
                <span class="tooltiptext">Acknowledgement notification via email is already configured, You can edit the same if you want to make any changes</span>
              </v-flex>

              <v-flex :class="this.smsUsed ? 'tooltip' : ''" @click="selectedMedium('sms')" :style="this.smsUsed ? '' : ' cursor: pointer'" xs6>
                <div class="d-flex">
                  <v-flex sm1 class="mr-0 ml-3 mt-5 pt-2">
                    <v-radio v-model="thankyou.chooseRadio1" value="top"></v-radio>
                  </v-flex>
                  <v-flex xs3 class="py-4 px-2">
                    <v-icon large :color="this.smsUsed ? 'grey' : '#4c3e9d'" class="audience-icon"> flaticon-003-chat-1 </v-icon>
                  </v-flex>
                  <v-flex class="py-4 mt-3 px-2">
                    <h3>SMS</h3>
                    <small>Send a thank you note via SMS</small>
                  </v-flex>
                </div>
                <span class="tooltiptext">Acknowledgement notification via SMS is already configured, You can edit the same if you want to make any changes</span>
              </v-flex>
            </div>
            <div class="d-flex flex-row flex-wrap">
              <v-flex xs6 style="border-right: 1px solid grey">
                <div class="d-flex flex-row flex-wrap">
                    <v-flex sm1 class="mr-0 ml-3 mt-5 pt-2">
                        <v-radio disabled v-model="thankyou.chooseRadio" value="top"></v-radio>
                    </v-flex>
                  <v-flex xs3 class="py-4 pr-2">
                    <v-icon large color="grey" class="audience-icon"> fab fa-whatsapp </v-icon>
                  </v-flex>
                  <v-flex class="py-4 mt-2 px-2">
                    <h3>Whats app</h3>
                    <small>Send a thank you note via WhatsApp</small>
                    <h5 style='color:#4c3e9d'>Cooming soon</h5>
                  </v-flex>
                </div>
              </v-flex>
              <v-flex xs6>
                <div class="d-flex flex-row flex-wrap">
                    <v-flex sm1 class="mr-0 ml-3 mt-5 pt-2">
                        <v-radio disabled v-model="thankyou.chooseRadio" value="top"></v-radio>
                    </v-flex>
                  <v-flex xs3 class="py-4 pr-2">
                    <v-icon large color="grey" class="audience-icon"> fab fa-slack-hash </v-icon>
                  </v-flex>
                  <v-flex class="py-4 mt-2 px-2">
                    <h3>Slack</h3>
                    <small>Send a thank you note via Slack</small>
                    <h5 style='color:#4c3e9d'>Cooming soon</h5>
                  </v-flex>
                </div>
              </v-flex>
            </div>
          </div>
          <v-container v-if="this.mediumSelected !== '' && !this.testEmailData && !this.testSmsData" class="pt-0 reminderEditor" grid-list-md>
            <div class="d-flex flex-row flex-wrap">
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
                v-if="thankyou.channel === 'email'"
                class="w-100"
                v-model="bodyEmail"
                v-validate="'required'"
                :error-messages="errors.collect('body')"
                name="body"
                placeholder="Enter mail body" />
                <v-textarea
                v-if="thankyou.channel === 'sms'"
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
                  v-model="thankyou.test_first_name"
                  v-validate="'required'"
                    :error-messages="errors.collect('first_name')"
                    name="first_name"
                ></v-text-field>
              </v-flex>
              <v-flex sm6>
                  <v-text-field
                  placeholder="Enter last name"
                  solo
                  v-model="thankyou.test_last_name"
                  v-validate="'required'"
                  :error-messages="errors.collect('last_name')"
                  name="last_name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="thankyou.channel === 'email'">
                  <v-text-field
                  placeholder="Enter mail id"
                  solo
                  v-model="thankyou.test_emailId"
                  v-validate="'required'"
                    :error-messages="errors.collect('email')"
                    name="email"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="thankyou.channel === 'sms'">
                  <v-text-field
                  placeholder="Enter mobile no"
                  solo
                  v-model="thankyou.test_mobile"
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
          <v-btn v-if="testSmsData && thankyou.channel === 'sms'" color="primary" @click="sendTest()">Send SMS</v-btn>
          <v-btn v-if="!testSmsData && thankyou.channel === 'sms' && this.mediumSelected !== ''" color="orange" dark @click="testEmail()">Send Test SMS</v-btn>

          <v-btn v-if="testEmailData && thankyou.channel === 'email'" color="primary" @click="sendTest()">Send email</v-btn>
          <v-btn v-if="!testEmailData && thankyou.channel === 'email' && this.mediumSelected !== ''" color="orange" dark @click="testEmail()">Send Test email</v-btn>
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
                <p style="margin-left:30%;">+9187XXXXXX02</p>
                <v-flex style="background:#fff; border-radius:6px; overflow-wrap: break-word; padding:5px 10px;">
                    <span v-html="this.bodySMS"></span>
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
                        <p>{{thankyou.subject}}</p>
                    </v-flex>
                </div>
                <div class="d-flex" style="padding: 0px 40px;" wrap row>
                    <v-flex xs12>
                        <p>Body :</p>
                    </v-flex>
                    <v-flex xs12 style="text-align:center">
                      <p style="overflow-wrap: break-word; text-align:left" v-html="this.bodyEmail"></p><br>
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
//   VMenu

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
    // VProgressLinear
  },
  data () {
    return {
      nowDate: new Date().toISOString().slice(0, 10),
      emailUsed: false,
      smsUsed: false,
      emailData: '',
      currentTime: '',
      previewData: false,
      previewDialogEmail: false,
      editView: false,
      reminderId: '',
      date_time: [],
      Sender: null,
      model: false,
      model2: false,
      dialog: false,
      previewDialog: false,
      testCampaigns: false,
      testEmailData: false,
      testSmsData: false,
      subjectEmail: 'You have completed the chat! THANKS',
      bodySMS: 'Thanks for successfully completing the chat with Amara. Your feedback is essential for us and it will help us plan better. Moreover, we would like to assure you that your responses will be kept confidential and we respect you for your thoughts.',
      bodyEmail: '<div>Hi {{recipient.first_name}},</div><div><br></div><div>You have spared some time from your busy schedule; we recognize your effort to help us.</div><div><br></div><div>Hope your experience of befriending Amara and conversing with her has been good. Your feedback is not only essential to make a future-proof action plan but also to make our organization a great place to work.</div><div><br></div><div>Moreover, we would like to assure you that your responses will be kept confidential and we respect you for your thoughts.</div><div><br></div><div>Thanks again!<br></div>',
      thankyou: {
      },
      thankyouData: [],
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
        action: this.deleteThankyou
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
          if (this.thankyou.channel === 'email') {
            this.testEmailData = true;
          }
          if (this.thankyou.channel === 'sms') {
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
        channel: this.thankyou.channel,
        subject: this.thankyou.channel === 'email' ? this.subjectEmail : undefined,
        body: this.thankyou.channel === 'email' ? this.bodyEmail : this.bodySMS,
        email: this.thankyou.test_emailId,
        phone: this.thankyou.test_mobile,
        first_name: this.thankyou.test_first_name,
        last_name: this.thankyou.test_last_name,
        sender: `${this.user.company_name} <${this.Sender[0]}@amara.ai>`
      };
      this.$validator.validateAll().then((res) => {
        if (res) {
          axios.post(`${process.env.VUE_APP_ADHOC_API_URL}stage/${this.stageId}/acknowledgement/test/`, temp)
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
      // if (this.mediumSelected === 'email') {
      //   this.thankyou.subject = this.subjectEmail;
      //   this.thankyou.body = this.bodyEmail;
      // } else {
      //   this.thankyou.subject = '';
      //   this.thankyou.body = this.bodySMS;
      // }
      // this.thankyou.title = `Thankyou ${this.thankyouData.length + 1}`;
      // this.thankyouData.push(this.thankyou);
      // this.dialog = false;
      // this.thankyou = {};
      // this.mediumSelected = '';
      // this.dialog = false;
      if (this.$route.params && this.$route.params.stageId) {
        this.stageId = this.$route.params.stageId;
      }
      if (this.thankyou.recipient_filter_type === 'no_response') {
        this.thankyou.recipient_filter = { status__in: 'initiated' };
      }
      if (this.thankyou.recipient_filter_type === 'partial_response') {
        this.thankyou.recipient_filter = { status__in: 'inProgress' };
      }
      if (this.thankyou.recipient_filter_type === 'both') {
        this.thankyou.recipient_filter = { status__in: 'initiated, inProgress' };
      }
      const temp = {
        stage: this.stageId,
        channel: this.thankyou.channel,
        subject: this.thankyou.channel === 'email' ? this.subjectEmail : undefined,
        body: this.thankyou.channel === 'email' ? this.bodyEmail : this.bodySMS,
        title: `Thankyou ${this.thankyou.channel}`,
        type: this.thankyou.type,
        trigger_time_duration: this.thankyou.trigger_time_duration,
        trigger_time_unit: 'days',
        trigger_date_time: this.thankyou.type === 'onetime' ? `${this.thankyou.date}T${this.thankyou.time}` : undefined,
        recipient_filter_type: this.thankyou.recipient_filter_type,
        recipient_filter: this.thankyou.recipient_filter,
        created_by: !this.editView ? this.user.email : undefined,
        last_update_by: this.user.email
      };
      this.$validator.validateAll().then((res) => {
        if (res) {
          axios.post(`${process.env.VUE_APP_ADHOC_API_URL}stage/${this.stageId}/acknowledgement/`, temp)
            .then((resp) => {
              if (resp.data) {
                this.reminder = {};
                this.mediumSelected = '';
                this.dialog = false;
                this.$store.dispatch('updateSnackbar', {
                  color: 'success',
                  show: true,
                  text: 'Thankyou template created successfully!'
                });
                this.getThankyou();
              }
            }, (resp) => {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: 'Unable to create thankyou template, Please try again later!'
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
      if (this.thankyou.recipient_filter_type === 'no_response') {
        this.thankyou.recipient_filter = { status__in: ['initiated'] };
      }
      if (this.thankyou.recipient_filter_type === 'partial_response') {
        this.thankyou.recipient_filter = { status__in: ['inProgress'] };
      }
      if (this.thankyou.recipient_filter_type === 'both') {
        this.thankyou.recipient_filter = { status__in: ['initiated', 'inProgress'] };
      }

      const temp = {
        stage: this.stageId,
        channel: this.thankyou.channel,
        subject: this.thankyou.channel === 'email' ? this.subjectEmail : undefined,
        body: this.thankyou.channel === 'email' ? this.bodyEmail : this.bodySMS,
        type: this.thankyou.type,
        trigger_time_duration: this.thankyou.type === 'automate' ? this.thankyou.trigger_time_duration : undefined,
        trigger_time_unit: this.thankyou.type === 'automate' ? 'days' : undefined,
        trigger_date_time: this.thankyou.type === 'onetime' ? `${this.thankyou.date}T${this.thankyou.time}` : undefined,
        recipient_filter_type: this.thankyou.recipient_filter_type,
        recipient_filter: this.thankyou.recipient_filter,
        created_by: this.user.email,
        last_update_by: this.editView ? this.user.email : undefined
      };
      axios.patch(`${process.env.VUE_APP_ADHOC_API_URL}stage/${this.stageId}/acknowledgement/${this.reminderId}/`, temp)
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
            this.getThankyou();
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
    getThankyou () {
      if (this.$route.params && this.$route.params.stageId) {
        this.stageId = this.$route.params.stageId;
      }
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}stage/${this.stageId}/acknowledgement/`).then((response) => {
        if (response && response.data) {
          this.thankyouData = response.data;
          this.$lodash.each(this.thankyouData, (v, k) => {
            if (v.channel === 'email') {
              this.emailUsed = true;
            }
            if (v.channel === 'sms') {
              this.smsUsed = true;
            }
          });
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
    deleteThankyou (data) {
      if (this.$route.params && this.$route.params.stageId) {
        this.stageId = this.$route.params.stageId;
      }
      axios.delete(`${process.env.VUE_APP_ADHOC_API_URL}stage/${this.stageId}/acknowledgement/${data.id}`).then((response) => {
        if (response) {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'successfully delete!'
          });
          if (data.channel === 'email') {
            this.emailUsed = false;
          }
          if (data.channel === 'sms') {
            this.smsUsed = false;
          }
          this.getThankyou();
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
      if (medium === 'sms' && this.smsUsed) {
        this.mediumSelected = '';
      } else if (medium === 'email' && this.emailUsed) {
        this.mediumSelected = '';
      } else {
        this.subjectEmail = 'You have completed the chat! THANKS';
        this.bodySMS = 'Thanks for successfully completing the chat with Amara. Your feedback is essential for us and it will help us plan better. Moreover, we would like to assure you that your responses will be kept confidential and we respect you for your thoughts.';
        this.bodyEmai = '<div>Hi {{recipient.first_name}},</div><div><br></div><div>You have spared some time from your busy schedule; we recognize your effort to help us.</div><div><br></div><div>Hope your experience of befriending Amara and conversing with her has been good. Your feedback is not only essential to make a future-proof action plan but also to make our organization a great place to work.</div><div><br></div><div>Moreover, we would like to assure you that your responses will be kept confidential and we respect you for your thoughts.</div><div><br></div><div>Thanks again!<br></div>';
        if (medium === 'email') {
          this.thankyou.chooseRadio = true;
          this.thankyou.chooseRadio1 = true;
        }
        if (medium === 'sms') {
          this.thankyou.chooseRadio = false;
          this.thankyou.chooseRadio1 = true;
        }
        this.thankyou.channel = medium;
        this.mediumSelected = medium;
        this.testEmailData = false;
        this.testSmsData = false;
      }
    },
    openDialog (item) {
      this.dialog = true;
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    closeModal () {
      this.mediumSelected = '';
      this.subjectEmail = 'You have completed the chat! THANKS';
      this.bodySMS = 'Thanks for successfully completing the chat with Amara. Your feedback is essential for us and it will help us plan better. Moreover, we would like to assure you that your responses will be kept confidential and we respect you for your thoughts.';
      this.bodyEmai = '<div>Hi {{recipient.first_name}},</div><div><br></div><div>You have spared some time from your busy schedule; we recognize your effort to help us.</div><div><br></div><div>Hope your experience of befriending Amara and conversing with her has been good. Your feedback is not only essential to make a future-proof action plan but also to make our organization a great place to work.</div><div><br></div><div>Moreover, we would like to assure you that your responses will be kept confidential and we respect you for your thoughts.</div><div><br></div><div>Thanks again!<br></div>';

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
      this.subjectEmail = 'You have completed the chat! THANKS';
      this.bodySMS = 'Thanks for successfully completing the chat with Amara. Your feedback is essential for us and it will help us plan better. Moreover, we would like to assure you that your responses will be kept confidential and we respect you for your thoughts.';
      this.bodyEmai = '<div>Hi {{recipient.first_name}},</div><div><br></div><div>You have spared some time from your busy schedule; we recognize your effort to help us.</div><div><br></div><div>Hope your experience of befriending Amara and conversing with her has been good. Your feedback is not only essential to make a future-proof action plan but also to make our organization a great place to work.</div><div><br></div><div>Moreover, we would like to assure you that your responses will be kept confidential and we respect you for your thoughts.</div><div><br></div><div>Thanks again!<br></div>';

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

      if (data) {
        this.mediumSelected = data.channel;
        this.thankyou = data;
        if (data.channel === 'sms') {
          this.bodySMS = data.body;
        }
        if (data.channel === 'email') {
          this.bodyEmail = data.body;
          this.subjectEmail = data.subject;
        }
        this.dialog = true;
        this.previewData = false;
      }
      if (this.testCampaigns) {
        setTimeout(() => {
          this.testEmail();
          this.mediumSelected = '';
        }, 100);
      }
    },
    deletes (data, index) {
      this.thankyouData[index].slice(data);
    }
  },
  watch: {
  },
  beforeMount () {
    this.getThankyou();
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
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltiptext {
  visibility: hidden;
  width: 100%;
  height: 140px;
  font-size: 15px;
  background-color: rgba(243, 243, 243, 0.8);
  color: black;
  text-align: center;
  border-radius: 2px;
  padding: 30px;
  text-align: justify;
  position: absolute;
  z-index: 1;
  bottom: 0%;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
