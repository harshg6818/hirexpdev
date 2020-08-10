<template>
  <v-container fluid class="fill-height ma-0 pa-0">
    <v-slide-y-transition mode="out-in">
      <div class="d-flex flex-row flex-wrap">
        <v-flex xs12 v-for="(t, ti) in transcripts"
          :key="ti"
          v-if="!t.defaultInteraction"
        >
          <p class="mb-0 font-weight-bold" v-if="t.bot_response">
            Q: <span v-for="(a, ai) in t.msg" :key="ai">
              {{a.text}}
            </span>
          </p>
          <p v-if="!t.bot_response && t.msg[0].text !== 'Let\'s Begin'
          && t.msg[0].text !== 'Done'" :class="{
            'mb-0': t.msg[0].value <= 3,
          }">
            A: <span v-for="(a, ai) in t.msg" :key="ai">
              {{a.text}}
            </span>
          </p>
        </v-flex>
        <v-flex xs12 v-show="transcripts.length === 0">
          No chat to show.
        </v-flex>
      </div>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  name: 'QuickView',
  components: {
  },
  data () {
    return {
      transcripts: []
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
