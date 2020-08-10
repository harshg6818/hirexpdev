<template>
  <div>
    <div class="d-flex flex-row">
      <v-flex xs12>
        <div class="milestone-heatmap">
          <table>
            <tbody>
              <tr class="heatmap-head">
                <th class="driver-header milestones">
                  <span>Milestones</span>
                </th>
                <th v-for="(mile, k) in headers" :key="k">
                  {{mile.text}}
                </th>
              </tr>
              <tr class="heatmap-body" v-for="(t, k) in tableAnalysis" :key="k">
                <td class="driver-score ma-0 milestones">{{t.milestone}}</td>
                <td
                  v-for="(driver,key) in roles" :key="key"
                  class="text-xs-center"
                  :style="`background-color:${getColor(t[driver])};
                    color:${getColor(t[driver]) !== '#0000000a'? 'white': 'black'};`"
                >
                  <span class="driver-score"
                    v-if="t[driver] >= 0"
                  >
                    {{ t[driver] }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-flex>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubdriverTable',

  data () {
    return {
      roles: ['Work-life Integration', 'Rewards & Recognition', 'Career Opportunities', 'Culture', 'Leadership', 'Performance Management'],
      headers: [
        {
          text: 'Work-life Integration',
          sortable: false
        },
        {
          text: 'Rewards & Recognition',
          sortable: false
        },
        {
          text: 'Career Opportunities',
          sortable: false
        },
        {
          text: 'Culture',
          sortable: false
        },
        {
          text: 'Leadership',
          sortable: false
        },
        {
          text: 'Performance Management',
          sortable: false
        }
      ],
      tableAnalysis: [{
        milestone: '3 Months ', 'Work-life Integration': 0, 'Rewards & Recognition': 0, 'Career Opportunities': 0, Culture: 5, Leadership: 4.5, 'Performance Management': 0
      }, {
        milestone: '6 Months', 'Work-life Integration': 0, 'Rewards & Recognition': 0, 'Career Opportunities': 0, Culture: 3, Leadership: 0, 'Performance Management': 0
      }, {
        milestone: '6 Months', 'Work-life Integration': 0, 'Rewards & Recognition': 0, 'Career Opportunities': 0, Culture: 3, Leadership: 0, 'Performance Management': 0
      }]
    };
  },

  methods: {
    getColor (value) {
      let color = '#0000000a';
      if (value) {
        if (value <= 3 && value > 0) {
          color = '#d84a45';
        } else if (value <= 4) {
          color = '#fbc647';
        } else if (value <= 5) {
          color = '#089bab';
        }
      }
      return color;
    }
  }
};
</script>

<style lang="scss" scoped>
.milestone-heatmap {
  .heatmap-head {
    th {
      border: 1px solid #f3f1f1;
      color: rgba(0, 0, 0, 0.54);
      // color: #6f64b0;
      padding: 10px;
      border-right: 0;
    }
  }
  .heatmap-body {
    td {
      border: 1px solid #f3f1f1;
      // color: rgba(0, 0, 0, 0.54);
      color: #000;
      padding: 10px;
      border-right: 0;
    }
  }
}
</style>
