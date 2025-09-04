<script setup lang="ts">
const { t, locale } = useI18n()
const closed = ref(false)
</script>

<template>
  <UAlert
    v-if="locale !== 'en' && !closed"
    :description="t('alert.description')"
    :title="t('alert.title')"
    color="error"
    icon="i-ph-warning-duotone"
    variant="soft"
    :close="{
      color: 'error',
    }"
    @update:open="closed = true"
  />
</template>
