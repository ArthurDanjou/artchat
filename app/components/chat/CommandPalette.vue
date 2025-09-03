<script lang="ts" setup>
import type { CommandPaletteItem } from '@nuxt/ui'
import { ChatState } from '~~/types'

const searchTerm = ref('')
const openMessageModal = ref(false)
const openClearModal = ref(false)

const { t, locale, locales, setLocale } = useI18n()

const { messages, submitMessage } = useChat()
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

const currentLocale = computed(() => locales.value.filter(l => l.code === locale.value)[0])

async function changeLocale() {
  await setLocale(currentLocale.value!.code === 'en' ? 'fr' : currentLocale.value!.code === 'fr' ? 'es' : 'en')
}

const { isDark, toggleDark } = useTheme()
defineShortcuts({
  meta_enter: () => {
    openMessageModal.value = !openMessageModal.value
  },
  meta_d: () => {
    openClearModal.value = !openClearModal.value
  },
  l: () => changeLocale(),
  t: () => toggleDark({ clientX: window.innerWidth, clientY: 0 }),
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
    <UCard variant="subtle" class="rounded-xl bg-neutral-100 dark:bg-neutral-800 shadow-lg" :ui="{ body: 'p-2 sm:p-2 flex gap-2' }">
      <UFieldGroup>
        <UModal v-model:open="openMessageModal" :ui="modalUi" title="Hey" description="Hey">
          <UButton
            :label="loading ? t('palette.cmd.sending') : t('palette.cmd.send')"
            variant="outline"
            color="neutral"
            size="xl"
            icon="i-ph-paper-plane-tilt-duotone"
            class="rounded-lg cursor-pointer"
            :disabled="loading"
          >
            <template #trailing>
              <UKbd value="meta" color="info" />
              <UKbd value="enter" color="info" />
            </template>
          </UButton>

          <template #content>
            <UCommandPalette
              close
              :ui="commandPaletteUi"
              :groups="messages"
              :autofocus="false"
              icon="i-ph-paper-plane-tilt-duotone"
              :placeholder="t('palette.cmd.placeholder')"
              @update:model-value="onSelect"
              @update:open="openMessageModal = $event"
            >
              <template #item="{ item }">
                <div class="relative flex flex-col sm:flex-row sm:justify-between sm:items-center w-full cursor-pointer my-1">
                  <div class="absolute inset-0 -m-1" />
                  <div class="flex items-center gap-2.5">
                    <UIcon :name="item.icon!" size="20" />
                    <span>{{ t(item.label) }}</span>
                  </div>
                  <div class="text-muted text-xs font-medium">
                    {{ t(item.prompt) }}
                  </div>
                </div>
              </template>
              <template #group-arthur="{ group }">
                <div>
                  {{ t(group) }}
                </div>
              </template>
              <template #footer>
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-1">
                    <UIcon name="i-simple-icons-nuxtdotjs" class="size-5 ml-1 text-green-500" />
                    <p class="text-xs font-medium text-dimmed">
                      {{ t('main.powered') }}
                    </p>
                  </div>
                  <div class="flex items-center gap-1">
                    <UButton color="neutral" variant="ghost" :label="t('palette.cmd.send')" class="text-dimmed" size="xs">
                      <template #trailing>
                        <UKbd value="enter" color="info" />
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
          :title="t('palette.clear.title')"
          :description="t('palette.clear.description')"
        >
          <UButton
            variant="subtle"
            color="error"
            leading-icon="i-ph-trash-duotone"
            size="xl"
            class="rounded-lg"
            :class="storeMessages.length !== 0 ? 'cursor-pointer' : 'cursor-default'"
            :disabled="storeMessages.length === 0"
          />

          <template #footer="{ close }">
            <UFieldGroup>
              <UButton :label="t('palette.clear.cancel')" color="neutral" variant="outline" @click="close" />
              <UButton :label="t('palette.clear.submit')" color="error" @click.prevent="handleDelete()" />
            </UFieldGroup>
          </template>
        </UModal>
      </UFieldGroup>
      <ClientOnly>
        <UFieldGroup>
          <UButton
            :icon="isDark ? 'i-ph-moon-duotone' : 'i-ph-sun-duotone'"
            color="neutral"
            variant="outline"
            size="xl"
            @click.prevent="toggleDark"
          />
          <UButton
            icon="i-ph-translate-duotone"
            color="neutral"
            variant="outline"
            size="xl"
            @click.prevent="changeLocale"
          />
        </UFieldGroup>
      </ClientOnly>
    </UCard>
  </nav>
</template>
