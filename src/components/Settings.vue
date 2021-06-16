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
              <label for="check1" class="select-modules">
                <input type="checkbox" v-model="symptoms" name="symptoms"
                id="check1" class="checkbox__input" @click="updateModulesSelected" />

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="checkbox__bg_1" clip-path="url(#clip0)">
                  <path class="checkbox__checkmark_outline_1" d="M8.00062 15.5012C12.1431
                  15.5012 15.5012 12.1431 15.5012 8.00062C15.5012 3.85814 12.1431 0.5 8.00062
                  0.5C3.85814 0.5 0.5 3.85814 0.5
                  8.00062C0.5 12.1431 3.85814 15.5012 8.00062 15.5012Z"
                  stroke="#434343" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path class="checkbox__checkmark_1" d="M4.23468 8.01999L6.73156
                  10.5269L11.7453 5.51312" stroke="#434343" stroke-miterlimit="10"
                  stroke-linecap="square"/>
                  <path class="checkbox__unchecked" d="M8.005 11.7427V4.23737"
                  stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  <path class="checkbox__unchecked" d="M11.7527 7.995H4.24738"
                   stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  </g>
                  <defs>
                  <clipPath id="clip0">
                  <rect width="16"
                   height="16" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
              </label>
          </div>
          <hr>
          <div class="line">
              <IconComponent class="icon" v-bind:name="module = 'sleep'"
               :size="24" v-bind:color="module + '-primary'" />
              <p id="sleep" class="plain-m-bold">Schlaf</p>
              <label for="check2" class="select-modules">
                <input type="checkbox" v-model="sleep" name="sleep"
                id="check2" class="checkbox__input" @click="updateModulesSelected" />

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="checkbox__bg_2" clip-path="url(#clip0)">
                  <path class="checkbox__checkmark_outline_2" d="M8.00062 15.5012C12.1431
                  15.5012 15.5012 12.1431 15.5012 8.00062C15.5012 3.85814 12.1431 0.5 8.00062
                  0.5C3.85814 0.5 0.5 3.85814 0.5
                  8.00062C0.5 12.1431 3.85814 15.5012 8.00062 15.5012Z"
                  stroke="#434343" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path class="checkbox__checkmark_2" d="M4.23468 8.01999L6.73156
                  10.5269L11.7453 5.51312" stroke="#434343" stroke-miterlimit="10"
                  stroke-linecap="square"/>
                  <path class="checkbox__unchecked" d="M8.005 11.7427V4.23737"
                  stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  <path class="checkbox__unchecked" d="M11.7527 7.995H4.24738"
                   stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  </g>
                  <defs>
                  <clipPath id="clip0">
                  <rect width="16"
                   height="16" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
              </label>
          </div>
          <hr>
          <div class="line">
              <IconComponent class="icon" v-bind:name="module = 'nutrition'"
               :size="24" v-bind:color="module + '-primary'" />
              <p id="nutrition" class="plain-m-bold">Ernährung</p>
              <label for="check3" class="select-modules">
                <input type="checkbox" v-model="nutrition" name="nutrition"
                id="check3" class="checkbox__input" @click="updateModulesSelected" />

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="checkbox__bg_3" clip-path="url(#clip0)">
                  <path class="checkbox__checkmark_outline_3" d="M8.00062 15.5012C12.1431
                  15.5012 15.5012 12.1431 15.5012 8.00062C15.5012 3.85814 12.1431 0.5 8.00062
                  0.5C3.85814 0.5 0.5 3.85814 0.5
                  8.00062C0.5 12.1431 3.85814 15.5012 8.00062 15.5012Z"
                  stroke="#434343" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path class="checkbox__checkmark_3" d="M4.23468 8.01999L6.73156
                  10.5269L11.7453 5.51312" stroke="#434343" stroke-miterlimit="10"
                  stroke-linecap="square"/>
                  <path class="checkbox__unchecked" d="M8.005 11.7427V4.23737"
                  stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  <path class="checkbox__unchecked" d="M11.7527 7.995H4.24738"
                   stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  </g>
                  <defs>
                  <clipPath id="clip0">
                  <rect width="16"
                   height="16" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
              </label>
          </div>
          <hr>
          <div class="line">
              <IconComponent class="icon" v-bind:name="module = 'activity'"
               :size="24" v-bind:color="module + '-primary'" />
              <p id="activity" class="plain-m-bold">Bewegung</p>
              <label for="check4" class="select-modules">
                <input type="checkbox" v-model="activity" name="activity"
                id="check4" class="checkbox__input" @click="updateModulesSelected" />

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="checkbox__bg_4" clip-path="url(#clip0)">
                  <path class="checkbox__checkmark_outline_4" d="M8.00062 15.5012C12.1431
                  15.5012 15.5012 12.1431 15.5012 8.00062C15.5012 3.85814 12.1431 0.5 8.00062
                  0.5C3.85814 0.5 0.5 3.85814 0.5
                  8.00062C0.5 12.1431 3.85814 15.5012 8.00062 15.5012Z"
                  stroke="#434343" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path class="checkbox__checkmark_4" d="M4.23468 8.01999L6.73156
                  10.5269L11.7453 5.51312" stroke="#434343" stroke-miterlimit="10"
                  stroke-linecap="square"/>
                  <path class="checkbox__unchecked" d="M8.005 11.7427V4.23737"
                  stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  <path class="checkbox__unchecked" d="M11.7527 7.995H4.24738"
                   stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  </g>
                  <defs>
                  <clipPath id="clip0">
                  <rect width="16"
                   height="16" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
              </label>
          </div>
          <hr>
          <div class="line">
              <IconComponent class="icon" v-bind:name="module = 'emotions'"
               :size="24" v-bind:color="module + '-primary'" />
              <p  id="emotions" class="plain-m-bold">Gefühle</p>
              <label for="check5" class="select-modules">
                <input type="checkbox" v-model="emotions" name="emotions"
                id="check5" class="checkbox__input" @click="updateModulesSelected" />

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="checkbox__bg_5" clip-path="url(#clip0)">
                  <path class="checkbox__checkmark_outline_5" d="M8.00062 15.5012C12.1431
                  15.5012 15.5012 12.1431 15.5012 8.00062C15.5012 3.85814 12.1431 0.5 8.00062
                  0.5C3.85814 0.5 0.5 3.85814 0.5
                  8.00062C0.5 12.1431 3.85814 15.5012 8.00062 15.5012Z"
                  stroke="#434343" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path class="checkbox__checkmark_5" d="M4.23468 8.01999L6.73156
                  10.5269L11.7453 5.51312" stroke="#434343" stroke-miterlimit="10"
                  stroke-linecap="square"/>
                  <path class="checkbox__unchecked" d="M8.005 11.7427V4.23737"
                  stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  <path class="checkbox__unchecked" d="M11.7527 7.995H4.24738"
                   stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  </g>
                  <defs>
                  <clipPath id="clip0">
                  <rect width="16"
                   height="16" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
              </label>
          </div>
          <hr>
          <div class="line">
              <IconComponent class="icon" v-bind:name="module = 'countermeasures'"
               :size="24" v-bind:color="module + '-primary'" />
              <p id="countermeasures" class="plain-m-bold">Maßnahmen</p>
              <label for="check6" class="select-modules">
                <input type="checkbox" name="countermeasures"
                id="check6" class="checkbox__input" />

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="checkbox__bg_6" clip-path="url(#clip0)">
                  <path class="checkbox__checkmark_outline_6" d="M8.00062 15.5012C12.1431
                  15.5012 15.5012 12.1431 15.5012 8.00062C15.5012 3.85814 12.1431 0.5 8.00062
                  0.5C3.85814 0.5 0.5 3.85814 0.5
                  8.00062C0.5 12.1431 3.85814 15.5012 8.00062 15.5012Z"
                  stroke="#434343" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path class="checkbox__checkmark_6" d="M4.23468 8.01999L6.73156
                  10.5269L11.7453 5.51312" stroke="#434343" stroke-miterlimit="10"
                  stroke-linecap="square"/>
                  <path class="checkbox__unchecked" d="M8.005 11.7427V4.23737"
                  stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  <path class="checkbox__unchecked" d="M11.7527 7.995H4.24738"
                   stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  </g>
                  <defs>
                  <clipPath id="clip0">
                  <rect width="16"
                   height="16" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
              </label>
          </div>
      </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  // UPDATE_USER,
  UPDATE_USER_MODULESSELECTED,
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
      modulesSelected: [],
      symptoms: {},
      nutrition: {},
      sleep: {},
      activity: {},
      emotions: {},
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getModulesSelected']),
  },
  mounted() {
    this.getAllModulesSelected();
    // einzelne Module sind beim Neuladen nicht mehr ausgewählt,
    // obwohl sie im Datensatz vorhanden sind (Local Storage?)
  },
  methods: {
    getAllModulesSelected() {
      this.modulesSelected = this.getModulesSelected;
    },
    updateModulesSelected() {
      this.modulesSelected = [];
      const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < checkboxes.length; i++) {
        this.modulesSelected.push(checkboxes[i].name);
      }
      this.$store.dispatch(UPDATE_USER_MODULESSELECTED, {
        modulesSelected: this.modulesSelected,
      })
        .then(() => {
          this.modulesSelected = this.getModulesSelected;
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/settings.scss";
</style>
