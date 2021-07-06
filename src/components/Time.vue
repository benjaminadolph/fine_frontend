<template>
    <div
    class="time plain-s-book fine-grey-medium"
    @click="editDateTime">
      {{dateGerman}} | {{time}}
    </div>
    <div v-if="edit" class="datetimepicker">
      <input type="date" id="date" v-model="date">
      <span></span>
      <input type="time" id="time" v-model="time">
    </div>
</template>

<script>
export default {
  name: 'Time',
  data() {
    return {
      date: '',
      time: '',
      edit: false,
    };
  },
  created() {
    this.getDateTime();
  },
  computed: {
    dateGerman() {
      const dateString = this.date.toString();
      const dateParts = dateString.split('-');
      const dateObject = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
      return dateObject;
    },
  },
  methods: {
    editDateTime() {
      this.edit = !this.edit;
    },
    getDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      let hour = now.getHours();
      let minute = now.getMinutes();
      if (month.toString().length === 1) {
        month = `0${month}`;
      }
      if (day.toString().length === 1) {
        day = `0${day}`;
      }
      if (hour.toString().length === 1) {
        hour = `0${hour}`;
      }
      if (minute.toString().length === 1) {
        minute = `0${minute}`;
      }
      this.date = `${year}-${month}-${day}`;
      this.time = `${hour}:${minute}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/time.scss";
</style>
