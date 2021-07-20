<template>
  <section class="modules-selected">
    <h2 class="plain-s-bold">Module auswählen</h2>
    <hr class="select">
    <div class="line" v-for="module in allModules" :key="module">
      <IconComponent
        class="icon"
        v-bind:name="module.name"
        :size="24"
        v-bind:color="module.name + '-primary'"
      />
        <p v-bind:class="module.name + '-primary'"
          class="plain-m-bold">{{ module.title }}</p>
        <label :for="module.name" class="select-modules">
          <div class="checkbox-border" v-bind:class="module.name + '-primary'">
            <div class="checkbox-background" v-bind:class="module.name + '-soft-bgcolor'">
                <input type="checkbox" v-model="module.selected" :name="module.name"
                :id="module.name" class="checkbox-input"
                v-bind:class="module.name + '-primary-bgcolor'"
                @change="updateSelectedModules(module.name)" />
            </div>
          </div>
        </label>
    </div>
  </section>
</template>

<script>
import IconComponent from '@/components/IconComponent.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ModulesSelected',
  components: {
    IconComponent,
  },
  props: {
    showAll: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedModules: [],
      allModules: [
        {
          name: 'symptoms',
          title: 'Symptome',
          selected: false,
        },
        {
          name: 'sleep',
          title: 'Schlaf',
          selected: false,
        },
        {
          name: 'emotions',
          title: 'Gefühle',
          selected: false,
        },
        {
          name: 'activity',
          title: 'Bewegung',
          selected: false,
        },
        {
          name: 'nutrition',
          title: 'Ernährung',
          selected: false,
        },
        {
          name: 'countermeasures',
          title: 'Maßnahmen',
          selected: false,
        },
      ],
    };
  },
  methods: {
    updateSelectedModules(module) {
      if (this.selectedModules.includes(module)) {
        const index = this.selectedModules.indexOf(module);
        if (index > -1) {
          this.selectedModules.splice(index, 1);
        }
      } else {
        this.selectedModules.push(module);
      }
      this.$emit('updateSelectedModules', this.selectedModules);
    },
    arrayRemove(arr, value) {
      return arr.filter((ele) => ele !== value);
    },
  },
  computed: {
    ...mapGetters(['getModulesSelected']),
  },
  mounted() {
    this.selectedModules = this.getModulesSelected;

    if (!this.showAll && this.selectedModules.length) {
      const modules = [];

      for (let i = 0; i < this.allModules.length; i += 1) {
        if (this.selectedModules.includes(this.allModules[i].name)) {
          this.allModules[i].selected = true;
          modules.push(this.allModules[i]);
        }
      }
      this.allModules = modules;
    }
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/modules-selected.scss";
</style>
