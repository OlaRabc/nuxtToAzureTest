<template>
  <div class="relative w-[260px] overflow-hidden">
    <div
      id="carousel-item"
      class="flex flex-nowrap relative top-0 left-0 w-max mb-2 transition-all"
    >
      <div class="mr-16">
        <nuxt-img
          class="w-[250px] h-[300px] border rounded-3xl"
          :src="imgPath(props.companyName, props.profile)"
          :alt="`Zdjęcie profilowe ${props.companyName}`"
          width="250"
          height="300"
        />
      </div>

      <div v-for="item in galleryList" :key="item" class="mr-16">
        <nuxt-img
          class="w-[250px] h-[300px] rounded-3xl border"
          :src="imgPath(props.companyName, item)"
          :alt="`Zdjęcie z galerii ${props.companyName}`"
          width="250"
          height="300"
        />
      </div>
    </div>

    <div class="flex justify-around p-2">
      <button
        v-if="galleryList.length > 0"
        v-for="n in galleryList.length + 1"
        :key="n"
        class="w-[20px] h-[20px] rounded-full shadow-[3px_2px_12px_-4px_rgba(14,16,35,0.8)]"
        :class="[
          n === actualImg
            ? 'bg-indigo-700'
            : 'bg-gray-400 hover:bg-indigo-400 focus:bg-indigo-500',
        ]"
        @click="moveCarouselOnBtn(n)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import imgPath from "assets/js/functions/imgPath";

const props = defineProps({
  profile: {
    type: String,
    required: false,
  },
  gallery: {
    required: false,
  },
  companyName: {
    type: String,
    required: true,
  },
});

const galleryList = props.gallery
  ? props.gallery.replace(/\s/g, "").split(",")
  : [];

const actualImg = ref(1);
const leftOffset = ref(0);
const moveCarouselOnBtn = (index: number) => {
  actualImg.value = index;
  leftOffset.value = (index - 1) * 314 * -1;
};
</script>

<style scoped>
#carousel-item {
  left: v-bind(leftOffset + "px");
}
</style>
