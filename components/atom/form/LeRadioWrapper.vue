<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
});
provide("name", props.name);
</script>
