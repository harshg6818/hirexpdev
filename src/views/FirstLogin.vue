<template lang="html">
  <div class="first-login-bg">
    <v-snackbar
      :timeout="6000"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :vertical="snackbar.mode === 'vertical'"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <div v-if="user !== null">
      <v-layout align-v="center" align-h="center">
        <v-flex align-self="center" xs6 offset-xs3 v-if="true">
        <!-- <v-flex align-self="center" xs6 offset-xs3 v-if="!launchDashboard && !nextPage"> -->
          <v-card>
            <v-card-text class="text-xs-center">
              <p class="text-center">
                <img v-if="user.company_logo" :src="user.company_logo" class="logo" />
                <img v-if="!user.company_logo" src="@/assets/logo/amara_logo.png" class="logo" />
              </p>
              <v-layout class="mt-2 mb-4">
                <v-flex>
                  <v-text-field
                    single-line
                    type="password"
                    name="old_password"
                    v-model="password.old" disabled
                    label="Old password"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout class="mt-2 mb-4">
                <v-flex>
                  <v-text-field
                    single-line
                    type="password"
                    name="new_password"
                    maxlength="35"
                    v-model='password.new'
                    data-vv-as="new password"
                    label="New password"
                  ></v-text-field>
                  <small v-show="new_password1" class="invalid-feedback cj-error text-xs-left red--text">{{new_password1}}</small>
                </v-flex>
              </v-layout>
              <v-layout class="mt-2 mb-4">
                <v-flex>
                  <v-text-field
                    single-line
                    type="password"
                    name="confirm_password"
                    maxlength="35"
                    v-model='password.confirm'
                    data-vv-as="confirm password"
                    label="Confirm password"
                  ></v-text-field>
                  <small v-show="new_password2" class="invalid-feedback cj-error text-xs-left red--text">{{new_password2}}</small>
                </v-flex>
              </v-layout>
              <p class="text-xs-center">
                <v-btn color="primary" :disabled="refreshing" :loading="refreshing" @click="changePassword();">Update password</v-btn>
              </p>
              <small class="text-muted">
                <strong>Note: </strong>Password minimum length should be 8 character, should be a mix of alphanumeric characters, dissimilar to your username and should be a strong password.
                <!-- <strong>Note: </strong>Password minimum length should be 8 character, should not be entirely numeric, should not be similar to username and should not be a common weak password.</span> -->
              </small>
            </v-card-text>
          </v-card>
        </v-flex>
        <!-- <v-flex align-self="center" cols="5"> -->
        <v-flex align-self="center" cols="5" v-if="false">
          <!-- <v-flex align-self="center" cols="5" v-if="!launchDashboard && nextPage"> -->
          <v-card>
            <v-card-text>
              <p class="text-center">
                <img class="logo" v-if="user.company_logo" :src="user.company_logo" />
                <img class="logo" v-if="!user.company_logo" src="https://www.hirexp.com/img/hirexp-avatar.jpg" />
              </p>
              <v-layout row wrap>
                <v-flex text-xs-center>
                  <v-avatar
                    class="pa-2"
                    v-if="config.picPreview"
                    size="100"
                    color="grey lighten-4"
                  >
                    <v-img
                      v-if="config.picPreview"
                      contain
                      :src="config.picPreview"
                      aspect-ratio="1"
                      class="grey lighten-2"
                    >

                      <v-layout
                        slot="placeholder"
                        fill-height
                        align-center
                        justify-center
                        ma-0
                      >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </v-img>
                  </v-avatar>
                  <v-avatar
                    v-if="!config.picPreview"
                    size="100"
                    color="grey lighten-4"
                  >
                    <input type="file" name="picUploader" ref="picUploader"
                      id="picUploader" @change="filesChange($event.target.files);"
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
                      <v-icon class="mr-2">fas fa-upload</v-icon>
                      <span v-show="!config.picPreview">Upload new picture</span>
                      <span v-show="config.picPreview">Image selected<br> Save to update</span>
                      <span></span>
                    </v-layout>
                  </v-avatar>
                </v-flex>
              </v-layout>
              <v-layout align-v='center'>
                <v-flex class="px-1">
                  <v-text-field
                    maxlength="300"
                    v-model="user.first_name"
                    class="elevation-0 grey--text text--lighten-2"
                    name="last_name"
                    :error-messages="errors.collect('first_name')"
                    label="First Name *"
                    data-vv-as="first name"
                    v-validate="'required'"
                    outline
                  >
                  </v-text-field>
                </v-flex>
                <v-flex class="px-1">
                  <v-text-field
                    maxlength="300"
                    v-model="user.last_name"
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
              <v-layout>
                <v-flex class="px-1">
                  <v-text-field
                    maxlength="300"
                    v-model="user.phoneNumber"
                    class="elevation-0 grey--text text--lighten-2"
                    name="phone"
                    :error-messages="errors.collect('phone')"
                    label="Phone Number *"
                    data-vv-as="phone number"
                    v-validate="'required'"
                    outline
                  >
                  </v-text-field>
                </v-flex>
                <!-- <v-flex xs6 class="text-center mt-4">
                  <img v-if='!user.profile_picture' thumbnail rounded='square' center src="https://www.hirexp.com/img/hirexp-avatar.jpg"  class="sidebar-profile" fluid alt="Profile image" />
                  <img v-if='user.profile_picture' thumbnail rounded='square' center :src="user.profile_picture"  class="sidebar-profile" fluid alt="Profile image" />
                  <input type="file" class="mt-2 resume-upload-custom-resume" accept="image/*" @change='readAsBase64()'></input>
                </v-flex> -->
              </v-layout>
              <v-layout class="my-3">
                <v-flex>
                  <v-text-field
                    label="Bio"
                    solo
                    name="bio"
                    v-model="user.bio" maxlength="200" :rows="3" :max-rows="6"
                    textarea
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <p class="text-xs-center">
                <v-btn color="primary" :disabled="refreshing" :loading="refreshing" @click="updateProfile();">Save details</v-btn>
              </p>
              <p class="text-xs-center mb-0">
                <small class="text-muted">
                  By clicking on 'Save details' you agree to our <a href="https://hirexp.com/terms-of-use.html" target="_blank" class="amara--text">terms of use.</a>
                </small>
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
        <!-- <v-flex align-self="center" cols="5" v-if="launchDashboard">
          <v-card class="text-xs-center">
            <v-layout align-self="center">
              <v-flex align-self="center">
                <v-card>
                  <v-card-text>
                    <p class="text-center">
                      <img class="logo" v-if="user.company_logo" :src="user.company_logo" />
                      <img class="logo" v-if="!user.company_logo" src="@/assets/logo/amara_logo.png" />
                    </p>
                    <h3 class="text-center mt-4">
                      All set, Let's start!
                    </h3>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex> -->
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import {
//   VSnackbar,
//   VTextField,
//   VAvatar
// } from 'vuetify'
import axios from 'axios';

let imgData = null;
export default {
  // components: {
  //   VSnackbar,
  //   VTextField,
  //   VAvatar
  // },
  data () {
    return {
      password: {},
      config: {
        loading: false,
        newPic: null,
        picPreview: null
      },
      new_password1: '',
      new_password2: '',
      refreshing: false,
      nextPage: false,
      launchDashboard: false,
      imageFileData: null
    };
  },
  methods: {
    openFilePicker (type) {
      this.$refs[type].click();
    },
    filesChange (fileList) {
      if (!fileList.length) return;

      if (fileList[0]) {
        this.config.picPreview = URL.createObjectURL(fileList[0]);
        this.config.newPic = fileList[0];
      }
    },
    onPhoneInput ({ number, isValid }) {
      if (isValid) {
        this.user.phoneNumber = number;
      } else {
        this.user.phoneNumber = '';
      }
    },
    readAsBase64 () {
      setTimeout(() => {
        const reader = new FileReader();
        const that = this;
        if (this.imageFileData.size > 2000000) {
          this.$notify({
            group: 'foo',
            title: 'Image size cannot be more then 2MB!',
            type: 'warn'
          });
          this.$Progress.fail();
          return;
        }
        reader.readAsDataURL(this.imageFileData);
        reader.onload = function a () {
          imgData = reader.result;
          that.uploadDP();
        };
        reader.onerror = function b (error) {
          throw new Error(error);
        };
      }, 100);
    },
    uploadDP () {
      /* eslint-disable no-unreachable */
      this.user.profile_picture = null;
      let newImg = null;
      if (imgData) {
        const extension = imgData.split(';base64,')[0].split('/')[1];
        newImg = {
          file_name: `${this.user.email}_${this.user.user_id}_.${extension}`,
          data: imgData && imgData.split(';base64,')[1]
        };
      }
      if (newImg) {
        axios.post(`${process.env.VUE_APP_BASE_API_URL}/recruit/users/handlers/file_upload`, {
          file_data: newImg,
          file_type: 'user_profile_picture'
        }).then((resp) => {
          this.$nextTick(function a () {
            this.user.profile_picture = resp.body.data.file_url;
          });
          if (resp.body && resp.body.data) {
            this.$notify({
              group: 'foo',
              title: 'Image uploaded successfully, It will reflect shortly on the panel!',
              type: 'success'
            });
            // this.$Progress.finish();
          }
          // this.$Progress.finish();
        }, (resp) => {
          throw new Error(resp.body);
          this.$Progress.fail();
        });
      }
    },
    changePassword () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.new_password1 = '';
          this.new_password2 = '';
          axios.post(`${process.env.VUE_APP_API_URL}password/change/`, {
            old_password: this.password.old,
            new_password1: this.password.new,
            new_password2: this.password.confirm
          }, {
            headers: {
              Authorization: `JWT ${this.user.access_token}`,
              'X-CSRFToken': this.user.csrf_token
            }
          }).then((response) => {
            // this.$Progress.finish();
            if (response && response.data) {
              // this.nextPage = true;
              this.$store.dispatch('updateSnackbar', {
                color: 'success',
                show: true,
                text: 'Password changed successfully!'
              });
              const newBasicAuth = btoa(`${this.user.email}:${this.password.new}`);
              this.user.basicAuth = `Basic ${newBasicAuth}`;
              // this.$store.dispatch('createTempSession', this.user);
              this.$store.dispatch('createSession', this.user);
              this.launchDashboard = true;
              setTimeout(() => {
                if (this.user.milestone_active) {
                  this.$router.push('/');
                } else if (this.user.adhoc_active) {
                  this.$router.push('/ad-hoc');
                }
              }, 1500);
            }
          }, (error) => {
            // this.$Progress.finish();
            if (error.response && error.response.data) {
              if (error.response.data.new_password1 && error.response.data.new_password1.length) {
                this.new_password1 = error.response.data.new_password1[0];
                // this.$store.dispatch('updateSnackbar', {
                //   color: 'error',
                //   show: true,
                //   text: error.response.data.new_password1[0],
                // });
              } else if (error.response.data.new_password2 && error.response.data.new_password2.length) {
                this.new_password2 = error.response.data.new_password2[0];
                // this.$store.dispatch('updateSnackbar', {
                //   color: 'error',
                //   show: true,
                //   text: error.response.data.new_password2[0],
                // });
              }
            }
          // throw new Error(response);
          // this.hideModal();
          });
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Fields necessary, Please resolve all the errors!'
          });
        }
      });
    },
    updateProfile () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          if (!this.user.phoneNumber || this.user.phoneNumber.length === 0) {
            this.$store.dispatch('updateSnackbar', {
              color: 'info',
              show: true,
              text: 'Fields necessary, Please resolve all the errors!'
            });
            return;
          }
          this.refreshing = true;
          // this.user.profile_picture = 'https://www.hirexp.com/img/hirexp-avatar.jpg';
          const userData = {
            display_name: `${this.user.first_name} ${this.user.last_name}`,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            bio: this.user.bio,
            phoneNumber: this.user.phoneNumber
          };
          const formData = new FormData();
          this.$lodash.each(userData, (v, k) => {
            formData.append(k, v);
          });
          if (this.config.newPic) {
            formData.append('profilePicture', this.config.newPic);
          }
          axios.patch(`${process.env.VUE_APP_API_URL}users/update/${this.user.user_profile.id}`, formData, {
            headers: {
              Authorization: `JWT ${this.user.access_token}`,
              'X-CSRFToken': this.user.csrf_token,
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
            this.refreshing = false;
            // this.$Progress.finish();
            if (response && response.data && response.data.status === 200) {
              this.config.newPic = null;
              this.user.user_profile = response.data.message;
              this.$store.dispatch('createSession', this.user);
              this.launchDashboard = true;
              setTimeout(() => {
                if (this.user.milestone_active) {
                  this.$router.push('/');
                } else if (this.user.adhoc_active) {
                  this.$router.push('/ad-hoc');
                }
              }, 1500);
            }
          }, (response) => {
            this.refreshing = false;
            throw new Error(response);
            // this.$Progress.finish();
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Oops, Some error occured, Please try again later!'
            });
          });
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Fields necessary, Please resolve all the errors!'
          });
        }
      });
    }
  },
  computed: {
    ...mapState({
      user: state => state.tempUser,
      snackbar: state => state.snackbar
      // user: state => state.user,
    })
  },
  beforeMount () {
    if (!this.user) {
      this.$router.push('/');
    } else if (this.user.last_login === null) {
      this.password.old = this.user.tempPassword;
    } else {
      // this.nextPage = true;
    }
  }
};
</script>

<style lang="scss">
.resume-upload-custom-resume {
  .custom-file-input:lang(en)~.custom-file-label::after {
    content: "Update profile picture";
    width: 100%;
    border: 0px;
    text-align: center;
  }
}

.sidebar-profile {
  height: 120px;
  width: 120px;
  // margin-left: 13px !important;
  // transition: all 300ms ease;
  // transition: margin 700ms;
}

.sidebar-profile-small {
  height: 60px;
  width: 60px;
  // margin-left: 13px !important;
  // transition: all 300ms ease;
  // transition: margin 700ms;
}

.first-login-bg {
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-position-x: right!important;
  background-image: url(/img/amara_full.png)!important;
  background-size: cover!important;
}

.invalid-feedback {
  font-size: 10px;
  display: block;
  width: 80%;
  &.cj-error {
    position: absolute;
    background: white;
  }
}

.logo {
  max-height: 40px;
  max-width: 150px;
}
</style>
