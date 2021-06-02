<template>
  <div>
    <header class="fine-header">
      <a class="left-button shadow-button">
          <IconComponent name="arrow-left" :size=16 />
      </a>
      <div class="center">
          <h1>Kalender</h1>
      </div>
      <a class="right-button shadow-button">
          <IconComponent name="filter" :size=16 />
      </a>
    </header>
    <div class="calendar-navigation">
      <SwipeSlider
        :items="getYears"
        :active=5
        :selectedDate="selectedDate"
        :showItems=3
        identifier="year"
        @dateSelected="selectDate"
      />
      <SwipeSlider
        :items="getMonths"
        :active=month
        :selectedDate="selectedDate"
        :showItems=5
        identifier="month"
        @dateSelected="selectDate"
      />
    </div>
    <div class="calendar-month">
      <div v-for="week in weeksArray" :key="week" class="weeks-grid">
        <CalendarMonthDayItem
          v-for="day in week"
          :key="day.date"
          :day="day"
          :is-today="day.date === today"
          :is-empty="isEmpty(day)"
          v-on:showDayEntries="getDayEntries"
          v-on:hideDayEntries="removeDayEntries"
        />
        <DayEntry v-if="showDayEntries" :entries="dayEntries" :week="dayEntryWeek" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import SwipeSlider from '@/components/SwipeSlider.vue';
import CalendarMonthDayItem from '@/components/calendar/CalendarMonthDayItem.vue';
import DayEntry from '@/components/calendar/DayEntry.vue';
import IconComponent from '@/components/IconComponent.vue';
// import CalendarDateSelector from '@/components/CalendarDateSelector.vue';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const chunk = (arr, size) => arr
  .reduce((acc, _, i) => ((i % size)
    ? acc
    : [...acc, arr.slice(i, i + size)]), []);

export default {
  name: 'Calendar',

  components: {
    CalendarMonthDayItem,
    SwipeSlider,
    IconComponent,
    DayEntry,
  },

  data() {
    return {
      selectedDate: dayjs(),
      dayEntries: [],
      dayEntryWeek: Number,
      showDayEntries: false,
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

    weeksArray() {
      const weeks = chunk(this.days, 7);
      return weeks;
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

    getYears() {
      const years = [];
      let startYear = dayjs().year() - 5;

      for (let i = 0; i < 6; i += 1) {
        years.push(startYear.toString());
        startYear += 1;
      }

      return years;
    },

    getMonths() {
      return ['', 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'];
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
        week: this.getWeek(`${this.year}-${this.month}-${index + 1}`),
      }));
    },

    currentWeekDays() {
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => ({
        date: dayjs(`${this.year}-${this.month}-${index + 1}`).format(
          'YYYY-MM-DD',
        ),
        isCurrentMonth: true,
        week: this.getWeek(`${this.year}-${this.month}-${index + 1}`),
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
          week: this.getWeek(
            `${previousMonth.year()}-${previousMonth.month() + 1}-${
              previousMonthLastMondayDayOfMonth + index
            }`,
          ),
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
        week: this.getWeek(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`),
      }));
    },
  },

  methods: {
    getWeekday(date) {
      return dayjs(date).weekday();
    },

    getWeek(date) {
      return dayjs(date).week();
    },

    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },

    isEmpty(day) {
      if (day.date === 'date') {
        return true;
      }
      return false;
    },

    getDayEntries(entries, entryweek) {
      this.showDayEntries = true;
      this.dayEntries = entries;
      this.dayEntryWeek = entryweek;
      // const entryContainer = document.getElementById(`calendar-week-${entryWeek}`);
      console.log(entries, entryweek);
    },

    removeDayEntries() {
      this.dayEntries = {};
      this.showDayEntries = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/calendar.scss";
</style>
