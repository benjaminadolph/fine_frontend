<template>
  <!-- TODO: add to own component -->
    <div v-bind:class="module + '-primary-border'" class="select-entry-wrapper">
      <div
        v-bind:class="
          [{ 'open': isOpen },
          module + '-primary ' +
          module + '-soft-bgcolor']"
        class="select-entry-input plain-m-bold"
        v-on:click="toggleOpen()"
        >
        <div
          class="add-button"
          v-show="!isOpen"
          v-bind:class="[{ open: isOpen }, module + '-primary-border', module + '-primary-bgcolor']"
          >
          {{ buttonLabel }}
        </div>
        <input
          ref="selectEntryInput"
          v-show="isOpen"
          type="text"
          id="select-entry-title"
          class="plain-m-bold"
          v-bind:class="
            module + '-primary ' +
            module + '-soft-bgcolor ' +
            module + '-primary-border'"
        />
        <div v-show="isOpen" class="close-button">
          <IconComponent
            v-bind:name="'close-full'"
            :size="32"
            v-bind:color="module + '-primary'"
          />
        </div>
      </div>
      <div
        v-show="isOpen"
        v-bind:class="module + '-primary-border'"
        class="btn select-entry-details"
        >
        <button
          class="btn"
          v-bind:class="
            module + '-primary-border ' +
            module + '-primary-bgcolor'"
          >
          Eingabe bestätigen
        </button>
        <div class="results">
          <div
            class="result-header plain-s-book"
            v-bind:class="module + '-primary'">
            Suchergebnisse
          </div>
          <ul class="result-list">
            <!-- TODO: make dynamically-->
            <li v-bind:class="module + '-primary-border'">
              Schmerzen
              <IconComponent
                v-bind:name="'plus-full'"
                :size="32"
                v-bind:color="module + '-primary'"
              />
            </li>
            <li v-bind:class="module + '-primary-border'">
              Migräne
              <IconComponent
                v-bind:name="'plus-full'"
                :size="32"
                v-bind:color="module + '-primary'"
              />
            </li>
            <li v-bind:class="module + '-primary-border'">
              Hautauschlag
              <IconComponent
                v-bind:name="'plus-full'"
                :size="32"
                v-bind:color="module + '-primary'"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import IconComponent from '@/components/IconComponent.vue';

export default {
  name: 'SelectEntry',
  components: {
    IconComponent,
  },
  props: {
    module: String,
    buttonLabel: String,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
      this.$nextTick(() => {
        this.$refs.selectEntryInput.focus();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/select-entry.scss";
</style>
