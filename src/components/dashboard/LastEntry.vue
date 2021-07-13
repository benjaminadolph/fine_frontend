<template>
  <div class="lastentry" v-bind:class="lastEntry.module + '-soft-bgcolor'">
    <div v-show="isEmpty">
      <p class="plain-m-bold">
        Du hast noch keinen Eintrag gemacht.
      </p>
    </div>
    <div v-show="!isEmpty">
      <IconComponent name="pencil" :size=16 v-on:click="editEntry" class="pencil-icon"/>
      <p class="plain-m-bold">
        {{ getTitle() + ' | '  + getDate() + ' | ' + getTime() + ' Uhr' }}
      </p>
      <Slider :module="lastEntry.module"/>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Slider from '@/components/Slider.vue';
import IconComponent from '@/components/IconComponent.vue';

export default {
  name: 'LastEntry',
  components: {
    Slider,
    IconComponent,
  },
  props: {
    lastEntry: Object,
  },
  data() {
    return {
      defaultText: false,
      isEmpty: true,
    };
  },
  beforeUpdate() {
    // this.emptyLastEntry();
    if (Object.keys(this.lastEntry).length > 0) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  },
  methods: {
    getDate() {
      return dayjs(this.lastEntry.date).format('DD.MM.YYYY');
    },
    getTime() {
      return dayjs(this.lastEntry.date).format('HH:mm');
    },
    getTitle() {
      let label = '';
      if (this.lastEntry.module === 'symptoms') {
        label = `${this.lastEntry.category} | ${this.lastEntry.location.title}`;
      } else if (this.lastEntry.module === 'emotions') {
        label = `${this.lastEntry.emotion}`;
      } // ${this.lastEntry.location.title}
      return label;
    },
    editEntry() {
      this.$router.go(`/${this.lastEntry.module}/${this.lastEntry._id}`);
    },
  },
};

</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/last-entry.scss";
</style>
