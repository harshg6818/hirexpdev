<template>
  <div class="charts-wrap" v-if="loading">
    <div class="chartdiv" v-for="(item, index) in chartData" :id="item.title" :key="index">
    </div>
  </div>
</template>

<script>
import 'amcharts3';
// import 'amcharts3/amcharts/xy';
import 'amcharts3/amcharts/serial';
// import 'amstock3/amcharts/amstock';
// import 'amstock3/amcharts/serial';
// import 'amstock3/amcharts/amcharts';
// import 'amcharts3/amcharts/plugins/';

export default {
  name: 'RateTrend',

  props: {
    trendData: {
      required: false,
      type: Object
    }
  },

  data () {
    return {
      chartData: [],
      loading: true
    };
  },

  watch: {
    trendData: {
      // immediate: true,
      deep: true,
      handler () {
        // this.createChartData();
        this.updateChart();
      }
    }
    // chartData: {
    //   deep: true,
    //   immediate: true,
    //   handler() {
    //     setTimeout(() => {
    //       this.chart();
    //     }, 1000);
    //   },
    // },
  },

  mounted () {
    // this.createChartData();
    this.updateChart();
    // setTimeout(() => {
    //   this.chart();
    // }, 1000);
  },

  beforeDestroy () {
    this.loading = false;
  },

  methods: {
    createChartData () {
      this.chartData = [];
      this.$lodash.each(this.trendData, (val, key) => {
        const dataPoints = [];
        this.$lodash.each(val, (v) => {
          const t = {};
          t.value = v.participation_rate;
          t.date = v.key;
          dataPoints.push(t);
        });
        const temp = {};
        temp.data = dataPoints;
        temp.title = key;
        this.chartData.push(temp);
      });
    },
    updateChart () {
      this.chartData = [];
      this.$lodash.each(this.trendData, (val, key) => {
        const dataPoints = [];
        this.$lodash.each(val, (v) => {
          const t = {};
          t.value = v.participation_rate;
          t.date = v.key;
          dataPoints.push(t);
        });
        const temp = {};
        temp.data = dataPoints;
        temp.title = key;
        this.chartData.push(temp);
      });
      setTimeout(() => {
        this.chart();
      }, 100);
    },
    chart () {
      // setTimeout(() => {
      this.$lodash.each(this.chartData, (val) => {
        this.createMultiTrend(val.data, val.title);
      });
      // }, 1000);
    },
    createMultiTrend (data, type) {
      window.AmCharts.makeChart(`${type}`, {
        type: 'serial',
        theme: 'none',
        marginTop: 0,
        marginRight: 10,
        dataProvider: data,
        valueAxes: [{
          position: 'left',
          title: type,
          minimum: 0,
          maximum: 110,
          autoGridCount: false,
          gridCount: 6,
          gridAlpha: 0,
          integersOnly: true,
          dashLength: 5
        }],
        graphs: [{
          id: 'g1',
          balloonText: "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
          bullet: 'round',
          bulletSize: 8,
          lineThickness: 2,
          type: 'smoothedLine',
          lineColor: '#4c3e9d',
          valueField: 'value'
        }],
        chartScrollbar: {
          enabled: false
        },
        chartCursor: {
          categoryBalloonDateFormat: 'YYYY',
          cursorAlpha: 0,
          zoomable: false,
          valueLineEnabled: true,
          valueLineBalloonEnabled: true,
          valueLineAlpha: 0.5,
          fullWidth: true
        },
        categoryField: 'date',
        dataDateFormat: 'MM',
        categoryAxis: {
          title: 'Months',
          gridAlpha: 0,
          minorGridEnabled: false,
          gridPosition: 'start'
        },
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
.charts-wrap {
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  grid-auto-columns: 300px !important;
  grid-auto-rows: 300px !important;
}
.chartdiv {
  // width: 100%;
  width: 100%;
  // height: 100%;
  width: 250px !important;
  height: 225px !important;
  // .amChartsCompareList {
  //   // overflow: hidden !important;
  //   .amcharts-compare-item-div {
  //     height: 30px !important;
  //     display: grid !important;
  //     grid-template-columns: 1fr 1fr !important;
  //     align-items: center !important;
  //   }
  // }
}
</style>
