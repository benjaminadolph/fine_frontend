<template>
    <div>
      <SelectEntry module='symptoms' buttonLabel="Kategorie wählen" :multiselect=false />
      <panZoom
        id="symptoms-figure-container"
        v-on:click='addEntry($event)'
        :options="{minZoom: 0.5, maxZoom: 5, center: true}" >
          <IconComponent
            v-bind:name="'woman-front'"
            :size="653"
            :width="227"
            v-bind:color="primaryColor"
          />
        <!-- <img src="@/assets/images/woman-front.svg" /> -->
      </panZoom>
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
    addEntry(e) {
      const { target } = e;
      // Get the bounding rectangle of target
      const rect = target.getBoundingClientRect();

      // Mouse position
      const x = Math.ceil(e.clientX - rect.left);
      const y = Math.ceil(e.clientY - rect.top);
      const container = e.target; // Get svg element
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttributeNS(null, 'cx', x);
      circle.setAttributeNS(null, 'cy', y);
      circle.setAttributeNS(null, 'r', 10);
      circle.setAttributeNS(null, 'style', 'fill: currentColor;');
      container.appendChild(circle);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/symptoms-entry.scss";
</style>
