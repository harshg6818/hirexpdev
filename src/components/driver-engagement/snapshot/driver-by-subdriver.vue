<template>
  <div class="driver-by-subdriver-wrap">
    <div class="subdriver-title">Subdriver contribute to {{activeCard.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}} driver score.</div>
    <div>
      <v-row class="ma-0">
        <v-col cols="6">
          <v-row cols="12">
            <v-col cols="10" class="font-weight-bold">
              Sub Drivers
            </v-col>
            <v-col cols="2" class="font-weight-bold">
              Avg
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col>
              <div class="font-weight-bold">Negative</div>
            </v-col>
            <v-col>
              <div class="font-weight-bold">Neutral</div>
            </v-col>
            <v-col>
              <div class="font-weight-bold">Positive</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <div class="sub-driver-body">
      <v-row class="sub-driver-row ma-0"
        v-for="(item, key) in sub_drivers" :key="key"
      >
        <v-col cols="6">
          <v-row cols="12">
            <v-col cols="10">
              {{key.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}}
            </v-col>
            <v-col cols="2">
              <v-row class="ml-4"><div>{{item}}</div></v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="text-left">
            <v-col>
              <div class="stats-score ml-4">12</div>
            </v-col>
            <v-col>
              <div class="stats-score ml-4">35</div>
            </v-col>
            <v-col>
              <div class="stats-score ml-4">86</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <!-- <div class="stats-breakdown">
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
          </div> -->
  </div>
</template>

<script>
export default {
  name: 'DriverBySubdriver',

  props: {
    activeCard: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      sub_drivers: {
        Collaboration: 4.5,
        Onboarding: 3.8,
        Relationships: 3.8,
        WorkEnvironment: 3.4,
        environment: 5,
        peerRelationship: 1
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.driver-by-subdriver-wrap {
  height: 500px;
  .subdriver-title {
    text-align: center;
    font-size: var(--heading-size);
    font-weight: var(--heading-weight);
    padding: 8px 0px;
  }
  .sub-driver-row {
    .subdriver-text {
      text-align: left;
    }
    .subdriver-score {
      // display: grid;
      // place-items: center;
    }
    // .stats-breakdown {
    //   display: grid;
    //   grid-template-columns: repeat(3, 1fr);
    //   place-items: center;
    //   .stats-score {
    //     text-align: center;
    //   }
    //   .stats-title {
    //     font-weight: var(--heading-weight);
    //     text-align: center;
    //   }
    // }
  }
  .sub-driver-body {
    overflow-y: auto;
    max-height: 350px;
  }
}
</style>
