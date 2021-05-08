<template>
    <div>
      <SelectEntry module='symptoms' buttonLabel="Kategorie wählen" :multiselect=false />
      <div
        id="symptoms-figure-container"
        v-touch:tap='addEntry'
      >
        <panZoom
          id="figure"
          :options="{maxZoom: 3}"
        >
          <IconComponent
            v-bind:name="'woman-front'"
            :size="653"
            :width="335"
            v-bind:color="primaryColor"
          />
        </panZoom>
      </div>
      <router-link to="/module-entry/symptoms/33/details">
          <IconComponent name="plus-full" :size="50" />
      </router-link>
    </div>
</template>

<script>
import SelectEntry from '@/components/SelectEntry.vue';
import IconComponent from '@/components/IconComponent.vue';

export default {
  name: 'SymptomsEntry',
  components: {
    SelectEntry,
    IconComponent,
  },
  methods: {
    addEntry(mouseEvent) {
      const { target } = mouseEvent;

      const figure = document.getElementById('653-woman-front');
      if (figure === target) {
        const figureRect = figure.getBoundingClientRect();

        const relativeX = mouseEvent.clientX - figureRect.left;
        const relativeY = mouseEvent.clientY - figureRect.top;
        // Mouse position
        const x = Math.ceil((663 / figureRect.height) * relativeX);
        const y = Math.ceil((663 / figureRect.height) * relativeY);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttributeNS(null, 'cx', x);
        circle.setAttributeNS(null, 'cy', y);
        circle.setAttributeNS(null, 'r', 10);
        circle.setAttributeNS(null, 'style', 'fill: currentColor;');
        circle.setAttributeNS(null, 'onClick', 'console.log(\'hello\');');
        circle.setAttributeNS(null, 'id', `circle-${x}-${y}`);
        target.appendChild(circle);
      }
      

      // const panContainer = document.getElementsByClassName('vue-pan-zoom-scene')[0];
      /* const div = document.createElement('div');
      div.classList.add('entry-circle');
      div.style.top = `${y}px`;
      div.style.left = `${x}px`;
      figureContainer.appendChild(div); */
    },
  },
};
</script>

<style lang="scss">
  @import "@/assets/scss/components/symptoms-entry.scss";
</style>
