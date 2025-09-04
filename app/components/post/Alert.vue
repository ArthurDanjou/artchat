<script setup lang="ts">
const { t, locale } = useI18n()
</script>

<template>
  <h3
    v-if="locale !== 'en'"
  >
    ⚠️ {{ t('alert') }}
  </h3>
</template>
