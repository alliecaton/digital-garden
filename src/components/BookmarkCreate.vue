<script setup lang="ts">
import { ref, onMounted } from 'vue'

import type { Bookmark, Emoji } from '@/types/Bookmarks'

import fetch from '@/utils/fetch'

const title = ref('')
const description = ref('')
const url = ref('')
const quote = ref('')

const bookmarks = ref<Bookmark[]>([])
const loadingBookmarks = ref(true)
const getBookmarks = async () => {
  loadingBookmarks.value = true
  try {
    const data = await fetch({
      method: 'get',
      path: '/bookmarks',
    })

    if (data) {
      bookmarks.value = data
    }
  } catch (e) {
    console.error(e)
  } finally {
    loadingBookmarks.value = false
  }
}

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

const tags = ref<Emoji[]>([])
const emoji = ref('')
const name = ref('')

const showTagInputs = ref(true)
const showEmptyTagInputs = () => {
  if (emoji.value && name.value) {
    emoji.value = ''
    name.value = ''
  }

  showTagInputs.value = true
}

const addTagToList = () => {
  if (emoji.value && name.value) {
    tags.value.push({
      emoji: emoji.value,
      name: name.value,
    })

    emoji.value = ''
    name.value = ''
  }
}

const removeTagFromList = (tagName: string) => {
  tags.value = tags.value.filter((tag) => tag.name !== tagName)
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

    <div class="tag">
      <button class="tag__add" @click="showEmptyTagInputs">new tag</button>
      <div class="tag__inputs" v-if="showTagInputs">
        <label>emoji: </label>
        <input v-model="emoji" />

        <label>name: </label>
        <input v-model="name" />

        <button v-if="emoji && name" @click="addTagToList">add tag</button>
      </div>

      <div class="tags__list">
        <div :key="tag.name" v-for="tag in tags">
          <span class="emoji">{{ tag.emoji }}</span>
          <span>{{ tag.name }}</span>
          <button
            class="tag__remove"
            @click="() => removeTagFromList(tag.name)"
          >
            remove
          </button>
        </div>
      </div>
    </div>

    <button class="save" @click="createBookmark">save bookmark</button>
  </div>
</template>

<style scoped lang="scss">
.bookmark {
  input,
  textarea {
    width: 100%;
    padding: 10px;
  }
}

.tag {
  margin-top: 10px;
}

.tag__inputs {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.tag__add {
  margin-bottom: 10px;
}

.tags__list {
  margin-top: 10px;
}

.emoji {
  margin-right: 10px;
}

.tag__remove {
  margin-left: 10px;
}

.save {
  margin-top: 30px;
}
</style>
