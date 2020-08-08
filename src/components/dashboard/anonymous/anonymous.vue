<template>
  <div class="anonymous-wrap">
    <!-- anonymous tab top bar start -->
    <div class="anonymous-top-bar-wrap">
      <div class="anonymous-bar">
        <div class="left-side">
          <div class="dashboard-icon">
            <v-icon>fas fa-user-secret</v-icon>
          </div>
          <div
            class="anonymous-tabs cursor-pointer"
            :class="activeAnonymousView === 'snapshot' ? 'active' : ''"
            @click="activeAnonymousView = 'snapshot';loadAnonymousSnapshot();"
          >
            <span>
              Snapshot
            </span>
          </div>
          <div
            class="anonymous-tabs cursor-pointer"
            :class="activeAnonymousView === 'message' ? 'active' : ''"
            @click="activeAnonymousView = 'message';loadAnonymousUsersList();"
          >
            <span>
              Message
            </span>
          </div>
        </div>
        <div class="right-side">
          <!-- <div class="pt-1">
          </div> -->
        </div>
      </div>
    </div>
    <!-- anonymous tab top bar end -->

    <div class="anonymous-messages" v-if="activeAnonymousView === 'snapshot'">
      <anonymousSnapshot ref="anonymousSnapshot"></anonymousSnapshot>
    </div>
    <div class="anonymous-messages" v-if="activeAnonymousView === 'message'">
      <anonymousMessage ref="anonymousMessage"></anonymousMessage>
    </div>
  </div>
</template>

<script>
import anonymousMessage from './anonymous-message';
import anonymousSnapshot from './anonymous-snapshot';
// import axios from 'axios';

export default {
  name: 'Anonymous',

  components: {
    anonymousMessage,
    anonymousSnapshot
  },

  data () {
    return {
      activeAnonymousView: 'snapshot'
    };
  },

  beforeMount () {
    if (this.activeAnonymousView === 'message') {
      this.loadAnonymousUsersList();
    }
    if (this.activeAnonymousView === 'snapshot') {
      this.loadAnonymousSnapshot();
    }
  },

  watch: {
    activeAnonymousView () {
      if (this.activeAnonymousView === 'message') {
        this.loadAnonymousUsersList();
      }
      if (this.activeAnonymousView === 'snapshot') {
        this.loadAnonymousSnapshot();
      }
    }
  },

  methods: {
    loadAnonymousSnapshot () {
      const that = this;
      setTimeout(() => {
        if (that.$refs && that.$refs.anonymousSnapshot) {
          that.$refs.anonymousSnapshot.getAnonymousStats();
        }
      }, 100);
    },
    loadAnonymousUsersList () {
      const that = this;
      setTimeout(() => {
        if (that.$refs && that.$refs.anonymousMessage) {
          that.$refs.anonymousMessage.getAnonymousAnalysis();
        }
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.anonymous-wrap {
  .anonymous-top-bar-wrap {
    padding: 0px 0px 20px 0;
    .anonymous-bar {
      background-color: rgb(255, 255, 255);
      display: flex;
      justify-content: space-between;
      padding: 0 12px;
      box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
      transition: box-shadow 83ms;
      .left-side {
        display: flex;
        padding-left: 60px;
        .dashboard-icon {
          padding: 8px 16px 0 12px;
          border-right: 1px solid rgba(0,0,0,0.1);
          font-weight: 500;
          i {
            color: #4c3e9d;
            font-size: 22px;
          }
        }
        .anonymous-title {
          padding: 10px;
          font-size: 14px;
          border-right: 1px solid rgba(0,0,0,0.1);
          font-weight: 600;
        }
        .anonymous-tabs {
          padding: 10px;
          font-size: 14px;
          font-weight: 600;
          &.active {
            background-color: #6f64b0;
            color: #ffffff;
            transition-property: background-color;
            transition: .5s ease;
          }
        }
      }
      .right-side {
        display: flex;
      }
    }
  }
  .anonymous-messages {
    // padding-bottom: 30px;
  }
}
</style>
