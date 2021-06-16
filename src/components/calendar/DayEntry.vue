<template>
  <div class="day-entry">
    <div
      class="entry"
      v-for="entry in entries"
      :key="entry"
      :class="getClasses(entry)"
    >
      <div class="intensity-bar" :class="getIntensity(entry)"></div>
      <div class="entry-headline">
        <span class="date">{{ getDate(entry.date) }} Uhr</span>
        <span class="title">
          {{ entry.category }} | {{ entry.location.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'DayEntry',

  components: {},

  props: {
    entries: Object,
    week: Number,
  },

  data() {
    return {};
  },

  methods: {
    getDate(entryDate) {
      return dayjs(entryDate).format('HH:mm');
    },
    getClasses(entry) {
      const classList = `${entry.module}-primary`;
      return classList;
    },
    getIntensity(entry) {
      const intensityClass = `${entry.module}-bgcolor-intensity-${entry.intensity}`;
      return intensityClass;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/day-entry.scss";
</style>
