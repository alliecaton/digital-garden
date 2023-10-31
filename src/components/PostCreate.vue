<script setup lang="ts">
import { mergeProps, ref } from 'vue'

import fetch from '@/utils/fetch'

const props = defineProps<{
  submitToken?: string
}>()

const title = ref('')
const content = ref('')
const postId = ref(null)

const created = ref(false)
const create = async () => {
  created.value = false
  try {
    const data = await fetch({
      method: 'post',
      path: '/post',
      data: {
        title: title.value,
        content: content.value,
      },
      headers: {
        'x-access-token': props.submitToken,
      },
    })

    if (data) {
      created.value = true
      postId
    }
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="container">
    <div class="success" v-if="created">successfully posted!!</div>
    <router-link :to="'/posts/' + postId">{{ title }}</router-link>

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

    <button @click="create">submit</button>
  </div>
</template>

<style scoped lang="scss">
.success {
  font-weight: bold;
  color: $turq;
}

.content {
  margin-top: 20px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
}
</style>
