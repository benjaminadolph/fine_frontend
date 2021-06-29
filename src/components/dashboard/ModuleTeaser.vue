<template>
  <div class="component">
    <header class="module-header">
      <IconComponent
        v-bind:name="module"
        :size="32"
        v-bind:color="module + '-primary'"
      />
      <h2 v-bind:class="module + '-primary'">{{ getModuleName(module) }}</h2>
    </header>
    <LastEntry :module="module" />
    <SelectEntry
    :multiselect=false
    :module="module"
    :buttonLabel="getButtonLabel(module)" />
    <!-- in Select Entry müssen Kategorien hinzugefügt werden können
    soll das genauso wie bei Symptom-Kategorien sein?
      :list=symptomCategories
      v-on:addNewOption="createSymptomCategory" -->
  </div>
</template>

<script>
import SelectEntry from '@/components/SelectEntry.vue';
import IconComponent from '@/components/IconComponent.vue';
import LastEntry from './LastEntry.vue';

export default {
  name: 'ModuleTeaser',
  components: {
    LastEntry,
    SelectEntry,
    IconComponent,
  },
  props: {
    module: String,
  },
  data() {
    return {};
  },
  methods: {
    getModuleName(module) {
      let moduleName = 'Modul Name';
      if (module === 'symptoms') {
        moduleName = 'Symptome';
      } else if (module === 'emotions') {
        moduleName = 'Gefühle';
      } else if (module === 'nutrition') {
        moduleName = 'Ernährung';
      } else if (module === 'sleep') {
        moduleName = 'Schlaf';
      } else if (module === 'activity') {
        moduleName = 'Bewegung';
      } else if (module === 'countermeasures') {
        moduleName = 'Maßnahmen';
      }
      return moduleName;
    },
    getButtonLabel(module) {
      let buttonLabel = 'Button Label';
      if (module === 'symptoms') {
        buttonLabel = 'Symptome hinzufügen';
      } else if (module === 'emotions') {
        buttonLabel = 'Gefühl hinzufügen';
      } else if (module === 'nutrition') {
        buttonLabel = 'Ernährung hinzufügen';
      } else if (module === 'sleep') {
        buttonLabel = 'Jetzt schlafen';
      } else if (module === 'activity') {
        buttonLabel = 'Bewegung hinzufügen';
      } else if (module === 'countermeasures') {
        buttonLabel = 'Maßnahmen hinzufügen';
      }
      return buttonLabel;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/module-teaser.scss";
</style>
