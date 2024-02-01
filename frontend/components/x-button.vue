<template>
  <button
    kind="button"
    class="font-bold rounded-lg focus:outline-none flex justify-center items-center gap-3 text-sm"
    :class="classes"
    v-bind="$attrs"
  >
    <Icon v-if="icon" :name="icon" :size="iconSize" />
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
    iconSize?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    kind: "primary",
    icon: undefined,
    iconSize: "24px",
  });

  const $slots = useSlots();

  const classes = computed(() => {
    const classes = [];

    if (props.kind === "primary") {
      classes.push("text-white bg-primary focus:ring-brand-light");
    }

    if (props.kind === "secondary") {
      classes.push("bg-gray-100 hover:bg-gray-300");
    }

    if ($slots.default) {
      classes.push("px-5 py-2 ");
    } else {
      classes.push("p-1");
    }

    return classes;
  });
</script>
