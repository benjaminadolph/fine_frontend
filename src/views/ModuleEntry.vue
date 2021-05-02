<template>
  <div class="module-entry-layer">
    <div class="module-entry-header">
      <IconComponent v-bind:name="module" :size="32" v-bind:color="module + '-primary'" />
      <div class="text">
        <h1 v-bind:class="module + '-primary'">{{ getModuleName(module) }}</h1>
        <Time />
      </div>
    </div>
    <SelectEntry :module=module buttonLabel="Kategorie wählen" :multiselect=true />
    <SelectEntry :module=module buttonLabel="Kategorie wählen" :multiselect=false />
    <SymptomsEntry v-if="module==='symptoms'" />
    <Emotions v-if="module==='emotions'" />
    <ul>
      <li><router-link to="/module-entry/symptoms">Symptome</router-link></li>
      <li><router-link to="/module-entry/emotions">Feelings</router-link></li>
    </ul>
  </div>
</template>

<script>
import SymptomsEntry from '@/components/SymptomsEntry.vue';
import Emotions from '@/components/Emotions.vue';
import IconComponent from '@/components/IconComponent.vue';
import SelectEntry from '@/components/SelectEntry.vue';
import Time from '@/components/Time.vue';

export default {
  name: 'ModuleEntry',
  components: {
    SymptomsEntry,
    Emotions,
    IconComponent,
    Time,
    SelectEntry,
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
