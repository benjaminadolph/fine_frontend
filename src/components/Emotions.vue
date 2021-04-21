<template>
  <div class="component">
    <header class="top">
      <img src="@/assets/images/emotions_icon_l.svg" />
      <!-- add media queries to icons -->
      <h2>Gefühle</h2>
    </header>
    <div class="lastentry">
      <header>
        <p>Letzter Eintrag:</p>
        <img src="@/assets/images/editButton_m.svg" />
      </header>
      <!-- needs to be an input with values -->
      <p id="label">Wut | 09.12.2020 | 19 Uhr</p>
      <input type="range" min="0" max="6" name="intensity">
    </div>
    <button type="submit">
      <img src="@/assets/images/add_icon_emotions_s.svg" />
      Gefühl hinzufügen
    </button>
  </div>
</template>

<script>

export default {
  name: 'Emotions',
  components: {
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/emotions.scss";
</style>
