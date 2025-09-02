<script lang="ts" setup>
import { ChatSender, ChatState, ChatType } from '~~/types'

useSeoMeta({
  title: 'Arthur Danjou - AI enjoyer and Maths student',
  description: 'Developer enjoying Artificial Intelligence and Machine Learning. Mathematics Student at Paris Dauphine-PSL University specialised in Statistics',
})

const { messages } = useChatStore()
const { t } = useI18n({ useScope: 'local' })

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
          content: t('init'),
          id: 0,
          sender: ChatSender.ARTHUR,
          state: ChatState.SENT,
          type: ChatType.INIT,
        }"
      />
      <ChatMessageContainer
        :message="{
          id: 0,
          content: t('question'),
          sender: ChatSender.USER,
          state: ChatState.SENT,
          type: ChatType.INIT,
        }"
      />
      <ChatMessageContainer
        :message="{
          content: t('about'),
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

<i18n lang="json">
{
  "en": {
    "init": "Hey, welcome to ArtChat. I'm an AI assistant that knows everything about Arthur Danjou. Ask me anything and I'll answer as if I were him!",
    "question": "Awesome! Tell me a bit more about you.",
    "about": "I'm a student in Mathematics and Statistics at Université Paris-Dauphine in France. With a deep understanding of emerging technologies, I'm at the heart of a rapidly expanding field. My background in mathematics gives me an edge in understanding the concepts and theories behind these technologies and designing them effectively."
  },
  "fr": {

    "init": "Salut, bienvenue sur ArtChat. Je suis un assistant IA connaissant tout sur Arthur Danjou. Pose moi des questions et j'y répondrai comme si j'étais lui.",
    "question": "Génial ! Parle moi un peu plus de toi.",
    "about": "Je suis étudiant en Mathématiques et en Statistiques à l'Université Paris-Dauphine en France. Avec une compréhension approfondie des technologies émergentes, je suis au cœur d'un domaine en pleine expansion. Mon parcours en mathématiques me donne un avantage pour comprendre les concepts et les théories derrière ces technologies et pour les concevoir efficacement."
  },
  "es": {
    "init": "Hola, bienvenido a ArtChat. Soy un asistente de IA que sabe todo sobre Arthur Danjou. Hazme preguntas y responderé como si fuera él.",
    "question": "¡Genial! Háblame un poco más sobre ti.",
    "about": "Soy estudiante de Matemáticas y Estadísticas en la Universidad Paris-Dauphine en Francia. Con una comprensión profunda de las tecnologías emergentes, estoy en el corazón de un campo en rápida expansión. Mi formación en matemáticas me da una ventaja para comprender los conceptos y teorías detrás de estas tecnologías y para diseñarlas de manera efectiva."
  }
}
</i18n>
