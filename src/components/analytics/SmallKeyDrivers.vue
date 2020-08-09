<template>
  <div class="w-100">
    <v-layout row wrap style="height:280px">
      <v-flex px-1 mb-1 sm6 class="b-right">
        <v-card class="elevation-0 px-3 no-border">
          <v-layout row wrap class="mt-2">
            <v-flex class="subheading font-weight-bold pt-2">
              <span v-show="true">
                You're doing great with
              </span>
              <!--<span v-show="$route.name === 'Employees'">
                Positive Drivers
              </span>-->
            </v-flex>
          </v-layout>
          <v-layout row wrap class="my-1">
            <v-flex>
              <v-list class="doing-great-list-emp"  :class="{
                'small': $route.name !== 'Dashboard'
                }">
                <v-list-tile v-for="(d, di) in drivers.good" :key="di" class="px-0">
                  <v-list-tile-content>
                    <v-layout row wrap pt-2 class="w-100">
                      <v-flex sm3 pr-2>
                        <v-chip :style="`color:${getColor(d.value.toFixed(1))}`" class="ma-0" outline small>
                          {{d.value.toFixed(1)}}
                        </v-chip>
                      </v-flex>
                      <v-flex sm9 px-2 class="text-capitalize">
                        {{d.title}}
                      </v-flex>
                    </v-layout>
                  </v-list-tile-content>
                  <v-list-tile-action v-if="$route.name === 'Dashboard'">
                    <v-btn color="primary" flat @click="viewDriver(d.title)">View</v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-if="drivers.good.length === 0">
                  <v-list-tile-content class="grey--text">
                    Not enough data to generate analysis
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex px-1 mb-1 sm6>
        <v-card class="elevation-0 px-3 no-border">
          <v-layout row wrap class="mt-2">
            <v-flex class="subheading font-weight-bold pt-2">
              <span v-show="true">
                Improve Your Focus On
              </span>
              <!--<span v-show="$route.name === 'Employees'">
                Negative Drivers
              </span>-->
            </v-flex>
          </v-layout>
          <v-layout row wrap class="my-1">
            <v-flex>
              <v-list class="doing-great-list-emp" :class="{
                'small': $route.name !== 'Dashboard'
                }">
                <v-list-tile v-for="(d, di) in drivers.bad" :key="di" class="px-0">
                  <v-list-tile-content>
                    <v-layout row wrap pt-2 class="w-100">
                      <v-flex sm3 pr-2>
                        <v-chip color="error" class="ma-0" outline small>
                          {{d.value.toFixed(1)}}
                        </v-chip>
                      </v-flex>
                      <v-flex sm9 px-2 class="text-capitalize">
                        {{d.title}}
                      </v-flex>
                    </v-layout>
                  </v-list-tile-content>
                  <v-list-tile-action v-if="$route.name === 'Dashboard'">
                    <v-btn color="primary" flat @click="viewDriver(d.title)">View</v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-if="drivers.bad.length === 0">
                  <v-list-tile-content class="grey--text">
                    Not enough data to generate analysis
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import axios from 'axios';
// import { VChip, VTooltip } from 'vuetify';

export default {
  name: 'improveFocusOn',
  // components: {
  //   VChip,
  //   VTooltip
  // },
  data () {
    return {
      employee: {},
      drivers: {
        good: [],
        bad: [],
        others: []
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    viewDriver (d) {
      this.$router.push({
        path: '/',
        query: {
          driver: d
        }
      });
    },
    sortDrivers (allDrivers) {
      this.drivers = {
        good: [],
        bad: [],
        others: []
      };
      this.$lodash.each(allDrivers, (v, k) => {
        if (v >= 4) {
          this.drivers.good.push({
            title: k,
            value: v
          });
        } else {
          this.drivers.bad.push({
            title: k,
            value: v
          });
        }
      });
    },
    getColor (value) {
      let color = '';
      if (value <= 3) {
        color = '#f44336';
      } else if (value <= 4) {
        color = '#ff9800';
      } else if (value <= 5) {
        color = '#37b99c';
      }
      return color;
    }
  },
  mounted () {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
