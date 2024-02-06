<script setup lang="ts">
import { ref, onMounted } from 'vue'

import type { Book } from '@/types/Books'

import fetch from '@/utils/fetch'

import Loader from '@/components/Loader.vue'

const loading = ref(true)

const books = ref<Book[]>([])

onMounted(async () => {
  try {
    const res = await fetch({
      method: 'get',
      path: '/current-book',
    })

    if (res?.books) {
      books.value = res.books
    }
  } catch (e) {
    console.log(e)
  }

  loading.value = false
})
</script>

<template>
  <div class="spacing">
    <strong>currently reading:</strong>
    <Loader v-if="loading" />
    <div v-else class="books">
      <div class="book" v-for="book in books" :key="book.title">
        <a :href="book.link"> <img class="book__img" :src="book.img" /></a>
        <div class="book__info">
          <a :href="book.link">{{ book.title }}</a>
          <div>{{ book.author }}</div>
        </div>
      </div>
    </div>

    <a class="more" href="https://app.thestorygraph.com/profile/allieeeee"
      >see more books</a
    >
  </div>
</template>

<style scoped lang="scss">
.spacing {
  margin-top: 30px;
  display: block;
}

.books {
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.book__info {
  padding: 15px;
  align-self: center;
}

.book {
  width: fit-content;
  display: flex;
  height: 100px;
}

.book__img {
  height: 100%;
  border-radius: 4px;
  // have to set a max width for safari & firefox. annoying
  max-width: 70px;
}

.more {
  display: block;
  margin-top: 15px;
}
</style>
