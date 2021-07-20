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
      <section class="modules">
          <h2 class="plain-s-bold">Module auswählen</h2>
          <hr class="select">
         <div class="line" v-for="module in allModules" :key="module">
            <IconComponent
              class="icon"
              v-bind:name="module.name"
              :size="24"
              v-bind:color="module.name + '-primary'"
            />
              <p v-bind:class="module.name + '-primary'"
               class="plain-m-bold">{{ module.title }}</p>
              <label :for="module.name" class="select-modules">
                <div class="checkbox-border" v-bind:class="module.name + '-primary'">
                  <div class="checkbox-background" v-bind:class="module.name + '-soft-bgcolor'">
                      <input type="checkbox" v-model="module.selected" :name="module.name"
                      :id="module.name" class="checkbox-input"
                       v-bind:class="module.name + '-primary-bgcolor'"
                      @change="updateModulesSelected(module)" />
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

export default {
  name: 'Settings',
  components: {
    IconComponent,
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
      allModules: [
        {
          name: 'symptoms',
          title: 'Symptome',
          selected: false,
        },
        {
          name: 'sleep',
          title: 'Schlaf',
          selected: false,
        },
        {
          name: 'emotions',
          title: 'Gefühle',
          selected: false,
        },
        {
          name: 'activity',
          title: 'Bewegung',
          selected: false,
        },
        {
          name: 'nutrition',
          title: 'Ernährung',
          selected: false,
        },
        {
          name: 'countermeasures',
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
    this.setModulesTrue(this.modulesSelected, this.allModules);
  },
  methods: {
    getAllModulesSelected() {
      this.modulesSelected = this.getModulesSelected;
    },
    setModulesTrue(modules, compare) {
      /* eslint-disable-next-line */
      const compareModule = modules.map((module) => {
        for (let i = 0; i < this.allModules.length; i += 1) {
          if (this.allModules[i].name === module.toLowerCase()) {
            this.allModules[i].selected = true;
          }
        }
        return compare.reduce((obj, val) => {
          /* eslint-disable-next-line */
          if (module.toLowerCase() === val.toLowerCase) obj[module];
          return obj;
        }, { [module]: true });
      });
      return compareModule;
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
        if (this.modulesSelected === checkboxes[i].name) {
          this.modulesSelected.splice(checkboxes[i].name);
        } else this.modulesSelected.push(checkboxes[i].name);
      }
      this.setModulesTrue(this.modulesSelected, this.allModules);

      this.$store.dispatch(UPDATE_USER_MODULESSELECTED, {
        modulesSelected: this.modulesSelected,
      })
        .then(() => {
          this.modulesSelected = this.getModulesSelected;
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
