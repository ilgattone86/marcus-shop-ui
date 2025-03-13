<script setup>
import AppModal from "@/components/AppModal.vue"
import AppButton from "@/components/AppButton.vue"
import useCategories from "@/composables/categories/index.js"

const emits = defineEmits(["save", "close"])
const model = defineModel()

const { categories } = useCategories()
</script>

<template>
  <AppModal @close="emits('close')">
    <div class="flex flex-col gap-4 w-sm">
      <section>
        <label for="product-category">Category:</label>
        <select id="product-category" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.category.id">
          <option value="" selected disabled hidden>Choose a category for the product</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </section>

      <section>
        <label for="product-name">Name:</label>
        <input type="text" id="product-name" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.name" placeholder="Choose a name for the product" />
      </section>

      <section>
        <label for="product-description">Description:</label>
        <input type="text" id="product-name" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.description" placeholder="Write a small description for the product" />
      </section>
      <AppButton text="Save product" class="w-fit ml-auto" @click="emits('save')" />
    </div>
  </AppModal>
</template>

<style scoped></style>
