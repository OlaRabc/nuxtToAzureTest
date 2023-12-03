<template>
  <label
    :class="[{ active: props.checked }]"
    :for="props.id"
    @click="$emit('onChange')"
  >
    <Transition>
      <div v-if="props.checked" class="left">
        {{ props.checkLabel }}
      </div>

      <div v-else class="right">
        {{ props.uncheckLabel }}
      </div>
    </Transition>

    <input
      type="checkbox"
      :id="props.id"
      :name="props.name"
      :checked="props.checked"
      :value="props.checked"
      :disabled="props.disabled"
      class="hidden"
    />
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
    default: "checkbox",
  },
  checked: {
    type: Boolean,
    required: false,
    default: false,
  },
  id: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  checkLabel: {
    type: String,
    required: false,
    default: "",
  },
  uncheckLabel: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<style scoped lang="scss">
label {
  display: inline-block;
  position: relative;
  min-width: 70px;
  height: 30px;
  border-radius: 50px;
  margin: 5px;
  padding: 2px 4px;
  background-color: theme("colors.indigo.600");
  color: theme("colors.white");
  -webkit-box-shadow: inset 6px 6px 7px 0px theme("colors.indigo.800");
  -moz-box-shadow: inset 6px 6px 7px 0px theme("colors.indigo.800");
  box-shadow: inset 6px 6px 7px 0px theme("colors.indigo.800");
  cursor: pointer;

  &::after {
    content: " ";
    width: 20px;
    height: 20px;
    position: absolute;
    background-color: theme("colors.white");
    border-radius: 100%;
    top: 50%;
    transform: translate(0%, -50%);
    left: 8px;
    -webkit-box-shadow: 2px 2px 3px 0px theme("colors.indigo.800");
    -moz-box-shadow: 2px 2px 3px 0px theme("colors.indigo.800");
    box-shadow: 2px 2px 3px 0px theme("colors.indigo.800");

    transition: all 0.5s ease-in-out;
  }
}
.active {
  &::after {
    left: 92%;
    transform: translate(-100%, -50%);
  }
}
div {
  user-select: none;
  position: absolute;
  top: 50%;
}
.left {
  transform: translate(0%, -50%);
  left: 8px;
}
.right {
  transform: translate(-100%, -50%);
  left: 90%;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
