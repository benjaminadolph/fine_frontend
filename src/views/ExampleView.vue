<template>
  <div>
    <SymptomsExampleComponent/>
    <EmotionsExampleComponent/>
  </div>
</template>

<script>

// IF YOU WANT TO USE A NEW VIEW YOU HAVE TO ADD IT TO
// src/router/index.js AND THE ROUTER LINK TO src/App.vue

import SymptomsExampleComponent from '@/components/SymptomsExampleComponent.vue';
import EmotionsExampleComponent from '@/components/EmotionsExampleComponent.vue';

export default {
  name: 'ExampleView',
  components: {
    SymptomsExampleComponent,
    EmotionsExampleComponent,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
