<template>
  <div
    class="module-entry-layer"
    v-touch:swipe.left="nextModule"
    v-touch:swipe.right="prevModule">
    <ul class="module-slider">
      <li
        v-for="_module in allModules"
        :key="_module"
        v-on:click="goToLayer(_module)">
        <IconComponent
          :name="_module"
          :size="getSize(_module)"
          :color="_module + '-primary'"
          :class="{ 'not-active': isNotActive(_module)}"
        />
      </li>
    </ul>
    <header class="fine-header">
      <div class="center">
          <h1 :class="currentModule + '-primary'">{{ getModuleName() }}</h1>
          <Time />
      </div>
      <a class="right-button shadow-button" v-on:click="closeLayer">
          <IconComponent name="close-full" size="32" :color="currentModule + '-primary'" />
      </a>
    </header>
    <div class="module-entry-content">
      <SymptomsEntry v-if="currentModule==='symptoms'" />
      <Emotions v-if="currentModule==='emotions'" />
    </div>
  </div>
</template>

<script>
import SymptomsEntry from '@/components/entry/SymptomsEntry.vue';
import Emotions from '@/components/entry/Emotions.vue';
import IconComponent from '@/components/IconComponent.vue';
import Time from '@/components/Time.vue';

export default {
  name: 'ModuleEntry',
  components: {
    SymptomsEntry,
    Emotions,
    IconComponent,
    Time,
  },
  props: {
    module: String,
  },
  data() {
    return {
      currentModule: this.module,
      allModules: ['symptoms', 'emotions', 'nutrition', 'sleep'],
    };
  },
  methods: {
    getModuleName() {
      let moduleName = 'Modul Name';
      if (this.currentModule === 'symptoms') {
        moduleName = 'Symptome';
      } else if (this.currentModule === 'emotions') {
        moduleName = 'Gefühle';
      } else if (this.currentModule === 'nutrition') {
        moduleName = 'Ernährung';
      } else if (this.currentModule === 'sleep') {
        moduleName = 'Schlaf';
      }
      return moduleName;
    },
    goToLayer(module) {
      this.currentModule = module;
    },
    closeLayer() {
      this.$emit('closeLayer');
    },
    nextModule() {
      let index = this.getModuleIndex(this.currentModule) + 1;
      if (index >= this.allModules.length) {
        index = 0;
      }
      this.currentModule = this.allModules[index];
    },
    prevModule() {
      let index = this.getModuleIndex(this.currentModule) - 1;
      if (index < 0) {
        index = this.allModules.length - 1;
      }
      this.currentModule = this.allModules[index];
    },
    getModuleIndex(module) {
      return this.allModules.indexOf(module);
    },
    isNotActive(module) {
      if (module !== this.currentModule) {
        return true;
      }
      return false;
    },
    getSize(module) {
      if (module !== this.currentModule) {
        return 24;
      }
      return 32;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/module-entry.scss";
</style>
