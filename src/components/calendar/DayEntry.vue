<template>
    <div class="day-entry">
        {{ entry }}
    </div>
</template>

<script>

export default {
  name: 'DayEntry',

  components: {
  },

  props: {
    entry: Object,
    week: Number,
  },

  data() {
    return {
    };
  },

  computed: {
  },

  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/day-entry.scss";
</style>
