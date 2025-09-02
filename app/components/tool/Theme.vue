<script lang="ts" setup>
const colorMode = useColorMode()
const { t } = useI18n({ useScope: 'local' })

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (val: boolean) => {
    colorMode.preference = val ? 'dark' : 'light'
  },
})
const dark = computed({
  get: () => colorMode.value === 'dark',
  set: () => {},
})

function toggleDark(event: MouseEvent | { clientX: number, clientY: number }) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: colorMode.value === 'dark'
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: colorMode.value === 'dark'
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}

defineShortcuts({
  t: () => toggleDark({ clientX: window.innerWidth, clientY: 0 }),
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
            <UKbd>T</UKbd>
          </template>
        </i18n-t>
      </ul>
    </div>
    <ClientOnly>
      <UCard variant="outline" class="md:max-w-1/2 m-1 shadow-sm" :ui="{ body: 'flex justify-between items-center' }">
        <div class="flex items-center gap-2">
          <UIcon v-if="dark" name="i-ph-moon-duotone" size="24" />
          <UIcon v-else name="i-ph-sun-duotone" size="24" />
          <span>{{ t('switch') }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted">{{ t('light') }}</span>
          <USwitch
            v-model="dark"
            color="neutral"
            size="lg"
            aria-label="switch theme"
            @click.prevent="toggleDark"
          />
          <span class="text-xs text-muted">{{ t('dark') }}</span>
        </div>
      </UCard>
    </ClientOnly>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "switch": "Switch theme",
    "light": "Light",
    "dark": "Dark",
    "response": {
      "control": "I added the theme toggle control above so you can switch directly.",
      "choose": "Choose Light (sun icon) or Dark (moon icon)",
      "kbd": "Press {kbd} on your keyboard"
    }
  },
  "fr": {
    "switch": "Changer de thème",
    "light": "Clair",
    "dark": "Sombre",
    "response": {
      "control": "J'ai ajouté le contrôle de basculement de thème ci-dessus afin que vous puissiez basculer directement.",
      "choose": "Choisissez Clair (icône de soleil) ou Sombre (icône de lune)",
      "kbd": "Appuyez sur {kbd} sur votre clavier"
    }
  },
  "es": {
    "switch": "Cambiar tema",
    "light": "Claro",
    "dark": "Oscuro",
    "response": {
      "control": "He añadido el control de alternancia de tema arriba para que puedas cambiar directamente.",
      "choose": "Elige Claro (icono de sol) u Oscuro (icono de luna)",
      "kbd": "Presiona {kbd} en tu teclado"
    }
  }
}
</i18n>

<style scoped>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 9999;
}
.dark::view-transition-old(root) {
  z-index: 9999;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
