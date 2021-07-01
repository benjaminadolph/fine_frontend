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
          :class="`symptoms-bgcolor-intensity-${averageIntensity}`"
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
      entries: [{
        intensities: Array,
        averageIntensity: Number,
        module: String,
      }],
    };
  },

  mounted() {
    this.averageIntensity = this.setEntryAverage();
  },

  methods: {
    showDay() {
      this.$emit('showDayEntries', this.day.date, this.day.week, false);
    },
    setEntryAverage() {
      const intensities = [];
      if (this.day.dayEntries) {
        const symptomEntries = this.day.dayEntries.find((element) => element.module === 'symptoms');
        if (symptomEntries) {
          Object.values(symptomEntries).forEach((value) => {
            intensities.push(value.intensity);
            this.entries.push({
              module: 'symptoms',
              intensities,
              averageIntensity: intensities.reduce((a, b) => a + b, 0) / intensities.length,
            });
          });
        }
        const emotionEntries = this.day.dayEntries.find((element) => element.module === 'emotions');
        if (emotionEntries) {
          Object.values(emotionEntries).forEach((value) => {
            intensities.push(value.intensity);
            this.entries.push({
              module: 'emotions',
              intensities,
              averageIntensity: intensities.reduce((a, b) => a + b, 0) / intensities.length,
            });
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/calendar-month-day-item.scss";
</style>
