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
      buttonLabel="Symptome hinzufügen"
      :multiselect="true"
    />
  </div>
</template>

<script>
import LastEntry from '@/components/LastEntry.vue';
import SelectEntry from '@/components/SelectEntry.vue';
import IconComponent from '@/components/IconComponent.vue';

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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/module-teaser.scss";
</style>
