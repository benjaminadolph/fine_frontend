/* eslint-disable */
<template>
    <div>
      <SelectEntry
        ref="selectEntryData"
        module='symptoms'
        buttonLabel="Kategorie wählen"
        :multiselect=false
        v-on:update="onSelect"
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
        <panZoom
          id="figure"
          :options="{maxZoom: 3, minZoom: 1}"
        >
          <IconComponent
            v-bind:name="'woman-front'"
            :size="653"
            :width="335"
            v-bind:color="primaryColor"
          />
        </panZoom>
        <div ref="intensityControl" v-show="showIntensityControl" class="intensity-control">
          <span v-on:click="setIntensity(5)" class="five intensity">5</span>
          <span v-on:click="setIntensity(4)" class="four intensity">4</span>
          <span v-on:click="setIntensity(3)" class="three intensity">3</span>
          <span v-on:click="setIntensity(2)" class="two intensity selected">2</span>
          <span v-on:click="setIntensity(1)" class="one intensity">1</span>
          <IconComponent
            name="trash"
            size="24"
            color="#fff"
            v-on:click="removeCircle()"
          />
        </div>
      </div>
      <div v-if="entryDetails" >
          <ModuleEntryDetails
            module="symptoms"
            :entry="entry"
            v-on:saveEntryDetails="updateSymptom"
          />
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SelectEntry from '@/components/SelectEntry.vue';
import IconComponent from '@/components/IconComponent.vue';
import ModuleEntryDetails from '@/components/entry/ModuleEntryDetails.vue';

export default {
  name: 'SymptomsEntry',
  components: {
    SelectEntry,
    IconComponent,
    ModuleEntryDetails,
  },
  data() {
    return {
      symptoms: [],
      entryDetails: false,
      entry: {},
      category: '',
      showIntensityControl: false,
      lastClickedElement: false,
      isCategorySelected: false,
      // selectEntryData: null,
    };
  },
  methods: {
    onSelect(option) {
      this.isCategorySelected = true;
      this.category = option.title;
      const circles = document.getElementsByClassName('circle');
      while (circles.length > 0) {
        circles[0].parentElement.removeChild(circles[0]);
      }
      this.setSymptoms(option.title);
    },
    openIntensity(mouseEvent) {
      const { target } = mouseEvent;
      const figureSVG = document.getElementById('653-woman-front');
      // const figure = document.getElementById('symptoms-figure-container');
      if (figureSVG === target) {
        this.showIntensityControl = true;
        const figureRect = target.getBoundingClientRect();
        // const figureContainerRect = figure.getBoundingClientRect();

        const relativeX = mouseEvent.clientX - figureRect.left;
        const relativeY = mouseEvent.clientY - figureRect.top;
        // Mouse position
        const x = Math.ceil((663 / figureRect.height) * relativeX);
        const y = Math.ceil((663 / figureRect.height) * relativeY);

        this.setCircle({ location: { x, y } });

        this.lastClickedElement = document.getElementById(`circle-${x}-${y}`);
        this.addCirclePulsation(this.lastClickedElement);
      }
      if (target instanceof SVGCircleElement) {
        this.lastClickedElement = target;
        const id = target.getAttribute('_id');
        this.getSymptom(id);
        if (target.classList.contains('intensity-set')) {
          this.entryDetails = true;
          this.entryId = id;
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
      const lastClickedElementPosition = this.lastClickedElement.id;
      const location = {
        x: lastClickedElementPosition.split('-')[1],
        y: lastClickedElementPosition.split('-')[2],
      };
      const newSymptom = {
        date: new Date(),
        module: 'symptoms',
        intensity,
        category: this.category,
        location,
        // detailsText: this.detailsText,
        // photos: this.photos,
        // audio: this.audio,
        // tags: this.tags,
      };
      this.createSymptom(newSymptom);
    },
    setCircle(element) {
      const target = document.getElementById('653-woman-front');
      let intensityClass = 'circle';
      let _id = '';
      if (element.intensity) {
        intensityClass = `circle color-${element.intensity} intensity-set`;
      }
      if (element._id) {
        _id = element._id;
      }
      this.createSVG('circle', {
        cx: element.location.x,
        cy: element.location.y,
        class: intensityClass,
        r: 10,
        _id,
        style: 'fill: currentColor;',
        id: `circle-${element.location.x}-${element.location.y}`,
      }, target);
    },
    removeCircle(element) {
      if (!element) {
        this.lastClickedElement.remove();
      } else {
        element.remove();
      }
      this.showIntensityControl = false;
    },
    addCirclePulsation(target) {
      this.createSVG('animate', {
        attributeType: 'SVG',
        attributeName: 'r',
        begin: '0s',
        dur: '1.5s',
        repeatCount: 'indefinite',
        from: '2%',
        to: '6%',
        class: 'circle-pulsation-animation',
      }, target);

      this.createSVG('animate', {
        attributeType: 'CSS',
        attributeName: 'stroke-width',
        begin: '0s',
        dur: '1.5s',
        repeatCount: 'indefinite',
        from: '3%',
        to: '0%',
        class: 'circle-pulsation-animation',
      }, target);

      this.createSVG('animate', {
        attributeType: 'CSS',
        attributeName: 'opacity',
        begin: '0s',
        dur: '1.5s',
        repeatCount: 'indefinite',
        from: '1',
        to: '0',
        class: 'circle-pulsation-animation',
      }, target);
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
      this.$store.dispatch('GET_ALL_SYMPTOMS')
        .then(() => {
          this.symptoms = this.getUserSymptoms;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createSymptom(newSymptom) {
      this.$store.dispatch('CREATE_SYMPTOM', {
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteSymptom(id) {
      this.$store.dispatch('DELETE_SYMPTOM', {
        symptom_id: id,
      })
        .then(() => {
          this.getAllSymptoms();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setSymptoms(category) {
      const _this = this;
      if (this.symptoms.length > 0) {
        this.symptoms.forEach((element) => {
          if (element.category === category) {
            _this.setCircle(element);
          }
        });
      }
    },
    updateSymptom(entry) {
      console.log(entry);
      this.$store.dispatch('UPDATE_SYMPTOM', {
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
      this.$store.dispatch('GET_SYMPTOM', {
        symptom_id: id,
      })
        .then(() => {
          this.entry = this.getUserSymptoms;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getUserSymptoms']),
  },
  mounted() {
    this.getAllSymptoms();
  },
};
</script>

<style lang="scss">
  @import "@/assets/scss/components/symptoms-entry.scss";
</style>
