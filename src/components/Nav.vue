<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="nav">
    <RouterLink class="nav-link" to="/">home</RouterLink>
    <RouterLink class="nav-link" to="/Posts">posts</RouterLink>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  padding: 30px 30px;
}

.nav-link {
  color: black;
  font-size: 16px;

  & + & {
    margin-left: 20px;
  }
}

.router-link-active {
  text-decoration: underline;
  text-underline-offset: 8px;
  text-decoration-thickness: 3px;
  text-decoration-color: $turq;
}
</style>
