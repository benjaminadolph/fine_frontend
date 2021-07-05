<template>
  <div class="settings">
     <header>
        <div class="shadow-button" @click="goToDashboard">
            <IconComponent v-bind:name="'arrow-left'" :size="16" />
        </div>
        <div class="center">
            <h1>Einstellungen</h1>
            <Time />
        </div>
         <div class="right-button">
      </div>
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
              <input type="email" v-model="email" placeholder="E-Mail"
              class="plain-m-bold entry">
          </div>
          <hr>
          <div class="line">
              <p class="plain-s-book label">Passwort</p>
              <input type="password" v-model="password" placeholder="Passwort"
              name="pw" id="password"
               class="plain-m-bold entry">
          </div>
        <button id="update" type="submit">Änderungen speichern</button>
        </form>
        <button id="delete" type="submit" v-on:click="deleteUser">Nutzer löschen</button>
      </section>
      <section class="modules">
          <h2 class="plain-s-bold">Module auswählen</h2>
          <hr>
          <!-- @Jen hier würde ich mit v-for über ein array laufen, weil das ja eigtl immer
           das gleiche ist, aber mit anderen Modulnamen -->
          <!-- das array allModules musst du halt noch erstellen in mounted() -->
          <!--
            allModules = [
              {name: 'symptoms', title: 'Symptome'},
              {name: 'sleep', title: 'Schlaf'}, ...}
            ]
          -->
         <!-- <div class="line" v-for="module in allModules">
            <IconComponent
              class="icon"
              v-bind:name="module.name"
              :size="24"
              v-bind:color="module.name + '-primary'"
            />
              // brauchst du auf das p ein id oder reicht eine class??
              habs jetzt mal als class geschrieben,
              damit es nicht kollidiert
              <p :id="module" class="plain-m-bold">{{module.title}}</p>
              <label :for="module.name" class="select-modules">
                <input type="checkbox" v-model="module.name" :name="module.name"
                :id="module.name" class="checkbox__input" @click="updateModulesSelected" />
                // Das icon muss zu den svg icons und ins iconsprite! das geht auch
                über die zwei farben, indem man das svg richtig abspeichert

              </label>
          </div> -->
          <div class="line">
              <IconComponent class="icon" v-bind:name="module = 'symptoms'"
               :size="24" v-bind:color="module + '-primary'" />
              <p id="symptoms" class="plain-m-bold">Symptome</p>
              <label for="check1" class="select-modules">
                <input type="checkbox" v-model="symptoms" name="symptoms"
                id="check1" class="checkbox__input" @click="updateModulesSelected" />

                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="checkbox__bg_1" clip-path="url(#clip0)">
                  <path class="checkbox__checkmark_outline_1" d="M15.9987 31.3311C24.4665 31.3311
                   31.3309 24.4666 31.3309 15.9989C31.3309 7.53114 24.4665 0.666672 15.9987
                    0.666672C7.53097 0.666672 0.666504 7.53114 0.666504 15.9989C0.666504
                     24.4666 7.53097 31.3311 15.9987 31.3311Z"
                  stroke="#434343" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path class="checkbox__checkmark_1" d="M8.29688 16.0333L13.4057 21.1421L23.6366
                   10.9112" stroke="#434343" stroke-miterlimit="10"
                  stroke-linecap="square"/>
                  <path class="checkbox__unchecked1" d="M16.0132 23.6661V8.32051"
                  stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  <path class="checkbox__unchecked1" d="M23.6791 15.9866H8.3335"
                   stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  </g>
                  <defs>
                  <clipPath id="clip0">
                  <rect width="32"
                   height="32" fill="white"/>
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

                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="checkbox__bg_2" clip-path="url(#clip0)">
                  <path class="checkbox__checkmark_outline_2" d="M15.9987 31.3311C24.4665 31.3311
                   31.3309 24.4666 31.3309 15.9989C31.3309 7.53114 24.4665 0.666672 15.9987
                    0.666672C7.53097 0.666672 0.666504 7.53114 0.666504 15.9989C0.666504
                     24.4666 7.53097 31.3311 15.9987 31.3311Z"
                  stroke="#434343" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path class="checkbox__checkmark_2" d="M8.29688 16.0333L13.4057 21.1421L23.6366
                   10.9112" stroke="#434343" stroke-miterlimit="10"
                  stroke-linecap="square"/>
                  <path class="checkbox__unchecked2" d="M16.0132 23.6661V8.32051"
                  stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  <path class="checkbox__unchecked2" d="M23.6791 15.9866H8.3335"
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

                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="checkbox__bg_3" clip-path="url(#clip0)">
                  <path class="checkbox__checkmark_outline_3" d="M15.9987 31.3311C24.4665 31.3311
                   31.3309 24.4666 31.3309 15.9989C31.3309 7.53114 24.4665 0.666672 15.9987
                    0.666672C7.53097 0.666672 0.666504 7.53114 0.666504 15.9989C0.666504
                     24.4666 7.53097 31.3311 15.9987 31.3311Z"
                  stroke="#434343" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path class="checkbox__checkmark_3" d="M8.29688 16.0333L13.4057 21.1421L23.6366
                   10.9112" stroke="#434343" stroke-miterlimit="10"
                  stroke-linecap="square"/>
                  <path class="checkbox__unchecked3" d="M16.0132 23.6661V8.32051"
                  stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  <path class="checkbox__unchecked3" d="M23.6791 15.9866H8.3335"
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

                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="checkbox__bg_4" clip-path="url(#clip0)">
                  <path class="checkbox__checkmark_outline_4" d="M15.9987 31.3311C24.4665 31.3311
                   31.3309 24.4666 31.3309 15.9989C31.3309 7.53114 24.4665 0.666672 15.9987
                    0.666672C7.53097 0.666672 0.666504 7.53114 0.666504 15.9989C0.666504
                     24.4666 7.53097 31.3311 15.9987 31.3311Z"
                  stroke="#434343" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path class="checkbox__checkmark_4" d="M8.29688 16.0333L13.4057 21.1421L23.6366
                   10.9112" stroke="#434343" stroke-miterlimit="10"
                  stroke-linecap="square"/>
                  <path class="checkbox__unchecked4" d="M16.0132 23.6661V8.32051"
                  stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  <path class="checkbox__unchecked4" d="M23.6791 15.9866H8.3335"
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

                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="checkbox__bg_5" clip-path="url(#clip0)">
                  <path class="checkbox__checkmark_outline_5" d="M15.9987 31.3311C24.4665 31.3311
                   31.3309 24.4666 31.3309 15.9989C31.3309 7.53114 24.4665 0.666672 15.9987
                    0.666672C7.53097 0.666672 0.666504 7.53114 0.666504 15.9989C0.666504
                     24.4666 7.53097 31.3311 15.9987 31.3311Z"
                  stroke="#434343" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path class="checkbox__checkmark_5" d="M8.29688 16.0333L13.4057 21.1421L23.6366
                   10.9112" stroke="#434343" stroke-miterlimit="10"
                  stroke-linecap="square"/>
                  <path class="checkbox__unchecked5" d="M16.0132 23.6661V8.32051"
                  stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  <path class="checkbox__unchecked5" d="M23.6791 15.9866H8.3335"
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
                <!-- @Jen, warum hier inline svg? Warum nicht die IconComponent?? -->
                <!-- wenn du in ein svg zb fill="currentColor" schreibst,
                kannst du das über css mit color: #fff ansprechen -->

                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="checkbox__bg_6" clip-path="url(#clip0)">
                  <path class="checkbox__checkmark_outline_6" d="M15.9987 31.3311C24.4665 31.3311
                   31.3309 24.4666 31.3309 15.9989C31.3309 7.53114 24.4665 0.666672 15.9987
                    0.666672C7.53097 0.666672 0.666504 7.53114 0.666504 15.9989C0.666504
                     24.4666 7.53097 31.3311 15.9987 31.3311Z"
                  stroke="#434343" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path class="checkbox__checkmark_6" d="M8.29688 16.0333L13.4057 21.1421L23.6366
                   10.9112" stroke="#434343" stroke-miterlimit="10"
                  stroke-linecap="square"/>
                  <path class="checkbox__unchecked6" d="M16.0132 23.6661V8.32051"
                  stroke="#434343" stroke-miterlimit="10"
                   stroke-linecap="square"/>
                  <path class="checkbox__unchecked6" d="M23.6791 15.9866H8.3335"
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
  UPDATE_USER,
  DELETE_USER,
  UPDATE_USER_MODULESSELECTED,
} from '@/store/modules/user';
import { AUTH_LOGOUT } from '@/store/modules/auth';
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
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      email: '',
      password: '',
      modulesSelected: [],
      symptoms: false,
      nutrition: false,
      sleep: false,
      activity: false,
      emotions: false,
      countermeasures: false,
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getModulesSelected']),
  },
  mounted() {
    this.getAllModulesSelected();
    this.getProfile();
  },
  methods: {
    getAllModulesSelected() {
      this.modulesSelected = this.getModulesSelected;
      for (let i = 0; i < this.modulesSelected.length; i += 1) {
        if (this.modulesSelected[i] === 'symptoms') {
          this.symptoms = true;
        }
        if (this.modulesSelected[i] === 'nutrition') {
          this.nutrition = true;
        }
        if (this.modulesSelected[i] === 'sleep') {
          this.sleep = true;
        }
        if (this.modulesSelected[i] === 'activity') {
          this.activity = true;
        }
        if (this.modulesSelected[i] === 'emotions') {
          this.emotions = true;
        }
      }
    },
    getProfile() {
      this.profile = this.getUserProfile;
      this.firstName = this.profile.firstName;
      this.lastName = this.profile.lastName;
      this.birthDate = this.profile.birthDate;
      this.gender = this.profile.gender;
      this.email = this.profile.email;
      this.password = this.profile.password;
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
          this.$router.go();
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
    goToDashboard() {
      this.$router.push({ name: 'Dashboard', params: '/dashboard' });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/settings.scss";
</style>
