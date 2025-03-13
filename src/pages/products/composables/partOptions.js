//  Libraries
import { computed } from "vue"
import { useQuery } from "@vue/apollo-composable"
// Operations
import getPartOptionsOperation from "@/pages/products/operations/getPartOptions.js"

export default function usePartOptions(productId) {
  const { loading, error, result } = useQuery(getPartOptionsOperation, {
    productId,
  })

  const partOptions = computed(() => result.value?.partOptions || [])
  const partOptionsGroupedByPart = computed(() => {
    if (!partOptions.value) return {}

    return partOptions.value.reduce((acc, partOption) => {
      const partId = partOption.part.id
      if (!acc[partId]) acc[partId] = []

      acc[partId].push(partOption)

      return acc
    }, {})
  })

  return {
    error,
    loading,
    partOptions,
    partOptionsGroupedByPart,
  }
}
