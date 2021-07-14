/* eslint-disable */
<template>
    <div>
      <header class="fine-header" :class="{ update : entryid }">
        <a class="left-button" v-on:click="cancelAndClose">
            <IconComponent name="close-full" :size=32 color="symptoms-primary" />
        </a>
        <div class="headline-text">
            <h1 class="symptoms-primary">Symptome</h1>
            <Time v-on:dateUpdated="setTime" :currentDate="entry.date" ref="time" />
        </div>
        <a class="microphone-button">
            <IconComponent name="microphone" :size=24 color="symptoms-primary" />
        </a>
        <a class="right-button" v-on:click="close">
            <IconComponent name="check-full" :size=32 color="symptoms-primary" />
        </a>
      </header>
      <div class="module-entry-content">
        <SelectEntry
          module='symptoms'
          :list=symptomCategories
          buttonLabel="Kategorie wählen"
          :multiselect=false
          v-on:updateOption="onSelect"
          v-on:addNewOption="createSymptomCategory"
        />
        <div
          id="symptoms-figure-container"
          v-on:click="openIntensity"
        >
        <div
          v-show="!isCategorySelected"
          class="symptoms-figure-container-overlay"
        >
          <span class="text">Wähle erst eine Kategorie</span>
        </div>
        <div class="turn-round-button" v-on:click="turnaround">
          <IconComponent
            name="turn"
            :size="32"
            color="symptoms-primary"
          />
        </div>
          <panZoom
            @init="onInit"
            :options="{maxZoom: 3, minZoom: 1, zoomDoubleClickSpeed: 1}"
          >
            <Figure :gender="figure.gender" :front=front />
          </panZoom>
          <div ref="intensityControl" v-show="showIntensityControl" class="intensity-control">
            <span v-on:click="setIntensity(5)" class="five intensity">5</span>
            <span v-on:click="setIntensity(4)" class="four intensity">4</span>
            <span v-on:click="setIntensity(3)" class="three intensity">3</span>
            <span v-on:click="setIntensity(2)" class="two intensity">2</span>
            <span v-on:click="setIntensity(1)" class="one intensity">1</span>
            <IconComponent
              name="trash"
              :size=24
              color="#fff"
              v-on:click="removeCircle()"
            />
          </div>
        </div>
        <div v-if="entryDetails" >
            <SymptomsEntryDetails
              module="symptoms"
              :entry="entry"
              v-on:saveEntryDetails="updateSymptom"
            />
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  GET_ALL_SYMPTOMS,
  CREATE_SYMPTOM,
  DELETE_SYMPTOM,
  UPDATE_SYMPTOM,
  GET_SYMPTOM,
} from '@/store/modules/symptoms';
import {
  GET_ALL_SYMPTOMCATEGORIES,
  CREATE_SYMPTOMCATEGORY,
  DELETE_SYMPTOMCATEGORY,
  UPDATE_SYMPTOMCATEGORY,
  GET_SYMPTOMCATEGORY,
} from '@/store/modules/symptomCategories';
import SelectEntry from '@/components/SelectEntry.vue';
import IconComponent from '@/components/IconComponent.vue';
import SymptomsEntryDetails from '@/components/entry/SymptomsEntryDetails.vue';
import Figure from '@/components/entry/Figure.vue';
import Time from '@/components/Time.vue';

export default {
  name: 'SymptomsEntry',
  components: {
    SelectEntry,
    IconComponent,
    SymptomsEntryDetails,
    Figure,
    Time,
  },
  props: {
    entryid: String,
  },
  data() {
    return {
      symptoms: [],
      entryDetails: false,
      currentEntries: [],
      entry: {},
      category: '',
      showIntensityControl: false,
      lastClickedElement: false,
      isCategorySelected: false,
      location: {},
      symptomCategories: [],
      title: '',
      figure: {
        gender: String,
        direction: 'front',
      },
      front: true,
    };
  },
  methods: {
    onInit(panzoomInstance) {
      panzoomInstance.on('touch', () => false);
    },
    onSelect(option) {
      this.isCategorySelected = true;
      this.category = option.title;
      const circles = document.getElementsByClassName('circle');
      while (circles.length > 0) {
        circles[0].parentElement.removeChild(circles[0]);
      }
      // this.setSymptoms(option.title);
    },
    openIntensity(mouseEvent) {
      const { target } = mouseEvent;
      const figure = document.getElementById('figure');

      if (target.id && target !== figure && target instanceof SVGCircleElement === false) {
        this.showIntensityControl = true;
        const figureRect = figure.getBoundingClientRect();

        const relativeX = mouseEvent.clientX - figureRect.left;
        const relativeY = mouseEvent.clientY - figureRect.top;
        // Mouse position
        const x = Math.ceil((663 / figureRect.height) * relativeX);
        const y = Math.ceil((663 / figureRect.height) * relativeY);

        this.location = {
          front: this.front, x, y, title: target.id,
        };
        this.addCirclePulsation(this.location);
      } else if (target instanceof SVGCircleElement) {
        this.lastClickedElement = target;
        const id = target.getAttribute('_id');

        if (target.classList.contains('intensity-set')) {
          this.getSymptom(id);
          this.entryDetails = true;
        } else {
          this.showIntensityControl = true;
          this.addCirclePulsation(this.lastClickedElement);
        }
      }
    },
    setIntensity(intensity) {
      this.lastClickedElement.setAttributeNS(null, 'class', `circle color-${intensity} intensity-set`);
      this.showIntensityControl = false;
      this.removeCirclePulsation(this.lastClickedElement);
      const newSymptom = {
        date: this.entry.date,
        module: 'symptoms',
        intensity,
        category: this.category,
        location: this.location,
        detailsText: '',
        // photos: this.photos,
        // audio: this.audio,
        tags: [],
      };
      this.createSymptom(newSymptom);
    },

    setCircle(element) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttributeNS(null, 'cx', element.location.x);
      circle.setAttributeNS(null, 'cy', element.location.y);
      circle.setAttributeNS(null, 'class', `circle color-${element.intensity} intensity-set`);
      circle.setAttributeNS(null, 'r', 10);
      circle.setAttributeNS(null, '_id', element._id);
      circle.setAttributeNS(null, 'style', 'fill: currentColor;');
      circle.setAttributeNS(null, 'id', `circle-${element.location.x}-${element.location.y}`);
      setTimeout(() => {
        document.getElementById('figure').appendChild(circle);
      }, 400);
    },
    removeCircle(element) {
      if (!element) {
        this.lastClickedElement.remove();
      } else {
        element.remove();
      }
      this.showIntensityControl = false;
    },
    addCirclePulsation(location) {
      const element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      element.setAttributeNS(null, 'cx', location.x);
      element.setAttributeNS(null, 'cy', location.y);
      element.setAttributeNS(null, 'class', 'circle');
      element.setAttributeNS(null, 'r', 10);
      element.setAttributeNS(null, 'style', 'fill: currentColor;');
      element.setAttributeNS(null, 'id', `circle-${location.x}-${location.y}`);
      document.getElementById('figure').appendChild(element);
      this.lastClickedElement = element;

      this.createSVG('animate', {
        attributeType: 'SVG',
        attributeName: 'r',
        begin: '0s',
        dur: '1.5s',
        repeatCount: 'indefinite',
        from: '2%',
        to: '6%',
        class: 'circle-pulsation-animation',
      }, element);

      this.createSVG('animate', {
        attributeType: 'CSS',
        attributeName: 'stroke-width',
        begin: '0s',
        dur: '1.5s',
        repeatCount: 'indefinite',
        from: '3%',
        to: '0%',
        class: 'circle-pulsation-animation',
      }, element);

      this.createSVG('animate', {
        attributeType: 'CSS',
        attributeName: 'opacity',
        begin: '0s',
        dur: '1.5s',
        repeatCount: 'indefinite',
        from: '1',
        to: '0',
        class: 'circle-pulsation-animation',
      }, element);
    },
    removeCirclePulsation(target) {
      const animationElements = target.children;
      const keys = Object.keys(animationElements);
      const values = Object.values(animationElements);
      for (let i = 0; i < keys.length; i += 1) {
        values[i].remove();
      }
    },
    createSVG(elementType, elements, target) {
      const element = document.createElementNS('http://www.w3.org/2000/svg', elementType);
      Object.keys(elements).forEach((key) => {
        element.setAttributeNS(null, key, elements[key]);
      });
      target.appendChild(element);
    },

    getAllSymptoms() {
      this.$store.dispatch(GET_ALL_SYMPTOMS)
        .then(() => {
          this.symptoms = this.getUserSymptoms;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createSymptom(newSymptom) {
      this.$store.dispatch(CREATE_SYMPTOM, {
        date: newSymptom.date,
        module: newSymptom.module,
        intensity: newSymptom.intensity,
        category: this.category,
        location: newSymptom.location,
        detailsText: '',
        // photos: this.photos,
        // audio: this.audio,
        tags: newSymptom.tags,
      })
        .then(() => {
          this.symptoms = this.getUserSymptoms;
          this.entry = this.symptoms[this.symptoms.length - 1];
          this.lastClickedElement.setAttributeNS(null, '_id', this.entry._id);
          this.currentEntries.push(this.entry);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteSymptom(id) {
      this.$store.dispatch(DELETE_SYMPTOM, {
        symptom_id: id,
      })
        .then(() => {
          this.getAllSymptoms();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateSymptom(entry) {
      this.$store.dispatch(UPDATE_SYMPTOM, {
        date: entry.date,
        symptom_id: entry._id,
        module: entry.module,
        intensity: entry.intensity,
        detailsText: entry.detailsText,
        // photos: entry.photos,
        // audio: entry.audio,
        tags: entry.tags,
      })
        .then(() => {
          this.symptoms = this.getUserSymptoms;
          this.entryDetails = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSymptom(id) {
      this.$store.dispatch(GET_SYMPTOM, {
        symptom_id: id,
      })
        .then(() => {
          this.entry = this.getUserSymptoms;
          this.setSymptom(this.entry);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllSymptomCategories() {
      this.$store.dispatch(GET_ALL_SYMPTOMCATEGORIES)
        .then(() => {
          for (let i = 0; i < this.getUserSymptomCategories.length; i += 1) {
            this.symptomCategories.push(
              {
                title: this.getUserSymptomCategories[i].title,
                isSelected: false,
              },
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createSymptomCategory(title) {
      this.$store.dispatch(CREATE_SYMPTOMCATEGORY, {
        title,
      })
        .then(() => {
          this.symptomCategories = [];
          for (let i = 0; i < this.getUserSymptomCategories.length; i += 1) {
            this.symptomCategories.push(
              {
                title: this.getUserSymptomCategories[i].title,
                isSelected: false,
              },
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteSymptomCategory(id) {
      this.$store.dispatch(DELETE_SYMPTOMCATEGORY, {
        symptomCategory_id: id,
      })
        .then(() => {
          this.symptomCategories = this.getUserSymptomCategories;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateSymptomCategory(id) {
      this.$store.dispatch(UPDATE_SYMPTOMCATEGORY, {
        symptomCategory_id: id,
        title: this.title,
      })
        .then(() => {
          this.symptomCategories = this.getUserSymptomCategories;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSymptomCategory(id) {
      this.$store.dispatch(GET_SYMPTOMCATEGORY, {
        symptomCategory_id: id,
      })
        .then(() => {
          this.symptomCategories = this.getUserSymptomCategories;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    turnaround() {
      console.log(this.currentEntries);
      if (this.figure.direction === 'front') {
        this.figure.direction = 'back';
        this.front = false;

        Object.values(this.currentEntries).forEach((value) => {
          if (!value.location.front) {
            this.setCircle(value, this.figure);
          }
        });
      } else {
        this.figure.direction = 'front';
        this.front = true;

        Object.values(this.currentEntries).forEach((value) => {
          if (value.location.front) {
            this.setCircle(value, this.figure);
          }
        });
      }
    },

    setTime(date) {
      this.entry.date = date;
    },
    setSymptom(symptom) {
      this.setCircle(symptom);
    },

    cancelAndClose() {
      if (this.entryid) {
        this.$router.go(-1);
      } else {
        // delete current set Entries
        Object.values(this.currentEntries).forEach((value) => {
          this.deleteSymptom(value._id);
        });
        this.$emit('close');
      }
    },
    close() {
      if (this.entryid) {
        this.updateSymptom(this.entry);
        this.$router.go(-1);
      } else {
        this.$emit('close');
      }
    },
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getUserSymptoms', 'getUserSymptomCategories']),
  },
  mounted() {
    this.figure.gender = this.getUserProfile.gender;
    this.getAllSymptoms();
    this.getAllSymptomCategories();
    this.currentEntries = [];
    this.entry.date = new Date();

    if (this.entryid) {
      this.getSymptom(this.entryid);
    }
  },
};
</script>

<style lang="scss">
  @import "@/assets/scss/components/symptoms-entry.scss";
</style>
