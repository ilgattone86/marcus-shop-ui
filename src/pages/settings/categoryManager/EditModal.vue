<script setup>
import AppModal from "@/components/AppModal.vue"
import AppButton from "@/components/AppButton.vue"

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
})
const emits = defineEmits(["save", "close"])
const model = defineModel()
</script>

<template>
  <AppModal v-if="show" @close="emits('close')">
    <div class="flex flex-col gap-4 w-sm">
      <input type="text" class="py-1 px-2 w-full border rounded border-slate-500" v-model="model.name" />
      <AppButton text="Save category" class="w-fit ml-auto" @click="emits('save')" />
    </div>
  </AppModal>
</template>

<style scoped></style>
