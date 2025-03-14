<script setup>
import AppModal from "@/components/AppModal.vue"
import AppButton from "@/components/AppButton.vue"
import useCategories from "@/composables/categories/index.js"
import usePartOptions from "@/composables/partOptions/index.js"
import { computed, watch } from "vue"

const emits = defineEmits(["save", "close"])
const model = defineModel()

const { partOptions } = usePartOptions()

const dependentOptions = computed(() => {
  return partOptions.value.filter((partOption) => partOption.id !== model.value.blockedOption)
})

const blockedOptions = computed(() => {
  return partOptions.value.filter((partOption) => partOption.id !== model.value.dependentOption)
})
</script>

<template>
  <AppModal @close="emits('close')">
    <div class="flex flex-col gap-4 w-sm">
      <section>
        <label for="dependent-option">Dependent option:</label>
        <select id="dependent-option" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.dependentOption.id">
          <option value="" selected disabled hidden>Choose a dependent option</option>
          <option v-for="partOption in dependentOptions" :key="partOption.id" :value="partOption.id">{{ partOption.name }}</option>
        </select>
      </section>
      <section>
        <label for="blocked-option">Blocked option:</label>
        <select id="blocked-option" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.blockedOption.id">
          <option value="" selected disabled hidden>Choose a blocked option</option>
          <option v-for="partOption in blockedOptions" :key="partOption.id" :value="partOption.id">{{ partOption.name }}</option>
        </select>
      </section>
      <AppButton text="Save restriction" class="ml-auto" @click="emits('save')" />
    </div>
  </AppModal>
</template>

<style scoped></style>
