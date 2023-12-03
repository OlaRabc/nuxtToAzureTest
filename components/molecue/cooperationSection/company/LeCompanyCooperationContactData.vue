<template>
  <div
    class="flex justify-center md:justify-between relative w-full md:max-w-[80%] lg:max-w-[60%] mr-0 ml-auto py-4 bg-white border rounded-l-2xl shadow-xl"
  >
    <div class="max-sm:hidden my-auto mx-4">
      <nuxt-img
        class="min-w-[70px} w-full h-auto border rounded-md"
        :src="
          imgPath(props.data?.name + props.data?.surname, props.data?.profile)
        "
        :alt="`Zdjęcie klienta ${props.data?.name}`"
        width="150"
        height="200"
      />
    </div>
    <div class="flex flex-col justify-around mx-4 md:mr-8">
      <div>
        <LeHeading variant="h5">
          <NuxtLink
            :to="`/klient/${props.data?.id}`"
            class="hover:text-indigo-800 transition-colors duration-400"
          >
            {{ props.data?.name }}
            {{ props.data?.surname }}
          </NuxtLink>
        </LeHeading>
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
import Customer from "~/types/Customer";
import imgPath from "assets/js/functions/imgPath";

const props = defineProps({
  data: {
    type: Object as PropType<Customer>,
    required: false,
  },
});
</script>
