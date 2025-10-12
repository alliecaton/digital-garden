<script setup lang="ts">
import RecentPosts from '@/components/RecentPosts.vue'
import RecentBookmarks from '@/components/RecentBookmarks.vue'
import CurrentlyReading from '@/components/CurrentlyReading.vue'
import CurrentlyListening from '@/components/CurrentlyListening.vue'
</script>

<template>
  <div class="container">
    <div class="section top">
      <div class="text">
        <p>hello! welcome to my digital garden 🌱</p>

        <div class="about">
          <p>my name is allie and i'm a software engineer based in SoCal.</p>

          <p class="spacedp">
            i have a lot of hobbies and like the idea of using this garden to
            catalog some of them. most notably, i love to
            <a
              target="_blank"
              href="https://app.thestorygraph.com/profile/allieeeee"
              >read</a
            >, <a target="_blank" href="https://github.com/alliecaton">code</a>,
            boulder,
            <a target="_blank" href="https://bandcamp.com/alliecaton"
              >listen to fast music</a
            >, make things with my hands, and engage with my community.
          </p>

          <p class="spacedp">
            the url of this site is a tag that i've used forever for various
            accounts, and is a nod to the whales that I've "adopted" through
            <a href="whales.org">whales.org</a> -- something I've been doing
            since i was a kid. my current whale daughter is
            <a href="https://www.whaleswithnames.com/mars/">Mars</a> 🐋
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

    <div class="section sub-section">
      <CurrentlyReading />
      <CurrentlyListening />
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  margin-top: 10px;
}

.recents {
  padding: 30px;
}

.text {
  padding: 30px;
  border-radius: 4px;
  border: 2px solid $light;
  background-color: $faded;
  align-self: stretch;
}

.spacedp {
  margin-top: 10px;
}

.bookmarks {
  margin-top: 30px;
}

.section {
  display: flex;
  gap: 30px;
  align-self: stretch;

  & > * {
    flex: 1;
  }

  flex-direction: column;

  @include md {
    flex-direction: row;
    gap: 50px;
  }
}

.sub-section {
  margin-top: 30px;
}
</style>
