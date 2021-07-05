<template>
  <div class="lastentry" v-bind:class="module + '-soft-bgcolor'">
    <header>
      <p class="plain-m-book">Letzter Eintrag:</p>
      <img src="@/assets/icons/16-pencil.svg" />
    </header>
    <p class="plain-m-bold" id="label">
      {{ getLastEntryLabel(module) }} |
      {{ getLastEntryLocation(module) }} |
      {{ getLastEntryDate(module) }} |
      {{ getLastEntryTime(module) + 'Uhr' }}
    </p>
    <div v-bind:class="module + '-range-bgcolor'">
      <input
        type="range"
        v-model="number"
        min="0"
        max="5"
        @input="handleInputChange"
      />
    </div>
  </div>
</template>

<script>
import Slider from '@/components/Slider.vue';

export default {
  name: 'LastEntry',
  components: {
    Slider,
  },
  props: {
    module: String,
  },
  data() {
    return {
      number: 3,
    };
  },
  methods: {
    getLastEntryLabel(module) {
      let lastEntryLabel = '';
      if (module === 'symptoms') {
        lastEntryLabel = 'Migräne';
      } else if (module === 'emotions') {
        lastEntryLabel = 'Wut';
      }
      return lastEntryLabel;
    },
    getLastEntryLocation(module) {
      let lastEntryLocation = '';
      if (module === 'symptoms') {
        lastEntryLocation = 'Nacken';
      } else {
        lastEntryLocation = '';
      }
      return lastEntryLocation;
    },
    getLastEntryDate(module) {
      let lastEntryDate = '';
      if (module === 'symptoms') {
        lastEntryDate = '19.05.2020';
      } else if (module === 'emotions') {
        lastEntryDate = '28.04.2021';
      }
      return lastEntryDate;
    },
    getLastEntryTime(module) {
      let lastEntryTime = '';
      if (module === 'symptoms') {
        lastEntryTime = '19:15';
      } else if (module === 'emotions') {
        lastEntryTime = '15:45';
      }
      return lastEntryTime;
    },
    handleInputChange(e) {
      const { target } = e;
      const val = target.value;
      const min = target.min ? target.min : 0;
      const max = target.max ? target.max : 5;
      const newVal = Number(((val - min) * 100) / (max - min));
      target.style.backgroundSize = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    },
  },
};

</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/last-entry.scss";
</style>
