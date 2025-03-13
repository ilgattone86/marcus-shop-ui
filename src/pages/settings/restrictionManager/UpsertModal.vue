<script setup>
import AppModal from "@/components/AppModal.vue"
import AppButton from "@/components/AppButton.vue"
import useCategories from "@/composables/categories/index.js"
import usePartOptions from "@/composables/partOptions/index.js"
import { computed, watch } from "vue"

const emits = defineEmits(["save", "close"])
const model = defineModel()

const { partOptions } = usePartOptions()

const baseOptions = computed(() => {
  return partOptions.value.filter((partOption) => partOption.id !== model.value.dependentOption.id)
})

const dependentOptions = computed(() => {
  return partOptions.value.filter((partOption) => partOption.id !== model.value.baseOption.id)
})
</script>

<template>
  <AppModal @close="emits('close')">
    <div class="flex flex-col gap-4 w-sm">
      <section>
        <label for="price-adjustment">Price adjustment:</label>
        <input type="number" id="price-adjustment" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.priceAdjustment" placeholder="Choose a price adjustment" />
      </section>
      <section>
        <label for="base-option">Option:</label>
        <select id="base-option" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.baseOption.id">
          <option value="" selected disabled hidden>Choose an option</option>
          <option v-for="partOption in baseOptions" :key="partOption.id" :value="partOption.id">{{ partOption.name }}</option>
        </select>
      </section>
      <section>
        <label for="dependent-option">Option:</label>
        <select id="dependent-option" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.dependentOption.id">
          <option value="" selected disabled hidden>Choose a dependent option</option>
          <option v-for="partOption in dependentOptions" :key="partOption.id" :value="partOption.id">{{ partOption.name }}</option>
        </select>
      </section>
      <AppButton text="Save restriction" class="ml-auto" @click="emits('save')" />
    </div>
  </AppModal>
</template>

<style scoped></style>
