<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useGetBookmarks } from '@/composables/useGetBookmarks'

import fetch from '@/utils/fetch'

import TagCreate from '@/components/TagCreate.vue'
import type { Tag } from '@/types/Tags'

const title = ref('')
const description = ref('')
const url = ref('')
const quote = ref('')

const tags = ref<Tag[]>([])
const updateParentTags = (data: Tag[]) => {
  tags.value = data
}

const { getBookmarks } = useGetBookmarks()

const createBookmark = async () => {
  const payload = {
    title: title.value,
    description: description.value,
    url: url.value,
    quote: quote.value,
    tags: tags.value,
  }

  try {
    const data = await fetch({
      method: 'post',
      path: '/bookmarks',
      data: payload,
    })
    if (data) {
      getBookmarks()
    }
  } catch (e) {
    console.error(e)
  } finally {
    title.value = ''
    description.value = ''
    url.value = ''
    quote.value = ''
    tags.value = []
  }
}

onMounted(() => {
  getBookmarks()
})
</script>

<template>
  <div class="container">
    <div class="bookmark">
      <label>title: </label>
      <input v-model="title" />

      <label>url: </label>
      <input v-model="url" />

      <label>description: </label>
      <textarea type="textarea" rows="5" v-model="description"></textarea>

      <label>quote: </label>
      <textarea type="textarea" rows="5" v-model="quote"></textarea>
    </div>

    <TagCreate @updateParentTags="updateParentTags" />

    <button class="save" @click="createBookmark">save bookmark</button>
  </div>
</template>

<style scoped lang="scss">
.bookmark {
  input,
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
  }
}

.save {
  margin-top: 30px;
}
</style>
