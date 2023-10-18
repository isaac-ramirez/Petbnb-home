<template>
  <section class="buttons-wrapper">
    <h4 class="title mb-1">
      {{ title }}
    </h4>
    <div class="button-section">
      <CustomButton
        v-for="item in items"
        :key="item.id"
        class="square-button"
        :color="item.selected ? 'primary' : 'white'"
        @click="emit('handleSelected', { id: item.id, type: item.type })"
      >
        <Icon class="icon" :name="item.icon" />
        <span>{{ item.name }}</span>
      </CustomButton>
    </div>
  </section>
</template>

<script setup>
/**
 * @typedef {Object} Props
 * @property {array} items - List of items to be displayed
 * @property {boolean} title - Title of the section
 */
const { title, items } = defineProps({
  items: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['handleSelected']);
</script>

<style lang="scss" scoped>
.buttons-wrapper {
  .title {
    @include font(14px, 700);
  }

  .square-button {
    @include flex(column, center, center);
    width: 100%;
    min-height: 90px;
    border-radius: 4px;
    flex-grow: 1;
    flex-basis: 120px;

    .icon {
      height: 30px;
      width: 30px;
    }

    span {
      white-space: nowrap;
    }
  }

  .button-section {
    @include flex(row, flex-start, center);
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>
