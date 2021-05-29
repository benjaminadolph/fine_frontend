<template>
  <form @submit.prevent="login">
      <img class="fine-logo" src="@/assets/images/fineLogo.svg" />
      <h1>Please sign in</h1>
      <input v-model="email" type="email" placeholder="email" required>
      <input v-model="password" type="password" placeholder="password" required>
      <button type="submit" class="btn-primary">Sign in</button>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: 'test@example.com',
      password: 'test123',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('AUTH_LOGIN', {
        email: this.email,
        password: this.password,
      })
        .then(() => {
          console.log('Logged In');
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/login.scss";
</style>
