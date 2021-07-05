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
    <LastEntry :lastEntry="lastEntry" :default="defaultText" :module="module" />
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
  GET_SYMPTOM,
} from '@/store/modules/symptoms';
import {
  GET_EMOTION,
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
      lastEntry: {},
      symptom: {},
      emotion: {},
      moduleName: '',
      default: null,
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getLatestSymptom', 'getLatestEmotion']),
  },
  mounted() {
    this.setModuleName();

    if (this.lastEntry === null) {
      this.default = 'Bitte füge einen Eintrag hinzu';
    } else this.default = null;

    console.log(this.module);
    if (this.module === 'symptoms') {
      this.getSymptom();
    } else if (this.module === 'emotions') {
      this.getEmotion();
    }
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
    getSymptom(id) {
      this.$store.dispatch(GET_SYMPTOM, {
        symptom_id: id,
      })
        .then(() => {
          this.lastEntry = this.getLatestSymptom;
          console.log(this.lastEntry);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEmotion(id) {
      this.$store.dispatch(GET_EMOTION, {
        emotion_id: id,
      })
        .then(() => {
          this.lastEntry = this.getLatestEmotion;
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
