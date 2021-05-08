<template>
    <div>
      <SelectEntry module='symptoms' buttonLabel="Kategorie wählen" :multiselect=false />
      <div id="symptoms-figure-container">
        <img alt="Vue logo" src="../assets/images/woman-front.svg">
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
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/symptoms-entry.scss";
</style>
