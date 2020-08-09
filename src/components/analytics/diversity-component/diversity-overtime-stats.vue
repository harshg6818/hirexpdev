<template>
  <div class="diversity-overtime-stats-wrap">
    <div class="first-row">
      <div class="diversity-score">
        3.6
      </div>
      <div class="diversity-sub">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt facere officia aliquid possimus.
      </div>
    </div>
    <div class="second-row">
      <div class="diversity-score">
        2.8
      </div>
      <div class="diversity-sub">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt facere officia aliquid possimus.
      </div>
    </div>
    <div class="third-row">
      <div class="diversity-score">
        2.8
      </div>
      <div class="diversity-sub">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt facere officia aliquid possimus.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiversityOvertimeStats'
};
</script>

<style lang="scss" scoped>
.diversity-overtime-stats-wrap {
  display: grid;
  grid-template-columns: 1fr;
  padding-left: 20px;
  .first-row, .second-row, .third-row{
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    .diversity-score {
      font-size: 50px;
    }
  }
}
</style>
