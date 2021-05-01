<template>
  <div class="view">
    <h1>Dashboard</h1>
    <h2>{{ date }}</h2>
    <Widget />
    <Module
    :icon="allModules.modules.symptoms.icon"
    :heading="allModules.modules.symptoms.heading"
    :label="allModules.modules.symptoms.entry.label"
    :date="allModules.modules.symptoms.entry.date"
    :time="allModules.modules.symptoms.entry.time"
    :button_label="allModules.modules.symptoms.button.button_label" />
    <Module
    :icon="allModules.modules.emotions.icon"
    :heading="allModules.modules.emotions.heading"
    :label="allModules.modules.emotions.entry.label"
    :date="allModules.modules.emotions.entry.date"
    :time="allModules.modules.emotions.entry.time"
    :button_label="allModules.modules.emotions.button.button_label" />
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
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  computed: mapGetters(['allModules']),
  components: {
    Widget,
    Module,
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
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/dashboard.scss";
</style>
