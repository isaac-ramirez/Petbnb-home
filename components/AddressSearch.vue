<template>
  <input
    ref="addressInput"
    type="search"
    class="custom-input"
    placeholder="Town or postcode..."
    @input="emit('input', $event.target.value)"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useGooglePlaces from '@/composables/useGooglePlaces';

const addressInput = ref(null);
const emit = defineEmits(['input']);

const link =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDcQ3iSW7KWmDkrY3nuyBc59g2_ljDs76M&libraries=places';

onMounted(async () => {
  await useGooglePlaces(link);
  const autocomplete = new google.maps.places.Autocomplete(addressInput.value);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    emit('input', place.formatted_address);
  });
});
</script>

<style lang="scss" scoped>
.custom-input {
  @include font(16px, 600, 16px);
  @include transition();
  width: 100%;
  height: 60px;
  border-radius: 3px 0 0 3px;
  padding: 0 26px;
  border: 1px solid #dbdbdb;

  &:focus {
    outline: none;
    border-color: #dbdbdb;
    box-shadow: 0px 0px 14px -1px rgba(81, 155, 122, 0.57);
  }

  &::placeholder {
    color: #a1a1a1;
    font-weight: 500;
  }

  &:hover {
    border-color: #aaaeb7;
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    content: URL('/clear.svg');
    cursor: pointer;
    width: 21px;
    height: 21px;
    fill: #959595;
  }
}
</style>
