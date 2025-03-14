<script setup>
// Libraries
import { ref } from "vue"
import { cloneFnJSON } from "@vueuse/core"
// Composables
import useParts from "@/composables/parts/index.js"
// Components
import UpsertModal from "./UpsertModal.vue"
import AppButton from "@/components/AppButton.vue"
import AppDeleteModal from "@/components/AppDeleteModal.vue"
import ManagerTable from "@/pages/settings/ManagerTable.vue"
import ManagerTitle from "@/pages/settings/ManagerTitle.vue"
import ManagerWrapper from "@/pages/settings/ManagerWrapper.vue"

const { parts, createPart, deletePart, editPart } = useParts()

const partToCreate = ref(null)
const partToEdit = ref(null)
const partToDelete = ref(null)

function onEdit(row) {
  partToEdit.value = cloneFnJSON(row)
}

function onDelete(row) {
  partToDelete.value = cloneFnJSON(row)
}

function createEntity() {
  createPart({ name: partToCreate.value.name }).then(() => (partToCreate.value = null))
}

function updateEntity() {
  editPart({ part: partToEdit.value.id, name: partToEdit.value.name }).then(() => (partToEdit.value = null))
}

function deleteEntity() {
  deletePart({ part: partToDelete.value.id }).then(() => (partToDelete.value = null))
}
</script>

<template>
  <ManagerWrapper>
    <ManagerTitle title="Parts" />
    <ManagerTable :rows="parts" @edit="onEdit" @delete="onDelete" />
    <AppButton text="Add new part" class="ml-auto mr-2 mb-2" @click="partToCreate = { name: '' }" />
  </ManagerWrapper>
  <UpsertModal v-if="!!partToCreate" @close="partToCreate = null" v-model="partToCreate" @save="createEntity" />
  <UpsertModal v-if="!!partToEdit" @close="partToEdit = null" v-model="partToEdit" @save="updateEntity" />
  <AppDeleteModal :entity-name="partToDelete.name" v-if="!!partToDelete" @close="partToDelete = null" @delete="deleteEntity" />
</template>
