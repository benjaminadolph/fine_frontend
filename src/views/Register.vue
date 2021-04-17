<template>
  <div class="about">
    <form @submit.prevent="register">
        <h1>Please register</h1>
        <input v-model="name" type="text" placeholder="name" required>
        <input v-model="email" type="email" placeholder="email" required>
        <input v-model="password" type="password" placeholder="password" required>
        <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      this.$store.dispatch('AUTH_REGISTER', {
        name: this.name,
        email: this.email,
        password: this.password,
      })
        .then((success) => {
          console.log('New User created');
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
