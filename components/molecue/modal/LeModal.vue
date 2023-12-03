<template>
  <Transition>
    <div
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[300]"
      v-if="props.isOpen"
    >
      <div
        class="flex justify-center absolute top-0 left-0 w-full h-full py-16 overflow-y-auto"
        :class="{ 'items-center': props.center }"
        @click="props.closeOnBg ? $emit('onClose') : ''"
      >
        <div
          class="relative w-11/12 md:w-2/3 h-max px-12 py-14 bg-white rounded-2xl"
          @click.stop
        >
          <LeCloseBtn
            v-if="props.closeBtn"
            class="absolute top-4 right-8 !text-xl"
            size="xl"
            @click="$emit('onClose')"
          />
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps({
  center: {
    type: Boolean,
    required: false,
    default: false,
  },
  closeBtn: {
    type: Boolean,
    required: false,
    default: false,
  },
  closeOnBg: {
    type: Boolean,
    required: false,
    default: false,
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
