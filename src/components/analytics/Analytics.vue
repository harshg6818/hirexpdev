<template>
  <div class="analytics-wrap">
    <router-link to="/analytics/life-cycle" class="report-card zoom-in">
      <div class="report-box">
        Employee life cycle
      </div>
    </router-link>
    <router-link to="/analytics/response-rate" class="report-card zoom-in">
      <div class="report-box">
        Employee participation rate
      </div>
    </router-link>
    <router-link to="/analytics/participation-rate" class="report-card zoom-in">
      <div class="report-box">
        Chat participation rate
      </div>
    </router-link>
    <router-link to="/drivers" class="report-card zoom-in">
      <div class="report-box">
        Driver engagement
      </div>
    </router-link>
    <router-link to="/analytics/diversity-report" class="report-card zoom-in">
      <div class="report-box">
        Gender diversity report
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import axios from 'axios';
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// am4core.useTheme(am4themes_animated);

export default {
  name: 'analytics',
  components: {
  },
  data () {
    return {
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.analytics-wrap {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 10px;
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 20px;
  .report-card {
    text-decoration: none;
    &:before {
      content: "";
      width: 85%;
      background: #F9FAFC;
      box-shadow: 0px 3px 20px #0000000b;
      height: 100%;
      margin-top: 0.75rem;
      position: absolute;
      border-radius: 0.375rem;
      margin-left: auto;
      margin-right: auto;
      right: 0;
      left: 0;
    }
    .report-box {
      display: grid;
      grid-auto-rows: minmax(100px, auto);
      align-items: center;
      justify-items: center;
      box-shadow: 0px 3px 20px #0000000b;
      background-color: var(--bg);
      border-radius: 0.375rem;
      background-color: var(--bg);
      color: var(--color-text);
      position: relative;
    }
  }
}
</style>
