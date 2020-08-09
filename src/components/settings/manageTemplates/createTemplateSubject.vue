<template>
  <div class="create-template-subject-wrap">
    <v-layout v-if="!templateSubjectEdit" class="create-template-subject-display">
      <v-flex xs1>
        <b>Subject :</b>
      </v-flex>
      <v-flex xs11>
        <div>{{ subject }}</div>
      </v-flex>
      <span style="height:0;">
        <v-icon class="create-template-subject-edit-icon" @click="onClickEditSubject">
          fas fa-pencil-alt
        </v-icon>
      </span>
    </v-layout>
    <v-layout v-if="templateSubjectEdit">
      <v-flex xs12 text-xs-right>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              v-on="on"
            >
              Insert placeholders
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in placeHolders"
              :key="index"
              @click="onClickAddSubjectPlaceholder(item.placeholder)"
            >
              <v-list-tile-title>{{ item.key }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout v-if="templateSubjectEdit" class="create-template-subject-edit">
      <v-flex xs1 style="padding-top: 1.5%;">
        <b>Subject :</b>
      </v-flex>
      <v-flex xs11>
        <v-text-field
          ref="templateSubject"
          v-model="newSubject"
          label="Template Subject"
          name="Template Subject"
          class="grey--text text--lighten-2"
          single-line
          outline
          maxlength="100"
          v-validate="'required'"
          :error-messages="errors.collect('Template Subject')"
          @keyup="onBlurSubjectTemplate()"
          @blur="onTemplateSubjectBlur($event);"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CreateTemplateSubject',

  data () {
    return {
      templateSubjectEdit: false,
      newSubject: null,
      activeSubjectIndex: null
    };
  },

  computed: {
    ...mapState({
      subject: state => state.activeTemplate.default_email_template.subject,
      placeHolders: state => state.activeTemplate.place_holders
    })
  },

  beforeMount () {
    this.newSubject = this.subject;
  },

  methods: {
    onClickEditSubject () {
      this.templateSubjectEdit = !this.templateSubjectEdit;
    },

    onBlurSubjectTemplate () {
      this.$validator.validateAll().then((res) => {
        // console.log('onClickSaveTemplate -> res', res);
        if (res) {
          this.OnSaveSubject();
        }
      });
    },

    OnSaveSubject () {
      this.$store.dispatch('updateActiveTemplateSubject', this.newSubject);
    },

    onTemplateSubjectBlur (ev) {
      this.activeSubjectIndex = ev.target.selectionStart;
    },

    onClickAddSubjectPlaceholder (placeholder) {
      const quill = this.$refs.templateSubject;
      this.newSubject = quill.value.substring(0, this.activeSubjectIndex) + placeholder + quill.value.substring(this.activeSubjectIndex);
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
