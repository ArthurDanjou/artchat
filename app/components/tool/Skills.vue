<script lang="ts" setup>
const { data: skills } = await useAsyncData('skills', async () => await queryCollection('skills').first())

const { t, locale } = useI18n()
</script>

<template>
  <section>
    <div class="prose dark:prose-invert">
      <p>{{ t('skills.main') }}</p>
    </div>
    <div v-if="skills" class="space-y-12 m-1 my-4">
      <div v-for="category in skills.items" :key="category.id" class="space-y-8">
        <USeparator
          :label="locale === 'en' ? category.name.en : locale === 'es' ? category.name.es : category.name.fr"
          size="xs"
        />
        <div class="flex gap-3 flex-wrap">
          <UButton
            v-for="skill in category.items"
            :key="skill.id"
            :label="skill.name"
            variant="subtle"
            color="neutral"
            class="shadow-md"
            :icon="skill.icon"
          />
        </div>
      </div>
    </div>
  </section>
</template>
