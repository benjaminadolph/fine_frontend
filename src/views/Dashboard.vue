<template>
  <div class="view">
    <Header title="Dashboard" />
    <SmartStack />
    <ModuleTeaser :module="'emotions'" />
    <ModuleTeaser :module="'symptoms'" />
  </div>
</template>

<script>
import SmartStack from '@/components/SmartStack.vue';
import ModuleTeaser from '@/components/ModuleTeaser.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'Dashboard',
  components: {
    SmartStack,
    ModuleTeaser,
    Header,
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
