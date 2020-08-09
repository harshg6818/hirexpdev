<template>
  <v-container fluid class="chat-bg pa-0" fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap class="chat-window mx-0">
        <main class="py-3 px-1" ref="mainChatWindow">
          <v-layout column wrap fill-height>
            <v-flex>
              <infinite-loading direction="top" @infinite="getTranscript">
                <div slot="no-more"></div>
                <div slot="no-results"></div>
              </infinite-loading>
              <v-layout row wrap px-2 mb-2
                v-for="(c, ci) in chat.transcript" :key="ci"
                :reverse="!c.bot_response"
              >
                <v-flex xs12 pt-5 pb-3 class="timestamp" v-if="c.type === 'timestamp'">
                  <v-layout row wrap align-center justify-center>
                    <v-flex xs4 class="text-xs-center">
                      <v-card class="pa-1 elevation-0">
                        <strong>
                          {{c.stage_title}}
                        </strong>
                        <p class="mb-0">
                          Sent on {{dayjs(c.createdAt).format('DD MMM \'YY')}} |
                          Completed on {{dayjs(c.completedAt).format('DD MMM \'YY')}}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex class="avatar-container" v-if="c.type !== 'timestamp'">
                  <v-avatar
                    size="35"
                    class="primary"
                  >
                    <img v-if="c.bot_response" src="@/assets/amara-60.png" alt="Amara">
                    <span v-if="!c.bot_response && employee.display_name"
                    class="white--text"
                    :title="employee.display_name">
                      {{getAvatar(employee.display_name)}}
                    </span>
                  </v-avatar>
                </v-flex>

                <v-flex class="msg-container">
                  <p class="msg" v-for="(m, mi) in c.msg" :key="mi"
                    :style="{
                      'float': !c.bot_response ? 'right' : '',
                    }"
                  >
                    <span v-if="m.text && m.type !== 'emoji'" v-html="m.text"> </span>

                    <img v-if="m.type === 'emoji'"
                      :src="getImgUrl(`${c.msg[0].value}`)"
                      class="emoji-container-lg"
                    />

                    <!-- Image -->
                    <v-flex xs12 class="actions" v-if="c.type === 'image'">
                      <v-img
                        height="200"
                        width="300"
                        max-height="200"
                        max-width="300"
                        :src="m.imgUrl"
                        :lazy-src="m.imgUrl"
                        aspect-ratio="1"
                        class="grey lighten-2 mx-0"
                      >
                        <v-layout
                          slot="placeholder"
                          fill-height
                          align-center
                          justify-center
                          ma-0
                        >
                          <v-progress-circular v-show="m.imgUrl"
                          indeterminate color="grey lighten-5">
                          </v-progress-circular>
                        </v-layout>
                      </v-img>
                    </v-flex>

                    <!-- Emoji scale bar -->
                    <v-layout class="actions scale" row wrap
                    v-if="c.type === 'scale' && m.scaleType === 'emoji'" mt-2 justify-center>
                      <v-flex class="emoji-btn" text-xs-center v-for="(r, ri) in m.scale" :key="ri">
                        <v-btn
                          :disabled="c.user_responded"
                          @click="sendMessage({
                            text: r.title,
                            value: r.value,
                            type: 'emoji',
                          }, 'emoji', ci, r.postback)"
                          class="ma-0"
                          fab
                          large
                          flat
                        >
                          <img v-if="r.img" :src="getImgUrl(r.img)" class="emoji-container" />
                        </v-btn>

                        <p>
                          {{r.title}}
                        </p>
                      </v-flex>
                    </v-layout>

                    <!-- Number scale bar -->
                    <v-layout class="actions scale" row wrap
                    v-if="c.type === 'scale' && m.scaleType === 'number'" mt-2 justify-center>
                      <v-flex class="emoji-btn" text-xs-center v-for="(r, ri) in m.scale" :key="ri">
                        <v-btn
                          :disabled="c.user_responded"
                          @click="sendMessage({
                            text: r.title,
                            value: r.value,
                            type: 'text',
                          }, 'text', ci, r.postback)"
                          class="ma-0"
                          :color="r.color"
                          fab
                          outline
                        >
                          <strong class="headline">
                            {{r.value}}
                          </strong>
                        </v-btn>

                        <p>
                          {{r.title}}
                        </p>
                      </v-flex>
                    </v-layout>

                    <!-- If quick replies -->
                    <v-flex xs12 class="actions text-xs-right"
                    v-if="c.type === 'quickReplies' || c.type === 'closeEnded'
                    && m.quickReplies && m.quickReplies.length > 0">
                      <v-btn :disabled="c.user_responded" :color="r.color || 'primary'"
                      outline @click="sendMessage({
                        text: r.title,
                        value: r.value || r.title,
                        }, 'text', ci, r.postback)" class="mb-0"
                      v-for="(r, ri) in m.quickReplies" :key="ri">{{r.title}}</v-btn>
                    </v-flex>
                  </p>
                </v-flex>
              </v-layout>

              <!-- Typing icon -->
              <v-layout row wrap px-2 mb-2 v-show="chat.typing">
                <v-flex class="avatar-container">
                  <v-avatar
                    size="35"
                    class="white"
                  >
                    <img src="@/assets/amara-60.png" alt="alt">
                  </v-avatar>
                </v-flex>

                <v-flex class="msg-container">
                  <p class="msg typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </p>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

        </main>
      </v-layout>
    </v-slide-y-transition>

  </v-container>
</template>

<script>
import axios from 'axios';
// import { VAvatar } from 'vuetify';
import InfiniteLoading from 'vue-infinite-loading';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  name: 'ChatTranscript',
  components: {
    // VAvatar,
    InfiniteLoading
  },
  data () {
    return {
      employee: {},
      list: {
        question: [
          'What is the reason behind your answer?'
        ]
      },
      chat: {
        activeSessionIndex: -1,
        sessions: [],
        sessionId: '',
        typing: false,
        message: '',
        disabled: true,
        transcript: [],
        interactions: [],
        activeInteraction: -1
      },
      training: {
        scale: false,
        textInput: false
      }
    };
  },
  methods: {
    // infiniteHandler ($state) {
    //   axios.get(api, {
    //     params: {
    //       page: this.page
    //     }
    //   }).then(({ data }) => {
    //     if (data.hits.length) {
    //       this.page += 1;
    //       this.list.unshift(...data.hits.reverse());
    //       $state.loaded();
    //     } else {
    //       $state.complete();
    //     }
    //   });
    // },
    getAvatar (n) {
      const name = n.split(' ');
      const avt = `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
      return avt.toUpperCase();
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    scrollToBottom () {
      const container = this.$refs.mainChatWindow;
      if (container) {
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 100);
      }
    },
    getTranscript ($state, sessions) {
      if (sessions) {
        this.chat.sessions = sessions;
      }
      this.chat.activeSessionIndex = this.chat.activeSessionIndex - 1;
      if (this.chat.activeSessionIndex > -1) {
        // eslint-disable-next-line no-unused-vars
        const activeSession = this.chat.sessions[this.chat.activeSessionIndex];
        const queryParams = {
          fields: 'user_completed_session_transcripts'
        };
        axios.get(`${process.env.VUE_APP_API_URL}users/${this.employee.id}/details`, {
          params: queryParams
        }).then((response) => {
          if (response && response.data && response.data.user_completed_session_transcripts &&
          response.data.user_completed_session_transcripts.length &&
          response.data.user_completed_session_transcripts[0].transcripts &&
          response.data.user_completed_session_transcripts[0].transcripts.transcript) {
            this.chat.transcript = response.data.user_completed_session_transcripts[0].transcripts.transcript.concat(this.chat.transcript);
            this.chat.transcript.unshift({
              createdAt: response.data.user_completed_session_transcripts[0].createdAt,
              completedAt: response.data.user_completed_session_transcripts[0].completedAt,
              stage_title: response.data.user_completed_session_transcripts[0].stage_title,
              type: 'timestamp'
            });
            if ((this.chat.activeSessionIndex + 1) === this.chat.sessions.length) {
              this.scrollToBottom();
            }
            if ($state) {
              $state.loaded();
            }
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable intialize chat, Please try again later!'
            });
          }
        }, (response) => {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable intialize chat, Please try again later!'
          });
          throw new Error(response.data);
        });
      } else if ($state) {
        $state.complete();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.timestamp {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    border-bottom: 2px #ffffff solid;
    height: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
}
.v-btn--disabled {
  img {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }
}
.avatar-container {
  max-width: 40px !important;
}
.msg-container {
  max-width: 60% !important;
}
.chat-window {
  height: 100%;
  main {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
.chat-bg {
  background-image: url('../../assets/background.jpg');
  background-size: cover;
  // max-height: 700px!important;
  // overflow-y: auto!important;
}

.chat .day {
    span {
      background-color: #fff;
      // border: 1px solid #dadce0;
      border-radius: 5px;
      padding: 2px 5px;
    }
    position: relative;
    display: block;
    text-align: center;
    color: #c0c0c0;
    height: 20px;
    // text-shadow: 7px 0px 0px #fff;
    // text-shadow: 7px 0px 0px #e5e5e5, 6px 0px 0px #e5e5e5, 5px 0px 0px #e5e5e5,
    // 4px 0px 0px #e5e5e5, 3px 0px 0px #e5e5e5, 2px 0px 0px #e5e5e5, 1px 0px 0px #e5e5e5,
    // 1px 0px 0px #e5e5e5, 0px 0px 0px #e5e5e5, -1px 0px 0px #e5e5e5, -2px 0px 0px #e5e5e5,
    // -3px 0px 0px #e5e5e5, -4px 0px 0px #e5e5e5, -5px 0px 0px #e5e5e5, -6px 0px 0px #e5e5e5,
    // -7px 0px 0px #e5e5e5;
    box-shadow: inset 0px -2px 0px #ffffff;
    line-height: 38px;
    margin-top: 5px;
    margin-bottom: 20px;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
.avatar-contaier:after {
    content: "";
    position: relative;
    top: 0px;
    right: 0px;
    left: 50px;
    width: 0px;
    height: 0px;
    border: 5px solid #fff;
    border-left-color: transparent;
    border-bottom-color: transparent;
}

.self .avatar:after {
    content: "";
    position: absolute;
    display: inline-block;
    bottom: 0;
    right: 35px;
    width: 0px;
    height: 0px;
    border: 5px solid #fff;
    border-right-color: transparent;
    border-top-color: transparent;
    box-shadow: 0px 2px 0px #D4D4D4;
}

.msg {
    display: table;
    min-height: 40px;
    margin-bottom: 5px;
    background: white;
    min-width: 50px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
}
.msg img {
    position: relative;
    display: block;
    width: 450px;
    border-radius: 5px;
    transition: all .4s cubic-bezier(0.565, -0.260, 0.255, 1.410);
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
@media screen and (max-width: 800px) {
    .msg img {
    width: 300px;
  }
}
@media screen and (max-width: 550px) {
  .msg-container {
    max-width: calc(100% - 40px) !important;
  }
  .msg img {
    width: 200px;
  }
}

.msg time {
    font-size: 0.7rem;
    color: #ccc;
    margin-top: 3px;
    float: right;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    .fa-clock:before {
      font-size: 11px;
      color: #ddd;
      margin-right: 4px;
    }
}

@-webikt-keyframes pulse {
  from { opacity: 0; }
  to { opacity: 0.5; }
}

::-webkit-scalebar {
    min-width: 12px;
    width: 12px;
    max-width: 12px;
    min-height: 12px;
    height: 12px;
    max-height: 12px;
    background: #e5e5e5;
    // box-shadow: inset 0px 50px 0px rgba(82,179,217,0.9), inset 0px -52px 0px #fafafa;
}

::-webkit-scalebar-thumb {
    background: #bbb;
    border: none;
    border-radius: 100px;
    border: solid 3px #e5e5e5;
    box-shadow: inset 0px 0px 3px #999;
}

::-webkit-scalebar-thumb:hover {
    background: #b0b0b0;
  box-shadow: inset 0px 0px 3px #888;
}

::-webkit-scalebar-thumb:active {
  background: #aaa;
  box-shadow: inset 0px 0px 3px #7f7f7f;
}

.emoji-container {
  max-height: 5em;
  max-width: 5em;
}

.emoji-container-lg {
  max-height: 7em;
  max-width: 7em;
}

.emoji-btn {
  -ms-flex-preferred-size: 20% ;
  flex-basis: 20%;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  max-width: 20%;
  cursor: pointer;
  &:hover {
    .v-btn {
      transform: scale(1.2);
    }
  }
}

.actions.scale {
  min-width: 35em !important;
}

@media screen and (max-width: 675px) {
  .actions.scale {
    min-width: 20em !important;
  }
  .emoji-btn {
    .v-btn {
      height: 40px !important;
      width: 40px !important;
      .headline {
        font-size: 20px !important;
      }
    }
    p {
      font-size: 12px;
    }
  }
}
@media screen and (max-width: 599px) {
  .actions {
    &.scale {
      min-width: 0em !important;
    }
    margin-top: 0.3em !important;
    margin-bottom: 0.3em !important;
    padding-bottom: 0.3em !important;
  }
  .emoji-btn {
    height: 56px !important;
    width: 56px !important;
    .v-btn {
      height: 30px !important;
      width: 30px !important;
      .headline {
        line-height: 0 !important;
        font-size: 16px !important;
      }
    }
    p {
      font-size: 8px;
    }
  }
  .emoji-container {
    max-height: 3em;
    max-width: 3em;
  }

  .emoji-container-lg {
    max-height: 5em;
    max-width: 5em;
  }
}

@media screen and (max-width: 414px) {
  .emoji-btn {
    height: 40px !important;
    width: 40px !important;
  }
  .emoji-container {
    max-height: 2em;
    max-width: 2em;
  }
}

.typing-indicator {
  span {
    height: 15px;
    width: 15px;
    float: left;
    margin: 0 1px;
    background-color: #9E9EA1;
    display: block;
    border-radius: 50%;
    opacity: 0.4;
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}) {
        animation: 1s blink infinite ($i * .3333s);
      }
    }
  }
}

@keyframes blink {
  50% {
    opacity: 1;
  }
}

@keyframes bulge {
  50% {
    transform: scale(1.05);
  }
}
</style>
