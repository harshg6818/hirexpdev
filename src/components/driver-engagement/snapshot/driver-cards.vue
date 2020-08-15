<template>
  <v-container class="driver-cards-wrap">
    <v-row>
      <v-col
        cols="2"
        v-for="(driver, index) in drivers" :key="index"
        @click="onClickDriver(driver.driver)"
      >
        <v-card
          class="mx-auto hover-link driver-cards"
          :class="activeCard === driver.driver ? 'active' : ''"
        >
          <v-card-text>
            <div class="driver-icon">
              <!-- <img :src="getDriverIcon(driver.driver)"> -->
              <img :src="getImgUrl(driver.driver)">
            </div>
            <div class="driver-title">
              {{driver.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}}
            </div>
            <div class="driver-score">
              {{driver.average}}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DriverCards',

  props: {
    activeCard: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      drivers: [{
        driver: 'CareerOpportunities', average: 3.6, disengaged_employees: 22, sub_drivers: { 'Growth Path': 4.2, GrowthPath: 3.6, LearningAndDevelopment: 3.5 }
      }, {
        driver: 'Culture',
        average: 3.4,
        disengaged_employees: 86,
        sub_drivers: {
          Collaboration: 4.5, Onboarding: 3.8, Relationships: 3.8, WorkEnvironment: 3.4, environment: 5, peerRelationship: 1
        }
      }, {
        driver: 'Leadership', average: 3.7, disengaged_employees: 25, sub_drivers: { Communication: 3.5, ManagerialSupport: 3.6, Vision: 4.3 }
      }, {
        driver: 'PerformanceManagement', average: 3.6, disengaged_employees: 26, sub_drivers: { ContinuousDialogue: 3.4, FairnessAndTransparency: 3.8, GoalSetting: 3.9 }
      }, {
        driver: 'RewardsAndRecognition', average: 4.6, disengaged_employees: 9, sub_drivers: { Recognition: 3.2, Rewards: 4.2, recognition: 5 }
      }, {
        driver: 'WorklifeIntegration', average: 3.5, disengaged_employees: 13, sub_drivers: { Workload: 3.5 }
      }]
    };
  },

  methods: {
    onClickDriver (driver) {
      this.$emit('onClickDriver', driver);
    },
    getImgUrl (pet) {
      const images = require.context('@/assets', false, /\.png$/);
      return images(`./${pet}.png`);
    }
  }
};
</script>

<style lang="scss" scoped>
.driver-cards-wrap {
  .driver-cards {
    // height: 120px;
    transform: scale(0.999);
    .driver-score {
      text-align: center;
      font-size: var(--stats-size-1);
      padding-bottom: 16px;
      font-weight: var(--heading-weight);
      color: var(--color-text);
      padding: 4px 0;
    }
    .driver-icon {
      text-align: center;
      filter: grayscale(100%);
      img {
        height: 50px;
        width: 50px;
        filter: grayscale(100%);
      }
    }
    .driver-title {
      text-align: center;
      font-size: var(--content-size);
      color: var(--color-text);
      padding: 4px 0;
    }
    &:hover {
      cursor: pointer;
    }
    &.active {
      transform: scale(1.1);
      transition-property: transform;
      transition: 0.5s ease all;
      // background: linear-gradient(90deg,#61245e,#42276f 90%);
      // background: linear-gradient(90deg,#a07b9e,#938bc4);
      background: linear-gradient(90deg, #d1567b, #9a76d3);
      color: #ffffff;
      .driver-score {
        color: #ffffff;
      }
      .driver-title {
        color: #ffffff;
      }
    }
  }
}
</style>
