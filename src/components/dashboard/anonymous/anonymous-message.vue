<template>
  <div class="anonymous-msg-wrap">
    <div class="left-side">
      <div class="users-list-wrap" v-if="anonymousUsersList && anonymousUsersList.length > 0">
        <v-container
          class="user-card pa-0 cursor-pointer hover-link"
          fluid
          v-for="(user,index) in anonymousUsersList"
          :key="index"
          :class="user.id === activeUser ? 'active': ''"
          @click="getDetails(user)"
        >
          <div class="card-top">
            <div class="icon">
              <v-avatar size="50" class="profile-avatar">
                <img :src="getImgUrl('anonymous-user')" :alt="user.anonymous_name">
              </v-avatar>
            </div>
            <div class="user-details">
              <div class="user-title">{{user.anonymous_name}}</div>
              <div class="user-status">
                <div class="text-capitalize">{{user.status}}</div>
                <div
                  class="ml-3 d-flex"
                  v-if="user.status === 'resolved' && user.dateResolved !== 'None'"
                >
                  <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">
                        far fa-clock
                      </v-icon>
                      &nbsp;{{dayjs(user.dateResolved).from()}}
                    </template>
                    <span>
                      &nbsp;{{dayjs(user.dateResolved).format('DD MMM YYYY, HH:mm')}}&nbsp;
                    </span>
                  </v-tooltip>
                </div>
              </div>
            </div>
          </div>
          <div class="card-bottom">
            <div>
              <span class="font-weight-bold">Assigned To:</span>
              <span v-if="!user.assignedTo_email">&nbsp;Not Assigned</span>
              <span v-else>&nbsp;{{user.assignedTo_email}}</span>
            </div>
          </div>
        </v-container>
      </div>
      <div class="pagination">
        <div>
          <ul class="anonymous-pagination">
            <!-- left arrow -->
            <li>
              <div
                class="pagination-nav-left"
                :class="pagination === 1 ? 'disabled' : ''"
                @click="pagination = pagination - 1;togglePagination();"
              >
                <v-icon>fas fa-angle-left</v-icon>
              </div>
            </li>
            <!-- one page -->
            <li>
              <div
                class="pagination-btn"
                :class="pagination === 1 ? 'active' : ''"
                @click="pagination = 1;togglePagination();"
              >1</div>
            </li>
            <!-- active page -->
            <li>
              <div
                class="pagination-dots"
                v-if="pagination === 1 || pagination === totalAnonymousUsers">
                ...
              </div>
              <div
                class="pagination-btn active"
                v-else
                @click="togglePagination();"
              >{{pagination}}</div>
            </li>
            <!-- last total page -->
            <li>
              <div
                class="pagination-btn"
                :class="pagination === totalAnonymousUsers ? 'active' : ''"
                @click="pagination = totalAnonymousUsers;togglePagination();"
              >{{totalAnonymousUsers}}</div>
            </li>
            <!-- right arrow -->
            <li>
              <div
                class="pagination-nav-right"
                :class="pagination === totalAnonymousUsers ? 'disabled' : ''"
                @click="pagination = pagination + 1;togglePagination();"
              >
                <v-icon>fas fa-angle-right</v-icon>
              </div>
            </li>
          </ul>
      </div>
    </div>
    </div>
    <div class="right-side">
      <v-container
        fluid
        class="pa-0"
      >
        <anonymous-ChatWindow ref="AnonymousChatWindow"></anonymous-ChatWindow>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import { VPagination, VAvatar, VTooltip } from 'vuetify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import AnonymousChatWindow from './anonymous-chatWindow';

dayjs.extend(relativeTime);

export default {
  name: 'anonymousMessages',

  components: {
    // VPagination,
    // VAvatar,
    // VTooltip,
    AnonymousChatWindow
  },

  data () {
    return {
      activeAnonymousView: 'snapshot',
      anonymousUsersList: [],
      totalAnonymousUsers: 0,
      pagination: 1,
      activeUser: ''
    };
  },

  beforeMount () {
    this.getAnonymousAnalysis();
  },

  watch: {
    anonymousUsersList: {
      deep: true,
      handler () {
        this.getDetails(this.anonymousUsersList[0]);
      }
    }
  },

  methods: {
    togglePagination () {
      this.getAnonymousAnalysis();
    },
    getAnonymousAnalysis () {
      const queryParams = {
        page_offset: this.pagination || 1,
        fields: 'message,status,createdAt,anonymous_name,has_shared_identity,assignedTo,assignedTo_name,assignedTo_email,dateResolved',
        message__icontains: this.queries ? this.queries : null
      };
      // TODO :: apply filters

      // this.$lodash.each(this.filters.selected, (v, k) => {
      //   if (typeof v === 'string') {
      //     v = v.split(',');
      //   }
      //   if (v.length > 0) {
      //     queryParams[`${k}__in`] = v.join();
      //   }
      // });
      axios.get(`${process.env.VUE_APP_BASE_API_URL}anonymous_bot/message/list`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          this.anonymousUsersList = response.data.data;
          this.totalAnonymousUsers = parseInt(response.data.total_count / 10, 10) + 1;
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch details, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getDetails (user) {
      this.activeUser = user.id;
      this.$refs.AnonymousChatWindow.getAdditionalDetails(user);
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    }
  }
};
</script>

<style lang="scss" scoped>
.anonymous-msg-wrap {
  // display: flex;
  // width: 100%;
  display: grid;
  grid-template-columns: 3fr 8fr;
  grid-gap: 10px;
  margin: 0 10px;
  // height: 75vh;
  // overflow: hidden;
  // min-height: 75vh;
  // max-height: 75vh;
  .left-side {
    position: relative;
    // width: 30%;
    // margin: 0 0 0 20px;
    overflow-y: hidden;
    .users-list-wrap {
      min-height: calc(82vh - 100px);
      max-height: calc(82vh - 100px);
      height: calc(82vh - 100px);
      overflow-y: auto;
      .user-card {
        // background-color: hsla(0,0%,100%,.6);
        background-color: #ffffff99;
        // background-color: var(--bg);
        margin-bottom: 12px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        // box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        // box-shadow: 0px 3px 20px #0000000b;
        box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.04);
        .card-top {
          display: flex;
          padding: 16px 16px 0 16px;
          .user-details {
            padding-left: 20px;
            .user-title {
              font-size: 18px;
              font-weight: 500;
            }
            .user-status {
              display: flex;
            }
          }
          .icon {
            img {
              border: 2px solid #898989;
            }
          }
        }
        .card-bottom {
          padding: 4px 16px;
        }
        &:hover {
          // background: #edebf5;
          // background: var(--bg-panel);
        }
        &.active {
          background-color: #cec7fb;
        }
      }
    }
    .pagination {
      text-align: center;
      padding: 10px 0;
      .anonymous-pagination {
        list-style: none;
        display: flex;
        li {
          padding: 0 5px;
        }
        .pagination-btn {
          background: #fff;
          max-height: 26px;
          min-width: 26px;
          min-height: 26px;
          border-radius: 4px;
          padding: 2px 10px;
          cursor: pointer;
          &.active {
            background: #4c3e9d;
            color: #ffffff;
          }
        }
        .pagination-dots {
          font-size: 20px;
          padding: 0 10px;
          color: #4c3e9d;
        }
        .pagination-nav-left {
          i {
            font-size: 20px;
            padding-right: 12px;
            color: #4c3e9d;
            padding-top: 2px;
            cursor: pointer;
          }
          &.disabled {
            opacity: .6;
            pointer-events: none;
          }
        }
        .pagination-nav-right {
          &.disabled {
            opacity: .6;
            pointer-events: none;
          }
          i {
            cursor: pointer;
            font-size: 20px;
            padding-left: 12px;
            color: #4c3e9d;
            padding-top: 2px;
          }
        }
      }
    }
  }
  .right-side {
    height: 75vh;
    background-image: url('../../../assets/chat-bg.jpg');
    // background-image: url('../../../assets/background.jpg');
    background-size: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
</style>
