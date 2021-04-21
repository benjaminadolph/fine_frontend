<template>
  <div class="component">
    <header class="top">
      <img src="@/assets/images/symptoms_icon_l.svg" />
      <!-- add media queries to icons -->
      <h2>Symptome</h2>
    </header>
    <div class="lastentry">
      <header>
        <p>Letzter Eintrag:</p>
        <img src="@/assets/images/editButton_m.svg" />
      </header>
      <!-- needs to be an input with values -->
      <p id="label">Migräne | Nacken | 21.02.2021 | 15:35 Uhr</p>
      <input type="range" min="0" max="6" name="intensity">
    </div>
    <AddButton />
  </div>
</template>

<script>
import AddButton from '@/components/AddButton.vue';

export default {
  name: 'Symptoms',
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
  @import "@/assets/scss/components/symptoms.scss";
</style>
