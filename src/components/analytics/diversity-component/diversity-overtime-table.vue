<template>
  <div class="diversity-overtime-table-wrap">
    <table class="content-table">
      <thead>
        <tr class="main-header">
          <th>&nbsp;</th>
          <th>December '19</th>
          <th>November '19</th>
          <th>October '19</th>
          <th>September '19</th>
          <th>August '19</th>
          <th>July '19</th>
        </tr>
        <tr class="sub-header">
          <th class="sort-type">Location</th>
          <th>
            <td>Male</td>
            <td>Female</td>
            <td>Others</td>
          </th>
          <th>
            <td>Male</td>
            <td>Female</td>
            <td>Others</td>
          </th>
          <th>
            <td>Male</td>
            <td>Female</td>
            <td>Others</td>
          </th>
          <th>
            <td>Male</td>
            <td>Female</td>
            <td>Others</td>
          </th>
          <th>
            <td>Male</td>
            <td>Female</td>
            <td>Others</td>
          </th>
          <th>
            <td>Male</td>
            <td>Female</td>
            <td>Others</td>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="row"
          v-for="(row, key) in diversityOvertimeData"
          :key="key"
        >
          <td class="row-data">{{key}}</td>
          <td
            class="row-data"
            v-for="(r, index) in row"
            :key="index"
          >
            <tr class="sub-rows">
              <td>{{r.Male.value}}</td>
              <td>{{r.Female.value}}</td>
              <td>{{r.Others.value}}</td>
            </tr>
          </td>
        </tr>

        <tr class="row">
          <td class="row-data">Delhi</td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>4.2</td>
              <td>1.8</td>
              <td>2.2</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>1.2</td>
              <td>2.8</td>
              <td>4.2</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>2.6</td>
              <td>2.5</td>
              <td>0.2</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>1.2</td>
              <td>1.8</td>
              <td>0.8</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>2.1</td>
              <td>3.5</td>
              <td>2</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>4.5</td>
              <td>3.6</td>
              <td>1.0</td>
            </tr>
          </td>
        </tr>
        <tr class="row">
          <td class="row-data">Mumbai</td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>3.5</td>
              <td>4.9</td>
              <td>1.0</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>3.1</td>
              <td>1.8</td>
              <td>2.0</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>3.9</td>
              <td>2.5</td>
              <td>1.9</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>4.3</td>
              <td>3.2</td>
              <td>0.5</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>2.1</td>
              <td>3.2</td>
              <td>2.1</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>4.6</td>
              <td>1.2</td>
              <td>1.2</td>
            </tr>
          </td>
        </tr>
        <tr class="row">
          <td class="row-data">Pune</td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>3.2</td>
              <td>4.1</td>
              <td>0.6</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>2.2</td>
              <td>2.8</td>
              <td>4.0</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>4.9</td>
              <td>0.8</td>
              <td>3.0</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>2.3</td>
              <td>1.7</td>
              <td>3.2</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>3.2</td>
              <td>4.2</td>
              <td>2.8</td>
            </tr>
          </td>
          <td class="row-data">
            <tr class="sub-rows">
              <td>1.9</td>
              <td>5.0</td>
              <td>1.0</td>
            </tr>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DiversityOvertimeTable',

  data () {
    return {
      // diversityOvertimeData: [
      //   { '12/02/2019': { Delhi: { Male: { value: 1.2, Participation_rate: 80 }, Female: { value: 1.2, Participation_rate: 80 }, Others: { value: 1.2, Participation_rate: 80 } } } },
      //   { '12/03/2019': { Mumbai: { Male: { value: 2.1, Participation_rate: 80 }, Female: { value: 1.2, Participation_rate: 80 }, Others: { value: 1.2, Participation_rate: 80 } } } },
      //   { '12/04/2019': { Pune: { Male: { value: 2.5, Participation_rate: 80 }, Female: { value: 1.2, Participation_rate: 80 }, Others: { value: 1.2, Participation_rate: 80 } } } },
      //   { '12/05/2019': { Banglore: { Male: { value: 3.5, Participation_rate: 80 }, Female: { value: 1.2, Participation_rate: 80 }, Others: { value: 1.2, Participation_rate: 80 } } } },
      //   { '12/06/2019': { Dubai: { Male: { value: 2.6, Participation_rate: 80 }, Female: { value: 1.2, Participation_rate: 80 }, Others: { value: 1.2, Participation_rate: 80 } } } },
      //   { '12/07/2019': { Noida: { Male: { value: 4.5, Participation_rate: 80 }, Female: { value: 1.2, Participation_rate: 80 }, Others: { value: 1.2, Participation_rate: 80 } } } },
      // ],
      diversityOvertimeData: {
        Delhi: {
          '12/01/2019': { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
          '12/02/2019': { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
          '12/03/2019': { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
          '12/04/2019': { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
          '12/05/2019': { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
          '12/06/2019': { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } }
        },
        Mumbai: {
          '12/01/2019': { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
          '12/02/2019': { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
          '12/03/2019': { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
          '12/04/2019': { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
          '12/05/2019': { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } },
          '12/06/2019': { Male: { value: 1.2 }, Female: { value: 2.2 }, Others: { value: 3.2 } }
        }
      },
      tableHeaders: []
    };
  },

  mounted () {
    this.getHeaders();
  },

  methods: {
    getHeaders () {
      this.$lodash.each(this.diversityOvertimeData, (val, key) => {
        this.tableHeaders.push(key);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.diversity-overtime-table-wrap {
  background-color: var(--bg-panel);
  .content-table {
    border-collapse: collapse;
    thead tr {
      background-color: var(--bg);
      color: var(--color-text);
      text-align: left;
    }
    th, td {
      padding: 0.4rem 0.7rem;
      min-width: 3rem;
    }
    tbody .row {
      border-bottom: 1px solid #dddddd;
      background-color: var(--bg);
      td {
        border-right: 2px solid var(--primary-dark);
      }
      .sub-rows {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        justify-items: center;
        justify-self: center;
        td {
          border: none;
        }
      }
      .row-data:nth-child(2) {
        background-color: #edebf5;
      }
    }
    tbody {
      &:last-child {
        border-bottom: 2px solid var(--primary-dark);
      }
    }
    .main-header {
      th {
        text-align: center;
        border-right: 2px solid var(--primary-dark);
        border-bottom: 2px solid #dddddd;
      }
      th:nth-child(1) {
        border-bottom: 0;
      }
      th:nth-child(2) {
        background-color: #edebf5 !important;
      }
    }
    .sub-header {
      th:nth-child(2) {
        background-color: #edebf5;
      }
      th {
        text-align: center;
        border-right: 2px solid var(--primary-dark);
      }
      border-bottom: 2px solid var(--primary-dark);
    }
    .sort-type {
      text-align: left !important;
      min-width: 260px;
    }
  }
}
</style>
