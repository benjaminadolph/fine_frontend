<template>
  <div class="lastentry" v-bind:class="module + '-soft-bgcolor'">
    <header>
      <p class="plain-m-book">Letzter Eintrag:</p>
      <img src="@/assets/icons/16-pencil.svg" />
    </header>
    <div class="label">
      <p class="plain-m-bold">
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
    lastEntry: Object,
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
      // console.log(this.lastEntry);
      // const { location: { title } } = this.lastEntry;
      let label = '';
      if (this.module === 'symptoms') {
        label = `${this.lastEntry.category}
        |  `;
      } else if (this.module === 'emotions') {
        label = `${this.lastEntry.emotion}`;
      }// ${this.lastEntry.location.title}
      return label;
    },
    emptyLastEntry() {
      console.log(this.module);
      if ((this.module !== 'symptoms' && this.module !== 'emotions')
      && (this.lastEntry.category === undefined
      || this.lastEntry.emotion === undefined
      || this.lastEntry.date === undefined
      || this.lastEntry.location === undefined)) {
        this.defaultText = true;
      } else this.defaultText = false;
      console.log(`default text is ${this.defaultText}`);
    },
  },
};

</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/last-entry.scss";
</style>
