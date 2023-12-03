<template>
  <label :class="{ disabled: props.disabled }" class="w-max" :for="props.id">
    <input
      type="radio"
      :checked="props.checked"
      class="hidden"
      :value="props.value"
      :id="props.id"
      :disabled="props.disabled"
      :name="name ?? props.name"
    />
    <div class="radio" />
    <slot />
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "radio",
  },
  checked: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const name = inject("name");
</script>

<style scoped lang="scss">
.radio {
  display: inline-block;
  position: relative;
  margin-bottom: -4px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: theme("colors.white");
  border: 1px solid theme("colors.gray.300");

  &:after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: theme("colors.gray.300");
  }
}
.disabled {
  opacity: 0.5;
  pointer-events: none;
}

label {
  display: block;
  font-size: 24px;
  margin: 0 1rem;
  padding: 0.5rem 0;

  &:has(input:checked) {
    color: theme("colors.indigo.700");
  }
  &:active {
    input:checked ~ .radio {
      background-color: theme("colors.gray.400");
    }

    .radio {
      background-color: theme("colors.indigo.300");

      &:after {
        background-color: theme("colors.gray.200");
      }
    }
  }
}

input:checked ~ .radio {
  background-color: theme("colors.indigo.600");

  &:after {
    background-color: theme("colors.white");
  }
}
</style>
