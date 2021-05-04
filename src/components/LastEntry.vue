<template>
  <div class="lastentry" v-bind:class="module + '-soft-bgcolor'">
    <header>
      <p class="plain-m-book">Letzter Eintrag:</p>
      <img src="@/assets/icons/16-pencil.svg" />
    </header>
    <p class="plain-m-bold" id="label">
      {{ allModules.modules.symptoms.entry.label }} |
      {{ allModules.modules.symptoms.entry.date }} |
      {{ allModules.modules.symptoms.entry.time }}
    </p>
    <input type="range" min="0" max="6" name="intensity" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LastEntry',
  props: {
    module: String,
  },
  computed: mapGetters(['allModules']),
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/last-entry.scss";
</style>
