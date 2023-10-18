<template>
  <VueDatePicker
    v-model="dates"
    :range="calendarType === DateType.RANGE"
    :multi-calendars="calendarType === DateType.RANGE"
    :multi-dates="calendarType === DateType.MULTI_DATE"
    :min-date="new Date()"
    :placeholder="
      calendarType === DateType.MULTI_DATE ? 'Choose dates' : 'From - To'
    "
  />
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';
import { DateType } from '@/constants';

const dates = ref([]);

/**
 * @typedef {Object} Props
 * @property {string} calendarType - Type should be RANGE or MULTI_DATE
 */
const { calendarType, model } = defineProps({
  calendarType: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:model']);

watch(dates, (newVal) => {
  emit('update:model', newVal);
});
</script>

<style>
.dp__input {
  font-size: 16px;
  font-family: 'Nunito', sans-serif;
  color: #425864;
  font-weight: 600;
  height: 60px;
  border-radius: 0;
  border: 1px solid #dbdbdb;
}

@media screen and (max-width: 670px) {
  .dp__input {
    border-radius: 4px;
  }
}

.dp__input:focus {
  outline: none;
  border-color: #dbdbdb;
  box-shadow: 0px 0px 14px -1px rgba(81, 155, 122, 0.57);
}

.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #519b7a;
  --dp-primary-disabled-color: #519b7aa7;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}
</style>
