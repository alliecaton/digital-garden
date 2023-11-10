<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="intro">
      <p>hello! welcome to my digital garden 🌱</p>

      <p>this is my always-in-progress space to explore and experiment</p>

      <div class="links">
        <a href="https://github.com/alliecaton/digital-garden" _taraget="blank"
          >client repo</a
        >
        |
        <a
          href="https://github.com/alliecaton/api-digital-garden"
          _taraget="blank"
          >api repo</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// .title {
//   line-height: 1;
//   font-size: 18vw;
//   text-align: center;
//   color: $base;
//   font-family: 'Quality Control';

//   @include md {
//     text-align: left;
//     font-size: 125px;
//   }
// }

.intro {
  margin-top: 30px;

  font-size: 12px;

  @include md {
    font-size: 15px;
  }
}

.links {
  margin-top: 30px;
}
</style>
