<template>
  <x-container v-if="data" class="pt-12">
    <div class="flex justify-between">
      <h2 class="text-3xl font-black">{{ data.title }}</h2>
      <x-button
        v-if="hasPermission(userRole, 'travels', 'write')"
        kind="secondary"
        >Edit</x-button
      >
    </div>
    <travel-gallery />
  </x-container>
</template>

<script setup lang="ts">
  import { UserRole } from "~/types/user";

  definePageMeta({
    layout: "main",
  });

  const route = useRoute();
  const authState = useAuthStore();

  const userRole = computed(() => authState.user?.role as UserRole);

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
