<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png">
    <Posts/>
    <button @click="logout" type="button">Logout</button>
    <p>You are logged in as: {{getUserProfile.email}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts.vue';
import { AUTH_LOGOUT } from '@/store/modules/auth';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    Posts,
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push('/login');
          console.log('Logged Out');
        });
    },
  },
  computed: {
    ...mapGetters(['getUserProfile']),
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/home.scss";
</style>
