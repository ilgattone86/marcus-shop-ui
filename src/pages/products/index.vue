<script setup>
// Composables
import useProducts from "@/composables/products/index.js"
import useUserPermissions from "@/composables/permissions/index.js"
// Components
import ProductCard from "@/pages/products/ProductCard.vue"
import CreateProductCard from "@/pages/products/CreateProductCard.vue"

const { products: allProducts } = useProducts()
const { hasPermissions } = useUserPermissions(["settings"])
</script>

<template>
  <div class="flex gap-2">
    <ProductCard v-for="product in allProducts" :key="product.id" :product="product" />
    <CreateProductCard v-if="hasPermissions" />
  </div>
  <router-view />
</template>
