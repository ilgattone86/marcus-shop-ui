// Libraries
import { useMutation, useQuery } from "@vue/apollo-composable"
import { computed } from "vue"
// Operations
import editProductOperation from "./operations/editProduct.js"
import createProductOperation from "./operations/createProduct.js"
import deleteProductOperation from "./operations/deleteProduct.js"
import getAllProductsOperations from "./operations/getAllProducts.js"

export default function useAllProducts() {
  const { loading, error, result } = useQuery(getAllProductsOperations, null, { fetchPolicy: "cache-first" })
  const { mutate: editProduct } = useMutation(editProductOperation)
  const { mutate: createProduct } = useMutation(createProductOperation, { update: addCreatedProductToCache })
  const { mutate: deleteProduct } = useMutation(deleteProductOperation, { update: removeProductFromCache })

  const products = computed(() => result.value?.allProducts || [])

  function addCreatedProductToCache(cache, { data: { createProduct } }) {
    let data = cache.readQuery({ query: getAllProductsOperations })
    data = {
      ...data,
      allProducts: [...data.allProducts, { ...createProduct }],
    }
    cache.writeQuery({ query: getAllProductsOperations, data })
  }

  function removeProductFromCache(cache, { data: { deleteProduct } }) {
    let data = cache.readQuery({ query: getAllProductsOperations })
    data = {
      ...data,
      allProducts: data.allProducts.filter((product) => product.id !== deleteProduct.id),
    }
    cache.writeQuery({ query: getAllProductsOperations, data })
  }

  return {
    error,
    loading,
    products,
    editProduct,
    deleteProduct,
    createProduct,
  }
}
