<template>
  <div>
    <CalendarMonth />
  </div>
</template>

<script>
import CalendarMonth from '@/components/CalendarMonth.vue';

export default {
  name: 'Calendar',
  data() {
  },
  components: {
    CalendarMonth,
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/calendar.scss";
</style>
