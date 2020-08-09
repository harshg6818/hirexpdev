<template>
  <v-card class="my-4 pa-4 activity-card elevation-0">
    <v-layout class="pt-3" row wrap align-center justify-center fill-height>
      <v-flex text-xs-center>
        <strong
          class="display-1 font-weight-bold grey--text"
          v-if="!user_timeline || user_timeline.length === 0"
        >Looks like you've not performed any action on this employee!</strong>

        <v-timeline clipped v-if="user_timeline && user_timeline.length > 0" style="margin-left: -75%;">
          <v-timeline-item
            class="timeline-activity"
            v-for="(item, i) in user_timeline"
            :key="`timeline-element-${i}`"
            :icon="getTimeLineIcon(item)"
            fill-dot
            right
          >
            <span
              slot="opposite"
              :class="`font-weight-bold black--text`"
            >{{ dayjs(item.created_at).from() }}</span>

            <!-- email_opened -->
            <v-card class="elevation-2" v-if="item.action === 'email_opened'">
              <v-card-title class="headline">
                 <v-container
                    fill-height
                    fluid
                    pa-2
                    v-if="item.notification_log && item.notification_log.extra_data && item.notification_log.extra_data.category === 'chat'"
                  >
                    <v-layout fill-height>
                      <v-flex xs6 flexbox class="text-left">
                         <v-chip color="green" label outline>
                           <b>OPENED</b>
                         </v-chip>
                      </v-flex>
                      <v-flex xs6 flexbox class="text-left">
                        Chat Email
                        <span @click="onClickViewReminder(item)">
                          <v-icon>
                            far fa-eye
                          </v-icon>
                        </span>
                      </v-flex>
                    </v-layout>
                </v-container>
                <v-container
                    fill-height
                    fluid
                    pa-2
                    v-if="item.notification_log && item.notification_log.extra_data && item.notification_log.extra_data.category === 'reminder'"
                  >
                    <v-layout fill-height>
                      <v-flex xs6 flexbox class="text-left">
                         <v-chip color="green" label outline>
                           <b>OPENED</b>
                         </v-chip>
                      </v-flex>
                      <v-flex xs6 flexbox class="text-left">
                        Reminder Email
                        <span>
                          <b>
                            &nbsp;{{ item.notification_log.extra_data.reminder_count }}
                          </b>
                        </span>&nbsp;
                        <span @click="onClickViewReminder(item)">
                          <v-icon>
                            far fa-eye
                          </v-icon>
                        </span>
                      </v-flex>
                    </v-layout>
                </v-container>
                <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout style="margin-top: -26px;font-size: 14px;color: #8a8a8a;">
                      <v-flex xs6 flexbox class="text-left">
                      </v-flex>
                      <v-flex xs6 flexbox class="text-left">
                        {{dayjs(item.created_at).format('DD')}}&nbsp;{{dayjs(item.created_at).format('MMMM') }}&nbsp;{{dayjs(item.created_at).format('YYYY') }} at {{dayjs(item.created_at).format('hh') }}:{{dayjs(item.created_at).format('mm') }}&nbsp;{{dayjs(item.created_at).format('A') }}
                      </v-flex>
                    </v-layout>
                </v-container>
                <v-container
                    fill-height
                    fluid
                    pa-0
                    v-if="item && item.session && item.session.stage_title"
                  >
                    <v-layout fill-height>
                      <v-flex xs6 flexbox class="text-left" style="padding-left:10px">
                        <b>TouchPoint</b>
                      </v-flex>
                      <v-flex xs6 flexbox class="text-left">
                        {{item.session.stage_title}}
                      </v-flex>
                    </v-layout>
                </v-container>
              </v-card-title>
            </v-card>

            <!-- email_delivered -->
            <v-card class="elevation-2" v-if="item.action === 'email_delivered'">
              <v-card-title class="headline">
                 <v-container
                    fill-height
                    fluid
                    pa-2
                    v-if="item.notification_log && item.notification_log.extra_data && item.notification_log.extra_data.category === 'chat'"
                  >
                    <v-layout fill-height>
                      <v-flex xs6 flexbox class="text-left">
                         <v-chip color="orange" label outline>
                           <b>DELIVERED</b>
                         </v-chip>
                      </v-flex>
                      <v-flex xs6 flexbox class="text-left">
                        Chat Email
                        <span @click="onClickViewReminder(item)">
                          <v-icon>
                            far fa-eye
                          </v-icon>
                        </span>
                      </v-flex>
                    </v-layout>
                </v-container>
                <v-container
                    fill-height
                    fluid
                    pa-2
                    v-if="item.notification_log && item.notification_log.extra_data && item.notification_log.extra_data.category === 'reminder'"
                  >
                    <v-layout fill-height>
                      <v-flex xs6 flexbox class="text-left">
                         <v-chip color="orange" label outline>
                           <b>DELIVERED</b>
                         </v-chip>
                      </v-flex>
                      <v-flex xs6 flexbox class="text-left">
                        Reminder Email
                        <span>
                          <b>
                            &nbsp;{{ item.notification_log.extra_data.reminder_count }}
                          </b>
                        </span>&nbsp;
                        <span @click="onClickViewReminder(item)">
                          <v-icon>
                            far fa-eye
                          </v-icon>
                        </span>
                      </v-flex>
                    </v-layout>
                </v-container>
                <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout style="margin-top: -26px;font-size: 14px;color: #8a8a8a;">
                      <v-flex xs6 flexbox class="text-left">
                      </v-flex>
                      <v-flex xs6 flexbox class="text-left">
                        {{dayjs(item.created_at).format('DD')}}&nbsp;{{dayjs(item.created_at).format('MMMM') }}&nbsp;{{dayjs(item.created_at).format('YYYY') }} at {{dayjs(item.created_at).format('hh') }}:{{dayjs(item.created_at).format('mm') }}&nbsp;{{dayjs(item.created_at).format('A') }}
                      </v-flex>
                    </v-layout>
                </v-container>
                <v-container
                    fill-height
                    fluid
                    pa-0
                    v-if="item && item.session && item.session.stage_title"
                  >
                    <v-layout fill-height>
                      <v-flex xs6 flexbox class="text-left" style="padding-left:10px">
                        <b>TouchPoint</b>
                      </v-flex>
                      <v-flex xs6 flexbox class="text-left">
                        {{item.session.stage_title}}
                      </v-flex>
                    </v-layout>
                </v-container>
              </v-card-title>
            </v-card>

            <!-- email_bounced -->
            <v-card class="elevation-2" v-if="item.action === 'email_bounced'">
              <v-card-title class="headline">
                 <v-container
                    fill-height
                    fluid
                    pa-2
                    v-if="item.notification_log && item.notification_log.extra_data && item.notification_log.extra_data.category === 'chat'"
                  >
                    <v-layout fill-height>
                      <v-flex xs6 flexbox class="text-left">
                         <v-chip color="red" label outline>
                           <b>BOUNCED</b>
                         </v-chip>
                      </v-flex>
                      <v-flex xs6 flexbox class="text-left">
                        Chat Email
                        <span @click="onClickViewReminder(item)">
                          <v-icon>
                            far fa-eye
                          </v-icon>
                        </span>
                      </v-flex>
                    </v-layout>
                </v-container>
                <v-container
                    fill-height
                    fluid
                    pa-2
                    v-if="item.notification_log && item.notification_log.extra_data && item.notification_log.extra_data.category === 'reminder'"
                  >
                    <v-layout fill-height>
                      <v-flex xs6 flexbox class="text-left">
                         <v-chip color="red" label outline>
                           <b>BOUNCED</b>
                         </v-chip>
                      </v-flex>
                      <v-flex xs6 flexbox class="text-left">
                        Reminder Email
                        <span>
                          <b>
                            &nbsp;{{ item.notification_log.extra_data.reminder_count }}
                          </b>
                        </span>&nbsp;
                        <span @click="onClickViewReminder(item)">
                          <v-icon>
                            far fa-eye
                          </v-icon>
                        </span>
                      </v-flex>
                    </v-layout>
                </v-container>
                <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout style="margin-top: -26px;font-size: 14px;color: #8a8a8a;">
                      <v-flex xs6 flexbox class="text-left">
                      </v-flex>
                      <v-flex xs6 flexbox class="text-left">
                        {{dayjs(item.created_at).format('DD')}}&nbsp;{{dayjs(item.created_at).format('MMMM') }}&nbsp;{{dayjs(item.created_at).format('YYYY') }} at {{dayjs(item.created_at).format('hh') }}:{{dayjs(item.created_at).format('mm') }}&nbsp;{{dayjs(item.created_at).format('A') }}
                      </v-flex>
                    </v-layout>
                </v-container>
                <v-container
                    fill-height
                    fluid
                    pa-0
                    v-if="item && item.session && item.session.stage_title"
                  >
                    <v-layout fill-height>
                      <v-flex xs6 flexbox class="text-left" style="padding-left:10px">
                        <b>TouchPoint</b>
                      </v-flex>
                      <v-flex xs6 flexbox class="text-left">
                        {{item.session.stage_title}}
                      </v-flex>
                    </v-layout>
                </v-container>
              </v-card-title>
            </v-card>

            <!-- Milestone Completed -->
            <v-card class="elevation-2" v-if="item.action === 'milestone_completed'">
              <v-card-title class="headline">
                {{employee.display_name}} has completed the
                <span
                  v-if="item && item.session && item.session.stage_title"
                >&nbsp;{{item.session.stage_title}}&nbsp;</span>
                touchpoint.
              </v-card-title>
            </v-card>

            <!-- Chat started -->
            <v-card class="elevation-2" v-if="item.action === 'chat_started'">
              <v-card-title class="headline">
                {{employee.display_name}} has started the chat for
                <span
                  v-if="item && item.session && item.session.stage_title"
                >&nbsp;{{item.session.stage_title}}&nbsp;</span>
                touchpoint.
              </v-card-title>
            </v-card>

            <!-- Chat Completed -->
            <v-card class="elevation-2" v-if="item.action === 'chat_completed'">
              <v-card-title class="headline">
                {{employee.display_name}} has completed the chat for
                <span
                  v-if="item && item.session && item.session.stage_title"
                >&nbsp;{{item.session.stage_title}}&nbsp;</span>
                touchpoint.
              </v-card-title>
            </v-card>

            <!-- Schedule -->
            <v-card
              class="elevation-2"
              v-if="item.action === 'user_schedule_added' || item.action === 'meeting_scheduled'"
            >
              <v-layout v-if="item.user_schedule.status === 'deleted'">
                <!-- <v-card> -->
                <v-flex class="delete-event-card">This event has been deleted</v-flex>
                <!-- </v-card> -->
              </v-layout>
              <v-card-title
                class="headline"
                v-if="item.user_schedule && item.user_schedule.created_by && item.user_schedule.created_by.display_name"
                :class="item.user_schedule.status === 'deleted' ? 'event-deleted' : 'event-active'"
              >
                <v-layout>
                  <v-flex
                    sm6
                    style="margin-left:-25px;"
                  >{{item.user_schedule.created_by.display_name}} has scheduled an event.</v-flex>
                  <v-flex sm6 style="margin-left: 15%;">
                    <div style="float: right;">
                      <v-icon
                        class="mr-2"
                        small
                        color="primary"
                        @click="editTimeline(item, 'edit')"
                      >fas fa-edit</v-icon>
                      <v-icon
                        style="padding-left: 16px;"
                        class="mr-2"
                        small
                        color="primary"
                        @click="editTimeline(item, 'delete')"
                      >fas fa-trash</v-icon>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text
                v-if="item.user_schedule && item.user_schedule.created_by && item.user_schedule.created_by.display_name && item.user_schedule.attendees"
                :class="item.user_schedule.status === 'deleted' ? 'event-deleted' : 'event-active'"
              >
                <v-layout row wrap class="mb-2 text-sm-left">
                  <strong>Attendees:</strong>
                  <v-tooltip bottom v-for="(attendee, ai) in item.user_schedule.attendees" :key="ai">
                    <v-avatar
                      size="40px"
                      class="mx-2 text-xs-center"
                      slot="activator"
                      style="position:relative;top:-10px"
                      :color="getColor(attendee)"
                    >
                      <span class="white--text" style="font-size:16px">{{getAvatar(attendee)}}</span>
                    </v-avatar>
                    {{attendee.name}}
                  </v-tooltip>'
                </v-layout>

                <v-layout row wrap class="mb-2 text-sm-left">
                  <strong>Description :</strong>
                  <p>&nbsp; {{item.user_schedule.description}}</p>
                  <br />
                </v-layout>

                <v-layout row wrap class="mb-2 text-sm-left">
                  <strong>Event Start Time :</strong>
                  <p>&nbsp; {{dayjs(item.user_schedule.event_time).format('DD-MM-YYYY HH:MM')}}</p>
                </v-layout>

                <v-layout row wrap class="mb-2 text-sm-left">
                  <strong>Event End Time :</strong>
                  <p>&nbsp; {{dayjs(item.user_schedule.expiry_time).format('DD-MM-YYYY HH:MM')}}</p>
                </v-layout>
              </v-card-text>
            </v-card>

            <!-- Email -->

            <v-card class="elevation-2" v-if="item.action === 'email_sent'">
              <v-card-title
                class="headline"
                v-if="item.user_email && item.user_email.created_by && item.user_email.created_by.display_name"
              >
                {{item.user_email.created_by.display_name}} sent an email&nbsp;
                <span
                  v-if="employee.display_name"
                >to {{ employee.display_name }}</span>
              </v-card-title>
              <v-card-text v-if="item.user_email && item.user_email.subject">
                <v-layout row wrap class="mb-2 text-sm-left">
                  <strong>Subject :</strong>
                  <p>&nbsp; {{item.user_email.subject}}</p>
                  <br />
                </v-layout>

                <v-layout row wrap class="mb-2 text-sm-left">
                  <!-- <strong> Body : </strong> -->
                  <p v-if="item.user_email.type === 'html'" v-html="item.user_email.body"></p>
                  <p v-else>&nbsp; {{item.user_email.body}}</p>
                  <br />
                </v-layout>
              </v-card-text>
            </v-card>

            <!-- sent sms -->
            <v-card class="elevation-2" v-if="item.action === 'sms_sent'">
              <v-card-title
                class="headline"
                v-if="item.created_by.display_name"
              >
                {{item.created_by.display_name}} sent an SMS&nbsp;
                <span
                  v-if="employee.display_name"
                >to {{ employee.display_name }}</span>
              </v-card-title>
              <v-card-text v-if="item.user_sms && item.user_sms.phone_number">
                <v-layout row wrap class="mb-2 text-sm-left">
                  <strong>Phone number :</strong>
                  <p>&nbsp; {{item.user_sms.phone_number}}</p>
                  <br />
                </v-layout>

                <v-layout row wrap class="mb-2 text-sm-left">
                  <!-- <strong> Body : </strong> -->
                  <p v-if="item.user_sms.type === 'html'" v-html="item.user_sms.sms_text"></p>
                  <p v-else>&nbsp; {{item.user_sms.sms_text}}</p>
                  <br />
                </v-layout>
              </v-card-text>
            </v-card>

            <!-- Mark high potential employee -->
            <v-card class="elevation-2" v-if="item.action === 'marked_high_potential_employee'">
              <v-card-title
                class="headline"
                v-if="item.created_by && item.created_by.display_name"
              >{{item.created_by.display_name}} marked this employee as a high potential employee. &nbsp;</v-card-title>
            </v-card>

            <!-- Unmark high potential employee -->
            <v-card class="elevation-2" v-if="item.action === 'unmarked_high_potential_employee'">
              <v-card-title
                class="headline"
                v-if="item.created_by && item.created_by.display_name"
              >{{item.created_by.display_name}} unmarked this employee as a high potential employee. &nbsp;</v-card-title>
            </v-card>

            <!-- interactions enabled-->
            <v-card class="elevation-2" v-if="item.action === 'interactions_enabled'">
              <v-card-title
                class="headline"
                v-if="item.created_by && item.created_by.display_name"
              >{{item.created_by.display_name}} enabled Amara interactions with this employee. &nbsp;</v-card-title>
            </v-card>

            <!-- interactions disabled-->
            <v-card class="elevation-2" v-if="item.action === 'interactions_disabled'">
              <v-card-title
                class="headline"
                v-if="item.created_by && item.created_by.display_name"
              >{{item.created_by.display_name}} stopped Amara interactions with this employee. &nbsp;</v-card-title>
            </v-card>
            <!-- chat acknowledged -->
            <v-card class="elevation-2" v-if="item.action === 'chat_acknowledged'">
              <v-card-title
                class="headline"
                v-if="item.created_by && item.created_by.display_name"
              >{{item.created_by.display_name}} has sent an acknowledgment email to this employee. &nbsp;</v-card-title>
            </v-card>

            <!-- Comment -->
            <v-card class="elevation-2" v-if="item.action === 'comment_updated'">
              <v-card-title
                class="headline"
                v-if="item.created_by && item.created_by.display_name"
              >{{item.created_by.display_name}} has updated a comment &nbsp;</v-card-title>
              <v-card-text v-if="item.comment && item.comment.body">
                <v-layout row wrap class="mb-2 text-sm-left">
                  <p>&nbsp; {{item.comment.body}}</p>
                  <br />
                </v-layout>
              </v-card-text>
            </v-card>

            <v-card class="elevation-2" v-if="item.action === 'comment_added'">
              <v-card-title
                class="headline"
                v-if="item.created_by && item.created_by.display_name"
              >{{item.created_by.display_name}} added a new comment &nbsp;</v-card-title>
              <v-card-text v-if="item.comment && item.comment.body">
                <v-layout row wrap class="mb-2 text-sm-left">
                  <p>&nbsp; {{item.comment.body}}</p>
                  <br />
                </v-layout>
              </v-card-text>
            </v-card>

            <v-card class="elevation-2" v-if="item.action === 'comment_deleted'">
              <v-card-title
                class="headline"
                v-if="item.created_by && item.created_by.display_name"
              >{{item.created_by.display_name}} has deleted a comment &nbsp;</v-card-title>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title style="padding-bottom: 2px;">
        <div>
          <b>Subject:</b>
          <span>
            {{ emailSubject }}
          </span>
        </div>
        </v-card-title>
        <v-card-title style="padding-bottom: 2px;padding-top: 0px;">
          <div>
            <b>From:</b>
            <span>
              {{ emailFrom }}
            </span>
          </div>
        </v-card-title>

        <v-card-title style="padding-bottom: 6px;padding-top: 0px;">
          <div>
          <b>To:</b>
            <span v-for="(e,index) in emailTo" :key="index">
              {{e}}
            </span>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <!-- <div>
          <img src="./amara_avatar.png" height="40" width="40" style="margin: 5px 0px 0px 15px;">
          <span style="float: right;padding-top: 30px;padding-right: 10px;">
            {{dayjs(deliverDate).format('DD')}}&nbsp;{{dayjs(deliverDate).format('MMMM') }}&nbsp;{{dayjs(deliverDate).format('YYYY') }} at {{dayjs(deliverDate).format('hh') }}:{{dayjs(deliverDate).format('mm') }}&nbsp;{{dayjs(deliverDate).format('A') }}
          </span>
        </div> -->
        <div v-html="emailBody1" style="padding:15px"></div>

        <v-btn style="margin-left: 36%;" color="primary" :disabled="!actionButton">{{actionButtonLabel}}</v-btn>

        <div v-html="emailBody2" style="padding:15px"></div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
// import { ContentLoader } from "vue-content-loader";
import axios from 'axios';
// import { VChip, VAvatar, VTooltip } from "vuetify";

export default {
  name: 'dashboard',
  components: {
    // ContentLoader,
    // VChip,
    // VAvatar,
    // VTooltip
  },
  data () {
    return {
      employee: null,
      user_timeline: [],
      config: {
        initialLoading: true
      },
      emailSubject: null,
      dialog: false,
      emailBody1: null,
      emailBody2: null,
      deliverDate: null,
      emailFrom: null,
      emailTo: null,
      actionButton: null,
      actionButtonLabel: null
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    getTimeline (id) {
      const queryParams = {
        fields: 'user_timeline,employee_id,display_name,email,stage'
      };
      axios
        .get(`${process.env.VUE_APP_API_URL}users/${id}/details`, {
          params: queryParams
        })
        .then(
          (response) => {
            this.config.initialLoading = false;
            if (response && response.data) {
              this.employee = response.data;
              this.user_timeline = response.data.user_timeline;
            }
          },
          (response) => {
            this.config.initialLoading = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to fetch employee, Please try again later!'
            });
            throw new Error(response);
          }
        );
    },
    getTimeLineIcon (item) {
      if (item.action === 'email_opened') {
        return 'far fa-envelope-open';
      }
      if (item.action === 'email_bounced') {
        return 'fas fa-exclamation-triangle';
      }
      if (item.action === 'milestone_completed') {
        return 'fas fa-bezier-curve';
      }
      if (item.action === 'chat_started' || item.action === 'chat_completed') {
        return 'far fa-comment-dots';
      }
      if (item.action === 'meeting_scheduled' || item.action === 'user_schedule_added') {
        return 'far fa-calendar-alt';
      }
      if (item.action === 'email_sent' || item.action === 'email_delivered') {
        return 'far fa-paper-plane';
      }
      if (item.action === 'marked_high_potential_employee') {
        return 'fas fa-star';
      }
      if (item.action === 'unmarked_high_potential_employee') {
        return 'far fa-star';
      }
      if (item.action === 'interactions_enabled') {
        return 'fas fa-user-check';
      }
      if (item.action === 'interactions_disabled') {
        return 'fas fa-user-times';
      }
      if (item.action === 'chat_acknowledged') {
        return 'fas fa-check-square';
      }
      if (item.action === 'sms_sent') {
        return 'fas fa-comment-alt';
      }
      if (item.action === 'comment_updated' || item.action === 'comment_added' || item.action === 'comment_deleted') {
        return 'far fa-comment-alt';
      }
      return '';
    },
    onClickViewReminder (item) {
      this.emailSubject = item.notification_log.extra_data.email_data.subject;
      this.emailBody1 = item.notification_log.extra_data.email_data.body.body_1;
      this.emailBody2 = item.notification_log.extra_data.email_data.body.body_2;
      this.deliverDate = item.notification_log.delivered_at;
      this.emailFrom = item.notification_log.extra_data.email_data.sender_email;
      this.emailTo = item.notification_log.extra_data.email_data.recipient_list;
      if (item.notification_log.extra_data.email_data.actionButton) {
        this.actionButton = item.notification_log.extra_data.email_data.actionButton.is_active;
      } else {
        this.actionButton = false;
      }
      if (item.notification_log.extra_data.email_data.actionButton) {
        this.actionButtonLabel = item.notification_log.extra_data.email_data.actionButton.button_label;
      } else {
        this.actionButtonLabel = 'Start the chat';
      }
      this.dialog = true;
    },
    getColor (e) {
      let color = 'primary';
      if (e.gender && e.gender === 'female') {
        color = 'pink';
      }
      return color;
    },
    getAvatar (c) {
      let avt = '';
      // if (c.first_name && c.last_name) {
      //   avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      // } else if (c.first_name && !c.last_name) {
      //   avt = `${c.first_name.charAt(0)}`;
      // } else if (!c.first_name && c.last_name) {
      //   avt = `${c.last_name.charAt(0)}`;
      // } else if (!c.first_name && !c.last_name && c.display_name) {
      //   c.first_name = c.display_name.split(' ')[0];
      //   c.last_name = c.display_name.split(' ')[1];
      //   avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      // }
      c.first_name = c.name.split(' ')[0];
      c.last_name = c.name.split(' ')[1];
      avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      return avt.toUpperCase();
    },
    editTimeline (item, type) {
      const tempItem = { ...item, type };
      this.$emit('editTimeLineInvite', tempItem);
    }
  },
  beforeMount () {}
};
</script>

<style lang="scss" scoped>
.event-deleted {
  opacity: 0.4;
  pointer-events: none;
}
.delete-event-card {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  text-align: left;
  padding: 4px 0px 4px 14px;
  border-radius: 4px;
}
.text-left {
  text-align: left;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.activity-card {
  min-height: calc(100vh - 15em);
  border: 2px solid #fff;
  .layout {
    // height: 60vh;
  }
}
.timeline-activity {
  .v-card__title {
    padding: 5px 10px !important;
    &.headline {
      font-size: 16px !important;
    }
  }
  .v-timeline-item__opposite {
    margin-right: 70px !important;
    max-width: 80px !important;
    text-align: left !important;
  }
}
</style>
