<script setup>
// Composables
import useUserPermissions from "@/composables/permissions/index.js"

const { hasPermissions } = useUserPermissions(["settings"])
const activeClasses = "rounded px-2 py-1 bg-sky-300/30 text-slate-500"
const commonClasses = "rounded px-2 py-1 text-slate-500 transition-colors duration-500 hover:bg-sky-300/30 hover:text-slate-500"
</script>

<template>
  <nav class="w-[300px] min-w-[300px] flex flex-col gap-2 p-4 border border-slate-100 rounded bg-sky-50 text-slate-500">
    <RouterLink to="/products" :class="commonClasses" :active-class="activeClasses">Products</RouterLink>
    <RouterLink to="/settings" :class="commonClasses" class="flex items-center justify-between" :active-class="activeClasses">
      <span>Settings</span>
      <v-icon :name="hasPermissions ? 'bi-unlock-fill' : 'bi-lock-fill'" class="ml-auto" />
    </RouterLink>
  </nav>
</template>
