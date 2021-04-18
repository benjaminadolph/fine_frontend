<template>
  <login-form />
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss">
  @import "@/assets/scss/views/login.scss";
</style>
