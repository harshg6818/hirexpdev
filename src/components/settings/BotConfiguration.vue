<template>
  <v-layout row wrap px-2 py-4>
    <v-flex sm9 px-2>
      <v-card class="elevation-0 no-border">
        <v-subheader class="pr-0">
          <v-flex>
            <strong>
              Amara Configurations
            </strong>
          </v-flex>
          <v-flex text-sm-right>
            <!-- <v-btn icon flat color="primary"
              v-show="!config.editable"
              @click="config.editable=true;"
            >
              <v-icon small>fas fa-edit</v-icon>
            </v-btn>
            <v-btn flat color="success"
              v-show="config.editable"
              :loading="config.loading"
              :disabled="config.loading"
              @click="saveuser();"
            >
              <v-icon>save</v-icon>Save
            </v-btn> -->
          </v-flex>
        </v-subheader>
        <v-card-text>
          <v-text-field
            maxlength="300"
            v-model="settings.name"
            class="elevation-0 grey--text text--lighten-2"
            name="interactionText"
            :error-messages="errors.collect('interactionText')"
            label="What should bot say?"
            autofocus
            data-vv-as="interaction text"
            v-validate="'required'"
            outline
          >
          </v-text-field>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex sm3 px-2 class="">
      <v-card class="elevation-0">
        <v-subheader class="pr-0">
          <v-flex>
            <strong>
              User details
            </strong>
          </v-flex>
          <v-flex text-sm-right>
            <v-btn icon flat color="primary"
              v-show="!config.editable"
              @click="config.editable=true;"
            >
              <v-icon small>fas fa-edit</v-icon>
            </v-btn>
            <v-btn flat color="success"
              v-show="config.editable"
              :loading="config.loading"
              :disabled="config.loading"
              @click="saveuser();"
            >
              <v-icon>save</v-icon>Save
            </v-btn>
          </v-flex>
        </v-subheader>
        <v-layout row wrap v-show="config.editable" class="px-3">
          <v-flex xs12>
            <v-text-field
              single-line
              name="first_name"
              label="First name"
              v-model="user.first_name"
              id="id"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              single-line
              name="first_name"
              label="First name"
              v-model="user.last_name"
              id="id"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              single-line
              name="email"
              label="Email"
              v-model="user.email"
              id="id"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              single-line
              name="phone"
              label="Phone"
              v-model="user.phoneNumber"
              id="id"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="config.joining_date"
              :nudge-right="40"
              :return-value.sync="user.joining_date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="user.joining_date"
                label="Pick joining date"
                single-line
                readonly
              ></v-text-field>
              <v-date-picker v-model="user.joining_date"
              @input="$refs.menu.save(user.joining_date)"></v-date-picker>

            </v-menu>
          </v-flex>
        </v-layout>
        <v-list two-line subheader class="transparent" v-show="!config.editable">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                {{user.first_name}} {{user.last_name}}
              </v-list-tile-title>
              <v-list-tile-sub-title>Name</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{user.email}}</v-list-tile-title>
              <v-list-tile-sub-title>Email</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{user.phoneNumber}}</v-list-tile-title>
              <v-list-tile-sub-title>Phone</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-if="user.joining_date">
                {{dayjs(user.joining_date).from()}}
              </v-list-tile-title>
              <v-list-tile-title v-if="!user.joining_date">NA</v-list-tile-title>
              <v-list-tile-sub-title>Joining date</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
// import { VChip, VMenu, VSubheader } from 'vuetify';

export default {
  name: 'settings',
  // components: {
  //   VChip,
  //   VMenu,
  //   VSubheader,
  // },
  data () {
    return {
      config: {
        editable: false,
        initialLoading: true,
        initialLoadingFilters: true,
        actions: [
          {
            title: 'Delete',
            icon: 'fas fa-trash',
            dialog: 'deleteuser',
            action: this.openDialog
          }
        ]
      },
      settings: {}
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    openDialog (data, type) {
      if (type && this.$refs[type]) {
        this.$refs[type].open = true;
      }
    },
    update () {},
    getBotconfig (id) {
      const queryParams = {
        fields: 'bio,location,birthDate,alternateEmail,phoneNumber,profilePicture,gender,education,experience,skills,joining_date,designation,designationChanged,designationChangeDate,grade,department,sub_department,manager,managerChanged,managerChangeDate,function,functionChanged,functionChangeDate,team,teamChanged,teamChangeDate,teamHead,business,businessHead,hrbp,status,mood,createdAt,lastUpdated,first_name,last_name,email'
      };
      axios.get(`${process.env.VUE_APP_API_URL}users/details/${id}`, {
        params: queryParams
      }).then((response) => {
        this.config.initialLoading = false;
      }, (response) => {
        this.config.initialLoading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch user, Please try again later!'
        });
        throw new Error(response);
      });
    }
  },
  beforeMount () {
    if (this.$route.params && this.$route.params.userId) {
      this.getBotconfig(this.$route.params.userId);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
