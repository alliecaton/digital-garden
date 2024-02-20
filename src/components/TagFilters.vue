<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

import { useTags } from '@/composables/useTags'

import TagGroup from '@/components/TagGroup.vue'
import type { Tag } from '@/types/Tags'

const { availableTags, getAllPostTags } = useTags()

defineProps<{
  onClick: (tag: Tag) => void
  appliedTags: Tag[]
}>()

const filtersVisible = ref(false)

const toggleFilters = () => {
  filtersVisible.value = !filtersVisible.value
}

const filterTitle = computed(() => {
  if (filtersVisible.value) {
    return 'hide filters'
  }

  return 'show filters'
})

onMounted(async () => {
  await getAllPostTags()
})
</script>

<template>
  <div class="filters-container">
    <div class="title-container">
      <div @click="toggleFilters" class="filter-title">{{ filterTitle }}</div>
      <div class="filter-length">
        you have {{ appliedTags?.length }} filter(s) selected
      </div>
    </div>
    <KeepAlive>
      <TagGroup
        v-if="filtersVisible"
        :appliedTags="appliedTags"
        :onClick="onClick"
        :tags="availableTags"
        variant="sm"
      />
    </KeepAlive>
  </div>
</template>

<style lang="scss" scoped>
.filters-container {
  margin: 10px;
  background-color: $faded;
  border: 1px solid $light;
  border-radius: 4px;
  padding: 15px 20px;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-title {
  line-height: 1;
  cursor: pointer;
  font-size: 12px;
  text-decoration: underline;
  color: $base;

  &:hover {
    text-decoration: underline dotted;
  }
}

.filter-length {
  font-size: 12px;
}
</style>
