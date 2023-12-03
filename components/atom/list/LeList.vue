<template>
  <component :is="props.ordered ? 'ol' : 'ul'" class="ml-4">
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = defineProps({
  ordered: {
    type: Boolean,
    required: false,
  },
});
</script>
