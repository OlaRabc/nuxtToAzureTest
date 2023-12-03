<template>
  <div
    class="flex justify-center md:justify-between relative w-full md:max-w-[80%] lg:max-w-[60%] mr-0 ml-auto py-4 bg-white border rounded-l-2xl shadow-xl"
  >
    <div class="max-sm:hidden my-auto mx-4">
      <nuxt-img
        class="min-w-[70px] w-full h-auto border rounded-md"
        :src="imgPath(props.data?.name, props.data?.profile)"
        :alt="`Zdjęcie firmy ${props.data?.name}`"
        width="150"
        height="200"
      />
    </div>

    <div class="flex flex-col justify-around mx-4 md:mr-8">
      <div>
        <LeHeading variant="h5">
          <NuxtLink
            :to="`/firma/${props.data?.id}`"
            class="hover:text-indigo-800 transition-colors duration-400"
          >
            {{ props.data?.name }}
          </NuxtLink>
        </LeHeading>
      </div>

      <div class="flex mb-4">
        <client-only>
          <div>
            <font-awesome-icon
              :icon="['fas', 'location-dot']"
              class="mr-2 text-2xl"
            />
          </div>
        </client-only>
        Gorzów Wielkopolski, Armi krajowe 23/21 A, Lubuskie
      </div>
      <div>
        <div class="mb-4 whitespace-nowrap">
          <client-only>
            <font-awesome-icon
              icon="fa-solid fa-envelope"
              class="mr-2 text-2xl"
            />
          </client-only>
          {{ props.data?.mail }}
        </div>

        <div class="mb-4 whitespace-nowrap">
          <client-only>
            <font-awesome-icon :icon="['fas', 'phone']" class="mr-2 text-2xl" />
          </client-only>
          {{ props.data?.phone }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Company from "~/types/Company";
import imgPath from "assets/js/functions/imgPath";

const props = defineProps({
  data: {
    type: Object as PropType<Company>,
    required: false,
  },
});
</script>
