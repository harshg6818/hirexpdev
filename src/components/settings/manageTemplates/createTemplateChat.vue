<template>
  <div class="create-template-subject-wrap" v-if="isButtonActive">
    <v-layout>
      <v-flex xs12>
        <b style="padding-left: 1%;">Link Text :</b>
      </v-flex>
    </v-layout>
    <v-layout v-if="!templateChatEdit" class="create-template-subject-display">
      <!-- <v-flex xs1>
        <b>Chat link :</b>
      </v-flex> -->
      <v-flex xs12>
        <div><u>{{ button_label }}</u></div>
      </v-flex>
      <span style="height:0;">
        <v-icon class="create-template-subject-edit-icon" @click="onClickEditChat">
          fas fa-pencil-alt
        </v-icon>
      </span>
    </v-layout>
    <v-layout v-if="templateChatEdit" class="create-template-subject-edit">
      <!-- <v-flex xs1 style="padding-top: 1.5%;">
        <b>Subject :</b>
      </v-flex> -->
      <v-flex xs12>
        <v-text-field
          v-model="new_button_label"
          label="Start the chat"
          name="Link Button"
          class="grey--text text--lighten-2"
          single-line
          outline
          v-validate="'required'"
          :error-messages="errors.collect('Link Button')"
          @keyup="onBlurChatLinkTemplate()"
          @blur="onBlurChatLinkTemplate()"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CreateTemplateChat',

  data () {
    return {
      templateChatEdit: false,
      new_button_label: null
    };
  },

  beforeMount () {
    this.new_button_label = this.button_label;
  },

  computed: {
    ...mapState({
      button_label: state => state.activeTemplate.default_email_template.actionButton.button_label,
      isButtonActive: state => state.activeTemplate.default_email_template.actionButton.is_active
    })
  },

  methods: {
    onClickEditChat () {
      this.templateChatEdit = !this.templateChatEdit;
    },

    onBlurChatLinkTemplate () {
      this.$validator.validateAll().then((res) => {
        // console.log('onClickSaveTemplate -> res', res);
        if (res) {
          this.OnSaveChatLink();
        }
      });
    },

    OnSaveChatLink () {
      const update = {
        is_active: this.isButtonActive,
        button_label: this.new_button_label,
        button_url_link: '{{action_button_url}}'
      };
      this.$store.dispatch('updateActiveTemplateActionButton', update);
    }
  }
};
</script>

<style lang="scss" scoped>
.create-template-subject-wrap {
  .create-template-subject-display {
    padding: 1%;
    &:hover {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      transition: 0s ease;
      cursor: pointer;
    }
    .create-template-subject-edit-icon {
      display: none;
      position: relative;
      top: -24px;
      padding: 10px;
      border-radius: 20px;
      left: 18px;
      color: #4c3e9d;
      background: #ffffff;
      border: 0.5px solid #4c3e9d;
    }
    &:hover .create-template-subject-edit-icon{
      display: block;
    }
  }
}
</style>
