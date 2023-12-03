<template>
  <LeModal :isOpen="companiesStore.isExpertiseModal" closeOnBg @onClose="close">
    <LeHeading variant="h4" class="mt-0"> Zakres usług: </LeHeading>

    <div
      class="flex flex-wrap justify-around items-start h-[40vh] mb-8 overflow-y-auto"
    >
      <LeMistTop />

      <LeBadges
        v-for="(item, index) in newSelectedDataList"
        :key="item.value"
        @click="removeElement(item, index)"
        class="cursor-pointer"
      >
        {{ item.value }}

        <LeBtnIcon icon="minus" :isColorAnimation="false" />
      </LeBadges>

      <LeBadges
        v-for="(item, index) in unselectedDataList"
        :key="item.value"
        @click="addElement(item, index)"
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
import { useCompaniesProfileSettings } from "~/stores/companiesProfileSettings";

import Expertise from "~/types/Expertise";
const companiesStore = useCompaniesProfileSettings();

const props = defineProps({
  selectedDataList: {
    type: Array<Expertise>,
    required: true,
  },
  fullDataList: {
    type: Array<Expertise>,
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

const filterFullList = (): Array<Expertise> => {
  return props.fullDataList?.filter((element) => {
    const y = props.selectedDataList?.findIndex((el) => el.id === element.id);
    if (y === -1) return element;
  });
};

const addElement = (item: Expertise, index: number): void => {
  newSelectedDataList.value.push(item);
  unselectedDataList.value.splice(index, 1);
};
const removeElement = (item: Expertise, index: number): void => {
  unselectedDataList.value.push(item);
  newSelectedDataList.value.splice(index, 1);
};
const close = (): void => {
  newSelectedDataList.value = [...props.selectedDataList];
  unselectedDataList.value = filterFullList();

  companiesStore.closeExpertiseModal();
};

const emit = defineEmits(["onSaveAndClose"]);
const saveAndClose = (): void => {
  emit("onSaveAndClose", newSelectedDataList.value);

  companiesStore.closeExpertiseModal();
};
</script>
