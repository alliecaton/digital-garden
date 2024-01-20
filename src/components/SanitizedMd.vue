<script setup lang="ts">
import { ref } from 'vue'
import { Marked } from 'marked'
import DOMPurify from 'dompurify'
import 'highlight.js/styles/github.css'
import { onMounted } from 'vue'

import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

const props = defineProps<{
  content?: string
}>()

const sanitized = ref('')

onMounted(async () => {
  if (props.content) {
    const marked = new Marked(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext'
          return hljs.highlight(code, { language }).value
        },
      })
    )

    const mark = await marked.parse(props.content, {
      breaks: true,
      gfm: true,
    })

    DOMPurify.addHook('afterSanitizeAttributes', function (node) {
      // set external links to target=_blank
      if (node.tagName === 'H1' || node.tagName === 'H2') {
        const id = node.textContent?.toLowerCase().replace(/\s/g, '-')

        if (id) {
          node.setAttribute('id', id)
        }
      }

      if ('target' in node) {
        const link = node.getAttribute('href')

        if (link && link.includes('http')) {
          node.setAttribute('target', '_blank')
        }
      }
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

:deep(h1) {
  margin: 10px 0;
}

:deep(h1),
:deep(h2) {
  font-weight: 700;
}

:deep(img) {
  width: 100%;
}

:deep(ul) {
  margin: 15px 0;
}

:deep(pre) {
  border-radius: 4px;
  background-color: #eef0f3;
  padding: 16px;
}

:deep(code) {
  border-radius: 2px;
  background-color: #eef0f3;
  padding: 2px 4px;
}
</style>
