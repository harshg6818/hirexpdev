<template>
  <v-dialog max-width="500px"
    v-model="open"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-text>
        Are you sure you want to delete this member!
      </v-card-text>
      <v-card-actions align-content-space->
        <v-flex>
          <v-btn color="error" flat @click.stop="open=false;">Close</v-btn>
        </v-flex>
        <v-flex text-xs-right>
          <v-btn color="error" @click.stop="deleteMember()">Delete</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'delete',
  components: {},
  data () {
    return {
      open: false,
      member: {}
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    deleteMember () {
      axios.patch(`${process.env.VUE_APP_API_URL}users/update/${this.member.id}`, {
        stage: 'deleted'
      }).then((response) => {
        this.refreshing = false;
        if (response && response.data && response.data.status === 200) {
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Member deleted!'
          });
          this.open = false;
        } else {
          this.refreshing = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to delete member, Please try again later!'
          });
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to delete member, Please try again later!'
        });
        throw new Error(response);
      });
    }
  },
  beforeMount () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
