<template>
  <div class="slider" v-bind:class="module + '-primary'">
    <!-- div wie der thumb, Breite mit x_Position berechnen,
    neue Position Klasse mit width in scss setzen,
    action mit Intensität bei entsprechender Position -->
    <div class="thumb_all">
      <div id="slider" class="thumb" @click="dragSlider"
      v-bind:class="module + '-primary-bgcolor'">
      <IconComponent id="smile_up" v-bind:name="'smile'" :size="16" />
      </div>
    </div>
    <div class="slider_bg">
      <div class="slider-text plain-m-book">Wirkung bewerten</div>
      <IconComponent id="smile"
      v-bind:name="'smile'" :size="16" v-bind:color="module + '-primary'" />
      <!-- warum zeigt er das smile icon nicht an? -->
     </div>
  </div>
</template>

<script>
import IconComponent from '@/components/IconComponent.vue';

export default {
  name: 'Slider',
  components: {
    IconComponent,
  },
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
      const thumb = document.querySelectorAll('.thumb');
      // const positionThumb = thumbs.getBoundingClientRect();
      // console.log(`'right' ${positionThumb.right}, 'left' ${positionThumb.left}`);

      // const widthThumb = positionThumb.right - positionThumb.left;

      // width of parent/ whole slider
      const slider = document.querySelector('.slider');
      const positionSlider = slider.getBoundingClientRect();
      // console.log(`'right' ${positionSlider.right}, 'left' ${positionSlider.left}`);

      function move(e) {
        const widthSlider = positionSlider.right - positionSlider.left;
        const intensityPos = widthSlider / 5;

        if (e.target.style.width === (`${(10)}%`)) {
          e.target.style.width = (`${(intensityPos)}px`);
        } else if (e.target.style.width === (`${(intensityPos)}px`)) {
          e.target.style.width = (`${(intensityPos * 2)}px`);
        } else if (e.target.style.width === (`${(intensityPos * 2)}px`)) {
          e.target.style.width = (`${(intensityPos * 3)}px`);
        } else if (e.target.style.width === (`${(intensityPos * 3)}px`)) {
          e.target.style.width = (`${(intensityPos * 4)}px`);
        } else if (e.target.style.width === (`${(intensityPos * 4)}px`)) {
          e.target.style.width = (`${(intensityPos * 5)}px`);
        } else e.target.style.width = (`${(10)}%`);
        e.target.classList.add('grabbing');
        console.log(`'Breite des Sliders' ${e.target.style.width}`);
        // this.$store.dispatch();
      }

      thumb.forEach((element) => {
        element.addEventListener('touchmove', move);
      });
      thumb.forEach((element) => {
        element.addEventListener('mousedown', move);
      });
      // funktioniert momentan nur mit click bei Firefox

      /*

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
