<template>
  <div>
    <Header title="Calendar" />
    <div class="calendar-navigation">
      <SwipeSlider :items="yearItems" />
      <SwipeSlider :items="monthItems" />
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
      yearItems: { items: ['2018', '2019', '2020', '2021'], activeItem: this.year },
      monthItems: { items: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'], activeItem: this.month },
    };
  },
  components: {
    CalendarMonth,
    Header,
    SwipeSlider,
  },
  methods: {
  },
  computed: {
    year() {
      console.log(dayjs().year());
      return dayjs().year();
    },
    month() {
      return Number(dayjs().month().format('M'));
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/calendar.scss";
</style>
