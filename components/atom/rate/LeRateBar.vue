<template>
  <div class="relative w-[100%] h-[20px] mx-4 bg-gray-200 rounded-full">
    <div
      class="percent absolute top-0 left-0 h-full bg-yellow-300 rounded-full"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  percentOfAllRates: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.percent {
  width: v-bind(percentOfAllRates + "%");
}
</style>
