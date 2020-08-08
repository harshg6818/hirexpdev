<template>
  <div class="anonymous-chat-window-wrap">
    <div class="chat-head pa-3" v-if="activeAnonymousUser">
        <!-- <div class="d-flex align-items-center">
            <v-avatar size="50" class="profile-avatar">
              <img :src="getImgUrl('anonymous-user')" alt="user-image">
            </v-avatar>
          <h5 class="mb-0">Team Discussions</h5>
        </div> -->
      <div class="left-side">
        <div class="icon">
          <v-avatar size="50" class="profile-avatar">
            <img :src="getImgUrl('anonymous-user')" alt="user-image">
          </v-avatar>
        </div>
        <div class="user-title" v-if="activeAnonymousUser.anonymous_name">
          {{activeAnonymousUser.anonymous_name}}
        </div>
      </div>
      <div class="right-side">
        <div class="ml-2">
          <div class="text-center">
            Status
          </div>
          <v-menu offset-y max-height="300">
            <v-btn
              slot="activator"
              color="#6f64b0"
              small
              outlined
            >
              <span v-if="activeAnonymousUser.status">
                {{activeAnonymousUser.status}}
              </span>
              &nbsp;
              <span style="position:relative">
                <v-icon small>fas fa-sort-down</v-icon>
              </span>
            </v-btn>
            <v-list>
              <v-list-item
                v-for="(a,index) in actions" :key="index"
                @click="updateStatus(a.id)"
              >
                <v-list-item-title>
                  <span>
                    <v-icon small>{{a.icon}}</v-icon>
                  </span>
                  <span>&nbsp;&nbsp;</span>
                  <span>{{a.title}}</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div class="ml-2">
          <div class="text-center">
            Assigend To
          </div>
          <v-menu offset-y max-height="300">
            <v-btn
              slot="activator"
              color="#6f64b0"
              small
              outlined
            >
              <span v-if="activeAnonymousUser.assignedTo">
                <!-- {{activeAnonymousUser.assignedTo}} -->
                {{getAssignedToUser(activeAnonymousUser.assignedTo)}}
              </span>
              <span v-else>
                Not Assigned
              </span>
              &nbsp;
              <span style="position:relative">
                <v-icon small>fas fa-sort-down</v-icon>
              </span>
            </v-btn>
            <v-list>
              <v-list-item
                v-if="activeAnonymousUser.assignedTo"
                @click="updateAssignedTo(null)"
              >
                <v-list-item-title>
                  Remove assignee
                </v-list-item-title>
              </v-list-item>
              <v-divider
                v-if="activeAnonymousUser.assignedTo"
              ></v-divider>
              <v-list-item
                v-for="(a,index) in assignedToList" :key="index"
                @click="updateAssignedTo(a.id)"
              >
                <v-list-item-title>
                  {{a.display_name}}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div
          :class="activeAnonymousUser.status !== 'Na' ||
          activeAnonymousUser.status > 0 ? 'pt-4 mt-2 ml-2': ''"
        >
          <v-btn
            slot="activator"
            color="#6f64b0"
            small
            outlined
            @click.stop="requestIdentity(activeAnonymousUser)"
          >
            <v-icon small>fas fa-id-card</v-icon>
            &nbsp;Request Identity
          </v-btn>
        </div>
      </div>
    </div>
    <div class="chat-content scroller">
      <div
        v-for="(c, ci) in chatTranscript" :key="ci"
        :class="c.createdBy_name === null ? 'chat' : 'chat-reverse'"
      >
        <div class="chat-avatar" v-if="c.createdBy_name === null">
          <v-avatar
            size="35"
            :class="{'black': c.createdBy_name === null}"
          >
            <span v-if="c.createdBy_name === null"
              class="white--text"
              title="Anonymous"
            >
              A
            </span>
          </v-avatar>
        </div>
        <div class="chat-message">
          <p class="msg"
            :style="{
              'float': c.createdBy_name !== null ? 'right' : '',
            }"
          >
            <span v-if="c.conversation_message" v-html="c.conversation_message"></span>
          </p>
        </div>
        <div class="chat-avatar-wrap" v-if="c.createdBy_name">
          <div class="chat-avatar">
            <v-avatar size="35" class="primary">
              <span
                class="white--text"
                :title="c.createdBy_name"
              >
                {{getAvatar(c.createdBy_name)}}
              </span>
            </v-avatar>
          </div>
          <div class="chat-time mt-1">
            {{dayjs(c.createdAt).format('hh:mm')}}
          </div>
        </div>
      </div>
    </div>
    <div class="chat-footer">
      <div class="chat-attagement">
        <v-icon>far fa-smile</v-icon>
      </div>
      <div class="input-area">
        <v-textarea
          solo
          name="chatWindow"
          class="chat-message"
          label="Solo textarea"
          auto-grow
          placeholder="Type your message...."
          ref="chatMessage"
          :rows="1"
          hide-details
        ></v-textarea>
      </div>
      <v-btn color="primary">
        <v-icon>fas fa-paper-plane</v-icon>
        <span>&nbsp;&nbsp;</span>
        <span>Send</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import { VAvatar, VTooltip, VTextarea } from 'vuetify';
import { mapState } from 'vuex';

// import AnonymousChat from '../../elements/AnonymousChat';

export default {
  name: 'AnonymousChatWindow',

  components: {
    // VAvatar,
    // VTooltip,
    // VTextarea,
    // AnonymousChat
  },

  data () {
    return {
      assignedToList: [],
      activeAnonymousUser: null,
      actions: [
        {
          title: 'Schedule meeting',
          icon: 'flaticon-012-meeting',
          // status: 'scheduled',
          dialog: 'OneOnOne',
          action: this.openDialog,
          permission: 'schedule_invite'
        }, {
          title: 'Work In Progress',
          icon: 'flaticon-047-conversation',
          status: 'inProgress',
          action: this.updateStatus,
          permission: 'change_status'
        }, {
          title: 'Resolved',
          icon: 'fas fa-check',
          status: 'resolved',
          action: this.updateStatus,
          permission: 'change_status'
        }
      ],
      chatTranscript: [],
      adminUsersList: []
    };
  },

  created () {
    this.getAssignedTo();
  },

  computed: {
    ...mapState({
      user: state => state.user,
      users: state => state.companyUsersList,
      adminUsers (state) {
        const adminUsers = state.companyAdminsList;
        return adminUsers;
      }
    })
  },

  watch: {
    activeAnonymousUser: {
      deep: true,
      // immediate: true,
      handler () {
        // this.assignedToList = this.adminUsers;
        // const temp = {
        //   display_name: 'Remove Assignee',
        //   user_id: null
        // };
        let t = [];
        t = this.adminUsersList;
        if (this.activeAnonymousUser.assignedTo && this.activeAnonymousUser.assignedTo !== null) {
          if (t && t.length > 0 && t[0].display_name !== 'Remove Assignee') {
            // t.unshift(temp);
            this.assignedToList = t;
          }
        } else {
          if (t && t.length > 0 && t[0].display_name === 'Remove Assignee') {
            t.splice(0, 1);
          }
          this.assignedToList = t;
        }
      }
    }
  },

  methods: {
    getAssignedTo () {
      axios.get(`${process.env.VUE_APP_API_URL}users/admins`).then((response) => {
        if (response && response.data.data && response.data.data.length > 0) {
          this.adminUsersList = response.data.data;
        }
      });
    },
    getAssignedToUser (id) {
      let value = '';
      this.adminUsersList.forEach((val) => {
        if (val.user_id === id) {
          value = val.display_name;
        }
      });
      return value;
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    getAdditionalDetails (user) {
      axios.get(`${process.env.VUE_APP_BASE_API_URL}anonymous_bot/message/details/${user.id}`, {
        params: {
          fields: 'message,status,createdAt,anonymous_name,assignedTo,company,conversation_list'
        }
      }).then((response) => {
        if (response && response.data) {
          this.activeAnonymousUser = response.data;
          this.loadChat();
        }
      });
    },
    loadChat () {
      this.$lodash.each(this.activeAnonymousUser.message.reverse(), (m) => {
        this.activeAnonymousUser.conversation_list.push({
          conversation_message: m.text,
          createdBy_name: null
        });
      });
      // this.$refs.AnonymousChat.chat.transcript = this.activeAnonymousUser.conversation_list.reverse();
      this.chatTranscript = this.activeAnonymousUser.conversation_list.reverse();
      // this.$forceUpdate();
      // this.$refs.AnonymousChat.scrollToBottom();
    },
    requestIdentity (m) {
      axios.post(`${process.env.VUE_APP_BASE_API_URL}anonymous_bot/ir/request`, {
        anonymous_message_id: m.id
      }).then((response) => {
        if (response && response.data) {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Identity request sent successfully.!'
          });
        }
      }, (response) => {
        this.config.loading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to perform action, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getAvatar (n) {
      const name = n.split(' ');
      const avt = `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
      return avt.toUpperCase();
    }
  }
};
</script>

<style lang="scss" scoped>
.anonymous-chat-window-wrap {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 75vh;
  .chat-head {
    // background-color: var(--primary-dark);
    // background-color: var(--bg);
    // background-color: #a798ff;
    background-color: #cec7fb;
    background-color: var(--bg);
    display: flex;
    justify-content: space-between;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .left-side {
      display: flex;
      .user-title {
        font-size: 18px;
        font-weight: 500;
        padding: 10px;
        padding-bottom: 0;
      }
      .icon {
        img {
          border: 2px solid #898989;
        }
      }
    }
    .right-side {
      display: flex;
    }
  }
  .chat-content {
    position: relative;
    padding: 1.4rem;
    overflow-y: scroll;
    overflow-x: hidden;
    // background-color: var(--bg);
    // background-color: #cec7fb;
    .chat {
      display: grid;
      // grid-template-columns: max-content auto;
      grid-template-columns: max-content minmax(auto, 50%);
      grid-gap: 10px;
      align-items: center;
      .msg {
        // width: 50%;
        max-width: 50%;
        background-color: var(--bg);
        color: var(--color-text);
        display: table;
        min-height: 40px;
        margin-bottom: 5px;
        background: white;
        min-width: 50px;
        padding: 10px;
        border-radius: 5px;
        -webkit-box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
      }
    }
    .chat-reverse {
      display: grid;
      grid-template-columns: auto max-content;
      // grid-template-columns: minmax(auto, 50%) max-content;
      grid-gap: 10px;
      align-items: center;
      .msg {
        display: table;
        min-height: 40px;
        margin-bottom: 5px;
        background: white;
        min-width: 50px;
        padding: 10px;
        border-radius: 5px;
        -webkit-box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
        // width: 50%;
        max-width: 50%;
        background-color: var(--primary-dark);
        color: var(--bg);
      }
    }
  }
  .chat-footer {
    background-color: #cec7fb;
    // background-color: var(--bg);
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    align-items: end;
    padding: 0.4rem 0;
    .chat-attagement {
      padding: 1rem;
    }
    .input-area {
      overflow-y: auto;
      .chat-message {
        max-height: 100px;
      }
    }
  }
}
</style>
