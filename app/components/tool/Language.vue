<script lang="ts" setup>
import { en, es, fr } from '@nuxt/ui/locale'

const { locale, setLocale, locales, t } = useI18n({ useScope: 'local' })
const currentLocale = computed(() => locales.value.filter(l => l.code === locale.value)[0])
watch(locale, () => changeLocale(locale.value))

async function changeLocale(newLocale: string | undefined) {
  document.body.style.animation = 'switch-on .2s'
  await new Promise(resolve => setTimeout(resolve, 200))

  await setLocale(newLocale as 'en' | 'fr' | 'es')
  document.body.style.animation = 'switch-off .5s'

  await new Promise(resolve => setTimeout(resolve, 200))
  document.body.style.animation = ''
}

defineShortcuts({
  l: () => locale.value = currentLocale.value!.code === 'en' ? 'fr' : currentLocale.value!.code === 'fr' ? 'es' : 'en',
})
</script>

<template>
  <section class="space-y-4">
    <div class="prose dark:prose-invert">
      <p>{{ t('response.control') }}</p>
      <ul>
        <li>{{ t('response.choose') }}</li>
        <i18n-t keypath="response.kbd" tag="li">
          <template #kbd>
            <UKbd>L</UKbd>
          </template>
        </i18n-t>
      </ul>
    </div>
    <ClientOnly>
      <UCard variant="outline" class="md:max-w-1/2" :ui="{ body: 'flex justify-between items-center gap-2' }">
        <p class="block">
          {{ t('change') }}
        </p>
        <ULocaleSelect v-model="locale" :locales="[en, es, fr]" @update:model-value="changeLocale" />
      </UCard>
    </ClientOnly>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "change": "Change language",
    "response": {
      "control": "I added the language switch control above so you can switch directly.",
      "choose": "Choose English, French, or Spanish",
      "kbd": "Press {kbd} on your keyboard"
    }
  },
  "fr": {
    "change": "Changer de langue",
    "response": {
      "control": "J'ai ajouté le contrôle de changement de langue ci-dessus pour que vous puissiez changer directement.",
      "choose": "Choisissez Anglais, Français ou Espagnol",
      "kbd": "Appuyez sur {kbd} de votre clavier"
    }
  },
  "es": {
    "change": "Cambiar idioma",
    "response": {
      "control": "He añadido el control de cambio de idioma arriba para que puedas cambiar directamente.",
      "choose": "Elige Inglés, Francés o Español",
      "kbd": "Presiona {kbd} en tu teclado"
    }
  }
}
</i18n>
