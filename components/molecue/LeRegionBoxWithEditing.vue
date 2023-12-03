<template>
  <LeScrollableBox
    class="flex flex-wrap justify-around content-start h-[250px]"
  >
    <LeHeading variant="h4" class="w-full mx-4 mt-0">
      Regiony prac:

      <LeBtnIcon
        icon="circle-plus"
        :isRotateAnimation="false"
        class="ml-4"
        @click="$emit('onClick')"
      />
    </LeHeading>

    <LeBadges
      v-for="item in props.regionsList"
      :key="item.id"
      class="!w-full mx-4 px-4"
    >
      {{ item?.city?.value }}

      <span class="inline-block ml-2">
        <client-only>
          <font-awesome-icon :icon="['fas', 'plus-minus']" size="xs" />

          {{ item?.scope?.value }} km
        </client-only>
      </span>
    </LeBadges>

    <LeBadges v-if="!props.regionsList?.length" class="mx-4 px-4">
      Brak zarejestrowanych miejscowości
    </LeBadges>
  </LeScrollableBox>
</template>

<script setup lang="ts">
const props = defineProps({
  regionsList: {
    required: false,
  },
});
</script>
