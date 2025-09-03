<script lang="ts" setup>
import { en, es, fr } from '@nuxt/ui/locale'

const { locale, setLocale, t } = useI18n()

async function changeLocale(newLocale: string) {
  await setLocale(newLocale as 'en' | 'fr' | 'es')
}
</script>

<template>
  <section class="space-y-4">
    <div class="prose dark:prose-invert">
      <p>{{ t('tool.language.response.control') }}</p>
      <ul>
        <li>{{ t('tool.language.response.choose') }}</li>
        <i18n-t keypath="tool.language.response.kbd" tag="li">
          <template #kbd>
            <UKbd>L</UKbd>
          </template>
        </i18n-t>
      </ul>
    </div>
    <ClientOnly>
      <UCard variant="outline" class="md:max-w-1/2 m-1 shadow-sm" :ui="{ body: 'flex justify-between items-center gap-2' }">
        <p class="block">
          {{ t('tool.language.change') }}
        </p>
        <ULocaleSelect v-model="locale" :locales="[en, es, fr]" @update:model-value="changeLocale" />
      </UCard>
    </ClientOnly>
  </section>
</template>
