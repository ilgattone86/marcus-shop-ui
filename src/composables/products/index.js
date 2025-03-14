// Libraries
import { computed } from "vue"
import { useMutation, useQuery } from "@vue/apollo-composable"
// Operations
import editProductOperation from "./operations/editProduct.js"
import createProductOperation from "./operations/createProduct.js"
import deleteProductOperation from "./operations/deleteProduct.js"
import getProductsOperations from "./operations/getProducts.js"

export default function useProducts() {
  const { loading, error, result } = useQuery(getProductsOperations, null, { fetchPolicy: "cache-first" })
  const { mutate: editProduct } = useMutation(editProductOperation)
  const { mutate: createProduct } = useMutation(createProductOperation, { update: addCreatedProductToCache })
  const { mutate: deleteProduct } = useMutation(deleteProductOperation, { update: removeProductFromCache })

  const products = computed(() => result.value?.products || [])

  function addCreatedProductToCache(cache, { data: { createProduct } }) {
    let data = cache.readQuery({ query: getProductsOperations })
    data = {
      ...data,
      products: [...data.products, { ...createProduct }],
    }
    cache.writeQuery({ query: getProductsOperations, data })
  }

  function removeProductFromCache(cache, { data: { deleteProduct } }) {
    let data = cache.readQuery({ query: getProductsOperations })
    data = {
      ...data,
      products: data.products.filter((product) => product.id !== deleteProduct.id),
    }
    cache.writeQuery({ query: getProductsOperations, data })
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
