<template>
  <x-container class="mt-16">
    <div class="flex justify-between items-center mb-12">
      <h1 class="text-4xl font-bold">What's your next destination?</h1>
      <x-button
        v-if="canCreate"
        kind="secondary"
        icon="heroicons:plus"
        icon-size="24px"
        data-drawer-target="wt-drawer"
        data-drawer-toggle="wt-drawer"
        data-drawer-placement="right"
        aria-controls="wt-drawer"
        >Add travel</x-button
      >
    </div>
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
  <x-drawer v-if="canCreate">
    <travel-form @submit="onCreate">
      <template v-slot:header>
        <Icon name="maki:beach" />
        <span class="ml-2"> Create a new travel </span>
      </template>
    </travel-form>
  </x-drawer>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "main",
  });

  interface CreatePayload {
    title: string;
    description: string;
    duration: number;
    public: boolean;
    images: string[] | File[];
  }

  const authState = useAuthStore();
  const { $api } = useNuxtApp();

  const canCreate = computed(() =>
    hasPermission(authState.userRole, "travels", "write"),
  );

  const { data: travels } = await useAsyncGql({
    operation: "getTravels",
    options: {
      transform: (data) =>
        data.travels.map((item) => ({
          title: item.title,
          subtitle: item.description,
          slug: item.slug,
          image: {
            src: item.images[0]?.url,
            alt: item.title,
          },
        })),
    },
  });

  const onCreate = async (payload: CreatePayload) => {
    const images = await $api.travels.uploadFiles({
      files: payload.images as File[],
    });

    const { createTravel: newTravel } = await GqlCreateTravel({
      input: {
        title: payload.title,
        description: payload.description,
        public: payload.public,
        duration: payload.duration,
        images,
      },
    });

    travels.value.push({
      title: newTravel.title,
      subtitle: newTravel.description,
      slug: newTravel.slug,
      image: {
        src: newTravel.images[0].url,
        alt: newTravel.title,
      },
    });

    const drawer = FlowbiteInstances.getInstance("Drawer", "wt-drawer");
    drawer.hide();
  };
</script>
