<template>
    <div class="swipe-slider">
      <ul class="slider-list">
        <li
          v-for="(value, key) in items"
          :key="key"
          v-on:click="setActive(key)"
          :class="{ 'active-item' : key == active}" >
          {{ value }}
        </li>
      </ul>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'SwipeSlider',
  components: {},
  props: {
    items: {},
    active: Number,
    identifier: String,
    selectedDate: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setActive(key) {
      const newSelectedDate = dayjs(this.selectedDate).set(this.identifier, key);
      this.$emit('dateSelected', newSelectedDate);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/swipe-slider.scss";
</style>
