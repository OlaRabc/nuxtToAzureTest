<template>
  <Container>
    <Row v-if="commentList.length === 0">
      <LeHeading variant="h3"> Brak komentarzy </LeHeading>
    </Row>

    <Row v-else-if="error">
      <LeHeading variant="h3">
        Wystąpił błąd, spróbuj ponownie później
      </LeHeading>
    </Row>

    <Row v-else class="justify-center max-md:mx-16 mb-32">
      <Col :lg="9" v-for="item in commentList" :key="item.id" class="!mb-8">
        <LeComment :data="item" />
      </Col>

      <Col :col="10" class="!mb-8" v-if="isMoreData">
        <LeBtn class="mx-auto" size="lg" @click="loadData()"> Więcej </LeBtn>
      </Col>
    </Row>
  </Container>
</template>
<script setup lang="ts">
import { useApiUrlStore } from "~/stores/api";
import { onMounted } from "#imports";

const apiUrl = useApiUrlStore().getApiUrl();
const route = useRoute();

let page = 0;
let isMoreData = false;
let error = false;
let isLoadingData = false;
const commentList = ref([]);
const loadData = async () => {
  isLoadingData = true;
  error = false;

  try {
    await fetch(`${apiUrl}/comment-company/company/${route.params.id}/${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        commentList.value = [...commentList.value, ...data.content];
        isMoreData = !data.last;
        page++;
      })
      .catch((e) => {
        error = true;
        console.error("Wystąpił błąd:", e);
      });
  } catch (e) {
    error = true;
    console.error("Wystąpił błąd:", e);
  }

  isLoadingData = false;
};

onMounted(() => {
  loadData();
});
</script>
