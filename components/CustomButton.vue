<template>
  <button
    id="button"
    name="button"
    :class="['button', color]"
    type="button"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
/**
 * @typedef {Object} Props
 * @property {string} color - Color possibilities: primary, secondary, tertiary, white
 * @property {boolean} disabled - If button is disabled or not
 */
const { color, disabled } = defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);
</script>

<style lang="scss" scoped>
.button {
  @include transition($duration: 0.2s);
  @include font(14px, 600);
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50px;

  &.primary {
    background-color: $primaryColor;

    &:hover {
      background-color: darken($primaryColor, 10%);
    }
  }

  &.secondary {
    background-color: $secondaryColor;

    &:hover {
      background-color: darken($secondaryColor, 10%);
    }
  }

  &.tertiary {
    background-color: $tertiaryColor;

    &:hover {
      background-color: lighten($tertiaryColor, 5%);
    }
  }

  &.white {
    background-color: white;
    color: $primaryColor;
    outline: 1px solid #dbdbdb;

    &:hover {
      background-color: $primaryColor;
      color: white;
    }
  }
}
</style>
