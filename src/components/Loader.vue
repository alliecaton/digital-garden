<template>
  <div class="loader"></div>
</template>

<style scoped lang="scss">
.loader {
  width: 8px;
  height: 8px;
  display: block;
  margin: 50px auto;
  position: relative;
  color: $turq;
  box-sizing: border-box;
  animation: animloader 1s linear infinite alternate;
}

@keyframes animloader {
  0% {
    box-shadow: -38px -12px, -14px 0, 14px 0, 38px 0;
  }
  33% {
    box-shadow: -38px 0px, -14px -12px, 14px 0, 38px 0;
  }
  66% {
    box-shadow: -38px 0px, -14px 0, 14px -12px, 38px 0;
  }
  100% {
    box-shadow: -38px 0, -14px 0, 14px 0, 38px -12px;
  }
}
</style>
