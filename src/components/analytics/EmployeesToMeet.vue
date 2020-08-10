<template>
  <div class="employeeToMeet" ref="disengagedTab">
    <div class="mt-3" v-show="config.initialLoading">
      <ContentLoader
        :height="30"
        :width="200"
        :speed="2"
        primaryColor="#e9e7e7"
        secondaryColor="#fff"
        >
        <rect x="0" y="0" rx="1" ry="1" width="46" height="28" />
        <rect x="50" y="0" rx="1" ry="1" width="46" height="28" />
        <rect x="100" y="0" rx="1" ry="1" width="46" height="28" />
        <rect x="150" y="0" rx="1" ry="1" width="46" height="28" />
      </ContentLoader>

      <ContentLoader
        class="bg-white"
        :height="100"
        :width="110"
        :speed="2"
        primaryColor="#e9e7e7"
        secondaryColor="#fff"
        >
        <rect x="2" y="7"  rx="1" ry="1" width="106" height="5.93" />
        <rect x="2" y="14" rx="1" ry="1" width="106" height="5.93" />
        <rect x="2" y="21" rx="1" ry="1" width="106" height="5.93" />
        <rect x="2" y="28" rx="1" ry="1" width="106" height="5.93" />
        <rect x="2" y="35" rx="1" ry="1" width="106" height="5.93" />
        <rect x="2" y="42" rx="1" ry="1" width="106" height="5.93" />
        <rect x="2" y="49" rx="1" ry="1" width="106" height="5.93" />
        <rect x="2" y="56" rx="1" ry="1" width="106" height="5.93" />
        <rect x="2" y="63" rx="1" ry="1" width="106" height="5.93" />
        <rect x="2" y="70" rx="1" ry="1" width="106" height="5.93" />
        <rect x="2" y="77" rx="1" ry="1" width="106" height="5.93" />
        <rect x="2" y="84" rx="1" ry="1" width="106" height="5.93" />
        <rect x="2" y="91" rx="1" ry="1" width="106" height="5.93" />
      </ContentLoader>
    </div>

    <!-- After intial loading -->
    <div v-show="!config.initialLoading">

      <!-- <v-btn style="right: 0;
            position: absolute;
            float: right;
            z-index: 100 !important; color:grey;"
            class="text-capitalize"
            flat
            data-html2canvas-ignore
            v-if="tabs.active === 'tab-snapshot-list'"
            @click="download"
          >
            <v-icon small class="ml-2">fas fa-cloud-download-alt</v-icon>
              &nbsp; Download
          </v-btn>
          <div id="pdf"></div>
          <div id="pdf1"></div> -->
      <v-tabs
        id="employee-list-tab"
        ref="tabs"
        class="custom-dashboard-tabs"
        :class="tabs.active === 'tab-disengaged-list' ? 'disengaged-list-active' : ''"
        grow
        v-model="tabs.active"
        centered
        color="transparent"
        slider-color="primary"
      >
        <v-tab
          class="mr-2 text-capitalize"
          v-for="(t, ti) in tabs.list"
          :key="ti"
          :href="`#tab-${t.value}`"
          @click="addRef(t.value)"
        >
          <span v-if="ti === 0"> </span>
          {{t.title}}
          <strong class="ml-2" v-if="t.count">
            {{t.count ? '('+t.count+')' : ''}}
          </strong>
          <v-tooltip max-width="200" bottom v-show="t.about" class="ml-2">
            <v-icon
            slot="activator"
            >fas fa-info-circle</v-icon>
            {{t.about}}
          </v-tooltip>
        </v-tab>

        <v-tabs-items v-model="tabs.active" class="background-custom-grey" :class="{
          '': tabs.active !== 'tab-disengaged-list',
          }">
          <v-tab-item class="employeeToMeet" value="tab-snapshot-list" v-if="tabs.active === 'tab-snapshot-list'">
            <!-- Stats and Analysis -->
            <div class="mb-2 d-flex flex-row flex-wrap" v-show="stackedGraphs">
              <v-flex sm6 md3 class="disengaged-employees-cards">
                <v-card class="elevation-0">
                  <p class="py-3 score-card text-xs-center mb-0 text-capitalize heading">
                    Employee cases identified
                    <v-tooltip max-width="200" bottom class="ml-2">
                      <!-- <v-icon
                      slot="activator"
                      >fas fa-info-circle</v-icon> -->
                        Employees whose engagement score is less than or equal to 2.5 are High-risk employees.
                        Employees whose engagement score is  greater than 2.5 and less than or equal to 3 are Medium risk employees.
                    </v-tooltip>
                  </p>

                  <div v-show="overall_disengaged_stats && overall_disengaged_stats.disengaged_employees">
                    <p class="text-xs-center" style="font-weight:300;font-size:36px" v-if="overall_disengaged_stats && overall_disengaged_stats.disengaged_employees > 0">
                      {{overall_disengaged_stats.disengaged_employees}}
                    </p>
                    <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                          <v-flex text-xs-center>
                            <strong v-show=" overall_disengaged_stats && overall_disengaged_stats.disengaged_employees == 0" class="body-2 font-weight-bold grey--text">
                              <p style="text-align:center; margin:0; font-size:20px;"> Yay! </p>
                              <p style="text-align:center; margin:0;"> You don’t have any disengaged employee </p>
                            </strong>
                          </v-flex>
                      </div>

                    <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-xs-center" v-if="overall_disengaged_stats && overall_disengaged_stats.employees_reached">
                      {{overall_disengaged_stats.disengaged_percentage}}% of {{overall_disengaged_stats.employees_reached}} employees spoken to are disengaged
                    </p>
                    <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-xs-center" v-else>
                      0% 0 employees spoken to are disengaged
                    </p>

                    <vue-anychart :id="'stackedBarChart-total'" class="stackedBarChart px-1"
                      ref="lineChart">
                    </vue-anychart>
                  </div>

                  <div style="height:170px" v-show="!overall_disengaged_stats || !overall_disengaged_stats.disengaged_employees">
                    <div class="d-flex flex-row flex-wrap justify-center align-center fill-height">
                        <v-flex class="text-center">
                          <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                      </div>
                  </div>
                </v-card>
              </v-flex>

              <!-- Issues Resolved -->
              <v-flex sm6 md3 class="disengaged-employees-cards">
                <v-card class="elevation-0">
                  <p class="py-3 score-card text-xs-center mb-0 text-capitalize heading" >
                    Employee cases resolved
                    <!--<v-tooltip max-width="200" bottom class="ml-2">
                      <v-icon
                      slot="activator"
                      >fas fa-info-circle</v-icon>
                        Employees whose engagement score is less than or equal to 2.5 are High-risk employees.
                        Employees whose engagement score is  greater than 2.5 and less than or equal to 3 are Medium risk employees.
                    </v-tooltip>-->
                  </p>

                  <div v-show="resolved_disengaged_stats && resolved_disengaged_stats.total_disengaged_employees">
                    <p class="text-xs-center" style="font-weight:300;font-size:36px" v-if="resolved_disengaged_stats && resolved_disengaged_stats.resolved_disengaged">
                      {{resolved_disengaged_stats.resolved_disengaged}}
                    </p>
                    <p class="text-xs-center" style="font-weight:300;font-size:36px" v-else> 0 </p>

                    <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-xs-center" v-if="resolved_disengaged_stats && resolved_disengaged_stats.total_disengaged_employees">
                      {{resolved_disengaged_stats.resolved_disengaged_percentage}}% of {{resolved_disengaged_stats.total_disengaged_employees}} disengaged employees
                    </p>
                    <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-xs-center" v-else>
                      0% 0 disengaged employees
                    </p>

                    <p class="px-1 pt-3 mb-0 text-xs-center mt-4 sub-heading" v-if="resolved_disengaged_stats && resolved_disengaged_stats.average_resolution_time"> Average Resolution Time </p>
                    <p class="px-1 score-card text-capitalize text-xs-center" style="font-weight:500" v-if="resolved_disengaged_stats && resolved_disengaged_stats.average_resolution_time">
                      {{ Math.round(resolved_disengaged_stats.average_resolution_time) }} days
                    </p>

                    <!--<vue-anychart :id="'stackedBarChart-resolved'" class="stackedBarChart"
                      ref="lineChart">
                    </vue-anychart>-->
                  </div>

                  <div style="height:170px" v-show="!resolved_disengaged_stats || !resolved_disengaged_stats.total_disengaged_employees">
                    <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                        <v-flex class="text-center">
                          <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                      </div>
                  </div>
                </v-card>
              </v-flex>

              <!-- Employees to meet -->
              <v-flex sm6 md3 class="disengaged-employees-cards">
                <v-card class="elevation-0">
                  <p class="py-3 score-card text-xs-center mb-0 text-capitalize heading">
                    Employee cases open
                    <!--<v-tooltip max-width="200" bottom class="ml-2">
                      <v-icon
                      slot="activator"
                      >fas fa-info-circle</v-icon>
                        Employees whose engagement score is less than or equal to 2.5 are High-risk employees.
                        Employees whose engagement score is  greater than 2.5 and less than or equal to 3 are Medium risk employees.
                    </v-tooltip>-->
                  </p>

                  <div v-show="employee_to_meet_stats && employee_to_meet_stats.total_employees_to_meet">
                    <p class="text-xs-center" style="font-weight:300;font-size:36px" v-if="employee_to_meet_stats && employee_to_meet_stats.total_employees_to_meet">
                      {{employee_to_meet_stats.total_employees_to_meet}}
                    </p>
                    <p class="text-xs-center" style="font-weight:300;font-size:36px" v-else> 0 </p>

                    <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-xs-center" v-if="employee_to_meet_stats && employee_to_meet_stats.total_disengaged_employees">
                      {{employee_to_meet_stats.total_employees_to_meet_percentage}}% of {{employee_to_meet_stats.total_disengaged_employees}} disengaged employees
                    </p>
                    <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-xs-center" v-else>
                      0% 0 disengaged employees
                    </p>

                    <vue-anychart :id="'stackedBarChart-tomeet'" class="stackedBarChart px-1"
                      ref="lineChart">
                    </vue-anychart>
                  </div>

                  <div style="height:170px" v-show="!employee_to_meet_stats || !employee_to_meet_stats.total_employees_to_meet">
                    <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                        <v-flex text-xs-center>
                          <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                      </div>
                  </div>
                </v-card>
              </v-flex>

              <!-- Exited employees -->
              <v-flex sm6 md3 class="disengaged-employees-cards">
                <v-card class="elevation-0">
                  <p class="py-3 score-card text-xs-center mb-0 text-capitalize heading" >
                    Disengaged employees who exited
                    <!--<v-tooltip max-width="200" bottom class="ml-2">
                      <v-icon
                      slot="activator"
                      >fas fa-info-circle</v-icon>

                    </v-tooltip>-->
                  </p>

                  <div v-show="disengaged_exited_employee_stats && disengaged_exited_employee_stats.total_exited_employee">
                    <p class="text-xs-center" style="font-weight:300;font-size:36px" v-if="disengaged_exited_employee_stats && disengaged_exited_employee_stats.total_exited_employee">
                      {{disengaged_exited_employee_stats.total_exited_employee}}
                    </p>
                    <p class="text-xs-center" style="font-weight:300;font-size:36px" v-else> 0 </p>

                    <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-xs-center" v-if="disengaged_exited_employee_stats && overall_disengaged_stats && overall_disengaged_stats.disengaged_employees">
                      {{disengaged_exited_employee_stats.total_exited_employees_percentage}}% of {{overall_disengaged_stats.disengaged_employees}} disengaged employees
                    </p>
                    <p style="color: rgba(0,0,0,0.7) !important" class="grey--text text-xs-center" v-else>
                      0% 0 disengaged employees
                    </p>

                    <vue-anychart :id="'stackedBarChart-exited'" class="stackedBarChart px-1"
                      ref="lineChart">
                    </vue-anychart>
                  </div>

                  <div style="height:170px" v-show="!disengaged_exited_employee_stats || !disengaged_exited_employee_stats.total_exited_employee">
                    <div class="d-flex flex-row flex-wrap align-center fill-height justify-center">
                        <v-flex text-xs-center>
                          <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                    </div>
                  </div>
                </v-card>
              </v-flex>

              <!--<div class="disengaged-employees-cards">
                <p class="pa-3 score-card" style="font-weight:bold"> HIGH POTENTIAL DISENGAGED EMPLOYEES </p>

                <vue-anychart :id="'stackedBarChart-highPotential'" class="stackedBarChart"
                  ref="lineChart">
                </vue-anychart>
              </div>-->
            </div>

            <div class="mb-2 d-flex flex-row flex-wrap" v-show="!stackedGraphs">
              <v-flex sm6 md3 class="disengaged-employees-cards">
                <v-card class="elevation-0">
                  <p class="py-3 score-card text-xs-center mb-0 text-capitalize heading">
                    Employee cases identified
                    <v-tooltip max-width="200" bottom class="ml-2">
                        Employees whose engagement score is less than or equal to 2.5 are High-risk employees.
                        Employees whose engagement score is  greater than 2.5 and less than or equal to 3 are Medium risk employees.
                    </v-tooltip>
                  </p>

                  <div style="height:170px">
                    <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                        <v-flex text-xs-center>
                          <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                    </div>
                  </div>
                </v-card>
              </v-flex>

              <!-- Issues Resolved -->
              <v-flex sm6 md3 class="disengaged-employees-cards">
                <v-card class="elevation-0">
                  <p class="py-3 score-card text-xs-center mb-0 text-capitalize heading" >
                    Employee cases resolved
                  </p>

                  <div style="height:170px">
                    <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                        <v-flex class="text-center">
                          <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                      </div>
                  </div>
                </v-card>
              </v-flex>

              <!-- Employees to meet -->
              <v-flex sm6 md3 class="disengaged-employees-cards">
                <v-card class="elevation-0">
                  <p class="py-3 score-card text-xs-center mb-0 text-capitalize heading">
                    Employee cases open
                  </p>

                  <div style="height:170px">
                    <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                        <v-flex class="text-center">
                          <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                      </div>
                  </div>
                </v-card>
              </v-flex>

              <!-- Exited employees -->
              <v-flex sm6 md3 class="disengaged-employees-cards">
                <v-card class="elevation-0">
                  <p class="py-3 score-card text-xs-center mb-0 text-capitalize heading" >
                    Disengaged employees who exited
                  </p>

                  <div style="height:170px">
                    <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                        <v-flex text-xs-center>
                          <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                    </div>
                  </div>
                </v-card>
              </v-flex>
            </div>

            <!-- Disengaged Drivers Breakdown -->
            <!-- <v-layout class="bg-white mb-0">
              <p class="text-xs-center w-100 py-3 heading">
                Top 3 drivers leading to disengagement at {{user.company_name}}
              </p>
            </v-layout>-->

            <div class="my-2 d-flex flex-row flex-wrap">
              <v-flex sm6>
              <!-- <div class="disengaged-employees-cards donut-charts"
                v-for="i in 3" :key="i">
                  <v-card>
                    <div v-if="Object.keys(disengagedDrivers)[i-1]">
                      <p class="pa-3 score-card text-xs-center mb-3 sub-heading" style=""> {{ (Object.keys(disengagedDrivers)[i-1]).replace(/([a-z0-9])([A-Z])/g, '$1 $2') }} </p>

                      <div :id="`donutChartdiv-${Object.keys(disengagedDrivers)[i-1]}`"
                      class="donutChart pb-4"> </div>
                    </div>

                    <v-layout row wrap align-center justify-center fill-height v-else>
                      <v-flex text-xs-center>
                        <strong class="body-2 font-weight-bold grey--text">
                          Not enough data to generate analysis
                        </strong>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </div> -->

                <div class="disengaged-employees-cards drivers-breakdown">
                  <v-card>
                  <div v-if="disengagedDrivers && disengagedDrivers.length > 0">
                    <p class="py-3 score-card text-xs-center mb-0 heading" >
                      Top 3 drivers leading to disengagement at {{user.company_name}}
                    </p>

                    <swiper :options="swiperOption" class="pa-3">
                      <swiper-slide
                        class="driver-slide"
                        v-for="(d, di) in disengagedDrivers"
                        v-if="di < 3"
                        :key="di"
                      >
                        <v-card class="pa-2 elevation-0">
                          <div class="slide-content">
                            <div class="d-flex flex-row flex-wrap">
                              <v-flex xs3>
                                <v-tooltip bottom>
                                  <p class="heading-b mb-0" slot="activator">
                                    {{d.average}}
                                  </p>
                                  <span> Driver average </span>
                                </v-tooltip>
                              </v-flex>
                              <!--<v-flex class="success--text text-xs-right pt-3">
                                0.6 above
                                <v-icon color="success">fas fa-long-arrow-alt-up</v-icon>
                              </v-flex>-->
                            </div>
                            <p class="mb-3 mt-1  driver-title heading" style="min-height:50px;">
                              <span class="heading" v-if="d.driver"> {{d.driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}} </span>
                            </p>
                            <v-divider class="mb-2"></v-divider>
                            <span class="caption" style="color:rgba(0,0,0,0.5) !important;">Subdriver Score</span>
                            <v-list class="pa-0 subdrivers-list">
                              <v-list-item
                                class="subdriver-tile"
                                v-for="(v, k) in d.sub_drivers"
                                :key="k"
                              >
                                <div class="d-flex flex-row flex-wrap">
                                  <v-flex xs9 class="overflow-wrap mr-2">
                                    <v-list-item-title class="text-capitalize">
                                      <span style="font-size:13px !important;" v-if="k"> {{k.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}} </span>
                                    </v-list-item-title>
                                  </v-flex>
                                  <v-flex xs2 class="mr-2">
                                    <v-list-item-action style="font-size:13px !important;align-items:flex-end;" class="text-xs-right "
                                    :style="`min-width:unset;border-bottom: 2px solid #f44336;border-color: ${getEngagementColor(v)} `">
                                      {{v}}
                                    </v-list-item-action>
                                  </v-flex>
                                </div>
                              </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <p class="mb-1 mt-2 heading-b">
                              {{d.disengaged_employees}}
                            </p>
                            <p class="mb-3 sub-heading">
                              Disengaged Employees
                            </p>
                          </div>
                          <v-divider></v-divider>
                          <div class="slide-actions text-xs-center">
                            <v-btn color="primary" class="text-capitalize" outline small @click="viewDriver(d.driver)">View Details</v-btn>
                          </div>
                        </v-card>
                      </swiper-slide>
                      <!-- Optional controls -->
                      <div v-if="false">
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                      </div>
                    </swiper>
                  </div>

                  <div class="align-center justify-center" v-if="!disengagedDrivers || !disengagedDrivers.length" style="height:450px">
                    <p class="py-3 score-card text-xs-center mb-0 heading" >
                      Top 3 drivers leading to disengagement at {{user.company_name}}
                    </p>
                    <div class="d-flex flex-row" style="height:390px">
                      <v-flex class="text-center align-self-center">
                        <strong class="body-2 font-weight-bold grey--text">
                          Not enough data to generate analysis
                        </strong>
                      </v-flex>
                    </div>
                  </div>
                </v-card>
              </div>
              </v-flex>
              <v-flex sm6 class="disengaged-employees-cards mb-0">
                <v-card class="monthwise_art" style="height:350px">
                  <p class="py-3 score-card text-xs-center mb-0 text-capitalize heading" >
                    Average Resolution Time (Days)
                  </p>
                  <div id="monthwise_art" v-if="monthwise_art && monthwise_art.length > 0"></div>
                  <div class="d-flex flex-row" v-else style="height:390px">
                    <v-flex class="text-center align-self-center">
                      <strong class="body-2 font-weight-bold grey--text">
                        Not enough data to generate analysis
                      </strong>
                    </v-flex>
                  </div>
                </v-card>
              </v-flex>
            </div>

            <div class="bg-white mb-0 d-flex flex-row">
              <p class="text-xs-center w-100 py-3 text-capitalize heading mb-0">
                Cases Resolution Insights
              </p>
            </div>
            <div class="caseResolution d-flex flex-row">
              <v-data-table
              :headers="headers"
              :items="casesResolutions"
              item-key="name"
              class="elevation-1 w-100"
              :rows-per-page-items="[10, 15, 20]"
              >
                <template v-slot:body="{items}">
                  <tr class="py-2" v-for="(item, index) in items" :key="index">
                    <td class="text-left">
                      <p class="mb-0"> {{ item.user_name }} </p>
                      <small class="text-muted grey--text"> {{ item.user_email }} </small>
                    </td>
                    <td class="text-xs-center">{{ item.total }}</td>
                    <td class="text-xs-center">{{ item.resolved }}</td>
                    <td class="text-xs-center">{{ item.open }}</td>
                    <td class="text-xs-center">{{ Math.round(item.average_resolution_time * 100) / 100 }}</td>
                  </tr>
                </template>
              </v-data-table>
            </div>
          </v-tab-item>

          <v-tab-item class="employeeToMeet" value="tab-disengaged-list" v-show="tabs.active === 'tab-disengaged-list'">
            <v-data-table
              :headers="table.headers"
              :items="table.team"
              :pagination.sync="pagination"
              :total-items="table.totalItems"
              :loading="table.loading"
              class="employee-list"
              id="employee-list"
            >
              <template v-slot:body="{items}">
                <tr v-for="(item, index) in items" :key="index" class="employeeTableRow">
                  <td style="width:14%">
                    <div class="d-flex flex-row flex-wrap align-center">
                      <!-- <v-flex class="py-2" sm3>
                        <v-avatar size="30px" :color="getColor(props.item)">
                          <img src="src" alt="alt" v-show="false">
                          <span class="white--text">{{getAvatar(props.item)}}</span>
                        </v-avatar>
                      </v-flex> -->
                      <v-flex>
                        <p class="mb-0" v-show="item.user_display_name || item.user__display_name">
                          <span :class="{'hover-link cursor-pointer': $route.name !== 'ViewAdhoc'}"
                          @click="viewEmployee(item);">
                            {{item.user_display_name || item.user__display_name}}
                          </span>
                        </p>
                        <!-- <small class="text-truncate" style=" max-width: 120px; display: inline-block;">
                          {{props.item.email || props.item.user__email || props.item.user_email}}
                        </small> -->
                      </v-flex>
                    </div>
                  </td>
                  <td style="width:14%">
                    <p class="mb-0" v-if="item.stage_title">
                      {{item.stage_title || item.stage__title}}
                    </p>
                    <p class="mb-0" v-else>
                      -
                    </p>
                  </td>
                  <td style="width:14%">
                    <p class="" v-if="(item.completedAt && item.completedAt !== 'None')">
                      {{dayjs(item.completedAt).from()}}
                    </p>
                    <p v-if="(!item.completedAt || item.completedAt === 'None') && !activeDriver"
                    class="font-weight-bold grey--text">
                      -
                    </p>
                  </td>
                  <!--<td class="text-sm-left">
                    <span v-if="!props.item.overall_mood" class="font-weight-bold grey--text">-</span>
                    <v-tooltip bottom v-if="props.item.overall_mood">
                      <img
                        slot="activator"
                        height="30"
                        :src="getImgUrl(`${props.item.overall_mood}`)"
                      >
                      Employee Vibe
                    </v-tooltip>
                  </td>-->
                  <td class="text-xs-left" style="width:14%">
                    <!--<v-chip :class="{
                      'success success--text': props.item.driverAverage > 3,
                      'error error--text': props.item.driverAverage <= 3
                    }" class="ma-0" outline small v-if="props.item.driverAverage">{{props.item.driverAverage}}
                    </v-chip>-->

                    <span class="" v-if="item.driverAverage"> {{item.driverAverage.toFixed(1)}} </span>
                    <span class="font-weight-bold grey--text" v-else>-</span>
                  </td>
                  <td class="text-xs-left px-0" style="width:15%" @click.stop v-if="!activeDriver">
                    <!-- Schedule one on one -->
                    <span v-if="activeDriver" class="font-weight-bold grey--text">
                      -
                    </span>

                    <v-tooltip
                      bottom
                    >
                      <v-chip
                        :disabled="config.loading"
                        :loading="config.loading"
                        :class="{
                          'primary primary--text': item.action_status === 'open',
                          '#37b99c amara--text': item.action_status === 'scheduled',
                          'info info--text': item.action_status === 'inProgress',
                          'success success--text': item.action_status === 'resolved',
                          'deep-orange deep-orange--text': item.action_status === 'acknowledged',
                        }"
                        style="width:110px !important;height:40px !important;"
                        slot="activator"
                        class="status-chip elevation-0 mr-0 text-capitalize"
                        outline
                        @click="config.actionMenu[item.id] = !config.actionMenu[item.id]"
                      >
                        <!--<v-icon class="mr-2" v-show="props.item.action_status === 'open'">
                          fas fa-exclamation-triangle
                        </v-icon>
                        <v-icon class="mr-2" v-show="props.item.action_status === 'resolved'">
                          fas fa-check
                        </v-icon>
                        <v-icon class="mr-2" v-show="props.item.action_status === 'scheduled'">
                          flaticon-012-meeting
                        </v-icon>
                        <v-icon class="mr-2" v-show="props.item.action_status === 'inProgress'">
                          flaticon-047-conversation
                        </v-icon>-->
                        {{item.action_status}}
                      </v-chip>
                      Current Status
                    </v-tooltip>

                    <v-tooltip
                      bottom

                    >
                      <v-menu offset-y slot="activator" v-model="config.actionMenu[item.id]">
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          :disabled="config.loading"
                          v-bind="attrs" v-on="on"
                          icon
                          :class="{
                            'primary primary--text': item.action_status === 'open',
                            '#37b99c amara--text': item.action_status === 'scheduled',
                            'info info--text': item.action_status === 'inProgress',
                            'success success--text': item.action_status === 'resolved',
                            'deep-orange deep-orange--text': item.action_status === 'acknowledged',
                          }"
                          class="dropdown-chip ml-0 b-left"
                          style="height:40px !important;"
                          small outline
                        >
                          <v-icon>fas fa-caret-down</v-icon>
                        </v-btn>
                        </template>
                        <v-list>
                          <v-list-item v-for="(item, i) in config.actions" :key="i"
                          v-if="item.action_status !== item.status"
                          @click="item.action(item, item.dialog || item.status)"
                          :disabled="!item.action || !checkPermission(item.permission)">
                            <v-list-item-title>
                              <v-icon class="mr-2">{{item.icon}}</v-icon>
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      Update status of this employee
                    </v-tooltip>

                    <!-- View Chat -->
                    <!-- <v-tooltip
                      v-if="!activeDriver"
                      bottom
                    >
                      <v-btn color="rgba(0,0,0,0.54)"
                        slot="activator"
                        small
                        flat
                        icon
                        @click="props.expanded = !props.expanded;setInfo(props.item, props);"
                      >
                        <v-icon small>fas fa-comments</v-icon>
                      </v-btn>
                      Chat Transcript
                    </v-tooltip>-->
                  </td>
                  <td class="text-xs-left px-0">
                    <!-- <v-select
                      :items="getAdminUsersList"
                      class="transparent assignee mr-2"
                      @change="updateStatus(props.item, null, props.item.assignedTo)"
                      :disabled="!checkPermission(['reply_anonymous_message']) || config.loading || props.item.action_status === 'Na'"
                      item-text="display_name"
                      item-value="user_id"
                      v-model="props.item.assignedTo"
                      label=""
                    ></v-select> -->

                    <v-chip
                      :disabled="!checkPermission(['reply_anonymous_message']) || config.loading || item.action_status === 'Na'"
                      slot="activator"
                      class="status-chip elevation-0 mr-0 text-capitalize assign-to-select"
                      style="width:110px !important;border: 1px solid #4c409d;height:40px !important;"
                      outline
                    >
                      <span v-if="item.assignedTo_display_name">{{item.assignedTo_display_name}}</span>
                      <span v-else> Not assigned </span>
                    </v-chip>

                    <v-menu offset-y slot="activator">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs" v-on="on"
                          :disabled="!checkPermission(['reply_anonymous_message']) || config.loading || item.action_status === 'Na'"
                          icon
                          class="dropdown-chip ml-0 b-left"
                          small outline
                          style="border: 1px solid #4c409d;height:40px !important;"
                        >
                          <v-icon @click="getAdminUsers(item)">fas fa-caret-down</v-icon>
                        </v-btn>
                      </template>
                        <v-list v-if="getAdminUsersList && getAdminUsersList.length > 0">
                          <v-list-item v-for="(item, i) in getAdminUsersList" :key="i" @click="updateStatus(item, null, item.user_id)">
                            <v-list-item-title>
                              {{ item.display_name }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                  </td>
                  <td class="text-xs-left px-0" style="width:14%">
                    <v-btn text outlined class="text-capitalize btn-text" color="primary" style="" @click.stop="viewEmployee(item);"> View employee </v-btn>
                  </td>
                </tr>
              </template>
              <template slot="expand">
                <div class="secondary px-4 py-2">
                  <span v-show="!table.loadingInfo">
                    <QuickView ref="QuickView" />
                  </span>
                  <v-progress-linear v-if="table.loadingInfo"
                  :indeterminate="true"></v-progress-linear>
                </div>
              </template>
              <!--<v-card slot="no-data" class="elevation-0 text-xs-center" min-height="60vh">
                <v-card-title primary-title class="justify-center">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <img :src="getImgUrl('amara_avatar')" class="blank-avatar" alt="">
                      <p>
                        No employees present.
                      </p>
                    </v-flex>
                  </v-layout>
                </v-card-title>
              </v-card>-->
              <v-alert slot="no-data" :value="true" color="#fff" outline>
                <span>
                  <div style="height:300px">
                    <div class="d-flex flex-row flex-wrap align-center justify-center fill-height">
                      <v-flex class="text-center">
                        <strong class="body-2 font-weight-bold grey--text">
                          Not enough data to generate analysis
                        </strong>
                      </v-flex>
                    </div>
                  </div>
                </span>
              </v-alert>
            </v-data-table>
          </v-tab-item>

          <v-tab-item value="tab-sentiment-analysis" v-show="tabs.active === 'tab-sentiment-analysis'">
            <sentimentAnalysis ref="sentimentAnalysis" containerId="1"> </sentimentAnalysis>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>

      <!-- Dashboard Employee List -->
    </div>

    <OneOnOne ref="OneOnOne" />
    <AddComment ref="AddComment" />
    <Acknowledge ref="Acknowledge" />
  </div>
</template>

<script>
/* eslint-disable max-len */
import { swiper, swiperSlide } from 'vue-awesome-swiper';
// import html2canvas from 'html2canvas';
// import JsPDF from 'jspdf';
// import VueHtml2Canvas from 'vue-html2canvas';
import { mapState, mapActions } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Anychart from 'anychart';
import VueAnychart from '../analytics/VueAnychart.vue';
import sentimentAnalysis from './sentimentAnalysis';
// import {
//   VCheckbox,
//   VAvatar,
//   VTooltip,
//   VAlert,
//   VProgressLinear,
//   VChip,
//   VBadge
// } from 'vuetify';
import QuickView from '@/components/elements/QuickView';
import OneOnOne from '../employees/dialogs/OneOnOne';
import AddComment from '../elements/AddComment';
import Acknowledge from '../employees/dialogs/Acknowledge';

dayjs.extend(relativeTime);

export default {
  name: 'team',
  components: {
    swiper,
    swiperSlide,
    QuickView,
    ContentLoader,
    // VCheckbox,
    // VAvatar,
    // VTooltip,
    // html2canvas,
    // JsPDF,
    // VAlert,
    // dayjs,
    OneOnOne,
    // VChip,
    // VBadge,
    AddComment,
    Acknowledge,
    // VProgressLinear,
    VueAnychart,
    sentimentAnalysis
  },

  props: {
    actionStatus: {
      required: false,
      type: String,
      default: ''
    }
  },

  data () {
    return {
      height: 290,
      casesResolutions: [],
      getAdminUsersList: [],
      headers: [{
        text: 'HR Name',
        align: 'center',
        sortable: false,
        value: 'name'
      }, {
        text: 'Total Cases Assigned',
        sortable: false,
        align: 'center',
        value: 'fat'
      }, {
        text: 'Cases Resolved',
        sortable: false,
        align: 'center',
        value: 'carbs'
      }, {
        text: 'Cases Open',
        value: 'protein',
        sortable: false,
        align: 'center'
      }, {
        text: 'Average Resolution Time \n (Days)',
        value: 'iron',
        sortable: false,
        align: 'center'
        // },{
        // text: 'Action',
        // value: 'iron',
        // sortable: false,
        // align: 'center',
      }],
      stackedGraphs: false,
      donutGraphs: false,
      activeDriver: false,
      monthwise_art: [],
      disengagedDrivers: [],
      employeeFilters: '',
      filters: {
        default: {},
        selected: {},
        main: {}
      },
      pagination: {
        rowsPerPage: 10,
        page: 1
      },
      overall_disengaged_stats: {},
      resolved_disengaged_stats: {},
      employee_to_meet_stats: {},
      disengaged_exited_employee_stats: {},
      table: {
        totalItems: 0,
        closedItems: 0,
        searchString: '',
        extraInfo: [],
        loadingInfo: true,
        loading: false,
        team: [],
        headers: [{
          text: 'Employee Details',
          align: 'left',
          sortable: false,
          width: '1%'
        }, {
          text: 'Last Touchpoint',
          align: 'left',
          sortable: false
        }, {
          text: 'Last Chat Completed',
          align: 'left',
          sortable: false
        // }, {
        //   text: 'Employee Vibe',
        //   align: 'left',
        //   sortable: false,
        }, {
          text: 'Engagement Score',
          align: 'left',
          sortable: false
        }, {
          text: 'Chat Status',
          align: 'left',
          sortable: false
        // },  {
        //   text: 'View more',
        //   align: 'left',
        //   sortable: false,
        }, {
          text: 'Assignee',
          align: 'left',
          sortable: false
        }, {
          text: '',
          align: 'left',
          sortable: false
        }]
      },
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 10,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true
        },
        breakpoints: {
          1800: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          1264: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 'auto',
            spaceBetween: 10,
            centeredSlides: true
          }
        }
      },
      dateRangeOptions: {},
      tabs: {
        active: 'tab-snapshot-list',
        list: [
          {
            title: 'snapshot',
            value: 'snapshot-list'
          }, {
            title: 'Employees to Meet',
            value: 'disengaged-list'
          }, {
            title: 'Sentiment Analysis',
            value: 'sentiment-analysis',
            about: '',
            count: 0
          }
        ]
      },
      config: {
        actionMenu: {},
        activeTab: 'high_risk_session',
        panel: [true, true, true, true],
        initialLoading: true,
        loading: false,
        initialLoadingFilters: true,
        actions: [
          {
            title: 'Acknowledge Chat',
            icon: 'fas fa-check-square',
            status: 'acknowledged',
            dialog: 'Acknowledge',
            action: this.openDialog,
            permission: ['acknowledge_chat']
          }, {
            title: 'Schedule meeting',
            icon: 'flaticon-012-meeting',
            status: 'scheduled',
            dialog: 'OneOnOne',
            action: this.openDialog,
            permission: ['schedule_invite']
          }, {
            title: 'Work In Progress',
            icon: 'flaticon-047-conversation',
            status: 'inProgress',
            action: this.updateStatus,
            permission: ['change_status']
          }, {
            title: 'Resolved',
            icon: 'fas fa-check',
            status: 'resolved',
            action: this.updateStatus,
            permission: ['change_status']
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      dashboardFilters: state => state.dashboardFilters,
      adminUsers (state) {
        const adminUsers = state.companyAdminsList;
        return adminUsers;
      }
    }),
    checkForFilters () {
      let applied = false;
      this.$lodash.each(this.filters.selected, (v) => {
        if (v.length > 0) {
          applied = true;
        }
      });
      return applied;
    }
  },
  methods: {
    // download () {
    //   html2canvas(document.querySelector('#app'), {
    //     imageTimeout: 15000,
    //     x: 55,
    //     y: 80,
    //     logging: false,
    //     allowTaint: true,
    //     useCORS: true,
    //     }).then(canvas => {
    //     document.getElementById('pdf').appendChild(canvas)
    //     let pdf = new JsPDF('portrait', 'mm', 'a3')
    //     pdf.fromHTML(document.getElementById('html'),{

    //     });
    //     pdf.fillStyle = '#000';
    //     var backgroundImage = new Image();
    //     backgroundImage.src = 'https://amara-internal.s3.ap-south-1.amazonaws.com/reports/images/pdf_download_main_banner_image.jpeg'
    //     pdf.addImage(backgroundImage, 'png', 0, 0, 297, 420)
    //     pdf.setFontSize(20);
    //     pdf.setTextColor('Black')
    //     pdf.text(20, 30, `DASHBOARD`);
    //     pdf.text(20, 40, `REPORT`);
    //     let today = new Date();
    //     let day = today.getDate();
    //     let month = today.getMonth() + 1;
    //     let year = today.getFullYear();
    //     pdf.text(260, 30, `${year}`);
    //     pdf.text(80, 280, `Prepared By : ${this.user.display_name} On ${day} / ${month} / ${year}`);
    //     console.log(this.dashboardFilters.filters);
    //     pdf.setFontSize(15);
    //     pdf.setTextColor('Black')
    //     this.$lodash.each(this.dashboardFilters.filters, (v, k) => {
    //       if (v.length > 0 && k !== 'activeTab') {
    //         pdf.text(`${k.charAt(0).toUpperCase() + k.slice(1)} : ${v}`, 30 , `${this.height + 7}`);
    //         this.height = this.height+7;
    //       }

    //     });
    //     pdf.setFontSize(20);
    //       if (this.height > 290) {
    //         pdf.text(100,290,`Filters Applied Are As Follow`);
    //       }
    //       pdf.setFontSize(15);
    //       if (this.dateRangeOptions.startDate && this.dateRangeOptions.endDate) {
    //         this.dateRangeOptions.start = this.dateRangeOptions.startDate.split('T')
    //         this.dateRangeOptions.end = this.dateRangeOptions.endDate.split('T')

    //     pdf.text(`Chat start date : ${this.dateRangeOptions.start[0]}`, 30, `${this.height + 7}`);
    //     pdf.text(`Chat end date : ${this.dateRangeOptions.end[0]}`, 30, `${this.height + 14}`);
    //     }
    //     if (!this.dateRangeOptions.startDate && this.dashboardFilters.highPotential) {
    //       this.height = this.height-14;
    //     }
    //     if (this.dashboardFilters.highPotential) {
    //     // pdf.text(30, `${this.height + 7}`, `${dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD')}`);
    //     pdf.text (`HiPOS : ${this.dashboardFilters.highPotential.charAt(0).toUpperCase() + this.dashboardFilters.highPotential.slice(1)}`, 30, `${this.height + 21}`,);
    //     }
    //     pdf.setFontSize(10);
    //     pdf.text(130, 415, "Powered by Amara");
    //     pdf.addPage()
    //     let img = canvas.toDataURL('image/png')
    //     pdf.addImage(img, 'png', 5, 5, 365, 287)
    //     pdf.text(130, 410, "Powered by Amara");
    //     pdf.setFontSize(10);
    //     pdf.save('Amara-disengaged-employee.pdf')
    //     document.getElementById('pdf').innerHTML = ''

    //   })
    // },
    getAdminUsers (emp) {
      const temp = {
        display_name: 'Remove Assignee',
        user_id: null
      };
      let t = [];
      t = this.adminUsers;
      if (emp.assignedTo && emp.assignedTo !== null) {
        if (t && t.length > 0 && t[0].display_name !== 'Remove Assignee') {
          t.unshift(temp);
          this.getAdminUsersList = t;
        }
      } else {
        if (t && t.length > 0 && t[0].display_name === 'Remove Assignee') {
          t.splice(0, 1);
        }
        this.getAdminUsersList = t;
      }
    },
    ...mapActions(['getAdminList']),
    addRef (val) {
      // this.$router.push({ query: {activeTab: val}});
      switch (val) {
        case 'snapshot-list':
          if (this.$route.params.stageId) {
            this.getOverview(this.$route.params.stageId);
          } else {
            this.getOverview();
          }
          break;
        case 'sentiment-analysis':
          setTimeout(() => {
            this.$refs.sentimentAnalysis.analysisEnabled = false;
            this.$refs.sentimentAnalysis.analysisTab = false;
            this.$refs.sentimentAnalysis.sentimentTab = true;
            this.$refs.sentimentAnalysis.report = { question_analysis: {} };
            if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
              this.filters.selected = this.dashboardFilters.filters;
              this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
            }
            const queryParams = {
              initiated_date_start: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
              initiated_date_end: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined
            };
            this.$lodash.each(this.filters.selected, (v, k) => {
              if (v.length > 0) {
                queryParams[`user__profile__${k}__in`] = v.join();
              }
            });
            this.$refs.sentimentAnalysis.filterData = queryParams;
            // this.$refs.sentimentAnalysis.dialogs.sentimentAnalysis = true;
            this.$refs.sentimentAnalysis.generateWordCloud();
            // this.$refs.sentimentAnalysis.getResponses();
          }, 100);
          break;
        case 'disengaged-list':
          this.getEmployeesToMeet();
        // eslint-disable-next-line no-fallthrough
        default:
      }
    },
    viewDriver (driver) {
      const t = this.dashboardFilters;
      let tempAllFilters = {};
      if (t.filters) {
        this.$lodash.each(t.filters, (value, key) => {
          if (value.length > 0) {
            const tempObj = {
              [key]: value.length > 1 ? value.join() : value[0]
            };
            tempAllFilters = { ...tempAllFilters, ...tempObj };
          }
        });
      }
      if (this.dashboardFilters.dateRangeOptions && this.dashboardFilters.dateRangeOptions.startDate && this.dashboardFilters.dateRangeOptions.endDate) {
        tempAllFilters.startDate = this.dashboardFilters.dateRangeOptions.startDate;
        tempAllFilters.endDate = this.dashboardFilters.dateRangeOptions.endDate;
      }
      if (this.dashboardFilters.highPotential && this.dashboardFilters.highPotential.length > 0) {
        tempAllFilters.highPotential = this.dashboardFilters.highPotential;
      }
      this.$router.push({
        path: `/driver/view/${driver}`,
        query: {
          ...tempAllFilters
        }
      });
    },
    checkPermission (permission) {
      let flag = false;
      this.$lodash.each(this.user.permissions, (perm) => {
        this.$lodash.each(permission, (v) => {
          if (v === perm) {
            flag = true;
          }
        });
      });
      return flag;
    },
    updateStatus (s, newStatus, assignedTo) {
      this.config.loading = true;
      axios.patch(`${process.env.VUE_APP_API_URL}session/update/${s.id}`, {
        action_status: newStatus,
        assignedTo_id: assignedTo
      }).then((response) => {
        this.config.loading = false;
        if (response && response.data) {
          // s.action_status = newStatus;
          s.assignedTo = assignedTo;
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee status updated!'
          });
          this.getEmployeesToMeet();
        } else {
          this.config.loading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update status, Please try again later!'
          });
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update status, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getOverview (stageId) {
      this.overall_disengaged_stats = null;
      this.resolved_disengaged_stats = null;
      this.employee_to_meet_stats = null;
      this.disengaged_exited_employee_stats = null;
      this.disengagedDrivers = [];
      this.monthwise_art = null;
      if (document.getElementById('monthwise_art')) {
        document.getElementById('monthwise_art').innerHTML = '';
      }
      this.casesResolutions = [];

      const fields = 'overall_disengaged_stats,resolved_disengaged_stats,employee_to_meet_stats,disengaged_exited_employee_stats,disengaged_driver_analysis,monthwise_art,chat_resolution_insights';
      let url = `${process.env.VUE_APP_API_URL}disengaged/overview?fields=${fields}`;
      if (this.$route.name === 'ViewLifecycle' && this.$route.params && this.$route.params.stageId) {
        url = `${process.env.VUE_APP_API_URL}disengaged/overview?fields=${fields}&stage_id=${this.$route.params.stageId}`;
      }
      if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
        this.filters.selected = this.dashboardFilters.filters;
        this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
      }
      const queryParams = {
        initiated_date_start: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
        user__profile__high_potential_emp: this.dashboardFilters.highPotential
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`user__profile__${k}__in`] = v.join();
        }
      });
      axios.get(url, {
        params: queryParams
      })
        .then((response) => {
          if (response && response.data) {
            this.config.initialLoading = false;

            this.overall_disengaged_stats = response.data.overall_disengaged_stats;
            this.resolved_disengaged_stats = response.data.resolved_disengaged_stats;
            this.employee_to_meet_stats = response.data.employee_to_meet_stats;
            this.disengaged_exited_employee_stats = response.data.disengaged_exited_employee_stats;

            if (this.overall_disengaged_stats && this.overall_disengaged_stats.disengaged_employees) {
              this.generateStacked(this.overall_disengaged_stats, 'total');
            }
            if (this.employee_to_meet_stats && this.employee_to_meet_stats.total_employees_to_meet) {
              this.generateStacked(this.employee_to_meet_stats, 'tomeet');
            }
            if (this.disengaged_exited_employee_stats && this.disengaged_exited_employee_stats.total_exited_employee) {
              this.generateStacked(this.disengaged_exited_employee_stats, 'exited');
            }

            if (response.data.chat_resolution_insights) {
              this.casesResolutions = response.data.chat_resolution_insights;
            }

            if (response.data.driver_breakdown) {
              const temp = response.data.driver_breakdown;
              this.$lodash.each(temp, (data, driver) => {
                this.disengagedDrivers.push({
                  driver: data.driver,
                  average: data.average,
                  disengaged_employees: data.disengaged_employees,
                  sub_drivers: data.sub_drivers
                });
              });
            }
            setTimeout(() => {
              this.$lodash.each(this.disengagedDrivers, (driverData, driver) => {
              // this.generateDonut(driverData, driver);
              });
            }, 100);

            if (response.data.monthwise_art) {
              this.monthwise_art = response.data.monthwise_art;
              this.generateDisengagedArt(response.data.monthwise_art.reverse());
            }
          // this.getEmployeesToMeet();
          } else {
            this.config.initialLoading = false;
          }
        }, (response) => {
          this.config.initialLoading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to fetch data, Please try again later!'
          });
          throw new Error(response);
        });
    },
    generateDisengagedArt (data) {
      const temp = [];
      setTimeout(() => {
        if (document.getElementById('monthwise_art')) {
          document.getElementById('monthwise_art').innerHTML = '';
        }

        if (data.length > 0) {
          this.$lodash.each(data, (value, key) => {
            const temp2 = [];
            temp2.push(value.month);
            temp2.push(value.engagement_stats);
            temp.push(temp2);
          });

          const chart = Anychart.area();
          const series = chart.area(temp);
          series.normal().fill('#edebf5');
          series.normal().stroke('#4c3e9d');

          // enable HTML for tooltips
          chart.tooltip().useHtml(true);

          // tooltip settings
          var tooltip = chart.tooltip();
          tooltip.positionMode('point');
          tooltip.title('Month: <b>{%x}');
          tooltip.format('Average Resolution Time: <b>{%value} days</b>');

          chart.title('');

          // set the titles of the axes
          chart.xAxis().title('Month');
          chart.yAxis().title('');

          // set the container id
          chart.container('monthwise_art');

          // initiate drawing the chart
          chart.draw();
        }
      }, 100);
    },
    generateStacked (data, type) {
      const that = this;

      this.stackedGraphs = true;
      const highRisk = [];
      const mediumRisk = [];
      let total = 0;

      this.$lodash.each(data, (value, key) => {
        if (key === 'high_risk' || key === 'high_risk_employees_to_meet' || key === 'high_risk_exited_employee') {
          total += value;
        } else if (key === 'medium_risk' || key === 'medium_risk_employees_to_meet' || key === 'medium_risk_exited_employee') {
          // eslint-disable-next-line no-unused-vars
          total += value;
        }
      });
      this.$lodash.each(data, (value, key) => {
        if (key === 'high_risk' || key === 'high_risk_employees_to_meet' || key === 'high_risk_exited_employee') {
          // highRisk.push(((value / total) * 100).toFixed(0));
          highRisk.push(value);
        } else if (key === 'medium_risk' || key === 'medium_risk_employees_to_meet' || key === 'medium_risk_exited_employee') {
          // mediumRisk.push(((value / total) * 100).toFixed(0));
          mediumRisk.push(value);
        }
      });

      if (highRisk.length || mediumRisk.length) {
        const chartName = `stackedBarChart-${type}`;

        if (document.getElementById(chartName)) {
          document.getElementById(chartName).innerHTML = '';
        }

        const chart = Anychart.bar();
        chart.yScale().stackMode('percent');

        var labelsX = chart.xAxis().labels();
        var labelsY = chart.yAxis().labels();
        labelsX.enabled(false);
        labelsY.enabled(false);

        chart.xAxis().enabled(false);
        chart.yAxis().enabled(false);
        // chart.xScale().enabled(false);
        // chart.yScale().enabled(false);

        // set the container id
        chart.container(chartName);
        chart.legend(true);
        chart.legend().position('bottom');
        chart.legend().fontSize(8);
        // chart.legend().fontStyle('bold');

        var series1 = chart.bar(highRisk);
        var series2 = chart.bar(mediumRisk);
        series1.normal().fill('#f44336');
        series1.hovered().fill('#f44336');
        series1.selected().fill('#f44336');
        series1.normal().stroke('#f44336');
        series2.normal().fill('#ff9800');
        series2.hovered().fill('#ff9800');
        series2.selected().fill('#ff9800');
        series2.normal().stroke('#ff9800');
        series1.name('High Risk Employees');
        series2.name('Medium Risk Employees');

        // set the value as label in stacks
        series1.labels(true);
        series2.labels(true);
        series1.labels().position('center');
        series2.labels().position('center');
        series1.labels().offsetY(20);
        series2.labels().offsetY(20);
        series1.labels().format('{%value}');
        series2.labels().format('{%value}');
        series1.labels().fontColor('#fff');
        series2.labels().fontColor('#fff');
        series1.labels().fontSize(12);
        series2.labels().fontSize(12);
        series1.labels().fontStyle('bold');
        series2.labels().fontStyle('bold');

        chart.tooltip().titleFormat('');
        chart.tooltip().useHtml(true);

        // tooltip settings
        var tooltip1 = series1.tooltip();
        tooltip1.positionMode('point');
        tooltip1.format('<b>High Risk Employees: </b> : <b> {%value} </b>');

        var tooltip2 = series2.tooltip();
        tooltip2.positionMode('point');
        tooltip2.format('<b> Medium Risk Employees: </b> : <b> {%value} </b>');

        chart.listen('click', function (event) {
          let employeeFilters = {};
          if (type === 'total') {
            employeeFilters = {};
          } else if (type === 'resolved') {
            employeeFilters = {
              action_status__in: 'resolved'
            };
          } else if (type === 'tomeet') {
            employeeFilters = {
              user__profile__status__in: 'active',
              action_status__in: 'open,scheduled,acknowledged,inProgress'
            };
          } else if (type === 'exited') {
            employeeFilters = {
              user__profile__status__in: 'inactive'
            };
          }
          if (event && event.target) {
            if (event.target.er === 'High Risk Employees') {
              employeeFilters = {
                ...employeeFilters,
                driverAverage__lte: '2.5'
              };
            } else if (event.target.er === 'Medium Risk Employees') {
              employeeFilters = {
                ...employeeFilters,
                driverAverage__gt: '2.5'
              };
            }
          }
          that.tabs.active = 'tab-disengaged-list';
          that.getEmployeesToMeet(employeeFilters);

          // const responseList = document.getElementsByClassName("employee-list");
          // that.$lodash.each(responseList, (list, li) => {
          //   list.scrollIntoView();
          // });
          // const employeeList = document.getElementById('employee-list-tab');
          // window.scrollTo(0, employeeList.offsetTop);
        });

        // initiate drawing the chart
        chart.draw();
        this.$forceUpdate();
      }
    },
    generateDonut (data, driver) {
      const that = this;
      this.donutGraphs = true;

      const chartName = `donutChartdiv-${driver}`;
      const chartData = [];

      if (document.getElementById(chartName)) {
        document.getElementById(chartName).innerHTML = '';
      }

      const totalDisengagedEmployees = data.disengaged_employees;
      let totalEmployees = 0;
      this.$lodash.each(data.sub_driver, (driverData, sub_driver) => {
        totalEmployees += driverData;
      });

      this.$lodash.each(data.sub_driver, (driverData, sub_driver) => {
        const driverName = (sub_driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2'));

        chartData.push({
          name: sub_driver,
          subDriver: driverName.charAt(0).toUpperCase() + driverName.substr(1).toLowerCase(),

          value: driverData,
          percentage: ((driverData / totalEmployees) * 100).toFixed(0)
        });
      });

      var chart = Anychart.pie(chartData);

      chart.radius('90%');
      chart.innerRadius('70%');

      chart.labels().position('outside');
      chart.labels().useHtml(true);
      chart.labels().format("<span style='font-weight: 900;'>{%subDriver} - {%value} </span>");
      chart.labels().enabled(false);

      // create and configure a label
      var label = Anychart.standalones.label();
      if (totalDisengagedEmployees > 1) {
        label.text(`${totalDisengagedEmployees} Employees`);
      } else if (totalDisengagedEmployees === 1) {
        label.text(`${totalDisengagedEmployees} Employee`);
      }
      label.width('100%');
      label.height('100%');
      label.fontColor('#60727b');
      label.hAlign('center');
      label.vAlign('middle');

      chart.maxHeight('90%');
      chart.minHeight('90%');

      // set the label as the center content
      chart.center().content(label);

      chart.tooltip().useHtml(true);
      // chart.tooltip().format('<span style='font-weight: 900;'> No. of Employees : {%value}  Percentage : {%percentage} % </span>');
      chart.tooltip().format("<span style='font-weight: 900;'> No. of Employees : {%value}  </span>");

      chart.selected().explode('0%');

      chart.listen('pointClick', function (event) {
        let employeeFilters = {};
        const subDriver = chartData[event.point.getIndex()].name;

        employeeFilters = {
          [`driverBreakdown__${driver}__${subDriver}__average__lte`]: 3
        };
        that.tabs.active = 'tab-disengaged-list';
        that.getEmployeesToMeet(employeeFilters);
        // const employeeList = document.getElementById('employee-list-tab');
        // window.scrollTo(0, employeeList.offsetTop);
      });

      chart.legend(true);
      chart.legend().position('bottom');
      chart.legend().align('center');
      // chart.legend().itemsLayout('vertical');
      // enable html for the legend
      chart.legend().useHtml(true);

      // configure the format of legend items
      chart.legend().itemsFormat("<span style='color:#455a64;font-weight:600'>{%subDriver} : </span> {%value}");

      // enable and configure the title separator
      // let separator = chart.legend().titleSeparator()
      // separator.enabled(true);
      // separator.height(4);
      // separator.fill('none');
      // separator.stroke('#96a6a6", 2);

      // chart.legend().titleSeparator().orientation('left');

      chart.container(chartName);

      chart.draw();
      this.$forceUpdate();
    },
    getEmployeesToMeet (employeeFilters) {
      // this.table.team = [];
      // this.table.totalItems = 0;
      if (this.dashboardFilters && Object.keys(this.dashboardFilters).length > 0) {
        this.filters.selected = this.dashboardFilters.filters;
        this.dateRangeOptions = this.dashboardFilters.dateRangeOptions;
      }
      let queryParams = {
        initiated_date_start: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.startDate).format('YYYY-MM-DD') : undefined,
        initiated_date_end: this.dateRangeOptions && this.dateRangeOptions.startDate ? dayjs(this.dateRangeOptions.endDate).format('YYYY-MM-DD') : undefined,
        user__profile__high_potential_emp: this.dashboardFilters.highPotential,
        action_status__in: this.actionStatus !== '' ? this.actionStatus : undefined
      };
      this.$lodash.each(this.filters.selected, (v, k) => {
        if (v.length > 0) {
          queryParams[`user__profile__${k}__in`] = v.join();
        }
      });
      const params = {
        count: true,
        page_limit: this.pagination.rowsPerPage,
        page_offset: this.pagination.page || 1,
        // fields: 'user_display_name,user_email,user_department,stage_title,completedAt,session_driver,overall_mood,driverAverage,transcripts,user_profile_id,status,action_status,createdAt,',
        fields: 'user_display_name,user_email,user_department,stage_title,completedAt,session_driver,overall_mood,driverAverage,transcripts,user_profile_id,status,action_status,createdAt,assignedTo,assignedTo_email,assignedTo_display_name'
      };
      queryParams = {
        ...queryParams,
        ...employeeFilters,
        ...params
      };
      if (this.$route.name === 'ViewLifecycle' && this.$route.params && this.$route.params.stageId) {
        const temp = {
          stage_id: this.$route.params.stageId
        };
        queryParams = {
          ...queryParams,
          ...temp
        };
      }
      axios.get(`${process.env.VUE_APP_API_URL}disengaged/employees`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          if (response.data.disengaged_users) {
            this.config.initialLoading = false;
            this.table.team = response.data.disengaged_users;
            this.$lodash.each(this.table.team, (v) => {
              this.getAdminUsers(v);
            });
            this.$lodash.each(this.table.team, (v) => {
              if (v.action_status === 'Na') {
                v.action_status = '';
              }
            });
            const actionMenu = {};
            this.$lodash.each(response.data.disengaged_users, (v) => {
              actionMenu[v.id] = false;
            });
            this.config.actionMenu = actionMenu;

            this.table.totalItems = response.data.count;
          }
        } else {
          this.config.initialLoading = false;
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch details, Please try again later!'
        });
        throw new Error(response);
      });
    },
    openDialog (data, type) {
      if (type && this.$refs[type]) {
        this.$refs[type].open = true;
        this.$refs[type].employee = data;
      }
    },
    setInfo (e, row) {
      if (row.expanded) {
        this.table.loadingInfo = true;
        this.table.extraInfo = [];
        if (e.transcripts && e.transcripts.transcript) {
          this.$lodash.each(e.transcripts.transcript, (t) => {
            if (t.responseRequired || t.bot_response === false) {
              this.table.extraInfo.push(t);
            }
          });
          setTimeout(() => {
            this.table.loadingInfo = false;
            this.$refs.QuickView.transcripts = this.table.extraInfo;
          }, 100);
        }
      }
    },
    getEngagementColor (score) {
      let color = '';
      if (score <= 3) {
        color = '#f44336';
      } else if (score <= 4) {
        color = '#ff9800';
      } else if (score <= 5) {
        color = '#37b99c';
      }
      return color;
    },
    getColor (e) {
      let color = 'primary';
      if (e.gender && e.gender === 'female') {
        color = 'pink';
      }
      return color;
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    viewEmployee (s, tab) {
      const t = this.dashboardFilters;
      let tempAllFilters = {};
      if (t.filters) {
        this.$lodash.each(t.filters, (value, key) => {
          if (value.length > 0) {
            const tempObj = {
              [key]: value.length > 1 ? value.join() : value[0]
            };
            tempAllFilters = { ...tempAllFilters, ...tempObj };
          }
        });
      }
      if (this.dashboardFilters.dateRangeOptions && this.dashboardFilters.dateRangeOptions.startDate && this.dashboardFilters.dateRangeOptions.endDate) {
        tempAllFilters.startDate = this.dashboardFilters.dateRangeOptions.startDate;
        tempAllFilters.endDate = this.dashboardFilters.dateRangeOptions.endDate;
      }
      if (this.dashboardFilters.highPotential && this.dashboardFilters.highPotential.length > 0) {
        tempAllFilters.highPotential = this.dashboardFilters.highPotential;
      }
      if (this.$route.name !== 'ViewAdhoc') {
        this.$router.push({
          path: '/employees',
          query: {
            search: s.user_display_name,
            eID: s.user_profile_id || s.id,
            ...tempAllFilters
          }
        });
      }
    },
    getAvatar (c) {
      let name = '';
      if (c.user_display_name) {
        name = c.user_display_name.split(' ');
      } else {
        name = c.user__display_name.split(' ');
      }
      const avt = `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
      return avt.toUpperCase();
    }
  },
  watch: {
    pagination: {
      handler () {
        if (!this.config.initialLoading) {
          this.getEmployeesToMeet();
        }
      },
      deep: true
    },
    $route () {
      if (this.$route.query && this.$route.query.driver) {
        this.activeDriver = true;
      } else {
        this.activeDriver = false;
      }
    }
  },
  beforeMount () {
    this.getAdminList();
    if (this.$route.query && this.$route.query.driver) {
      this.activeDriver = true;
    } else {
      this.activeDriver = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

#employee-list {
  thead {
    tr {
      th {
        font-size: 14px!important;
      }
    }
  }
}
#employee-list {
  .v-table__overflow {
    overflow-x: auto !important;
  }
  .v-datatable {
    // &.v-table {
    //   display: block!important;

    // }
  }
}
.employeeViewDetails:hover {
  color:var(--v-primary-base) !important;
  border-color:var(--v-primary-base) !important;
}
.employeeToMeet {
  .theme--light.v-table tbody tr:not(:last-child) {
    border-bottom: 0px solid rgba(0,0,0,0.12);
}
  .v-tabs__item:not(.v-tabs__item--active) {
    color:rgba(76, 62, 157, 1) !important;
  }
  .v-tabs__bar {
    width: 100%;
    text-align: center;
    margin: 0 auto !important;
    background-color: #fafafa !important;
    border-radius: 0px !important;

  }
  .v-tabs__container {
    padding-top:8px;
    padding-bottom: 8px;
  }
  .v-tabs__item--active{
    background-color: #4c3e9d !important;
    color:white !important;
  }
  .v-tabs__slider {
    height:0 !important;
  }
  .v-tabs__div {
    height: 30px;
    border:1px solid rgba(76, 62, 157, 0.7) !important;;
    border-radius:2px !important;
  }
  // .v-tabs__item{
  //   background-color:white ;
  // }
  .v-tabs__item:hover{
    background-color:#4c3e9d !important ;
    color:white !important;
  }
}
.assign-to-select {
  .v-chip__content {
    white-space: unset;
  }
}

</style>

<style lang="scss" scoped>
.dropdown-chip {
  border-radius: 0 10px 10px 0px !important;
}
.status-chip {
  border-radius: 10px 0 0 10px !important;
}
.employeeToMeet {
  .assignee {
    width: 180px!important;
  }
}
.dropdown-btn, .status-btn {
  &.v-btn--icon:before {
    border-radius: 0;
  }
  border-radius: 0;
}
.status-btn {
  min-width: 9em !important;
}
.donutChart {
  height: 308px!important;
  width: 99%!important;
  margin: 0px!important;
  // position:relative !important;
  // top:-35px !important;
  // top:-18px!important;
  // left: -5px!important;
}
.stackedBarChart {
  height: 80px!important;
  width: 100%!important;
  margin: 8px auto 8px auto!important;
  // top:-18px!important;
  // left: -5px!important;
}
.disengaged-employees-cards {
  &.drivers-breakdown {
    .v-card {
      height: 450px!important;
    }
    .swiper-container {
      height: 450px!important;
      overflow: hidden!important;
      .driver-slide {
        max-height: 400px!important;
        overflow: hidden!important;
        .slide-content {
          height: 88%!important;
          overflow-y: hidden!important;
          .subdrivers-list {
            height: 100px!important;
            overflow-y: hidden!important;
            overflow-x: hidden!important;
          }
        }
        .slide-actions {
          height: 12%!important;
        }
      }
      .v-card {
        height: 350px!important;
      }
    }
  }
}

.caseResolution {
   thead {
      th {
        color:rgba(0,0,0,0.9) !important;
        font-size:14px !important;
      }
   }
}
#monthwise_art {
  height: 360px!important;
  width: 95%!important;
}
.monthwise_art {
  &.v-card {
    height: 450px!important;
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
</style>
<style lang="scss">
.dropdown-chip {
  height: 32px;
}
.assignee {
  &.theme--light {
    &.v-text-field {
      .v-input__control {
        .v-input__slot {
          &:before {
            border: 0px!important;
          }
          .v-select__slot {
            border: 1px solid rgba(0,0,0,0.42)!important;
            border-radius: 8px!important;
            padding: 4px 4px!important;
            .v-select__selections {
              .v-select__selection {
                // display: contents!important;
              }
            }
          }
        }
      }
    }
  }
}
.custom-dashboard-tabs {
  &.disengaged-list-active {
    .v-window {
      .v-window__container--is-active {
        overflow: inherit!important;
      }
    }
  }
}
.imgbck {
  background-image: url(https://s3.ap-south-1.amazonaws.com/hirexp/company/logo/company_logo_2_1580601848.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Expires=604800&X-Amz-Credential=AKIAIADRQWQ2QOMSEPCA%2F20200402%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Date=20200402T110629Z&X-Amz-Signature=c82a6382c2396f2f5819ed65386a57c807e0e5cffa3e00466a9ba5e25c02cd6e);
}
</style>
