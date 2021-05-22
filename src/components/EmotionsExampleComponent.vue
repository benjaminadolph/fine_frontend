<template>
  <div>
    <h1>EMOTIONS</h1>
    <div class="create-emotion">
      <label for="create-emotion">Create a Emotion</label>
      <input type="text" v-model="date" placeholder="Date">
      <input type="text" v-model="module" placeholder="Module">
      <input type="text" v-model="intensity" placeholder="Intensity">
      <input type="text" v-model="title" placeholder="Title">
      <input type="text" v-model="detailsText" placeholder="Details">
      <input type="text" v-model="tags" placeholder="Tags">
      <button @click="createEmotion">Post Emotion</button>
    </div>
    <ul>
      <li
        @dblclick="deleteEmotion(emotion._id)"
        v-for="emotion in emotions"
        :key="emotion._id"
        v-text="emotion.title">
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Emotions',
  data() {
    return {
      emotions: [],
      date: '',
      module: '',
      intensity: '',
      title: '',
      detailsText: '',
      // photos: [],
      // audio: [],
      tags: [],
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getUserEmotions']),
  },
  mounted() {
    this.getAllEmotions();
  },
  methods: {
    getAllEmotions() {
      this.$store.dispatch('GET_ALL_EMOTIONS')
        .then(() => {
          this.emotions = this.getUserEmotions;
          console.log(this.getUserEmotions);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createEmotion() {
      this.$store.dispatch('CREATE_EMOTION', {
        date: this.date,
        module: this.module,
        intensity: this.intensity,
        title: this.title,
        location: this.location,
        detailsText: this.detailsText,
        tags: this.tags,
        // photos: this.photos,
        // audio: this.audio,
      })
        .then(() => {
          this.emotions = this.getUserEmotions;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteEmotion(id) {
      console.log(id);
      this.$store.dispatch('DELETE_EMOTION', {
        emotion_id: id,
      })
        .then(() => {
          this.getAllEmotions();
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
