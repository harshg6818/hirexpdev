<template>
  <!-- <div id="chartdiv" class="driver-diversity-donught"></div> -->
  <div class="driver-diversity-wrap">
    <!-- <div class="drivers-body"> -->
      <div class="drivers-header">
        <div class="male">Male</div>
        <div class="female">Female</div>
        <div class="others">Others</div>
        <!-- <div>Male</div>
        <div>Female</div>
        <div>Others</div> -->
      </div>
      <div class="first-row">
        <div class="male"></div>
        <div class="female"></div>
        <div class="others"></div>
      </div>
      <div class="second-row">
        <div class="male"></div>
        <div class="female"></div>
        <div class="others"></div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import 'amcharts3';
import 'amcharts3/amcharts/pie';

export default {
  name: 'DiversityDriverDonught',

  mounted () {
    // this.createDiversityDriverDonught();
  },

  methods: {
    createDiversityDriverDonught () {
      window.AmCharts.makeChart('chartdiv', {
        type: 'pie',
        theme: 'none',
        dataProvider: [{
          title: 'Male',
          value: 60,
          color: '#4c3e9d'
        }, {
          title: 'Female',
          value: 30,
          color: '#af1858'
        }, {
          title: 'Others',
          value: 10,
          color: 'lightgrey'
        }],
        titleField: 'title',
        valueField: 'value',
        colorField: 'color',
        labelRadius: 5,
        radius: '30%',
        innerRadius: '50%',
        labelText: '[[title]]',
        export: {
          enabled: false
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.driver-diversity-donught {
  width: 100%;
  height: 100%;
}
.driver-diversity-wrap {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 5fr 5fr;
  height: 100%;
  .second-row, .first-row, .drivers-header {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid #fff;
    .male {
      // background-color: #4c3e9d;
      border: 1px solid #4c3e9d;
    }
    .female {
      // background-color: #af1858;
      border: 1px solid #af1858;
    }
    .others {
      // background-color: lightgrey;
      border: 1px solid lightgrey;
    }
  }
  .drivers-header {
    // align-self: center;
    align-items: center;
    justify-items: center;
    font-weight: 600;
    .male {
      background-color: #ffffff !important;
      border: none !important;
    }
    .female {
      background-color: #ffffff !important;
      border: none !important;
    }
    .others {
      background-color: #ffffff !important;
      border: none !important;
    }
  }
}
</style>
