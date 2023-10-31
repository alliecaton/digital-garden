<script setup lang="ts">
import { computed } from 'vue'

import type { Post } from '@/types/Posts'

import { formatDate } from '@/utils/formatDate'

const props = defineProps<{
  post: Post
}>()

const date = computed(() => {
  return formatDate(props.post.updatedAt)
})
</script>

<template>
  <router-link :to="'/posts/' + post.id" class="post">
    <div class="post__title">{{ post.title }}</div>
    <div class="post__date">{{ date }}</div>
  </router-link>
</template>

<style scoped lang="scss">
.post {
  display: block;
  padding: 15px 30px;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    background-color: $turq;
  }
}

.post__title {
  font-weight: 600;
  font-size: 18px;
}

.post__date {
  margin-top: 10px;
  font-size: 12px;
  font-style: italic;
}
</style>
