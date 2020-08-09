<template>
  <v-layout>
    <v-flex xs12 class="detail-cards" :id="data.id">
      <div v-if="initialLoading">
        <ContentLoader
          :height="70"
          :width="400"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="0" y="0" rx="2" ry="2" width="394.46" height="17.93" />
          <rect x="0" y="25" rx="2" ry="2" width="394.46" height="17.93" />
          <rect x="0" y="50" rx="2" ry="2" width="394.46" height="17.93" />
          <!-- <rect x="0" y="75" rx="2" ry="2" width="394.46" height="17.93" />
          <rect x="0" y="100" rx="2" ry="2" width="394.46" height="17.93" />
          <rect x="0" y="125" rx="2" ry="2" width="394.46" height="17.93" />
          <rect x="0" y="150" rx="2" ry="2" width="394.46" height="17.93" /> -->
        </ContentLoader>
      </div>
      <div v-if="!initialLoading" class="root-QkPFX">
        <div class="container-OWvmz">
          <div class="left-26Ldc">
            <div class="iconContainer-2MeWz">
              <div class="icon-3NJqh">
                <img src="https://cdn-app.peakon.com/apps/9c69b2106e8e4591cdaf2e0c3d83c9f9.svg">
              </div>
            </div>
            <div>
              <div class="headline-30cHB"><span>{{data.title}}</span></div>
              <div class="range-1KVMZ">
                <div class="root-1NH1W">
                    <div v-html="data.sub"></div>
                </div>
              </div>
              <div class="summary-3WdmL"><span>{{data.desc}}</span></div>
              <div>
                <button
                  class="peak-btn peak-btn-primary peak-btn-small"
                  tabindex="0"
                  aria-disabled="false"
                  @click="onView(data.id)"
                >
                  View report
                </button>
              </div>
            </div>
          </div>
          <div class="right-3NnIh">
            <div class="rightTop-MkCrM">
              <div class="benchmark-2aQ2U">
                <div class="rightHeader-1gKU_">
                  <div class="rightHeaderIcon-D4hI9">
                    <svg width="24" height="24">
                      <path
                        d="M11.164 8.224l-1.73 3.024a.5.5 0 11-.868-.496l2.002-3.5a.5.5 0 01.721-.162l4.57 3.2 3.22-5.058a.5.5 0 11.843.536l-3.5 5.5a.5.5 0 01-.709.142l-4.549-3.186zm-5.73 10.524a.5.5 0 11-.868-.496l2-3.5a.5.5 0 11.868.496l-2 3.5zM7.34 13H4.5a.5.5 0 010-1h3a.5.5 0 01.29.093l6.656 4.754 4.7-4.7a.5.5 0 01.708.707l-5 5a.5.5 0 01-.645.053L7.34 13z"
                        fill="#111"
                      ></path>
                    </svg>
                  </div>
                  <div class="rightHeaderText-3QAP5">Avg. Engagement</div>
                </div>
                <div class="rightContent-1quOS">
                  <div class="root-1ZrjO small-1dQfH positive-1JNyI">
                    <div class="score-3eag5">
                      <div class="root-kZ8J_ static-24kmv" style="font-size: 27px;">
                        <span class="score-2Z_IE" style="font-size: 27px;">
                          {{Number.parseFloat(data.average).toFixed(1)}}
                        </span>
                      </div>
                    </div>
                    <div class="container-A8OY-">
                    <!-- <div class="label-2HCys"><strong>0.1</strong> above
                    </div> -->
                    <div>
                      <div class="root-2pysp small-1_LPH">
                        <div class="label-2_vVU">
                          <!-- <div>True Benchmark®</div> -->
                          <!-- <div class="badge-2Vbr1"><span class="badge-LGq1o">7.4</span>
                          </div> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rightBottom-1e9Jt">
            <div class="rightBottomContainer-kSlaE">
              <div>
                <div class="rightHeader-1gKU_">
                  <div class="rightHeaderIcon-D4hI9">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        fill="#111"
                        d="M9.5 12a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm0-1a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm7 0a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0-1a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15 18.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5 5.5 5.5 0 0111 0zM9.5 14a4.5 4.5 0 00-4.473 4h8.946A4.5 4.5 0 009.5 14zm9.5 1.5a2.5 2.5 0 00-3.882-2.084.5.5 0 11-.554-.832A3.5 3.5 0 0120 15.5v1a.5.5 0 01-.5.5h-3a.5.5 0 110-1H19v-.5z"
                      >
                      </path>
                    </svg>
                  </div>
                  <div class="rightHeaderText-3QAP5" style="margin-top: -4px;">
                    Disengaged Employees
                  </div>
                </div>
                <div class="rightContent-1quOS"><span>{{data.disengaged}}</span></div>
              </div>
            </div>
            <div class="rightBottomContainer-kSlaE">
              <div>
                <div class="rightHeader-1gKU_">
                  <div class="rightHeaderIcon-D4hI9">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        d="M5.5 5a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-4zm0-1h4A1.5 1.5 0 0111 5.5v4A1.5 1.5 0 019.5 11h-4A1.5 1.5 0 014 9.5v-4A1.5 1.5 0 015.5 4zm9 1a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-4zm0-1h4A1.5 1.5 0 0120 5.5v4a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 0113 9.5v-4A1.5 1.5 0 0114.5 4zm-9 10a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-4zm0-1h4a1.5 1.5 0 011.5 1.5v4A1.5 1.5 0 019.5 20h-4A1.5 1.5 0 014 18.5v-4A1.5 1.5 0 015.5 13zm9 1a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-4zm0-1h4a1.5 1.5 0 011.5 1.5v4a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5v-4a1.5 1.5 0 011.5-1.5z">
                      </path>
                    </svg>
                  </div>
                  <div class="rightHeaderText-3QAP5">Participants</div>
                  </div>
                  <div class="rightContent-1quOS" style="margin-top: 8px;">
                    <span>{{data.participants}}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'phasesCard',

  components: {
    ContentLoader
  },

  props: {
    data: {
      required: true,
      type: Object,
      default: () => {}
    },
    initialLoading: {
      required: true,
      type: Boolean
    }
  },
  methods: {
    onView (id) {
      this.$emit('onViewReport', id);
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-cards {
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
    0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
}
.root-QkPFX {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e7e8e7;
    height: 100%;
    min-height: 230px;
    width: 100%;
    .container-OWvmz {
      display: flex;
      justify-content: space-between;
      height: inherit;
      .left-26Ldc {
          width: calc(100% - 326px);
          display: flex;
          padding: 20px;
          .iconContainer-2MeWz {
              margin: 0 20px 0 0;
              .icon-3NJqh {
                justify-content: center;
                display: flex;
                width: 64px;
                height: 64px;
                background-color: #fff;
                border: 1px solid rgba(0,0,0,.05);
                border-radius: 50%;
            }
          }
          .headline-30cHB {
              font-size: 24px;
              color: #2c2f37;
          }
          .range-1KVMZ {
              margin: 5px 0 0;
          }
          .summary-3WdmL {
              margin: 20px 0;
              font-size: 14px;
              color: #4a4a4a;
          }
          .peak-btn.peak-btn-primary {
              background-color: #4c3e9d;
          }
          .peak-btn.peak-btn-small {
              font-size: 11px;
              line-height: 30px;
              min-width: 40px;
              padding: 0 1.6em;
          }
          .peak-btn {
              -webkit-appearance: none;
              border: 1px solid rgba(0,0,0,.03);
              border-radius: 2px;
              box-shadow: 0 1px 2px 0 rgba(0,0,0,.11), inset 0 -1px 1px 0 rgba(0,0,0,.09);
              color: #fff;
              cursor: pointer;
              display: inline-block;
              margin: 0;
              overflow: visible;
              text-align: center;
              text-decoration: none;
              transition: all .2s ease;
              user-select: none;
              vertical-align: middle;
              white-space: nowrap;
          }
      }
      .right-3NnIh {
          width: 326px;
          border-left: 1px solid #e6e8eb;
          .rightTop-MkCrM {
              padding: 30px;
              height: 50%;
              border-bottom: 1px solid #e6e8eb;
              .rightHeader-1gKU_ {
                  display: flex;
                  .rightHeaderIcon-D4hI9 {
                      height: 24px;
                      width: 24px;
                      vertical-align: middle;
                      display: inline-block;
                      margin-left: -3px;
                  }
                  .rightHeaderText-3QAP5 {
                      font-size: 11px;
                      color: #9b9b9b;
                      text-transform: uppercase;
                      margin: 4px;
                  }
              }
              .root-1ZrjO.small-1dQfH {
                  display: flex;
                  height: 38px;
                  .score-3eag5 {
                      color: #2c2f37;
                      display: flex;
                      flex-direction: column;
                      font-size: 27px;
                      font-weight: 600;
                      font-weight: 400;
                      justify-content: center;
                      line-height: 1;
                      .static-24kmv {
                          height: auto;
                          width: auto;
                          font-size: 27px;
                      }
                  }
                  .container-A8OY- {
                      display: flex;
                      align-items: flex-end;
                      height: 100%;
                      margin-top: -5px;
                      .label-2HCys {
                          margin: 0 3px 0 5px;
                          font-size: 12px;
                          color: #4c3e9d;
                      }
                      .label-2_vVU, .toggler-2GB1U {
                          color: #29434b;
                          font-size: 12px;
                          display: inline-flex !important;
                          .badge-2Vbr1 {
                              margin-left: 3px;
                              .badge-LGq1o {
                                font-size: 11px;
                                background-color: rgba(252,198,88,.3);
                                color: #f79c00;
                                font-size: 9px;
                                min-width: 26px;
                                padding: 2px;
                                text-align: center;
                            }
                          }
                      }
                  }
              }
          }
          .rightBottom-1e9Jt {
              height: 50%;
              display: flex;
              justify-content: space-between;
              .rightBottomContainer-kSlaE {
                  width: 50%;
                  border-left: 1px solid #e6e8eb;
                  padding: 30px;
                  .rightHeader-1gKU_ {
                      display: flex;
                      .rightHeaderIcon-D4hI9 {
                          height: 24px;
                          width: 24px;
                          vertical-align: middle;
                          display: inline-block;
                          margin-left: -3px;
                      }
                      .rightHeaderText-3QAP5 {
                          font-size: 11px;
                          color: #9b9b9b;
                          text-transform: uppercase;
                          margin: 4px;
                      }
                  }
                  .rightContent-1quOS {
                    text-align: center;
                    font-size: 20px;
                }
              }
          }
      }
    }
}
</style>
