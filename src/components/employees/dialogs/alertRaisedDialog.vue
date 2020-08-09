
<template>
  <v-layout row justify-center>
    <v-dialog v-model="showAlertRaised" scrollable max-width="50%">
      <v-card class="alert-card">
        <v-card-title>
          <span>
            <b class="greyColor">
              {{empName}}:
            </b>
            used sensitive word(s) like&nbsp;</span>
          <span v-for="(w,i) in empAlert.keywords" :key="i">
            {{w}}
            <span :id="i" v-if="empAlert.keywords.length !== i+1">
              ,&nbsp;
            </span>
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 80%;">
          <div v-for="(q,idx) in empAlert.alert_responses" :key="idx">
            <v-layout>
              <v-flex>
                <b class="greyColor">
                  Questions:
                </b>
                &nbsp;{{q.question}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <b class="greyColor">
                  Answer:
                </b>
                &nbsp;<span v-html="getText(q.response_text)"></span>
              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" flat @click="showAlertRaised = false">Close</v-btn>
          <!-- <v-btn color="primary" flat @click="showAlertRaised = false">Save</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  name: 'alertRaisedDialog',

  data () {
    return {
      showAlertRaised: false,
      empAlert: {},
      empName: ''
    };
  },

  methods: {
    getText (t) {
      let temp = t;
      this.$lodash.each(this.empAlert.keywords, (val) => {
        temp = temp.replace(val, `<span style="color: #4c3e9d;text-decoration: underline;">${val}</span>`);
      });
      return temp;
    }
  }
};
</script>

<style lang="scss" scoped>
.alert-card {
  font-size: 15px;
  font-weight: 400;
}
.greyColor {
  color: rgba(0, 0, 0, 1);
}
</style>
