<template>
  <div class="about">
    <form @submit.prevent="register">
        <h1>Please register</h1>
        <input v-model="firstName" type="text" placeholder="first name" required>
        <input v-model="lastName" type="text" placeholder="last name" required>
        <input v-model="gender" type="text" placeholder="gender" required>
        <input v-model="birthDate" type="text" placeholder="birthDate" required>
        <input v-model="email" type="email" placeholder="email" required>
        <input v-model="password" type="password" placeholder="password" required>
        <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { AUTH_REGISTER } from '@/store/modules/auth';

export default {
  name: 'Register',
  data() {
    return {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      this.$store.dispatch(AUTH_REGISTER, {
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        birthDate: this.birthDate,
        email: this.email,
        password: this.password,
      })
        .then(() => {
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

<style lang="scss" scoped>
  @import "@/assets/scss/views/register.scss";
</style>
