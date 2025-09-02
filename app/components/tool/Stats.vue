<script lang="ts" setup>
import type { Stats } from '~~/types'

const { data: stats } = await useAsyncData<Stats>('stats', () => $fetch('/api/stats'))

const { locale, locales, t } = useI18n({
  useScope: 'local',
})
const currentLocale = computed(() => locales.value.find(l => l.code === locale.value))

const time = useTimeAgo(new Date(stats.value!.coding.data.range.start) ?? new Date()).value.split(' ')[0]
const date = useDateFormat(new Date(stats.value!.coding.data.range.start ?? new Date()), 'DD MMMM YYYY', { locales: currentLocale.value?.code ?? 'en' })
const hours = usePrecision(stats.value!.coding.data.grand_total.total_seconds_including_other_language / 3600, 0)
</script>

<template>
  <section v-if="stats && stats.coding && stats.editors && stats.os && stats.languages && time && date && hours">
    <div class="prose dark:prose-invert">
      <i18n-t
        keypath="stats"
        tag="p"
      >
        <template #time>
          {{ time }}
        </template>
        <template #date>
          <HoverText
            :hover="t('tooltip.date')"
            :text="date"
          />
        </template>
        <template #hours>
          <HoverText
            :hover="t('tooltip.hours')"
            :text="hours"
          />
        </template>
      </i18n-t>
      <ul>
        <i18n-t
          keypath="editors"
          tag="li"
        >
          <template #editors>
            {{ stats.editors.data.slice(0, 2).map(editor => `${editor.name} (${editor.percent}%)`).join(t('separator')) }}
          </template>
        </i18n-t>
        <i18n-t
          keypath="os"
          tag="li"
        >
          <template
            v-if="stats.os.data[0]"
            #os
          >
            {{ stats.os.data[0].name }} ({{ stats.os.data[0].percent }}%)
          </template>
        </i18n-t>
        <i18n-t
          keypath="languages"
          tag="li"
        >
          <template #languages>
            {{ stats.languages.data.slice(0, 2).map(language => `${language.name} (${language.percent}%)`).join(t('separator')) }}
          </template>
        </i18n-t>
      </ul>
    </div>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "stats": "I collect some data for {time} years, started the {date}. I've coded for a total of {hours} hours.",
    "editors": "My top editors are {editors}",
    "os": "My best OS is {os}",
    "languages": "My favorite languages are {languages}",
    "separator": " and ",
    "tooltip": {
      "date": "That was so long ago 🫣",
      "hours": "That's a lot 😮"
    }
  },
  "fr": {
    "stats": "Je collecte des données depuis {time} ans, commencé le {date}. J'ai codé un total de {hours} heures.",
    "editors": "Mes meilleurs éditeurs sont {editors}",
    "os": "Mon meilleur OS est {os}",
    "languages": "Mes langages préférés sont {languages}",
    "separator": " et ",
    "tooltip": {
      "date": "C'était il y a si longtemps 🫣",
      "hours": "C'est beaucoup 😮"
    }
  },
  "es": {
    "stats": "Recopilo datos desde hace {time} años, empecé el {date}. He programado durante un total de {hours} horas.",
    "editors": "Mis mejores editores son {editors}.",
    "os": "Mi mejor OS es {os}.",
    "languages": "Mis lenguajes favoritos son {languages}.",
    "separator": " y ",
    "tooltip": {
      "date": "hace tato tiempo…🫣",
      "hours": "es mucho 😮"
    }
  }
}
</i18n>
