<template>
  <div class="template-wrap">
    <v-container v-if="!addNewEmailTemplate" class="template-wrap-container">
      <v-subheader style="margin-bottom:3%; padding:0">
        <v-flex xs2>
          <v-list-tile-title style="display:block">
            <strong class="py-2 " style=" font-size:18px; color:grey;">Email Templates</strong>
          </v-list-tile-title>
          <v-list-tile-sub-title>
            Email Templates
          </v-list-tile-sub-title>
        </v-flex>
        <v-flex xs7 text-sm-right>
          <v-text-field
            append-icon="fas fa-search"
            flat
            label="Search"
            v-model="search"
            @keyup="searchTemplateList"
          ></v-text-field>
        </v-flex>
        <v-flex xs3 text-sm-right>
            <!-- <v-btn color="primary" @click="addNewTemplate">
              <v-icon class="mr-2" small>fas fa-plus</v-icon>
              Add Template
            </v-btn> -->
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
            <!-- <v-btn
              color="primary"
              dark
              v-on="on"
            >
              Insert placeholders
            </v-btn> -->
              <v-btn color="primary" v-on="on">
                <v-icon class="mr-2" small>fas fa-plus</v-icon>
                Add Template
              </v-btn>
            </template>
            <v-list>
              <v-list-tile
                v-for="(item, index) in getTemplateOptionsList"
                :key="index"
                @click="createNewTemplate(item.value)"
              >
                <v-list-tile-title>{{ item.key }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
        </v-menu>
        </v-flex>
      </v-subheader>

    <v-tabs
      class="custom-dashboard-tabs template-tabs"
      v-model="active"
      grow
      centered
      slider-color="primary"
    >
      <v-tab
        v-for="(c, index) in getCategoriesList"
        :key="index"
        ripple
        class="text-capitalize"
        :href="`#${c.value}`"
        @click="onClickTab(c.value)"
      >
        {{ c.key }}
      </v-tab>
      <v-tabs-items>
        <v-tab-item v-for="(c, index) in getTemplateOptionsList" :key="index" :value="c.value">
          <v-card flat v-for="(t,index) in templatesList" :key="index" class="templates-list">
            <v-layout>
              <v-flex sm10 text-xs-left @click="onClickEditTemplate(t.id)">
                <v-card-title>
                  {{ t.templateTitle }}
                </v-card-title>
              </v-flex>
              <v-flex sm2 text-xs-right>
                <!-- <v-btn color="primary" class="ma-0" flat icon @click="onClickEditTemplate(t.id)">
                  <v-icon color="primary">fas fa-edit</v-icon>
                </v-btn> -->
                <!-- <v-btn color="primary" class="ma-0" flat icon>
                  <v-icon class="mr-2" small>far fa-eye</v-icon>
                </v-btn> -->
                <v-btn color="primary" class="ma-0 template-delete-icon" flat icon>
                  <v-icon class="mr-2" small @click="onClickDeleteTemplate(t.id)">fas fa-trash</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
    <!-- <v-card flat v-for="(t,index) in templatesList" :key="index" class="templates-list">
      <v-layout>
        <v-flex sm10 text-xs-left @click="onClickEditTemplate(t.id)">
          <v-card-title>
            <b>Title:</b>&nbsp;
            {{ t.templateTitle }}
          </v-card-title>
          <v-card-text>
            <b>Description:</b>&nbsp;{{t.description}}
          </v-card-text>
        </v-flex>
        <v-flex sm2 text-xs-right>
          <v-btn color="primary" class="ma-0" flat icon @click="onClickEditTemplate(t.id)">
            <v-icon color="primary">fas fa-edit</v-icon>
          </v-btn>
          <v-btn color="primary" class="ma-0" flat icon>
            <v-icon class="mr-2" small>far fa-eye</v-icon>
          </v-btn>
          <v-btn color="primary" class="ma-0 template-delete-icon" flat icon>
            <v-icon class="mr-2" small @click="onClickDeleteTemplate(t.id)">fas fa-trash</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card> -->
    </v-container>

    <createTemplate
      v-if="addNewEmailTemplate"
      :templateType="templateType"
      :editTemplate="editTemplate"
      @onClickCancel="onClickCancel"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import { mapState } from 'vuex';
import createTemplate from './createTemplate';

Vue.prototype.$http = axios;

export default {
  name: 'Templates',

  components: {
    createTemplate
  },

  data () {
    return {
      active: 'first_chat_initiation',
      addNewEmailTemplate: false,
      templateData: null,
      templateType: null,
      editTemplate: false,
      search: null
    };
  },

  created () {
    this.getTemplateOptions();
  },

  computed: {
    ...mapState({
      templatesList: state => state.templatesList,
      templateCategoryOptions: state => state.templateCategoryOptions,

      getCategoriesList () {
        return this.getTemplateOptionsList;
      }
    }),
    getTemplateOptionsList () {
      const tempList = [];
      this.$lodash.each(this.templateCategoryOptions, (val, key) => {
        const t = {};
        t.key = key.replace(/_/g, ' ');
        t.value = key;
        tempList.push(t);
      });
      return tempList;
    }
  },

  methods: {
    addNewTemplate () {
      this.addNewEmailTemplate = !this.addNewEmailTemplate;
    },

    onClickCancel () {
      this.addNewEmailTemplate = false;
      this.updateActiveTemplate(null);
      // this.$store.dispatch('activeTemplate', null);
      this.getTemplatesList(this.active);
    },

    onClickTab (type) {
      this.getTemplatesList(type);
    },

    searchTemplateList () {
      // console.log('this.active', this.active, this.search);
      // setTimeout(() => {
      this.getTemplatesList(this.active);
      // }, 1000);
    },

    // getTemplateList(type) {
    // const tempList = [];
    // this.$lodash.each(this.templatesList, (val) => {
    //   if (val.templateType === type) {
    //     tempList.push(val);
    //   }
    // });
    // return tempList;
    // },

    getTemplatesList (type) {
      // http://localhost:8000/notifications/email/template/?templateType__in=reminder_to_complete&search=conversation
      axios.get(`${process.env.VUE_APP_BASE_API_URL}notifications/email/template/`, {
        params: {
          templateType__in: type,
          search: this.search ? this.search : undefined
        }
      }).then((res) => {
        if (res.status === 200) {
          this.$store.dispatch('templatesList', res.data.results);
        }
      });
    },

    getTemplateOptions () {
      axios.get(`${process.env.VUE_APP_BASE_API_URL}notifications/email/template/options/`).then((res) => {
        if (res.status === 200) {
          this.$store.dispatch('templateCategoryOptions', res.data);
          this.getTemplateListOnMount();
        }
      });
    },

    getTemplateListOnMount () {
      const type = this.getTemplateOptionsList;
      if (type[0] && type[0].value) {
        this.getTemplatesList(type[0].value);
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Oops, Some error occured, Please try again later!'
        });
      }
    },

    createNewTemplate (type) {
      this.templateType = type;
      this.$lodash.each(this.templateCategoryOptions, (val, key) => {
        if (key === type) {
          console.log('type', type, 'key', key);
          this.updateActiveTemplate(null);
          this.updateActiveTemplate(val);
          this.addNewEmailTemplate = true;
          this.editTemplate = false;
        }
      });
    },

    onClickEditTemplate (id) {
      axios.get(`${process.env.VUE_APP_BASE_API_URL}notifications/email/template/${id}/`).then((res) => {
        if (res.status === 200) {
          this.addNewEmailTemplate = true;
          this.editTemplate = true;
          this.templateType = res.data.templateType;
          let tempTemplate = '';
          this.$lodash.each(this.templateCategoryOptions, (val, key) => {
            if (key === res.data.templateType) {
              tempTemplate = val;
            }
          });
          tempTemplate.default_email_template = { ...res.data };
          this.updateActiveTemplate(tempTemplate);
        }
      });
    },

    onClickDeleteTemplate (id) {
      axios.delete(`${process.env.VUE_APP_BASE_API_URL}notifications/email/template/${id}/`).then((res) => {
        // console.log('res', res);
        if (res.status === 204) {
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Template deleted successfully'
          });
          this.getTemplatesList(this.active);
        }
      });
    },

    updateActiveTemplate (val) {
      this.$store.dispatch('activeTemplate', val);
    }
  }
  // {
  //   'templateTitle': 'HipoDisengagedNotification',
  //   'templateTrigger': 'template-Title',
  //   'description': 'Disengaged HiPO Employee Identified',
  //   'preHeader': 'Disengaged HiPO Employee Identified',
  //   'subject': 'Disengaged HiPO Employee Identified',
  //   'body': {
  //       'body_1': '<p>Hi {{ receiver_name }},</p><p>{{ Session.user.display_name }} is marked as <strong>high potential employee</strong> of the company. During my chat today, I identified that {{ Session.user.first_name }} is not very engaged.</p><p>Please look in to this.</p>',
  //       'body_sub': '<p>Regards,<br/>{{Session.stage.chatFromUser.display_name}}</p>',
  //       'body_2': ''
  //   },
  //   'actionButton': {
  //   'is_active': True,
  //   'button_label': 'View Employee',
  //   'button_url_link': "{{ action_button_url }}"
  //   },
  //   'sendNotification': True,
  //   'recipientEmails': '{{ receiver_email }}',
  //   'sender': 'Amara <hello@amara.ai>'
  // }
};
</script>

<style lang="scss" scoped>
.template-wrap {
  .templates-list {
    &:hover {
      color: #4c3e9d;
      background: #f3f3f3;
      cursor: pointer;
      transition: 1s ease all;
    }
    .template-delete-icon {
      padding-top: 10%;
    }
  }
  .template-wrap-container {
    padding-left: 0;
    padding-right: 0;
    .template-tabs {
      // box-shadow: 0 4px 20px 1px rgba(0,0,0,.06), 0 1px 4px rgba(0,0,0,.08) !important;
      border-top: 1px solid rgba(0,0,0,.08);
    }
  }
}
</style>
