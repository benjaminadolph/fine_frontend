<template>
  <div class="view">
    <h1>Dashboard</h1>
    <!-- <h2>{{ today }}</h2> -->
    <Widget />
    <Symptoms />
    <Emotions />
    <Movement />
    <Sleep />
    <Nutrition />
  </div>
</template>

<script>

// IF YOU WANT TO USE A NEW VIEW YOU HAVE TO ADD IT TO
// src/router/index.js AND THE ROUTER LINK TO src/App.vue

import Widget from '@/components/Widget.vue';
import Symptoms from '@/components/Symptoms.vue';
import Emotions from '@/components/Emotions.vue';
import Movement from '@/components/Movement.vue';
import Sleep from '@/components/Sleep.vue';
import Nutrition from '@/components/Nutrition.vue';

export default {
  name: 'Dashboard',
  components: {
    Widget,
    Symptoms,
    Emotions,
    Movement,
    Sleep,
    Nutrition,
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
