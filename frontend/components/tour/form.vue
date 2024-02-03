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
      placeholder="Very cool tour"
      validation-visibility="submit"
      :value="defaultValues.title"
    />

    <FormKit
      type="date"
      label="From"
      name="from"
      validation="required"
      placeholder="Starting date"
      validation-visibility="submit"
      :value="defaultValues.from"
      :min="today"
    />

    <FormKit
      type="date"
      label="To"
      name="to"
      validation="required"
      placeholder="Ending date"
      validation-visibility="submit"
      :value="defaultValues.to"
      :min="today"
    />

    <FormKit
      type="number"
      label="Price in USD"
      name="price"
      validation="required"
      placeholder="Price"
      validation-visibility="submit"
      :value="defaultValues.price"
      step="1"
    />
  </FormKit>
</template>

<script lang="ts" setup>
  import type { UploadedImage } from "#gql";

  interface Payload {
    title: string;
    from: string;
    to: string;
    price: number;
  }

  interface Props {
    data?: Payload;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: "submit", payload: Payload): void;
  }>();

  const defaultValues = {
    title: props.data?.title ?? "",
    from: props.data?.from ?? "",
    to: props.data?.to ?? "",
    price: props.data?.price ?? "",
  };

  const onSubmit = async ({ title, from, to, price }: Payload) => {
    const payload = {
      title,
      from,
      to,
      price: +price,
    };

    emit("submit", payload);
  };

  const today = new Date().toISOString().split("T")[0];
</script>
