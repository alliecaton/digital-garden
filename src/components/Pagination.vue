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

  window.scrollTo({
    top: 0,
  })
}

const showNext = computed(() => {
  return Boolean(props.pagination.current !== props.pagination.totalPages)
})

const showPrevious = computed(() => {
  return Boolean(props.pagination.current !== 1)
})
</script>

<template>
  <div v-if="pagination.totalResults > 10" class="pagination">
    <div class="page-text">page {{ page }} / {{ pagination.totalPages }}</div>
    <button
      v-if="showPrevious"
      class="load-more"
      @click="changePage(page + -1)"
    >
      &lt;&lt;
    </button>
    <button v-if="showNext" class="load-more" @click="changePage(page + 1)">
      >>
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
  align-items: center;
  justify-content: end;
  gap: 10px;
}

.page-text {
  font-size: 12px;
}
</style>
