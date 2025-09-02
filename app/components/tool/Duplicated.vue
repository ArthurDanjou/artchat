<script lang="ts" setup>
const { t } = useI18n({ useScope: 'local' })
</script>

<template>
  <section class="prose dark:prose-invert">
    <h3>{{ t('duplicated.title') }}</h3>
    <p>{{ t('duplicated.description') }}</p>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "duplicated": {
      "title": "⚠️ I detected duplicated messages",
      "description": "I have therefore removed the older duplicated messages to lighten the application."
    }
  },
  "fr": {
    "duplicated": {
      "title": "⚠️ J'ai détecté des messages dupliqués",
      "description": "J'ai donc supprimé les anciens messages dupliqués pour alléger l'application."
    }
  },
  "es": {
    "duplicated": {
      "title": "⚠️ He detectado mensajes duplicados",
      "description": "Por lo tanto, eliminé los mensajes duplicados más antiguos para aligerar la aplicación."
    }
  }
}
</i18n>
