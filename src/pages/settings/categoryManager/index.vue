<script setup>
import AppButton from "@/components/AppButton.vue"
import ManagerTable from "@/pages/settings/ManagerTable.vue"
import ManagerTitle from "@/pages/settings/ManagerTitle.vue"
import AppModal from "@/components/AppModal.vue"
import ManagerWrapper from "@/pages/settings/ManagerWrapper.vue"
import { ref } from "vue"
import useCategories from "@/composables/categories/index.js"
import EditModal from "@/pages/settings/categoryManager/EditModal.vue"
import CreateModal from "@/pages/settings/categoryManager/CreateModal.vue"

const { categories, editCategory, createCategory } = useCategories()

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
  editCategory(categoryToEdit.value)
  categoryToEdit.value = null
}

function createEntity() {
  createCategory(categoryToCreate.value)
  categoryToCreate.value = null
}
</script>

<template>
  <ManagerWrapper>
    <ManagerTitle title="Categories" />
    <ManagerTable :rows="categories" @edit="onEdit" @delete="onDelete" />
    <AppButton text="Add new category" class="w-fit ml-auto mr-2 mb-2" @click="categoryToCreate = { name: '' }" />
    <EditModal :show="!!categoryToEdit" v-model="categoryToEdit" @close="categoryToEdit = null" @save="updateEntity" />
    <CreateModal :show="!!categoryToCreate" v-model="categoryToCreate" @close="categoryToCreate = null" @save="createEntity" />
  </ManagerWrapper>
</template>
