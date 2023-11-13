<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import type { Post } from '@/types/Posts'

import fetch from '@/utils/fetch'
import { formatDate } from '@/utils/formatDate'

import Loader from '@/components/Loader.vue'
import Sanitized from '@/components/SanitizedMd.vue'

const route = useRoute()

const post = ref<Post | null>(null)
const loading = ref(true)

const date = computed(() => {
  if (post.value?.updatedAt) {
    return formatDate(post.value.updatedAt)
  }

  return ''
})

onMounted(async () => {
  loading.value = true

  try {
    const res = await fetch({
      method: 'get',
      path: '/posts/' + route.params.id,
    })

    if (res) {
      post.value = res
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="!loading" class="container">
    <div class="post__title">{{ post?.title }}</div>
    <div class="post__date">{{ date }}</div>

    <div class="post__content">
      <Sanitized :content="post?.content" />
    </div>
  </div>
  <Loader v-else />
</template>

<style scoped lang="scss">
.post__title {
  font-size: 24px;
}

.post__date {
  font-size: 12px;
  font-style: italic;
  margin-top: 10px;
}

.post__content {
  margin-top: 20px;
}
</style>
@/composables/fetch
