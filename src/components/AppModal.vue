<script setup>
import { onKeyStroke } from "@vueuse/core"

const props = defineProps({
  show: { type: Boolean, default: true },
  canBeClosed: { type: Boolean, default: true },
})
const emits = defineEmits(["close"])

onKeyStroke("Escape", () => props.canBeClosed && emits("close"))
</script>

<template>
  <Teleport to="#app" v-if="show">
    <div class="absolute top-0 h-full w-full bg-slate-500/80 flex items-center justify-center">
      <v-icon v-if="canBeClosed" name="io-close-circle" class="absolute top-0 right-0 text-white m-4 size-8 cursor-pointer" @click="emits('close')" />
      <div class="border rounded border-slate-300 bg-white p-4">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
