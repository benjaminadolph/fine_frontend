<template>
    <div
      class="swipe-slider"
      :class="identifier"
      v-touch:swipe.left="selectNext"
      v-touch:swipe.right="selectPrevious" >
      <ul class="slider-list">
        <li
          v-for="item in itemsArray"
          :key="item"
          v-on:click="selectCurrent(item)"
          :class="{ 'active-item' : item == getActiveTitle}" >
          {{ item }}
        </li>
      </ul>
      <div class="slide-navigation">
        <div class="left-arrow arrow" v-on:click="selectPrevious" v-if="!firstItem"></div>
        <div class="right-arrow arrow" v-on:click="selectNext" v-if="!lastItem"></div>
      </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'MonthYearSlider',
  components: {},
  props: {
    items: Array,
    active: Number,
    identifier: String,
    showItems: Number,
    selectedDate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      itemsArray: [],
      activeItemIndex: this.active,
      lastItem: false,
      firstItem: false,
    };
  },
  methods: {
    selectPrevious() {
      this.setActiveCenter(this.activeItemIndex - 1);
      const newSelectedDate = dayjs(this.selectedDate).subtract(1, this.identifier);
      this.$emit('dateSelected', newSelectedDate);
    },

    selectCurrent(item) {
      let key = 0;

      if (this.identifier === 'year') {
        key = Number(item);
      } else {
        key = this.items.indexOf(item) - 1;
      }
      this.setActiveCenter(this.items.indexOf(item));
      const newSelectedDate = dayjs(this.selectedDate).set(this.identifier, key);
      this.$emit('dateSelected', newSelectedDate);
    },

    selectNext() {
      this.setActiveCenter(this.activeItemIndex + 1);
      const newSelectedDate = dayjs(this.selectedDate).add(1, this.identifier);
      this.$emit('dateSelected', newSelectedDate);
    },

    setActiveCenter(activeIndex) {
      this.itemsArray = [];
      const startCount = Math.floor(this.showItems / 2);

      for (let i = -startCount; i < this.showItems - startCount; i += 1) {
        this.itemsArray.push(this.items[activeIndex + i]);
      }

      const _index = this.items.indexOf(this.items[activeIndex]);
      if (_index === this.items.length - 1) {
        this.lastItem = true;
      } else {
        this.lastItem = false;
      }

      if (_index === startCount - 1) {
        this.firstItem = true;
      } else {
        this.firstItem = false;
      }

      this.activeItemIndex = activeIndex;
    },
  },
  computed: {
    getActiveTitle() {
      return this.items[this.activeItemIndex];
    },
  },
  mounted() {
    this.setActiveCenter(this.active);
    this.activeItemIndex = this.active;
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/swipe-slider.scss";
</style>
