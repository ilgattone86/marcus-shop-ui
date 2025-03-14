<script setup>
// Components
import AppInfoContainer from "@/components/AppInfoContainer.vue"
</script>

<template>
  <RouterLink :to="{ name: 'settings' }" class="rounded-2xl w-[250px] h-[400px] bg-slate-50 border border-slate-200 hover:shadow-sm cursor-pointer transition-all duration-500 flex items-center justify-center">
    <AppInfoContainer class="mx-2" text="You have permissions to configure a category, product and its parts." />
  </RouterLink>
</template>
