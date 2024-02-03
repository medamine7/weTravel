<template>
  <div
    :id="id"
    class="fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-96"
    tabindex="-1"
    :aria-labelledby="`${id}-label`"
  >
    <slot />

    <button
      type="button"
      :data-drawer-hide="id"
      :aria-controls="id"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <Icon name="heroicons:x-mark" size="20px" />
      <span class="sr-only">Close menu</span>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { initDrawers } from "flowbite";

  withDefaults(
    defineProps<{
      id?: string;
    }>(),
    {
      id: "wt-drawer",
    },
  );

  onMounted(() => {
    initDrawers();
  });
</script>
