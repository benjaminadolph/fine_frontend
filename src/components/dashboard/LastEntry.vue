<template>
  <div class="lastentry" v-bind:class="module + '-soft-bgcolor'">
    <header>
      <p class="plain-m-book">Letzter Eintrag:</p>
      <img src="@/assets/icons/16-pencil.svg" />
      <!-- was passiert beim Hovern über den Button? -->
    </header>
    <div class="label">
      <p class="plain-m-bold" v-bind="emptyLastEntry()">
      {{ defaultText === true ? 'Bitte füge einen Eintrag hinzu'
       : getTitle() + ' | '  + getDate() + ' | ' + getTime() + ' Uhr' }}
      </p>
    </div>
    <Slider :module="module"/>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Slider from '@/components/Slider.vue';

export default {
  name: 'LastEntry',
  components: {
    Slider,
  },
  props: {
    module: String,
    lastEntry: Array,
  },
  data() {
    return {
      defaultText: false,
    };
  },
  mounted() {
    this.emptyLastEntry();
  },
  methods: {
    getDate() {
      return dayjs(this.lastEntry.date).format('DD.MM.YYYY');
    },
    getTime() {
      return dayjs(this.lastEntry.date).format('HH:mm');
    },
    getTitle() {
      console.log(this.lastEntry);
      // const { location: { title } } = this.lastEntry;
      // let label = '';
      // if (this.module === 'symptoms') {
      //   label = `${this.lastEntry.category}
      //   |  ${this.lastEntry.location.title}`;
      // } else if (this.module === 'emotions') {
      //   label = `${this.lastEntry.emotion}`;
      // }
      // return label;
    },
    emptyLastEntry() {
      // const iterator = this.lastEntry[Symbol.iterator]();
      // console.log(iterator.next().item);

      // lastEntry.forEach((value) => {
      //   if (value === undefined || value.length === 0) {
      //     this.defaultText = true;
      //   } this.defaultText = false;
      // });

      Object.entries(this.lastEntry).forEach((value) => {
        console.log(value);
        if (value === undefined || value.length === 0) {
          this.defaultText = true;
        } this.defaultText = false;
      });
    },
  },
};

</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/last-entry.scss";
</style>
