<template>
    <span
        class="icon-wrapper"
        :style="{ width: size + 'px', height: size + 'px' }"
        @click="$emit('click')"
    >
        <!-- Icon can't be resized -->
        <svg v-if="strictMode" xmlns="http://www.w3.org/2000/svg" :width="size + 'px'" :height="size + 'px'">
            <use
                x="0"
                y="0"
                :width="size + 'px'"
                :height="size + 'px'"
                :viewBox="'0 0 ' + size + ' ' + size"
                :href="require('@/assets/icons/icon-sprite/sprite.css.svg') + '#' + id"
            />
        </svg>
        <!-- Icon can be resized -->
        <svg v-else xmlns="http://www.w3.org/2000/svg">
            <use :href="require('@/assets/icons/icon-sprite/sprite.css.svg') + '#' + id" />
        </svg>
    </span>
</template>

<script>
export default {
  props: {
    size: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number,
      default: 16,
    },
    name: {
      type: String,
      default: 'arrow-right',
    },
    strictMode: {
      type: Boolean,
      default: true,
    },
  },
  emits: { click: null }, // TBCLF
  computed: {
    id() {
      if (this.strictMode) {
        return `${this.size}-${this.name}`;
      }
      return this.name;
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-wrapper {
    display: flex;
    user-select: none;
}
</style>
