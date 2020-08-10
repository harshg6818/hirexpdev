<template>
  <div class="setting-userProfile d-flex flex-row flex-wrap px-2">
    <v-flex class="px-2">
      <v-subheader class="py-0 px-0">
        <v-flex>
          <strong v-if="$route.name === 'Employees'" class="py-2 px-2"  style="font-size:18px; color:grey;">
            Employee details
          </strong>
          <strong v-else class="py-2 px-2"  style="font-size:18px; color:grey;">
            User details
          </strong>
        </v-flex>
        <v-flex class="text-sm-right">
          <v-btn text color="primary"
            v-if="$route.name === 'Employees' || $route.name == 'Settings'"
            v-show="!config.editable"
            @click="config.editable=true;"
          >
            <v-icon class="mr-2" small>fas fa-edit</v-icon>edit
          </v-btn>
          <v-btn text color="error"
            v-show="config.editable"
            v-if="$route.name === 'Employees' || $route.name == 'Settings'"
            @click="config.editable=false;"
          >cancel
          </v-btn>
          <v-btn text color="primary"
            v-show="config.editable"
            v-if="$route.name === 'Employees' || $route.name == 'Settings'"
            :loading="config.loading"
            :disabled="config.loading"
            @click="validateDetails();"
          >
            <v-icon class="mr-2">fas fa-save</v-icon>Save
          </v-btn>

          <v-btn slot="activator" @click="updatePassword = true"
          v-show=" !config.editable"
          v-if="$route.name !== 'Employees' "
          style="color:white"  color="primary" >Change Password</v-btn>
        </v-flex>
      </v-subheader>
      <div class="d-flex flex-row flex-wrap">
        <v-flex sm4 class="px-2 text-center">
          <v-avatar
            class="pa-2"
            v-if="!config.editable"
            size="200"
            :color="$route.name !== 'Employees' ? 'grey lighten-4': getColor(userDetails)"
          >
            <v-img
              v-if="userDetails && userDetails.profilePicture"
              contain
              :src="userDetails.profilePicture"
              aspect-ratio="1"
              class="grey lighten-2"
            >

              <div
                slot="placeholder"
                class="d-flex flex-row flex-wrap align-center justify-center fill-height ma-0"
              >
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </div>
            </v-img>
            <span class="white--text" style="font-size:50px" v-show="!userDetails || !userDetails.profilePicture && $route.name === 'Employees'">{{getAvatar(userDetails)}}</span>
          </v-avatar>
          <v-avatar
            v-if="config.editable"
            size="200"
            color="grey lighten-4"
          >
            <input type="file" name="picUploader" ref="picUploader"
              id="picUploader" @change="filesChange($event.target.files);"
              accept="image/*" style="display: none;"
            >
            <div
              slot="placeholder"
              @click="openFilePicker('picUploader')"
              class="cursor-pointer d-flex flex-row flex-wrap align-center justify-center ma-0"
            >
              <v-icon v-show="!config.picPreview" class="mr-2">fas fa-upload</v-icon>
              <span v-show="!config.picPreview">Upload new picture</span>
              <!-- <span v-show="config.picPreview">Image selected<br> Save to update</span> -->
              <v-img v-show="config.picPreview"
                  max-height="100"
                  max-width="200"
                  tile
                  contain
                  :src="config.picPreview"
                  aspect-ratio="1"
                ></v-img>
              <span></span>
            </div>
          </v-avatar>

        </v-flex>

        <v-flex sm8 class="text-left px-2">
          <div class="d-flex flex-row flex-wrap px-3" v-if="$route.name === 'Employees' || $route.name == 'Settings' && config.editable">
            <v-flex xs12>
              <v-text-field
                name="first_name"
                label="First name"
                v-model="userDetails.first_name"
                id="id"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                name="last_name"
                label="Last name"
                v-model="userDetails.last_name"
                id="id"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                name="employee_id"
                label="Employee ID"
                v-model="userDetails.employee_id"
                id="id"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                name="email"
                label="Email"
                v-model="userDetails.email"
                id="id"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                name="phone"
                label="Phone"
                v-model="userDetails.phoneNumber"
                id="id"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                name="gender"
                :items="gender"
                v-model="userDetails.gender"
                label="Select"
                class="input-group--focused"
                id="id"
                item-value="text"
              ></v-select>
              <!-- <v-text-field
                name="gender"
                label="Gender"
                v-model="userDetails.gender"
                id="id"
              ></v-text-field> -->
            </v-flex>
          </div>
          <v-list two-line subheader class="transparent" v-show="!config.editable">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title style="font-size:30px; height:35px;">
                  {{userDetails.first_name}} {{userDetails.last_name}}
                </v-list-item-title>
                <v-list-item-sub-title><span>Employee ID : {{userDetails.employee_id}}</span><span v-if="userDetails.employee_id == null">-</span></v-list-item-sub-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item>
              <v-list-item-content>
                <v-list-item-sub-title style="text-align:left; padding:0px 16px; font-size:16px;">Email : <span>{{userDetails.email}}</span><span v-if="userDetails.email == null">-</span></v-list-item-sub-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-sub-title style="text-align:left; padding:0px 16px; font-size:16px;">Phone : <span>{{userDetails.phoneNumber}}</span><span v-if="userDetails.phoneNumber == null">-</span></v-list-item-sub-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-sub-title style="text-align:left; padding:0px 16px; font-size:16px;">Gender : <span>{{userDetails.gender}}</span><span v-if="userDetails.gender == null">-</span></v-list-item-sub-title>
              </v-list-item-content>
            </v-list-item> -->
            <div style="text-align:left; padding:0px 16px; font-size:16px;">
              Email : <span>{{userDetails.email}}</span><span v-if="userDetails.email == null">-</span>
            </div>
            <div style="text-align:left; padding:0px 16px; font-size:16px;">
              Phone : <span>{{userDetails.phoneNumber}}</span><span v-if="userDetails.phoneNumber == null">-</span>
            </div>
            <div style="text-align:left; padding:0px 16px; font-size:16px;">
              Gender : <span>{{userDetails.gender}}</span><span v-if="userDetails.gender == null">-</span>
            </div>
          </v-list>
        </v-flex>
      </div>
      <v-card v-show="!config.editable" class="setting-Personal-details mb-2" style="margin-top:10px; padding: 20px 0 0 0 " v-if="$route.name !== 'Employees' || config.editable">
        <strong style="padding:24px; font-size:18px; color:grey;">
          Link accounts
        </strong>
        <div class="d-flex flex-row flex-wrap">
          <v-flex class="px-3 py-1 mb-3" sm4 md4 xl4 v-for="(intgrt, i) in presentIntegrations" :key="i">
            <v-card class="elevation-0 integrations-card" height="115" >
              <div :class="[intgrt.integrated ? 'intgrt-connected' : '']" style="height:115px" class="d-flex flex-row">
                <v-flex>
                  <v-img :src="getImgUrl(intgrt.logo)" contain width="60" style="margin-top:6px;margin-left: 8px;" />
                </v-flex>
                <v-flex>
                  <v-card-text class="text-left pt-0" style="padding-bottom: 0;">
                    <p class="mb-0 font-weight-bold">
                      {{intgrt.title}}
                    </p>
                    <p class="mb-0" style="color:grey;">
                      {{intgrt.sub_title}}
                    </p>
                    <small v-show="intgrt.comingsoon">
                      Coming Soon
                    </small>
                    <!-- <p class="mb-0 text-left" style="color:#3a811d" v-show="intgrt.integrated">
                      Connected
                      </p> -->
                    <v-btn color="primary" small text v-show="intgrt.integrated"
                      style="margin-left: -8px;margin-top:0;"
                      @click="disconnectTo(intgrt)"
                    >Disconnect</v-btn>
                    <v-btn color="primary" small text v-show="intgrt.integrationPresent && !intgrt.integrated"
                      :disabled="!checkPermission(['manage_integrations'])"
                      style="margin-left: -18px;"
                      @click="connectTo(intgrt)"
                    >Connect</v-btn>
                    <!-- <p class="mb-0 text-center" style="color:#3a811d" v-show="intgrt.integrated"> Connected </p> -->
                    <!-- <v-btn color="primary" small text v-show="intgrt.integrated && intgrt.title !== 'Amara'"
                      :disabled="!checkPermission(['manage_integrations'])"
                      style="margin-top: -10px;margin-left: -8px;"
                      @click="connectTo(intgrt)"
                    >Click to reconnect </v-btn> -->
                  </v-card-text>
                </v-flex>
              </div>
              <!-- <v-card-title primary-title class="justify-center">
                <v-img :src="getImgUrl(intgrt.logo)" contain height="100" /> <br/>
              </v-card-title> -->
            </v-card>
          </v-flex>
        </div>
      </v-card>
      <v-card class="setting-Employment-detail px-1 mb-2" style="margin-top:10px; padding: 20px 0 0 0 ">
        <strong style="padding:24px; font-size:18px; color:grey;">
            Employment details
          </strong>
        <div class="d-flex flex-row flex-wrap" v-if="!config.editable">
          <v-flex xs12 sm6 class="px-2 text-left">
            <v-list two-line subheader class="transparent">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-sub-title>Location</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.location == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.location}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item  >
                <v-list-item-content>
                  <v-list-item-sub-title>Joining date</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.joining_date == null || userDetails.joining_date == ''">-</v-list-item-title>
                  <v-list-item-title v-show="userDetails.joining_date">{{dayjs(userDetails.joining_date).format('DD MMM YYYY')}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
                  <v-list-item >
                <v-list-item-content>
                  <v-list-item-sub-title>Experience</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.experience == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.experience}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item >
                <v-list-item-content>
                  <v-list-item-sub-title>Team</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.team == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.team}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item >
                <v-list-item-content>
                  <v-list-item-sub-title>Team Head</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.teamHead == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.teamHead}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item >
                <v-list-item-content>
                  <v-list-item-sub-title>Last Rating</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.lastRating == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.lastRating}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item >
                <v-list-item-content>
                  <v-list-item-sub-title>HR Manager</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.hr_manager == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.hr_manager}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item >
                <v-list-item-content>
                  <v-list-item-sub-title>Grade</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.grade == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.grade}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item >
                <v-list-item-content>
                  <v-list-item-sub-title>Cost Centre</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.cost_centre == null || !userDetails.cost_centre">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.cost_centre}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>

          <v-flex xs12 sm6 class="px-2 text-left">
            <v-list two-line subheader class="transparent">
              <v-list-item v-show="userDetails.department">
                <v-list-item-content>
                  <v-list-item-sub-title>Department</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.department == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.department}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item  >
                <v-list-item-content>
                  <v-list-item-sub-title>Sub Department</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.sub_department == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.sub_department}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item >
                <v-list-item-content>
                  <v-list-item-sub-title>Business</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.business == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.business}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
                  <v-list-item >
                <v-list-item-content>
                  <v-list-item-sub-title>Business Head</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.businessHead == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.businessHead}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item >
                <v-list-item-content>
                  <v-list-item-sub-title>Manager</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.manager == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.manager}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-sub-title>Function</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.function == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.function}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-sub-title>Site</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.site == null || !userDetails.site">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.site}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-sub-title>Cluster</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.cluster == null || !userDetails.cluster">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.cluster}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

               <v-list-item>
                <v-list-item-content>
                  <v-list-item-sub-title>Exit Date</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.exit_date == null || userDetails.exit_date == ''">-</v-list-item-title>
                  <v-list-item-title v-show="userDetails.exit_date">{{dayjs(userDetails.exit_date).format('DD MMM YYYY')}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>
        </div>

        <div v-if="$route.name === 'Employees' || $route.name == 'Settings' && config.editable" class="px-3 d-flex flex-row flex-wrap">
          <v-flex xs12 sm6 class="px-2 text-left">
            <div class="d-flex flex-row flex-wrap">
              <v-flex xs12>
                <v-text-field
                  name="location"
                  label="Location"
                  v-model="userDetails.location"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-dialog
                  ref="dialog2"
                  v-model="model2"
                  :return-value.sync="userDetails.joining_date"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    name="joining_date"
                    label="Joining Date"
                    v-model="userDetails.joining_date"
                    id="id"
                    slot="activator"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="userDetails.joining_date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="model2 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog2.save(userDetails.joining_date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
                <!-- <v-text-field
                  name="joining_date"
                  label="Joining Date"
                  v-model="userDetails.joining_date"
                  id="id"
                ></v-text-field> -->
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="experience"
                  label="Experience"
                  v-model="userDetails.experience"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="team"
                  label="Team"
                  v-model="userDetails.team"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="teamHead"
                  label="Team Head"
                  v-model="userDetails.teamHead"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="lastRating"
                  label="Last Rating"
                  v-model="userDetails.lastRating"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="hr_manager"
                  label="HR Manager"
                  v-model="userDetails.hr_manager"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="grade"
                  label="Grade"
                  v-model="userDetails.grade"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="cost_centre"
                  label="Cost Centre"
                  v-model="userDetails.cost_centre"
                  id="id"
                ></v-text-field>
              </v-flex>
            </div>
          </v-flex>

          <v-flex xs12 sm6 class="px-2 text-left">
            <div class="d-flex flex-row flex-wrap">
              <v-flex xs12>
                <v-text-field
                  name="department"
                  label="Department"
                  v-model="userDetails.department"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="sub_department"
                  label="Sub Department"
                  v-model="userDetails.sub_department"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="business"
                  label="Business"
                  v-model="userDetails.business"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="businessHead"
                  label="Business Head"
                  v-model="userDetails.businessHead"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="manager"
                  label="Manager"
                  v-model="userDetails.manager"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="function"
                  label="Function"
                  v-model="userDetails.function"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="site"
                  label="Site"
                  v-model="userDetails.site"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="cluster"
                  label="Cluster"
                  v-model="userDetails.cluster"
                  id="id"
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-dialog
                  ref="dialog3"
                  v-model="model3"
                  :return-value.sync="userDetails.exit_date"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    name="exit_date"
                    label="Exit Date"
                    v-model="userDetails.exit_date"
                    id="id"
                    slot="activator"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="userDetails.exit_date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="model3 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog3.save(userDetails.exit_date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
                <!-- <v-text-field
                  name="exit_date"
                  label="Exit Date"
                  v-model="userDetails.exit_date"
                  id="id"
                ></v-text-field> -->
              </v-flex>
            </div>
          </v-flex>
        </div>
      </v-card>
      <v-card class="setting-Personal-details mb-2" style="margin-top:10px; padding: 20px 0 0 0 ">
        <strong style="padding:24px; font-size:18px; color:grey;">
          Personal details
        </strong>
        <div class="d-flex flex-row flex-wrap" v-if="!config.editable">
          <v-flex xs12 sm6 class="px-2 text-left">
            <v-list two-line subheader class="transparent" >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-sub-title>Alternate Email</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.alternateEmail == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.alternateEmail}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                    <v-list-item-content>
                      <v-list-item-sub-title>Date of birth</v-list-item-sub-title>
                      <v-list-item-title v-if="userDetails.birthDate == null">-</v-list-item-title>
                      <v-list-item-title >{{userDetails.birthDate}}</v-list-item-title>
                    </v-list-item-content>
              </v-list-item>

            </v-list>
          </v-flex>
          <v-flex xs12 sm6 class="text-left">
            <v-list two-line subheader class="transparent">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-sub-title>Education</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.education == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.education}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-sub-title>Skills</v-list-item-sub-title>
                  <v-list-item-title v-if="userDetails.skills == null">-</v-list-item-title>
                  <v-list-item-title>{{userDetails.skills}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            </v-list>
          </v-flex>
        </div>

        <div v-if="$route.name === 'Employees' || $route.name == 'Settings' && config.editable" class="px-3 d-flex flex-row flex-wrap">
          <v-flex xs12 sm6 class="px-2 text-left">
            <div class="d-flex flex-row flex-wrap">
              <v-flex xs12>
                <v-text-field
                  name="alternateEmail"
                  label="Alternate Email"
                  v-model="userDetails.alternateEmail"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-dialog
                  ref="dialog1"
                  v-model="model"
                  :return-value.sync="userDetails.birthDate"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    name="joining_date"
                    label="Birth Date"
                    v-model="userDetails.birthDate"
                    slot="activator"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="userDetails.birthDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="model = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog1.save(userDetails.birthDate)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </div>
          </v-flex>

          <v-flex xs12 sm6 class="px-2 text-center">
            <div class="d-flex flex-row flex-wrap">
              <v-flex xs12>
                <v-text-field
                  name="education"
                  label="Education"
                  v-model="userDetails.education"
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="skills"
                  label="Skills"
                  v-model="userDetails.skills"
                  id="id"
                ></v-text-field>
              </v-flex>
            </div>
          </v-flex>
        </div>
      </v-card>
    </v-flex>

    <v-dialog v-model="updatePassword" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Change Password</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md v-if="$route.name !== 'Employees' && updatePassword">
            <div class="d-flex flex-row flex-wrap">
              <v-flex xs12>
                <v-text-field
                  class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2"
                  v-model='password.old' placeholder="Enter old password"
                  :append-icon="e1 ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  :type="e1 ? 'password' : 'text'" @click:append="(e1 = !e1)"
                  label="Old Password"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model='password.new'
                  name="new_password" data-vv-as="new password"
                  placeholder="Enter new password"
                  v-validate="{required: true, min: 8}" size="sm"
                  :class="{'is-invalid': errors.has('new_password') }"
                  :append-icon="e2 ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  :type="e2 ? 'password' : 'text'" @click:append="(e2 = !e2)"
                  label="New Password"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model='password.confirm'
                  name="confirm_password" data-vv-as="confirm password"
                  placeholder="Confirm new password"
                  :append-icon="e3 ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  :type="e3 ? 'password' : 'text'" @click:append="(e3 = !e3)"
                  v-validate="{required: true, confirmed:'new_password'}"
                  size="sm" :class="{'is-invalid': errors.has('confirm_password') }"
                  label="Confirm Password"
                  required>
                </v-text-field>
              </v-flex>
            </div>
          </v-container>
          <small class="text-muted text-left">
              <p class="mb-2">
                <strong>Note: </strong>
              </p>
              <p class="mb-0">Your password must contain at least 8 characters. </p>
              <p class="mb-0">Your password can't be too similar to your other personal information. </p>
              <p class="mb-0">Your password can't be a commonly used password. </p>
              <p class="mb-0">Your password can't be entirely numeric. </p>
            </small>
        </v-card-text>
        <v-card-actions>

          <v-btn color="error " text @click.native="updatePassword = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="changePassword()">Change</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template>
      <div class="text-center">
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Connect with Amara
              <span style="margin-left: 48%;margin-top: -4%;"><v-icon large color="darken-2" small @click="dialog = false">fas fa-times</v-icon></span>
            </v-card-title>

            <v-card-text>
              Do you want to give access to Amara to send emails & calendar invites to the candidates & employees?
            </v-card-text>

            <v-card-text>
              This will allow Amara to:
            </v-card-text>

            <!-- <v-icon large color="darken-2">email</v-icon> -->
            <v-card-text>
              <!-- <span><v-icon large color="darken-2" small>fas fa-envelope</v-icon></span> -->
              <div class="d-flex flex-row">
                <v-flex xs1>
                  <img height="30" width="30" src="./gmailIcon.png">
                </v-flex>
                <v-flex xs11 style="padding-top: 4px;">
                  Send emails on your behalf
                </v-flex>
              </div>
              <!-- <span></span>
              <span>

              </span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     -->
            </v-card-text>

            <v-card-text>
              <!-- <span><v-icon large color="darken-2" small>fas fa-calendar</v-icon></span> -->
              <!-- <span><img height="30" width="30" src="./calender.jpg"></span>
              <span>
                Create, share, edit and delete calendars invites on your behalf
              </span>   -->
              <div class="d-flex flex-row">
                <v-flex xs1>
                  <img height="30" width="30" src="./calender.jpg">
                </v-flex>
                <v-flex xs11 style="padding-top: 4px;">
                  Create, share, edit and delete calendars invites on your behalf
                </v-flex>
              </div>
            </v-card-text>

            <v-card-text style="display: inline-flex;">
              <span style="margin-top: -5%;">
              <v-checkbox
                v-model="agreeCheckbox"></v-checkbox>
              </span>
              <span>With this permission all emails will be sent out from HireXP servers with your name and you will be marked cc in all the emails.</span>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn color="primary" text small @click="dialog = false">Close</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                :disabled="!agreeCheckbox"
                @click="connectToAmara()"
              >
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>

  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import { VChip, VMenu, VSubheader, VAvatar, VCheckbox } from 'vuetify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import VueAuthenticate from 'vue-authenticate-fork';

dayjs.extend(relativeTime);

Vue.prototype.$http = axios;

Vue.use(VueAuthenticate, {
  baseUrl: `${process.env.VUE_APP_BASE_API_URL}/integrations`, // Your API domain

  providers: {
    google: {
      scope: [
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/calendar'
      ],
      url: 'google/oauth2callback',
      optionalUrlParams: ['prompt', 'access_type'],
      accessType: 'offline',
      prompt: 'consent',
      clientId: '101147605276-4p0fsf52907u94p7bboruka7d13komo5.apps.googleusercontent.com'
    },
    live: {
      scope: ['offline_access', 'Mail.Send', 'User.Read', 'Mail.Read', 'Mail.ReadWrite', 'Calendars.ReadWrite'],
      url: 'outlook/oauth2callback',
      clientId: 'fa4ce73b-8bf1-43df-b8e2-8231db2564ee',
      authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
    }
  }
});

export default {
  name: 'integrations',
  components: {
    // ContentLoader,
    // VCheckbox,
    // dayjs,
    // VChip,
    // VMenu,
    // VSubheader,
    // VAvatar
  },
  data () {
    return {
      agreeCheckbox: false,
      gender: [{
        text: 'Male'
      }, {
        text: 'Female'
      }],
      model: false,
      model2: false,
      model3: false,
      dialog: false,
      presentIntegrations: [{
        title: 'Amara',
        key: 'amara',
        logo: 'amara',
        sub_title: 'Connect your Amara account',
        comingsoon: false,
        integrationPresent: true,
        integrated: false
      }, {
        title: 'Gmail',
        key: 'google',
        logo: 'gmail',
        sub_title: 'Connect your Google account',
        comingsoon: false,
        integrationPresent: true,
        integrated: false
      }, {
        title: 'Outlook',
        key: 'live',
        logo: 'outlook',
        sub_title: 'Connect your Outlook account',
        comingsoon: false,
        integrationPresent: true,
        integrated: false
      }
      ],
      // passwordRules: [
      //   v => /[a-z]+[0-9]/.test(v) || 'Your password can not be entirely numeric',
      // ],
      e1: true,
      e2: true,
      e3: true,
      password: {
        old: null,
        new: null,
        confirm: null
      },
      updatePassword: false,
      config: {
        editable: false,
        initialLoading: true,
        initialLoadingFilters: true,
        loading: false,
        newPic: null,
        picPreview: null
      },
      userDetails: {},
      userCopy: {},
      employeeReference: {},
      settings: {}
    };
  },

  methods: {
    connectTo (provider) {
      // console.log('provider', provider);
      if (provider.title === 'Amara') {
        // console.log('in amara if cond', provider.title);
        this.dialog = !this.dialog;
        return;
      }
      this.$auth.authenticate(provider.key).then((res) => {
        // console.log('res', res);
        if (res.status === 200) {
          this.$lodash.each(this.presentIntegrations, (integration, index) => {
            integration.integrated = false;
          });
          const match = this.$lodash.findIndex(this.presentIntegrations, integration => integration.title === provider.title);
          // console.log('match', match);
          if (match >= 0) {
            this.presentIntegrations[match].integrated = true;
            provider.integrated = true;
          }
          // this.userDetails.integrations[provider.key] = err.data.message;
          if (this.userDetails) {
            this.userDetails.default_mail_client = provider.key === 'live' ? 'outlook' : 'google';
          }
          // console.log('before store update , this.userDetails.default_mail_client, provider', this.userDetails.default_mail_client, provider);
          this.$store.state.user.user_profile = JSON.parse(JSON.stringify(this.userDetails));
          this.$store.dispatch('createSession', this.$store.state.user);
        }
      }).catch((err) => {
        // console.log('connect err', err);
        if (err.status === 200) {
          this.$lodash.each(this.presentIntegrations, (integration, index) => {
            integration.integrated = false;
          });
          const match = this.$lodash.findIndex(this.presentIntegrations, integration => integration.title === provider.title);
          // console.log('match', match);
          if (match >= 0) {
            this.presentIntegrations[match].integrated = true;
            provider.integrated = true;
          }
          // this.userDetails.integrations[provider.key] = err.data.message;
          if (this.userDetails) {
            this.userDetails.default_mail_client = provider.key === 'live' ? 'outlook' : 'google';
          }
          // console.log('before store update , this.userDetails.default_mail_client, provider', this.userDetails.default_mail_client, provider);
          this.$store.state.user.user_profile = JSON.parse(JSON.stringify(this.userDetails));
          this.$store.dispatch('createSession', this.$store.state.user);
        }
      });
    },
    disconnectTo (type) {
      // console.log('type', type);
      let mailClient = '';
      if (type.key === 'live') {
        mailClient = 'outlook';
      } else {
        mailClient = type.key;
      }
      axios.delete(`${process.env.VUE_APP_BASE_API_URL}integrations/${mailClient}/disconnect`).then((res) => {
        // console.log('res', res);
        this.$lodash.each(this.presentIntegrations, (integration, index) => {
          integration.integrated = false;
        });
        this.userDetails.default_mail_client = '';
        this.$store.state.user.user_profile = JSON.parse(JSON.stringify(this.userDetails));
        this.$store.dispatch('createSession', this.$store.state.user);
        this.$store.dispatch('updateSnackbar', {
          text: res.data.status,
          color: 'success',
          show: true
        });
      });
    },
    connectToAmara () {
      if (this.agreeCheckbox) {
        axios.get(`${process.env.VUE_APP_BASE_API_URL}integrations/amara/connect`).then((res) => {
          if (res) {
            this.$lodash.each(this.presentIntegrations, (integration, index) => {
              integration.integrated = false;
            });
            const match = this.$lodash.findIndex(this.presentIntegrations, integration => integration.key === 'amara');
            if (match >= 0) {
              this.presentIntegrations[match].integrated = true;
            }
            this.userDetails.default_mail_client = 'amara';
            this.$store.state.user.user_profile = JSON.parse(JSON.stringify(this.userDetails));
            this.$store.dispatch('createSession', this.$store.state.user);
            this.dialog = false;
          }
        });
      }
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/integrations/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    openDialog (data, type) {
      if (type && this.$refs[type]) {
        this.$refs[type].open = true;
        this.$refs[type].member = data;
        this.$refs[type].open = true;
      }
    },
    getIntegrations (id) {
      const queryParams = {
        fields: 'bio,location,birthDate,alternateEmail,phoneNumber,profilePicture,gender,education,experience,skills,joining_date,designation,designationChanged,designationChangeDate,grade,department,sub_department,manager,managerChanged,managerChangeDate,function,functionChanged,functionChangeDate,team,teamChanged,teamChangeDate,teamHead,business,businessHead,hrbp,status,mood,createdAt,lastUpdated,first_name,last_name,email'
      };
      axios.get(`${process.env.VUE_APP_API_URL}users/details/${id}`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          this.member = response.data;
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch data, Please try again later!'
        });
        throw new Error(response);
      });
    },
    changePassword () {
      if (!this.password.new || !this.password.old || !this.password.confirm) {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Please fill all feilds!',
          type: 'warn'
        });
        return;
      }
      if (this.password.new.length < 8 || this.password.old.length < 8 || this.password.confirm.length < 8) {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Your password must contain at least 8 characters.!',
          type: 'warn'
        });
        return;
      }
      if (this.password.new !== this.password.confirm) {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Password fields do not match!'
        });
        return;
      }
      this.refreshing = true;
      axios.post(`${process.env.VUE_APP_API_URL}password/change/`, {
        old_password: this.password.old,
        new_password1: this.password.new,
        new_password2: this.password.confirm
      }).then((response) => {
        if (response === 200 || response === 201) {
          this.$store.dispatch('updateSnackbar', {
            text: 'Your password has been changed successfully.',
            color: 'success',
            show: true
            // cancelButtonText: 'Go to all jobs'
          }).then((result) => {
            this.$store.dispatch('deleteSession');
            this.$router.push('/');
          });
        }
        this.refreshing = false;
      }, (response) => {
        let temp = 0;
        if (response && response.body && response.status && response.status !== 403) {
          this.$lodash.each(response.body, (value, key) => {
            this.$lodash.each(response.body[key], (v) => {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: `${v}`
              });
              temp += 1;
            });
          });
        }
        if (temp === 0) {
          this.$store.dispatch('updateSnackbar', {
            group: 'foo',
            text: 'Some error occurred.',
            show: true
          });
        }
        this.refreshing = false;
        // this.hideModal();
      });
    },
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
    validateDetails () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.saveUser();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    getColor (e) {
      let color = 'primary';
      if (e.gender && e.gender === 'female') {
        color = 'pink';
      }
      return color;
    },
    getAvatar (c) {
      let avt = '';
      if (c.first_name && c.last_name) {
        avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      } else if (c.first_name && !c.last_name) {
        avt = `${c.first_name.charAt(0)}`;
      } else if (!c.first_name && c.last_name) {
        avt = `${c.last_name.charAt(0)}`;
      } else if (!c.first_name && !c.last_name && c.display_name) {
        c.first_name = c.display_name.split(' ')[0];
        c.last_name = c.display_name.split(' ')[1];
        avt = `${c.first_name.charAt(0)}${c.last_name.charAt(0)}`;
      }
      return avt.toUpperCase();
    },
    saveUser () {
      this.config.loading = true;
      const userData = JSON.parse(JSON.stringify(this.userDetails));
      delete userData.profilePicture;
      const formData = new FormData();
      this.$lodash.each(userData, (v, k) => {
        if ((v || v === '') && v !== 'None') {
          if (v !== this.userCopy[k]) {
            formData.append(k, v);
          }
        }
      });
      if (this.config.newPic) {
        formData.append('profilePicture', this.config.newPic);
      }
      axios.patch(`${process.env.VUE_APP_API_URL}users/update/${this.userDetails.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        this.config.loading = false;
        if (response && response.data && response.data.status === 200) {
          this.config.newPic = null;
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Details updated successfully!'
          });
          if (this.$route.name !== 'Employees') {
            this.userDetails = response.data.message;
            this.$store.state.user.user_profile = response.data.message;
            this.$store.dispatch('createSession', this.$store.state.user);
          } else {
            this.employeeReference.employeeListReference.getTeam();
            this.employeeReference.getEmployee(this.userDetails.id);
          }
          this.config.editable = false;
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update details, Please try again later!'
          });
        }
      }, (response) => {
        this.config.loading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update details, Please try again later!'
        });
        throw new Error(response);
      });
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
    getEmployee (id) {
      const queryParams = {
        fields: 'first_name,last_name,display_name,sub_type,bio,email,alternateEmail,birthDate,location,phoneNumber,profilePicture,gender,skills,education,grade,experience,function,designation,status,employee_id,department,sub_department,last_login,exit_date,joining_date,manager,team,teamHead,business,businessHead,hrbp,high_potential_emp,lastRating,hr_manager,site,cluster,cost_centre'
      };
      axios.get(`${process.env.VUE_APP_API_URL}users/${id}/details`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          this.userDetails = JSON.parse(JSON.stringify(response.data));
          this.userCopy = JSON.parse(JSON.stringify(response.data));
          if (this.userDetails.birthDate && this.userDetails.birthDate !== 'None') {
            this.userDetails.birthDate = dayjs(this.userDetails.birthDate).format('YYYY-MM-DD');
          }
          if (this.userDetails.exit_date && this.userDetails.exit_date !== 'None') {
            this.userDetails.exit_date = dayjs(this.userDetails.exit_date).format('YYYY-MM-DD');
          }
          if (this.userDetails.joining_date && this.userDetails.joining_date !== 'None') {
            this.userDetails.joining_date = dayjs(this.userDetails.joining_date).format('YYYY-MM-DD');
          }
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch details, Please try again later!'
        });
        throw new Error(response);
      });
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  beforeMount () {
    this.userDetails = JSON.parse(JSON.stringify(this.$store.state.user.user_profile));
    if (this.$route.params && this.$route.params.memberId) {
      this.getIntegrations(this.$route.params.memberId);
    }
    this.$lodash.each(this.presentIntegrations, (integration, index) => {
      integration.integrated = false;
    });
    let match = -1;
    if (this.userDetails && this.userDetails.default_mail_client === 'google') {
      match = this.$lodash.findIndex(this.presentIntegrations, integration =>
        integration.key === 'google');
    } else if (this.userDetails && this.userDetails.default_mail_client === 'outlook') {
      match = this.$lodash.findIndex(this.presentIntegrations, integration =>
        integration.key === 'live');
    } else if (this.userDetails && this.userDetails.default_mail_client === 'amara') {
      match = this.$lodash.findIndex(this.presentIntegrations, integration =>
        integration.key === 'amara');
    }
    if (match >= 0) {
      this.presentIntegrations[match].integrated = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.v-list__item__sub-title{
  color:rgba(0,0,0,.54);
}
</style>

<style lang="scss" scoped>
.intgrt-connected {
  border: 1px solid green;
  background: rgba(58, 129, 29, .19);
}
</style>
