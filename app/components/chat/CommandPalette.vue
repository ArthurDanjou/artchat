<script lang="ts" setup>
import type { CommandPaletteItem } from '@nuxt/ui'
import { ChatState } from '~~/types'

const searchTerm = ref('')
const openMessageModal = ref(false)
const openClearModal = ref(false)

const { t } = useI18n({ useScope: 'local' })

const { messages, submitMessage } = useChat(t)

const { clearMessages, messages: storeMessages } = useChatStore()
const loading = computed(() => storeMessages.some(msg => msg.state === ChatState.LOADING))
function handleDelete() {
  clearMessages()
  openClearModal.value = false
}

function onSelect(item: CommandPaletteItem) {
  searchTerm.value = ''
  openMessageModal.value = false
  submitMessage(item.type, item.prompt, item.fetchStates ?? [])
}
defineShortcuts({
  meta_enter: () => {
    openMessageModal.value = !openMessageModal.value
  },
  meta_d: () => {
    openClearModal.value = !openClearModal.value
  },
})

const modalUi = {
  content: 'bg-default-30 dark:bg-default/70 backdrop-blur-xl border border-accented/70 max-w-2xl h-100 flex flex-col shadow-raycast',
}

const commandPaletteUi = {
  root: 'flex flex-col h-full',
  label: 'text-muted font-medium',
  item: 'data-highlighted:not-data-disabled:before:bg-muted',
  content: 'flex-1 overflow-y-auto',
}
</script>

<template>
  <nav class="fixed bottom-0 left-1/2 z-50 -translate-x-1/2 pb-8">
    <UFieldGroup>
      <UModal v-model:open="openMessageModal" :ui="modalUi">
        <UButton
          :label="loading ? t('cmd.sending') : t('cmd.send')"
          variant="solid"
          color="neutral"
          size="xl"
          icon="i-ph-paper-plane-tilt-duotone"
          class="rounded-full"
          :disabled="loading"
        >
          <template #trailing>
            <UKbd value="meta" />
            <UKbd value="enter" />
          </template>
        </UButton>

        <template #content>
          <UCommandPalette
            close
            :ui="commandPaletteUi"
            :groups="messages"
            @update:model-value="onSelect"
            @update:open="openMessageModal = $event"
          >
            <template #item="{ item }">
              <div class="relative flex items-center justify-between w-full p-1">
                <div class="absolute inset-0 -m-1" />
                <div class="flex items-center gap-2.5">
                  <div class="flex items-center gap-2.5">
                    <UIcon :name="item.icon!" size="20" />
                    <span>{{ item.label }}</span>
                  </div>
                </div>
                <span class="text-muted text-xs font-medium">
                  {{ item.prompt }}
                </span>
              </div>
            </template>
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
      <UModal
        v-model:open="openClearModal"
        :title="t('clear.title')"
        :description="t('clear.description')"
      >
        <UButton
          :label="t('clear.button')"
          variant="solid"
          color="error"
          leading-icon="i-ph-trash-duotone"
          size="xl"
          class="rounded-full"
          :disabled="storeMessages.length === 0"
        >
          <template #trailing>
            <UKbd value="meta" />
            <UKbd value="D" />
          </template>
        </UButton>

        <template #footer="{ close }">
          <UFieldGroup>
            <UButton :label="t('clear.cancel')" color="neutral" variant="outline" @click="close" />
            <UButton :label="t('clear.submit')" color="error" @click.prevent="handleDelete()" />
          </UFieldGroup>
        </template>
      </UModal>
    </UFieldGroup>
  </nav>
</template>

<i18n lang="json">
{
  "en": {
    "clear": {
      "button": "Clear",
      "cancel": "Cancel",
      "submit": "Delete",
      "title": "Are you sure you want to delete this conversation?",
      "description": "This action cannot be undone."
    },
    "cmd": {
      "send": "Send message",
      "sending": "Sending..."
    },
    "chat": {
        "action": "Components",
        "arthur": "More about Arthur",
        "interface": "Change the interface",
        "theme": {
            "label": "Change theme",
            "prompt": "How can I change the theme?"
        },
        "stats": {
          "label": "View statistics",
          "prompt": "How can I view the statistics concerning Arthur?"
        },
        "weather": {
          "label": "View weather",
          "prompt": "How can I view the weather conditions near Arthur?"
        },
        "location": {
            "label": "View location",
            "prompt": "How can I view the location of Arthur?"
        },
        "language": {
            "label": "Change language",
            "prompt": "How can I change the chat language?"
        },
        "activity": {
            "label": "Activity",
            "prompt": "What are you currently doing?"
        },
        "about": {
            "label": "About Arthur",
            "prompt": "I want you to tell me about yourself."
        },
        "projects": {
            "label": "Projects",
            "prompt": "Tell me about your projects."
        },
        "writings": {
            "label": "Writings",
            "prompt": "What are your latest articles?"
        },
        "experiences": {
            "label": "Experiences",
            "prompt": "What experiences do you have in your career?"
        },
        "skills": {
            "label": "Skills",
            "prompt": "What are your skills?"
        },
        "stack": {
            "label": "Tech Stack",
            "prompt": "What tech stack are you currently using?"
        },
        "status": {
            "label": "Homelab status",
            "prompt": "I saw you have a homelab, is it currently working?"
        },
        "resume": {
            "label": "Resume",
            "prompt": "Can you send me your resume?"
        },
        "contact": {
            "label": "Contact",
            "prompt": "How can I contact you?"
        },
        "hobbies": {
            "label": "Hobbies and passions",
            "prompt": "What are your hobbies? Your passions? Your interests?"
        },
        "credits": {
            "label": "Credits",
            "prompt": "How is this chat made?"
        }
    }
  },
  "fr": {
    "clear": {
      "button": "Effacer",
      "cancel": "Annuler",
      "submit": "Supprimer",
      "title": "Êtes-vous sûr de vouloir supprimer cette conversation ?",
      "description": "Cette action ne peut pas être annulée."
    },
    "cmd": {
      "send": "Envoyer le message",
      "sending": "Envoi..."
    },
    "chat": {
      "action": "Composants",
      "arthur": "En savoir plus sur Arthur",
      "interface": "Changer l'interface",
      "theme": {
        "label": "Changer de thème",
        "prompt": "Comment puis-je changer le thème ?"
      },
      "stats": {
        "label": "Voir les statistiques",
        "prompt": "Comment puis-je voir les statistiques concernant Arthur ?"
      },
      "weather": {
        "label": "Voir la météo",
        "prompt": "Comment puis-je voir les conditions météorologiques près d'Arthur ?"
      },
      "location": {
        "label": "Voir la localisation",
        "prompt": "Comment puis-je voir la localisation d'Arthur ?"
      },
      "language": {
        "label": "Changer de langue",
        "prompt": "Comment puis-je changer la langue du chat ?"
      },
      "activity": {
        "label": "Activité",
        "prompt": "Que fais-tu actuellement ?"
      },
      "about": {
        "label": "A propos d'Arthur",
        "prompt": "Je veux que tu me parles de toi."
      },
      "projects": {
        "label": "Projets",
        "prompt": "Je veux que tu me parles de tes projets."
      },
      "writings": {
        "label": "Écrits",
        "prompt": "Quels sont tes derniers articles ?"
      },
      "experiences": {
        "label": "Expériences",
        "prompt": "Quelles expériences as-tu lors de ta carrière ?"
      },
      "skills": {
        "label": "Compétences",
        "prompt": "Quelles sont tes compétences ?"
      },
      "stack": {
        "label": "Tech Stack",
        "prompt": "Quelle est stack technique utilises-tu en ce moment ?"
      },
      "status": {
        "label": "Statut du homelab",
        "prompt": "J'ai vu que tu avais un homelab, est-il actuellement fonctionnel ?"
      },
      "resume": {
        "label": "CV",
        "prompt": "Peux-tu m'envoyer ton CV ?"
      },
      "contact": {
        "label": "Contact",
        "prompt": "Comment puis-je te contacter ?"
      },
      "hobbies": {
        "label": "Loisirs et passions",
        "prompt": "Quels sont tes loisirs ? Tes passions ? Tes intérêts ?"
      },
      "credits": {
        "label": "Crédits",
        "prompt": "Comment est réalisé ce chat ?"
      }
    }
  },
  "es": {
    "clear": {
      "button": "Borrar",
      "cancel": "Cancelar",
      "submit": "Eliminar",
      "title": "¿Estás seguro de que deseas eliminar esta conversación?",
      "description": "Esta acción no se puede deshacer."
    },
    "cmd": {
      "send": "Enviar el mensaje",
      "sending": "Enviando..."
    },
    "chat": {
        "action": "Componentes",
        "arthur": "Más sobre Arthur",
        "interface": "Cambiar la interfaz",
        "theme": {
            "label": "Cambiar tema",
            "prompt": "¿Cómo puedo cambiar el tema?"
        },
        "stats": {
            "label": "Ver estadísticas",
            "prompt": "¿Cómo puedo ver las estadísticas sobre Arthur?"
        },
        "weather": {
            "label": "Ver el clima",
            "prompt": "¿Cómo puedo ver las condiciones climáticas cerca de Arthur?"
        },
        "location": {
            "label": "Ver ubicación",
            "prompt": "¿Cómo puedo ver la ubicación de Arthur?"
        },
        "language": {
            "label": "Cambiar idioma",
            "prompt": "¿Cómo puedo cambiar el idioma del chat?"
        },
        "activity": {
            "label": "Actividad",
            "prompt": "¿Qué estás haciendo actualmente?"
        },
        "about": {
            "label": "Sobre Arthur",
            "prompt": "Quiero que me hables de ti."
        },
        "projects": {
            "label": "Proyectos",
            "prompt": "Háblame de tus proyectos."
        },
        "writings": {
            "label": "Escritos",
            "prompt": "¿Cuáles son tus últimos artículos?"
        },
        "experiences": {
            "label": "Experiencias",
            "prompt": "¿Qué experiencias tienes en tu carrera?"
        },
        "skills": {
            "label": "Habilidades",
            "prompt": "¿Cuáles son tus habilidades?"
        },
        "stack": {
            "label": "Stack tecnológico",
            "prompt": "¿Qué stack tecnológico estás usando actualmente?"
        },
        "status": {
            "label": "Estado del homelab",
            "prompt": "Vi que tienes un homelab, ¿está funcionando actualmente?"
        },
        "resume": {
            "label": "CV",
            "prompt": "¿Puedes enviarme tu CV?"
        },
        "contact": {
            "label": "Contacto",
            "prompt": "¿Cómo puedo contactarte?"
        },
        "hobbies": {
            "label": "Pasatiempos y pasiones",
            "prompt": "¿Cuáles son tus pasatiempos? ¿Tus pasiones? ¿Tus intereses?"
        },
        "credits": {
            "label": "Créditos",
            "prompt": "¿Cómo se ha hecho este chat?"
        }
    }
  }
}
</i18n>
