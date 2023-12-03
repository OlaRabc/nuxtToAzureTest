<template>
  <component :is="props.type" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
enum SizeType {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
}

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "h2",
  },
  variant: {
    type: String,
    required: false,
    default: "h2",
  },
});

const classes = computed(() => {
  switch (props.variant) {
    case SizeType.H1:
      return "font-bold text-5xl my-8";
    case SizeType.H3:
      return "font-bold text-3xl my-8";
    case SizeType.H4:
      return "font-bold text-2xl my-4";
    case SizeType.H5:
      return "font-bold text-xl my-4";
    case SizeType.H6:
      return "text-md my-4";
    default:
      return "font-bold text-4xl my-8";
  }
});
</script>
