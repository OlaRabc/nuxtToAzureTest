<template>
  <LeScrollableBox
    class="flex flex-wrap justify-around content-start h-[250px]"
  >
    <LeHeading type="h2" variant="h4" class="w-full mt-0 mx-4">
      Zakres usług:
    </LeHeading>

    <LeBadges
      v-for="item in props.expertiseList"
      :key="item.id"
      class="mx-4 px-4"
    >
      {{ item.value }}
    </LeBadges>

    <LeBadges v-if="!props.expertiseList?.length" class="mx-4 px-4">
      Brak zarejestrowanych specjalizacji
    </LeBadges>
  </LeScrollableBox>
</template>

<script setup lang="ts">
const props = defineProps({
  expertiseList: {
    type: Array,
    required: false,
  },
});
</script>
