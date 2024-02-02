<template>
  <h5
    class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
  >
    <slot name="header" />
  </h5>

  <FormKit type="form" @submit="onSubmit">
    <FormKit
      type="text"
      label="Title"
      name="title"
      validation="required"
      placeholder="Very cool travel"
      validation-visibility="submit"
      :value="defaultValues.title"
    />
    <FormKit
      type="textarea"
      label="Description"
      name="description"
      validation="required"
      placeholder="Very cool travel description"
      validation-visibility="submit"
      :value="defaultValues.description"
    />
    <FormKit
      type="file"
      label="Travel images"
      name="images"
      help="Choose at least 4 images"
      multiple="true"
      validation="required|min:4"
      validation-visibility="submit"
      accept=".png, .jpeg, .jpg"
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
  interface FormFile {
    file: File;
    url: string;
  }

  interface Payload {
    title: string;
    description: string;
    images: File[];
    duration: number;
    public: boolean;
  }

  type Data = Omit<Payload, "images"> & {
    images: string[];
  };

  interface Props {
    data?: Data;
  }

  type FormData = Omit<Payload, "isPublic" | "duration" | "images"> & {
    images: FormFile[];
  };

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: "submit", payload: Payload): void;
  }>();

  const defaultValues = {
    title: props.data?.title ?? "",
    description: props.data?.description ?? "",
    images: props.data?.images.map((url) => ({ file: null, url })) ?? [],
    duration: props.data?.duration ?? 1,
    public: props.data?.public ?? false,
  };

  const isPublic = ref(defaultValues.public);
  const duration = ref(defaultValues.duration);

  const onSubmit = async ({ title, description, images }: FormData) => {
    const files = images.map((image) => image.file);

    const payload = {
      title,
      description,
      images: files,
      duration: duration.value,
      public: isPublic.value,
    };

    emit("submit", payload);
  };
</script>
