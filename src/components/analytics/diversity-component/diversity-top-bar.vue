<template>
  <div class="rate-bar-wrap">
    <div class="left-side">
      <div class="back-icon">
        <v-btn text icon color="#6f64b0" @click="goBackToAnalytics">
          <v-icon>fas fa-arrow-left</v-icon>
        </v-btn>
      </div>
      <div class="report-title">
        <!-- <span> -->
          Gender diversity report
        <!-- </span> -->
      </div>
    </div>
    <div class="right-side">
          <!-- <v-btn
            style="color:grey;"
            flat
            small
            v-if="isFilterApplied"
            @click="resetFilters"
          > -->
          <!-- <v-btn
            style="color:grey;"
            flat
            small
            v-if="false"
          >
            Remove Filters
          </v-btn> -->
      <div class="report-datepicker">
        <v-menu offset-y :close-on-content-click="false" v-model="dateMenu" bottom>
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            slot="activator"
            class="box-container zoom-in"
          >
            <v-icon>far fa-calendar-alt</v-icon>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <span v-if="range[0] || range[1]">{{ range[0] }} &mdash; {{ range[1] }}</span>
            <span v-else>Choose date range</span>
          </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-daterange
                :options="dateRangeOptions"
                @input="onDateRangeChange"
                prependIcon="far fa-calendar-alt"
                prevIcon="fas fa-chevron-left"
                nextIcon="fas fa-chevron-right"
              />
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn color="primary">
                Apply
              </v-btn> -->
              <v-btn
                class="error--text"
                text
                @click="resetDateFilters"
              >Reset</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                class="white--text"
                color="primary"
                @click="applyDateFilter()"
              >Apply</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
      <v-btn
        slot="activator"
        class="box-container zoom-in"
        @click.stop="toggleReportFilter"
      >
        <v-icon small>fas fa-filter</v-icon>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>Filter</span>
      </v-btn>
      <v-btn
        class="box-container zoom-in"
        v-if="filterApplied"
        @click="resetReportFilters"
      >
        Remove Filters
      </v-btn>
    </div>
  </div>
</template>

<script>
import { format, subDays } from 'date-fns';
// import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';
// import DateRange from 'vuetify-daterange-picker';
// import VDateRange from 'vuetify-daterange-picker';

export default {
  name: 'RateTopBar',

  components: {
    // VDateRange,
  },

  data () {
    return {
      filterApplied: false,
      dateMenu: false,
      range: [
        format(subDays(new Date(), 365), 'yyyy-MM-dd'),
        format(new Date(), 'yyyy-MM-dd')
      ],
      dateRangeOptions: {
        // startDate: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
        // endDate: format(new Date(), 'yyyy-MM-dd'),
        startDate: format(subDays(new Date(), 365), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd'),
        format: 'MM/DD/YYYY',
        presets: [
          {
            label: 'Today',
            range: [
              format(new Date(), 'yyyy-MM-dd'),
              format(new Date(), 'yyyy-MM-dd')
            ]
          },
          {
            label: 'Yesterday',
            range: [
              format(subDays(new Date(), 1), 'yyyy-MM-dd'),
              format(new Date(), 'yyyy-MM-dd')
            ]
          },
          {
            label: 'Last 30 Days',
            range: [
              format(subDays(new Date(), 30), 'yyyy-MM-dd'),
              format(subDays(new Date(), 1), 'yyyy-MM-dd')
            ]
          },
          {
            label: 'Last 3 Months',
            range: [
              format(subDays(new Date(), 90), 'yyyy-MM-dd'),
              format(subDays(new Date(), 1), 'yyyy-MM-dd')
            ]
          },
          {
            label: 'Last 6 Months',
            range: [
              format(subDays(new Date(), 180), 'yyyy-MM-dd'),
              format(subDays(new Date(), 1), 'yyyy-MM-dd')
            ]
          },
          {
            label: 'Last 12 Months',
            range: [
              format(subDays(new Date(), 365), 'yyyy-MM-dd'),
              format(subDays(new Date(), 1), 'yyyy-MM-dd')
            ]
          }
        ]
      }
    };
  },

  methods: {
    onDateRangeChange (range) {
      // const tempDate = range;
      // tempDate[0] = format(new Date(tempDate[0]), 'DD-MM-YYYY');
      // tempDate[1] = format(new Date(tempDate[1]), 'DD-MM-YYYY');
      // console.log('onDateRangeChange -> tempDate', range);
      this.range = range;
      // if (this.range && this.range[1]) {
      //   this.applyDateFilter();
      // }
    },
    toggleReportFilter () {
      this.$emit('toggleReportFilter');
    },
    resetReportFilters () {
      this.$emit('resetReportFilters');
    },
    applyDateFilter () {
      this.dateMenu = false;
      this.$emit('reportDateFilters', this.range);
    },
    resetDateFilters () {
      this.dateMenu = false;
      const resetDate = [
        format(subDays(new Date(), 365), 'yyyy-MM-dd'),
        format(new Date(), 'yyyy-MM-dd')
      ];
      this.$emit('reportDateFilters', resetDate);
    },
    goBackToAnalytics () {
      this.$router.push({
        path: '/analytics'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.rate-bar-wrap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0px 0 20px 0;
  border-bottom: 1px solid var(--color-headings);
  .left-side {
    .back-icon {
      border-right: 1px solid var(--color-headings);
      margin-right: 16px;
    }
    display: flex;
    justify-content: flex-start;
    .report-title {
      display: grid;
      align-self: center;
      color: var(--color-text);
      font-size: var(--heading-size);
      font-weight: var(--heading-weight);
    }
  }
  .right-side {
    display: flex;
    justify-content: flex-end;
    // padding-top: 6px;
    .box {
      color: var(--color-palceholder);
    }
    .report-datepicker {
    }
    .v-btn:hover:before {
      background-color: var(--bg);
    }
  }
}
</style>
