<script setup lang="ts">
import type { Tag } from '@/types/Bookmarks'

defineProps<{
  tag: Tag
}>()
</script>

<template>
  <div class="tag">
    <span>{{ tag.emoji }}</span>
    <span>{{ tag.name }}</span>
  </div>
</template>

<style scoped lang="scss">
.tag {
  border-radius: 8px;
  padding: 3px 10px;
  font-size: 10px;
  background-color: $faded;
  color: $mid;
  width: fit-content;
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>
