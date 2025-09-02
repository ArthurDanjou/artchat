import type { ChatMessage } from '~~/types'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])
  let id = 0

  function addMessage(message: ChatMessage) {
    messages.value.push({ ...message, id: id++ })
  }

  function clearMessages() {
    messages.value = []
    id = 0
  }

  return { messages, addMessage, clearMessages }
})
