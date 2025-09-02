<script lang="ts" setup>
const { t } = useI18n({ useScope: 'local' })

const { data: items } = await useAsyncData('uses', async () => await queryCollection('uses').all())
const { data: categories } = await useAsyncData('categories', async () => await queryCollection('usesCategories').all())
</script>

<template>
  <section>
    <div class="prose dark:prose-invert">
      <p>{{ t('description') }}</p>
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

<i18n lang="json">
{
  "en": {
    "description": "Here is a comprehensive list of all the software I use, gadgets I love, and other things I recommend."
  },
  "fr": {
    "description": "Voici une grande liste de tous mes logiciels que j'utilise, gadgets que j'adore et autres choses que je recommande."
  },
  "es": {
    "description": "Aquí hay una gran lista de todo el software que uso, gadgets que amo y otras cosas que recomiendo."
  }
}
</i18n>
