<template>
  <!-- TODO: add to own component -->
    <div v-bind:class="module + '-primary-border select-entry-wrapper'">
      <input
        type="text"
        id="select-entry-title"
        v-bind:class="
          module + '-primary plain-m-bold ' +
          module + '-soft-bgcolor ' +
          module + '-primary-border'"
      />
      <div class="select-entry-details">
        <button v-bind:class="module + '-primary-border btn ' + module + '-primary-bgcolor'">
          Eingabe bestätigen
        </button>
        <div class="results">
          <div v-bind:class="module + '-primary result-header plain-s-book'">Suchergebnisse</div>
          <ul class="result-list">
            <li v-bind:class="module + '-primary-border'">
              Schmerzen
              <IconComponent
                v-bind:name="plus-full"
                :size="32"
                v-bind:color="module + '-primary'"
              />
            </li>
            <li v-bind:class="module + '-primary-border'">Migräne</li>
            <li v-bind:class="module + '-primary-border'">Hautauschlag</li>
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
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/select-entry.scss";
</style>
