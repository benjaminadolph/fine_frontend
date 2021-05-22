<template>
    <span
        :class="['icon-wrapper', color]"
        :style="{ width: sizeWidth + 'px', height: size + 'px', color: color}"
        @click="$emit('click')"
    >
        <!-- Icon can't be resized -->
        <svg v-if="strictMode" xmlns="http://www.w3.org/2000/svg" :width="sizeWidth + 'px'" :height="size + 'px'" :id="id">
            <use
                x="0"
                y="0"
                :width="sizeWidth + 'px'"
                :height="size + 'px'"
                :viewBox="'0 0 ' + sizeWidth + ' ' + size"
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
      type: Number,
      default: 16,
    },
    width: {
      type: Number,
    },
    name: {
      type: String,
      default: 'arrow-right',
    },
    color: {
      type: String,
      default: 'fine-grey-dark',
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
    sizeWidth() {
      let _sizeWidth = this.size;
      if (this.width) {
        _sizeWidth = this.width;
      }
      return _sizeWidth;
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/components/icon-component.scss";
</style>
