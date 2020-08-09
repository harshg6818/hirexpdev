<template>
  <div class="single-emp-timeline-wrap">
    <div
      class="emp-timeline-item"
      v-for="(item, i) in user_timeline"
      :key="`timeline-element-${i}`"
    >
      <v-container class="pa-3">
        <!-- Milestone Completed start-->
        <v-layout v-if="item.action === 'milestone_completed'">
          <v-flex xs2 class="text-xs-center item-avatar">
            <!-- <v-btn slot="activator" color="#6f64b0" icon outline
              class="elevation-0 item-icon">
              <v-icon >{{getTimeLineIcon(item)}}</v-icon>
            </v-btn> -->
            <div class="star-icon">
              <v-icon>{{getTimeLineIcon(item)}}</v-icon>
            </div>
            <div class="emp-profile-image">
              <img :src="getImgUrl('male-avatar')">
            </div>
          </v-flex>
          <v-flex xs10>
            <v-layout class="item-heading">
              <v-flex class="text-xs-left">Milestone</v-flex>
              <v-flex class="text-xs-right">{{ dayjs(item.created_at).from() }}</v-flex>
            </v-layout>
            <v-layout class="item-body">
              <v-flex xs12>
                <div class=" grey--text">
                  {{employee.display_name}} has completed the
                  <span v-if="item && item.session && item.session.stage_title">
                    &nbsp;{{item.session.stage_title}}&nbsp;
                  </span>
                  touchpoint.
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- Milestone Completed end-->

        <!-- Chat started -->
        <v-layout v-if="item.action === 'chat_started'">
          <v-flex xs2>
            <v-btn slot="activator" color="#6f64b0" icon outline
              class="elevation-0 item-icon">
              <v-icon >{{getTimeLineIcon(item)}}</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs10>
            <v-layout class="item-heading">
              <v-flex class="text-xs-left">Chat</v-flex>
              <v-flex class="text-xs-right">{{ dayjs(item.created_at).from() }}</v-flex>
            </v-layout>
            <v-layout class="item-body">
              <v-flex xs12>
                <div class=" grey--text">
                  {{employee.display_name}} has started the chat for
                  <span
                    v-if="item && item.session && item.session.stage_title"
                  >
                    &nbsp;{{item.session.stage_title}}&nbsp;
                  </span>
                  touchpoint.
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- Chat started -->

        <!-- Chat Completed -->
        <v-layout v-if="item.action === 'chat_completed'">
          <v-flex xs2>
            <v-btn slot="activator" color="#6f64b0" icon outline
              class="elevation-0 item-icon">
              <v-icon >{{getTimeLineIcon(item)}}</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs10>
            <v-layout class="item-heading">
              <v-flex class="text-xs-left">Chat</v-flex>
              <v-flex class="text-xs-right">{{ dayjs(item.created_at).from() }}</v-flex>
            </v-layout>
            <v-layout class="item-body">
              <v-flex xs12>
                <div class=" grey--text">
                  {{employee.display_name}} has completed the chat for
                <span
                  v-if="item && item.session && item.session.stage_title"
                >&nbsp;{{item.session.stage_title}}&nbsp;</span>
                touchpoint.
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- Chat Completed -->

        <!-- Mark high potential employee -->
        <v-layout v-if="item.action === 'marked_high_potential_employee'">
          <v-flex xs2>
            <v-btn slot="activator" color="#6f64b0" icon outline
              class="elevation-0 item-icon">
              <v-icon >{{getTimeLineIcon(item)}}</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs10>
            <v-layout class="item-heading">
              <v-flex class="text-xs-left">High potential</v-flex>
              <v-flex class="text-xs-right">{{ dayjs(item.created_at).from() }}</v-flex>
            </v-layout>
            <v-layout class="item-body">
              <v-flex xs12>
                <div class=" grey--text">
                  <span
                    v-if="item && item.created_by.display_name"
                  >&nbsp;{{item.created_by.display_name}}&nbsp;</span>
                  marked this employee as a high potential employee.
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- Mark high potential employee -->

        <!-- Unmark high potential employee -->
        <v-layout v-if="item.action === 'unmarked_high_potential_employee'">
          <v-flex xs2>
            <v-btn slot="activator" color="#6f64b0" icon outline
              class="elevation-0 item-icon">
              <v-icon >{{getTimeLineIcon(item)}}</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs10>
            <v-layout class="item-heading">
              <v-flex class="text-xs-left">High potential</v-flex>
              <v-flex class="text-xs-right">{{ dayjs(item.created_at).from() }}</v-flex>
            </v-layout>
            <v-layout class="item-body">
              <v-flex xs12>
                <div class=" grey--text">
                  <span
                    v-if="item && item.created_by.display_name"
                  >&nbsp;{{item.created_by.display_name}}&nbsp;</span>
                  unmarked this employee as a high potential employee.
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- Unmark high potential employee -->

        <!-- interactions enabled-->
        <v-layout v-if="item.action === 'interactions_enabled'">
          <v-flex xs2>
            <v-btn slot="activator" color="#6f64b0" icon outline
              class="elevation-0 item-icon">
              <v-icon >{{getTimeLineIcon(item)}}</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs10>
            <v-layout class="item-heading">
              <v-flex class="text-xs-left">Amara interactions</v-flex>
              <v-flex class="text-xs-right">{{ dayjs(item.created_at).from() }}</v-flex>
            </v-layout>
            <v-layout class="item-body">
              <v-flex xs12>
                <div class=" grey--text">
                  <span
                    v-if="item && item.created_by.display_name"
                  >&nbsp;{{item.created_by.display_name}}&nbsp;</span>
                  enabled Amara interactions with this employee.
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- interactions enabled-->

        <!-- interactions disabled-->
        <v-layout v-if="item.action === 'interactions_disabled'">
          <v-flex xs2>
            <v-btn slot="activator" color="#6f64b0" icon outline
              class="elevation-0 item-icon">
              <v-icon >{{getTimeLineIcon(item)}}</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs10>
            <v-layout class="item-heading">
              <v-flex class="text-xs-left">Amara interactions</v-flex>
              <v-flex class="text-xs-right">{{ dayjs(item.created_at).from() }}</v-flex>
            </v-layout>
            <v-layout class="item-body">
              <v-flex xs12>
                <div class=" grey--text">
                  <span
                    v-if="item && item.created_by.display_name"
                  >&nbsp;{{item.created_by.display_name}}&nbsp;</span>
                  stopped Amara interactions with this employee.
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- interactions disabled-->
        <!-- chat acknowledged -->
        <v-layout v-if="item.action === 'chat_acknowledged'">
          <v-flex xs2>
            <v-btn slot="activator" color="#6f64b0" icon outline
              class="elevation-0 item-icon">
              <v-icon >{{getTimeLineIcon(item)}}</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs10>
            <v-layout class="item-heading">
              <v-flex class="text-xs-left">Acknowledgment</v-flex>
              <v-flex class="text-xs-right">{{ dayjs(item.created_at).from() }}</v-flex>
            </v-layout>
            <v-layout class="item-body">
              <v-flex xs12>
                <div class=" grey--text">
                  <span
                    v-if="item && item.created_by.display_name"
                  >&nbsp;{{item.created_by.display_name}}&nbsp;</span>
                  has sent an acknowledgment email to this employee.
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- chat acknowledged -->

        <!-- Comment updated-->
        <v-layout v-if="item.action === 'comment_updated'">
          <v-flex xs2>
            <v-btn slot="activator" color="#6f64b0" icon outline
              class="elevation-0 item-icon">
              <v-icon >{{getTimeLineIcon(item)}}</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs10>
            <v-layout class="item-heading">
              <v-flex class="text-xs-left">Comment</v-flex>
              <v-flex class="text-xs-right">{{ dayjs(item.created_at).from() }}</v-flex>
            </v-layout>
            <v-layout class="item-body">
              <v-flex xs12>
                <div class="grey--text">
                  <span
                    v-if="item && item.created_by.display_name"
                  >&nbsp;{{item.created_by.display_name}}&nbsp;</span>
                  has updated a comment.
                  <span v-if="item && item.comment && item.comment.body">
                    &nbsp;&mdash;&nbsp;
                    {{item.comment.body}}&nbsp;
                  </span>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- Comment updated-->
        <!-- Comment added-->
        <v-layout v-if="item.action === 'comment_added'">
          <v-flex xs2>
            <v-btn slot="activator" color="#6f64b0" icon outline
              class="elevation-0 item-icon">
              <v-icon >{{getTimeLineIcon(item)}}</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs10>
            <v-layout class="item-heading">
              <v-flex class="text-xs-left">Comment</v-flex>
              <v-flex class="text-xs-right">{{ dayjs(item.created_at).from() }}</v-flex>
            </v-layout>
            <v-layout class="item-body">
              <v-flex xs12>
                <div class="grey--text">
                  <span
                    v-if="item && item.created_by.display_name"
                  >&nbsp;{{item.created_by.display_name}}&nbsp;</span>
                  added a new comment.
                  <span v-if="item && item.comment && item.comment.body">
                    &nbsp;&mdash;&nbsp;
                    {{item.comment.body}}&nbsp;
                  </span>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- Comment added-->
        <!-- Comment deleted-->
        <v-layout v-if="item.action === 'comment_deleted'">
          <v-flex xs2>
            <v-btn slot="activator" color="#6f64b0" icon outline
              class="elevation-0 item-icon">
              <v-icon >{{getTimeLineIcon(item)}}</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs10>
            <v-layout class="item-heading">
              <v-flex class="text-xs-left">Comment</v-flex>
              <v-flex class="text-xs-right">{{ dayjs(item.created_at).from() }}</v-flex>
            </v-layout>
            <v-layout class="item-body">
              <v-flex xs12>
                <div class="grey--text">
                  <span
                    v-if="item && item.created_by.display_name"
                  >&nbsp;{{item.created_by.display_name}}&nbsp;</span>
                  has deleted a comment.
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- Comment deleted-->
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'SingleEmployeeTimeline',

  data () {
    return {
      user_timeline: [],
      employee: null,
      items: [
        // { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        }
      ]
    };
  },

  computed: {
    ...mapState({
      user: state => state.user,
      activeEmployee: state => state.activeEmployee,
      singleEmpView: state => state.singleEmpView
    })
  },

  methods: {
    getTimeline () {
      const queryParams = {
        fields: 'user_timeline,employee_id,display_name,email,stage'
      };
      axios.get(`${process.env.VUE_APP_API_URL}users/${this.activeEmployee.id}/details`, {
        params: queryParams
      }).then((response) => {
        if (response && response) {
          // console.log('response.data', response.data);
          this.employee = response.data;
          this.user_timeline = response.data.user_timeline;
        }
      });
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.single-emp-timeline-wrap {
  .emp-timeline-item {
    background: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    &:hover {
      background: rgba(0,0,0,.04);
    }
    .item-avatar {
      position: relative;
      .star-icon {
        position: absolute;
        bottom: 8px;
        height: 25px;
        width: 25px;
        background: #6f64b0;
        border-radius: 50%;
        i {
          // color: #6f64b0;
          // font-size: 20px !important;
          color: #fff;
          font-size: 14px !important;
        }
      }
      .emp-profile-image {
        img {
          vertical-align: middle;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
    .item-icon {
      position: relative;
      pointer-events: none;
      border-radius: 8px !important;
      i {
        position: absolute;
        color: #6f64b0 !important;
        top: 50%;
        bottom: 50%;
        right: 50%;
        left: 50%;
      }
    }
  }
}
</style>
