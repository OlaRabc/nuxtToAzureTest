<template>
  <div class="flex">
    <LeRateStarsAvg :rateAvg="rate.rateAvg" />

    <LeRateCount
      v-if="props.rate.rateCount >= 0"
      class="ml-2 text-gray-400 text-xl"
    >
      {{ props.rate.rateCount }}
    </LeRateCount>
  </div>
</template>

<script setup lang="ts">
import Rate from "~/types/Rate";

const props = defineProps({
  rate: {
    type: Object as PropType<Rate>,
    required: true,
  },
});
</script>
