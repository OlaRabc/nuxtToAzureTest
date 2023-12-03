<template>
  <LeScrollableBox
    class="md:max-h-[80vh] max-md:mb-0 max-md:rounded-b-none shadow-none overflow-y-auto"
  >
    <LeRateBox
      :rates="props.rates?.rateList"
      :totalNumberOfRatings="props.rates?.rateCount"
      class="shadow-none"
    />

    <hr class="border-black mx-8 mb-12" />
    <LeHeading v-if="commentsList.length === 0" class="text-center">
      Brak komentarzy
    </LeHeading>
    <LeHeading v-else-if="error" class="text-center">
      Wystąpił błąd, spróbuj ponownie później
    </LeHeading>

    <LeComment
      v-else
      v-for="item in commentsList"
      :key="item.id"
      :data="item"
      isCompany
      class="last:mb-0 rounded-none border-0 border-b last:border-0 !shadow-none"
    />

    <LeBtn v-if="isMoreData" class="mx-auto" size="lg" @click="showInformation">
      Więcej
    </LeBtn>
  </LeScrollableBox>
</template>

<script setup lang="ts">
import Rate from "~/types/Rate";
import { useApiUrlStore } from "~/stores/api";
import { onMounted } from "#imports";

const props = defineProps({
  rates: {
    type: Object as PropType<Rate>,
    required: true,
  },
});

onMounted(() => {
  loadData();
});

const showInformation = (id: number) => {
  loadData();
};

const apiUrl = useApiUrlStore().getApiUrl();
const route = useRoute();

const commentsList = ref([]);
let page = 0;
let isMoreData = false;
let error = false;
let isLoadingData = false;
const loadData = async () => {
  isLoadingData = true;
  error = false;

  try {
    await fetch(
      `${apiUrl}/comment-customer/customer/${route.params.id}/${page}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        commentsList.value = [...commentsList.value, ...data.content];
        isMoreData = !data.last;
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

  isLoadingData = false;
};
</script>
