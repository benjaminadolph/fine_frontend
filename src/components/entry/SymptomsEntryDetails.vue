<template>
  <div class="module-entry-layer-details">
    <header class="fine-header">
      <a class="left-button" v-on:click="closeEntryDetails()">
          <IconComponent name="close-full" :size=32 :color="module + '-primary'" />
      </a>
      <div class="center">
          <h1 :class="module + '-primary'">Details</h1>
      </div>
      <a class="right-button" v-on:click="saveEntryDetails()">
          <IconComponent name="check-full" :size=32 :color="module + '-primary'" />
      </a>
    </header>
    <ModuleEntryNotes
      v-model="entryDetailsText"
    />
    <SelectEntry
      :module=module
      buttonLabel="Schlagwörter wählen"
      :list=tagList
      v-on:addNewOption="addNewTag"
      v-on:update="updateTags"
      :multiselect=true />
  </div>
</template>

<script>
import IconComponent from '@/components/IconComponent.vue';
import SelectEntry from '@/components/SelectEntry.vue';
import ModuleEntryNotes from '@/components/entry/ModuleEntryNotes.vue';

export default {
  name: 'SymptomsEntryDetails',
  components: {
    IconComponent,
    SelectEntry,
    ModuleEntryNotes,
  },
  props: {
    module: String,
    entry: Object,
  },
  data() {
    return {
      selectedEntry: Object,
      entryDetailsText: '',
      tagList: [],
      tags: [],
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
      this.selectedEntry.tags = this.tags;
      this.$emit('saveEntryDetails', this.selectedEntry);
      this.entryDetailsText = '';
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
  },
  mounted() {
    // console.log(this.entry);
    this.tags = this.entry.tags;
    for (let i = 0; i < this.entry.tags.length; i += 1) {
      this.tagList.push({
        title: this.entry.tags[i],
        isSelected: true,
      });
    }
    this.entryDetailsText = this.entry.detailsText;
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/views/module-entry-details.scss";
</style>
