<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" scrollable max-width="1000px">
      <v-card>
        <v-card-title>Employees</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <table class="res-table">
            <tr>
              <th>SNo.</th>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Action Status</th>
              <th></th>
            </tr>
            <tr v-for="(r,index) in users" :key="index">
              <td>{{index + 1}}.</td>
              <td>
                <div v-if="r.user_id">
                  {{ getNameByUserId(r.user_id) }}
                </div>
                <div v-if="r.session_id">
                  {{ getNameBySessionId(r.session_id) }}
                </div>
              </td>
              <td>
                <div v-if="r.user_id">
                  {{ getEmailByUserId(r.user_id) }}
                </div>
                <div v-if="r.session_id">
                  {{ getEmailBySessionId(r.session_id) }}
                </div>
              </td>
              <td>
                <div v-if="r.success">
                  Success
                </div>
                <div v-if="r.error">
                  Failure
                </div>
              </td>
              <td class="text-xs-center pa-0 cursor-pointer" >
                <v-btn class="EmployeeName text-capitalize" color="primary"
                  @click.stop="getEmpId(r.user_id || r.session_id)"
                  outline
                  style="height:30px">View
                </v-btn>
              </td>
            </tr>
          </table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" flat @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'SocketResponse',
  props: {
    res: {
      required: false,
      type: [Object, Array],
      default: () => {}
    },
    selectedEmp: {
      required: false,
      tyep: [Object, Array],
      default: () => {}
    }
  },
  data () {
    return {
      response: [],
      dialog: false,
      users: []
    };
  },
  watch: {
    res () {
      this.users = [];
      const temp = this.res.user_response_data || this.res.session_response_data;
      this.$lodash.each(temp, (val) => {
        if (val.success === false) {
          this.users.push(val);
        }
      });
    }
  },
  methods: {
    getNameByUserId (id) {
      const temp = Object.entries(this.selectedEmp);
      let name = '';
      this.$lodash.each(temp, (val) => {
        if (val[1].id === id || val[1].last_chat_id === id) {
          name = val[1].display_name;
        }
      });
      return name;
    },
    getNameBySessionId (id) {
      const temp = Object.entries(this.selectedEmp);
      let name = '';
      this.$lodash.each(temp, (val) => {
        if (val[1].last_chat_id === id) {
          name = val[1].display_name;
        }
      });
      return name;
    },
    getEmailByUserId (id) {
      const temp = Object.entries(this.selectedEmp);
      let email = '';
      this.$lodash.each(temp, (val) => {
        if (val[1].id === id || val[1].last_chat_id === id) {
          email = val[1].email;
        }
      });
      return email;
    },
    getEmailBySessionId (id) {
      const temp = Object.entries(this.selectedEmp);
      let email = '';
      this.$lodash.each(temp, (val) => {
        if (val[1].last_chat_id === id) {
          email = val[1].email;
        }
      });
      return email;
    },
    getEmpId (id) {
      const temp = Object.entries(this.selectedEmp);
      this.$lodash.each(temp, (val) => {
        if (val[1].id === id || val[1].last_chat_id === id) {
          this.viewEmployee(val[1]);
        }
      });
    },
    viewEmployee (id) {
      this.dialog = false;
      this.$emit('viewEmployee', id);
    }
  }
};
</script>

<style lang="scss" scoped>
.res-table {
  th {
    text-align: left;
    padding: 0 18px;
  }
  td {
    padding: 0 20px;
    text-align: left;
  }
}
</style>
