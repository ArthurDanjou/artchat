<script lang="ts" setup>
const { t, locale } = useI18n()
const date = (date: string) => useDateFormat(new Date(date), 'D MMM YYYY - hh:mm', { locales: locale.value ?? 'en' })
</script>

<template>
  <section class="space-y-4">
    <p class="prose dark:prose-invert">
      {{ t('tool.resume.main') }}
    </p>
    <div class="flex gap-4 m-1">
      <UCard variant="outline" class="md:max-w-1/2 shadow-sm bg-white dark:bg-neutral-900" :ui="{ body: 'flex justify-between items-center gap-4' }">
        <UCard class="rounded-sm" :ui="{ body: 'p-2 sm:p-2 flex items-center justify-center' }">
          <UIcon name="i-ph-file-pdf-duotone" size="48" />
        </UCard>
        <div>
          <p>File 1</p>
          <p class="text-muted">
            {{ t('tool.resume.uploaded') }} {{ date('2025-01-01') }}
          </p>
        </div>
      </UCard>
      <UCard variant="outline" class="md:max-w-1/2 shadow-sm bg-white dark:bg-neutral-900" :ui="{ body: 'flex justify-between items-center gap-4' }">
        <UCard class="rounded-sm" :ui="{ body: 'p-2 sm:p-2 flex items-center justify-center' }">
          <UIcon name="i-ph-file-pdf-duotone" size="48" />
        </UCard>
        <div>
          <p>File 2</p>
          <p class="text-muted">
            {{ t('tool.resume.uploaded') }} {{ date('2025-01-01') }}
          </p>
        </div>
      </UCard>
    </div>
  </section>
</template>
