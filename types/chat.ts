export enum ChatType {
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
}

export interface ChatMessage {
  id: number
  content: string
  sender: string
  type: ChatType
}
