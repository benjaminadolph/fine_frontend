<template>
  <div>
    <Header title="Kalender" iconLeft="arrow-left" iconRight="filter"/>
    <div class="calendar-navigation">
      <SwipeSlider
        :items="yearItems"
        :active="year"
        :selectedDate="selectedDate"
        identifier="year"
        @dateSelected="selectDate"
      />
      <SwipeSlider
        :items="monthItems"
        :active="month - 1"
        :selectedDate="selectedDate"
        identifier="month"
        @dateSelected="selectDate"
      />
    </div>
    <div class="calendar-month">
      <div class="calendar-month-header">
        <!-- <CalendarDateSelector
          :current-date="today"
          :selected-date="selectedDate"
          @dateSelected="selectDate"
        /> -->
      </div>

      <div class="days-grid">
        <CalendarMonthDayItem
          v-for="day in days"
          :key="day.date"
          :day="day"
          :is-today="day.date === today"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import Header from '@/components/Header.vue';
import SwipeSlider from '@/components/SwipeSlider.vue';
import CalendarMonthDayItem from '@/components/CalendarMonthDayItem.vue';
// import CalendarDateSelector from '@/components/CalendarDateSelector.vue';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
  name: 'CalendarMonth',

  components: {
    CalendarMonthDayItem,
    // CalendarDateSelector,
    Header,
    SwipeSlider,
  },

  data() {
    return {
      selectedDate: dayjs(),
      yearItems: {
        2018: '2018', 2019: '2019', 2020: '2020', 2021: '2021',
      },
      monthItems: {
        0: 'Januar',
        1: 'Februar',
        2: 'März',
        3: 'April',
        4: 'Mai',
        5: 'Juni',
        6: 'Juli',
        7: 'August',
        8: 'September',
        9: 'Oktober',
        10: 'November',
        11: 'Dezember',
      },
    };
  },

  computed: {
    days() {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays,
      ];
    },

    today() {
      return dayjs().format('YYYY-MM-DD');
    },

    month() {
      return Number(this.selectedDate.format('M'));
    },

    year() {
      return Number(this.selectedDate.format('YYYY'));
    },

    numberOfDaysInMonth() {
      return dayjs(this.selectedDate).daysInMonth();
    },

    currentMonthDays() {
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => ({
        date: dayjs(`${this.year}-${this.month}-${index + 1}`).format(
          'YYYY-MM-DD',
        ),
        isCurrentMonth: true,
      }));
    },

    previousMonthDays() {
      const firstDayOfTheMonthWeekday = this.getWeekday(
        this.currentMonthDays[0].date,
      );
      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(
        1,
        'month',
      );

      // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

      const previousMonthLastMondayDayOfMonth = dayjs(
        this.currentMonthDays[0].date,
      )
        .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => ({
          date: dayjs(
            `${previousMonth.year()}-${previousMonth.month() + 1}-${
              previousMonthLastMondayDayOfMonth + index
            }`,
          ).format('YYYY-MM-DD'),
          isCurrentMonth: false,
        }),
      );
    },

    nextMonthDays() {
      const lastDayOfTheMonthWeekday = this.getWeekday(
        `${this.year}-${this.month}-${this.currentMonthDays.length}`,
      );

      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, 'month');

      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => ({
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`,
        ).format('YYYY-MM-DD'),
        isCurrentMonth: false,
      }));
    },
  },

  methods: {
    getWeekday(date) {
      return dayjs(date).weekday();
    },

    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/calendar.scss";
</style>
