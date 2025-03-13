// Libraries
import { useQuery, useMutation } from "@vue/apollo-composable"
import { computed } from "vue"
// Operations
import getCategoriesOperation from "./operations/getCategories.js"
import editCategoryOperation from "./operations/editCategory.js"
import deleteCategoryOperation from "./operations/deleteCategory.js"
import createCategoryOperation from "./operations/createCategory.js"

export default function useCategories() {
  const { loading, error, result } = useQuery(getCategoriesOperation, null, { fetchPolicy: "cache-first" })
  const { mutate: editCategory } = useMutation(editCategoryOperation)
  const { mutate: deleteCategory } = useMutation(deleteCategoryOperation)
  const { mutate: createCategory } = useMutation(createCategoryOperation, { update: addCreatedCategoryToCache })

  const categories = computed(() => result.value?.categories || [])

  function addCreatedCategoryToCache(cache, { data: { createCategory } }) {
    let data = cache.readQuery({ query: getCategoriesOperation })
    data = {
      ...data,
      categories: [...data.categories, { ...createCategory }],
    }
    cache.writeQuery({ query: getCategoriesOperation, data })
  }

  return {
    error,
    loading,
    categories,
    editCategory,
    createCategory,
    deleteCategory,
  }
}
