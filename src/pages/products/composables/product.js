import { useQuery } from '@vue/apollo-composable';
import getProductsOperation from "@/pages/products/operations/getProducts.js"
import { computed } from "vue"

export default function useProducts() {
  const { loading, error, result } = useQuery(getProductsOperation)
  const products = computed(() => result.value?.products?.edges?.map(({ node }) => node) || [])

  return {
    loading,
    error,
    products
  };
}
