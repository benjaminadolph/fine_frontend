<template>
  <div class="component">
    <header class="module-header">
      <IconComponent
        v-bind:name="module"
        :size="32"
        v-bind:color="module + '-primary'"
      />
      <h2 v-bind:class="module + '-primary'">{{ moduleName }}</h2>
    </header>
    <LastEntry :lastEntry="lastEntry" :module="module" />
    <SelectEntry
    :multiselect=false
    :module="module"
    :buttonLabel="getButtonLabel()" />
    <!-- in Select Entry müssen Kategorien für alle Module hinzugefügt werden können
    soll das genauso wie bei Symptom-Kategorien sein?
      :list=symptomCategories
      v-on:addNewOption="createSymptomCategory" -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  GET_LAST_SYMPTOM,
} from '@/store/modules/symptoms';
import {
  GET_LAST_EMOTION,
} from '@/store/modules/emotions';
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
    return {
      lastEntry: [],
      moduleName: '',
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getLastUserSymptom', 'getLastUserEmotion']),
  },
  mounted() {
    console.log(this.module);
    if (this.module === 'symptoms') {
      this.getLastSymptom();
    } else if (this.module === 'emotions') {
      this.getLastEmotion();
    }
    this.setModuleName();
  },
  methods: {
    setModuleName() {
      if (this.module === 'symptoms') {
        this.moduleName = 'Symptome';
      } else if (this.module === 'emotions') {
        this.moduleName = 'Gefühle';
      } else if (this.module === 'nutrition') {
        this.moduleName = 'Ernährung';
      } else if (this.module === 'sleep') {
        this.moduleName = 'Schlaf';
      } else if (this.module === 'activity') {
        this.moduleName = 'Bewegung';
      } else if (this.module === 'countermeasures') {
        this.moduleName = 'Maßnahmen';
      }
    },
    getButtonLabel() {
      let buttonLabel = `${this.moduleName} hinzufügen`;
      if (this.module === 'sleep') {
        buttonLabel = 'Jetzt schlafen';
      }
      return buttonLabel;
    },
    getLastSymptom() {
      this.$store.dispatch(GET_LAST_SYMPTOM)
        .then(() => {
          const data = this.getLastUserSymptom;
          this.lastEntry.push(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getLastEmotion() {
      this.$store.dispatch(GET_LAST_EMOTION)
        .then(() => {
          const data = this.getLastUserEmotion;
          this.lastEntry.push(data);
          console.log(this.lastEntry);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/module-teaser.scss";
</style>
