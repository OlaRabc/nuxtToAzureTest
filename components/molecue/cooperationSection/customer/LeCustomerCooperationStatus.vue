<template>
  <LeBox class="flex justify-around mb-16">
    <LeBtn
      variant="red"
      class="mr-2"
      @click="
        changeStatus({ id: 6, value: 'Współpraca przerwana przez klienta' })
      "
    >
      Zerwij współpracę
    </LeBtn>

    <LeBtn @click="changeStatus({ id: 4, value: 'Współpraca zakończona' })">
      Zakończ współpracę
    </LeBtn>
  </LeBox>
</template>

<script setup lang="ts">
import ContractStatus from "~/types/ContractStatus";

import { useCooperationStore } from "~/stores/cooperationStore";
const cooperationStore = useCooperationStore();

import { useApiUrlStore } from "~/stores/api";
const apiUrl = useApiUrlStore().getApiUrl();

const emit = defineEmits(["onStatusChange"]);

const changeStatus = async (newStatus: ContractStatus) => {
  try {
    await fetch(
      `${apiUrl}/contract/change-status/${cooperationStore.getSelectedCooperationId()}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStatus),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Błąd sieci: ${response.status}`);
        } else {
          cooperationStore.changeContractStatus(newStatus);
          emit("onStatusChange");
        }
      })
      .catch((error) => {
        console.error("Wystąpił błąd:", error);
      });
  } catch (e) {
    console.error("Wystąpił błąd:", e);
  }
};
</script>
