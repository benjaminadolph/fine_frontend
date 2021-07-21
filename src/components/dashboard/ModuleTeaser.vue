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
    <LastEntry :lastEntry="lastEntry" v-on:updateIntensity="setIntensity"/>
    <!-- <SelectEntry
    :module="module"
    :buttonLabel="getButtonLabel()" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  GET_LAST_SYMPTOM,
  UPDATE_SYMPTOM,
} from '@/store/modules/symptoms';
import {
  GET_LAST_EMOTION,
  UPDATE_EMOTION,
} from '@/store/modules/emotions';

// import SelectEntry from '@/components/SelectEntry.vue';
import IconComponent from '@/components/IconComponent.vue';
import LastEntry from './LastEntry.vue';

export default {
  name: 'ModuleTeaser',
  components: {
    LastEntry,
    // SelectEntry,
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
    ...mapGetters(['getUserProfile', 'getLastUserSymptom', 'getLastUserEmotion', 'getUserSymptoms', 'getUserEmotions']),
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

    this.emitter.on('updateEntry', () => {
      if (this.module === 'symptoms') {
        this.getLastSymptom();
      }
      if (this.module === 'emotions') {
        this.getLastEmotion();
      }
    });
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
      this.setModuleName();
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
    setIntensity(intensity) {
      if (this.module === 'emotions') {
        this.updateEmotion(intensity);
      } else if (this.module === 'symptoms') {
        this.updateSymptom(intensity);
      }
      this.lastEntry.intensity = intensity;
    },
    updateEmotion(intensity) {
      this.$store.dispatch(UPDATE_EMOTION, {
        emotion_id: this.lastEntry._id,
        date: this.lastEntry.date,
        module: 'emotions',
        intensity,
        emotion: this.lastEntry.emotion,
        detailsText: this.lastEntry.detailsText,
        tags: this.lastEntry.tags,
        // photos: this.photos,
        // audio: this.audio,
      })
        .then(() => {
          // this.emotionEntries = this.getUserEmotions;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateSymptom(intensity) {
      this.$store.dispatch(UPDATE_SYMPTOM, {
        date: this.lastEntry.date,
        symptom_id: this.lastEntry._id,
        module: this.lastEntry.module,
        intensity,
        detailsText: this.lastEntry.detailsText,
        // photos: entry.photos,
        // audio: entry.audio,
        tags: this.lastEntry.tags,
      })
        .then(() => {
          // this.symptoms = this.getUserSymptoms;
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
