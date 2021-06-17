<template>
  <div class="lastentry" v-bind:class="module + '-soft-bgcolor'">
    <header>
      <p class="plain-m-book">Letzter Eintrag:</p>
      <img src="@/assets/icons/16-pencil.svg" />
    </header>
    <p class="plain-m-bold" id="label" v-if="(module === 'symptoms')">
      {{ symptoms.category + ' |' }}
      {{ symptoms.location.title + ' |' }}
      {{ getDate + ' |' }}
      {{ getLastEntryTime(module) + ' Uhr' }}
    </p>
    <p class="plain-m-bold" id="label" v-if="(module === 'emotions')">
      {{ emotions.title + ' |' }}
      {{ emotions.date + ' |' }}
      {{ getLastEntryTime(module) + ' Uhr' }}
    </p>
    <input type="range" min="0" max="6" name="intensity" />
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

export default {
  name: 'LastEntry',
  props: {
    module: String,
  },
  data() {
    return {
      symptoms: [],
      emotions: [],
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getLatestSymptom', 'getUserEmotions']),
  },
  mounted() {
    this.getSymptom();
  },
  methods: {
    getSymptom(id) {
      this.$store.dispatch(GET_SYMPTOM, {
        symptom_id: id,
      })
        .then(() => {
          this.symptoms = this.getLatestSymptom;
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
          this.emotions = this.getUserEmotions;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDate() {
      const dd = String(this.symptoms.date.getDate()).padStart(2, '0');
      const mm = String(this.symptoms.date.getMonth() + 1).padStart(2, '0');
      const yyyy = this.symptoms.date.getFullYear();
      date = `${dd}.${mm}.${yyyy}`;

      return date;
    },
    /* getLastEntryDate(module) {
      let lastEntryDate = '';
      if (module === 'symptoms') {
        lastEntryDate = '19.05.2020';
      } else if (module === 'emotions') {
        lastEntryDate = '28.04.2021';
      }
      return lastEntryDate;
    }, */
    getLastEntryTime(module) {
      let lastEntryTime = '';
      if (module === 'symptoms') {
        lastEntryTime = '19:15';
      } else if (module === 'emotions') {
        lastEntryTime = '15:45';
      }
      return lastEntryTime;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/last-entry.scss";
</style>
