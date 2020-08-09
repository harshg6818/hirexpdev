<template>
  <v-layout>
      <v-flex xs3 class="chart-card-wrap">
        <v-card class="chart-card">
          <a href="#onboarding">
            <v-card-title class="chart-title">
              Onboarding
            </v-card-title>
            <v-card-text class="chart-desc">
              <span>New employees,</span>
              <span style="color: #4c3e9d;font-weight:bold">&nbsp;0-3&nbsp;</span>
              <span>months after starting.</span>
            </v-card-text>
          </a>
        </v-card>
      </v-flex>
      <v-flex xs3 class="chart-card-wrap">
        <v-card class="chart-card">
          <a href="#initial">
            <v-card-title class="chart-title">
              Initial development
            </v-card-title>
            <v-card-text class="chart-desc">
              <span>Employees in the organization for</span>
              <span style="color: #4c3e9d;font-weight:bold">&nbsp;3-24&nbsp;</span>
              <span>months.</span>
            </v-card-text>
          </a>
        </v-card>
      </v-flex>
      <v-flex xs3 class="chart-card-wrap">
        <v-card class="chart-card">
          <a href="#ongoing">
            <v-card-title class="chart-title">
              Ongoing development
            </v-card-title>
            <v-card-text class="chart-desc">
              <span>Employees in the organization for</span>
              <span style="color: #4c3e9d;font-weight:bold">&nbsp;24+&nbsp;</span>
              <span>months.</span>
            </v-card-text>
          </a>
        </v-card>
      </v-flex>
      <v-flex xs3 class="chart-card-wrap">
        <v-card class="chart-card last-card">
          <a href="#separation">
            <v-card-title class="chart-title">
              Separation
            </v-card-title>
            <v-card-text class="chart-desc">
              The final period of the employment.
              <p class="pa-4 pt-3">Not enough data to generate report</p>
            </v-card-text>
          </a>
        </v-card>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'avgEngagement'
};
</script>

<style lang="scss" scoped>
.chart-card-wrap {
  padding: 1px;
  .chart-card {
    height: 15rem;
    border-radius: 0px !important;
    .chart-title {
      color: #4c3e9d;
      font-weight: 500;
      font-size: 15px;
      color: #4a4a4a;
      line-height: 1;
      padding-bottom: 0!important;
    }
    .chart-desc {
      padding-top: 4px !important;
      color: #b1bbc4;
      font-weight: 400;
      font-size: 12px;
    }
    a {
      text-decoration: none;
    }
    &:hover {
      transition: 0.5s ease all;
      transform: scale(0.97)!important;
    }
  }
}
.last-card {
  position: relative;
  left: 20px;
  width: 93%;
  &:hover {
    color: #ffffff;
    // background: linear-gradient(90deg, #42276f, #911f42);
    background: linear-gradient(90deg, rgb(130,90,197), rgb(217,77,120));
  }
  &:hover .chart-title {
    color: #000000;
  }
  &:hover .chart-desc {
    color: #ffffff;
  }
}
</style>
