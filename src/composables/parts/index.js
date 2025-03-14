// Libraries
import { useMutation, useQuery } from "@vue/apollo-composable"
import { computed } from "vue"
// Operations
import getPartsOperation from "./operations/getParts.js"
import createPartOperation from "./operations/createPart.js"
import editPartOperation from "./operations/editPart.js"
import deletePartOperation from "./operations/deletePart.js"

export default function useParts(productId) {
  const { loading, error, result } = useQuery(getPartsOperation, { productId })
  const { mutate: createPart } = useMutation(createPartOperation, { update: addCreatedPartToCache })
  const { mutate: editPart } = useMutation(editPartOperation)
  const { mutate: deletePart } = useMutation(deletePartOperation, { update: deletePartFromCache })

  const parts = computed(() => result.value?.parts || [])

  function addCreatedPartToCache(cache, { data: { createPart } }) {
    let data = cache.readQuery({ query: getPartsOperation })
    data = {
      ...data,
      parts: [...data.parts, { ...createPart }],
    }
    cache.writeQuery({ query: getPartsOperation, data })
  }

  function deletePartFromCache(cache, { data: { deletePart } }) {
    let data = cache.readQuery({ query: getPartsOperation })
    data = {
      ...data,
      parts: data.parts.filter((part) => part.id !== deletePart.id),
    }
    cache.writeQuery({ query: getPartsOperation, data })
  }

  return {
    parts,
    error,
    loading,
    editPart,
    createPart,
    deletePart,
  }
}
