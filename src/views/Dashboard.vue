<template>
  <div class="view">
    <header>
      <h1>Dashboard</h1>
      <div class="time plain-s-book fine-grey-medium">{{ date }}</div>
    </header>
    <SmartStack />
    <ModuleTeaser :module="'emotions'" />
    <ModuleTeaser :module="'symptoms'" />
  </div>
</template>

<script>
// IF YOU WANT TO USE A NEW VIEW YOU HAVE TO ADD IT TO
// src/router/index.js AND THE ROUTER LINK TO src/App.vue

import SmartStack from '@/components/SmartStack.vue';
import ModuleTeaser from '@/components/ModuleTeaser.vue';

export default {
  name: 'Dashboard',
  components: {
    SmartStack,
    ModuleTeaser,
  },
  props: {
    module: String,
  },
  data() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return {
      date: `${dd}.${mm}.${yyyy}`,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/dashboard.scss";
</style>
