<template>
  <div class="view">
      <div class="logo">
            <img alt="Logo" src="../assets/images/fineLogo.svg">
      </div>
      <form @submit.prevent="register" class="register">
            <div class="headline">
                <h1>REGISTRIERUNG</h1>
                <div class='line'>
                     <hr class="hr-primary"/>
                </div>
            </div>
            <div class='text'>
                <p @click="focus">Vorname</p>
                <input type="vorname" id="firstname" v-model="firstName" required>
            </div>
            <div class='line'>
                <hr style="" />
            </div>
            <div class='text'>
                <p @click="focus">Nachname</p>
                <input type="nachname" id="lastname" v-model="lastName" required>
            </div>
            <div class='line'>
                <hr/>
            </div>
            <div class='text'>
                <p @click="focus">Geburtstag</p>
                <input type="date" id="birthday" name="birthday" v-model="birthDate" required>
            </div>
            <div class='line'>
                <hr/>
            </div>
             <div id='text-gender'>
                <p @click="focus">Geschlecht</p>
                <select id="gender" name="gender" v-model="gender">
                    <option value="Divers" selected>Divers</option>
                    <option value="Männlich">Männlich</option>
                    <option value="Weiblich">Weiblich</option>
                </select>
            </div>
            <div class='line'>
                <hr/>
            </div>
            <div class='text'>
            <p @click="focus">Email</p>
            <input type="email" id="email" v-model="email" required>
            </div>
            <div class='line'>
                <hr/>
            </div>
            <div class='text'>
                <p @click="focus">Passwort</p>
                <input type="password" id="password" v-model="password" required>
            </div>
            <div class='line'>
                <hr/>
            </div>
            <button type="submit">Registrierung</button>
            <div id="login">
                <router-link to="/login">
                    Du hast bereits ein Konto?<br />Zum Login
                </router-link>
            </div>
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
