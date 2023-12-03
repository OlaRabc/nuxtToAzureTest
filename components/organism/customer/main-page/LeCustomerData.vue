<template>
  <div class="text-center">
    <LeHeading type="h1">
      {{ props.data.name }}
      {{ props.data.surname }}
    </LeHeading>

    <div class="w-full mr-2 mb-2">
      <nuxt-img
        :src="imgPath(props.data.name, props.data.profile)"
        :alt="`zdjęcie peofilowe ${props.data.name} ${props.data.surname}`"
        width="90"
        height="110"
        class="rounded-2xl w-1/3 mx-auto"
      />
    </div>

    <div>
      <LeRateStarsAvg :rateAvg="props.rateAvg" class="mx-auto mb-16" />

      <LeBtnLink :to="`tel:${props.data?.phone}`" class="mb-8 inline-block">
        Zadzwoń: {{ props.data?.phone }}
      </LeBtnLink>

      <LeParagraph>lub</LeParagraph>

      <LeBtnLink :to="`mailto:${props.data?.mail}`" class="mb-8 inline-block">
        Napisz maila: {{ props.data?.mail }}
      </LeBtnLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import imgPath from "assets/js/functions/imgPath";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  rateAvg: {
    type: Number,
    required: true,
  },
});
</script>
