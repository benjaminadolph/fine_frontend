<template>
  <div class="slider" v-bind:class="module + '-primary'">
    <!-- div wie der thumb, Breite mit x_Position berechnen,
    neue Position Klasse mit width in scss setzen,
    action mit Intensität bei entsprechender Position -->
    <div id="slider" class="thumb" @drag="dragSlider"
    v-bind:class="module + '-primary-bgcolor'"></div>
    <!-- <input
      type="range"
      class="range-slider"
      id="slider"
      min="0"
      max="5"
      value="1"
      @v-touch:drag="dragSlider"
      v-bind:class="module + '-primary-bgcolor'"
    /> -->
    <!-- v-bind:class="module + '-primary-bgcolor'" funktioniert
    nur beim Track aber nicht beim Thumb -->
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
      firstIntensity: '',
      secondIntensity: '',
      thirdIntensity: '',
      fourthIntensity: '',
      fifthIntensity: '',
    };
  },
  methods: {
    dragSlider() {
      // width of thumb
      const thumb = document.querySelector('.thumb');
      const positionThumb = thumb.getBoundingClientRect();
      console.log(`'right' ${positionThumb.right}, 'left' ${positionThumb.left}`);

      const widthThumb = positionThumb.right - positionThumb.left;
      console.log(widthThumb);

      // width of parent/ whole slider
      const slider = document.querySelector('.slider');
      const positionSlider = slider.getBoundingClientRect();
      console.log(`'right' ${positionSlider.right}, 'left' ${positionSlider.left}`);

      const widthSlider = positionSlider.right - positionSlider.left;
      const intensityPos = widthSlider / 5;
      console.log(widthSlider);
      console.log(intensityPos);

      set((intensity) => {
        document.getElementById('slider').className = `intensity-${intensity}`;
        widthThumb.forEach().push(widthThumb + intensityPos);
        // this.$store.dispatch();
      });

      /* }

      // Slider soll in 5 Abschnitten einrasten
      function setPositionByValue() {
        // currentTranslate = value * slider.width;
        prevTranslate = currentTranslate;
        setSliderPosition();
      }

      // Animation beenden
      function touchEnd(event) {
        isDragging = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100) {
          // hier Abschnitte definieren x += 1;
        }
        if (movedBy > 100) {
          // hier Abschnitte definieren x -= 1;
        }
        setPositionByValue();

        slider.classList.remove('grabbing');
        console.log(event);
        console.log('end');
      }

      // move Event
      function touchMove(event) {
        if (isDragging) {
          const currentPosition = getPositionX(event);
          currentTranslate = prevTranslate + currentPosition - startPos;
          console.log(event);
          console.log('move');
        }
      }

      slider.prototype.forEach.call((index) => {
      const thumb = document.querySelector('.range-slider');
      slider.addEventListener('dragstart', (e) => e.preventDefault());

      // Touch events
      slider.addEventListener('touchstart', touchStart());
      slider.addEventListener('touchend', touchEnd);
      slider.addEventListener('touchmove', touchMove);

      // Mouse events
      slider.addEventListener('mousedown', touchStart());
      slider.addEventListener('mouseup', touchEnd);
      slider.addEventListener('mouseleave', touchEnd);
      slider.addEventListener('mousemove', touchMove);
      // }); */
    },
  },
  mounted() {
    this.dragSlider();
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/slider.scss";
</style>
