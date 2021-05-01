<template>
    <div>
        <input type="search" @click="$emit('show-search')" />
    </div>
</template>

<script>
export default {
  name: 'AddEntry',
  props: {
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/add-entry.scss";
</style>
