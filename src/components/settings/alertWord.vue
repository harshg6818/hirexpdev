<template>
  <div>
    <v-layout row wrap px-2>
      <v-flex sm12>
        <v-subheader class="py-0 px-0">
          <v-layout>
            <strong  class="py-2 px-2"  style=" font-size:18px; color:grey;">
              Alert Words
            </strong>
          </v-layout>
        </v-subheader>
      </v-flex>
      <v-flex>
        <ul class="desc-grp">
          <li>
            Alert words are words that you can choose to be notified.
          </li>
          <li>
            Whenever an employee uses one of distressed or inappropriate word
            in a chat with Amara, all the admins will receive email
            <!-- <span>
              <v-btn flat color="primary">+ Add email</v-btn>
            </span> -->
          </li>
          <li>
            Complete details of the employee will be shared with chat.
          </li>
        </ul>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex class="checkbox">
        <v-checkbox
          v-model="checkbox"
          @click.native="enableAlertWords"
        ></v-checkbox>
      </v-flex>
      <v-flex class="checkbox-text">
        Enable alert words
      </v-flex>
      <v-flex xs9></v-flex>
    </v-layout>
    <div v-if="checkbox" class="label-combo">Select alert words from dropdown or type your own words</div>
    <v-layout v-if="checkbox">
      <v-flex xs12 class="combobox-group">
        <v-combobox
          ref="box"
          :class="!checkbox ? 'disable-check' : 'enable-check'"
          v-model="chips"
          :items="items"
          class="combo-input elevation-0"
          clearable
          solo
          multiple
          hide-details
        >
          <template v-slot:selection="data">
            <v-chip
              color="primary"
              class="white--text"
              :selected="data.selected"
              close
              outline
              @input="remove(data.item)"
            >
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-combobox>
      </v-flex>
    </v-layout>
    <v-layout v-if="checkbox">
      <v-flex class="save-btn">
        <v-btn color="primary" @click="saveAlertWord()">Save</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex class="note">
        <span><b>NOTE:</b></span> This functionality wiil help you easily spot and respond
        to the employee that may need more immediate attention.
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// import { VCombobox, VChip, VCheckbox } from 'vuetify';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'alertWords',

  // components: {
  //   VCombobox,
  //   VChip,
  //   VCheckbox
  // },

  data () {
    return {
      chips: [],
      items: [
        'abuse',
        'harassment',
        'threat',
        'discrimination',
        'suicide',
        'depressed',
        'lonely',
        'attack',
        'misbehave',
        'Deny',
        'refuse',
        'bias',
        'unfairness',
        'favouritism',
        'racialism',
        'racism',
        'bias',
        'prejudice',
        'bigotry',
        'sexual advances',
        'bribe',
        'blackmail',
        'indescent',
        'Dead',
        'death',
        'anger',
        'hatred',
        'murder',
        'kill',
        'harm',
        'scared',
        'victim',
        'victimised',
        'depression',
        'abusive',
        'depressed',
        'angry',
        'helpless',
        'weak',
        'suicide',
        'suicidal',
        'die'
      ],
      // items: [],
      checkbox: false
    };
  },

  computed: {
    ...mapState({
      user: state => state.user
    })
  },

  mounted () {
    this.getAlertWords();
  },

  methods: {
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
      this.$refs.box.isMenuActive = false;
    },
    getAlertWords () {
      axios.get(`${process.env.VUE_APP_API_URL}company/settings/${this.user.company}`).then((res) => {
        if (res.status === 200) {
          this.chips = res.data.chat_alert_words;
          // this.items = res.data.chat_alert_words;
          this.checkbox = res.data.chat_alert_word_notification;
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to get alert words, Please try again later!'
          });
        }
      }).catch((error) => {
        if (error) {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to get alert words, Please try again later!'
          });
        }
      });
    },
    enableAlertWords () {
      axios.patch(`${process.env.VUE_APP_API_URL}company/settings/${this.user.company}/`, {
        chat_alert_word_notification: this.checkbox
      }).then((res) => {
        if (res.status === 200) {
          this.checkbox = res.data.chat_alert_word_notification;
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: this.checkbox ? 'Successfully enabled alert words!' : 'Successfully disabled alert words!'
          });
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: this.checkbox ? 'Successfully enabled alert words!' : 'Successfully disabled alert words!'
          });
        }
      }).catch((error) => {
        if (error) {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: this.checkbox ? 'Successfully enabled alert words!' : 'Successfully disabled alert words!'
          });
        }
      });
    },
    saveAlertWord () {
      axios.patch(`${process.env.VUE_APP_API_URL}company/settings/${this.user.company}/`, {
        chat_alert_words: this.chips
      }).then((res) => {
        if (res.status === 200) {
          this.chips = res.data.chat_alert_words;
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Successfully saved alert words!'
          });
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to get alert words, Please try again later!'
          });
        }
      }).catch((error) => {
        if (error) {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to get alert words, Please try again later!'
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.desc-grp {
  padding: 20px;
  li {
    font-size: 16px;
    color: #000;
  }
}
.label-combo {
  padding-left: 2%;
  padding-bottom: 1%;
}
.disable-check {
  opacity: .5;
  pointer-events: none;
}
.enable-check {
  opacity: 1;
  pointer-events: all;
}
.combobox-group {
  padding: 0 20px;
  .combo-input {
    // border: 1.3px solid #808080;
    border-radius: 6px;
    padding: 2px 0;
    margin-bottom: 10px;
  }
}
.checkbox {
  margin-left: 12px;
}
.checkbox-text {
  margin-top: 20px;
  font-size: 16px;
}
.note {
  font-size: 16px;
  padding: 0 20px;
  color: #000;
}
.save-btn {
  margin-left: 12px;
  margin-top: 20px;
}
</style>

<style lang="scss">
.box {
  color: #ffffff !important;
  .v-chip {
        // font-weight: 600;
    color: #4c3e9d !important;
    border: 1px solid #4c3e9d;
    background-color: #ffffff;
  }
}
</style>

<style lang="scss">
.combobox-group {
  .v-input__slot {
    box-shadow: none !important;
    border: 1.3px solid #808080;
    // border-radius: 8px !important;
    padding: 6px 6px;
  }
}
</style>
