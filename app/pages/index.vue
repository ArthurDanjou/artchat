<script lang="ts" setup>
useSeoMeta({
  title: 'Arthur Danjou - AI enjoyer and Maths student',
  description: 'Developer enjoying Artificial Intelligence and Machine Learning. Mathematics Student at Paris Dauphine-PSL University specialised in Statistics',
})
</script>

<template>
  <main class="!max-w-none">
    <AppVisitors />
    <ChatCommandPalette />
    <div class="space-y-8">
      <ChatMessageContainer>
        Hello Arthur, tell me about you!
      </ChatMessageContainer>
      <ChatMessageContainer user="arthur">
        I am an AI enjoyer and a Maths student.
      </ChatMessageContainer>
      <ChatMessageContainer>
        I want to switch the theme
      </ChatMessageContainer>
      <ChatMessageContainer user="arthur">
        <ToolTheme />
      </ChatMessageContainer>
      <ChatMessageContainer>
        I want to change the language of the chat
      </ChatMessageContainer>
      <ChatMessageContainer user="arthur">
        <ToolLanguage />
      </ChatMessageContainer>
      <ChatMessageContainer>
        Show me the stats of Arthur
      </ChatMessageContainer>
      <ChatMessageContainer user="arthur">
        <ToolStats />
      </ChatMessageContainer>
      <ChatMessageContainer>
        What is Arthur doing?
      </ChatMessageContainer>
      <ChatMessageContainer user="arthur">
        <ToolActivity />
      </ChatMessageContainer>
    </div>
  </main>
</template>
