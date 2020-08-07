<template>
  <v-layout row wrap>
    <v-flex xs12 class="add-note">

      <v-timeline dense clipped>
        <v-timeline-item
          fill-dot
          class="white--text mb-5"
          large
        >
          <span slot="icon">
            <v-avatar size="40" :color="getColor(user)">
              <img src="src" alt="alt" v-show="false">
              <span class="white--text caption">{{getAvatar(user.display_name)}}</span>
            </v-avatar>
          </span>

          <at-ta :members="adminUsers" name-key="display_name">
            <template slot="item" slot-scope="s">
              <div class="">
                <v-avatar size="20" :color="getColor(user)">
                  <span class="white--text">{{getAvatar(s.item.display_name)}}</span>
                </v-avatar>
                <span v-text="s.item.display_name"></span>
              </div>
            </template>
            <v-textarea
              v-model="newNote.body"
              :readonly="config.loading"
              maxlength="300"
              rows="1"
              :disabled="config.loading || !checkPermission(['add_note'])"
              :loading="config.loading"
              label="Leave a comment..."
              solo
              flat
              auto-grow
              @keydown.ctrl.enter="validateDetails"
              @keydown.shift.enter="validateDetails"
            >
              <template slot="append">
                <v-btn
                  v-if="!this.editCommentButton"
                  class="mx-0"
                  color="primary"
                  depressed
                  :disabled="config.loading || !checkPermission(['add_note'])"
                  :loading="config.loading"
                  @click="validateDetails"
                >
                  Add Comment
                </v-btn>
                <v-btn
                  v-if="this.editCommentButton"
                  class="mx-0"
                  color="primary"
                  depressed
                  :disabled="config.loading || !checkPermission(['add_note'])"
                  :loading="config.loading"
                  @click="updateComment()"
                >
                  Edit Comment
                </v-btn>
              </template>
            </v-textarea>
          </at-ta>
        </v-timeline-item>

        <v-slide-x-transition
          group
        >
          <v-timeline-item
            v-for="(c, ci) in comments"
            :key="ci"
            class="mb-3"
            color="pink"
            small
          >
            <span slot="icon">
              <v-avatar size="40" :color="getColor(c)">
                <img src="src" alt="alt" v-show="false">
                <span class="white--text">{{getAvatar(c.createdBy_display_name)}}</span>
              </v-avatar>
            </span>
            <v-layout justify-space-between>
              <v-flex xs6>
                <p class="mb-0">
                  <strong>
                    {{c.createdBy_display_name}}
                  </strong>
                  commented
                </p>
                {{c.body}}
              </v-flex>
               <v-flex xs2 pr-2 pt-2 text-xs-left>
                {{dayjs(c.createdAt).from()}}
              </v-flex>
              <v-flex v-for="(a, ac) in c.allowed_actions" :key="ac" xs2 >
                <v-btn style="float:right;" color="primary" v-if="a=='edit_comment'"  @click="editComment(c.id,c.body)" flat icon>
                  <v-icon>fas fa-edit </v-icon>
                </v-btn>
                <v-btn text-xs-left v-if="a=='delete_comment'" @click="deleteComment(c.id)" flat icon color="dark">
                  <v-icon>fas fa-trash</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-timeline-item>
        </v-slide-x-transition>
      </v-timeline>
      <v-card class="pa-3 elevation-0" height="300"
      v-show="comments.length === 0 && !config.initialLoading">
        <v-layout row wrap fill-height align-center justify-center>
          <v-flex text-xs-center>
            <strong class="display-1 font-weight-bold grey--text">
              No comments added yet, Start by adding above.
            </strong>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import At from 'vue-at-fork';
import { mapState, mapActions } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import { VChip, VAvatar, VTextarea } from 'vuetify';
// import dayjs from 'dayjs';
// import AtTa from 'vue-at-fork/dist/vue-at-textarea';

export default {
  name: 'comments',
  components: {
    // ContentLoader
    // VChip,
    // At,
    // AtTa,
    // VAvatar,
    // VTextarea,
  },
  data () {
    return {
      editCommentButton: false,
      companyId: '',
      userID: '',
      employee: {},
      config: {
        loading: false
      },
      newNote: {
        user: '',
        body: '',
        user_tagged: [],
        session: ''
      },
      comments: [],
      action: [],
      canEdit: false,
      canDelete: false
    };
  },
  computed: {
    ...mapState({
      users: state => state.companyUsersList,
      user: state => state.user,
      adminUsers (state) {
        const adminUsers = state.companyAdminsList;
        return adminUsers;
      }
    })
  },
  methods: {
    ...mapActions(['getCompanyUsers', 'getAdminList']),
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
    validateDetails () {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.addNote();
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Fill all the mandatory fields!'
          });
        }
      });
    },
    addNote () {
      this.config.loading = true;
      this.newNote.createdBy = this.user.email;
      // newNote.body = newNote.body.replace(/:[0-9]/g, '');
      axios.post(`${process.env.VUE_APP_API_URL}session/comment/add`, this.newNote).then((response) => {
        this.config.loading = false;
        if (response && response.data) {
          response.data.createdBy_display_name = this.user.display_name;
          this.comments.unshift(response.data);
          this.newNote.body = '';
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Comment added!'
          });
        }
      }, (response) => {
        this.config.loading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to add comment, Please try again later!'
        });
        throw new Error(response);
      });
    },
    editComment (id, body) {
      this.companyId = id;
      this.newNote.body = body;
      this.editCommentButton = true;
    },
    updateComment () {
      this.config.loading = true;
      this.newNote.createdBy = this.user.email;
      // newNote.body = newNote.body.replace(/:[0-9]/g, '');
      axios.patch(`${process.env.VUE_APP_API_URL}session/comment/update/${this.companyId}`, this.newNote).then((response) => {
        this.config.loading = false;
        if (response && response.data) {
          response.data.createdBy_display_name = this.user.display_name;
          this.comments.unshift(response.data);
          this.newNote.body = '';
          this.editCommentButton = false;
          this.updateCommentsList();
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Comment updated!'
          });
        }
      }, (response) => {
        this.config.loading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to add comment, Please try again later!'
        });
        throw new Error(response);
      });
    },
    deleteComment (id) {
      this.config.loading = true;
      this.newNote.createdBy = this.user.email;
      // newNote.body = newNote.body.replace(/:[0-9]/g, '');
      axios.delete(`${process.env.VUE_APP_API_URL}session/comment/delete/${id}`).then((response) => {
        this.config.loading = false;
        if (response && response) {
          this.updateCommentsList();
          this.$store.dispatch('updateSnackbar', {
            color: 'success',
            show: true,
            text: 'Comment deleted!'
          });
        }
      }, (response) => {
        this.config.loading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to delete comment, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getUID (id) {
      this.userID = id;
    },
    updateCommentsList () {
      this.config.initialLoading = true;
      const queryParams = {
        fields: 'createdBy_display_name,createdBy_email,createdBy_profilePicture,body,createdAt,receipt_id,allowed_actions'
      };
      axios.get(`${process.env.VUE_APP_API_URL}session/comment/list/${this.userID}`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          this.comments = response.data.data;
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch comments, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getComments (id) {
      this.config.initialLoading = true;
      const queryParams = {
        fields: 'createdBy_display_name,createdBy_email,createdBy_profilePicture,body,createdAt,receipt_id,allowed_actions'
      };
      axios.get(`${process.env.VUE_APP_API_URL}session/comment/list/${id}`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
        if (response && response.data) {
          this.comments = response.data.data;
        }
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch comments, Please try again later!'
        });
        throw new Error(response);
      });
    },
    getAvatar (n) {
      const name = n.split(' ');
      const avt = `${name[0].charAt(0)}${name[1].charAt(0)}`;
      return avt.toUpperCase();
    },
    getColor (e) {
      let color = 'primary';
      if (e.gender && e.gender === 'female') {
        color = 'pink';
      }
      return color;
    }
  },
  beforeMount () {
    this.getAdminList();
    this.getCompanyUsers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.add-note {
  .v-text-field.v-text-field--enclosed .v-input__prepend-outer,
  .v-text-field.v-text-field--enclosed .v-input__prepend-inner,
  .v-text-field.v-text-field--enclosed .v-input__append-inner,
  .v-text-field.v-text-field--enclosed .v-input__append-outer {
    margin-top: 10px;
  }
}
</style>
