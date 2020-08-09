<template>
  <div>
    <v-dialog
      v-model="open"
      max-width="50%"
    >
      <v-card>
        <v-card-text>
          <span style="font-size:20px;">Are you sure ?</span> <br>
          <span v-if="!employee.high_potential_emp">
            Do you want to mark this employee as high potential employee.
          </span>
          <span v-if="employee.high_potential_emp">
            Do you want to unmark this employee as high potential employee.
          </span>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="error"
            flat="flat"
            @click="open = false"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="updateHighpotential()"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HipoEmployee',

  data () {
    return {
      open: false,
      employee: []
    };
  },

  methods: {
    updateHighpotential () {
      axios.patch(`${process.env.VUE_APP_API_URL}users/update/${this.employee.id}`, {
        high_potential_emp: !this.employee.high_potential_emp
      }).then((response) => {
        if (response && response.data) {
          this.open = false;
          this.$emit('getEmployee');
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee updated!'
          });
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to update, Please try again later!'
          });
        }
      });
    }
  }
};
</script>
