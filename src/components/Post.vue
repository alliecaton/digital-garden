<script setup lang="ts">
import { computed } from 'vue'

import type { Post } from '@/types/Posts'

import Tag from '@/components/Tag.vue'

import { formatDate } from '@/utils/formatDate'

const props = defineProps<{
  post: Post
}>()

const date = computed(() => {
  return formatDate(props.post.createdAt)
})
</script>

<template>
  <router-link :to="'/posts/' + post.slug" class="post">
    <div class="post__title">{{ post.title }}</div>

    <div class="tags">
      <Tag :tag="tag" v-for="tag in post?.tags" :key="tag.id" />
    </div>

    <div class="post__date">{{ date }}</div>
  </router-link>
</template>

<style scoped lang="scss">
.post {
  display: block;
  padding: 15px;
  color: $base;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    background-color: $light;
  }

  @include sm {
    text-align: left;
    padding: 15px 30px;
    font-size: 125px;
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

.tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 10px;
}
</style>
