<template>
    <div>
        <button class="search" @click="onClick()" :style="{ background: color }">
        <img src="@/assets/images/add_icon_symptoms_s.svg" />
        {{ text }}
        </button>
    </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick() {
      this.$show('search-click');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/button.scss";
</style>
