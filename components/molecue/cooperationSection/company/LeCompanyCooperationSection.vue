<template>
  <div
    class="mr-0 ml-auto h-max px-12"
    :class="{ 'md:w-3/5': cooperationStore.getIsListOpen() }"
  >
    <Row v-if="isLoading" class="mt-32">
      <LeLoadinSection />
    </Row>

    <Row v-else-if="error" class="mt-32 text-center">
      <LeHeading variant="h3" class="">
        Wystąpił błąd, spróbuj ponownie później.
      </LeHeading>
    </Row>

    <Row v-else-if="cooperationStore.getSelectedCooperationId()" class="">
      <Col>
        <LeCompanyCooperationContactData
          :data="data.customer"
          class="mt-8 mb-16 relative left-12"
        />
      </Col>

      <Col>
        <LeCooperationDescription>
          <LeHeading type="h1" variant="h4" class="border-b">
            {{ data?.title }}
          </LeHeading>
          <LeParagraph>
            {{ data?.description }}
          </LeParagraph>
        </LeCooperationDescription>
      </Col>
      <Col v-if="data.status.id > 3 && !data.commentCustomer">
        <LeCooperationCommentSection commentCustomer />
      </Col>

      <Col v-else-if="data.status.id === 1" :md="8">
        <LeCooperationAccepts @onStatusChange="reloadData" />
      </Col>

      <Col v-else-if="data.status.id === 2" :md="8">
        <LeCompanyCooperationStatus />
      </Col>
    </Row>

    <Row v-else class="mt-32 text-center">
      <LeHeading variant="h3">
        Wybierz współpracę z listy, aby zobaczyć jej szczegóły.
      </LeHeading>
    </Row>
  </div>
</template>

<script setup lang="ts">
import Contract from "~/types/Contract";

import { useCooperationStore } from "~/stores/cooperationStore";
const cooperationStore = useCooperationStore();

import { useApiUrlStore } from "~/stores/api";
const apiUrl = useApiUrlStore().getApiUrl();

const data = ref(Object as PropType<Contract>);
const isLoading = ref(false);
const error = ref(false);

watch(
  () => cooperationStore.selectedCooperationId,
  async () => {
    await loadData();
  },
);

const loadData = async () => {
  isLoading.value = true;

  try {
    await fetch(
      `${apiUrl}/contract/${cooperationStore.getSelectedCooperationId()}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        data.value = response;
      })
      .catch((e) => {
        error.value = true;
        console.error("Wystąpił błąd:", e);
      });
  } catch (e) {
    error.value = true;
    console.error("Wystąpił błąd:", e);
  }

  isLoading.value = false;
};

const reloadData = () => {
  loadData();
};
</script>
