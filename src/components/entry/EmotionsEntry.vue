<template>
    <div>
      <SelectEntry
        module='emotions'
        buttonLabel="Gefühle hinzufügen"
        :list=emotionList
        v-on:addNewOption="addNewEmotion"
        v-on:update="updateEmotionList"
        :multiselect=true />
      <SelectEntry
        module='emotions'
        buttonLabel="Was ist noch passiert?"
        :list=tagList
        v-on:addNewOption="addNewTag"
        v-on:update="updateTags"
        :multiselect=true />
      <ModuleEntryNotes v-model="detailsText" />
    </div>
</template>

<script>
import ModuleEntryNotes from '@/components/entry/ModuleEntryNotes.vue';
import SelectEntry from '@/components/SelectEntry.vue';
import { mapGetters } from 'vuex';
import {
  GET_ALL_EMOTIONS,
  CREATE_EMOTION,
  DELETE_EMOTION,
  UPDATE_EMOTION,
  GET_EMOTION,
} from '@/store/modules/emotions';

export default {
  name: 'EmotionsEntry',
  components: {
    SelectEntry,
    ModuleEntryNotes,
  },
  data() {
    return {
      emotions: [],
      date: '',
      intensity: '',
      emotion: [],
      tags: [],
      detailsText: '',
      // photos: [],
      // audio: [],
      emotionList: [],
      tagList: [],
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
      this.$store.dispatch(GET_ALL_EMOTIONS)
        .then(() => {
          this.emotions = this.getUserEmotions;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createEmotion() {
      this.$store.dispatch(CREATE_EMOTION, {
        date: new Date(),
        module: 'emotions',
        intensity: 5,
        emotion: this.emotionList,
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
      this.$store.dispatch(DELETE_EMOTION, {
        emotion_id: id,
      })
        .then(() => {
          this.emotions = this.getUserEmotions;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateEmotion(id) {
      this.$store.dispatch(UPDATE_EMOTION, {
        emotion_id: id,
        date: this.date,
        module: 'emotions',
        intensity: this.intensity,
        emotion: this.emotionList,
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
    getEmotion(id) {
      this.$store.dispatch(GET_EMOTION, {
        emotion_id: id,
      })
        .then(() => {
          this.emotions = this.getUserEmotions;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addNewTag(option) {
      this.tags.push(option);
      this.tagList.push({
        title: option,
        isSelected: true,
      });
    },
    updateTags(tags) {
      this.tags = [];
      const _this = this;
      tags.forEach((tag) => {
        _this.tags.push(tag.title);
      });
    },
    addNewEmotion(option) {
      this.emotion.push(option);
      this.emotionList.push({
        title: option,
        isSelected: true,
      });
    },
    updateEmotionList(tags) {
      this.emotion = [];
      const _this = this;
      tags.forEach((tag) => {
        _this.emotion.push(tag.title);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
 // @import "@/assets/scss/components/emotions.scss";
</style>
