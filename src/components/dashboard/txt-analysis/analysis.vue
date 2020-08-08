<template>
  <div>
    <OpenEnded ref="OpenEnded" class="my-4 mx-2" />
  </div>
</template>

<script>
import OpenEnded from '../../analytics/openEndedQuestions';

export default {
  name: 'TextAnalysis',

  components: {
    OpenEnded
  },

  mounted () {
    setTimeout(() => {
      this.$refs.OpenEnded.getQuestions();
      if (this.$refs.OpenEnded.$refs && this.$refs.OpenEnded.$refs.sentimentAnalysis &&
      this.$refs.OpenEnded.$refs.sentimentAnalysis.config) {
        this.$refs.OpenEnded.$refs.sentimentAnalysis.config.page_offset = 1;
      }
    }, 100);
  }
};
</script>

<style lang="scss" scoped>
.text-analysis-wrap {
  margin: 0 10px;
  padding-bottom: 30px;
}
</style>
