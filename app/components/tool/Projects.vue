<script lang="ts" setup>
const { locale, locales, t } = useI18n()
const currentLocale = computed(() => locales.value.find(l => l.code === locale.value))

const { data: projects } = await useAsyncData('projects-index', async () => await queryCollection('projects').where('favorite', '=', true).select().all())
const date = (date: string) => useDateFormat(new Date(date), 'DD MMMM YYYY', { locales: currentLocale.value?.code ?? 'en' })
</script>

<template>
  <section>
    <PostAlert class="mb-2" />
    <div class="prose dark:prose-invert">
      <p>{{ t('tool.projects') }}</p>
    </div>
    <div v-if="projects" class="m-1 my-4 flex flex-col gap-4">
      <div v-for="project in projects" :key="project.id">
        <NuxtLink :to="`/projects/${project.slug}`">
          <UCard variant="subtle" class="shadow-md">
            <h1 class="text-xl font-medium">
              {{ project.title }}
            </h1>
            <h3 class="text-muted my-2">
              {{ project.description }}
            </h3>
            <div class="flex items-center justify-between">
              <p class="text-sm text-muted-foreground">
                {{ date(project.publishedAt).value }}
              </p>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in project.tags.sort((a: any, b: any) => a.localeCompare(b))"
                  :key="tag"
                  variant="soft"
                >
                  {{ tag }}
                </UBadge>
              </div>
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
