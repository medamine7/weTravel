<template>
  <h5
    class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
  >
    <Icon name="maki:beach" />
    <span class="ml-2"> Create a new travel </span>
  </h5>

  <FormKit type="form" @submit="onSubmit">
    <FormKit
      type="text"
      label="Title"
      name="title"
      validation="required"
      placeholder="Very cool travel"
      validation-visibility="submit"
    />
    <FormKit
      type="textarea"
      label="Description"
      name="description"
      validation="required"
      placeholder="Very cool travel description"
      validation-visibility="submit"
    />
    <FormKit
      type="file"
      label="Travel images"
      name="images"
      help="Choose at least 4 images"
      multiple="true"
      validation="required|min:4"
      validation-visibility="submit"
    />

    <label for="quantity-input" class="block text-sm font-bold text-gray-90"
      >Duration:</label
    >

    <x-counter class="mt-2" v-model="duration" label="Days" :min="1" />

    <label
      for="quantity-input"
      class="block mt-8 text-sm font-bold text-gray-90"
      >Make public?</label
    >
    <x-toggle v-model="isPublic" class="mt-4 mb-8" />
  </FormKit>
</template>

<script lang="ts" setup>
  interface Payload {
    title: string;
    description: string;
    images: File[];
    duration: number;
    isPublic: boolean;
  }

  type FormData = Omit<Payload, "isPublic" | "duration">;

  const emit = defineEmits<{
    (e: "submit", payload: Payload): void;
  }>();

  const isPublic = ref(false);
  const duration = ref(0);

  const onSubmit = async ({ title, description, images }: FormData) => {
    const payload = {
      title,
      description,
      images,
      duration: duration.value,
      isPublic: isPublic.value,
    };

    emit("submit", payload);
  };
</script>
