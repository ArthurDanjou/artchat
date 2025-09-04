<script lang="ts" setup>
import type { ChatMessage } from '~~/types'
import { ChatSender, ChatState, ChatType } from '~~/types'

const props = defineProps<{
  message: ChatMessage
}>()

const isArthur = computed(() => props.message.sender === ChatSender.ARTHUR)

const { t, locale, locales } = useI18n()
const currentLocale = computed(() => locales.value.find(l => l.code === locale.value))
const formatted = computed(() => useDateFormat(useNow(), 'D MMMM YYYY, HH:mm', { locales: currentLocale.value?.code ?? 'en' }).value)
</script>

<template>
  <div v-if="!isArthur" class="group flex flex-col gap-2 duration-200">
    <div class="flex flex-col-reverse md:flex-row-reverse items-end">
      <UCard
        variant="solid"
        class="rounded-xl mt-1 bg-sky-600 text-neutral-100 md:max-w-3/4 font-medium"
        :ui="{ body: 'sm:p-2', header: 'sm:p-2', footer: 'sm:p-2' }"
      >
        {{ t(message.content || '') }}
      </UCard>
    </div>
    <div class="text-muted opacity-0 group-hover:opacity-80 duration-500 flex text-xs italic justify-end">
      {{ formatted }}
    </div>
  </div>
  <div v-else class="group space-y-2 duration-200 relative">
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
        class="mt-1 w-full max-w-none bg-transparent"
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
        <div v-else-if="message.type === ChatType.HARDWARE">
          <ToolUses category="hardware" />
        </div>
        <div v-else-if="message.type === ChatType.SOFTWARE">
          <ToolUses category="software" />
        </div>
        <div v-else-if="message.type === ChatType.HOMELAB">
          <ToolUses category="homelab" />
        </div>
        <div v-else-if="message.type === ChatType.IDE">
          <ToolUses category="ide" />
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
        <div v-else-if="message.type === ChatType.SKILLS">
          <ToolSkills />
        </div>
        <div v-else-if="message.type === ChatType.PROJECTS">
          <ToolProjects />
        </div>
        <div v-else>
          {{ message }}
        </div>
      </UCard>
      <div class="flex items-center gap-2 lg:absolute lg:-left-12">
        <UAvatar src="/arthur.webp" size="lg" class="shadow-lg" />
        <span class="md:hidden">Arthur DANJOU</span>
      </div>
    </div>
    <div class="text-muted opacity-0 group-hover:opacity-80 duration-500 flex text-xs italic justify-start">
      {{ formatted }}
    </div>
  </div>
</template>
