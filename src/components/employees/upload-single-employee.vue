<template>
  <v-dialog
      v-model="open"
      width="700"
    >

    <v-card>
      <v-card-title
        class="headline"
        primary-title
      >
        Upload Employee
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-layout row wrap>
          <v-flex xs6 px-2>
            <v-text-field
              maxlength="300"
              v-model="candidate.first_name"
              class="elevation-0 grey--text text--lighten-2"
              name="first_name"
              :error-messages="errors.collect('first_name')"
              label="First Name *"
              autofocus
              data-vv-as="first name"
              v-validate="'required'"
              outline
            >
            </v-text-field>
          </v-flex>
          <v-flex xs6 px-2>
            <v-text-field
              maxlength="300"
              v-model="candidate.last_name"
              class="elevation-0 grey--text text--lighten-2"
              name="last_name"
              :error-messages="errors.collect('last_name')"
              label="Last Name *"
              data-vv-as="last name"
              v-validate="'required'"
              outline
            >
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs6 px-2>
            <v-text-field
              maxlength="300"
              v-model="candidate.email"
              class="elevation-0 grey--text text--lighten-2"
              name="email"
              :error-messages="errors.collect('email')"
              label="Email *"
              data-vv-as="email"
              v-validate="'required'"
              outline
            >
            </v-text-field>
          </v-flex>
          <v-flex xs6 px-2>
            <v-text-field
              maxlength="300"
              v-model="candidate.phoneNumber"
              class="elevation-0 grey--text text--lighten-2"
              name="phone"
              :error-messages="errors.collect('phone')"
              label="Phone Number"
              data-vv-as="phone number"
              outline
            >
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs6 px-2>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="candidate.joining_date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                name="joining_date"
                slot="activator"
                v-model="candidate.joining_date"
                :error-messages="errors.collect('joining_date')"
                label="Pick Joining Date *"
                data-vv-as="joining date"
                class="elevation-0 grey--text text--lighten-2"
                v-validate="'required'"
                outline
                readonly
              ></v-text-field>
              <v-date-picker v-model="candidate.joining_date"
              @input="$refs.menu.save(candidate.joining_date)"></v-date-picker>

            </v-menu>
          </v-flex>
          <v-flex xs6 px-2>
            <v-select
              :items="list.gender"
              v-model="candidate.gender"
              name="gender"
              :error-messages="errors.collect('gender')"
              label="Gender *"
              item-text="title"
              v-validate="'required'"
              class="elevation-0 grey--text text--lighten-2"
              outline
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs6 px-2>
            <v-text-field
              maxlength="300"
              v-model="candidate.employee_id"
              :error-messages="errors.collect('employee_id')"
              class="elevation-0 grey--text text--lighten-2"
              name="employee_id"
              label="Employee ID *"
              v-validate="'required'"
              outline
            >
            </v-text-field>
          </v-flex>

          <v-flex xs6 px-2>
            <v-text-field
              maxlength="300"
              v-model="candidate.hr_manager"
              class="elevation-0 grey--text text--lighten-2"
              name="hr_manager"
              label="HR Manager Email"
              data-vv-as="email"
              outline
            >
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs6 px-2>
            <v-text-field
              maxlength="300"
              v-model="candidate.location"
              class="elevation-0 grey--text text--lighten-2"
              name="location"
              label="Location"
              data-vv-as="location"
              outline
            >
            </v-text-field>
          </v-flex>
          <v-flex xs6 px-2>
            <v-text-field
              maxlength="300"
              v-model="candidate.department"
              class="elevation-0 grey--text text--lighten-2"
              name="department"
              label="Department"
              data-vv-as="department"
              outline
            >
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-expansion-panel popout>
          <v-expansion-panel-content>
            <div slot="header" class="text-capitalize">All Fields</div>
            <v-card>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs6 px-2>
                    <v-menu
                      ref="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="candidate.birthDate"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="candidate.birthDate"
                        label="Pick Birth Date"
                        class="elevation-0 grey--text text--lighten-2"
                        outline
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="candidate.birthDate"
                      @input="$refs.menu1.save(candidate.birthDate)"></v-date-picker>

                    </v-menu>
                  </v-flex>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.alternateEmail"
                      class="elevation-0 grey--text text--lighten-2"
                      name="alternateEmail"
                      label="Alternate Email"
                      outline
                      data-vv-as="email"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.education"
                      class="elevation-0 grey--text text--lighten-2"
                      name="education"
                      label="Education"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.experience"
                      class="elevation-0 grey--text text--lighten-2"
                      name="experience"
                      label="Experience"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.skills"
                      class="elevation-0 grey--text text--lighten-2"
                      name="skills"
                      label="Skills"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.designation"
                      class="elevation-0 grey--text text--lighten-2"
                      name="designation"
                      label="Designation"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.grade"
                      class="elevation-0 grey--text text--lighten-2"
                      name="grade"
                      label="Grade"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.sub_department"
                      class="elevation-0 grey--text text--lighten-2"
                      name="sub_department"
                      label="Sub Department"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.manager"
                      class="elevation-0 grey--text text--lighten-2"
                      name="manager"
                      label="Manager"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.function"
                      class="elevation-0 grey--text text--lighten-2"
                      name="function"
                      label="Function"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.team"
                      class="elevation-0 grey--text text--lighten-2"
                      name="team"
                      label="Team"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.teamHead"
                      class="elevation-0 grey--text text--lighten-2"
                      name="teamHead"
                      label="Team Head"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.business"
                      class="elevation-0 grey--text text--lighten-2"
                      name="business"
                      label="Business"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.businessHead"
                      class="elevation-0 grey--text text--lighten-2"
                      name="businessHead"
                      label="Business Head"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.hrbp"
                      class="elevation-0 grey--text text--lighten-2"
                      name="hrbp"
                      label="HR Business Partner Email"
                      data-vv-as="email"
                      outline
                    >
                    </v-text-field>
                  </v-flex>

                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.site"
                      class="elevation-0 grey--text text--lighten-2"
                      name="site"
                      label="Site"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.cost_centre"
                      class="elevation-0 grey--text text--lighten-2"
                      name="cost_centre"
                      label="Cost Centre"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs6 px-2>
                    <v-text-field
                      maxlength="300"
                      v-model="candidate.cluster"
                      class="elevation-0 grey--text text--lighten-2"
                      name="cluster"
                      label="Cluster"
                      outline
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>

              <v-layout row wrap>
                <v-flex xs6 px-2>
                  <v-select
                    :items="list.hiPos"
                    v-model="candidate.high_potential_emp"
                    name="gender"
                    label="HiPos"
                    item-text="title"
                    class="elevation-0 grey--text text--lighten-2"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          color="error"
          flat
          @click="closeDialog"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="white--text"
          @click="validateAll()"
        >
          Upload
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';

export default {
  name: 'UploadSingleEmployee',
  // components: {
  //   ContentLoader
  // },
  data () {
    return {
      open: false,
      list: {
        gender: [{
          title: 'Male',
          value: 'male'
        }, {
          title: 'Female',
          value: 'female'
        }, {
          title: 'Other',
          value: 'other'
        }, {
          title: 'Not Disclosed',
          value: 'notDisclosed'
        }],
        types: [{
          title: 'Manager',
          value: 'manager'
        }, {
          title: 'Team Employee',
          value: 'staff'
        }],
        hiPos: [
          {
            title: 'True',
            value: 1
          },
          {
            title: 'False',
            value: 0
          }
        ]
      },
      candidate: {
        first_name: '',
        last_name: '',
        email: '',
        phoneNumber: '',
        type: 'staff',
        sub_type: 'staff',
        gender: ''
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    validateAll () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.save();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Fields necessary, Please resolve all the errors!'
          });
        }
      });
    },
    save () {
      axios.post(`${process.env.VUE_APP_API_URL}users/bulk_add`, {
        user_data: [this.candidate]
      }).then((response) => {
        this.refreshing = false;
        if (response && response.data && response.data.status === 200 &&
        (!response.data.Failed_list || response.data.Failed_list.length === 0)) {
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee Uploaded!'
          });
          this.open = false;
          this.closeDialog();
        } else if (response.data.Failed_list && response.data.Failed_list.length > 0) {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: response.data.Failed_list[0].validation_error
          });
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to upload candidate, Please try again later!'
          });
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to upload candidate, Please try again later!'
        });
        throw new Error(response);
      });
    },
    closeDialog () {
      this.candidate = {
        first_name: '',
        last_name: '',
        email: '',
        phoneNumber: '',
        type: 'staff',
        sub_type: 'staff',
        gender: ''
      };
      this.errors.clear();
      this.open = false;
    }
  },
  beforeMount () {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
