<template>
  <div class="module-entry-layer">
    <ul
      class="module-slider"
      v-touch:swipe.left="nextModule"
      v-touch:swipe.right="prevModule"
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
    <header class="fine-header">
      <a class="left-button" v-on:click="cancelEntry">
          <IconComponent name="close-full" :size=32 :color="currentModule + '-primary'" />
      </a>
      <div class="headline-text">
          <h1 :class="currentModule + '-primary'">{{ getModuleName() }}</h1>
          <Time />
      </div>
      <a class="right-button" v-on:click="closeLayer">
          <IconComponent name="check-full" :size=32 :color="currentModule + '-primary'" />
      </a>
    </header>
    <div class="module-entry-content">
      <SymptomsEntry
        v-if="currentModule === 'symptoms'"
        ref="symptomsEntry"
        :entryid='id'
      />
      <EmotionsEntry
        v-if="currentModule === 'emotions'"
        ref="emotionsEntry"
        :entryid='id'
      />
    </div>
  </div>
</template>

<script>
import SymptomsEntry from '@/components/entry/SymptomsEntry.vue';
import EmotionsEntry from '@/components/entry/EmotionsEntry.vue';
import IconComponent from '@/components/IconComponent.vue';
import Time from '@/components/Time.vue';
import { mapGetters } from 'vuex';

import {
  UPDATE_USER_MODULESSELECTED,
} from '@/store/modules/user';

export default {
  name: 'ModuleEntry',
  components: {
    SymptomsEntry,
    EmotionsEntry,
    IconComponent,
    Time,
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
    ...mapGetters(['getUserProfile', 'getModulesSelected']),
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
      // this.$emit('changeModuleEntryLayer', module);
      this.currentModule = module;
    },
    closeLayer() {
      if (this.currentModule === 'emotions') {
        this.$refs.emotionsEntry.createEmotion();
      }
      this.$emit('closeLayer');
    },
    cancelEntry() {
      if (this.currentModule === 'symptoms') {
        this.$refs.symptomsEntry.deleteCurrentEntries();
      }
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
    updateModulesSelected() {
      this.modulesSelected = [];
      const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
      for (let i = 0; i < checkboxes.length; i += 1) {
        this.modulesSelected.push(checkboxes[i].name);
      }
      this.$store.dispatch(UPDATE_USER_MODULESSELECTED, {
        modulesSelected: this.modulesSelected,
      })
        .then(() => {
          this.modulesSelected = this.getModulesSelected;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/module-entry.scss";
</style>
