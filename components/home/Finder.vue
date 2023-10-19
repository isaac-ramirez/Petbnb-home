<template>
  <main class="main-wrapper">
    <ButtonSection
      title="Pets"
      :items="pets"
      @handle-selected="handleSelectedPets"
    />
    <section class="buttons-section mt-5">
      <ButtonSection
        v-show="sittersItems.length"
        title="At the sitter's home"
        :items="sittersItems"
        @handle-selected="handleSelectedItems"
      />
      <ButtonSection
        v-show="yourHomeItems.length"
        title="At your home"
        :items="yourHomeItems"
        @handle-selected="handleSelectedItems"
      />
    </section>
    <section class="inputs-section mt-5">
      <div class="input-wrapper">
        <h4 class="title mb-1">House sitting near</h4>
        <AddressSearch @input="handleAddress" />
      </div>
      <div class="input-wrapper">
        <h4 class="title date mb-1">For which dates?</h4>
        <DatePicker
          v-model="dates"
          :calendar-type="checkDateType"
        />
      </div>
      <CustomButton
        class="search-button"
        color="tertiary"
        @click="handleSearch"
      >
        <Icon
          class="icon"
          name="ic:baseline-search"
        />
      </CustomButton>
    </section>
  </main>
</template>

<script setup>
import usePetSelection from '@/composables/usePetSelection';
import { ref } from 'vue';
const address = ref('');
const dates = ref([]);

const {
  pets,
  sittersItems,
  yourHomeItems,
  handleSelectedPets,
  handleSelectedItems,
  enabledPets,
  enabledOption,
  checkDateType,
} = usePetSelection();

watch(sittersItems.value, () => {
  dates.value = [];
});
watch(yourHomeItems.value, () => {
  dates.value = [];
});

const handleSearch = () => {
  console.log({
    address: address.value,
    dates: dates.value,
    petsSelected: enabledPets.value,
    optionSelected: enabledOption.value,
  });
};

const handleAddress = (addressInput) => {
  address.value = addressInput;
};
</script>

<style lang="scss" scoped>
.main-wrapper {
  background-color: $backgroundColor;
  max-width: 900px;
  width: 100%;
  margin: 20px;
  border-radius: 4px;
  padding: 15px 25px;
  box-shadow: 0 3px 8px -2px rgba(0, 0, 0, 0.15);
  @include transition();

  .buttons-section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;

    @include breakpoint(350px) {
      grid-template-columns: 1fr;
    }
  }

  .inputs-section {
    @include flex(row, flex-start, flex-end);

    .input-wrapper {
      width: 100%;
      .title {
        @include font(14px, 700);
      }
    }

    .search-button {
      min-width: 100px;
      height: 60px;
      border-radius: 0 3px 3px 0;
      @include flex(row, center, center);
      @include transition();

      &:hover {
        background-color: darken($tertiaryColor, 5%);
      }

      .icon {
        height: 25px;
        width: 25px;
      }
    }

    @include breakpoint(670px) {
      flex-direction: column;
      align-items: flex-start;

      .date {
        margin-top: 10px;
      }

      .input-wrapper {
        .custom-input {
          border-radius: 4px;
        }
      }

      .search-button {
        width: 100%;
        margin-top: 10px;
        border-radius: 4px;
        &::after {
          content: 'Search';
        }
      }
    }
  }
}
</style>
