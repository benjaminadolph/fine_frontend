<template>
  <div class="module-entry-layer">
    <div class="module-entry-header">
      <div class="text">
        <h1 v-bind:class="module + '-primary'">Details</h1>
        <Time />
      </div>
    </div>
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
    id: Number,
  },
  data() {
    return {
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
      // document.getElementById(tab).style.display = 'block';
    },
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/module-entry-details.scss";
</style>
