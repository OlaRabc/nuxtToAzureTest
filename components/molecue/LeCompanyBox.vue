<template>
  <LeBox>
    <Container>
      <Row class="items-center justify-around">
        <Col :col="10" :sm="6" :lg="2" class="mb-4 sm:max-lg:pr-4">
          <nuxt-img
            class="w-full h-auto rounded-3xl border"
            :src="imgPath(props.company?.name, props.company?.profile)"
            :alt="`Zdjęcie profilowe firmy ${props.company?.name}`"
            width="255"
            height="255"
          />
        </Col>

        <Col :col="10" :sm="6" :lg="6" class="md:flex md:flex-col pr-4">
          <LeHeading variant="h3" class="mt-0 mb-4">
            {{ props.company?.name }}
          </LeHeading>

          <LeRateSection class="mb-4" :rate="props.company?.rate" />
          <LeParagraph class="ellipsis-2">
            {{ props.company?.description }}
          </LeParagraph>
        </Col>

        <Col :lg="3">
          <LeBtn class="w-full mb-4" @click="$emit('openForm')">
            Nawiąż kontakt
          </LeBtn>

          <LeBtnLink :to="`/firma/${props.company?.id}`" class="w-full">
            Zobacz wiecej
          </LeBtnLink>
        </Col>
      </Row>
    </Container>
  </LeBox>
</template>

<script setup lang="ts">
import Company from "~/types/Company";
import imgPath from "assets/js/functions/imgPath";

const props = defineProps({
  company: {
    type: Object as PropType<Company>,
    required: true,
  },
});
</script>
