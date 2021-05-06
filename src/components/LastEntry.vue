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
    <input type="range" min="0" max="6" name="intensity" />
  </div>
</template>

<script>

export default {
  name: 'LastEntry',
  props: {
    module: String,
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/last-entry.scss";
</style>
