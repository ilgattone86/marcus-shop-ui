<script setup>
// Libraries
import { ref } from "vue"
import { cloneFnJSON } from "@vueuse/core"
// Composables
import usePartOptions from "@/composables/partOptions/index.js"
// Components
import AppButton from "@/components/AppButton.vue"
import ManagerTable from "@/pages/settings/ManagerTable.vue"
import ManagerTitle from "@/pages/settings/ManagerTitle.vue"
import AppDeleteModal from "@/components/AppDeleteModal.vue"
import ManagerWrapper from "@/pages/settings/ManagerWrapper.vue"
import UpsertModal from "@/pages/settings/partOptionManager/UpsertModal.vue"

const { partOptions, createPartOption, deletePartOption, editPartOption } = usePartOptions()

const partOptionToCreate = ref(null)
const partOptionToEdit = ref(null)
const partOptionToDelete = ref(null)

function onEdit(row) {
  partOptionToEdit.value = cloneFnJSON(row)
}

function onDelete(row) {
  partOptionToDelete.value = cloneFnJSON(row)
}

function onCreate() {
  partOptionToCreate.value = { name: "", price: 0, part: { id: "" } }
}

function createEntity() {
  createPartOption({
    name: partOptionToCreate.value.name,
    part: partOptionToCreate.value.part.id,
    price: partOptionToCreate.value.price,
  }).then(() => (partOptionToCreate.value = null))
}

function updateEntity() {
  editPartOption({
    partOption: partOptionToEdit.value.id,
    name: partOptionToEdit.value.name,
    price: partOptionToEdit.value.price,
    part: partOptionToEdit.value.part.id,
  }).then(() => (partOptionToEdit.value = null))
}

function deleteEntity() {
  deletePartOption({ partOption: partOptionToDelete.value.id }).then(() => (partOptionToDelete.value = null))
}
</script>

<template>
  <ManagerWrapper>
    <ManagerTitle title="Part options" />
    <ManagerTable :rows="partOptions" @edit="onEdit" @delete="onDelete" />
    <AppButton text="Add new part option" class="w-fit ml-auto mr-2 mb-2" @click="onCreate" />
  </ManagerWrapper>
  <UpsertModal v-if="!!partOptionToCreate" @close="partOptionToCreate = null" v-model="partOptionToCreate" @save="createEntity" />
  <UpsertModal v-if="!!partOptionToEdit" @close="partOptionToEdit = null" v-model="partOptionToEdit" @save="updateEntity" />
  <AppDeleteModal :entity-name="partOptionToDelete.name" v-if="!!partOptionToDelete" @close="partOptionToDelete = null" @delete="deleteEntity" />
</template>
