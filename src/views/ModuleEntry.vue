<template>
  <div class="module-entry-layer">
    <div class="module-entry-header">
      <IconComponent v-bind:name="module" :size="32" v-bind:color="module + '-primary'" />
      <div class="text">
        <h1 v-bind:class="module + '-primary'">{{ getModuleName(module) }}</h1>
        <Time />
      </div>
    </div>
    <Symptoms v-if="module==='symptoms'" />
    <Emotions v-if="module==='emotions'" />
    <ul>
      <li><router-link to="/module-entry/symptoms">Symptome</router-link></li>
      <li><router-link to="/module-entry/emotions">Feelings</router-link></li>
    </ul>
  </div>
</template>

<script>
import Symptoms from '@/components/Symptoms.vue';
import Emotions from '@/components/Emotions.vue';
import IconComponent from '@/components/IconComponent.vue';
import Time from '@/components/Time.vue';

export default {
  name: 'ModuleEntry',
  components: {
    Symptoms,
    Emotions,
    IconComponent,
    Time,
  },
  props: {
    module: String,
  },
  methods: {
    getModuleName(module) {
      let moduleName = 'Modul Name';
      if (module === 'symptoms') {
        moduleName = 'Symptome';
      } else if (module === 'emotions') {
        moduleName = 'Gefühle';
      }
      return moduleName;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/module-entry.scss";
</style>
