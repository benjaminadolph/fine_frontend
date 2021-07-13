<template>
  <div v-bind:class="module + '-range-bgcolor'" class="intensity-slider">
    <input
      type="range"
      v-model="entryIntensity"
      min="0"
      max="5"
      ref="inputSlider"
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
  },
  data() {
    return {
      entryIntensity: 0,
    };
  },
  methods: {
    handleInputChange(e) {
      const { target } = e;
      const val = target.value;
      this.entryIntensity = val;
      const newVal = Number(((val - 0) * 100) / (5));
      target.style.backgroundSize = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
      this.$emit('updateIntensity', val);
    },
    setInput(intensity) {
      const val = intensity;
      this.entryIntensity = val;
      const newVal = Number(((val - 0) * 100) / (5));
      this.$refs.inputSlider.style.backgroundSize = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/slider.scss";
</style>
