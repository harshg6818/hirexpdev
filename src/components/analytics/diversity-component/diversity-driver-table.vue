<template>
  <div class="diversity-driver-table-wrap">
  <table class="am-table">
  <thead class="am-head">
    <tr class="header-row">
      <th scope="col">&nbsp;</th>
      <th
        v-for="(h,key) in tableHeader"
        :key="key"
        scope="col"
      >{{h}}</th>
      <!-- <th scope="col">Overall</th>
      <th scope="col">Carrer Opportunities</th>
      <th scope="col">Culture</th>
      <th scope="col">Leadership</th>
      <th scope="col">Performance Management</th>
      <th scope="col">Rewards and Recognition</th>
      <th scope="col">Worklife Integration</th> -->
    </tr>
    <tr class="sub-header-row">
      <th scope="col" class="text-xs-left">Location</th>
      <!-- <th scope="col">
        <tr class="sub-header">
          <td>Male</td>
          <td>Female</td>
          <td>Others</td>
        </tr>
      </th> -->
      <th scope="col">
        <tr class="sub-header">
          <td>Male</td>
          <td>Female</td>
          <td>Others</td>
        </tr>
      </th>
      <th scope="col">
        <tr class="sub-header">
          <td>Male</td>
          <td>Female</td>
          <td>Others</td>
        </tr>
      </th>
      <th scope="col">
        <tr class="sub-header">
          <td>Male</td>
          <td>Female</td>
          <td>Others</td>
        </tr>
      </th>
      <th scope="col">
        <tr class="sub-header">
          <td>Male</td>
          <td>Female</td>
          <td>Others</td>
        </tr>
      </th>
      <th scope="col">
        <tr class="sub-header">
          <td>Male</td>
          <td>Female</td>
          <td>Others</td>
        </tr>
      </th>
      <th scope="col">
        <tr class="sub-header">
          <td>Male</td>
          <td>Female</td>
          <td>Others</td>
        </tr>
      </th>
    </tr>
  </thead>
  <tbody class="am-body">
    <!-- <tr>
      <td data-label="Account">Visa - 3412</td>
      <td data-label="Due Date">04/01/2016</td>
      <td data-label="Amount">$1,190</td>
      <td data-label="Period">03/01/2016 - 03/31/2016</td>
    </tr>
    <tr>
      <td scope="row" data-label="Account">Visa - 6076</td>
      <td data-label="Due Date">03/01/2016</td>
      <td data-label="Amount">$2,443</td>
      <td data-label="Period">02/01/2016 - 02/29/2016</td>
    </tr>
    <tr>
      <td scope="row" data-label="Account">Corporate AMEX</td>
      <td data-label="Due Date">03/01/2016</td>
      <td data-label="Amount">$1,181</td>
      <td data-label="Period">02/01/2016 - 02/29/2016</td>
    </tr>
    <tr>
      <td scope="row" data-label="Acount">Visa - 3412</td>
      <td data-label="Due Date">02/01/2016</td>
      <td data-label="Amount">$842</td>
      <td data-label="Period">01/01/2016 - 01/31/2016</td>
    </tr> -->
    <!-- <tr class="rows">
      <td scope="row" data-label="locations">Pune</td>
      <td>
        <tr class="sub-rows">
          <td data-label="male">12</td>
          <td data-label="female">18</td>
          <td data-label="other">2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
    </tr>
    <tr class="rows">
      <td scope="row" data-label="locations">Pune</td>
      <td>
        <tr class="sub-rows">
          <td data-label="male">12</td>
          <td data-label="female">18</td>
          <td data-label="other">2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
    </tr>
    <tr class="rows">
      <td scope="row" data-label="locations">Pune</td>
      <td>
        <tr class="sub-rows">
          <td data-label="male">12</td>
          <td data-label="female">18</td>
          <td data-label="other">2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
      <td>
        <tr class="sub-rows">
          <td>12</td>
          <td>18</td>
          <td>2</td>
        </tr>
      </td>
    </tr> -->
    <tr
      class="rows"
      v-for="(row, key) in rowsData"
      :key="key"
    >
      <td class="row-data pl-2">{{key}}</td>
      <td
        class="row-data"
        v-for="(r, index) in row"
        :key="index"
      >
        <tr class="sub-rows">
          <td v-if="r.Male">{{r.Male.toFixed(1)}}</td>
          <td v-else>--</td>
          <td v-if="r.Female">{{r.Female.toFixed(1)}}</td>
          <td v-else>--</td>
          <td v-if="r.Others">{{r.Others.toFixed(1)}}</td>
          <td v-else>--</td>
        </tr>
      </td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
export default {
  name: 'DiversityDriverTable',

  props: {
    tableData: {
      required: true,
      type: Object
    }
  },

  watch: {
    tableData: {
      deep: true,
      immediate: true,
      handler () {
        this.getDriverRowsData();
      }
    }
  },

  data () {
    return {
      rowsData: [],
      tableHeader: [
        // 'Overall',
        'Carrer Opportunities',
        'Culture', 'Leadership',
        'Performance Management',
        'Rewards and Recognition',
        'Worklife Integration'
      ]
      // diversityDriverData: {
      //   Delhi: {
      //     carrerOpportunities: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //     culture: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //     leadership: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //     performanceManagement: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //     rewardsAndRecognition: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //     worklifeIntegration: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //   },
      //   Mumbai: {
      //     carrerOpportunities: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //     culture: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //     leadership: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //     performanceManagement: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //     rewardsAndRecognition: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //     worklifeIntegration: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //   },
      // },
      // tableHeaders: {
      //   carrerOpportunities: { Male: { value: 1.2 }, Female: { value: 2.2 } },
      //   culture: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //   leadership: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //   performanceManagement: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //   rewardsAndRecognition: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      //   worklifeIntegration: { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
      // },
    };
  },

  methods: {
    getDriverRowsData () {
      const temp = {};
      const defaultVal = {
        Male: '',
        Female: '',
        Others: ''
      };
      this.$lodash.each(this.tableData, (val, key) => {
        temp[key] = {
          // overall: val.overall ? val.overall : defaultVal,
          carrerOpportunities: val.CareerOpportunities ? val.CareerOpportunities : defaultVal,
          culture: val.Culture ? val.Culture : defaultVal,
          leadership: val.Leadership ? val.Leadership : defaultVal,
          performanceManagement: val.PerformanceManagement ? val.PerformanceManagement : defaultVal,
          rewardsAndRecognition: val.RewardsAndRecognition ? val.RewardsAndRecognition : defaultVal,
          worklifeIntegration: val.WorklifeIntegration ? val.WorklifeIntegration : defaultVal
        };
        // temp.push(val, key);
      });
      this.rowsData = temp;
      // console.log('temp', temp);
    }
  }
};
</script>

<style lang="scss" scoped>
.diversity-driver-table-wrap {
  .am-table {
    width: 100%;
    border-collapse: collapse;
    .am-head {
      .header-row {
        border-bottom: 2px solid #dddddd;
        th {
          padding: 0.4rem;
          border-right: 2px solid var(--primary-dark);
        }
      }
      .sub-header-row {
        border-bottom: 2px solid var(--primary-dark);
        .sub-header {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          td {
            padding: 0.4rem;
          }
        }
        th {
          border-right: 2px solid var(--primary-dark);
          padding: 0.4rem;
        }
      }
    }
    .am-body {
      .rows {
        .sub-rows {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          td {
            border: none;
            padding: 0.4rem;
            text-align: center;
          }
        }
        border-bottom: 1px solid #dddddd;
        background-color: var(--bg);
        td {
          border-right: 2px solid var(--primary-dark);
          // padding: 0.4rem;
        }
      }
    }
  }
}
</style>

<style scoped>
/* @media only screen
  and (max-width: 760px), (min-device-width: 768px)
  and (max-device-width: 1024px)  {
    table, thead, tbody, th, td, tr {
      display: block;
    }
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  tr {
    margin: 0 0 1rem 0;
  }
  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }
  td:before {
    position: absolute;
    top: 0;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }
} */
</style>
