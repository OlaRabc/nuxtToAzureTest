<template>
  <Transition>
    <div
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[300]"
      v-if="props.isOpen"
    >
      <div
        class="flex justify-center absolute left-0 w-full h-full pt-4 overflow-y-auto"
        :class="{ 'items-center': props.center }"
        @click="props.closeOnBg ? $emit('onClose') : ''"
      >
        <div
          class="relative w-5/6 md:w-1/2 lg:w-1/3 h-max px-8 py-8 bg-white text-center rounded-xl"
          @click.stop
        >
          <LeCloseBtn
            v-if="props.closeBtn"
            class="absolute top-4 right-4 !text-xl"
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
export interface Props {
  center?: Boolean;
  closeBtn?: Boolean;
  closeOnBg?: Boolean;
  isOpen: Boolean;
}

const props = defineProps<{
  center?: false;
  closeBtn: false;
  closeOnBg: false;
  isOpen: false;
}>();
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
