<template>
    <div>
        <button class="search" @click="onClick()" :style="{ background: color }">
        <img src="@/assets/images/add_icon_symptoms_s.svg" />
        {{ label }}
        </button>
    </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: String,
    color: String,
  },
  methods: {
    onClick() {
      this.$emit('search-click');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/button.scss";
</style>
