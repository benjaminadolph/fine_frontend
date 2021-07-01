<template>
  <div class="day-entry">
    <div
      class="entry"
      v-for="entry in entries"
      :key="entry"
      :class="getClasses(entry)"
      :id="entry._id"
      @touchstart="touchstart"
    >
      <div class="intensity-bar" :class="getIntensity(entry)"></div>
      <div class="entry-headline">
        <span class="date">{{ getDate(entry.date) }} Uhr</span>
        <span class="title">
          {{ getTitle(entry) }}
        </span>
      </div>
      <div
        class="delete-entry"
        v-on:click="removeEntry(entry, $event)"
      >
        <IconComponent
          name="trash"
          :size=24
          color="white"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import IconComponent from '@/components/IconComponent.vue';

export default {
  name: 'DayEntry',

  components: {
    IconComponent,
  },

  props: {
    entries: Object,
    week: Number,
  },

  data() {
    return {
      touch: {
        startX: 0,
        endX: 0,
      },
    };
  },

  methods: {
    getDate(entryDate) {
      return dayjs(entryDate).format('HH:mm');
    },
    getClasses(entry) {
      const classList = `${entry.module}-primary`;
      return classList;
    },
    getIntensity(entry) {
      const intensityClass = `${entry.module}-bgcolor-intensity-${entry.intensity}`;
      return intensityClass;
    },
    showDelete(entry) {
      console.log(entry);
      entry.showDeleteEntry = true; // eslint-disable-line no-param-reassign
    },
    hideDelete(entry) {
      entry.showDeleteEntry = false; // eslint-disable-line no-param-reassign
    },
    touchstart(event) {
      this.touch.startX = event.touches[0].clientX;
      this.touch.endX = 0;
    },
    touchmove(event) {
      this.touch.endX = event.touches[0].clientX;
    },
    touchend(event) {
      if (!this.touch.endX || Math.abs(this.touch.endX - this.touch.startX) < 20) return;

      const entryElement = event.target.closest('.entry');
      if (entryElement) {
        if (this.touch.endX < this.touch.startX) {
          entryElement.classList.add('show-delete-entry');
        } else if (this.touch.endX > this.touch.startX) {
          entryElement.classList.remove('show-delete-entry');
        }
      }
    },
    removeEntry(entry, $event) {
      this.$emit('removeEntry', entry);
      $event.target.closest('.entry').classList.remove('show-delete-entry');
    },
    getTitle(entry) {
      let titleString = '';
      if (entry.module === 'symptoms') {
        titleString = `${entry.category} | ${entry.location.title}`;
      } else if (entry.module === 'emotions') {
        titleString = entry.emotion.join(' | ');
      }
      return titleString;
    },
  },
  mounted() {
    this.$el.addEventListener('touchstart', (event) => this.touchstart(event));
    this.$el.addEventListener('touchmove', (event) => this.touchmove(event));
    this.$el.addEventListener('touchend', (event) => this.touchend(event));
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/day-entry.scss";
</style>
