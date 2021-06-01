<template>
  <div class="settings">
     <header>
        <router-link to="/dashboard">
        <div class="shadow-button">
            <IconComponent v-bind:name="'arrow-left'" :size="16" />
        </div>
        </router-link>
        <div class="center">
            <h1 v-bind:color="color">Einstellungen</h1>
            <Time />
        </div>
         <div class="right-button">
      </div>
    </header>
      <section class="personal-data">
          <h2 class="plain-s-bold">Persönliche Daten</h2>
          <hr>
          <div class="line">
              <p class="plain-s-book label">Vorname</p>
              <input type="text" v-model="firstName" placeholder="Vorname"
              class="plain-m-bold entry">
          </div>
          <hr>
          <div class="line">
              <p class="plain-s-book label">Nachname</p>
              <input type="text" v-model="lastName" placeholder="Nachname"
              class="plain-m-bold entry">
          </div>
          <hr>
          <div class="line">
              <p class="plain-s-book label">Geburtsdatum</p>
              <input type="text" v-model="birthDate" placeholder="Geburtsdatum"
              class="plain-m-bold entry">
          </div>
          <hr>
          <div class="line">
              <p class="plain-s-book label">Geschlecht</p>
              <input type="text" v-model="gender" placeholder="Geschlecht"
              class="plain-m-bold entry">
          </div>
          <hr>
          <div class="line">
              <p class="plain-s-book label">E-Mail</p>
              <input type="text" v-model="email" placeholder="E-Mail"
              class="plain-m-bold entry">
          </div>
          <hr>
          <div class="line">
              <p class="plain-s-book label">Passwort</p>
              <input type="password" v-model="password" placeholder="Passwort"
              name="pw" id="password"
               class="plain-m-bold entry">
          </div>
      </section>
      <section class="modules">
          <h2 class="plain-s-bold">Module auswählen</h2>
          <hr>
          <div class="line">
              <IconComponent class="icon" v-bind:name="module = 'symptoms'"
               :size="24" v-bind:color="module + '-primary'" />
              <p id="symptoms" class="plain-m-bold">Symptome</p>
              <input type="checkbox" name="checkbox-symptoms" id="symptoms" class="checkbox" />
          </div>
          <hr>
          <div class="line">
              <IconComponent class="icon" v-bind:name="module = 'sleep'"
               :size="24" v-bind:color="module + '-primary'" />
              <p id="sleep" class="plain-m-bold">Schlaf</p>
              <input type="checkbox" name="checkbox-symptoms" id="symptoms" class="checkbox" />
          </div>
          <hr>
          <div class="line">
              <IconComponent class="icon" v-bind:name="module = 'nutrition'"
               :size="24" v-bind:color="module + '-primary'" />
              <p id="nutrition" class="plain-m-bold">Ernährung</p>
              <input type="checkbox" name="checkbox-symptoms" id="symptoms" class="checkbox" />
          </div>
          <hr>
          <div class="line">
              <IconComponent class="icon" v-bind:name="module = 'activity'"
               :size="24" v-bind:color="module + '-primary'" />
              <p id="activity" class="plain-m-bold">Bewegung</p>
              <input type="checkbox" name="checkbox-symptoms" id="symptoms" class="checkbox" />
          </div>
          <hr>
          <div class="line">
              <IconComponent class="icon" v-bind:name="module = 'emotions'"
               :size="24" v-bind:color="module + '-primary'" />
              <p  id="emotions" class="plain-m-bold">Gefühle</p>
              <input type="checkbox" name="checkbox-symptoms" id="symptoms" class="checkbox" />
          </div>
          <hr>
          <div class="line">
              <IconComponent class="icon" v-bind:name="module = 'countermeasures'"
               :size="24" v-bind:color="module + '-primary'" />
              <p id="countermeasures" class="plain-m-bold">Maßnahmen</p>
              <input type="checkbox" name="checkbox-symptoms" id="symptoms" class="checkbox" />
          </div>
      </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  // UPDATE_USER,
  UPDATE_MODULESSELECTED,
} from '@/store/modules/user';
import IconComponent from './IconComponent.vue';
import Time from './Time.vue';

export default {
  name: 'Settings',
  components: {
    IconComponent,
    Time,
  },
  data() {
    return {
      profile: {},
      id: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getModulesSelected']),
  },
  methods: {
    updateUser() {
      this.$store.dispatch(UPDATE_USER, {
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate,
        gender: this.gender,
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
    updateModulesSelected() {
      this.$store.dispatch(UPDATE_MODULESSELECTED, {
        modulesSelected: this.modulesSelected,
      })
        .then(() => {
          this.profile = this.getModulesSelected;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/settings.scss";
</style>
