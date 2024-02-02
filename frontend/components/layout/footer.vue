<template>
  <div class="w-full mt-28" />
  <footer
    class="bg-gradient-to-b pt-14 mt-auto px-4 md:px-16 pb-6 flex items-center justify-center"
    :class="$style.footer"
  >
    <nuxt-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="/logo.png" class="h-32" />
    </nuxt-link>
  </footer>
</template>

<style module>
  .footer {
    background: var(--color-footer-background);
  }
</style>
