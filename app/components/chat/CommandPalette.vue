<script lang="ts" setup>
const searchTerm = ref('')
const open = ref(false)

const { t } = useI18n({ useScope: 'local' })

const messages = computed(() => {
  return [
    {
      label: t('chat.theme.label'),
      kbds: ['T'],
      icon: 'i-ph-lightbulb-filament-duotone',
      prompt: t('chat.theme.prompt'),
    },
    {
      label: t('chat.language.label'),
      kbds: ['L'],
      icon: 'i-ph-translate-duotone',
      prompt: t('chat.language.prompt'),
    },
    {
      label: t('chat.activity.label'),
      icon: 'i-ph-activity',
      prompt: t('chat.activity.prompt'),
    },
    {
      label: t('chat.about.label'),
      icon: 'i-ph-person-arms-spread-duotone',
      prompt: t('chat.about.prompt'),
    },
    {
      label: t('chat.projects.label'),
      icon: 'i-ph-code-duotone',
      prompt: t('chat.projects.prompt'),
    },
    {
      label: t('chat.writings.label'),
      icon: 'i-ph-books-duotone',
      prompt: t('chat.writings.prompt'),
    },
    {
      label: t('chat.experiences.label'),
      icon: 'i-ph-briefcase-duotone',
      prompt: t('chat.experiences.prompt'),
    },
    {
      label: t('chat.skills.label'),
      icon: 'i-ph-rocket-duotone',
      prompt: t('chat.skills.prompt'),
    },
    {
      label: t('chat.stack.label'),
      icon: 'i-ph-stack-duotone',
      prompt: t('chat.stack.prompt'),
    },
    {
      label: t('chat.status.label'),
      icon: 'i-ph-warning-duotone',
      prompt: t('chat.status.prompt'),
    },
    {
      label: t('chat.resume.label'),
      icon: 'i-ph-address-book-duotone',
      prompt: t('chat.resume.prompt'),
    },
    {
      label: t('chat.contact.label'),
      icon: 'i-ph-envelope-duotone',
      prompt: t('chat.contact.prompt'),
    },
    {
      label: t('chat.hobbies.label'),
      icon: 'i-ph-heart-duotone',
      prompt: t('chat.hobbies.prompt'),
    },
    {
      label: t('chat.credits.label'),
      icon: 'i-ph-star-duotone',
      prompt: t('chat.credits.prompt'),
    },
  ]
})

function onSelect(event: any) {
  searchTerm.value = ''
  open.value = false
  // send Message
}
defineShortcuts({
  meta_enter: () => {
    open.value = !open.value
  },
})
</script>

<template>
  <nav class="fixed bottom-0 left-1/2 z-50 -translate-x-1/2 pb-4">
    <UFieldGroup>
      <UModal v-model:open="open">
        <UButton
          :label="t('buttons.new')"
          variant="solid"
          color="neutral"
          size="xl"
          icon="i-ph-paper-plane-tilt-duotone"
        >
          <template #trailing>
            <UKbd value="meta" />
            <UKbd value="enter" />
          </template>
        </UButton>

        <template #content>
          <UCommandPalette
            v-model:search-term="searchTerm"
            close
            :placeholder="t('buttons.new')"
            :groups="[{ id: 'messages', items: messages }]"
            @update:model-value="onSelect"
            @update:open="open = $event"
          >
            <template #footer>
              <div class="flex items-center justify-between gap-2">
                <UIcon name="i-simple-icons-nuxtdotjs" class="size-5 text-dimmed ml-1" />
                <div class="flex items-center gap-1">
                  <UButton color="neutral" variant="ghost" :label="t('cmd.send')" class="text-dimmed" size="xs">
                    <template #trailing>
                      <UKbd value="enter" />
                    </template>
                  </UButton>
                </div>
              </div>
            </template>
          </UCommandPalette>
        </template>
      </UModal>
      <UButton
        :label="t('buttons.clear')"
        variant="solid"
        color="error"
        leading-icon="i-ph-trash-duotone"
        size="xl"
      />
    </UFieldGroup>
  </nav>
</template>

<i18n lang="json">
{
  "en": {
    "buttons": {
      "new": "Send new message",
      "clear": "Clear conversation"
    },
    "cmd": {
      "send": "Send message"
    },
    "chat": {
      "theme": {
        "label": "Switch Theme",
        "prompt": ""
      },
      "language": {
        "label": "Change Language",
        "prompt": ""
      }
    }
  },
  "fr": {
    "buttons": {
      "new": "Envoyer un nouveau message",
      "clear": "Effacer la conversation"
    },
    "cmd": {
      "send": "Envoyer le message"
    },
    "chat": {
      "theme": {
        "label": "Changer de thème",
        "prompt": ""
      },
      "language": {
        "label": "Changer de langue",
        "prompt": ""
      }
    }
  },
  "es": {
    "buttons": {
      "new": "Enviar un nuevo mensaje",
      "clear": "Borrar conversación"
    },
    "cmd": {
      "send": "Enviar el mensaje"
    },
    "chat": {
      "theme": {
        "label": "Cambiar tema",
        "prompt": ""
      },
      "language": {
        "label": "Cambiar idioma",
        "prompt": ""
      }
    }
  }
}
</i18n>
