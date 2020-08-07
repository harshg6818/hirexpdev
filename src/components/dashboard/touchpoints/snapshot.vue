<template>
  <div class="touchpoints-snapshot-wrap">
    <v-layout class="flex-row flex-wrap" v-if="table.stage.length > 0">
      <v-flex xs12>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr style="border-color:#f3f1f1">
                <th class="px-2 text-xs-left sub-heading"
                  :style="`width:${header.width};max-width:${header.width}; white-space:unset;color:rgba(0,0,0,0.54);`"
                  v-for="header in table.headers"
                  v-html="header.text"
                  :key="header.text"
                >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in table.stage" :key="index" class="card mb-0">
                <td class="px-2" style="font-size:13px !important; width:17%;max-width:17%">
                  <p class="mb-0">
                    {{item.stage_details.title}}
                  </p>
                </td>
                <td class="px-2 text-xs-left" style="font-size:13px !important; width:8%;max-width:8%">
                  <span v-if="!item.drivers_analysis || !item.drivers_analysis.stage_driver_average" class="font-weight-bold grey--text"> 0 </span>
                  <span v-if="item.drivers_analysis && item.drivers_analysis.stage_driver_average">
                    {{item.drivers_analysis.stage_driver_average}}
                  </span>
                </td>

                <td class="px-2 text-xs-left" style="font-size:13px !important; width:8%;max-width:8%">
                  <span v-if="!item.mood_analysis || !item.mood_analysis.stage_mood_average" class="font-weight-bold grey--text"> 0 </span>
                  <img
                  v-if="item.mood_analysis && item.mood_analysis.stage_mood_average"
                  height="30"
                  :src="getImgUrl(`${Math.round(item.mood_analysis.stage_mood_average)}`)"
                  >
                </td>

                <td class="px-2 text-xs-left" style="font-size:13px !important; width:8%;max-width:8%">
                  <span v-if="!item.chat_participation_stats || !item.chat_participation_stats.chats_initiated" class="font-weight-bold grey--text"> 0 </span>
                  <span v-if="item.chat_participation_stats && item.chat_participation_stats.chats_initiated">
                    {{item.chat_participation_stats.chats_initiated}}
                  </span>
                </td>

                <td class="px-2 text-xs-left" style="font-size:13px !important; width:8%;max-width:8%">
                  <span v-if="!item.chat_participation_stats || !item.chat_participation_stats.chats_inProgress" class="font-weight-bold grey--text"> 0 </span>
                  <span v-if="item.chat_participation_stats && item.chat_participation_stats.chats_inProgress">
                    {{item.chat_participation_stats.chats_inProgress}}
                  </span>
                </td>

                <td class="px-2 text-xs-left" style="font-size:13px !important; width:8%;max-width:8%">
                  <span v-if="!item.chat_participation_stats || !item.chat_participation_stats.chats_completed" class="font-weight-bold grey--text"> 0 </span>
                  <span v-if="item.chat_participation_stats && item.chat_participation_stats.chats_completed">
                    {{item.chat_participation_stats.chats_completed}}
                  </span>
                </td>

                <td class="px-2 text-xs-left" style="font-size:13px !important; width:8%;max-width:8%">
                  <span v-if="!item.chat_participation_stats || !item.chat_participation_stats.participation_rate" class="font-weight-bold grey--text"> 0 </span>
                  <span v-if="item.chat_participation_stats && item.chat_participation_stats.participation_rate">
                    {{item.chat_participation_stats.participation_rate}} %
                  </span>
                </td>

                <td class="px-2 text-xs-left" style="font-size:13px !important; width:20%;max-width:20%;padding-bottom: 24px;">
                  <div v-if="!item.stage_nps_breakdown" class="font-weight-bold grey--text">
                    Not enough data to generate analysis
                  </div>
                  <div v-if="item.stage_nps_breakdown">
                    <div :id="`npsBreakdown-${item.milestoneIndex}`" class="chartdiv" ref="lineChart">
                    </div>
                  </div>
                </td>

                <td class="px-2 text-xs-left" style="width:15%;max-width:15%">
                  <v-btn color="primary" outlined
                    class="text-capitalize mx-0 "
                    @click.stop="viewStage(item.stage_details.id)">
                    <span class="btn-text">View analysis</span>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// import axios from 'axios';
import 'amcharts3';
import 'amcharts3/amcharts/serial';

import TouchpointsMixin from './touchpoints-mixin';

export default {
  name: 'TouchpointSnapshot',

  mixins: [TouchpointsMixin],

  data () {
    return {
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
    sortTable () {
      this.$lodash.each(this.table.stage, (v, index) => {
        document.getElementById(`npsBreakdown-${index}`).innerHTML = '';
      });
      if (this.table.sortBy === 'participation_rate_asc') {
        this.table.stage = this.table.stage.sort((a, b) => a.chat_participation_stats.participation_rate - b.chat_participation_stats.participation_rate);
      } else if (this.table.sortBy === 'engagement_score_asc') {
        this.table.stage = this.table.stage.sort((a, b) => a.drivers_analysis.stage_driver_average - b.drivers_analysis.stage_driver_average);
      } else if (this.table.sortBy === 'milestone_name_asc') {
        // this.table.stage = this.table.stage.sort();
        this.table.stage = this.table.stage.sort((a, b) =>
          // a = a.stage_details.title.toLowerCase();
          // b = b.stage_details.title.toLowerCase();
          // return (a < b) ? -1 : (a > b) ? 1 : 0;
          a.stage_details.stageIndex - b.stage_details.stageIndex);
      } else if (this.table.sortBy === 'participation_rate_desc') {
        this.table.stage = this.table.stage.sort((b, a) => a.chat_participation_stats.participation_rate - b.chat_participation_stats.participation_rate);
      } else if (this.table.sortBy === 'engagement_score_desc') {
        this.table.stage = this.table.stage.sort((b, a) => a.drivers_analysis.stage_driver_average - b.drivers_analysis.stage_driver_average);
      } else if (this.table.sortBy === 'milestone_name_desc') {
        // this.table.stage = this.table.stage.sort();
        this.table.stage = this.table.stage.sort((b, a) =>
          // a = a.stage_details.title.toLowerCase();
          // b = b.stage_details.title.toLowerCase();
          // return (a < b) ? -1 : (a > b) ? 1 : 0;
          a.stage_details.stageIndex - b.stage_details.stageIndex);
      }
      this.sortStageData();
    },

    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    sortStageData () {
      this.$lodash.each(this.table.stage, (milestone, index) => {
        const chartName = `npsBreakdown-${index}`;
        if (document.getElementById(chartName)) {
          document.getElementById(chartName).innerHTML = '';
        }
        this.getNPSBreakdown(milestone.stage_nps_breakdown, index);
      });
    },
    getNPSBreakdown (data, index) {
      const t = [];
      t.push(data);
      setTimeout(() => {
        this.createBarStackChart(index, t);
      }, 100);
    },
    createBarStackChart (index, data) {
      window.AmCharts.makeChart(`npsBreakdown-${index}`, {
        type: 'serial',
        theme: 'none',
        valueAxes: [{
          stackType: '100%',
          axisAlpha: 0,
          gridAlpha: 0,
          labelsEnabled: false,
          position: 'left'
        }],
        dataProvider: data,
        balloon: {
          cornerRadius: 2,
          fillAlpha: 1,
          fillColor: '#fff',
          textAlign: 'left'
        },
        graphs: [{
          balloonText: "<span style='font-size:12px;'>Highly Engaged&nbsp;:&nbsp;<b>[[value]]</b></span>",
          fillAlphas: 0.9,
          labelText: '[[positive]]',
          lineAlpha: 0.5,
          type: 'column',
          valueField: 'positive',
          fillColors: '#37b99c',
          color: '#fff'
        }, {
          balloonText: "<span style='font-size:12px;'>Passively Engaged&nbsp;:&nbsp;<b>[[value]]</b></span>",
          fillAlphas: 0.9,
          labelText: '[[neutral]]',
          lineAlpha: 0.5,
          type: 'column',
          valueField: 'neutral',
          fillColors: '#ff9800',
          color: '#fff'
        }, {
          balloonText: "<span style='font-size:12px;'>Disengaged&nbsp;:&nbsp;<b>[[value]]</b></span>",
          fillAlphas: 0.9,
          labelText: '[[negative]]',
          lineAlpha: 0.5,
          type: 'column',
          valueField: 'negative',
          fillColors: '#f44336',
          color: '#fff'
        }],
        marginTop: 0,
        marginRight: 0,
        marginLeft: 0,
        marginBottom: 0,
        autoMargins: false,
        rotate: true,
        categoryField: 'year',
        categoryAxis: {
          gridPosition: 'start',
          axisAlpha: 0,
          gridAlpha: 0
        },
        export: {
          enabled: false
        }
      });
      // this.$forceUpdate();
    },
    viewStage (id) {
      this.$router.push(`/lifecycle/view/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.touchpoints-snapshot-wrap {
  margin: 0 10px;
  padding-bottom: 30px;
  .chartdiv {
    width: 100%;
    height: 32px;
    top: 10px;
    position: relative;
  }
}
</style>
