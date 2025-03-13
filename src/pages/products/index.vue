<script setup>
// Composables
import useProducts from "@/pages/products/composables/product.js"
// Components
import ProductCard from "@/pages/products/ProductCard.vue"

const { products } = useProducts()
</script>

<template>
  <div class="flex gap-2">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
  <router-view />
</template>

<style scoped></style>
