<script setup>
// Libraries
import { computed, ref, watch } from "vue"
import { cloneFnJSON } from "@vueuse/core"
import { useRoute, useRouter } from "vue-router"
import { useLazyQuery, useQuery } from "@vue/apollo-composable"
// Components
import AppModal from "@/components/AppModal.vue"
import AppButton from "@/components/AppButton.vue"
import AppDropdown from "@/components/AppDropdown.vue"
import NewProductPriceValidation from "./NewProductPriceValidation.vue"
// Operations
import getProductOperation from "./operations/product.js"
import validateProductOperation from "./operations/validateProducts.js"

const route = useRoute()
const router = useRouter()
const productId = route.params.id
const commonOptions = { fetchPolicy: "no-cache" }

const { loading: loadingProduct, result } = useQuery(getProductOperation, { product: productId }, commonOptions)
const product = computed(() => cloneFnJSON(result.value.product) || {})

const { load, refetch: computePriceValidation, result: priceValidationResult, loading } = useLazyQuery(validateProductOperation, null, commonOptions)

const newProduct = ref({ options: [] })
const configurationErrors = computed(() => priceValidationResult?.value?.newProductPriceValidation.errors || [])
const configurationPrice = computed(() => priceValidationResult?.value?.newProductPriceValidation.price || 0)

watch(newProduct, fetchPrice, { deep: true })

function buyProduct() {
  // Include here the mutation to buy the configured product
}

function fetchPrice() {
  const optionsIds = Object.values(newProduct.value.options)
  load(null, { options: optionsIds }) || computePriceValidation({ options: optionsIds })
}

function formatPartOptions(partOptions) {
  return partOptions.map((option) => ({
    value: option.id,
    label: option.name,
    disabled: !option.stock,
  }))
}
</script>

<template>
  <AppModal @close="router.push({ name: 'products' })" v-if="!loadingProduct">
    <div class="flex flex-col w-sm gap-4">
      <NewProductPriceValidation :errors="configurationErrors" :price="configurationPrice" :loading="loading" />
      <div class="flex flex-between w-full text-sm items-center gap-2" v-for="(part, index) in product.parts" :key="part.id">
        <span class="flex-grow text-right font-medium">{{ part.name }}</span>
        <AppDropdown v-model="newProduct.options[index]" :placeholder="`Select ${part.name}`" :options="formatPartOptions(part.partOptions)">
          <template #disabledText>
            <span class="text-orange-300 ml-auto">Out of stock</span>
          </template>
        </AppDropdown>
      </div>
      <div class="ml-auto">
        <AppButton text="Add to cart" @click="buyProduct" :disabled="!!configurationErrors.length" />
      </div>
    </div>
  </AppModal>
</template>
