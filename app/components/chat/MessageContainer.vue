<script lang="ts" setup>
import type { ChatMessage } from '~~/types'
import { ChatSender, ChatState, ChatType } from '~~/types'

const props = defineProps<{
  message: ChatMessage
}>()

const isArthur = computed(() => props.message.sender === ChatSender.ARTHUR)

const { t, locale, locales } = useI18n()
const currentLocale = computed(() => locales.value.find((l: { code: string }) => l.code === locale.value))
const formatted = computed(() => useDateFormat(useNow(), 'D MMMM YYYY, HH:mm', { locales: currentLocale.value?.code ?? 'en' }).value)
</script>

<template>
  <div v-if="!isArthur" class="group flex flex-col gap-2">
    <div class="flex flex-col-reverse md:flex-row-reverse items-end">
      <UCard
        variant="solid"
        class="rounded-xl mt-1 bg-sky-500 md:max-w-3/4 text-white font-medium"
        :ui="{ body: 'sm:p-2', header: 'sm:p-2', footer: 'sm:p-2' }"
      >
        {{ t(message.content || '') }}
      </UCard>
    </div>
    <div class="text-muted opacity-0 group-hover:opacity-80 duration-500 flex text-xs italic justify-end">
      {{ formatted }}
    </div>
  </div>
  <div v-else class="group space-y-2">
    <div class="flex flex-col-reverse gap-2 items-start md:flex-row-reverse">
      <UCard
        v-if="message.state === ChatState.LOADING && message.fetchStates && message.fetchStates.length > 0"
        variant="soft"
        class="mt-1 w-full bg-transparent"
        :ui="{ body: 'p-0 sm:p-0', header: 'p-0 sm:p-0', footer: 'p-0 sm:p-0' }"
      >
        <ChatLoading :fetch-states="message.fetchStates" :message-id="message.id" />
      </UCard>
      <UCard
        v-else
        variant="soft"
        class="mt-1 w-full bg-transparent"
        :ui="{ body: 'p-0 sm:p-0', header: 'p-0 sm:p-0', footer: 'p-0 sm:p-0' }"
      >
        <div v-if="message.type === ChatType.INIT">
          {{ t(message.content || '') }}
        </div>
        <div v-else-if="message.type === ChatType.DUPLICATED">
          <ToolDuplicated />
        </div>
        <div v-else-if="message.type === ChatType.THEME">
          <ToolTheme />
        </div>
        <div v-else-if="message.type === ChatType.USES">
          <ToolUses />
        </div>
        <div v-else-if="message.type === ChatType.LANGUAGE">
          <ToolLanguage />
        </div>
        <div v-else-if="message.type === ChatType.STATS">
          <ToolStats />
        </div>
        <div v-else-if="message.type === ChatType.ACTIVITY">
          <ToolActivity />
        </div>
        <div v-else-if="message.type === ChatType.CONTACT">
          <ToolContact />
        </div>
        <div v-else-if="message.type === ChatType.WEATHER">
          <ToolWeather />
        </div>
        <div v-else-if="message.type === ChatType.LOCATION">
          <ToolLocation />
        </div>
        <div v-else>
          {{ message }}
        </div>
      </UCard>
      <div class="flex items-center gap-2">
        <UAvatar src="/arthur.webp" size="lg" />
        <span class="md:hidden">Arthur DANJOU</span>
      </div>
    </div>
    <div class="text-muted opacity-0 group-hover:opacity-80 duration-500 flex text-xs italic justify-start ml-12">
      {{ formatted }}
    </div>
  </div>
</template>
