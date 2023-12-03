<template>
  <label :for="props.id" class="block text-xl">
    {{ props.label }}
    <textarea
      class="py-3 px-8 border focus:border-indigo-500 rounded-xl focus:text-indigo-500 focus:outline-0 w-full"
      :placeholder="props.placeholder"
      :name="props.name"
      :id="props.id"
      :rows="props.rows"
      :disabled="props.disabled"
      @input="handleTextarea"
      :value="props.value"
    />
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "textarea",
  },
  value: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  rows: {
    type: Number,
    required: false,
    default: 2,
  },
});

const emit = defineEmits(["onChange"]);

const handleTextarea = (event) => {
  emit("onChange", event.target.value);
};
</script>

<style scoped lang="scss">
textarea {
  resize: none;
}
</style>
