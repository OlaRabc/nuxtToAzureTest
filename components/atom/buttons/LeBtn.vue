<template>
  <button
    :type="props.type"
    class="block text-center shadow-[8px_8px_15px_0px_rgba(14,16,35,0.3)] duration-200 ease-in-out whitespace-nowrap"
    :class="[
      btnVariant,
      btnRound,
      btnSize,
      { 'opacity-50 cursor-not-allowed': disable },
    ]"
    @click="onBtnClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

enum ButtonVariant {
  Primary = "primary",
  White = "white",
  LinkWhite = "link-white",
  Red = "red",
}

enum RoundType {
  Round = "round",
  Full = "full",
}

enum SizeType {
  SM = "sm",
  XL = "xl",
}

const props = defineProps({
  variant: {
    type: String,
    required: false,
    default: "primary",
  },
  type: {
    type: String,
    required: false,
    default: "button",
  },
  round: {
    type: String,
    required: false,
    default: "round",
  },
  disable: {
    type: Boolean,
    required: false,
    default: false,
  },
  size: {
    type: String,
    required: false,
    default: "md",
  },
});

const btnVariant = computed(() => {
  switch (props.variant) {
    case ButtonVariant.White:
      return "!bg-white hover:!bg-indigo-600 active:!bg-indigo-900 font-bold !text-indigo-600 hover:!text-white border !border-indigo-600";
    case ButtonVariant.LinkWhite:
      return "!text-indigo-50 hover:!text-indigo-600 font-bold";
    case ButtonVariant.Red:
      return "!bg-red-600 hover:!bg-red-500 active:!bg-red-90 !text-white";
    default:
      return "!bg-indigo-600 hover:!bg-indigo-500 active:!bg-indigo-90 !text-white";
  }
});

const btnRound = computed(() => {
  switch (props.round) {
    case RoundType.Full:
      return "rounded-3xl";
    default:
      return "rounded-lg";
  }
});

const btnSize = computed(() => {
  switch (props.size) {
    case SizeType.SM:
      return "py-2 md:px-2";
    case SizeType.XL:
      return "px-8 py-3 md:px-10 text-xl";
    default:
      return "px-5 py-2 md:px-8";
  }
});

const emit = defineEmits(["onBtnClick"]);
const onBtnClick = () => {
  if (!props.disable) {
    emit("onBtnClick");
  }
};
</script>
