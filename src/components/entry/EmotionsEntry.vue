<template>
    <div>
      <header class="fine-header" :class="{ update : entryid }">
        <a class="left-button" v-on:click="close">
            <IconComponent name="close-full" :size=32 color="emotions-primary" />
        </a>
        <div class="headline-text">
            <h1 class="emotions-primary">Emotionen</h1>
            <Time />
        </div>
        <a class="microphone-button">
            <IconComponent name="microphone" :size=24 color="emotions-primary" />
        </a>
        <a class="right-button" v-on:click="saveAndClose">
            <IconComponent name="check-full" :size=32 color="emotions-primary" />
        </a>
      </header>
      <div class="module-entry-content">
        <div class="set-intensity">
          <div class="plain-s-book">
            Aktuelle Stimmung bewerten:
          </div>
          <div class="plain-s-bold">
            Wie geht es dir gerade?
          </div>
          <Slider
            module="emotions"
            ref="intensitySlider"
            v-on:updateIntensity="setIntensity"
          />
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
    </div>
</template>

<script>
import ModuleEntryNotes from '@/components/entry/ModuleEntryNotes.vue';
import SelectEntry from '@/components/SelectEntry.vue';
import Time from '@/components/Time.vue';
import Slider from '@/components/Slider.vue';
import IconComponent from '@/components/IconComponent.vue';
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
    Slider,
    Time,
    IconComponent,
  },
  props: {
    entryid: String,
  },
  data() {
    return {
      emotionEntries: [],
      emotions: [],
      date: '',
      intensity: 0,
      tags: [],
      detailsText: '',
      defaultEmotionsList: [],
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
    if (this.entryid) {
      this.getEmotion(this.entryid);
    }
    // this.setDefaultEmotionsList();
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
          this.entry = this.getUserEmotions;
          this.detailsText = this.entry.detailsText;
          this.intensity = this.entry.intensity;
          this.date = this.entry.date;
          this.$refs.intensitySlider.setInput(this.intensity);
          this.initEmotionList(this.entry.emotion);
          this.initTagList(this.entry.tags);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setIntensity(intensity) {
      this.intensity = intensity;
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
    initTagList(tags) {
      this.tags = [];
      const _this = this;
      tags.forEach((tag) => {
        _this.addNewTag(tag);
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
    initEmotionList(emotions) {
      this.emotions = [];
      this.emotionsList = [];
      const _this = this;
      emotions.forEach((tag) => {
        _this.addNewEmotion(tag);
      });
    },
    saveAndClose() {
      if (this.entryid) {
        this.updateEmotion(this.entryid);
        this.$router.go(-1);
      } else {
        this.createEmotion();
        this.$emit('close');
      }
    },
    close() {
      if (this.entryid) {
        this.$router.go(-1);
      } else {
        this.$emit('close');
      }
    },
    setDefaultEmotionsList() {
      this.defaultEmotionsList = [
        {
          title: 'Freude',
          isSelected: false,
        },
        {
          title: 'Trauer',
          isSelected: false,
        },
        {
          title: 'Ärger',
          isSelected: false,
        },
        {
          title: 'Angst',
          isSelected: false,
        },
        {
          title: 'Überraschung',
          isSelected: false,
        },
        {
          title: 'Ekel',
          isSelected: false,
        },
      ];
      this.defaultEmotionsList.forEach((element) => {
        this.emotionList.push(element);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/emotions-entry.scss";
</style>
