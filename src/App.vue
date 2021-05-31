<template>
  <div>
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import { AUTH_LOGOUT } from '@/store/modules/auth';

export default {
  name: 'App',
  components: {
    Navigation,
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
};
</script>

<style lang="scss">
  @import "@/assets/scss/views/app.scss";
</style>
