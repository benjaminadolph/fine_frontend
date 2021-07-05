<template>
  <div class="component">
        <img src="@/assets/images/fine_smile.svg" />
        <header>
          <p class="plain-m-bold">Hallo {{ firstName }}</p>
          <p class="plain-m-book">Hier könnte eine Nachricht stehen</p>
        </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SmartStack',
  data() {
    return {
      profile: {},
      firstName: '',
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
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/smart-stack.scss";
</style>
