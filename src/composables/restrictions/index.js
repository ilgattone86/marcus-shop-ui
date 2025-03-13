// Libraries
import { computed } from "vue"
import { useMutation, useQuery } from "@vue/apollo-composable"
// Operations
import getRestrictionsOperation from "./operations/getRestrictions.js"
import createRestrictionOperation from "./operations/createRestriction.js"
import editRestrictionOperation from "./operations/editRestriction.js"
import deleteRestrictionOperation from "./operations/deleteRestriction.js"

export default function useRestrictions() {
  const { loading, error, result } = useQuery(getRestrictionsOperation, null, { fetchPolicy: "cache-first" })
  const { mutate: createRestriction } = useMutation(createRestrictionOperation, { update: addCreatedRestrictionToCache })
  const { mutate: editRestriction } = useMutation(editRestrictionOperation)
  const { mutate: deleteRestriction } = useMutation(deleteRestrictionOperation, { update: deleteRestrictionFromCache })

  const restrictions = computed(() => result.value?.restrictions || [])

  function addCreatedRestrictionToCache(cache, { data: { createRestriction } }) {
    let data = cache.readQuery({ query: getRestrictionsOperation })
    data = {
      ...data,
      restrictions: [...data.restrictions, { ...createRestriction }],
    }
    cache.writeQuery({ query: getRestrictionsOperation, data })
  }

  function deleteRestrictionFromCache(cache, { data: { deleteRestriction } }) {
    let data = cache.readQuery({ query: getRestrictionsOperation })
    data = {
      ...data,
      restrictions: data.restrictions.filter((r) => r.id !== deleteRestriction.id),
    }
    cache.writeQuery({ query: getRestrictionsOperation, data })
  }

  return {
    error,
    loading,
    restrictions,
    editRestriction,
    createRestriction,
    deleteRestriction,
  }
}
