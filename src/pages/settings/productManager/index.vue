<script setup>
// Libraries
import { ref } from "vue"
import { cloneFnJSON } from "@vueuse/core"
// Composables
import useProducts from "@/composables/products/index.js"
// Components
import UpsertModal from "./UpsertModal.vue"
import AppButton from "@/components/AppButton.vue"
import ManagerTable from "@/pages/settings/ManagerTable.vue"
import ManagerTitle from "@/pages/settings/ManagerTitle.vue"
import AppDeleteModal from "@/components/AppDeleteModal.vue"
import ManagerWrapper from "@/pages/settings/ManagerWrapper.vue"

const { products, editProduct, createProduct, deleteProduct } = useProducts()

const productToCreate = ref(null)
const productToEdit = ref(null)
const productToDelete = ref(null)

function onEdit(row) {
  productToEdit.value = cloneFnJSON(row)
}

function onDelete(row) {
  productToDelete.value = cloneFnJSON(row)
}

function editEntity() {
  editProduct({
    product: productToEdit.value.id,
    name: productToEdit.value.name,
    parts: productToEdit.value.parts,
    category: productToEdit.value.category.id,
    description: productToEdit.value.description,
  }).then(() => (productToEdit.value = null))
}

function createEntity() {
  createProduct({
    name: productToCreate.value.name,
    parts: productToCreate.value.parts,
    category: productToCreate.value.category.id,
    description: productToCreate.value.description,
  }).then(() => (productToCreate.value = null))
}

function deleteEntity() {
  deleteProduct({ product: productToDelete.value.id }).then(() => (productToDelete.value = null))
}
function addNewProduct() {
  productToCreate.value = { name: "", description: "", category: { id: "" }, parts: [] }
}
</script>

<template>
  <ManagerWrapper>
    <ManagerTitle title="Products" />
    <ManagerTable :rows="products" @edit="onEdit" @delete="onDelete" />
    <AppButton text="Add new product" class="ml-auto mr-2 mb-2" @click="addNewProduct" />
  </ManagerWrapper>
  <UpsertModal v-if="!!productToEdit" @close="productToEdit = null" v-model="productToEdit" @save="editEntity" />
  <UpsertModal v-if="!!productToCreate" @close="productToCreate = null" v-model="productToCreate" @save="createEntity" />
  <AppDeleteModal :entity-name="productToDelete.name" v-if="!!productToDelete" @close="productToDelete = null" @delete="deleteEntity" />
</template>
