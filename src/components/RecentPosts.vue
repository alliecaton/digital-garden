<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGetPosts } from '@/composables/useGetPosts'
import Loader from '@/components/Loader.vue'

const { posts, loading, getPosts } = useGetPosts()

onMounted(() => {
  getPosts(1, null)
})

const truncatedList = computed(() => {
  return posts.value.slice(0, 5)
})
</script>

<template>
  <Loader v-if="loading" />
  <div v-else>
    <strong>most recent posts:</strong>
    <div class="post" v-for="post in truncatedList" :key="post.id">
      <span class="arrow">-></span>
      <router-link class="post__link" :to="'/posts/' + post.slug">
        {{ post.title }}
      </router-link>
    </div>

    <router-link class="more-link" to="/posts">see all posts</router-link>
  </div>
</template>

<style scoped lang="scss">
.post {
  display: flex;
  gap: 10px;
}

.arrow {
  text-wrap: nowrap;
}

.post__link {
  color: $base;
}

.more-link {
  display: block;
  margin-top: 15px;
}
</style>
