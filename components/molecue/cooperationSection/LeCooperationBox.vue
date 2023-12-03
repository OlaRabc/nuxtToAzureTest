<template>
  <div
    class="flex items-center w-full ml-auto p-2 pr-4 border-b"
    :class="isActive ? 'bg-gray-200' : 'hover:bg-gray-100 cursor-pointer'"
    @click="$emit('onClick', props.data.id)"
  >
    <div class="min-w-max mr-2">
      <nuxt-img
        :src="imgPath(props.data.name, props.data.profile)"
        :alt="`zdjęcie peofilowe ${props.data.name}`"
        width="90"
        height="110"
        class="rounded"
      />
    </div>

    <div class="w-full">
      <div class="flex justify-between items-center">
        <div class="mr-3 my-0 ellipsis-1">{{ props.data.status.value }}</div>

        <div class="shrink-0">
          {{ props.data.lastActualisation }}
        </div>
      </div>

      <div class="flex justify-between items-center">
        <LeHeading variant="h5" class="mr-3 my-0 ellipsis-1">
          {{ props.data.name }}
        </LeHeading>

        <LeBadges
          v-if="props.data.status.id > 3 && !props.data.isComment"
          class="shrink-0"
        >
          Wystaw opinię
        </LeBadges>
      </div>
      <div class="ellipsis-1">
        {{ props.data.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShortContract from "~/types/ShortContract";
import imgPath from "assets/js/functions/imgPath";

const props = defineProps({
  data: {
    type: Object as PropType<ShortContract>,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const isActive = ref(props.isActive);
watch(
  () => props.isActive,
  () => {
    isActive.value = props.isActive;
  },
);
</script>
