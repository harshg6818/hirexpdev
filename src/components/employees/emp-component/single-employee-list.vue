<template>
  <div class="single-emp-list-wrap">
    <v-layout class="mb-3 emp-search">
      <v-flex xs12 class="d-flex justify-space-around">
        <div
          class="emp-active cursor-pointer hover-link"
          :class="activeEmpView === 'active' ? 'active' : ''"
          @click="activeEmpView = 'active';getEmployeesList()"
        >
          <span>
            Active
          </span>
        </div>
        <div
          class="emp-exit cursor-pointer hover-link"
          :class="activeEmpView === 'exit' ? 'active' : ''"
          @click="activeEmpView = 'exit';getEmployeesList()"
        >
          <span>
            Exited
          </span>
        </div>
      </v-flex>
    </v-layout>
    <v-layout class="emp-list">
      <v-flex xs12>
        <div
          v-for="(emp, index) in employees"
          :id="index.toString()"
          :key="index"
        >
          <v-layout>
            <v-flex xs11>
              <v-layout
                class="emp-card my-2 py-2 pl-3 cursor-pointer hover-link"
                :class="activeEmployee.id === emp.id ? 'active' : ''"
                @click="changeEmpView(emp.id)"
              >
                <v-flex>
                  <div class="emp-name">
                    {{emp.display_name}}
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="my-2 active-pointer" xs1 v-show="activeEmployee.id === emp.id">
              <div class="pointer"></div>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
      <div>
      </div>
    </v-layout>
    <v-layout v-if="totalCount > 10" class="mt-4">
      <v-flex class="text-xs-center">
        <!-- <v-pagination
          class=""
          color="primary"
          v-model="pagination"
          :length="totalCount"
          :total-visible="5"
          @input="togglePagination()"
        ></v-pagination> -->
        <ul class="emp-pagination">
          <!-- left arrow -->
          <li>
            <div
              class="pagination-nav-left"
              :class="pagination === 1 ? 'disabled' : ''"
              @click="pagination = pagination - 1;togglePagination();"
            >
              <v-icon>fas fa-angle-left</v-icon>
            </div>
          </li>
          <!-- one page -->
          <li>
            <div
              class="pagination-btn"
              :class="pagination === 1 ? 'active' : ''"
              @click="pagination = 1;togglePagination();"
            >1</div>
          </li>
          <!-- active page -->
          <li>
            <div class="pagination-dots" v-if="pagination === 1 || pagination === totalCount">...</div>
            <div
              class="pagination-btn active"
              v-else
              @click="togglePagination();"
            >{{pagination}}</div>
          </li>
          <!-- last total page -->
          <li>
            <div
              class="pagination-btn"
              :class="pagination === totalCount ? 'active' : ''"
              @click="pagination = totalCount;togglePagination();"
            >{{totalCount}}</div>
          </li>
          <!-- right arrow -->
          <li>
            <div
              class="pagination-nav-right"
              :class="pagination === totalCount ? 'disabled' : ''"
              @click="pagination = pagination + 1;togglePagination();"
            >
              <v-icon>fas fa-angle-right</v-icon>
            </div>
          </li>
        </ul>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// import { VPagination } from 'vuetify';
import { mapState } from 'vuex';

export default {
  name: 'SingleEmployeeList',

  // components: {
  //   VPagination
  // },

  data () {
    return {
      searchString: '',
      pagination: 1,
      activeEmpView: 'active'
    };
  },

  props: {
    // employees: {
    //   required: true,
    //   type: [Array, Object],
    // },
    // totalCount: {
    //   required: true,
    //   type: Number,
    // },
  },

  computed: {
    ...mapState({
      user: state => state.user,
      activeEmployee: state => state.activeEmployee,
      singleEmpView: state => state.singleEmpView,
      employees: state => state.employeesList.data,
      totalCount: state => state.employeesList.total_count
    })
  },

  methods: {
    searchEmployee () {
      setTimeout(() => {
        this.$emit('getEmployees', this.pagination, this.searchString);
      }, 1000);
    },

    getEmployeesList () {
      this.$emit('getEmployeesList', this.activeEmpView);
    },

    togglePagination () {
      this.$emit('getEmployees', this.pagination);
    },

    changeEmpView (empId) {
      this.$emit('changeEmpView', empId);
    }
  }
};
</script>

<style lang="scss" scoped>
// write media query to hide over flow of the list
.single-emp-list-wrap {
  .emp-card {
    margin: 12px 0 12px 12px;
    .emp-name {
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      transition: all .3s ease-out 0s;
    }
    &:hover {
      border-radius: 10px;
      background: #ffffff;
      transition: all .3s ease-out 0s;
    }
    &:hover .emp-name {
      color: #000;
      transition: all .3s ease-out 0s;
    }
    &.active {
      word-break: unset;
      border-radius: 10px 0 0 10px;
      background: #eff7f8;
      .emp-name {
        color: #000;
      }
    }
  }
  .emp-search {
    margin: 12px;
  }
  .emp-active {
    padding: 10px;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    &.active {
      border-bottom: 4px solid #ffffff;
    }
    &:hover {
      color: #ffffff !important;
    }
  }
  .emp-exit {
    padding: 10px;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    &.active {
      border-bottom: 4px solid #ffffff;
    }
    &:hover {
      color: #ffffff !important;
    }
  }
  .active-pointer {
    position: relative;
    .pointer {
      border-radius: 4px;
      position: absolute;
      border-style: solid;
      top: -1px;
      left: -2px;
      border-color: transparent transparent transparent #eff7f8;
      border-width: 20px;
      transition: 0.5s ease all;
    }
  }
  .emp-pagination {
    list-style: none;
    display: flex;
    li {
      padding: 0 5px;
    }
    .pagination-btn {
      background: #fff;
      max-height: 26px;
      min-width: 26px;
      min-height: 26px;
      border-radius: 4px;
      padding: 2px 10px;
      cursor: pointer;
      &.active {
        background: #4c3e9d;
        color: #ffffff;
      }
    }
    .pagination-dots {
      font-size: 20px;
      padding: 0 10px;
      color: #fff;
    }
    .pagination-nav-left {
      i {
        font-size: 20px;
        padding-right: 12px;
        color: #fff;
        padding-top: 2px;
        cursor: pointer;
      }
      &.disabled {
        opacity: .6;
        pointer-events: none;
      }
    }
    .pagination-nav-right {
      &.disabled {
        opacity: .6;
        pointer-events: none;
      }
      i {
        cursor: pointer;
        font-size: 20px;
        padding-left: 12px;
        color: #fff;
        padding-top: 2px;
      }
    }
  }
}
</style>

<style lang="scss">
.single-emp-list-wrap {
  .employeeSearch {
    .v-input__control {
      .v-input__slot {
        border-radius: 4px !important;
      }
    }
  }
}
</style>
