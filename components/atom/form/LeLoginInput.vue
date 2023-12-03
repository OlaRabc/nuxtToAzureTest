<template>
  <label :for="props.id">
    {{ props.label }}
    <LeBasicInput
      :type="props.type"
      class="w-full h-full mb-8 py-1 pl-4 border-b border-black focus:border-indigo-500 focus:text-indigo-500 focus:outline-0"
      :value="props.value"
      :placeholder="props.placeholder"
      :id="props.id"
      :disabled="props.disabled"
      @onChange="handleInput"
    />
  </label>
</template>

<script setup lang="ts">
type InputType = "text" | "password" | "email";

const props = defineProps({
  type: {
    type: String as PropType<InputType>,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  id: {
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
});

const emit = defineEmits(["onChange"]);

const handleInput = (val: String) => {
  emit("onChange", val);
};
</script>
