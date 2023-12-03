<template>
  <button @click="$emit('likeClick')">
    <font-awesome-icon
      icon="fa-solid fa-heart"
      class="text-3xl hover:text-red-700"
      :class="[props.isActive ? 'text-red-600' : 'text-gray-300']"
    />
  </button>
</template>
<script setup lang="ts">
const props = defineProps({
  isActive: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
