import { reactive, computed } from 'vue';
import { ItemType, DateType } from '@/constants';

export default function usePetSelection() {
  const pets = reactive([
    {
      id: 1,
      name: 'Dog',
      icon: 'fa6-solid:dog',
      selected: true,
      type: ItemType.DOG,
    },
    {
      id: 2,
      name: 'Cat',
      icon: 'fluent-emoji-high-contrast:black-cat',
      selected: false,
      type: ItemType.CAT,
    },
  ]);

  const sittersHome = reactive([
    {
      id: 1,
      name: 'Dog Boarding',
      icon: 'game-icons:dog-house',
      selected: true,
      type: ItemType.SITTERS_HOME,
      compatible: [ItemType.DOG],
      dateType: DateType.RANGE,
    },
    {
      id: 2,
      name: 'Doggy Day Care',
      icon: 'solar:sun-fog-bold',
      selected: false,
      type: ItemType.SITTERS_HOME,
      compatible: [ItemType.DOG],
      dateType: DateType.MULTI_DATE,
    },
  ]);

  const yourHome = reactive([
    {
      id: 1,
      name: 'House Sitting',
      icon: 'ion:home',
      selected: false,
      type: ItemType.YOUR_HOME,
      compatible: [ItemType.DOG, ItemType.CAT],
      dateType: DateType.RANGE,
    },
    {
      id: 2,
      name: 'Dog Walking',
      icon: 'mdi:paw',
      selected: false,
      type: ItemType.YOUR_HOME,
      compatible: [ItemType.DOG],
      dateType: DateType.MULTI_DATE,
    },
    {
      id: 3,
      name: 'Drop-in Visits',
      icon: 'game-icons:house-keys',
      selected: false,
      type: ItemType.YOUR_HOME,
      compatible: [ItemType.DOG, ItemType.CAT],
      dateType: DateType.MULTI_DATE,
    },
  ]);

  // Filter enabled pets
  const enabledPets = computed(() => pets.filter((pet) => pet.selected));

  // Filter enabled option
  const enabledOption = computed(() =>
    [...sittersHome, ...yourHome].filter((pet) => pet.selected)
  );

  // Filtered elements based on selected pets
  const sittersItems = computed(() =>
    enabledPets.value.length
      ? getCompatibleItems({ items: sittersHome })
      : sittersHome
  );
  const yourHomeItems = computed(() =>
    enabledPets.value.length
      ? getCompatibleItems({ items: yourHome })
      : yourHome
  );

  // Check date type of selected option
  const checkDateType = computed(() => {
    const item = [...sittersHome, ...yourHome].find((item) => item.selected);
    if (item) return item.dateType;
    return DateType.MULTI_DATE;
  });

  // Filter items based on selected pets
  const getCompatibleItems = ({ items }) => {
    return items.filter((item) =>
      enabledPets.value.some((enabledPet) =>
        item.compatible.includes(enabledPet.type)
      )
    );
  };

  // Reset button selection
  const resetSelection = () => {
    const currentSelected = [...sittersHome, ...yourHome].find(
      (item) => item.selected
    );
    currentSelected.selected = false;
  };

  // Handle selected pet items
  const handleSelectedPets = ({ id }) => {
    toggleSelectedItem({ items: pets, id });
  };

  // Handle selected items
  const handleSelectedItems = ({ id, type }) => {
    const itemTypes = {
      [ItemType.SITTERS_HOME]: sittersHome,
      [ItemType.YOUR_HOME]: yourHome,
    };

    if (!alreadySelected({ items: itemTypes[type], id })) {
      resetSelection();
      toggleSelectedItem({ items: itemTypes[type], id });
    }
  };

  // Check if item is already selected
  const alreadySelected = ({ items, id }) => {
    return items.some((item) => item.selected && item.id === id);
  };

  // Toggle selected item
  const toggleSelectedItem = ({ items, id }) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      item.selected = !item.selected;
    }
  };

  return {
    pets,
    sittersItems,
    yourHomeItems,
    handleSelectedPets,
    handleSelectedItems,
    enabledPets,
    enabledOption,
    checkDateType,
  };
}
