<template>
  <div
    class="border max-w-max"
    :class="{ 'opacity-50 pointer-events-none': props.disabled }"
  >
    <label
      class="border rounded bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 inline-block relative cursor-pointer"
    >
      {{ props.label }}

      <input
        type="file"
        :id="props.id"
        :name="props.name"
        :accept="acceptFile"
        class="opacity-0 absolute top-0 left-0 cursor-pointer"
        @change="handleFileChange"
      />
    </label>
    <div v-if="isError" class="text-red-600 font-bold">
      Niepoprawne rozszerzenie pliku
    </div>
    <div
      v-else-if="selectedFile"
      class="!max-w-[150px] mx-auto overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {{ selectedFile.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    default: "file",
  },
  id: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "Wybierz plik",
  },
  acceptableFileTypes: {
    type: Array<String>,
    default: [],
  },
});

const acceptFile = computed(() => {
  const acceptableTypes = props.acceptableFileTypes.map((el) => "." + el);
  return acceptableTypes.join(", ");
});

const selectedFile = ref(null);
const acceptableFileTypes = 12;
const isError = ref(false);

const resetValues = (): void => {
  selectedFile.value = null;
  isError.value = false;
};
const getFileType = (fileName: String): String => {
  const fileParts = fileName.split(".");
  return fileParts[fileParts.length - 1];
};
const checkIfFileTypesIsCorrect = (fileType: string): Boolean => {
  return props.acceptableFileTypes?.length < 1
    ? true
    : props.acceptableFileTypes.indexOf(fileType) === -1
    ? false
    : true;
};

const handleFileChange = (event) => {
  resetValues();
  const fileType = getFileType(event.target.files[0].name);
  if (checkIfFileTypesIsCorrect(fileType)) {
    selectedFile.value = event.target.files[0];
  } else {
    isError.value = true;
  }
};
</script>
