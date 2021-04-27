<template>
    <div class="lastentry">
      <header>
        <p>Letzter Eintrag:</p>
        <img src="@/assets/images/editButton_m.svg" />
      </header>
      <!-- needs to be an input with values -->
      <p id="label">{{ entry }}</p>
      <input type="range" min="0" max="6" name="intensity">
    </div>
</template>

<script>
export default {
  name: 'LastEntry',
  props: {
    entry: Object,
    color: String,
  },
  /* methods: {

  } */
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/last-entry.scss";
</style>
