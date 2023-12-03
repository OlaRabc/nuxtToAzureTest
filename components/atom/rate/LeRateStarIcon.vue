<template>
  <div class="relative w-max">
    <client-only>
      <font-awesome-icon icon="fa-star" class="text-amber-300 !text-3xl" />

      <span
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl"
      >
        <slot />
      </span>
    </client-only>
  </div>
</template>
