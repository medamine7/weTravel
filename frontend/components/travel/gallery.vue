<template>
  <div
    class="grid grid-rows-2 h-[500px] grid-cols-4 mt-8 overflow-hidden rounded-xl gap-2"
  >
    <img
      v-for="(item, index) in images.slice(0, 4)"
      :key="index"
      :src="item.url"
      class="w-full h-full object-cover"
      :class="{
        'col-span-2 row-span-2': index === 0,
        'col-span-1 row-span-2 ': index === 1,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    images: {
      url: string;
      filename?: string;
      originalname?: string;
    }[];
  }>();
</script>
