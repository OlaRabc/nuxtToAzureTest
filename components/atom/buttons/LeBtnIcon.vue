<template>
  <button
    class="ease-in-out duration-200"
    type="button"
    :class="[
      { 'hover:text-indigo-600 ': props.isColorAnimation },
      { 'hover:rotate-180': props.isRotateAnimation },
    ]"
    @click="$emit('onBtnClick')"
  >
    <client-only>
      <font-awesome-icon :icon="icon" />
    </client-only>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  isColorAnimation: {
    type: Boolean,
    required: false,
    default: true,
  },
  isRotateAnimation: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>
