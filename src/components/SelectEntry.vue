<template>
  <!-- TODO: add to own component -->
    <div v-bind:class="[primaryBorderColor]" class="select-entry-wrapper">
      <div
        v-bind:class="[isOpen ? softBgColor : primaryBgColor, isOpen ? 'open' : '', primaryColor]"
        class="select-entry-input plain-m-bold"
        v-on:click="toggleOpen()"
        >
        <div
          class="add-button"
          v-show="!isOpen"
          v-bind:class="[primaryBorderColor, primaryBgColor]"
          >
          {{ buttonLabel }}
        </div>
        <input
          ref="selectEntryInput"
          v-show="isOpen"
          type="text"
          id="select-entry-title"
          class="plain-m-bold"
          v-bind:class="[primaryColor, softBgColor, primaryBorderColor]"
        />
        <div v-show="isOpen" class="close-button">
          <IconComponent
            v-bind:name="'close-full'"
            :size="32"
            v-bind:color="[primaryColor]"
          />
        </div>
      </div>
      <div
        v-show="isOpen"
        v-bind:class="[primaryBorderColor]"
        class="btn select-entry-details"
        >
        <button
          class="btn"
          v-bind:class="[primaryBorderColor, primaryBgColor]"
          >
          Eingabe bestätigen
        </button>
        <div class="results">
          <div
            class="result-header plain-s-book"
            v-bind:class="[primaryColor]">
            Suchergebnisse
          </div>
          <ul class="result-list">
            <!-- TODO: make dynamically-->
            <li v-bind:class="[primaryBorderColor]">
              Schmerzen
              <IconComponent
                v-bind:name="'plus-full'"
                :size="32"
                v-bind:color="[primaryColor]"
              />
            </li>
            <li v-bind:class="[primaryBorderColor]">
              Migräne
              <IconComponent
                v-bind:name="'plus-full'"
                :size="32"
                v-bind:color="[primaryColor]"
              />
            </li>
            <li v-bind:class="[primaryBorderColor]">
              Hautauschlag
              <IconComponent
                v-bind:name="'plus-full'"
                :size="32"
                v-bind:color="[primaryColor]"
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
  computed: {
    primaryColor() {
      const className = `${this.module}-primary`;
      return className;
    },
    primaryBorderColor() {
      const className = `${this.module}-primary-border`;
      return className;
    },
    primaryBgColor() {
      const className = `${this.module}-primary-bgcolor`;
      return className;
    },
    softBgColor() {
      const className = `${this.module}-soft-bgcolor`;
      return className;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/select-entry.scss";
</style>
