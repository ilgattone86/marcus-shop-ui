<script setup>
import AppHeader from "@/components/AppHeader.vue"
import AppMenu from "@/components/AppMenu.vue"
</script>

<template>
  <div class="h-screen grid grid-rows-[auto_1fr] gap-1 p-4 overflow-auto">
    <!-- Header -->
    <AppHeader class="row-span-1" />

    <!-- Main Content: Sidebar + Content -->
    <div class="flex w-full h-full gap-2">
      <!-- Left Menu -->
      <AppMenu />
      <!-- The main page Content -->
      <RouterView />
    </div>
  </div>
</template>
