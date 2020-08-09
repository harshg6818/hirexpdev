<template>
  <v-layout row justify-center>
    <v-dialog v-model="bulkWarnDialog" max-width="450px">
      <v-card>
        <v-card-title color="primary" style="display:flex;justify-content: flex-end;">
          <v-icon @click.stop="bulkWarnDialog=false;">fas fa-times</v-icon>
        </v-card-title>
        <v-card-text>
          <div class="warn-icon-wrap">
            <div class="wrap-icon">
              <v-icon>fas fa-exclamation</v-icon>
            </div>
          </div>
          <div class="warn-main-text p2" v-if="sessionEmployeesCount > 0">
            This action is only valid for employee(s)
            who have completed interaction with Amara.
            In this selection only&nbsp;<b>{{sessionEmployeesCount}}</b>&nbsp;employee(s)
            have completed their interations.
            You can continue with <b>{{sessionEmployeesCount}}</b>
            employee(s) or change your selection manually.
          </div>
          <div class="warn-main-text p2" v-if="sessionEmployeesCount === 0">
            This action is only valid for employee(s) who have completed
            interaction with Amara. In this selection, employee(s)
            have not completed their chats.
          </div>
        </v-card-text>
        <v-card-actions v-if="sessionEmployeesCount > 0">
          <v-flex>
            <v-btn class="error--text" flat @click.stop="bulkWarnDialog=false;">Cancel</v-btn>
          </v-flex>
          <v-flex text-xs-right>
            <v-btn color="primary" class="elevation-0 white--text"
              :disabled="sessionEmployeesCount > 0 ? false : true"
              @click.stop="continueWithSessionEmployee()">
              Continue with {{sessionEmployeesCount}} employees
            </v-btn>
          </v-flex>
        </v-card-actions>
        <v-card-actions v-if="sessionEmployeesCount === 0">
          <v-flex v-if="sessionEmployeesCount === 0" style="display:flex;justify-content: center;">
            <v-btn color="primary" @click.stop="bulkWarnDialog=false;">Okay</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BulkactionPrompt',

  data () {
    return {
      bulkWarnDialog: false
    };
  },
  computed: {
    ...mapState({
      sessionEmployeesCount: state => state.sessionEmployeesCount
    })
  }
};
</script>

<style lang="scss" scoped>
.warn-icon-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: -40px;
  .wrap-icon {
    border: 2px solid;
    border-radius: 50%;
    width: 100px;
    color: orange;
    height: 100px;
    padding-top: 36px;
    padding-left: 42px;
    i {
      font-size: 30px;
      color: orange;
    }
  }
}
.warn-main-text {
  font-size:16px;
}
</style>
