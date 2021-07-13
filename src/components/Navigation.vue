<template>
  <div>
    <div id="main-menu">
      <ul>
          <li>
              <router-link to="/statistics">
                  <IconComponent name="statistics" :size=24 />
              </router-link>
          </li>
          <li>
              <router-link to="/calendar">
                  <IconComponent name="calendar" :size=24 />
              </router-link>
          </li>
          <li>
              <router-link to="/">
                  <IconComponent name="home" :size=24 />
              </router-link>
          </li>
          <li v-on:click="$emit('showEntryLayer')">
            <a>
              <IconComponent name="plus-full" :size=50 />
            </a>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconComponent from '@/components/IconComponent.vue';

export default {
  name: 'Navigation',
  components: {
    IconComponent,
  },
  data() {
    return {
      module: 'symptoms',
    };
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/navigation.scss";
</style>
