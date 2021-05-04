<template>
  <div id="main-menu">
    <ul>
        <li>
            <router-link to="/statistics">
                <IconComponent name="statistics" :size="24" />
            </router-link>
        </li>
        <li>
            <router-link to="/calendar">
                <IconComponent name="calendar" :size="24" />
            </router-link>
        </li>
        <li>
            <router-link to="/dashboard">
                <IconComponent name="home" :size="24" />
            </router-link>
        </li>
        <li>
            <router-link to="/module-entry/symptoms">
                <IconComponent name="plus-full" :size="50" />
            </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import IconComponent from '@/components/IconComponent.vue';

export default {
  name: 'Navigation',
  components: {
    IconComponent,
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/navigation.scss";
</style>
