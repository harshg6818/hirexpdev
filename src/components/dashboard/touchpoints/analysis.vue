<template>
  <div class="touchpoints-analysis-wrap">
    <div class="d-flex flex-row flex-wrap" v-if="table.stage && table.stage.length > 0">
      <v-flex xs12>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr style="border-color:#f3f1f1">
                <th class="px-2 text-xs-left sub-heading"
                :style="`border-right:1px solid #f3f1f1;width:${driverWidth}%;max-width:${driverWidth}%;word-break: break-all; color:rgba(0,0,0,0.54);`">
                  Touchpoint
                </th>
                <th class="px-2 text-xs-left sub-heading overflow-wrap"
                  :style="`border-right:1px solid #f3f1f1;width:${driverWidth}%;max-width:${driverWidth}%;word-break: break-all; color:rgba(0,0,0,0.54);`"
                  v-for="header in roles"
                  :key="header"
                >
                  {{ header.replace(/([a-z0-9])([A-Z])/g, '$1 $2').charAt(0).toUpperCase()+header.replace(/([a-z0-9])([A-Z])/g, '$1 $2').substr(1) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr>
                <td>{{ item }}</td>
              </tr> -->
              <tr v-for="(item, index) in tableAnalysis" :key="index" class="card mb-2" style="border-top:1px solid #f3f1f1;">
                <td class="px-2" style="`border-right:1px solid #f3f1f1;width:${driverWidth}%;font-size:13px !important;`">
                  <p class="mb-0">
                      {{item.milestone}}
                  </p>
                </td>
                <td
                  class="px-2"
                  :style="`border-right:1px solid #f3f1f1;background-color:${getColor(item[driver])};width:${driverWidth}%;max-width:${driverWidth}%;font-size:13px !important;`"
                  v-for="(driver, idx) in roles"
                  :key="idx"
                >
                  <p class="mb-0" v-if="item[driver] >= 0">
                    {{ item[driver] }}
                  </p>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
    </div>
    <div class="bg-white" v-else style="height:300px">
      <v-layout class="flex-row flex-wrap align-center justify-center fill-height">
        <v-flex class="text-center">
          <strong class="body-2 font-weight-bold grey--text">
            Not enough data to generate analysis
          </strong>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import TouchpointsMixin from './touchpoints-mixin';

export default {
  name: 'TouchpointAnaysis',

  mixins: [TouchpointsMixin],

  data () {
    return {
      roles: [],
      height: 290,
      heatMapData: [],
      tableAnalysis: [],
      driverWidth: 20,
      table: {
        sortBy: 'milestone_name_asc',
        descending: false,
        sortingOptions: [{
          text: 'Touchpoint (First to Last)',
          value: 'milestone_name_asc'
        }, {
          text: 'Touchpoint (Last to First)',
          value: 'milestone_name_desc'
        }, {
          text: 'Engagement Score (Low to High)',
          value: 'engagement_score_asc'
        }, {
          text: 'Engagement Score (High to Low)',
          value: 'engagement_score_desc'
        }, {
          text: 'Participation Rate (Low to High)',
          value: 'participation_rate_asc'
        }, {
          text: 'Participation Rate (High to Low)',
          value: 'participation_rate_desc'
        }],
        searchString: '',
        totalStage: 0,
        loading: true,
        stage: [],
        headers: [{
          text: 'Touchpoint',
          value: 'milestone_name',
          align: 'left',
          width: '17%',
          sortable: false
        }, {
          text: 'Engagement \n Score',
          value: 'engagement_score',
          align: 'center',
          width: '8%',
          sortable: false
        }, {
          text: 'Employees\' \n Vibe',
          value: 'employee_vibes',
          align: 'center',
          width: '8%',
          sortable: false
        }, {
          text: 'Chats &nbsp; &nbsp; &nbsp; &nbsp; \n Initiated',
          value: 'chats_initiated',
          align: 'center',
          width: '8%',
          sortable: false
        }, {
          text: 'Chats In \n Progress',
          value: 'chats_initiated',
          align: 'center',
          width: '8%',
          sortable: false
        }, {
          text: 'Chats \n Completed',
          value: 'chats_completed',
          align: 'center',
          width: '8%',
          sortable: false
        }, {
          text: 'Participation \n Rate',
          value: 'participation_rate',
          align: 'center',
          width: '8%',
          sortable: false
        }, {
          text: '&nbsp; &nbsp; Engagement \n Scale',
          value: 'nps_breakdown',
          align: 'center',
          width: '20%',
          sortable: false
        }, {
          text: 'Actions',
          value: 'actions',
          align: 'center',
          width: '17%',
          sortable: false
        // }, {
        //   text: 'Passively Engaged',
        //   align: 'center',
        //   sortable: false,
        // }, {
        //   text: 'Highly Engaged',
        //   align: 'center',
        //   sortable: false,
        }]
      },
      npsBreakdown: []
    };
  },

  mounted () {
    this.getStages();
  },

  methods: {
    sortStageData () {
      this.heatMapData = [];
      this.tableAnalysis = [];
      const roles = [];
      this.$lodash.each(this.table.stage, (milestone) => {
        if (milestone.drivers_analysis && milestone.drivers_analysis.stage_drivers_breakdown) {
          this.$lodash.each(milestone.drivers_analysis.stage_drivers_breakdown, (average, driver) => {
            let match = -1;
            match = this.$lodash.findIndex(roles, v => v === driver);
            if (match <= -1) {
              roles.push(driver);
            }
          });
        }
      });
      this.roles = roles;
      this.driverWidth = 100 / ((roles.length) + 1);
      this.$lodash.each(this.table.stage, (milestone) => {
        if (milestone.drivers_analysis && milestone.drivers_analysis.stage_drivers_breakdown) {
          const temp = {
            milestone: milestone.stage_details.title
          };
          this.$lodash.each(roles, (driver) => {
            // this.$lodash.each(milestone.drivers_analysis.stage_drivers_breakdown, (driverData, driver) => {
            if (milestone.drivers_analysis.stage_drivers_breakdown[driver]) {
              const driverData = milestone.drivers_analysis.stage_drivers_breakdown[driver];
              this.heatMapData.push({
                x: driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2').substr(1),
                y: milestone.stage_details.title,
                heat: driverData.average
              });
              temp[driver] = driverData.average;
            } else {
              this.heatMapData.push({
                x: driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2').substr(1),
                y: milestone.stage_details.title,
                heat: 0
              });
              temp[driver] = 0;
            }
          });
          this.tableAnalysis.push(temp);
        }
      });
    },
    getColor (score) {
      // (["lightgrey", "#f44336", "#ff9800", "#37b99c"]);
      let color = 'lightgrey';
      if (score) {
        if (score <= 3) {
          color = '#f44336';
        } else if (score <= 4) {
          color = '#ff9800';
        } else if (score <= 5) {
          color = '#37b99c';
        }
      }
      return color;
    }
  }
};
</script>

<style lang="scss" scoped>
.touchpoints-analysis-wrap {
  margin: 0 10px;
  padding-bottom: 30px;
}
</style>
