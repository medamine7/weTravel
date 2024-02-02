<template>
  <div
    id="wt-dialog"
    tabindex="-1"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="wt-dialog"
        >
          <Icon name="heroicons:x-mark" size="20px" />
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 !pt-8 text-center">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { initModals } from "flowbite";

  onMounted(() => {
    initModals();
  });
</script>
