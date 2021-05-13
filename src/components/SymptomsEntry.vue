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
      <div v-show="entryDetails" >
          <ModuleEntryDetails module="symptoms" />
      </div>
    </div>
</template>

<script>
import SelectEntry from '@/components/SelectEntry.vue';
import IconComponent from '@/components/IconComponent.vue';
import ModuleEntryDetails from '@/views/ModuleEntryDetails.vue';

export default {
  name: 'SymptomsEntry',
  components: {
    SelectEntry,
    IconComponent,
    ModuleEntryDetails,
  },
  data() {
    return {
      entryDetails: false,
      showIntensityControl: false,
      lastClickedElement: false,
      isCategorySelected: false,
      // selectEntryData: null,
    };
  },
  methods: {
    onSelect(selected) {
      this.isCategorySelected = selected;
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

        /* const divX = Math.ceil(mouseEvent.clientX - figureContainerRect.left);
          const divY = Math.ceil(mouseEvent.clientY - figureContainerRect.top);

          const _intensityControl = this.$refs.intensityControl;

          _intensityControl.style.left = `${divX}px`;
          _intensityControl.style.top = `${divY - 245}px`; */

        this.createSVG('circle', {
          cx: x,
          cy: y,
          r: 10,
          style: 'fill: currentColor;',
          // onClick: 'changeColor();',
          // stroke: '#E28BB2',
          // 'stroke-width': 2,
          id: `circle-${x}-${y}`,
        }, target);

        this.lastClickedElement = document.getElementById(`circle-${x}-${y}`);
        this.addCirclePulsation(this.lastClickedElement);
      }
      if (target instanceof SVGCircleElement) {
        this.lastClickedElement = target;
        if (target.classList.contains('intensity-set')) {
          this.entryDetails = true;
        } else {
          this.showIntensityControl = true;
          this.addCirclePulsation(this.lastClickedElement);
        }
      }
    },
    setIntensity(intensity) {
      this.lastClickedElement.setAttributeNS(null, 'class', `color-${intensity} intensity-set`);
      this.showIntensityControl = false;
      this.removeCirclePulsation(this.lastClickedElement);
    },
    removeCircle() {
      this.lastClickedElement.remove();
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
  },
};
</script>

<style lang="scss">
  @import "@/assets/scss/components/symptoms-entry.scss";
</style>
