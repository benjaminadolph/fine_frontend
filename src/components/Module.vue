<template>
  <div class="component">
    <header class="top">
      <img src="@/assets/images/symptoms_icon_l.svg" />
      <!-- add media queries to icons -->
      <h2>Symptome</h2>
    </header>
    <LastEntry />
    <Button />
  </div>
</template>

<script>
import LastEntry from '@/components/LastEntry.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'Module',
  props: {
    text: String,
  },
  components: {
    LastEntry,
    Button,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/module.scss";
</style>
