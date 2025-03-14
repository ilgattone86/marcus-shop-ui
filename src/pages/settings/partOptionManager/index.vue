<script setup>
// Libraries
import { ref } from "vue"
import { cloneFnJSON } from "@vueuse/core"
// Composables
import usePartOptions from "@/composables/partOptions/index.js"
// Components
import UpsertModal from "./UpsertModal.vue"
import AppButton from "@/components/AppButton.vue"
import ManagerTable from "@/pages/settings/ManagerTable.vue"
import ManagerTitle from "@/pages/settings/ManagerTitle.vue"
import AppDeleteModal from "@/components/AppDeleteModal.vue"
import ManagerWrapper from "@/pages/settings/ManagerWrapper.vue"

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
  partOptionToCreate.value = { name: "", price: 0, stock: true, part: { id: "" } }
}

function createEntity() {
  createPartOption({
    name: partOptionToCreate.value.name,
    price: partOptionToCreate.value.price,
    stock: partOptionToCreate.value.stock,
    part: partOptionToCreate.value.part.id,
  }).then(() => (partOptionToCreate.value = null))
}

function updateEntity() {
  editPartOption({
    name: partOptionToEdit.value.name,
    price: partOptionToEdit.value.price,
    stock: partOptionToEdit.value.stock,
    part: partOptionToEdit.value.part.id,
    partOption: partOptionToEdit.value.id,
  }).then(() => (partOptionToEdit.value = null))
}

function deleteEntity() {
  deletePartOption({ partOption: partOptionToDelete.value.id }).then(() => (partOptionToDelete.value = null))
}
</script>

<template>
  <ManagerWrapper>
    <ManagerTitle title="Part options" />
    <ManagerTable :rows="partOptions" @edit="onEdit" @delete="onDelete">
      <template #tableHeader>
        <th>Name</th>
        <th>Part</th>
        <th>Stock</th>
        <th>Price</th>
      </template>
      <template #tableRow="{ row }">
        <td class="text-center">{{ row.name }}</td>
        <td class="text-center">{{ row.part.name }}</td>
        <td class="text-center">
          <v-icon name="bi-check-lg" v-if="row.stock" class="text-green-500" />
          <v-icon name="md-close" v-else class="text-red-500" />
        </td>
        <td class="text-center">{{ row.price }}</td>
      </template>
    </ManagerTable>
    <AppButton text="Add new part option" class="ml-auto mr-2 mb-2" @click="onCreate" />
  </ManagerWrapper>
  <UpsertModal v-if="!!partOptionToCreate" @close="partOptionToCreate = null" v-model="partOptionToCreate" @save="createEntity" />
  <UpsertModal v-if="!!partOptionToEdit" @close="partOptionToEdit = null" v-model="partOptionToEdit" @save="updateEntity" />
  <AppDeleteModal :entity-name="partOptionToDelete.name" v-if="!!partOptionToDelete" @close="partOptionToDelete = null" @delete="deleteEntity" />
</template>
