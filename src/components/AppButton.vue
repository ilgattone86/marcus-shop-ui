<script setup>
import { computed } from "vue"

const props = defineProps({
  text: { type: String, required: true },
  isLoading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "cancel", "warning", "danger"].includes(value),
  },
})

const buttonClasses = computed(() => {
  if (props.disabled) return "bg-gray-200 text-gray-700 cursor-not-allowed"

  const typeClasses = {
    primary: "cursor-pointer bg-sky-200 text-sky-700 hover:bg-sky-300 focus:ring-sky-400",
    cancel: "cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400",
    warning: "cursor-pointer bg-orange-200 text-orange-700 hover:bg-orange-300 focus:ring-orange-400",
    danger: "cursor-pointer bg-red-200 text-red-700 hover:bg-red-300 focus:ring-red-400",
  }

  return typeClasses[props.type]
})
</script>

<template>
  <button class="w-fit flex items-center px-3 py-1 text-sm rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2" :disabled="disabled" :class="buttonClasses">
    {{ text }}
    <v-icon v-if="isLoading" name="pr-spinner" class="ml-1 animate-spin" />
  </button>
</template>
