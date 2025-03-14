<script setup>
// Libraries
import { ref, computed } from "vue"
import { onClickOutside } from "@vueuse/core"

const props = defineProps({
  modelValue: String,
  options: Array,
  placeholder: { type: String, default: "Select an option" },
})
const emit = defineEmits(["update:modelValue"])

const isOpen = ref(false)
const dropdownRef = ref(null)

onClickOutside(dropdownRef, handleClickOutside)

const selectedLabel = computed(() => {
  const selected = props.options.find((o) => o.value === props.modelValue)
  return selected ? selected.label : props.placeholder
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

function selectOption(option) {
  if (option.disabled) return

  emit("update:modelValue", option.value)
  isOpen.value = false
}
</script>

<template>
  <div class="relative w-64" ref="dropdownRef">
    <button @click="toggleDropdown" class="w-full p-2 bg-white border border-slate-300 rounded-md shadow-sm flex justify-between items-center hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <span class="text-gray-700">{{ selectedLabel }}</span>
      <span class="transform transition-transform duration-200" :class="{ 'rotate-180': isOpen }">
        <v-icon name="md-keyboardarrowdown-round" />
      </span>
    </button>

    <ul v-show="isOpen" class="origin-top absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 opacity-0 scale-95 transition-all duration-200 origin-top" :class="{ 'opacity-100 scale-100': isOpen }">
      <li v-for="option in options" :key="option.value" @click="selectOption(option)" :class="option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200">
        <span :class="option.disabled ? 'opacity-35' : 'opacity-100'">{{ option.label }}</span>
        <slot name="disabledText" v-if="option.disabled" />
      </li>
    </ul>
  </div>
</template>
