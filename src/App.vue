<script setup>
// Components
import AppMenu from "@/components/AppMenu.vue"
import AppHeader from "@/components/AppHeader.vue"
</script>

<template>
  <div class="h-screen grid grid-rows-[auto_1fr] gap-1 p-4">
    <AppHeader class="row-span-1" />
    <div class="flex w-full h-full gap-2 overflow-hidden">
      <AppMenu />
      <div class="overflow-auto">
        <RouterView class="overflow-auto" />
      </div>
    </div>
  </div>
</template>
