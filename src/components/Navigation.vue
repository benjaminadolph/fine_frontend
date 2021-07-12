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
          <li v-on:click="showEntry = !showEntry">
            <a>
              <IconComponent name="plus-full" :size=50 />
            </a>
          </li>
      </ul>
    </div>
    <ModuleEntry
      v-if="showEntry"
      :module=module
      v-on:closeLayer="showEntry=false"
      v-on:changeModuleEntryLayer="changeModule"
    />
  </div>
</template>

<script>
import IconComponent from '@/components/IconComponent.vue';
import ModuleEntry from '@/components/entry/ModuleEntry.vue';

export default {
  name: 'Navigation',
  components: {
    IconComponent,
    ModuleEntry,
  },
  data() {
    return {
      showEntry: false,
      module: 'symptoms',
    };
  },
  methods: {
    changeModule(module) {
      this.module = module;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/navigation.scss";
</style>
