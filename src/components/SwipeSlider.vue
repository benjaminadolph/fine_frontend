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
        <div class="left-arrow arrow" v-on:click="selectPrevious"></div>
        <div class="right-arrow arrow" v-on:click="selectNext"></div>
      </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'SwipeSlider',
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
      if (this.showItems === 5) {
        this.itemsArray.push(this.items[activeIndex - 2]);
      }
      this.itemsArray.push(this.items[activeIndex - 1]);
      this.itemsArray.push(this.items[activeIndex]);
      this.itemsArray.push(this.items[activeIndex + 1]);
      if (this.showItems === 5) {
        this.itemsArray.push(this.items[activeIndex + 2]);
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
