<template>
  <div>
    <Navigation v-on:showEntryLayer="showEntry=true"/>
    <router-view />
    <ModuleEntry
      v-if="showEntry"
      module='symptoms'
      v-on:closeLayer="updateView"
    />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import ModuleEntry from '@/components/entry/ModuleEntry.vue';
import { AUTH_LOGOUT } from '@/store/modules/auth';

export default {
  name: 'App',
  components: {
    Navigation,
    ModuleEntry,
  },
  data() {
    return {
      showEntry: false,
    };
  },
  created() {
    axios.interceptors.response.use(undefined, (err) => new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
        resolve(resp);
        this.$store.dispatch(AUTH_LOGOUT); // you can also redirect to /login if needed !
        reject(err);
      }
      throw err;
    }));
  },
  methods: {
    updateView() {
      this.showEntry = false;
      this.emitter.emit('updateCalendar');
    },
  },
};
</script>

<style lang="scss">
  @import "@/assets/scss/views/app.scss";
</style>
