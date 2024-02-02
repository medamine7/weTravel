<template>
  <div class="flex flex-col items-center gap-12">
    <div class="flex gap-8 w-full">
      <nuxt-link
        v-for="(item, index) in travels"
        :key="index"
        :to="`/travels/${item.slug}`"
      >
        <x-card :item="item" />
      </nuxt-link>
    </div>

    <nuxt-link to="/travels">
      <x-button>See all</x-button>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
  const { data: travels } = await useAsyncGql({
    operation: "getTravels",
    variables: {
      limit: 6,
    },
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
</script>
