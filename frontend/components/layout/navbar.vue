<template>
  <nav
    class="border-gray-200 top-0 w-full z-20"
    :class="{
      absolute: absolute,
      'bg-transparent': transparent,
      'bg-white border-b': !transparent,
    }"
  >
    <div
      class="px-8 md:px-16 py-2 flex items-center justify-between mx-auto box-border h-full w-full"
    >
      <nuxt-link to="/" class="flex items-center space-x-3 justify-self-start">
        <img src="/logo.png" class="h-12" />
      </nuxt-link>
      <ul class="flex gap-12 justify-between font-medium items-center">
        <template v-for="(item, index) in menu" :key="index">
          <li v-if="item.condition ? item.condition() : true">
            <nuxt-link
              :to="item.link"
              active-class="!text-brand cursor-default"
              class="text-primary block py-2 px-3 rounded lg:hover:bg-transparent lg:hover:text-brand lg:p-0"
              :class="{
                'text-white': transparent,
                'text-primary': !transparent,
              }"
              >{{ item.name }}</nuxt-link
            >
          </li>
        </template>
        <li v-if="authState.isLoggedIn">
          <x-user @signout="onSignout" :light="transparent" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
  interface Props {
    absolute?: boolean;
    transparent?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    absolute: false,
    transparent: false,
  });

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
  ];

  const onSignout = async () => {
    await GqlLogout()
      .catch(() => {})
      .finally(() => {
        useGqlToken(null);
        authState.$reset();
        navigateTo("/");
      });
  };
</script>
