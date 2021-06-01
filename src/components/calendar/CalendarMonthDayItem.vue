<template>
  <div :class="{ 'calendar-day-with-entry': showDay }">
    <div
      class="calendar-day"
      v-on:click="showDay = !showDay"
      :class="{
        'calendar-day--not-current': !day.isCurrentMonth,
        'calendar-day--today': isToday
      }" >
      <ul class="day-entries">
        <li class="day-entry" :class="`${entry.module}-bgcolor-intensity-${entry.intensity}`"></li>
      </ul>
      <span>{{ label }}</span>
    </div>
    <div v-show="showDay" class="calendar-day-details">
      <div
        class="day-entry"
        v-for="entry in dayEntries"
        :key="entry._id"
        >
        {{ entry.category }}
        {{ getEntryTime(entry) }}
        {{ entry.intensity }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  GET_ALL_SYMPTOMS,
} from '@/store/modules/symptoms';
import dayjs from 'dayjs';

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
  },

  data() {
    return {
      symptoms: [],
      symptomsEntries: [],
      dayEntries: [],
      showDay: false,
    };
  },

  computed: {
    ...mapGetters(['getUserProfile', 'getUserSymptoms']),
    label() {
      return dayjs(this.day.date).format('D');
    },
    entry() {
      let itemEntry = '';
      const _this = this;
      this.symptoms.forEach((item) => {
        if (dayjs(item.date).format('YYYY-MM-DD') === _this.day.date) {
          this.dayEntries.push(item);
          itemEntry = item;
        }
      });
      return itemEntry;
    },
  },

  mounted() {
    this.getAllSymptoms();
  },

  methods: {
    getAllSymptoms() {
      this.$store.dispatch(GET_ALL_SYMPTOMS)
        .then(() => {
          this.symptoms = this.getUserSymptoms;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEntryTime(entry) {
      return `${dayjs(entry.date).hour()}:${dayjs(entry.date).minute()}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/calendar-month-day-item.scss";
</style>
