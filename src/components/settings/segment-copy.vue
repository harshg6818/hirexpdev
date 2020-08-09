<template>
  <div>
    <v-subheader style="padding-left:0;">
      <v-flex>

        <strong class="py-2 px-2" style=" font-size:18px; color:grey;">Access Group</strong>
      </v-flex>

      <v-flex text-sm-right>
        <!-- <v-btn icon flat color="primary"
          v-show="!config.editable"
          @click="config.editable=true;"
        >
          <v-icon small>fas fa-edit</v-icon>
        </v-btn>
        <v-btn flat color="success"
          v-show="config.editable"
          :loading="config.loading"
          :disabled="config.loading"
          @click="validateDetails();"
        >
          <v-icon class="mr-2">fas fa-save</v-icon>Save
        </v-btn>-->
        <v-btn color="primary" dark @click.stop="dialog2 = true"><v-icon class="mr-2" small>fas fa-plus</v-icon>Add Group</v-btn>
        <!-- <v-btn @click="addsegment()" slot="activator" flat round color="primary">
          <v-icon class="mr-2" small>fas fa-plus</v-icon>Add Group
        </v-btn> -->
      </v-flex>
    </v-subheader>
          <v-dialog v-model="dialog2" width="45%" min-height="500px">
        <v-card>
          <v-card-title v-show="e1=='1'" style="font-size:20px">
            Create a Group
          </v-card-title>
             <v-stepper style="box-shadow:none !important;" v-model="e1">
    <v-stepper-header class="stepperHead">
      <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Name of step 3</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
      <v-flex style="margin:0 auto" xs8>
        <h2>Name</h2>
      </v-flex>
      <v-flex style="margin:0 auto"  xs8>
        <v-text-field
        v-model="groupName"
          id="testing"
          name="input-1"
        ></v-text-field>
      </v-flex>
    <v-btn color="primary" flat @click.stop="dialog2=false">Close</v-btn>
        <v-btn color="primary" style="float:right" @click.native="e1 = 2">Next<v-icon>
          fas fa-arrow-right
        </v-icon></v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-flex xs12>
        <h2>{{groupName}}</h2>
      </v-flex>
              <v-layout class="accessGroupList">
          <v-app style="width:100%;" id="inspire">
          <v-data-table style="width:100%;"
            :headers="headers"
            :items="filter_data"
            hide-actions
            item-key="name"
          >
            <template slot="items" slot-scope="props">
              <tr @click="props.item.expanded = !props.item.expanded">
                <td>{{ props.item.value }}</td>
                <td>
                  <v-checkbox style="float:right;"
                    v-model="props.selected"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
              </tr>
              <v-card style="border-radius: unset !important;
    border-top: 0; border-left:0;
    width: 128% !important;" flat v-if="props.item.expanded">
                <v-card-text>
                  <v-data-table style="width:100%;"
            :headers="headers"
            :items="company"
            hide-actions
            item-key="name"
          >
          <template slot="items" slot-scope="props">
              <tr style="border:none" @click="props.item.expanded = !props.item.expanded">
                <td>{{ props.item.name }}</td>
                <td>
                  <v-checkbox style="float:right;"
                    v-model="props.selected"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
              </tr>
          </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </template>
          </v-data-table>
          </v-app>
        </v-layout>
    <v-btn color="primary" flat @click.stop="dialog2=false">Close</v-btn>
        <v-btn flat @click.native="e1 = 1">Back</v-btn>
        <v-btn color="primary" style="float:right"  @click.native="e1 = 3">Next<v-icon>
          fas fa-arrow-right
        </v-icon></v-btn>

      </v-stepper-content>
      <v-stepper-content step="3">
        <v-layout>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex sm4>
                <v-subheader>Access to</v-subheader>
              </v-flex>
              <v-flex xs6>
                <v-select
                  :items="accessTo"
                  @change="filter_dialog()"
                  v-model="e2"
                  label="Select"
                  class="input-group--focused"
                  item-value="text"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout v-show="filtered_employee_segment">
               <v-expansion-panel class="expensionHeader" expand>
    <v-expansion-panel-content  >
      <div  slot="header">Location</div>
      <v-card>
        <v-flex>
                    <v-data-table style="width:100%;"
                      :items="segment_filter_location"
                      hide-actions
                      item-key="name"
                    >
                      <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded">
                          <td>{{ props.item }}</td>
                          <td>
                          <v-checkbox style="float:right;"
                            v-model="props.items"
                            value="props.items"
                            primary
                            hide-details
                          ></v-checkbox>
                        </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-flex>
      </v-card>
    </v-expansion-panel-content>
    <v-expansion-panel-content >
      <div slot="header">Department</div>
      <v-card>
        <v-flex>
                    <v-data-table style="width:100%;"
                      :items="segment_filter_department"
                      hide-actions
                      item-key="name"
                    >
                      <template slot="items" slot-scope="props">
                        <tr >
                          <td>{{ props.item }}</td>
                          <td>
                          <v-checkbox style="float:right;"
                            v-model="props.selected"
                            primary
                            hide-details
                          ></v-checkbox>
                        </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-flex>
      </v-card>
    </v-expansion-panel-content>
    <v-expansion-panel-content >
      <div slot="header">Gender</div>
      <v-card>
        <v-flex>
                    <v-data-table style="width:100%;"
                      :items="segment_filter_gender"
                      hide-actions
                      item-key="name"
                    >
                      <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded">
                          <td>{{ props.item }}</td>
                          <td>
                          <v-checkbox style="float:right;"
                            v-model="props.selected"
                            primary
                            hide-details
                          ></v-checkbox>
                        </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-flex>
                  </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
            </v-layout>
            <!-- <v-layout v-show="filtered_employee_segment" class="filter_segment" style=" margin:0; border:1px solid rgba(0,0,0,0.12);" row wrap>
          <v-flex sm4>
            <v-card flat class="scroll mx-2" style="height:250px; border:none">
              <v-card-text>
                <p style="font-size:16px; margin:0; padding:0;">Location</p>
                <v-layout row wrap>
                  <v-flex>
                    <v-data-table style="width:100%;"
                      :items="segment_filter_location"
                      hide-actions
                      item-key="name"
                    >
                      <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded">
                          <td>{{ props.item }}</td>
                          <td>
                          <v-checkbox style="float:right;"
                            v-model="props.items"
                            value="props.items"
                            primary
                            hide-details
                          ></v-checkbox>
                        </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex sm4>
            <v-card flat class="scroll mx-2" style="height:250px; border:none">
              <v-card-text>
                <p style="font-size:16px; margin:0; padding:0;">Department</p>
                <v-layout row wrap>
                  <v-flex>
                    <v-data-table style="width:100%;"
                      :items="segment_filter_department"
                      hide-actions
                      item-key="name"
                    >
                      <template slot="items" slot-scope="props">
                        <tr >
                          <td>{{ props.item }}</td>
                          <td>
                          <v-checkbox style="float:right;"
                            v-model="props.selected"
                            primary
                            hide-details
                          ></v-checkbox>
                        </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex sm4>
            <v-card flat class="scroll mx-2" style="height:250px; border:none">
              <v-card-text>
                <p style="font-size:16px; margin:0; padding:0;">Gender</p>
                <v-layout row wrap>
                  <v-flex>
                    <v-data-table style="width:100%;"
                      :items="segment_filter_gender"
                      hide-actions
                      item-key="name"
                    >
                      <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded">
                          <td>{{ props.item }}</td>
                          <td>
                          <v-checkbox style="float:right;"
                            v-model="props.selected"
                            primary
                            hide-details
                          ></v-checkbox>
                        </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout> -->
          </v-container>
        </v-layout>
        <v-btn color="primary" flat @click.stop="dialog2=false">Close</v-btn>
          <v-btn flat @click.native="e1 = 2">Back</v-btn>
              <v-btn
              style="float:right;"
                @click="create_segment()"
                color="info"
              >Create group</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
          <v-card-actions>

          </v-card-actions>
        </v-card>
      </v-dialog>

<!--
    <v-layout style>
      <v-container
        v-show="add_segment"
      >
        <v-flex style sm12>
          <p
            style="font-size:18px !important; color:#212121;"
            v-if="this.edit_segment == 'Edit Segment' && this.add_segment == true"
            class="headline mt-1 mb-0"
          >Edit Group</p>

          <p
            style="font-size:18px !important; color:#212121;"
            v-if="this.add_segment =='add Segment'"
            class="headline mt-1 mb-0"
          >Create New Group</p>
        </v-flex>
        <v-stepper v-model="e1">
    <v-stepper-header class="stepperHead">
      <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Name of step 3</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card color="grey lighten-1" class="mb-5" height="200px">
          1
        </v-card>

        <v-btn @click="cancel_new_segment()" flat color="error">cancel</v-btn>
        <v-btn color="primary" style="float:right" @click.native="e1 = 2">Next</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-5" height="200px">
        2
        </v-card>
        <v-layout>
        <v-flex sm7>
        <v-btn @click="cancel_new_segment()" flat color="error">cancel</v-btn>
        </v-flex>
        <v-flex sm5>
        <v-btn flat @click.native="e1 = 1">Back</v-btn>
        <v-btn color="primary" style="float:right"  @click.native="e1 = 3">Next</v-btn>
        </v-flex>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-5" height="200px">
          3
        </v-card>
        <v-layout>
          <v-flex sm7>
            <v-btn @click="cancel_new_segment()" flat color="error">Cancel</v-btn>
          </v-flex>
          <v-flex sm5>
          <v-btn flat @click.native="e1 = 2">Back</v-btn>
          <v-btn
                @click="update_segment()"
                v-if="this.edit_segment == 'Edit Segment' && this.add_segment == true"
                color="info"
              >Update segment</v-btn>
              <v-btn
              style="float:right;"
                @click="create_segment()"
                v-if="this.add_segment =='add Segment'"
                color="info"
              >Create segment</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper> -->
          <!-- <v-flex sm5 class>
            <v-text-field
              v-if="this.edit_segment == 'Edit Segment' && this.add_segment == true"
              v-model="title"
              name="input-1"
              label="Name"
            ></v-text-field>
            <v-text-field
              v-if="this.add_segment =='add Segment'"
              v-model="sement_name"
              name="input-1"
              label="Name"
            ></v-text-field>
          </v-flex>
          <p
            style="font-size:18px !important; color:#212121;"
            class="headline mt-1 mb-0"
          >Permissions</p>
        </v-flex>
        <v-layout class="accessGroupList">
          <v-app style="width:100%;" id="inspire">
          <v-data-table style="width:100%;"
            :headers="headers"
            :items="filter_data"
            hide-actions
            item-key="name"
          >
            <template slot="items" slot-scope="props">
              <tr @click="props.item.expanded = !props.item.expanded">
                <td>{{ props.item.value }}</td>
                <td>
                  <v-checkbox style="float:right;"
                    v-model="props.selected"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
              </tr>
              <v-card style="    border-radius: unset !important;
    border-top: 0; border-left:0;
    width: 128% !important;" flat v-if="props.item.expanded">
                <v-card-text>
                  <v-data-table style="width:100%;"
            :headers="headers"
            :items="company"
            hide-actions
            item-key="name"
          >
          <template slot="items" slot-scope="props">
              <tr style="border:none" @click="props.item.expanded = !props.item.expanded">
                <td>{{ props.item.name }}</td>
                <td>
                  <v-checkbox style="float:right;"
                    v-model="props.selected"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
              </tr>
          </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </template>
          </v-data-table>
          </v-app>
        </v-layout>
        <v-layout>
          <v-flex>
            <strong class="py-2 px-2" style=" font-size:18px; color:grey;">Segment</strong>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs2>
                <v-subheader>Access to</v-subheader>
              </v-flex>
              <v-flex xs6>
                <v-select
                  :items="accessTo"
                  @change="filter_dialog()"
                  v-model="e2"
                  label="Select"
                  class="input-group--focused"
                  item-value="text"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-layout> -->
        <!-- <v-layout class="mx-4 my-2" style="border:1px solid rgba(0,0,0,0.12);"  sm12 >
        <v-flex style="border-right:1px solid rgba(0,0,0,0.12);" sm6>
          <v-btn @click="allemployee_segment()" :class="{'activebutton' : this.allemployee_seg == true}" flat class="w-100 mx-0 my-0" style="height:100%; padding:20px 30px">
            <v-flex sm-2>
            <v-icon
              style="
              color:grey;
              font-size: 35px;">
              fas fa-users
            </V-icon>
            </v-flex>
            <v-flex sm10 style="overflow:hidden;">
            <p style="padding:0; margin:0; text-align:left;">
              All Employee<br>
              <span style="color:grey; font-size:10px; text-transform: none;">false
                Access to all employees. Suitable for administrator-like groups.
                </span>
                </p>
            </v-flex>
            </v-btn>
        </v-flex>
        <v-flex sm6>
          <v-btn @click="filtered_segment()" :class="{'activebutton' : this.filtered_employee_segment == true}" flat class="w-100 mx-0 my-0" style="height:100%">
            <v-flex sm-2>
            <v-icon
              style="
              color:grey;
              font-size: 35px;">
              fas fa-filter
            </V-icon>
            </v-flex>
            <v-flex style="overflow:hidden;" sm10>
            <p style="padding:0; margin:0; text-align:left;">
              Filtered Employee<br>
              <span style="color:grey; font-size:10px; text-transform: none;">
                Access to all employees. Suitable for administrator-like groups.
                </span>
                </p>
            </v-flex>
            </v-btn>
        </v-flex>
        </v-layout>-->
        <!-- <v-layout v-show="filtered_employee_segment" class="filter_segment" style=" margin:0; border:1px solid rgba(0,0,0,0.12);" row wrap>
          <v-flex sm4>
            <v-card flat class="scroll mx-2" style="height:250px; border:none">
              <v-card-text>
                <p style="font-size:16px; margin:0; padding:0;">Location</p>
                <v-layout row wrap>
                  <v-flex>
                    <v-data-table style="width:100%;"
                      :items="segment_filter_location"
                      hide-actions
                      item-key="name"
                    >
                      <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded">
                          <td>{{ props.item }}</td>
                          <td>
                          <v-checkbox style="float:right;"
                            v-model="props.items"
                            value="props.items"
                            primary
                            hide-details
                          ></v-checkbox>
                        </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex sm4>
            <v-card flat class="scroll mx-2" style="height:250px; border:none">
              <v-card-text>
                <p style="font-size:16px; margin:0; padding:0;">Department</p>
                <v-layout row wrap>
                  <v-flex>
                    <v-data-table style="width:100%;"
                      :items="segment_filter_department"
                      hide-actions
                      item-key="name"
                    >
                      <template slot="items" slot-scope="props">
                        <tr >
                          <td>{{ props.item }}</td>
                          <td>
                          <v-checkbox style="float:right;"
                            v-model="props.selected"
                            primary
                            hide-details
                          ></v-checkbox>
                        </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex sm4>
            <v-card flat class="scroll mx-2" style="height:250px; border:none">
              <v-card-text>
                <p style="font-size:16px; margin:0; padding:0;">Gender</p>
                <v-layout row wrap>
                  <v-flex>
                    <v-data-table style="width:100%;"
                      :items="segment_filter_gender"
                      hide-actions
                      item-key="name"
                    >
                      <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded">
                          <td>{{ props.item }}</td>
                          <td>
                          <v-checkbox style="float:right;"
                            v-model="props.selected"
                            primary
                            hide-details
                          ></v-checkbox>
                        </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout> -->
        <v-layout style>
          <v-flex sm6>

          </v-flex>
          <v-flex sm6 style="text-align: right ;">

          </v-flex>
        </v-layout>
    <v-layout style="">
      <V-flex v-show="segment_data" xs12>
        <v-data-table :headers="groupHeaders" :items="company" hide-actions class="elevation-1">
          <template slot="items" class="data_table_row" slot-scope="props">
            <td class>{{ props.index+1 }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.people}}</td>
            <td class="text-xs-left">{{ props.item.employees }}</td>
            <td class="text-xs-right">
              <v-btn class="group_table_list" @click="addsegment()" flat color="primary">
                <V-icon>fas fa-edit</V-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </V-flex>
    </v-layout>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import { VChip, VMenu, VSubheader, VAvatar, VCheckbox } from 'vuetify';

export default {
  name: 'settings',
  // components: {
  // VChip,
  // VMenu,
  // VSubheader,
  // VAvatar,
  // VCheckbox
  // },
  data () {
    return {
      groupName: '',
      e1: 0,
      dialog2: false,
      sement_name: '',
      filter_data: [],
      filterdata: [],
      notifications: false,
      edit_segment: '',
      headers: [{
        text: 'Dessert (100g serving)',
        value: 'name'
      },
      { text: 'Calories', value: 'calories' }],
      temp: [],
      segment_filter_department: '',
      segment_filter_location: '',
      segment_filter_departmet: '',
      sound: true,
      widgets: false,
      company: [],
      title: '',
      search: {
        queryLocation: '',
        queryStatus: ''
      },
      filtered_employee_segment: false,
      segment_filters: [],
      company_user: {},
      segment_id: '',
      checkbox: false,
      config: {
        loading: false
      },
      id: '',
      groupitem: '',
      add_segment: false,
      segment_data: true,
      segment_user_data: true,
      allemployee_seg: false,
      // ex4: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red darken-3', 'indigo darken-3', 'orange darken-3'],

      groupHeaders: [
        { text: 'S.no', sortable: false, value: 'serial' },
        { text: 'Name', sortable: false, value: 'name' },
        { text: 'People', sortable: false, value: 'people' },
        { text: 'Employees', sortable: false, value: 'employess' },
        { text: '', sortable: false, value: '' }
      ],
      e2: null,
      accessTo: [
        { text: 'All Employee' },
        { text: 'Filtered Employee' }
      ],
      items: [
        {
          checkbox: false,
          action: 'fas fa-user',
          title: 'Model 1',
          items: [
            { title: 'Create model 1', value: '' },
            { title: 'Update model 1', value: '' },
            { title: 'View model 1', value: '' },
            { title: 'Delete model 1', value: '' }
          ]
        },
        {
          action: 'fas fa-user',
          title: 'Model 2',
          items: [
            { title: 'Create model 1' },
            { title: 'Update model 1' },
            { title: 'View model 1' },
            { title: 'Delete model 1' }
          ]
        },
        {
          action: 'fas fa-user',
          title: 'Model 3',
          items: [
            { title: 'Create model 1' },
            { title: 'Update model 1' },
            { title: 'View model 1' },
            { title: 'Delete model 1' }
          ]
        },
        {
          action: 'fas fa-user',
          title: 'Model 4',
          items: [
            { title: 'Create model 1' },
            { title: 'Update model 1' },
            { title: 'View model 1' },
            { title: 'Delete model 1' }
          ]
        }
      ]
    };
  },
  computed: {
    filteredListLocation () {
      if (this.filterOptions.location) {
        const self = this;
        return this.filterOptions.location.filter(function a (r) {
          return (
            r.toLowerCase().indexOf(self.search.queryLocation.toLowerCase()) >=
            0
          );
        });
      }
      return [];
    }
  },
  methods: {
    filter_dialog () {
      if (this.e2 === 'Filtered Employee') {
        this.filtered_employee_segment = true;
      } else {
        this.filtered_employee_segment = false;
      }
    },
    getCompanyDetails () {
      axios.get(`${process.env.VUE_APP_API_URL}group/list`).then(
        response => {
          if (response && response.data) {
            this.company = response.data.data;
          }
        },
        response => {
          this.config.initialLoading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to fetch user, Please try again later!'
          });
          throw new Error(response);
        }
      );
    },
    getGroupFilter () {
      axios.get(`${process.env.VUE_APP_API_URL}group/permission-filters`).then(
        response => {
          if (response && response.data) {
            this.filterdata = Object.keys(response.data.data);

            const temp = [];
            this.$lodash.each(this.filterdata, (value, key) => {
              temp.push({
                value: value,
                expanded: false
              });
            });
            this.filter_data = temp;
            // console.log(this.filter_data);
            this.filter_data[0].expanded = true;

            // console.log(Object.keys(this.filter_data.data));
            // this.companys = response.data.data;
            // this.$lodash.each(this.companys, (value, key) => {
            //   temp.push({
            //     'value': value,
            //     'expanded': false,
            //   });
            // });
            // this.companys = temp;
            // console.log('dsfdgfhg');
            // console.log(this.companys);
          }
        },
        response => {
          this.config.initialLoading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to fetch user, Please try again later!'
          });
          throw new Error(response);
        }
      );
    },
    getSegmentFilter () {
      axios.get(`${process.env.VUE_APP_API_URL}group/segment-filters`).then(
        response => {
          if (response && response.data) {
            // this.filter_data = Object.keys(response.data.data);
            // temp = [];
            // this.$lodash.each(this.filter_data, (value, key) => {
            //   temp = value;
            // });
            // this.filter_data = temp;
            this.segment_filter_department = response.data.data.department.department__in;
            this.segment_filter_location = response.data.data.location.location__in;
            this.segment_filter_gender = response.data.data.gender.gender__in;
            // console.log(this.segment_filter_department)

            // console.log(Object.keys(this.filter_data.data));
          }
        },
        response => {
          this.config.initialLoading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to fetch user, Please try again later!'
          });
          throw new Error(response);
        }
      );
    },
    create_segment () {
      axios
        .post(`${process.env.VUE_APP_API_URL}segment/manage/`, {
          segment_filters: this.segmentData,
          gender: this.segment_gender
        })
        .then(
          response => {
            if (response && response.data) {
              this.segmentData = {
                location__in: 'noida'
              };
              this.company = response.data;
              // console.log(this.company);
            }
          },
          response => {
            this.config.initialLoading = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to fetch user, Please try again later!'
            });
            throw new Error(response);
          }
        );
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
    // update_segment() {
    //   axios
    //     .patch(`${process.env.VUE_APP_API_URL}segment/manage/`, {
    //       title: this.segment_title,
    //       name: this.segment_name,
    //       gender: this.segment_gender
    //     })
    //     .then(
    //       response => {
    //         if (response && response.data) {
    //           title = "abc";
    //           this.company = response.data;
    //           console.log(this.company);
    //         }
    //       },
    //       response => {
    //         this.config.initialLoading = false;
    //         this.$store.dispatch("updateSnackbar", {
    //           color: "error",
    //           show: true,
    //           text: "Unable to fetch user, Please try again later!"
    //         });
    //         throw new Error(response);
    //       }
    //     );
    // },
    // openDialog(data, type) {
    //   if (type && this.$refs[type]) {
    //     this.$refs[type].open = true;
    //   }
    // },
    addsegment () {
      this.segment_data = true;
      this.add_segment = true;
      this.add_segment = 'add Segment';
      this.filtered_employee_segment = false;
      this.segment_data = false;
    },
    // editsegment() {
    //   this.segment_data = false;
    //   this.add_segment = true;
    //   this.edit_segment = "Edit Segment";
    //   this.filtered_employee_segment = false;
    //   this.segment_user_data = false;
    //   title = this.company.title;
    // },
    // filtered_segment() {
    //   this.filtered_employee_segment = true;
    //   this.allemployee_seg = false;
    //   this.checkbox = false;
    //   this.segment_user_data = false;
    // },
    allemployee_segment () {
      this.filtered_employee_segment = false;
      this.allemployee_seg = true;
      this.checkbox = true;
      this.segment_user_data = false;
    },
    cancel_new_segment () {
      this.segment_data = true;
      this.add_segment = false;
      this.segment_user_data = true;
    }
  },
  beforeMount () {
    this.getCompanyDetails();
    this.getGroupFilter();
    this.getSegmentFilter();
  }
};
</script>
<style lang="scss">
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
.expensionHeader{
  .v-expansion-panel__header{
    background: #fafafa !important;
  }
  thead{
    display: none;
  }
}
</style>
