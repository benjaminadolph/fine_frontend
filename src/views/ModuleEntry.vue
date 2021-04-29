<template>
  <div>
    <h1>{{ module }}</h1>
    <Symptoms v-if="module==='symptoms'" />
    <Feelings v-if="module==='feelings'" />
    <ul>
      <li><router-link to="/module-entry/symptoms">Symptome</router-link></li>
      <li><router-link to="/module-entry/feelings">Feelings</router-link></li>
    </ul>
  </div>
</template>

<script>
import Symptoms from '@/components/Symptoms.vue';
import Feelings from '@/components/Feelings.vue';

export default {
  name: 'ModuleEntry',
  components: {
    Symptoms,
    Feelings,
  },
  props: {
    module: String,
  },
  /* methods: {

  } */
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/module-entry.scss";
</style>
