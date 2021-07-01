<template>
  <div :class="{
    'calendar-day-with-entry': showDay,
  }" >
    <div
      class="calendar-day"
      v-on:click="showDay"
      :class="[{
        'calendar-day--not-current': !day.isCurrentMonth,
        'calendar-day--today': isToday,
      }]" >
      <ul class="day-entries">
        <li
          class="day-entry"
          v-for="entry in entries"
          :key="entry"
          :class="`${entry.module}-bgcolor-intensity-${entry.averageIntensity}`"
        ></li>
      </ul>
      <span class="date">{{ day.label }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CalendarMonthDayItem',

  props: {
    day: {
      type: Object,
      required: true,
    },

    isCurrentMonth: {
      type: Boolean,
      default: false,
    },

    isToday: {
      type: Boolean,
      default: false,
    },

    isEmpty: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      entries: [],
    };
  },

  mounted() {
    this.setEntryAverage();
  },

  methods: {
    showDay() {
      this.$emit('showDayEntries', this.day.date, this.day.week, false);
    },
    getAverageIntensity(intensites) {
      /* eslint-disable-next-line max-len */
      let averageIntensity = Math.round(intensites.reduce((a, b) => a + b, 0) / intensites.length);
      if (!averageIntensity) {
        averageIntensity = 0;
      }
      return averageIntensity;
    },
    setEntryAverage() {
      const emotionsIntensities = [];
      const symptomsIntensities = [];
      if (this.day.dayEntries) {
        this.day.dayEntries.forEach((element) => {
          if (element.module === 'symptoms') {
            symptomsIntensities.push(element.intensity);
          } else if (element.module === 'emotions') {
            emotionsIntensities.push(element.intensity);
          }
        });
        this.entries.push({
          module: 'symptoms',
          averageIntensity: this.getAverageIntensity(symptomsIntensities),
        });
        this.entries.push({
          module: 'emotions',
          averageIntensity: this.getAverageIntensity(emotionsIntensities),
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/calendar-month-day-item.scss";
</style>
