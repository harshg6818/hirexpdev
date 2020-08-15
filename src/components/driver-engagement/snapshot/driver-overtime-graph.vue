<template>
  <div class="driver-overtime-wrap">
    <div id="driverOvertime"></div>
  </div>
</template>

<script>
import 'amcharts3';
import 'amcharts3/amcharts/serial';

export default {
  name: 'DriverOvertimeGraph',

  data () {
    return {
      graphData: []
    };
  },

  mounted () {
    this.createDriverChart();
  },

  methods: {
    createDriverChart () {
      window.AmCharts.makeChart('driverOvertime', {
        type: 'serial',
        theme: 'none',
        legend: {
          useGraphSettings: true
        },
        dataProvider: [
          {
            month: "Aug '20",
            month_driver_average: 3.1
          },
          {
            month: "Jul '20",
            month_driver_average: 3.5
          },
          {
            month: "Jun '20",
            month_driver_average: 3
          },
          {
            month: "May '20",
            month_driver_average: 2.5
          },
          {
            month: "Apr '20",
            month_driver_average: 3.2
          },
          {
            month: "Mar '20",
            month_driver_average: 3
          },
          {
            month: "Feb '20",
            month_driver_average: 2
          },
          {
            month: "Jan '20",
            month_driver_average: 3
          },
          {
            month: "Dec '19",
            month_driver_average: 3.8
          },
          {
            month: "Nov '19",
            month_driver_average: 3
          },
          {
            month: "Oct '19",
            month_driver_average: 4
          },
          {
            month: "Sep '19",
            month_driver_average: 2
          }
        ],
        valueAxes: [{
          integersOnly: true,
          maximum: 5,
          minimum: 1,
          reversed: false,
          axisAlpha: 0,
          dashLength: 5,
          gridCount: 10,
          position: 'left',
          title: 'Score',
          titleBold: false
        }],
        startDuration: 0.5,
        graphs: [{
          balloonText: 'Driver average: [[value]]',
          bullet: 'round',
          bulletSize: 10,
          lineColor: '#0d2c8d',
          title: 'Monthly driver average',
          valueField: 'month_driver_average',
          fillAlphas: 0.2,
          type: 'smoothedLine'
        }],
        chartCursor: {
          cursorAlpha: 0,
          zoomable: false
        },
        categoryField: 'month',
        dataDateFormat: 'YYYY-MM-DD',
        categoryAxis: {
          gridPosition: 'start',
          axisAlpha: 0,
          fillAlpha: 0.00,
          fillColor: '#000000',
          gridAlpha: 0
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.driver-overtime-wrap {
  #driverOvertime {
    height: 500px;
    width: 100%;
  }
}
</style>
