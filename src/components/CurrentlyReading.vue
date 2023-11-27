<script setup lang="ts">
import { ref, onMounted } from 'vue'

import fetch from '@/utils/fetch'

import Loader from '@/components/Loader.vue'

const loading = ref(true)

const books = ref([])

onMounted(async () => {
  try {
    const res = await fetch({
      method: 'get',
      path: '/current-book',
    })

    console.log(res)
  } catch (e) {
    console.log(e)
  }

  loading.value = false
})
</script>

<template>
  <Loader v-if="loading" />
  <div v-else>
    <div v-for="book in books" :key="book.title">
      {{ book.title }}
    </div>
  </div>
</template>
