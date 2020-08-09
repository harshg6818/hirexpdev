<template>
  <div class="single-emp-profile-wrap">
    <v-container fluid class="pa-0">
      <v-layout>
        <v-flex xs4 class="left-column">
          <v-container fluid class="pa-0">
            <v-layout column>
              <v-flex xs12>
                <div class="profile-heading">
                  Personal details
                </div>
              </v-flex>
              <v-flex xs12>
                <v-container fluid class="py-0" style="
                  position: relative;
                  height: 220px;
                  width: 100%;
                  justify-content: space-around;
                  display: flex;"
                >
                  <v-avatar size="200" color="grey lighten-4">
                    <input
                      type="file"
                      name="picUploader"
                      ref="picUploader"
                      id="empPicUploader"
                      @change="filesChange($event.target.files);"
                      accept="image/*" style="display: none;"
                    >
                    <v-layout
                      slot="placeholder"
                      @click="openFilePicker('picUploader')"
                      class="cursor-pointer"
                      align-center
                      justify-center
                      ma-0
                    >
                    <v-img v-if="picPreview"
                      max-height="200"
                      max-width="200"
                      contain
                      :src="picPreview"
                      aspect-ratio="1"
                    ></v-img>
                    <span v-else>
                      <v-icon class="mr-2">fas fa-upload</v-icon>
                      <span>Upload new picture</span>
                    </span>
                    </v-layout>
                  </v-avatar>
                </v-container>
              </v-flex>
              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-text-field
                    v-model="activeEmployee.employee_id"
                    placeholder="Employee Id"
                    solo
                  ></v-text-field>
                </v-container>
              </v-flex>
              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-text-field
                    placeholder="First Name"
                    v-model="activeEmployee.first_name"
                    solo
                  ></v-text-field>
                </v-container>
              </v-flex>
              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-text-field
                    placeholder="Last Name"
                    v-model="activeEmployee.last_name"
                    solo
                  ></v-text-field>
                </v-container>
              </v-flex>
              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-text-field
                    placeholder="Email"
                    v-model="activeEmployee.email"
                    solo
                  ></v-text-field>
                </v-container>
              </v-flex>
              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-text-field
                    placeholder="Alternate Email"
                    solo
                    v-model="activeEmployee.alternateEmail"
                  ></v-text-field>
                </v-container>
              </v-flex>
              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-text-field
                    placeholder="Phone"
                    v-model="activeEmployee.phoneNumber"
                    solo
                  ></v-text-field>
                </v-container>
              </v-flex>
              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-text-field
                    placeholder="Gender"
                    v-model="activeEmployee.gender"
                    solo
                  ></v-text-field>
                </v-container>
              </v-flex>
              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-text-field
                    placeholder="Education"
                    solo
                  ></v-text-field>
                </v-container>
              </v-flex>
              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-text-field
                    placeholder="Birth Date"
                    solo
                  ></v-text-field>
                </v-container>
              </v-flex>
              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-text-field
                    placeholder="Skills"
                    solo
                  ></v-text-field>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <!-- second column -->
        <v-flex xs8 class="right-column">
          <v-container fluid class="pa-0">
            <v-layout column>
              <v-flex xs12>
                <div class="profile-heading">
                  Employment details
                </div>
              </v-flex>

              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-layout>
                    <v-flex xs6 class="pr-2">
                      <v-text-field
                        placeholder="Location"
                        v-model="activeEmployee.location"
                        solo
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="pl-2">
                      <v-text-field
                        placeholder="Department"
                        v-model="activeEmployee.department"
                        solo
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>

              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-layout row>
                    <v-flex xs6 class="pr-2">
                      <v-menu
                        v-model="joinDateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            placeholder="Joining date"
                            solo
                            v-model="joinDate"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="joinDate" @input="joinDateMenu = false">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs6 class="pl-2">
                      <v-text-field
                        placeholder="Sub Department"
                        solo
                        v-model="activeEmployee.sub_department"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>

              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-layout>
                    <v-flex xs6 class="pr-2">
                      <v-text-field
                        placeholder="Experience"
                        solo
                        v-model="activeEmployee.experience"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="pl-2">
                      <v-text-field
                        placeholder="Business"
                        solo
                        v-model="activeEmployee.business"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>

              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-layout>
                    <v-flex xs6 class="pr-2">
                      <v-text-field
                        placeholder="Team"
                        solo
                        v-model="activeEmployee.team"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="pl-2">
                      <v-text-field
                        placeholder="Business Head"
                        solo
                        v-model="activeEmployee.businessHead"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>

              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-layout>
                    <v-flex xs6 class="pr-2">
                      <v-text-field
                        placeholder="Team Head"
                        solo
                        v-model="activeEmployee.teamHead"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="pl-2">
                      <v-text-field
                        placeholder="Manager"
                        solo
                        v-model="activeEmployee.manager"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>

              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-layout>
                    <v-flex xs6 class="pr-2">
                      <v-text-field
                        placeholder="Last Rating"
                        solo
                        v-model="activeEmployee.lastRating"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="pl-2">
                      <v-text-field
                        placeholder="Function"
                        solo
                        v-model="activeEmployee.function"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>

              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-layout>
                    <v-flex xs6 class="pr-2">
                      <v-text-field
                        placeholder="HR Manager"
                        solo
                        v-model="activeEmployee.hr_manager"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="pl-2">
                      <v-text-field
                        placeholder="Site"
                        solo
                        v-model="activeEmployee.site"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>

              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-layout>
                    <v-flex xs6 class="pr-2">
                      <v-text-field
                        placeholder="Grade"
                        solo
                        v-model="activeEmployee.grade"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="pl-2">
                      <v-text-field
                        placeholder="Cluster"
                        solo
                        v-model="activeEmployee.cluster"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>

              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-layout row>
                    <v-flex xs6 class="pr-2">
                      <v-text-field
                        placeholder="Cost Center"
                        solo
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="pl-2">
                      <v-menu
                        v-model="exitDateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            placeholder="Exit date"
                            solo
                            v-model="exitDate"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="exitDate" @input="exitDateMenu = false">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>

              <v-flex xs12>
                <v-container fluid class="py-0">
                  <v-layout row>
                    <v-flex xs6 class="pr-2">
                      <v-btn color="primary"
                        @click="updateUser()"
                      >
                        <v-icon class="mr-2">fas fa-save</v-icon>&nbsp;Save
                      </v-btn>
                    </v-flex>
                    <v-flex xs6 class="pl-2">
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// import { VAvatar } from 'vuetify';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'SingleEmployeeProfile',

  // components: {
  //   VAvatar
  // },

  data () {
    return {
      joinDateMenu: false,
      joinDate: '',
      exitDateMenu: false,
      exitDate: '',
      picPreview: ''
    };
  },

  computed: {
    ...mapState({
      user: state => state.user,
      activeEmployee: state => state.activeEmployee,
      singleEmpView: state => state.singleEmpView
    })
  },

  watch: {
    activeEmployee: {
      immediate: true,
      deep: true,
      handler () {
        if (this.activeEmployee.joining_date) {
          this.joinDate = new Date(this.activeEmployee.joining_date).toISOString().substr(0, 10);
        }
        if (this.activeEmployee.exit_date) {
          this.exitDate = new Date(this.activeEmployee.exit_date).toISOString().substr(0, 10);
        }
      }
    }
  },

  methods: {
    filesChange (fileList) {
      if (!fileList.length) return;

      if (fileList[0]) {
        // console.log('fileList[0]', fileList);
        this.picPreview = URL.createObjectURL(fileList[0]);
        // eslint-disable-next-line prefer-destructuring
        this.newPic = fileList[0];
      }
    },
    openFilePicker (type) {
      this.$refs[type].click();
    },
    updateUser () {
      const formData = new FormData();
      this.$lodash.each(this.activeEmployee, (v, k) => {
        if ((v || v === '') && v !== 'None') {
          // if (v !== this.userCopy[k]) {
          formData.append(k, v);
          // }
        }
      });
      axios.patch(`${process.env.VUE_APP_API_URL}users/update/${this.activeEmployee.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        if (response.data && response.data.status === 200) {
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Details updated successfully!'
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.single-emp-profile-wrap {
  padding: 50px 0;
  .left-column {
    .profile-heading {
      padding: 18px;
      font-size: 24px;
      color: #6f64b0;
    }
    background: #ffffff;
    border-radius: 25px;
    margin: 0 20px;
  }
  .right-column {
    .profile-heading {
      padding: 18px;
      font-size: 24px;
      color: #6f64b0;
    }
    background: #ffffff;
    border-radius: 25px;
    margin: 0 20px;
  }
}
</style>
<style lang="scss">
.single-emp-profile-wrap {
  .v-input {
    .v-input__slot {
      border: 1px solid rgba(0,0,0,0.15) !important;
      box-shadow: none !important;
    }
  }
}
</style>
