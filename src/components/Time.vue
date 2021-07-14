<template>
  <div class="time-component" @click="editDateTime">
    <div
      class="time plain-s-book fine-grey-medium"
      @click="editDateTime">
        {{dateGerman}} | {{time}}
    </div>
    <div v-if="edit" class="datetimepicker">
      <input type="date" id="date" v-model="date" @change="updateDate">
      <span></span>
      <input type="time" id="time" v-model="time" @change="updateDate">
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'Time',
  props: {
    currentDate: {
      type: Object,
      default: dayjs(),
    },
  },
  data() {
    return {
      date: '',
      fullDate: '',
      time: '',
      edit: false,
    };
  },
  created() {
    console.log(this.currentDate);
    this.fullDate = dayjs(this.currentDate);
    this.date = dayjs(this.currentDate).format('YYYY-MM-DD');
    this.time = dayjs(this.currentDate).format('HH:mm');
    this.getDateTime();
  },
  computed: {
    dateGerman() {
      let dateString = '';
      if (this.date === dayjs()) {
        dateString = 'Heute';
      } else {
        dateString = dayjs(this.date).format('DD.MM.YYYY');
      }
      return dateString;
    },
  },
  methods: {
    editDateTime() {
      this.edit = !this.edit;
    },
    getDateTime() {
      this.date = dayjs(this.fullDate).format('YYYY-MM-DD');
      this.time = dayjs(this.fullDate).format('HH:mm');
    },
    updateDate() {
      this.fullDate = dayjs(`${this.date}T${this.time}:00`);
      this.$emit('dateUpdated', this.fullDate);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/time.scss";
</style>
