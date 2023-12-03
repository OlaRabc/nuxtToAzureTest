<template>
  <div
    class="relative m-8 bg-white rounded-xl shadow-[1px_15px_10px_-5px_rgba(14,16,35,0.3)]"
    :aria-labelledby="`${props.id}-label`"
  >
    <label class="absolute -top-8 left-4 text-3xl font-bold whitespace-nowrap">
      <slot />
    </label>

    <button
      class="ellipsis-1 h-[60px] w-full text-left rounded-xl px-4 py-2 text-2xl leading-[50px] cursor-pointer"
      :class="{ active: isOpen }"
      @click="isOpen = !isOpen"
    >
      {{ selected.value }}

      <client-only>
        <font-awesome-icon
          :icon="isOpen ? 'caret-up' : 'caret-down'"
          size="xl"
          class="absolute right-4 top-2"
        />
      </client-only>
    </button>

    <div
      class="absolute left-0 w-full max-h-[300px] px-2 bg-white text-2xl rounded-b-lg shadow-[10px_15px_10px_-5px_rgba(14,16,35,0.3)] overflow-y-auto overflow-x-hidden z-[90]"
      :class="{ hidden: !isOpen }"
    >
      <LeBasicInput
        v-if="search"
        class="w-full h-full py-3 !pl-2 focus:border focus:border-indigo-500 text-gray-400 !rounded-none border-b focus:border-0 focus:border-b focus:outline-0"
        placeholder="Czego szukasz?"
        @onChange="changeValue"
      />

      <div
        v-for="option of searchedList"
        :key="option.value"
        tabindex="0"
        class="py-2 px-2 hover:bg-gray-50 border-b last:border-0 cursor-pointer"
        @click="selectOption(option)"
        @keyup.enter="selectOption(option)"
        @keyup.space="selectOption(option)"
      >
        {{ option.value }}
      </div>

      <div v-if="searchedList?.length === 0" class="py-2 px-2">
        Nie znaleziono pasującego elementu
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  default: {
    required: false,
    default: " ",
  },
  search: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const selected = ref(props.default ?? null);
const emit = defineEmits(["onChange"]);
const isOpen = ref(false);

const selectOption = (option: any) => {
  selected.value = option;
  isOpen.value = false;
  emit("onChange", selected.value);
};

const searchedList = ref(props.options);
const changeValue = (val: string) => {
  const searchLowerCase = val.toLowerCase();
  searchedList.value = props.options.filter((option) => {
    return option.value.toLowerCase().includes(searchLowerCase);
  });
};
</script>

<style scoped lang="scss">
.active {
  @apply bg-gray-50 rounded-b-none;
}
</style>
