<script setup>
defineProps({
  price: { type: Number, default: 0 },
  errors: { type: Array, default: [] },
  loading: { type: Boolean, default: false },
})
</script>

<template>
  <div v-if="errors.length" class="bg-red-100 border border-red-200 text-red-500 p-2 rounded-md">
    <div class="font-medium text-base">Configuration errors:</div>
    <ul class="text-xs mt-1">
      <li v-for="error in errors" :key="error" class="flex items-start">
        <v-icon name="io-warning" class="text-red-500" />
        <span class="ml-2">{{ error }}</span>
      </li>
    </ul>
  </div>
  <div v-else>
    <div class="bg-sky-100 border border-sky-500 p-2 rounded-md text-sm font-medium">
      <div class="flex items-center">
        <span class="mr-1">The price for this configuration is:</span>
        <v-icon v-if="loading" name="pr-spinner" class="w-4 animate-spin" />
        <span v-else>{{ price }}</span>
      </div>
    </div>
  </div>
</template>
