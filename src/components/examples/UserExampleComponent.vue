<template>
  <div>
    <div>
        <h1>Userddata</h1>
        {{profile}}
    </div>
    <form @submit.prevent="updateUser">
        <h1>Update User</h1>
        <input v-model="firstName" type="text" placeholder="first name" >
        <input v-model="lastName" type="text" placeholder="last name" >
        <input v-model="gender" type="text" placeholder="gender" >
        <input v-model="birthDate" type="text" placeholder="birthDate" >
        <input v-model="email" type="email" placeholder="email" >
        <input v-model="password" type="password" placeholder="password" >
        <button type="submit">Update</button>
    </form>
    <button type="submit" v-on:click="deleteUser">NUTZER LÖSCHEN</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { UPDATE_USER, DELETE_USER } from '@/store/modules/user';
import { AUTH_LOGOUT } from '@/store/modules/auth';

export default {
  name: 'Symptoms',
  data() {
    return {
      profile: {},
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getModulesSelected']),
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.profile = this.getUserProfile;
    },
    /* eslint-disable max-len */
    // @Jen: Es werden alle Parameter des Users geupdatet, welche in diesem dispatch mitgegeben werden
    // also falls du z.B. nur den Namen updaten willst, solltest du in einer computed-Funktion entweder ein Objekt erstellen,
    // welches nur die Parameter enthält welöche geupdatet werden sollen oder du gibst beim Dispatch einfach die alten Inhalte mit.
    // Bei Fragen einfach melden

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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
