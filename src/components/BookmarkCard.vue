<script setup lang="ts">
import type { Bookmark } from '@/types/Bookmarks'

import Tag from '@/components/Tag.vue'

defineProps<{
  bookmark: Bookmark
}>()
</script>

<template>
  <div>
    <a class="link" target="_blank" :href="bookmark.url">{{
      bookmark.title
    }}</a>

    <div class="description">{{ bookmark.description }}</div>

    <div class="quote">{{ bookmark.quote }}</div>

    <div class="tags">
      <div class="tag" v-for="tag in bookmark.tags" :key="tag.id">
        <Tag :tag="tag" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.link {
  font-weight: bold;
}

.description {
  margin-top: 5px;
  font-size: 12px;
}

.quote {
  margin: 10px 15px;
  font-size: 12px;
  font-style: italic;
  margin-left: 10px;
  border-left: 2px solid rgb(213, 213, 213);
  padding-left: 10px;
}

.tags {
  margin-top: 15px;
}

.tags,
.tag {
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>
