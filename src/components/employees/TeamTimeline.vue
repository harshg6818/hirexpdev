<template>
  <div class="">
    <div class="m-2" v-show="refreshing">
      <v-layout class="m-0">
        <v-flex>
          <vue-content-loading :width="800" :height="80">
            <rect x="40" y="13" rx="4" ry="4" width="30" height="30" />
            <rect x="80" y="20" rx="4" ry="4" width="400" height="15" />
            <rect x="80" y="40" rx="4" ry="4" width="600" height="38" />
          </vue-content-loading>
          <vue-content-loading :width="800" :height="60">
            <rect x="40" y="13" rx="4" ry="4" width="30" height="30" />
            <rect x="80" y="20" rx="4" ry="4" width="400" height="15" />
          </vue-content-loading>
          <vue-content-loading :width="800" :height="60">
            <rect x="40" y="13" rx="4" ry="4" width="30" height="30" />
            <rect x="80" y="20" rx="4" ry="4" width="400" height="15" />
          </vue-content-loading>
          <vue-content-loading :width="800" :height="60">
            <rect x="40" y="13" rx="4" ry="4" width="30" height="30" />
            <rect x="80" y="20" rx="4" ry="4" width="400" height="15" />
          </vue-content-loading>
          <vue-content-loading :width="800" :height="80">
            <rect x="40" y="13" rx="4" ry="4" width="30" height="30" />
            <rect x="80" y="20" rx="4" ry="4" width="400" height="15" />
            <rect x="80" y="40" rx="4" ry="4" width="600" height="38" />
          </vue-content-loading>
          <vue-content-loading :width="800" :height="60">
            <rect x="40" y="13" rx="4" ry="4" width="30" height="30" />
            <rect x="80" y="20" rx="4" ry="4" width="400" height="15" />
          </vue-content-loading>
        </v-flex>
      </v-layout>
    </div>
    <div class="" v-show="timeline.length == 0 && !refreshing">
      <v-layout align-v="center" align-h="center" style="height:50vh;" class="m-0">
        <v-flex align-self="center" class="text-center">
          <h5 class="bold text-muted">
            Looks like you've not performed any action on this candidate!
          </h5>
          <p class="text-muted">
            Are we missing something in our results? Let us know by opening a <router-link to="/support-center" class="bold">support ticket</router-link>!
          </p>
        </v-flex>
      </v-layout>
    </div>
    <div id="cd-timeline" class="cd-container" v-if="timeline.length > 0 && !refreshing">
      <div class="cd-timeline-block" v-for="(t, index) in timeline" :key="index">

        <div class="">
          <small class="cd-date">{{t.dateCreated | moment("from")}}</small>
          <div class="cd-timeline-img">
            <v-avatar
              size="30"
              :class="{
                'grey': t.action === 'Initiated',
                '#37b99c': t.action === 'Uploaded',
                'error': t.action === 'Rejected',
                'success': t.action === 'Verified',
                'green darken-4': t.action === 'Joined',
              }"
            >
              <v-icon color="white" v-show="t.action === 'Initiated'">check</v-icon>
              <v-icon color="white" v-show="t.action === 'Uploaded'">check</v-icon>
              <v-icon color="white" v-show="t.action === 'Rejected'">close</v-icon>
              <v-icon color="white" v-show="t.action === 'Verified'">done_all</v-icon>
              <v-icon color="white" v-show="t.action === 'Joined'">add</v-icon>
            </v-avatar>
          </div>

          <div class="cd-timeline-content">
            <p>
              {{t.createdBy.display_name}}
              moved
              <strong>
                {{t.candidate.display_name}}
              </strong>
              to {{formattedStage(t.action)}} stage
            </p>
          </div>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
        <span slot='no-more'>{{'no more data'}}</span>
        <span slot='no-results'>{{' '}}</span>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
// import VueContentLoading from 'vue-content-loading';
import InfiniteLoading from 'vue-infinite-loading';
// import {
//   VIcon,
//   VAvatar,
//   VDivider,
// } from 'vuetify';
import { mapState } from 'vuex';
// import ReadMore from '../elements/ReadMore';

export default {
  name: 'candidate-timeline',
  components: {
    // VIcon,
    // VAvatar,
    // VDivider,
    // VueContentLoading,
    InfiniteLoading
    // ReadMore
  },
  data () {
    return {
      refreshing: true,
      timeline: []
    };
  },
  methods: {
    formattedStage (stage) {
      return stage;
    },
    infiniteHandler ($state) {
      setTimeout(() => {
        $state.complete();
      }, 2000);
    },
    openCandidate () {},
    openFeedback (id, roundId) {
      this.$router.push({ path: `/candidates/view/${id}`, query: { activeTab: 1, round: roundId } });
      this.$router.go();
    },
    getTimelineDate () {
      this.refreshing = true;
      this.$http.post(`${process.env.API_URL}Candidate/timeline/${this.selectedCandidate}`)
      // this.$http.get(`${process.env.VUE_APP_BASE_API_URL}recruit/users/candidate/timeline/list/2742`)
        .then((response) => {
          // this.$Progress.finish();
          this.refreshing = false;
          if (response.data && response.data.data) {
            this.timeline = response.data.data;
          }
        }, (response) => {
          throw new Error(response);
        });
    }
  },
  watch: {
    FlagToGetTimelineAgain () {
      this.getTimelineDate();
    },
    selectedCandidate () {
      this.getTimelineDate();
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      selectedCandidate: state => state.selected.candidate
    })
  },
  beforeMount () {
    this.getTimelineDate();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import '../../assets/scss/timeline.scss';

[class^="flaticon-"]:before, [class*=" flaticon-"]:before, [class^="flaticon-"]:after, [class*=" flaticon-"]:after {
  margin-left: 0px;
}
</style>
