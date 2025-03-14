<script setup>
defineProps({
  rows: { type: Array, required: true },
})

const emits = defineEmits(["edit", "delete"])
</script>

<template>
  <div class="px-2 pb-2 h-[300px] overflow-auto text-xs">
    <table class="table-auto text-xs border-collapse w-full divide-y-2 divide-slate-100">
      <thead class="sticky top-0 bg-white">
        <tr>
          <slot name="tableHeader">
            <th class="p-1">Name</th>
          </slot>
          <th class="p-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id" class="hover:bg-slate-100 w-full cursor-pointer" @click="emits('edit', row)">
          <slot name="tableRow" v-bind="{ row }">
            <td class="p-2 text-center">{{ row.name }}</td>
          </slot>
          <td class="p-2 text-center">
            <v-icon name="md-edit-round" class="!w-4 text-sky-500 cursor-pointer hover:text-sky-600" @click.stop="emits('edit', row)" />
            <v-icon name="md-delete-round" class="ml-2 !w-4 text-red-400 cursor-pointer hover:text-red-600" @click.stop="emits('delete', row)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
