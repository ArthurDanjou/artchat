<script lang="ts" setup>
const props = withDefaults(defineProps<{
  user?: 'user' | 'arthur'
}>(), {
  user: 'user',
})

const isArthur = computed(() => props.user === 'arthur')

const { locale, locales } = useI18n({
  useScope: 'local',
})
const currentLocale = computed(() => locales.value.find((l: { code: string }) => l.code === locale.value))
const formatted = computed(() => useDateFormat(useNow(), 'D MMMM YYYY, HH:mm', { locales: currentLocale.value?.code ?? 'en' }).value)
</script>

<template>
  <div class="group flex flex-col gap-4">
    <div class="flex flex-col-reverse gap-4 items-start md:flex-row-reverse">
      <UCard
        :variant="isArthur ? 'soft' : 'solid'"
        class="rounded-xl p-2 mt-1"
        :class="isArthur ? 'w-full bg-transparent !p-0' : 'bg-sky-300 md:max-w-3/4'"
        :ui="{ body: isArthur ? 'p-0 sm:p-0' : 'sm:p-2', header: isArthur ? 'p-0 sm:p-0' : 'sm:p-2', footer: isArthur ? 'p-0 sm:p-0' : 'sm:p-2' }"
      >
        <slot />
      </UCard>
      <div v-if="isArthur" class="flex items-center gap-2">
        <UAvatar src="/arthur.webp" size="lg" />
        <span class="md:hidden">Arthur DANJOU</span>
      </div>
    </div>
    <div class="opacity-0 group-hover:opacity-100 duration-500 flex" :class="isArthur ? 'justify-start ml-12' : 'justify-end'">
      {{ formatted }}
    </div>
  </div>
</template>
