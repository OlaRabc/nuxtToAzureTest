<template>
  <label :for="props.id" class="block text-xl">
    <div class="ml-3">
      {{ props.label }}
    </div>
    <LeBasicInput
      class="border rounded-xl py-2 pl-3 focus:outline-0 focus:border-indigo-800 focus:text-indigo-700 w-full"
      :type="props.type"
      :value="props.value"
      :name="props.name"
      :placeholder="props.placeholder"
      :id="props.id"
      :disabled="props.disabled"
      @onChange="handleInput"
    />
  </label>
</template>

<script setup lang="ts">
type InputType = "text" | "password" | "number" | "email" | "tel";

const props = defineProps({
  type: {
    type: String as PropType<InputType>,
    default: "text",
  },
  name: {
    type: String,
    default: "input",
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
