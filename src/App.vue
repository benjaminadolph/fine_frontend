<template>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/exampleview">ExampleView</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
  <router-view/>
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
