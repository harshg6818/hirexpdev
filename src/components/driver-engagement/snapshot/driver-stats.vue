<template>
  <v-container class="driver-stats-wrap">
    <v-card>
      <v-row>
        <v-col cols="4">
          <div class="participation-wrap">
            <div class="participation-title">Total Participation</div>
            <div class="participation-score">305</div>
            <div class="stats-breakdown">
              <div class="stats-negative">
                <div class="stats-title">Negative</div>
                <div class="stats-score">66</div>
              </div>
              <div class="stats-neutral">
                <div class="stats-title">Neutral</div>
                <div class="stats-score">60</div>
              </div>
              <div class="stats-positive">
                <div class="stats-title">Positive</div>
                <div class="stats-score">45</div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="8">
          <div class="amara-insights-wrap">
            <div class="insights-title">Amara Insights</div>
            <div class="insights-1">Amara has <span>{{disengagedEmp}}%</span> contribution to disengaged employees.</div>
            <div class="insights-2">Amara has <span>{{engScore}}%</span> contribution to engagement score.</div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'DriverStats',

  data () {
    return {
      disengagedEmp: '12',
      engScore: '51'
    };
  }
};
</script>

<style lang="scss" scoped>
.driver-stats-wrap {
  .participation-wrap {
    .participation-title {
      font-size: var(--heading-size);
      font-weight: var(--heading-weight);
      text-align: center;
      color: var(--color-text);
    }
    .participation-score {
      text-align: center;
      font-size: var(--stats-size-1);
    }
    .stats-breakdown {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      place-items: center;
      .stats-score {
        text-align: center;
      }
      .stats-title {
        font-weight: var(--heading-weight);
        text-align: center;
      }
    }
  }
  .amara-insights-wrap {
    .insights-title {
      font-weight: var(--heading-weight);
      color: var(--color-text);
      font-size: var(--heading-size);
      text-align: center;
      padding-bottom: 12px;
    }
    .insights-1 {
      font-size: var(--content-size);
      padding-bottom: 12px;
      color: var(--color-text);
      text-align: center;
    }
    .insights-2 {
      font-size: var(--content-size);
      padding-bottom: 12px;
      color: var(--color-text);
      text-align: center;
    }
  }
}
</style>
