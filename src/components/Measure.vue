<template>
  <div class="component">
    <header class="top">
      <img src="@/assets/images/measure_icon_l.svg" />
      <!-- add media queries to icons -->
      <h2>Maßnahmen</h2>
    </header>
    <div class="lastentry">
      <header>
        <p>Letzter Eintrag:</p>
        <img src="@/assets/images/editButton_m.svg" />
      </header>
      <!-- needs to be an input with values -->
      <p id="label">Paracetamol200 | 21.02.2021 | 19 Uhr</p>
      <input type="range" min="0" max="6" name="effect">
    </div>
    <AddButton />
  </div>
</template>

<script>
import AddButton from '@/components/AddButton.vue';

export default {
  name: 'Measure',
  components: {
    AddButton,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/measure.scss";
</style>
