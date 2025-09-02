import type { ChatMessage, ChatType } from '~~/types'
import { ChatFetchState, ChatSender, ChatState } from '~~/types'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])
  let id = 0

  const canSend = computed(() => {
    return !messages.value.some(msg => msg.state === ChatState.LOADING)
  })

  function addMessage(type: ChatType, content: string, sender: ChatSender, fetchStates: ChatFetchState[]) {
    if (sender === ChatSender.ARTHUR) {
      const message: ChatMessage = {
        id: id++,
        type,
        content: null,
        sender,
        state: ChatState.LOADING,
        fetchStates: [...fetchStates, ChatFetchState.DONE],
      }

      messages.value.push(message)
    }
    else {
      messages.value.push({
        id: id++,
        type,
        content,
        sender,
        state: ChatState.SENT,
        fetchStates: [ChatFetchState.DONE],
      })
    }
  }

  function clearMessages() {
    messages.value.splice(0, messages.value.length)
    id = 0
  }

  function setLoadingState(messageId: number, loadingState: ChatState) {
    const message = messages.value.find(msg => msg.id === messageId)
    if (message) {
      message.state = loadingState
    }
  }

  return { messages, addMessage, clearMessages, canSend, setLoadingState }
})
