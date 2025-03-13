<script setup>
defineProps({ title: { type: String, required: true } })
</script>

<template>
  <div class="p-2 bg-sky-50 text-center">{{ title }}</div>
</template>
