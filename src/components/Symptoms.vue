<template>
    <panZoom id="symptoms-figure-container" :options="{minZoom: 0.5, maxZoom: 5, center: true}" >
       <IconComponent
        v-bind:name="'woman-front'"
        :size="653"
        :width="227"
        v-bind:color="primaryColor"
      />
      <!-- <img src="@/assets/images/woman-front.svg" /> -->
    </panZoom>
</template>

<script>
// https://github.com/thecodealer/vue-panzoom
import IconComponent from '@/components/IconComponent.vue';

export default {
  name: 'Symptoms',
  components: {
    IconComponent,
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/symptoms.scss";
</style>
