<template>
  <div class="w-max m-2">
    <button class="bg-indigo-600 text-white rounded-xl px-6 py-4 shadow-xl">
      <font-awesome-icon icon="sliders" class="text-3xl" />
    </button>
    <div class="bg-white shadow-2xl">
      <LeRadioWrapper name="filter" class="flex flex-wrap">
        <LeRadio :checked="false">Rosnąco </LeRadio>
        <LeRadio>Malejąco </LeRadio>
      </LeRadioWrapper>
      <LeRadioWrapper name="xx" class="flex flex-wrap">
        <LeRadio :checked="false">Rosnąco </LeRadio>
        <LeRadio>Malejąco </LeRadio>
      </LeRadioWrapper>
    </div>
  </div>
</template>

<style scoped>
.bg-white {
  position: absolute;
  margin-top: 5px;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  z-index: 100;
}
</style>
