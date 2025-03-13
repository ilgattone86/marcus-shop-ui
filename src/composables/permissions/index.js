//  Libraries
import { useLazyQuery, useQuery } from "@vue/apollo-composable"
import { computed, ref } from "vue"
// Operations
import getUserPermissionsOperation from "@/composables/permissions/operations/getUserPermissions.js"

const permissions = ref({})

export default function useUserPermissions(permissionsToCheck) {
  const { onResult, load, refetch, loading, error, result } = useLazyQuery(getUserPermissionsOperation, null, { fetchPolicy: "cache-first" })
  const hasLoaded = ref(false)

  const hasPermissions = computed(() => {
    if (loading.value) return false

    return permissionsToCheck.every((p) => permissions.value[p])
  })

  function loadPermissionsFor(email) {
    hasLoaded.value = false
    const variables = { email, permissions: permissionsToCheck }

    load(null, variables) || refetch(variables)
  }

  onResult((queryResult) => {
    if (loading.value) return

    const permissionsAsObject = permissionsToCheck.reduce((acc, p) => {
      acc[p] = false
      return acc
    }, {})

    const newPermissions = queryResult.data.userPermissions.reduce((acc, p) => {
      acc[p.name] = true
      return acc
    }, permissionsAsObject)

    permissions.value = { ...permissions.value, ...newPermissions }
    hasLoaded.value = true
  })

  return {
    error,
    loading,
    hasLoaded,
    permissions,
    hasPermissions,
    loadPermissionsFor,
  }
}
