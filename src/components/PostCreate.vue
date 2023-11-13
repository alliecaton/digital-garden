<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import Loader from '@/components/Loader.vue'

import type { Post } from '@/types/Posts'

import fetch from '@/utils/fetch'

const props = defineProps<{
  submitToken?: string
}>()

const id = ref<number | null>(null)
const title = ref('')
const content = ref('')

const method = ref('post')

const success = ref(false)
const createOrUpdate = async () => {
  const isPut = Boolean(method.value === 'put')

  let path = '/posts'

  if (isPut) {
    path = `/posts/${id.value}`
  }

  success.value = false

  try {
    const data = await fetch({
      method: method.value,
      path: path,
      data: {
        title: title.value,
        content: content.value,
      },
    })

    if (data) {
      success.value = true
      getPosts()
    }
  } catch (e) {
    console.error(e)
  } finally {
    success.value = false
  }
}

const deletePost = async (post: Post) => {
  success.value = false
  method.value = 'delete'

  try {
    const data = await fetch({
      method: method.value,
      path: `/posts/${post.id}`,
      headers: {
        'x-access-token': props.submitToken,
      },
    })

    if (data) {
      success.value = true
      getPosts()
    }
  } catch (e) {
    console.error(e)
  } finally {
    success.value = false
  }
}

const loadingPosts = ref(true)
const posts = ref<Post[]>([])
const getPosts = async () => {
  loadingPosts.value = true
  try {
    const data = await fetch({
      method: 'get',
      path: '/posts',
    })

    if (data) {
      posts.value = data
    }
  } catch (e) {
    console.error(e)
  } finally {
    loadingPosts.value = false
  }
}

onMounted(() => {
  getPosts()
})

const populateNewPost = () => {
  title.value = ''
  content.value = ''
  id.value = null

  method.value = 'post'
}

const selectPost = (post: Post) => {
  title.value = post.title
  content.value = post.content
  id.value = post.id

  method.value = 'put'
}

const submitButtonText = computed(() => {
  if (method.value === 'post') return 'submit new post'

  return 'update post'
})
</script>

<template>
  <div class="container">
    <div class="success" v-if="success">successful {{ method }}!!</div>

    <button v-if="method === 'put'" @click="populateNewPost">
      create new post
    </button>

    <div>
      <label>title:</label>
      <br />
      <input type="text" v-model="title" />
    </div>

    <div class="content">
      <label>content:</label>
      <br />
      <textarea type="textarea" rows="20" v-model="content"></textarea>
    </div>

    <button @click="createOrUpdate">{{ submitButtonText }}</button>

    <div class="posts" v-if="!loadingPosts">
      <div class="post" v-for="post in posts" :key="post.id">
        <span class="post__delete" @click="() => deletePost(post)">🚮</span>
        <span class="post__title" @click="() => selectPost(post)">{{
          post.title
        }}</span>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<style scoped lang="scss">
.success {
  font-weight: bold;
  color: $turq;
  margin-bottom: 20px;
}

.content {
  margin-top: 20px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
}

.posts {
  border-top: 1px solid black;
  padding-top: 20px;
  margin-top: 30px;
}

.post {
  cursor: pointer;
}

.post__title {
  text-decoration: underline;
}

.post__delete {
  padding: 10px;
  text-decoration: none;
}
</style>
@/composables/fetch
