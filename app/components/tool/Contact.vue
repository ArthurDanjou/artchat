<script lang="ts" setup>
import { socials } from '~~/types'

const { t } = useI18n({ useScope: 'local' })
</script>

<template>
  <section>
    <div>
      <p class="prose dark:prose-invert">
        {{ t('contact') }}
      </p>
      <div class="flex gap-2 flex-wrap my-2">
        <UButton
          v-for="social in socials"
          :key="social.label"
          :icon="social.icon"
          :label="social.label"
          variant="subtle"
          color="neutral"
          target="_blank"
          class="m-1 shadow-sm"
          :href="social.to"
          :aria-label="social.label"
        />
      </div>
    </div>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "contact": "There are different ways to contact me. Here is a list:"
  },
  "fr": {
    "contact": "Il existe différents façons de me contacter. Voici une liste :"
  },
  "es": {
    "contact": "Existen diferentes formas de contactarme. Aquí hay una lista:"
  }
}
</i18n>
