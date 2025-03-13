<script setup>
import AppModal from "@/components/AppModal.vue"
import AppButton from "@/components/AppButton.vue"
import { computed } from "vue"

const emits = defineEmits(["delete", "close"])
const props = defineProps({
  entityName: {
    type: String,
    default: null,
  },
})

const title = computed(() => `Do you really want to delete${props.entityName ? " " + props.entityName + "?" : "?"}`)
</script>

<template>
  <AppModal @close="emits('close')">
    <div class="flex flex-col gap-4 w-sm">
      <span>{{ title }}</span>
      <div class="ml-auto flex gap-2">
        <AppButton text="Yes" class="ml-auto" @click="emits('delete')" />
        <AppButton type="cancel" text="No" class="ml-auto" @click="emits('close')" />
      </div>
    </div>
  </AppModal>
</template>

<style scoped></style>
