<template>
  <div class="view">
    <h1>Dashboard</h1>
    <!-- <h2>{{ today }}</h2> -->
    <Widget />
    <Module />
    <nav id="navbar">
      <div class="nav-icons">
        <img src="@/assets/images/statistics_m.svg" />
        <img src="@/assets/images/calendar_m.svg" />
        <img src="@/assets/images/home_m.svg" />
        <img src="@/assets/images/plus_main_menu.svg" id="plus" />
      </div>
    </nav>
  </div>
</template>

<script>

// IF YOU WANT TO USE A NEW VIEW YOU HAVE TO ADD IT TO
// src/router/index.js AND THE ROUTER LINK TO src/App.vue

import Widget from '@/components/Widget.vue';
import Module from '@/components/Module.vue';

export default {
  name: 'Dashboard',
  props: {
    modules: Array,
  },
  components: {
    Widget,
    Module,
  },
  data() {
    return {
      today: '',
    };
  },
  methods: {
    function() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      this.today = `${dd}.${mm}.${yyyy}`;
      console.log(today);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/dashboard.scss";
</style>
