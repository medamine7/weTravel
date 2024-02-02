<template>
  <layout-navbar v-bind="navProps" />
  <main class="w-full flex-1 pb-60">
    <slot />
  </main>
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
