<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import type { Post } from '@/types/Posts'

import fetch from '@/utils/fetch'
import { formatDate } from '@/utils/formatDate'

import Loader from '@/components/Loader.vue'
import Sanitized from '@/components/SanitizedMd.vue'

import Tag from '@/components/Tag.vue'

const route = useRoute()

const post = ref<Post | null>(null)
const loading = ref(true)

const date = computed(() => {
  if (post.value?.updatedAt) {
    return formatDate(post.value.createdAt)
  }

  return ''
})

onMounted(async () => {
  loading.value = true

  try {
    const res = await fetch({
      method: 'get',
      path: '/posts/' + route.params.slug,
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
  <div v-if="!loading" class="container constraint">
    <div class="post__title">{{ post?.title }}</div>

    <div class="tags">
      <Tag :tag="tag" v-for="tag in post?.tags" :key="tag.id" />
    </div>

    <div class="post__date">{{ date }}</div>

    <div class="post__content">
      <Sanitized :content="post?.content" />
    </div>
  </div>
  <Loader v-else />
</template>

<style scoped lang="scss">
.constraint {
  padding-left: 15px;
  padding-right: 15px;

  @include sm {
    padding-left: 30px;
    padding-right: 30px;
  }

  @include md {
    padding-left: 20%;
    padding-right: 20%;
  }
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

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
