<template>
  <div class="view">
     <header class="fine-header">
      <div class="center">
          <h1>Dashboard</h1>
      </div>
    </header>
    <SmartStack />
    <ModuleTeaser module="emotions" />
    <ModuleTeaser module="symptoms" />
  </div>
</template>

<script>
import SmartStack from '@/components/dashboard/SmartStack.vue';
import ModuleTeaser from '@/components/dashboard/ModuleTeaser.vue';

export default {
  name: 'Dashboard',
  components: {
    SmartStack,
    ModuleTeaser,
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
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/dashboard.scss";
</style>
