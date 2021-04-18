<template>
    <form @submit.prevent="login">
        <h1>Please sign in</h1>
        <input v-model="email" type="email" placeholder="email" required>
        <input v-model="password" type="password" placeholder="password" required>
        <button type="submit">Sign in</button>
    </form>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      email: 'Benjamin.Adolph@gmx.de',
      password: '12345678',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('AUTH_REQUEST', {
        email: this.email,
        password: this.password,
      })
        .then((success) => {
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

<style>

</style>
