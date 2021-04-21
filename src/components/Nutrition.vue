<template>
  <div class="component">
    <header class="top">
      <img src="@/assets/images/nutrition_icon_l.svg" />
      <!-- add media queries to icons -->
      <h2>Ernährung</h2>
    </header>
    <div class="lastentry">
      <header>
        <p>Letzter Eintrag:</p>
        <img src="@/assets/images/editButton_m.svg" />
      </header>
      <!-- needs to be an input with values -->
      <p id="label">21.02.2021 | 12:28 Uhr
        <ul>
            <li>gemischter Salat</li>
            <li>Brot mit Käse und Wurst</li>
            <li>Apfelschorle</li>
        </ul>
      </p>
      <input type="range" min="0" max="6" name="tolerability">
    </div>
    <AddButton />
  </div>
</template>

<script>
import AddButton from '@/components/AddButton.vue';

export default {
  name: 'Nutrition',
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
  @import "@/assets/scss/components/nutrition.scss";
</style>
