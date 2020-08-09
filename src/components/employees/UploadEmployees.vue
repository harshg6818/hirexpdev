<template>
  <div class="">
    <v-layout column class="hide-overflow">
      <v-toolbar
        color="bg-gradient toolbar"
        light
        extended
      >
        <v-btn small flat icon class="elevation-0" @click="$router.go(-1)">
          <v-icon small>fas fa-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title class="subheading font-weight-bold">Upload Employees</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn color="white" flat
            @click="config.activeStep = config.activeStep - 1"
            :loading="config.refreshing"
            :disabled="config.refreshing"
            v-show="config.activeStep > 1"
          >
            Back
          </v-btn>

          <v-btn color="success" large class="elevation-0"
          @click="startUploading();"
          :loading="config.refreshing"
          :disabled="config.refreshing"
          v-show="config.activeStep == 2">Start uploading</v-btn>
        </v-toolbar-items>

        <v-stepper v-model="config.activeStep" light class="elevation-0 w-100 amara-stepper" slot="extension">
          <v-stepper-header>
            <v-stepper-step :complete="config.activeStep > 1" step="1">Choose file</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="config.activeStep > 2" step="2">Map Fields</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Uploading status</v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex>
          <v-stepper v-model="config.activeStep">
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-layout row wrap class="mb-3" align-center>
                  <v-flex class="text-xs-center px-3 text-xs-center">
                    <h3 class="mb-3">Select file to upload</h3>
                    <v-btn class="mb-3 white--text" color="primary" @click="openFilePicker('employeeUploader')">
                      <v-icon class="mr-2">fas fa-upload</v-icon> Upload employees
                      <input type="file" name="employeeUploader" ref="employeeUploader"
                      id="employeeUploader" @change="filesChange($event.target.files);"
                      accept=".csv,
                      application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                      application/vnd.ms-excel" style="display: none;">
                    </v-btn>
                    <h5 color="success" class="text-sm-center mb-5 pb-5">
                      <a href="https://amara-internal.s3.ap-south-1.amazonaws.com/amara-sample-data.csv" target="_blank" download="sample.csv">
                        Download Sample CSV
                      </a>
                    </h5>
                    <h4 class=" mb-3 mt-5 pt-5"> <b> NOTE :  </b>
                      <span class="red--text"> These fields are mandatory. </span>
                    </h4>
                    <h4 class="">
                      First name, Last name, Email, Department, Phone, Joining date
                    </h4>
                  </v-flex>
                </v-layout>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-layout row wrap class="mb-3">
                  <v-flex sm6 class="pr-5">
                    <v-select
                      v-model="row.value"
                      label="Selected row"
                      single-line
                      class="mb-3 selected-row map-fields"
                      :items="rawCSV"
                      @change="mapFields()"
                      >
                    </v-select>

                    <table class="table b-table table-hover" style="width: 100%;">
                      <thead class="">
                        <tr class="text-xs-left">
                          <th class="">Field required</th>
                          <th class="">Field from CSV</th>
                        </tr>
                      </thead>
                      <tbody class="">
                        <tr v-for="(h, hi) in config.mapHeadings" :key="hi">
                          <td class="text-left">
                            {{h.backend}}
                            <span class="text-danger" v-show="h.required">*</span>
                          </td>
                          <td>
                            <!-- <v-select
                              v-model="h.name"
                              label="Selected field"
                              single-line
                              :items="config.headings"
                              item-value="id"
                              @change="updateIndex(h)"
                              > -->
                              <v-select
                                v-model="h.name"
                                label="--Please choose an option--"
                                single-line
                                :items="getHeadings"
                                item-value="id"
                                @change="updateIndex(h)"
                              >
                              <!-- <template slot="prepend-item">
                                <div role="listitem" @click="onClickSelectOptionBlank(h)">
                                  <a class="v-list__tile v-list__tile--link theme--light">
                                    <div class="v-list__tile__content">
                                      <div class="v-list__tile__title">
                                        --Please choose an option--
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </template> -->
                            </v-select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </v-flex>
                  <v-flex class="pl-5 b-left" sm6>
                    <table class="table">
                      <thead class="text-xs-left">
                        <tr>
                          <th>Employee ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Joining Date</th>
                          <th>Department</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(c, ci) in rawCSV" v-show="ci !== row.selected" :key="ci">
                          <td v-if="config.mapHeadings.employee_id">
                            {{c[config.mapHeadings.employee_id.index]}}
                          </td>
                          <td v-if="config.mapHeadings.first_name
                          && config.mapHeadings.last_name"
                          >
                            {{c[config.mapHeadings.first_name.index]}}
                            {{c[config.mapHeadings.last_name.index]}}
                          </td>
                          <td v-if="config.mapHeadings.email">
                            {{c[config.mapHeadings.email.index]}}
                          </td>
                          <td v-if="config.mapHeadings.phoneNumber">
                            {{c[config.mapHeadings.phoneNumber.index]}}
                          </td>
                          <td v-if="config.mapHeadings.joining_date">
                            {{c[config.mapHeadings.joining_date.index]}}
                          </td>
                          <td v-if="config.mapHeadings.department">
                            {{c[config.mapHeadings.department.index]}}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex class="text-xs-center">
                    <v-btn flat color="default" @click="config.activeStep = 1"
                    :loading="config.refreshing"
                    :disabled="config.refreshing">Back</v-btn>
                    <v-btn
                      class="elevation-0"
                      color="success"
                      @click="startUploading()"
                      :loading="config.refreshing"
                      :disabled="config.refreshing"
                      >
                      Start uploading
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-layout row wrap class="mb-3" v-show="status.failure_list.length > 0">
                  <v-flex class="pl-5" sm12>
                    <table class="table">
                      <thead class="text-xs-left">
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Failure Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(c, ci) in status.failure_list" :key="ci">
                          <td>{{c["first_name"]}} {{c["last_name"]}} </td>
                          <td>{{c["email"]}}</td>
                          <td>{{c["phoneNumber"]}}</td>
                          <td class="red--text">{{c["validation_error"]}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3" v-show="status.failure_list.length === 0">
                  <v-flex class="pl-5">
                    All employees uploaded successfully!
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex class="text-xs-center">
                    <v-btn color="default"
                    v-show="status.failure_list.length > 0"
                    flat
                    @click="config.activeStep = 2"
                    >Back</v-btn>
                    <v-btn color="success" class="elevation-0" to="/employees"
                    :loading="config.refreshing" :disabled="config.refreshing">
                      Finish
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
import PapaParse from 'papaparse';

export default {
  name: 'uploadEmployees',
  // components: {
  //   ContentLoader,
  // },
  data () {
    return {
      config: {
        activeStep: 1,
        refreshing: false,
        headings: [],
        mapHeadings: {
          employee_id: {
            name: '',
            required: true,
            backend: 'Employee ID',
            index: -1
          },
          first_name: {
            name: '',
            required: true,
            backend: 'Employee first name',
            index: -1
          },
          last_name: {
            name: '',
            required: true,
            backend: 'Employee last name',
            index: -1
          },
          email: {
            name: '',
            required: true,
            backend: 'Employee email',
            index: -1
          },
          phoneNumber: {
            name: '',
            required: false,
            backend: 'Employee phone number',
            index: -1
          },
          joining_date: {
            name: '',
            required: true,
            backend: 'Joining date',
            index: -1
          },
          department: {
            name: '',
            required: true,
            backend: 'Department',
            index: -1
          },
          gender: {
            name: '',
            required: true,
            backend: 'Gender',
            index: -1
          },
          location: {
            name: '',
            required: false,
            backend: 'Location',
            index: -1
          },
          birthDate: {
            name: '',
            required: false,
            backend: 'Birth date',
            index: -1
          },
          alternateEmail: {
            name: '',
            required: false,
            backend: 'Alternate Email',
            index: -1
          },
          profilePicture: {
            name: '',
            required: false,
            backend: 'Profile picture',
            index: -1
          },
          education: {
            name: '',
            required: false,
            backend: 'Education',
            index: -1
          },
          experience: {
            name: '',
            required: false,
            backend: 'Experience',
            index: -1
          },
          skills: {
            name: '',
            required: false,
            backend: 'Skills',
            index: -1
          },
          designation: {
            name: '',
            required: false,
            backend: 'Designation',
            index: -1
          },
          grade: {
            name: '',
            required: false,
            backend: 'Grade',
            index: -1
          },
          // department: {
          //   name: '',
          //   required: false,
          //   backend: 'Department',
          //   index: -1
          // },
          sub_department: {
            name: '',
            required: false,
            backend: 'Sub Department',
            index: -1
          },
          manager: {
            name: '',
            required: false,
            backend: 'Manager',
            index: -1
          },
          hr_manager: {
            name: '',
            required: false,
            backend: 'HR Manager',
            index: -1
          },
          function: {
            name: '',
            required: false,
            backend: 'Function',
            index: -1
          },
          team: {
            name: '',
            required: false,
            backend: 'Team',
            index: -1
          },
          teamHead: {
            name: '',
            required: false,
            backend: 'Team Head',
            index: -1
          },
          business: {
            name: '',
            required: false,
            backend: 'Business',
            index: -1
          },
          businessHead: {
            name: '',
            required: false,
            backend: 'Business Head',
            index: -1
          },
          hrbp: {
            name: '',
            required: false,
            backend: 'HR Business Partner',
            index: -1
          },
          shiftStartTime: {
            name: '',
            required: false,
            backend: 'Shift Start Time',
            index: -1
          },
          shiftEndTime: {
            name: '',
            required: false,
            backend: 'Shift End Time',
            index: -1
          },
          site: {
            name: '',
            required: false,
            backend: 'Site',
            index: -1
          },
          cost_centre: {
            name: '',
            required: false,
            backend: 'Cost Centre',
            index: -1
          },
          cluster: {
            name: '',
            required: false,
            backend: 'Cluster',
            index: -1
          },
          high_potential_emp: {
            name: '',
            required: false,
            backend: 'HiPos',
            index: -1
          }
        }
      },
      row: {
        value: [],
        selected: 0
      },
      rawCSV: [],
      status: {
        failure_list: []
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    getHeadings () {
      const temp = this.config.headings;
      temp.unshift('--Please choose an option--');
      return temp;
    }
  },
  methods: {
    onClickSelectOptionBlank (idx) {
      // const tempRef = `mapHeadingSelect${idx.backend}`;
      // console.log('mapHeadingSelect${h.backend}', this.$refs);
      let key = '';
      Object.keys(this.config.mapHeadings).forEach((val) => {
        if (this.config.mapHeadings[val].backend === idx.backend) {
          key = val;
        }
      });
      this.config.mapHeadings[key].name = '';
      this.config.mapHeadings[key].index = -1;
    },
    getFileURL (pet) {
      const images = require.context('@/assets/', false, /\.csv$/);
      return images(`./${pet}.csv`);
    },
    openFilePicker (type) {
      this.$refs[type].click();
    },
    updateIndex (obj) {
      console.log('obj', obj);
      // console.log('updateIndex -> obj', obj);
      if (obj.name === '--Please choose an option--') {
        this.onClickSelectOptionBlank(obj);
      }
      setTimeout(() => {
        /* eslint-disable no-param-reassign */
        obj.index = this.row.value.indexOf(obj.name) - 1;
        /* eslint-enable no-param-reassign */
      }, 100);
    },
    filesChange (fileList) {
      if (!fileList.length) return;

      const that = this;
      if (fileList[0]) {
        PapaParse.parse(fileList[0], {
          complete (results) {
            if (results.data) {
              that.rawCSV = results.data;
              that.mapFields();
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
        this.config.headings = this.row.value;
        this.row.value = firstRow;
        this.$lodash.each(firstRow, (v, k) => {
          // console.log('firstRow', v.trim());
          if (this.config.mapHeadings[v.trim()]) {
            // console.log('firstRow', this.config.mapHeadings[v.trim()].name);
            this.config.mapHeadings[v.trim()].name = v;
            this.config.mapHeadings[v.trim()].index = k;
          }
        });
        this.config.activeStep = 2;
        document.getElementById('employeeUploader').value = '';
      }, 200);
    },
    startUploading () {
      let validationFlag = false;
      this.$lodash.each(this.config.mapHeadings, (v) => {
        if (v.index === -1 && v.required === true) {
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
            this.$lodash.each(this.config.mapHeadings, (value, key) => {
              if (this.rawCSV[k] && value.index > -1 && this.rawCSV[k][value.index]) {
                newEntry[key] = this.rawCSV[k][value.index].trim();
              }
            });
            if (Object.keys(newEntry).length > 0) {
              newEntry.type = 'staff';
              newEntry.sub_type = 'staff';
              formattedData.push(newEntry);
            }
          }
        });
        this.config.uploadStarted = true;
        this.config.refreshing = true;
        axios.post(`${process.env.VUE_APP_API_URL}users/bulk_add`, {
          user_data: formattedData
        }).then((response) => {
          this.config.refreshing = false;
          if (response.data && response.data.status === 200) {
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: response.data.message
            });
            this.config.activeStep = 3;
            this.status.failure_list = response.data.Failed_list;
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to upload candidates, Please try again later!'
            });
          }
        }, (response) => {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to upload candidates, Please try again later!'
          });
          throw new Error(response);
        });
      }
    }
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// .amara-stepper {
//   .v-stepper__step__step {
//     &.primary {
//       background-color: #37b99c !important;
//       border-color: #37b99c !important;
//     }
//   }
// }
.map-fields {
  .v-select__selections {
    width: 100%;
  }
}
.selected-row {
  .v-input__control {
    .v-input__slot {
      .v-select__slot {
        max-width: 100%!important;
        .v-select__selection {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
