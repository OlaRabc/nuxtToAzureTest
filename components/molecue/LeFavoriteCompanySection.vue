<template>
  <LeBox>
    <LeHeading variant="h3" class="mt-0 pr-4">
      <NuxtLink
        :to="`/firma/${props.data?.company?.id}`"
        class="hover:text-indigo-600"
      >
        {{ props?.data?.company?.name }}
      </NuxtLink>
    </LeHeading>

    <LeLikeBtn
      class="absolute top-8 right-4"
      isActive
      @click="$emit('removeCompany', props.data.id)"
    />

    <LeParagraph class="ellipsis-5">
      {{ props?.data?.company?.description ?? "Brak opisu" }}
    </LeParagraph>
  </LeBox>
</template>

<script setup lang="ts">
import Company from "~/types/Company";

const props = defineProps({
  data: {
    type: Object as PropType<Company>,
    required: true,
  },
});
</script>
