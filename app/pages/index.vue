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
    <ChatCommandPalette
      v-motion
      :initial="{
        opacity: 0,
        y: 200,
        scale: 0.6,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          delay: 1600,
        },
      }"
    />
    <ChatMain />
    <div ref="parents" class="space-y-8 my-16 md:my-32">
      <ChatMessageContainer
        v-motion
        :initial="{
          opacity: 0,
          y: 200,
          scale: 0.6,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            delay: 800,
          },
        }"
        :message="{
          id: 0,
          content: 'main.question',
          sender: ChatSender.USER,
          state: ChatState.SENT,
          type: ChatType.INIT,
        }"
      />
      <ChatMessageContainer
        v-motion
        :initial="{
          opacity: 0,
          y: 200,
          scale: 0.6,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            delay: 1200,
          },
        }"
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
        v-motion
        :message="message"
        :initial="{
          opacity: 0,
          scale: 0.6,
        }"
        :enter="{
          opacity: 1,
          scale: 1,
        }"
      />
    </div>
  </main>
</template>
