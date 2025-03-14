<script setup>
// Components
import AppModal from "@/components/AppModal.vue"
import AppButton from "@/components/AppButton.vue"

const emits = defineEmits(["save", "close"])
const model = defineModel()
</script>

<template>
  <AppModal @close="emits('close')">
    <div class="flex flex-col gap-4 w-sm">
      <section>
        <label for="name">Name:</label>
        <input type="text" id="name" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.name" placeholder="Choose a name for the category" />
      </section>
      <AppButton text="Save category" class="ml-auto" @click="emits('save')" />
    </div>
  </AppModal>
</template>
