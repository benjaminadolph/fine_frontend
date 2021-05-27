<template>
  <div
    class="module-entry-layer"
    v-touch:swipe.left="swipeHandler"
    v-touch:swipe.right="swipeHandlerRight">
    <header class="fine-header">
      <a class="left-button shadow-button" v-on:click="closeLayer">
          <IconComponent name="close-full" size="32" :color="currentModule + '-primary'" />
      </a>
      <div class="center">
          <h1 :class="currentModule + '-primary'">{{ getModuleName() }}</h1>
          <Time />
      </div>
      <div class="right-button shadow-button">
          <IconComponent />
      </div>
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
    };
  },
  methods: {
    getModuleName() {
      let moduleName = 'Modul Name';
      if (this.currentModule === 'symptoms') {
        moduleName = 'Symptome';
      } else if (this.currentModule === 'emotions') {
        moduleName = 'Gefühle';
      }
      return moduleName;
    },
    swipeHandler() {
      this.currentModule = 'emotions';
    },
    swipeHandlerRight() {
      this.currentModule = 'symptoms';
    },
    getRouteBefore() {
      console.log(this.$route.redirectedFrom);
      return this.$route.redirectedFrom;
    },
    closeLayer() {
      this.$emit('closeLayer');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/module-entry.scss";
</style>
