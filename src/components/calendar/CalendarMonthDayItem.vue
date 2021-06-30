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
      averageIntensity: 0,
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
      let averageIntensity = 0;
      if (this.day.dayEntries) {
        Object.values(this.day.dayEntries).forEach((value) => {
          intensities.push(value.intensity);
        });
        /* eslint-disable-next-line max-len */
        averageIntensity = intensities.reduce((a, b) => a + b, 0) / intensities.length;
      }
      return Math.round(averageIntensity);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/calendar-month-day-item.scss";
</style>
