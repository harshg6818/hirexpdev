<template>
  <v-dialog max-width="1200px"
      v-model="dialogs.configuration"
      transition="dialog-transition"
      persistent
    >
      <v-card class="distribution-card" @click="togglePicker()">
        <v-card-text>
          <!--<v-layout class="mb-2">
            <v-flex xs11>
              <h2> Please configure the invitations you want to send to your audience via {{distMedium.name}}. </h2>
            </v-flex>
            <v-flex xs1 text-xs-right>
              <v-icon color="red" class="close-button" @click.stop="closeModal()"> fa fa-times
              </v-icon>
            </v-flex>
          </v-layout>-->

          <!--<v-layout>
            <v-text-field
              style="padding:0 10%;width:100%"
              :label="'Template Name'"
              :placeholder="'Enter template name'"
              outline
              v-model="newTemplate.name"
              flat
              @click.stop
            ></v-text-field>
          </v-layout>-->
                    <v-layout v-show="!selectedTemplate.id && distMedium && distMedium.logo === 'email'" class="template-card">
            <v-flex xs7 class="pr-5">
              <div>
                <ContentLoader
                  :height="50"
                  :width="50"
                  :speed="2"
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="2" ry="2" width="44.46" height="50" />
                </ContentLoader>
              </div>
            </v-flex>

            <!--<div class="difm-menu-split">
            </div>
            <v-spacer></v-spacer>-->

            <v-flex xs5>
              <div>
                <ContentLoader
                  :height="50"
                  :width="40"
                  :speed="2"
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="2" ry="2" width="34.46" height="15" />
                  <rect x="0" y="17" rx="2" ry="2" width="34.46" height="15" />
                  <rect x="0" y="34" rx="2" ry="2" width="34.46" height="15" />
                </ContentLoader>
              </div>
            </v-flex>
          </v-layout>

          <v-layout v-show="!selectedTemplate.id && distMedium && distMedium.logo === 'sms'" class="template-sms-card">
            <v-flex xs1></v-flex>
            <v-flex xs10 class="pr-5">
              <div>
                <ContentLoader
                  :height="50"
                  :width="100"
                  :speed="2"
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="2" ry="2" width="94.46" height="50" />
                </ContentLoader>
              </div>
            </v-flex>
            <v-flex xs1></v-flex>
          </v-layout>

          <v-layout class="" v-if="selectedTemplate.id && distMedium && distMedium.logo === 'email'">
            <v-flex xs8></v-flex>

            <v-flex xs4>
              <div class="ml-3"> Select Template</div>
              <v-select
                class="template-custom-field"
                style="padding:0 0 0 10;width:100%"
                @change="updateSelectedTemplate"
                :items="templates"
                item-text="name"
                item-value="id"
                label="Template"
                outline
                solo
                single-line
                v-model="selectedTemplate"
                placeholder="Select Template"
              >
              </v-select>
            </v-flex>
          </v-layout>

          <v-layout class="template-card" v-if="selectedTemplate.id && distMedium && distMedium.logo === 'email'">
            <v-flex class="template-preview pr-0">
              <v-card v-html="html_content" width="100%" class="html-preview"></v-card>
            </v-flex>

            <v-spacer> </v-spacer>

            <v-flex class="template-editor">
              <v-card style="border-color:#f3f1f1;height:100%;overflow-y:auto">
                <div v-for="(group, gi) in newTemplate.fields" :key="gi"
                class="template-section"
                :class="gi < newTemplate.fields.length - 1 ? 'b-bottom' : ''">
                  <v-layout xs12>
                    <v-flex xs6>
                      <h3 class="pa-3"> {{group.group}} </h3>
                    </v-flex>
                  </v-layout>

                  <v-layout v-for="(field, fi) in group.data" :key="fi">
                    <v-flex xs12 v-if="field.type === 'textfield'">
                      <h4 class="pt-0 pb-3 template-field-label">
                        {{field.label}}
                      </h4>
                      <v-text-field
                        class="template-field template-custom-field"
                        :label="field.label"
                        :placeholder="field.placeholder"
                        v-model="field.value"
                        @keyup="updatePreview()"
                        outline flat
                        single-line
                        @click.stop
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 v-if="field.type === 'textarea' || field.type === 'html'">
                      <v-layout>
                        <v-flex xs6>
                          <h4 class="pt-0 pb-3 template-field-label">
                            {{field.label}}
                          </h4>
                        </v-flex>
                        <!--<v-flex xs6>
                          <h4> Insert Variables </h4>
                          <v-select
                            style="width:100%"
                            :items="field.context_vars"
                            item-text="name"
                            item-value="value"
                            outline
                            flat
                            single-line
                            placeholder="Variables"
                            class="template-custom-field"
                          >
                          </v-select>
                        </v-flex>-->
                      </v-layout>

                      <v-layout>
                        <ckeditor
                          style="width:100%"
                          class="template-field"
                          id="ck-editor"
                          :editor="editor" :config="editorConfig"
                          :placeholder="field.placeholder"
                          @keyup.native="updatePreview()"
                          @input="updatePreview()"
                          ref="myCKeditor"
                          :name="field.label" :data-vv-as="field.label"
                          v-model="field.value"
                          :class="{'is-invalid': errors.has(field.label) }"
                          :v-validate="'required'">
                        </ckeditor>
                      </v-layout>
                    </v-flex>

                    <v-flex xs6 v-if="field.type === 'colorpicker'">
                      <h4 class="pt-0 pb-3 template-field-label">
                        {{field.label}}
                      </h4>
                      <!--<slider
                        v-model="field.value"
                        class="mx-auto template-field template-custom-field"
                        @keyup="updatePreview()"
                      ></slider>-->
                      <colorpicker ref="colorpicker" :color="field.value" v-model="field.value" @input="updatePreview()" />
                    </v-flex>
                  </v-layout>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout class="" v-if="selectedTemplate.id && distMedium && distMedium.logo === 'sms'">
            <v-flex xs7></v-flex>

            <v-flex xs4>
              <span> Select Template </span>
              <v-select
                class="template-custom-field"
                style="padding:0 0 0 10;width:100%"
                @change="updateSelectedTemplate"
                :items="templates"
                item-text="name"
                item-value="id"
                label="Template"
                outline
                solo
                single-line
                v-model="selectedTemplate"
                placeholder="Select Template"
              >
              </v-select>
            </v-flex>
            <v-flex xs1></v-flex>
          </v-layout>

          <v-layout class="template-sms-card" v-if="selectedTemplate.id && distMedium && distMedium.logo === 'sms'">
            <v-flex xs1></v-flex>
            <v-flex xs10 class="">
              <v-card style="border-color:#f3f1f1;height:100%;overflow-y:auto">
                <div v-for="(group, gi) in newTemplate.fields" :key="gi"
                class="template-section"
                :class="gi < newTemplate.fields.length - 1 ? 'b-bottom' : ''">
                  <v-layout xs12>
                    <v-flex xs6>
                      <h3 class="pa-3"> {{group.group}} </h3>
                    </v-flex>
                  </v-layout>

                  <v-layout v-for="(field, fi) in group.data" style="height:calc(100% - 60px)" :key="fi">
                    <v-flex xs12 v-if="field.type === 'textfield'">
                      <!-- <h4 class="pt-0 pb-3 template-field-label">
                        {{field.label}}
                      </h4> -->
                      <v-text-field
                        class="template-field template-custom-field"
                        :label="field.label"
                        :placeholder="field.placeholder"
                        v-model="field.value"
                        @keyup="updatePreview()"
                        outline flat
                        single-line
                        @click.stop
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 v-if="field.type === 'textarea' || field.type === 'html'">
                      <v-layout>
                        <!--<v-flex xs6>
                          <h4 class="pt-0 pb-3 template-field-label">
                            {{field.label}}
                          </h4>
                        </v-flex> -->
                        <!--<v-flex xs6>
                          <h4> Insert Variables </h4>
                          <v-select
                            style="width:100%"
                            :items="field.context_vars"
                            item-text="name"
                            item-value="value"
                            outline
                            flat
                            single-line
                            placeholder="Variables"
                            class="template-custom-field"
                          >
                          </v-select>
                        </v-flex>-->
                      </v-layout>

                      <v-layout style="height:calc(100% - 40px)">
                        <v-textarea
                          class="template-field template-custom-field custom-textarea"
                          :label="field.label"
                          :placeholder="field.placeholder"
                          v-model="field.value"
                          @keyup="updatePreview()"
                          outline flat
                          single-line
                          @click.stop
                        ></v-textarea>
                      </v-layout>
                    </v-flex>

                    <v-flex xs6 v-if="field.type === 'colorpicker'">
                      <h4 class="pt-0 pb-3 template-field-label">
                        {{field.label}}
                      </h4>
                      <!--<slider
                        v-model="field.value"
                        class="mx-auto template-field template-custom-field"
                        @keyup="updatePreview()"
                      ></slider>-->
                      <colorpicker ref="colorpicker" :color="field.value" v-model="field.value" @input="updatePreview()" />
                    </v-flex>
                  </v-layout>
                </div>
              </v-card>
            </v-flex>
            <v-flex xs1></v-flex>

          </v-layout>
        </v-card-text>

        <v-card-actions align-content-space->
          <v-flex xs2 class="ml-3 mb-3">
            <v-btn color="error" flat @click.stop="closeModal()">Close</v-btn>
          </v-flex>
          <v-flex xs8>
          </v-flex>
          <v-flex text-xs-right xs2 class="mr-3 mb-3">
            <v-btn color="adhoc" class="white--text" @click.stop="saveTemplate()"> Use Template </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
// import Vue from 'vue';
// import { VAlert, VMenu, VSlider, VTextarea, VSelect, VChip, VPagination, VCheckbox } from 'vuetify';
// import { Container, Draggable } from 'vue-smooth-dnd';
import { ContentLoader } from 'vue-content-loader';
import { mapState } from 'vuex';
import axios from 'axios';
// import VueContentLoading from 'vue-content-loading';
// import CKEditor from '@ckeditor/ckeditor5-vue';
// import { Chrome, Material, Slider } from 'vue-color';

// import colorpicker from './colorpicker.vue';

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

// Vue.use(CKEditor);

// CKEditor.replace('ck-editor');

export default {
  name: 'NewQuestion',
  components: {
    // VAlert,
    // VMenu,
    // VTextarea,
    // VSlider,
    // VSelect,
    // Container,
    // Draggable,
    // VChip,
    // VPagination,
    // VCheckbox,
    // VueContentLoading,
    ContentLoader
    // Chrome,
    // Material,
    // Slider,
    // colorpicker
  },
  data () {
    return {
      distMedium: null,
      dialogs: {
        configuration: false
      },
      config: {
        activeIndex: 0,
        activeSubjectIndex: 0
      },
      templates: [],
      selected: [],
      selectedTemplate: {},
      newTemplate: {},
      html_content: '',
      tempContent: '',
      colorPickerMode: 'hexa',
      // editor: ClassicEditor,
      editor: '',
      editorData: '',
      editorConfig: {
        toolbar: {
          items: [
            'heading',
            'bold',
            'italic',
            'link',
            'undo',
            'redo',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'insertTable',
            'insertMedia'
          ]
        }
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      selectedTemplatePreview: state => state.EmailTemplate
    })
  },
  methods: {
    getTemplates () {
      // selectedTemplatePreview[0].content.template_id
      this.templates = [];
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}templates/list?medium=${this.distMedium.logo}`).then((response) => {
        if (response && response.data) {
          this.templates = response.data.data;
          this.templates = this.templates.reverse();
          if (this.templates && (this.distMedium.logo === 'sms' || (this.distMedium.logo === 'email' && !this.selectedTemplatePreview))) {
            this.selectedTemplate = this.templates[0].id;
            this.updateSelectedTemplate();
          } else if (this.distMedium.logo === 'email') {
            let index = '';
            this.$lodash.each(response.data.data, (group, gi) => {
              if (group.id === this.selectedTemplatePreview.content.template_id) {
                index = gi;
              }
            });
            if (this.templates) {
              this.selectedTemplate = this.templates[index].id;
              // console.log(this.$parent.$parent.$parent.$parent.newCampaign.distribution);

              this.updateSelectedTemplate();
            }
          } else {
            if (this.templates) {
              this.selectedTemplate = this.templates[0].id;
              this.updateSelectedTemplate();
            }
          }
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch templates, Please try again later!'
        });
        throw new Error(response);
      });
    },
    togglePicker () {
      this.$lodash.each(this.$refs.colorpicker, (v, k) => {
        if (v.displayPicker) {
          v.hidePicker();
        } else {
          // v.showPicker();
        }
      });
      // if (this.$refs && this.$refs.colorpicker) {
      //   this.$refs.colorpicker.displayPicker ? this.$refs.colorpicker.hidePicker() : this.$refs.colorpicker.showPicker();
      // }
    },
    saveTemplate () {
      if (this.$parent && this.$parent.dialogs) {
        this.$parent.dialogs.configuration = false;
      }
      const templateFields = {};

      this.$lodash.each(this.newTemplate.fields, (group, gi) => {
        this.$lodash.each(group.data, (field, fi) => {
          templateFields[field.key] = field.value;
        });
      });

      if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent &&
        this.$parent.$parent.$parent.$parent &&
        this.$parent.$parent.$parent.$parent.newCampaign) {
        const distributionData = {
          type: this.distMedium.logo,
          content: {
            // value: this.html_content,
            // fields: this.newTemplate.fields,
            fields: templateFields,
            template_id: this.newTemplate.id,
            template_path: this.newTemplate.template_path
          },
          status: 'draft',
          recipient_filters: [],
          trigger_time: undefined,
          is_enabled: true,
          is_reminder: false
        };
        this.$store.dispatch('updateEmail', distributionData);
        let campaignDistributionData = [];
        campaignDistributionData = this.$parent.$parent.$parent.$parent.newCampaign.distribution;
        let match = -1;
        match = this.$lodash.findIndex(campaignDistributionData, (data, index) =>
          data.type === this.distMedium.logo);
        if (match > -1) {
          campaignDistributionData[match] = distributionData;
        } else {
          campaignDistributionData.push(distributionData);
        }
        this.$parent.$parent.$parent.$parent.newCampaign.distribution = campaignDistributionData;
        // this.$parent.$parent.$parent.newCampaign.distribution.medium = this.distMedium.logo;
        // this.$parent.$parent.$parent.newCampaign.distribution.template = temp;
        this.$parent.$parent.$parent.$parent.newCampaign.distributionsEnabled[this.distMedium.logo] = true;
      }
      this.selectedTemplate = {};
      this.newTemplate = {};
      this.distMedium = null;
      this.html_content = '';
      this.tempContent = '';
      this.dialogs.configuration = false;

      // this.createTemplate();
    },
    updateSelectedTemplate () {
      this.$lodash.each(this.templates, template => {
        if (template.id === this.selectedTemplate) {
          // console.log(template);
          this.selectedTemplate = template;
          this.newTemplate = JSON.parse(JSON.stringify(this.selectedTemplate));
          if (this.$parent.$parent.$parent.$parent.newCampaign.distribution) {
            this.$lodash.each(this.$parent.$parent.$parent.$parent.newCampaign.distribution, (dis, di) => {
              // console.log(dis.type);
              if (dis.type === 'email') {
                console.log(dis.content.fields);

                this.$lodash.each(this.newTemplate.fields, (nt, n) => {
                  if (nt.group === 'subject') {
                    nt.data[0].value = dis.content.fields.subject;
                    console.log(dis.content.fields.di);
                  }
                  if (nt.group === 'Body') {
                    nt.data[0].value = dis.content.fields.body;
                    console.log(dis.content.fields.di);
                  }
                  if (nt.group === 'button') {
                    this.$lodash.each(nt.data, (da, d) => {
                      if (da.key === 'action_button_text') {
                        da.value = dis.content.fields.action_button_text;
                      }
                      if (da.key === 'action_button_background_color') {
                        da.value = dis.content.fields.action_button_background_color;
                      }
                      if (da.key === 'action_button_font_color') {
                        da.value = dis.content.fields.action_button_font_color;
                      }
                    });
                  }
                  if (nt.group === 'Header') {
                    this.$lodash.each(nt.data, (da, d) => {
                      if (da.key === 'header_text') {
                        da.value = dis.content.fields.header_text;
                      }
                      if (da.key === 'header_background_color') {
                        da.value = dis.content.fields.header_background_color;
                      }
                      if (da.key === 'header_font_color') {
                        da.value = dis.content.fields.header_font_color;
                      }
                    });
                  }
                });
                // this.newTemplate.fields = dis.content.fields;
              }
            });
          }
          // this.html_content = this.selectedTemplate.html_content;
          this.tempContent = this.selectedTemplate.html_content;
          this.updatePreview();
        }
      });
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    onEditorFocus (event) {
      // if (pell.getSelection()) {
      //   this.config.activeIndex = pell.getSelection().index;
      // }
    },
    onEditorChange (event) {
      this.updatePreview();
      // if (q.pell.getSelection()) {
      //   this.config.activeIndex = q.pell.getSelection().index;
      // }
    },
    // insertPlaceholder(p) {
    //   console.log(this);
    //   console.log(this.$refs);
    //   console.log(this.$refs.myQuillEditor);
    //   if (this.$refs && this.$refs.myQuillEditor) {
    //     const quill = this.$refs.myQuillEditor.quill;
    //     quill.insertText(this.config.activeIndex, p, '', true);
    //   }
    // },
    // onSubjectBlur(q) {
    //   if (q.target.selectionStart) {
    //     this.config.activeSubjectIndex = q.target.selectionStart;
    //   }
    // },
    // insertSubjectPlaceholder(p) {
    //   const quill = this.$refs.mySubject.$el;
    //   quill.value =
    //     quill.value.substring(0, this.config.activeSubjectIndex) + p +
    //     quill.value.substring(this.config.activeSubjectIndex);
    // },
    updatePreview () {
      let temp = this.tempContent;
      console.log(this.newTemplate.fields);
      this.$lodash.each(this.newTemplate.fields, (group, gi) => {
        this.$lodash.each(group.data, (field, fi) => {
          // console.log(field);
          // this.html_content = temp.replace(`{{ ${field.key} }}`, field.value);
          // this.html_content = temp.replace(`{{${field.key}}}`, field.value);
          temp = temp.replace(`{{ ${field.key} }}`, field.value);
          temp = temp.replace(`{{${field.key}}}`, field.value);
        });
      });
      this.html_content = temp;
    },
    closeModal () {
      if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent &&
        this.$parent.$parent.$parent.$parent &&
        this.$parent.$parent.$parent.$parent.newCampaign) {
        let match = -1;
        this.$lodash.each(this.$parent.$parent.$parent.$parent.newCampaign.distribution, (data, index) => {
          if (data.type === this.distMedium.logo) {
            match = index;
          }
        });
        if (match <= -1) {
          this.$parent.distribution[this.distMedium.logo] = false;
        } else {
          this.$parent.$parent.$parent.$parent.newCampaign.distributionsEnabled[this.distMedium.logo] = true;
        }
      }
      this.distMedium = null;
      this.dialogs.configuration = false;
    }
  },
  created () {
    // if (this.distMedium && this.distMedium.name) {
    //   this.getTemplates();
    // }
  },
  watch: {
    distMedium () {
      if (this.distMedium && this.distMedium.logo) {
        this.getTemplates();
      }
    }
  },
  beforeMount () {
    // if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent &&
    //   this.$parent.$parent.$parent.$parent &&
    //   this.$parent.$parent.$parent.$parent.newCampaign) {

    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hover-link:hover {
  color:#4c3e9d !important
}
.v-stepper__step__step {
  &.primary {
    background-color: #4c3e9d!important;
    border-color: #4c3e9d!important;
  }
}

.close-button {
  padding: 10px;
  &:hover {
    border: 1px solid red;
    border-radius: 8px;
  }
}
.template-preview {
  table {
    table {
      width: 100%!important;
      padding: 5%!important;
    }
  }
  min-width: 55%!important;
  max-width: 55%!important;
  overflow-y: auto!important;
}
.template-editor {
  min-width: 42%!important;
  max-width: 42%!important;
  overflow-x:hidden!important;
}
.template-section {
  border-color: #f3f1f1!important;
  overflow-x:hidden!important;
  // height: 100%!important;
}
.template-field {
  padding: 0 5%!important;
}
.template-field-label {
  padding-left: 5%!important;
  padding-right: 5%!important;
}
.template-card {
  // min-height: 600px!important;
  // height: 600px!important;
  max-height: 600px!important;;
  overflow-x:hidden!important;
  overflow-y: hidden!important;
}
.template-sms-card {
  // min-height: 400px!important;
  height: 300px!important;
  // max-height: 400px!important;;
  overflow-x:hidden!important;
  overflow-y: hidden!important;
}
.ck-editor {
  padding: 0 5%!important;
  margin-bottom: 30px!important;
  .ck-editor__main {
    height: 200px!important;
    max-height: 200px!important;
    overflow-y:auto!important;
    .ck-content {
      &.ck-editor__editable {
        height: 200px!important;
        max-height: 200px!important;
      }
    }
  }
}
.template-custom-field {
  &.custom-textarea {
    .v-input__control {
      height: 100%!important;
      .v-input__slot {
        height: 100%!important;
      }
    }
  }
  &.no-margin {
    height:35px!important;
  }
  &.v-text-field--box {
    .v-input__slot {
      min-height: unset!important;
    }
  }
  &.v-text-field--outline {
    .v-input__slot {
      min-height: unset!important;
    }
  }
  &.v-text-field {
    &.v-text-field--solo {
      .v-input__control {
         min-height: unset!important;
      }
    }
  }
  &.v-text-field--box {
    &.v-text-field--single-line {
      input {
        margin-top: 0px!important;
      }
    }
  }
  &.v-text-field--outline {
    &.v-text-field--single-line {
      input {
        margin-top: 0px!important;
      }
    }
  }
  &.v-text-field {
    &.v-text-field--enclosed {
      .v-input__prepend-outer {
        margin-top:0px!important;
      }
      .v-input__prepend-inner {
        margin-top:0px!important;
      }
      .v-input__append-outer {
        margin-top:0px!important;
      }
      .v-input__append-inner {
        margin-top:0px!important;
      }
    }
  }
}
.difm-menu-split {
  height: 600px;
  float: left;
  margin-left: 63px;
  border-left: 1px solid #D0D2D3;
  margin-top: -18px;
  position: relative;
  left:-4%;
}
.html-preview {
  height: 600px!important;
  overflow-y: hidden!important;
  // a {
  //   &:link {
  //     color: unset!important;
  //   }
  // }
}
.distribution-card {
  overflow-y: hidden;
  max-height: 700px;
  .v-card__text {
    max-height: 600px!important;
  }
}
</style>
