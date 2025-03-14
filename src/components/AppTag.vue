<script setup>
// Libraries
import { computed } from "vue"

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "info",
    validator(value) {
      return ["info", "primary"].includes(value)
    },
  },
})

const classes = computed(() => ({
  "bg-sky-100 border border-sky-200 text-sky-600": props.type === "info",
  "bg-sky-200 border border-sky-400 text-sky-800": props.type === "primary",
}))
</script>

<template>
  <div class="rounded-lg w-fit px-2 text-sm" :class="classes">{{ props.text }}</div>
</template>
