<template>
    <div>
      <calendar-view
			:show-date="showDate"
			class="theme-default holiday-us-traditional holiday-us-official">
			<template #header="{ headerProps }">
				<calendar-view-header
					:header-props="headerProps"
					@input="setShowDate" />
			</template>
		</calendar-view>
    </div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import "vue-simple-calendar/dist/style.css";

export default {
  name: 'Calendar',
  data() {
    return { 
      showDate: new Date();
    }
  },
  components: {
    CalendarView,
    CalendarViewHeader,
  },
  methods: {
    setShowDate(d) {
      this.showDate = d;
    },
  }
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/calendar.scss";
</style>
