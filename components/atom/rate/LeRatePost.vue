<template>
  <label class="mb-4 whitespace-nowrap">
    <client-only>
      <font-awesome-icon
        v-for="n in 5"
        :key="n"
        icon="fa-star"
        class="!text-3xl cursor-pointer"
        :class="[setColor(n)]"
        @click="setRate(n)"
        @mouseover="setRateOnHover(n)"
        @mouseleave="resetRateOnHover"
      />
    </client-only>
  </label>
</template>

<script setup lang="ts">
const emit = defineEmits(["onChange"]);
const rate = ref(0);
const rateOnHover = ref(0);

const setRate = (n: number): void => {
  rate.value = n;
  emit("onChange", n);
};
const setRateOnHover = (n: number): void => {
  rateOnHover.value = n;
};
const resetRateOnHover = (): void => {
  rateOnHover.value = 0;
};

const setColor = (n: number) => {
  if (rateOnHover.value !== 0) {
    return n <= rateOnHover.value ? "text-amber-300" : "text-gray-300";
  }
  return n <= rate.value ? "text-amber-300" : "text-gray-300";
};
</script>
