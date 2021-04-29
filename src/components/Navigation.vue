<template>
  <div id="main-menu">
    <ul>
        <li>
            <router-link to="/statistics">
                <IconComponent name="statistics" :size="32" />
            </router-link>
        </li>
        <li>
            <router-link to="/calendar">
                <IconComponent name="calendar" :size="32" />
            </router-link>
        </li>
        <li>
            <router-link to="/dashboard">
                <IconComponent name="home" :size="32" />
            </router-link>
        </li>
        <li>
            <router-link to="/module-entry">
                <IconComponent name="add-full" :size="32" />
            </router-link>
        </li>
    </ul>
    <router-view/>
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
