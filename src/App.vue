<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'

import Nav from '@/components/Nav.vue'
</script>

<template>
  <div class="border">
    <header class="header">
      <Nav />
    </header>

    <div class="wrapper">
      <RouterView />
    </div>
  </div>

  <Footer />
</template>

<style scoped>
.wrapper {
  min-height: 50vh;
}

.header {
  border-bottom: solid 2px var(--base);
}

.border {
  border: 2px solid var(--base);
}
</style>
