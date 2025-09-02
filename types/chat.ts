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
  STACK = 'stack',
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
  THINKING = 'Thinking...',
  FETCHING = 'Fetching the data...',
  GENERATING = 'Generating the component...',
  DONE = 'Done!',
}

export interface ChatMessage {
  id: number
  content: string | null
  sender: ChatSender
  type: ChatType
  state: ChatState
  fetchStates?: ChatFetchState[]
}
