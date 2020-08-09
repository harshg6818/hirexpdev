<template>
  <div class="sub-drivers-wrap">
    <SubDriverTopBar
      :active-driver="activeDriver"
    ></SubDriverTopBar>

    <SubDriverSortByNav
    :sort-by-data="sortByData"
    ></SubDriverSortByNav>

    <div class="report-container">
      <!-- <div class="report-wrap" v-if="chartData.selected.length > 0"> -->
      <div class="report-wrap">
        <div class="bar-wrap">
          <!-- <div class="report-bar-graph intro-x" v-if="chartData.selected.length > 0"> -->
          <div class="report-bar-graph intro-x">
            <ScoreOverTime
            ></ScoreOverTime>
          </div>
          <div class="report-bar-graph intro-x">
            <SubDriverBar
            ></SubDriverBar>
          </div>
        </div>

        <div class="subdriver-table-wrap">
          <subdriverTable></subdriverTable>
        </div>
      </div>
      <!-- <div class="no-report-data intro-x" v-if="chartData.selected.length < 1">
        <div class="sad-amara">
          <img src="../../assets/logo/sad_amara.png" alt="sad-amara">
        </div>
        <div class="am-text">Not enough data to generate anlaysis.</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import SubDriverTopBar from './sub-driver-top-bar';
import SubDriverSortByNav from './sub-driver-sort-by-nav';
import ScoreOverTime from './score-overtime';
import SubDriverBar from './subdriver-bar-vue';
import SubdriverTable from './subdriver-table';

export default {
  name: 'SubDrivers',

  components: {
    SubDriverTopBar,
    SubDriverSortByNav,
    ScoreOverTime,
    SubDriverBar,
    SubdriverTable
  },

  data () {
    return {
      activeDriver: '',
      sortByData: {
        location: 'Location', site: 'Site', department: 'Department', gender: 'Gender', business: 'Business', grade: 'Grade', hrbp: 'HR Business Partner', hr_manager: 'HR Manager', cluster: 'Cluster'
      },
      chartData: {
        default: [],
        selected: []
      }
    };
  },

  mounted () {
    if (this.$router && this.$router.currentRoute && this.$router.currentRoute.params.driver) {
      this.activeDriver = this.$router.currentRoute.params.driver;
    }
  }
};
</script>

<style lang="scss" scoped>
.sub-drivers-wrap {
  .report-container {
    background-color: var(--bg-panel);
    height: 74vh;
    // height: 90vh;
    overflow: hidden;
    border-radius: 12px;
    margin: 0 10px;
    .sortBy-select {
      display: grid;
      justify-items: end;
      margin: 10px 20px 10px 0;
    }
    .report-wrap {
      // height: 65vh;
      margin: 0 20px;
      height: 70vh;
      // height: 80vh;
      overflow-y: auto;
      .bar-wrap {
        display: grid;
        grid-template-columns: 50% 50%;
        padding-top: 20px;
        .report-bar-graph {
          margin-right: 10px;
          height: 400px;
          background: var(--bg);
          border-radius: 0.5rem;
        }
        .report-table-wrap {
          margin-left: 10px;
          display: grid;
          .report-table {
          z-index: 0;
            height: 450px;
            border-radius: 0.5rem;
            border: 1px solid var(--color-palceholder);
            background: var(--bg);
            .table-head, .table-body {
              tr {
                display: grid;
                // grid-template-columns: repeat(2, 1fr);
                // grid-template-columns: 2fr, 1fr;
                grid-template-columns: 3fr 1fr;
                // border-bottom: 1px solid var(--color-text);
                border-top: 1px solid var(--color-palceholder);
                td,th {
                  padding: 8px 0px 8px 16px;
                  display: grid;
                  align-items: center;
                  justify-items: start;
                  &:last-child {
                    // border-left: 1px solid var(--color-text);
                  }
                }
              }
            }
            .table-head {
              display: grid;
              min-height: 50px;
              max-height: 50px;
              tr {
                th {
                  text-transform: capitalize;
                }
                &:first-child {
                  border-top: 0;
                }
              }
            }
            .table-body {
              min-height: 400px;
              max-height: 400px;
              overflow-y: auto;
              display: grid;
            }
            .no-sort-data {
              text-align: center;
              font-size: var(--heading-size);
              color: var(--color-palceholder);
              display: grid;
              align-items: center;
              justify-content: center;
              height: 350px;
              border-top: 1px solid var(--color-text);
            }
          }
        }
      }
      .subdriver-table-wrap {
        background-color: var(--bg);
        margin-top: 30px;
        padding: 14px;
      }
      .report-trend-graph {
        margin-top: 20px;
        padding: 30px 30px;
        height: 600px;
        background: var(--bg);
        border-radius: 0.5rem;
      }
    }
    .no-report-data {
      display: grid;
      grid-template-columns: 1fr;
      background-color: var(--bg);
      align-items: center;
      justify-items: center;
      margin: 50px;
      border-radius: 1rem;
      height: 300px;
      .sad-amara {
        text-align: center;
        img {
          width: 25%;
          border-radius: 100%;
        }
      }
      .am-text {
        font-size: var(--heading-size);
        color: var(--color-text);
      }
    }
    .intro-x {
      opacity: 0;
      position: relative;
      transform: translateX(80px);
      animation: 0.6s intro-x-animation ease-in-out 0.33333s;
      animation-fill-mode: forwards;
      animation-delay: 0.3s;
    }
    @keyframes intro-x-animation {
      100% {
        opacity: 1;
        transform: translateX(0px);
      }
    }
  }
}
</style>
