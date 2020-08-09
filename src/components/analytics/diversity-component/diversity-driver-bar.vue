<template>
  <div>
    <div class="report-title">Gender Diversity Over Time By Drivers</div>
    <div id="diversityDriverBar" class="driver-diversity-bar"></div>
  </div>
</template>

<script>
import 'amcharts3';
import 'amcharts3/amcharts/serial';
// import { mapState } from 'vuex';

export default {
  name: 'DiversityDriverBar',

  props: {
    barData: {
      reqiured: true,
      type: Object
    }
  },

  data () {
    return {
      driverBarData: []
    };
  },

  mounted () {
    // this.createDiversityDriverBar();
  },

  watch: {
    barData: {
      deep: true,
      immediate: true,
      handler () {
        this.formatDriverData();
        this.createDiversityDriverBar();
      }
    }
  },

  methods: {
    formatDriverData () {
      const temp = [];
      this.$lodash.each(this.barData, (val, key) => {
        const t = {};
        t.driver = key.replace(/([A-Z])/g, ' $1').trim();
        t.male = val.Male ? val.Male : undefined;
        t.female = val.Female ? val.Female : undefined;
        t.other = val.Other ? val.Other : undefined;
        temp.push(t);
      });
      this.driverBarData = temp;
    },
    createDiversityDriverBar () {
      window.AmCharts.makeChart('diversityDriverBar', {
        type: 'serial',
        theme: 'none',
        categoryField: 'driver',
        rotate: true,
        startDuration: 1,
        legend: {
          useGraphSettings: true
        },
        categoryAxis: {
          gridPosition: 'start',
          position: 'left',
          gridAlpha: 0,
          title: 'Drivers',
          labelFunction: function labelFunction (categoryField) {
            // console.log('categoryField', categoryField);
            return categoryField.split(' ').join('\n');
          }
        },
        trendLines: [],
        graphs: [
          {
            balloonText: 'Male:[[value]]',
            fillAlphas: 1,
            id: 'AmGraph-1',
            lineAlpha: 0.2,
            title: 'Male',
            type: 'column',
            valueField: 'male',
            // fillColors: '#4c3e9d',
            fillColors: '#938bc4'
          },
          {
            balloonText: 'Female:[[value]]',
            fillAlphas: 1,
            id: 'AmGraph-2',
            lineAlpha: 0.2,
            title: 'Female',
            type: 'column',
            valueField: 'female',
            // fillColors: '#e91e63',
            // fillColors: '#af1858',
            fillColors: '#fedbf8'
          },
          {
            balloonText: 'Others:[[value]]',
            fillAlphas: 1,
            id: 'AmGraph-3',
            lineAlpha: 0.2,
            title: 'Others',
            type: 'column',
            valueField: 'others',
            fillColors: 'lightgrey'
          }
        ],
        guides: [],
        valueAxes: [
          {
            // id: 'ValueAxis-1',
            // position: 'top',
            axisAlpha: 1,
            gridAlpha: 0,
            // integersOnly: true,
            autoGridCount: false,
            maximum: 5,
            minimum: 0,
            reversed: false,
            dashLength: 5,
            gridCount: 6,
            position: 'left',
            title: 'Score'
          }
        ],
        allLabels: [],
        balloon: {},
        titles: [],
        dataProvider: this.driverBarData,
        // dataProvider: [
        //   {
        //     male: 2,
        //     female: 4,
        //     others: 3,
        //     driver: 'Carrer\nOpportunities',
        //   },
        //   {
        //     male: 4,
        //     female: 2.5,
        //     others: 3,
        //     driver: 'Culture',
        //   },
        //   {
        //     male: 3,
        //     female: 2.5,
        //     others: 1,
        //     driver: 'Leadership',
        //   },
        //   {
        //     male: 4.2,
        //     female: 3.6,
        //     others: 1.8,
        //     driver: 'Performance\nManagement',
        //   },
        //   {
        //     male: 3,
        //     female: 1.2,
        //     others: 2,
        //     driver: 'Rewards and\nRecognition',
        //   },
        //   {
        //     male: 5,
        //     female: 3,
        //     others: 2,
        //     driver: 'Worklife\nIntegration',
        //   },
        // ],
        export: {
          enabled: false
        }
      });
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.report-title {
  text-align: center;
  position: relative;
  top: 10px;
  color: var(--color-text);
  font-size: var(--heading-size);
  font-weight: var(--heading-weight);
}
.driver-diversity-bar {
  width: 100%;
  height: 600px;
  // height: 100%;
}
</style>
