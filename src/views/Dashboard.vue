<template>
  <div class="view">
    <header>
      <div class="left-button">
      </div>
      <div class="center">
            <h1 v-bind:color="color">Dashboard</h1>
            <Time />
        </div>
        <router-link to="/settings">
          <div class="shadow-button">
              <IconComponent v-bind:name="'settings'" :size="16" />
          </div>
        </router-link>
    </header>
    <SmartStack />
    <ModuleTeaser module="emotions" />
    <ModuleTeaser module="symptoms" />
  </div>
</template>

<script>
import SmartStack from '@/components/SmartStack.vue';
import ModuleTeaser from '@/components/ModuleTeaser.vue';
import IconComponent from '@/components/IconComponent.vue';
import Time from '@/components/Time.vue';

export default {
  name: 'Dashboard',
  components: {
    SmartStack,
    ModuleTeaser,
    IconComponent,
    Time,
  },
  props: {
    module: String,
  },
  data() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return {
      date: `${dd}.${mm}.${yyyy}`,
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/dashboard.scss";
</style>
