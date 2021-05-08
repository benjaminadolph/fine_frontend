<template>
  <div>
    <form v-bind:class="[primaryBorderColor]" class="select-entry-wrapper">
      <div
        v-bind:class="[isOpen ? softBgColor : primaryBgColor, isOpen ? 'open' : '', primaryColor]"
        class="select-entry-input plain-m-bold"
        >
        <div
          class="add-button"
          v-show="!isOpen"
          v-on:click="toggleOpen()"
          v-bind:class="[primaryBorderColor, primaryBgColor]"
          >
          {{ getButtonLabel() }}
        </div>
        <input
          v-model="searchValue"
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
            v-on:click="toggleOpen()"
            :size="32"
            v-bind:color="primaryColor"
          />
        </div>
      </div>
      <transition name="bounce">
        <div
          v-show="isOpen"
          v-bind:class="[isOpen ? 'open' : '', primaryBorderColor]"
          class="btn select-entry-details"
          >
          <!-- TODO: only when Mehrauswahl <button
            class="btn"
            v-bind:class="[primaryBorderColor, primaryBgColor]"
            >
            Eingabe bestätigen
          </button> -->
          <div class="results">
            <div
              v-bind:class="[primaryBorderColor]"
              v-on:click="setNewOption(currentValue)"
              v-if="currentValue"
              class="plain-m-bold current-value-option"
              >
              {{ currentValue }}
              <IconComponent
                v-bind:name="'plus-full'"
                :size="32"
                v-bind:color="primaryColor"
              />
            </div>
            <div
              class="result-header plain-s-book"
              v-bind:class="[primaryColor]">
              Vorschläge
            </div>
            <div v-show="!filteredOptions.length" class="no-results">
              Keine Ergebnisse gefunden
            </div>
            <ul class="result-list">
              <!-- TODO: make dynamically-->
              <li
                v-for="option in filteredOptions"
                :key="option.title"
                v-bind:class="[primaryBorderColor]"
                v-on:click="setOption(option)"
                class="plain-m-bold"
                >
                {{ option.title }}
                <IconComponent
                  v-bind:name="getSelectedIcon(option)"
                  :size="32"
                  v-bind:color="primaryColor"
                />
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </form>
    <div v-show="isMultiselect" class="selected-options-list-wrapper">
      <div
        class="selected-options-header plain-s-book"
        v-show="selectedOptions.length"
        v-bind:class="[primaryColor]">
        Deine Auswahl
      </div>
      <ul class="selected-options-list">
        <li
          v-for="option in selectedOptions"
          :key="option.title"
          class="button"
          v-on:click="deselectOption(option)"
          v-bind:class="[primaryBorderColor, softBgColor, primaryColor]"
          >
          <IconComponent
            v-bind:name="'close-full'"
            :size="32"
            v-bind:color="primaryColor"
          />
          {{ option.title }}
        </li>
      </ul>
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
    multiselect: Boolean,
  },
  data() {
    return {
      isOpen: false,
      option: [
        {
          isSelected: false,
        },
      ],
      isMultiselect: this.multiselect,
      selectedOptions: [],
      selectEntryInput: '',
      currentValueText: '',
      searchValue: '',
      options: [
        {
          title: 'Schmerzen',
          isSelected: false,
        },
        {
          title: 'Migräne',
          isSelected: false,
        },
        {
          title: 'Hautausschlag',
          isSelected: false,
        },
      ],
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
      this.$nextTick(() => {
        this.$refs.selectEntryInput.focus();
      });
    },
    setOption(option) {
      if (this.multiselect === true) {
        this.option = option;
        if (this.selectedOptions.includes(option)) {
          this.option.isSelected = false;
          this.deselectOption(option);
        } else {
          this.option.isSelected = true;
          this.selectedOptions.push(option);
        }
      } else {
        this.option.isSelected = false;
        this.option = option;
        this.option.isSelected = true;
        this.isOpen = !this.isOpen;
        // unshift option to top if selected
        if (this.options.indexOf(option) > 0) {
          this.options.splice(this.options.indexOf(option), 1);
          this.options.unshift(option);
        }
      }
      this.searchValue = '';
    },
    setNewOption(value) {
      const newOption = {
        title: value,
        isSelected: false,
      };
      this.options.unshift(newOption);
      this.setOption(newOption);
    },
    deselectOption(option) {
      this.option = option;
      this.option.isSelected = false;
      this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1);
    },
    getSelectedIcon(option) {
      let iconName = '';
      if (option.isSelected) {
        iconName = 'check';
      } else {
        iconName = 'plus-full';
      }
      return iconName;
    },
    getButtonLabel() {
      let buttonLabelText = '';
      if (this.option.title && !this.multiselect) {
        buttonLabelText = this.option.title;
      } else {
        buttonLabelText = this.buttonLabel;
      }
      return buttonLabelText;
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
    filteredOptions() {
      let tempOptions = this.options;
      // Process search input
      if (this.searchValue !== '' && this.searchValue) {
        tempOptions = tempOptions.filter((item) => (
          item.title
            .toUpperCase()
            .includes(this.searchValue.toUpperCase())
        ));
      }
      return tempOptions;
    },
    currentValue() {
      let currentValueText = '';
      if (this.searchValue !== '' && this.searchValue) {
        currentValueText = this.searchValue;
      }
      return currentValueText;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/select-entry.scss";
</style>
