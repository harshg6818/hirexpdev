<template>
  <v-navigation-drawer
    v-model="primaryDrawer.model"
    :mini-variant="toogleBar"
    app
    overflow
    width="200"
    class="am-sidebar"
  >
  <v-list
    dense
    nav
    class="py-0"
  >
    <v-list-item two-line :class="miniVariant && 'px-0'">
      <div>
        <img :src="getImgUrl('amara_logo_white')" height="36" width="180">
      </div>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item
      v-for="item in items"
      :key="item.title"
      link
    >
      <v-list-item-icon>
        <v-tooltip right v-if="toogleBar">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="white"
              v-bind="attrs"
              v-on="on"
            >{{ item.icon }}</v-icon>
          </template>
          <span>{{item.title}}</span>
        </v-tooltip>
        <v-icon color="white" v-else>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title style="color:white">{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'sidebar',

  props: {
    toogleBar: {
      required: true,
      type: Boolean,
      default: true
    }
  },

  computed: {
    bg () {
      return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined;
    }
  },

  data () {
    return {
      drawers: ['Default (no property)', 'Permanent', 'Temporary'],
      primaryDrawer: {
        model: true,
        type: 'default (no property)',
        clipped: false,
        floating: false,
        mini: false
      },
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'fas fa-chart-line' },
        { title: 'Employees', icon: 'fas fa-users' },
        { title: 'Ad-Hoc', icon: 'fas fa-bezier-curve' },
        { title: 'Analytics', icon: 'fas fa-chart-bar' }
      ],
      color: 'primary',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal'
      ],
      right: false,
      permanent: true,
      miniVariant: false,
      expandOnHover: false,
      background: false
    };
  },

  methods: {
    getImgUrl (pet) {
      const images = require.context('@/assets/logo', false, /\.png$/);
      return images(`./${pet}.png`);
    }
  }
};
</script>

<style lang="scss" scoped>
.am-sidebar {
  background: linear-gradient(90deg,#61245e,#42276f 90%);
}
</style>
