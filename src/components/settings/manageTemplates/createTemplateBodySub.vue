<template>
  <div class="create-template-body-wrap">
    <v-layout>
      <v-flex xs12>
        <b style="padding-left: 1%;">Body Sub :</b>
      </v-flex>
    </v-layout>
    <v-layout v-if="!templateBodySubEdit" class="create-template-subject-display">
      <v-flex xs12>
        <div v-if="body_sub" v-html="body_sub"></div>
        <div v-if="!body_sub">Enter body sub</div>
      </v-flex>
      <span style="height:0;">
        <v-icon class="create-template-subject-edit-icon" @click="onClickEditBodySub">
          fas fa-pencil-alt
        </v-icon>
      </span>
    </v-layout>
    <v-layout v-if="templateBodySubEdit">
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
              @click="onClickAddBodySubPlaceholder(item.placeholder)"
            >
              <v-list-tile-title>{{ item.key }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout v-if="templateBodySubEdit" class="create-template-subject-edit">
      <!-- <v-flex xs1 style="padding-top: 1.5%;">
        Subject :
      </v-flex> -->
      <v-flex xs12>
        <VuePellEditor
          ref="templateBodySub"
          class="templateBodyEditor"
          v-model="new_body_sub"
          placeholder="Enter email body"
          @change="onSaveBodySub"
          @blur="onTemplateBodySubBlur($event)"
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
  name: 'CreateTemplateBodySub',

  data () {
    return {
      templateBodySubEdit: false,
      new_body_sub: null,
      activeBodySubIndex: null
    };
  },

  beforeMount () {
    this.new_body_sub = this.body_sub;
  },

  computed: {
    ...mapState({
      body_sub: state => state.activeTemplate.default_email_template.body.body_sub,
      placeHolders: state => state.activeTemplate.place_holders
    })
  },

  methods: {
    onClickEditBodySub () {
      this.templateBodySubEdit = !this.templateBodySubEdit;
    },

    onSaveBodySub () {
      const update = {
        type: 'body_sub',
        value: this.new_body_sub
      };
      this.$store.dispatch('updateActiveTemplateBody', update);
    },

    onTemplateBodySubBlur (ev) {
      console.log('q.target.selectionStart', ev.target.selectionStart);
      this.activeBodySubIndex = ev.target.selectionStart;
    },

    onClickAddBodySubPlaceholder (placeholder) {
      const quill = this.$refs.templateBodySub;
      quill.value = quill.value.substring(0, this.activeBodySubIndex) + placeholder + quill.value.substring(this.activeBodySubIndex);
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
