<template>
  <Icon
    id="avatarButton"
    data-dropdown-toggle="userDropdown"
    data-dropdown-placement="bottom-start"
    name="heroicons:user-circle"
    size="32px"
    class="cursor-pointer hover:text-brand"
    :class="{
      'text-white': light,
      'text-gray-500': !light,
    }"
  />

  <div
    id="userDropdown"
    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-64"
  >
    <div class="px-4 py-3 text-sm text-gray-900">
      <div class="truncate text-blue-500 capitalize text-right mb-2">
        {{ authState.user?.role }}
      </div>
      <div class="font-bold">{{ authState.user?.name }}</div>
      <div class="font-medium truncate">{{ authState.user?.email }}</div>
    </div>
    <div class="py-1">
      <a
        @click.prevent="$emit('signout')"
        href="#"
        class="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
        >Sign out</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { initDropdowns } from "flowbite";

  interface Props {
    light?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    light: false,
  });

  defineEmits(["signout"]);

  const authState = useAuthStore();
  onMounted(() => {
    initDropdowns();
  });
</script>
