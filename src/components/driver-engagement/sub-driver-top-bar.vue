<template>
  <div class="sub-driver-top-bar-wrap">
    <div class="left-side">
      <div class="back-icon">
        <v-btn flat icon color="#6f64b0" @click="goBackToAnalytics">
          <v-icon>fas fa-arrow-left</v-icon>
        </v-btn>
      </div>
      <div class="report-title">
          {{activeDriver.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}}
      </div>
    </div>
    <div class="right-side">
      <div class="report-datepicker">
        <v-menu full-width offset-y :close-on-content-click="false" v-model="dateMenu" bottom>
          <v-btn
            slot="activator"
            class="box-container zoom-in"
          >
            <v-icon>far fa-calendar-alt</v-icon>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <span v-if="range[0] || range[1]">{{ range[0] }} &mdash; {{ range[1] }}</span>
            <span v-else>Choose date range</span>
          </v-btn>
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
                flat
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
  name: 'SubDriverTopBar',

  components: {
    // VDateRange,
  },

  props: {
    activeDriver: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      filterApplied: false,
      dateMenu: false,
      range: [
        format(subDays(new Date(), 365), 'YYYY-MM-DD'),
        format(new Date(), 'YYYY-MM-DD')
      ],
      dateRangeOptions: {
        // startDate: format(subDays(new Date(), 7), 'YYYY-MM-DD'),
        // endDate: format(new Date(), 'YYYY-MM-DD'),
        startDate: format(subDays(new Date(), 365), 'YYYY-MM-DD'),
        endDate: format(new Date(), 'YYYY-MM-DD'),
        format: 'MM/DD/YYYY',
        presets: [
          {
            label: 'Today',
            range: [
              format(new Date(), 'YYYY-MM-DD'),
              format(new Date(), 'YYYY-MM-DD')
            ]
          },
          {
            label: 'Yesterday',
            range: [
              format(subDays(new Date(), 1), 'YYYY-MM-DD'),
              format(new Date(), 'YYYY-MM-DD')
            ]
          },
          {
            label: 'Last 30 Days',
            range: [
              format(subDays(new Date(), 30), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD')
            ]
          },
          {
            label: 'Last 3 Months',
            range: [
              format(subDays(new Date(), 90), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD')
            ]
          },
          {
            label: 'Last 6 Months',
            range: [
              format(subDays(new Date(), 180), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD')
            ]
          },
          {
            label: 'Last 12 Months',
            range: [
              format(subDays(new Date(), 365), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD')
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
        format(subDays(new Date(), 365), 'YYYY-MM-DD'),
        format(new Date(), 'YYYY-MM-DD')
      ];
      this.$emit('reportDateFilters', resetDate);
    },
    goBackToAnalytics () {
      this.$router.push({
        path: '/drivers'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sub-driver-top-bar-wrap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0px 0 20px 0;
  background-color: var(--bg);
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
