<template>
  <div>
    <SymptomsExampleComponent/>
    <EmotionsExampleComponent/>
    <SymptomCategoriesExampleComponent/>
    <ModulesSelectedExampleComponent/>
    <UserExampleComponent/>
  </div>
</template>

<script>

// IF YOU WANT TO USE A NEW VIEW YOU HAVE TO ADD IT TO
// src/router/index.js AND THE ROUTER LINK TO src/App.vue

import SymptomsExampleComponent from '@/components/examples/SymptomsExampleComponent.vue';
import EmotionsExampleComponent from '@/components/examples/EmotionsExampleComponent.vue';
import SymptomCategoriesExampleComponent from '@/components/examples/SymptomCategoriesExampleComponent.vue';
import ModulesSelectedExampleComponent from '@/components/examples/ModulesSelectedExample.vue';
import UserExampleComponent from '@/components/examples/UserExampleComponent.vue';

export default {
  name: 'ExampleView',
  components: {
    SymptomsExampleComponent,
    EmotionsExampleComponent,
    SymptomCategoriesExampleComponent,
    ModulesSelectedExampleComponent,
    UserExampleComponent,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
