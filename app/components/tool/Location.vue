<template>
  <section>
    <div class="prose dark:prose-invert mb-4">
      <i18n-t keypath="tool.location" tag="p">
        <template #location>
          <strong>Paris, France 🇫🇷</strong>
        </template>
      </i18n-t>
    </div>
    <div class="md:max-w-2/3 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden relative z-10">
      <NuxtImg class="rounded-xl" src="/location.png" />
      <div class="size-14 rounded-full border-2 border-black absolute z-50 top-2/5 -translate-y-1/2 left-1/5 -translate-x-1/2 animate-bounce">
        <NuxtImg src="/arthur pro.webp" class="rounded-full" />
      </div>
    </div>
  </section>
</template>
