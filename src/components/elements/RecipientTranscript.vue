<template>
  <v-dialog max-width="1000px"
      v-model="dialogs.recipient"
      transition="dialog-transition">
    <v-card class="template-card">
      <v-card-text style="height:calc(100% - 90px)">
        <h2 class="mb-3"> {{recipient.name}} ( {{ recipient.email}} )</h2>
        <v-layout row wrap class="chat-transcript">
          <v-flex xs12 v-for="(t, ti) in transcripts" :key="ti"
          v-if="!t.defaultInteraction">
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
        </v-layout>
      </v-card-text>

      <v-card-actions class="mt-3" align-content-space->
        <v-flex xs2 class="ml-2">
          <v-btn color="error" flat @click.stop="closeModal()">Close</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
      transcripts: [],
      dialogs: {
        recipient: false
      },
      recipient: {
        name: '',
        email: ''
      }
    };
  },
  methods: {
    closeModal () {
      this.transcripts = [];
      this.dialogs.recipient = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.chat-transcript {
  max-height: 100%!important;
  overflow-y: auto!important;
}
.template-card {
  max-height: 500px!important;
  height: 500px!important;
  overflow-y: hidden!important;
}
</style>
