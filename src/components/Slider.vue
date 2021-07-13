<template>
  <div v-bind:class="module + '-range-bgcolor'" class="intensity-slider">
    <input
      type="range"
      v-model="entryIntensity"
      min="0"
      max="5"
      @input="handleInputChange"
    />
  </div>
</template>

<script>

export default {
  name: 'Slider',
  components: {
  },
  props: {
    module: String,
    intensity: Number,
  },
  data() {
    return {
      entryIntensity: this.intensity,
    };
  },
  methods: {
    handleInputChange(e) {
      const { target } = e;
      const val = target.value;
      const min = target.min ? target.min : 0;
      const max = target.max ? target.max : 5;
      const newVal = Number(((val - min) * 100) / (max - min));
      target.style.backgroundSize = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
      this.$emit('updateIntensity', val);
    },
  },
  /* mounted() {
    this.dragSlider();
  },
  computed: {
  }, */
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/slider.scss";
</style>
