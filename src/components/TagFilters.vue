<script setup lang="ts">
import { onMounted } from 'vue'

import { useTags } from '@/composables/useTags'

import TagGroup from '@/components/TagGroup.vue'

const { availableTags, getAllPostTags } = useTags()

defineProps<{
  onClick: (tag: number) => void
  appliedTags: number[]
}>()

onMounted(async () => {
  await getAllPostTags()
})
</script>

<template>
  <div class="filters-container">
    <p class="filter-title">filter by tag &lt;3</p>
    <TagGroup
      :appliedTags="appliedTags"
      :onClick="onClick"
      :tags="availableTags"
    />
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

.filter-title {
  line-height: 1;
  font-size: 14px;
}
</style>
