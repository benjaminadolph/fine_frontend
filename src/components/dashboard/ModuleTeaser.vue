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
    :module="module"
    :buttonLabel="getButtonLabel(module)"
    :multiselect="true" />
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
      }
      return moduleName;
    },
    getButtonLabel(module) {
      let buttonLabel = 'Button Label';
      if (module === 'symptoms') {
        buttonLabel = 'Symptome hinzufügen';
      } else if (module === 'emotions') {
        buttonLabel = 'Gefühl hinzufügen';
      }
      return buttonLabel;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/module-teaser.scss";
</style>
