<template>
  <div class="view">
    <h1>I am an example view</h1>
    <ExampleComponent />
  </div>
</template>

<script>

// IF YOU WANT TO USE A NEW VIEW YOU HAVE TO ADD IT TO src/router/index.js AND THE ROUTER LINK TO src/App.vue

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

<style>
  h1 {
    text-align: center;
    color: #2c3e50;
  }
  .view{
      background-color: rgb(11, 94, 66);
      padding: 20px;
  }
</style>
