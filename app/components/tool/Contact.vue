<script lang="ts" setup>
import { socials } from '~~/types'

const { t } = useI18n()
</script>

<template>
  <section>
    <div>
      <p class="prose dark:prose-invert">
        {{ t('tool.contact') }}
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
