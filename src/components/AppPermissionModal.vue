<script setup>
// Libraries
import { ref } from "vue"
// Composables
import useUserPermissions from "@/composables/permissions"
// Components
import AppModal from "@/components/AppModal.vue"
import AppButton from "@/components/AppButton.vue"
import AppInfoContainer from "@/components/AppInfoContainer.vue"

const props = defineProps({
  permissionsToCheck: {
    type: Array,
    required: true,
  },
})

const { loadPermissionsFor, hasPermissions, hasLoaded } = useUserPermissions(props.permissionsToCheck)

const userEmail = ref("")

function checkPermissions() {
  loadPermissionsFor(userEmail.value)
}
</script>

<template>
  <slot v-if="hasPermissions" />
  <AppModal v-else :can-be-closed="false">
    <div class="flex flex-col gap-4 p-4 w-sm">
      <AppInfoContainer text="In order to change the settings of the shop you need to have permission. Please enter your email address to validate your permission." />
      <div v-if="hasLoaded" class="rounded bg-orange-100/50 border border-orange-500 text-sm text-orange-600 p-4">This user does not have permissions!</div>
      <input type="email" v-model="userEmail" class="py-1 px-2 w-full border rounded border-slate-500" @keyup.enter="checkPermissions" placeholder="Enter the email to check" />
      <AppButton text="Validate permission" class="ml-auto" @click="checkPermissions" />
    </div>
  </AppModal>
</template>
