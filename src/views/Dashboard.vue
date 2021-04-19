<template>
  <div class="view">
    <h1>Dashboard</h1>
    <h2>{{ today }}</h2>
    <Symptoms />
  </div>
</template>

<script>

// IF YOU WANT TO USE A NEW VIEW YOU HAVE TO ADD IT TO
// src/router/index.js AND THE ROUTER LINK TO src/App.vue

import Symptoms from '@/components/Symptoms.vue';

export default {
  name: 'Dashboard',
  components: {
    Symptoms,
  },
  data() {
    return {
      heute: '',
    };
  },
  methods: {
    function() {
      const heute = new Date();
      const dd = String(heute.getDate()).padStart(2, '0');
      const mm = String(heute.getMonth() + 1).padStart(2, '0');
      const yyyy = heute.getFullYear();
      this.heute = `${dd}.${mm}.${yyyy}`;
      console.log(heute);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/dashboard.scss";
</style>
