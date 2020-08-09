<template>
  <div class="segmentVue">
    <v-container v-show="groupList">
      <v-subheader style="margin-bottom:3%;">
        <v-flex>
          <v-list-tile-title style="display:block">
            <strong class="py-2 " style=" font-size:18px; color:grey;">Groups</strong>
          </v-list-tile-title>
          <v-list-tile-sub-title>
            Group of employees from specific segment based on location, gender, grade, departments etc.
          </v-list-tile-sub-title>
        </v-flex>
        <v-flex text-sm-right>
          <v-btn color="primary" @click.stop="addNewGroup()" :disabled="!checkPermission(['create_group'])">
            <v-icon class="mr-2" small>fas fa-plus</v-icon>
            Add Group
          </v-btn>
        </v-flex>
      </v-subheader>
      <v-dialog persistent v-model="dialog2" style="box-shadow: 0 3px 1px -2px red;" width="55%" min-height="600px">
        <v-card>
          <v-card-title v-show="e1=='1'">
            <h2  style="font-size:25px; text-align:center; font-weight:400; width:100%; padding-top:30px;">
            Group Name
            </h2>
          </v-card-title>

          <v-stepper style="box-shadow:none !important; border-radius:10px;" v-model="e1">
            <v-stepper-header class="stepperHead">
              <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">Name of step 3</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items style="border-radius:10px">
              <v-stepper-content step="1">
                <v-flex style="margin:0 auto" xs8>
                  <h2 style="font-weight:400; font-size:16px;">Name <span style="color:red;">*</span></h2>
                </v-flex>
                <v-flex style="margin:0 auto"  xs8>
                  <v-text-field
                  style="padding:0; marging:0;"
                  v-show="CreateNewGroup"
                  v-model="New_Group_Name"
                    name="Group name"
                    hint="Minimum 8 & Maximum 40 characters allowed"
                  ></v-text-field>
                  <v-text-field
                  v-show="EditGroup"
                  style="padding:0; marging:0;"
                  v-model="groupDetail.group_name"
                    name="Group name"
                    hint="Minimum 8 & Maximum 40 characters allowed"
                  ></v-text-field>
                  <div v-if="groupNameErrorShow" style="color: red;">{{groupNameErrorText}}</div>
                  <v-subheader></v-subheader>
                </v-flex>
                <v-card-actions style="">
                  <v-btn color="error" flat @click="closeDialog()">Close</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn v-show="EditGroup" color="primary" flat @click.native="validationEditGroup()">Next</v-btn>
                  <v-btn v-show="CreateNewGroup" color="primary" flat @click.native="validationNewGroup()">Next</v-btn>
                </v-card-actions>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card-title v-show="e1 !='1'">
                  <h2 v-show="EditGroup"  style="font-size:25px; font-weight:400; text-align:center; width:100%; ">
                  {{groupDetail.group_name}}
                  </h2>
                  <h2 v-show="CreateNewGroup"  style="font-size:25px; font-weight:400; text-align:center; width:100%; ">
                  {{New_Group_Name}}
                  </h2>
                  <p style="text-align:center; width:100%;">Manage permissions for members of this group</p>
                </v-card-title>
                <v-container style="max-height:300px; padding:0; overflow-y:auto; overflow-x:hidden;">
                  <v-layout v-for="(permissionGroup, idx) in permissionList" row wrap :key="idx">
                    <v-layout>
                      <v-flex xs6 v-for="(permission, index) in permissionGroup.permissions"  style="padding: 0; margin: 0;" :key="index">
                        <div v-if="permission.title !== 'Ad-hoc campaigns' || (permission.title === 'Ad-hoc campaigns' && user.adhoc_active)">
                          <v-layout class="font-weight-bold" style="border-top:1px solid rgba(0,0,0,0.12); padding:10px 0" >
                            {{permission.title}}
                          </v-layout>
                          <v-container class="permission_p mx-0 my-0 py-1" fluid v-for="(item, key) in permission.items"
                            v-model="item.enabled"
                            :key="key"
                            :prepend-icon="item.action"
                            no-action>
                            <v-layout style="padding-top:0; padding-bottom:0; padding-right:0;">
                              <v-flex style="margin:auto;" sm9>
                                <p>{{ item.title }}</p>
                              </v-flex>
                              <v-flex sm3 style="text-align:center">
                              <v-switch  v-model="item.enabled"></v-switch>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </div>
                      </v-flex>
                      <v-divider style="padding-bottom:10px;"></v-divider>
                    </v-layout>
                  </v-layout>
                </v-container>
                <v-card-actions>
                  <v-btn color="error" flat @click="closeDialog()">Close</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="e1 = 1">Back</v-btn>
                  <v-btn color="primary" flat @click.native="e1 = 3">Next</v-btn>
                </v-card-actions>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card-title v-show="e1 !='1'">
                  <h2 v-show="EditGroup"  style="font-size:25px; font-weight:400; text-align:center; width:100%; ">
                  {{groupDetail.group_name}}
                  </h2>
                  <h2 v-show="CreateNewGroup"  style="font-size:25px; font-weight:400; text-align:center; width:100%; ">
                  {{New_Group_Name}}
                  </h2>
                  <p style="text-align:center ;width:100%;">Select employees to be a part of this group</p>
                </v-card-title>
                <v-layout style="max-height:350px;  overflow-y:auto; overflow-x:hidden; ">
                  <v-container style="padding:0; " fluid>
                    <v-layout style="max-height:110px; margin-bottom:20px;" row wrap>
                      <v-flex @click="allEmployee()" :class="{'activeSegment' : noFilterapply }" style="border:1px solid rgba(0, 0, 0, 0.12); border-radius:10px; padding:20px 30px; cursor:pointer; margin:auto; " sm5>
                        <v-layout>
                          <v-flex sm3>
                            <v-icon> fas fa-users
                            </v-icon>
                          </v-flex>
                          <v-flex sm9>
                            All Employee
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex @click="filter_dialog()" :class="{'activeSegment' : !noFilterapply }" style="border:1px solid rgba(0, 0, 0, 0.12); border-radius:10px; padding:20px 30px; cursor:pointer; margin:auto; " sm5>
                        <v-layout>
                          <v-flex sm3>
                            <v-icon> fas fa-filter
                            </v-icon>
                          </v-flex>
                          <v-flex sm9>
                            Filtered Employee
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                    <v-layout  transition="scale-transition" origin="center center" v-show="filtered_employee_segment || !noFilterapply" style=" padding-left:7%;" row wrap class="segmentFilter">
                      <!-- <v-flex sm2>
                        <p style="margin:10px 0 ">Filters applied</p>
                      </v-flex> -->
                      <v-flex sm12>
                        <div  class="inine-flex">
                          <v-layout v-for="(filtersApplied, filterName) in segmentFilter" :key="filterName">
                            <v-flex xs2>
                              <h4 class="text-capitalize" v-if="filtersApplied && filtersApplied.length > 0"> {{ filterName }} : </h4>
                            </v-flex>
                            <v-flex xs8>
                              <span v-for="(f,index) in filtersApplied" :key="index">
                                <span v-if="index < 6">{{f}},</span>
                              </span>
                            </v-flex>
                            <v-flex xs2>
                              <span v-if="(filtersApplied.length - 5) > 0">{{filtersApplied.length - 5}}&nbsp;more applied</span>
                            </v-flex>
                          </v-layout>
                        </div>
                      </v-flex>

                      <v-flex style="background:white; position: -webkit-sticky; position: sticky; top: 0;" xs4>
                        <v-list style="background:#fff;"  class=''>
                          <template v-for="(item, index) in groupHeader">
                            <v-list-tile style="border-bottom:1px solid rgba(0,0,0,0.12);" avatar :class="{'activeTab' : activeTab == item.title}" @click="updateTab(item)" :key="index">
                              <v-list-tile-content>
                                <v-list-tile-title >{{item.title}}</v-list-tile-title>
                                <v-list-tile-sub-title  v-if="!segmentFilter[item.title.toLowerCase()] || !segmentFilter[item.title.toLowerCase()].length">{{item.subtitle}}</v-list-tile-sub-title>
                                <v-list-tile-sub-title  v-else>{{segmentFilter[item.title.toLowerCase()].length}} filters selected</v-list-tile-sub-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </template>
                        </v-list>
                      </v-flex>
                      <v-flex class="filter_segments settings-left-flex " style="background:#fff;
                        min-height:100vh-200px;  border:1px solid #e1e1e1; margin:0 !important; padding-right:10px;"  xs8>

                      <v-layout class="w-100" v-for="(filter, index) in segment_filter"
                      v-show="activeTab.toLowerCase() === index" :key="index">

                        <v-flex class="scroll mx-2" style="height:250px; width:100%; margin:0 !important;">
                          <!-- <v-data-table style="width:100%;"
                            :items="filter"
                            hide-actions
                            item-key="name"
                          >
                            <template slot="items" slot-scope="props">
                              <tr >
                                <td>{{ props.item }}</td>
                                <td>
                                  <v-checkbox style="float:right;" :ripple="false"
                                    v-model="filters[props.item]"
                                    @change="updateSegmentFilters(props.item, index, filters[props.item])"
                                    primary
                                  >
                                  </v-checkbox>
                                </td>
                              </tr>
                            </template>
                          </v-data-table> -->
                          <v-data-table
                            style="width:100%;"
                            :headers="headers"
                            :items="searchSegmentfilter(index)"
                            select-all
                            item-key="name"
                            hide-actions
                            class="elevation-1"
                          >
                            <!-- eslint-disable-next-line vue/no-unused-vars -->
                            <template v-slot:headers>
                              <tr>
                                <th>
                                <v-text-field
                                  label="Search"
                                  single-line
                                  hide-details
                                  v-model="searchFilter"
                                  append-icon="fas fa-search"
                                  @keyup="searchSegmentfilter(index)"
                                ></v-text-field>
                                </th>
                                <th style="float:right;margin-top:12px;">
                                  <v-checkbox
                                    primary
                                    v-model="segmentFiltersAllSelected[index]"
                                    hide-details
                                    @click.stop="selectAllFilters(filter, index)"
                                  ></v-checkbox>
                                </th>
                              </tr>
                            </template>
                            <template slot="items" slot-scope="props">
                              <tr>
                                <td>{{ props.item }}</td>
                                <td>
                                  <v-checkbox style="float:right;" :ripple="false"
                                    v-model="filters[props.item]"
                                    @change="updateSegmentFilters(props.item, index, filters[props.item])"
                                    primary
                                  >
                                  </v-checkbox>
                                </td>
                              </tr>
                            </template>
                          </v-data-table>
                        </v-flex>
                      </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-layout>
                <v-card-actions>
                  <v-btn color="error" flat @click="closeDialog()">Close</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="e1 = 2">Back</v-btn>
                  <v-btn color="primary" v-show="CreateNewGroup" flat @click="create_segment()">Create Group</v-btn>
                  <v-btn color="primary" v-show="EditGroup" flat @click="update_segment()">Update Group</v-btn>
                </v-card-actions>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-dialog>
      <v-layout style="">
        <v-flex v-show="segment_data" xs12>
          <div class="" v-show="config.initialLoading">
            <ContentLoader
              :height="160"
              :width="400"
              :speed="2"
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <rect x="0" y="0" rx="2" ry="2" width="394.46" height="17.93" />
              <rect x="0" y="25" rx="2" ry="2" width="394.46" height="17.93" />
              <rect x="0" y="50" rx="2" ry="2" width="394.46" height="17.93" />
              <rect x="0" y="75" rx="2" ry="2" width="394.46" height="17.93" />
              <rect x="0" y="100" rx="2" ry="2" width="394.46" height="17.93" />
              <rect x="0" y="125" rx="2" ry="2" width="394.46" height="17.93" />
              <rect x="0" y="150" rx="2" ry="2" width="394.46" height="17.93" />
            </ContentLoader>
          </div>
          <v-data-table v-show="!config.initialLoading" :headers="groupHeaders" :items="company" hide-actions class="elevation-1">
            <template slot="items" class="" slot-scope="props">
              <tr class="groupListRow" @click="getAdminDetails(props.item.id);" style="cursor:pointer" :disabled="!checkPermission(['update_group','add_user_to_group','remove_user_from_group'])">
              <td class="text-xs-left">{{ props.index+1 }}</td>
              <td class="text-xs-left groupListName">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.people}}</td>
              <td class="text-xs-left">{{ props.item.employees }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-show="adminList" >
      <v-subheader style="padding-left:0; margin-bottom:50px;">
        <v-flex sm1>
          <v-btn flat icon @click="closeAdminList()">
            <V-icon>fas fa-arrow-left</V-icon>
          </v-btn>
        </v-flex>
        <v-flex  >
          <strong class="py-2 px-2" style=" font-size:18px; color:grey;">{{groupDetail.group_name}}</strong>
        </v-flex>
        <v-flex text-sm-right>
          <v-btn color="primary" @click="openPermission()" :disabled="!checkPermission(['update_group'])">Permissions</v-btn>
          <v-btn color="primary" @click="editGroup()" :disabled="!checkPermission(['update_group']) || groupDetail.master">
            <v-icon class="mr-2" small>fas fa-edit</v-icon>
            Edit Group
          </v-btn>
          <!-- <v-btn color="primary" @click.stop="addNewUser = true" :disabled="!checkPermission(['add_user_to_group'])">
            <v-icon class="mr-2" small>fas fa-plus</v-icon>Add Admin
          </v-btn> -->
          <v-btn @click="openFilter()" flat icon>
            <v-icon color="primary">fas fa-filter</v-icon>
          </v-btn>
        </v-flex>
      </v-subheader>
      <!-- <v-container style="padding: 0;">
        <v-flex v-show="userNotFound" sm12 >
          <v-alert :value="true" outline color="grey" >
              There is no admin. you can add new admin
          </v-alert>
        </v-flex>
      </v-container> -->
      <v-layout wrap row>
        <v-flex style="display:inline-block; padding:0 10px 5%;  min-height:193px " v-for="(item, idx) in groupUsersDetail" :key="idx" sm4>
          <v-card style="padding:2px 10px 7% 10px; box-shadow:none; webkit-box-shadow:none; height:100%;" class="delete-on-hover">
            <v-list>
            <v-layout style="height:20px;" >
              <v-flex sm12>
                <img style="    position: relative;
                top: -45px;
                left: 37%;
                width: 27%;"  src="../../assets/user.png">
              </v-flex>
              <v-flex class="delete-button" style="position: absolute; right: -5px; top: -5px;">
                <v-tooltip bottom>
                  <v-btn slot="activator" color="error" flat icon @click="removeUser(item.id)"
                  :disabled="!checkPermission(['remove_user_from_group']) || config.loading || item.type === 'SuperAdmin'">
                    <v-icon >fas fa-times</v-icon>
                  </v-btn>
                    Remove user
                    <!-- <span v-if="item.type !== 'SuperAdmin'"> Remove user </span>
                    <span v-else> You are not allowed to remove Super Admin from the group.  </span> -->
                </v-tooltip>
              </v-flex>
            </v-layout>
            <v-flex sm12>
              <v-list-tile style="text-align:center; height:30px;">
                <p style="text-align:center; width:100%; margin:0;">{{item.display_name}}</p>
              </v-list-tile>

              <p style="width:100%;  text-align:center; margin-bottom:0; text-transform: capitalize;" class="grey--text subtitle-1">{{item.type}}</p>
              <p style="width:100%;  text-align:center; margin-bottom:0; overflow-wrap:break-word;" class="grey--text subtitle-1">{{item.email}}</p>
              <p style="width:100%;  padding-left:20px; margin-bottom:0;" class="grey--text subtitle-1" v-if="item.department">Department : {{ item.department }}</p>
              <p style="width:100%;  padding-left:20px; margin-bottom:0;" class="grey--text subtitle-1" v-else>Department : - </p>
            </v-flex>
            <v-flex sm12>
            </v-flex>
            </v-list>
          </v-card>

        </v-flex>
        <v-flex style="display:inline-block; padding:2px 10px 5%; min-height:193px"  sm4>
        <v-card  style=" box-shadow:none; webkit-box-shadow:none; cursor:pointer; height:100%;" class="addnewadmin" @click.native="addNewUser = true" :disabled="!checkPermission(['create_group'])">
            <v-list>
            <v-layout style="height:20px;" >
            </v-layout>
            <v-flex sm12>
              <p style="width:100%;  text-align:center; margin-bottom:0; text-transform: capitalize;" class="grey--text subtitle-1">&nbsp;</p>
              <p style="width:100%;  text-align:center; margin-bottom:0;" class="grey--text subtitle-1"><v-icon class="mr-2" small>fas fa-plus</v-icon></p>
              <v-list-tile style="text-align:center; height:30px;">
                <p style="text-align:center; width:100%; margin:0;">Add Admin</p>
              </v-list-tile>

              <p style="width:100%;  padding-left:20px; margin-bottom:0;" class="grey--text subtitle-1">&nbsp;</p>
            </v-flex>
            <v-flex sm12>
            </v-flex>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog persistent v-model="addNewUser" style="box-shadow: 0 3px 1px -2px red;" width="55%" min-height="600px">
      <v-card>
        <v-card-title >
          <h2  style="font-size:25px; text-align:center; width:100%; padding-top:30px;">
            Add Admin
          </h2>
        </v-card-title>
        <v-layout style="padding-bottom:30px; margin:auto" row>
          <v-flex style="margin:auto;" xs5>
            <v-select
              autocomplete
              v-model="searchAdmin"
              :loading="loading"
              :items="group_user"
              @keyup="searchUser(search)"
              :search-input.sync="search"
              label="Please enter email id"
            ></v-select>
            <span slot=“no-options”> </span>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-btn color="error" flat @click="closeAddAdmin()">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="addUser()">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="viewPermission" class="" persistent max-width="55%">
      <v-card>
        <v-layout style="border:1px solid rgba(0,0,0,0.12);">
        <v-flex style="" sm12>
          <h2 style="border-bottom:1px solid rgba(0,0,0,0.12); color: grey; padding-left:10px;">Permissions

          </h2>
          <v-container style="max-height:300px;  overflow-y:auto; overflow-x:hidden;">
            <v-layout v-for="(permissionGroup, index) in permissionList" row wrap :key="index">
              <!-- <v-flex class="font-weight-bold" sm6 v-for="permission in permissionGroup.permissions"
              v-if="permission.title !== 'Ad-hoc campaigns' || (permission.title === 'Ad-hoc campaigns' && user.adhoc_active)"
              style=" padding:10px 0">
                {{permission.title}}
              </v-flex>-->
              <v-layout>
                <v-flex xs6 v-for="(permission ,idx) in permissionGroup.permissions" :key="idx"
                style="padding: 0; margin: 0;">
                  <div v-if="permission.title !== 'Ad-hoc campaigns' || (permission.title === 'Ad-hoc campaigns' && user.adhoc_active)">
                    <v-flex class="font-weight-bold" style=" padding:10px 0">
                      {{permission.title}}
                    </v-flex>
                    <v-container class="permission_p mx-0 my-0 py-1" fluid v-for="(item, key) in permission.items"
                      v-model="item.enabled"
                      :key="key"
                      :prepend-icon="item.action"
                      no-action>
                      <v-layout style="padding-top:0; padding-bottom:0; padding-right:0;">
                        <v-flex style="margin:auto;" sm9>
                          <p>{{ item.title }}</p>
                        </v-flex>
                        <v-flex sm3 style="text-align:center">
                        <v-switch  :color="item.enabled ? 'primary': ''" v-model="item.enabled"
                        :disabled="groupDetail.master">
                        </v-switch>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </div>
                </v-flex>
                <v-divider style="padding-bottom:10px;"></v-divider>
              </v-layout>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
        <v-card-actions>
          <v-btn color="error" flat @click="viewPermission = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="update_segment()">Update Permission</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="viewFilter" persistent max-width="55%">
      <v-card>

          <h2 style="padding-left:10px; color: grey; ">Filters</h2>
          <v-layout  style="border-top:1px solid rgba(0,0,0,0.12);border-bottom:1px solid rgba(0,0,0,0.12);">
            <!-- <v-flex style="padding:10px" sm2>
              <p style="margin:0px ">Filters applied :- </p>
            </v-flex> -->
            <v-flex v-if="!noFilterapply" style="padding:10px" sm12 >
              <div class="inine-flex">
                <v-layout v-for="(filterName, index) in noFilter" :key="index">
                  <v-flex xs2 v-if="true">
                    <h4 class="text-capitalize"> {{ filterName.title }} : </h4>
                  </v-flex>
                  <v-flex xs10 v-if="segmentFilter[filterName.title.toLowerCase()] && segmentFilter[filterName.title.toLowerCase()].length > 0">
                    <span v-for="(filter ,index) in segmentFilter[filterName.title.toLowerCase()]" :key="index">
                      {{filter}},
                    </span>
                  </v-flex>
                  <v-flex xs10 v-if="!segmentFilter[filterName.title.toLowerCase()] || segmentFilter[filterName.title.toLowerCase()].length === 0">
                    {{ filterName.title1 }}
                  </v-flex>
                </v-layout>
              </div>
            </v-flex>
            <v-flex v-if="noFilterapply"  style="padding:10px" sm9 >
              <div class="inine-flex">
                <v-layout v-for="(filterName, index) in noFilter" :key="index">
                  <v-flex xs2>
                    <h4 class="text-capitalize"> {{ filterName.title }} : </h4>
                  </v-flex>
                  <v-flex xs10>
                      {{filterName.title1}},
                  </v-flex>
                </v-layout>
              </div>
            </v-flex>
          </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click="viewFilter = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import { VChip, VMenu, VSubheader, VAvatar, VCheckbox, VSwitch, VAlert, VTooltip, VAutocomplete } from 'vuetify';

export default {
  name: 'settings',
  components: {
    ContentLoader
    // VAutocomplete,
    // VChip,
    // VMenu,
    // VSubheader,
    // VAvatar,
    // VCheckbox,
    // VSwitch,
    // VAlert,
    // VTooltip
  },
  data () {
    return {
      groupNameErrorShow: false,
      groupNameErrorText: '',
      searchFilter: '',
      headers: [],
      segmentFiltersAllSelected: {},
      viewFilter: false,
      viewPermission: false,
      noFilterapply: true,
      groupSegment: {},
      groupUsersDetail: [],
      groupUsersDetailId: [],
      AllEmployeeeSelected: true,
      searchAdmin: '',
      group_permission: [],
      New_Group_Name: '',
      groupDetail: [{
        group_name: '',
        segments: ''
      }],
      CreateNewGroup: false,
      EditGroup: false,
      segmentFilter: [],
      segmentFilter1: [],
      userNotFound: false,
      abc: [],
      updateUser: false,
      states: [],
      group_user: [],
      loading: false,
      search: null,
      admin: [],
      groupPermission: [],
      adminPermissions: [],
      group_id: '',
      groupList: true,
      adminList: false,
      activeTab: 'Location',
      groupHeader: [{
        title: 'Location',
        subtitle: 'All Locations Selected',
        subtitle1: ''
      }, {
        title: 'Grade',
        subtitle: 'All Grades Selected',
        subtitle1: ''
      }, {
        title: 'Department',
        subtitle: 'All Departments Selected',
        subtitle1: ''
      }, {
        title: 'Gender',
        subtitle: 'All Genders Selected',
        subtitle1: ''
      }, {
        title: 'Business',
        subtitle: 'All Business Selected',
        subtitle1: ''
      }, {
        title: 'Site',
        subtitle: 'All Sites Selected',
        subtitle1: ''
      }],
      noFilter: [{
        title: 'Location',
        title1: 'All Locations Selected'
      }, {
        title: 'Grade',
        title1: 'All Grades Selected'
      }, {
        title: 'Department',
        title1: 'All Departments Selected'
      }, {
        title: 'Gender',
        title1: 'All Genders Selected'
      }, {
        title: 'Business',
        title1: 'All Business Selected'
      }, {
        title: 'Site',
        title1: 'All Sites Selected'
      }],
      e1: 0,
      dialog2: false,
      addNewUser: false,
      sement_name: '',
      filter_data: [],
      filterdata: [],
      notifications: false,
      edit_segment: '',
      temp: [],
      filters: {},
      segment_filter: null,
      company: [],
      title: '',
      // search: {
      //   queryLocation: '',
      //   queryStatus: ''
      // },
      filtered_employee_segment: false,
      activeFiltered: 'activeAllEmployee',
      company_user: {},
      segment_id: '',
      checkbox: false,
      config: {
        loading: false,
        initialLoading: true
      },
      id: '',
      groupitem: '',
      add_segment: false,
      segment_data: true,
      segment_user_data: true,
      allemployee_seg: false,
      groupHeaders: [{
        text: 'S.no',
        sortable: false,
        value: 'serial'
      }, {
        text: 'Name',
        sortable: false,
        value: 'name'
      }, {
        text: 'Admins',
        sortable: false,
        value: 'people'
      }, {
        text: 'Employees',
        sortable: false,
        value: 'employess'
      }],
      e2: null,
      permissionList: [{
        name: 'companyProfle_integrations',
        permissions: [{
          title: 'Company profile',
          items: [{
            title: 'Update company profile',
            value: 'update_company_profile',
            enabled: false
          }]
        }, {
          title: 'Integrations',
          items: [{
            title: 'Manage integrations',
            value: 'manage_integrations',
            enabled: false
          }]
        }]
      }, {
        name: 'accessControl_employeeAction',
        permissions: [{
          title: 'Access Control Panel',
          items: [{
            title: 'Create group',
            value: 'create_group',
            enabled: false
          }, {
            title: 'Update group',
            value: 'update_group',
            enabled: false
          }, {
            title: 'Add user to a group',
            value: 'add_user_to_group',
            enabled: false
          }, {
            title: 'Remove user from a group',
            value: 'remove_user_from_group',
            enabled: false
          }
          // {
          //   "title": "Change group of a user",
          //   "value": "change_user_group" ,
          //   "enabled": false
          // }
          ]
        }, {
          title: 'Employee actions',
          items: [{
            title: 'Send sms',
            value: 'send_sms',
            enabled: false
          }, {
            title: 'Add comment',
            value: 'add_note',
            enabled: false
          }, {
            title: 'Add tag',
            value: 'add_tag',
            enabled: false
          }, {
            title: 'Schedule invite',
            value: 'schedule_invite',
            enabled: false
          }, {
            title: 'Send email',
            value: 'send_email',
            enabled: false
          }, {
            title: 'Change status',
            value: 'change_status',
            enabled: false
          }]
        }]
      }, {
        name: 'email_anonymousMessage',
        permissions: [{
        //   "title": "Email templates",
        //   "items": [{
        //     "title": "Create email template" ,
        //     "value":"create_email_template",
        //     "enabled": false
        //   },{
        //     "title": "Update email template" ,
        //     "value":"update_email_template",
        //     "enabled": false
        //   },{
        //     "title": "Delete email template" ,
        //     "value":"delete_email_template",
        //     "enabled": false
        //   }]
        // },{
          title: 'Anonymous message',
          items: [{
            title: 'View anonymous message',
            value: 'view_anonymous_message'
          }, {
            title: 'Reply to anonymous message',
            value: 'reply_anonymous_message'
          }]
        }, {
          title: 'Employee',
          items: [{
            title: 'Manage employee',
            value: 'manage_employee'
          }]
        }]
      }, {
        name: 'milestones_employee',
        permissions: [{
          title: 'Milestones',
          items: [{
            title: 'Manage milestones',
            value: 'manage_milestone'
          }]
        // }, {
        //   "title": "Employee",
        //   "items": [{
        //     "title": "Manage employee" ,
        //     "value":"manage_employee"
        //   }]
        }, {
          title: 'Ad-hoc campaigns',
          items: [{
            title: 'Manage ad-hoc campaigns',
            value: 'manage_adhoc'
          }]
        }]
      }]
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    // filteredListLocation () {
    //   if (this.filterOptions.location) {
    //     const self = this;
    //     return this.filterOptions.location.filter(function a (r) {
    //       return (
    //         r.toLowerCase().indexOf(self.search.queryLocation.toLowerCase()) >=
    //         0
    //       );
    //     });
    //   }
    //   return [];
    // },
    segmentPermissions () {
      const temp = [];
      this.$lodash.each(this.permissionList, (permissionGroup) => {
        this.$lodash.each(permissionGroup.permissions, (permission) => {
          this.$lodash.each(permission.items, (item) => {
            if (item.enabled) {
              temp.push(item.value);
            }
          });
        });
      });
      return temp;
    }
  },
  watch: {
    search (val) {
      val && this.querySelections(val);
    },
    groupNameErrorShow () {
      if (this.groupNameErrorShow) {
        setTimeout(() => {
          this.groupNameErrorShow = false;
        }, 4000);
      }
    }
  },
  methods: {
    searchSegmentfilter (k) {
      if (this.segment_filter[k]) {
        const filter = this.segment_filter[k];
        if (this.searchFilter) {
          const tempData = filter.filter((r) => { return r.toLowerCase().indexOf(this.searchFilter.toLowerCase()) >= 0; });
          return tempData;
        } else if (!this.searchFilter) {
          return filter;
        }
      }
      return [];
    },
    selectAllFilters (f, type) {
      if ((this.segmentFilter[type] && this.segmentFilter[type].length) ===
          (this.segment_filter[type] && this.segment_filter[type].length)) {
        this.segmentFiltersAllSelected[type] = false;
        this.segmentFilter = {
          ...this.segmentFilter
        };
        this.segmentFilter[type] = [];
        this.$lodash.each(f, (val) => {
          const t = {
            [val]: false
          };
          this.filters = {
            ...this.filters,
            ...t
          };
        });
      } else {
        this.segmentFiltersAllSelected[type] = true;
        this.segmentFilter = {
          ...this.segmentFilter
        };
        this.segmentFilter[type] = [];
        this.$lodash.each(f, (val) => {
          this.segmentFilter[type].push(val);
        });
        this.$lodash.each(f, (val) => {
          const t = {
            [val]: true
          };
          this.filters = {
            ...this.filters,
            ...t
          };
        });
      }
    },
    openFilter () {
      this.viewFilter = true;
    },
    openPermission () {
      this.viewPermission = true;
    },
    updateSegmentFilters (filterValue, filter, ev) {
      setTimeout(() => {
        let match = -1;
        if (this.segmentFilter && this.segmentFilter[filter]) {
          match = this.$lodash.findIndex(this.segmentFilter[filter], temp => temp === filterValue);
          if (ev && match <= -1) {
            this.segmentFilter[filter].push(filterValue);
          } else if (!ev && match > -1) {
            this.segmentFilter[filter].splice(match, 1);
          }
        } else {
          const filters = [];
          filters.push(filterValue);
          const temp = {
            [filter]: filters
          };
          this.segmentFilter = {
            ...this.segmentFilter,
            ...temp
          };
        }
        return this.segmentFilter;
      }, 500);
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
    addNewGroup () {
      this.dialog2 = true;
      this.CreateNewGroup = true;
      this.EditGroup = false;
      this.segmentFilter = [];
      this.New_Group_Name = '';
      this.filters = {};
      this.noFilterapply = true;
    },
    editGroup () {
      this.dialog2 = true;
      this.EditGroup = true;
      this.CreateNewGroup = false;
      // this.segmentPermissions = this.group_permission;
      this.$lodash.each(this.group_permission, (perm) => {
        this.$lodash.each(this.permissionList, (permissionGroup) => {
          this.$lodash.each(permissionGroup.permissions, (permission) => {
            this.$lodash.each(permission.items, (item) => {
              if (item.value === perm) {
                item.enabled = true;
              }
            });
          });
        });
      });
    },
    addUser (id) {
      let temp = '';
      this.$lodash.each(this.states, (value, key) => {
        if (value.email === this.searchAdmin) {
          temp = key;
        }
      });
      // eslint-disable-next-line no-unused-expressions
      this.states[temp].user_id;
      axios.post(`${process.env.VUE_APP_API_URL}group/add-user`, {
        group_id: this.groupId,
        user_id: this.states[temp].user_id
      })
        .then(response => {
          if (response === 201 || response === 200) {
            this.addNewUser = false;
            this.getAdminDetails(this.groupId);
            this.search = '';
            this.searchAdmin = '';
            this.group_user = [];
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'User successfully added!'
            });
          }
        }, response => {
          this.config.initialLoading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to add user, Please try again later!'
          });
          throw new Error(response);
        });
    },
    removeUser (id) {
      this.config.loading = true;
      axios.delete(`${process.env.VUE_APP_API_URL}group/remove-user/${this.groupId}/${id}`)
        .then(response => {
          if (response === 201 || response === 200) {
            this.config.loading = false;
            this.addNewUser = false;
            this.getAdminDetails(this.groupId);
            this.search = '';
            this.searchAdmin = '';
            this.group_user = [];
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'User removed!'
            });
          }
        }, response => {
          this.config.loading = false;
          this.config.initialLoading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to remove user, Please try again later!'
          });
          throw new Error(response);
        });
    },
    closeAddAdmin () {
      this.addNewUser = false;
      this.search = '';
      this.searchAdmin = '';
      this.group_user = [];
    },
    querySelections (v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.group_user.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    searchUser (search) {
      if (search.length < 3 && search.length > 0) {
        this.$store.dispatch('updateSnackbar', {
          color: 'info',
          show: true,
          text: 'Enter minimum 4 digit to search!'
        });
      } else if (search.length > 3) {
        setTimeout(() => {
          axios.get(`${process.env.VUE_APP_API_URL}users/list?raw_search_string=${search}&fields=display_name,email,employee_id&page_limit=5`)
            .then((response) => {
              if (response && response.data) {
                this.states = response.data.data;
                const temp = [];
                this.$lodash.each(this.states, (value, key) => {
                  temp.push(value.email);
                });
                this.group_user = temp;
              }
            }, (response) => {
              this.config.initialLoading = false;
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: 'Unable to fetch employee, Please try again later!'
              });
              throw new Error(response);
            });
        }, 500);
      }
    },
    validationNewGroup () {
      const regex = /[!@#$%^&*();,.?":{}|<>]/g;
      const testName = regex.test(this.New_Group_Name);
      if (this.New_Group_Name === '') {
        this.groupNameErrorShow = true;
        this.groupNameErrorText = 'Please enter group name !';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Please enter group name !'
        });
      } else if (this.New_Group_Name.length < 6) {
        this.groupNameErrorShow = true;
        this.groupNameErrorText = 'Group name must contain at least 8 characters !';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Group name must contain at least 8 characters !'
        });
      } else if (this.New_Group_Name.length > 40) {
        this.groupNameErrorShow = true;
        this.groupNameErrorText = 'Group name can not contain more than 40 characters !';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Group name can not contain more than 40 characters !'
        });
      } else if (testName) {
        this.groupNameErrorShow = true;
        this.groupNameErrorText = 'Group name shouldn\'t contain special characters. !';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Group name shouldn\'t contain special characters. !'
        });
      } else {
        this.groupNameErrorShow = false;
        this.groupNameErrorText = '';
        this.e1 = 2;
      }
    },
    validationEditGroup () {
      const regex = /[!@#$%^&*();,.?":{}|<>]/g;
      const testName = regex.test(this.groupDetail.group_name);
      if (this.groupDetail.group_name === '') {
        this.groupNameErrorShow = true;
        this.groupNameErrorText = 'Please enter group name !';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Please enter group name !'
        });
      } else if (this.groupDetail.group_name.length < 6) {
        this.groupNameErrorShow = true;
        this.groupNameErrorText = 'Group name must contain at least 8 characters !';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Group name must contain at least 8 characters !'
        });
      } else if (this.groupDetail.group_name.length > 40) {
        this.groupNameErrorShow = true;
        this.groupNameErrorText = 'Group name can not contain more than 40 characters !';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Group name can not contain more than 40 characters !'
        });
      } else if (testName) {
        this.groupNameErrorShow = true;
        this.groupNameErrorText = 'Group name shouldn\'t contain special characters. !';
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Group name shouldn\'t contain special characters. !'
        });
      } else {
        this.groupNameErrorShow = false;
        this.groupNameErrorText = '';
        this.e1 = 2;
      }
    },
    updateTab (item) {
      this.activeTab = item.title;
    },
    filter_dialog () {
      this.filtered_employee_segment = true;
      this.activeFiltered = '';
      this.noFilterapply = false;
    },
    allEmployee () {
      this.filtered_employee_segment = false;
      this.activeFiltered = 'activeAllEmployee';
      this.noFilterapply = true;
      this.segmentFilter = {};
    },
    getGroupList () {
      axios.get(`${process.env.VUE_APP_API_URL}group/list`).then(
        response => {
          this.config.initialLoading = false;
          if (response && response.data) {
            this.company = response.data.data;
            this.$lodash.each(this.company, (value, key) => {
              this.group_id = value.id;
            });
          }
        },
        response => {
          this.config.initialLoading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to fetch group list, Please try again later!'
          });
          throw new Error(response);
        }
      );
    },
    getAdminDetails (id) {
      axios.get(`${process.env.VUE_APP_API_URL}group/detail?group_id=${id}`).then(
        response => {
          if (response && response.data) {
            this.groupId = id;
            this.groupDetail = response.data.data;
            this.groupPermission = response.data.data.permissions;
            const temp = [];
            this.$lodash.each(this.groupPermission, (value, key) => {
              temp.push(value.codename);
            });
            this.group_permission = temp;

            this.segmentFilter = {};
            this.filters = {};
            const filters = response.data.data.segments;
            this.$lodash.each(filters, (value, key) => {
              let newFilter = {};
              if (value) {
                newFilter = {
                  [`${key.split('__in')[0]}`]: value.split(',')
                };
              // this.activeFiltered = '';
              // this.filtered_employee_segment = true;
              }
              this.segmentFilter = {
                ...this.segmentFilter,
                ...newFilter
              };
              const temp = value.split(',');
              this.$lodash.each(temp, (v, k) => {
                this.filters[v] = true;
              });
              this.$forceUpdate();
            });
            this.$lodash.each(this.segmentFilter, (value, filter) => {
              this.$lodash.each(value, (v, k) => {
                this.filters[v] = true;
              });
            });
            this.adminList = true;
            this.groupList = false;
            const temp1 = [];
            this.groupUsersDetail = response.data.data.users;
            this.$lodash.each(this.groupUsersDetail, (value, key) => {
              temp1.push(value.id);
            });
            this.groupUsersDetailId = temp1;
            const temp2 = [];
            this.$lodash.each(this.segmentFilter, (value, key) => {
              temp2.push(value.d);
            });
            this.segmentFilter1 = temp2;
            if (this.segmentFilter1.length === 0) {
              this.noFilterapply = true;
            }
            if (!this.segmentFilter1.length === 0) {
              this.noFilterapply = false;
            }
            if (this.groupDetail.users.length === 0) {
              this.userNotFound = true;
            } else {
              this.userNotFound = false;
            }
            this.$lodash.each(this.group_permission, (perm) => {
              this.$lodash.each(this.permissionList, (permissionGroup) => {
                this.$lodash.each(permissionGroup.permissions, (permission) => {
                  this.$lodash.each(permission.items, (item) => {
                    if (item.value === perm) {
                      item.enabled = true;
                    }
                  });
                });
              });
            });
          }
          if (this.noFilterapply) {
            this.activeFiltered = 'activeAllEmployee';
          } else if (!this.noFilterapply) {
            this.activeFiltered = '';
          }
        },
        response => {
          this.config.initialLoading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to fetch group details, Please try again later!'
          });
          throw new Error(response);
        }
      );
      if (this.segmentFilter === {}) {
        this.filterdEmployee = false;
        this.AllEmployeeeSelected = true;
      }
      if (this.segmentFilter !== {}) {
        this.AllEmployeeeSelected = false;
        this.filterdEmployee = true;
      }
    },
    editUser () {
      this.adminList = true;
      this.groupList = false;
    },
    getSegmentFilter () {
      axios.get(`${process.env.VUE_APP_API_URL}group/segment-filters`).then(
        response => {
          if (response && response.data) {
            this.segment_filter = response.data.data;
          }
        },
        response => {
          this.config.initialLoading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to fetch segment filters, Please try again later!'
          });
          throw new Error(response);
        }
      );
    },
    create_segment () {
      const temp = JSON.parse(JSON.stringify(this.segmentFilter));
      let filters = {};
      this.$lodash.each(temp, (value, key) => {
        let newFilter = {};
        newFilter = {
          [`${key}__in`]: value.join()
        };
        filters = {
          ...filters,
          ...newFilter
        };
      });
      axios.post(`${process.env.VUE_APP_API_URL}group/create`, {
        group_name: this.New_Group_Name,
        permissions: this.segmentPermissions,
        segments: filters
      })
        .then(
          response => {
            if (response === 201 || response === 200) {
              this.dialog2 = false;
              this.getGroupList();
              this.e1 = 1;
              this.$store.dispatch('updateSnackbar', {
                color: 'success',
                show: true,
                text: 'Group successfully created!'
              });
            }
          },
          response => {
            this.config.initialLoading = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to create group, Please try again later!'
            });
            throw new Error(response);
          }
        );
    },
    update_segment (id) {
      const temp = JSON.parse(JSON.stringify(this.segmentFilter));
      let filters = {};
      this.$lodash.each(temp, (value, key) => {
        let newFilter = {};
        newFilter = {
          [`${key}__in`]: value.join()
        };
        filters = {
          ...filters,
          ...newFilter
        };
      });
      axios.patch(`${process.env.VUE_APP_API_URL}group/update`, {
        group_id: this.groupId,
        group_name: this.groupDetail.group_name,
        permissions: this.segmentPermissions,
        segments: filters
      }).then(response => {
        if (response === 201 || response === 200) {
          this.viewPermission = false;
          this.dialog2 = false;
          this.getGroupList();
          this.getAdminDetails(this.groupId);
          this.e1 = 1;
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Group successfully edited!'
          });
        }
      }, response => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to edit group, Please try again later!'
        });
        throw new Error(response);
      });
    },
    validateDetails () {
      this.$validator.validateAll().then(res => {
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
    addsegment () {
      this.segment_data = true;
      this.add_segment = true;
      this.add_segment = 'add Segment';
      this.segment_data = false;
    },
    closeAdminList () {
      this.adminList = false;
      this.groupList = true;
      this.$lodash.each(this.group_permission, (perm) => {
        this.$lodash.each(this.permissionList, (permissionGroup) => {
          this.$lodash.each(permissionGroup.permissions, (permission) => {
            this.$lodash.each(permission.items, (item) => {
              if (item.value === perm) {
                item.enabled = false;
              }
            });
          });
        });
      });
      this.getGroupList();
    },
    cancel_new_segment () {
      this.segment_data = true;
      this.add_segment = false;
      this.segment_user_data = true;
    },
    closeDialog () {
      this.dialog2 = false;
      this.e1 = 1;
      this.segmentFilter = [];
      this.New_Group_Name = '';
      this.filters = {};
    }
  },
  beforeMount () {
    this.getGroupList();
    this.getSegmentFilter();
    this.allEmployee();
    // this.getGroupFilter();
    // this.getAdminDetails();
  }
};
</script>
<style lang="scss">
.groupListRow:hover{
  .groupListName{
    color:var(--v-primary-base);
  }

}
  .expensionHeader , .filter_segments{
  .v-expansion-panel__header{
    background: #fafafa !important;
  }
  // thead{
  //   display: none;
  // }
}
.accent--text{
  color:var(--v-primary-base) !important;
}
.filter_segment , .accessGroupList{
  thead{
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.v-input--selection-controls {
  margin-top: 5px;
}
.v-input--selection-controls .v-input__slot {
  margin: 0;
}
.activebutton {
  background-color: rgba(224, 224, 224, 0.671);
  border: 2px solid rgb(63, 248, 6);
}
.scroll {
  overflow-y: auto;
}
.filter_segment , .accessGroupList{
  thead{
    display: none;
  }
}
.stepperHead{
  display: none;
}
.expensionHeader , .filter_segments{
  .v-expansion-panel__header{
    background: #fafafa !important;
  }
  // thead{
  //   display: none;
  // }
}
.v-dialog{
      box-shadow: 0px 2px 5px -7px rgba(10, 211, 100, 0.2),
       0px 3px 6px 3px rgba(0, 211, 100,0.14),
       0px 1px 7px 1px rgba(0, 211, 100,0.12);
}
.permission_p{
  p{
    margin:0;
  }
}
.segmentFilter{
  .activeTab{
    color:var(--v-primary-base);
    border-left: 2px solid var(--v-primary-base);
    border-right: none;
    .theme--light.v-icon{
      color: var(--v-primary-base);
    }
  }
}

  .activeSegment{
    border:2px solid var(--v-primary-base) !important;
  }
  .delete-on-hover {
  &:hover {
    transform: scale(1.03);
    .delete-button {
      display: block;
    }
  }

  .delete-button {
    display: none;
    position: absolute;
    right: 0;
  }
}
.addnewadmin{
    &:hover {
    transform: scale(1.03);
    .v-icon,p{
      color:var(--v-primary-base);
    }
  }
  }
</style>
