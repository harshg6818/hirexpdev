<template>
  <div class="adhoc-app">
    <div column class="d-flex flex-column">
      <div class="py-2 d-flex flex-row flex-wrap align-center" style="border-bottom:1px solid rgb(243, 241, 241)">
        <v-flex xs1 style="border-right:1px solid rgb(243, 241, 241);max-width:5%">
          <v-tooltip bottom>
            <v-btn class="elevation-0 ml-0 text-xs-right back-button"
              @click="goBack()"
              slot="activator"
              flat fab
            >
              <v-icon> fas fa-arrow-left </v-icon>
            </v-btn>
            Back
          </v-tooltip>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <h2 v-show="stage && stage.summary && stage.summary.title" class="pl-3 mt-3"> {{stage.summary.title}} </h2>

          <div class="d-inline-flex">
            <v-tooltip bottom>
              <h3 slot="activator" v-show="stage && stage.summary && stage.summary.category" class="pl-3 mt-0 grey--text mt-2">
                {{campaignCategories(stage.summary.category)}} &nbsp;
              </h3>
              Campaign category
            </v-tooltip>

            <v-tooltip bottom v-if="!editable" class="mt-2">
              <h3 slot="activator" v-show="stage && stage.summary && stage.summary.schedule_end_at"
                class="pl-3 mt-0 grey--text"> | &nbsp; {{ dayjs(scheduleEndDate).format('DD-MM-YYYY') }}
              </h3>
              Cutoff Date
            </v-tooltip>

            <v-menu
              ref="dateMenu"
              :close-on-content-click="false"
              v-model="menu.date"
              v-show="stage && stage.summary && stage.summary.schedule_end_at"
              v-if="editable"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              style="position:relative;top:-3px;left:10px"
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                class="grey--text text--lighten-2 template-custom-datefield"
                maxlength="30"
                :value="scheduleEndDate"
                v-validate="'required'"
                readonly
                single-line
                flat
                :error-messages="errors.collect('date')"
                name="date"
                label="Date *"
              ></v-text-field>
              <v-date-picker v-model="scheduleEndDate" no-title
              @input="menu.date = false"></v-date-picker>
            </v-menu>
          </div>
        </v-flex>

        <v-spacer> </v-spacer>

        <v-flex xs5 text-xs-right>
          <v-tooltip bottom>
            <v-chip slot="activator" class="custom-chip" :color="getColor(stage.summary.status)">
              <v-icon class="mr-2" small :color="getColor(stage.summary.status)" style="font-size:12px">
                fas fa-circle
              </v-icon>
              {{stage.summary.status}}
            </v-chip>
            Campaign status
          </v-tooltip>

          <v-tooltip class="ml-3 mr-2" bottom>
            <v-btn
              style="height:34px;min-width:34px;"
              flat
              :loading='this.downloadResponseLoader'
              slot="activator"
              @click="downloadResponse(stage)"
              small class="ml-0 my-0 elevation-0 text-none adhoc--text pl-0"
              v-if="stage.summary.status !== 'draft'"
              >
              <v-icon small class="ml-2 mr-2">fas fa-cloud-download-alt</v-icon> Download responses
            </v-btn>
            Download responses
          </v-tooltip>

          <v-tooltip class="ml-3 mr-2" bottom>
            <v-btn
              style="height:34px;min-width:34px;max-width:34px"
              flat
              slot="activator"
              @click="editCampaign(stage)"
              small class="ml-0 my-0 elevation-0 adhoc--text pl-0"
              :disabled="stage.summary && stage.summary.status !== 'draft'"
              >
              <v-icon small class="ml-0">fas fa-edit</v-icon>
            </v-btn>
            Edit
          </v-tooltip>

          <!-- <v-tooltip class="ml-3 mr-2" bottom v-else>
            <v-btn
              style="height:34px;width:34px"
              fab outline
              slot="activator"
              @click="saveCampaign(stage.stage_id)"
              small class="ml-0 my-0 elevation-0 adhoc--text pl-0"
              >
              <v-icon small class="ml-0">fas fa-save</v-icon>
            </v-btn>
            Save
          </v-tooltip> -->
        </v-flex>

        <!--<v-flex xs2>
          <v-select
            :options="groups"
            style="width:100%;margin-left:5px"
            label="Select group"
            flat
          >
          </v-select>
        </v-flex>-->

        <!--<v-flex xs2>
          <v-btn color="adhoc"
            style="border-radius:5px;height:34px"
            @click="createGroup()"
            small class="ml-0 my-0 elevation-0 white--text pl-0"
            >
            <v-icon small class="ml-2">fas fa-plus</v-icon>
              &nbsp; &nbsp; Create new group
          </v-btn>
        </v-flex>-->
      </div>

      <div class="hide-overflow d-flex flex-column">
        <div style="border-bottom:1px solid rgb(243, 241, 241);" class="d-flex flex-row flex-wrap mt-0 pt-3">

          <v-flex xs10 class="ml-4">
            <v-tabs
              style=""
              v-model="config.activeTab"
              centered
              class="text-xs-center px-0 stepper-step-title"
              color="primary"
              slider-color="#4c3e9d"
              height="fill-height"
            >
              <v-tab
                class="stepper-step"
                v-for="(t, ti) in config.tabs"
                :key="ti"
                :href="`#tab-${t.value}`"
                @click="changeTab()"
              >
                <strong class="text-none"> {{t.title}} </strong>
              </v-tab>
            </v-tabs>
          </v-flex>

        </div>

        <div class="viewAdhocQue d-flex flex-row flex-wrap">

          <v-flex style="background-color:#fff">
            <v-tabs-items v-model="config.activeTab">
              <v-tab-item value="tab-overview" v-if="config.activeTab === 'tab-overview'">
                <overview-report class="pb-3 overview-report" ref="OverviewReport">  </overview-report>
                <questions-report ref="QuestionsReport">  </questions-report>
              </v-tab-item>

              <!-- <v-tab-item value="tab-questions" v-show="config.activeTab === 'tab-questions'">
              </v-tab-item> -->

              <v-tab-item value="tab-recipients" v-show="config.activeTab === 'tab-recipients'">
                <recipients-report ref="RecipientsReport"> </recipients-report>
              </v-tab-item>

              <v-tab-item value="tab-followups" v-show="config.activeTab === 'tab-followups'">
                <followup ref="FollowUp"> </followup>
              </v-tab-item>

              <v-tab-item value="tab-distributions" v-if="config.activeTab === 'tab-distributions'">
                <distributions-report ref="distributionsReport"> </distributions-report>
              </v-tab-item>
            </v-tabs-items>
          </v-flex>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import { VChip, VMenu, VCheckbox, VAvatar, VTooltip } from 'vuetify';
import VDateRange from 'vuetify-daterange-picker';
import dayjs from 'dayjs';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

// import CampaignOverview from '../analytics/adhoc/CampaignOverview';
// import CampaignAnalysis from '../analytics/adhoc/CampaignAnalysis';
// import DailyResponseReport from '../analytics/adhoc/DailyResponseReport';
// import ResponseBreakdown from '../analytics/adhoc/ResponseBreakdown';
// import QuestionAnalysis from '../analytics/adhoc/QuestionAnalysis';
import OverviewReport from '../analytics/adhoc/OverviewReport';
import QuestionsReport from '../analytics/adhoc/QuestionsReport';
import RecipientsReport from '../analytics/adhoc/RecipientsReport';
import Followup from '../analytics/adhoc/Followup';
import distributionsReport from '../analytics/adhoc/distributionsReport';
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

Vue.use(VDateRange);

export default {
  name: 'dashboard',
  components: {
    // ContentLoader,
    // VChip,
    // VMenu,
    // VAvatar,
    // VTooltip,
    // VCheckbox,
    OverviewReport,
    QuestionsReport,
    RecipientsReport,
    Followup,
    distributionsReport
    // QuestionAnalysis,
    // CampaignOverview,
    // CampaignAnalysis,
    // DailyResponseReport,
    // ResponseBreakdown,
  },
  data () {
    return {
      downloadResponseLoader: false,
      scheduleEndDate: dayjs().format('YYYY-MM-DD'),
      editable: false,
      stageReports: {},
      stageReportsCount: {
        overview_count: 0,
        questions_count: 0,
        recipients_count: 0
      },
      pagination: {
        rowsPerPage: 10
      },
      chatCompleted: '',
      menu: {
        date: false
      },
      dateRangeOptions: {
        startDate: undefined,
        endDate: undefined,
        format: 'DD/MM/YYYY',
        // minDate: dayjs('01/01/2018').format(),
        // maxDate: dayjs().format(),
        dateRange: {
          // startDate: dayjs().format('DD/MM'),
          // endDate: dayjs().format('DD/MM'),
        }
      },
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      config: {
        initialLoading: true,
        initialLoadingFilters: true,
        activeTab: 'tab-overview',
        tabs: [
          {
            title: 'Overview',
            value: 'overview',
            icon: 'fas fa-chart-bar'
          // }, {
          //   title: 'Questions',
          //   value: 'questions',
          //   icon: 'fas fa-question-circle',
          }, {
            title: 'Recipients',
            value: 'recipients',
            icon: 'fas fa-users'
          }, {
            title: 'Chat survey settings',
            value: 'followups',
            icon: 'fas fa-bullhorn'
          }
        ]
      },
      stage: {}
    };
  },
  computed: {
    formattedRange () {
      let time = '';
      if (!this.dateRangeOptions.startDate && !this.dateRangeOptions.endDate) {
        time = 'All Time';
      } else {
        time = `${dayjs(this.dateRangeOptions.startDate).format('DD MMM')} - ${dayjs(this.dateRangeOptions.endDate).format('DD MMM')}`;
      }
      return time;
    },
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    goBack () {
      this.$router.push({
        path: '/ad-hoc'
      });
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    getLogoUrl (pet) {
      const images = require.context('@/assets/logo', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    createGroup () {

    },
    editCampaign (s) {
      this.$router.push(`/ad-hoc/edit/${s.stage_id}`);
    },
    getColor (status) {
      let color = 'grey';
      if (status === 'draft') {
        color = 'grey';
      } else if (status === 'active') {
        color = '#4caf50';
      } else if (status === 'completed') {
        color = '#4caf50';
      } else if (status === 'closed') {
        color = 'red';
      }
      return color;
    },
    campaignCategories (category) {
      let campaignCateogry = 'Employee engagement';
      if (category === 'employee_engagement') {
        campaignCateogry = 'Employee engagement';
      } else if (category === 'candidate_engagement') {
        campaignCateogry = 'Candidate engagement';
      } else if (category === 'customer_engagement') {
        campaignCateogry = 'Customer engagement';
      } else if (category === 'Research') {
        campaignCateogry = 'Research';
      }
      return campaignCateogry;
    },
    formattedDate (date) {
      return dayjs(date).format('DD MMM YYYY');
    },
    changeTab () {
      setTimeout(() => {
        if (this.config.activeTab === 'tab-overview') {
          this.$nextTick(() => {
            if (this.$refs.QuestionsReport) {
              this.$refs.QuestionsReport.questions = this.stage.interactions;
              this.$refs.QuestionsReport.config.initialLoading = false;
              // this.$refs.QuestionsReport.getQuestionsReport(stageData.interactions[0].id);
            }
            if (this.$refs.OverviewReport && this.$route.params && this.$route.params.stageId) {
              this.$refs.OverviewReport.getOverviewReport(this.$route.params.stageId);
            }
          });
        } else if (this.config.activeTab === 'tab-recipients') {
          this.$nextTick(() => {
            if (this.$refs.RecipientsReport && this.$route.params && this.$route.params.stageId) {
              this.$refs.RecipientsReport.getRecipientsReport(this.$route.params.stageId);
            }
          });
        } else if (this.config.activeTab === 'tab-distributions') {
          this.$nextTick(() => {
            if (this.$refs.distributionsReport && this.$route.params && this.$route.params.stageId) {
              this.$refs.distributionsReport.getDistributionsReport(this.$route.params.stageId);
            }
          });
        }
      }, 100);
    },
    getStage (id) {
      // eslint-disable-next-line no-unused-vars
      const queryParams = {
        sections: 'stage_id,group_id,summary,interactions,recipients,distributions,schedule_end_at'
      };
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}stage/detail?stage_id=${id}`).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          const stageData = response.data.data;
          this.stage = response.data.data;
          if (stageData.summary && stageData.summary.schedule_end_at) {
            this.scheduleEndDate = dayjs(stageData.summary.schedule_end_at).format('YYYY-MM-DD');
          }
          // this.stageReportsCount.overview_count = stageData.interactions.length;
          this.stageReportsCount.questions_count = stageData.interactions ? stageData.interactions.length : 0;
          this.stageReportsCount.recipients_count = stageData.recipients ? stageData.recipients.length : 0;
          this.$lodash.each(stageData.interactions, (v, k) => {
            v.msg = v.questions;
          });
          if (this.config.activeTab === 'tab-overview') {
            this.$nextTick(() => {
              if (this.$refs.QuestionsReport) {
                this.$refs.QuestionsReport.questions = stageData.interactions;
                this.$refs.QuestionsReport.config.initialLoading = false;
                // this.$refs.QuestionsReport.getQuestionsReport(stageData.interactions[0].id);
              }
              if (this.$refs.OverviewReport) {
                this.$refs.OverviewReport.getOverviewReport(id);
              }
            });
          } else if (this.config.activeTab === 'tab-distributions') {
            this.$nextTick(() => {
              // if (this.$refs.RecipientsReport) {
              //   this.$refs.RecipientsReport.getRecipientsReport(this.$route.params.stageId);
              // }
              if (this.$refs.distributionsReport) {
                this.$refs.distributionsReport.getDistributionsReport(this.$route.params.stageId);
              }
            });
          }
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch stage details, Please try again later!'
        });
        throw new Error(response);
      });
    },
    saveCampaign (id) {
      if (id) {
        axios.post(`${process.env.VUE_APP_ADHOC_API_URL}stage/create`, {
          stage_id: id,
          summary: {
            schedule_end_at: this.scheduleEndDate.concat(' 23:59')
          }
        }).then((response) => {
          if (response && response.data) {
            if (response.data.stage_id) {
              this.getStage(response.data.stage_id);
              this.editable = false;
              this.$store.dispatch('updateSnackbar', {
                color: 'success',
                show: true,
                text: 'Campaign updated successfully!'
              });
            } else {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: 'Unable to save campaign, Please try again later!'
              });
            }
            // this.templates = response.data.data;
          }
        }, (response) => {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to draft campaign, Please try again later!'
          });
          throw new Error(response);
        });
      }
    },
    getFilters () {
      axios.get(`${process.env.VUE_APP_ADHOC_API_URL}company/${this.user.company}/dashboard_filters`).then((response) => {
        if (response && response.data && response.data.queryset_filters_options) {
          this.config.initialLoadingFilters = false;
          this.filters.default = response.data.queryset_filters_options;

          const defaultFilters = {};
          this.$lodash.each(this.filters.default, (v, k) => {
            defaultFilters[k] = [];
          });
          if (Object.keys(this.filters.selected).length === 0) {
            this.filters.selected = defaultFilters;
            this.filters.main = JSON.parse(JSON.stringify(defaultFilters));
          }
        }
      });
    },
    downloadResponse () {
      this.downloadResponseLoader = true;
      axios.post(`${process.env.VUE_APP_ADHOC_API_URL}reports/${this.$route.params.stageId}/download_responses?response_type=sync`).then((response) => {
        if (response && response.status === 200) {
          window.open(response.data.message);
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Response downloaded successfully'
          });
          this.downloadResponseLoader = false;
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to download response , Please try again later!'
        });
        throw new Error(response);
      });
    }
  },
  watch: {
    $route () {
      if (this.$route.query && this.$route.query.activeTab) {
        this.config.activeTab = `tab-${this.$route.query.activeTab}`;
        if (this.$route.params && this.$route.params.stageId) {
          this.getStage(this.$route.params.stageId);
        }
      } else if (this.$route.params.stageId) {
        this.getStage(this.$route.params.stageId);
      }
    }
  },
  beforeMount () {
    if (this.$route.query && this.$route.query.activeTab) {
      this.config.activeTab = `tab-${this.$route.query.activeTab}`;
      if (this.$route.params && this.$route.params.stageId) {
        this.getStage(this.$route.params.stageId);
      }
    } else if (this.$route.params.stageId) {
      this.getStage(this.$route.params.stageId);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.bg-gradient {
  &.bg-adhoc-theme {
    .v-toolbar__content {
      // margin-top: 20px;
    }
  }
}
.hover-link:hover {
  color:#4c3e9d !important
}
.tab-heading {
  width: 100% !important;
  margin-top:8px !important;
  margin-bottom: 20px!important;
  text-align: left!important;
  font-weight: 500!important;
}
.tab-subheading {
  width: 100% !important;
  color: grey !important;
  text-align: left!important;
  font-weight: 500!important;
  font-size:40px!important;
}
.v-tabs__div {
  &.stepper-step {
    margin-left: 0!important;
    // color: #4c3e9d !important;
    color: #4c3e9d !important;
    margin-right: 0;
    font-size: small;
    max-width: unset;
    a {
      position: relative!important;
      top: 8px!important;
      left: -7px!important;
    }
  }
}
.v-tabs__wrapper {
  .v-tabs__container {
    .v-tabs__slider-wrapper {
      .v-tabs__slider {
        width: 100%!important;
      }
    }
  }
}
.custom-chip {
  background: #fff!important;
  text-transform: uppercase!important;
  font-size: 12px!important;
  font-weight: 600!important;
  color: grey!important;
}
.overview-report {
  border-bottom: 1px solid rgb(206, 203, 203)!important;
}
</style>
<style lang="scss">
.viewAdhocQue {
  .v-window__container {
    height: auto !important;
  }
}
</style>
