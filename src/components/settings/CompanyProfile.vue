<template>
  <div class="companyprofile px-2 d-flex flex-row flex-wrap">
    <v-flex class="px-2">
      <v-subheader class="py-0 px-0">
        <v-flex>
          <strong  class="py-2 px-2"  style=" font-size:18px; color:grey;">
            Company Profile
          </strong>
        </v-flex>
        <v-flex class="text-sm-right">
          <v-btn color="primary"
            text
            v-show="!config.editable"
            :disabled="!checkPermission(['update_company_profile'])"
            @click="editCompany();"
          >
            <v-icon class="mr-2" small>fas fa-edit</v-icon>edit
          </v-btn>
          <v-btn text color="error"
            v-show="config.editable"
            @click="closeEditable()"
          >cancel
          </v-btn>
          <v-btn color="primary"
            v-show="config.editable"
            :loading="config.loading"
            :disabled="config.loading"
            @click="validateDetails();"
          >
            <v-icon class="mr-2">fas fa-save</v-icon>Save
          </v-btn>
        </v-flex>
      </v-subheader>
      <div class="d-flex flex-row flex-wrap px-1 py-2">
        <div class="d-flex flex-row flex-wrap w-100">
          <v-flex sm4 class="px-2 text-center">
            <v-avatar
              class="pa-2"
              v-if="!config.editable"
              :tile="true"
              color="white company-logo"
            >
              <v-img
                max-height="100"
                max-width="200"
                tile
                contain
                :src="company.company_logo"
                aspect-ratio="1"
                style="background-color:transarent;"
              >
                <div
                  slot="placeholder"
                  class="d-flex flex-row flex-wrap align-center justify-center fill-height ma-0"
                >
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </div>
              </v-img>
            </v-avatar>
            <v-avatar
              v-if="config.editable"
              :tile="true"
              color="grey company-logo lighten-4"
            >
              <input type="file" name="logoUploader" ref="logoUploader"
                id="logoUploader" @change="filesChange($event.target.files);"
                accept="image/*" style="display: none;"
              >
              <div
                slot="placeholder"
                @click="openFilePicker('logoUploader')"
                class="cursor-pointer d-flex flex-row flex-wrap align-center justify-center ma-0"
              >
                <v-icon v-show="!config.logoPreview" class="mr-2">fas fa-upload</v-icon>
                <span v-show="!config.logoPreview">Upload new logo</span>
                <!-- <span v-show="config.logoPreview">Image selected<br> Save to update</span> -->
                <v-img v-show="config.logoPreview"
                  max-height="100"
                  max-width="200"
                  tile
                  contain
                  :src="config.logoPreview"
                  aspect-ratio="1"
                  style="background-color:transarent;"
                ></v-img>
                <span></span>
              </div>
            </v-avatar>
          </v-flex>
          <v-flex sm8 v-if="!config.editable" class="text-left px-4">
            <v-list two-line subheader class="transparent" v-show="!config.editable">
              <v-list-item-title style="font-size:30px; height:35px;">
                {{company.company_name}}
              </v-list-item-title>
              <div class="text-sm-left" style="font-size:16px">
                <span>Address : {{company.company_address}}</span>
                <span v-if="company.company_address == null">-</span>
              </div>
              <div class="text-sm-left" style="font-size:16px">
                <span>Company type : {{company.company_type}}</span>
                <span v-if="company.company_address == null">-</span>
              </div>
              <div class="text-sm-left" style="font-size:16px">
                <span>Strength : {{company.employee_strength}}</span>
                <span v-if="company.company_address == null">-</span>
              </div>
              <div class="text-sm-left" style="font-size:16px">
                <span>Brand name : {{company.brand_name}}</span>
                <span v-if="company.company_address == null">-</span>
              </div>
              <div class="text-sm-left" style="font-size:16px">
                <span>Country : {{company.country}}</span>
                <span v-if="company.company_address == null">-</span>
              </div>
            </v-list>
          </v-flex>
          <v-flex sm7 v-if="config.editable" class="text-center px-2">
            <v-text-field
              maxlength="300"
              v-model="company.company_name"
              class="elevation-0 grey--text text--lighten-2"
              name="company_name"
              :readonly="!config.editable"
              :error-messages="errors.collect('company_name')"
              label="Company Name"
              data-vv-as="company name"
              v-validate="'required'"
              :outline="this.outline"
            >
            </v-text-field>

            <v-text-field
              maxlength="300"
              v-model="company.company_address"
              class="elevation-0 grey--text text--lighten-2"
              name="company_address"
              :readonly="!config.editable"
              :error-messages="errors.collect('company_address')"
              label="Company Address"
              data-vv-as="company address"
              v-validate="'required'"
              :outline="this.outline"
            >
            </v-text-field>
            <v-text-field
              maxlength="300"
              v-model="company.company_type"
              class="elevation-0 grey--text text--lighten-2"
              name="company_type"
              :readonly="!config.editable"
              :error-messages="errors.collect('company_type')"
              label="Company Type"
              data-vv-as="company type"
              v-validate="'required'"
              :outline="this.outline"
            >
            </v-text-field>
            <v-text-field
              maxlength="300"
              v-model="company.employee_strength"
              class="elevation-0 grey--text text--lighten-2"
              name="employee_strength"
              :readonly="!config.editable"
              type="number"
              :error-messages="errors.collect('employee_strength')"
              label="Employee Strength"
              data-vv-as="employee strength"
              v-validate="'required|min:0'"
              :outline="this.outline"
            >
            </v-text-field>
            <v-text-field
              maxlength="300"
              v-model="company.country"
              class="elevation-0 grey--text text--lighten-2"
              name="country"
              :readonly="!config.editable"
              :error-messages="errors.collect('country')"
              label="Country"
              data-vv-as="country"
              v-validate="'required'"
              :outline="this.outline"
            >
            </v-text-field>
            <v-text-field
              maxlength="300"
              v-model="company.brand_name"
              class="elevation-0 grey--text text--lighten-2"
              name="brand_name"
              :readonly="!config.editable"
              :error-messages="errors.collect('brand_name')"
              label="Brand Name"
              data-vv-as="brand name"
              v-validate="'required'"
              :outline="this.outline"
            >
            </v-text-field>

          </v-flex>
        </div>
      </div>
      <div class="d-flex flex-row flex-wrap px-1 py-2">
        <v-card class="w-100 pt-2">
          <strong style="padding:0 10px; font-size:18px; color:grey;">
            Company details
          </strong>
          <div class="d-flex flex-row flex-wrap px-1">
          <v-flex sm12 class="px-2">
            <!-- <v-text-field
              maxlength="300"
              v-model="company.company_name"
              class="elevation-0 grey--text text--lighten-2"
              name="company_name"
              :readonly="!config.editable"
              :error-messages="errors.collect('company_name')"
              label="Company Name"
              data-vv-as="company name"
              v-validate="'required'"
              :outline="this.outline"
            >
            </v-text-field>

            <v-text-field
              maxlength="300"
              v-model="company.company_address"
              class="elevation-0 grey--text text--lighten-2"
              name="company_address"
              :readonly="!config.editable"
              :error-messages="errors.collect('company_address')"
              label="Company Address"
              data-vv-as="company address"
              v-validate="'required'"
              :outline="this.outline"
            >
            </v-text-field> -->
            <v-textarea
              style="min-height:100px;"
              maxlength="300"
              rows="5"
              v-html="company.companyProfile"
              name="companyProfile"
              v-if="!config.editable"
              :readonly="!config.editable"
              :error-messages="errors.collect('companyProfile')"
              label="Company Profile"
              data-vv-as="company profile"
              v-validate="'required'"
              :outline="this.outline"
            >
            </v-textarea>

            <v-card class="elevation-0 py-2 px-3" height="225" v-if="config.editable">
              <label class="v-label caption theme--light">
                Company Profile
              </label>
              <VuePellEditor class="w-100" v-model="company.companyProfile" placeholder="Enter email description" />
            </v-card>
          </v-flex>
          </div>
        </v-card>
      </div>

      <!-- SPOC -->
      <div class="d-flex flex-row flex-wrap px-1 py-2">
        <v-card class="w-100 pt-2">
          <strong style="padding:0 10px; font-size:18px; color:grey;">
            SPOC details
          </strong>
          <div class="d-flex flex-row flex-wrap px-1">
            <v-flex sm6 class="px-2">
              <v-text-field
                maxlength="300"
                v-model="company.spoc_name"
                class="elevation-0 grey--text text--lighten-2"
                name="spoc_name"
                :readonly="!config.editable"
                :error-messages="errors.collect('spoc_name')"
                label="SPOC Name"
                data-vv-as="spoc name"
                v-validate="'required'"
                :outline="this.outline"
              >
              </v-text-field>

              <v-text-field
                maxlength="300"
                v-model="company.spoc_phone"
                class="elevation-0 grey--text text--lighten-2"
                name="spoc_phone"
                :readonly="!config.editable"
                :error-messages="errors.collect('spoc_phone')"
                label="SPOC Phone"
                data-vv-as="spoc phone"
                v-validate="'required'"
                :outline="this.outline"
              >
              </v-text-field>
            </v-flex>

            <v-flex sm6 class="px-2">
              <v-text-field
                maxlength="300"
                v-model="company.spoc_email"
                class="elevation-0 grey--text text--lighten-2"
                name="spoc_email"
                :readonly="!config.editable"
                :error-messages="errors.collect('spoc_email')"
                label="SPOC Email"
                data-vv-as="spoc email"
                v-validate="'required'"
                :outline="this.outline"
              >
              </v-text-field>
            </v-flex>
          </div>
        </v-card>
      </div>

    </v-flex>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import { VChip, VMenu, VSubheader, VAvatar, VTextarea } from 'vuetify';
import VuePellEditor from 'vue-pell-editor';
Vue.use(VuePellEditor);

export default {
  name: 'CompanyProfile',
  // components: {
  //   VChip,
  //   VMenu,
  //   VSubheader,
  //   VAvatar,
  //   VTextarea
  // },
  data () {
    return {
      outline: true,
      config: {
        editable: false,
        initialLoading: true,
        loading: false,
        initialLoadingFilters: true,
        newLogo: null,
        logoPreview: null
      },
      company: {}
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    editCompany () {
      this.config.editable = true;
      this.outline = false;
    },

    openFilePicker (type) {
      this.$refs[type].click();
    },
    filesChange (fileList) {
      if (!fileList.length) return;

      if (fileList[0]) {
        this.config.logoPreview = URL.createObjectURL(fileList[0]);
        this.config.newLogo = fileList[0];
      }
    },
    validateDetails () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.saveCompany();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    closeEditable () {
      this.getCompanyDetails();
      setTimeout(() => {
        this.config.editable = false;
        this.outline = true;
      }, 800);
    },
    checkPermission (permission) {
      let flag = false;
      this.$lodash.each(this.user.permissions, (perm) => {
        this.$lodash.each(permission, (v) => {
          if (v === perm) {
            flag = true;
          }
        });
      });
      return flag;
    },
    saveCompany () {
      this.config.loading = true;
      const companyData = JSON.parse(JSON.stringify(this.company));
      delete companyData.id;
      delete companyData.is_active;
      delete companyData.is_internal;
      delete companyData.lastUpdated;
      delete companyData.active_plan;
      delete companyData.company_logo;
      delete companyData.company_website;
      const formData = new FormData();
      this.$lodash.each(companyData, (v, k) => {
        formData.append(k, v);
      });
      if (this.config.newLogo) {
        formData.append('company_logo', this.config.newLogo);
      }
      axios.patch(`${process.env.VUE_APP_API_URL}company/update/${this.company.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        this.config.loading = false;
        if (response && response.data && response.data.status === 200) {
          this.config.newLogo = null;
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Company details updated successfully!'
          });
          this.getCompanyDetails();
          this.config.editable = false;
          this.outline = true;
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update company details, Please try again later!'
          });
        }
      }, (response) => {
        this.config.loading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update company details, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getCompanyDetails () {
      axios.get(`${process.env.VUE_APP_API_URL}company/profile`).then((response) => {
        if (response && response.data) {
          this.company = response.data;
          // console.log(this.company);
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch user, Please try again later!'
        });
        throw new Error(response);
      });
    }
  },
  beforeMount () {
    this.getCompanyDetails();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.companyprofile{
  .company-logo {
  height: 100px !important;
  width: 200px !important;
}
.theme--light.v-text-field--outline .v-input__slot {
    border: 0px solid currentColor !important;
}
.v-input {
}
}

</style>
