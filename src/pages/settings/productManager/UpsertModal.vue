<script setup>
// Composables
import useParts from "@/composables/parts/index.js"
import useCategories from "@/composables/categories/index.js"
// Components
import AppModal from "@/components/AppModal.vue"
import AppButton from "@/components/AppButton.vue"

const emits = defineEmits(["save", "close"])
const model = defineModel()

const { categories } = useCategories()
const { parts } = useParts()

const optionSelectedClasses = ["bg-sky-200/50 rounded"]

function modelIncludePart(partId) {
  return !!model.value.parts.find((part) => `${part.id}` === `${partId}`)
}
</script>

<template>
  <AppModal @close="emits('close')">
    <div class="flex flex-col gap-4 w-sm">
      <section>
        <label for="category">Category:</label>
        <select id="category" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.category.id">
          <option value="" selected disabled hidden>Choose a category for the product</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </section>

      <section>
        <label for="name">Name:</label>
        <input type="text" id="name" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.name" placeholder="Choose a name for the product" />
      </section>

      <section>
        <label for="description">Description:</label>
        <input type="text" id="description" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.description" placeholder="Write a small description for the product" />
      </section>

      <section>
        <label for="category">Parts:</label>
        <select id="category" class="py-1 px-2 w-full border rounded border-slate-500 focus:ring focus:ring-blue-300" v-model="model.parts" multiple>
          <option value="" selected disabled hidden>Choose the parts for this product</option>
          <option class="my-0.5 p-1" :class="modelIncludePart(part.id) && optionSelectedClasses" v-for="part in parts" :key="part.id" :value="part.id" :selected="modelIncludePart(part.id)">{{ part.name }}</option>
        </select>
      </section>
      <AppButton text="Save product" class="ml-auto" @click="emits('save')" />
    </div>
  </AppModal>
</template>
