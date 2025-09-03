<template>
  <div class="flex flex-col my-16 md:my-32">
    <h1
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
        scale: 0.6,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        scale: 1,
      }"
      class="font-bold text-3xl sm:text-4xl"
    >
      Welcome to ArtChat
    </h1>
    <h3
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
          delay: 400,
        },
      }"
      class="text-3xl sm:text-4xl bg-gradient-to-r from-inverted/40 to-inverted/75 to-50% bg-clip-text text-transparent font-medium"
    >
      Ask me anything about Arthur DANJOU
    </h3>
  </div>
</template>
