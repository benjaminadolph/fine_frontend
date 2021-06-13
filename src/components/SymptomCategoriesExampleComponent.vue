<template>
  <div>
    <h1>SYMPTOMCATEOGRIES</h1>
    <div class="create-symptomcategorie">
      <label for="create-symptomcategorie">Create a Symptom</label>
      <input type="text" v-model="title" placeholder="Symptomkategorie">
      <button @click="createSymptomCategory">Post Symptomcategorie</button>
    </div>
    <ul>
      <li
        @dblclick="deleteSymptomCategory(symptomCategory._id)"
        v-for="symptomCategory in symptomCategories"
        :key="symptomCategory._id"
        v-text="symptomCategory.title">
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  GET_ALL_SYMPTOMCATEGORIES,
  CREATE_SYMPTOMCATEGORY,
  DELETE_SYMPTOMCATEGORY,
  UPDATE_SYMPTOMCATEGORY,
  GET_SYMPTOMCATEGORY,
} from '@/store/modules/symptomCategories';

export default {
  name: 'Symptoms',
  data() {
    return {
      symptomCategories: [],
      title: '',
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getUserSymptomCategories']),
  },
  mounted() {
    this.getAllSymptomCategories();
  },
  methods: {
    getAllSymptomCategories() {
      this.$store.dispatch(GET_ALL_SYMPTOMCATEGORIES)
        .then(() => {
          this.symptomCategories = this.getUserSymptomCategories;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createSymptomCategory() {
      this.$store.dispatch(CREATE_SYMPTOMCATEGORY, {
        title: this.title,
      })
        .then(() => {
          this.symptomCategories = this.getUserSymptomCategories;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteSymptomCategory(id) {
      this.$store.dispatch(DELETE_SYMPTOMCATEGORY, {
        symptomCategory_id: id,
      })
        .then(() => {
          this.symptomCategories = this.getUserSymptomCategories;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateSymptomCategory(id) {
      this.$store.dispatch(UPDATE_SYMPTOMCATEGORY, {
        symptomCategory_id: id,
        title: this.title,
      })
        .then(() => {
          this.symptomCategories = this.getUserSymptomCategories;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSymptomCategory(id) {
      this.$store.dispatch(GET_SYMPTOMCATEGORY, {
        symptomCategory_id: id,
      })
        .then(() => {
          this.symptomCategories = this.getUserSymptomCategories;
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
