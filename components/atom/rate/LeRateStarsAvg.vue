<template>
  <div class="flex flex-nowrap w-max">
    <font-awesome-icon
      v-for="n in 5"
      :key="n"
      icon="fa-star"
      :class="starClass(n)"
      class="!text-2xl md:text-xl"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  rateAvg: {
    type: Number,
    required: true,
  },
});

const starClass = (n: number) => {
  return n <= Math.ceil(props.rateAvg) ? "text-amber-300" : "text-gray-300";
};
</script>
