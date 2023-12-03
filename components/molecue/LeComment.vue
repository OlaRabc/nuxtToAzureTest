<template>
  <LeBox>
    <Container>
      <Row class="justify-around items-start">
        <Col class="md:flex md:flex-col pr-4">
          <div class="mb-4">
            <div class="md:flex md:justify-between md:flex-wrap">
              <LeHeading variant="h3" class="!my-px">
                <NuxtLink
                  :to="`/${isCompany ? 'firma' : 'klient'}/${data.commenterId}`"
                  class="hover:text-indigo-700 transition-colors duration-200"
                >
                  {{ data.name }}
                </NuxtLink>
              </LeHeading>

              <LeRateStarsAvg class="mb-4" :rateAvg="data.rate" />
            </div>

            <div class="text-gray-400 text-sm">
              {{ data.date }}
            </div>

            <div class="text-gray-400 text-sm">
              {{ data.status.value }}
            </div>
          </div>

          <LeParagraph class="!mb-0 max-h-[80px] overflow-y-auto">
            {{ data.description }}
          </LeParagraph>
        </Col>
      </Row>
    </Container>
  </LeBox>
</template>

<script setup lang="ts">
import CommentBox from "~/types/CommentBox";

const props = defineProps({
  data: {
    type: Object as PropType<CommentBox>,
    required: true,
  },
  isCompany: {
    type: Boolean,
    default: false,
  },
});
</script>
