<template>
  <div>
    <header class="fine-header">
      <div>
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
          v-for="day in week.dayElements"
          :key="day.date"
          :day="day"
          :is-today="day.date === today"
          :is-empty="isEmpty(day)"
          v-on:showDayEntries="getDayEntries"
          v-on:hideDayEntries="removeDayEntries"
        />
        <DayEntry
          v-if="showDayEntries && week.week === dayEntryWeek"
          :entries="dayEntries"
          :week="dayEntryWeek"
          v-on:removeEntry="deleteEntry"
        />
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
import { mapGetters } from 'vuex';
import {
  GET_ALL_SYMPTOMS,
  DELETE_SYMPTOM,
} from '@/store/modules/symptoms';
import {
  GET_ALL_EMOTIONS,
  DELETE_EMOTION,
} from '@/store/modules/emotions';

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
      symptoms: {},
      emotions: {},
    };
  },

  computed: {
    ...mapGetters(['getUserProfile', 'getUserSymptoms', 'getUserEmotions']),
    days() {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays,
      ];
    },

    weeksArray() {
      const _weeks = chunk(this.days, 7);
      const weeks = [];
      _weeks.forEach((el) => {
        const week = dayjs(el[0].date).week();
        weeks.push(
          {
            week,
            dayElements: el,
          },
        );
      });
      // _weeks.reduce((a, b) => a.concat(b), []);

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
        dayEntries: this.setDayEntries(dayjs(`${this.year}-${this.month}-${index + 1}`).format(
          'YYYY-MM-DD',
        )),
        label: index + 1,
        week: this.getWeek(`${this.year}-${this.month}-${index + 1}`),
      }));
    },

    currentWeekDays() {
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => ({
        date: dayjs(`${this.year}-${this.month}-${index + 1}`).format(
          'YYYY-MM-DD',
        ),
        isCurrentMonth: true,
        dayEntries: this.setDayEntries(dayjs(`${this.year}-${this.month}-${index + 1}`).format(
          'YYYY-MM-DD',
        )),
        label: index + 1,
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
          dayEntries: this.setDayEntries(dayjs(
            `${previousMonth.year()}-${previousMonth.month() + 1}-${
              previousMonthLastMondayDayOfMonth + index
            }`,
          ).format('YYYY-MM-DD')),
          label: previousMonthLastMondayDayOfMonth + index,
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
        label: index + 1,
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

    getDayEntries(date, entryweek, update) {
      const _date = dayjs(date).format('YYYY-MM-DD');
      const entries = this.setDayEntries(_date);

      if (update || (entries.length && entries !== this.dayEntries)) {
        this.showDayEntries = true;
        this.dayEntries = entries;
        this.dayEntryWeek = entryweek;
      } else {
        this.showDayEntries = false;
        this.dayEntries = {};
      }
    },

    setDayEntries(date) {
      const dayEntries = [];
      Object.values(this.symptoms).forEach((value) => {
        if (dayjs(value.date).format('YYYY-MM-DD') === date) {
          dayEntries.push(value);
        }
      });
      Object.values(this.emotions).forEach((value) => {
        if (dayjs(value.date).format('YYYY-MM-DD') === date) {
          dayEntries.push(value);
        }
      });
      return dayEntries;
    },

    removeDayEntries() {
      this.dayEntries = {};
      this.showDayEntries = false;
    },

    getAllSymptoms() {
      this.$store.dispatch(GET_ALL_SYMPTOMS)
        .then(() => {
          this.symptoms = this.getUserSymptoms;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteSymptom(id, date) {
      this.$store.dispatch(DELETE_SYMPTOM, {
        symptom_id: id,
      })
        .then(() => {
          this.symptoms = this.getUserSymptoms;
          this.getDayEntries(date, dayjs(date).week(), true);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllEmotions() {
      this.$store.dispatch(GET_ALL_EMOTIONS)
        .then(() => {
          this.emotions = this.getUserEmotions;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteEmotion(id, date) {
      this.$store.dispatch(DELETE_EMOTION, {
        emotion_id: id,
      })
        .then(() => {
          this.emotions = this.getUserEmotions;
          this.getDayEntries(date, dayjs(date).week(), true);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteEntry(entry) {
      console.log(entry);
      if (entry.module === 'symptoms') {
        this.deleteSymptom(entry._id, entry.date);
      } else if (entry.module === 'emotions') {
        this.deleteEmotion(entry._id, entry.date);
      }
    },
  },

  mounted() {
    this.getAllSymptoms();
    this.getAllEmotions();

    this.emitter.on('updateEntry', () => {
      this.getAllSymptoms();
      this.getAllEmotions();
    });
  },

};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/calendar.scss";
</style>
