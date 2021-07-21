<template>
  <div class="settings">
     <header class="fine-header">
        <div class="center">
          <h1>Einstellungen</h1>
        </div>
        <router-link to="/">
          <a class="right-button shadow-button">
              <IconComponent v-bind:name="'arrow-left'" :size="16" />
          </a>
        </router-link>
    </header>
    <section class="personal-data">
      <form @submit.prevent="updateUser">
          <h2 class="plain-s-bold">Persönliche Daten</h2>
          <hr>
          <div class="line">
              <p class="plain-s-book label">Vorname</p>
              <input type="text" v-model="firstName" placeholder="Vorname"
              class="plain-m-bold entry">
          </div>
          <div class="line">
              <p class="plain-s-book label">Nachname</p>
              <input type="text" v-model="lastName" placeholder="Nachname"
              class="plain-m-bold entry">
          </div>
          <div class="line">
              <p class="plain-s-book label">Geburtsdatum</p>
              <input type="text" v-model="birthDate" placeholder="Geburtsdatum"
              class="plain-m-bold entry">
          </div>
          <div class="line">
              <p class="plain-s-book label">Geschlecht</p>
              <input type="text" v-model="gender" placeholder="Geschlecht"
              class="plain-m-bold entry">
          </div>
          <div class="line">
              <p class="plain-s-book label">E-Mail</p>
              <input type="email" v-model="email" placeholder="E-Mail"
              class="plain-m-bold entry">
          </div>
          <div class="line">
              <p class="plain-s-book label">Passwort</p>
              <input type="password" v-model="password" placeholder="Passwort"
              name="pw" id="password"
               class="plain-m-bold entry">
          </div>
        <button id="update" type="submit">Änderungen speichern</button>
        </form>
        <button id="delete" type="submit" v-on:click="deleteUser">Account löschen</button>
        <p>Du bist eingeloggt als: {{getUserProfile.email}}</p>
        <button @click="logout" type="button">Logout</button>
      </section>
      <ModulesSelected :showAll=true v-on:updateSelectedModules="updateModulesSelected" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  UPDATE_USER,
  DELETE_USER,
  UPDATE_USER_MODULESSELECTED,
} from '@/store/modules/user';
import { AUTH_LOGOUT } from '@/store/modules/auth';
import IconComponent from '../components/IconComponent.vue';
import ModulesSelected from '../components/ModulesSelected.vue';

export default {
  name: 'Settings',
  components: {
    IconComponent,
    ModulesSelected,
  },
  data() {
    return {
      profile: {},
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['getUserProfile']),
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.profile = this.getUserProfile;
      this.firstName = this.profile.firstName;
      this.lastName = this.profile.lastName;
      this.birthDate = this.profile.birthDate;
      this.gender = this.profile.gender;
      this.email = this.profile.email;
      this.password = this.profile.password;
    },
    updateModulesSelected(modulesSelected) {
      this.$store.dispatch(UPDATE_USER_MODULESSELECTED, {
        modulesSelected,
      })
        .then(() => {
          this.emitter.emit('modulesUpdated');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateUser() {
      this.$store.dispatch(UPDATE_USER, {
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        birthDate: this.birthDate,
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.profile = this.getUserProfile;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteUser() {
      this.$store.dispatch(DELETE_USER)
        .then(() => {
          this.$store.dispatch(AUTH_LOGOUT);
          this.$router.push('/register');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push('/login');
          console.log('Logged Out');
        });
    },
    goToDashboard() {
      this.$router.push({ name: 'Dashboard', params: '/dashboard' });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/settings.scss";
</style>
