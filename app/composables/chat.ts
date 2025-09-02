import { ChatFetchState, ChatSender, ChatType } from '~~/types/chat'

export function useChat(t: any) {
  const messages = computed(() => {
    return [
      {
        id: 'interface',
        label: t('chat.interface'),
        items: [
          {
            label: t('chat.theme.label'),
            icon: 'i-ph-lightbulb-filament-duotone',
            prompt: t('chat.theme.prompt'),
            type: ChatType.THEME,
            fetchStates: [ChatFetchState.THINKING, ChatFetchState.GENERATING],
          },
          {
            label: t('chat.language.label'),
            icon: 'i-ph-translate-duotone',
            prompt: t('chat.language.prompt'),
            type: ChatType.LANGUAGE,
            fetchStates: [ChatFetchState.THINKING, ChatFetchState.GENERATING],
          },
        ],
      },
      {
        id: 'actions',
        label: t('chat.actions'),
        items: [
          {
            label: t('chat.location.label'),
            icon: 'i-ph-map-pin-area-duotone',
            prompt: t('chat.location.prompt'),
            type: ChatType.LOCATION,
            fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
          },
          {
            label: t('chat.stats.label'),
            icon: 'i-ph-projector-screen-chart-duotone',
            prompt: t('chat.stats.prompt'),
            type: ChatType.STATS,
            fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
          },
          {
            label: t('chat.weather.label'),
            icon: 'i-ph-cloud-rain-duotone',
            prompt: t('chat.weather.prompt'),
            type: ChatType.WEATHER,
            fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
          },
          {
            label: t('chat.activity.label'),
            icon: 'i-ph-activity',
            prompt: t('chat.activity.prompt'),
            type: ChatType.ACTIVITY,
            fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
          },
          {
            label: t('chat.status.label'),
            icon: 'i-ph-warning-duotone',
            prompt: t('chat.status.prompt'),
            type: ChatType.STATUS,
            fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
          },
        ].sort((a, b) => a.label.localeCompare(b.label)),
      },
      {
        id: 'arthur',
        label: t('chat.arthur'),
        items: [
          {
            label: t('chat.credits.label'),
            icon: 'i-ph-star-duotone',
            prompt: t('chat.credits.prompt'),
            type: ChatType.CREDITS,
          },
          {
            label: t('chat.about.label'),
            icon: 'i-ph-person-arms-spread-duotone',
            prompt: t('chat.about.prompt'),
            type: ChatType.ABOUT,
          },
          {
            label: t('chat.projects.label'),
            icon: 'i-ph-code-duotone',
            prompt: t('chat.projects.prompt'),
            type: ChatType.PROJECTS,
            fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
          },
          {
            label: t('chat.writings.label'),
            icon: 'i-ph-books-duotone',
            prompt: t('chat.writings.prompt'),
            type: ChatType.WRITINGS,
            fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
          },
          {
            label: t('chat.experiences.label'),
            icon: 'i-ph-briefcase-duotone',
            prompt: t('chat.experiences.prompt'),
            type: ChatType.EXPERIENCES,
          },
          {
            label: t('chat.skills.label'),
            icon: 'i-ph-rocket-duotone',
            prompt: t('chat.skills.prompt'),
            type: ChatType.SKILLS,
          },
          {
            label: t('chat.stack.label'),
            icon: 'i-ph-stack-duotone',
            prompt: t('chat.stack.prompt'),
            type: ChatType.STACK,
          },
          {
            label: t('chat.resume.label'),
            icon: 'i-ph-address-book-duotone',
            prompt: t('chat.resume.prompt'),
            type: ChatType.RESUME,
          },
          {
            label: t('chat.contact.label'),
            icon: 'i-ph-envelope-duotone',
            prompt: t('chat.contact.prompt'),
            type: ChatType.CONTACT,
          },
          {
            label: t('chat.hobbies.label'),
            icon: 'i-ph-heart-duotone',
            prompt: t('chat.hobbies.prompt'),
            type: ChatType.HOBBIES,
          },

        ].sort((a, b) => a.label.localeCompare(b.label)),
      },
    ]
  })

  const { addMessage } = useChatStore()

  async function submitMessage(type: ChatType, prompt: string, fetchStates: ChatFetchState[]) {
    addMessage(
      type,
      prompt,
      ChatSender.USER,
      [],
    )
    await new Promise(resolve => setTimeout(resolve, 700))
    addMessage(
      type,
      '',
      ChatSender.ARTHUR,
      fetchStates,
    )
  }

  return {
    messages,
    submitMessage,
  }
}
