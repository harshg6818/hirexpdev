<template>
  <div class="emp-dashboard-wrap">
    <div class="emp-dash-divider"></div>
    <div class="top-nav-card">
      <div class="left-side">
        <div
          class="emp-back"
          :class="activeEmployee.last_chat_action_status !== 'Na' ||
          activeEmployee.user_completed_session_count > 0 ? 'pt-2': ''"
        >
          <v-btn text icon color="#6f64b0" @click="goBackToEmpList">
            <v-icon>fas fa-arrow-left</v-icon>
          </v-btn>
        </div>
        <div
          class="emp-dash-nav cursor-pointer hover-link"
          :class="activeView === 'overview' ? 'active' : ''"
          @click="activeView = 'overview';loadEmpOverview();"
        >
          <div
            :class="activeEmployee.last_chat_action_status !== 'Na' ||
            activeEmployee.user_completed_session_count > 0 ? 'pt-3': ''"
          >
            Overview
          </div>
        </div>
        <div
          class="emp-dash-nav cursor-pointer hover-link"
          :class="activeView === 'chat' ? 'active' : ''"
          @click="activeView = 'chat';loadEmpChat();"
        >
          <div
            :class="activeEmployee.last_chat_action_status !== 'Na' ||
            activeEmployee.user_completed_session_count > 0 ? 'pt-3': ''"
          >
            Chat
          </div>
        </div>
        <div
          class="emp-dash-nav cursor-pointer hover-link"
          :class="activeView === 'profile' ? 'active' : ''"
          @click="activeView = 'profile';onGetEmployees()"
        >
          <div
            :class="activeEmployee.last_chat_action_status !== 'Na' ||
            activeEmployee.user_completed_session_count > 0 ? 'pt-3': ''"
          >
            Profile
          </div>
        </div>
      </div>
      <div class="right-side">
        <div v-if="activeEmployee.last_chat_action_status !== 'Na'">
          <div
            v-if="activeEmployee.last_chat_action_status"
            class="text-center"
          >
            Resolution status
          </div>
          <v-menu offset-y
            max-height="300"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              slot="activator"
              v-bind="attrs"
              v-on="on"
              :color="getStatusColor"
              small
              outlined
            >
              <span v-if="activeEmployee.last_chat_action_status">
                {{activeEmployee.last_chat_action_status}}
              </span>
              <span v-else>
                Resolution status
              </span>
              &nbsp;
              <span style="position:relative">
                <v-icon small>fas fa-sort-down</v-icon>
              </span>
            </v-btn>
          </template>
            <v-list>
              <v-list-item
                v-for="(action, index) in actionStatus[activeEmployee.last_chat_action_status]"
                :key="index"
                @click="action.action(action.dialog, action.permission)"
              >
                <v-list-item-title>
                  <span style="position:relative">
                    <v-icon small>{{action.icon}}</v-icon>
                  </span>
                  &nbsp;{{action.text}}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <!-- <div v-if="activeEmployee.user_completed_session_count > 0"
          :class="!activeEmployee.last_chat_assignedTo_display_name ? 'pt-3 mt-1': ''"
        > -->
        <div v-if="activeEmployee.user_completed_session_count > 0">
          <div
            class="text-center"
            v-if="activeEmployee.user_completed_session_count > 0"
          >
            Assigend To
          </div>
          <v-menu offset-y
            max-height="300"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              slot="activator"
              v-bind="attrs"
              v-on="on"
              color="#6f64b0"
              small
              outlined
            >
              <span v-if="activeEmployee.last_chat_assignedTo_display_name">
                {{activeEmployee.last_chat_assignedTo_display_name}}
              </span>
              <span v-else>
                Not Assigned
              </span>
              &nbsp;
              <span style="position:relative">
                <v-icon small>fas fa-sort-down</v-icon>
              </span>
            </v-btn>
          </template>
            <v-list>
              <v-list-item
                v-if="activeEmployee.last_chat_assignedTo_display_name"
                @click="updateAssignedTo(null)"
              >
                <v-list-item-title>
                  Remove assignee
                </v-list-item-title>
              </v-list-item>
              <v-divider
                v-if="activeEmployee.last_chat_assignedTo_display_name"
              ></v-divider>
              <v-list-item
                v-for="(a,index) in assignedToList" :key="index"
                @click="updateAssignedTo(a.id)"
              >
                <v-list-item-title>
                  {{a.text}}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div
          :class="activeEmployee.last_chat_action_status !== 'Na' ||
          activeEmployee.user_completed_session_count > 0 ? 'pt-3 mt-2': ''"
        >
          <v-btn
            slot="activator"
            color="#6f64b0"
            small
            outlined
            @click.stop="openDialog('Acknowledge', ['acknowledge_chat'])"
          >
            <v-icon small>fas fa-check-square</v-icon>
            &nbsp;Acknowledge
          </v-btn>
        </div>
        <div
          :class="activeEmployee.last_chat_action_status !== 'Na' ||
          activeEmployee.user_completed_session_count > 0 ? 'pt-3 mt-2': ''"
        >
          <v-btn
            slot="activator"
            color="#6f64b0"
            small
            outlined
            @click.stop="openDialog('OneOnOne', ['schedule_invite'])"
          >
            <v-icon small>flaticon-012-meeting</v-icon>
            &nbsp;Schedule Meeting
          </v-btn>
        </div>
        <div
          :class="activeEmployee.last_chat_action_status !== 'Na' ||
          activeEmployee.user_completed_session_count > 0 ? 'pt-3 mt-2': ''"
        >
          <v-btn
            slot="activator"
            color="#6f64b0"
            small
            outlined
            @click.stop="openDialog('EmailEmployee', ['send_email'])"
          >
            <v-icon small>fas fa-envelope</v-icon>
            &nbsp;Email
          </v-btn>
        </div>
        <div
          :class="activeEmployee.last_chat_action_status !== 'Na' ||
          activeEmployee.user_completed_session_count > 0 ? 'pt-3 mt-1': ''"
        >
          <v-menu offset-y
            :close-on-content-click="false"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              slot="activator"
              color="#6f64b0"
              dark
              small
              text
              icon
            >
              <v-icon small>fas fa-ellipsis-v</v-icon>
            </v-btn>
          </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>Amara interaction</v-list-item-title>
                <v-list-item-action>
                  <v-switch
                    v-model="activeEmployee.interactions_active"
                    color="success"
                    @change="
                    updateAmaraStatus(activeEmployee.interactions_active, ['manage_employee'])"
                  ></v-switch>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                v-if="activeEmployee.high_potential_emp"
                @click.stop="openDialog('HipoEmployee', ['manage_employee'])"
              >
                <v-list-item-title>
                  <v-icon small color="#6f64b0">fas fa-star</v-icon>
                  Unmark as high potential
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="!activeEmployee.high_potential_emp"
                @click.stop="openDialog('HipoEmployee', ['manage_employee'])"
              >
                <v-list-item-title>
                  <v-icon small color="#6f64b0">far fa-star</v-icon>
                  Mark as high potential
                </v-list-item-title>
              </v-list-item>
              <!-- <v-list-tile
                v-if="activeEmployee.interactions_active"
                @click.stop="updateAmaraStatus(false, ['manage_employee'])"
              >
                <v-list-tile-title>
                  <v-icon small color="#6f64b0">fas fa-user-times</v-icon>
                  Disable Amara's chat
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile
                v-if="!activeEmployee.interactions_active"
                @click.stop="updateAmaraStatus(true, ['manage_employee'])"
              >
                <v-list-tile-title>
                  <v-icon small color="#6f64b0">fas fa-user-check</v-icon>
                  Enable Amara's chat
                </v-list-tile-title>
              </v-list-tile> -->
              <v-list-item
                @click.stop="openDialog('SMSEmployee', ['send_sms'])"
              >
                <v-list-item-title>
                  <v-icon small color="#6f64b0">fas fa-comment</v-icon>
                  Send SMS
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                @click.stop="openDialog('CallEmployee')"
              >
                <v-list-item-title>
                  <v-icon small color="#6f64b0">fas fa-phone</v-icon>
                  Call Employee
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
    <!-- emp overview -->
    <v-container fluid class="empdashboard" v-if="activeView === 'overview'">
      <div class="d-flex flex-row">
        <!-- first row of emp dash -->
        <v-flex xs4 class="mr-3">
          <div class="d-flex flex-column">
            <v-flex xs12>
              <v-container class="pa-0">
                <div class="emp-profile-card-wrap d-flex flex-column">
                  <v-flex>
                    <div class="d-flex flex-row">
                      <v-flex xs4></v-flex>
                      <v-flex xs4 class="text-center">
                        <div class="emp-profile">
                          <div class="emp-profile-img"
                            :style="`background-image: url(${getImgUrl('male-avatar')})`"
                          >
                          </div>
                        </div>
                      </v-flex>
                      <v-flex xs4></v-flex>
                    </div>
                  </v-flex>
                  <v-flex class="emp-body bg-white">
                    <div class="d-flex flex-column">
                      <v-flex xs12 class="text-center">
                        <span v-if="activeEmployee.employee_id">
                          {{activeEmployee.employee_id}}
                        </span>
                        <span v-else>--</span>
                      </v-flex>
                      <v-flex xs12 class="text-center">
                        <span v-if="activeEmployee.display_name">
                          {{activeEmployee.display_name}}
                        </span>
                        <span v-else>--</span>
                      </v-flex>
                    </div>
                  </v-flex>
                  <v-flex class="emp-footer text-center">
                    <div class="d-flex flex-row">
                      <v-flex xs4 class="chat-stats">
                        <div class="d-flex flex-column">
                          <v-flex class="chat-title">Total Chats Initiated</v-flex>
                          <v-flex class="chat-count">
                            <span v-if="activeEmployee.user_session_count">
                              {{activeEmployee.user_session_count}}
                            </span>
                            <span v-else>0</span>
                          </v-flex>
                        </div>
                      </v-flex>
                      <v-flex xs4 class="chat-stats two">
                        <div class="d-flex flex-column">
                          <v-flex class="chat-title">Chats in Progress</v-flex>
                          <v-flex class="chat-count">
                            <span v-if="activeEmployee.user_inProgress_session_count">
                              {{activeEmployee.user_inProgress_session_count}}
                            </span>
                            <span v-else>0</span>
                          </v-flex>
                        </div>
                      </v-flex>
                      <v-flex xs4 class="chat-stats three">
                        <div class="d-flex flex-column">
                          <v-flex class="chat-title">Chats Completed</v-flex>
                          <v-flex class="chat-count">
                            <span v-if="activeEmployee.user_completed_session_count">
                              {{activeEmployee.user_completed_session_count}}
                            </span>
                            <span v-else>0</span>
                          </v-flex>
                        </div>
                      </v-flex>
                    </div>
                  </v-flex>
                </div>
              </v-container>
            </v-flex>

            <!-- activity card -->
            <v-flex xs12 class="mt-3 pt-2">
              <v-container class="pa-0">
                <div class="activity-card-wrap">
                  <div class="card-heading d-flex flex-row">
                    <v-flex xs4 class="text-left pl-3 pt-3">
                      Employee
                    </v-flex>
                    <v-flex xs8>
                      <div class="d-flex flex-row">
                        <v-flex>
                          <v-btn
                            text
                            color="primary"
                            class="elevation-0"
                            @click="activeEmpCardView = 'activity';loadEmpActivity()"
                            :class="activeEmpCardView === 'activity' ? 'active' : ''"
                          >
                            <div>
                              Activity
                            </div>
                          </v-btn>
                        </v-flex>
                        <v-flex>
                          <v-btn
                            text
                            color="primary"
                            class="elevation-0"
                            @click="activeEmpCardView = 'comment'"
                            :class="activeEmpCardView === 'comment' ? 'active' : ''"
                          >
                            <div>
                              Comment
                            </div>
                          </v-btn>
                        </v-flex>
                      </div>
                    </v-flex>
                  </div>
                  <div class="d-flex flex-row">
                    <v-flex class="card-body">
                      <SingleEmployeeTimeline
                        ref="SingleEmployeeTimeline"
                        v-if="activeEmpCardView === 'activity'"
                      >
                      </SingleEmployeeTimeline>
                    </v-flex>
                  </div>
                </div>
              </v-container>
            </v-flex>
          </div>
        </v-flex>

        <!-- second row of emp dash -->
        <v-flex xs8 class="ml-3">
          <v-container fluid class="bg-white emp-dash-second-col">
            <div class="d-flex flex-column">
              <v-flex xs12 class="pt-2 emp-stats">
                <v-container fluid class="pa-0">
                  <div class="d-flex flex-row">
                    <v-flex class="pb-4">
                      <div class="stats-heading">
                        Employee stats
                      </div>
                    </v-flex>
                  </div>
                  <div class="d-flex flex-row">
                    <v-flex xs4>
                      <v-container fluid class="pa-0">
                        <div class="d-flex flex-column">
                          <v-flex xs4 class="text-center">
                            <div class="stats-icon one"
                              :style="{
                                background: `linear-gradient(0deg,
                                ${getEngagementScore()}24 0%, #ffffff 100%)`}"
                            >
                              <!-- <v-icon>fas fa-arrow-left</v-icon> -->
                              <span class="score">
                                <span class="value">
                                  {{activeEmployee.engagement_score}}/5
                                </span>
                              </span>
                            </div>
                          </v-flex>
                          <v-flex xs8 class="pt-2 pl-3">
                            <div class="stat-title">Engagement score</div>
                            <div class="black--text caption">
                              {{getEngagement(activeEmployee.engagement_score)}}
                            </div>
                          </v-flex>
                        </div>
                      </v-container>
                    </v-flex>
                    <v-flex xs4>
                      <v-container fluid class="pa-0">
                        <div class="d-flex flex-row">
                          <v-flex xs4 class="text-center">
                            <div class="stats-icon">
                              <v-icon v-if="activeEmployee.mood === 0">fas fa-arrow-left
                              </v-icon>
                              <div class="emp-mood">
                                <div
                                  v-if="activeEmployee.mood > 0"
                                  :style=
                                  "`background-image: url(${getImgUrl(activeEmployee.mood)})`"
                                  class="emp-mood-image">
                                </div>
                              </div>
                            </div>
                          </v-flex>
                          <v-flex xs8 class="pt-2 pl-3">
                            <div class="stat-title">Mood</div>
                            <div class="black--text caption">
                              {{activeEmployee.mood}}
                            </div>
                          </v-flex>
                        </div>
                      </v-container>
                    </v-flex>
                    <v-flex xs4>
                      <v-container fluid class="pa-0">
                        <div class="d-flex flex-row">
                          <v-flex xs4 class="text-center">
                            <div class="stats-icon three">
                              <v-icon>fas fa-arrow-left</v-icon>
                            </div>
                          </v-flex>
                          <v-flex xs8 class="pt-2 pl-3">
                            <div class="stat-title">Main 3</div>
                            <div class="black--text caption">
                              Sub 3
                            </div>
                          </v-flex>
                        </div>
                      </v-container>
                    </v-flex>
                  </div>
                </v-container>
              </v-flex>
              <v-flex xs12 class="emp-quote mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Unde magnam, explicabo praesentium dolores quam, quaerat,
                ipsa consequatur numquam reprehenderit perferendis nobis
              </v-flex>
              <v-flex xs12 class="pt-2">
                <v-container fluid class="pa-0">
                  <div class="d-flex flex-row flex-wrap"
                  >
                    <v-flex xs6 class="vibe-graph-wrap">
                      <div class="d-flex flex-column">
                        <v-flex xs12>
                          <div class="py-3 text-left vibe-heading">
                            Employee Vibe Over Time
                          </div>
                        </v-flex>
                        <v-flex xs12>
                          <v-container fluid class="pa-0">
                            <div class="vibe-chart pt-3">
                              <div
                                class="d-flex flex-row flex-wrap"
                                v-if="activeEmployee &&
                                activeEmployee.user_completed_session_mood &&
                                activeEmployee.user_completed_session_mood.length > 0"
                              >
                                <vue-anychart id="vibeGraph" class="vibeGraph" />
                              </div>
                              <div v-else class="vibe-graph-wrap pt-3 d-flex flex-row">
                                <v-flex class="mt-3 pt-2">
                                  <strong class="body-2 font-weight-bold grey--text">
                                    Not enough data to generate analysis
                                  </strong>
                                </v-flex>
                              </div>
                            </div>
                          </v-container>
                        </v-flex>
                      </div>
                    </v-flex>
                    <v-flex xs6 class="drivers-wrap">
                      <div class="d-flex flex-column" v-if="activeEmployee &&
                        activeEmployee.latest_session_driver &&
                        Object.keys(activeEmployee.latest_session_driver).length > 0"
                      >
                        <v-flex xs12 class="drivers-good pl-3 pt-3 pb-1">
                          <div class="driver-analysis-card">
                            <div class="driver-title">You're doing great with</div>
                            <div class="driver-body">
                              <div v-for="(d,index) in getDriverAnalysis('good')"
                                :key="index"
                                class="drivers-list"
                              >
                                <div class="d-flex flex-row">
                                  <v-flex xs10 class="pl-2" style="word-break: break-word;">
                                    {{d.title}}
                                  </v-flex>
                                  <v-flex
                                    xs2
                                    class="text-center"
                                    :style="`color:${getColor(d.value.toFixed(1))}`"
                                  >
                                    {{d.value.toFixed(1)}}
                                  </v-flex>
                                </div>
                              </div>
                            </div>
                          </div>
                        </v-flex>
                        <v-flex xs12 class="drivers-bad pl-3 pt-3 pb-1">
                          <div class="driver-analysis-card">
                            <div class="driver-title">Improve Your Focus On</div>
                            <div class="driver-body">
                              <div v-for="(d,index) in getDriverAnalysis('bad')" :key="index"
                              class="drivers-list">
                                <div class="d-flex flex-row">
                                  <v-flex xs10 class="pl-2" style="word-break: break-word;">
                                    {{d.title}}
                                  </v-flex>
                                  <v-flex
                                    xs2
                                    class="text-center"
                                    :style="`color:${getColor(d.value.toFixed(1))}`"
                                  >
                                    {{d.value.toFixed(1)}}
                                  </v-flex>
                                </div>
                              </div>
                            </div>
                          </div>
                        </v-flex>
                      </div>
                      <div class="d-flex flex-row align-center fill-height" v-else>
                        <v-flex xs12 class="text-center pt-2">
                          <strong class="body-2 font-weight-bold grey--text">
                            Not enough data to generate analysis
                          </strong>
                        </v-flex>
                      </div>
                    </v-flex>
                  </div>
                </v-container>
              </v-flex>
              <v-flex xs12 class="pt-2 emp-driver-trend">
                <v-container fluid class="pa-0">
                  <div class="d-flex flex-row">
                    <v-flex class="py-4">
                      <div class="driver-heading">
                        Drivers Trend
                      </div>
                    </v-flex>
                  </div>
                  <div class="d-flex flex-row">
                    <v-flex xs12>
                      <div class="milestone-heatmap">
                        <table>
                          <tbody>
                            <tr class="heatmap-head">
                              <th class="driver-header milestones">
                                <span>Milestones</span>
                              </th>
                              <th v-for="(mile, k) in headers" :key="k">
                                {{mile.text}}
                              </th>
                            </tr>
                            <tr class="heatmap-body" v-for="(t, k) in tableAnalysis" :key="k">
                              <td class="driver-score ma-0 milestones">{{t.milestone}}</td>
                              <td
                                v-for="(driver,key) in roles" :key="key"
                                class="text-center"
                                :style="`background-color:${getColor(t[driver])};
                                  color:${getColor(t[driver]) !== '#0000000a'? 'white': 'black'};`"
                              >
                                <span class="driver-score"
                                  v-if="t[driver] >= 0"
                                >
                                  {{ t[driver] }}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </v-flex>
                  </div>
                </v-container>
              </v-flex>
            </div>
          </v-container>
        </v-flex>
      </div>

      <div class="mb-0 d-flex flex-row flex-wrap">
        <v-container fluid class="emp-last-Transcript px-0">
          <div class="" style="border-right: 0px;width:100%;max-width:100%;height:unset;background-color:#fff;border-radius: 25px;">
            <p class="pa-3 score-card text-capitalize text-center" style="font-weight:bold"> Last Chat Transcript
              <span v-if="activeEmployee.latest_session_driverwise_subdrivers && activeEmployee.latest_session_driverwise_subdrivers.stage_title">
                ( At {{activeEmployee.latest_session_driverwise_subdrivers.stage_title}} )
              </span>
            </p>
            <div v-if="activeEmployee && activeEmployee.user_latest_session_interactions" class="w-100">
              <div class="response-list pb-3">
                <div
                  :id="`response-${i}`"
                  v-for="(t, i) in activeEmployee.user_latest_session_interactions"
                  class="mb-0 px-3 d-flex flex-row" :key="i"
                >
                  <div class="active-response w-100"
                    v-if="!t.parent_interaction_id"
                    style="border-bottom: 1px solid lightgrey;padding: 7px;"
                  >
                    <div class="d-inline">
                      <strong> Question : &nbsp; </strong> {{ t.formatted_question_text }}
                    </div> <br/>
                    <div class="d-inline">
                      <strong> Answer : &nbsp; &nbsp; </strong> {{ t.formatted_response_text }}
                    </div>
                    <div class="" v-if="activeEmployee.user_latest_session_interactions[i+1] &&
                      activeEmployee.user_latest_session_interactions[i+1].parent_interaction_id &&
                      activeEmployee.user_latest_session_interactions[i+1].parent_interaction_id === t.id"
                    >
                      <div class="d-inline">
                        <strong> Reason : &nbsp; &nbsp; </strong> {{ activeEmployee.user_latest_session_interactions[i+1].formatted_response_text }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row flex-wrap align-center justify-center fill-height" v-else style="height:500px">
              <v-flex class="text-center py-5">
                <strong class="body-2 font-weight-bold grey--text">
                  Not enough data to generate analysis
                </strong>
              </v-flex>
            </div>
          </div>
        </v-container>
      </div>
    </v-container>

    <!-- emp chat -->
    <v-container
      v-if="activeView === 'chat'"
      fluid
      class="empChats"
    >
      <LifecycleTranscript ref="LifecycleTranscript" />
    </v-container>

    <!-- emp chat -->
    <v-container
      v-if="activeView === 'profile'"
      fluid
      class="empProfile"
    >
      <singleEmployeeProfile></singleEmployeeProfile>
    </v-container>

    <!-- dialogs -->
    <OneOnOne ref="OneOnOne" @getEmployee="onGetEmployees" />
    <Acknowledge ref="Acknowledge" @getEmployee="onGetEmployees" />
    <EmailEmployee ref="EmailEmployee" @getEmployee="onGetEmployees" />
    <SMSEmployee ref="SMSEmployee" @getEmployee="onGetEmployees" />
    <hipoEmployee ref="HipoEmployee" @getEmployee="onGetEmployees"></hipoEmployee>
  </div>
</template>

<script>
// import { VTooltip, VSwitch } from 'vuetify';
import { mapState } from 'vuex';
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import Anychart from 'anychart';
import axios from 'axios';
import VueAnychart from '../../analytics/VueAnychart';

import SingleEmployeeTimeline from './single-employee-timeline';
import LifecycleTranscript from '../../elements/ChatTranscript';
import SingleEmployeeProfile from './single-employee-profile';

import OneOnOne from '../dialogs/OneOnOne';
import Acknowledge from '../dialogs/Acknowledge';
import EmailEmployee from '../dialogs/EmailEmployee';
import SMSEmployee from '../dialogs/SMSEmployee';
import HipoEmployee from '../dialogs/hipo-employee';

export default {
  name: 'SingleEmployeeDashboard',

  components: {
    // VTooltip,
    // VSwitch,
    VueAnychart,
    SingleEmployeeTimeline,
    LifecycleTranscript,
    SingleEmployeeProfile,
    OneOnOne,
    Acknowledge,
    EmailEmployee,
    SMSEmployee,
    HipoEmployee
  },

  props: {
    assignedToList: {
      required: true,
      type: Array
    }
  },

  data () {
    return {
      activeView: 'overview',
      activeEmpCardView: 'activity',
      headers: [
        {
          text: 'Work-life Integration',
          sortable: false
        },
        {
          text: 'Rewards & Recognition',
          sortable: false
        },
        {
          text: 'Career Opportunities',
          sortable: false
        },
        {
          text: 'Culture',
          sortable: false
        },
        {
          text: 'Leadership',
          sortable: false
        },
        {
          text: 'Performance Management',
          sortable: false
        }
      ],
      roles: ['Work-life Integration', 'Rewards & Recognition', 'Career Opportunities', 'Culture', 'Leadership', 'Performance Management'],
      // roles: [],
      tableAnalysis: [],
      heatMapData: [],
      table: {
        sortBy: 'milestone_name_asc',
        descending: false,
        totalItems: 0
      },
      driverWidth: 20,
      actionStatus: {
        open: [
          {
            text: 'Acknowledge Chat',
            icon: 'fas fa-check-square',
            status: 'acknowledged',
            dialog: 'Acknowledge',
            action: this.openDialog,
            permission: ['acknowledge_chat']
          }, {
            text: 'Schedule meeting',
            icon: 'flaticon-012-meeting',
            status: 'scheduled',
            dialog: 'OneOnOne',
            action: this.openDialog,
            permission: ['schedule_invite']
          }, {
            text: 'Work In Progress',
            icon: 'flaticon-047-conversation',
            status: 'inProgress',
            dialog: 'inProgress',
            action: this.updateStatus,
            permission: ['change_status']
          }, {
            text: 'Resolved',
            icon: 'fas fa-check',
            status: 'resolved',
            dialog: 'resolved',
            action: this.updateStatus,
            permission: ['change_status']
          }
        ],
        acknowledged: [
          {
            text: 'Schedule meeting',
            icon: 'flaticon-012-meeting',
            status: 'scheduled',
            dialog: 'OneOnOne',
            action: this.openDialog,
            permission: ['schedule_invite']
          }, {
            text: 'Resolved',
            icon: 'fas fa-check',
            status: 'resolved',
            dialog: 'resolved',
            action: this.updateStatus,
            permission: ['change_status']
          }
        ],
        scheduled: [
          {
            text: 'Acknowledge Chat',
            icon: 'fas fa-check-square',
            status: 'acknowledged',
            dialog: 'Acknowledge',
            action: this.openDialog,
            permission: ['acknowledge_chat']
          }, {
            text: 'Resolved',
            icon: 'fas fa-check',
            status: 'resolved',
            dialog: 'resolved',
            action: this.updateStatus,
            permission: ['change_status']
          }
        ],
        inProgress: [
          {
            text: 'Acknowledge Chat',
            icon: 'fas fa-check-square',
            status: 'acknowledged',
            dialog: 'Acknowledge',
            action: this.openDialog,
            permission: ['acknowledge_chat']
          }, {
            text: 'Schedule meeting',
            icon: 'flaticon-012-meeting',
            status: 'scheduled',
            dialog: 'OneOnOne',
            action: this.openDialog,
            permission: ['schedule_invite']
          }, {
            text: 'Resolved',
            icon: 'fas fa-check',
            status: 'resolved',
            dialog: 'resolved',
            action: this.updateStatus,
            permission: ['change_status']
          }
        ],
        resolved: [
          {
            text: 'Work In Progress',
            icon: 'flaticon-047-conversation',
            status: 'inProgress',
            dialog: 'inProgress',
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
      activeEmployee: state => state.activeEmployee,
      singleEmpView: state => state.singleEmpView
    }),
    getStatusColor () {
      let color = '';
      switch (this.activeEmployee.last_chat_action_status) {
        case 'open':
          color = '#6f64b0';
          break;
        case 'scheduled':
          color = '#37b99c';
          break;
        case 'inProgress':
          color = 'info';
          break;
        case 'resolved':
          color = 'success';
          break;
        case 'acknowledged':
          color = 'deep-orange';
          break;
        default:
          color = '#6f64b0';
      }
      return color;
    }
  },

  watch: {
    activeEmployee: {
      deep: true,
      immediate: true,
      handler () {
        this.loadData();
      }
    }
  },

  methods: {
    loadData () {
      if (this.activeEmployee.user_completed_session_mood &&
        this.activeEmployee.user_completed_session_mood.length > 0
      ) {
        this.getVibeOverTime(this.activeEmployee.user_completed_session_mood);
      }
      if (this.activeView === 'overview') {
        this.loadEmpActivity();
        this.getHeatMapData();
      }
      if (this.activeView === 'chat') {
        this.loadEmpChat();
      }
    },
    getColor (value) {
      let color = '#0000000a';
      if (value) {
        if (value <= 3 && value > 0) {
          color = '#d84a45';
        } else if (value <= 4) {
          color = '#fbc647';
        } else if (value <= 5) {
          color = '#089bab';
        }
      }
      return color;
    },
    getDriverAnalysis (type) {
      const temp = [];
      this.$lodash.each(this.activeEmployee.latest_session_driver, (v, k) => {
        if (type === 'good') {
          if (v >= 4) {
            temp.push({
              title: k,
              value: v
            });
          }
        } else if (type === 'bad') {
          if (v < 4) {
            temp.push({
              title: k,
              value: v
            });
          }
        }
      });
      return temp;
    },
    getImgUrl (pet) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${pet}.png`);
    },
    getEngagementScore () {
      const score = this.activeEmployee.engagement_score;
      let color = '#fff';
      if (score) {
        if (score <= 3) {
          color = '#f44336';
        } else if (score <= 4) {
          color = '#ff9800';
        } else if (score <= 5) {
          color = '#37b99c';
        }
      }
      return color;
    },
    getEngagement (score) {
      let engagement = 'Disengaged';
      if (score) {
        if (score <= 3) {
          engagement = 'Disengaged';
        } else if (score <= 4) {
          engagement = 'Passively engaged';
        } else if (score <= 5) {
          engagement = 'Highly engaged';
        }
      }
      return engagement;
    },
    goBackToEmpList () {
      this.$router.replace({ query: {} });
      this.$store.dispatch('singleEmpView', false);
      this.$emit('getEmployees');
    },
    getVibeOverTime (data) {
      // console.log('wekjfhiwhefh', data);
      this.$lodash.each(data, (v) => {
        // eslint-disable-next-line no-param-reassign
        v.bullet = this.getImgUrl(`${Math.round(v.overall_mood)}`);
        // eslint-disable-next-line no-param-reassign
        v.category = v.stage_title;
      });
      if (this.activeEmployee && this.activeEmployee.user_completed_session_mood.length > 0) {
        setTimeout(() => {
          window.AmCharts.makeChart('vibeGraph', {
            type: 'serial',
            pathToImages: './amcharts3/amcharts/images/',
            svgIcons: false,
            theme: 'light',
            dataProvider: data,
            valueAxes: [{
              labelsEnabled: true,
              minimum: 0,
              maximum: 5,
              autoGridCount: false,
              gridCount: 6,
              gridAlpha: 0,
              dashLength: 10,
              axisAlpha: 0,
              position: 'left'
            }],
            graphs: [{
              customBulletField: 'bullet',
              bulletSize: 30,
              id: 'g1',
              // "balloonText": "[[category]]",
              bullet: 'round',
              labelText: '[[stage__title]]',
              labelPosition: 'bottom',
              lineColor: '#0d2c8d',
              lineThickness: 2,
              type: 'smoothedLine',
              valueField: 'overall_mood'
            }],
            // "chartCursor": {
            //   "categoryBalloonDateFormat": "DD-MMM",
            //   "cursorAlpha": 0,
            //   "cursorColor": "#11998e",
            //   "valueLineEnabled": true,
            //   "valueLineBalloonEnabled": true,
            //   "valueLineAlpha": 0.5,
            //   "fullWidth": true,
            // },
            categoryField: 'createdAt',
            marginRight: 30,
            marginLeft: 70,
            marginTop: 30,
            categoryAxis: {
              parseDates: false,
              dashLength: 10,
              minorGridAlpha: 0,
              minorGridEnabled: true,
              labelFunction: function labelFunction (categoryField) {
                // eslint-disable-next-line no-undef
                return AmCharts.formatDate(new Date(categoryField), 'DD MMMM, YY');
              }
            },
            export: {
              enabled: false
            }
          });
        });
      }
    },
    getHeatMapData () {
      setTimeout(() => {
        this.heatMapData = [];
        this.tableAnalysis = [];
        this.driverWidth = 100 / ((this.roles.length) + 1);
        const driverTrends = this.activeEmployee.user_completed_session_driverwise_subdrivers;
        this.$lodash.each(driverTrends, (milestone) => {
          const temp = {
            milestone: milestone.stage_title
          };
          this.$lodash.each(this.roles, (driver) => {
            if (milestone.session_driverwise_subdrivers[driver]) {
              const driverData = milestone.session_driverwise_subdrivers[driver];
              this.heatMapData.push({
                x: driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2').substr(1),
                y: milestone.stage_title,
                heat: driverData.average
              });
              temp[driver] = driverData.average;
            } else {
              this.heatMapData.push({
                x: driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + driver.replace(/([a-z0-9])([A-Z])/g, '$1 $2').substr(1),
                y: milestone.stage_title,
                heat: 0
              });
              temp[driver] = 0;
            }
          });
          this.tableAnalysis.push(temp);
        });
      }, 100);
    },
    generateHeatMap (data) {
      const chart = Anychart.heatMap(data);
      chart.container('driver-heatmap');
      const labelsX = chart.xAxis().labels();
      const labelsY = chart.yAxis().labels();
      labelsX.fontColor('#000');
      labelsX.fontSize(12);
      labelsX.fontWeight(500);
      labelsX.hAlign('center');
      labelsX.padding(20, 0, 20, 0);
      labelsY.fontColor('#000');
      labelsY.fontSize(12);
      labelsY.fontWeight(500);
      labelsY.hAlign('center');
      labelsY.padding(0, 20, 0, 20);
      labelsX.rotation(-60);
      // tooltip settings
      chart.tooltip().titleFormat('{%y}');
      chart.tooltip().useHtml(true);
      chart.tooltip().format('{%x} : {%heat}');
      chart.maxPointWidth(50);
      const customColorScale = Anychart.scales.ordinalColor();
      customColorScale.ranges([
        { from: 0, to: 0 },
        { from: 0.1, to: 3 },
        { from: 3.1, to: 4 },
        { greater: 4 }
      ]);
      customColorScale.colors(['lightgrey', '#d84a45', '#fbc647', '#089bab']);
      // set the color scale as the color scale of the chart
      chart.colorScale(customColorScale);
      // initiate drawing the chart
      chart.draw();
      this.$forceUpdate();
    },
    loadEmpChat () {
      setTimeout(() => {
        this.$refs.LifecycleTranscript.chat.transcript = [];
        this.$refs.LifecycleTranscript.chat.activeSessionIndex = 1;
        this.$refs.LifecycleTranscript.employee = this.activeEmployee;
        // eslint-disable-next-line max-len
        this.$refs.LifecycleTranscript.getTranscript(false, this.activeEmployee.user_latest_session_interactions);
      }, 500);
    },
    loadEmpActivity () {
      setTimeout(() => {
        if (this.activeEmployee.id) {
          this.$refs.SingleEmployeeTimeline.getTimeline();
        }
      }, 500);
    },
    loadEmpOverview () {
      this.loadData();
      // this.getVibeOverTime(this.activeEmployee.user_completed_session_mood);
    },
    updateAmaraStatus (val, permission) {
      if (this.checkPermission(permission)) {
        axios.patch(`${process.env.VUE_APP_API_URL}users/update/${this.activeEmployee.id}`, {
          interactions_active: val
        }).then((response) => {
          if (response.data.status === 200) {
            this.onGetEmployees();
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Employee updated successfully!'
            });
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to save employee, Please try again later!'
            });
          }
        });
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update status, You don\'t have permission!'
        });
      }
    },
    updateAssignedTo (val) {
      this.updateEmployeeSession(val, 'assign');
    },
    updateEmployeeSession (val, type) {
      const queryParams = {};
      if (type === 'status') {
        queryParams.action_status = val; // for resolution status
      }
      if (type === 'assign') {
        queryParams.assignedTo_id = val; // for assigned to
      }
      axios.patch(`${process.env.VUE_APP_API_URL}session/update/${this.activeEmployee.last_chat_id}`, {
        ...queryParams
      }).then((response) => {
        if (response && response.data.status === 200) {
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee updated sucessfully!'
          });
          this.onGetEmployees();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update status, Please try again later!'
          });
        }
      });
    },
    updateStatus (value, permission) {
      // for update resolution status
      if (this.checkPermission(permission)) {
        this.updateEmployeeSession(value, 'status');
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update status, You don\'t have permission!'
        });
      }
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
    openDialog (type, permission) {
      // console.log('data, type', data, type);
      if (this.checkPermission(permission)) {
        if (type && this.$refs[type]) {
          this.$refs[type].open = true;
          this.$refs[type].employee = this.activeEmployee;
        }
      } else {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to update status, You don\'t have permission!'
        });
      }
    },

    onGetEmployees () {
      this.$emit('changeEmpView', this.activeEmployee.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.emp-dashboard-wrap {
  height: calc(100vh - 60px);
  overflow: hidden;
  background: #eff7f8;
  position: relative;
  transition: 1s ease all;
  .empdashboard {
    height: 95vh;
    transition: 0.5s ease all;
    overflow-y: auto;
    padding: 60px 15px 100px 15px !important;
  }
  .empChats {
    height: 95vh;
    transition: all 1s ease-out .5s;
    padding: 0px 0 35px 0;
    overflow-y: auto;
  }
  .empProfile {
    height: 95vh;
    overflow-y: auto;
    transition: all 1s ease-out .5s;
    padding: 0px 15px 100px 15px !important;
  }
  .emp-dash-divider {
    height: 16px;
  }
  .top-nav-card {
    background: #fff;
    z-index: 2;
    top: 0;
    width: 100%;
    display: flex;
    position: relative;
    justify-content: space-between;
    box-shadow: 0 4px 6px #d4d4d4 !important;
    .left-side {
      display: flex;
      .emp-back {
        border-right: 1px solid rgba(0,0,0,0.1);
        margin-right: 16px;
      }
      .emp-dash-nav {
        padding: 10px;
        font-size: 18px;
        font-weight: 400;
        &.active {
          border-bottom: 4px solid #4c3e9d;
          // transition: .5s ease all;
        }
      }
    }
    .right-side {
      padding-top: 6px !important;
      display: flex;
    }
    // .active {
    //   border-bottom: 3px solid #6f64b0;
    //   transform: scale(1.2);
    //   transition: 0.5s ease all;
    // }
    // .emp-top-actions-wrap {
    //   .v-icon {
    //     font-size: 20px !important;
    //   }
    // }
  }
  .emp-profile-card-wrap {
    height: 230px;
    max-height: 230px;
    min-height: 230px;
    margin-top: 65px;
    border-radius: 25px;
    width: 100%;
    background: #ffffff;
    border: none;
    box-shadow: 0 4px 5px 1px hsla(0,0%,68.6%,.1);
    .emp-profile {
      margin-top: -65px;
      height: 130px;
      width: 130px;
      border-radius: 50%;
      vertical-align: middle;
      border-style: none;
      .emp-profile-img {
        background-size: contain;
        background-repeat: no-repeat;
        height: 100%;
        width: 100%;
      }
    }
    .emp-footer {
      padding: 0 20px;
      .chat-stats {
        .chat-title {
          font-size: 16px;
          font-weight: 400;
        }
        .chat-count {
          font-size: 32px;
          font-weight: 500;
        }
        &.two, &.three {
          border-left: 1px solid rgba(0,0,0,.1);
        }
      }
    }
  }
  .activity-card-wrap {
    height: 625px;
    min-height: 625px;
    max-height: 625px;
    overflow-y: auto;
    border-radius: 25px;
    background: #ffffff;
    box-shadow: 0 4px 5px 1px hsla(0,0%,68.6%,.1);
    .card-heading {
      max-height: 50px;
      min-height: 50px;
      border-bottom: 1px solid rgba(0,0,0,.3);
      .active {
        background: #eff7f8;
        color: #4c3e9d !important;
        border-radius: 12px;
      }
    }
    .card-body {
      height: 570px;
      min-height: 570px;
      max-height: 570px;
      overflow-y: auto;
    }
  }
  .emp-dash-second-col {
    box-shadow: 0 4px 5px 1px hsla(0,0%,68.6%,.1);
    border-radius: 25px;
    .emp-quote {
      // background: #4c3e9d;
      // background: #6f64b0;
      background: rgba(111, 100, 176, 0.9);
      padding: 20px;
      border-radius: 18px;
      // color: #000;
      color: #fff;
      font-weight: 400;
      line-height: 1.5rem;
      letter-spacing: 1px;
    }
    .emp-stats {
      .stats-heading {
        font-size: 24px;
        // font-weight: 500;
        color: #6f64b0;
      }
    }

    .vibe-graph-wrap {
      height: 300px;
      max-height: 300px;
      min-height: 300px;
      .vibe-heading {
        font-size: 24px;
        color: #6f64b0;
      }
      .vibeGraph {
        height: 200px !important;
        width: 100% !important;
      }
    }

    .drivers-wrap {
      height: 300px;
      max-height: 300px;
      min-height: 300px;
      .drivers-good {
        height: 150px;
        max-height: 150px;
        min-height: 150px;
        overflow-y: auto;
        // box-shadow: 0 0 12px 0 rgba(120,146,141,.06);
        // border-radius: 25px;
        .driver-analysis-card {
          .driver-title {
            font-size: 24px;
            color: #6f64b0;
            border-bottom: 1px solid rgba(0,0,0,.1);
          }
          .driver-body {
            .drivers-list {
              padding: 1rem;
              padding-bottom: 0.5rem;
            }
          }
        }
      }
      .drivers-bad {
        height: 150px;
        max-height: 150px;
        min-height: 150px;
        overflow-y: auto;
        // box-shadow: 0 0 12px 0 rgba(120,146,141,.06);
        // border-radius: 25px;
        .driver-analysis-card {
          .driver-title {
            font-size: 24px;
            color: #6f64b0;
            border-bottom: 1px solid rgba(0,0,0,.1);
          }
          .driver-body {
            .drivers-list {
              padding: 1rem;
              padding-bottom: 0.5rem;
            }
          }
        }
      }
    }

    .emp-driver-trend {
      height: 325px;
      max-height: 325px;
      min-height: 325px;
      overflow-y: auto;
      .driver-heading {
        font-size: 24px;
        color: #6f64b0;
      }
    }

    .stats-icon {
      height: 65px;
      width: 65px;
      margin: 0 10px;
      border-radius: 50%;
      position: relative;
      &.one {
        background: #fff;
        .score {
          color: #000;
          display: inline-flex;
          justify-content: space-around;
          padding-top: 14px;
          font-size: 16px;
          .value {
            font-size: 20px;
          }
        }
      }
      &.three {
        background: #6f64b0;
      }
      i {
        position: absolute;
        top: 50%;
        bottom: 50%;
        left: 50%;
        right: 50%;
        color: #ffffff;
      }
      .emp-mood {
        height: 65px;
        width: 65px;
        .emp-mood-image {
          height: 100%;
          width: 100%;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
    }
    .stat-title {
      font-size: 16px;
    }

    // .key-drivers {
    //   max-height: 250px;
    //   min-height: 250px;
    //   overflow-y: auto;
    // }
    // .driver-analysis-card {
    //   box-shadow: 0 4px 5px 1px hsla(0,0%,68.6%,.1);
    //   border-radius: 12px;
    //   .driver-title {
    //     font-size: 16px;
    //     padding: 10px;
    //     font-weight: 500;
    //   }
    //   .driver-body {
    //     padding: 6px;
    //     border-top: 1px solid rgba(0, 0, 0, 0.1);
    //   }
    // }
    .driver-heatmap {
      max-height: 250px;
      min-height: 250px;
      overflow-y: auto;
      height: 250px !important;
      width: 100% !important;
      // margin: 0 auto !important;
    }
    .milestone-heatmap {
      overflow-x: hidden !important;
      overflow-y: hidden !important;
      .heatmap-head {
        th {
          border: 1px solid #f3f1f1;
          color: rgba(0, 0, 0, 0.54);
          // color: #6f64b0;
          padding: 10px;
          border-right: 0;
        }
      }
      .heatmap-body {
        td {
          border: 1px solid #f3f1f1;
          // color: rgba(0, 0, 0, 0.54);
          color: #000;
          padding: 10px;
          border-right: 0;
        }
      }
    }
  }
  .emp-last-Transcript {
    // box-shadow: 0 4px 5px 1px hsla(0,0%,68.6%,.1);
    // border-radius: 25px;
  }
}
</style>

<style lang="scss">
// .milestone-heatmap {
//   .v-table__overflow {
    // width: 740px !important;
    // overflow-x: !important;
    // overflow-y: !important;
//   }
// }
</style>
