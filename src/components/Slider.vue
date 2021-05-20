<template>
  <div class="slider" v-bind:class="module + '-primary'">
    <!-- div wie der thumb, Breite mit x_Position berechnen,
    neue Position Klasse mit width in scss setzen,
    action mit Intensität bei entsprechender Position -->
    <input
      type="range"
      class="range-slider"
      id="slider"
      min="0"
      max="5"
      value="1"
      @v-touch:drag="dragSlider"
      v-bind:class="module + '-primary-bgcolor'"
    />
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
      length: 100,
      horizontal: true,
      thumbThickWidth: 30,
      thumbThinWidth: 10,
      trackWidth: 10,
    };
  },
  methods: {
    dragSlider() {
      const slider = document.querySelector('.range-slider');
      const sliderPos = slider.value / slider.max;
      console.log(sliderPos);
      // const style = getComputedStyle(slider);

      let isDragging = false;
      let startPos = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;
      let animationID = 0;
      console.log(isDragging);

      // auf der x-Achse Transformation ausführen
      function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
      }

      // Animation starten
      function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
      }

      // Position des Sliders bei Maus, Touch
      function getPositionX(event) {
        return event.type.includes('mouse')
          ? event.pageX
          : event.touches[0].clientX;
      }

      // event muss noch übergeben werden
      function touchStart() {
        return function (event) {
          startPos = getPositionX(event);
          console.log(startPos);
          isDragging = true;
          animationID = requestAnimationFrame(animation);
          slider.classList.add('grabbing');
        };
      }

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

      /* forEach Funktion

      slider.prototype.forEach.call((index) => {
      const thumb = document.querySelector('.range-slider'); */
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
      // });
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
