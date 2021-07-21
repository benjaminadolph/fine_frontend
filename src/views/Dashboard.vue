<template>
  <transition name="fade" appear>
    <div class="dashboard-view">
      <header class="fine-header">
        <div>
            <h1>Dashboard</h1>
        </div>
        <router-link to="/settings">
          <a class="right-button shadow-button">
              <IconComponent v-bind:name="'settings'" :size=16 />
          </a>
        </router-link>
      </header>
      <SmartStack />
      <ModuleTeaser v-for="module in modulesSelected" :key="module" :module="module" />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import SmartStack from '@/components/dashboard/SmartStack.vue';
import ModuleTeaser from '@/components/dashboard/ModuleTeaser.vue';
import IconComponent from '@/components/IconComponent.vue';

export default {
  name: 'Dashboard',
  components: {
    SmartStack,
    ModuleTeaser,
    IconComponent,
  },
  props: {
  },
  data() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return {
      date: `${dd}.${mm}.${yyyy}`,
      profile: {},
      modulesSelected: [],
      modules: [],
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getModulesSelected']),
  },
  mounted() {
    this.getAllModulesSelected();
  },
  methods: {
    getAllModulesSelected() {
      this.modulesSelected = this.getModulesSelected;
    },
    goToSettings() {
      this.$router.push({ name: 'Settings', params: '/settings' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/dashboard.scss";
</style>
