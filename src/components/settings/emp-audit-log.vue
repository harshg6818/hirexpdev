<template>
  <div class="emp-audit-wrap">
    <div class="a-heading">Audit logs of uploaded employees</div>
    <div class="list-wrap">
      <div class="headers">
        <div class="uploaded-by">
          Uploaded by
        </div>
        <div class="date-upload">
          Date of upload
        </div>
        <div class="success-count">
          Success
        </div>
        <div class="failure-count">
          Failure
        </div>
        <div class="over-limit">
          Over limit
        </div>
        <div class="download">
          Download
        </div>
      </div>
      <div
        class="list-item"
        v-for="(i,index) in auditData"
        :key="index"
      >
        <div class="uploaded-by">
          <div>
            <v-avatar color="primary" size="35">
              <span class="white--text headline">
                {{i.created_by.first_name.charAt(0)}}{{i.created_by.last_name.charAt(0)}}
              </span>
            </v-avatar>
          </div>
          <div>
            <div class="a-name">{{i.created_by.display_name}}</div>
            <div>{{i.created_by.email}}</div>
          </div>
        </div>
        <div class="date-upload">
          {{dayjs(i.created_at).format('DD-MM-YYYY-HH:mm')}}
        </div>
        <div class="success-count">
          {{i.success_count}}
        </div>
        <div class="failure-count">
          {{i.error_count}}
        </div>
        <div class="over-limit">
          <span style="color:red;" v-if="i.over_limit">{{i.over_limit}}</span>
          <span v-else>--</span>
        </div>
        <div class="download"
          :class="i.user_data_file === '' ? 'disabledFile' : ''"
        >
          <a target="_blank" :href="i.user_data_file">
            <v-icon small color="primary">fas fa-file-download</v-icon>
            File
          </a>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
        <span slot='no-more'>{{' '}}</span>
        <span slot='no-results'>{{' '}}</span>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import { VAvatar } from 'vuetify';
import dayjs from 'dayjs';
import InfiniteLoading from 'vue-infinite-loading';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  name: 'EmpAuditLog',

  components: {
    // VAvatar,
    InfiniteLoading
  },

  data () {
    return {
      auditData: [],
      page: 1
    };
  },

  mounted () {
    this.infiniteHandler();
  },

  methods: {
    infiniteHandler ($state) {
      axios.get(`${process.env.VUE_APP_API_URL}company/audit/`, {
        params: {
          'page-offset': this.page
        }
      }).then((response) => {
        if (response.data.count > this.auditData.length) {
          this.page += 1;
          const temp = [];
          if (this.auditData.length > 0) {
            this.$lodash.each(this.auditData, (val) => {
              temp.push(val);
            });
          }
          this.$lodash.each(response.data.results, (val) => {
            temp.push(val);
          });
          this.auditData = temp;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    getAudit () {
    }
  }
};
</script>

<style lang="scss" scoped>
.emp-audit-wrap {
  .a-heading {
    margin: 12px;
    padding: 12px;
    font-size: 18px;
    font-weight: 600;
  }
  .list-wrap {
    height: 80vh;
    overflow-y: auto;
    .headers {
      display: grid;
      grid-template-columns: 3fr 2fr 1fr 1fr 1fr 1fr;
      grid-gap: 6px;
      margin: 12px 6px;
      font-size: 14px;
      padding: 12px;
      font-weight: 500;
      .uploaded-by {}
      .date-upload {
        align-self: center;
      }
      .success-count {
        align-self: center;
        justify-self: center;
      }
      .failure-count {
        align-self: center;
        justify-self: center;
      }
      .over-limit {
        align-self: center;
        justify-self: center;
      }
      .download {
        align-self: center;
        justify-self: center;
      }
    }
    .list-item {
      border-radius: 0.375rem;
      box-shadow: 8px 2px 12px #0000000b;
      display: grid;
      grid-template-columns: 3fr 2fr 1fr 1fr 1fr 1fr;
      grid-gap: 6px;
      margin: 12px 6px;
      padding: 12px;
      .uploaded-by {
        display: grid;
        grid-template-columns: 1fr 6fr;
        span {
          font-size: 16px !important;
        }
        .a-name {
          font-weight: 500;
        }
      }
      .date-upload {
        align-self: center;
      }
      .success-count {
        align-self: center;
        justify-self: center;
      }
      .failure-count {
        align-self: center;
        justify-self: center;
      }
      .over-limit {
        align-self: center;
        justify-self: center;
      }
      .download {
        align-self: center;
        justify-self: center;
        a {
          text-decoration: none;
        }
        &.disabledFile {
          pointer-events: none;
          opacity: 0.6;
        }
      }
    }
  }
}
</style>
