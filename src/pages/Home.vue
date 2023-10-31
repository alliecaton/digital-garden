<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="title">Allie's</div>
    <div class="title">Digital Garden</div>

    <div class="intro">
      <p>hello! welcome to my digital garden 🌱</p>

      <p>this is my always-in-progress space to explore and experiment</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  line-height: 1;
  font-size: 18vw;
  color: $base;
  font-family: 'Quality Control';

  @include md {
    font-size: 125px;
  }
}

.intro {
  margin-top: 30px;

  font-size: 12px;

  @include md {
    font-size: 15px;
  }
}
</style>
