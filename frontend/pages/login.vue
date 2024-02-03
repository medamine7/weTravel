<template>
  <div
    class="w-full flex-grow flex justify-start items-center flex-col pt-24 bg-brand-light"
  >
    <login-form @submit="onLogin" :errors="errors">
      <template v-slot:prepend>
        <div class="w-full flex flex-col justify-start items-center gap-3 mb-4">
          <img src="/logo.png" class="h-24" />
          <h4 class="text-lg font-bold">Login to weTravel</h4>
        </div>
      </template>
    </login-form>
    <nuxt-link
      to="/"
      class="text-sm font-bold hover:underline mt-6 flex items-center gap-2"
    >
      <Icon name="heroicons:arrow-left" />
      <span> Back Home </span>
    </nuxt-link>
  </div>
</template>
<script lang="ts" setup>
  definePageMeta({
    middleware: [
      function () {
        const authStore = useAuthStore();
        if (authStore.isLoggedIn) {
          return navigateTo("/");
        }
      },
    ],
  });

  import type { UserRole } from "~/types/user";

  interface FormData {
    email: string;
    password: string;
  }

  const errors = ref<string[]>([]);
  const authStore = useAuthStore();

  const setUserData = async (tokens: { access: string; refresh: string }) => {
    const { whoAmI: user } = await GqlWhoAmI();
    authStore.updateAuth({
      user: {
        name: user.name,
        email: user.email,
        role: user.role as UserRole,
      },
      tokens,
    });
  };

  const onLogin = ({ email, password }: FormData) => {
    errors.value = [];

    GqlLogin({
      input: {
        email,
        password,
      },
    })
      .then(async (result) => {
        useGqlToken(result.login.accessToken);
        await setUserData({
          access: result.login.accessToken,
          refresh: result.login.refreshToken,
        });
        navigateTo("/travels");
      })
      .catch((error) => {
        errors.value.push("Invalid email or password, please try again.");
      });
  };
</script>
