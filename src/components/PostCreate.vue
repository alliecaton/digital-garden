<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'

import Loader from '@/components/Loader.vue'
import Sanitized from '@/components/SanitizedMd.vue'
import TagCreate from '@/components/TagCreate.vue'

import type { Post, UnsavedPost } from '@/types/Posts'
import type { Tag } from '@/types/Tags'

import { useGetPosts } from '@/composables/useGetPosts'

import fetch from '@/utils/fetch'

type Payload = {
  title: string
  content: string
  id?: number
  tags?: Tag[] | null
}

const post = reactive<UnsavedPost>({
  id: null,
  title: '',
  content: '',
  slug: '',
  tags: null,
})

const { posts, loading: loadingPosts, getPosts } = useGetPosts()

const updateParentTags = (data: Tag[]) => {
  post.tags = data
}

const method = ref('post')

const success = ref(false)
const createOrUpdate = async () => {
  const isPut = Boolean(method.value === 'put')

  let path = '/posts'

  let payload: Payload = {
    title: post.title,
    content: post.content,
  }

  if (post.tags?.length) {
    payload = {
      ...payload,
      tags: post.tags,
    }
  }

  if (isPut) {
    path = `/posts/${post.slug}`
  }

  if (post.id && isPut) {
    payload = {
      ...payload,
      id: post.id,
    }
  }

  success.value = false

  try {
    const data = await fetch({
      method: method.value,
      path: path,
      data: payload,
    })

    if (data) {
      success.value = true
      getPosts()
    }
  } catch (e) {
    console.error(e)
  } finally {
    setTimeout(() => {
      success.value = false
    }, 2000)
  }
}

const deletePost = async (post: Post) => {
  success.value = false
  method.value = 'delete'

  try {
    const data = await fetch({
      method: method.value,
      path: `/posts/${post.slug}`,
      data: {
        id: post.id,
      },
    })

    if (data) {
      success.value = true
      getPosts()
    }
  } catch (e) {
    console.error(e)
  } finally {
    setTimeout(() => {
      success.value = false
    }, 2000)
  }
}

onMounted(() => {
  getPosts()
})

const populateNewPost = () => {
  post.title = ''
  post.content = ''
  post.slug = ''
  post.id = null

  method.value = 'post'
}

const selectPost = (selectedPost: Post) => {
  post.title = selectedPost.title
  post.content = selectedPost.content
  post.slug = selectedPost.slug
  post.id = selectedPost.id

  method.value = 'put'
}

const submitButtonText = computed(() => {
  if (method.value === 'post') return 'submit new post'

  return 'update post'
})

const preview = ref(false)
const togglePreview = () => {
  preview.value = !preview.value
}

const previewButtonText = computed(() => {
  if (preview.value) return 'hide preview'

  return 'show preview'
})

const uploadingImage = ref(false)
const imageUploadError = ref(false)

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (!files || files.length === 0) return

  uploadingImage.value = true
  imageUploadError.value = false

  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('images', files[i])
  }

  try {
    const data = await fetch({
      method: 'post',
      path: '/upload/images',
      data: formData,
    })

    if (data && data.success && data.images) {
      const markdownImages = data.images
        .map((image: { url: string }) => `![alt text](${image.url})`)
        .join('\n\n')

      if (post.content) {
        post.content += `\n\n${markdownImages}\n`
      } else {
        post.content = markdownImages
      }
    }
  } catch (e) {
    console.error(e)
    imageUploadError.value = true
  } finally {
    uploadingImage.value = false
    target.value = ''
  }
}
</script>

<template>
  <div class="container">
    <div class="success" v-if="success">successful {{ method }}!!</div>

    <button v-if="method === 'put'" @click="populateNewPost">
      create new post
    </button>

    <div>
      <label>title:</label>
      <input type="text" v-model="post.title" />
    </div>

    <div class="content">
      <label>content:</label>

      <button class="preview-button" @click="togglePreview">
        {{ previewButtonText }}
      </button>
      <Sanitized
        class="preview-section"
        v-if="preview"
        :content="post.content"
      />
      <textarea
        v-else
        type="textarea"
        rows="20"
        v-model="post.content"
      ></textarea>
    </div>

    <div class="image-upload">
      <label for="image-upload" class="image-upload-label">
        Upload Images
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        @change="handleImageUpload"
        style="display: none"
      />
      <div v-if="uploadingImage" class="upload-status">Uploading...</div>
      <div v-if="imageUploadError" class="upload-status upload-error">
        Image upload failed. Please try again.
      </div>
    </div>

    <TagCreate @updateParentTags="updateParentTags" />

    <button class="submit" @click="createOrUpdate">
      {{ submitButtonText }}
    </button>

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
  color: $light;
  margin-bottom: 20px;
}

.content {
  margin-top: 20px;
  margin-bottom: 20px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
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

.preview-section {
  border: 1px solid black;
  margin-top: 20px;
  padding: 10px;
  border-radius: 2px;
}

.image-upload {
  margin-top: 20px;
  margin-bottom: 20px;
}

.image-upload-label,
.submit,
.preview-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: $light;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    outline: 3px solid $light;
  }
}

.preview-button {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px 10px;
  font-size: 14px;
}

.upload-status {
  margin-top: 10px;
  font-size: 14px;
}

.upload-success {
  color: green;
  font-weight: bold;
}

.upload-error {
  color: red;
  font-weight: bold;
}
</style>
