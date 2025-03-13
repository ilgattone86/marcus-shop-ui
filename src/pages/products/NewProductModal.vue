<script setup>
// Components
import AppModal from "@/components/AppModal.vue"
import AppDropdown from "@/components/AppDropdown.vue"
import { computed, ref, watch } from "vue"
// Composables
import useParts from "@/pages/products/composables/parts.js"
// Libraries
import { useRoute, useRouter } from "vue-router"
import usePartOptions from "@/pages/products/composables/partOptions.js"
import AppButton from "@/components/AppButton.vue"
import { useLazyQuery } from "@vue/apollo-composable"
import validateProduct from "@/pages/products/operations/validateProducts.js"
import NewProductPriceValidation from "@/pages/products/NewProductPriceValidation.vue"

const route = useRoute()
const router = useRouter()
const productId = route.params.id

const { parts } = useParts(productId)
const { partOptionsGroupedByPart } = usePartOptions(productId)

const { load, refetch: computePriceValidation, result: priceValidationResult, loading } = useLazyQuery(validateProduct, null)

const newProduct = ref({ options: [] })
const configurationErrors = computed(() => priceValidationResult?.value?.newProductPriceValidation.errors || [])
const configurationPrice = computed(() => priceValidationResult?.value?.newProductPriceValidation.price || 0)

function getOptionsFromPart(partId) {
  console.log(partOptionsGroupedByPart.value)
  if (!partOptionsGroupedByPart.value[partId]) return []

  return partOptionsGroupedByPart.value[partId]?.map((option) => ({
    label: option.name,
    value: option.id,
  }))
}

watch(newProduct, fetchPrice, { deep: true })

function buyProduct() {
  console.log(newProduct.value)
}

function fetchPrice() {
  const optionsIds = newProduct.value.options
  load(null, { options: optionsIds }) || computePriceValidation({ options: optionsIds })
}

console.log()
</script>

<template>
  <AppModal @close="router.push({ name: 'products' })">
    <div class="flex flex-col w-sm gap-4">
      <NewProductPriceValidation :errors="configurationErrors" :price="configurationPrice" :loading="loading" />
      <div class="flex flex-between w-full text-sm items-center gap-2" v-for="(part, index) in parts" :key="part.id">
        <span class="flex-grow text-right font-medium">{{ part.name }}</span>
        <AppDropdown v-model="newProduct.options[index]" :placeholder="`Select ${part.name}`" :options="getOptionsFromPart(part.id)" />
      </div>
      <div class="ml-auto">
        <AppButton text="Add to cart" @click="buyProduct" :disabled="!!configurationErrors.length" />
      </div>
    </div>
  </AppModal>
</template>

<style scoped></style>
