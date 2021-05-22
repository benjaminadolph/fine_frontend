<template>
    <div class="swipe-slider">
      <ul class="slider-list">
        <li v-for="item in items.items" :key="item.items">{{ item }}</li>
      </ul>
      {{ items.activeItem }}
    </div>

</template>

<script>
export default {
  name: 'SwipeSlider',
  components: {},
  props: {
    items: {},
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/swipe-slider.scss";
</style>
