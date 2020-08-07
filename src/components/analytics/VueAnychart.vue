<template>
<div>
  <div class="chart" />
</div>
</template>

<script>

// import Anychart from 'anychart';

export default {
  props: ['options', 'Anychart'],
  name: 'VueAnychart',
  data () {
    return {
      chart: {
        type: 'pie',
        data: [
          ['Product A', 1222],
          ['Product B', 2431],
          ['Product C', 3624]
        ],
        title: 'Create a Pie Chart'
      }
    };
  }
};
</script>
