<template>
  <div class="cards-box" >
    <div class="card hide" @click="swipeCard" @touchstart="touchStart" @touchend="touchEnd">
        <div class="content-placeholder">
          <img src="@/assets/images/fine_smile.svg" />
          <header>
            <p class="plain-m-bold">Hallo {{ firstName }}!</p>
            <p class="plain-m-book">Hier könnte eine Nachricht stehen.</p>
          </header>
        </div>
    </div>
    <div class="card" @click="swipeCard" @touchstart="touchStart" @touchend="touchEnd">
        <div class="content-placeholder">
          <img src="@/assets/images/fine_smile.svg" />
          <header>
            <p class="plain-m-bold">Guten Morgen {{ firstName }}!</p>
            <p class="plain-m-book">Wie geht es dir? Trage jetzt deine Gefühlslage ein.</p>
          </header>
        </div>
    </div>
    <div class="card" @click="swipeCard" @touchstart="touchStart" @touchend="touchEnd">
         <div class="content-placeholder">
          <img src="@/assets/images/fine_smile.svg" />
          <header>
            <p class="plain-m-bold">Hallo {{ firstName }}!</p>
            <p class="plain-m-book">Wie hast du dein Essen vertragen? Bewerte jetzt!</p>
          </header>
        </div>
    </div>
    <div class="card" @click="swipeCard" @touchstart="touchStart" @touchend="touchEnd">
         <div class="content-placeholder">
          <img src="@/assets/images/fine_smile.svg" />
          <header>
            <p class="plain-m-bold">Gut gemacht {{ firstName }}!</p>
            <p class="plain-m-book">Du hast heute 3 Einträge gemacht. Weiter so!</p>
          </header>
        </div>
    </div>
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
      imageNodes: [],
      arrIndexes: [],
      touchstartX: 0,
      touchstartY: 0,
      touchendX: 0,
      touchendY: 0,
    };
  },
  computed: {
    ...mapGetters(['getUserProfile']),
  },
  mounted() {
    this.getProfile();
    const sliderImagesBox = document.querySelectorAll('.cards-box');
    sliderImagesBox.forEach((el) => {
      this.imageNodes = el.querySelectorAll('.card:not(.hide)');
      (() => {
        // The loop that added values to the arrIndexes array for the first time
        let start = 0;
        while (this.imageNodes.length > start) {
          // eslint-disable-next-line no-plusplus
          this.arrIndexes.push(start++);
        }
      })();
      this.setIndex(this.arrIndexes);
    });
  },
  methods: {
    getProfile() {
      this.profile = this.getUserProfile;
      this.firstName = this.profile.firstName;
    },
    swipeCard() {
      this.arrIndexes.unshift(this.arrIndexes.pop());
      this.setIndex(this.arrIndexes);
    },
    setIndex(arr) {
    // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.imageNodes.length; i++) {
        this.imageNodes[i].dataset.slide = arr[i]; // Set indexes
      }
    },
    touchStart(event) {
      this.touchstartX = event.changedTouches[0].screenX;
      this.touchstartY = event.changedTouches[0].screenY;
    },
    touchEnd(event) {
      this.touchendX = event.changedTouches[0].screenX;
      this.touchendY = event.changedTouches[0].screenY;
      this.handleGesture();
    },
    handleGesture() {
      if (this.touchendY >= this.touchstartY) {
        this.swipeCard();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/smart-stack.scss";
</style>
