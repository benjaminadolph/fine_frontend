<template>
  <div class="view">
    <h1>I am an example view</h1>
    <ExampleComponent/>
  </div>
</template>

<script>

// IF YOU WANT TO USE A NEW VIEW YOU HAVE TO ADD IT TO
// src/router/index.js AND THE ROUTER LINK TO src/App.vue

import ExampleComponent from '@/components/ExampleComponent.vue';

export default {
  name: 'ExampleView',
  components: {
    ExampleComponent,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/example-view.scss";
</style>
