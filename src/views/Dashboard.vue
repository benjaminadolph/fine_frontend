<template>
  <div class="view">
    <header class="fine-header">
      <div class="center">
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
      // console.log(this.modulesSelected);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/dashboard.scss";
</style>
