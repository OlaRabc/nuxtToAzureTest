<template>
  <Container class="min-h-screen">
    <Row class="!justify-between items-stretch">
      <Col
        v-if="companyList.length"
        :md="6"
        v-for="item in companyList"
        :key="item.id"
        class="w-1/3 px-8 mb-8 break-words"
      >
        <LeFavoriteCompanySection :data="item" @removeCompany="removeCompany" />
      </Col>

      <Col v-else>
        <LeLoadinSection v-if="isLoadingData" />

        <LeErrorBox v-else-if="error">
          Coś poszło nie tak, spróbuj ponownie póżniej
        </LeErrorBox>

        <LeParagraph
          v-else-if="!companyList.length"
          class="text-center text-3xl font-bold mt-16"
        >
          Nie masz żadnych polubionych firm.
        </LeParagraph>
      </Col>
    </Row>

    <Row>
      <Col>
        <LeBtn v-if="isMoreData" class="mx-auto mb-16" @click="loadData">
          Więcej
        </LeBtn>
      </Col>
    </Row>
  </Container>
</template>

<script setup lang="ts">
import { onMounted } from "#imports";

import { useApiUrlStore } from "~/stores/api";
const apiUrl = useApiUrlStore().getApiUrl();

import { useSessionStore } from "~/stores/sessionStore";
const sessionStore = useSessionStore();

onMounted(() => {
  loadData();
});

const isLoadingData = ref(false);
const isMoreData = ref(false);
const companyList = ref([]);
let error = false;
let page = 0;

const loadData = async () => {
  isLoadingData.value = true;
  error = false;

  await fetch(`${apiUrl}/favorite/customer/${sessionStore.loggedId}/${page}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      companyList.value = [...companyList.value, ...data.content];
      isMoreData.value = !data.last;
      page++;
    })
    .catch((e) => {
      error = true;
      console.error("Wystąpił błąd:", e);
    });
  isLoadingData.value = false;
};

const removeCompanyFromDB = async (id: Number) => {
  await fetch(`${apiUrl}/favorite/${id}`, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Błąd sieci: ${response.status}`);
      }
    })
    .catch((e) => {
      console.error("Wystąpił błąd:", e);
    });
};
const removeCompanyArray = (id: Number) => {
  companyList.value = companyList.value.filter((value) => value?.id !== id);
};

const removeCompany = async (id: Number) => {
  removeCompanyArray(id);
  await removeCompanyFromDB(id);
};
</script>
