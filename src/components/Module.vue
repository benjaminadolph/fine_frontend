<template>
  <div class="component">
    <header class="top">
      <img src="@/assets/images/symptoms_icon_l.svg" />
      <!-- add media queries to icons -->
      <h2>{{ heading }}</h2> <!-- :color="" -->
    </header>
    <LastEntry /> <!-- :text="" :color="" -->
    <Button /> <!-- :text="" :color="" -->
  </div>
</template>

<script>
import LastEntry from '@/components/LastEntry.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'Module',
  props: {
    heading: String,
    color: String,
    addEntry: Array,
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
