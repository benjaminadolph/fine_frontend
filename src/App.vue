<template>
<div>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld />
  <Dashboard />
</div>
  
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Dashboard from './components/Dashboard'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Dashboard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
