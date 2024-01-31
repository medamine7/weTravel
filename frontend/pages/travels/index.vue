<template>
  <x-container class="mt-16">
    <h1 class="text-4xl font-bold mb-8">What's your next destination?</h1>
    <div
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12"
    >
      <nuxt-link
        v-for="(item, index) in travels"
        :key="index"
        :to="`/travels/${item.slug}`"
      >
        <x-card :item="item" />
      </nuxt-link>
    </div>
  </x-container>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "main",
  });

  const { data: travels } = await useAsyncGql({
    operation: "getPublicTravels",
    options: {
      transform: (data) =>
        data.publicTravels.map((item) => ({
          title: item.title,
          subtitle: item.description,
          slug: item.slug,
          image: {
            src: item.images[0],
            alt: item.title,
          },
        })),
    },
  });
</script>
