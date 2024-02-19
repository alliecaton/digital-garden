<script setup lang="ts">
import { computed } from 'vue'

import type { Pagination } from '@/types/Data'

const props = defineProps<{
  pagination: Pagination
  loadMore: (page: number) => void
}>()

const page = computed(() => {
  return props.pagination.current || 1
})

const changePage = (newPage: number) => {
  props.loadMore(newPage)
}

const showLoadMore = computed(() => {
  return Boolean(props.pagination.current !== props.pagination.totalPages)
})
</script>

<template>
  <div class="pagination" v-if="pagination.totalResults > 10">
    <button v-if="showLoadMore" class="load-more" @click="changePage(page + 1)">
      load more
    </button>
  </div>
</template>

<style lang="scss" scoped>
.load-more {
  background: none;
  border: none;
  cursor: pointer;
  border: 1px solid $base;
  border-radius: 6px;
  padding: 5px 8px;
  font-family: 'Sometype Mono', monospace;
  transition: 0.3s;

  &:hover {
    border-style: dotted;
  }
}

.pagination {
  margin: 20px;
  display: flex;
  justify-content: center;
}
</style>
