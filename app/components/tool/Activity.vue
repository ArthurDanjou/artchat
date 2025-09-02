<script lang="ts" setup>
import type { UseTimeAgoMessages } from '@vueuse/core'
import type { Activity } from '~~/types'
import { activityMessages, IDEs } from '~~/types'

const { locale, locales, t } = useI18n({
  useScope: 'local',
})

const { data: activity, refresh } = await useAsyncData<Activity>('activity', () => $fetch<Activity>('/api/activity'))

useIntervalFn(async () => await refresh(), 5000)
const codingActivity = computed(() => {
  const activities = activity.value!.data.activities.filter(activity => IDEs.some(ide => ide.name === activity.name)).map(activity => ({
    ...activity,
    name: activity.assets?.small_text === 'Cursor' ? 'Cursor' : activity.name,
  }))

  return activities.length > 1
    ? activities[Math.floor(Math.random() * activities.length)]
    : activities[0]
})

const currentLocale = computed(() => locales.value.find((l: { code: string }) => l.code === locale.value))

const isActive = computed(() => {
  if (!codingActivity.value)
    return

  const { name, details, state } = codingActivity.value

  return name === 'Visual Studio Code' || name === 'Cursor'
    ? !details.includes('Idling')
    : state.toLowerCase().includes('editing')
})

const getActivity = computed(() => {
  if (!codingActivity.value)
    return

  const { name, details, state, timestamps } = codingActivity.value

  const project = details
    ? details
      .charAt(0)
      .toUpperCase()
      + details
        .slice(1)
        .replace('Workspace:', '')
        .trim()
    : ''

  const stateWord = state && state.split(' ').length >= 2 ? state.split(' ')[1] : t('secret')
  const ago = useTimeAgo(timestamps.start, {
    messages: activityMessages[locale.value as keyof typeof activityMessages] as UseTimeAgoMessages,
  }).value
  const formatDate = (date: number, format: string) => useDateFormat(date, format, { locales: currentLocale.value?.code ?? 'en' }).value

  return {
    name,
    project,
    state: stateWord,
    start: {
      ago,
      formated: {
        date: formatDate(timestamps.start, 'D MMMM'),
        time: formatDate(timestamps.start, 'HH:mm'),
      },
    },
  }
})
</script>

<template>
  <section>
    <div class="prose dark:prose-invert">
      <p>{{ t('response') }}</p>
    </div>
    <div v-if="getActivity" class="space-y-4">
      <div v-if="getActivity" class="prose dark:prose-invert flex items-center gap-2">
        <div>
          {{ isActive ? t('working') : t('idling', {
            editor: getActivity.name,
          }) }}
        </div>
        <UTooltip :text="isActive ? t('tooltip.online') : t('tooltip.idling')">
          <div class="relative flex h-3 w-3">
            <div
              v-if="isActive"
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
            />
            <div
              :class="isActive ? 'bg-green-500' : 'bg-amber-500'"
              class="relative inline-flex rounded-full h-3 w-3"
            />
          </div>
        </UTooltip>
      </div>
      <ClientOnly>
        <UCard v-if="getActivity" variant="outline" class="md:max-w-1/2 m-1 shadow-sm" :ui="{ body: 'flex gap-8 items-center' }">
          <UIcon
            :name="IDEs.find(ide => ide.name === getActivity!.name)!.icon"
            size="64"
          />
          <div class="">
            <div class="font-bold text-xl">
              {{ getActivity.name }}
            </div>
            <div v-if="isActive">
              {{ getActivity.state!.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') }}
            </div>
            <div>{{ getActivity.project }}</div>
            <div class="italic text-xs">
              {{ getActivity.start.ago }}
            </div>
          </div>

          <template #footer>
            <div class="flex justify-end text-sm">
              <i18n-t keypath="started" tag="p">
                <template #date>
                  {{ getActivity.start.formated.date }}
                </template>
                <template #hour>
                  {{ getActivity.start.formated.time }}
                </template>
              </i18n-t>
            </div>
          </template>
        </UCard>
      </ClientOnly>
    </div>
    <div v-else class="flex md:items-start gap-2">
      <i18n-t
        keypath="offline"
        tag="p"
        class="not-prose"
      >
        <template #maths>
          <i>{{ t('maths') }}</i>
        </template>
      </i18n-t>
      <UTooltip :text="t('tooltip.offline')">
        <div class="relative flex h-3 w-3 mt-2">
          <div
            class="relative inline-flex rounded-full h-3 w-3 bg-red-500"
          />
        </div>
      </UTooltip>
    </div>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "offline": "I'm currently offline. Come back later to see what I'm working on. {maths}",
    "working": "I'm actually online! Check what I'm working on just below.",
    "idling": "I'm idling on my computer with {editor} running in background.",
    "maths": "I am probably doing some maths or sleeping.",
    "response": "The statistics are powered and saved by WakaTime.",
    "tooltip": {
      "online": "I'm online 👋",
      "offline": "I'm offline 🫥",
      "idling": "I'm sleeping 😴"
    },
    "started": "Started the {date} at {hour}",
    "secret": "Secret Project"
  },
  "fr": {
    "offline": "Je suis actuellement hors ligne. Revenez plus tard pour voir sur quoi je travaille. {maths}",
    "working": "Je suis actuellement en ligne ! Découvrez ce sur quoi je travaille juste en dessous.",
    "idling": "Je suis en veille sur mon ordinateur avec {editor} en arrière-plan.",
    "maths": "Je suis probablement en train de faire des maths ou en train de dormir.",
    "response": "Les statistiques sont propulsées et enregistrées par WakaTime.",
    "tooltip": {
      "online": "Je suis connecté 👋",
      "offline": "Je suis déconnecté 🫥",
      "idling": "Je dors 😴"
    },
    "started": "Commencé le {date} à {hour}",
    "secret": "Projet Secret"
  },
  "es": {
    "offline": "Ahora mismo estoy desconectado. Vuelve más tarde para ver en lo que estoy trabajando. {maths}",
    "working": "Estoy trabajando en línea. ¡Mira lo que estoy haciendo justo debajo!",
    "idling": "Estoy en reposo en mi ordenador con {editor} en segundo plano.",
    "maths": "Estoy probablemente haciendo matemáticas o durmiendo.",
    "response": "Las estadísticas son propulsadas y registradas por WakaTime.",
    "tooltip": {
      "online": "Estoy conectado 👋",
      "offline": "Estoy desconectado 🫥",
      "idling": "Estoy durmiendo 😴"
    },
    "started": "Comenzado el {date} a {hour}",
    "secret": "Proyecto Secreto"
  }
}
</i18n>
