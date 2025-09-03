<script lang="ts" setup>
import { ChatSender, ChatState, ChatType } from '~~/types'

useSeoMeta({
  title: 'Arthur Danjou - AI enjoyer and Maths student',
  description: 'Developer enjoying Artificial Intelligence and Machine Learning. Mathematics Student at Paris Dauphine-PSL University specialised in Statistics',
})

const { messages } = useChatStore()
const parents = useTemplateRef('parents')
const { height } = useElementBounding(parents)

watch(
  height,
  async () => {
    await nextTick()
    window.scrollTo({ top: parents.value?.scrollHeight, behavior: 'smooth' })
  },
)
</script>

<template>
  <main class="!max-w-none">
    <ChatCommandPalette />
    <div ref="parents" class="space-y-8 my-32">
      <ChatMessageContainer
        :message="{
          content: 'main.init',
          id: 0,
          sender: ChatSender.ARTHUR,
          state: ChatState.SENT,
          type: ChatType.INIT,
        }"
      />
      <ChatMessageContainer
        :message="{
          id: 0,
          content: 'main.question',
          sender: ChatSender.USER,
          state: ChatState.SENT,
          type: ChatType.INIT,
        }"
      />
      <ChatMessageContainer
        :message="{
          content: 'main.about',
          id: 0,
          sender: ChatSender.ARTHUR,
          state: ChatState.SENT,
          type: ChatType.INIT,
        }"
      />
      <ChatMessageContainer
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>
  </main>
</template>
