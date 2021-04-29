<template>
  <div class="component">
        <img src="@/assets/images/fine_smile.svg" />
        <header>
          <p id="bold">Hallo Eva!</p>
          <p>Hier könnte eine Nachricht stehen</p>
        </header>
  </div>
</template>

<script>

export default {
  name: 'Widget',
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/widget.scss";
</style>
