<template>
  <div class="followUp amara-followup-tab">
          <aside  style="background:#fff; min-height:100%; padding:10px " >
        <v-layout style=" padding-left:10px; min-height:69vh" row class="">
          <v-flex style="background:#f3f6fa; position: -webkit-sticky; position: sticky; top: 0;" xs3>
            <v-list style="background:#f3f6fa;"  class=''>
              <template v-for="(item, index) in items" ref="items">
                <v-subheader v-if="item.header" :key="index">{{ item.header }}</v-subheader>
                <v-divider  :key="index" v-else-if="item.divider" :inset="item.inset" ></v-divider>
                <v-list-item @click="updateTab(item.value)" class="settings-list"
                  style="border-bottom:1px solid rgba(0,0,0,0.12);" v-else
                  avatar :class="{'tab' : tab == `tab-${item.value}`}"
                  :key="index"
                >
                  <v-list-item-action style="min-width:46px;">
                      <v-icon style="font-size:24px;">{{ item.icon }}</v-icon>
                    </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                    <span style="color: rgba(0,0,0,0.54); font-size: 14px;" class="theme--light.v-list .v-list__item__sub-title">{{item.subtitle}} </span>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-flex>
          <v-flex class="settings-left-flex px-2" style="background:#f3f6fa; min-height:100vh-200px;  margin-left:10px; margin-right:10px" xs9>
            <Reminder ref="Reminder" v-if="tab == 'tab-reminder' || !tab " />
            <Acknowledgment ref="Acknowledgment" v-if="tab == 'tab-acknowledgment' "/>
          </v-flex>
        </v-layout>
        <v-layout>
        </v-layout>
      </aside>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
// import axios from 'axios';
import dayjs from 'dayjs';
import Reminder from './Reminder';
import Acknowledgment from './Acknowledgment';
import relativeTime from 'dayjs/plugin/relativeTime';
// import RecipientTranscript from '@/components/elements/RecipientTranscript';

// import {
//   VCheckbox,
//   VAvatar,
//   VTooltip,
//   VAlert,
//   VBtn,
//   VTextarea,
//   VProgressLinear,
//   VChip,
//   VMenu

// } from 'vuetify';

dayjs.extend(relativeTime);

export default {
  name: 'EmployeesList',
  components: {
    Reminder,
    Acknowledgment
    // ContentLoader,
    // VCheckbox,
    // VAvatar,
    // VTooltip,
    // VAlert,
    // VTextarea,
    // VMenu,
    // VBtn,
    // dayjs,
    // VChip,
    // RecipientTranscript,
    // VProgressLinear
  },
  data () {
    return {
      tab: 'tab-reminder',
      previewData: false,
      model: false,
      dialog: false,
      reminder: {},
      reminderData: [],
      mediumSelected: '',
      items: [{
        icon: 'fas fa-calendar',
        title: 'Reminders',
        value: 'reminder',
        subtitle: 'Send reminders to the people who have not completed your survey'
      },
      {
        icon: 'fas fa-thumbs-up',
        title: 'Acknowledge the respondents',
        value: 'acknowledgment',
        subtitle: 'This feature enables you to send a thank-you note to all those who have completed the chat'
      }
      ],
      reminder_items: [{
        title: 'Automate reminder email',
        icon: 'fas fa-trash',
        action: this.deleteStages
      }, {
        title: 'One-off reminder email',
        icon: 'fas fa-window-close',
        action: this.closeStages
      }],
      acknowledgment_items: ['Automated thank you email', 'One-off thank you email']
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    updateTab (val) {
      this.tab = `tab-${val}`;
      // this.$router.push(
      //   {
      //     query: {tab: val}
      //   }
      // );
    },
    back () {
      this.mediumSelected = '';
    },
    save () {
      this.reminderData.push(this.reminder);
      this.reminder = {};
      this.mediumSelected = '';
      this.dialog = false;
    },
    selectedMedium (medium) {
      this.reminder.medium = medium;
      this.mediumSelected = medium;
    },
    openDialog (item) {
      this.reminder.title = item.title;
      this.dialog = true;
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    closeModal () {
      this.mediumSelected = '';
      this.dialog = false;
    },
    preview (data) {
      this.mediumSelected = data.medium;
      this.reminder = data;
      this.dialog = true;
      this.previewData = true;
    },
    edit (data) {
      this.mediumSelected = data.medium;
      this.reminder = data;
      this.dialog = true;
      this.previewData = false;
    },
    deletes (data, index) {
      this.reminderData[index].slice(data);
    }
  },
  watch: {
  },
  beforeMount () {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.theme--light {
  &.v-table {
    tbody {
      tr {
        &:not(:last-child) {
          border-bottom: 1px solid rgb(243, 241, 241)!important;
        }
      }
    }
  }
}
.followUp {
    .difm-menu-split {
  height: 200px;
  float: left;
  margin-left: 63px;
  border-left: 1px solid #D0D2D3;
  margin-top: 15px;
  position: relative;
  left:15%;
}
.or-circle {
  box-sizing: border-box;
  height: 42px;
  width: 42px;
  line-height: 42px;
  border-radius: 50%;
  background-clip: padding-box;
  color: #6B787F;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid #D0D2D3;
  background-color: #fff;
  margin-top: 75px;
  position: absolute;
  left: -21px;
}

}
.mediumDialog {
  .v-input__slot {
    box-shadow: none !important;
    border:1px solid grey !important;
  }
  .v-input__slot:focus {
    outline: 0 !important;
    border:1px solid rgb(2, 12, 155) !important;
  }
}
.followupList {
  // .v-list__item {
  //   height: 26px !important;
  // }
}
.amara-followup-tab{
  .tab{
    color: var(--v-primary-base);
    border-right: 2px solid var(--v-primary-base);
    .theme--light.v-icon{
      color: var(--v-primary-base);
    }
  }
  .settings-list{
    border-right: 2px solid #f3f6fa;
    .v-list__item--avatar{
      height: 90px;
    }
  }
  .settings-list:hover{
    color: var(--v-primary-base);
    border-right: 2px solid var(--v-primary-base);
    .theme--light.v-icon{
      color: var(--v-primary-base);
    }
  }
  .settings-left-flex{
    background:#f3f6fa; margin-left:10px; margin-right:10px
  }
  .v-list{
    -webkit-transition: 0s cubic-bezier(0.25, 0.8, 0.5, 1)  !important;
    transition: 0s cubic-bezier(0.25, 0.8, 0.5) !important,
  }
  .v-list__item__title, .v-list__item__sub-title{

  -webkit-transition: 0s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
    transition: 0s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
  }
}
</style>
