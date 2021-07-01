<template>
    <div>
      <div class="set-intensity">
        <div class="plain-s-book">
          Aktuelle Stimmung bewerten:
        </div>
        <div class="plain-s-bold">
          Wie geht es dir gerade?
        </div>
        <div class="intensities">
          <span v-on:click="setIntensity(1, $event)" class="one intensity">1</span>
          <span v-on:click="setIntensity(2, $event)" class="two intensity">2</span>
          <span v-on:click="setIntensity(3, $event)" class="three intensity">3</span>
          <span v-on:click="setIntensity(4, $event)" class="four intensity">4</span>
          <span v-on:click="setIntensity(5, $event)" class="five intensity">5</span>
        </div>
      </div>
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
      emotionEntries: [],
      emotions: [],
      date: '',
      intensity: '',
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
          this.emotionEntries = this.getUserEmotions;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createEmotion() {
      this.$store.dispatch(CREATE_EMOTION, {
        date: new Date(),
        module: 'emotions',
        intensity: this.intensity,
        emotion: this.emotions,
        detailsText: this.detailsText,
        tags: this.tags,
        // photos: this.photos,
        // audio: this.audio,
      })
        .then(() => {
          this.emotionEntries = this.getUserEmotions;
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
          this.emotionEntries = this.getUserEmotions;
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
        emotion: this.emotions,
        detailsText: this.detailsText,
        tags: this.tags,
        // photos: this.photos,
        // audio: this.audio,
      })
        .then(() => {
          this.emotionEntries = this.getUserEmotions;
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
          this.emotionEntries = this.getUserEmotions;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setIntensity(intensity, $event) {
      this.intensity = intensity;
      const elems = document.querySelectorAll('.intensity');
      [].forEach.call(elems, (el) => {
        el.classList.remove('selected');
      });
      $event.target.classList.add('selected');
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
      this.emotions.push(option);
      this.emotionList.push({
        title: option,
        isSelected: true,
      });
    },
    updateEmotionList(emotions) {
      this.emotions = [];
      const _this = this;
      emotions.forEach((tag) => {
        _this.emotions.push(tag.title);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/emotions-entry.scss";
</style>
