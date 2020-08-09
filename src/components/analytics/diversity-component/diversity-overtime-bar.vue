<template>
  <div>
    <div class="report-title">Gender Diversity Over Time</div>
    <div id="diversityOvertimeBar" class="diversityOvertimeBar"></div>
  </div>
</template>

<script>
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs-ext/plugin/customParseFormat';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
// import { mapState } from 'vuex';

export default {
  name: 'DiversityOvertimeBar',

  props: {
    barData: {
      required: true,
      type: Object
    }
  },

  data () {
    return {
      overtimeData: []
    };
  },

  beforeUpdate () {
    // this.formatOvertimeData();
    // this.createDiversityOvertime();
  },

  watch: {
    barData: {
      deep: true,
      immediate: true,
      handler () {
        this.formatOvertimeData();
        this.createDiversityOvertime();
      }
    }
  },

  methods: {
    formatOvertimeData () {
      // console.log('im in daa');
      const temp = [];
      this.$lodash.each(this.barData, (val, key) => {
        const t = {};
        const date = new Date(key);
        t.year = dayjs(date).format('MMM \'YY');
        t.male = val.Male ? val.Male : undefined;
        t.female = val.Female ? val.Female : undefined;
        t.other = val.Other ? val.Other : undefined;
        temp.push(t);
      });
      this.overtimeData = temp;
    },
    createDiversityOvertime () {
      window.AmCharts.makeChart('diversityOvertimeBar', {
        type: 'serial',
        theme: 'none',
        legend: {
          useGraphSettings: true,
          position: 'right'
        },
        dataProvider: this.overtimeData,
        // dataProvider: [{
        //   year: '29/02/20',
        //   italy: 1,
        //   germany: 5,
        //   uk: 3,
        // }, {
        //   year: '31/03/20',
        //   italy: 1,
        //   germany: 2,
        //   uk: 3,
        // }, {
        //   year: '30/04/20',
        //   italy: 2,
        //   germany: 3,
        //   uk: 1,
        // }, {
        //   year: '31/05/20',
        //   italy: 3,
        //   germany: 4,
        //   uk: 1,
        // }, {
        //   year: '30/06/20',
        //   italy: 5,
        //   germany: 1,
        //   uk: 2,
        // }, {
        //   year: '31/07/20',
        //   italy: 3,
        //   germany: 2,
        //   uk: 1,
        // }],
        valueAxes: [{
          integersOnly: true,
          maximum: 5,
          minimum: 0,
          reversed: false,
          axisAlpha: 1,
          dashLength: 5,
          gridCount: 6,
          autoGridCount: false,
          position: 'left',
          title: 'Score',
          gridAlpha: 0
        }],
        startDuration: 0.3,
        graphs: [{
          balloonText: 'place taken by Make in [[category]]: [[value]]',
          bullet: 'round',
          hidden: false,
          title: 'Male',
          valueField: 'male',
          fillAlphas: 0,
          // lineColor: '#4c3e9d',
          lineColor: '#938bc4',
          lineThickness: '3',
          bulletSize: '12'
        }, {
          balloonText: 'place taken by Female in [[category]]: [[value]]',
          bullet: 'round',
          title: 'Female',
          valueField: 'female',
          fillAlphas: 0,
          // lineColor: '#af1858',
          lineColor: '#fedbf8',
          lineThickness: '3',
          bulletSize: '12'
        }, {
          balloonText: 'place taken by Others in [[category]]: [[value]]',
          bullet: 'round',
          title: 'Others',
          valueField: 'other',
          fillAlphas: 0,
          lineColor: 'lightgrey',
          lineThickness: '3',
          bulletSize: '12'
        }],
        chartCursor: {
          cursorAlpha: 0,
          zoomable: false
        },
        categoryField: 'year',
        categoryAxis: {
          title: 'Months',
          gridPosition: 'start',
          axisAlpha: 1,
          fillAlpha: 0,
          fillColor: '#000000',
          gridAlpha: 0
          // labelFunction: function labelFunction(categoryField) {
          //   return dayjs(categoryField, { format: 'DD/MM/YY' }).format('MMM \'YY');
          // },
        },
        export: {
          enabled: false,
          position: 'bottom-right'
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
.diversityOvertimeBar {
  // height: 500px;
  height: 100%;
  width: 100%;
}
</style>
