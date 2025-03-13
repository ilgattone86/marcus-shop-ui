//  Libraries
import { useQuery } from "@vue/apollo-composable"
import { computed } from "vue"
// Operations
import getPartsOperation from "@/pages/products/operations/getParts.js"

export default function useParts(productId) {
  const { loading, error, result } = useQuery(getPartsOperation, {
    productId,
  })

  const parts = computed(() => result.value?.parts || [])

  return {
    loading,
    error,
    parts,
  }
}
