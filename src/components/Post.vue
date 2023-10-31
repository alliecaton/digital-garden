<script setup lang="ts">
import type { Post } from '@/types/Posts'

defineProps<{
  post: Post
}>()

const formatDate = (date: string) => {
  const jsDate = new Date(date)

  return jsDate.toLocaleDateString()
}
</script>

<template>
  <div class="post">
    <div class="post__title">{{ post.title }}</div>
    <div class="post__description">
      {{ post.content }}
    </div>
    <div class="post__date">{{ formatDate(post.updatedAt) }}</div>
  </div>
</template>

<style scoped lang="scss">
.post {
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

.post__description {
  margin-top: 10px;
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
