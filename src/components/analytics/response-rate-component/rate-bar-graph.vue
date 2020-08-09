<template>
  <div id="rateBarGraph"></div>
</template>

<script>
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import { mapState } from 'vuex';

export default {
  name: 'rateBarGraph',

  props: {
    barData: {
      required: true,
      type: Array
    },
    sortByKey: {
      required: true,
      type: String
    }
  },

  watch: {
    barData: {
      deep: true,
      immediate: true,
      handler () {
        this.createChart();
      }
    }
  },

  computed: {
    ...mapState({
      updateEmployeeFilters: state => state.updateEmployeeFilters
    })
  },

  mounted () {
    this.createChart();
  },

  methods: {
    // completed_chats: 36
    // disengaged_users: 9
    // driverAverage: 3.45
    // key: "Pune"
    // participation_rate: 26.47
    // total_chats: 136
    createChart () {
      window.AmCharts.makeChart('rateBarGraph', {
        theme: 'none',
        type: 'serial',
        dataProvider: this.barData,
        colors: ['#4c3e9d'],
        valueAxes: [{
          title: 'Participations in (%)',
          gridAlpha: 0,
          minimum: 0,
          maximum: 100,
          autoGridCount: false,
          gridCount: 11
        }],
        balloon: {
          fillAlpha: 1,
          fillColor: '#fff'
        },
        listeners: [{
          event: 'clickGraphItem',
          method: this.handelClickOnRateBar
        }],
        graphs: [{
          // balloonText: '[[category]]:[[value]]',
          balloonText: '<div><b>[[category]]</b></div><br><div><div style="display:grid;grid-template-columns:1fr 1fr;justify-items: start;"><span>Participation rate</span><span style="padding-left:10px;">[[participation_rate]]</span></div><div style="display:grid;grid-template-columns:1fr 1fr;justify-items: start;"><span>Total chats</span><span style="padding-left:10px;">[[total_chats]]</span></div><div style="display:grid;grid-template-columns:1fr 1fr;justify-items: start;"><span>Completed chats</span><span style="padding-left:10px;">[[completed_chats]]</span></div><div style="display:grid;grid-template-columns:1fr 1fr;justify-items: start;"><span>Driver average</span><span style="padding-left:10px;">[[driverAverage]]</span></div><div style="display:grid;grid-template-columns:1fr 1fr;justify-items: start;"><span>Disengaged users</span><span style="padding-left:10px;">[[disengaged_users]]</span></div></div>',
          fillColorsField: 'color',
          fillAlphas: 1,
          lineAlpha: 0.2,
          // title: 'Income',
          type: 'column',
          // valueField: 'value',
          valueField: 'participation_rate',
          columnWidth: 0.3
        }],
        depth3D: 4,
        angle: 30,
        rotate: true,
        // categoryField: 'label',
        categoryField: 'key',
        categoryAxis: {
          gridAlpha: 0,
          gridPosition: 'start',
          fillAlpha: 0.05,
          position: 'left'
        },
        export: { enabled: false }
      });
      this.$forceUpdate();
    },
    handelClickOnRateBar (e) {
      const filters = {
        [this.sortByKey]: []
      };
      filters[this.sortByKey].push(e.item.category);
      const employeeFilters = {
        filters
      };
      this.$store.dispatch('updateEmployeeFilters', employeeFilters);
      this.$router.push({ path: '/employees' });
    }
  }
};
</script>

<style lang="scss" scoped>
#rateBarGraph {
  width: 100%;
  height: 100%;
}
</style>
