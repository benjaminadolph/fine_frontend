<template>
    <header>
        <div class="left-button shadow-button" v-on:click="buttonClick(iconLeft)">
            <IconComponent :name="iconLeft" size="32" :color="color" />
        </div>
        <div class="center">
            <h1 v-bind:color="color">{{ title }}</h1>
            <Time />
        </div>
        <div class="right-button shadow-button">
            <IconComponent :name="iconRight" />
        </div>
    </header>
</template>

<script>
import IconComponent from '@/components/IconComponent.vue';
import Time from '@/components/Time.vue';

export default {
  name: 'Header',
  components: {
    IconComponent,
    Time,
  },
  props: {
    title: String,
    iconLeft: String,
    iconRight: String,
    color: {
      type: String,
      default: 'fine-grey-dark',
    },
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/components/header.scss";
</style>
