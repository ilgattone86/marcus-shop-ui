<script setup>
// Libraries
import { ref } from "vue"
import { cloneFnJSON } from "@vueuse/core"
// Composables
import useAllProducts from "@/composables/products/index.js"
// Components
import AppButton from "@/components/AppButton.vue"
import ManagerTable from "@/pages/settings/ManagerTable.vue"
import ManagerTitle from "@/pages/settings/ManagerTitle.vue"
import AppDeleteModal from "@/components/AppDeleteModal.vue"
import ManagerWrapper from "@/pages/settings/ManagerWrapper.vue"
import UpsertModal from "@/pages/settings/productManager/UpsertModal.vue"

const { products, editProduct, createProduct, deleteProduct } = useAllProducts()

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
    description: productToEdit.value.description,
    category: productToEdit.value.category.id,
  }).then(() => (productToEdit.value = null))
}

function createEntity() {
  createProduct({
    name: productToCreate.value.name,
    description: productToCreate.value.description,
    category: productToCreate.value.category.id,
  }).then(() => (productToCreate.value = null))
}

function deleteEntity() {
  deleteProduct({ product: productToDelete.value.id }).then(() => (productToDelete.value = null))
}
function addNewProduct() {
  productToCreate.value = { name: "", description: "", category: { id: "" } }
}
</script>

<template>
  <ManagerWrapper>
    <ManagerTitle title="Products" />
    <ManagerTable :rows="products" @edit="onEdit" @delete="onDelete" />
    <AppButton text="Add new product" class="w-fit ml-auto mr-2 mb-2" @click="addNewProduct" />
  </ManagerWrapper>
  <UpsertModal v-if="!!productToEdit" @close="productToEdit = null" v-model="productToEdit" @save="editEntity" />
  <UpsertModal v-if="!!productToCreate" @close="productToCreate = null" v-model="productToCreate" @save="createEntity" />
  <AppDeleteModal :entity-name="productToDelete.name" v-if="!!productToDelete" @close="productToDelete = null" @delete="deleteEntity" />
</template>

<style scoped></style>
