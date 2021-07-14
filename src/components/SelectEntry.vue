<template>
  <div>
    <form v-bind:class="[primaryBorderColor]" class="select-entry-wrapper">
      <transition name="fade-up-down">
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
            {{ buttonText }}
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
              :size=32
              v-bind:color="primaryColor"
            />
          </div>
        </div>
      </transition>
      <transition name="fade-up-down">
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
                :size=32
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
                  :size=32
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
            :size=32
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
    list: {
      type: Object,
      default: () => ({}),
    },
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
      options: this.list,
      buttonText: this.buttonLabel,
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
      this.option = option;
      console.log(this.selectedOptions);
      if (this.selectedOptions.includes(option)) {
        this.option.isSelected = false;
        if (this.isMultiselect) {
          this.deselectOption(option);
        } else {
          this.selectedOptions.forEach((element) => {
            this.deselectOption(element);
          });
          this.option = option;
          this.option.isSelected = true;
          this.isOpen = false;
          this.buttonText = option.title;
        }
      } else {
        this.option.isSelected = true;
        this.selectedOptions.push(option);
      }
      this.$emit('updateOption', this.selectedOptions);
      this.searchValue = '';
    },
    setNewOption(value) {
      const newOption = {
        title: value,
        isSelected: true,
      };
      const index = this.options.map((o) => o.title).indexOf(newOption.title);
      if (index < 0) {
        this.$emit('addNewOption', newOption.title);
        this.options.unshift(newOption);
        this.setOption(newOption);
        if (!this.isMultiselect) {
          this.setButtonLabel();
        }
      }
    },
    deselectOption(option) {
      this.option = option;
      this.option.isSelected = false;
      if (this.isMultiselect) {
        this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1);
      }
      this.$emit('update', this.selectedOptions);
      // this.$emit('removeOption', option.title);
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
    setButtonLabel() {
      this.buttonText = this.buttonLabel;
      if (this.option[0].title && !this.multiselect && this.option[0].isSelected) {
        this.buttonText = this.option[0].title;
      }
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
  mounted() {
    this.selectedOptions = this.list;
  },
  updated() {
    this.selectedOptions = this.list;

    if (this.selectedOptions.length > 0 && !this.isMultiselect) {
      this.selectedOptions.forEach((element) => {
        if (element.isSelected) {
          this.setOption(element);
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/select-entry.scss";
</style>
