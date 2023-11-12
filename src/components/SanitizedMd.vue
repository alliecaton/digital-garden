<script setup lang="ts">
import { ref } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { onMounted } from 'vue'

const props = defineProps<{
  content?: string
}>()

const sanitized = ref('')

onMounted(() => {
  if (props.content) {
    const mark = marked.parse(props.content, {
      breaks: true,
      gfm: true,
    })

    sanitized.value = DOMPurify.sanitize(mark)
  }
})
</script>

<template>
  <div class="sanitized" v-html="sanitized"></div>
</template>

<style scoped lang="scss">
:deep(p) {
  margin: 15px 0;
}

:deep(h3) {
  font-weight: 700;
}

:deep(h2) {
  font-weight: 700;
}

:deep(img) {
  width: 100%;
}
</style>
