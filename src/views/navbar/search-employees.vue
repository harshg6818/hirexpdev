<template>
  <div :id="showSearch">
    <section class="search-overlay"
      :class="showSearch === true ? 'show': ''"
    >
      <div class="search-form">
        <div @click="closeSearch" class="btn-search js-searchClose cursor-pointer">
          <i class="fa fa-4x fa-times" aria-hidden="true"></i>
        </div>
        <input
          class="search"
          v-model="searchString"
          @keyup="globalSearchEmployee"
          type="search" placeholder="Search Employees"
        />
      </div>
      <div class="employees-list-wrap" v-if="items && items.length > 0">
        <div
          v-for="(item, idx) in items" :key="idx"
          class="employee-wrap hover-link cursor-pointer"
          @click="viewEmployee(item.id);"
        >
          <div class="emp-id">
            {{idx + 1}}
          </div>
          <div class="emp-name">
            {{item.display_name}}
          </div>
          <div class="emp-email">
            {{item.email}}
          </div>
        </div>
      </div>
      <div v-if="items && items.length < 1 && searchString">
        <div class="not-found">No employees found</div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchEmployees',

  props: {
    showSearch: {
      required: true,
      type: Boolean
    }
  },

  data () {
    return {
      searchString: '',
      items: []
    };
  },

  methods: {
    closeSearch () {
      this.$emit('closeSearch');
    },
    globalSearchEmployee () {
      if (this.searchString && this.searchString.length > 2) {
        const queryParams = {
          fields: 'display_name,email,id',
          raw_search_string: this.searchString
        };
        axios.get(`${process.env.VUE_APP_API_URL}users/list`, {
          params: queryParams
        }).then((response) => {
          if (response && response.data) {
            this.items = response.data.data;
          }
        });
      } else {
        this.items = [];
      }
    },
    viewEmployee (id) {
      // this
      // console.log("viewEmployee -> this", this);
      const queryParams = {
        fields: 'engagement_score,last_milestone,mood,high_potential_emp,latest_session_driver,latest_session_driverwise_subdrivers,last_chat_completedAt,user_session_count,user_inProgress_session_count,user_completed_session_count,user_completed_session_driverwise_subdrivers,user_latest_session_interactions,user_completed_session_mood,formatted_question_text,formatted_response_text,first_name,last_name,display_name,sub_type,email,location,phoneNumber,profilePicture,gender,designation,status,employee_id,department,user_id,last_chat_action_status,last_chat_id,last_chat_session_id,last_chat_assignedTo,last_chat_assignedTo_email,last_chat_assignedTo_display_name,interactions_active,alert_raised,alert_words'
      };
      axios.get(`${process.env.VUE_APP_API_URL}users/${id}/details`, {
        params: queryParams
      }).then((response) => {
        // this.config.initialLoading = false;
        if (response && response.data) {
          const t = [];
          t.push(response.data);
          this.$store.dispatch('employeesList', { data: t, total_count: 1 });
          this.$store.dispatch('activeEmployee', response.data);
          this.$store.dispatch('singleEmpView', true);
          if (this.$router && this.$router.currentRoute && this.$router.currentRoute.name) {
            if (this.$router.currentRoute.name !== 'Employees') {
              this.amaraTopNav = 'employees';
              this.$router.push({
                query: { eId: id },
                path: '/employees'
              });
            }
          }
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to fetch employee, Please try again later!'
        });
        throw new Error(response);
      });
      this.closeSearch();
    }
  }
};
</script>

<style lang="scss" scoped>
.employees-list-wrap {
  margin: 0 6rem;
  .employee-wrap {
    display: grid;
    grid-template-columns: 50px 2fr 3fr;
    padding: 0.6rem;
    background: #fff;
    border-radius: 0.5rem;
    margin-bottom: 10px;
  }
}
.not-found {
  margin: 0 6rem;
  background: #fff;
  text-align: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
</style>

<style lang="css">
/* reset */
*, *::before, *::after {
  box-sizing: border-box;
}
html, body {
  margin: 0;
  padding: 0;
}

/* .btn-search、-blue：search */
.btn-search {
  display: inline-block;
  padding: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, .87)
}
.btn-search:hover, .btn-search:focus {
  color: white;
}
.btn-search.-blue {
  background: #2196F3;
}
.btn-search.-blue:hover, .btn-search.-blue:focus {
  background: #1565C0;
}

/* search */
body.-hide {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* .search-overlay：*/
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -999;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /* background: black;  */
  /* background: rgba(0, 0, 0, .87); */
  background: rgba(76, 62, 157, .87);
  opacity: 0;
  transition: all .5s ease-in-out;
}
.search-overlay.show {
  z-index: 9999999;
  opacity: 1;
}

/* search form */
.search-form {
  padding: 1rem 2rem;
}

.search-form > .btn-search {
  float: right;
}
.search-form > .btn-search::after {
  content: "";
  display: block;
  clear: both;
}

/* search input */
.search-form > .search {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: 0;
  /* input */
  padding: 1rem;
  width: 100%;
  line-height: 5rem;
  border-bottom: 2px dashed #FFF;
  color: #FFF;
  font-size: 3rem;
  outline: none;
}

.search::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #ffffff;
  opacity: 1; /* Firefox */
}

.search:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #ffffff;
}

.search::-ms-input-placeholder { /* Microsoft Edge */
  color: #ffffff;
}
</style>
