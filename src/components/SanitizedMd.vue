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
        console.log(link)

        if (link && link.includes('http')) {
          console.log('in', link.startsWith('#'))
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
  background-color: #eff1f2;
  padding: 16px;
  white-space: pre-line;
}

:deep(code) {
  border-radius: 2px;
  background-color: #eff1f2;
  padding: 2px 4px;
  white-space: pre-line;
}
</style>
