<template>
  <v-layout class="driver-layout">
    <v-flex xs12 class="detail-cards" style="background: rgba(76, 62, 157, 0.1);">
      <p class="pa-3 text-xs-left mb-0">
          <!-- DRIVER-WISE ENGAGEMENT  -->
        </p>
        <v-layout px-3 pb-3 row wrap>
          <v-flex xs12>
            <swiper :options="swiperOption">
              <swiper-slide class="driver-slide" v-for="(d, di) in driverBreakdown" :key="di">
                <div style="background:white; border-radius:8px;" class="driver-card">
                  <v-layout class="driver-title">
                    <p class="ma-0">
                      <span class="heading-driver" v-if="d.driver"> {{d.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}} </span>
                    </p>
                  </v-layout>
                  <v-layout class="driver-sub">
                    <v-flex xs6 class="heading-avg mb-0" style="border-right: 1px solid #efebeb;">
                      <div class="sub-wrap">
                        <div class="avg-title">
                          Driver Average
                        </div>
                        <div class="value">
                          {{d.average}}
                        </div>
                      </div>
                    </v-flex>
                    <v-flex xs6 class="heading-avg mb-0">
                      <div class="sub-wrap">
                        <div class="avg-title">
                          Disengaged Employees
                        </div>
                        <div class="value">
                          {{d.disengaged_employees}}
                        </div>
                      </div>
                    </v-flex>
                  </v-layout>
                  <v-divider class="mb-2"></v-divider>
                  <span class="caption">Subdriver Score</span>
                  <v-list class="pa-0">
                    <v-list-tile class="subdriver-tile" v-for="(v, k) in d.sub_drivers" :key="k">
                      <v-layout>
                        <v-flex xs9 class="overflow-wrap">
                          <v-list-tile-title class="text-capitalize sub-driver-title">
                            <span v-if="k"> {{k.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}} </span>
                          </v-list-tile-title>
                        </v-flex>
                        <v-flex xs2 class="overflow-wrap driver-score">
                          <v-list-tile-action style="align-items: flex-end;min-width: unset;" class=""
                            :style="`border-bottom: 2px solid #f44336;border-color: ${getColor(v)}!important`">
                            {{Number.parseFloat(v).toFixed(1)}}
                          </v-list-tile-action>
                        </v-flex>
                      </v-layout>
                    </v-list-tile>
                  </v-list>
                  <div class="footer">
                    <v-btn
                      color="primary"
                      outline
                    >
                      <span>View details</span>
                    </v-btn>
                  </div>
                </div>
              </swiper-slide>
              <!-- Optional controls -->
              <div class="swiper-pagination" slot="pagination" v-if="driverBreakdown.length > 6"></div>
              <div class="swiper-button-prev" slot="button-prev" v-if="driverBreakdown.length > 6"></div>
              <div class="swiper-button-next" slot="button-next" v-if="driverBreakdown.length > 6"></div>
            </swiper>
          </v-flex>
        </v-layout>
      <!-- <v-layout style="min-height:400px;" class="driverFramework" v-if="!report || !report.stats || !Object.keys(report.company_drivers_breakdown).length" row wrap align-center justify-center fill-height>
        <v-flex text-xs-center>
          <strong class="body-2 font-weight-bold grey--text">
            Not enough data to generate analysis
          </strong>
        </v-flex>
      </v-layout> -->
    </v-flex>
  </v-layout>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

// require styles
import 'swiper/dist/css/swiper.css';

export default {
  name: 'driverAnalysis',

  components: {
    swiper,
    swiperSlide
  },

  props: {
    driverBreakdown: {
      required: true,
      type: [Array, Object]
    }
  },

  data () {
    return {
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 300000,
          disableOnInteraction: true
        },
        breakpoints: {
          1800: {
            slidesPerView: 6,
            spaceBetween: 20
          },
          1264: {
            slidesPerView: 6,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 'auto',
            spaceBetween: 10,
            centeredSlides: true
          }
        }
      }
      // driverBreakdown: [{
      //   driver: 'CareerOpportunities', average: 3.8, disengaged_employees: 15, sub_drivers: { 'Growth Path': 4.2, GrowthPath: 3.6, LearningAndDevelopment: 3.6 },
      // }, {
      //   driver: 'Culture',
      //   average: 3.3,
      //   disengaged_employees: 82,
      //   sub_drivers: {
      //     Collaboration: 4, Onboarding: 3.8, Relationships: 3.8, WorkEnvironment: 3.2, environment: 5, peerRelationship: 1,
      //   },
      // }, {
      //   driver: 'Leadership', average: 3.8, disengaged_employees: 19, sub_drivers: { Communication: 3, ManagerialSupport: 3.7, Vision: 4.3 },
      // }, {
      //   driver: 'Mood', average: 5, disengaged_employees: 0, sub_drivers: { mood: 5 },
      // }, {
      //   driver: 'PerformanceManagement', average: 3.6, disengaged_employees: 20, sub_drivers: { ContinuousDialogue: 3.3, FairnessAndTransparency: 3.8, GoalSetting: 3.9 },
      // }, {
      //   driver: 'RewardsAndRecognition', average: 4.6, disengaged_employees: 8, sub_drivers: { Recognition: 3.2, Rewards: 4.2, recognition: 5 },
      // },
      // ],
    };
  },
  methods: {
    getColor (score) {
      let color = '';
      if (score <= 3) {
        color = '#f44336';
      } else if (score <= 4) {
        color = '#ff9800';
      } else if (score <= 5) {
        color = '#37b99c';
      }
      return color;
    }
  }
};
</script>

<style lang="scss" scoped>
.driver-layout {
  margin: 15px 0%;
}
.driver-sunburst-card {
  height: 550px!important;
  position: relative!important;
  overflow-y: hidden!important;
  top: -10px!important;
}
.driver-slide {
  .driver-title {
    // height: 30px!important;
    padding: 10px;
    height: 40px;
    letter-spacing: 0.8px;
    word-spacing: 2px;
    border-bottom: 1px solid #432d6f;
    // background-color: #9a68fd;
    // background-color: #432d6f;
    background-color: var(--primary-dark);
    color: #ffffff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .driver-sub {
    // background: #8700d0;
    // background: #512b66;
    background-color: var(--bg);
    color: #000;
  }
  .caption {
    color:rgba(0,0,0,0.5) !important;
    padding: 10px;
  }
  .subdriver-tile {
    // margin: 0 -16px;
    .v-list__tile {
      font-size: 12px !important;
      height: 40px !important;
      padding: 0px 10px !important;
    }
  }
  .v-list {
    height: 20em;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .overflow-wrap {
    .v-list__tile__title {
      height: auto!important;
      white-space: unset!important;
      overflow: inherit!important;
      overflow-wrap: break-word!important;
      word-wrap: break-word!important;
      hyphens: auto!important;
    }
    .sub-driver-title {
      font-size: 13px;
      line-height: 1.3rem;
    }
    .driver-score {
      font-size: 12px;
      font-weight: 500;
      position: relative;
      top: -5px;
    }
  }
  .footer {
    display: grid;
    grid-template-columns: 1fr;
    align-self: center;
    margin: 0 16px;
  }
}

@media only screen and (max-width: 1800px) {
  .driver-score {
    max-width: 20%;
    position: relative;
    top: -5px;
    font-size: 12px;
    font-weight: 500;
    // display: inline-flex;
  }
}
@media only screen and (max-width: 1500px) {
  .driver-score {
    max-width: 14%;
    position: relative;
    top: -5px;
    font-size: 12px;
    font-weight: 500;
    // display: inline-flex;
  }
}

.driver-slide {
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: 0 0 5px -5px grey;
    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #efebeb;
  }
}
.driver-card {
  // box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  border: 1px solid #efebeb;
  .heading-avg {
    font-size: 10px !important;
    .sub-wrap {
      padding: 10px;
      .avg-title {
        margin-bottom: 4px;
      }
      .value {
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 1px;
        padding-left: 10px;
      }
    }
  }
  .heading-driver {
    font-size: 14px !important;
    font-weight: 500;
  }
}

</style>
