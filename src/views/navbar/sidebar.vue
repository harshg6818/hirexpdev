<template>
  <v-navigation-drawer
    v-model="primaryDrawer.model"
    :mini-variant="toogleBar"
    app
    overflow
  ></v-navigation-drawer>
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

  data () {
    return {
      drawers: ['Default (no property)', 'Permanent', 'Temporary'],
      primaryDrawer: {
        model: true,
        type: 'default (no property)',
        clipped: false,
        floating: false,
        mini: false
      }
    };
  }
};
</script>
