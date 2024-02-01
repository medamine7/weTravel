<template>
  <nav class="border-gray-200 top-0 w-full z-20 bg-white border-b">
    <div
      class="px-8 md:px-16 py-2 flex items-center justify-between mx-auto box-border h-full w-full"
    >
      <nuxt-link to="/" class="flex items-center space-x-3 justify-self-start">
        <img src="/logo.png" class="h-12" />
      </nuxt-link>
      <ul class="flex gap-12 justify-between font-medium">
        <template v-for="(item, index) in menu" :key="index">
          <li v-if="item.condition ? item.condition() : true">
            <nuxt-link
              v-on="{ click: item.handler ? item.handler : null }"
              :to="item.link"
              active-class="!text-brand cursor-default"
              class="text-primary block py-2 px-3 rounded lg:hover:bg-transparent lg:hover:text-brand lg:p-0"
              >{{ item.name }}</nuxt-link
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
  const authState = useAuthStore();

  const menu = [
    {
      name: "Travels",
      link: "/travels",
    },
    {
      name: "Login",
      link: "/login",
      condition: () => !authState.isLoggedIn,
    },
    {
      name: "Logout",
      condition: () => authState.isLoggedIn,
      handler: () => {
        useGqlToken(null);
        authState.$reset();
        navigateTo("/");
      },
    },
  ];
</script>
