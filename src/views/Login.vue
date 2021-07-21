<template>
  <div class="view">
    <div class="logo">
            <img alt="Logo" src="../assets/images/fineLogo.svg">
      </div>
      <form @submit.prevent="login" class="login">
            <div class="headline">
                <h1>LOGIN</h1>
                <div class="line">
                     <hr class="hr-primary"/>
                </div>
            </div>
            <div class="text">
            <p @click="focus">Email</p>
            <input type="email" id="email" v-model="email" required>
            </div>
            <div class="line">
                <hr/>
            </div>
            <div class="text">
                <p @click="focus">Passwort</p>
                <input type="password" id="password" v-model="password" required>
            </div>
            <div class="line">
                <hr/>
            </div>
            <button type="submit">Anmelden</button>
            <div id="login">
                <router-link to="/register">
                    Du hast noch kein Konto?<br />Jetzt Registrieren
                </router-link>
            </div>
      </form>

  </div>
</template>

<script>
import { AUTH_LOGIN } from '@/store/modules/auth';

export default {
  name: 'Login',
  data() {
    return {
      email: 'test@test.de',
      password: 'testen',
    };
  },
  methods: {
    login() {
      this.$store.dispatch(AUTH_LOGIN, {
        email: this.email,
        password: this.password,
      })
        .then(() => {
          console.log('Logged In');
          this.$router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/login.scss";
</style>
