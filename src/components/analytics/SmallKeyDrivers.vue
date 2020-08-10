<template>
  <div class="w-100">
    <div class="d-flex flex-row flex-wrap" style="height:280px">
      <v-flex sm6 class="b-right px-1 mb-1">
        <v-card class="elevation-0 px-3 no-border">
          <div class="mt-2 d-flex flex-row flex-wrap">
            <v-flex class="subheading font-weight-bold pt-2">
              <span v-show="true">
                You're doing great with
              </span>
              <!--<span v-show="$route.name === 'Employees'">
                Positive Drivers
              </span>-->
            </v-flex>
          </div>
          <div class="my-1 d-flex flex-row flex-wrap">
            <v-flex>
              <v-list class="doing-great-list-emp"  :class="{
                'small': $route.name !== 'Dashboard'
                }">
                <v-list-item v-for="(d, di) in drivers.good" :key="di" class="px-0">
                  <v-list-item-content>
                    <div class="w-100 d-flex flex-row flex-wrap pt-2">
                      <v-flex sm3 pr-2>
                        <v-chip :style="`color:${getColor(d.value.toFixed(1))}`" class="ma-0" outline small>
                          {{d.value.toFixed(1)}}
                        </v-chip>
                      </v-flex>
                      <v-flex sm9 class="text-capitalize px-2">
                        {{d.title}}
                      </v-flex>
                    </div>
                  </v-list-item-content>
                  <v-list-item-action v-if="$route.name === 'Dashboard'">
                    <v-btn color="primary" flat @click="viewDriver(d.title)">View</v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-list-item v-if="drivers.good.length === 0">
                  <v-list-item-content class="grey--text">
                    Not enough data to generate analysis
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-flex>
          </div>
        </v-card>
      </v-flex>

      <v-flex sm6 class="px-1 mb-1">
        <v-card class="elevation-0 px-3 no-border">
          <div class="mt-2 d-flex flex-row flex-wrap">
            <v-flex class="subheading font-weight-bold pt-2">
              <span v-show="true">
                Improve Your Focus On
              </span>
              <!--<span v-show="$route.name === 'Employees'">
                Negative Drivers
              </span>-->
            </v-flex>
          </div>
          <div class="my-1 d-flex flex-row flex-wrap">
            <v-flex>
              <v-list class="doing-great-list-emp" :class="{
                'small': $route.name !== 'Dashboard'
                }">
                <v-list-item v-for="(d, di) in drivers.bad" :key="di" class="px-0">
                  <v-list-item-content>
                    <div class="w-100 d-flex flex-row flex-wrap pt-2">
                      <v-flex sm3 pr-2>
                        <v-chip color="error" class="ma-0" outline small>
                          {{d.value.toFixed(1)}}
                        </v-chip>
                      </v-flex>
                      <v-flex sm9 class="text-capitalize px-2">
                        {{d.title}}
                      </v-flex>
                    </div>
                  </v-list-item-content>
                  <v-list-item-action v-if="$route.name === 'Dashboard'">
                    <v-btn color="primary" flat @click="viewDriver(d.title)">View</v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-list-item v-if="drivers.bad.length === 0">
                  <v-list-item-content class="grey--text">
                    Not enough data to generate analysis
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-flex>
          </div>
        </v-card>
      </v-flex>
    </div>
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
