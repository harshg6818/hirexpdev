<template>
<div>
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
  <div
    class="question-wise-wrap"
    v-for="(q,key) in questionWiseAnalysis"
    :key="key"
  >
    <v-layout v-if="!initialLoading">
      <v-flex xs12>
        <div class="questionResult-2VYhX driverResultCard-3abeD">
          <div id="category-527014" class="driver-1_qxF">
            <div class="container-2tZTo medium-2W9AO">
              <div class="iconWrapper-2NSNC">
                <svg width="23" height="23" viewBox="0 0 23 23" class="icon-2kZza undefined">
                  <g fill="none" fill-rule="evenodd"><circle cx="11.5" cy="11.5" r="11.5" fill="#E2D3EF"></circle>
                    <path fill="#644483" d="M11.5 12.778a1.28 1.28 0 01-1.277-1.278 1.28 1.28 0 011.278-1.278 1.28 1.28 0 011.278 1.278 1.28 1.28 0 01-1.278 1.278z"></path>
                    <path fill="#9A89BB" fill-rule="nonzero" d="M11.5 17.889c-1.445 0-2.98-2.24-2.98-6.39 0-4.149 1.535-6.388 2.98-6.388 1.446 0 2.982 2.24 2.982 6.389 0 4.15-1.536 6.389-2.981 6.389zm0-11.926c-1.007 0-2.129 2.274-2.129 5.537s1.122 5.537 2.13 5.537c1.007 0 2.13-2.274 2.13-5.537s-1.123-5.537-2.13-5.537z"></path>
                    <path fill="#9A89BB" fill-rule="nonzero" d="M5.967 8.306c.722-1.251 3.43-1.462 7.023.613 3.594 2.075 4.765 4.524 4.043 5.776-.723 1.252-3.43 1.463-7.024-.612S5.244 9.558 5.967 8.306zm10.328 5.963c.504-.872-.905-2.981-3.73-4.613-2.826-1.631-5.357-1.796-5.86-.924-.504.873.904 2.982 3.73 4.613 2.826 1.631 5.356 1.797 5.86.924z"></path>
                    <path fill="#9A89BB" fill-rule="nonzero" d="M5.968 14.695c-.723-1.252.448-3.702 4.042-5.776 3.593-2.075 6.3-1.865 7.023-.613.723 1.252-.448 3.702-4.042 5.777-3.594 2.074-6.3 1.864-7.023.612zm10.328-5.963c-.504-.872-3.035-.707-5.86.924-2.826 1.632-4.234 3.74-3.73 4.613.503.872 3.034.707 5.86-.924 2.825-1.632 4.233-3.74 3.73-4.613z"></path>
                  </g>
                </svg>
              </div>
              <div class="toggler-3TeZz no-border-3-nDS" style="display: inline;">
                <div class="label-14QOT with-tooltip-XqJFP">
                  <span class="driver-1ZGnM">
                    <!-- Leadership -->
                    {{key.match(/[A-Z][a-z]+/g).join(' ')}}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <a class="question-njd4M" href="">
            <div class="questionContent-8ASx0">
              <div class="questionText-27cQ4">
              </div>
              <div class="questionScore-1ieJH">
                <div class="root-kZ8J_ static-24kmv">
                  <span aria-label="Score 7.5" class="score-2Z_IE" style="font-size: 12px;">
                    Disengaged
                  </span>
                </div>
              </div>
              <div class="questionScore-1ieJH">
                <div class="root-kZ8J_ static-24kmv">
                  <span aria-label="Score 7.5" class="score-2Z_IE" style="font-size: 12px;">
                    Passively engaged
                  </span>
                </div>
              </div>
              <div class="questionScore-1ieJH">
                <div class="root-kZ8J_ static-24kmv">
                  <span aria-label="Score 7.5" class="score-2Z_IE" style="font-size: 12px;">
                    Highly engaged
                  </span>
                </div>
              </div>
              <div class="questionScore-1ieJH">
                <div class="root-kZ8J_ static-24kmv">
                  <span aria-label="Score 7.5" class="score-2Z_IE" style="font-size: 12px;">
                    Engagement
                  </span>
                </div>
              </div>
            </div>
          </a>
          <div class="subdriversWrapper-2ijPb">
            <div id="category-527034" class="subdriver-29MH5" v-for="(d,k) in q" :key="k">
              <div class="subdriverName-2u25j">
                {{k.match(/[A-Z][a-z]+/g).join(' ')}}
              </div>
              <div class="subdriverQuestionsWrapper-2JmPD">
                <div v-for="(question, index) in d" :key="index">
                  <a
                    class="question-njd4M subdriverQuestion-234LB"
                    href="" v-for="(q, key) in question"
                    :key="key"
                  >
                    <div class="questionSubdriverName-35Oen">
                      {{k.match(/[A-Z][a-z]+/g).join(' ')}}
                    </div>
                    <div class="questionContent-8ASx0">
                      <div class="questionText-27cQ4">
                        <b>Q{{index+1}}&nbsp;</b>{{key}}
                      </div>
                      <div class="questionScore-1ieJH">
                        <div class="root-kZ8J_ static-24kmv" style="font-size: 18px;">
                          <span
                            v-if="q.negative_response_count"
                            class="score-2Z_IE" style="font-size: 18px;"
                          >
                            {{q.negative_response_count}}
                          </span>
                          <span v-else class="score-2Z_IE" style="font-size: 18px;">
                            -
                          </span>
                        </div>
                      </div>
                      <div class="questionScore-1ieJH">
                        <div class="root-kZ8J_ static-24kmv" style="font-size: 18px;">
                          <span v-if="q.neutral_response_count"
                            class="score-2Z_IE" style="font-size: 18px;"
                          >
                            {{q.neutral_response_count}}
                          </span>
                          <span v-else class="score-2Z_IE" style="font-size: 18px;">
                            -
                          </span>
                        </div>
                      </div>
                      <div class="questionScore-1ieJH">
                        <div class="root-kZ8J_ static-24kmv" style="font-size: 18px;">
                          <span v-if="q.positive_response_count"
                            class="score-2Z_IE" style="font-size: 18px;">
                            {{q.positive_response_count}}
                          </span>
                          <span v-else class="score-2Z_IE" style="font-size: 18px;">
                            -
                          </span>
                        </div>
                      </div>
                      <div class="questionScore-1ieJH">
                        <div class="root-kZ8J_ static-24kmv" style="font-size: 18px;">
                          <span v-if="q.driver_average"
                            class="score-2Z_IE" style="font-size: 18px;">
                            {{Number.parseFloat(q.driver_average).toFixed(1)}}
                          </span>
                          <span v-else class="score-2Z_IE" style="font-size: 18px;">
                            -
                          </span>
                        </div>
                      </div>
                      <!-- <div class="questionDetailArrow-16qTf">
                        <svg width="23" height="24" viewBox="0 0 23 24" class="questionArrow-3qN_p">
                          <path d="M10.717 16.225l3.487-3.585a1 1 0 00.032-1.36L10.75 7.338a1 1 0 10-1.498 1.324l3.487 3.943.032-1.36-3.487 3.586a1 1 0 001.434 1.394z" fill="#50BEAC" fill-rule="evenodd"></path>
                        </svg>
                      </div> -->
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <div class="question-divider"></div>
  </div>
</div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'questionAnalysis',

  components: {
    ContentLoader
  },

  props: {
    questionWiseAnalysis: {
      required: true,
      type: [Object, Array]
    },
    initialLoading: {
      required: true,
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.question-divider {
  margin: 20px 0;
}
.questionResult-2VYhX {
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
    0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  border-radius: 8px;
  border: 1px solid #e7e8e7;
  background-color: #fff;
  .driver-1_qxF {
    padding: 16px 24px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #e7e8e7;
    .container-2tZTo {
      display: inline-flex;
      align-items: center;
      font-size: 12px;
      position: relative;
      .iconWrapper-2NSNC {
        display: flex;
        margin-right: 10px;
      }
      .label-14QOT {
        align-items: center;
        display: inline-flex;
        // max-width: 150px;
        width: 100%;
        height: auto;
        line-height: 1.428571429;
        font-size: 14px;
        font-weight: 500;
      }
      .toggler-3TeZz {
        border-bottom: 1px dotted #bac1c1;
        // cursor: help;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .question-njd4M {
    padding: 8px 14px 8px 0;
    margin-left: 23px;
    text-decoration: none;
    color: #29434b;
    display: flex;
    flex-direction: column;
    .questionContent-8ASx0 {
      width: 100%;
      display: flex;
      flex-direction: row;
      .questionText-27cQ4 {
        flex: 1;
        margin-top: 2px;
      }
      .questionScore-1ieJH {
        width: 40px;
        font-weight: 500;
        margin-left: 16px;
        margin-right: 16px;
        margin-top: 2px;
        text-align: left;
        display: table;
        .root-kZ8J_ {
          height: auto;
          width: auto;
          line-height: 1.2;
          position: relative;
        }
      }
      .questionDetailArrow-16qTf {
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        .questionArrow-3qN_p {
          width: 15px;
        }
      }
    }
  }
  .subdriversWrapper-2ijPb {
    border-top: 1px solid #e7e8e7;
    margin-left: 23px;
    .subdriver-29MH5 {
      display: flex;
      .subdriverName-2u25j {
        padding-top: 10px;
        width: 120px;
        font-size: 12px;
        color: #52676d;
      }
      .subdriverQuestionsWrapper-2JmPD {
        flex: 1;
        .question-njd4M {
          padding: 8px 14px 8px 0;
          margin-left: 23px;
          text-decoration: none;
          color: #29434b;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #e7e8e7;
          &:hover {
            background-color: #f8f7f5;
            margin-left: 0;
            text-decoration: none;
            color: #29434b;
            border-left: 23px solid #f8f7f5;
          }
          .questionSubdriverName-35Oen {
            padding-top: 6px;
            padding-bottom: 3px;
            display: none;
            font-size: 13px;
            color: #52676d;
          }
          .questionContent-8ASx0 {
            width: 100%;
            display: flex;
            flex-direction: row;
            .questionText-27cQ4 {
              flex: 1;
              margin-top: 2px;
            }
            .questionScore-1ieJH {
              width: 60px;
              margin-left: 16px;
              margin-right: 16px;
              margin-top: 2px;
              text-align: center;
              .static-24kmv {
                height: auto;
                width: auto;
                line-height: 1;
                position: relative;
              }
            }
            .questionDetailArrow-16qTf {
              width: 24px;
              height: 24px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
</style>
