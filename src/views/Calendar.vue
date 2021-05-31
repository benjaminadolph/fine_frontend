<template>
  <div>
    <Header title="Calendar" />
    <div class="calendar-navigation">
      <SwipeSlider
        :items="yearItems"
        :active="year"
        identifier="year"
        @dateSelected="selectDate"
      />
      <SwipeSlider
        :items="monthItems"
        :active="month"
        identifier="month"
        @dateSelected="selectDate"
      />
    </div>
    <CalendarMonth />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import CalendarMonth from '@/components/CalendarMonth.vue';
import Header from '@/components/Header.vue';
import SwipeSlider from '@/components/SwipeSlider.vue';

export default {
  name: 'Calendar',
  data() {
    return {
      selectedDate: dayjs(),
      yearItems: ['2018', '2019', '2020', '2021'],
      monthItems: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ],
    };
  },
  components: {
    CalendarMonth,
    Header,
    SwipeSlider,
  },
  computed: {
    year() {
      return dayjs().year();
    },
    month() {
      const _currentMonth = dayjs().format('M');
      const currentMonth = this.monthItems[_currentMonth - 1];
      return currentMonth;
    },
  },
  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/calendar.scss";
</style>
