<script setup lang="ts">
import type { Tag } from '@/types/Tags'

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
  font-size: 14px;
  background-color: $purple-light;
  color: $purple;
  width: fit-content;
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>
