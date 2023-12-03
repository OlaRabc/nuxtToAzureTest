<template>
  <input
    :type="props.type"
    :value="props.value"
    :name="props.name"
    :placeholder="props.placeholder"
    :pattern="props.pattern"
    :id="props.id"
    :disabled="props.disabled"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
type InputType = "text" | "password" | "number" | "email" | "tel";

const props = defineProps({
  type: {
    type: String as PropType<InputType>,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "input",
  },
  pattern: {
    type: String,
    required: false,
    default: null,
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

const handleInput = (event) => {
  emit("onChange", event.target.value);
};
</script>
