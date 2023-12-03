<template>
  <Transition>
    <div
      class="fixed top-0 left-0 w-full md:w-2/5 h-[100vh] md:pt-20 bg-white shadow-[8px_8px_5px_0px_rgba(14,16,35,0.3)] overflow-hidden z-[210] md:z-[190]"
      v-if="cooperationStore.getIsListOpen()"
    >
      <div class="h-[5%] relative">
        <button
          class="absolute right-4 top-0 text-2xl text-gray-600 hover:text-indigo-600 transition-all"
          @click="toggleSection"
        >
          <font-awesome-icon icon="fa-solid fa-chevron-left" />
        </button>
      </div>

      <LeErrorBox v-if="error">
        Wystąpił błąd, spróbuj ponownie później.
      </LeErrorBox>

      <LeHeading
        v-else-if="!cooperationStore.getCooperationListLength()"
        type="h1"
        variant="h4"
        class="text-center"
      >
        Na razie nie masz żadnych współprac.
      </LeHeading>

      <div v-else class="h-[90%] overflow-x-hidden overflow-y-auto">
        <LeMistTop />
        <LeCooperationBox
          v-for="item in cooperationStore.getCooperationList()"
          :key="item.id"
          :data="item"
          :isActive="cooperationStore.getSelectedCooperationId() === item.id"
          @onClick="showInformation"
        />

        <LeLoadinSection v-if="isLoadingData" />

        <LeBtn v-if="!isMoreData" @onBtnClick="loadData" class="!my-8 mx-auto">
          Więcej
        </LeBtn>

        <LeMistBottom />
      </div>
    </div>

    <button
      v-else
      class="fixed top-20 left-0 p-2 z-10 bg-white hover:text-indigo-600 text-2xl rounded-r-md shadow-[8px_8px_5px_0px_rgba(14,16,35,0.3)]"
      @click="toggleSection"
    >
      <font-awesome-icon icon="fa-solid fa-chevron-right" />
    </button>
  </Transition>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from "#imports";

import { useApiUrlStore } from "~/stores/api";
const apiUrl = useApiUrlStore().getApiUrl();

import { useCooperationStore } from "~/stores/cooperationStore";
const cooperationStore = useCooperationStore();

import { useSessionStore } from "~/stores/sessionStore";
const sessionStore = useSessionStore();

const props = defineProps({
  isCompany: {
    type: Boolean,
    required: false,
    default: false,
  },
});

onMounted(() => {
  cooperationStore.clearData();
  loadData();
});

onUnmounted(() => {
  cooperationStore.clearData();
});

let page = 0;
let isMoreData = false;
const error = ref(false);
const isLoadingData = ref(false);

const resetData = () => {
  isLoadingData.value = true;
  error.value = false;
};

const loadData = async () => {
  resetData();

  try {
    await fetch(
      `${apiUrl}/contract/${props.isCompany ? "company" : "customer"}/${
        sessionStore.loggedId
      }/${page}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cooperationStore.addData(data.content);
        isMoreData = data.last;
        page++;
      })
      .catch((e) => {
        error.value = true;
        console.error("Wystąpił błąd:", e);
      });
  } catch (e) {
    error.value = true;
    console.error("Wystąpił błąd:", e);
  }
  isLoadingData.value = false;
};

const showInformation = (id: number) => {
  cooperationStore.setSelectedCooperationId(id);
};

const toggleSection = () => {
  cooperationStore.toggleIsListOpen();
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
