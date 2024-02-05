<script setup lang="ts">
import { computed } from 'vue'

import { RouterLink } from 'vue-router'

const rssLink = computed(() => {
  const base = import.meta.env.VITE_API_BASE

  return `${base}/rss`
})
</script>

<template>
  <nav class="nav">
    <div>
      <RouterLink class="nav-link" to="/">home</RouterLink>
      <RouterLink class="nav-link" to="/posts">posts</RouterLink>
      <RouterLink class="nav-link" to="/bookmarks">bookmarks</RouterLink>
    </div>

    <a
      class="rss-link"
      :href="rssLink"
      target="_blank"
      rel="noopener noreferrer"
    >
      RSS <img class="rss-icon" src="/src/assets/icons/rss.svg" />
    </a>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px;
}

.nav-link {
  color: black;
  font-size: 16px;
  text-decoration: none;

  & + & {
    margin-left: 20px;
  }
}

.nav-link:hover,
.router-link-active {
  text-decoration: underline;
  text-underline-offset: 8px;
  text-decoration-thickness: 3px;
  text-decoration-color: $light;
}

.rss-icon {
  width: 25px;
  height: 25px;
  margin-left: 5px;
  border-radius: 12px;
}

.rss-link {
  background-color: $purple-light;
  padding: 2px 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: black;
  font-size: 16px;
  text-decoration: none;
  border: 1px solid $purple;

  &:hover {
    border: 1px dotted $purple;
  }
}
</style>
