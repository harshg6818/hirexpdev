<template>
  <div class="create-template-body-wrap">
    <v-layout>
      <v-flex xs12>
        <b style="padding-left: 1%;">Body 2:</b>
      </v-flex>
    </v-layout>
    <v-layout v-if="!templateBody2Edit" class="create-template-subject-display">
      <v-flex xs12>
        <div v-html="body_2"></div>
      </v-flex>
      <span style="height:0;">
        <v-icon class="create-template-subject-edit-icon" @click="onClickEditBody2">
          fas fa-pencil-alt
        </v-icon>
      </span>
    </v-layout>
    <v-layout v-if="templateBody2Edit">
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
              @click="onClickAddBody2Placeholder(item.placeholder)"
            >
              <v-list-tile-title>{{ item.key }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout v-if="templateBody2Edit" class="create-template-subject-edit">
      <!-- <v-flex xs1 style="padding-top: 1.5%;">
        Subject :
      </v-flex> -->
      <v-flex xs12>
        <VuePellEditor
          ref="templateBody2"
          class="templateBodyEditor"
          v-model="newTemplateBody2"
          placeholder="Enter email body"
          @change="OnSaveBody2"
          @blur="onTemplateBody2Blur($event)"
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
  name: 'CreateTemplateBody2',

  data () {
    return {
      templateBody2Edit: false,
      newTemplateBody2: null,
      activeBody2Index: null
    };
  },

  beforeMount () {
    this.newTemplateBody2 = this.body_2;
  },

  computed: {
    ...mapState({
      body_2: state => state.activeTemplate.default_email_template.body.body_2,
      placeHolders: state => state.activeTemplate.place_holders
    })
  },

  methods: {
    onClickEditBody2 () {
      this.templateBody2Edit = !this.templateBody2Edit;
    },
    OnSaveBody2 () {
      const update = {
        type: 'body_2',
        value: this.newTemplateBody2
      };
      this.$store.dispatch('updateActiveTemplateBody', update);
    },

    onTemplateBody2Blur (ev) {
      console.log('q.target.selectionStart', ev.target.selectionStart);
      this.activeBody2Index = ev.target.selectionStart;
    },

    onClickAddBody2Placeholder (placeholder) {
      const quill = this.$refs.templateBody2;
      quill.value = quill.value.substring(0, this.activeBody2Index) + placeholder + quill.value.substring(this.activeBody2Index);
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
