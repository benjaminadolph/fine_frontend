<template>
  <div class="settings">
     <header>
        <router-link to="/dashboard">
        <div class="shadow-button">
            <IconComponent v-bind:name="'arrow-left'" :size="16" />
        </div>
        </router-link>
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
        <button id="delete" type="submit" v-on:click="deleteUser">Nutzer löschen</button>
      </section>
      <section class="modules">
          <h2 class="plain-s-bold">Module auswählen</h2>
          <hr class="select">
          <!-- @Jen hier würde ich mit v-for über ein array laufen, weil das ja eigtl immer
           das gleiche ist, aber mit anderen Modulnamen -->
          <!-- das array allModules musst du halt noch erstellen in mounted() -->
         <div class="line" v-for="module in allModules" :key="module._id">
            <IconComponent
              class="icon"
              v-bind:name="module.label"
              :size="24"
              v-bind:color="module.label + '-primary'"
            />
              <!-- // brauchst du auf das p ein id oder reicht eine class??
              habs jetzt mal als class geschrieben,
              damit es nicht kollidiert -->
              <p v-bind:class="module.label + '-primary'"
               class="plain-m-bold">{{ module.title }}</p>
              <label :for="module.label" class="select-modules">
                <div class="checkbox-border" v-bind:class="module.label + '-primary'">
                  <div class="checkbox-background" v-bind:class="module.label + '-soft-bgcolor'">
                      <input type="checkbox" v-model="module.selected" :name="module.label"
                      :id="module.name" class="checkbox-input"
                       v-bind:class="module.label + '-primary-bgcolor'"
                      @change="updateModulesSelected" />
                      <!-- , emotions, sleep, activity,
                       nutrition, countermeasures -->
                    <!-- // Das icon muss zu den svg icons und ins iconsprite! das geht auch
                    über die zwei farben, indem man das svg richtig abspeichert
                    :checked="module.name" -->
                  </div>
                </div>
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
import IconComponent from '../components/IconComponent.vue';
import Time from '../components/Time.vue';

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
      sleep: false,
      emotions: false,
      activity: false,
      nutrition: false,
      countermeasures: false,
      allModules: [
        {
          id: 0,
          name: 'symptoms',
          label: 'symptoms',
          title: 'Symptome',
          selected: false,
        },
        {
          id: 1,
          name: 'sleep',
          label: 'sleep',
          title: 'Schlaf',
          selected: false,
        },
        {
          id: 2,
          name: 'emotions',
          label: 'emotions',
          title: 'Gefühle',
          selected: false,
        },
        {
          id: 3,
          name: 'activity',
          label: 'activity',
          title: 'Bewegung',
          selected: false,
        },
        {
          id: 4,
          name: 'nutrition',
          label: 'nutrition',
          title: 'Ernährung',
          selected: false,
        },
        {
          id: 5,
          name: 'countermeasures',
          label: 'countermeasures',
          title: 'Maßnahmen',
          selected: false,
        },
      ],
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
      console.log(this.modulesSelected);
      for (let i = 0; i < this.modulesSelected.length; i += 1) {
        if (this.modulesSelected[i] === this.allModules.name) {
          this.allModules.selected = true;
        }
      //   if (this.modulesSelected[i] === 'nutrition') {
      //     this.nutrition = true;
      //   }
      //   if (this.modulesSelected[i] === 'sleep') {
      //     this.sleep = true;
      //   }
      //   if (this.modulesSelected[i] === 'activity') {
      //     this.activity = true;
      //   }
      //   if (this.modulesSelected[i] === 'emotions') {
      //     this.emotions = true;
      //   }
      //   if (this.modulesSelected[i] === 'countermeasures') {
      //     this.countermeasures = true;
      //   }
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
      // if (this.modulesSelected.some((el) => el === checkboxes[i].name)) return;
      //   this.modulesSelected.push(checkboxes[i].name);
      // let enabledSettings = [];
      // checkboxes.forEach((checkbox) => {
      //   checkbox.addEventListener('change', () => {
      //     enabledSettings = Array.from(checkboxes).filter((i) => i.checked).map((i) => i.value);
      //     console.log(enabledSettings);
      //   });
      // });

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
    onChange() {
      switch (this.allModules.name) {
        case 'symptoms':
          this.symptoms = false;
          break;
        case 'sleep':
          this.sleep = false;
          break;
        case 'emotions':
          this.emotions = false;
          break;
        case 'activity':
          this.activity = false;
          break;
        case 'nutrition':
          this.nutrition = false;
          break;
        case 'countermeasures':
          this.countermeasures = false;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/settings.scss";
</style>
