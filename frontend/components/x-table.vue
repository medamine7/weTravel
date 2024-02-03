<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            v-for="(item, index) in thead"
            scope="col"
            :key="index"
            class="px-6 py-3"
          >
            {{ item }}
          </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Delete</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(row, ind) in tbody"
          :key="ind"
        >
          <template v-for="(cell, index) in row">
            <th
              v-if="index == 0"
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ cell }}
            </th>
            <td v-else class="px-6 py-4">{{ cell }}</td>
          </template>
          <td class="px-6 py-4 text-right">
            <slot name="actions" :index="ind" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    thead: string[];
    tbody: (string | number)[][] | null;
  }

  defineProps<Props>();
</script>
