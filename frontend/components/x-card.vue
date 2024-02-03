<template>
  <div class="cursor-pointer w-40 flex-grow max-w-56">
    <div
      class="mb-2 bg-gray-200 rounded-lg overflow-hidden w-full aspect-square"
    >
      <img
        v-if="item.image"
        :src="item.image.src"
        :alt="item.image.alt"
        referrerpolicy="no-referrer"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="mt-2 hover:underline">
      <h4 class="text-primary line-clamp-2 font-bold">{{ item.title }}</h4>
      <p v-if="item.subtitle" class="text-sm text-gray-400 line-clamp-3">
        {{ item.subtitle }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    item: {
      title: string;
      subtitle?: string;
      image: {
        src: string;
        alt: string;
      };
    };
  }

  defineProps<Props>();
</script>
