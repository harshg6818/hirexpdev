<template>
  <div>
    <div class="mt-2">
      <v-row class="mx-2">
        <v-col class="pb-0">
          <div class="drivers-title">Driver Engagement Framework</div>
        </v-col>
        <v-col class="text-right pb-0">
          <v-btn class="box-container zoom-in mx-2" color="primary">
            Snapshot
          </v-btn>
          <v-btn class="box-container zoom-in mx-2">
            Analytics
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <driver-cards
      :active-card="activeDriverView"
      @onClickDriver="onClickDriverCard"
    ></driver-cards>

    <driver-stats></driver-stats>

    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <driver-overtime-graph></driver-overtime-graph>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <driver-by-subdriver
              :active-card="activeDriverView"
            ></driver-by-subdriver>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import DriverTopBar from './driver-top-bar';
import DriverCards from './snapshot/driver-cards';
import DriverStats from './snapshot/driver-stats';
import DriverOvertimeGraph from './snapshot/driver-overtime-graph';
import DriverBySubdriver from './snapshot/driver-by-subdriver';

export default {
  name: 'Driver',

  components: {
    // DriverTopBar,
    DriverCards,
    DriverStats,
    DriverOvertimeGraph,
    DriverBySubdriver
  },

  data () {
    return {
      activeDriverView: 'CareerOpportunities',
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
        driver: 'Mood', average: 5, disengaged_employees: 0, sub_drivers: { mood: 5 }
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
    onClickViewDriver (driver) {
      this.$router.push({ path: `/drivers/v/${driver}` });
      // this.$router.push({ path: `/drivers/${driver}` });
    },
    onClickDriverCard (driver) {
      this.activeDriverView = driver;
    }
  }
};
</script>

<style lang="scss" scoped>
.drivers-title {
  font-weight: var(--heading-weight);
  color: var(--color-text);
  font-size: var(--heading-size);
}
.drivers-wrap {
  background-color: var(--bg-panel);
  // height: 100vh;
  height: calc(100vh - 60px);
  min-height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
  overflow: hidden;
  .drivers-container {
    height: 85vh;
    overflow-y: auto;
    padding: 1rem;
    display: grid;
    // grid-template-columns: 2fr 3fr;
    grid-template-columns: 4fr 2fr;
    .left-side {
      .ac {
        margin: 1rem;
        box-shadow: 20px 3px 20px #0000000b;
        .driver-wrap {
          display: grid;
          background-color: var(--bg);
          // border: 1px solid var(--color-palceholder);
          // border-bottom: 0;
          border-radius: 0.375rem;
          border-bottom-left-radius: 0.375;
          border-bottom-right-radius: 0.375;
          padding: .5rem 1rem;
          .driver-body {
            display: grid;
            grid-template-columns: 1fr 10fr 4fr 4fr;
            align-items: center;
            .driver-icon {
              height: 35px;
              width: 35px;
              img {
                height: 100%;
                width: 100%;
              }
            }
            .driver-title {
              color: var(--color-text);
              font-size: var(--heading-size);
              font-weight: var(--heading-weight);
            }
            .driver-avg, .driver-disengaged {
              display: grid;
              justify-items: center;
              .score {
                font-size: 20px;
                color: var(--color-text);
                font-weight: var(--heading-weight);
              }
              .driver-sub {
                color: var(--color-palceholder);
              }
            }
          }
        }
        .sub-driver-wrap {
          display: grid;
          background-color: var(--bg);
          // border: 1px solid var(--color-palceholder);
          // border-bottom: 0;
          padding: .5rem 1rem;
          .driver-body {
            display: grid;
            grid-template-columns: 11fr 4fr 4fr;
            align-items: center;
            .driver-title {
              padding-left: 1rem;
              color: var(--color-text);
              font-size: var(--heading-size);
              font-weight: var(--heading-weight);
            }
            .driver-avg, .driver-disengaged {
              display: grid;
              justify-items: center;
              .score {
                font-size: 20px;
                color: var(--color-text);
                font-weight: var(--heading-weight);
              }
              .driver-sub {
                color: var(--color-palceholder);
              }
            }
          }
        }
      }
    }
    .right-side {
      margin: 1rem;
      .great-wrap {
        padding: 1rem;
        border-radius: 0.375rem;
        background-color: var(--bg);
        .great-title {
          padding-left: 1.5rem;
          color: var(--color-text);
          font-size: var(--heading-size);
          font-weight: var(--heading-weight);
        }
        .great-body {
          ul {
            list-style: none; /* Remove default bullets */
            li {
              padding: 0.25rem 0;
              font-size: var(--content-size);
              &::before {
                content: "\2022";
                color: green;
                font-weight: bold;
                display: inline-block;
                width: 1.2rem;
                margin-left: -1rem;
                font-size: 28px;
                line-height: 1;
                position: relative;
                top: 6px;
              }
            }
          }
        }
      }
      .loss-wrap {
        margin-top: 2rem;
        padding: 1rem;
        border-radius: 0.375rem;
        background-color: var(--bg);
        .loss-title {
          padding-left: 1.5rem;
          color: var(--color-text);
          font-size: var(--heading-size);
          font-weight: var(--heading-weight);
        }
        .loss-body {
          ul {
            list-style: none;
            li {
              padding: 0.25rem 0;
              font-size: var(--content-size);
              &::before {
                content: "\2022";
                color: red;
                font-weight: bold;
                display: inline-block;
                width: 1.2rem;
                margin-left: -1rem;
                font-size: 28px;
                line-height: 1;
                position: relative;
                top: 6px;
              }
            }
          }
        }
      }
    }
    // .drivers-container-wrap {
    //   padding: 0 10% 5% 10%;
    //   display: grid;
    //   grid-template-columns: repeat(3, 1fr);
    //   grid-gap: 20px;
    //   grid-auto-rows: 250px;
    //   .driver-wrap {
    //     display: grid;
    //     padding: 0 24px;
    //     background-color: var(--bg);
    //     .driver-top {
    //       display: grid;
    //       grid-template-columns: 1fr 5fr;
    //       align-items: center;
    //       .driver-icon {
    //         // filter: grayscale(100%);
    //         height: 50px;
    //         width: 50px;
    //         img {
    //           height: 100%;
    //           width: 100%;
    //         }
    //       }
    //       .driver-name {
    //         color: var(--color-text);
    //         font-size: var(--heading-size);
    //         font-weight: var(--heading-weight);
    //       }
    //     }
    //     .driver-body {
    //       display: grid;
    //       grid-template-columns: 1fr;
    //       color: var(--color-palceholder);
    //       font-size: var(--content-size);
    //       font-weight: var(--text-weight);
    //     }
    //     .driver-footer {
    //       // display: grid;
    //       display: flex;
    //       justify-content: space-between;
    //       height: 50px;
    //       // grid-template-columns: 1fr 1fr;
    //       .driver-average {
    //         display: grid;
    //         justify-items: center;
    //         .score {
    //           font-size: 24px;
    //           color: var(--color-text);
//              font-weight: var(--heading-weight);
    //         }
    //         .driver-sub {
    //           color: var(--color-palceholder);
    //         }
    //       }
    //       .driver-disengaged {
    //         display: grid;
    //         .score {
    //           font-size: 24px;
    //           color: var(--color-text);
    //           // font-weight: var(--heading-weight);
    //         }
    //         .driver-sub {
    //           color: var(--color-palceholder);
    //         }
    //         justify-items: center;
    //       }
    //     }
    //     &:hover {
    //       cursor: pointer;
    //       // background-color: #f8f7f5;
    //       // text-decoration: none;
    //     }
    //   }
    // }

    .ac-label {
      position: relative;
      // padding: .5rem 1rem;
      padding: .5rem 0 .5rem 3rem;
      display: block;
      cursor: pointer;
      background-color: var(--bg);
      color: var(--color-palceholder);
      // border: 1px solid var(--color-palceholder);
      // border-top: 0;
      border-radius: 0.375rem;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-top: 1px solid var(--color-palceholder);
      transition: background-color .15s ease-in-out;
    }
    .ac-input:checked + label, .ac-label:hover {
      // background-color: var(--bg-panel);
      background-color: var(--bg);
    }
    .ac-label:after, .ac-input:checked + .ac-label:after {
      content: "+";
      position: absolute;
      display: block;
      // right: 0;
      left: 10px;
      top: 0;
      width: 2em;
      height: 100%;
      line-height: 2.25em;
      text-align: center;
      // background-color: #e5e5e5;
      // background-color: var(--bg);
      background: none;
      transition: background-color .15s ease-in-out;
    }
    .ac-sub-label:after, .ac-input:checked + .ac-sub-label:after {
      content: "+";
      position: absolute;
      display: block;
      right: 0;
      top: 0;
      width: 2em;
      height: 100%;
      line-height: 2.25em;
      text-align: center;
      // background-color: #e5e5e5;
      // background-color: var(--bg);
      background: none;
      transition: background-color .15s ease-in-out;
    }
    .ac-label:hover:after, .ac-input:checked + .ac-label:after {
      // background-color: #b5b5b5;
      // background-color: var(--bg-panel);
      background: none;
    }
    .ac-input:checked + .ac-label:after {
      content: "-";
      background: none;
    }
    .ac-input:checked + .ac-sub-label:after {
      content: "-";
      background: none;
    }
    .ac-input {
      display: none;
    }
    // the magic
    .ac-text, .ac-sub-text {
      opacity: 0;
      height: 0;
      // margin-bottom: .5em;
      transition: opacity .5s ease-in-out;
      overflow: hidden;
    }
    .ac-input:checked ~ .ac-text, .ac-sub .ac-input:checked ~ .ac-sub-text {
      opacity: 1;
      height: auto;
    }
    // sub-level
    .ac-sub {
      background-color: var(--bg);

      .ac-sub-label {
        position: relative;
        padding: .5rem 1rem;
        display: block;
        cursor: pointer;
        background-color: var(--bg);
        color: var(--color-palceholder);
        // border: 1px solid var(--color-palceholder);
        border-top: 0;
        transition: background-color .15s ease-in-out;
      }
    }
    .ac-sub .ac-sub-label {
      background: none;
      // font-weight: 600;
      padding: .5rem 0 .5rem 3.5rem;
      margin-bottom: 0;
      margin-top: -10px;
    }
    .ac-sub .ac-sub-label:checked {
      background: none;
      border-bottom: 1px solid whitesmoke;
    }
    .ac-sub .ac-sub-label:after, .ac-sub .ac-input:checked + .ac-sub-label:after {
      // left: 0;
      left: 20px;
      background: none;
    }
    .ac-sub .ac-input:checked + label, .ac-sub .ac-sub-label:hover {
      background: none;
    }
    .ac-sub-text {
      padding: 0 1em 0 2em;
    }
  }
}
</style>
