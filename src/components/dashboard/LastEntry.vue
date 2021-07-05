<template>
  <div class="lastentry" v-bind:class="module + '-soft-bgcolor'">
    <header>
      <p class="plain-m-book">Letzter Eintrag:</p>
      <img src="@/assets/icons/16-pencil.svg" />
      <!-- was passiert beim Hovern über den Button? -->
    </header>
    <div class="label" v-if="defaultText != null">
      <p class="plain-m-bold">
      {{ getTitle() + ' | ' }}
      </p>
      <p class="plain-m-bold">
       {{ getDate() + ' | ' }}
      </p>
      <p class="plain-m-bold">
       {{ getTime() + ' Uhr' }}
      </p>
    </div>
    <div class="label" v-if="defaultText == null">
      <p class="plain-m-bold">
        {{ defaultText }}
      </p>
    </div>
    <input type="range" min="0" max="6" name="intensity" />
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'LastEntry',
  props: {
    module: String,
    lastEntry: Object,
    defaultText: String,
  },
  methods: {
    getDate() {
      return dayjs(this.lastEntry.date).format('DD.MM.YYYY');
    },
    getTime() {
      return dayjs(this.lastEntry.date).format('HH:mm');
    },
    getTitle() {
      let title = '';
      console.log(this.lastEntry);
      if (this.module === 'symptoms') {
        title = `${this.lastEntry.category}`;
      } else if (this.module === 'emotions') {
        // title = this.lastEntry.emotion.join(' | ');
      }
      return title;
    },
    //  | ${this.lastEntry.location.title}
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/last-entry.scss";
</style>
