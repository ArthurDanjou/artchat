<script lang="ts" setup>
import type { UsesItem } from '#components'

defineProps({
  item: {
    type: Object as PropType<typeof UsesItem>,
    required: true,
  },
})

const { locale } = useI18n()
</script>

<template>
  <li class="prose dark:prose-invert">
    <p class="text-base font-semibold">
      {{ item.name }}
    </p>
    <p class="text-sm">
      {{ locale === 'en' ? item.description.en : locale === 'es' ? item.description.es : item.description.fr }}
    </p>
  </li>
</template>
