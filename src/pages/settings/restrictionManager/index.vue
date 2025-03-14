<script setup>
// Libraries
import { ref } from "vue"
import { cloneFnJSON } from "@vueuse/core"
// Composables
import useRestrictions from "@/composables/restrictions/index.js"
// Components
import UpsertModal from "./UpsertModal.vue"
import AppButton from "@/components/AppButton.vue"
import AppDeleteModal from "@/components/AppDeleteModal.vue"
import ManagerTable from "@/pages/settings/ManagerTable.vue"
import ManagerTitle from "@/pages/settings/ManagerTitle.vue"
import ManagerWrapper from "@/pages/settings/ManagerWrapper.vue"

const { restrictions, createRestriction, deleteRestriction, editRestriction } = useRestrictions()

const restrictionToCreate = ref(null)
const restrictionToEdit = ref(null)
const restrictionToDelete = ref(null)

function onEdit(row) {
  restrictionToEdit.value = cloneFnJSON(row)
}

function onDelete(row) {
  restrictionToDelete.value = cloneFnJSON(row)
}

function onCreate() {
  restrictionToCreate.value = {
    dependentOption: { id: "" },
    blockedOption: { id: "" },
  }
}

function createEntity() {
  createRestriction({
    dependentOption: restrictionToCreate.value.dependentOption.id,
    blockedOption: restrictionToCreate.value.blockedOption.id,
  }).then(() => (restrictionToCreate.value = null))
}

function updateEntity() {
  editRestriction({
    restriction: restrictionToEdit.value.id,
    dependentOption: restrictionToEdit.value.dependentOption.id,
    blockedOption: restrictionToEdit.value.blockedOption.id,
  }).then(() => (restrictionToEdit.value = null))
}

function deleteEntity() {
  deleteRestriction({ restriction: restrictionToDelete.value.id }).then(() => (restrictionToDelete.value = null))
}
</script>

<template>
  <ManagerWrapper>
    <ManagerTitle title="Restrictions" />
    <ManagerTable :rows="restrictions" @edit="onEdit" @delete="onDelete">
      <template #tableHeader>
        <th class="w-1/2">Dependent option</th>
        <th class="w-1/2">Blocked option</th>
      </template>
      <template #tableRow="{ row }">
        <td class="text-center">{{ row.dependentOption.name }}</td>
        <td class="text-center">{{ row.blockedOption.name }}</td>
      </template>
    </ManagerTable>
    <AppButton text="Add new restriction" class="ml-auto mr-2 mb-2" @click="onCreate" />
  </ManagerWrapper>
  <UpsertModal v-if="!!restrictionToCreate" @close="restrictionToCreate = null" v-model="restrictionToCreate" @save="createEntity" />
  <UpsertModal v-if="!!restrictionToEdit" @close="restrictionToEdit = null" v-model="restrictionToEdit" @save="updateEntity" />
  <AppDeleteModal :entity-name="restrictionToDelete.name" v-if="!!restrictionToDelete" @close="restrictionToDelete = null" @delete="deleteEntity" />
</template>
