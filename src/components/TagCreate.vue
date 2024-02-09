<script setup lang="ts">
import { onMounted, watch } from 'vue'

import { useTags } from '@/composables/useTags'

const emit = defineEmits(['updateParentTags'])

const {
  emoji,
  name,
  tags,
  addTagToList,
  getAllTags,
  showTagInputs,
  availableTags,
  removeTagFromList,
} = useTags()

watch(tags.value, (newTags) => {
  emit('updateParentTags', newTags)
})

onMounted(async () => {
  await getAllTags()
})
</script>

<template>
  <div class="tag">
    <div class="available-tags">
      <div
        @click="() => addTagToList(tag)"
        class="pill"
        v-for="tag in availableTags"
        :key="tag.id"
      >
        {{ tag.emoji }}{{ tag.name }}
      </div>
    </div>

    <div class="tag__inputs" v-if="showTagInputs">
      <label>emoji: </label>
      <input v-model="emoji" />

      <label>name: </label>
      <input v-model="name" />

      <button v-if="emoji && name" @click="() => addTagToList()">
        add tag
      </button>
    </div>

    <div class="tags__list">
      <div :key="tag.name" v-for="tag in tags">
        <span class="emoji">{{ tag.emoji }}</span>
        <span>{{ tag.name }}</span>
        <button class="tag__remove" @click="() => removeTagFromList(tag.name)">
          remove
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.available-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}

.tag {
}

.tag__inputs {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.tag__add {
  margin-bottom: 10px;
}

.tags__list {
  margin-top: 10px;
}

.emoji {
  margin-right: 10px;
}

.tag__remove {
  margin-left: 10px;
}

.pill {
  border-radius: 6px;
  padding: 3px 7px;
  background-color: #f1f1f1;
  cursor: pointer;

  &:hover {
    outline: 1px solid black;
  }
}
</style>
