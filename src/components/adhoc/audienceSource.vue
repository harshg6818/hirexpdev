<template>
  <div>
    <v-dialog v-model="dialog3" max-width="500px">
      <v-card>
        <v-card-text>
          <div>
            CSV file has 5-6 parameters that are mandatory but if you
            want to add additional parameters such as function, site,
            zone, department, anniversary, etc. you are allowed to do
            so. Once you have all the fields entered, and the file uploaded
            into the system, you have to map each additional fields you have
            created with the fields in the system the appears in a dropdown
            box. just in case the field you have created is not present in
            there dropdown, you can map it to 'custom field'.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click="dialog3=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="1000px"
      v-model="open"
      transition="dialog-transition"
      persistent
      scrollable
    >
      <v-card v-if="!audienceSource && $parent.newCampaign && $parent.newCampaign.category === 'employee_engagement'">
        <v-card-title>
          <v-layout>
            <v-flex xs9>
              <h2> Please select a source for the recipients. </h2>
            </v-flex>
            <v-flex xs3 text-xs-right v-if="$parent && $parent.audienceSource">
              <v-icon color="red" class="close-button" @click="closeModal()"> fa fa-times
              </v-icon>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-layout class="mt-5">
            <v-flex xs5 class="audience-cards cursor-pointer" @click="selectAudienceSource('csv')">
              <v-card class="py-5 px-2 text-xs-center">
                <v-layout>
                <v-flex xs2 text-xs-center>
                    <v-icon large color="#4c3e9d" style="font-size:70px" class="audience-icon"> flaticon-044-curriculum-1 </v-icon>
                    <!--<v-img :src="getImgUrl('icon-csv')" class="audience-icon"></v-img>-->
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs9 d-block>
                    <h2 class="text-xs-left mb-3"> Upload CSV </h2>
                    <h3 class="grey--text text-xs-left"> Upload respondents for the campaign. </h3>
                </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs2>
            <div class="difm-menu-split">
                <div class="or-circle"> &nbsp; OR </div>
            </div>
            </v-flex>
            <v-flex xs5 class="audience-cards cursor-pointer" @click="selectAudienceSource('existing_employees')">
              <v-card  class="py-5 px-2 text-xs-center">
                <v-layout>
                <v-flex xs2 text-xs-center>
                    <v-icon color="#4c3e9d" large class="audience-icon"> fa fa-clipboard-list </v-icon>
                    <!--<v-img :src="getImgUrl('checklist--v1')" class="audience-icon"></v-img>-->
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs9 d-block>
                    <h2 class="text-xs-left mb-3"> Choose from existing data </h2>
                    <h3 class="grey--text text-xs-left"> Select recepients for the campaign from available data. </h3>
                </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
           </v-layout>
        </v-card-text>
      </v-card>

      <v-card v-if="audienceSource === 'csv' || ($parent.newCampaign && $parent.newCampaign.category !== 'employee_engagement')">
        <v-card-title>
          <v-layout class="mb-2">
            <v-flex xs9>
              <h2> Upload your own recipients for the campaign </h2>
            </v-flex>
            <v-flex xs3 text-xs-right>
              <v-icon color="red" class="close-button" @click="closeModal()">"> fa fa-times
              </v-icon>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-stepper light v-model="csvUploadStep" vertical>
            <v-stepper-step step="1">
              <div style="display:inline-flex">
                Upload CSV &nbsp;
                <a style="color:#4c3e9d" href="https://amara-internal.s3.ap-south-1.amazonaws.com/Amara+adhoc+template.csv" target="_blank">
                  ( Download CSV template )
                </a>
              </div>
              <small v-if="!rawCSVName">Select CSV to upload</small>
              <small v-if="rawCSVName">{{rawCSVName}}</small>
            </v-stepper-step>

            <v-stepper-content step="1">
              <div color="grey lighten-1" class="mb-5" @click="openFilePicker('candidateUploader')"
              style="height:200px;border:1px dashed grey">
                <input type="file" name="candidateUploader" ref="candidateUploader"
                  class="custom-upload"
                  id="candidateUploader" @input="filesChange($event.target.files);"
                  @change="filesChange($event.target.files);"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  style="opacity:0;z-index:2;height:100%;width:100%" />

                <v-icon color="#4c3e9d" class="custom-button" large> fa fa-cloud-upload-alt </v-icon>
                <h3 class="grey--text mb-2 custom-h3"> Drag and drop or </h3>
                <v-btn text-xs-center color="#4c3e9d" class="white--text custom-btn">
                  Upload CSV
                </v-btn>

                <!--<div class="text-xs-center" style="position:relative;top:-33%;z-index:1">
                  <v-icon color="#4c3e9d" large> fa fa-cloud-upload-alt </v-icon>
                  <h3 class="grey--text mb-2"> Drag and drop or </h3>
                  <v-btn text-xs-center color="#4c3e9d" class="white--text">
                    &nbsp; &nbsp; Upload CSV
                  </v-btn>
                </div>-->
              </div>
              <!--<h4 class="text-sm-left mb-3 mt-2 pt-2">
                <b> NOTE :  </b>
                <span class="red--text"> The below fields are mandatory. </span>
                <a style="color:#4c3e9d" href="https://s3.ap-south-1.amazonaws.com/hirexp-internal/resources/sample.csv" target="_blank">
                  Download CSV Template
                </a>
              </h4>
              <h4 class="text-sm-left mb-3">
                First name, Last name, Gender
              </h4>-->
              <div>{{rawCSVName}}</div>
              <v-btn color="#4c3e9d" class="white--text" @click="continueUploading()" :disabled="!rawCSV || !rawCSV.length">Continue</v-btn>
              <!--<v-btn flat @click="reset()" :disabled="!rawCSV || !rawCSV.length"> Reset</v-btn>-->
            </v-stepper-content>

            <v-stepper-step step="2">
              Map fields
              <small> Map fields from CSV </small>
            </v-stepper-step>

            <v-stepper-content step="2">
                <v-layout row wrap class="mb-3">
                  <v-flex xs1></v-flex>
                  <v-flex sm10 class="pr-5">
                    <table class="table b-table table-hover csv-table" style="width: 100%;">
                      <thead class="">
                        <tr class="text-xs-left">
                          <th> Field required </th>
                          <th> Field from CSV </th>
                          <th> First data set from CSV </th>
                        </tr>
                      </thead>
                      <tbody class="">
                        <tr v-for="(h, hi) in getMapHeadings()" :key="hi">
                          <td class="text-left">
                            {{h.backend}}
                            <span class="text-danger" v-show="h.required">*</span>
                          </td>
                          <td>
                            <v-select
                              v-model="h.name"
                              label="Selected field"
                              single-line
                              :items="headings"
                              item-value="id"
                              @change="updateIndex(h)"
                              >
                            </v-select>
                          </td>
                          <td>
                            <span v-if="(h.index || h.index === 0) && rawCSV.length"> {{rawCSV[1][h.index]}} </span>
                          </td>
                          <td v-if="h.custom">
                            <v-btn
                              slot="activator"
                              color="adhoc"
                              small
                              flat
                              icon
                              style="margin-left: -4px;"
                              @click="onClickDeleteCustom(h)"
                            >
                              <v-icon small>fa-trash</v-icon>
                            </v-btn>
                          </td>
                        </tr>
                        <!-- <tr v-if="customFields.length > 0" v-for="(cf,index) in customFields" :key="index"> -->
                        <tr v-for="(cf,index) in customFields" :key="index">
                          <td>
                            <v-text-field
                              label="Field name"
                              v-model="customFields[index].backend"
                              single-line
                            ></v-text-field>
                          </td>
                          <td>
                            <v-select
                              label="Selected field"
                              single-line
                              :items="headings"
                              item-value="id"
                              v-model="customFields[index].name"
                              @change="updateIndexCustomField(index)"
                            >
                            </v-select>
                          </td>
                          <td>
                            <span v-if="rawCSV.length > 0"> {{rawCSV[1][customFields[index].index]}} </span>
                          </td>
                          <td v-if="cf.custom">
                            <v-btn
                              slot="activator"
                              color="adhoc"
                              small
                              flat
                              icon
                              style="margin-left: -4px;"
                              @click="onClickDeleteCustomFields(index)"
                            >
                              <v-icon small>fa-trash</v-icon>
                            </v-btn>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </v-flex>
                  <v-flex xs1>
                  </v-flex>
                </v-layout>

                <v-layout class="mb-4">
                  <v-flex xs1></v-flex>
                  <v-flex xs10>
                    <div class="text-xs-left">
                      <v-menu offset-y max-height="250px">
                        <p
                          color="primary"
                          slot="activator"
                          small class="ml-2 elevation-0"
                          style="position:relative;font-size:16px;font-weight:600"
                        >
                          <span>+&nbsp;</span>
                          <span style="text-decoration:underline;">Add new field</span>
                          <span style="padding-left: 14px;" @click.stop="dialog3 = true;">
                            <v-icon small>fas fa-info-circle</v-icon>
                          </span>
                        </p>
                        <v-list>
                          <v-list-tile
                            v-for="(item, index) in items"
                            :key="index"
                            @click="addCustomField(item)"
                          >
                            <v-list-tile-title style="text-transform:capitalize">
                              {{ getFieldsLabel(item.title) }}
                            </v-list-tile-title>
                          </v-list-tile>
                        </v-list>
                      </v-menu>
                    </div>
                  </v-flex>
                  <v-flex xs1></v-flex>
                </v-layout>

                <v-btn
                  color="#4c3e9d"
                  class="white--text"
                  @click="startUploading()"
                  >
                  Continue
                </v-btn>
                <v-btn flat @click="csvUploadStep = 1" > Upload new CSV </v-btn>

            </v-stepper-content>
          </v-stepper>
        </v-card-text>

        <v-card-actions
          v-if="($parent.newCampaign && $parent.newCampaign.category === 'employee_engagement')"
          align-content-space-
        >
          <v-flex xs2 class="ml-2 mb-3">
            <v-btn @click.stop="audienceSource=null">Back</v-btn>
          </v-flex>
          <v-flex xs8>
          </v-flex>
          <v-flex text-xs-right xs2>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { VAlert, VMenu, VSlider, VTextarea, VSelect, VChip, VPagination, VCheckbox } from 'vuetify';
// import { Container, Draggable } from 'vue-smooth-dnd';
import { mapState } from 'vuex';
// import axios from 'axios';
// import VueContentLoading from 'vue-content-loading';
import PapaParse from 'papaparse';

export default {
  name: 'NewQuestion',
  // components: {
  //   VAlert,
  //   VMenu,
  //   VTextarea,
  //   VSlider,
  //   VSelect,
  //   Container,
  //   Draggable,
  //   VChip,
  //   VPagination,
  //   VCheckbox,
  //   VueContentLoading,
  // },
  data () {
    return {
      items: [
        { title: 'location' },
        { title: 'birth_date' },
        { title: 'education' },
        { title: 'experience' },
        { title: 'skills' },
        { title: 'designation' },
        { title: 'grade' },
        { title: 'department' },
        { title: 'sub_department' },
        { title: 'function' },
        { title: 'team' },
        { title: 'business' },
        { title: 'manager' },
        { title: 'businessHead' },
        { title: 'hrbp' },
        { title: 'cluster' },
        { title: 'cost_centre' },
        { title: 'hr_manager' },
        { title: 'high_potential_emp' },
        { title: 'site' },
        { title: 'custom_field' }
      ],
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      open: false,
      table: {
        searchString: '',
        totalStage: 0,
        loading: true,
        stage: []
      },
      config: {
        filter: false,
        panel: [true, true, true],
        initialLoading: true,
        initialLoadingFilters: true,
        refreshing: false,
        uploadStarted: false
      },
      pagination: {
        rowsPerPage: 5,
        page: 1,
        length: 1
      },
      rawCSV: [],
      rawCSVName: '',
      row: {
        value: [],
        selected: 0
      },
      mapHeadings: {},
      customFields: [],
      headings: [],
      audienceSource: null,
      csvUploadStep: 1,
      dialog3: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    getFieldsLabel (field) {
      const c = field.replace(/_/g, ' ');
      return c;
    },
    getMapHeadings () {
      return this.mapHeadings;
    },
    addCustomField (i) {
      if (i.title !== 'custom_field') {
        const temp = {
          [i.title]: {
            name: '',
            required: false,
            backend: i.title,
            index: -1,
            custom: true
          }
        };
        this.mapHeadings = {
          ...this.mapHeadings,
          ...temp
        };
      } else {
        const cname = this.customFields.length + 1;
        const t = {
          name: '',
          required: false,
          backend: `Custom Field ${cname}`,
          index: -1,
          custom: true
        };
        this.customFields.push(t);
      }
    },
    updateIndexCustomField (h) {
      this.$lodash.each(this.rawCSV[0], (val, key) => {
        if (val === this.customFields[h].name) {
          this.customFields[h].index = key;
        }
      });
    },
    onClickDeleteCustom (item) {
      delete this.mapHeadings[item.backend];
      this.$forceUpdate();
    },
    onClickDeleteCustomFields (idx) {
      this.customFields.splice(idx, 1);
    },
    selectAudienceSource (source) {
      this.audienceSource = source;
      this.$nextTick(() => {
        if (source !== 'csv') {
          /* this list is not cleared in case of csv
          because if someone closes the popup without updaing audience,
          then all selections were getting cleared
        */
          this.$parent.$refs.audienceList.selectedAudience = {};
          this.$parent.$refs.audienceList.getEmployees();
          this.$parent.$refs.audienceList.allSelected = true;
          this.$parent.$refs.audienceList.update();
          // this.$parent.$refs.audienceList.totalAudienceCount = this.;
          // this.$parent.$refs.audienceList.toggleAll(true);
          if (source === 'existing_employees') {
            this.$parent.$refs.audienceList.showCheckBoxes = true;
            this.$parent.$refs.audienceList.showFilter = true;
          }
          this.closeModal();
        }
      });
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    reset () {
      document.getElementById('candidateUploader').value = '';
      this.rawCSV = [];
    },
    openFilePicker (type) {
      this.$refs[type].click();
    },
    filesChange (fileList) {
      if (!fileList.length) return;
      // this.isSaving = true;
      // this.isInitial = false;
      const that = this;
      if (fileList[0]) {
        PapaParse.parse(fileList[0], {
          complete (results) {
            if (results.data) {
              that.rawCSVName = fileList[0].name;
              that.rawCSV = results.data;
              that.mapFields();
              that.$parent.$refs.audienceList.selectedAudience = {};
            }
          }
        });
      }
    },
    mapFields () {
      setTimeout(() => {
        if (this.row.value.length > 0) {
          this.row.selected = this.rawCSV.indexOf(this.row.value);
        } else {
          this.row.value = this.rawCSV[this.row.selected];
        }
        const firstRow = this.row.value;
        this.headings = this.row.value;
        this.row.value = firstRow;
        this.mapHeadings = {
          first_name: {
            name: '',
            required: true,
            backend: 'First name',
            index: -1
          },
          last_name: {
            name: '',
            required: true,
            backend: 'Last name',
            index: -1
          },
          email: {
            name: '',
            required: false,
            backend: 'Email',
            index: -1
          },
          phone: {
            name: '',
            required: false,
            backend: 'Phone number',
            index: -1
          },
          gender: {
            name: '',
            required: false,
            backend: 'Gender',
            index: -1
          }
        };
        this.$lodash.each(firstRow, (v, k) => {
          if (this.mapHeadings[v.trim()]) {
            this.mapHeadings[v.trim()].name = v;
            this.mapHeadings[v.trim()].index = k;
          }
        });
        // this.getOnboardingPlans();
        // this.getProjects();
        this.e1 = 3;
        document.getElementById('candidateUploader').value = '';
      }, 200);
    },
    updateIndex (obj) {
      setTimeout(() => {
        /* eslint-disable no-param-reassign */
        obj.index = this.row.value.indexOf(obj.name);
        /* eslint-enable no-param-reassign */
      }, 100);
    },
    continueUploading () {
      let mappingCompleted = true;
      this.$lodash.each(this.mapHeadings, (h) => {
        if (!this.rawCSV[1][h.index]) {
          mappingCompleted = false;
        }
      });
      if (!mappingCompleted) {
        this.csvUploadStep = 2;
      } else {
        this.startUploading();
      }
    },
    startUploading () {
      if (this.$parent &&
        this.$parent.$refs &&
        this.$parent.$refs.audienceList &&
        this.$parent.$refs.audienceList) {
        this.$parent.$refs.audienceList.config.initialLoading = true;
      }
      let validationFlag = false;
      this.$lodash.each(this.mapHeadings, (v) => {
        if (v.index === -1 && v.required === true) {
          validationFlag = true;
        }
      });
      this.$lodash.each(this.mapHeadings, (v) => {
        if ((v.index === -1 && v.backend === 'Phone number') || (v.index === -1 && v.backend === 'Email')) {
          validationFlag = true;
        }
      });
      if (validationFlag) {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'You have to select the mandatory fields!'
        });
      } else {
        const formattedData = [];

        this.$lodash.each(this.rawCSV, (v, k) => {
          if (k !== this.row.selected) {
            const newEntry = {};
            this.$lodash.each(this.mapHeadings, (value, key) => {
              if (this.rawCSV[k] && value.index > -1 && this.rawCSV[k][value.index]) {
                newEntry[key] = this.rawCSV[k][value.index].trim();
                let temp = {};
                this.$lodash.each(this.customFields, (val) => {
                  const t = {
                    [val.backend]: this.rawCSV[1][val.index]
                  };
                  temp = {
                    ...temp,
                    ...t
                  };
                });
                newEntry.custom_field = temp;
              }
            });
            if (Object.keys(newEntry).length > 0) {
              formattedData.push(newEntry);
            }
            formattedData[formattedData.length - 1].index = formattedData.length;
          }
        });
        if (this.$parent &&
            this.$parent.$refs &&
            this.$parent.$refs.audienceList &&
            this.$parent.$refs.audienceList) {
          this.$parent.$refs.audienceList.config.initialLoading = false;
          // this.$parent.$refs.audienceList.table.headers = this.rawCSV[this.row.selected];
          this.$parent.$refs.audienceList.table.audience = formattedData;
          this.$parent.$refs.audienceList.table.loading = false;
          this.$parent.$refs.audienceList.table.totalAudienceCount = formattedData.length;
          this.$parent.$refs.audienceList.selectedAudience = {};
          this.$parent.$refs.audienceList.toggleAll(true);
          this.$parent.$refs.audienceList.showCheckBoxes = false;
          this.$parent.$refs.audienceList.showFilter = false;

          this.$parent.newCampaign.audience = formattedData;
          this.$parent.newCampaign.totalAudienceCount = formattedData.length;
        }
        // if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent) {
        //   this.$parent.$parent.$parent.audienceSource = source;
        // }
        this.csvUploadStep = 3;
        this.closeModal();
        // this.uploadStarted = true;
        // this.refreshing = true;
        // this.$http.post(`${process.env.API_URL}Candidate/BulkUpload`, {
        //   candidate_data: formattedData,
        // }).then((response) => {
        //   this.refreshing = false;
        //   if (response.data && response.data.status === 'Success') {
        //     this.$store.dispatch('updateSnackbar', {
        //       color: 'success',
        //       show: true,
        //       text: `Success: ${response.data.success_count},
      //          Failure: ${response.data.failure_count}`,
        //     });
        //     // this.dialog = false;
        //     this.e1 = 4;
        //     this.isInitial = true;
        //     this.isSaving = false;
        //     this.getCandidates();
        //     this.selected.project = null;
        //     this.success_count = response.data.success_count;
        //     this.failure_count = response.data.failure_count;
        //     this.success_list = response.data.success_list;
        //     this.failure_list = response.data.failure_list;
        //   } else {
        //     this.$store.dispatch('updateSnackbar', {
        //       color: 'error',
        //       show: true,
        //       text: 'Unable to upload candidates, Please try again later!',
        //     });
        //   }
        // }, (response) => {
        //   this.$store.dispatch('updateSnackbar', {
        //     color: 'error',
        //     show: true,
        //     text: 'Unable to upload candidates, Please try again later!',
        //   });
        //   throw new Error(response.body);
        // });
      }
    },
    closeModal () {
      if (this.$parent) {
        this.$parent.audienceSource = this.audienceSource;
      }
      // if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent) {
      //   this.$parent.$parent.$parent.audienceSource = this.audienceSource;
      // }
      this.open = false;
      this.audienceSource = null;
    }
  },
  watch: {
  },
  created () {
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hover-link:hover {
  color:#4c3e9d !important
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
  margin-top: 120px;
  position: absolute;
  left: -21px;
}
.difm-menu-split {
  height: 300px;
  float: left;
  margin-left: 63px;
  border-left: 1px solid #D0D2D3;
  margin-top: -18px;
  position: relative;
  left:15%;
}
.audience-cards {
  height: 250px;
  max-height: 250px;
  position: relative;
  top: 12%;
  .v-card {
    height: 100%;
    h2 {
      margin-top: 5%
    }
  }
}

.v-stepper__step__step {
  &.primary {
    background-color: #4c3e9d!important;
    border-color: #4c3e9d!important;
  }
}

.close-button {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid white;
  &:hover {
    border: 1px solid red;
  }
}
.custom-upload {
  border: none !important;
  content: "Drop your file here or select a file to Upload";
  width: 100%;
  font-size: 20px;
  line-height: 4.5;
  border: 0px;
  text-align: center;
}
.custom-button {
  position: relative;
  top: -160px;
  left: 47%;
}
.custom-h3 {
  position: relative;
  top: -150px;
  left: 42%;
}
.custom-btn {
  position: relative;
  top: -150px;
  left: 41%;
}
.csv-table {
  th {
    padding-right: 20px;
  }
  td {
    padding-right: 20px;
  }
}
</style>
