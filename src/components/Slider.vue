<template>
  <div class="slider" v-bind:class="module + '-primary'">
    <input
      type="range"
      class="range-slider"
      id="slider"
      min="0"
      max="5"
      value="1"
      v-touch:drag="onLoad()"
    />
    <!-- :oninput="stretchSlider()"
      :onchange="stretchSlider()" -->
    <div class="slider-text plain-m-book">Wirkung bewerten</div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    module: String,
  },
  data() {
    return {
      length: 200,
      horizontal: true,
      thumbThickWidth: 30,
      thumbThinWidth: 10,
      trackWidth: 4,
    };
  },
  methods: {
    onLoad() {
      document.addEventListener('DOMContentLoaded', stretchSlider(() => {
        const slider = document.querySelector('.slider');
        // const style = getComputedStyle(slider);

        // let flexGrow = style.flexGrow[0];
        let isDragging = false;
        console.log(isDragging);

        function touchStart(flexgrow) {
          return function (event) {
            isDragging = true;
            flexGrow = flexgrow;
            console.log(event.type.includes('mouse'));
            console.log('start');
          };
        }
        function touchEnd(event) {
          isDragging = false;
          console.log(event);
          console.log('end');
        }
        function touchMove(event) {
          if (isDragging) {
            console.log(event);
            console.log('move');
          }
        }
        slider.onDrag((flexgrow) => {
          const thumb = document.querySelector('.range-slider');
          thumb.addEventListener('dragstart', (e) => e.preventDefault());

          // Touch events
          thumb.addEventListener('touchstart', touchStart(flexgrow));
          thumb.addEventListener('touchend', touchEnd);
          thumb.addEventListener('touchmove', touchMove);

          // Mouse events
          thumb.addEventListener('mousedown', touchStart(flexgrow));
          thumb.addEventListener('mouseup', touchEnd);
          thumb.addEventListener('mouseleave', touchEnd);
          thumb.addEventListener('mousemove', touchMove);
        });
      }));
    },
    computed: {
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/slider.scss";
</style>
