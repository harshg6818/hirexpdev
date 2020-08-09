<template>
  <div>
    <v-dialog max-width="700px"
      v-model="reportDialog"
      scrollable
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <v-layout>
            <v-flex xs6 sm9>
              <h3><strong>Export Data</strong></h3>
              <p class="mb-3">Select what all data you want to export</p>
            </v-flex>
            <v-flex xs6 sm3>
              <v-checkbox :ripple="false"
                color="primary"
                v-model="allColumnsSelected"
                @change="toggleAllSelectedColumns($event)"
                label="Select all"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap fill-height v-if="allColumns.length % 2 === 0">
            <v-flex xs12 sm6 class="pl-3">
              <v-checkbox :ripple="false"
                class="mt-1"
                v-for="(col, ci) in allColumns"
                v-if="ci < (allColumns.length / 2)"
                :key="ci"
                color="primary"
                :value="checkIfSelected(col) ? true : false"
                :label="col.name"
                @change="updateSelectedColumns(col, $event)"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12 sm6 class="pr-3">
              <v-checkbox :ripple="false"
                class="mt-1"
                color="primary"
                v-for="(col, ci) in allColumns"
                v-if="ci >= (allColumns.length / 2)"
                :key="ci"
                :value="checkIfSelected(col) ? true : false"
                :label="col.name"
                @change="updateSelectedColumns(col, $event)"
              ></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row wrap fill-height v-else>
            <v-flex xs12 sm6 class="pl-3">
              <v-checkbox :ripple="false"
                class="mt-1"
                color="primary"
                v-for="(col, ci) in allColumns"
                v-if="ci < ((allColumns.length / 2)+1)"
                :key="ci"
                :value="checkIfSelected(col) ? true : false"
                :label="col.name"
                @change="updateSelectedColumns(col, $event)"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12 sm6 class="pr-3">
              <v-checkbox
                class="mt-1"
                color="primary"
                v-for="(col, ci) in allColumns"
                v-if="ci >= ((allColumns.length / 2)+1)"
                :key="ci"
                :value="checkIfSelected(col) ? true : false"
                :label="col.name"
                @change="updateSelectedColumns(col, $event)"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions align-content-space->
          <v-flex xs2>
            <v-btn class="error--text" flat @click.stop="reportDialog=false;">Close</v-btn>
          </v-flex>
          <v-flex xs7>
          </v-flex>
          <v-flex text-xs-left xs3>
            <v-btn color="primary" @click.stop="downloadReport('sync')" :disabled="downloadingFlag">
              <v-icon small>fas fa-file-download</v-icon>
              <span>&nbsp;&nbsp;Download Report</span>
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { VCheckbox } from 'vuetify';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'DownloadReportDialog',

  // components: {
  //   VCheckbox,
  // },

  props: {
    allColumns: {
      required: true,
      type: [Object, Array]
    }
  },

  computed: {
    ...mapState({
      updateEmployeeFilters: state => state.updateEmployeeFilters
    })
  },

  data () {
    return {
      reportDialog: false,
      allColumnsSelected: false,
      downloadingFlag: false,
      selectedColumns: [],
      filterType: null
    };
  },

  methods: {
    updateSelectedColumns (col, ev) {
      const temp = this.selectedColumns;
      const match = this.$lodash.findIndex(this.selectedColumns, field =>
        field.key === col.key);
      if (ev && match <= -1) {
        temp.push(col);
      } else if (!ev && match > -1) {
        temp.splice(match, 1);
        this.allColumnsSelected = false;
      }
      this.selectedColumns = temp;
    },
    toggleAllSelectedColumns (ev) {
      if (!ev) {
        this.selectedColumns = [];
        this.allColumnsSelected = false;
      } else {
        this.selectedColumns = JSON.parse(JSON.stringify(this.allColumns));
        this.allColumnsSelected = true;
      }
    },
    checkIfSelected (col) {
      const match = this.$lodash.findIndex(this.selectedColumns, field =>
        field.key === col.key);
      let selected = false;
      if (match > -1) {
        selected = true;
      } else {
        selected = false;
      }
      return selected;
    },
    downloadReport (reportGenerationType) {
      this.downloadingFlag = true;
      let reportFilters = {};
      if (this.filterType === 'selected') {
        // send employeeList in api call
        const employeeList = [];
        let newFilter = {};
        this.$lodash.each(this.selectedEmployees, (emp) => {
          employeeList.push(emp.email);
        });
        newFilter = {
          user__email__in: employeeList.join()
        };
        reportFilters = {
          ...reportFilters,
          ...newFilter
        };
      } else if (this.filterType === 'filtered') {
        // send filters in api call
        let newFilter = {};
        const filters = Object.assign({}, this.updateEmployeeFilters);
        if (filters && filters.filters) {
          delete filters.filters;
        }
        this.$lodash.each(this.updateEmployeeFilters.filters, (v, k) => {
          if (v && v.length > 0) {
            newFilter = {
              [`${k}__in`]: v.join()
            };
            reportFilters = {
              ...reportFilters,
              ...newFilter
            };
          }
        });
        reportFilters = {
          ...reportFilters,
          ...filters
        };
      } else {
        // send blank all filters in api call
        reportFilters = {};
      }

      this.$store.dispatch('updateSnackbar', {
        color: 'warn',
        show: true,
        text: 'Generating report, Please wait!'
      });

      reportFilters = {
        ...reportFilters,
        status__in: this.getEmployeeListType ? this.getEmployeeListType : undefined
      };

      axios.post(`${process.env.VUE_APP_API_URL}reports/custom_report/download?response_type=${reportGenerationType}`, {
        model: 'userprofile',
        columns: this.selectedColumns,
        // 'report_id': report.id,
        // 'report_title': report.title,
        filters: reportFilters
      }).then((response) => {
        if (response && response.status === 200 && response.data) {
          if (response.data.message) {
            this.downloadingFlag = false;
            if (reportGenerationType === 'sync') {
              window.open(response.data.message);
            } else if (reportGenerationType === 'email') {
              this.$store.dispatch('updateSnackbar', {
                color: 'info',
                show: true,
                text: response.data.message
              });
            }
          } else {
            this.downloadingFlag = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to generate report, Please try again later!'
            });
          }
          this.reportDialog = false;
        } else {
          this.downloadingFlag = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to generate report, Please try again later!'
          });
          this.reportDialog = false;
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to generate report, Please try again later!'
        });
        this.reportDialog = false;
        throw new Error(response);
      });
    }
  }
};
</script>
