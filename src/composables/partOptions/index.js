// Libraries
import { useMutation, useQuery } from "@vue/apollo-composable"
import { computed } from "vue"
// Operations
import getPartOptionsOperation from "./operations/getPartOptions.js"
import createPartOptionOperation from "./operations/createPartOption.js"
import editPartOptionOperation from "./operations/editPartOption.js"
import deletePartOptionOperation from "./operations/deletePartOption.js"

export default function usePartOptions() {
  const { loading, error, result } = useQuery(getPartOptionsOperation, null, { fetchPolicy: "cache-first" })
  const { mutate: createPartOption } = useMutation(createPartOptionOperation, { update: addCreatedPartOptionToCache })
  const { mutate: editPartOption } = useMutation(editPartOptionOperation)
  const { mutate: deletePartOption } = useMutation(deletePartOptionOperation, { update: deletePartOptionFromCache })

  const partOptions = computed(() => result.value?.partOptions || [])

  function addCreatedPartOptionToCache(cache, { data: { createPartOption } }) {
    let data = cache.readQuery({ query: getPartOptionsOperation })
    data = {
      ...data,
      partOptions: [...data.partOptions, { ...createPartOption }],
    }
    cache.writeQuery({ query: getPartOptionsOperation, data })
  }

  function deletePartOptionFromCache(cache, { data: { deletePartOption } }) {
    let data = cache.readQuery({ query: getPartOptionsOperation })
    data = {
      ...data,
      partOptions: data.partOptions.filter((part) => part.id !== deletePartOption.id),
    }
    cache.writeQuery({ query: getPartOptionsOperation, data })
  }

  return {
    partOptions,
    error,
    loading,
    editPartOption,
    createPartOption,
    deletePartOption,
  }
}
