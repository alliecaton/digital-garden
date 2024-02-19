<script setup lang="ts">
import type { Tag } from '@/types/Tags'
import { computed } from 'vue'

const props = defineProps<{
  tags?: Tag[]
  appliedTags?: number[]
  onClick?: (tag: number) => void
}>()

const isClickable = computed(() => {
  if (props.onClick) {
    return 'click'
  }

  return null
})

const clickEvent = (tag: Tag) => {
  if (!props.onClick) return

  props.onClick(tag.id)
}

const tagIsActive = (tag: number) => {
  return Boolean(props.appliedTags?.includes(tag))
}
</script>

<template>
  <div v-if="tags?.length">
    <div class="tags">
      <div v-for="tag in tags" :key="tag.id">
        <component
          :is="isClickable ? 'button' : 'div'"
          @[isClickable]="() => clickEvent(tag)"
          class="tag"
          :class="{ 'tag--active': tagIsActive(tag.id) }"
        >
          <span>{{ tag.emoji }}</span>
          <span>{{ tag.name }}</span>
        </component>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 10px;
}

button {
  font-family: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid $purple;

  &:hover {
    border: 1px dotted $purple;
  }
}

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

.tag--active {
  background-color: $purple;
  color: white;
  border: 1px solid $purple;
  transition: 0.3s;
}
</style>
