<template>
  <LeModal :isOpen="companiesStore.isRegionModal" closeOnBg @onClose="close">
    <LeHeading variant="h4" class="mt-0"> Zakres usług: </LeHeading>

    <div
      class="flex flex-wrap justify-around content-start h-[40vh] mb-8 overflow-y-auto"
    >
      <LeMistTop />

      <LeBadges
        v-for="(item, index) in newSelectedDataList"
        :key="item.city.value"
        class="!w-full mx-4 px-4 relative"
        @click="removeElement(item, index)"
      >
        <div class="text-xl mb-2">
          {{ item.city.value }}
        </div>
        <div class="flex flex-wrap justify-between items-center mb-2">
          <div
            v-for="element in fullScopeList"
            class="border px-2 mx-4 rounded"
            :class="
              element.value === item.scope.value
                ? 'bg-white text-indigo-700'
                : ' hover:bg-white hover:text-indigo-700'
            "
            @click.stop="changeScope(item, element)"
          >
            {{ element.value }} km
          </div>
        </div>
        <LeBtnIcon
          icon="minus"
          :isColorAnimation="false"
          class="!ml-auto mr-0 absolute right-2 top-2 text-2xl"
        />
      </LeBadges>

      <LeBadges
        v-for="(item, index) in unselectedDataList"
        :key="item.value"
        @click="addElement(item, index)"
        class="flex justify-between !w-full mx-4 px-4 text-xl"
      >
        {{ item.value }}

        <LeBtnIcon icon="plus" :isColorAnimation="false" />
      </LeBadges>

      <LeMistBottom />
    </div>

    <div class="flex justify-around">
      <LeBtn variant="red" @click="close">Anuluj</LeBtn>

      <LeBtn @click="saveAndClose">Akceptuj</LeBtn>
    </div>
  </LeModal>
</template>

<script setup lang="ts">
import CompanyRegion from "~/types/CompanyRegion";
import Scope from "~/types/Scope";
import City from "~/types/City";

import { useCompaniesProfileSettings } from "~/stores/companiesProfileSettings";
const companiesStore = useCompaniesProfileSettings();

const props = defineProps({
  selectedDataList: {
    type: Array<CompanyRegion>,
    required: true,
  },
  fullCityList: {
    type: Array<City>,
    required: true,
  },
  fullScopeList: {
    type: Array<Scope>,
    required: true,
  },
});

const newSelectedDataList = ref();
const unselectedDataList = ref();

watch(
  () => props.selectedDataList,
  () => {
    newSelectedDataList.value = [...props.selectedDataList];
    unselectedDataList.value = filterFullList();
  },
);

const filterFullList = (): Array<City> => {
  return props.fullCityList?.filter((element: City) => {
    const y = props.selectedDataList?.findIndex(
      (el) => el.city.id === element.id,
    );
    if (y === -1) return element;
  });
};

const prepareNewItem = (item: City): CompanyRegion => {
  return {
    id: null,
    idCompany: null,
    city: { id: item.id, value: item.value },
    scope: { id: 5, value: 0 },
  };
};

const addElement = (item: City, index: number): void => {
  const newElement = prepareNewItem(item);

  newSelectedDataList.value.push(newElement);
  unselectedDataList.value.splice(index, 1);
};
const removeElement = (item: CompanyRegion, index: number): void => {
  unselectedDataList.value.push(item.city);
  newSelectedDataList.value.splice(index, 1);
};
const close = (): void => {
  newSelectedDataList.value = [...props.selectedDataList];
  unselectedDataList.value = filterFullList();

  companiesStore.closeRegionModal();
};

const emit = defineEmits(["onSaveAndClose"]);
const saveAndClose = (): void => {
  emit("onSaveAndClose", newSelectedDataList.value);

  companiesStore.closeRegionModal();
};

const changeScope = (element: CompanyRegion, newValue: Scope): void => {
  const index: number = newSelectedDataList.value.indexOf(element);
  if (index === -1) {
    console.error("Nie znaleziono elementy");
    return;
  }
  newSelectedDataList.value[index].scope = newValue;
};
</script>
