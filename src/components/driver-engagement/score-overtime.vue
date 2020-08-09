<template>
  <div id="chartdiv" class="lineGraph"></div>
</template>

<script>
import 'amcharts3';
import 'amcharts3/amcharts/serial';

export default {
  name: 'ScoreOverTime',

  data () {
    return {
      milestone_wise_analysis: {
        '7 Days ': { GrowthPath: 3.6, LearningAndDevelopment: 3.3 }, '6 Months': { LearningAndDevelopment: 3.2 }, '15 days': { LearningAndDevelopment: 4.3 }, '4 Months - 1': { LearningAndDevelopment: 3.4 }, '6 months': { LearningAndDevelopment: 3.8 }, '45 Days': { LearningAndDevelopment: 4.7 }, '1 Year': { LearningAndDevelopment: 2.5 }
      }
    };
  },

  mounted () {
    this.generateLineGraph(this.milestone_wise_analysis);
  },

  methods: {
    generateLineGraph () {
      window.AmCharts.makeChart('chartdiv', {
        type: 'serial',
        theme: 'none',
        marginTop: 0,
        marginRight: 80,
        dataProvider: [{
          year: '1950',
          value: 2.307
        }, {
          year: '1951',
          value: 5.168
        }, {
          year: '1952',
          value: 4.073
        }, {
          year: '1953',
          value: 6.027
        }, {
          year: '1954',
          value: 1.251
        }, {
          year: '1955',
          value: 3.47
        }],
        valueAxes: [{
          axisAlpha: 0,
          position: 'left'
        }],
        graphs: [{
          id: 'g1',
          balloonText: "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
          bullet: 'round',
          bulletSize: 8,
          lineColor: '#4c3e9d',
          lineThickness: 2,
          negativeLineColor: '#4c3e9d',
          type: 'smoothedLine',
          valueField: 'value'
        }],
        chartScrollbar: {
          enabled: false
        },
        chartCursor: {
          categoryBalloonDateFormat: 'YYYY',
          cursorAlpha: 0,
          valueLineEnabled: true,
          valueLineBalloonEnabled: true,
          valueLineAlpha: 0.5,
          fullWidth: true
        },
        dataDateFormat: 'YYYY',
        categoryField: 'year',
        categoryAxis: {
          minPeriod: 'YYYY',
          parseDates: true,
          minorGridAlpha: 0.1,
          minorGridEnabled: true
        },
        export: {
          enabled: false
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.lineGraph {
  // padding-top: 20px !important;
  // height: 300px !important;
  height: 350px !important;
  width: 100% !important;
  top: 30px;
  position: relative;
}
</style>
