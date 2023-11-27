<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="nav">
    <RouterLink class="nav-link" to="/">home</RouterLink>
    <RouterLink class="nav-link" to="/posts">posts</RouterLink>
  </nav>
</template>

<style scoped lang="scss">
.nav {
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
</style>
