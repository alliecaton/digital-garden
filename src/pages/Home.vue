<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="intro">
      <p>hello! welcome to my digital garden 🌱</p>

      <p>this is my always-in-progress space to explore and experiment</p>

      <div class="about">
        <p>
          my name is allie and i'm a full stack software engineer based in san
          diego, ca.
        </p>

        <p class="spacedp">
          i have a lot of hobbies and like the idea of using this garden to
          catalog some of them. most notably, i love to
          <a
            target="blank"
            href="https://app.thestorygraph.com/profile/allieeeee"
            >read</a
          >, <a target="blank" href="https://github.com/alliecaton">code</a>,
          boulder, play
          <a target="blank" href="https://www.stepmania.com/"
            >dance dance revolution</a
          >
          and engage in my community.
        </p>
      </div>

      <div class="links-container">
        <div>🔗 personal links:</div>
        <div class="links">
          <a class="link" href="https://github.com/alliecaton" target="blank"
            >github</a
          >
          |
          <a class="link" href="https://alliecaton.com" target="blank"
            >portfolio</a
          >
          |
          <a
            class="link"
            href="https://www.linkedin.com/in/alliecaton/"
            target="blank"
            >linkedin</a
          >
        </div>

        <div class="garden-links">🔗 garden links:</div>
        <div class="links">
          <a
            class="link"
            href="https://github.com/alliecaton/digital-garden"
            target="blank"
            >client repo</a
          >
          |
          <a
            class="link"
            href="https://github.com/alliecaton/api-digital-garden"
            target="blank"
            >api repo</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  margin-top: 30px;
}

.links-container {
  margin-top: 30px;
  padding: 15px;
  border-radius: 4px;
  background-color: rgba(238, 237, 237, 0.671);
}

.spacedp {
  margin-top: 10px;
}

.link {
  display: block;
}

.links {
  display: flex;
  gap: 15px;
}

.garden-links {
  margin-top: 15px;
}
</style>
