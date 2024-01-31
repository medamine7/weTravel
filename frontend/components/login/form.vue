<template>
  <div class="bg-white w-full max-w-96 p-8 shadow-lg rounded-md">
    <slot name="prepend" />
    <FormKit type="form" @submit="onSubmit" :errors="errors">
      <FormKit
        type="email"
        label="Email"
        name="email"
        validation="required|email"
        placeholder="name@example.com"
      />

      <FormKit
        class="text-primary"
        type="password"
        label="Password"
        name="password"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="handleIconClick"
        suffix-icon-class="hover:text-blue-500"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    errors?: string[];
  }

  withDefaults(defineProps<Props>(), {
    errors: () => [],
  });

  const emit = defineEmits<{
    (e: "submit", payload: { email: string; password: string }): void;
  }>();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    emit("submit", { email, password });
  };

  const handleIconClick = (node: FormKitNode) => {
    node.props.suffixIcon =
      node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
    node.props.type = node.props.type === "password" ? "text" : "password";
  };
</script>
