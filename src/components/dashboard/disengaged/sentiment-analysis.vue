<template>
  <div class="disengaged-sentiment-analysis-wrap">
    <sentimentAnalysis ref="sentimentAnalysis" containerId="1"> </sentimentAnalysis>
  </div>
</template>

<script>
import sentimentAnalysis from '../../analytics/sentimentAnalysis';

export default {
  name: 'DisengagedSentimentAnalysis',

  components: {
    sentimentAnalysis,
  },

  mounted() {
    // setTimeout(() => {
      this.getData();
    // }, 200);
  },

  methods: {
    getData() {
      // setTimeout(() => {
        this.$refs.sentimentAnalysis.analysisEnabled = false;
        this.$refs.sentimentAnalysis.analysisTab = false;
        this.$refs.sentimentAnalysis.sentimentTab = true;
        this.$refs.sentimentAnalysis.report = { question_analysis: {} };
        // if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
        //   this.filters.selected = this.dashboardFilters.filters;
        //   this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
        // }
        const queryParams = {
          initiated_date_start: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
          initiated_date_end: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
        };
        // this.$lodash.each(this.filters.selected, (v, k) => {
        //   if (v.length > 0) {
        //     queryParams[`user__profile__${k}__in`] = v.join();
        //   }
        // });
        this.$refs.sentimentAnalysis.filterData = queryParams;
        this.$refs.sentimentAnalysis.generateWordCloud();
        this.$refs.sentimentAnalysis.getResponses();
      // }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.disengaged-sentiment-analysis-wrap {
  margin: 0 10px;
  padding-bottom: 30px;
}
</style>
