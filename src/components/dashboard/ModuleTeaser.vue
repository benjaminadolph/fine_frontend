<template>
  <div class="component">
    <header class="module-header">
      <IconComponent
        v-bind:name="module"
        :size="32"
        v-bind:color="module + '-primary'"
      />
      <h2 class="" v-bind:class="module + '-primary'">{{ moduleName }}</h2>
    </header>
    <LastEntry :lastEntry="lastEntry" :module="module" />
    <SelectEntry
    :module="module"
    :buttonLabel="getButtonLabel()" />
    <!--
    Symptome:
      :list=symptomCategories
      v-on:addNewOption="createSymptomCategory"
      :multiselect=false
      v-on:update="onSelect"
      v-on:addNewOption="createSymptomCategory"
    Emotions:
      :list=emotionList
      v-on:addNewOption="addNewEmotion"
      v-on:update="updateEmotionList"
      :multiselect=true -->
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
      lastEntry: {},
      moduleName: '',
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getLastUserSymptom', 'getLastUserEmotion']),
  },
  mounted() {
    // console.log(this.module);
    if (this.module === 'symptoms') {
      this.getLastSymptom();
    }
    if (this.module === 'emotions') {
      this.getLastEmotion();
    }
    this.setModuleName();
  },
  methods: {
    setModuleName() {
      switch (this.module) {
        case 'symptoms':
          this.moduleName = 'Symptome';
          break;
        case 'emotions':
          this.moduleName = 'Gefühle';
          break;
        case 'nutrition':
          this.moduleName = 'Ernährung';
          break;
        case 'sleep':
          this.moduleName = 'Schlaf';
          break;
        case 'activity':
          this.moduleName = 'Bewegung';
          break;
        case 'countermeasures':
          this.moduleName = 'Maßnahmen';
          break;
        default:
          break;
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
          this.lastEntry = this.getLastUserSymptom;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getLastEmotion() {
      this.$store.dispatch(GET_LAST_EMOTION)
        .then(() => {
          this.lastEntry = this.getLastUserEmotion;
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
