<template>
    <div class="time plain-s-book fine-grey-medium">{{currentDateTime()}}</div>
</template>

<script>
export default {
  name: 'Time',
  methods: {
    currentDateTime() {
      const currentDate = new Date();
      const date = 'Heute | ';
      const time = currentDate.toLocaleTimeString('de-DE', { hour: 'numeric', minute: 'numeric' });
      const dateTime = `${date} ${time}`;
      return dateTime;
    },
  },
};
</script>

<style lang="scss" scoped>
  //@import "@/assets/scss/_init.scss";
</style>
