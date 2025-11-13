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

    <div v-if="showTagInputs">
      <div class="emoji-input">
        <label>emoji: </label>
        <input v-model="emoji" />
      </div>

      <div>
        <label>name: </label>
        <input v-model="name" />
      </div>

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

input {
  font-size: 16px;
}

.emoji-input {
  margin: 10px 0;
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
