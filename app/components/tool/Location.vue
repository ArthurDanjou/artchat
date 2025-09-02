<script lang="ts" setup>
useI18n({ useScope: 'local' })
</script>

<template>
  <section>
    <div class="prose dark:prose-invert mb-4">
      <i18n-t keypath="location" tag="p">
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

<i18n lang="json">
{
  "en": {
    "location": "I'm currently based in {location}. See below for more details."
  },
  "fr": {
    "location": "Je suis actuellement basé à {location}. Voir ci-dessous pour plus de détails."
  },
  "es": {
    "location": "Actualmente estoy basado en {location}. Consulta más detalles a continuación."
  }
}
</i18n>
