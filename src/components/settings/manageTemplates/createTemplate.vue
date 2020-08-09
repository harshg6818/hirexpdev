<template>
  <div class="create-template-wrap">
    <v-container>
      <v-layout>
        <v-flex xs1 sm1 text-xs-left @click="onClickCancel" style="cursor:pointer;">
          <v-icon class="create-template-back-btn" small>fas fa-arrow-left</v-icon>
        </v-flex>
        <v-flex xs5 sm5 text-xs-left class="create-template-title">
          <v-text-field
            label="Template Title"
            single-line
            v-model="templateTitle"
            maxlength="25"
            v-validate="'required'"
            :error-messages="errors.collect('Template Title')"
            name="Template Title"
            class="grey--text text--lighten-2"
            @blur="onBlurTitleTemplate('title')"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 sm6 text-xs-right style="padding-top: 1.3%;">
          <v-btn
            v-if="activeTemplate.status === 'draft'"
            color="primary"
            class="elevation-0 white--text"
            @click="onClickDraftTemplate"
          >
            Draft
          </v-btn>
          <v-btn
            color="primary"
            class="elevation-0 white--text"
            @click="templateStatus = 'active'; onBlurTitleTemplate('save')"
          >
            Save
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-container class="create-template-subject">
        <createTemplateSubject /><br />
        <createTemplateBody /><br />
        <createTemplateChat /><br />
        <createTemplateBody2 /><br />
        <createTemplateBodySub />
      </v-container>
    </v-container>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VuePellEditor from 'vue-pell-editor';
import { mapState } from 'vuex';

import createTemplateSubject from './createTemplateSubject';
import createTemplateBody from './createTemplateBody';
import createTemplateBody2 from './createTemplateBody2';
import createTemplateBodySub from './createTemplateBodySub';
import createTemplateChat from './createTemplateChat';

Vue.use(VuePellEditor);
Vue.prototype.$http = axios;

export default {
  name: 'CreateTemplate',

  components: {
    createTemplateSubject,
    createTemplateBody,
    createTemplateBody2,
    createTemplateChat,
    createTemplateBodySub
  },

  props: {
    templateType: {
      required: true,
      type: String,
      default: () => {}
    },
    editTemplate: {
      required: false,
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      templateTitle: null,
      templateStatus: 'active'
    };
  },

  beforeMount () {
    // console.log('this.activeTemplate.templateTitle', this.activeTemplate);
    this.templateTitle = this.activeTemplate.templateTitle;
  },

  computed: {
    ...mapState({
      activeTemplate: state => state.activeTemplate.default_email_template
    })
  },

  methods: {
    onClickCancel () {
      this.$emit('onClickCancel');
    },

    onClickDraftTemplate () {
      this.templateStatus = 'draft';
      this.onBlurTitleTemplate();
    },

    onBlurTitleTemplate (type) {
      this.$validator.validateAll().then((res) => {
        console.log('onClickSaveTemplate -> res', res);
        if (res && type === 'save') {
          this.onClickSaveTemplate();
        }
      });
    },

    onClickSaveTemplate () {
      if (this.editTemplate === false) {
        const tempPayload = {
          ...this.activeTemplate,
          templateTitle: this.templateTitle,
          status: this.templateStatus,
          templateType: this.templateType
        };
        axios.post(`${process.env.VUE_APP_BASE_API_URL}notifications/email/template/`, tempPayload).then((res) => {
          if (res.status === 201) {
            this.templatesList = res.data.results;
            if (this.templateStatus === 'draft') {
              this.$store.dispatch('updateSnackbar', {
                color: 'info',
                show: true,
                text: 'Template saved as a draft successfully'
              });
            } else {
              this.$store.dispatch('updateSnackbar', {
                color: 'info',
                show: true,
                text: 'Template saved successfully'
              });
            }
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Oops, Some error occured, Please try again later!'
            });
          }
        });
      }
      if (this.editTemplate === true) {
        const tempPayload = {
          ...this.activeTemplate,
          templateTitle: this.templateTitle
        };
        axios.patch(`${process.env.VUE_APP_BASE_API_URL}notifications/email/template/${this.activeTemplate.id}/`, tempPayload).then((res) => {
          if (res.status === 200) {
            this.templatesList = res.data.results;
            if (this.templateStatus === 'draft') {
              this.$store.dispatch('updateSnackbar', {
                color: 'info',
                show: true,
                text: 'Template saved as a draft successfully'
              });
            } else {
              this.$store.dispatch('updateSnackbar', {
                color: 'info',
                show: true,
                text: 'Template saved successfully'
              });
            }
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Oops, Some error occured, Please try again later!'
            });
          }
        });
      }
      this.onClickCancel();
    }
  }
};
</script>

<style lang="scss" scoped>
.create-template-wrap {
  padding: 0;
  margin: -3%;
  .create-template-back-btn {
    padding-top: 33%;
    padding-left: 20%;
  }
  .create-template-title {
    margin-left: -3.5%;
  }
  .templateBodyEditor {
    border-left: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    border-radius: 12px;
  }
  .create-template-subject {
    // height: 400px;
    border: 1px solid #e0e0e0;
    margin: 0;
    padding: 2%;
  }
}
</style>

<style lang="scss">
.pell-actionbar {
  border-radius: 12px 12px 0 0;
  border-top: 1px solid #e0e0e0;
}
</style>
