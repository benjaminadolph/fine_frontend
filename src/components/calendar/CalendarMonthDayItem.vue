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
          :class="`${entry().module}-bgcolor-intensity-${averageIntensity}`"
        ></li>
      </ul>
      <span class="date">{{ label }}</span>
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

    isEmpty: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      symptoms: [],
      symptomsEntries: [],
      dayEntries: [],
      week: Number,
      showDayEntry: false,
      averageIntensity: 0,
      // showDay: false,
    };
  },

  computed: {
    ...mapGetters(['getUserProfile', 'getUserSymptoms']),
    label() {
      return dayjs(this.day.date).format('D');
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
    showDay() {
      this.showDayEntry = !this.showDayEntry;
      if (this.showDayEntry === true) {
        this.$emit('showDayEntries', this.dayEntries, this.day.week);
      } else {
        this.$emit('hideDayEntries');
      }
    },
    entry() {
      let itemEntry = {};
      const _this = this;
      let allIntensities = 0;
      this.symptoms.forEach((item) => {
        if (dayjs(item.date).format('YYYY-MM-DD') === _this.day.date) {
          this.dayEntries.push(item);
          console.log(item.intensity);
          allIntensities += item.intensity;
          itemEntry = item;
        }
      });
      this.averageIntensity = Math.ceil(allIntensities / (this.symptoms.length - 1));
      console.log(allIntensities, this.symptoms.length);
      return itemEntry;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/calendar-month-day-item.scss";
</style>
