<template>
  <v-dialog max-width="700px"
    v-model="open"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        Add a comment to {{employee.user_display_name}}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <Comments ref="Comments" class="ma-2" />
      </v-card-text>
      <v-card-actions align-content-space->
        <v-flex>
          <v-btn color="error" flat @click.stop="open=false;">Close</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import Comments from '../employees/Comments';
// const Comments = () => import(/* webpackChunkName: "Comments" */ '../employees/Comments');

export default {
  name: 'delete',
  components: {
    Comments
  },
  data () {
    return {
      loading: false,
      open: false,
      employee: {}
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {},
  watch: {
    employee () {
      if (this.employee.id) {
        this.$refs.Comments.newNote.user = this.employee.user_id;
        this.$refs.Comments.comments = [];
        this.$refs.Comments.getComments(this.employee.user);
      }
    }
  },
  mounted () {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
