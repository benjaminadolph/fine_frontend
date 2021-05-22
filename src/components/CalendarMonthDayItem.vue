<template>
  <div
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--today': isToday
    }" >
    <ul class="day-entries">
      <li class="day-entry" :class="`${entry.module}-bgcolor-intensity-${entry.intensity}`"></li>
    </ul>
    <span>{{ label }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
      this.$store.dispatch('GET_ALL_SYMPTOMS')
        .then(() => {
          this.symptoms = this.getUserSymptoms;
        })
        .catch((err) => {
          console.log(err);
        });
    },

  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/calendar-month-day-item.scss";
</style>
