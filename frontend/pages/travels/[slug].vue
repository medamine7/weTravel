<template>
  <x-container v-if="data" class="pt-12">
    <div class="flex justify-between items-start gap-6">
      <h2 class="text-4xl font-bold">{{ data.title }}</h2>
      <div
        class="flex gap-4 items-center"
        v-if="hasPermission(authState.userRole, 'travels', 'write')"
      >
        <x-button kind="secondary" icon="heroicons:plus" icon-size="18px"
          >Add tour</x-button
        >
        <x-button
          kind="secondary"
          icon="heroicons:pencil-solid"
          icon-size="18px"
          >Edit</x-button
        >
      </div>
    </div>
    <travel-gallery :images="data.images" />
    <h5 class="text-2xl font-bold mt-8 mb-4">Upcoming tours</h5>
  </x-container>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: "main",
  });

  const route = useRoute();
  const authState = useAuthStore();

  const { data } = await useAsyncGql({
    operation: "getTravelBySlug",
    variables: {
      slug: route.params.slug as string,
    },
    options: {
      transform: (result) => result.travelBySlug,
    },
  });
</script>
