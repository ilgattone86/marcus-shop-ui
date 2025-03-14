<script setup>
import PartManager from "@/pages/settings/partManager/index.vue"
import AppPermissionModal from "@/components/AppPermissionModal.vue"
import ProductManager from "@/pages/settings/productManager/index.vue"
import CategoryManager from "@/pages/settings/categoryManager/index.vue"
import PriceRuleManager from "@/pages/settings/priceRuleManager/index.vue"
import PartOptionManager from "@/pages/settings/partOptionManager/index.vue"
import RestrictionManager from "@/pages/settings/restrictionManager/index.vue"
</script>

<template>
  <AppPermissionModal :permissions-to-check="['settings']">
    <div class="flex flex-wrap gap-2">
      <CategoryManager />
      <ProductManager />
      <PartManager />
      <PartOptionManager />
      <PriceRuleManager />
      <RestrictionManager />
    </div>
  </AppPermissionModal>
</template>
