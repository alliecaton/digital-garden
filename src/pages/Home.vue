<script setup lang="ts">
import RecentPosts from '@/components/RecentPosts.vue'
import RecentBookmarks from '@/components/RecentBookmarks.vue'
import CurrentlyReading from '@/components/CurrentlyReading.vue'
import CurrentlyListening from '@/components/CurrentlyListening.vue'
</script>

<template>
  <div class="container">
    <div class="intro">
      <div class="text">
        <p>hello! welcome to my digital garden 🌱</p>

        <p>this is my always-in-progress space to explore and experiment.</p>

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
            boulder, listen to fast music, make things with my hands, and engage
            with my community.
          </p>

          <p class="spacedp">
            check me out on
            <a class="link" href="https://github.com/alliecaton" target="blank"
              >github</a
            >,
            <a class="link" href="https://alliecaton.com" target="blank"
              >my portfolio</a
            >, and
            <a
              class="link"
              href="https://www.linkedin.com/in/alliecaton/"
              target="blank"
              >linkedin</a
            >.
          </p>

          <p class="spacedp">
            if you want to chat (or if you encounter a bug 🐞) feel free to
            <a target="blank" href="mailto:alliecaton3@gmail.com"
              >reach out to me by email</a
            >
            :)
          </p>
        </div>
      </div>
      <div class="recents">
        <RecentPosts />
        <RecentBookmarks class="bookmarks" />
      </div>
    </div>

    <div class="media">
      <CurrentlyReading />
      <CurrentlyListening />
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  margin-top: 30px;
}

.intro {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;

  @include md {
    gap: 50px;
  }
}

.intro > * {
  flex: 1;
}

.text {
  padding: 30px;
  border-radius: 4px;
  border: 2px solid $light;
  background-color: $faded;
  min-width: unset;
  align-self: start;

  @include sm {
    min-width: 300px;
  }
}

.spacedp {
  margin-top: 10px;
}

.bookmarks {
  margin-top: 30px;
}

.media {
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  gap: 30px;
  flex-wrap: wrap;

  & > * {
    flex: 1;
  }

  @include md {
    flex-direction: row;
  }
}
</style>
