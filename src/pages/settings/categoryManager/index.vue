<script setup>
// Libraries
import { ref } from "vue"
// Composables
import useCategories from "@/composables/categories/index.js"
// Components
import UpsertModal from "./UpsertModal.vue"
import AppButton from "@/components/AppButton.vue"
import AppDeleteModal from "@/components/AppDeleteModal.vue"
import ManagerTable from "@/pages/settings/ManagerTable.vue"
import ManagerTitle from "@/pages/settings/ManagerTitle.vue"
import ManagerWrapper from "@/pages/settings/ManagerWrapper.vue"

const { categories, editCategory, createCategory, deleteCategory } = useCategories()

const categoryToCreate = ref(null)
const categoryToEdit = ref(null)
const categoryToDelete = ref(null)

function onEdit(row) {
  categoryToEdit.value = { ...row }
}

function onDelete(row) {
  categoryToDelete.value = { ...row }
}

function updateEntity() {
  editCategory({
    category: categoryToEdit.value.id,
    name: categoryToEdit.value.name,
  }).then(() => (categoryToEdit.value = null))
}

function createEntity() {
  createCategory({ name: categoryToCreate.value.name }).then(() => (categoryToCreate.value = null))
}

function deleteEntity() {
  deleteCategory({ category: categoryToDelete.value.id }).then(() => (categoryToDelete.value = null))
}
</script>

<template>
  <ManagerWrapper>
    <ManagerTitle title="Categories" />
    <ManagerTable :rows="categories" @edit="onEdit" @delete="onDelete" />
    <AppButton text="Add new category" class="ml-auto mr-2 mb-2" @click="categoryToCreate = { name: '' }" />
    <UpsertModal :show="!!categoryToEdit" v-model="categoryToEdit" @close="categoryToEdit = null" @save="updateEntity" />
    <UpsertModal :show="!!categoryToCreate" v-model="categoryToCreate" @close="categoryToCreate = null" @save="createEntity" />
    <AppDeleteModal :entity-name="categoryToDelete.name" v-if="!!categoryToDelete" @close="categoryToDelete = null" @delete="deleteEntity" />
  </ManagerWrapper>
</template>
