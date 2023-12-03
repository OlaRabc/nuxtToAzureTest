<template>
  <label :class="{ disabled: props.disabled }" :for="props.id">
    <input
      type="checkbox"
      :checked="props.checked"
      class="hidden"
      :value="props.value"
      :id="props.id"
      :disabled="props.disabled"
    />
    <div class="checkmark">
      <font-awesome-icon icon="check" class="icon" />
    </div>
    <slot />
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    default: "",
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
</script>

<style scoped lang="scss">
.checkmark {
  display: inline-block;
  position: relative;
  margin-right: 8px;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  background-color: theme("colors.gray.300");
}
.icon {
  color: theme("colors.white");
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translate(50%, 50%);
  opacity: 0;
  font-size: 0.875rem;
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

  & input:checked + .checkmark {
    color: theme("colors.indigo.700");
  }

  &:active {
    input:checked ~ .checkmark {
      background-color: theme("colors.gray.400");
      .icon {
        opacity: 0.7;
      }
    }

    .checkmark {
      background-color: theme("colors.indigo.300");
    }

    .checkmark .icon {
      opacity: 0.8;
    }
  }
}

input:checked ~ .checkmark {
  background-color: theme("colors.indigo.600");
  .icon {
    opacity: 1;
  }
}
</style>
