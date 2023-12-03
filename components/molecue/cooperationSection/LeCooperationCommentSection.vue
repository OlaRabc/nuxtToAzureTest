<template>
  <LeBox
    class="text-center mb-16"
    :class="{ 'opacity-50 pointer-events-none': hasBeenSent }"
  >
    <Row>
      <Col>
        <LeHeading variant="h5" class="!mt-0 md:text-left">
          Wystaw opinię:
        </LeHeading>
      </Col>
    </Row>

    <Row class="justify-between md:flex-nowrap">
      <Col :sm="6" :lg="7" class="mr-1">
        <LeTextarea
          placeholder="Opisz przebieg współpracy"
          :rows="3"
          class="w-full"
          @onChange="(val) => (description = val)"
        />
      </Col>

      <Col :sm="6" :lg="5" class="flex flex-col items-center">
        <LeRatePost @onChange="(n) => (rateValue = n)" />
        <LeBtn class="mx-auto" @click="sendComment"> Wystaw opimie </LeBtn>
      </Col>
    </Row>
  </LeBox>
</template>

<script setup lang="ts">
import { useCooperationStore } from "~/stores/cooperationStore";
const cooperationStore = useCooperationStore();

import { useApiUrlStore } from "~/stores/api";
const apiUrl = useApiUrlStore().getApiUrl();

const props = defineProps({
  commentCustomer: {
    type: Boolean,
    default: false,
  },
});

const rateValue = ref(0);
const description = ref("");
const hasBeenSent = ref(false);

const sendComment = async () => {
  try {
    await fetch(
      `${apiUrl}/comment-${
        props.commentCustomer ? "customer" : "company"
      }/${cooperationStore.getSelectedCooperationId()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          description: description.value,
          rate: rateValue.value,
        }),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Błąd sieci: ${response.status}`);
        } else {
          cooperationStore.setComment(true);
          hasBeenSent.value = true;
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
