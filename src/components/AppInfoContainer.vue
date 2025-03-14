<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="rounded bg-sky-100/50 border border-sky-500 text-sm text-sky-600 p-4">
    {{ text }}
  </div>
</template>
