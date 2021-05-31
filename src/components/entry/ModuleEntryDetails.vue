<template>
  <div class="module-entry-layer-details">
    <header class="fine-header">
      <a class="left-button shadow-button" v-on:click="closeEntryDetails()">
          <IconComponent name="close-full" size="32" :color="module + '-primary'" />
      </a>
      <div class="center">
          <h1 :class="module + '-primary'">Details</h1>
          <Time />
      </div>
      <a class="right-button shadow-button" v-on:click="saveEntryDetails()">
          <IconComponent name="close-full" size="32" :color="module + '-primary'" />
      </a>
    </header>
    <div class="media-entry">
      <ul class="tabs">
        <li class="tablink text" v-on:click="showTab('text')">
          <IconComponent name="text" :size="24" />
        </li>
        <li class="tablink photo" v-on:click="showTab('photo')">
          <IconComponent name="camera" :size="24" />
        </li>
        <li class="tablink voice" v-on:click="showTab('voice')">
          <IconComponent name="microphone" :size="24" />
        </li>
      </ul>

      <div id="text" class="tabcontent" v-show="tabs.text">
        <textarea
          id="input-text"
          name="input-text"
          rows="8"
          placeholder="Text hinzufügen"
          v-model="entryDetailsText"
        >
        </textarea>
      </div>

      <div id="photo" class="tabcontent" v-show="tabs.photo">
        <h3>Fotos</h3>
      </div>

      <div id="voice" class="tabcontent" v-show="tabs.voice">
        <h3>Sprachaufnahme</h3>
      </div>
    </div>
    <SelectEntry :module=module buttonLabel="Tag wählen" :multiselect=true />
  </div>
</template>

<script>
import IconComponent from '@/components/IconComponent.vue';
import SelectEntry from '@/components/SelectEntry.vue';
import Time from '@/components/Time.vue';

export default {
  name: 'ModuleEntryDetails',
  components: {
    IconComponent,
    Time,
    SelectEntry,
  },
  props: {
    module: String,
    entry: Object,
  },
  data() {
    return {
      selectedEntry: Object,
      entryDetailsText: '',
      tabs: [
        {
          text: true,
          photo: false,
          voice: false,
        },
      ],
    };
  },
  methods: {
    showTab(tabName) {
      Object.keys(this.tabs).forEach((key) => {
        this.tabs[key] = false;
      });
      this.tabs[tabName] = true;
    },
    closeEntryDetails() {
      this.$parent.entryDetails = false;
    },
    saveEntryDetails() {
      this.selectedEntry = this.entry;
      this.selectedEntry.detailsText = this.entryDetailsText;
      console.log(this.selectedEntry);
      this.$emit('saveEntryDetails', this.selectedEntry);
      this.entryDetailsText = '';
    },
  },
  mounted() {
    this.showTab('text');
    this.entryDetailsText = this.entry.detailsText;
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/module-entry-details.scss";
</style>
