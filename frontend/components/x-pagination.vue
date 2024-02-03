<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px text-sm">
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          :class="hasPrevious ? '' : 'pointer-events-none opacity-50'"
          @click="onPrevious"
          >Previous</a
        >
      </li>

      <li v-for="(page, index) in pages" :key="index">
        <a
          @click="onPage(page)"
          href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          :class="activePage === page ? 'text-brand !bg-brand-light' : ''"
          >{{ page }}</a
        >
      </li>
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          :class="hasNext ? '' : 'pointer-events-none opacity-50'"
          @click="onNext"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  const emit = defineEmits(["change"]);

  const props = defineProps<{
    limit: number;
    count: number;
    skip: number;
  }>();

  const pages = computed(() => {
    return Math.ceil(props.count / props.limit);
  });

  const hasPrevious = computed(() => props.skip > 0);
  const hasNext = computed(() => props.skip + props.limit < props.count);

  const activePage = computed(() => {
    return Math.ceil(props.skip / props.limit) + 1;
  });

  const onPrevious = () => {
    if (!hasPrevious.value) return;

    emit("change", props.skip - props.limit);
  };

  const onNext = () => {
    if (!hasNext.value) return;

    emit("change", props.skip + props.limit);
  };

  const onPage = (page: number) => {
    emit("change", (page - 1) * props.limit);
  };
</script>
