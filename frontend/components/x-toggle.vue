<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" class="sr-only peer" v-model="model" />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
    ></div>
    <span v-if="label" class="ms-3 text-sm font-medium text-gray-900">{{
      label
    }}</span>
  </label>
</template>

<script lang="ts" setup>
  interface Props {
    label?: string;
  }

  defineProps<Props>();
  const model = defineModel<boolean>();
</script>
