<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" scrollable>
      <v-card>
        <v-card-text style="height: 600px;">
          <div class="sc-AxhUy fxWvvr header top">
            <button class="file-close-button" @click="closeBulkUploadModal">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path fill="#000" fill-rule="nonzero" d="M94.3 0c-1.5 0-3 .6-4 1.7L50 42 9.8 1.6c-2.3-2.3-6-2.3-8 0-2.4 2.2-2.4 5.8 0 8l40 40.3L2 90.2c-2.4 2.3-2.4 6 0 8 1 1.2 2.5 1.8 4 1.8 1.4 0 3-.6 4-1.7L50 58l40.2 40.3c1 1 2.6 1.7 4 1.7 1.5 0 3-.6 4-1.7 2.4-2.2 2.4-5.8 0-8L58.3 50 98 9.8c2.4-2.3 2.4-6 0-8-1-1.2-2.5-1.8-4-1.8z">
                </path>
              </svg>
            </button>
            <div class="sc-Axmtr hvJMgY">
              Upload employees
            </div>
            <ul class="sc-AxiKw eSbheu stepper-row">
              <li class="sc-AxhCb eSwYtm" :class="[stepper.upload ? 'successColor': '', activeStep === 'upload' ? 'active-step' : '']">
                <span v-if="stepper.upload" style="position: relative;top: 4px;">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="margin-right: 6px;height: 18px;">
                    <path fill="#4c3e9d" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                  </svg>
                </span>
                <span>
                  Upload CSV
                </span>
              </li>
              <li class="sc-AxhCb eSwYtm" :class="[stepper.header ? 'successColor': '', activeStep === 'header' ? 'active-step' : '']">
                <span v-if="stepper.header" style="position: relative;top: 4px;">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="margin-right: 6px;height: 18px;">
                    <path fill="#4c3e9d" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                  </svg>
                </span>
                <span>
                  Select header
                </span>
              </li>
              <li class="sc-AxhCb eSwYtm" :class="[stepper.column ? 'successColor': '', activeStep === 'column' ? 'active-step' : '']">
                <span v-if="stepper.column" style="position: relative;top: 4px;">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="margin-right: 6px;height: 18px;">
                    <path fill="#4c3e9d" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                  </svg>
                </span>
                <span>
                  Map column
                </span>
              </li>
              <li class="sc-AxhCb eSwYtm" :class="[stepper.results ? 'successColor': '', activeStep === 'results' ? 'active-step' : '']">
                <span v-if="stepper.results" style="position: relative;top: 4px;">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="margin-right: 6px;height: 18px;">
                    <path fill="#4c3e9d" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                  </svg>
                </span>
                <span>
                  Review
                </span>
              </li>
              <li class="sc-AxhCb eSwYtm" :class="[stepper.errorData ? 'successColor': '', activeStep === 'errorData' ? 'active-step' : '']">
                <span v-if="stepper.errorData" style="position: relative;top: 4px;">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="margin-right: 6px;height: 18px;">
                    <path fill="#4c3e9d" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                  </svg>
                </span>
                <span>
                  Results
                </span>
              </li>
            </ul>
          </div>
          <!-- first step start-->
          <div class="step1 custom-file-upload" v-if="activeStep === 'upload'">
            <div class="notice">
              <div class="sc-fzqBZW eNQuho">
                <div v-if="!rawCSVName">
                  <div class="file-upload">
                  <label for="upload" class="file-upload__label">Upload data from file</label>
                  <input
                    id="upload"
                    class="file-upload__input"
                    type="file" name="file-upload"
                    @input="filesChange($event.target.files);"
                  >
                  </div>
                  <p v-if="showFileError" class="p-0" style="color:#e74c3c;font-size: 16px;">
                    Please select CSV file
                  </p>
                  <p class="ma-0 pt-4 pl-4">
                    <small class="mb-0 cursor-pointer hover-link bold">
                      <a target="_blank" href="https://hirexp.s3.ap-south-1.amazonaws.com/static/Sample+Templates/hirexp_talent_pool_sample.csv"> (download sample file)</a>
                    </small>
                  </p>
                </div>
                <div v-if="rawCSVName" class="upload-file-details">
                  <span class="file-name">{{rawCSVName}}</span>
                  <span class="file-reset-btn">
                    <button class="file-close-button" @click="resetUploadFile()">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <path fill="#000" fill-rule="nonzero" d="M94.3 0c-1.5 0-3 .6-4 1.7L50 42 9.8 1.6c-2.3-2.3-6-2.3-8 0-2.4 2.2-2.4 5.8 0 8l40 40.3L2 90.2c-2.4 2.3-2.4 6 0 8 1 1.2 2.5 1.8 4 1.8 1.4 0 3-.6 4-1.7L50 58l40.2 40.3c1 1 2.6 1.7 4 1.7 1.5 0 3-.6 4-1.7 2.4-2.2 2.4-5.8 0-8L58.3 50 98 9.8c2.4-2.3 2.4-6 0-8-1-1.2-2.5-1.8-4-1.8z">
                        </path>
                      </svg>
                    </button>
                  </span>
                </div>
              </div>
              <p class="notice-right paragraph">
                You can upload any .csv file with any set of columns
                as long as it has 1 record per row. The next step will allow
                you to match your spreadsheet columns to the right data points.
              </p>
            </div>
          </div>
          <!-- first step end-->
          <!-- second step start -->
          <div v-if="activeStep === 'header'" style="height: 400px;">
            <div class="header-row-select" v-if="!customHeaderSelect">
              <aside class="primaryTextColor">
                <h4 class="aside-text">Does this row contain column names?</h4>
                <button class="button success yes-button" id="headerConfirm" @click="mapTable">
                  Yes
                </button>
                <button class="button dark no-button" id="headerlessConfirm" @click="customHeaderSelect = true">
                  No
                </button>
              </aside>
              <div style="height: 144px;width:100%">
                <div>
                  <table class="sc-fzokOt hLgJkJ" style="table-layout: initial; width: 100%;">
                    <thead>
                      <tr>
                        <th style="height: 25px;">
                          <div class="relative">
                            <span>&nbsp;</span>
                          </div>
                        </th>
                        <th>
                          <div class="relative">
                            <span>A</span>
                          </div>
                        </th>
                        <th>
                          <div class="relative">
                            <span>B</span>
                          </div>
                        </th>
                        <th>
                          <div class="relative">
                            <span>C</span>
                          </div>
                        </th>
                        <th>
                          <div class="relative">
                            <span>D</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(h, index) in rawCSV.slice(0, 4)" :key="index" v-if="h && Object.keys(h).length > 2">
                        <th>
                          <div class="relative">
                            <span>{{index+1}}</span>
                          </div>
                        </th>
                        <td v-for="(head, idx) in h.slice(0, 4)" :key="idx">
                          {{head}}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- <div class="header-row-select" v-if="customHeaderSelect"> -->
            <div class="custom-header" v-if="customHeaderSelect" style="padding:40px;height:400px">
              <!-- <div>
                <b-col cols="auto" style="font-size:18px;" class="p-0 mb-4">

                </b-col>
              </div> -->
              <v-flex xs12 d-flex>
                Select row which contains headers
              </v-flex>
              <v-flex xs12 d-flex>
                <div class="header-select">
                  <div class="p-0">
                    <div class="custom-select-wrapper" ref="customSelectWrapper" @click="toggleDropdown()">
                      <div class="custom-select-header" ref="customSelectHeader">
                        <div class="custom-select__trigger">
                          <span class="custom-option" v-for="(r, index) in rawCSV[selectedHeadingIndex].slice(0, 10)" :key="index">
                            <span>{{r}},&nbsp;</span>
                          </span>
                        </div>
                        <div class="custom-options">
                          <span class="custom-option" :class="index === selectedHeadingIndex ? 'selected': ''" v-for="(r, index) in rawCSV" :key="index" @click="updateHeaderIndex(index)">
                            <span v-for="(c,idx) in r.slice(0, 10)" :key="idx">{{c}},&nbsp;</span>
                            <span>...........</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-flex>
            </div>
          </div>
          <!-- second step end -->
          <!-- third step start -->
          <div v-if="activeStep === 'column'" style="padding: 20px 40px 40px;overflow-y: auto;height: 450px;">
            <div class="map-headings" v-for="(h, idx) in getMapHeadings()" :key="idx">
              <div class="col-body primaryTextColor">
                <div class="column-first">
                  <table class="sc-fznZeY gJlwEu">
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th tabindex="0">{{h.backend}}</th>
                        <th style="padding: 0px 0px 0px 20px; z-index: 0;">
                          <div class="css-2b097c-container">
                            <div class="css-1sk0ayw-control">
                              <div class="css-1hwfws3">
                                  <div class="css-1g6gooi" style="z-index: 999;">
                                    <v-select
                                      class="elevation-0"
                                      :items="headings"
                                      v-model="h.name"
                                      @change="updateIndex(h)"
                                      solo
                                      hide-details
                                    ></v-select>
                                  </div>
                                </div>
                                <div class="css-1wy0on6">
                                  <div v-if="h.index !== -1" aria-hidden="true" class="css-tlfecz-indicatorContainer" @click="removeSelectValue(h)">
                                    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-19bqh2r">
                                      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z">
                                      </path>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div class="column-second">
                    <span v-if="(h.index || h.index === 0) && rawCSV.length"> {{rawCSV[1][h.index]}} </span>
                  </div>
                </div>
              </div>
            </div>
          <!-- third step end -->
          <!-- fourth step start -->
          <div class="uploadingData" v-if="uploadingData">
            <div id="loader"></div>
          </div>
          <!-- start verify data -->
          <div v-if="activeStep === 'verify'">
            <div style="text-align: left;padding: 0px 40px 12px 40px;">
              <v-layout>
                <v-flex xs1><v-switch v-model="checked" color="primary" class="ma-0 pa-0"></v-switch></v-flex>
                <v-flex style="margin-left: -60px;font-size: 16px;">Only show rows with problems</v-flex>
                <v-spacer></v-spacer>
                <v-flex></v-flex>
              </v-layout>
            </div>
            <div class="verify results-table" v-if="verifyTableData && verifyTableData.length > 0">
              <div>
                <table class="sc-fzokOt hLgJkJ" style="table-layout: initial; width: 100%;">
                  <thead>
                    <tr>
                      <th style="height: 25px;visibility: hidden;min-width: 28px;">
                        <div class="relative">
                          <span>&nbsp;</span>
                        </div>
                      </th>
                      <th style="height: 25px;min-width: 28px;">
                        <div class="relative">
                          <span>&nbsp;</span>
                        </div>
                      </th>
                      <th v-for="(h, index) in getTableHeader" :key="index" :id="h" v-if="h !== 'errorPresent'">
                        <div class="relative" style="font-weight: bold;padding: 0rem .75rem;">
                          <span style="text-transform: capitalize;">{{h.replace(/_/g, ' ')}}</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr v-for="(h, index) in errorData" :key="index" v-if="h && Object.keys(h).length > 2"> -->
                    <tr v-for="(h, index) in verifyTableData" :key="index">
                      <th style="padding: 0px 8px;background-color: #fff !important;border: none;min-width: 28px;">
                        <!-- <div class="relative" v-if="[h][index].errorPresent && [h][index].errorPresent.value"> -->
                        <div class="relative" v-if="isError(index)" style="position: relative;top: 8px;">
                          <v-icon color="red" small>fas fa-exclamation-triangle</v-icon>
                          <!-- <font-awesome-icon icon="exclamation-triangle" class="text-danger" /> -->
                        </div>
                      </th>
                      <th style="padding: 0px 0px 0 0;min-width: 28px;">
                        <div class="relative" style="padding: 4px;">
                          <span style="padding: 5px;font-weight: bold;">{{index+1}}</span>
                        </div>
                      </th>
                      <td v-for="(head, idx) in h" :key="idx" :id="idx" v-if="idx !== 'errorPresent'">
                        <div style="position: relative;">
                          <span>
                            <v-text-field
                              :id="isValidValue(idx, verifyTableData[index][idx].value, index, 'id')"
                              class="results-input elevation-0"
                              solo
                              hide-details
                              v-model="verifyTableData[index][idx].value"
                              :style="verifyTableData[index][idx].error.show ? 'border: 1.5px dashed red !important;': 'border:none;'"
                              @input="isValidValue(idx, verifyTableData[index][idx].value, index, 'input')"
                            ></v-text-field>
                          </span>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }" v-if="verifyTableData[index][idx].error.show">
                              <v-icon small color="red" class="error-mark" dark v-on="on">fas fa-exclamation-triangle</v-icon>
                            </template>
                            <span>{{verifyTableData[index][idx].error.text}}</span>
                          </v-tooltip>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- end verify data -->
          <!-- fourth step end -->
          <!-- stack modal -->
          <div v-if="showStack" class="modalDialog" ref="modalDialog" id="modal-1">
            <div class="modalDialogBody">
              <div class="body">
                <div>{{modalText}}</div>
              </div>
              <div class="actionBtn">
                <div class="leftBtn">
                  <v-btn
                    color="primary"
                    outline
                    class="white--text"
                    @click="closeModalDialog()"
                  >
                    No
                  </v-btn>
                  <!-- <b-button variant="outline-primary" style="padding: 0px 40px;height:35px;" ">No</b-button> -->
                </div>
                <div class="rightBtn">
                  <v-btn
                    color="primary"
                    class="white--text"
                    @click="goBackModalDialog()"
                  >
                    Yes
                  </v-btn>
                  <!-- <b-btn variant="primary" style="padding: 0px 40px;height:35px;" >Yes</b-btn> -->
                </div>
              </div>
            </div>
          </div>
          <!-- stack modal -->
        </v-card-text>
        <v-card-actions>
          <v-flex v-if="activeStep === 'upload'">
            <v-btn class="elevation-0" @click="open = false">Close</v-btn>
          </v-flex>
          <v-flex v-if="activeStep === 'upload' && rawCSVName" class="text-xs-right">
            <v-btn
              color="primary"
              class="white--text"
              @click="nextPool();"
            >
              Next
            </v-btn>
          </v-flex>
          <v-flex v-if="activeStep === 'header'">
            <v-btn class="elevation-0" @click="showStack=true; goBackTo = 'upload';">Go back</v-btn>
          </v-flex>
          <v-flex v-if="activeStep === 'header'" class="text-xs-right">
            <v-btn
              color="primary"
              class="white--text"
              @click="mapTable()"
            >
              Map column
            </v-btn>
          </v-flex>

          <v-flex v-if="activeStep === 'column'">
            <v-btn class="elevation-0" @click="showStack=true; goBackTo = 'header';">Go back</v-btn>
          </v-flex>
          <v-flex v-if="activeStep === 'column'" class="text-xs-right">
            <v-btn
              color="primary"
              class="white--text"
              @click="review()"
            >
              Review
            </v-btn>
          </v-flex>

          <v-flex v-if="activeStep === 'verify'">
            <v-btn class="elevation-0" @click="showStack=true; goBackTo = 'column';">Go back</v-btn>
          </v-flex>
          <v-flex v-if="activeStep === 'verify'" class="text-xs-right">
            <v-btn
              color="primary"
              class="white--text"
              @click="UploadVerifyData()"
            >
              Upload
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
// import { VSwitch, VTooltip } from 'vuetify';
import PapaParse from 'papaparse';
import axios from 'axios';

export default {
  name: 'BulkUploadEmployees',

  // components: {
  //   VSwitch,
  //   VTooltip
  // },

  data () {
    return {
      modalText: 'Are you sure you want to clear all changes to data in progress in this stage?',
      rawCSVName: '',
      rawCSV: [],
      showFileError: false,
      selectedPool: null,
      open: false,
      activeStep: 'upload',
      stepper: {
        upload: false,
        header: false,
        column: false,
        results: false,
        errorData: false
      },
      mapHeadings: {},
      row: {
        value: [],
        selected: 0
      },
      customHeaderSelect: false,
      selectedHeadingIndex: 0,
      uploadingData: false,
      checked: false,
      getTableHeader: [],
      verifyTableData: null,
      verifyTableAllData: null,
      showStack: false
    };
  },
  methods: {
    filesChange (fileList) {
      if (!fileList.length) return;
      const that = this;
      if (fileList[0] && (fileList[0].type === 'application/vnd.ms-excel' || fileList[0].type === 'text/csv')) {
        PapaParse.parse(fileList[0], {
          complete (results) {
            if (results.data) {
              that.rawCSVName = fileList[0].name;
              that.rawCSV = results.data;
              that.watchData();
              that.mapFields();
            }
          }
        });
      } else {
        this.showFileError = true;
      }
    },
    resetUploadFile () {
      this.rawCSV = null;
      this.rawCSVName = null;
    },
    mapFields () {
      setTimeout(() => {
        if (this.row.value.length > 0) {
          this.row.selected = this.rawCSV.indexOf(this.row.value);
        } else {
          this.row.value = this.rawCSV[this.row.selected];
        }
        const firstRow = this.row.value;
        this.headings = this.rawCSV[this.selectedHeadingIndex];
        this.row.value = this.rawCSV[this.selectedHeadingIndex];
        this.mapHeadings = {
          employee_id: {
            name: '',
            required: true,
            backend: 'Employee ID',
            index: -1,
            display: 0
          },
          first_name: {
            name: '',
            required: true,
            backend: 'Employee first name',
            index: -1,
            display: 1
          },
          last_name: {
            name: '',
            required: true,
            backend: 'Employee last name',
            index: -1,
            display: 2
          },
          email: {
            name: '',
            required: true,
            backend: 'Employee email',
            index: -1,
            display: 3
          },
          phoneNumber: {
            name: '',
            required: false,
            backend: 'Employee phone number',
            index: -1,
            display: 4
          },
          gender: {
            name: '',
            required: true,
            backend: 'Gender',
            index: -1,
            display: 5
          },
          joining_date: {
            name: '',
            required: true,
            backend: 'Joining date',
            index: -1,
            display: 6
          },
          location: {
            name: '',
            required: false,
            backend: 'Location',
            index: -1,
            display: 7
          },
          department: {
            name: '',
            required: false,
            backend: 'Department',
            index: -1,
            display: 8
          },
          birthDate: {
            name: '',
            required: false,
            backend: 'Birth date',
            index: -1,
            display: 9
          },
          alternateEmail: {
            name: '',
            required: false,
            backend: 'Alternate Email',
            index: -1,
            display: 10
          },
          education: {
            name: '',
            required: false,
            backend: 'Education',
            index: -1,
            display: 11
          },
          experience: {
            name: '',
            required: false,
            backend: 'Experience',
            index: -1,
            display: 12
          },
          designation: {
            name: '',
            required: false,
            backend: 'Designation',
            index: -1,
            display: 13
          },
          grade: {
            name: '',
            required: false,
            backend: 'Grade',
            index: -1,
            display: 14
          },

          sub_department: {
            name: '',
            required: false,
            backend: 'Sub Department',
            index: -1,
            display: 15
          },
          manager: {
            name: '',
            required: false,
            backend: 'Manager',
            index: -1,
            display: 16
          },
          function: {
            name: '',
            required: false,
            backend: 'Function',
            index: -1,
            display: 17
          },
          team: {
            name: '',
            required: false,
            backend: 'Team',
            index: -1,
            display: 18
          },
          teamHead: {
            name: '',
            required: false,
            backend: 'Team Head',
            index: -1,
            display: 19
          },
          business: {
            name: '',
            required: false,
            backend: 'Business',
            index: -1,
            display: 20
          },
          businessHead: {
            name: '',
            required: false,
            backend: 'Business Head',
            index: -1,
            display: 21
          },
          hrbp: {
            name: '',
            required: false,
            backend: 'HR Business Partner',
            index: -1,
            display: 22
          },
          hr_manager: {
            name: '',
            required: false,
            backend: 'HR Manager',
            index: -1,
            display: 23
          },
          shiftStartTime: {
            name: '',
            required: false,
            backend: 'Shift Start Time',
            index: -1,
            display: 24
          },
          shiftEndTime: {
            name: '',
            required: false,
            backend: 'Shift End Time',
            index: -1,
            display: 25
          },
          exit_date: {
            name: '',
            required: false,
            backend: 'Employee exit date',
            index: -1,
            display: 26
          },
          high_potential_emp: {
            name: '',
            required: false,
            backend: 'High potential employee',
            index: -1,
            display: 27
          }
        };
        this.$lodash.each(firstRow, (v, k) => {
          if (this.mapHeadings[v.trim()]) {
            this.mapHeadings[v.trim()].name = v;
            this.mapHeadings[v.trim()].index = k;
          }
        });
      }, 200);
    },
    getMapHeadings () {
      return this.mapHeadings;
    },
    watchData () {
      const temp = [];
      this.$lodash.each(this.rawCSV, (val) => {
        let allFieldsEmpty = true;
        for (let j = 0; j < val.length;) {
          if (val[j].length > 0) {
            allFieldsEmpty = false;
            break;
          }
          j += 1;
        }
        if (!allFieldsEmpty) {
          temp.push(val);
        }
      });
      this.rawCSV = temp;
    },
    nextPool () {
      if (!this.rawCSVName) {
        this.showFileError = true;
      }
      if (this.rawCSVName) {
        this.activeStep = 'header';
        this.stepper.upload = true;
      }
    },
    mapTable () {
      this.stepper.header = true;
      this.activeStep = 'column';
    },
    updateHeaderIndex (idx) {
      this.selectedHeadingIndex = idx;
    },
    toggleDropdown () {
      setTimeout(() => {
        this.$refs.customSelectHeader.classList.toggle('open');
      }, 100);
    },
    review () {
      this.activeStep = 'uploadingData';
      // this.uploadingData = true;
      this.stepper.column = true;
      this.verifyData(this.rawCSV);
    },
    verifyData (data) {
      this.activeStep = 'verify';
      this.verifyTableData = null;
      this.verifyTableAllData = null;
      const rawFile = data;
      const formattedData = [];
      this.$lodash.each(rawFile, (v, k) => {
        if (k !== this.selectedHeadingIndex) {
          let newEntry = {};
          this.$lodash.each(this.mapHeadings, (value, key) => {
            if (rawFile[k] && value.index > -1 && rawFile[k][value.index]) {
              const t = {};
              t.value = rawFile[k][value.index].trim();
              t.error = {
                text: '',
                show: false
              };
              newEntry[key] = t;
            }
          });
          const t = {
            errorPresent: {
              error: {
                text: '',
                show: false
              },
              value: false
            }
          };
          newEntry = { ...newEntry, ...t };
          formattedData.push(newEntry);
        }
      });
      const h = [];
      this.$lodash.each(formattedData[0], (val, key) => {
        if (this.mapHeadings[key]) {
          const idx = this.mapHeadings[key].display;
          h.splice(idx, 0, key);
        } else {
          h.push(key);
        }
      });
      this.getTableHeader = h;
      this.verifyTableData = formattedData;
      this.verifyTableAllData = formattedData;
    },
    removeSelectValue (obj) {
      setTimeout(() => {
        /* eslint-disable no-param-reassign */
        obj.index = -1;
        obj.name = null;
        /* eslint-enable no-param-reassign */
      }, 100);
    },
    updateIndex (obj) {
      setTimeout(() => {
        /* eslint-disable no-param-reassign */
        obj.index = this.row.value.indexOf(obj.name);
        /* eslint-enable no-param-reassign */
      }, 100);
    },
    isError (index) {
      return this.verifyTableData[index].errorPresent.value;
    },
    isValidValue (type, value, index, kind) {
      // console.log('type, value', type, value, index, kind);
      if (type === 'employee_id' ||
          type === 'department' ||
          type === 'education' ||
          type === 'experience' ||
          type === 'grade' ||
          type === 'sub_department' ||
          type === 'manager' ||
          type === 'function' ||
          type === 'team' ||
          type === 'teamHead' ||
          type === 'business' ||
          type === 'businessHead'
      ) {
        if (value && value.length > 0 && value.length < 500) {
          // eslint-disable-next-line
          const regex = /^[-a-zA-Z0-9.,/"\'_\(\)\?@& ]*$/g;
          const testRegex = regex.test(value);
          if (!testRegex) {
            this.verifyTableData[index][type].error.show = true;
            this.verifyTableData[index][type].error.text = 'Please input alpha numeric characters only !';
          } else {
            this.verifyTableData[index][type].error.show = false;
            this.verifyTableData[index][type].error.text = null;
          }
        } else if (value && value.length > 0 && value.length > 500) {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter less than 500 characters !';
        } else {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter the value !';
        }
      }
      if (type === 'email' || type === 'alternateEmail' || type === 'hrbp' || type === 'hr_manager') {
        if (value && value.length > 0 && value.length < 500) {
          // eslint-disable-next-line
          const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          const testRegex = regex.test(String(value).toLowerCase());
          if (!testRegex) {
            this.verifyTableData[index][type].error.show = true;
            this.verifyTableData[index][type].error.text = 'Please enter a valid email !';
          } else {
            this.verifyTableData[index][type].error.show = false;
            this.verifyTableData[index][type].error.text = null;
          }
        } else if (value && value.length > 0 && value.length > 500) {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter less than 500 characters !';
        } else {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter the value !';
        }
      }
      if (type === 'first_name' || type === 'last_name' || type === 'gender') {
        if (value && value.length > 0 && value.length < 500) {
          // eslint-disable-next-line
          const regex = /^[a-zA-Z.\' ]*$/g;
          const testRegex = regex.test(value);
          if (!testRegex) {
            this.verifyTableData[index][type].error.show = true;
            this.verifyTableData[index][type].error.text = 'Please input characters only !';
          } else {
            this.verifyTableData[index][type].error.show = false;
            this.verifyTableData[index][type].error.text = null;
          }
        } else if (value && value.length > 0 && value.length > 500) {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter less than 500 characters !';
        } else {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter the value !';
        }
      }
      if (type === 'location' || type === 'designation') {
        if (value && value.length > 0 && value.length < 500) {
          // eslint-disable-next-line
          const regex = /^[-a-zA-Z0-9. ]*$/g;
          const testRegex = regex.test(value);
          if (!testRegex) {
            this.verifyTableData[index][type].error.show = true;
            this.verifyTableData[index][type].error.text = 'Please input alpha numeric characters only !';
          } else {
            this.verifyTableData[index][type].error.show = false;
            this.verifyTableData[index][type].error.text = null;
          }
        } else if (value && value.length > 0 && value.length > 500) {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter less than 500 characters !';
        } else {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter the value !';
        }
      }
      if (type === 'birthDate' || type === 'joining_date' || type === 'exit_date') {
        if (value && value.length > 0 && value.length < 500) {
          // eslint-disable-next-line
          const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/g;
          const testRegex = regex.test(value);
          if (!testRegex) {
            this.verifyTableData[index][type].error.show = true;
            this.verifyTableData[index][type].error.text = 'Please input a valid date (DD/MM/YYYY) !';
          } else {
            this.verifyTableData[index][type].error.show = false;
            this.verifyTableData[index][type].error.text = null;
          }
        } else if (value && value.length > 0 && value.length > 500) {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter less than 500 characters !';
        } else {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter the value !';
        }
      }
      if (type === 'shiftStartTime' || type === 'shiftEndTime') {
        if (value && value.length > 0 && value.length < 50) {
          // eslint-disable-next-line
          const regex = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/g;
          const testRegex = regex.test(value);
          if (!testRegex) {
            this.verifyTableData[index][type].error.show = true;
            this.verifyTableData[index][type].error.text = 'Please input a valid time (HH:MM:SS) !';
          } else {
            this.verifyTableData[index][type].error.show = false;
            this.verifyTableData[index][type].error.text = null;
          }
        } else if (value && value.length > 0 && value.length > 50) {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter less than 50 characters !';
        } else {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter the value !';
        }
      }
      if (type === 'phoneNumber') {
        if (value && value.length > 0) {
          // const regex = /^[0-9\-().\s]{10,15}$/;
          // eslint-disable-next-line
          const regex = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g;
          const testRegex = regex.test(value);
          if (!testRegex) {
            this.verifyTableData[index][type].error.show = true;
            this.verifyTableData[index][type].error.text = 'Please enter a valid phone number !';
          } else {
            this.verifyTableData[index][type].error.show = false;
            this.verifyTableData[index][type].error.text = null;
          }
        } else if (value && value.length === 0) {
          this.verifyTableData[index][type].error.show = true;
          this.verifyTableData[index][type].error.text = 'Please enter the value !';
        }
      }
      this.watchVerifiedData(index);
      if (kind === 'input') {
        this.resetErrorFlag(index);
      }
    },
    resetErrorFlag (index) {
      if (this.verifyTableData[index].errorPresent.value) {
        this.verifyTableData[index].errorPresent.value = false;
      }
    },
    watchVerifiedData (index) {
      const t = Object.values(this.verifyTableData[index]);
      const len = t.length;
      for (let j = 0; j < len;) {
        if (t[j] && t[j].error.show) {
          this.verifyTableData[index].errorPresent.value = true;
          break;
        }
        j += 1;
      }
    },
    filterErrorData () {
      if (this.checked) {
        const temp = [];
        this.$lodash.each(this.verifyTableAllData, (val) => {
          if (val.errorPresent.value) {
            temp.push(val);
          }
        });
        this.verifyTableData = temp;
      } else {
        this.verifyTableData = this.verifyTableAllData;
      }
    },
    closeModalDialog () {
      this.showStack = false;
    },
    closeBulkUploadModal () {
      this.open = false;
      this.resetBulkUpload();
    },
    resetBulkUpload () {
      this.selectedHeadingIndex = 0;
      this.rawCSV = null;
      this.rawCSVName = null;
      this.selectedPool = null;
      this.activeStep = 'upload';
      this.customHeaderSelect = false;
      this.showFileError = false;
      this.stepper = {
        upload: false,
        header: false,
        column: false,
        results: false
      };
    },
    goBackModalDialog () {
      this.activeStep = this.goBackTo;
      this.stepper[this.goBackTo] = false;
      if (this.goBackTo === 'upload') {
        this.selectedPool = null;
        this.rawCSV = [];
        this.rawCSVName = '';
        this.customHeaderSelect = false;
      }
      this.closeModalDialog();
    },
    UploadVerifyData () {
      this.sanatizeData();
    },
    sanatizeData () {
      /* eslint-disable no-plusplus */
      /* eslint-disable no-continue */
      const tempData = [];
      this.$lodash.each(this.verifyTableAllData, (v) => {
        const t = [];
        this.$lodash.each(v, (val) => {
          t.push(val.value);
        });
        tempData.push(t);
      });
      const rawFile = tempData;
      console.log('rawFile', rawFile);
      const formattedData = [];
      this.$lodash.each(rawFile, (v, k) => {
        if (this.selectedHeadingIndex > 0) {
          if (k !== this.selectedHeadingIndex) {
            const newEntry = {};
            this.$lodash.each(this.mapHeadings, (value, key) => {
              console.log('im in above if of if', value, key);
              if (rawFile[k] && value.index > -1 && rawFile[k][value.index]) {
                newEntry[key] = rawFile[k][value.index].trim();
              }
            });
            formattedData.push(newEntry);
          }
        } else {
          const newEntry = {};
          this.$lodash.each(this.mapHeadings, (value, key) => {
            if (rawFile[k] && value.index > -1 && rawFile[k][value.index]) {
              newEntry[key] = rawFile[k][value.index].trim();
            }
          });
          formattedData.push(newEntry);
        }
      });
      this.refreshing = true;
      this.uploadingData = true;
      axios.post(`${process.env.VUE_APP_API_URL}users/bulk_add`, {
        user_data: formattedData
      }).then((response) => {
        console.log('response', response);
        if (response && response.data.Failed_list && response.data.Failed_list > 0) {
          this.errorData = response.data.Failed_list;
          const h = [];
          this.$lodash.each(response.data.Failed_list[0], (val, key) => {
            // if (key !== 'error') {
            if (this.mapHeadings[key]) {
              const idx = this.mapHeadings[key].display;
              h.splice(idx, 0, key);
              // h.push(key);
            } else {
              h.push(key);
            }
          });
          const temp = [];
          this.$lodash.each(this.errorData, (val) => {
            const t = {};
            this.$lodash.each(h, (v) => {
              t[v] = val[v];
            });
            temp.push(t);
          });
          this.errorData = temp;
          this.getTableHeader = h;
          this.activeStep = 'results';
        } else {
          this.activeStep = 'dataUploaded';
          this.stepper.results = true;
        }
        this.refreshing = false;
        this.uploadingData = false;
        this.$notify({
          group: 'foo',
          title: `${response.data.message}`,
          type: 'success'
        });
        // this.hideModal();
      }, (response) => {
        this.refreshing = false;
        this.$notify({
          group: 'foo',
          title: `${response.message}`,
          type: 'warn'
        });
        // this.hideModal();
      });
    }
  },
  watch: {
    selectedHeadingIndex () {
      this.mapFields();
    },
    checked () {
      this.filterErrorData();
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  position: relative;
  padding: 40px;
  .hvJMgY {
    font-size: 24px;
    font-weight: 500;
    text-align: left;
    margin: -4px 40px 0px 0px;
  }
  .file-close-button {
    position: absolute;
    top: 40px;
    right: 40px;
    display: inline-block;
    cursor: pointer;
    padding: 0px;
    z-index: 50000;
    color: #3f5c71;
    background-color: transparent;
    border: transparent;
    svg {
      width: 14px;
      height: 14px;
    }
  }
}
.custom-file-upload {
  // border: 1px dashed #989696;
  // padding: 30px;
  // display: grid;
  .file-upload {
    position: relative;
    display: inline-block;
  }
  .file-upload__label {
    // display: block;
    padding: 1em 2em;
    color: #fff;
    background: #0e2d8d;
    border-radius: .4em;
    transition: background .3s;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background: #0e2d8d;
    }
  }
  .file-upload__input {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    font-size: 1;
    width:0;
    height: 100%;
    opacity: 0;
  }
  .notice {
    align-items: center;
    border: 2px #dbe5f0 dashed;
    display: flex;
    margin: 0 40px 40px;
    padding: 40px;
    .eNQuho {
      flex: 1 1 0%;
    }
    .notice-right {
      border-left: 1px solid #d0dbd8;
      flex: 2;
      font-size: 20px;
      text-align: left;
      margin-bottom: 0;
      margin-left: 32px;
      padding-left: 20px;
    }
  }
}
.upload-file-details {
  display: flex;
  .file-name {
    font-size: 18px;
  }
  .file-close-button {
    position: relative;
    left: 15px;
    cursor: pointer;
    color: #3f5c71;
    background-color: transparent;
    border: transparent;
    svg {
      height: 10px;
      width: 10px;
    }
  }
}
.stepper-row {
  // margin-bottom: 15px;
  // .eSbheu {
    list-style-type: none;
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    align-items: center;
    line-height: 1;
    margin-bottom: 0px;
    margin-right: 40px;
    padding: 0px;
    .eSwYtm {
      position: relative;
      font-size: 16px;
      font-weight: 500;
      margin: 0px 0px 0px 48px;
    }
    .active-step {
      text-decoration: underline;
      font-weight: 600;
    }
    .successColor {
      // color: #60b700;
      color: #4c3e9d !important;
    }
    .eSwYtm:not(:first-of-type)::before {
      content: "";
      position: absolute;
      left: -38px;
      top: 45%;
      transform: rotate(45deg) translateY(-50%);
      display: inline-block;
      height: 12px;
      width: 12px;
      border-width: 1px 1px 0px 0px;
      border-style: solid;
      border-color: #989696;
      border-image: initial;
    }
  // }
}

.pools-select {
  margin: 0 40px 40px;
  .file-close-button {
    position: absolute;
    right: 60px;
    cursor: pointer;
    padding: 6px 14px;
    color: #3f5c71;
    background-color: transparent;
    border: transparent;
    svg {
      height: 10px;
      width: 10px;
    }
    &:focus {
      outline: none !important;
      outline: none !important;
    }
  }
  .down-button {
    position: absolute;
    cursor: pointer;
    right: 66px;
    pointer-events: none;
    padding: 5px 0;
    color: #3f5c71;
    background-color: transparent;
    border: transparent;
    &:focus {
      outline: none !important;
      outline: none !important;
    }
  }
}
.pool-error-msg {
  text-align: left;
  padding: 0 40px;
  font-size: 15px;
  color: red;
}

.header-row-select {
  display: flex;
  width: 100%;
  padding: 100px 40px 40px 40px;
  // padding: 40px;
  aside {
    width: 300px;
    .aside-text {
      position: relative;
      padding-right: 40px;
      margin-bottom: 24px;
      margin-top: 28px;
      font-size: 18px !important;
      &::before {
        content: "";
        position: absolute;
        display: block;
        width: 10px;
        height: 10px;
        top: 4px;
        right: 18px;
        border: solid #3f5c71;
        border-width: 0 2px 2px 0;
        padding: 3px;
        transform: rotate(-45deg);
      }
      &::after {
        content: "";
        position: absolute;
        display: block;
        top: 4px;
        right: 18px;
        width: 20px;
        height: 2px;
        margin: 4px 0;
        background-color: #3f5c71;
      }
    }
    .button {
      color: rgb(255, 255, 255);
      padding: 0.2rem 2rem;
      margin-right: 20px;
      border-width: 1px;
      border-style: solid;
      // position: relative;
      // display: inline-block;
      cursor: pointer;
      // outline: 0 !important;
      // user-select: none;
      box-shadow: rgba(0,0,0,.085) 0px 2px 4px 1px;
      font-size: 1.2rem;
      // font-weight: 600;
    }
    .yes-button {
      // background-color: rgb(96, 183, 0) !important;
      // background-color: #28a745 !important;
      background-color: #4c3e9d !important;
      &:hover {
        transform: scale(0.9);
        transition: 0.5s ease all;
      }
    }
    .dark {
      border: 1px solid #4c3e9d;
      color: #4c3e9d;
      background-color: rgb(255, 255, 255);
      transition: 0.5s ease all;
      // background-color: rgb(29, 40, 48);
      &:hover {
        color: #ffffff;
        background-color: #4c3e9d;
      }
    }
  }
  .hLgJkJ {
    text-align: left;
    border-collapse: separate;
    table-layout: fixed;
    width: 0px;
    outline-width: 0px;
    cursor: default;
    max-width: none;
    max-height: none;
    border-spacing: 0px;
    margin: 0px;
    border-width: 0px;
    tr {
      background: rgb(255, 255, 255);
    }
    th:first-child {
      width: 28px;
    }
    th:first-child {
      border-left: 1px solid rgb(204, 204, 204);
    }
    th {
      background-color: rgb(234, 239, 245) !important;
      text-align: left;
      font-size: 12px;
      font-weight: 500;
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: rgb(208, 219, 216) !important;
    }
    th, td {
      height: 22px;
      empty-cells: show;
      line-height: 21px;
      background-color: rgb(255, 255, 255);
      vertical-align: top;
      outline-width: 0px;
      background-clip: padding-box;
      border-right: 1px solid rgb(204, 204, 204);
      border-bottom: 1px solid rgb(204, 204, 204);
      padding: 0px 4px;
      overflow: hidden;
    }
  }
}

.uploadingData {
  #loader {
    margin: 100px auto;
    width: 100px;
    height: 100px;
    border: 10px solid #f3f3f3;
    border-top: 10px solid #0e2d8d;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    background-color: #fff;
    text-align: center;
    line-height: 120px;
  }
  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
}

.custom-header {
  .header-select {
    max-width: 90%;
    .custom-select-wrapper {
      position: relative;
      user-select: none;
      width: 100%;
      .custom-select-header {
        position: relative;
        display: flex;
        flex-direction: column;
        border-width: 0 2px 0 2px;
        border-style: solid;
        border-color: #4c3e9d;
        &.open .custom-options {
          opacity: 1;
          visibility: visible;
          pointer-events: all;
          max-height: 300px;
          display: block;
          overflow-y: auto;
        }
        &.open {
          .custom-select__trigger {
            .arrow:before {
              left: -5px;
              transform: rotate(-45deg);
            }
          }
        }
        &.open {
          .custom-select__trigger {
            .arrow:after {
              left: 5px;
              transform: rotate(45deg);
            }
          }
        }
        .custom-select__trigger {
          position: relative;
          display: flex;
          overflow: hidden;
          align-items: left;
          padding: 0 10px;
          font-size: 20px;
          font-weight: 300;
          color: #3b3b3b;
          height: 50px;
          line-height: 50px;
          background: #ffffff;
          cursor: pointer;
          border-width: 2px 0 2px 0;
          border-style: solid;
          border-color: #4c3e9d;
          .arrow {
            position: relative;
            height: 15px;
            width: 15px;
            &:before, &:after {
              content: "";
              position: absolute;
              bottom: 0px;
              width: 0.15rem;
              height: 100%;
              transition: all 0.5s;
            }
            &:before {
              left: -5px;
              transform: rotate(45deg);
              background-color: #4c3e9d;
            }
            &:after {
              left: 5px;
              transform: rotate(-45deg);
              background-color: #4c3e9d;
            }
          }
        }
        .custom-options {
          position: absolute;
          display: none;
          top: 100%;
          left: 0;
          right: 0;
          border: 2px solid #4c3e9d;
          border-top: 0;
          background: #fff;
          transition: all 0.5s;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          z-index: 2;
          .custom-option {
            position: relative;
            display: flex;
            overflow: hidden;
            height: 50px;
            padding: 0 10px;
            font-size: 16px;
            font-weight: 300;
            color: #3b3b3b;
            line-height: 40px;
            text-align: left;
            cursor: pointer;
            transition: all 0.5s;
            &:hover {
              cursor: pointer;
              background-color: #b2b2b2;
            }
            &.selected {
              color: #ffffff;
              background-color: #4c3e9d;
            }
          }
        }
      }
    }
    .down-button {
      background: white;
      border: 1px solid #ced4da;
      border-left-width: 0;
      position: absolute;
      right: 70px;
      cursor: pointer;
      padding: 6px 14px;
      color: #3f5c71;
      pointer-events: none;
      svg {
        height: 15px;
        width: 15px;
      }
      &:focus {
        outline: none !important;
        outline: none !important;
      }
    }
  }
}

.map-headings {
  .col-body {
    align-items: stretch;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 16px -12px rgba(0, 0, 0, .25), 0 1px 4px 0 rgba(0, 0, 0, .075);
    display: flex;
    min-height: 70px;
    margin-bottom: 10px;
    padding: 16px;
    transition: box-shadow .2s ease-out;
    .column-first {
      width: 60%;
    }
    .column-second {
      width: 40%;
      text-align: left;
      padding: 10px 0 10px 20px;
    }
  }

table {
    width: 100%;
    border-collapse: collapse;
}

.gJlwEu {
    table-layout: fixed;
}

table thead th:first-of-type {
    border-right-width: 0;
    padding: 0;
    width: 48px;
    text-align: center;
}

table th {
    font-weight: 500;
    background-color: #f5f8fa;
}

table td,
th {
    border: 1px solid #c6d1dd;
    text-align: left;
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
}

table thead th:nth-of-type(2) {
    border-left-width: 0;
    border-right-width: 0;
    position: relative;
}

table th {
    font-weight: 500;
    background-color: #f5f8fa;
    padding: 0em 2em;
}

table thead th:last-of-type {
    font-weight: 400;
    text-align: left;
    background-color: #fff;
    width: 45%;
    position: relative;
    border-left-width: 0;
    overflow: visible;
}

table thead th:last-of-type:before {
    top: 0px;
    border-color: transparent transparent transparent #c6d1dd;
    border-width: 27px;
}

table thead th:last-of-type:after,
table thead th:last-of-type:before {
    content: "";
    position: absolute;
    z-index: 15;
    display: block;
    height: 0;
    width: 0;
    border-style: solid;
    left: 0;
}

table thead th:last-of-type:after {
    top: 1px;
    border-color: transparent transparent transparent #f5f8fa;
    border-width: 26px;
}

table thead th:last-of-type:after,
table thead th:last-of-type:before {
    content: "";
    position: absolute;
    z-index: 15;
    display: block;
    height: 0;
    width: 0;
    border-style: solid;
    left: 0;
}

.css-2b097c-container {
    position: relative;
    box-sizing: border-box;
}

.css-1sk0ayw-control {
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    box-shadow: none;
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    justify-content: space-between;
    min-height: 38px;
    position: relative;
    box-sizing: border-box;
    z-index: 12;
    border-color: rgb(204, 204, 204);
    border-radius: 0px;
    border-style: solid;
    border-width: 0px;
    transition: all 100ms ease 0s;
    outline: 0px !important;
}

.css-1hwfws3 {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    box-sizing: border-box;
    flex: 1 1 0%;
    padding: 2px 8px;
    overflow: hidden;
    .css-1g6gooi {
      width: 100%;
      select {
        border: none !important;
      }
      .custom-select {
        &:focus {
          box-shadow: none !important;
        }
      }
    }
}

.css-1uccc91-singleValue {
    color: rgb(51, 51, 51);
    margin-left: 2px;
    margin-right: 2px;
    max-width: calc(100% - 8px);
    position: absolute;
    text-overflow: ellipsis;
    white-space: nowrap;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: border-box;
    overflow: hidden;
}

.css-tlfecz-indicatorContainer {
    color: rgb(204, 204, 204);
    display: flex;
    box-sizing: border-box;
    padding: 8px;
    transition: color 150ms ease 0s;
}

.css-1okebmr-indicatorSeparator {
    align-self: stretch;
    background-color: rgb(204, 204, 204);
    margin-bottom: 8px;
    margin-top: 8px;
    width: 1px;
    box-sizing: border-box;
}

.css-tlfecz-indicatorContainer {
    color: rgb(204, 204, 204);
    display: flex;
    box-sizing: border-box;
    padding: 8px;
    transition: color 150ms ease 0s;
}

.css-1wy0on6 {
    -webkit-box-align: center;
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-shrink: 0;
    box-sizing: border-box;
}
}
.results-table {
  overflow: auto;
  width: 100%;
  height: 450px;
  max-height: 450px;
  padding: 0 40px 0 40px;
  .hLgJkJ {
    text-align: left;
    border-collapse: separate;
    // table-layout: fixed;
    // width: 0px;
    outline-width: 0px;
    cursor: default;
    // max-width: none;
    // max-height: none;
    border-spacing: 0px;
    margin: 0px;
    border-width: 0px;
    tr {
      background: rgb(255, 255, 255);
    }
    th:first-child {
      width: 28px;
    }
    th:first-child {
      border-left: 1px solid rgb(204, 204, 204);
    }
    th {
      background-color: rgb(234, 239, 245) !important;
      text-align: left;
      font-size: 12px;
      font-weight: 500;
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: rgb(208, 219, 216) !important;
    }
    th, td {
      height: 22px;
      empty-cells: show;
      line-height: 21px;
      background-color: rgb(255, 255, 255);
      vertical-align: top;
      outline-width: 0px;
      background-clip: padding-box;
      border-right: 1px solid rgb(204, 204, 204);
      border-bottom: 1px solid rgb(204, 204, 204);
      padding: 0px;
      overflow: hidden;
    }
  }
  .results-input {
    width: unset !important;
    border: none !important;
    &:focus {
      box-shadow: none !important;
    }
  }
}

.verify {
  &.results-table {
    padding: 0 !important;
    .hLgJkJ {
      // text fields
      th {
        min-width: 200px;
      }
    }
  }
  .error-mark {
    border-radius: 6px;
    position: absolute;
    right: 8px;
    background: white;
    padding: 2px;
    top: 8px;
  }
}

.modalDialog {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0.2);
  z-index: 99999;
  opacity: 1;
  -webkit-transition: opacity 300ms ease-in;
  -moz-transition: opacity 300ms ease-in;
  transition: opacity 300ms ease-in;
  .modalDialogBody {
    width: 350px;
    height: 150px;
    position: relative;
    margin: 18% auto;
    background: #ffffff;
    border-radius: 6px;
    .body {
      font-size: 16px;
      padding: 18px 25px;
      border-bottom: 1px solid #989696;
      text-align: left;
    }
    .actionBtn {
      background: #f5f8fa;
      padding-top: 12px;
      height: 65px;
      border-bottom-right-radius: 6px;
      border-bottom-left-radius: 6px;
      display: flex;
      justify-content: space-evenly;
    }
  }
  // .close {
  //   padding: 0;
  //   color:black;
  //   line-height: 25px;
  //   position: absolute;
  //   right: 10px;
  //   text-align: center;
  //   top: 10px;
  //   width: 24px;
  //   text-decoration: none;
  //   background:none;
  //   font-weight: bold;
  // }
  // &:hover {
  //   color: #EA4436;
  // }
}
</style>

<style lang="scss">
.css-1g6gooi {
  .v-input__control {
    .v-input__slot {
      box-shadow: none !important;
    }
  }
}
.results-input {
  .v-input__control {
    .v-input__slot {
      box-shadow: none !important;
    }
  }
}
.verify {
  &.results-table {
    .results-input {
      .v-input__control {
        min-height: 22px !important;
      }
    }
  }
}
</style>
