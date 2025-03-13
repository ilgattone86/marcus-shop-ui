<script setup>
// Libraries
import { ref } from "vue"
import { cloneFnJSON } from "@vueuse/core"
// Composables
import usePriceRules from "@/composables/priceRules/index.js"
// Components
import AppButton from "@/components/AppButton.vue"
import AppDeleteModal from "@/components/AppDeleteModal.vue"
import ManagerTable from "@/pages/settings/ManagerTable.vue"
import ManagerTitle from "@/pages/settings/ManagerTitle.vue"
import ManagerWrapper from "@/pages/settings/ManagerWrapper.vue"
import UpsertModal from "./UpsertModal.vue"

const { priceRules, createPriceRule, deletePriceRule, editPriceRule } = usePriceRules()

const priceRuleToCreate = ref(null)
const priceRuleToEdit = ref(null)
const priceRuleToDelete = ref(null)

function onEdit(row) {
  priceRuleToEdit.value = cloneFnJSON(row)
}

function onDelete(row) {
  priceRuleToDelete.value = cloneFnJSON(row)
}

function onCreate() {
  priceRuleToCreate.value = {
    priceAdjustment: null,
    dependentOption: { id: "" },
    baseOption: { id: "" },
  }
}

function createEntity() {
  createPriceRule({
    dependentOption: priceRuleToCreate.value.dependentOption.id,
    blockedOption: priceRuleToCreate.value.blockedOption.id,
  }).then(() => (priceRuleToCreate.value = null))
}

function updateEntity() {
  editPriceRule({
    priceRule: priceRuleToEdit.value.id,
    dependentOption: priceRuleToEdit.value.dependenOption.id,
    blockedOption: priceRuleToEdit.value.blockedOption.id,
  }).then(() => (priceRuleToEdit.value = null))
}

function deleteEntity() {
  deletePriceRule({ priceRule: priceRuleToDelete.value.id }).then(() => (priceRuleToDelete.value = null))
}
</script>

<template>
  <ManagerWrapper>
    <ManagerTitle title="Price Rules" />
    <ManagerTable :rows="priceRules" @edit="onEdit" @delete="onDelete">
      <template #tableHeader>
        <th class="w-1/3">Option</th>
        <th class="w-1/3">Option</th>
        <th class="w-1/3">Price Adjustment</th>
      </template>
      <template #tableRow="{ row }">
        <td class="text-center">{{ row.baseOption.name }}</td>
        <td class="text-center">{{ row.dependentOption.name }}</td>
        <td class="text-center">{{ row.priceAdjustment }}</td>
      </template>
    </ManagerTable>
    <AppButton text="Add new price rule" class="ml-auto mr-2 mb-2" @click="onCreate" />
  </ManagerWrapper>
  <UpsertModal v-if="!!priceRuleToCreate" @close="priceRuleToCreate = null" v-model="priceRuleToCreate" @save="createEntity" />
  <UpsertModal v-if="!!priceRuleToEdit" @close="priceRuleToEdit = null" v-model="priceRuleToEdit" @save="updateEntity" />
  <AppDeleteModal :entity-name="priceRuleToDelete.name" v-if="!!priceRuleToDelete" @close="priceRuleToDelete = null" @delete="deleteEntity" />
</template>
