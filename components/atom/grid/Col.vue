<template>
  <div class="grow-0 shrink-0 static" :class="[basisClass, offsetClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  col?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  offset?: number;
  offsetSm?: number;
  offsetMd?: number;
  offsetLg?: number;
  offsetXl?: number;
  offsetXxl?: number;
}>();

const size = (size: number) => {
  return size === 12 ? "full" : size + "/12";
};

const basisClass = computed(() => {
  return [
    props.col ? `basis-${size(props.col)}` : "basis-full",
    props.sm ? `sm:basis-${size(props.sm)}` : "",
    props.md ? `md:basis-${size(props.md)}` : "",
    props.lg ? `lg:basis-${size(props.lg)}` : "",
    props.xl ? `xl:basis-${size(props.xl)}` : "",
    props.xxl ? `xxl:basis-${size(props.xxl)}` : "",
  ];
});

const offsetClass = computed(() => {
  return [
    props.offset ? `ml-${size(props.offset)}` : "",
    props.offsetSm ? `sm:ml${size(props.offsetSm)}` : "",
    props.offsetMd ? `md:ml-${size(props.offsetMd)}` : "",
    props.offsetLg ? `lg:ml-${size(props.offsetLg)}` : "",
    props.offsetXl ? `xl:ml-${size(props.offsetXl)}` : "",
    props.offsetXxl ? `xxl:ml-${size(props.offsetXxl)}` : "",
  ];
});
</script>
