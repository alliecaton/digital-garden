<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  // totalPages: number
  loadMore: (page: number) => void
}>()

const page = ref(1)

const changePage = (newPage: number) => {
  page.value = newPage

  props.loadMore(page.value)
}
</script>

<template>
  <div>
    <div class="container">
      <button @click="changePage(page + 1)">load more</button>
    </div>
  </div>
</template>
