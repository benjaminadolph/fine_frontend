<template>
  <div class="slider" v-bind:class="module + '-primary'">
    <input
      type="range"
      class="range-slider"
      id="slider"
      min="0"
      max="5"
      value="1"
      @v-touch:drag="stretchSlider"
    />
    <!-- :oninput="stretchSlider()"
      :onchange="stretchSlider()"
      v-touch:drag="onLoad()" -->
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
    stretchSlider() {
      const slider = document.querySelector('.range-slider');
      const sliderPos = slider.value / slider.max;
      console.log(sliderPos);
      // const style = getComputedStyle(slider);

      // let flexGrow = style.flexGrow[0];
      let isDragging = false;
      let startPos = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;
      let animationID = 0;
      let currentIndex = 0;
      console.log(isDragging);

      function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
      }

      function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
      }

      function getPositionX(event) {
        return event.type.includes('mouse')
          ? event.pageX
          : event.touches[0].clientX;
      }

      function touchStart(index) {
        return function (event) {
          currentIndex = index;
          startPos = getPositionX(event);
          console.log(startPos);
          isDragging = true;
          animationID = requestAnimationFrame(animation);
          slider.classList.add('grabbing');
        };
      }

      function setPositionByIndex() {
        currentTranslate = currentIndex * -window.innerWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
      }

      function touchEnd(event) {
        isDragging = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100) {
          currentIndex += 1;
        }
        if (movedBy > 100) {
          currentIndex -= 1;
        }
        setPositionByIndex();

        slider.classList.remove('grabbing');
        console.log(event);
        console.log('end');
      }

      function touchMove(event) {
        if (isDragging) {
          const currentPosition = getPositionX(event);
          currentTranslate = prevTranslate + currentPosition - startPos;
          console.log(event);
          console.log('move');
        }
      }

      slider.prototype.forEach((index) => {
        const thumb = document.querySelector('.range-slider');
        thumb.addEventListener('dragstart', (e) => e.preventDefault());

        // Touch events
        thumb.addEventListener('touchstart', touchStart(index));
        thumb.addEventListener('touchend', touchEnd);
        thumb.addEventListener('touchmove', touchMove);

        // Mouse events
        thumb.addEventListener('mousedown', touchStart(index));
        thumb.addEventListener('mouseup', touchEnd);
        thumb.addEventListener('mouseleave', touchEnd);
        thumb.addEventListener('mousemove', touchMove);
      });
    },
  },
  mounted() {
    this.stretchSlider();
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/slider.scss";
</style>
