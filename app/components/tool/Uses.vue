<script lang="ts" setup>
const { t } = useI18n()

const { data: items } = await useAsyncData('uses', async () => await queryCollection('uses').all())
const { data: categories } = await useAsyncData('categories', async () => await queryCollection('usesCategories').all())
</script>

<template>
  <section>
    <div class="prose dark:prose-invert">
      <p>{{ t('uses') }}</p>
    </div>
    <div v-if="items" class="space-y-12 mt-4">
      <UsesList v-for="category in categories" :key="category.id" :title="category.name">
        <UsesItem
          v-for="(item, id) in items.filter(item => item.category === String(category.meta.title).toLowerCase())"
          :key="id"
          :item="item"
        />
      </UsesList>
    </div>
  </section>
</template>
