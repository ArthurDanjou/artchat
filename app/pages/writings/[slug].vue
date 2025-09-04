<script lang="ts" setup>
const route = useRoute()
const { data: writing } = await useAsyncData(`writings/${route.params.slug}`, () =>
  queryCollection('writings').path(`/writings/${route.params.slug}`).first())

const { t } = useI18n()

useSeoMeta({
  title: writing.value?.title,
  description: writing.value?.description,
  author: 'Arthur Danjou',
})
</script>

<template>
  <main v-if="writing" class="mt-8 md:mt-16 md:mb-32 mb-20">
    <div class="flex">
      <NuxtLinkLocale
        class="flex items-center gap-2 mb-8 group text-sm hover:text-black dark:hover:text-white duration-300"
        to="/canva"
      >
        <UIcon
          class="group-hover:-translate-x-1 transform duration-300"
          name="i-ph-arrow-left-duotone"
          size="20"
        />
        {{ t('post.back') }}
      </NuxtLinkLocale>
    </div>
    <PostAlert class="mb-8" />
    <div>
      <div class="flex items-end justify-between gap-2 flex-wrap">
        <h1
          class="font-bold text-3xl text-black dark:text-white"
        >
          {{ writing.title }}
        </h1>
        <div
          class="text-sm text-neutral-500 duration-300 flex items-center gap-1"
        >
          <UIcon name="ph:calendar-duotone" size="16" />
          <p>{{ useDateFormat(writing.publishedAt, 'DD MMMM YYYY').value }} </p>
        </div>
      </div>
      <p class="mt-2 text-base">
        {{ writing.description }}
      </p>
    </div>
    <div
      v-if="writing.cover"
      class="w-full rounded-md my-8"
    >
      <ProseImg
        :src="`/projects/${writing.cover}`"
        label="Project cover"
      />
    </div>
    <USeparator
      class="my-4"
      icon="i-ph-pencil-line-duotone"
    />
    <ClientOnly>
      <ContentRenderer
        :value="writing"
        class="!max-w-none prose dark:prose-invert"
      />
    </ClientOnly>
    <PostFooter />
  </main>
</template>

<style scoped>
.prose h2 a,
.prose h3 a,
.prose h4 a {
  text-decoration: none;
}

.prose img {
  margin: 0;
}

.katex-html {
  display: none;
}

html {
  scroll-behavior: smooth;
}
</style>
