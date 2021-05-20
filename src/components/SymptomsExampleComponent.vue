<template>
  <div>
    <h1>SYMPTOMS</h1>
    <div class="create-symptom">
      <label for="create-symptom">Create a Symptom</label>
      <input type="text" v-model="date" placeholder="Date">
      <input type="text" v-model="module" placeholder="Module">
      <input type="text" v-model="intensity" placeholder="Intensity">
      <input type="text" v-model="category" placeholder="Category">
      <input type="text" v-model="location.x" placeholder="X Location">
      <input type="text" v-model="location.y" placeholder="Y Location">
      <input type="text" v-model="detailsText" placeholder="Details">
      <input type="text" v-model="tags" placeholder="Tags">
      <button @click="createSymptom">Post Symptom</button>
    </div>
    <ul>
      <li
        @dblclick="deleteSymptom(symptom._id)"
        v-for="symptom in symptoms"
        :key="symptom._id"
        v-text="symptom.module">
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Symptoms',
  data() {
    return {
      symptoms: [],
      date: '',
      module: '',
      intensity: '',
      category: '',
      location: {
        x: '',
        y: '',
      },
      detailsText: '',
      // photos: [],
      // audio: [],
      tags: [],
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getUserSymptoms']),
  },
  mounted() {
    this.getAllSymptoms();
  },
  methods: {
    getAllSymptoms() {
      this.$store.dispatch('GET_ALL_SYMPTOMS')
        .then(() => {
          this.symptoms = this.getUserSymptoms;
          console.log(this.getUserSymptoms);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createSymptom() {
      this.$store.dispatch('CREATE_SYMPTOM', {
        date: this.date,
        module: this.module,
        intensity: this.intensity,
        category: this.category,
        location: this.location,
        detailsText: this.detailsText,
        // photos: this.photos,
        // audio: this.audio,
        tags: this.tags,
      })
        .then(() => {
          this.symptoms = this.getUserSymptoms;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteSymptom(id) {
      console.log(id);
      this.$store.dispatch('DELETE_SYMPTOM', {
        symptom_id: id,
      })
        .then(() => {
          this.getAllSymptoms();
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
