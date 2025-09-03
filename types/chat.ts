export enum ChatType {
  DUPLICATED = 'duplicated',
  WEATHER = 'weather',
  LOCATION = 'location',
  THEME = 'theme',
  LANGUAGE = 'language',
  ABOUT = 'about',
  PROJECTS = 'projects',
  WRITINGS = 'writings',
  EXPERIENCES = 'experiences',
  SKILLS = 'skills',
  HOBBIES = 'hobbies',
  USES = 'uses',
  STATUS = 'status',
  CREDITS = 'credits',
  CONTACT = 'contact',
  STATS = 'stats',
  ACTIVITY = 'activity',
  RESUME = 'resume',
  INIT = 'init',
}

export enum ChatState {
  SENT = 'sent',
  LOADING = 'loading',
}

export enum ChatSender {
  USER = 'user',
  ARTHUR = 'arthur',
}

export enum ChatFetchState {
  THINKING = 'chat.state.thinking',
  FETCHING = 'chat.state.fetching',
  GENERATING = 'chat.state.generating',
  DONE = 'chat.state.done',
}

export interface ChatMessage {
  id: number
  content: string | null
  sender: ChatSender
  type: ChatType
  state: ChatState
  fetchStates?: ChatFetchState[]
}

export const ChatMessages = [
  {
    id: 'interface',
    label: 'command.interface',
    items: [
      {
        label: 'command.theme.label',
        icon: 'i-ph-lightbulb-filament-duotone',
        prompt: 'command.theme.prompt',
        type: ChatType.THEME,
        fetchStates: [ChatFetchState.THINKING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.language.label',
        icon: 'i-ph-translate-duotone',
        prompt: 'command.language.prompt',
        type: ChatType.LANGUAGE,
        fetchStates: [ChatFetchState.THINKING, ChatFetchState.GENERATING],
      },
    ],
  },
  {
    id: 'actions',
    label: 'command.actions',
    items: [
      {
        label: 'command.location.label',
        icon: 'i-ph-map-pin-area-duotone',
        prompt: 'command.location.prompt',
        type: ChatType.LOCATION,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.stats.label',
        icon: 'i-ph-projector-screen-chart-duotone',
        prompt: 'command.stats.prompt',
        type: ChatType.STATS,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.weather.label',
        icon: 'i-ph-cloud-rain-duotone',
        prompt: 'command.weather.prompt',
        type: ChatType.WEATHER,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.activity.label',
        icon: 'i-ph-activity',
        prompt: 'command.activity.prompt',
        type: ChatType.ACTIVITY,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.status.label',
        icon: 'i-ph-warning-duotone',
        prompt: 'command.status.prompt',
        type: ChatType.STATUS,
        fetchStates: [ChatFetchState.FETCHING],
      },
    ].sort((a, b) => a.label.localeCompare(b.label)),
  },
  {
    id: 'arthur',
    label: 'command.arthur',
    items: [
      {
        label: 'command.credits.label',
        icon: 'i-ph-star-duotone',
        prompt: 'command.credits.prompt',
        type: ChatType.CREDITS,
      },
      {
        label: 'command.about.label',
        icon: 'i-ph-person-arms-spread-duotone',
        prompt: 'command.about.prompt',
        type: ChatType.ABOUT,
      },
      {
        label: 'command.projects.label',
        icon: 'i-ph-code-duotone',
        prompt: 'command.projects.prompt',
        type: ChatType.PROJECTS,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.writings.label',
        icon: 'i-ph-books-duotone',
        prompt: 'command.writings.prompt',
        type: ChatType.WRITINGS,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.experiences.label',
        icon: 'i-ph-briefcase-duotone',
        prompt: 'command.experiences.prompt',
        type: ChatType.EXPERIENCES,
      },
      {
        label: 'command.skills.label',
        icon: 'i-ph-rocket-duotone',
        prompt: 'command.skills.prompt',
        type: ChatType.SKILLS,
        fetchStates: [ChatFetchState.FETCHING],
      },
      {
        label: 'command.resume.label',
        icon: 'i-ph-address-book-duotone',
        prompt: 'command.resume.prompt',
        type: ChatType.RESUME,
      },
      {
        label: 'command.contact.label',
        icon: 'i-ph-envelope-duotone',
        prompt: 'command.contact.prompt',
        type: ChatType.CONTACT,
      },
      {
        label: 'command.hobbies.label',
        icon: 'i-ph-heart-duotone',
        prompt: 'command.hobbies.prompt',
        type: ChatType.HOBBIES,
      },
      {
        label: 'command.uses.label',
        icon: 'i-ph-chalkboard-simple-duotone',
        prompt: 'command.uses.prompt',
        type: ChatType.USES,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
      },
    ].sort((a, b) => a.label.localeCompare(b.label)),
  },
]
