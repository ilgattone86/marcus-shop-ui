<script setup>
// Components
import AppTag from "@/components/AppTag.vue"

defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="{ name: 'product', params: { id: product.id } }" class="rounded-2xl overflow-hidden w-[250px] h-[400px] bg-slate-50 border border-slate-200 hover:shadow-sm cursor-pointer grid grid-rows-5 transition-all duration-500">
    <img class="row-span-2" src="https://www.torpado.com/wp-content/uploads/2022/11/21T441_BLACK.jpg" alt="" />
    <div class="flex flex-col gap-2 p-2 justify-between h-full row-span-3">
      <section>
        <h3 class="font-bold">{{ product.name }}</h3>
        <span class="text-xs text-balance">{{ product.description }}</span>
      </section>
      <section class="flex justify-end">
        <AppTag :text="product.category.name" type="info" />
      </section>
    </div>
  </RouterLink>
</template>

<style scoped></style>
