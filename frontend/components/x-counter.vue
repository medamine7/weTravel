<template>
  <div class="relative flex items-center max-w-[11rem]">
    <button
      type="button"
      id="decrement-button"
      @click="decrement"
      class="flex items-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
    >
      <Icon name="uil:minus" />
    </button>
    <input
      type="text"
      class="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6"
      placeholder=""
      required
      v-model="model"
    />
    <div
      v-if="label"
      class="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse"
    >
      <span>{{ label }}</span>
    </div>
    <button
      type="button"
      id="increment-button"
      data-input-counter-increment="counter-input"
      @click="increment"
      class="flex items-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
    >
      <Icon name="uil:plus" />
    </button>
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    label: string;
    min?: number;
    max?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    min: 0,
  });

  const model = defineModel<number>({ required: true });

  const increment = () => {
    if (props.max && model.value >= props.max) return;

    model.value++;
  };

  const decrement = () => {
    if (model.value <= props.min) return;

    model.value--;
  };
</script>
