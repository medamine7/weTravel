<template>
  <main class="w-full flex-1 flex flex-col justify-start relative">
    <layout-navbar v-bind="navProps" />
    <slot />
  </main>
  <layout-footer />
</template>

<script lang="ts" setup>
  const route = useRoute();

  const navProps = computed(() => {
    const isHome = route.path === "/";

    return isHome
      ? {
          absolute: true,
          transparent: true,
        }
      : {};
  });
</script>
