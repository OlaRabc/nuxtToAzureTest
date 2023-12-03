<template>
  <div
    class="px-4 py-2 bg-white rounded-3xl shadow-[4px_8px_15px_0px_rgba(14,16,35,0.3)]"
  >
    <LeHeading variant="h5" class="text-center">
      Opinie:

      <LeRateCount class="inline-block text-black">
        {{ props.totalNumberOfRatings }}
      </LeRateCount>
    </LeHeading>

    <div
      v-for="(item, index) in props.rates"
      :key="item.numberOfStars"
      class="flex justify-around items-center mb-4"
    >
      <LeRateStarIcon>{{ index + 1 }}</LeRateStarIcon>

      <LeRateBar :percentOfAllRates="countPercent(item)" />

      <LeRateSingleCount>{{ item }}</LeRateSingleCount>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  totalNumberOfRatings: {
    type: Number,
    required: true,
  },
  rates: {
    type: Array,
    required: true,
  },
});

const countPercent = (count: number): number => {
  return (count * 100) / props.totalNumberOfRatings;
};
</script>
