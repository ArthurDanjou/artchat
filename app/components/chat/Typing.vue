<script setup lang="ts">
const children = ref<HTMLElement[]>([])
const shown = ref<HTMLElement[]>([])

const container = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!container.value)
    return

  children.value = Array.from(container.value.children) as HTMLElement[]

  for (const child of children.value) {
    shown.value.push(child)
    await new Promise(resolve => setTimeout(resolve, 400))
  }
})
</script>

<template>
  <div>
    <div ref="container" class="hidden">
      <slot />
    </div>
    <div>
      <component
        :is="el.tagName.toLowerCase()"
        v-for="(el, index) in shown"
        :key="index"
        v-html="el.innerHTML"
      />
    </div>
  </div>
</template>
