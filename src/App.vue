<template>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/exampleview">ExampleView</router-link> |
      <router-link to="/module-entry/symptoms">Symptom Eingabe</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
      <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
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
