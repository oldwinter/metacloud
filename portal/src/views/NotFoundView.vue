<template>
  <main class="not-found">
    <h1>找不到这个页面</h1>
    <p>这条路径没有对应页面。</p>
    <p>
      <RouterLink to="/">回到首页</RouterLink>
    </p>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  padding: 1rem 0;
}

.not-found h1 {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}
</style>
