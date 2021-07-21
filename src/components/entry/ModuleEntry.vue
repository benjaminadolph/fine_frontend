<template>
  <transition name="slide-bottom" appear>
    <div class="module-entry-layer">
      <ul
        class="module-slider"
        v-touch:swipe.left="nextModule"
        v-touch:swipe.right="prevModule"
        v-if="!id"
      >
        <li
          v-for="_module in modulesSelected"
          :key="_module"
          :class="{ 'active': !isNotActive(_module)}"
          v-on:click="goToLayer(_module)">
          <IconComponent
            :name="_module"
            :size="getSize(_module)"
            :color="_module + '-primary'"
            :class="{ 'not-active': isNotActive(_module)}"
          />
        </li>
      </ul>
      <SymptomsEntry
        v-if="currentModule === 'symptoms'"
        ref="symptomsEntry"
        :entryid='id'
        v-on:close="closeLayer"
      />
      <EmotionsEntry
        v-if="currentModule === 'emotions'"
        ref="emotionsEntry"
        :entryid='id'
        v-on:close="closeLayer"
      />
    </div>
  </transition>
</template>

<script>
import SymptomsEntry from '@/components/entry/SymptomsEntry.vue';
import EmotionsEntry from '@/components/entry/EmotionsEntry.vue';
import IconComponent from '@/components/IconComponent.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ModuleEntry',
  components: {
    SymptomsEntry,
    EmotionsEntry,
    IconComponent,
  },
  props: {
    module: String,
    id: String,
  },
  data() {
    return {
      currentModule: this.module,
      modulesSelected: [],
    };
  },
  computed: {
    ...mapGetters(['getModulesSelected']),
  },
  mounted() {
    this.getAllModulesSelected();
    this.currentModule = this.module;
    this.emitter.on('modulesUpdated', () => {
      this.getAllModulesSelected();
    });
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
      if (index >= this.modulesSelected.length) {
        index = 0;
      }
      this.currentModule = this.modulesSelected[index];
    },
    prevModule() {
      let index = this.getModuleIndex(this.currentModule) - 1;
      if (index < 0) {
        index = this.modulesSelected.length - 1;
      }
      this.currentModule = this.modulesSelected[index];
    },
    getModuleIndex(module) {
      return this.modulesSelected.indexOf(module);
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
    getAllModulesSelected() {
      this.modulesSelected = this.getModulesSelected;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/module-entry.scss";
</style>
