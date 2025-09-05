<script lang="ts" setup>
const { t } = useI18n()

interface ResumeFile {
  name: string
  file: string
}

const resumes = ref<ResumeFile[]>([
  {
    name: t('tool.resume.files.en'),
    file: '/resumes/CV M1 2025.pdf',
  },
  {
    name: t('tool.resume.files.fr'),
    file: '/resumes/CV M1 2025 Français.pdf',
  },
])
</script>

<template>
  <section class="space-y-4">
    <p class="prose dark:prose-invert">
      {{ t('tool.resume.main') }}
    </p>
    <div class="flex flex-wrap gap-4 m-1">
      <NuxtLink
        v-for="resume in resumes"
        :key="resume.file"
        :to="resume.file"
        target="_blank"
        class="md:max-w-1/2 w-full"
      >
        <UCard
          variant="outline"
          class="w-full shadow-sm bg-white dark:bg-neutral-900"
          :ui="{ body: 'w-full flex justify-between items-center gap-4' }"
        >
          <UCard class="rounded-sm" :ui="{ body: 'p-2 sm:p-2 flex items-center justify-center' }">
            <UIcon name="i-ph-file-pdf-duotone" size="48" />
          </UCard>
          <p>
            {{ resume.name }} - {{ t('tool.resume.files.pdf') }}
          </p>
        </UCard>
      </NuxtLink>
    </div>
  </section>
</template>
