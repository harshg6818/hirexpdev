<template>
  <div class="create-template-body-wrap">
    <v-layout>
      <v-flex xs12>
        <b style="padding-left: 1%;">Body :</b>
      </v-flex>
    </v-layout>
    <v-layout v-if="!templateBody1Edit" class="create-template-subject-display">
      <v-flex xs12>
        <div v-html="body_1"></div>
      </v-flex>
      <span style="height:0;">
        <v-icon class="create-template-subject-edit-icon" @click="onClickEditBody1">
          fas fa-pencil-alt
        </v-icon>
      </span>
    </v-layout>
    <v-layout v-if="templateBody1Edit">
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
              @click="onClickAddBody1Placeholder(item.placeholder)"
            >
              <v-list-tile-title>{{ item.key }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout v-if="templateBody1Edit" class="create-template-subject-edit">
      <!-- <v-flex xs1 style="padding-top: 1.5%;">
        Subject :
      </v-flex> -->
      <v-flex xs12>
        <VuePellEditor
          ref="templateBody1"
          class="templateBodyEditor"
          v-model="newTemplateBody1"
          placeholder="Enter email body"
          @change="OnSaveBody1"
          @blur="onTemplateBody1Blur($event)"
          />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Vue from 'vue';
import VuePellEditor from 'vue-pell-editor';
import { mapState } from 'vuex';

Vue.use(VuePellEditor);

export default {
  name: 'CreateTemplateBody',

  data () {
    return {
      templateBody1Edit: false,
      newTemplateBody1: null,
      activeBody1Index: null
    };
  },

  beforeMount () {
    this.newTemplateBody1 = this.body_1;
  },

  computed: {
    ...mapState({
      body_1: state => state.activeTemplate.default_email_template.body.body_1,
      placeHolders: state => state.activeTemplate.place_holders
    })
  },

  methods: {
    onClickEditBody1 () {
      this.templateBody1Edit = !this.templateBody1Edit;
    },
    OnSaveBody1 () {
      const update = {
        type: 'body_1',
        value: this.newTemplateBody1
      };
      this.$store.dispatch('updateActiveTemplateBody', update);
    },

    onTemplateBody1Blur (ev) {
      console.log('q.target.selectionStart', ev.target.selectionStart);
      this.activeBody1Index = ev.target.selectionStart;
    },

    onClickAddBody1Placeholder (placeholder) {
      const quill = this.$refs.templateBody1;
      quill.value = quill.value.substring(0, this.activeBody1Index) + placeholder + quill.value.substring(this.activeBody1Index);
    }
  }
};
</script>

<style lang="scss" scoped>
.create-template-body-wrap {
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
  .templateBodyEditor {
    border-left: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    border-radius: 12px;
  }
}
</style>
