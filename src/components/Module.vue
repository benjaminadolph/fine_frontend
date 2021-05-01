<template>
  <div class="component">
    <header class="top">
      {{ icon }}
      {{ heading }}
    </header>
    <LastEntry
    :label="label"
    :date="date"
    :time="time" /> <!-- :color="" -->
    <Button
    :label="button_label"
    @search-click="$emit('show-search')" /> <!-- :color="" -->
    <!-- <AddEntry @click="$emit('show-search')" /> -->
  </div>
</template>

<script>
import LastEntry from '@/components/LastEntry.vue';
import Button from '@/components/Button.vue';
// import AddEntry from '@/components/AddEntry.vue';

export default {
  name: 'Module',
  props: {
    heading: String,
    icon: String,
    label: String,
    button_label: String,
    date: String,
    time: String,
    showAddEntry: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    LastEntry,
    Button,
    // AddEntry,
  },
  show: ['show-search'],
  data() {
    return {
      lastentry: [],
    };
  },
  methods: {
    addEntry(addentry) {
      this.lastentry = [...this.lastentry, addentry];
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/module.scss";
</style>
