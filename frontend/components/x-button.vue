<template>
  <button
    kind="button"
    class="font-bold rounded-lg focus:outline-none flex justify-center items-center gap-3"
    :class="classes"
    v-bind="$attrs"
  >
    <FormKitIcon v-if="icon" :icon="icon" class="w-6" />
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
  /* __placeholder__ */
  import type { ButtonHTMLAttributes } from "vue";

  interface Props extends /** @vue-ignore */ ButtonHTMLAttributes {
    icon?: string;
    kind?: "primary" | "secondary";
  }

  const props = withDefaults(defineProps<Props>(), {
    kind: "primary",
    icon: undefined,
    iconSize: "md",
  });

  const $slots = useSlots();

  const classes = computed(() => {
    const classes = [];

    if (props.kind === "primary") {
      classes.push("text-white bg-primary focus:ring-brand-light");
    }

    if (props.kind === "secondary") {
      classes.push("bg-transparent rounded-lg border-2 border-gray-500");
    }

    if ($slots.default) {
      classes.push("px-5 py-2.5 ");
    } else {
      classes.push("p-1");
    }

    return classes;
  });
</script>
