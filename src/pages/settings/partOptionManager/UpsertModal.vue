<script setup>
// Composables
import useParts from "@/composables/parts/index.js"
// Components
import AppModal from "@/components/AppModal.vue"
import AppButton from "@/components/AppButton.vue"

const emits = defineEmits(["save", "close"])
const model = defineModel()

const { parts } = useParts()
</script>

<template>
  <AppModal @close="emits('close')">
    <div class="flex flex-col gap-4 w-sm">
      <section>
        <label for="part">Part:</label>
        <select id="part" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.part.id">
          <option value="" selected disabled hidden>Choose a part for the option</option>
          <option v-for="part in parts" :key="part.id" :value="part.id">{{ part.name }}</option>
        </select>
      </section>

      <section>
        <label for="name">Name:</label>
        <input type="text" id="name" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.name" placeholder="Choose a name for the part option" />
      </section>

      <section>
        <label for="price">Price:</label>
        <input type="number" id="price" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.price" placeholder="Choose a price for the part option" />
      </section>

      <section>
        <label for="stock">Stock:</label>
        <input type="checkbox" id="stock" class="py-1 px-2 ml-2 border rounded border-slate-500" v-model="model.stock" />
      </section>

      <AppButton text="Save part option" class="ml-auto" @click="emits('save')" />
    </div>
  </AppModal>
</template>
