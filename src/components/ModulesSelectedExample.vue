<template>
  <div>
    <h1>ModulesSelected</h1>
    <div class="create-modules-selected">
      <label for="create-modules-selected">Select Modules</label>
      <input type="checkbox" v-model="symptoms" name="symptoms">
      <input type="checkbox" v-model="nutrition" name="nutrition">
      <input type="checkbox" v-model="sleep" name="sleep">
      <input type="checkbox" v-model="activity" name="activity">
      <input type="checkbox" v-model="emotions" name="emotions">
      <button @click="updateModulesSelected">Update Modules</button>
    </div>
    <ul>
      <li
        v-for="module in modulesSelected"
        :key="module._id"
        v-text="module">
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { UPDATE_USER_MODULESSELECTED } from '@/store/modules/user';

export default {
  name: 'Symptoms',
  data() {
    return {
      modulesSelected: [],
      symptoms: false,
      nutrition: false,
      sleep: false,
      activity: false,
      emotions: false,
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getModulesSelected']),
  },
  mounted() {
    this.getAllModulesSelected();
  },
  methods: {
    getAllModulesSelected() {
      this.modulesSelected = this.getModulesSelected;
    },
    updateModulesSelected() {
      this.modulesSelected = [];
      const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < checkboxes.length; i++) {
        this.modulesSelected.push(checkboxes[i].name);
      }
      this.$store.dispatch(UPDATE_USER_MODULESSELECTED, {
        modulesSelected: this.modulesSelected,
      })
        .then(() => {
          this.modulesSelected = this.getModulesSelected;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
