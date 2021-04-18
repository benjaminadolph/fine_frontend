<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png">
    <Posts/>
    <button @click="logout" type="button">Logout</button>
    <p>You are logged in as: {{getProfile}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts.vue';

export default {
  name: 'Home',
  components: {
    Posts,
  },
  methods: {
    logout() {
      this.$store.dispatch('AUTH_LOGOUT')
        .then(() => {
          this.$router.push('/login');
          console.log('Logged Out');
        });
    },
  },
  computed: {
    getProfile() {
      return this.$store.state.user.profile.name;
    },

  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/home.scss";
</style>
