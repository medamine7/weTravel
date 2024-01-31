<template>
  <nav class="border-gray-200 top-0 w-full z-50 bg-white border-b">
    <div
      class="px-8 md:px-16 py-2 flex items-center justify-between mx-auto box-border h-full w-full"
    >
      <nuxt-link to="/" class="flex items-center space-x-3 justify-self-start">
        <img src="/logo.png" class="h-12" />
      </nuxt-link>
      <ul class="flex gap-12 justify-between font-medium">
        <li v-for="(item, index) in menu" :key="index">
          <nuxt-link
            :to="item.link"
            active-class="!text-brand cursor-default"
            class="text-primary block py-2 px-3 rounded lg:hover:bg-transparent lg:hover:text-brand lg:p-0"
            >{{ item.name }}</nuxt-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
  const menu = [
    {
      name: "Travels",
      link: "/travels",
    },
    {
      name: "Login",
      link: "/login",
    },
  ];
</script>
