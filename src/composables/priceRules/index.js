// Libraries
import { useMutation, useQuery } from "@vue/apollo-composable"
import { computed } from "vue"
// Operations
import getPriceRulesOperation from "./operations/getPriceRules.js"
import createPriceRuleOperation from "./operations/createPriceRule.js"
import editPriceRuleOperation from "./operations/editPriceRule.js"
import deletePriceRuleOperation from "./operations/deletePriceRule.js"

export default function usePriceRules() {
  const { loading, error, result } = useQuery(getPriceRulesOperation, null, { fetchPolicy: "cache-first" })
  const { mutate: createPriceRule } = useMutation(createPriceRuleOperation, { update: addCreatedPriceRuleToCache })
  const { mutate: editPriceRule } = useMutation(editPriceRuleOperation)
  const { mutate: deletePriceRule } = useMutation(deletePriceRuleOperation, { update: deletePriceRuleFromCache })

  const priceRules = computed(() => result.value?.priceRules || [])

  function addCreatedPriceRuleToCache(cache, { data: { createPriceRule } }) {
    let data = cache.readQuery({ query: getPriceRulesOperation })
    data = {
      ...data,
      priceRules: [...data.priceRules, { ...createPriceRule }],
    }
    cache.writeQuery({ query: getPriceRulesOperation, data })
  }

  function deletePriceRuleFromCache(cache, { data: { deletePriceRule } }) {
    let data = cache.readQuery({ query: getPriceRulesOperation })
    data = {
      ...data,
      priceRules: data.priceRules.filter((part) => part.id !== deletePriceRule.id),
    }
    cache.writeQuery({ query: getPriceRulesOperation, data })
  }

  return {
    error,
    loading,
    priceRules,
    editPriceRule,
    createPriceRule,
    deletePriceRule,
  }
}
