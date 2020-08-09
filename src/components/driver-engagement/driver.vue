<template>
  <div class="drivers-wrap">
    <driverTopBar></driverTopBar>
    <!-- <div class="drivers-container">
      <div class="drivers-container-wrap">
        <div
          class="driver-wrap"
          v-for="(driver, index) in drivers"
          :key="index"
          @click="onClickViewDriver(driver.driver)"
        >
          <div class="driver-top">
            <div class="driver-icon">
              <img src="../../assets/Culture.png" alt="">
            </div>
            <div class="driver-name">{{driver.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}}</div>
          </div>
          <div class="driver-body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Omnis aspernatur veritatis.
          </div>
          <div class="driver-footer">
            <div class="driver-average">
              <div class="score">{{driver.average}}</div>
              <div class="driver-sub">
                Average score
              </div>
            </div>
            <div class="driver-disengaged">
              <div class="score">{{driver.disengaged_employees}}</div>
              <div class="driver-sub">
                Disengaged employees
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="drivers-container">
      <div class="left-side">
        <div
          class="ac"
          v-for="(driver, index) in drivers"
          :key="index"
        >
          <div class="driver-wrap">
            <div class="driver-body">
              <div class="driver-icon">
                <img src="../../assets/Culture.png" alt="">
              </div>
              <div class="driver-title">
                {{driver.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}}
              </div>
              <div class="driver-avg">
                <div class="score">
                  {{driver.average}}
                </div>
                <div class="driver-sub">
                  Average score
                </div>
              </div>
              <div class="driver-disengaged">
                <div class="score">
                  {{driver.disengaged_employees}}
                </div>
                <div class="driver-sub">
                  Disengaged employees
                </div>
              </div>
            </div>
            <!-- <div class="driver-desc">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Aspernatur animi, commodi in odio dolorum magnam deserunt atque.
            </div> -->
          </div>
          <input class="ac-input" :id="index" :name="index" type="checkbox" />
          <label class="ac-label" :for="index">
            {{ Object.keys(driver.sub_drivers).length }} Subdrivers
          </label>
          <article class="ac-text">
            <div class="ac-sub"
              v-for="(sub, idx) in driver.sub_drivers"
              :key="idx"
            >
              <div class="sub-driver-wrap">
                <div class="driver-body">
                  <div class="driver-title">
                    {{idx.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}}
                  </div>
                  <div class="driver-avg">
                    <div class="score">
                      45
                    </div>
                    <div class="driver-sub">
                      Average score
                    </div>
                  </div>
                  <div class="driver-disengaged">
                    <div class="score">
                      23
                    </div>
                    <div class="driver-sub">
                      Disengaged employees
                    </div>
                  </div>
                </div>
              </div>
              <input class="ac-input" :id="idx" :name="idx" type="checkbox" />
              <!-- <label class="ac-sub-label" :for="idx">{{idx}}</label> -->
              <label class="ac-sub-label" :for="idx">
                View {{idx.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}} questions
              </label>
              <article class="ac-sub-text">
                <p>My younger brother was in London when the Martians fell at Woking.
                  He was a medical student working for an imminent examination, and
                  he heard nothing of the arrival until Saturday morning.  The morning
                  papers on Saturday contained, in addition to lengthy special articles
                  on the planet Mars, on life in the planets, and so forth, a brief and
                  vaguely worded telegram, all the more striking for its brevity.
                </p>
                <p>The Martians, alarmed by the approach of a crowd, had killed a number
                  of people with a quick-firing gun, so the story ran. The telegram concluded
                  with the words: "Formidable as they seem to be, the Martians have not moved
                  from the pit into which they have fallen, and, indeed, seem incapable of
                  doing so. Probably this is due to the relative strength of the earth's
                  gravitational energy."
                </p>
              </article>
            </div>
          </article>
        </div>

        <!-- <div class="ac">
          <div>harsh</div>
          <input class="ac-input" id="ac-4" name="ac-4" type="checkbox" />
          <label class="ac-label" for="ac-4">Item 2</label>
          <article class="ac-text">
            <div class="ac-sub">
              <input class="ac-input" id="ac-5" name="ac-5" type="checkbox" />
              <label class="ac-label" for="ac-5">I also love regular donuts</label>
              <article class="ac-sub-text">
                <p>But not only is the sea such a foe to man who is an alien to it,
                  but it is also a fiend to its own off-spring; worse than the Persian
                  host who murdered his own guests; sparing not the creatures which
                  itself hath spawned. Like a savage tigress that tossing in the jungle
                  overlays her own cubs, so the sea dashes even the mightiest whales
                  against the rocks, and leaves them there side by side with the split
                  wrecks of ships. No mercy, no power but its own controls it. Panting
                  and snorting like a mad battle steed that has lost its rider,
                  the masterless ocean overruns the globe.
                </p>
                <p>Consider the subtleness of the sea; how its most dreaded creatures
                  glide under water, unapparent for the most part, and treacherously
                  hidden beneath the loveliest tints of azure. Consider also the devilish
                  brilliance and beauty of many of its most remorseless tribes, as the dainty
                  embellished shape of many species of sharks. Consider, once more, the
                  universal cannibalism of the sea; all whose creatures prey upon each other,
                  carrying on eternal war since the world began.
                </p>
              </article>
            </div>
            <div class="ac-sub">
              <input class="ac-input" id="ac-6" name="ac-6" type="checkbox" />
              <label class="ac-label" for="ac-6">They are also delicious</label>
              <article class="ac-sub-text">
                <p>My younger brother was in London when the Martians fell at Woking.
                  He was a medical student working for an imminent examination, and
                  he heard nothing of the arrival until Saturday morning.  The morning
                  papers on Saturday contained, in addition to lengthy special articles
                  on the planet Mars, on life in the planets, and so forth, a brief and
                  vaguely worded telegram, all the more striking for its brevity.
                </p>
                <p>The Martians, alarmed by the approach of a crowd, had killed a number
                  of people with a quick-firing gun, so the story ran. The telegram concluded
                  with the words: "Formidable as they seem to be, the Martians have not moved
                  from the pit into which they have fallen, and, indeed, seem incapable of doing so.
                  Probably this is due to the relative strength of the earth's gravitational energy."
                  On that last text their leader-writer expanded very comfortingly.
                </p>
              </article>
            </div>
          </article>
        </div> -->
      </div>
      <div class="right-side">
        <div class="great-wrap">
          <div class="great-title">
            You're doing great with
          </div>
          <div class="great-body">
            <ul>
              <li>the driver Recognition strongly influences the engagement levels.</li>
              <li>the driver Recognition strongly influences the engagement levels.</li>
              <li>the driver Recognition strongly influences the engagement levels.</li>
              <li>the driver Recognition strongly influences the engagement levels.</li>
              <li>the driver Recognition strongly influences the engagement levels.</li>
            </ul>
          </div>
        </div>
        <div class="loss-wrap">
          <div class="loss-title">
            Improve Your Focus On
          </div>
          <div class="loss-body">
            <ul>
              <li>the driver Culture strongly influences the engagement levels.</li>
              <li>the driver Culture strongly influences the engagement levels.</li>
              <li>the driver Culture strongly influences the engagement levels.</li>
              <li>the driver Culture strongly influences the engagement levels.</li>
              <li>the driver Culture strongly influences the engagement levels.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DriverTopBar from './driver-top-bar';

export default {
  name: 'Driver',

  components: {
    DriverTopBar
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
    }
  }
};
</script>

<style lang="scss" scoped>
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
